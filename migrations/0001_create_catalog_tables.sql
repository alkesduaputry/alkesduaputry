CREATE TABLE IF NOT EXISTS catalog_sources (
	id TEXT PRIMARY KEY,
	title TEXT NOT NULL,
	url TEXT NOT NULL,
	file_name TEXT NOT NULL,
	status TEXT NOT NULL DEFAULT 'draft',
	created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS catalog_pages (
	id TEXT PRIMARY KEY,
	source_id TEXT NOT NULL,
	page_number INTEGER NOT NULL,
	raw_text TEXT NOT NULL,
	pdf_text TEXT,
	image_path TEXT,
	ocr_engine TEXT NOT NULL DEFAULT 'tesseract ind+eng',
	created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (source_id) REFERENCES catalog_sources(id) ON DELETE CASCADE,
	UNIQUE (source_id, page_number)
);

CREATE TABLE IF NOT EXISTS catalog_items (
	id TEXT PRIMARY KEY,
	source_id TEXT NOT NULL,
	page_number INTEGER NOT NULL,
	item_index INTEGER NOT NULL DEFAULT 1,
	sku TEXT,
	name TEXT,
	suggested_name TEXT,
	category TEXT,
	brand TEXT,
	normal_price INTEGER,
	sale_price INTEGER,
	discount_percent INTEGER,
	confidence_score INTEGER NOT NULL DEFAULT 0,
	specs_json TEXT,
	raw_text TEXT NOT NULL,
	review_status TEXT NOT NULL DEFAULT 'needs_review',
	created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (source_id) REFERENCES catalog_sources(id) ON DELETE CASCADE,
	UNIQUE (source_id, page_number, item_index)
);

CREATE INDEX IF NOT EXISTS idx_catalog_pages_source_page ON catalog_pages(source_id, page_number);
CREATE INDEX IF NOT EXISTS idx_catalog_items_source_page ON catalog_items(source_id, page_number);
CREATE INDEX IF NOT EXISTS idx_catalog_items_sku ON catalog_items(sku);
CREATE INDEX IF NOT EXISTS idx_catalog_items_review_status ON catalog_items(review_status);
