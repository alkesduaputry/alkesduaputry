<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	onMount(() => {
		goto('/tentang-kami', { replaceState: true });
	});
</script>

<svelte:head>
	<title>Tentang Kami | Alkes Dua Putry</title>
	<meta http-equiv="refresh" content="0; url=/tentang-kami" />
</svelte:head>

<section class="section">
	<div class="container">
		<p>Mengarahkan ke <a href="/tentang-kami">Tentang Kami</a>.</p>
	</div>
</section>
