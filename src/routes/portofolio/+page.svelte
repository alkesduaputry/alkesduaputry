<script lang="ts">
	import { portfolioItems, whatsappBase } from '$lib/data/products';
</script>

<svelte:head>
	<title>Portofolio | AlkesDuaPutry</title>
</svelte:head>

<section class="section">
	<div class="container">
		<span class="eyebrow">Portofolio</span>
		<h1 class="section-title">Pengadaan alat kesehatan untuk klinik, rumah sakit, dan institusi.</h1>
		<p class="section-copy">
			Beberapa contoh kebutuhan yang kami dukung mencakup pengadaan hospital bed, bundling alat medis,
			serta distribusi rapid test untuk proyek berskala institusi.
		</p>
		<div class="grid">
			{#each portfolioItems as item, index}
				<article class="card case">
					<div class="number">0{index + 1}</div>
					<h2>{item.title}</h2>
					<p>{item.copy}</p>
				</article>
			{/each}
		</div>
		<div class="button-row">
			<a class="btn btn-primary" href={whatsappBase} target="_blank" rel="noreferrer">Diskusikan Kebutuhan Anda</a>
		</div>
	</div>
</section>

<style>
	.grid {
		margin: 2rem 0;
		display: grid;
		gap: 1.25rem;
	}

	.case {
		padding: 1.5rem;
	}

	.number {
		font-size: 0.8rem;
		font-weight: 700;
		color: var(--color-primary);
		letter-spacing: 0.16em;
	}

	h2 {
		font-family: 'Fraunces', serif;
	}

	p {
		color: var(--color-muted);
		line-height: 1.75;
	}

	@media (min-width: 768px) {
		.grid {
			grid-template-columns: repeat(3, minmax(0, 1fr));
		}
	}
</style>
