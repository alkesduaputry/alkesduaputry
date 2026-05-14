<script lang="ts">
	import { latestProducts, whatsappBase } from '$lib/data/products';
</script>

<section class="section">
	<div class="container">
		<span class="eyebrow">Produk Terbaru</span>
		<h2 class="section-title">Hospital bed pasien dengan konfigurasi manual dan elektrik.</h2>
		<div class="grid">
			{#each latestProducts as product}
				<article class="card product">
					<div class="preview">
						<span>🏥</span>
						<div class="badge">{product.badge}</div>
					</div>
					<h3>{product.name} ({product.sku})</h3>
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
		padding: 1.25rem;
	}

	.preview {
		position: relative;
		min-height: 180px;
		display: grid;
		place-items: center;
		border-radius: 1.4rem;
		background:
			linear-gradient(135deg, rgba(10, 92, 138, 0.1), rgba(232, 160, 32, 0.14)),
			var(--color-off-white);
	}

	.preview span {
		font-size: 4.4rem;
	}

	.badge {
		position: absolute;
		left: 1rem;
		top: 1rem;
		padding: 0.4rem 0.7rem;
		border-radius: 999px;
		background: rgba(232, 160, 32, 0.18);
		color: #8a5a00;
		font-size: 0.78rem;
		font-weight: 700;
	}

	h3 {
		margin: 1rem 0 0.7rem;
		font-family: 'Fraunces', serif;
		font-size: 1.35rem;
	}

	p,
	li {
		color: var(--color-muted);
		line-height: 1.75;
	}

	ul {
		padding-left: 1.1rem;
		margin: 0 0 1.4rem;
	}

	@media (min-width: 768px) {
		.grid {
			grid-template-columns: repeat(3, minmax(0, 1fr));
		}
	}
</style>
