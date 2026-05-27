export const SITE_URL = 'https://alkesduaputry.com';
export const WHATSAPP_PHONE = '6285780199904';

export const whatsappBase =
	'https://api.whatsapp.com/send?phone=6285780199904&text=Halo,%20Alkes%20Dua%20Putry,%20saya%20ingin%20bertanya%20mengenai%20katalog%20alat%20kesehatan.';

export type Product = {
	id: string;
	slug: string;
	name: string;
	category: string;
	brand?: string;
	sku: string;
	description: string;
	shortDescription: string;
	image: string;
	gallery?: string[];
	price?: number;
	salePrice?: number;
	availability: 'in_stock' | 'preorder' | 'contact_admin';
	condition: 'new';
	specs: Record<string, string>;
	packageContents?: string[];
	warranty?: string;
	shippingNote?: string;
	legalNote?: string;
	googleProductCategory?: string;
	productType: string;
	gtin?: string;
	mpn?: string;
};

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
			'Furniture rumah sakit dan klinik untuk ruang rawat, nursery, tindakan, dan area penunjang dengan pilihan material yang mudah dibersihkan.',
		icon: 'HF',
		highlights: ['Hospital bed', 'Crib dan infant bed', 'Cabinet dan bedside cabinet']
	},
	{
		slug: 'lemari-instrumen',
		title: 'Lemari Instrumen',
		shortTitle: 'Lemari Instrumen',
		description:
			'Lemari penyimpanan instrumen untuk klinik dan rumah sakit, termasuk pilihan satu pintu dan kabinet kaca.',
		icon: 'LI',
		highlights: ['Instrument cabinet', 'Lemari kaca', 'Penyimpanan alat']
	},
	{
		slug: 'peralatan-nursery',
		title: 'Peralatan Nursery',
		shortTitle: 'Nursery',
		description:
			'Peralatan pendukung ruang bayi seperti crib, infant bed, infant warmer, dan transport incubator.',
		icon: 'NR',
		highlights: ['Crib bayi', 'Infant warmer', 'Transport incubator']
	},
	{
		slug: 'trolley-medis',
		title: 'Trolley Medis',
		shortTitle: 'Trolley Medis',
		description:
			'Trolley untuk mobilitas alat dan tabung medis di fasilitas kesehatan, termasuk trolley USG dan trolley oxygen.',
		icon: 'TM',
		highlights: ['Trolley USG', 'Trolley oxygen', 'Trolley instrument']
	},
	{
		slug: 'proteksi-sterilisasi',
		title: 'Proteksi & Sterilisasi Ruang',
		shortTitle: 'Proteksi Ruang',
		description:
			'Produk pendukung kontrol ruang seperti UV room sterilizer dan tabir X-Ray untuk area layanan tertentu.',
		icon: 'PS',
		highlights: ['UV room sterilizer', 'Tabir X-Ray', 'Peralatan ruangan']
	}
];

export const products: Product[] = [
	{
		id: 'uv-room-sterilizer',
		slug: 'uv-room-sterilizer',
		name: 'UV Room Sterilizer',
		category: 'proteksi-sterilisasi',
		brand: 'Alkes Dua Putry',
		sku: 'ADP-UVRS-001',
		description:
			'UV Room Sterilizer adalah perangkat pendukung sterilisasi ruangan yang digunakan untuk membantu proses pengendalian kebersihan area klinik, laboratorium, atau ruang tindakan sesuai prosedur fasilitas. Produk ini ditujukan sebagai alat penunjang operasional dan penggunaannya harus mengikuti panduan resmi produk.',
		shortDescription:
			'Perangkat UV untuk mendukung proses sterilisasi ruangan fasilitas kesehatan sesuai prosedur operasional.',
		image: '/products/uv-room-sterilizer.svg',
		availability: 'contact_admin',
		condition: 'new',
		specs: {
			'Tipe produk': 'UV room sterilizer',
			'Area penggunaan': 'Ruang klinik, ruang tindakan, laboratorium',
			'Material housing': 'Metal powder coating',
			'Kontrol': 'Hubungi admin untuk varian'
		},
		packageContents: ['Unit UV Room Sterilizer', 'Panduan penggunaan produk'],
		warranty: 'Garansi mengikuti ketentuan distributor dan pabrik.',
		shippingNote: 'Pengiriman menggunakan packing tambahan sesuai tujuan dan jenis ekspedisi.',
		legalNote: 'Gunakan sesuai SOP fasilitas dan petunjuk resmi produk.',
		googleProductCategory: 'Health & Beauty > Health Care',
		productType: 'Alat Kesehatan > Proteksi & Sterilisasi Ruang',
		mpn: 'ADP-UVRS-001'
	},
	{
		id: 'instrument-cabinet-1-pintu',
		slug: 'instrument-cabinet-1-pintu',
		name: 'Instrument Cabinet 1 Pintu',
		category: 'lemari-instrumen',
		brand: 'Alkes Dua Putry',
		sku: 'ADP-IC1-001',
		description:
			'Instrument Cabinet 1 Pintu digunakan untuk menyimpan instrumen dan perlengkapan klinik agar lebih tertata. Desain kabinet membantu staf melihat isi penyimpanan dengan mudah dan menjaga area kerja tetap rapi.',
		shortDescription: 'Lemari instrumen satu pintu untuk penyimpanan alat klinik dan rumah sakit.',
		image: '/products/instrument-cabinet-1-pintu.svg',
		availability: 'contact_admin',
		condition: 'new',
		specs: {
			'Tipe produk': 'Lemari instrumen 1 pintu',
			'Material': 'Stainless steel atau powder coating sesuai varian',
			'Pintu': 'Kaca atau kombinasi sesuai varian',
			'Penggunaan': 'Ruang tindakan, klinik, poli, rumah sakit'
		},
		packageContents: ['Unit lemari instrumen', 'Aksesori standar sesuai varian'],
		warranty: 'Garansi mengikuti ketentuan produk.',
		shippingNote: 'Produk dikirim dengan perlindungan sudut dan packing tambahan.',
		legalNote: 'Spesifikasi final mengikuti penawaran resmi.',
		googleProductCategory: 'Business & Industrial > Medical > Medical Furniture',
		productType: 'Alat Kesehatan > Lemari Instrumen',
		mpn: 'ADP-IC1-001'
	},
	{
		id: 'crib-1-person',
		slug: 'crib-1-person',
		name: 'Crib 1 Person',
		category: 'peralatan-nursery',
		brand: 'Alkes Dua Putry',
		sku: 'ADP-CRIB1-001',
		description:
			'Crib 1 Person merupakan tempat tidur bayi untuk kebutuhan ruang nursery atau fasilitas kesehatan. Struktur produk dirancang untuk penggunaan institusi dengan permukaan yang mudah dibersihkan.',
		shortDescription: 'Crib bayi satu tempat untuk ruang nursery klinik dan rumah sakit.',
		image: '/products/crib-1-person.svg',
		availability: 'contact_admin',
		condition: 'new',
		specs: {
			'Tipe produk': 'Crib 1 person',
			'Rangka': 'Metal finishing sesuai varian',
			'Roda': 'Opsional sesuai varian',
			'Penggunaan': 'Ruang bayi dan fasilitas kesehatan'
		},
		packageContents: ['Unit crib', 'Komponen standar sesuai varian'],
		warranty: 'Garansi mengikuti ketentuan distributor.',
		shippingNote: 'Dapat dikirim rakitan atau knock-down sesuai area pengiriman.',
		legalNote: 'Gunakan dengan pengawasan tenaga kesehatan atau petugas fasilitas.',
		googleProductCategory: 'Business & Industrial > Medical > Medical Furniture',
		productType: 'Alat Kesehatan > Peralatan Nursery',
		mpn: 'ADP-CRIB1-001'
	},
	{
		id: 'crib-2-person',
		slug: 'crib-2-person',
		name: 'Crib 2 Person',
		category: 'peralatan-nursery',
		brand: 'Alkes Dua Putry',
		sku: 'ADP-CRIB2-001',
		description:
			'Crib 2 Person membantu fasilitas kesehatan mengelola area nursery yang membutuhkan dua posisi tempat bayi dalam satu unit. Cocok untuk pengadaan ruang bayi dengan kebutuhan efisiensi ruang.',
		shortDescription: 'Crib dua tempat untuk kebutuhan ruang bayi di klinik atau rumah sakit.',
		image: '/products/crib-2-person.svg',
		availability: 'contact_admin',
		condition: 'new',
		specs: {
			'Tipe produk': 'Crib 2 person',
			'Konfigurasi': 'Dua posisi dalam satu unit',
			'Material': 'Metal finishing sesuai varian',
			'Penggunaan': 'Ruang nursery'
		},
		packageContents: ['Unit crib 2 person', 'Komponen standar sesuai varian'],
		warranty: 'Garansi mengikuti ketentuan produk.',
		shippingNote: 'Admin akan mengonfirmasi estimasi pengiriman sesuai kota tujuan.',
		legalNote: 'Spesifikasi final mengikuti varian yang tersedia.',
		googleProductCategory: 'Business & Industrial > Medical > Medical Furniture',
		productType: 'Alat Kesehatan > Peralatan Nursery',
		mpn: 'ADP-CRIB2-001'
	},
	{
		id: 'infant-bed',
		slug: 'infant-bed',
		name: 'Infant Bed',
		category: 'peralatan-nursery',
		brand: 'Alkes Dua Putry',
		sku: 'ADP-IB-001',
		description:
			'Infant Bed adalah tempat tidur bayi untuk area perawatan bayi di fasilitas kesehatan. Produk dipilih untuk kebutuhan tata ruang yang rapi, mudah dipindahkan, dan mudah dibersihkan.',
		shortDescription: 'Tempat tidur bayi untuk ruang perawatan bayi di fasilitas kesehatan.',
		image: '/products/infant-bed.svg',
		availability: 'contact_admin',
		condition: 'new',
		specs: {
			'Tipe produk': 'Infant bed',
			'Rangka': 'Metal atau stainless sesuai varian',
			'Box bayi': 'Acrylic atau varian lain sesuai ketersediaan',
			'Mobilitas': 'Roda sesuai varian'
		},
		packageContents: ['Unit infant bed', 'Box bayi sesuai varian'],
		warranty: 'Garansi mengikuti ketentuan distributor.',
		shippingNote: 'Packing disesuaikan agar bagian acrylic terlindungi.',
		legalNote: 'Ikuti panduan penggunaan dan SOP fasilitas.',
		googleProductCategory: 'Business & Industrial > Medical > Medical Furniture',
		productType: 'Alat Kesehatan > Peralatan Nursery',
		mpn: 'ADP-IB-001'
	},
	{
		id: 'infant-warmer',
		slug: 'infant-warmer',
		name: 'Infant Warmer',
		category: 'peralatan-nursery',
		brand: 'Alkes Dua Putry',
		sku: 'ADP-IW-001',
		description:
			'Infant Warmer adalah perangkat pendukung ruang bayi yang digunakan oleh fasilitas kesehatan sesuai prosedur dan pengawasan tenaga kesehatan. Detail model, fitur kontrol, dan aksesori akan dikonfirmasi melalui penawaran resmi.',
		shortDescription: 'Perangkat infant warmer untuk kebutuhan ruang bayi fasilitas kesehatan.',
		image: '/products/infant-warmer.svg',
		availability: 'contact_admin',
		condition: 'new',
		specs: {
			'Tipe produk': 'Infant warmer',
			'Penggunaan': 'Ruang bayi dan fasilitas kesehatan',
			'Kontrol': 'Sesuai model tersedia',
			'Aksesori': 'Sesuai paket penawaran'
		},
		packageContents: ['Unit infant warmer', 'Aksesori standar sesuai model'],
		warranty: 'Garansi mengikuti ketentuan pabrik dan distributor.',
		shippingNote: 'Pengiriman membutuhkan packing khusus dan konfirmasi armada.',
		legalNote: 'Penggunaan harus mengikuti petunjuk resmi produk dan tenaga kesehatan.',
		googleProductCategory: 'Business & Industrial > Medical > Medical Equipment',
		productType: 'Alat Kesehatan > Peralatan Nursery',
		mpn: 'ADP-IW-001'
	},
	{
		id: 'incubator-transport',
		slug: 'incubator-transport',
		name: 'Incubator Transport',
		category: 'peralatan-nursery',
		brand: 'Alkes Dua Putry',
		sku: 'ADP-IT-001',
		description:
			'Incubator Transport adalah alat penunjang pemindahan bayi dalam lingkungan fasilitas kesehatan sesuai prosedur medis. Ketersediaan model, spesifikasi teknis, dan dokumen pendukung perlu dikonfirmasi oleh admin sebelum pemesanan.',
		shortDescription: 'Transport incubator untuk kebutuhan fasilitas kesehatan dengan spesifikasi sesuai model.',
		image: '/products/incubator-transport.svg',
		availability: 'contact_admin',
		condition: 'new',
		specs: {
			'Tipe produk': 'Transport incubator',
			'Penggunaan': 'Fasilitas kesehatan',
			'Daya': 'Sesuai model',
			'Aksesori': 'Sesuai paket penawaran'
		},
		packageContents: ['Unit incubator transport', 'Aksesori standar sesuai model'],
		warranty: 'Garansi mengikuti ketentuan pabrik dan distributor.',
		shippingNote: 'Admin akan mengonfirmasi kebutuhan packing, asuransi, dan pengiriman.',
		legalNote: 'Digunakan oleh fasilitas dan tenaga terlatih sesuai petunjuk resmi produk.',
		googleProductCategory: 'Business & Industrial > Medical > Medical Equipment',
		productType: 'Alat Kesehatan > Peralatan Nursery',
		mpn: 'ADP-IT-001'
	},
	{
		id: 'trolley-usg',
		slug: 'trolley-usg',
		name: 'Trolley USG',
		category: 'trolley-medis',
		brand: 'Alkes Dua Putry',
		sku: 'ADP-TUSG-001',
		description:
			'Trolley USG membantu penempatan dan mobilitas perangkat USG di klinik atau rumah sakit. Desain rak dan roda memudahkan perpindahan antar ruang sesuai kebutuhan operasional.',
		shortDescription: 'Trolley untuk penempatan dan mobilitas perangkat USG di fasilitas kesehatan.',
		image: '/products/trolley-usg.svg',
		availability: 'contact_admin',
		condition: 'new',
		specs: {
			'Tipe produk': 'Trolley USG',
			'Material': 'Metal powder coating atau stainless sesuai varian',
			'Roda': 'Roda medis sesuai varian',
			'Rak': 'Konfigurasi sesuai model'
		},
		packageContents: ['Unit trolley USG', 'Aksesori standar sesuai model'],
		warranty: 'Garansi mengikuti ketentuan produk.',
		shippingNote: 'Pengiriman dapat disesuaikan antara rakitan atau knock-down.',
		legalNote: 'Pastikan ukuran trolley sesuai perangkat USG yang digunakan.',
		googleProductCategory: 'Business & Industrial > Medical > Medical Furniture',
		productType: 'Alat Kesehatan > Trolley Medis',
		mpn: 'ADP-TUSG-001'
	},
	{
		id: 'trolley-oxygen-2-tabung',
		slug: 'trolley-oxygen-2-tabung',
		name: 'Trolley Oxygen 2 Tabung',
		category: 'trolley-medis',
		brand: 'Alkes Dua Putry',
		sku: 'ADP-TO2-001',
		description:
			'Trolley Oxygen 2 Tabung digunakan untuk membantu mobilitas dua tabung oksigen dalam area fasilitas kesehatan. Produk ini mendukung penataan tabung agar lebih mudah dipindahkan oleh petugas.',
		shortDescription: 'Trolley untuk mobilitas dua tabung oksigen di klinik atau rumah sakit.',
		image: '/products/trolley-oxygen-2-tabung.svg',
		availability: 'contact_admin',
		condition: 'new',
		specs: {
			'Tipe produk': 'Trolley oxygen 2 tabung',
			'Kapasitas': 'Dua tabung oksigen sesuai ukuran yang kompatibel',
			'Material': 'Metal finishing sesuai varian',
			'Roda': 'Sesuai model'
		},
		packageContents: ['Unit trolley oxygen 2 tabung'],
		warranty: 'Garansi mengikuti ketentuan produk.',
		shippingNote: 'Tabung oksigen tidak termasuk kecuali tertulis dalam penawaran.',
		legalNote: 'Gunakan sesuai SOP keselamatan tabung gas medis.',
		googleProductCategory: 'Business & Industrial > Medical > Medical Furniture',
		productType: 'Alat Kesehatan > Trolley Medis',
		mpn: 'ADP-TO2-001'
	},
	{
		id: 'tabir-x-ray',
		slug: 'tabir-x-ray',
		name: 'Tabir X-Ray',
		category: 'proteksi-sterilisasi',
		brand: 'Alkes Dua Putry',
		sku: 'ADP-TXR-001',
		description:
			'Tabir X-Ray adalah perlengkapan proteksi ruang radiologi yang membantu pemisahan area kerja sesuai kebutuhan fasilitas. Spesifikasi ketebalan, dimensi, dan material harus dikonfirmasi sesuai standar ruangan dan penawaran resmi.',
		shortDescription: 'Tabir X-Ray untuk kebutuhan proteksi area radiologi fasilitas kesehatan.',
		image: '/products/tabir-x-ray.svg',
		availability: 'contact_admin',
		condition: 'new',
		specs: {
			'Tipe produk': 'Tabir X-Ray',
			'Penggunaan': 'Area radiologi',
			'Dimensi': 'Sesuai varian atau pesanan',
			'Material proteksi': 'Dikonfirmasi dalam penawaran resmi'
		},
		packageContents: ['Unit tabir X-Ray sesuai varian'],
		warranty: 'Garansi mengikuti ketentuan produk.',
		shippingNote: 'Pengiriman memerlukan konfirmasi ukuran, berat, dan akses lokasi.',
		legalNote: 'Pemilihan spesifikasi wajib mengikuti kebutuhan fasilitas dan standar terkait.',
		googleProductCategory: 'Business & Industrial > Medical > Medical Equipment',
		productType: 'Alat Kesehatan > Proteksi Ruang',
		mpn: 'ADP-TXR-001'
	},
	{
		id: 'hospital-bed-manual',
		slug: 'hospital-bed-manual',
		name: 'Hospital Bed Manual',
		category: 'hospital-furniture',
		brand: 'Alkes Dua Putry',
		sku: 'ADP-HBM-001',
		description:
			'Hospital Bed Manual adalah ranjang pasien untuk fasilitas kesehatan dengan pengaturan manual sesuai varian. Produk cocok untuk ruang rawat, klinik, dan kebutuhan pengadaan hospital furniture.',
		shortDescription: 'Ranjang pasien manual untuk ruang rawat klinik dan rumah sakit.',
		image: '/products/hospital-bed-manual.svg',
		availability: 'contact_admin',
		condition: 'new',
		specs: {
			'Tipe produk': 'Hospital bed manual',
			'Crank': 'Sesuai varian',
			'Side rail': 'Sesuai varian',
			'Roda': 'Dengan pengunci sesuai model'
		},
		packageContents: ['Unit hospital bed manual', 'Aksesori standar sesuai varian'],
		warranty: 'Garansi mengikuti ketentuan produk.',
		shippingNote: 'Dapat dibantu koordinasi pengiriman dan perakitan.',
		legalNote: 'Spesifikasi final mengikuti penawaran resmi.',
		googleProductCategory: 'Business & Industrial > Medical > Medical Furniture',
		productType: 'Alat Kesehatan > Hospital Furniture',
		mpn: 'ADP-HBM-001'
	}
];

export const latestProducts: ProductItem[] = products.slice(0, 3).map((product) => ({
	name: product.name,
	sku: product.sku,
	description: product.shortDescription,
	badge: product.availability === 'in_stock' ? 'Ready' : 'Hubungi Admin',
	features: Object.entries(product.specs)
		.slice(0, 3)
		.map(([key, value]) => `${key}: ${value}`)
}));

export const googleReviews = [
	{
		name: 'kiki94umb',
		date: 'Februari 2024',
		review:
			'Bisa supply ke Jawa Tengah untuk kebutuhan klinik. Admin responsif, informatif, dan koordinasi pengiriman rapi.',
		initials: 'K'
	},
	{
		name: 'Arti Harun',
		date: 'Maret 2024',
		review:
			'Pelayanan pembelian ranjang pasien dan kebutuhan fasilitas sangat baik. Barang dikirim sesuai koordinasi.',
		initials: 'A'
	},
	{
		name: 'Samiaji',
		date: 'April 2024',
		review:
			'Respons cepat dan koordinasi pengiriman sangat membantu saat kebutuhan fasilitas cukup mendesak.',
		initials: 'S'
	}
];

export const testimonials = [
	{
		quote:
			'Saya terbantu dengan penjelasan produk dan proses penawaran. Komunikasi after sales juga jelas.',
		name: 'Wakil Kepala RS',
		role: 'Pelanggan institusi'
	},
	{
		quote:
			'Pengiriman terkoordinasi, harga kompetitif, dan kualitas produk sesuai penawaran.',
		name: 'dr. Nunik Utami',
		role: 'Pelanggan fasilitas kesehatan'
	},
	{
		quote:
			'Proses pembelian terasa rapi dari konsultasi kebutuhan sampai barang diterima.',
		name: 'Wisnu Khabul',
		role: 'Pelanggan pengadaan'
	}
];

export const portfolioItems = [
	{
		title: 'Pengadaan Hospital Furniture Klinik',
		copy: 'Penyediaan ranjang pasien, bedside cabinet, trolley, dan furniture ruang rawat sesuai kebutuhan fasilitas.'
	},
	{
		title: 'Peralatan Nursery Fasilitas Kesehatan',
		copy: 'Koordinasi kebutuhan crib, infant bed, infant warmer, dan perangkat pendukung ruang bayi.'
	},
	{
		title: 'Produk Ruang Tindakan dan Penunjang',
		copy: 'Konsultasi lemari instrumen, trolley medis, UV room sterilizer, dan perlengkapan ruang tertentu.'
	}
];

export const blogPosts = [
	{
		title: 'Cara Memilih Hospital Furniture untuk Klinik',
		excerpt: 'Panduan singkat memahami material, fungsi ruang, pengiriman, dan dukungan purna jual sebelum membeli.'
	},
	{
		title: 'Checklist Pengadaan Alat Kesehatan Non-Obat',
		excerpt: 'Daftar poin yang perlu disiapkan untuk pengadaan furniture, trolley, dan peralatan penunjang.'
	},
	{
		title: 'Catatan Kebijakan Retur untuk Produk Alkes',
		excerpt: 'Memahami batas retur produk besar dan produk yang bersentuhan langsung dengan tubuh demi alasan higienitas.'
	}
];

export function getProductBySlug(slug: string) {
	return products.find((product) => product.slug === slug);
}

export function getCategoryBySlug(slug: string) {
	return productCategories.find((category) => category.slug === slug);
}

export function getProductsByCategory(slug: string) {
	return products.filter((product) => product.category === slug);
}

export function getAvailabilityLabel(availability: Product['availability']) {
	return {
		in_stock: 'Ready',
		preorder: 'Pre Order',
		contact_admin: 'Hubungi Admin'
	}[availability];
}

// Compliance: produk obat, obat resep, suplemen terapi, test kit sensitif, dan klaim
// penyembuhan tidak boleh dimasukkan ke feed tanpa validasi legal/manual.
export function getMerchantEligibleProducts() {
	return products.filter((product) => typeof product.price === 'number' && product.price > 0);
}
