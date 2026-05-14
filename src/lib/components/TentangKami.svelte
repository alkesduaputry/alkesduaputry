<script lang="ts">
	import { whatsappBase } from '$lib/data/products';

	const warehouseImage =
		'https://files.alkesduaputry.com/Slider/kegiatan%20Gudang%20Alkesduaputry%20(10).jpeg';
</script>

<section class="section">
	<div class="container about">
		<div class="content">
			<span class="eyebrow">Tentang Kami</span>
			<h2 class="section-title">SkrinMe Sebagai Distributor Alat Kesehatan Selalu Mengutamakan</h2>
			<h3>Produk Berkualitas & Kepuasan Pelanggan</h3>
			<p class="section-copy">
				Mitra kami AlkesDuaPutry menyediakan produk-produk alat kesehatan yang berkualitas dan
				terpercaya untuk klinik, rumah sakit, laboratorium, perusahaan, dan pembelian perseorangan
				dengan harga yang tetap kompetitif.
			</p>
			<p class="section-copy">
				Setiap produk dipastikan memiliki izin resmi dari Kementerian Kesehatan. Tim kami juga siap
				mendukung kebutuhan rapid test, pengadaan furniture medis, sampai training penggunaan produk
				agar implementasi di lapangan berjalan lebih mulus.
			</p>
			<div class="button-row">
				<a class="btn btn-primary" href={whatsappBase} target="_blank" rel="noreferrer">Konsultasikan Kebutuhan Anda</a>
			</div>
		</div>
		<div class="video-wrap card">
			<img class="warehouse-shot" src={warehouseImage} alt="Kegiatan gudang AlkesDuaPutry" />
			<iframe
				src="https://www.youtube.com/embed/z4aPBjuiMk8"
				title="Video Profil PT Mitra Medika Farma"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowfullscreen
			></iframe>
		</div>
	</div>
</section>

<style>
	.about {
		display: grid;
		gap: 1.5rem;
		align-items: center;
	}

	.content {
		display: grid;
		gap: 1rem;
	}

	h3 {
		margin: -0.1rem 0 0.2rem;
		font-size: 1.25rem;
	}

	.video-wrap {
		padding: 0.8rem;
		display: grid;
		gap: 0.8rem;
		border-radius: 1.8rem;
		background:
			linear-gradient(135deg, rgba(10, 92, 138, 0.05), rgba(232, 160, 32, 0.1)),
			var(--color-white);
	}

	.warehouse-shot {
		width: 100%;
		aspect-ratio: 16 / 9;
		object-fit: cover;
		border-radius: 1.3rem;
	}

	iframe {
		width: 100%;
		aspect-ratio: 16 / 9;
		border: 0;
		border-radius: 1.3rem;
	}

	@media (min-width: 768px) {
		.about {
			grid-template-columns: 1fr 1fr;
		}
	}
</style>
