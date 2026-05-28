import { getApprovedCatalogCategories, getApprovedCatalogItems } from '$lib/server/catalog';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const products = await getApprovedCatalogItems(event);

	return {
		featuredProducts: products.slice(0, 6),
		catalogCategories: await getApprovedCatalogCategories(event)
	};
};
