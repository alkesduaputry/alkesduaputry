import { fail } from '@sveltejs/kit';
import {
	FILES_BASE_URL,
	getCatalogItems,
	restoreCatalogItem,
	softDeleteCatalogItem,
	updateCatalogItem,
	uploadProductImage,
	type CatalogDbItem,
	type CatalogStatus,
	type CatalogStatusFilter
} from '$lib/server/catalog';
import type { Actions, PageServerLoad, RequestEvent } from './$types';

const AUTH_COOKIE = 'adp_admin_auth';
const FILTER_STATUSES: CatalogStatusFilter[] = ['needs_review', 'approved', 'rejected', 'deleted', 'all'];

type CatalogReviewItem = CatalogDbItem & {
	image_url: string | null;
	image_source: 'custom' | 'page_fallback' | 'none';
	specs_pretty: string;
};

function getAdminPassword(event: RequestEvent) {
	return event.platform?.env.ADMIN_PASSWORD ?? process.env.ADMIN_PASSWORD ?? '';
}

function getDb(event: RequestEvent) {
	return event.platform?.env.DB;
}

async function sha256(value: string) {
	const bytes = new TextEncoder().encode(value);
	const digest = await crypto.subtle.digest('SHA-256', bytes);
	return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, '0')).join('');
}

async function isAuthenticated(event: RequestEvent) {
	const password = getAdminPassword(event);
	if (!password) return false;
	return event.cookies.get(AUTH_COOKIE) === (await sha256(password));
}

function getFilterStatus(event: RequestEvent): CatalogStatusFilter {
	const status = event.url.searchParams.get('status');
	return FILTER_STATUSES.includes(status as CatalogStatusFilter) ? (status as CatalogStatusFilter) : 'needs_review';
}

function cleanTextField(formData: FormData, key: string) {
	const value = formData.get(key);
	return typeof value === 'string' && value.trim() ? value.trim() : null;
}

function prettifySpecs(value: string | null) {
	if (!value) return '';
	try {
		return JSON.stringify(JSON.parse(value), null, 2);
	} catch {
		return value;
	}
}

async function getAuthorizedResources(event: RequestEvent) {
	if (!(await isAuthenticated(event))) {
		return { error: fail(401, { message: 'Password admin tidak valid atau sesi sudah berakhir.' }) };
	}

	const db = getDb(event);
	if (!db) {
		return { error: fail(500, { message: 'Binding D1 DB tidak tersedia.' }) };
	}

	return { db };
}

function decorateItem(item: CatalogDbItem): CatalogReviewItem {
	return {
		...item,
		image_url: item.display_image_path ? `${FILES_BASE_URL}/${item.display_image_path}` : null,
		image_source: item.image_path ? 'custom' : item.page_image_path ? 'page_fallback' : 'none',
		specs_pretty: prettifySpecs(item.specs_json)
	};
}

export const load: PageServerLoad = async (event) => {
	const status = getFilterStatus(event);
	const hasPassword = Boolean(getAdminPassword(event));
	const authenticated = await isAuthenticated(event);
	const db = getDb(event);

	if (!hasPassword) {
		return {
			authenticated: false,
			missingPassword: true,
			dbMissing: false,
			status,
			items: [] as CatalogReviewItem[],
			filesBaseUrl: FILES_BASE_URL
		};
	}

	if (!authenticated) {
		return {
			authenticated: false,
			missingPassword: false,
			dbMissing: false,
			status,
			items: [] as CatalogReviewItem[],
			filesBaseUrl: FILES_BASE_URL
		};
	}

	if (!db) {
		return {
			authenticated: true,
			missingPassword: false,
			dbMissing: true,
			status,
			items: [] as CatalogReviewItem[],
			filesBaseUrl: FILES_BASE_URL
		};
	}

	const results = await getCatalogItems(event, status);

	return {
		authenticated: true,
		missingPassword: false,
		dbMissing: false,
		status,
		items: results.map(decorateItem),
		filesBaseUrl: FILES_BASE_URL
	};
};

export const actions: Actions = {
	login: async (event) => {
		const password = getAdminPassword(event);
		const formData = await event.request.formData();
		const submittedPassword = cleanTextField(formData, 'admin_password');

		if (!password) {
			return fail(500, { message: 'ADMIN_PASSWORD belum diset sebagai Cloudflare secret.' });
		}

		if (!submittedPassword || submittedPassword !== password) {
			return fail(401, { message: 'Password admin salah.' });
		}

		event.cookies.set(AUTH_COOKIE, await sha256(password), {
			path: '/admin',
			httpOnly: true,
			sameSite: 'strict',
			secure: event.url.protocol === 'https:',
			maxAge: 60 * 60 * 8
		});

		return { message: 'Login berhasil.' };
	},

	logout: async (event) => {
		event.cookies.delete(AUTH_COOKIE, { path: '/admin' });
		return { message: 'Logout berhasil.' };
	},

	save: async (event) => {
		const authorized = await getAuthorizedResources(event);
		if ('error' in authorized) return authorized.error;

		try {
			await updateCatalogItem(event, await event.request.formData());
			return { message: 'Perubahan disimpan.' };
		} catch (error) {
			return fail(400, { message: error instanceof Error ? error.message : 'Gagal menyimpan produk.' });
		}
	},

	uploadImage: async (event) => {
		const authorized = await getAuthorizedResources(event);
		if ('error' in authorized) return authorized.error;
		const { db } = authorized;

		const formData = await event.request.formData();
		const id = cleanTextField(formData, 'id');
		const file = formData.get('product_image');
		if (!id) return fail(400, { message: 'ID item tidak ditemukan.' });
		if (!(file instanceof File)) return fail(400, { message: 'File gambar wajib dipilih.' });

		try {
			const key = await uploadProductImage(event, id, file, cleanTextField(formData, 'slug'));
			await db
				.prepare(
					`UPDATE catalog_items
					 SET image_path = ?, image_alt = ?, image_updated_at = CURRENT_TIMESTAMP,
					     updated_at = CURRENT_TIMESTAMP
					 WHERE id = ?`
				)
				.bind(
					key,
					cleanTextField(formData, 'image_alt') ??
						cleanTextField(formData, 'name') ??
						cleanTextField(formData, 'suggested_name') ??
						cleanTextField(formData, 'sku') ??
						'Produk Alkes Dua Putry',
					id
				)
				.run();
		} catch (error) {
			return fail(400, { message: error instanceof Error ? error.message : 'Gagal upload gambar.' });
		}

		return { message: 'Gambar produk berhasil diupload.' };
	},

	resetImage: async (event) => {
		const authorized = await getAuthorizedResources(event);
		if ('error' in authorized) return authorized.error;
		const { db } = authorized;

		const formData = await event.request.formData();
		const id = cleanTextField(formData, 'id');
		if (!id) return fail(400, { message: 'ID item tidak ditemukan.' });

		await db
			.prepare(
				`UPDATE catalog_items
				 SET image_path = NULL, image_alt = NULL, image_updated_at = CURRENT_TIMESTAMP,
				     updated_at = CURRENT_TIMESTAMP
				 WHERE id = ?`
			)
			.bind(id)
			.run();

		return { message: 'Gambar produk direset ke gambar halaman PDF.' };
	},

	approve: async (event) => {
		const authorized = await getAuthorizedResources(event);
		if ('error' in authorized) return authorized.error;

		const formData = await event.request.formData();
		formData.set('review_status', 'approved');
		try {
			await updateCatalogItem(event, formData);
			return { message: 'Item disetujui.' };
		} catch (error) {
			return fail(400, { message: error instanceof Error ? error.message : 'Gagal approve produk.' });
		}
	},

	markNeedsReview: async (event) => {
		const authorized = await getAuthorizedResources(event);
		if ('error' in authorized) return authorized.error;
		const { db } = authorized;

		const formData = await event.request.formData();
		const id = cleanTextField(formData, 'id');
		if (!id) return fail(400, { message: 'ID item tidak ditemukan.' });

		await db
			.prepare(
				`UPDATE catalog_items
				 SET review_status = 'needs_review', updated_at = CURRENT_TIMESTAMP
				 WHERE id = ?`
			)
			.bind(id)
			.run();

		return { message: 'Item dikembalikan ke needs_review.' };
	},

	reject: async (event) => {
		const authorized = await getAuthorizedResources(event);
		if ('error' in authorized) return authorized.error;

		const formData = await event.request.formData();
		formData.set('review_status', 'rejected');
		try {
			await updateCatalogItem(event, formData);
			return { message: 'Item ditolak.' };
		} catch (error) {
			return fail(400, { message: error instanceof Error ? error.message : 'Gagal reject produk.' });
		}
	},

	deleteProduct: async (event) => {
		const authorized = await getAuthorizedResources(event);
		if ('error' in authorized) return authorized.error;

		const formData = await event.request.formData();
		const id = cleanTextField(formData, 'id');
		if (!id) return fail(400, { message: 'ID item tidak ditemukan.' });

		try {
			await softDeleteCatalogItem(event, id);
			return { message: 'Produk dihapus dari publik.' };
		} catch {
			return fail(400, { message: 'Gagal menghapus produk.' });
		}
	},

	restoreProduct: async (event) => {
		const authorized = await getAuthorizedResources(event);
		if ('error' in authorized) return authorized.error;

		const formData = await event.request.formData();
		const id = cleanTextField(formData, 'id');
		if (!id) return fail(400, { message: 'ID item tidak ditemukan.' });

		const status = (cleanTextField(formData, 'review_status') || 'needs_review') as CatalogStatus;
		try {
			await restoreCatalogItem(event, id, status);
			return { message: 'Produk dipulihkan.' };
		} catch {
			return fail(400, { message: 'Gagal restore produk.' });
		}
	}
};
