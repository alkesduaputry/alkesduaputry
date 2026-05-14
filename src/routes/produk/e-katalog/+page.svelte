<script lang="ts">
	import { productCategories, whatsappBase } from '$lib/data/products';

	const category = productCategories.find((item) => item.slug === 'e-katalog');
</script>

<svelte:head>
	<title>E-Katalog LKPP | AlkesDuaPutry</title>
</svelte:head>

{#if category}
	<section class="section">
		<div class="container content">
			<div>
				<span class="eyebrow">Produk</span>
				<h1 class="section-title">{category.title}</h1>
				<p class="section-copy">{category.description}</p>
			</div>
			<div class="card box">
				<h2>Yang kami bantu</h2>
				<ul>
					{#each category.highlights as highlight}
						<li>{highlight}</li>
					{/each}
				</ul>
				<a class="btn btn-accent" href={whatsappBase} target="_blank" rel="noreferrer">Konsultasikan Pengadaan</a>
			</div>
		</div>
	</section>
{/if}

<style>
	.content {
		display: grid;
		gap: 1.5rem;
	}

	.box {
		padding: 1.5rem;
	}

	h2 {
		margin-top: 0;
		font-family: 'Fraunces', serif;
	}

	ul {
		margin: 0 0 1.5rem;
		padding-left: 1.1rem;
		color: var(--color-muted);
		line-height: 1.8;
	}

	@media (min-width: 768px) {
		.content {
			grid-template-columns: 1.2fr 0.8fr;
			align-items: start;
		}
	}
</style>
