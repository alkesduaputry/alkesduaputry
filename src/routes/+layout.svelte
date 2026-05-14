<script lang="ts">
	import '../app.css';
	import Footer from '$lib/components/Footer.svelte';
	import favicon from '$lib/assets/favicon.svg';
	import Navbar from '$lib/components/Navbar.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>AlkesDuaPutry | Distributor Alat Kesehatan</title>
</svelte:head>

<Navbar />
<main>
	{@render children()}
</main>
<Footer />
