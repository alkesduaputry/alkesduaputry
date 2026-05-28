import { SITE_URL, getMerchantEligibleProducts } from '$lib/data/products';
import { FILES_BASE_URL, getApprovedCatalogItems } from '$lib/server/catalog';

const escapeXml = (value: string | number) =>
	String(value)
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&apos;');

const availabilityMap = {
	in_stock: 'in stock',
	preorder: 'preorder',
	contact_admin: 'out of stock'
} as const;

const money = (value: number) => `${value.toFixed(2)} IDR`;

export async function GET(event) {
	const staticProducts = getMerchantEligibleProducts();
	const catalogProducts = (await getApprovedCatalogItems(event)).filter(
		(product) =>
			product.name.trim() &&
			(product.salePrice ?? product.price ?? 0) > 0 &&
			product.image.startsWith(FILES_BASE_URL)
	);
	const products = [...staticProducts, ...catalogProducts];

	const items = products
		.map((product) => {
			const link = `${SITE_URL}/produk/${product.slug}`;
			const imageLink = product.image.startsWith('http') ? product.image : `${SITE_URL}${product.image}`;
			const price = product.price ?? product.salePrice ?? 0;

			return `<item>
	<g:id>${escapeXml(product.id)}</g:id>
	<g:title>${escapeXml(product.name)}</g:title>
	<g:description>${escapeXml(product.shortDescription)}</g:description>
	<g:link>${escapeXml(link)}</g:link>
	<g:image_link>${escapeXml(imageLink)}</g:image_link>
	<g:availability>${availabilityMap[product.availability]}</g:availability>
	<g:price>${money(price)}</g:price>
	${product.salePrice ? `<g:sale_price>${money(product.salePrice)}</g:sale_price>` : ''}
	${product.brand ? `<g:brand>${escapeXml(product.brand)}</g:brand>` : ''}
	<g:condition>${product.condition}</g:condition>
	<g:product_type>${escapeXml(product.productType)}</g:product_type>
	${product.googleProductCategory ? `<g:google_product_category>${escapeXml(product.googleProductCategory)}</g:google_product_category>` : ''}
	${product.mpn ? `<g:mpn>${escapeXml(product.mpn)}</g:mpn>` : ''}
	${product.gtin ? `<g:gtin>${escapeXml(product.gtin)}</g:gtin>` : ''}
</item>`;
		})
		.join('\n');

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
<channel>
	<title>Alkes Dua Putry Product Feed</title>
	<link>${SITE_URL}</link>
	<description>Katalog produk alat kesehatan non-obat Alkes Dua Putry</description>
${items}
</channel>
</rss>`;

	return new Response(xml, {
		headers: {
			'content-type': 'application/xml; charset=utf-8',
			'cache-control': 'max-age=3600'
		}
	});
}
