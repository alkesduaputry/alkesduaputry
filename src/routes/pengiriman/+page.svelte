<script lang="ts">
	import { whatsappBase } from '$lib/data/products';
</script>

<svelte:head>
	<title>Kebijakan Pengiriman | Alkes Duaputry</title>
	<meta
		name="description"
		content="Informasi pengiriman produk alat kesehatan di Alkes Duaputry, termasuk area layanan, estimasi pengiriman, dan biaya kirim."
	/>
	<link rel="canonical" href="https://alkesduaputry.com/pengiriman" />
</svelte:head>

<section class="section">
	<div class="container policy">
		<span class="eyebrow">Pengiriman</span>
		<h1>Kebijakan Pengiriman</h1>
		<p class="lead">
			Informasi ini menjelaskan area layanan, estimasi pengiriman, dan konfirmasi biaya kirim
			untuk pembelian produk alat kesehatan di Alkes Duaputry.
		</p>

		<div class="summary-grid">
			<div>
				<span>Area layanan</span>
				<strong>Indonesia</strong>
			</div>
			<div>
				<span>Biaya kirim</span>
				<strong>Dikonfirmasi sebelum transaksi final</strong>
			</div>
			<div>
				<span>Produk besar</span>
				<strong>Membutuhkan konfirmasi packing dan logistik</strong>
			</div>
		</div>

		<div class="content">
			<section>
				<h2>Area Pengiriman</h2>
				<p>
					Alkes Duaputry melayani pengiriman ke wilayah Indonesia. Ketersediaan layanan
					pengiriman bergantung pada alamat tujuan, jenis produk, ukuran barang, berat barang,
					dan layanan ekspedisi atau logistik yang tersedia.
				</p>
			</section>

			<section>
				<h2>Metode Pengiriman</h2>
				<p>
					Pengiriman dilakukan menggunakan ekspedisi, kurir, atau layanan logistik yang sesuai
					dengan karakter produk. Produk besar seperti hospital bed, lemari instrumen, trolley,
					dan hospital furniture dapat membutuhkan konfirmasi khusus terkait armada, packing,
					asuransi, atau akses lokasi.
				</p>
			</section>

			<section>
				<h2>Biaya Kirim</h2>
				<p>
					Biaya pengiriman atau ongkir dikonfirmasi sebelum transaksi final jika belum tersedia
					melalui proses checkout otomatis. Pelanggan dapat menghubungi admin melalui WhatsApp
					untuk meminta estimasi ongkir berdasarkan alamat tujuan dan jenis produk.
				</p>
			</section>

			<section>
				<h2>Estimasi Pengiriman</h2>
				<p>
					Estimasi waktu pengiriman bergantung pada lokasi pelanggan, jenis produk, jadwal
					ekspedisi, kebutuhan packing, serta kondisi operasional pihak logistik. Admin akan
					menginformasikan estimasi yang tersedia setelah detail pesanan dan alamat tujuan
					dikonfirmasi.
				</p>
			</section>

			<section>
				<h2>Pemeriksaan Saat Barang Diterima</h2>
				<p>
					Pelanggan disarankan memeriksa kondisi kemasan dan produk saat diterima. Jika ditemukan
					kerusakan atau ketidaksesuaian, segera hubungi admin agar dapat dibantu sesuai
					kebijakan pengembalian barang.
				</p>
			</section>
		</div>

		<a class="btn btn-accent" href={whatsappBase} target="_blank" rel="noreferrer">
			Tanya Estimasi Ongkir via WhatsApp
		</a>
	</div>
</section>

<style>
	.policy {
		max-width: 920px;
	}

	h1 {
		margin: 1rem 0;
		font-family: 'Fraunces', serif;
		font-size: clamp(2.4rem, 5vw, 4rem);
		line-height: 1.08;
	}

	.lead,
	p {
		margin: 0;
		color: var(--color-muted);
		line-height: 1.8;
	}

	.summary-grid {
		display: grid;
		gap: 0.9rem;
		margin: 2rem 0;
	}

	.summary-grid div {
		padding: 1.1rem;
		border: 1px solid var(--color-border);
		border-radius: 8px;
		background: var(--color-white);
		box-shadow: 0 10px 24px rgba(10, 92, 138, 0.08);
	}

	.summary-grid span {
		display: block;
		margin-bottom: 0.35rem;
		color: var(--color-primary);
		font-size: 0.78rem;
		font-weight: 700;
		text-transform: uppercase;
	}

	.summary-grid strong {
		color: var(--color-text);
		line-height: 1.45;
	}

	.content {
		display: grid;
		gap: 1.6rem;
		margin-bottom: 2rem;
	}

	section {
		padding-top: 1.3rem;
		border-top: 1px solid var(--color-border);
	}

	h2 {
		margin: 0 0 0.75rem;
		font-size: 1.28rem;
		line-height: 1.35;
	}

	@media (min-width: 720px) {
		.summary-grid {
			grid-template-columns: repeat(3, minmax(0, 1fr));
		}
	}
</style>
