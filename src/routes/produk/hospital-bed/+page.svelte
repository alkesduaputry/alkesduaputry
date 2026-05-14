<script lang="ts">
	import { latestProducts, whatsappBase } from '$lib/data/products';
</script>

<svelte:head>
	<title>Hospital Bed Premium | AlkesDuaPutry</title>
</svelte:head>

<section class="section">
	<div class="container">
		<span class="eyebrow">Produk</span>
		<h1 class="section-title">Hospital Bed Premium</h1>
		<p class="section-copy">
			Pilihan ranjang pasien manual dan elektrik untuk rumah sakit, klinik, maupun kebutuhan homecare
			dengan spesifikasi yang siap dipresentasikan ke tim procurement.
		</p>
		<div class="grid">
			{#each latestProducts as product}
				<article class="card product">
					<div class="badge">{product.badge}</div>
					<h2>{product.name}</h2>
					<p>{product.description}</p>
					<ul>
						{#each product.features as feature}
							<li>{feature}</li>
						{/each}
					</ul>
					<a class="btn btn-primary" href={whatsappBase} target="_blank" rel="noreferrer">Hubungi Kami</a>
				</article>
			{/each}
		</div>
	</div>
</section>

<style>
	.grid {
		margin-top: 2rem;
		display: grid;
		gap: 1.25rem;
	}

	.product {
		padding: 1.5rem;
	}

	.badge {
		display: inline-flex;
		padding: 0.45rem 0.8rem;
		border-radius: 999px;
		background: rgba(232, 160, 32, 0.16);
		color: #8a5a00;
		font-size: 0.8rem;
		font-weight: 700;
	}

	h2 {
		margin: 1rem 0 0.75rem;
		font-family: 'Fraunces', serif;
	}

	p,
	li {
		color: var(--color-muted);
		line-height: 1.7;
	}

	ul {
		padding-left: 1.1rem;
		margin: 0 0 1.5rem;
	}

	@media (min-width: 768px) {
		.grid {
			grid-template-columns: repeat(3, minmax(0, 1fr));
		}
	}
</style>
