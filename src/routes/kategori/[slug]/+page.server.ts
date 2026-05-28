import { error } from '@sveltejs/kit';
import {
	getApprovedCatalogCategories,
	getApprovedCatalogItems,
	getCatalogCategoryMeta
} from '$lib/server/catalog';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const products = (await getApprovedCatalogItems(event)).filter(
		(product) => product.category === event.params.slug
	);
	const categories = await getApprovedCatalogCategories(event);
	const category =
		categories.find((item) => item.slug === event.params.slug) ??
		(products.length ? getCatalogCategoryMeta(event.params.slug, products.length) : null);

	if (!category) {
		error(404, 'Kategori tidak ditemukan');
	}

	return {
		category,
		products
	};
};
