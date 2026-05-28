<script lang="ts">
	import type { ActionData, PageData } from './$types';

	let { data, form } = $props<{ data: PageData; form: ActionData }>();
</script>

<svelte:head>
	<title>Tambah Produk Baru | Admin Alkes Dua Putry</title>
	<meta name="robots" content="noindex,nofollow" />
</svelte:head>

<section class="admin-shell">
	<div class="admin-head">
		<div>
			<span class="eyebrow">Admin</span>
			<h1>Tambah Produk Baru</h1>
			<p>Produk manual langsung tersimpan ke D1 dan gambar tersimpan ke R2.</p>
		</div>
		<a class="btn btn-outline-dark" href="/admin/catalog-review?status=approved">Kembali ke Katalog</a>
	</div>

	{#if form?.message}
		<p class="notice">
			{form.message}
			{#if form.slug}
				<a href={`/produk/${form.slug}`} target="_blank" rel="noreferrer">Lihat produk</a>
			{/if}
		</p>
	{/if}

	{#if data.missingPassword}
		<div class="panel">
			<h2>ADMIN_PASSWORD belum tersedia</h2>
			<p>Set secret Cloudflare terlebih dahulu sebelum memakai halaman admin.</p>
		</div>
	{:else if !data.authenticated}
		<form class="panel login" method="POST" action="?/login">
			<label>
				<span>Password Admin</span>
				<input name="admin_password" type="password" autocomplete="current-password" required />
			</label>
			<button class="btn btn-primary" type="submit">Masuk</button>
		</form>
	{:else if data.dbMissing}
		<div class="panel">
			<h2>Binding DB tidak tersedia</h2>
			<p>Pastikan binding D1 bernama DB aktif di environment Cloudflare.</p>
		</div>
	{:else}
		{#if data.bucketMissing}
			<p class="notice">Binding BUCKET belum tersedia. Produk bisa dibuat, tapi upload gambar akan gagal.</p>
		{/if}

		<form class="product-form panel" method="POST" action="?/create" enctype="multipart/form-data">
			<label>
				<span>Name *</span>
				<input name="name" required placeholder="Nama produk" />
			</label>
			<label>
				<span>Slug optional</span>
				<input name="slug" placeholder="Kosongkan untuk otomatis" />
			</label>
			<label>
				<span>SKU</span>
				<input name="sku" placeholder="Kosongkan untuk MANUAL-[timestamp]" />
			</label>
			<label>
				<span>Category</span>
				<input name="category" value="hospital-furniture" />
			</label>
			<label>
				<span>Brand</span>
				<input name="brand" value="Alkes Dua Putry" />
			</label>
			<label>
				<span>Normal Price</span>
				<input inputmode="numeric" name="normal_price" />
			</label>
			<label>
				<span>Sale Price</span>
				<input inputmode="numeric" name="sale_price" />
			</label>
			<label>
				<span>Discount Percent</span>
				<input inputmode="numeric" name="discount_percent" />
			</label>
			<label>
				<span>Review Status</span>
				<select name="review_status">
					<option value="approved" selected>approved</option>
					<option value="needs_review">needs_review</option>
				</select>
			</label>
			<label>
				<span>Image Alt</span>
				<input name="image_alt" placeholder="Alt text gambar" />
			</label>
			<label class="wide">
				<span>Description</span>
				<textarea name="description" rows="4" placeholder="Deskripsi produk untuk halaman publik"></textarea>
			</label>
			<label class="wide">
				<span>Specs JSON</span>
				<textarea
					name="specs_json"
					rows="6"
					placeholder="Contoh: Material: Stainless steel, Dimensi: 200 x 90 x 60 cm"
				></textarea>
			</label>
			<label class="wide">
				<span>Product Image</span>
				<input type="file" name="product_image" accept="image/png,image/jpeg,image/webp" />
			</label>

			<div class="actions wide">
				<button class="btn btn-primary" type="submit">Tambah Produk</button>
			</div>
		</form>
	{/if}
</section>

<style>
	.admin-shell {
		width: min(1100px, calc(100vw - 24px));
		margin: 0 auto;
		padding: 32px 0 72px;
	}

	.admin-head {
		display: flex;
		align-items: start;
		justify-content: space-between;
		gap: 1rem;
		margin-bottom: 1rem;
	}

	h1 {
		margin: 0.8rem 0 0.4rem;
		font-size: clamp(2rem, 4vw, 3.2rem);
		line-height: 1;
	}

	h2,
	p {
		margin: 0;
	}

	.panel {
		display: grid;
		gap: 1rem;
		border: 1px solid var(--color-border);
		border-radius: 8px;
		background: var(--color-white);
		box-shadow: var(--shadow-soft);
		padding: 1.2rem;
	}

	.notice {
		margin: 1rem 0;
		font-weight: 800;
		color: var(--color-primary);
	}

	.notice a {
		margin-left: 0.7rem;
		text-decoration: underline;
	}

	label {
		display: grid;
		gap: 0.35rem;
		font-weight: 800;
	}

	label span {
		color: var(--color-muted);
		font-size: 0.78rem;
		text-transform: uppercase;
	}

	input,
	select,
	textarea {
		width: 100%;
		border: 1px solid var(--color-border);
		border-radius: 8px;
		padding: 0.72rem 0.8rem;
		background: #fff;
		color: var(--color-text);
	}

	textarea {
		resize: vertical;
	}

	.actions {
		display: flex;
		gap: 0.7rem;
	}

	@media (min-width: 820px) {
		.product-form {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}

		.wide {
			grid-column: 1 / -1;
		}
	}
</style>
