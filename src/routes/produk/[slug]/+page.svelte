<script lang="ts">
	import { page } from '$app/state';
	import Breadcrumb from '$lib/components/Breadcrumb.svelte';
	import ProductJsonLd from '$lib/components/ProductJsonLd.svelte';
	import WhatsAppButton from '$lib/components/WhatsAppButton.svelte';
	import { SITE_URL, getAvailabilityLabel } from '$lib/data/products';
	import type { PageData } from './$types';

	let { data } = $props<{ data: PageData }>();

	const formatPrice = (value: number) =>
		new Intl.NumberFormat('id-ID', {
			style: 'currency',
			currency: 'IDR',
			maximumFractionDigits: 0
		}).format(value);

	const origin = page.url.origin || SITE_URL;
	const activePrice = $derived(data.product.salePrice ?? data.product.price);
	const productUrl = $derived(`${SITE_URL}/produk/${data.product.slug}`);
	const productImageUrl = $derived(
		data.product.image.startsWith('http') ? data.product.image : `${SITE_URL}${data.product.image}`
	);
</script>

<ProductJsonLd product={data.product} {origin} />

<svelte:head>
	<title>{data.product.name} | Alkes Dua Putry</title>
	<meta name="description" content={data.product.shortDescription} />
	<link rel="canonical" href={productUrl} />
	<meta property="og:type" content="product" />
	<meta property="og:site_name" content="Alkes Dua Putry" />
	<meta property="og:title" content={`${data.product.name} | Alkes Dua Putry`} />
	<meta property="og:description" content={data.product.shortDescription} />
	<meta property="og:url" content={productUrl} />
	<meta property="og:image" content={productImageUrl} />
	<meta property="og:image:secure_url" content={productImageUrl} />
	<meta property="og:image:alt" content={data.product.name} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={`${data.product.name} | Alkes Dua Putry`} />
	<meta name="twitter:description" content={data.product.shortDescription} />
	<meta name="twitter:image" content={productImageUrl} />
</svelte:head>

<section class="section">
	<div class="container">
		<Breadcrumb
			items={[
				{ href: '/', label: 'Beranda' },
				{ href: '/produk', label: 'Produk' },
				{ href: `/kategori/${data.product.category}`, label: data.category?.shortTitle ?? 'Kategori' },
				{ label: data.product.name }
			]}
		/>
		<div class="detail-grid">
			<div class="media">
				<img src={data.product.image} alt={data.product.name} />
			</div>
			<div class="summary">
				<span class="status">{getAvailabilityLabel(data.product.availability)}</span>
				<h1>{data.product.name}</h1>
				<p>{data.product.shortDescription}</p>
				<div class="price">
					{#if data.product.price}
						{#if data.product.salePrice}
							<del>{formatPrice(data.product.price)}</del>
							<strong>{formatPrice(data.product.salePrice)}</strong>
							<small>Harga promo perlu dikonfirmasi kembali oleh admin.</small>
						{:else}
							<strong>{formatPrice(data.product.price)}</strong>
						{/if}
					{:else}
						<strong>Harga hubungi admin</strong>
						<small>Admin akan mengonfirmasi stok dan harga terbaru sebelum pemesanan.</small>
					{/if}
				</div>
				<WhatsAppButton product={data.product} label="Pesan via WhatsApp" />
				<div class="info-row">
					<span>SKU: {data.product.sku}</span>
					<span>Kondisi: Baru</span>
					{#if activePrice}
						<span>Currency: IDR</span>
					{/if}
				</div>
			</div>
		</div>
	</div>
</section>

<section class="section content-section">
	<div class="container content-grid">
		<article>
			<h2>Deskripsi Produk</h2>
			<p>{data.product.description}</p>
		</article>
		<article>
			<h2>Spesifikasi Teknis</h2>
			<dl>
				{#each Object.entries(data.product.specs) as [key, value]}
					<div>
						<dt>{key}</dt>
						<dd>{value}</dd>
					</div>
				{/each}
			</dl>
		</article>
		<article>
			<h2>Isi Paket</h2>
			<ul>
				{#each data.product.packageContents ?? ['Unit produk sesuai penawaran'] as item}
					<li>{item}</li>
				{/each}
			</ul>
		</article>
		<article>
			<h2>Catatan Penggunaan</h2>
			<p>{data.product.legalNote ?? 'Gunakan sesuai petunjuk resmi produk dan SOP fasilitas.'}</p>
		</article>
		<article>
			<h2>Garansi</h2>
			<p>{data.product.warranty ?? 'Garansi mengikuti ketentuan produk dan distributor.'}</p>
		</article>
		<article>
			<h2>Pengiriman</h2>
			<p>{data.product.shippingNote ?? 'Estimasi pengiriman dikonfirmasi berdasarkan alamat dan jenis produk.'}</p>
		</article>
	</div>
</section>

<section class="section disclaimer-wrap">
	<div class="container disclaimer">
		<strong>Disclaimer</strong>
		<p>
			Informasi produk di website ini bersifat informatif dan bukan pengganti nasihat medis
			profesional. Untuk penggunaan alat kesehatan tertentu, ikuti petunjuk resmi produk atau
			konsultasikan dengan tenaga kesehatan.
		</p>
	</div>
</section>

<style>
	.detail-grid,
	.content-grid {
		display: grid;
		gap: 1.5rem;
	}

	.media {
		overflow: hidden;
		border: 1px solid var(--color-border);
		border-radius: 8px;
		background: #eef6f8;
		box-shadow: var(--shadow-soft);
	}

	.media img {
		width: 100%;
		aspect-ratio: 4 / 3;
		object-fit: cover;
	}

	.summary {
		display: grid;
		align-content: start;
		gap: 1rem;
	}

	.status {
		width: fit-content;
		padding: 0.45rem 0.75rem;
		border-radius: 999px;
		background: rgba(10, 92, 138, 0.08);
		color: var(--color-primary);
		font-size: 0.82rem;
		font-weight: 800;
	}

	h1 {
		margin: 0;
		font-family: 'Fraunces', serif;
		font-size: clamp(2.4rem, 5vw, 4rem);
		line-height: 1;
	}

	.summary p,
	article p,
	li,
	dd,
	.info-row,
	.price small {
		color: var(--color-muted);
		line-height: 1.75;
	}

	.price {
		display: grid;
		gap: 0.25rem;
	}

	.price strong {
		color: var(--color-primary-dark);
		font-size: 1.35rem;
	}

	.info-row {
		display: flex;
		flex-wrap: wrap;
		gap: 0.65rem;
	}

	.info-row span {
		padding: 0.5rem 0.7rem;
		border-radius: 8px;
		background: rgba(10, 92, 138, 0.06);
	}

	.content-section {
		background: rgba(10, 92, 138, 0.04);
	}

	article {
		padding: 1.2rem;
		border: 1px solid var(--color-border);
		border-radius: 8px;
		background: var(--color-white);
	}

	h2 {
		margin: 0 0 0.75rem;
		font-size: 1.2rem;
	}

	dl,
	ul,
	p {
		margin: 0;
	}

	dl {
		display: grid;
		gap: 0.7rem;
	}

	dl div {
		display: grid;
		gap: 0.2rem;
	}

	dt {
		font-weight: 800;
	}

	.disclaimer-wrap {
		padding-top: 0;
	}

	.disclaimer {
		padding: 1rem;
		border-radius: 8px;
		background: #fff7e8;
		border: 1px solid rgba(232, 160, 32, 0.35);
	}

	.disclaimer p {
		margin: 0.35rem 0 0;
		color: var(--color-muted);
		line-height: 1.75;
	}

	@media (min-width: 768px) {
		.detail-grid {
			grid-template-columns: 1fr 1fr;
		}

		.content-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}
</style>
