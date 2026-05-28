import { fail } from '@sveltejs/kit';
import { createManualProduct } from '$lib/server/catalog';
import type { Actions, PageServerLoad, RequestEvent } from './$types';

const AUTH_COOKIE = 'adp_admin_auth';

function getAdminPassword(event: RequestEvent) {
	return event.platform?.env.ADMIN_PASSWORD ?? process.env.ADMIN_PASSWORD ?? '';
}

function cleanTextField(formData: FormData, key: string) {
	const value = formData.get(key);
	return typeof value === 'string' && value.trim() ? value.trim() : null;
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

export const load: PageServerLoad = async (event) => {
	return {
		authenticated: await isAuthenticated(event),
		missingPassword: !getAdminPassword(event),
		dbMissing: !event.platform?.env.DB,
		bucketMissing: !event.platform?.env.BUCKET
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

	create: async (event) => {
		if (!(await isAuthenticated(event))) {
			return fail(401, { message: 'Password admin tidak valid atau sesi sudah berakhir.' });
		}

		if (!event.platform?.env.DB) {
			return fail(500, { message: 'Binding D1 DB tidak tersedia.' });
		}

		try {
			const result = await createManualProduct(event, await event.request.formData());
			return { message: 'Produk manual berhasil dibuat.', slug: result.slug };
		} catch (error) {
			return fail(400, { message: error instanceof Error ? error.message : 'Gagal membuat produk.' });
		}
	}
};
