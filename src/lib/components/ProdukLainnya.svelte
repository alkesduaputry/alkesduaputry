<script lang="ts">
	import { page } from '$app/state';
	import type { CatalogCategorySummary } from '$lib/server/catalog';

	const cards = $derived(((page.data.catalogCategories ?? []) as CatalogCategorySummary[]).slice(0, 3));
</script>

<section class="section">
	<div class="container">
		<span class="eyebrow">Produk Lainnya</span>
		<h2 class="section-title">Kategori produk yang paling sering diminta untuk pengadaan cepat.</h2>
		<div class="grid">
			{#each cards as card}
				<a class="card product-card" href={`/kategori/${card.slug}`}>
					<div class="count">{card.count}</div>
					<h3>{card.shortTitle}</h3>
					<p>{card.description}</p>
				</a>
			{/each}
		</div>
	</div>
</section>

<style>
	.grid {
		margin-top: 2rem;
		display: grid;
		gap: 1rem;
	}

	.product-card {
		padding: 1.5rem;
		transition:
			transform 0.25s ease,
			box-shadow 0.25s ease,
			border-color 0.25s ease;
	}

	.product-card:hover {
		transform: translateY(-6px);
		box-shadow: 0 20px 40px rgba(10, 92, 138, 0.18);
		border-color: rgba(10, 92, 138, 0.24);
	}

	.count {
		width: 3.3rem;
		height: 3.3rem;
		display: grid;
		place-items: center;
		border-radius: 1rem;
		background: rgba(10, 92, 138, 0.08);
		color: var(--color-primary-dark);
		font-size: 1.1rem;
		font-weight: 900;
	}

	h3 {
		margin: 1rem 0 0.5rem;
		font-family: 'Fraunces', serif;
	}

	p {
		margin: 0;
		color: var(--color-muted);
		line-height: 1.75;
	}

	@media (min-width: 768px) {
		.grid {
			grid-template-columns: repeat(3, minmax(0, 1fr));
		}
	}
</style>
