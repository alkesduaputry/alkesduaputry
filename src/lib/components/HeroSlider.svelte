<script lang="ts">
	import brandIcon from '$lib/assets/brand-icon.png';
	import brandLogo from '$lib/assets/brand-logo.png';
	import { onMount } from 'svelte';
	import { whatsappBase } from '$lib/data/products';

	type Slide = {
		title: string;
		description: string;
		background: string;
		accent: string;
		visualLabel: string;
		image: string;
		secondaryText: string;
	};

	const slides: Slide[] = [
		{
			title: 'Distributor Alat Kesehatan Berkualitas & Berizin Resmi',
			description:
				'Pilihan hospital bed, hospital furniture, dan alat kesehatan untuk klinik, rumah sakit, laboratorium, serta institusi dengan layanan pengadaan cepat.',
			background:
				'radial-gradient(circle at top left, rgba(232,160,32,0.22), transparent 30%), linear-gradient(135deg, #0a5c8a 0%, #073f60 70%)',
			accent: 'Bed pasien premium siap demo dan training',
			visualLabel: 'Distribusi alat kesehatan resmi',
			image: 'https://files.alkesduaputry.com/Slider/kegiatan%20Gudang%20Alkesduaputry%20(8).jpeg',
			secondaryText: 'Lihat Produk'
		},
		{
			title: 'Produk Bundling Harga Lebih Murah',
			description:
				'Strategi pembelian bundling untuk menekan biaya pengadaan tanpa mengorbankan spesifikasi, kualitas, dan dukungan after sales.',
			background:
				'linear-gradient(135deg, rgba(10,92,138,0.95), rgba(7,63,96,0.92)), repeating-linear-gradient(45deg, rgba(255,255,255,0.08) 0 12px, transparent 12px 24px)',
			accent: 'Paket hemat untuk kebutuhan bangsal dan laboratorium',
			visualLabel: 'Bundling produk dan perlengkapan',
			image: 'https://files.alkesduaputry.com/Slider/kegiatan%20Gudang%20Alkesduaputry%20(7).jpeg',
			secondaryText: 'Konsultasi Bundling'
		},
		{
			title: 'Berizin Edar Resmi AKL & AKD',
			description:
				'Produk tersertifikasi dengan pendampingan pengadaan dan ketersediaan dokumen untuk pembelian institusi maupun e-katalog.',
			background:
				'radial-gradient(circle at bottom right, rgba(232,160,32,0.24), transparent 28%), linear-gradient(135deg, #0d689b 0%, #073f60 78%)',
			accent: 'S-IDAK dan CDAKB siap ditunjukkan saat dibutuhkan',
			visualLabel: 'Izin edar dan sertifikasi',
			image: 'https://files.alkesduaputry.com/Slider/kegiatan%20Gudang%20Alkesduaputry%20(4).jpeg',
			secondaryText: 'Lihat Sertifikasi'
		}
	];

	let activeSlide = $state(0);
	let slider: HTMLElement | null = null;
	let gsapLib: typeof import('gsap').gsap | null = null;
	let intervalId: ReturnType<typeof setInterval> | undefined;

	function setSlide(index: number) {
		activeSlide = index;
	}

	function nextSlide() {
		activeSlide = (activeSlide + 1) % slides.length;
	}

	function animateActiveSlide() {
		if (!slider || !gsapLib) {
			return;
		}

		const active = slider.querySelector('.slide.is-active');
		const lines = active?.querySelectorAll('.animate-line');
		if (!lines || lines.length === 0) {
			return;
		}

		gsapLib.fromTo(
			lines,
			{ opacity: 0, y: 30 },
			{ opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power2.out' }
		);
	}

	$effect(() => {
		activeSlide;
		if (gsapLib) {
			animateActiveSlide();
		}
	});

	onMount(() => {
		void (async () => {
			const { gsap } = await import('gsap');
			gsapLib = gsap;
			animateActiveSlide();
		})();
		intervalId = setInterval(nextSlide, 5000);

		return () => {
			if (intervalId) {
				clearInterval(intervalId);
			}
		};
	});
</script>

<section class="hero section">
	<div class="container">
		<div class="slider" bind:this={slider}>
			{#each slides as slide, index}
				<div
					class:is-active={activeSlide === index}
					class="slide"
					style={`background:${slide.background};`}
				>
					<div class="copy">
						<span class="eyebrow animate-line">Medical Supplier Jakarta & Bekasi</span>
						<h1 class="animate-line">{slide.title}</h1>
						<p class="animate-line">{slide.description}</p>
						<div class="button-row animate-line">
							<a class="btn btn-accent" href={whatsappBase} target="_blank" rel="noreferrer">
								Hubungi Kami
							</a>
							<a class="btn btn-outline" href="/produk/hospital-bed">{slide.secondaryText}</a>
						</div>
						<div class="mini-note animate-line">{slide.accent}</div>
					</div>
					<div class="visual" aria-hidden="true">
						<div class="device">
							<div class="badge">AKL & AKD</div>
							<div class="art">
								<img class="hero-photo" src={slide.image} alt={slide.visualLabel} />
								<div class="hero-overlay">
									<img class="hero-logo" src={brandLogo} alt="Logo AlkesDuaPutry" />
									<img class="hero-icon" src={brandIcon} alt="Icon AlkesDuaPutry" />
								</div>
							</div>
							<div class="meta">
								<strong>{slide.visualLabel}</strong>
								<span>PT Mitra Medika Farma • Sertifikasi siap verifikasi</span>
							</div>
						</div>
					</div>
				</div>
			{/each}
			<div class="dots">
				{#each slides as _, index}
					<button type="button" aria-label={`Slide ${index + 1}`} class:active={activeSlide === index} onclick={() => setSlide(index)}></button>
				{/each}
			</div>
		</div>
	</div>
</section>

<style>
	.hero {
		padding-top: 1rem;
	}

	.slider {
		position: relative;
		min-height: 860px;
	}

	.slide {
		position: absolute;
		inset: 0;
		padding: 1.35rem 1.1rem 4.6rem;
		display: grid;
		align-content: start;
		gap: 1.25rem;
		border-radius: 2rem;
		opacity: 0;
		pointer-events: none;
		transform: scale(0.985);
		transition:
			opacity 0.55s ease,
			transform 0.55s ease;
		overflow: hidden;
		color: var(--color-white);
		box-shadow: 0 28px 70px rgba(7, 63, 96, 0.22);
	}

	.slide.is-active {
		opacity: 1;
		pointer-events: auto;
		transform: scale(1);
	}

	.copy {
		position: relative;
		z-index: 1;
	}

	.copy :global(.eyebrow) {
		background: rgba(255, 255, 255, 0.14);
		color: var(--color-white);
	}

	h1 {
		margin: 1rem 0;
		font-family: 'Fraunces', serif;
		font-size: clamp(2rem, 8vw, 4.6rem);
		line-height: 1.02;
		max-width: 11ch;
	}

	p {
		margin: 0 0 1.6rem;
		max-width: 58ch;
		color: rgba(255, 255, 255, 0.86);
		line-height: 1.8;
	}

	.mini-note {
		margin-top: 1.2rem;
		font-weight: 600;
		color: rgba(255, 255, 255, 0.8);
	}

	.visual {
		display: grid;
		justify-items: center;
	}

	.device {
		width: 100%;
		max-width: 380px;
		padding: 1rem;
		display: grid;
		gap: 0.8rem;
		border-radius: 1.8rem;
		background: rgba(255, 255, 255, 0.1);
		border: 1px solid rgba(255, 255, 255, 0.16);
		backdrop-filter: blur(10px);
	}

	.badge {
		justify-self: start;
		padding: 0.45rem 0.8rem;
		border-radius: 999px;
		background: rgba(232, 160, 32, 0.18);
		border: 1px solid rgba(232, 160, 32, 0.3);
		color: #ffe7b5;
		font-size: 0.78rem;
		font-weight: 700;
	}

	.art {
		position: relative;
		min-height: 240px;
		overflow: hidden;
		border-radius: 1.4rem;
	}

	.hero-photo {
		width: 100%;
		height: 100%;
		min-height: 240px;
		object-fit: cover;
		filter: saturate(1.05) contrast(1.02);
	}

	.hero-overlay {
		position: absolute;
		inset: 0;
		display: grid;
		align-content: end;
		padding: 1.25rem;
		background:
			linear-gradient(180deg, rgba(7, 63, 96, 0.08) 0%, rgba(7, 63, 96, 0.74) 100%),
			linear-gradient(135deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.02));
	}

	.hero-logo {
		width: min(100%, 220px);
		height: auto;
		filter: drop-shadow(0 14px 28px rgba(7, 63, 96, 0.2));
	}

	.hero-icon {
		position: absolute;
		right: 0.85rem;
		bottom: 0.85rem;
		width: 58px;
		height: 58px;
		border-radius: 999px;
		box-shadow: 0 12px 28px rgba(7, 63, 96, 0.3);
		background: rgba(255, 255, 255, 0.96);
		padding: 0.18rem;
	}

	.meta strong,
	.meta span {
		display: block;
	}

	.meta span {
		margin-top: 0.2rem;
		color: rgba(255, 255, 255, 0.78);
		font-size: 0.88rem;
	}

	.dots {
		position: absolute;
		left: 50%;
		bottom: 1.5rem;
		transform: translateX(-50%);
		display: flex;
		gap: 0.55rem;
		z-index: 2;
	}

	.dots button {
		width: 0.8rem;
		height: 0.8rem;
		border: 0;
		border-radius: 999px;
		background: rgba(255, 255, 255, 0.3);
	}

	.dots button.active {
		width: 2rem;
		background: var(--color-accent);
	}

	@media (min-width: 768px) {
		.slider {
			min-height: 600px;
		}

		.slide {
			padding: 3rem;
			grid-template-columns: 1.2fr 0.8fr;
			align-items: center;
			align-content: normal;
			gap: 2rem;
		}

		.device {
			padding: 1.4rem;
			gap: 1rem;
		}

		.art,
		.hero-photo {
			min-height: 210px;
		}

		.hero-logo {
			width: min(100%, 280px);
		}

		.hero-icon {
			right: 1rem;
			bottom: 1rem;
			width: 74px;
			height: 74px;
		}

		.meta span {
			font-size: 0.95rem;
		}
	}
</style>
