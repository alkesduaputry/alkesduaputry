<script lang="ts">
	import { whatsappBase } from '$lib/data/products';
</script>

<svelte:head>
	<title>Kontak | Alkes Dua Putry</title>
	<meta
		name="description"
		content="Hubungi Alkes Dua Putry untuk konsultasi alat kesehatan non-obat, hospital furniture, stok produk, pengiriman, dan penawaran resmi."
	/>
	<link rel="canonical" href="https://alkesduaputry.com/kontak" />
</svelte:head>

<section class="section">
	<div class="container contact">
		<div>
			<span class="eyebrow">Kontak</span>
			<h1 class="section-title">Diskusikan kebutuhan alat kesehatan dan hospital furniture.</h1>
			<p class="section-copy">
				Untuk katalog, stok, harga terbaru, dokumen produk, dan estimasi pengiriman, hubungi admin
				melalui WhatsApp atau email.
			</p>
		</div>
		<div class="panel">
			<div>
				<strong>WhatsApp</strong>
				<a href={whatsappBase} target="_blank" rel="noreferrer">+62 857-8019-9904</a>
			</div>
			<div>
				<strong>Email</strong>
				<a href="mailto:adm88.mmf@gmail.com">adm88.mmf@gmail.com</a>
				<a href="mailto:fnc88.mmf@gmail.com">fnc88.mmf@gmail.com</a>
			</div>
			<div>
				<strong>Alamat</strong>
				<p>Ruko Asera Blok 1S 20 No.17, Harapan Indah, Bekasi</p>
			</div>
			<div>
				<strong>Jam Operasional</strong>
				<p>Senin-Sabtu, 08.00-17.00 WIB</p>
			</div>
			<a class="btn btn-accent" href={whatsappBase} target="_blank" rel="noreferrer">Chat WhatsApp</a>
		</div>
	</div>
</section>

<style>
	.contact {
		display: grid;
		gap: 1.5rem;
	}

	.panel {
		display: grid;
		gap: 1rem;
		padding: 1.2rem;
		border: 1px solid var(--color-border);
		border-radius: 8px;
		background: var(--color-white);
		box-shadow: var(--shadow-card);
	}

	.panel div {
		display: grid;
		gap: 0.25rem;
	}

	p,
	a {
		margin: 0;
		color: var(--color-muted);
		line-height: 1.75;
	}

	@media (min-width: 768px) {
		.contact {
			grid-template-columns: 1.1fr 0.9fr;
		}
	}
</style>
