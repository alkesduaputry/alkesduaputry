import { error } from '@sveltejs/kit';
import { getCategoryBySlug, getProductBySlug } from '$lib/data/products';
import { getApprovedCatalogItemBySlug } from '$lib/server/catalog';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const { params } = event;
	const product = getProductBySlug(params.slug) ?? (await getApprovedCatalogItemBySlug(event, params.slug));

	if (!product) {
		error(404, 'Produk tidak ditemukan');
	}

	return {
		product,
		category: getCategoryBySlug(product.category)
	};
};
