<script lang="ts">
	import { testimonials } from '$lib/data/products';

	const trackItems = [...testimonials, ...testimonials];
</script>

<section class="section">
	<div class="container">
		<span class="eyebrow">Testimoni</span>
		<h2 class="section-title">Cerita pelanggan yang menilai kualitas produk dan kecepatan layanan kami.</h2>
		<div class="ticker">
			<div class="track">
				{#each trackItems as item}
					<article class="card testimonial">
						<div class="quote-mark">“</div>
						<p>{item.quote}</p>
						<div class="person">
							<strong>{item.name}</strong>
							<span>{item.role}</span>
						</div>
					</article>
				{/each}
			</div>
		</div>
	</div>
</section>

<style>
	.ticker {
		margin-top: 2rem;
		overflow: hidden;
	}

	.track {
		display: flex;
		gap: 1rem;
		width: max-content;
		animation: scroll-left 34s linear infinite;
	}

	.testimonial {
		width: min(86vw, 360px);
		padding: 1.4rem;
	}

	.quote-mark {
		font-family: 'Fraunces', serif;
		font-size: 3.5rem;
		line-height: 1;
		color: rgba(10, 92, 138, 0.18);
	}

	p {
		margin: 0.2rem 0 1.2rem;
		color: var(--color-muted);
		line-height: 1.75;
	}

	.person span {
		display: block;
		margin-top: 0.2rem;
		color: var(--color-primary);
		font-size: 0.94rem;
	}

	@keyframes scroll-left {
		from {
			transform: translateX(0);
		}

		to {
			transform: translateX(-50%);
		}
	}

	@media (min-width: 1024px) {
		.testimonial {
			width: 520px;
		}
	}
</style>
