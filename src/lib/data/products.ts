export const whatsappBase =
	'https://api.whatsapp.com/send?phone=6281289808868&text=Halo,%20saya%20ingin%20bertanya%20mengenai%20produk%20AlkesDuaPutry.';

export type ProductCategory = {
	slug: string;
	title: string;
	shortTitle: string;
	description: string;
	icon: string;
	highlights: string[];
};

export type ProductItem = {
	name: string;
	sku: string;
	description: string;
	badge: string;
	features: string[];
};

export const productCategories: ProductCategory[] = [
	{
		slug: 'hospital-furniture',
		title: 'Hospital Furniture',
		shortTitle: 'Hospital Furniture',
		description:
			'Pilihan hospital furniture untuk ruang rawat inap, IGD, klinik, dan homecare dengan opsi demo perakitan dan instalasi.',
		icon: '🛏️',
		highlights: ['Bedside cabinet', 'Overbed table', 'Trolley medis']
	},
	{
		slug: 'hospital-bed',
		title: 'Hospital Bed Premium',
		shortTitle: 'Hospital Bed',
		description:
			'Ranjang pasien elektrik dan manual dengan izin edar resmi, material kokoh, dan paket matras import waterproof.',
		icon: '🏥',
		highlights: ['2 crank', '3 crank', '3 motors']
	},
	{
		slug: 'rapid-test',
		title: 'Rapid Diagnostic Test',
		shortTitle: 'Rapid Test',
		description:
			'Produk rapid diagnostic test untuk kebutuhan klinik, laboratorium, perusahaan, hingga program skrining massal.',
		icon: '🧪',
		highlights: ['Infeksi', 'Narkoba', 'Screening rutin']
	},
	{
		slug: 'disposable',
		title: 'Disposable Consumable',
		shortTitle: 'Disposable',
		description:
			'Consumable sekali pakai untuk mendukung operasional fasilitas kesehatan dengan stok stabil dan pengiriman cepat.',
		icon: '🧤',
		highlights: ['Masker', 'Sarung tangan', 'APD']
	},
	{
		slug: 'e-katalog',
		title: 'E-Katalog LKPP',
		shortTitle: 'E-Katalog LKPP',
		description:
			'Pendampingan pengadaan produk alat kesehatan melalui e-katalog LKPP dengan alur administrasi yang lebih efisien.',
		icon: '📋',
		highlights: ['Pendampingan dokumen', 'Pengadaan institusi', 'Harga kompetitif']
	}
];

export const latestProducts: ProductItem[] = [
	{
		name: 'Hospital Bed Elektrik 3 Motors',
		sku: 'SM-B7D',
		description:
			'Ranjang pasien elektrik dengan gerakan halus, side rail ABS butterfly, dan matras waterproof density 26.',
		badge: 'Izin AKL',
		features: ['Tinggi 53-83 cm', 'Naik turun halus', 'Roda kedap suara']
	},
	{
		name: 'Hospital Bed Manual 2 Crank',
		sku: 'SM-2CM',
		description:
			'Bed pasien manual 2 crank dengan rangka baja powder coating, reel stainless, dan matras plus overbed table.',
		badge: 'Izin AKL',
		features: ['Ukuran 2090x900x500 mm', 'Sandaran 0-75°', 'Crank lipat ABS']
	},
	{
		name: 'Hospital Bed Manual 3 Crank',
		sku: 'SM-3CM',
		description:
			'Versi upgrade dengan ukuran lebih panjang, posisi tinggi rendah fleksibel, dan permukaan bed yang lebih kokoh.',
		badge: 'Izin AKL',
		features: ['Tinggi 40-75 cm', 'Matras import', 'Roda pengunci di tiap sisi']
	}
];

export const googleReviews = [
	{
		name: 'kiki94umb',
		date: 'Februari 2024',
		review:
			'Hebat, bisa supply ke Jawa Tengah untuk kebutuhan klinik sebanyak 50 unit. Admin responsif, informatif, dan tim mekanik bekerja rapi sampai malam.',
		initials: 'K'
	},
	{
		name: 'Arti Harun',
		date: 'Maret 2024',
		review:
			'Pelayanan untuk pembelian ranjang pasien dan matras decubitus sangat baik. Barang dikirim di hari yang sama dan teknisinya sopan.',
		initials: 'A'
	},
	{
		name: 'Samiaji',
		date: 'April 2024',
		review:
			'Lagi darurat butuh cepat, dalam empat jam barang datang. Respons cepat dan koordinasi pengiriman sangat membantu.',
		initials: 'S'
	}
];

export const testimonials = [
	{
		quote:
			'Saya sangat terbantu dengan penjelasan dan kinerja sales marketing. Produknya bagus dan pelayanan purna jual membuat kebutuhan operasi berjalan lancar.',
		name: 'Wakil Kepala RS',
		role: 'RSPAD Gatot Soebroto'
	},
	{
		quote:
			'Pengiriman cepat, harga menarik, dan kualitas produk tidak kalah dengan yang lain. Respons terhadap masukan juga cepat.',
		name: 'dr. Nunik Utami',
		role: 'RSAU dr. Esnawan Antariksa'
	},
	{
		quote:
			'Kerjasama dengan PT Mitra Medika Farma mengesankan. Pelayanan cepat, fleksibel, dan ada jaminan penggantian jika terjadi kerusakan produk.',
		name: 'Mr. Martono',
		role: 'PT Tecnomed Multi Indonesia'
	},
	{
		quote:
			'Harga bersaing, kualitas bagus, pengiriman cepat, dan after sales sangat komunikatif. Cocok untuk kebutuhan procurement yang waktunya mepet.',
		name: 'Wisnu Khabul',
		role: 'PT Quicktest Laboratory'
	},
	{
		quote:
			'Harga terjangkau, produk beragam, kualitas baik, dan respons penjual sangat cepat. Pengiriman selalu on time.',
		name: 'dr. Yuliana Prima',
		role: 'Karunia Medical Clinic, Balikpapan'
	},
	{
		quote:
			'Competitive pricing, layanan cepat, dan after sales memuaskan. Kerjasamanya terasa seperti bertumbuh bersama, bukan sekadar transaksi.',
		name: 'dr. Wiwin Hernita',
		role: 'PT Fiaz Sons Ortho, Blitar'
	}
];

export const portfolioItems = [
	{
		title: 'Pengadaan 50 Unit Bed Klinik Jawa Tengah',
		copy: 'Penyediaan hospital bed lengkap dengan instalasi dan demo penggunaan untuk fasilitas layanan primer.'
	},
	{
		title: 'Distribusi Rapid Test Perusahaan Manufaktur',
		copy: 'Pengiriman batch cepat untuk program skrining karyawan dan support penggunaan alat.'
	},
	{
		title: 'Paket Furniture Bangsal Rawat Inap',
		copy: 'Konsultasi layout, pengadaan bedside cabinet, overbed table, dan training perakitan.'
	}
];

export const blogPosts = [
	{
		title: 'Cara Memilih Hospital Bed Sesuai Kebutuhan Fasilitas Kesehatan',
		excerpt: 'Panduan singkat membedakan bed manual, semi elektrik, dan elektrik untuk kebutuhan klinik atau rumah sakit.'
	},
	{
		title: 'Checklist Pengadaan Alat Kesehatan untuk Klinik Baru',
		excerpt: 'Daftar item esensial, perizinan, dan alur konsultasi agar proses pengadaan lebih cepat dan tepat.'
	},
	{
		title: 'Manfaat Bundling Produk Medis untuk Efisiensi Anggaran',
		excerpt: 'Strategi pengadaan dengan bundling product untuk menekan biaya tanpa mengorbankan kualitas alat.'
	}
];
