ALTER TABLE catalog_items ADD COLUMN slug TEXT;
CREATE UNIQUE INDEX IF NOT EXISTS idx_catalog_items_slug ON catalog_items(slug);
