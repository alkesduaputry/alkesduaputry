<script lang="ts">
	import { onMount } from 'svelte';

	const items = [
		{ icon: '👩‍⚕️', title: 'Tim Berpengalaman & Profesional' },
		{ icon: '📦', title: 'Stok Lengkap & Selalu Ready' },
		{ icon: '🛠️', title: 'Free Demo & Training Merakit Hospital Furniture' },
		{ icon: '⚡', title: 'Penanganan Komplain Cepat' }
	];

	let section: HTMLElement | null = null;

	onMount(() => {
		void (async () => {
			const { gsap } = await import('gsap');
			const { ScrollTrigger } = await import('gsap/dist/ScrollTrigger');
			gsap.registerPlugin(ScrollTrigger);

			const cards = section?.querySelectorAll('.advantage-card');
			if (cards && cards.length > 0) {
				gsap.fromTo(
					cards,
					{ opacity: 0, y: 30 },
					{
						opacity: 1,
						y: 0,
						duration: 0.6,
						stagger: 0.15,
						scrollTrigger: {
							trigger: section,
							start: 'top 80%',
							once: true
						}
					}
				);
			}
		})();
	});
</script>

<section class="section" bind:this={section}>
	<div class="container">
		<span class="eyebrow">Mengapa Kami Dipercaya</span>
		<h2 class="section-title">Layanan yang responsif dengan dukungan tim yang paham kebutuhan alat kesehatan.</h2>
		<div class="grid">
			{#each items as item}
				<article class="card advantage-card">
					<div class="icon">{item.icon}</div>
					<h3>{item.title}</h3>
				</article>
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

	.advantage-card {
		padding: 1.4rem;
		background:
			linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(247, 249, 252, 1)),
			var(--color-white);
	}

	.icon {
		width: 3.25rem;
		height: 3.25rem;
		display: grid;
		place-items: center;
		border-radius: 1rem;
		background: rgba(10, 92, 138, 0.08);
		font-size: 1.65rem;
	}

	h3 {
		margin: 1rem 0 0;
		font-size: 1.05rem;
		line-height: 1.6;
	}

	@media (min-width: 768px) {
		.grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	@media (min-width: 1024px) {
		.grid {
			grid-template-columns: repeat(4, minmax(0, 1fr));
		}
	}
</style>
