<script lang="ts">
	import { googleReviews } from '$lib/data/products';
</script>

<section class="section reviews">
	<div class="container">
		<span class="eyebrow">Review Google</span>
		<h2 class="section-title">Ulasan yang menyorot kecepatan supply, service, dan instalasi.</h2>
		<div class="grid">
			{#each googleReviews as review}
				<article class="card review-card">
					<div class="top">
						<div class="avatar">{review.initials}</div>
						<div class="who">
							<strong>{review.name}</strong>
							<span>{review.date}</span>
						</div>
						<div class="google">G</div>
					</div>
					<div class="stars" aria-label="5 bintang">★★★★★</div>
					<p>{review.review}</p>
				</article>
			{/each}
		</div>
	</div>
</section>

<style>
	.reviews {
		background: rgba(255, 255, 255, 0.45);
	}

	.grid {
		margin-top: 2rem;
		display: grid;
		gap: 1rem;
	}

	.review-card {
		padding: 1.35rem;
	}

	.top {
		display: grid;
		grid-template-columns: auto 1fr auto;
		align-items: center;
		gap: 0.85rem;
	}

	.avatar,
	.google {
		width: 2.9rem;
		height: 2.9rem;
		display: grid;
		place-items: center;
		border-radius: 999px;
		font-weight: 700;
	}

	.avatar {
		background: rgba(10, 92, 138, 0.08);
		color: var(--color-primary);
	}

	.google {
		background: linear-gradient(135deg, #4285f4, #34a853);
		color: var(--color-white);
	}

	.who span {
		display: block;
		margin-top: 0.2rem;
		color: var(--color-muted);
		font-size: 0.92rem;
	}

	.stars {
		margin: 1rem 0 0.85rem;
		color: var(--color-accent);
		letter-spacing: 0.18em;
		font-size: 1rem;
	}

	p {
		margin: 0;
		color: var(--color-muted);
		line-height: 1.8;
	}

	@media (min-width: 768px) {
		.grid {
			grid-template-columns: repeat(3, minmax(0, 1fr));
		}
	}
</style>
