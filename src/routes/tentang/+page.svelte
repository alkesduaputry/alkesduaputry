<script lang="ts">
	import { whatsappBase } from '$lib/data/products';
</script>

<svelte:head>
	<title>Tentang Kami | AlkesDuaPutry</title>
</svelte:head>

<section class="section">
	<div class="container about">
		<div class="copy">
			<span class="eyebrow">Tentang Kami</span>
			<h1 class="section-title">PT Mitra Medika Farma menghadirkan pengadaan alat kesehatan yang rapi, cepat, dan terverifikasi.</h1>
			<p class="section-copy">
				AlkesDuaPutry terinspirasi dari pendekatan SkrinMe sebagai distributor alat kesehatan yang
				mengutamakan kualitas produk dan kepuasan pelanggan. Kami mendampingi kebutuhan klinik,
				rumah sakit, laboratorium, perusahaan, hingga institusi pemerintahan dengan produk berizin
				resmi serta proses pengiriman yang responsif.
			</p>
			<p class="section-copy">
				Tim kami terbiasa menangani pembelian satuan hingga paket bundling. Dukungan konsultasi,
				demo produk, training perakitan, dan after sales menjadi bagian dari layanan utama agar
				pengadaan tidak berhenti di tahap pembelian saja.
			</p>
			<div class="button-row">
				<a class="btn btn-primary" href={whatsappBase} target="_blank" rel="noreferrer">Konsultasi via WhatsApp</a>
			</div>
		</div>
		<div class="panel card">
			<div class="stat">
				<strong>Produk Berizin Resmi</strong>
				<span>AKL, AKD, S-IDAK, dan dukungan pengadaan e-katalog.</span>
			</div>
			<div class="stat">
				<strong>Tim Berpengalaman</strong>
				<span>Respons cepat untuk konsultasi, pengadaan, pengiriman, dan training.</span>
			</div>
			<div class="stat">
				<strong>Layanan End-to-End</strong>
				<span>Mulai dari pencarian produk, penawaran, pembayaran, hingga instalasi.</span>
			</div>
		</div>
	</div>
</section>

<style>
	.about {
		display: grid;
		gap: 1.5rem;
	}

	.copy {
		display: grid;
		gap: 1rem;
	}

	.panel {
		padding: 1.5rem;
		display: grid;
		gap: 1rem;
		background: linear-gradient(180deg, rgba(10, 92, 138, 0.06), rgba(255, 255, 255, 0.95));
	}

	.stat {
		padding: 1.1rem 1.2rem;
		border-radius: var(--radius-sm);
		background: var(--color-white);
		border: 1px solid var(--color-border);
	}

	.stat strong {
		display: block;
		margin-bottom: 0.35rem;
	}

	.stat span {
		color: var(--color-muted);
		line-height: 1.7;
	}

	@media (min-width: 768px) {
		.about {
			grid-template-columns: 1.3fr 0.9fr;
			align-items: start;
		}
	}
</style>
