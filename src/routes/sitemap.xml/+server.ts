import { SITE_URL } from '$lib/data/products';
import { getApprovedCatalogCategories, getApprovedCatalogItems } from '$lib/server/catalog';
import type { RequestHandler } from './$types';

const staticPages = [
	{ path: '/', priority: '1.0', changefreq: 'daily' },
	{ path: '/produk', priority: '0.9', changefreq: 'daily' },
	{ path: '/tentang-kami', priority: '0.8', changefreq: 'monthly' },
	{ path: '/kontak', priority: '0.8', changefreq: 'monthly' },
	{ path: '/portofolio', priority: '0.6', changefreq: 'monthly' },
	{ path: '/blog', priority: '0.5', changefreq: 'monthly' },
	{ path: '/metode-pembayaran', priority: '0.4', changefreq: 'yearly' },
	{ path: '/pengiriman', priority: '0.4', changefreq: 'yearly' },
	{ path: '/kebijakan-pengembalian', priority: '0.4', changefreq: 'yearly' },
	{ path: '/kebijakan-privasi', priority: '0.3', changefreq: 'yearly' },
	{ path: '/syarat-ketentuan', priority: '0.3', changefreq: 'yearly' }
];

function xml(value: string) {
	return value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');
}

function absoluteUrl(path: string) {
	return `${SITE_URL}${path === '/' ? '/' : path}`;
}

function absoluteImageUrl(image: string) {
	return image.startsWith('http') ? image : `${SITE_URL}${image}`;
}

function urlEntry({
	loc,
	priority,
	changefreq,
	image
}: {
	loc: string;
	priority: string;
	changefreq: string;
	image?: { loc: string; title: string };
}) {
	return [
		'<url>',
		`<loc>${xml(loc)}</loc>`,
		`<changefreq>${changefreq}</changefreq>`,
		`<priority>${priority}</priority>`,
		image
			? [
					'<image:image>',
					`<image:loc>${xml(image.loc)}</image:loc>`,
					`<image:title>${xml(image.title)}</image:title>`,
					'</image:image>'
				].join('')
			: '',
		'</url>'
	].join('');
}

export const GET: RequestHandler = async (event) => {
	const [products, categories] = await Promise.all([
		getApprovedCatalogItems(event, 5000),
		getApprovedCatalogCategories(event, 5000)
	]);

	const urls = [
		...staticPages.map((page) =>
			urlEntry({
				loc: absoluteUrl(page.path),
				priority: page.priority,
				changefreq: page.changefreq
			})
		),
		...categories.map((category) =>
			urlEntry({
				loc: absoluteUrl(`/kategori/${category.slug}`),
				priority: '0.7',
				changefreq: 'weekly'
			})
		),
		...products.map((product) =>
			urlEntry({
				loc: absoluteUrl(`/produk/${product.slug}`),
				priority: '0.8',
				changefreq: 'weekly',
				image: {
					loc: absoluteImageUrl(product.image),
					title: product.name
				}
			})
		)
	];

	return new Response(
		[
			'<?xml version="1.0" encoding="UTF-8"?>',
			'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
			...urls,
			'</urlset>'
		].join(''),
		{
			headers: {
				'Content-Type': 'application/xml; charset=utf-8',
				'Cache-Control': 'public, max-age=3600'
			}
		}
	);
};
