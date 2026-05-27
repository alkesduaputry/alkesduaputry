<script lang="ts">
	import Breadcrumb from '$lib/components/Breadcrumb.svelte';
	import ProductCard from '$lib/components/ProductCard.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>{data.category.title} | Alkes Dua Putry</title>
	<meta name="description" content={data.category.description} />
	<link rel="canonical" href={`https://alkesduaputry.com/kategori/${data.category.slug}`} />
</svelte:head>

<section class="section">
	<div class="container">
		<Breadcrumb
			items={[
				{ href: '/', label: 'Beranda' },
				{ href: '/produk', label: 'Produk' },
				{ label: data.category.title }
			]}
		/>
		<span class="eyebrow">Kategori</span>
		<h1 class="section-title">{data.category.title}</h1>
		<p class="section-copy">{data.category.description}</p>
		<div class="highlights">
			{#each data.category.highlights as highlight}
				<span>{highlight}</span>
			{/each}
		</div>
	</div>
</section>

<section class="catalog">
	<div class="container product-grid">
		{#each data.products as product}
			<ProductCard {product} />
		{/each}
	</div>
</section>

<style>
	.highlights {
		display: flex;
		flex-wrap: wrap;
		gap: 0.65rem;
		margin-top: 1rem;
	}

	.highlights span {
		padding: 0.5rem 0.75rem;
		border-radius: 999px;
		background: rgba(10, 92, 138, 0.08);
		color: var(--color-primary);
		font-weight: 800;
	}

	.catalog {
		padding: 0 0 72px;
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
