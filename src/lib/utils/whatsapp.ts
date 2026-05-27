import { SITE_URL, WHATSAPP_PHONE, type Product } from '$lib/data/products';

export function generateProductWhatsAppLink(product: Product, origin = SITE_URL) {
	const url = `${origin}/produk/${product.slug}`;
	const message = `Halo Alkes Dua Putry, saya ingin bertanya tentang produk: ${product.name}. Link: ${url}. Apakah stok dan harga terbaru tersedia?`;

	return `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${encodeURIComponent(message)}`;
}
