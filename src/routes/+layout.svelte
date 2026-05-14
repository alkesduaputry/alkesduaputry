<script lang="ts">
	import '../app.css';
	import brandIcon from '$lib/assets/brand-icon.png';
	import Footer from '$lib/components/Footer.svelte';
	import Navbar from '$lib/components/Navbar.svelte';

	let { children } = $props();
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
<Footer />
