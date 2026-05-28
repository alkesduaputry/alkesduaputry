import { getApprovedCatalogCategories } from '$lib/server/catalog';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
	return {
		catalogCategories: await getApprovedCatalogCategories(event)
	};
};
