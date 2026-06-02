<script lang="ts">
	import brandIcon from '$lib/assets/brand-icon.png';
	import brandLogo from '$lib/assets/brand-logo.png';
	import { page } from '$app/state';
	import { whatsappBase } from '$lib/data/products';
	import type { CatalogCategorySummary } from '$lib/server/catalog';

	const productCategories = $derived((page.data.catalogCategories ?? []) as CatalogCategorySummary[]);

	const mainLinks = [
		{ href: '/', label: 'Beranda' },
		{ href: '/produk', label: 'Produk' },
		{ href: '/tentang-kami', label: 'Tentang Kami' },
		{ href: '/kontak', label: 'Kontak' }
	];

	const policyLinks = [
		{ href: '/kebijakan-privasi', label: 'Kebijakan Privasi' },
		{ href: '/syarat-ketentuan', label: 'Syarat & Ketentuan' },
		{ href: '/pengiriman', label: 'Pengiriman' },
		{ href: '/kebijakan-pengembalian', label: 'Kebijakan Pengembalian' },
		{ href: '/metode-pembayaran', label: 'Metode Pembayaran' }
	];
</script>

<footer>
	<div class="container footer-grid">
		<div class="brand">
			<div class="brand-head">
				<img class="logo-mark" src={brandIcon} alt="Icon AlkesDuaPutry" />
				<div>
					<img class="brand-logo" src={brandLogo} alt="AlkesDuaPutry" />
					<strong>PT MITRA MEDIKA FARMA</strong>
					<p>Ruko Asera Blok 1S 20 No.17, Harapan Indah, Bekasi</p>
				</div>
			</div>
			<div class="certs">
				<span>Konfirmasi stok via admin</span>
				<span>Kebijakan retur tersedia</span>
			</div>
		</div>

		<div class="links">
			<h3>Navigasi</h3>
			{#each mainLinks as link}
				<a href={link.href}>{link.label}</a>
			{/each}
		</div>

		<div class="links">
			<h3>Kategori Produk</h3>
			{#each productCategories as category}
				<a href={`/kategori/${category.slug}`}>{category.shortTitle}</a>
			{:else}
				<a href="/produk">Semua Produk</a>
			{/each}
		</div>

		<div class="links">
			<h3>Kebijakan</h3>
			{#each policyLinks as link}
				<a href={link.href}>{link.label}</a>
			{/each}
		</div>

		<div class="contact">
			<h3>Kontak</h3>
			<a href={whatsappBase} target="_blank" rel="noreferrer">+62 857-8019-9904</a>
			<a href="mailto:alkesduaputry@gmail.com">alkesduaputry@gmail.com</a>
		</div>
	</div>
	<div class="container disclaimer">
		Informasi produk di website ini bersifat informatif dan bukan pengganti nasihat medis profesional.
		Untuk penggunaan alat kesehatan tertentu, ikuti petunjuk resmi produk atau konsultasikan dengan
		tenaga kesehatan.
	</div>
	<div class="container footer-bottom">Copyright 2024 PT Mitra Medika Farma</div>
</footer>

<style>
	footer {
		padding: 2rem 0 1.5rem;
		background: #081b2a;
		color: rgba(255, 255, 255, 0.8);
	}

	.footer-grid {
		display: grid;
		gap: 1.5rem;
	}

	.brand-head {
		display: flex;
		align-items: flex-start;
		gap: 0.85rem;
	}

	.logo-mark {
		width: 3rem;
		height: 3rem;
		border-radius: 999px;
		object-fit: cover;
		box-shadow: 0 10px 24px rgba(10, 92, 138, 0.2);
	}

	.brand-logo {
		width: 180px;
		max-width: 100%;
		height: auto;
		margin-bottom: 0.55rem;
	}

	strong {
		display: block;
		color: var(--color-white);
		font-family: 'Fraunces', serif;
		font-size: 1.1rem;
	}

	p {
		margin: 0.5rem 0 0;
		line-height: 1.7;
	}

	.certs {
		margin-top: 1rem;
		display: flex;
		flex-wrap: wrap;
		gap: 0.65rem;
	}

	.certs span {
		padding: 0.5rem 0.8rem;
		border-radius: 999px;
		background: rgba(255, 255, 255, 0.08);
		color: #ffe7b5;
		font-size: 0.8rem;
		font-weight: 700;
	}

	.links,
	.contact {
		display: grid;
		gap: 0.5rem;
	}

	h3 {
		margin: 0;
		color: var(--color-white);
		font-size: 1rem;
	}

	.links a,
	.contact a {
		color: rgba(255, 255, 255, 0.75);
	}

	.disclaimer {
		margin-top: 1.5rem;
		padding: 1rem;
		border-radius: 8px;
		background: rgba(255, 255, 255, 0.08);
		color: rgba(255, 255, 255, 0.82);
		line-height: 1.7;
	}

	.footer-bottom {
		margin-top: 1.5rem;
		padding-top: 1rem;
		border-top: 1px solid rgba(255, 255, 255, 0.08);
		font-size: 0.92rem;
	}

	@media (min-width: 768px) {
		.footer-grid {
			grid-template-columns: 1.3fr 0.75fr 0.9fr 1fr 1fr;
		}
	}
</style>
