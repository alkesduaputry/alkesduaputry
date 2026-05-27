import fs from 'node:fs';
import path from 'node:path';

const sourceId = 'katalog-2025';
const sourceUrl = 'https://files.alkesduaputry.com/katalog-2025.pdf';
const root = process.cwd();
const ocrPath = path.join(root, 'tmp/pdfs/katalog-2025-ocr.txt');
const pdfTextPath = path.join(root, 'tmp/pdfs/katalog-2025-pdftotext.txt');
const outPath = path.join(root, 'tmp/pdfs/katalog-2025-import.sql');

function sql(value) {
	if (value === null || value === undefined) return 'NULL';
	return `'${String(value).replaceAll("'", "''")}'`;
}

function intSql(value) {
	return Number.isFinite(value) ? String(value) : 'NULL';
}

function cleanOcrText(value) {
	return String(value ?? '')
		.replaceAll('\u00c2\u00a9', '')
		.replaceAll('\u00c2\u00ae', '')
		.replaceAll('\u00c2', '')
		.replaceAll('\u00e2\u20ac\u0153', '"')
		.replaceAll('\u00e2\u20ac\u009d', '"')
		.replaceAll('\u00e2\u20ac\u02dc', "'")
		.replaceAll('\u00e2\u20ac\u2122', "'")
		.replaceAll('\u00e2\u20ac\u201d', '-')
		.replaceAll('\u00e2\u20ac\u201c', '-')
		.replaceAll('\u00e2\u20ac\u00a2', '')
		.replaceAll('\u00e2\u20ac\u00a6', '...')
		.replace(/[|]+/g, ' ')
		.replace(/[^\x09\x0a\x0d\x20-\x7e]/g, ' ')
		.replace(/[ \t]+/g, ' ')
		.replace(/[ \t]+\r?\n/g, '\n')
		.replace(/\r?\n[ \t]+/g, '\n')
		.replace(/\n{3,}/g, '\n\n')
		.trim();
}

function parseMoney(value) {
	if (!value) return null;
	const digits = value.replace(/[^\d]/g, '');
	if (!digits) return null;
	return Number.parseInt(digits, 10);
}

function splitOcrPages(raw) {
	const pages = new Map();
	const re = /\n=== page-(\d{3}) ===\n([\s\S]*?)(?=\n=== page-\d{3} ===\n|$)/g;
	for (const match of raw.matchAll(re)) {
		pages.set(Number.parseInt(match[1], 10), cleanOcrText(match[2]));
	}
	return pages;
}

function splitPdfTextPages(raw) {
	return raw.split('\f').map((page) => cleanOcrText(page));
}

function normalizeSku(line) {
	const normalized = line
		.toUpperCase()
		.replace(/\s+/g, ' ')
		.replace(/ALKES\s+DUAPUTRY\s*-\s*/g, 'ALKES DUAPUTRY-')
		.replace(/AGUNG\s+MEDIKA\s*-\s*/g, 'AGUNG MEDIKA-')
		.replace(/[^\w\s-]/g, '')
		.trim();
	const match = normalized.match(/^(ALKES DUAPUTRY|AGUNG MEDIKA)-\s*([A-Z0-9]+)(?:\s+([A-Z]))?/);
	if (!match) return normalized;
	return `${match[1]}-${match[2]}${match[3] ?? ''}`;
}

function detectCategory(text) {
	const upper = text.toUpperCase();
	if (upper.includes('TEMPAT TIDUR PASIEN') || upper.includes('BRANKAR')) return 'hospital-bed';
	if (upper.includes('ALAS MATRASS') || upper.includes('SANDARAN KEPALA')) return 'hospital-bed';
	if (upper.includes('OVER BED TABLE') || upper.includes('MEJA')) return 'hospital-furniture';
	if (upper.includes('TROLL') || upper.includes('TROLI')) return 'trolley-medis';
	if (upper.includes('LEMARI')) return 'lemari-instrumen';
	if (upper.includes('INFANT') || upper.includes('BAYI') || upper.includes('BABY')) return 'peralatan-nursery';
	return 'uncategorized';
}

function isBadNameLine(line) {
	return [
		/ALKESDUAPUTRY\.?COM/i,
		/ALKESDUAPUT/i,
		/HUBUNGI/i,
		/0857/,
		/^SPESI(F|T)IKASI\b/i,
		/^KONSTRUKSI\b/i,
		/^DIMENSI\b/i,
		/^FINI(S|SI)HING\b/i,
		/^HARGA\b/i,
		/^DISCOUNT\b/i,
		/^ALKES DUAPUTRY/i,
		/^AGUNG MEDIKA/i,
		/^MEJA \(BAGIAN ATAS\)/i,
		/^ALAS MATRASS\b/i,
		/^SANDARAN\b/i,
		/^PENGAMAN\b/i,
		/^NAIK TURUN\b/i,
		/^UNTUK\b/i,
		/^RODA\b/i,
		/^(FREP|ERE|WARE|MAT|QO|AS|EE|A)$/i,
		/^[^A-Z0-9]*$/i
	].some((pattern) => pattern.test(line));
}

function normalizeNameLine(line) {
	return line
		.replace(/[^\w\s().,&/-]/g, ' ')
		.replace(/_/g, ' ')
		.replace(/\s+/g, ' ')
		.trim();
}

function suggestNameFromSku(sku, category) {
	if (/-(0+)?01[AB]$/i.test(sku) || /-001[AB]$/i.test(sku)) {
		return `Hospital Bed Manual ${sku}`;
	}
	if (category === 'hospital-bed') return `Perlu Review - ${sku}`;
	return `Perlu Review - ${sku}`;
}

function detectName(text, sku, category) {
	const candidates = text
		.split(/\r?\n/)
		.map(normalizeNameLine)
		.filter((line) => line.length >= 5 && !isBadNameLine(line));

	const productKeyword = /\b(TEMPAT TIDUR|HOSPITAL BED|BRANKAR|OVER BED TABLE|TROLL(?:EY|I)|LEMARI|INFANT|BABY|BAYI|MEJA|KURSI|CABINET|BED)\b/i;
	const clearName = candidates.find((line) => productKeyword.test(line));
	if (clearName) {
		return {
			name: null,
			suggestedName: clearName.toUpperCase(),
			confidenceScore: 70
		};
	}

	return {
		name: null,
		suggestedName: suggestNameFromSku(sku, category),
		confidenceScore: category === 'hospital-bed' ? 35 : 20
	};
}

function parseSpecs(text) {
	const specs = {};
	for (const line of text.split(/\r?\n/)) {
		const cleaned = line.replace(/[^\w\s().,&/:+-]/g, '').replace(/\s+/g, ' ').trim();
		const match = cleaned.match(/^(.{3,45}?)\s*:\s*(.{2,})$/);
		if (!match) continue;
		const key = match[1].trim();
		const value = match[2].trim();
		if (/^(HARGA|DISCOUNT|HUBUNGI|SPESIFIKASI)$/i.test(key)) continue;
		specs[key] = value;
	}
	return specs;
}

function extractNormalPrices(text) {
	return [...text.matchAll(/HARGA\s*NORMAL\s*[:=]?\s*([0-9][0-9.,-]*)/gi)].map((m) =>
		parseMoney(m[1])
	);
}

function extractDiscounts(text) {
	return [...text.matchAll(/DISCOUNT\s*(\d+)%?\s*[:=]?\s*([0-9][0-9.,-]*)/gi)].map((m) => ({
		percent: Number.parseInt(m[1], 10),
		price: parseMoney(m[2])
	}));
}

function extractItems(pageNumber, rawText, pdfText) {
	const pdfSkuMatches = [
		...pdfText.matchAll(/(?:ALKES\s+DUAPUTRY|AGUNG\s+MEDIKA)\s*-\s*[A-Z0-9 ]+/gi)
	];
	const ocrSkuMatches = [
		...rawText.matchAll(/(?:ALKES\s+DUAPUTRY|AGUNG\s+MEDIKA)\s*-\s*[A-Z0-9 ]+/gi)
	];
	const skuMatches = pdfSkuMatches.length > 0 ? pdfSkuMatches : ocrSkuMatches;
	const skus = [...new Set(skuMatches.map((match) => normalizeSku(match[0])))];
	if (skus.length === 0) return [];

	const normalPrices = extractNormalPrices(pdfText);
	const fallbackNormalPrices = extractNormalPrices(rawText);
	const discounts = extractDiscounts(pdfText);
	const fallbackDiscounts = extractDiscounts(rawText);
	const specs = parseSpecs(rawText);

	return skus.map((sku, index) => {
		const category = detectCategory(rawText);
		const nameInfo = detectName(rawText, sku, category);
		const discount = discounts[index] ?? discounts[0] ?? fallbackDiscounts[index] ?? fallbackDiscounts[0];

		return {
			id: `${sourceId}-p${String(pageNumber).padStart(3, '0')}-${index + 1}`,
			sku,
			name: nameInfo.name,
			suggestedName: nameInfo.suggestedName,
			confidenceScore: nameInfo.confidenceScore,
			category,
			brand: sku.startsWith('AGUNG MEDIKA') ? 'Agung Medika' : 'Alkes Dua Putry',
			normalPrice: normalPrices[index] ?? normalPrices[0] ?? fallbackNormalPrices[index] ?? null,
			salePrice: discount?.price ?? null,
			discountPercent: discount?.percent ?? null,
			specs: {
				...specs,
				_extraction: {
					confidence_score: nameInfo.confidenceScore,
					name_source: nameInfo.confidenceScore >= 70 ? 'ocr_product_keyword' : 'sku_fallback',
					price_source: normalPrices.length > 0 || discounts.length > 0 ? 'pdf_text' : 'ocr_text'
				}
			}
		};
	});
}

if (!fs.existsSync(ocrPath) || !fs.existsSync(pdfTextPath)) {
	throw new Error('OCR/text files not found. Run PDF extraction first.');
}

const ocrPages = splitOcrPages(fs.readFileSync(ocrPath, 'utf8'));
const pdfTextPages = splitPdfTextPages(fs.readFileSync(pdfTextPath, 'utf8'));
const statements = [
	`INSERT OR REPLACE INTO catalog_sources (id, title, url, file_name, status, updated_at) VALUES (${sql(sourceId)}, ${sql('Katalog Alkes Dua Putry 2025')}, ${sql(sourceUrl)}, ${sql('katalog-2025.pdf')}, ${sql('needs_review')}, CURRENT_TIMESTAMP);`
];

let itemCount = 0;
for (const [pageNumber, rawText] of [...ocrPages.entries()].sort((a, b) => a[0] - b[0])) {
	const pdfText = pdfTextPages[pageNumber - 1] ?? '';
	const pageId = `${sourceId}-p${String(pageNumber).padStart(3, '0')}`;
	const imagePath = `katalog-2025/pages/page-${String(pageNumber).padStart(3, '0')}.png`;

	statements.push(
		`INSERT OR REPLACE INTO catalog_pages (id, source_id, page_number, raw_text, pdf_text, image_path, updated_at) VALUES (${sql(pageId)}, ${sql(sourceId)}, ${pageNumber}, ${sql(rawText)}, ${sql(pdfText)}, ${sql(imagePath)}, CURRENT_TIMESTAMP);`
	);

	const items = extractItems(pageNumber, rawText, pdfText);
	for (const [index, item] of items.entries()) {
		itemCount += 1;
		statements.push(
			`INSERT OR REPLACE INTO catalog_items (id, source_id, page_number, item_index, sku, name, suggested_name, category, brand, normal_price, sale_price, discount_percent, confidence_score, specs_json, raw_text, review_status, updated_at) SELECT ${sql(item.id)}, ${sql(sourceId)}, ${pageNumber}, ${index + 1}, ${sql(item.sku)}, ${sql(item.name)}, ${sql(item.suggestedName)}, ${sql(item.category)}, ${sql(item.brand)}, ${intSql(item.normalPrice)}, ${intSql(item.salePrice)}, ${intSql(item.discountPercent)}, ${intSql(item.confidenceScore)}, ${sql(JSON.stringify(item.specs))}, ${sql(rawText)}, ${sql('needs_review')}, CURRENT_TIMESTAMP WHERE NOT EXISTS (SELECT 1 FROM catalog_items WHERE id = ${sql(item.id)} AND review_status = 'approved');`
		);
	}
}

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, `${statements.join('\n')}\n`);

console.log(`Wrote ${outPath}`);
console.log(`Pages: ${ocrPages.size}`);
console.log(`Draft items: ${itemCount}`);
