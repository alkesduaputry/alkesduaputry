<script lang="ts">
	type FilterCategory = {
		slug: string;
		shortTitle: string;
	};

	let {
		categories,
		selectedCategory = $bindable('all'),
		query = $bindable(''),
		sort = $bindable('name-asc')
	} = $props<{
		categories: FilterCategory[];
		selectedCategory?: string;
		query?: string;
		sort?: string;
	}>();
</script>

<div class="filter-bar">
	<label>
		<span>Cari produk</span>
		<input bind:value={query} type="search" placeholder="Cari nama atau SKU" />
	</label>
	<label>
		<span>Kategori</span>
		<select bind:value={selectedCategory}>
			<option value="all">Semua kategori</option>
			{#each categories as category}
				<option value={category.slug}>{category.shortTitle}</option>
			{/each}
		</select>
	</label>
	<label>
		<span>Urutkan</span>
		<select bind:value={sort}>
			<option value="name-asc">Nama A-Z</option>
			<option value="name-desc">Nama Z-A</option>
			<option value="price-asc">Harga terendah</option>
			<option value="price-desc">Harga tertinggi</option>
		</select>
	</label>
</div>

<style>
	.filter-bar {
		display: grid;
		gap: 0.85rem;
		padding: 1rem;
		background: var(--color-white);
		border: 1px solid var(--color-border);
		border-radius: 8px;
		box-shadow: var(--shadow-card);
	}

	label {
		display: grid;
		gap: 0.35rem;
	}

	span {
		font-size: 0.82rem;
		font-weight: 800;
		color: var(--color-primary-dark);
	}

	input,
	select {
		width: 100%;
		min-height: 2.85rem;
		padding: 0 0.85rem;
		border: 1px solid rgba(10, 92, 138, 0.18);
		border-radius: 8px;
		background: #fbfdff;
		color: var(--color-text);
	}

	@media (min-width: 768px) {
		.filter-bar {
			grid-template-columns: 1.3fr 1fr 1fr;
			align-items: end;
		}
	}
</style>
