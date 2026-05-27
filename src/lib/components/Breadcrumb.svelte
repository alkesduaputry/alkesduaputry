<script lang="ts">
	let { items } = $props<{ items: { href?: string; label: string }[] }>();
</script>

<nav class="breadcrumb" aria-label="Breadcrumb">
	{#each items as item, index}
		{#if item.href && index < items.length - 1}
			<a href={item.href}>{item.label}</a>
		{:else}
			<span>{item.label}</span>
		{/if}
		{#if index < items.length - 1}
			<small>/</small>
		{/if}
	{/each}
</nav>

<style>
	.breadcrumb {
		display: flex;
		flex-wrap: wrap;
		gap: 0.45rem;
		align-items: center;
		margin-bottom: 1rem;
		color: var(--color-muted);
		font-size: 0.92rem;
	}

	a {
		color: var(--color-primary);
		font-weight: 700;
	}
</style>
