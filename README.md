# AlkesDuaPutry

Website company profile dan katalog produk alat kesehatan berbasis SvelteKit, dengan animasi GSAP dan target deployment ke Cloudflare.

## Stack

- SvelteKit + TypeScript
- GSAP
- `@sveltejs/adapter-cloudflare`

## Menjalankan lokal

```sh
npm install
npm run dev
```

## Validasi

```sh
npm run check
npm run build
```

## Struktur utama

- `src/routes/+page.svelte` untuk homepage
- `src/routes/+layout.svelte` untuk layout global
- `src/lib/components` untuk section homepage dan layout
- `src/lib/data/products.ts` untuk data hardcode produk, review, dan testimoni
