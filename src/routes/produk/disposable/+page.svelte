<script lang="ts">
	import { productCategories, whatsappBase } from '$lib/data/products';

	const category = productCategories.find((item) => item.slug === 'disposable');
</script>

<svelte:head>
	<title>Disposable Consumable | AlkesDuaPutry</title>
</svelte:head>

{#if category}
	<section class="section">
		<div class="container page">
			<span class="eyebrow">Produk</span>
			<h1 class="section-title">{category.title}</h1>
			<p class="section-copy">{category.description}</p>
			<div class="list">
				{#each category.highlights as highlight}
					<div class="card row">
						<span>{category.icon}</span>
						<strong>{highlight}</strong>
					</div>
				{/each}
			</div>
			<a class="btn btn-primary" href={whatsappBase} target="_blank" rel="noreferrer">Hubungi Tim Sales</a>
		</div>
	</section>
{/if}

<style>
	.page {
		display: grid;
		gap: 1rem;
	}

	.list {
		display: grid;
		gap: 1rem;
		margin: 1rem 0;
	}

	.row {
		padding: 1rem 1.2rem;
		display: flex;
		align-items: center;
		gap: 0.85rem;
	}

	.row span {
		font-size: 1.6rem;
	}

	@media (min-width: 768px) {
		.list {
			grid-template-columns: repeat(3, minmax(0, 1fr));
		}
	}
</style>
