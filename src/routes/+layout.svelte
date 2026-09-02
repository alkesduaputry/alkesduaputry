<script lang="ts">
	import '../app.css';
	import brandIcon from '$lib/assets/brand-icon.png';
	import Footer from '$lib/components/Footer.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import { SITE_URL, whatsappBase } from '$lib/data/products';

	let { children } = $props();

	const catalogWhatsapp =
		'https://api.whatsapp.com/send?phone=6285780199904&text=Halo,%20saya%20ingin%20minta%20katalog%20produk%20AlkesDuaPutry.';

	// Katalog PDF di R2.
	const catalogPdfUrl = 'https://files.alkesduaputry.com/katalog2026_update.pdf';
	const catalogPdfLabel = 'Katalog 2026';

	const organizationSchema = {
		'@context': 'https://schema.org',
		'@type': 'Organization',
		name: 'ALKES DUAPUTRY',
		legalName: 'PT Mitra Medika Farma',
		description: 'PRODUSEN DAN DISTRIBUTOR ALAT KESEHATAN RUMAH SAKIT',
		url: SITE_URL,
		logo: `${SITE_URL}/favicon.png`,
		image: `${SITE_URL}/favicon.png`,
		email: 'wasuri627@gmail.com',
		telephone: '+62 857-8019-9904',
		address: {
			'@type': 'PostalAddress',
			streetAddress: 'JL. INDUSTRI BOJONG CONVEYOR RT, 01/04',
			addressLocality: 'Ds Tarikolot, Kec. Citeureup',
			addressRegion: 'Kab. Nogor, Jawa Barat',
			postalCode: '16810',
			addressCountry: 'ID'
		},
		contactPoint: [
			{
				'@type': 'ContactPoint',
				telephone: '+62 857-8019-9904',
				contactType: 'customer service',
				areaServed: 'ID',
				availableLanguage: ['id']
			}
		]
	};

	const websiteSchema = {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		name: 'ALKES DUAPUTRY',
		alternateName: 'Alkes Dua Putry',
		url: SITE_URL,
		publisher: {
			'@type': 'Organization',
			name: 'ALKES DUAPUTRY'
		}
	};
</script>

<svelte:head>
	<title>AlkesDuaPutry | Katalog Alat Kesehatan</title>
	<script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
	<script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
</svelte:head>

<Navbar />
<main>
	{@render children()}
</main>
<div class="floating-actions">
	<a
		class="floating-catalog"
		href={catalogPdfUrl}
		download
		target="_blank"
		rel="noreferrer"
		aria-label="Unduh {catalogPdfLabel} format PDF"
	>
		<svg class="cat-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
			<path
				d="M12 3v10m0 0 4-4m-4 4-4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
		<span class="cat-copy">
			<strong>Unduh {catalogPdfLabel}</strong>
			<small>PDF lengkap, langsung tersimpan</small>
		</span>
	</a>

	<a class="floating-wa" href={catalogWhatsapp || whatsappBase} target="_blank" rel="noreferrer">
		<img class="wa-icon" src={brandIcon} alt="Icon AlkesDuaPutry" />
		<span class="wa-copy">
			<strong>Hubungi WA</strong>
			<small>untuk minta katalog AlkesDuaPutry</small>
		</span>
	</a>
</div>
<Footer />

<style>
	.floating-actions {
		position: fixed;
		right: 1rem;
		bottom: 1rem;
		z-index: 45;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 0.65rem;
		max-width: min(92vw, 360px);
	}

	.floating-catalog {
		display: inline-flex;
		align-items: center;
		gap: 0.85rem;
		padding: 0.9rem 1.2rem 0.9rem 0.9rem;
		border-radius: 999px;
		background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
		color: var(--color-white);
		box-shadow: 0 18px 40px rgba(29, 78, 216, 0.32);
		transition:
			transform 0.22s ease,
			box-shadow 0.22s ease;
	}

	.floating-catalog:hover {
		transform: translateY(-3px);
		box-shadow: 0 24px 46px rgba(29, 78, 216, 0.36);
	}

	.cat-icon {
		width: 3rem;
		height: 3rem;
		flex: 0 0 auto;
		border-radius: 999px;
		padding: 0.6rem;
		background: rgba(255, 255, 255, 0.16);
		color: var(--color-white);
	}

	.cat-copy {
		display: grid;
	}

	.cat-copy strong,
	.cat-copy small {
		display: block;
	}

	.cat-copy strong {
		font-size: 1rem;
		line-height: 1.2;
	}

	.cat-copy small {
		margin-top: 0.15rem;
		font-size: 0.82rem;
		line-height: 1.35;
		color: rgba(255, 255, 255, 0.9);
	}

	.floating-wa {
		display: inline-flex;
		align-items: center;
		gap: 0.85rem;
		padding: 0.9rem 1.2rem 0.9rem 0.9rem;
		border-radius: 999px;
		background: linear-gradient(135deg, #25d366 0%, #119c4d 100%);
		color: var(--color-white);
		box-shadow: 0 18px 40px rgba(17, 156, 77, 0.32);
		transition:
			transform 0.22s ease,
			box-shadow 0.22s ease;
	}

	.floating-wa:hover {
		transform: translateY(-3px);
		box-shadow: 0 24px 46px rgba(17, 156, 77, 0.36);
	}

	.wa-icon {
		width: 3rem;
		height: 3rem;
		flex: 0 0 auto;
		border-radius: 999px;
		object-fit: cover;
		background: rgba(255, 255, 255, 0.95);
		padding: 0.14rem;
	}

	.wa-copy {
		display: grid;
	}

	.wa-copy strong,
	.wa-copy small {
		display: block;
	}

	.wa-copy strong {
		font-size: 1rem;
		line-height: 1.2;
	}

	.wa-copy small {
		margin-top: 0.15rem;
		font-size: 0.82rem;
		line-height: 1.35;
		color: rgba(255, 255, 255, 0.9);
	}

	@media (min-width: 768px) {
		.floating-actions {
			right: 1.5rem;
			bottom: 1.5rem;
		}

		.floating-catalog,
		.floating-wa {
			padding: 1rem 1.35rem 1rem 1rem;
		}
	}
</style>
