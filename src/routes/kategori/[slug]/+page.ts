import { error } from '@sveltejs/kit';
import { getCategoryBySlug, getProductsByCategory } from '$lib/data/products';

export function load({ params }) {
	const category = getCategoryBySlug(params.slug);

	if (!category) {
		error(404, 'Kategori tidak ditemukan');
	}

	return {
		category,
		products: getProductsByCategory(params.slug)
	};
}
