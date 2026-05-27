<script lang="ts">
	import { whatsappBase } from '$lib/data/products';
</script>

<svelte:head>
	<title>Tentang Kami | Alkes Dua Putry</title>
	<meta
		name="description"
		content="Profil Alkes Dua Putry sebagai penyedia alat kesehatan non-obat, hospital furniture, dan kebutuhan pengadaan klinik serta rumah sakit."
	/>
	<link rel="canonical" href="https://alkesduaputry.com/tentang-kami" />
</svelte:head>

<section class="section">
	<div class="container about">
		<div>
			<span class="eyebrow">Tentang Kami</span>
			<h1 class="section-title">Penyedia alat kesehatan dan hospital furniture untuk fasilitas profesional.</h1>
			<p class="section-copy">
				Alkes Dua Putry berfokus pada pengadaan alat kesehatan non-obat, hospital furniture,
				trolley medis, lemari instrumen, dan peralatan klinik atau rumah sakit. Kami membantu
				pelanggan memahami pilihan produk, dokumen pendukung, pengiriman, dan ketentuan garansi.
			</p>
			<p class="section-copy">
				Area layanan dapat dikonsultasikan untuk Bekasi, Jabodetabek, dan pengiriman luar kota
				melalui ekspedisi atau armada yang sesuai dengan karakter produk.
			</p>
			<a class="btn btn-primary" href={whatsappBase} target="_blank" rel="noreferrer">Konsultasi Pengadaan</a>
		</div>
		<div class="panel">
			<strong>Komitmen Layanan</strong>
			<ul>
				<li>Copywriting produk netral tanpa klaim penyembuhan.</li>
				<li>Konfirmasi stok, harga, dokumen, dan garansi sebelum transaksi.</li>
				<li>Dukungan pemesanan produk besar dengan koordinasi pengiriman.</li>
				<li>Kebijakan retur yang memperhatikan keamanan dan higienitas produk alkes.</li>
			</ul>
		</div>
	</div>
</section>

<style>
	.about {
		display: grid;
		gap: 1.5rem;
	}

	.about > div:first-child {
		display: grid;
		gap: 1rem;
	}

	.panel {
		padding: 1.2rem;
		border: 1px solid var(--color-border);
		border-radius: 8px;
		background: var(--color-white);
		box-shadow: var(--shadow-card);
	}

	ul {
		margin: 0.75rem 0 0;
		padding-left: 1.2rem;
		color: var(--color-muted);
		line-height: 1.8;
	}

	@media (min-width: 768px) {
		.about {
			grid-template-columns: 1.25fr 0.75fr;
		}
	}
</style>
