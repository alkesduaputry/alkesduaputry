ALTER TABLE catalog_items ADD COLUMN source_type TEXT DEFAULT 'ocr';
ALTER TABLE catalog_items ADD COLUMN deleted_at TEXT;
UPDATE catalog_items SET source_type = 'ocr' WHERE source_type IS NULL;
