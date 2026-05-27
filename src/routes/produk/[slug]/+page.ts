import { error } from '@sveltejs/kit';
import { getCategoryBySlug, getProductBySlug } from '$lib/data/products';

export function load({ params }) {
	const product = getProductBySlug(params.slug);

	if (!product) {
		error(404, 'Produk tidak ditemukan');
	}

	return {
		product,
		category: getCategoryBySlug(product.category)
	};
}
