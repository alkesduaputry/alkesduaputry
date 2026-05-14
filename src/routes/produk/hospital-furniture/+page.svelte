<script lang="ts">
	import { productCategories, whatsappBase } from '$lib/data/products';

	const category = productCategories.find((item) => item.slug === 'hospital-furniture');
</script>

<svelte:head>
	<title>Hospital Furniture | AlkesDuaPutry</title>
</svelte:head>

{#if category}
	<section class="section">
		<div class="container grid">
			<div>
				<span class="eyebrow">Produk</span>
				<h1 class="section-title">{category.title}</h1>
				<p class="section-copy">{category.description}</p>
				<div class="button-row">
					<a class="btn btn-primary" href={whatsappBase} target="_blank" rel="noreferrer">Hubungi Kami</a>
				</div>
			</div>
			<div class="card panel">
				{#each category.highlights as highlight}
					<div class="item">
						<span>{category.icon}</span>
						<strong>{highlight}</strong>
					</div>
				{/each}
			</div>
		</div>
	</section>
{/if}

<style>
	.grid {
		display: grid;
		gap: 1.5rem;
	}

	.panel {
		padding: 1.5rem;
		display: grid;
		gap: 1rem;
	}

	.item {
		display: flex;
		align-items: center;
		gap: 0.85rem;
		padding: 1rem;
		border-radius: var(--radius-sm);
		background: rgba(10, 92, 138, 0.05);
	}

	.item span {
		font-size: 1.8rem;
	}

	@media (min-width: 768px) {
		.grid {
			grid-template-columns: 1.1fr 0.9fr;
		}
	}
</style>
