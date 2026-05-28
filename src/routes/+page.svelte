<script lang="ts">
	import ProductCard from '$lib/components/ProductCard.svelte';
	import { whatsappBase } from '$lib/data/products';
	import type { PageData } from './$types';

	let { data } = $props<{ data: PageData }>();

	const heroFallbackImage =
		'https://files.alkesduaputry.com/Slider/kegiatan%20Gudang%20Alkesduaputry%20(8).jpeg';
	const featuredProducts = $derived(data.featuredProducts ?? []);
	const productCategories = $derived(data.catalogCategories ?? []);
	const heroImage = $derived(featuredProducts[0]?.image ?? heroFallbackImage);
	const strengths = [
		'Produk berkualitas untuk operasional klinik dan rumah sakit',
		'Konsultasi kebutuhan berdasarkan ruang dan fungsi alat',
		'Koordinasi pengiriman untuk produk besar dan rawan benturan',
		'Dukungan purna jual sesuai ketentuan produk'
	];
</script>

<svelte:head>
	<title>Penyedia Alat Kesehatan & Hospital Furniture | Alkes Dua Putry</title>
	<meta
		name="description"
		content="Alkes Dua Putry menyediakan katalog alat kesehatan non-obat, hospital furniture, trolley medis, lemari instrumen, dan peralatan klinik untuk pengadaan profesional."
	/>
	<link rel="canonical" href="https://alkesduaputry.com/" />
</svelte:head>

<section class="hero">
	<div class="container hero-grid">
		<div class="hero-copy">
			<span class="eyebrow">Katalog Alat Kesehatan Non-Obat</span>
			<h1>Penyedia Alat Kesehatan & Hospital Furniture</h1>
			<p>
				Alkes Dua Putry membantu kebutuhan klinik, rumah sakit, dan institusi untuk produk
				hospital furniture, trolley medis, peralatan nursery, serta perlengkapan ruang penunjang.
			</p>
			<div class="button-row">
				<a class="btn btn-primary" href="/produk">Lihat Katalog</a>
				<a class="btn btn-accent" href={whatsappBase} target="_blank" rel="noreferrer">Konsultasi WhatsApp</a>
			</div>
		</div>
		<div class="hero-panel">
			<img src={heroImage} alt="Produk alat kesehatan Alkes Dua Putry" />
			<div class="trust-row">
				<span>Izin edar produk jika tersedia</span>
				<span>Garansi sesuai ketentuan</span>
				<span>Support pemesanan</span>
			</div>
		</div>
	</div>
</section>

<section class="section">
	<div class="container">
		<span class="eyebrow">Kategori</span>
		<h2 class="section-title">Kategori produk utama</h2>
		<div class="category-grid">
			{#each productCategories as category}
				<a class="category-card" href={`/kategori/${category.slug}`}>
					<strong>{category.title}</strong>
					<p>{category.description}</p>
					<small>{category.highlights.join(' / ')}</small>
				</a>
			{/each}
		</div>
	</div>
</section>

<section class="section muted">
	<div class="container">
		<span class="eyebrow">Keunggulan</span>
		<h2 class="section-title">Pendamping pengadaan yang rapi</h2>
		<div class="strength-grid">
			{#each strengths as strength}
				<div class="strength-card">{strength}</div>
			{/each}
		</div>
	</div>
</section>

<section class="section">
	<div class="container">
		<span class="eyebrow">Produk Unggulan</span>
		<h2 class="section-title">Katalog awal siap dikonsultasikan</h2>
		<div class="product-grid">
			{#each featuredProducts as product}
				<ProductCard {product} />
			{:else}
				<p class="empty">Produk approved dari katalog PDF belum tersedia.</p>
			{/each}
		</div>
	</div>
</section>

<section class="section">
	<div class="container legal-strip">
		<div>
			<span class="eyebrow">Legal & Kepercayaan</span>
			<h2>Informasi produk dibuat untuk pengadaan profesional.</h2>
		</div>
		<p>
			Dokumen izin edar, garansi, estimasi pengiriman, dan ketersediaan stok dikonfirmasi kembali
			oleh admin sebelum transaksi. Informasi produk bersifat informatif dan bukan pengganti
			nasihat medis profesional.
		</p>
	</div>
</section>

<style>
	.hero {
		padding: 56px 0 36px;
	}

	.hero-grid {
		display: grid;
		gap: 1.5rem;
		align-items: center;
	}

	.hero-copy {
		display: grid;
		gap: 1.1rem;
	}

	h1 {
		margin: 0;
		max-width: 11ch;
		font-family: 'Fraunces', serif;
		font-size: clamp(3rem, 8vw, 5.4rem);
		line-height: 0.98;
	}

	.hero-copy p,
	.legal-strip p {
		margin: 0;
		color: var(--color-muted);
		line-height: 1.75;
	}

	.hero-panel {
		display: grid;
		gap: 1rem;
	}

	.hero-panel img {
		width: 100%;
		border-radius: 8px;
		border: 1px solid var(--color-border);
		box-shadow: var(--shadow-soft);
	}

	.trust-row,
	.category-grid,
	.strength-grid,
	.product-grid {
		display: grid;
		gap: 1rem;
	}

	.empty {
		margin: 0;
		color: var(--color-muted);
	}

	.trust-row span,
	.strength-card,
	.category-card {
		padding: 1rem;
		border: 1px solid var(--color-border);
		border-radius: 8px;
		background: var(--color-white);
	}

	.trust-row span,
	.strength-card {
		font-weight: 800;
		color: var(--color-primary-dark);
	}

	.category-card {
		display: grid;
		gap: 0.65rem;
		min-height: 190px;
	}

	.category-card strong {
		font-size: 1.15rem;
	}

	.category-card p,
	.category-card small {
		margin: 0;
		color: var(--color-muted);
		line-height: 1.65;
	}

	.muted {
		background: rgba(10, 92, 138, 0.05);
	}

	.legal-strip {
		display: grid;
		gap: 1rem;
		padding: 1.3rem;
		border-radius: 8px;
		background: #081b2a;
		color: var(--color-white);
	}

	.legal-strip h2 {
		margin: 0.8rem 0 0;
		font-size: clamp(1.6rem, 3vw, 2.4rem);
	}

	.legal-strip p {
		color: rgba(255, 255, 255, 0.82);
	}

	@media (min-width: 768px) {
		.hero-grid,
		.legal-strip {
			grid-template-columns: 1fr 1fr;
		}

		.category-grid,
		.product-grid {
			grid-template-columns: repeat(3, 1fr);
		}

		.strength-grid {
			grid-template-columns: repeat(4, 1fr);
		}
	}
</style>
