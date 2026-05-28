<script lang="ts">
	import ProductCard from '$lib/components/ProductCard.svelte';
	import ProductFilter from '$lib/components/ProductFilter.svelte';
	import { SITE_URL, type Product } from '$lib/data/products';
	import type { PageData } from './$types';

	let { data } = $props<{ data: PageData }>();

	let selectedCategory = $state('all');
	let query = $state('');
	let sort = $state('name-asc');
	let products = $derived(data.products as Product[]);
	let categories = $derived(data.categories ?? []);
	const catalogTitle = 'Katalog Produk Alat Kesehatan | Alkes Dua Putry';
	const catalogDescription =
		'Katalog alat kesehatan non-obat, hospital furniture, trolley medis, lemari instrumen, infant bed, infant warmer, dan produk klinik Alkes Dua Putry.';
	const catalogImage = 'https://files.alkesduaputry.com/Slider/kegiatan%20Gudang%20Alkesduaputry%20(8).jpeg';

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
	let spotlightProducts = $derived(filteredProducts.slice(0, 8));
</script>

<svelte:head>
	<title>{catalogTitle}</title>
	<meta name="description" content={catalogDescription} />
	<link rel="canonical" href="https://alkesduaputry.com/produk" />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="Alkes Dua Putry" />
	<meta property="og:title" content={catalogTitle} />
	<meta property="og:description" content={catalogDescription} />
	<meta property="og:url" content={`${SITE_URL}/produk`} />
	<meta property="og:image" content={catalogImage} />
	<meta property="og:image:secure_url" content={catalogImage} />
	<meta property="og:image:alt" content="Katalog produk Alkes Dua Putry" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={catalogTitle} />
	<meta name="twitter:description" content={catalogDescription} />
	<meta name="twitter:image" content={catalogImage} />
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
		<ProductFilter {categories} bind:selectedCategory bind:query bind:sort />
		<div class="count">{filteredProducts.length} produk ditemukan</div>
		{#if spotlightProducts.length}
			<div class="spotlight" aria-label="Produk pilihan geser samping">
				<div class="spotlight-head">
					<h2>Produk pilihan</h2>
					<span>Geser untuk melihat lainnya</span>
				</div>
				<div class="spotlight-rail">
					{#each spotlightProducts as product}
						<div class="spotlight-item">
							<ProductCard {product} compact />
						</div>
					{/each}
				</div>
			</div>
		{/if}
		<div class="product-grid">
			{#each filteredProducts as product}
				<ProductCard {product} />
			{:else}
				<p class="empty">Produk approved dari katalog PDF belum tersedia.</p>
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

	.spotlight {
		display: none;
		margin: 0 0 1.25rem;
	}

	.spotlight-head {
		display: flex;
		align-items: end;
		justify-content: space-between;
		gap: 1rem;
		margin-bottom: 0.8rem;
	}

	.spotlight h2 {
		margin: 0;
		font-size: 1.1rem;
		line-height: 1.2;
	}

	.spotlight span {
		color: var(--color-muted);
		font-size: 0.85rem;
		font-weight: 700;
		white-space: nowrap;
	}

	.spotlight-rail {
		display: grid;
		grid-auto-columns: minmax(156px, 42vw);
		grid-auto-flow: column;
		gap: 0.8rem;
		overflow-x: auto;
		overscroll-behavior-inline: contain;
		padding: 0 0 0.9rem;
		scroll-snap-type: inline mandatory;
		scrollbar-width: thin;
	}

	.spotlight-item {
		min-width: 0;
		scroll-snap-align: start;
	}

	.product-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 1rem;
	}

	.empty {
		margin: 0;
		color: var(--color-muted);
	}

	@media (min-width: 768px) {
		.product-grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	@media (max-width: 767px) {
		.spotlight {
			display: block;
		}
	}

	@media (max-width: 420px) {
		.product-grid {
			gap: 0.7rem;
		}

		.spotlight-head {
			align-items: start;
			flex-direction: column;
			gap: 0.25rem;
		}

		.spotlight-rail {
			grid-auto-columns: minmax(148px, 44vw);
			gap: 0.7rem;
		}
	}
</style>
