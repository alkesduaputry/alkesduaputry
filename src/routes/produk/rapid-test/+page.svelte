<script lang="ts">
	import { productCategories, whatsappBase } from '$lib/data/products';

	const category = productCategories.find((item) => item.slug === 'rapid-test');
</script>

<svelte:head>
	<title>Rapid Diagnostic Test | AlkesDuaPutry</title>
</svelte:head>

{#if category}
	<section class="section">
		<div class="container wrapper">
			<div class="hero card">
				<div class="icon">{category.icon}</div>
				<div>
					<span class="eyebrow">Produk</span>
					<h1 class="section-title">{category.title}</h1>
					<p class="section-copy">{category.description}</p>
				</div>
			</div>
			<div class="highlights">
				{#each category.highlights as highlight}
					<div class="card item">{highlight}</div>
				{/each}
			</div>
			<a class="btn btn-primary" href={whatsappBase} target="_blank" rel="noreferrer">Minta Penawaran</a>
		</div>
	</section>
{/if}

<style>
	.wrapper {
		display: grid;
		gap: 1.25rem;
	}

	.hero {
		padding: 1.5rem;
		display: grid;
		gap: 1rem;
	}

	.icon {
		width: 4rem;
		height: 4rem;
		display: grid;
		place-items: center;
		border-radius: 1.25rem;
		background: rgba(10, 92, 138, 0.08);
		font-size: 2rem;
	}

	.highlights {
		display: grid;
		gap: 1rem;
	}

	.item {
		padding: 1.25rem;
		font-weight: 600;
	}

	@media (min-width: 768px) {
		.highlights {
			grid-template-columns: repeat(3, minmax(0, 1fr));
		}
	}
</style>
