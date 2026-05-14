<script lang="ts">
	import AlurTransaksi from '$lib/components/AlurTransaksi.svelte';
	import FormCTA from '$lib/components/FormCTA.svelte';
	import HeroSlider from '$lib/components/HeroSlider.svelte';
	import Keunggulan from '$lib/components/Keunggulan.svelte';
	import ProdukLainnya from '$lib/components/ProdukLainnya.svelte';
	import ProdukTerbaru from '$lib/components/ProdukTerbaru.svelte';
	import ReviewGoogle from '$lib/components/ReviewGoogle.svelte';
	import TentangKami from '$lib/components/TentangKami.svelte';
	import Testimoni from '$lib/components/Testimoni.svelte';
</script>

<svelte:head>
	<title>AlkesDuaPutry | Distributor Alat Kesehatan Berkualitas</title>
</svelte:head>

<HeroSlider />
<TentangKami />
<Keunggulan />
<ProdukTerbaru />
<ReviewGoogle />
<ProdukLainnya />
<AlurTransaksi />
<Testimoni />
<FormCTA />
