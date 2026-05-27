<script lang="ts">
	import ProductCard from '$lib/components/ProductCard.svelte';
	import ProductFilter from '$lib/components/ProductFilter.svelte';
	import { productCategories, products, type Product } from '$lib/data/products';

	let selectedCategory = $state('all');
	let query = $state('');
	let sort = $state('name-asc');

	const sortValue = (product: Product) => product.salePrice ?? product.price ?? Number.MAX_SAFE_INTEGER;

	let filteredProducts = $derived(
		products
			.filter((product) => selectedCategory === 'all' || product.category === selectedCategory)
			.filter((product) => {
				const keyword = query.trim().toLowerCase();
				return (
					!keyword ||
					product.name.toLowerCase().includes(keyword) ||
					product.sku.toLowerCase().includes(keyword)
				);
			})
			.toSorted((a, b) => {
				if (sort === 'name-desc') return b.name.localeCompare(a.name);
				if (sort === 'price-asc') return sortValue(a) - sortValue(b);
				if (sort === 'price-desc') return sortValue(b) - sortValue(a);
				return a.name.localeCompare(b.name);
			})
	);
</script>

<svelte:head>
	<title>Katalog Produk Alat Kesehatan | Alkes Dua Putry</title>
	<meta
		name="description"
		content="Katalog alat kesehatan non-obat, hospital furniture, trolley medis, lemari instrumen, infant bed, infant warmer, dan produk klinik Alkes Dua Putry."
	/>
	<link rel="canonical" href="https://alkesduaputry.com/produk" />
</svelte:head>

<section class="section">
	<div class="container page-head">
		<span class="eyebrow">Katalog Produk</span>
		<h1 class="section-title">Alat kesehatan besar dan hospital furniture</h1>
		<p class="section-copy">
			Pilih kategori, cari SKU, lalu hubungi admin untuk stok, dokumen, harga terbaru, dan estimasi
			pengiriman. Produk tanpa harga valid tidak dimasukkan ke feed Google Merchant.
		</p>
	</div>
</section>

<section class="catalog">
	<div class="container">
		<ProductFilter categories={productCategories} bind:selectedCategory bind:query bind:sort />
		<div class="count">{filteredProducts.length} produk ditemukan</div>
		<div class="product-grid">
			{#each filteredProducts as product}
				<ProductCard {product} />
			{/each}
		</div>
	</div>
</section>

<style>
	.page-head {
		display: grid;
		gap: 0.8rem;
	}

	.catalog {
		padding: 0 0 72px;
	}

	.count {
		margin: 1rem 0;
		color: var(--color-muted);
		font-weight: 700;
	}

	.product-grid {
		display: grid;
		gap: 1rem;
	}

	@media (min-width: 768px) {
		.product-grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}
</style>
