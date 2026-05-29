<script lang="ts">
	import { whatsappBase } from '$lib/data/products';

	const galleryImages = [
		{
			src: 'https://files.alkesduaputry.com/Slider/kegiatan%20Gudang%20Alkesduaputry%20(4).jpeg',
			alt: 'Aktivitas gudang Alkes Dua Putry dalam penataan alat kesehatan'
		},
		{
			src: 'https://files.alkesduaputry.com/Slider/kegiatan%20Gudang%20Alkesduaputry%20(7).jpeg',
			alt: 'Tim Alkes Dua Putry melakukan pengecekan produk di gudang'
		},
		{
			src: 'https://files.alkesduaputry.com/Slider/kegiatan%20Gudang%20Alkesduaputry%20(1).jpeg',
			alt: 'Area penyimpanan produk alat kesehatan Alkes Dua Putry'
		},
		{
			src: 'https://files.alkesduaputry.com/Slider/kegiatan%20Gudang%20Alkesduaputry%20(8).jpeg',
			alt: 'Produk alat kesehatan dan hospital furniture siap dikirim'
		},
		{
			src: 'https://files.alkesduaputry.com/Slider/kegiatan%20Gudang%20Alkesduaputry%20(11).jpeg',
			alt: 'Kegiatan operasional gudang Alkes Dua Putry'
		}
	];

	const servicePoints = [
		'Konsultasi kebutuhan produk untuk klinik, rumah sakit, laboratorium, dan pengadaan institusi.',
		'Konfirmasi stok, spesifikasi, dokumen pendukung, garansi, dan estimasi pengiriman sebelum transaksi.',
		'Koordinasi pengemasan dan pengiriman untuk produk besar, berat, atau rawan benturan.',
		'Informasi produk disampaikan secara jelas tanpa klaim medis yang berlebihan.'
	];
</script>

<svelte:head>
	<title>Tentang Kami | Alkes Dua Putry</title>
	<meta
		name="description"
		content="Profil Alkes Dua Putry, penyedia alat kesehatan non-obat dan hospital furniture dengan layanan konsultasi pengadaan, pengecekan produk, dan koordinasi pengiriman profesional."
	/>
	<link rel="canonical" href="https://alkesduaputry.com/tentang-kami" />
</svelte:head>

<section class="hero-about">
	<div class="container hero-grid">
		<div class="hero-copy">
			<span class="eyebrow">Tentang Kami</span>
			<h1>Partner pengadaan alat kesehatan yang rapi dan responsif.</h1>
			<p>
				Alkes Dua Putry membantu kebutuhan alat kesehatan non-obat, hospital furniture, trolley
				medis, lemari instrumen, serta perlengkapan klinik dan rumah sakit. Kami mendampingi
				pelanggan dari pemilihan produk, konfirmasi dokumen, hingga koordinasi pengiriman.
			</p>
			<div class="button-row">
				<a class="btn btn-primary" href={whatsappBase} target="_blank" rel="noreferrer">Konsultasi Pengadaan</a>
				<a class="btn btn-outline-dark" href="/produk">Lihat Produk</a>
			</div>
		</div>

		<div class="hero-media">
			<img src={galleryImages[0].src} alt={galleryImages[0].alt} />
			<div class="media-badge">
				<strong>PT Mitra Medika Farma</strong>
				<span>Ruko Asera Blok 1S 20 No.17, Harapan Indah, Bekasi</span>
			</div>
		</div>
	</div>
</section>

<section class="section intro-section">
	<div class="container intro-grid">
		<div>
			<span class="eyebrow">Profil Perusahaan</span>
			<h2 class="section-title">Fokus pada kebutuhan pengadaan medis non-obat.</h2>
		</div>
		<div class="intro-copy">
			<p>
				Kami melayani pelanggan profesional yang membutuhkan produk dengan informasi jelas,
				komunikasi cepat, dan proses transaksi yang tertata. Setiap permintaan dibantu melalui
				pengecekan ketersediaan, spesifikasi produk, pilihan pengiriman, serta ketentuan garansi
				yang berlaku.
			</p>
			<p>
				Untuk pengadaan dalam jumlah besar atau produk berukuran besar, tim kami membantu
				koordinasi agar proses pemesanan, pembayaran, pengemasan, dan pengiriman berjalan lebih
				terkontrol.
			</p>
		</div>
	</div>
</section>

<section class="section gallery-section">
	<div class="container">
		<div class="section-head">
			<span class="eyebrow">Dokumentasi</span>
			<h2 class="section-title">Aktivitas gudang dan penanganan produk</h2>
			<p class="section-copy">
				Galeri ini menampilkan gambaran operasional Alkes Dua Putry dalam menata, mengecek, dan
				menyiapkan produk sebelum dikirim kepada pelanggan.
			</p>
		</div>

		<div class="gallery-grid">
			{#each galleryImages as image, index}
				<figure class:featured={index === 0}>
					<img src={image.src} alt={image.alt} loading={index === 0 ? 'eager' : 'lazy'} />
				</figure>
			{/each}
		</div>
	</div>
</section>

<section class="section">
	<div class="container service-grid">
		<div class="service-panel">
			<span class="eyebrow">Layanan</span>
			<h2>Yang kami bantu dalam proses pengadaan</h2>
			<p>
				Alkes Dua Putry menempatkan kejelasan informasi sebagai bagian penting dari layanan,
				terutama untuk produk yang membutuhkan ukuran, dokumen, dan pengiriman khusus.
			</p>
		</div>

		<div class="point-list">
			{#each servicePoints as point}
				<div class="point">
					<span></span>
					<p>{point}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<section class="section cta-section">
	<div class="container cta-strip">
		<div>
			<span class="eyebrow">Konsultasi</span>
			<h2>Diskusikan kebutuhan alat kesehatan Anda dengan admin kami.</h2>
		</div>
		<a class="btn btn-accent" href={whatsappBase} target="_blank" rel="noreferrer">Hubungi WhatsApp</a>
	</div>
</section>

<style>
	.hero-about {
		padding: 52px 0 36px;
	}

	.hero-grid,
	.intro-grid,
	.service-grid,
	.cta-strip {
		display: grid;
		gap: 1.5rem;
	}

	.hero-copy {
		display: grid;
		gap: 1rem;
		align-content: center;
	}

	h1 {
		margin: 0;
		max-width: 12ch;
		font-family: 'Fraunces', serif;
		font-size: clamp(2.7rem, 9vw, 5.2rem);
		line-height: 1;
	}

	.hero-copy p,
	.intro-copy p,
	.service-panel p {
		margin: 0;
		color: var(--color-muted);
		line-height: 1.75;
	}

	.hero-media {
		position: relative;
		min-height: 320px;
		overflow: hidden;
		border: 1px solid var(--color-border);
		border-radius: 8px;
		background: var(--color-white);
		box-shadow: var(--shadow-soft);
	}

	.hero-media img,
	.gallery-grid img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.media-badge {
		position: absolute;
		left: 1rem;
		right: 1rem;
		bottom: 1rem;
		display: grid;
		gap: 0.3rem;
		padding: 0.9rem 1rem;
		border-radius: 8px;
		background: rgba(255, 255, 255, 0.94);
		box-shadow: 0 12px 28px rgba(8, 27, 42, 0.16);
	}

	.media-badge strong,
	.media-badge span {
		line-height: 1.45;
	}

	.media-badge span {
		color: var(--color-muted);
		font-size: 0.92rem;
	}

	.intro-section,
	.gallery-section {
		background: rgba(10, 92, 138, 0.05);
	}

	.intro-copy {
		display: grid;
		gap: 1rem;
	}

	.section-head {
		display: grid;
		gap: 0.8rem;
		max-width: 760px;
		margin-bottom: 1.5rem;
	}

	.section-head .section-title {
		margin-bottom: 0;
	}

	.gallery-grid {
		display: grid;
		gap: 0.9rem;
	}

	figure {
		margin: 0;
		overflow: hidden;
		aspect-ratio: 4 / 3;
		border: 1px solid var(--color-border);
		border-radius: 8px;
		background: var(--color-white);
		box-shadow: var(--shadow-card);
	}

	.service-panel {
		display: grid;
		gap: 1rem;
		align-content: start;
		padding: 1.2rem;
		border: 1px solid var(--color-border);
		border-radius: 8px;
		background: #081b2a;
		color: var(--color-white);
	}

	.service-panel h2,
	.cta-strip h2 {
		margin: 0;
		font-size: clamp(1.7rem, 4vw, 2.6rem);
		line-height: 1.15;
	}

	.service-panel p {
		color: rgba(255, 255, 255, 0.78);
	}

	.point-list {
		display: grid;
		gap: 0.85rem;
	}

	.point {
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 0.85rem;
		align-items: start;
		padding: 1rem;
		border: 1px solid var(--color-border);
		border-radius: 8px;
		background: var(--color-white);
		box-shadow: var(--shadow-card);
	}

	.point span {
		width: 0.78rem;
		height: 0.78rem;
		margin-top: 0.45rem;
		border-radius: 999px;
		background: var(--color-accent);
		box-shadow: 0 0 0 6px rgba(232, 160, 32, 0.14);
	}

	.point p {
		margin: 0;
		color: var(--color-muted);
		line-height: 1.7;
	}

	.cta-section {
		padding-top: 0;
	}

	.cta-strip {
		align-items: center;
		padding: 1.2rem;
		border-radius: 8px;
		background: var(--color-white);
		border: 1px solid var(--color-border);
		box-shadow: var(--shadow-soft);
	}

	@media (min-width: 640px) {
		.gallery-grid {
			grid-template-columns: repeat(2, 1fr);
		}

		figure.featured {
			grid-column: span 2;
			aspect-ratio: 16 / 8;
		}
	}

	@media (min-width: 900px) {
		.hero-grid,
		.intro-grid,
		.service-grid {
			grid-template-columns: 1fr 1fr;
			align-items: center;
		}

		.hero-media {
			min-height: 520px;
		}

		.gallery-grid {
			grid-template-columns: 1.2fr 1fr 1fr;
		}

		figure.featured {
			grid-row: span 2;
			grid-column: auto;
			aspect-ratio: auto;
		}

		.cta-strip {
			grid-template-columns: 1fr auto;
			padding: 1.5rem;
		}
	}
</style>
