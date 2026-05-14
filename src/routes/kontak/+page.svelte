<script lang="ts">
	import { whatsappBase } from '$lib/data/products';
</script>

<svelte:head>
	<title>Kontak | AlkesDuaPutry</title>
</svelte:head>

<section class="section">
	<div class="container contact">
		<div>
			<span class="eyebrow">Kontak</span>
			<h1 class="section-title">Mari diskusikan kebutuhan alat kesehatan Anda.</h1>
			<p class="section-copy">
				Tim AlkesDuaPutry siap membantu penawaran, ketersediaan stok, produk bundling, demo, hingga
				pengadaan melalui e-katalog LKPP.
			</p>
		</div>
		<div class="card panel">
			<div>
				<strong>Alamat</strong>
				<p>Ruko Asera Blok 1S 20 No.17, Harapan Indah, Bekasi</p>
			</div>
			<div>
				<strong>WhatsApp</strong>
				<p>+62 812-8980-8868</p>
			</div>
			<div>
				<strong>Email</strong>
				<p>adm88.mmf@gmail.com<br />fnc88.mmf@gmail.com</p>
			</div>
			<a class="btn btn-accent" href={whatsappBase} target="_blank" rel="noreferrer">Chat Sekarang</a>
		</div>
	</div>
</section>

<style>
	.contact {
		display: grid;
		gap: 1.5rem;
	}

	.panel {
		padding: 1.5rem;
		display: grid;
		gap: 1rem;
	}

	p {
		margin: 0.35rem 0 0;
		color: var(--color-muted);
		line-height: 1.75;
	}

	@media (min-width: 768px) {
		.contact {
			grid-template-columns: 1.1fr 0.9fr;
			align-items: start;
		}
	}
</style>
