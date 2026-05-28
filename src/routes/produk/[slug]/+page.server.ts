import { error } from '@sveltejs/kit';
import { getApprovedCatalogItemBySlug, getCatalogCategoryMeta } from '$lib/server/catalog';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const { params } = event;
	const product = await getApprovedCatalogItemBySlug(event, params.slug);

	if (!product) {
		error(404, 'Produk tidak ditemukan');
	}

	return {
		product,
		category: getCatalogCategoryMeta(product.category)
	};
};
