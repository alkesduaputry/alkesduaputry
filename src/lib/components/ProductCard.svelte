<script lang="ts">
	import { getAvailabilityLabel, type Product } from '$lib/data/products';
	import WhatsAppButton from '$lib/components/WhatsAppButton.svelte';

	let { product } = $props<{ product: Product }>();

	const formatPrice = (value: number) =>
		new Intl.NumberFormat('id-ID', {
			style: 'currency',
			currency: 'IDR',
			maximumFractionDigits: 0
		}).format(value);
</script>

<article class="product-card">
	<a class="image-wrap" href={`/produk/${product.slug}`} aria-label={`Lihat ${product.name}`}>
		<img src={product.image} alt={product.name} loading="lazy" />
	</a>
	<div class="body">
		<div class="meta">
			<span>{getAvailabilityLabel(product.availability)}</span>
			<small>{product.sku}</small>
		</div>
		<a class="title" href={`/produk/${product.slug}`}>{product.name}</a>
		<p>{product.shortDescription}</p>
		<div class="price">
			{#if product.price}
				{#if product.salePrice}
					<del>{formatPrice(product.price)}</del>
					<strong>{formatPrice(product.salePrice)}</strong>
				{:else}
					<strong>{formatPrice(product.price)}</strong>
				{/if}
			{:else}
				<strong>Harga hubungi admin</strong>
			{/if}
		</div>
		<div class="actions">
			<a class="btn btn-outline-dark" href={`/produk/${product.slug}`}>Detail</a>
			<WhatsAppButton {product} />
		</div>
	</div>
</article>

<style>
	.product-card {
		display: grid;
		overflow: hidden;
		background: var(--color-white);
		border: 1px solid var(--color-border);
		border-radius: 8px;
		box-shadow: var(--shadow-card);
	}

	.image-wrap {
		aspect-ratio: 4 / 3;
		background: #eef5f9;
	}

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.body {
		display: grid;
		gap: 0.85rem;
		padding: 1rem;
	}

	.meta,
	.actions {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 0.7rem;
	}

	.meta span {
		padding: 0.35rem 0.65rem;
		border-radius: 999px;
		background: rgba(10, 92, 138, 0.08);
		color: var(--color-primary);
		font-size: 0.78rem;
		font-weight: 800;
	}

	.meta small {
		color: var(--color-muted);
	}

	.title {
		font-size: 1.08rem;
		font-weight: 800;
		color: var(--color-text);
	}

	p {
		margin: 0;
		color: var(--color-muted);
		line-height: 1.65;
	}

	.price {
		display: grid;
		gap: 0.2rem;
	}

	del {
		color: var(--color-muted);
	}

	.price strong {
		color: var(--color-primary-dark);
	}

	.actions .btn {
		min-height: 2.8rem;
		padding: 0.75rem 1rem;
		border-radius: 8px;
	}
</style>
