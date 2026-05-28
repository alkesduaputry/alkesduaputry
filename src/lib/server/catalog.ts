import type { RequestEvent } from '@sveltejs/kit';
import { products as staticProducts, type Product } from '$lib/data/products';

export const FILES_BASE_URL = 'https://files.alkesduaputry.com';
export const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
export const ALLOWED_IMAGE_TYPES = new Map([
	['image/jpeg', 'jpg'],
	['image/png', 'png'],
	['image/webp', 'webp']
]);

export type CatalogStatus = 'needs_review' | 'approved' | 'rejected' | 'deleted';
export type CatalogStatusFilter = CatalogStatus | 'all';

export type CatalogDbItem = {
	id: string;
	source_id: string;
	page_number: number;
	item_index: number;
	sku: string | null;
	slug: string | null;
	name: string | null;
	suggested_name: string | null;
	category: string | null;
	brand: string | null;
	normal_price: number | null;
	sale_price: number | null;
	discount_percent: number | null;
	confidence_score: number | null;
	specs_json: string | null;
	raw_text?: string | null;
	review_status: CatalogStatus;
	image_path: string | null;
	image_alt: string | null;
	image_updated_at?: string | null;
	source_type: string | null;
	deleted_at: string | null;
	page_image_path: string | null;
	display_image_path: string | null;
};

export type CatalogCategorySummary = {
	slug: string;
	title: string;
	shortTitle: string;
	description: string;
	highlights: string[];
	count: number;
};

const categoryLabels: Record<string, Omit<CatalogCategorySummary, 'slug' | 'count'>> = {
	'hospital-bed': {
		title: 'Hospital Bed',
		shortTitle: 'Hospital Bed',
		description: 'Ranjang pasien dan tempat tidur perawatan dari katalog Alkes Dua Putry.',
		highlights: ['Manual', 'Elektrik', 'Aksesori ranjang']
	},
	'hospital-furniture': {
		title: 'Hospital Furniture',
		shortTitle: 'Furniture',
		description: 'Furniture klinik dan rumah sakit dari katalog Alkes Dua Putry.',
		highlights: ['Meja', 'Brankar', 'Furniture medis']
	},
	'trolley-medis': {
		title: 'Trolley Medis',
		shortTitle: 'Trolley',
		description: 'Trolley dan perlengkapan mobilitas alat medis dari katalog Alkes Dua Putry.',
		highlights: ['Trolley alat', 'Trolley oksigen', 'Trolley tindakan']
	},
	'lemari-instrumen': {
		title: 'Lemari Instrumen',
		shortTitle: 'Lemari',
		description: 'Lemari dan kabinet instrumen dari katalog Alkes Dua Putry.',
		highlights: ['Lemari alat', 'Kabinet', 'Penyimpanan instrumen']
	},
	'peralatan-nursery': {
		title: 'Peralatan Nursery',
		shortTitle: 'Nursery',
		description: 'Peralatan bayi dan nursery dari katalog Alkes Dua Putry.',
		highlights: ['Infant', 'Baby', 'Nursery']
	},
	uncategorized: {
		title: 'Produk Alkes Lainnya',
		shortTitle: 'Lainnya',
		description: 'Produk alat kesehatan lain dari katalog Alkes Dua Putry.',
		highlights: ['Produk katalog', 'Konfirmasi admin', 'Stok sesuai ketersediaan']
	}
};

const baseSelect = `
SELECT
  i.*,
  p.image_path AS page_image_path,
  COALESCE(i.image_path, p.image_path) AS display_image_path
FROM catalog_items i
LEFT JOIN catalog_pages p
  ON p.source_id = i.source_id
 AND p.page_number = i.page_number
`;

function getDb(event: RequestEvent) {
	return event.platform?.env.DB;
}

function getBucket(event: RequestEvent) {
	return event.platform?.env.BUCKET;
}

export function slugify(value: string) {
	return value
		.toLowerCase()
		.normalize('NFKD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '')
		.slice(0, 90);
}

export function buildCatalogSlug(name: string | null, sku: string | null, id: string) {
	const base = slugify([name, sku].filter(Boolean).join(' '));
	return `${base || slugify(id) || 'produk'}-${slugify(id).slice(-10)}`;
}

function publicImage(path: string | null) {
	return path ? `${FILES_BASE_URL}/${path}` : '/products/hospital-bed-manual.svg';
}

export function getCatalogCategoryMeta(slug: string, count = 0): CatalogCategorySummary {
	const meta = categoryLabels[slug] ?? categoryLabels.uncategorized;
	return {
		slug,
		count,
		...meta
	};
}

function cleanText(formData: FormData, key: string) {
	const value = formData.get(key);
	return typeof value === 'string' && value.trim() ? value.trim() : null;
}

function parseNullableNumber(formData: FormData, key: string) {
	const value = formData.get(key);
	if (typeof value !== 'string' || !value.trim()) return null;
	const normalized = value.replace(/[^\d]/g, '');
	if (!normalized) return null;
	const parsed = Number.parseInt(normalized, 10);
	return Number.isFinite(parsed) ? parsed : null;
}

function parseSpecsJson(specsJson: string | null, description: string | null) {
	let parsed: Record<string, unknown> = {};
	if (specsJson) {
		try {
			parsed = JSON.parse(specsJson) as Record<string, unknown>;
		} catch {
			parsed = { Catatan: specsJson };
		}
	}

	if (description) {
		parsed._manual = { ...(typeof parsed._manual === 'object' ? parsed._manual : {}), description };
	}

	return JSON.stringify(parsed);
}

function getDescription(value: string | null, name: string) {
	if (!value) {
		return `${name} dari katalog Alkes Dua Putry. Hubungi admin untuk konfirmasi stok, dokumen, dan pengiriman.`;
	}

	try {
		const parsed = JSON.parse(value) as { _manual?: { description?: unknown } };
		if (typeof parsed._manual?.description === 'string' && parsed._manual.description.trim()) {
			return parsed._manual.description.trim();
		}
	} catch {
		// Ignore malformed JSON and use the default description.
	}

	return `${name} dari katalog Alkes Dua Putry. Hubungi admin untuk konfirmasi stok, dokumen, dan pengiriman.`;
}

function parseSpecs(value: string | null) {
	if (!value) return {};
	try {
		const parsed = JSON.parse(value) as Record<string, unknown>;
		const entries = Object.entries(parsed)
			.filter(([key, item]) => !key.startsWith('_') && typeof item === 'string' && item.trim())
			.map(([key, item]) => [key, String(item)]);
		return Object.fromEntries(entries);
	} catch {
		return {};
	}
}

export function catalogItemToProduct(item: CatalogDbItem): Product | null {
	const name = item.name?.trim();
	if (!name || item.review_status !== 'approved' || item.deleted_at) return null;
	if (!item.display_image_path) return null;

	const price = item.normal_price && item.normal_price > 0 ? item.normal_price : undefined;
	const salePrice = item.sale_price && item.sale_price > 0 ? item.sale_price : undefined;
	const slug = item.slug || buildCatalogSlug(name, item.sku, item.id);
	const image = publicImage(item.display_image_path);
	const category = item.category || 'hospital-furniture';
	const specs = parseSpecs(item.specs_json);
	const description = getDescription(item.specs_json, name);

	return {
		id: item.id,
		slug,
		name,
		category,
		brand: item.brand || 'Alkes Dua Putry',
		sku: item.sku || item.id,
		description,
		shortDescription: description,
		image,
		price,
		salePrice,
		availability: 'in_stock',
		condition: 'new',
		specs,
		warranty: 'Garansi mengikuti ketentuan produk dan distributor.',
		shippingNote: 'Estimasi pengiriman dikonfirmasi berdasarkan alamat dan jenis produk.',
		legalNote: 'Spesifikasi final mengikuti penawaran resmi dan hasil konfirmasi admin.',
		googleProductCategory: 'Business & Industrial > Medical',
		productType: `Alat Kesehatan > ${category}`,
		mpn: item.sku || item.id
	};
}

export async function getCatalogItems(event: RequestEvent, status: CatalogStatusFilter = 'needs_review') {
	const db = getDb(event);
	if (!db) return [];

	const where = status === 'all' ? '' : 'WHERE i.review_status = ?';
	const statement = db.prepare(`
${baseSelect}
${where}
ORDER BY i.page_number ASC, i.item_index ASC
LIMIT 100
`);
	const { results } =
		status === 'all'
			? await statement.all<CatalogDbItem>()
			: await statement.bind(status).all<CatalogDbItem>();

	return results as CatalogDbItem[];
}

export async function getApprovedCatalogItems(event: RequestEvent) {
	try {
		const items = await getCatalogItems(event, 'approved');
		return items.map(catalogItemToProduct).filter((product): product is Product => Boolean(product));
	} catch {
		return [];
	}
}

export async function getApprovedCatalogCategories(event: RequestEvent) {
	const products = await getApprovedCatalogItems(event);
	const counts = new Map<string, number>();

	for (const product of products) {
		counts.set(product.category, (counts.get(product.category) ?? 0) + 1);
	}

	return [...counts.entries()]
		.map(([slug, count]) => getCatalogCategoryMeta(slug, count))
		.sort((a, b) => a.title.localeCompare(b.title));
}

export async function getApprovedCatalogItemBySlug(event: RequestEvent, slug: string) {
	const db = getDb(event);
	if (!db) return null;

	try {
		const direct = await db
			.prepare(`${baseSelect} WHERE i.review_status = 'approved' AND i.deleted_at IS NULL AND i.slug = ? LIMIT 1`)
			.bind(slug)
			.first<CatalogDbItem>();
		if (direct) return catalogItemToProduct(direct);

		const items = await getCatalogItems(event, 'approved');
		const found = items.find((item) => {
			const name = item.name?.trim();
			return name && buildCatalogSlug(name, item.sku, item.id) === slug;
		});

		return found ? catalogItemToProduct(found) : null;
	} catch {
		return null;
	}
}

export async function generateUniqueSlug(event: RequestEvent, name: string, sku: string | null, currentId?: string) {
	const db = getDb(event);
	const staticSlugs = new Set(staticProducts.map((product) => product.slug));
	const base = slugify([name, sku].filter(Boolean).join(' ')) || 'produk';
	let candidate = base;
	let index = 2;

	while (staticSlugs.has(candidate)) {
		candidate = `${base}-${index++}`;
	}

	if (!db) return candidate;

	while (true) {
		const existing = await db
			.prepare('SELECT id FROM catalog_items WHERE slug = ? AND id <> ? LIMIT 1')
			.bind(candidate, currentId ?? '')
			.first<{ id: string }>();
		if (!existing) return candidate;
		candidate = `${base}-${index++}`;
	}
}

export async function uploadProductImage(event: RequestEvent, itemId: string, file: File, slug?: string | null) {
	const bucket = getBucket(event);
	if (!bucket) throw new Error('R2 bucket binding is missing.');
	if (file.size <= 0) throw new Error('File gambar kosong.');
	if (file.size > MAX_IMAGE_SIZE) throw new Error('Ukuran gambar maksimal 5 MB.');

	const ext = ALLOWED_IMAGE_TYPES.get(file.type);
	if (!ext) throw new Error('Format gambar hanya boleh JPG, PNG, atau WebP.');

	const folder = itemId.startsWith('manual-') ? 'katalog-2025/products/manual' : 'katalog-2025/products';
	const safeName = slugify(slug || itemId) || itemId;
	const key = `${folder}/${safeName}-${Date.now()}.${ext}`;

	await bucket.put(key, await file.arrayBuffer(), {
		httpMetadata: {
			contentType: file.type,
			cacheControl: 'public, max-age=31536000, immutable'
		}
	});

	return key;
}

export async function updateCatalogItem(event: RequestEvent, formData: FormData) {
	const db = getDb(event);
	if (!db) throw new Error('D1 binding DB is missing.');

	const id = cleanText(formData, 'id');
	if (!id) throw new Error('ID item tidak ditemukan.');

	const name = cleanText(formData, 'name');
	const suggestedName = cleanText(formData, 'suggested_name');
	const sku = cleanText(formData, 'sku');
	const status = (cleanText(formData, 'review_status') || 'needs_review') as CatalogStatus;
	const finalName = name ?? suggestedName;
	const slug = finalName ? await generateUniqueSlug(event, finalName, sku, id) : cleanText(formData, 'slug');
	const salePrice = parseNullableNumber(formData, 'sale_price');

	if (status === 'approved') {
		if (!finalName) throw new Error('Nama wajib diisi sebelum status approved.');
		if (!salePrice || salePrice <= 0) throw new Error('Sale price wajib diisi dan lebih dari 0 sebelum status approved.');
	}

	await db
		.prepare(
			`UPDATE catalog_items
			 SET name = ?, suggested_name = ?, category = ?, brand = ?, sku = ?, normal_price = ?,
			     sale_price = ?, discount_percent = ?, review_status = ?, image_alt = ?,
			     slug = COALESCE(?, slug), deleted_at = CASE WHEN ? = 'deleted' THEN CURRENT_TIMESTAMP ELSE deleted_at END,
			     updated_at = CURRENT_TIMESTAMP
			 WHERE id = ?`
		)
		.bind(
			status === 'approved' ? finalName : name,
			suggestedName,
			cleanText(formData, 'category'),
			cleanText(formData, 'brand'),
			sku,
			parseNullableNumber(formData, 'normal_price'),
			salePrice,
			parseNullableNumber(formData, 'discount_percent'),
			status,
			cleanText(formData, 'image_alt'),
			slug,
			status,
			id
		)
		.run();

	return id;
}

export async function createManualProduct(event: RequestEvent, formData: FormData) {
	const db = getDb(event);
	if (!db) throw new Error('D1 binding DB is missing.');

	const name = cleanText(formData, 'name');
	if (!name) throw new Error('Nama produk wajib diisi.');

	const sku = cleanText(formData, 'sku') ?? `MANUAL-${Date.now()}`;
	const status = (cleanText(formData, 'review_status') || 'approved') as CatalogStatus;
	const normalPrice = parseNullableNumber(formData, 'normal_price');
	const salePrice = parseNullableNumber(formData, 'sale_price');
	if (status === 'approved' && (!((salePrice ?? normalPrice ?? 0) > 0))) {
		throw new Error('Harga wajib diisi jika produk langsung approved.');
	}

	const id = `manual-${Date.now()}`;
	const requestedSlug = cleanText(formData, 'slug');
	const slug = requestedSlug
		? await generateUniqueSlug(event, requestedSlug, null)
		: await generateUniqueSlug(event, name, sku);
	const file = formData.get('product_image');
	const imagePath = file instanceof File && file.size > 0 ? await uploadProductImage(event, id, file, slug) : null;
	const specsJson = parseSpecsJson(cleanText(formData, 'specs_json'), cleanText(formData, 'description'));
	const pageNumber = Date.now();

	await db
		.prepare(
			`INSERT INTO catalog_items (
				id, source_id, page_number, item_index, sku, slug, name, suggested_name, category,
				brand, normal_price, sale_price, discount_percent, confidence_score, specs_json,
				raw_text, review_status, image_path, image_alt, image_updated_at, source_type,
				deleted_at, updated_at
			) VALUES (?, 'manual', ?, 1, ?, ?, ?, ?, ?, ?, ?, ?, ?, 100, ?, '', ?, ?, ?, CASE WHEN ? IS NULL THEN NULL ELSE CURRENT_TIMESTAMP END, 'manual', NULL, CURRENT_TIMESTAMP)`
		)
		.bind(
			id,
			pageNumber,
			sku,
			slug,
			name,
			cleanText(formData, 'suggested_name'),
			cleanText(formData, 'category') ?? 'hospital-furniture',
			cleanText(formData, 'brand') ?? 'Alkes Dua Putry',
			normalPrice,
			salePrice,
			parseNullableNumber(formData, 'discount_percent'),
			specsJson,
			status,
			imagePath,
			cleanText(formData, 'image_alt') ?? name,
			imagePath
		)
		.run();

	return { id, slug };
}

export async function softDeleteCatalogItem(event: RequestEvent, itemId: string) {
	const db = getDb(event);
	if (!db) throw new Error('D1 binding DB is missing.');

	await db
		.prepare(
			`UPDATE catalog_items
			 SET review_status = 'deleted', deleted_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP
			 WHERE id = ?`
		)
		.bind(itemId)
		.run();
}

export async function restoreCatalogItem(event: RequestEvent, itemId: string, status: CatalogStatus = 'needs_review') {
	const db = getDb(event);
	if (!db) throw new Error('D1 binding DB is missing.');

	const nextStatus = status === 'approved' ? 'approved' : 'needs_review';
	await db
		.prepare(
			`UPDATE catalog_items
			 SET review_status = ?, deleted_at = NULL, updated_at = CURRENT_TIMESTAMP
			 WHERE id = ?`
		)
		.bind(nextStatus, itemId)
		.run();
}
