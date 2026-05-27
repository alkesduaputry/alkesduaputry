<script lang="ts">
	import { SITE_URL, type Product } from '$lib/data/products';

	let { product, origin = SITE_URL }: { product: Product; origin?: string } = $props();

	const availabilityMap = {
		in_stock: 'https://schema.org/InStock',
		preorder: 'https://schema.org/PreOrder',
		contact_admin: 'https://schema.org/LimitedAvailability'
	} satisfies Record<Product['availability'], string>;

	const imageUrl = $derived(product.image.startsWith('http') ? product.image : `${origin}${product.image}`);
	const productUrl = $derived(`${origin}/produk/${product.slug}`);
	const activePrice = $derived(product.salePrice ?? product.price);

	const schema = $derived({
		'@context': 'https://schema.org',
		'@type': 'Product',
		name: product.name,
		image: [imageUrl],
		description: product.shortDescription,
		sku: product.sku,
		...(product.brand ? { brand: { '@type': 'Brand', name: product.brand } } : {}),
		...(activePrice
			? {
					offers: {
						'@type': 'Offer',
						url: productUrl,
						priceCurrency: 'IDR',
						price: activePrice,
						itemCondition: 'https://schema.org/NewCondition',
						availability: availabilityMap[product.availability]
					}
				}
			: {})
	});
</script>

<svelte:head>
	<script type="application/ld+json">{JSON.stringify(schema)}</script>
</svelte:head>
