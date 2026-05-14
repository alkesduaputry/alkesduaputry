<script lang="ts">
	import '../app.css';
	import brandIcon from '$lib/assets/brand-icon.png';
	import Footer from '$lib/components/Footer.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import { whatsappBase } from '$lib/data/products';

	let { children } = $props();

	const catalogWhatsapp =
		'https://api.whatsapp.com/send?phone=6281289808868&text=Halo,%20saya%20ingin%20minta%20katalog%20produk%20AlkesDuaPutry.';
</script>

<svelte:head>
	<link rel="icon" type="image/png" href={brandIcon} />
	<link rel="apple-touch-icon" href={brandIcon} />
	<title>AlkesDuaPutry | Distributor Alat Kesehatan</title>
</svelte:head>

<Navbar />
<main>
	{@render children()}
</main>
<a class="floating-wa" href={catalogWhatsapp || whatsappBase} target="_blank" rel="noreferrer">
	<img class="wa-icon" src={brandIcon} alt="Icon AlkesDuaPutry" />
	<span class="wa-copy">
		<strong>Hubungi WA</strong>
		<small>untuk minta katalog AlkesDuaPutry</small>
	</span>
</a>
<Footer />

<style>
	.floating-wa {
		position: fixed;
		right: 1rem;
		bottom: 1rem;
		z-index: 45;
		display: inline-flex;
		align-items: center;
		gap: 0.85rem;
		padding: 0.9rem 1.2rem 0.9rem 0.9rem;
		border-radius: 999px;
		background: linear-gradient(135deg, #25d366 0%, #119c4d 100%);
		color: var(--color-white);
		box-shadow: 0 18px 40px rgba(17, 156, 77, 0.32);
		max-width: min(92vw, 360px);
		transition:
			transform 0.22s ease,
			box-shadow 0.22s ease;
	}

	.floating-wa:hover {
		transform: translateY(-3px);
		box-shadow: 0 24px 46px rgba(17, 156, 77, 0.36);
	}

	.wa-icon {
		width: 3rem;
		height: 3rem;
		flex: 0 0 auto;
		border-radius: 999px;
		object-fit: cover;
		background: rgba(255, 255, 255, 0.95);
		padding: 0.14rem;
	}

	.wa-copy {
		display: grid;
	}

	.wa-copy strong,
	.wa-copy small {
		display: block;
	}

	.wa-copy strong {
		font-size: 1rem;
		line-height: 1.2;
	}

	.wa-copy small {
		margin-top: 0.15rem;
		font-size: 0.82rem;
		line-height: 1.35;
		color: rgba(255, 255, 255, 0.9);
	}

	@media (min-width: 768px) {
		.floating-wa {
			right: 1.5rem;
			bottom: 1.5rem;
			padding: 1rem 1.35rem 1rem 1rem;
		}
	}
</style>
