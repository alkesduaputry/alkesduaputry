<script lang="ts">
	import type { Product } from '$lib/data/products';
	import { generateProductWhatsAppLink } from '$lib/utils/whatsapp';

	let { product, label = 'Pesan via WhatsApp', className = '' } = $props<{
		product: Product;
		label?: string;
		className?: string;
	}>();
</script>

<a class={`btn btn-accent ${className}`} href={generateProductWhatsAppLink(product)} target="_blank" rel="noreferrer">
	{label}
</a>
