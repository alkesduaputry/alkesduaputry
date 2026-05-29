<script lang="ts">
	const imageBase = 'https://files.alkesduaputry.com/alkesduaputry/';
	const whatsappBase = 'https://wa.me/6285780199904';

	type Product = {
		name: string;
		image: string;
	};

	type Feature = {
		title: string;
		copy: string;
		image: string;
	};

	type Testimonial = {
		name: string;
		role: string;
		copy: string;
	};

	const makeProductLink = (productName: string) =>
		`${whatsappBase}?text=${encodeURIComponent(`Halo, saya tertarik dengan produk ${productName}`)}`;

	const features: Feature[] = [
		{
			title: 'Tim Profesional 24/7',
			copy: 'Admin siap membantu konsultasi kebutuhan alat kesehatan dan hospital furniture.',
			image: 'alkesduaputry_003_Sales-Icon-01.png'
		},
		{
			title: 'Harga Bersaing & Ready Stock',
			copy: 'Pilihan produk disiapkan untuk kebutuhan pengadaan yang cepat dan efisien.',
			image: 'alkesduaputry_004_Harga-Bersaing-Icon-1.png'
		},
		{
			title: 'Jangkauan se-Indonesia',
			copy: 'Pengiriman dapat dikoordinasikan untuk klinik, rumah sakit, dan fasilitas kesehatan.',
			image: 'alkesduaputry_005_Indonesia-Icon-05.png'
		},
		{
			title: 'Gratis Ongkir & Pemasangan',
			copy: 'Untuk produk dan area tertentu, tim kami bantu koordinasi pengiriman serta instalasi.',
			image: 'alkesduaputry_006_Pengiriman-Icon-01.png'
		},
		{
			title: 'After Sales Service',
			copy: 'Dukungan purna jual tersedia agar operasional fasilitas kesehatan tetap berjalan.',
			image: 'alkesduaputry_007_After-Sales-Icon-01.png'
		},
		{
			title: 'Garansi Kepuasan Pelanggan',
			copy: 'Setiap transaksi dikonfirmasi dengan jelas mulai dari stok, spesifikasi, hingga pengiriman.',
			image: 'alkesduaputry_008_Garansi-Icon-01.png'
		}
	];

	const hospitalBeds: Product[] = [
		{
			image: 'alkesduaputry_009_Untitled-design-34.png',
			name: 'Bed Pasien Manual 1 Crank'
		},
		{
			image: 'alkesduaputry_010_Untitled-design-21-1.png',
			name: 'Bed Pasien Manual 2 Crank'
		},
		{
			image: 'alkesduaputry_011_WEBSITE-2.png',
			name: 'Bed Pasien Manual 3 Crank'
		},
		{
			image: 'alkesduaputry_012_WEBSITE-19.png',
			name: 'Bed Pasien Manual 3 Crank Kupu'
		},
		{
			image: 'alkesduaputry_013_WEBSITE-4.png',
			name: 'Bed Pasien Elektrik 3 Motors'
		},
		{
			image: 'alkesduaputry_014_WEBSITE-13.png',
			name: 'Bed Pasien Elektrik Railing'
		},
		{
			image: 'alkesduaputry_015_7.png',
			name: 'Ambulance Transfer Stretcher'
		},
		{
			image: 'alkesduaputry_016_BED-3-CRANK-2.png',
			name: 'Bed Pasien Elektrik Kupu-kupu'
		},
		{
			image: 'alkesduaputry_017_BED-3-CRANK-1.png',
			name: 'Bed Pasien Elektrik Jari'
		},
		{
			image: 'alkesduaputry_018_Untitled-design-2025-01-09T115403.501.png',
			name: 'Ambulance Transfer Stretcher Orange'
		},
		{
			image: 'alkesduaputry_019_Untitled-design-98.png',
			name: 'Brankar Bed IGD'
		},
		{
			image: 'alkesduaputry_020_MEJA-PERIKSA-STANDARD-001.png',
			name: 'Meja Periksa Standard'
		},
		{
			image: 'alkesduaputry_021_MEJA-PERIKSA-ADVANCE-001.png',
			name: 'Meja Periksa Advance'
		},
		{
			image: 'alkesduaputry_022_MATRAS-IMPORT-MEDIUM-PREMIUM-001.png',
			name: 'Matras Import Medium & Premium'
		},
		{
			image: 'alkesduaputry_023_THT-INSTRUMENT-SET-1.png',
			name: 'Kasur Anti Decubitus'
		},
		{
			image: 'alkesduaputry_024_Meja-Tensi-Rumah-Sakit-SkrinMe-01.png',
			name: 'Meja Tensi'
		},
		{
			image: 'alkesduaputry_025_Baby-Table-Standard-SkrinMe-001.png',
			name: 'Baby Table Standard'
		},
		{
			image: 'alkesduaputry_026_BOX-RANJANG-BAYI.png',
			name: 'Box Bayi & Ranjang Anak'
		},
		{
			image: 'alkesduaputry_027_Untitled-design-38.png',
			name: 'Bed Partus & Pijakan'
		},
		{
			image: 'alkesduaputry_028_BED-GYNEKOLOG-MEJA-GYNEKOLOG-001.png',
			name: 'Bed & Meja Gynekolog'
		},
		{
			image: 'alkesduaputry_029_MEJA-OPERASI-BED-OBGYN-001.png',
			name: 'Meja Operasi & Bed Obgyn'
		}
	];

	const sofas: Product[] = [
		{
			image: 'alkesduaputry_030_Kursi-Hemodialisa-Cuci-Darah-SkrinMe-02.png',
			name: 'Kursi Hemodialisa'
		},
		{
			image: 'alkesduaputry_031_Sofa-Donor-Kursi-Donor.png',
			name: 'Sofa Donor & Kursi Donor'
		}
	];

	const furniture: Product[] = [
		{
			image: 'alkesduaputry_032_overbedtavle.png',
			name: 'Meja Bed Pasien / Overbed Table'
		},
		{
			image: 'alkesduaputry_033_bedside-5.png',
			name: 'Lemari Barang / Bedside Cabinet'
		},
		{
			image: 'alkesduaputry_034_TIANG-INFUS-RODA-3-CANTEL-001.png',
			name: 'Tiang Infus Roda 3 Cantel'
		},
		{
			image: 'alkesduaputry_035_Untitled-design-2023-10-10T163403.359.png',
			name: 'Lemari Instrument 1 & 2 Pintu'
		},
		{
			image: 'alkesduaputry_036_Lemari-Narkotik-Rumah-Sakit-SkrinMe-01.png',
			name: 'Lemari Narkotik Kecil'
		},
		{
			image: 'alkesduaputry_037_Bed-Screen-Rumah-Sakit-SkrinMe-001.png',
			name: 'Bed Screen Rumah Sakit'
		},
		{
			image: 'alkesduaputry_038_TROLLEY-EMERGENCY-001.png',
			name: 'Trolley Emergency'
		},
		{
			image: 'alkesduaputry_039_Untitled-design-2023-10-10T173431.088.png',
			name: 'Instrument Trolley'
		},
		{
			image: 'alkesduaputry_039_Untitled-design-2023-10-10T173431.088.png',
			name: 'Trolley Instrument 2 & 3'
		},
		{
			image: 'alkesduaputry_040_Trolley-EKG-Trolley-USG.png',
			name: 'Trolley EKG & USG'
		},
		{
			image: 'alkesduaputry_041_WEBSITE-10.png',
			name: 'Trolley Makan 16 Susun'
		},
		{
			image: 'alkesduaputry_042_Trolley-Oksigen-SkrinMe-001.png',
			name: 'Trolley Oksigen'
		},
		{
			image: 'alkesduaputry_043_Untitled-design-2023-10-11T153840.071.png',
			name: 'Tabung Oksigen 1m3 & 6m3'
		}
	];

	const wheelchairs: Product[] = [
		{
			image: 'alkesduaputry_044_KURSI-RODA-MANUAL-STANDAR-KURSI-RODA-ELEKTRIK-001.png',
			name: 'Kursi Roda Manual & Elektrik'
		},
		{
			image: 'alkesduaputry_045_KURSI-RODA-TRAVEL-BAN-BESAR-TRAVEL-BAG-001.png',
			name: 'Kursi Roda Travel'
		},
		{
			image: 'alkesduaputry_046_KURSI-RODA-3IN1-CELEBRAL-PALSY-001.png',
			name: 'Kursi Roda 3 in 1'
		},
		{
			image: 'alkesduaputry_047_WHEELCHAIR-BAB-KURSI-BAB-001.png',
			name: 'Wheelchair BAB & Kursi BAB'
		}
	];

	const testimonials: Testimonial[] = [
		{
			name: 'Klinik Pratama Sehati',
			role: 'Pengadaan ruang tindakan',
			copy: 'Respons admin cepat dan spesifikasi produk dijelaskan dengan rapi. Bed pasien dan trolley yang kami pesan datang sesuai kebutuhan ruangan.'
		},
		{
			name: 'RSIA Bunda Medika',
			role: 'Koordinator fasilitas',
			copy: 'Tim Dua Putry Medika membantu menyesuaikan pilihan hospital furniture dengan alur kerja perawat. Komunikasi pengiriman juga jelas.'
		},
		{
			name: 'Klinik Hemodialisa Mandiri',
			role: 'Manajemen operasional',
			copy: 'Kursi treatment yang kami konsultasikan sesuai dengan kebutuhan layanan. Proses follow up setelah barang diterima juga membantu.'
		}
	];

	const heroSlides: Product[] = [...hospitalBeds, ...sofas, ...furniture, ...wheelchairs];

	const heroSliderTrack = [...heroSlides, ...heroSlides];
</script>

<svelte:head>
	<title>Dua Putry Medika | Distributor Alat Kesehatan Terpercaya</title>
	<meta
		name="description"
		content="Dua Putry Medika adalah distributor alat kesehatan terpercaya untuk hospital bed, kursi roda, trolley medis, sofa rumah sakit, dan furniture fasilitas kesehatan."
	/>
	<link rel="canonical" href="https://alkesduaputry.com/" />
</svelte:head>

<section class="hero-section">
	<div class="container hero-inner">
		<div class="hero-copy">
			<span class="eyebrow hero-eyebrow">Dua Putry Medika</span>
			<h1>Distributor Alat Kesehatan Terpercaya</h1>
			<p>
				Solusi pengadaan hospital furniture, bed pasien, kursi roda, trolley medis, dan kebutuhan
				fasilitas kesehatan dengan konsultasi cepat melalui WhatsApp.
			</p>
			<div class="button-row">
				<a class="cta-button cta-primary" href={whatsappBase} target="_blank" rel="noreferrer">
					Hubungi via WhatsApp
				</a>
				<a class="cta-button cta-secondary" href="#produk">Lihat Produk</a>
			</div>
		</div>
		<div class="hero-visual" aria-label="Slider produk unggulan Dua Putry Medika">
			<img
				class="hero-main-image"
				src={`${imageBase}alkesduaputry_002_Distributor-Alat-Kesehatan-Konsultasi-001.png`}
				alt="Konsultasi distributor alat kesehatan Dua Putry Medika"
				loading="lazy"
			/>
			<div class="hero-card">
				<img
					class="hero-logo"
					src={`${imageBase}alkesduaputry_001_SkrinMe-Logo-2.png`}
					alt="Logo Dua Putry Medika"
					loading="lazy"
				/>
				<span>Hospital bed, kursi roda, trolley, dan furniture medis untuk pengadaan profesional.</span>
			</div>
		</div>
	</div>

	<div class="hero-slider" aria-label="Slider gambar produk alat kesehatan">
		<div class="hero-slider-track">
			{#each heroSliderTrack as product}
				<figure class="hero-slide">
					<img
						src={`${imageBase}${product.image}`}
						alt={`Gambar ${product.name} Dua Putry Medika`}
						loading="lazy"
					/>
					<figcaption>{product.name}</figcaption>
				</figure>
			{/each}
		</div>
	</div>
</section>

<section class="section why-section">
	<div class="container">
		<div class="section-heading">
			<span class="eyebrow">Mengapa Memilih Kami</span>
			<h2>Dukungan lengkap untuk kebutuhan fasilitas kesehatan</h2>
		</div>
		<div class="feature-grid">
			{#each features as feature}
				<article class="feature-card">
					<img
						class="feature-icon"
						src={`${imageBase}${feature.image}`}
						alt={`Ikon ${feature.title}`}
						loading="lazy"
					/>
					<h3>{feature.title}</h3>
					<p>{feature.copy}</p>
				</article>
			{/each}
		</div>
	</div>
</section>

<section class="section" id="produk">
	<div class="container">
		<div class="section-heading">
			<span class="eyebrow">Tempat Tidur / Hospital Bed</span>
			<h2>Produk utama untuk ruang rawat, IGD, tindakan, dan nursery</h2>
		</div>
		{@render ProductGrid({ products: hospitalBeds, columns: 'three' })}
	</div>
</section>

<section class="section section-soft">
	<div class="container">
		<div class="section-heading">
			<span class="eyebrow">Sofa & Kursi Rumah Sakit</span>
			<h2>Kenyamanan pasien untuk perawatan dan donor</h2>
		</div>
		{@render ProductGrid({ products: sofas, columns: 'two' })}
	</div>
</section>

<section class="section">
	<div class="container">
		<div class="section-heading">
			<span class="eyebrow">Furniture Lainnya</span>
			<h2>Perlengkapan pendukung untuk operasional harian fasilitas kesehatan</h2>
		</div>
		{@render ProductGrid({ products: furniture, columns: 'three' })}
	</div>
</section>

<section class="section section-soft">
	<div class="container">
		<div class="section-heading">
			<span class="eyebrow">Kursi Roda</span>
			<h2>Pilihan kursi roda untuk mobilitas pasien dan pendampingan perawatan</h2>
		</div>
		{@render ProductGrid({ products: wheelchairs, columns: 'two' })}
	</div>
</section>

<section class="section">
	<div class="container">
		<div class="section-heading">
			<span class="eyebrow">Testimoni</span>
			<h2>Dipercaya oleh fasilitas kesehatan dan pengadaan klinik</h2>
		</div>
		<div class="testimonial-grid">
			{#each testimonials as testimonial}
				<article class="testimonial-card">
					<p>{testimonial.copy}</p>
					<div>
						<strong>{testimonial.name}</strong>
						<span>{testimonial.role}</span>
					</div>
				</article>
			{/each}
		</div>
	</div>
</section>

<section class="closing-cta">
	<div class="container closing-inner">
		<div>
			<span class="eyebrow hero-eyebrow">Konsultasi Pengadaan</span>
			<h2>Butuh rekomendasi alat kesehatan untuk klinik atau rumah sakit?</h2>
			<p>
				Kirim kebutuhan produk Anda, tim Dua Putry Medika akan membantu cek stok, spesifikasi, dan
				estimasi pengiriman.
			</p>
		</div>
		<a class="cta-button cta-primary cta-large" href={whatsappBase} target="_blank" rel="noreferrer">
			Hubungi via WhatsApp
		</a>
	</div>
</section>

{#snippet ProductGrid({ products, columns }: { products: Product[]; columns: 'two' | 'three' })}
	<div class:grid-two={columns === 'two'} class:grid-three={columns === 'three'} class="product-grid">
		{#each products as product}
			<article class="product-card">
				<img
					src={`${imageBase}${product.image}`}
					alt={`Produk ${product.name} dari Dua Putry Medika`}
					loading="lazy"
				/>
				<div class="product-content">
					<h3>{product.name}</h3>
					<a
						class="product-button"
						href={makeProductLink(product.name)}
						target="_blank"
						rel="noreferrer"
					>
						Hubungi via WhatsApp
					</a>
				</div>
			</article>
		{/each}
	</div>
{/snippet}

<style>
	.hero-section {
		position: relative;
		overflow: hidden;
		padding: 72px 0 0;
		background:
			linear-gradient(90deg, rgba(18, 100, 183, 0.88) 0%, rgba(28, 127, 216, 0.72) 48%, rgba(45, 138, 78, 0.5) 100%),
			url('https://files.alkesduaputry.com/alkesduaputry/alkesduaputry_013_WEBSITE-4.png')
				right center / contain no-repeat,
			linear-gradient(135deg, #1976c9 0%, #2b9af3 55%, #54b8ff 100%);
		color: #ffffff;
	}

	.hero-section::after {
		position: absolute;
		inset: auto -8% -24% 52%;
		height: 340px;
		border-radius: 999px;
		background: rgba(45, 138, 78, 0.24);
		content: '';
		filter: blur(30px);
	}

	.hero-inner,
	.closing-inner {
		position: relative;
		z-index: 1;
		display: grid;
		gap: 2rem;
		align-items: center;
	}

	.hero-copy {
		display: grid;
		gap: 1.2rem;
		max-width: 760px;
	}

	.hero-eyebrow {
		background: rgba(255, 255, 255, 0.14);
		color: #ffffff;
	}

	h1,
	h2,
	h3,
	p {
		margin: 0;
	}

	h1 {
		max-width: 820px;
		font-family: 'Fraunces', serif;
		font-size: clamp(2.7rem, 8vw, 5.9rem);
		line-height: 0.98;
	}

	.hero-copy p,
	.closing-inner p {
		max-width: 680px;
		color: rgba(255, 255, 255, 0.86);
		font-size: clamp(1rem, 2vw, 1.2rem);
		line-height: 1.8;
	}

	.hero-visual {
		display: grid;
		gap: 1rem;
	}

	.hero-main-image {
		width: 100%;
		aspect-ratio: 4 / 3;
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 8px;
		background: #ffffff;
		box-shadow: 0 24px 60px rgba(0, 0, 0, 0.22);
		object-fit: contain;
		padding: 0.85rem;
	}

	.hero-card {
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 0.7rem;
		align-items: center;
		padding: 1.35rem;
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 8px;
		background: rgba(255, 255, 255, 0.1);
		backdrop-filter: blur(12px);
	}

	.hero-logo {
		width: 72px;
		height: 72px;
		border-radius: 8px;
		background: #ffffff;
		object-fit: contain;
		padding: 0.35rem;
	}

	.hero-card span {
		color: rgba(255, 255, 255, 0.82);
		line-height: 1.65;
	}

	.hero-slider {
		position: relative;
		z-index: 1;
		width: 100%;
		margin-top: 3rem;
		padding: 1rem 0 1.25rem;
		background: rgba(255, 255, 255, 0.16);
		backdrop-filter: blur(10px);
	}

	.hero-slider::before,
	.hero-slider::after {
		position: absolute;
		top: 0;
		bottom: 0;
		z-index: 2;
		width: 64px;
		content: '';
		pointer-events: none;
	}

	.hero-slider::before {
		left: 0;
		background: linear-gradient(90deg, #1976c9 0%, rgba(25, 118, 201, 0) 100%);
	}

	.hero-slider::after {
		right: 0;
		background: linear-gradient(270deg, #2b9af3 0%, rgba(43, 154, 243, 0) 100%);
	}

	.hero-slider-track {
		display: flex;
		width: max-content;
		gap: 1rem;
		animation: slide-products 80s linear infinite;
	}

	.hero-slider:hover .hero-slider-track {
		animation-play-state: paused;
	}

	.hero-slide {
		overflow: hidden;
		width: 230px;
		margin: 0;
		border: 1px solid rgba(255, 255, 255, 0.18);
		border-radius: 8px;
		background: #ffffff;
		color: #1a3c6e;
		box-shadow: 0 14px 30px rgba(0, 0, 0, 0.14);
	}

	.hero-slide img {
		width: 100%;
		aspect-ratio: 4 / 3;
		object-fit: contain;
		padding: 0.65rem;
	}

	.hero-slide figcaption {
		min-height: 58px;
		padding: 0.7rem 0.85rem 0.85rem;
		border-top: 1px solid rgba(26, 60, 110, 0.1);
		font-size: 0.88rem;
		font-weight: 800;
		line-height: 1.35;
	}

	@keyframes slide-products {
		from {
			transform: translateX(0);
		}

		to {
			transform: translateX(calc(-50% - 0.5rem));
		}
	}

	.cta-button,
	.product-button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-height: 48px;
		padding: 0.9rem 1.25rem;
		border-radius: 8px;
		font-weight: 800;
		text-align: center;
		transition:
			transform 0.2s ease,
			box-shadow 0.2s ease,
			background 0.2s ease,
			color 0.2s ease;
	}

	.cta-button:hover,
	.product-button:hover {
		transform: translateY(-2px);
	}

	.cta-primary {
		background: #2d8a4e;
		color: #ffffff;
		box-shadow: 0 16px 32px rgba(45, 138, 78, 0.28);
	}

	.cta-secondary {
		border: 1px solid rgba(255, 255, 255, 0.54);
		background: rgba(255, 255, 255, 0.1);
		color: #ffffff;
	}

	.cta-large {
		width: 100%;
		font-size: 1.05rem;
	}

	.section-heading {
		display: grid;
		gap: 0.9rem;
		max-width: 780px;
		margin-bottom: 2rem;
	}

	.section-heading h2,
	.closing-inner h2 {
		font-family: 'Fraunces', serif;
		font-size: clamp(2rem, 4vw, 3.4rem);
		line-height: 1.08;
		color: #1a3c6e;
	}

	.why-section {
		background: #ffffff;
	}

	.section-soft {
		background: rgba(26, 60, 110, 0.05);
	}

	.feature-grid,
	.product-grid,
	.testimonial-grid {
		display: grid;
		gap: 1rem;
	}

	.feature-card,
	.product-card,
	.testimonial-card {
		border: 1px solid rgba(26, 60, 110, 0.12);
		border-radius: 8px;
		background: #ffffff;
		box-shadow: 0 14px 34px rgba(26, 60, 110, 0.08);
	}

	.feature-card {
		display: grid;
		gap: 0.75rem;
		padding: 1.15rem;
	}

	.feature-icon {
		width: 3rem;
		height: 3rem;
		border-radius: 8px;
		background: rgba(45, 138, 78, 0.12);
		object-fit: contain;
		padding: 0.45rem;
	}

	.feature-card h3,
	.product-card h3 {
		color: #1a3c6e;
		font-size: 1.08rem;
		line-height: 1.35;
	}

	.feature-card p,
	.testimonial-card p {
		color: #5f6f82;
		line-height: 1.7;
	}

	.product-card {
		overflow: hidden;
		display: flex;
		flex-direction: column;
		min-height: 100%;
	}

	.product-card img {
		width: 100%;
		aspect-ratio: 4 / 3;
		background: #f4f8fc;
		object-fit: contain;
		padding: 0.75rem;
	}

	.product-content {
		display: grid;
		gap: 1rem;
		padding: 1rem;
		flex: 1;
	}

	.product-button {
		align-self: end;
		background: #1a3c6e;
		color: #ffffff;
	}

	.testimonial-card {
		display: grid;
		gap: 1.2rem;
		padding: 1.25rem;
	}

	.testimonial-card strong,
	.testimonial-card span {
		display: block;
	}

	.testimonial-card strong {
		color: #1a3c6e;
	}

	.testimonial-card span {
		margin-top: 0.25rem;
		color: #2d8a4e;
		font-weight: 700;
	}

	.closing-cta {
		padding: 64px 0;
		background: #1a3c6e;
		color: #ffffff;
	}

	.closing-inner h2 {
		margin-top: 1rem;
		color: #ffffff;
	}

	@media (min-width: 640px) {
		.feature-grid,
		.product-grid,
		.testimonial-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}

		.cta-large {
			width: auto;
			justify-self: start;
		}
	}

	@media (min-width: 1024px) {
		.hero-inner,
		.closing-inner {
			grid-template-columns: 1.35fr 0.65fr;
		}

		.feature-grid,
		.grid-three,
		.testimonial-grid {
			grid-template-columns: repeat(3, minmax(0, 1fr));
		}

		.grid-two {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}

		.hero-section {
			padding: 104px 0 0;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.hero-slider-track {
			animation: none;
		}
	}
</style>
