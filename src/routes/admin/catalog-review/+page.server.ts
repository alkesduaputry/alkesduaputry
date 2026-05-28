import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad, RequestEvent } from './$types';

const FILES_BASE_URL = 'https://files.alkesduaputry.com';
const AUTH_COOKIE = 'adp_admin_auth';

type CatalogReviewItem = {
	id: string;
	source_id: string;
	page_number: number;
	item_index: number;
	sku: string | null;
	name: string | null;
	suggested_name: string | null;
	category: string | null;
	brand: string | null;
	normal_price: number | null;
	sale_price: number | null;
	discount_percent: number | null;
	confidence_score: number | null;
	specs_json: string | null;
	raw_text: string;
	review_status: string;
	image_path: string | null;
	image_url: string | null;
	specs_pretty: string;
};

const reviewQuery = `
SELECT i.*, p.image_path
FROM catalog_items i
LEFT JOIN catalog_pages p
  ON p.source_id = i.source_id
 AND p.page_number = i.page_number
WHERE i.review_status = 'needs_review'
ORDER BY i.page_number ASC, i.item_index ASC
LIMIT 50
`;

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

function cleanTextField(formData: FormData, key: string) {
	const value = formData.get(key);
	return typeof value === 'string' && value.trim() ? value.trim() : null;
}

function parseNullableNumber(formData: FormData, key: string) {
	const value = formData.get(key);
	if (typeof value !== 'string' || value.trim() === '') return null;
	const normalized = value.replace(/[^\d]/g, '');
	if (!normalized) return null;
	const parsed = Number.parseInt(normalized, 10);
	return Number.isFinite(parsed) ? parsed : null;
}

function parseItemForm(formData: FormData) {
	const id = cleanTextField(formData, 'id');
	const name = cleanTextField(formData, 'name');
	const suggestedName = cleanTextField(formData, 'suggested_name');
	const category = cleanTextField(formData, 'category');
	const reviewStatus = cleanTextField(formData, 'review_status') ?? 'needs_review';

	return {
		id,
		name,
		suggestedName,
		category,
		normalPrice: parseNullableNumber(formData, 'normal_price'),
		salePrice: parseNullableNumber(formData, 'sale_price'),
		reviewStatus: ['needs_review', 'rejected'].includes(reviewStatus) ? reviewStatus : 'needs_review'
	};
}

function prettifySpecs(value: string | null) {
	if (!value) return '';
	try {
		return JSON.stringify(JSON.parse(value), null, 2);
	} catch {
		return value;
	}
}

async function getAuthorizedDb(event: RequestEvent) {
	if (!(await isAuthenticated(event))) {
		return { error: fail(401, { message: 'Password admin tidak valid atau sesi sudah berakhir.' }) };
	}

	const db = getDb(event);
	if (!db) {
		return { error: fail(500, { message: 'Binding D1 DB tidak tersedia.' }) };
	}

	return { db };
}

export const load: PageServerLoad = async (event) => {
	const hasPassword = Boolean(getAdminPassword(event));
	const authenticated = await isAuthenticated(event);
	const db = getDb(event);

	if (!hasPassword) {
		return {
			authenticated: false,
			missingPassword: true,
			items: [] as CatalogReviewItem[],
			filesBaseUrl: FILES_BASE_URL
		};
	}

	if (!authenticated) {
		return {
			authenticated: false,
			missingPassword: false,
			items: [] as CatalogReviewItem[],
			filesBaseUrl: FILES_BASE_URL
		};
	}

	if (!db) {
		return {
			authenticated: true,
			missingPassword: false,
			dbMissing: true,
			items: [] as CatalogReviewItem[],
			filesBaseUrl: FILES_BASE_URL
		};
	}

	const { results } = await db.prepare(reviewQuery).all<CatalogReviewItem>();
	const rows = results as CatalogReviewItem[];
	const items = rows.map((item) => ({
		...item,
		image_url: item.image_path ? `${FILES_BASE_URL}/${item.image_path}` : null,
		specs_pretty: prettifySpecs(item.specs_json)
	}));

	return {
		authenticated: true,
		missingPassword: false,
		dbMissing: false,
		items,
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
		const authorized = await getAuthorizedDb(event);
		if ('error' in authorized) return authorized.error;
		const { db } = authorized;

		const data = parseItemForm(await event.request.formData());
		if (!data.id) return fail(400, { message: 'ID item tidak ditemukan.' });

		await db
			.prepare(
				`UPDATE catalog_items
				 SET name = ?, suggested_name = ?, category = ?, normal_price = ?, sale_price = ?,
				     review_status = ?, updated_at = CURRENT_TIMESTAMP
				 WHERE id = ? AND review_status <> 'approved'`
			)
			.bind(
				data.name,
				data.suggestedName,
				data.category,
				data.normalPrice,
				data.salePrice,
				data.reviewStatus,
				data.id
			)
			.run();

		return { message: 'Draft disimpan.' };
	},

	approve: async (event) => {
		const authorized = await getAuthorizedDb(event);
		if ('error' in authorized) return authorized.error;
		const { db } = authorized;

		const data = parseItemForm(await event.request.formData());
		if (!data.id) return fail(400, { message: 'ID item tidak ditemukan.' });

		const finalName = data.name ?? data.suggestedName;
		if (!finalName) {
			return fail(400, { message: 'Nama wajib diisi sebelum approve.' });
		}

		if (!data.salePrice || data.salePrice <= 0) {
			return fail(400, { message: 'Sale price wajib diisi dan lebih dari 0 sebelum approve.' });
		}

		await db
			.prepare(
				`UPDATE catalog_items
				 SET name = ?, suggested_name = ?, category = ?, normal_price = ?, sale_price = ?,
				     review_status = 'approved', updated_at = CURRENT_TIMESTAMP
				 WHERE id = ? AND review_status <> 'approved'`
			)
			.bind(finalName, data.suggestedName, data.category, data.normalPrice, data.salePrice, data.id)
			.run();

		return { message: 'Item disetujui.' };
	},

	reject: async (event) => {
		const authorized = await getAuthorizedDb(event);
		if ('error' in authorized) return authorized.error;
		const { db } = authorized;

		const data = parseItemForm(await event.request.formData());
		if (!data.id) return fail(400, { message: 'ID item tidak ditemukan.' });

		await db
			.prepare(
				`UPDATE catalog_items
				 SET name = ?, suggested_name = ?, category = ?, normal_price = ?, sale_price = ?,
				     review_status = 'rejected', updated_at = CURRENT_TIMESTAMP
				 WHERE id = ? AND review_status <> 'approved'`
			)
			.bind(data.name, data.suggestedName, data.category, data.normalPrice, data.salePrice, data.id)
			.run();

		return { message: 'Item ditolak.' };
	}
};
