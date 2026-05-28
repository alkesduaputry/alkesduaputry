<script lang="ts">
	import type { ActionData, PageData } from './$types';

	let { data, form } = $props<{ data: PageData; form: ActionData }>();

	const statuses = [
		{ value: 'needs_review', label: 'Needs Review' },
		{ value: 'approved', label: 'Approved' },
		{ value: 'rejected', label: 'Rejected' },
		{ value: 'deleted', label: 'Deleted' },
		{ value: 'all', label: 'All' }
	];

	const formatPrice = (value: number | null) =>
		typeof value === 'number'
			? new Intl.NumberFormat('id-ID', {
					style: 'currency',
					currency: 'IDR',
					maximumFractionDigits: 0
				}).format(value)
			: '-';

	const imageSourceLabel = (source: string) => {
		if (source === 'custom') return 'Custom product image';
		if (source === 'page_fallback') return 'PDF page fallback';
		return 'No image';
	};
</script>

<svelte:head>
	<title>Catalog Review Admin | Alkes Dua Putry</title>
	<meta name="robots" content="noindex,nofollow" />
</svelte:head>

<section class="admin-shell">
	<div class="admin-head">
		<div>
			<span class="eyebrow">Admin</span>
			<h1>Catalog OCR Review</h1>
			<p>Review dan edit produk katalog dari D1. Gambar produk diupload langsung ke R2.</p>
		</div>
		{#if data.authenticated}
			<div class="head-actions">
				<a class="btn btn-primary" href="/admin/products/new">Tambah Produk Baru</a>
				<form method="POST" action="?/logout">
					<button class="btn btn-outline-dark" type="submit">Logout</button>
				</form>
			</div>
		{/if}
	</div>

	{#if form?.message}
		<p class="notice">{form.message}</p>
	{/if}

	{#if data.missingPassword}
		<div class="panel">
			<h2>ADMIN_PASSWORD belum tersedia</h2>
			<p>Set secret Cloudflare terlebih dahulu sebelum memakai halaman admin.</p>
		</div>
	{:else if !data.authenticated}
		<form class="login panel" method="POST" action="?/login">
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
		<nav class="status-tabs" aria-label="Filter status katalog">
			{#each statuses as item}
				<a class:active={data.status === item.value} href={`/admin/catalog-review?status=${item.value}`}>
					{item.label}
				</a>
			{/each}
		</nav>

		<div class="review-count">{data.items.length} item ditampilkan</div>

		<div class="review-list">
			{#each data.items as item}
				<article class="review-card">
					<div class="page-preview">
						<div class="image-label">{imageSourceLabel(item.image_source)}</div>
						{#if item.image_url}
							<a href={item.image_url} target="_blank" rel="noreferrer">
								<img src={item.image_url} alt={item.image_alt ?? `Halaman katalog ${item.page_number}`} loading="lazy" />
							</a>
						{:else}
							<div class="missing-image">Tidak ada gambar</div>
						{/if}
					</div>

					<div class="review-body">
						<div class="meta-grid">
							<div>
								<span>Page</span>
								<strong>{item.page_number}</strong>
							</div>
							<div>
								<span>SKU</span>
								<strong>{item.sku ?? '-'}</strong>
							</div>
							<div>
								<span>Status</span>
								<strong>{item.review_status}</strong>
							</div>
							<div>
								<span>Source</span>
								<strong>{item.source_type ?? 'ocr'}</strong>
							</div>
							<div>
								<span>Confidence</span>
								<strong>{item.confidence_score ?? 0}</strong>
							</div>
							<div>
								<span>Discount</span>
								<strong>{item.discount_percent ?? '-'}%</strong>
							</div>
							<div>
								<span>Slug</span>
								<strong>{item.slug ?? '-'}</strong>
							</div>
							{#if item.deleted_at}
								<div>
									<span>Deleted At</span>
									<strong>{item.deleted_at}</strong>
								</div>
							{/if}
						</div>

						<div class="read-grid">
							<div>
								<span>Name</span>
								<p>{item.name ?? '-'}</p>
							</div>
							<div>
								<span>Suggested</span>
								<p>{item.suggested_name ?? '-'}</p>
							</div>
							<div>
								<span>Category</span>
								<p>{item.category ?? '-'}</p>
							</div>
							<div>
								<span>Harga</span>
								<p>{formatPrice(item.normal_price)} / {formatPrice(item.sale_price)}</p>
							</div>
						</div>

						<form class="edit-form" method="POST" enctype="multipart/form-data">
							<input type="hidden" name="id" value={item.id} />
							<label>
								<span>Name</span>
								<input name="name" value={item.name ?? ''} placeholder="Nama final produk" />
							</label>
							<label>
								<span>Suggested Name</span>
								<input name="suggested_name" value={item.suggested_name ?? ''} />
							</label>
							<label>
								<span>SKU</span>
								<input name="sku" value={item.sku ?? ''} />
							</label>
							<label>
								<span>Category</span>
								<input name="category" value={item.category ?? ''} />
							</label>
							<label>
								<span>Brand</span>
								<input name="brand" value={item.brand ?? 'Alkes Dua Putry'} />
							</label>
							<label>
								<span>Normal Price</span>
								<input inputmode="numeric" name="normal_price" value={item.normal_price ?? ''} />
							</label>
							<label>
								<span>Sale Price</span>
								<input inputmode="numeric" name="sale_price" value={item.sale_price ?? ''} />
							</label>
							<label>
								<span>Discount Percent</span>
								<input inputmode="numeric" name="discount_percent" value={item.discount_percent ?? ''} />
							</label>
							<label>
								<span>Review Status</span>
								<select name="review_status">
									<option value="needs_review" selected={item.review_status === 'needs_review'}>
										needs_review
									</option>
									<option value="approved" selected={item.review_status === 'approved'}>approved</option>
									<option value="rejected" selected={item.review_status === 'rejected'}>rejected</option>
									<option value="deleted" selected={item.review_status === 'deleted'}>deleted</option>
								</select>
							</label>
							<label>
								<span>Image Alt</span>
								<input name="image_alt" value={item.image_alt ?? item.name ?? item.suggested_name ?? item.sku ?? ''} />
							</label>
							<label>
								<span>Upload Product Image</span>
								<input type="file" name="product_image" accept="image/png,image/jpeg,image/webp" />
							</label>

							<div class="actions">
								<button class="btn btn-outline-dark" type="submit" formaction="?/save">Save</button>
								<button class="btn btn-outline-dark" type="submit" formaction="?/uploadImage">
									Upload Image
								</button>
								<button class="btn btn-primary" type="submit" formaction="?/approve">Approve</button>
								<button class="btn btn-outline-dark" type="submit" formaction="?/markNeedsReview">
									Mark as Needs Review
								</button>
								<button class="btn danger" type="submit" formaction="?/reject">Reject</button>
								<button class="btn danger" type="submit" formaction="?/deleteProduct">
									Delete Product
								</button>
								<button class="btn btn-outline-dark" type="submit" formaction="?/restoreProduct">
									Restore Product
								</button>
								<button class="btn danger-outline" type="submit" formaction="?/resetImage">
									Reset Product Image
								</button>
							</div>
						</form>

						<details>
							<summary>Specs JSON</summary>
							<pre>{item.specs_pretty}</pre>
						</details>
						<details>
							<summary>Raw Text</summary>
							<pre>{item.raw_text}</pre>
						</details>
					</div>
				</article>
			{/each}
		</div>
	{/if}
</section>

<style>
	.admin-shell {
		width: min(1440px, calc(100vw - 24px));
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

	.head-actions {
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-end;
		gap: 0.7rem;
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

	.admin-head p,
	.panel p,
	.read-grid p,
	pre {
		color: var(--color-muted);
	}

	.panel,
	.review-card {
		border: 1px solid var(--color-border);
		border-radius: 8px;
		background: var(--color-white);
		box-shadow: var(--shadow-soft);
	}

	.panel {
		display: grid;
		gap: 1rem;
		max-width: 520px;
		padding: 1.2rem;
	}

	.status-tabs {
		display: flex;
		flex-wrap: wrap;
		gap: 0.55rem;
		margin: 1rem 0;
	}

	.status-tabs a {
		border: 1px solid var(--color-border);
		border-radius: 8px;
		padding: 0.65rem 0.9rem;
		background: var(--color-white);
		color: var(--color-primary);
		font-weight: 900;
	}

	.status-tabs a.active {
		background: var(--color-primary);
		color: var(--color-white);
	}

	.notice,
	.review-count {
		margin: 1rem 0;
		font-weight: 800;
		color: var(--color-primary);
	}

	.login label,
	.edit-form label {
		display: grid;
		gap: 0.35rem;
		font-weight: 800;
	}

	input,
	select {
		width: 100%;
		border: 1px solid var(--color-border);
		border-radius: 8px;
		padding: 0.72rem 0.8rem;
		background: #fff;
		color: var(--color-text);
	}

	input[type='file'] {
		padding: 0.58rem 0.8rem;
	}

	.review-list {
		display: grid;
		gap: 1.2rem;
	}

	.review-card {
		display: grid;
		overflow: hidden;
	}

	.page-preview {
		position: relative;
		background: #eaf2f5;
	}

	.image-label {
		position: absolute;
		top: 0.8rem;
		left: 0.8rem;
		z-index: 2;
		border-radius: 8px;
		padding: 0.42rem 0.62rem;
		background: rgba(7, 63, 96, 0.88);
		color: #fff;
		font-size: 0.76rem;
		font-weight: 900;
	}

	.page-preview img {
		width: 100%;
		max-height: 760px;
		object-fit: contain;
	}

	.missing-image {
		display: grid;
		min-height: 280px;
		place-items: center;
		color: var(--color-muted);
	}

	.review-body {
		display: grid;
		gap: 1rem;
		padding: 1rem;
	}

	.meta-grid,
	.read-grid,
	.edit-form {
		display: grid;
		gap: 0.8rem;
	}

	.meta-grid {
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}

	.meta-grid div,
	.read-grid div {
		border: 1px solid rgba(10, 92, 138, 0.1);
		border-radius: 8px;
		padding: 0.75rem;
		background: rgba(10, 92, 138, 0.04);
	}

	.meta-grid span,
	.read-grid span,
	label span {
		display: block;
		margin-bottom: 0.25rem;
		color: var(--color-muted);
		font-size: 0.78rem;
		font-weight: 800;
		text-transform: uppercase;
	}

	.meta-grid strong,
	.read-grid p {
		overflow-wrap: anywhere;
	}

	.actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.7rem;
	}

	.danger,
	.danger-outline {
		border-color: rgba(180, 40, 40, 0.25);
		background: #fff0f0;
		color: #9f1d1d;
	}

	.danger-outline {
		background: #fff;
	}

	details {
		border-top: 1px solid var(--color-border);
		padding-top: 0.8rem;
	}

	summary {
		cursor: pointer;
		font-weight: 900;
	}

	pre {
		overflow: auto;
		max-height: 280px;
		margin: 0.8rem 0 0;
		padding: 0.9rem;
		border-radius: 8px;
		background: #f6f8fb;
		font-size: 0.84rem;
		line-height: 1.55;
		white-space: pre-wrap;
	}

	@media (min-width: 900px) {
		.review-card {
			grid-template-columns: minmax(320px, 0.85fr) minmax(0, 1.15fr);
		}

		.page-preview {
			position: sticky;
			top: 0;
			align-self: start;
			max-height: 100vh;
			overflow: auto;
		}

		.meta-grid,
		.read-grid,
		.edit-form {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}

		.actions {
			grid-column: 1 / -1;
		}
	}
</style>
