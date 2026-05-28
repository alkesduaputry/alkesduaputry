import { products as staticProducts } from '$lib/data/products';
import { getApprovedCatalogItems } from '$lib/server/catalog';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const catalogProducts = await getApprovedCatalogItems(event);

	return {
		products: [...staticProducts, ...catalogProducts]
	};
};
