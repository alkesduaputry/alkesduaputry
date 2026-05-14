<script lang="ts">
	import { blogPosts } from '$lib/data/products';
</script>

<svelte:head>
	<title>Blog | AlkesDuaPutry</title>
</svelte:head>

<section class="section">
	<div class="container">
		<span class="eyebrow">Blog</span>
		<h1 class="section-title">Insight pengadaan dan pemilihan alat kesehatan.</h1>
		<div class="posts">
			{#each blogPosts as post}
				<article class="card post">
					<div class="tag">Artikel Pilihan</div>
					<h2>{post.title}</h2>
					<p>{post.excerpt}</p>
					<a href="/kontak">Konsultasi topik ini</a>
				</article>
			{/each}
		</div>
	</div>
</section>

<style>
	.posts {
		display: grid;
		gap: 1.25rem;
		margin-top: 2rem;
	}

	.post {
		padding: 1.5rem;
	}

	.tag {
		font-size: 0.75rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--color-primary);
	}

	h2 {
		font-family: 'Fraunces', serif;
	}

	p {
		color: var(--color-muted);
		line-height: 1.75;
	}

	a {
		font-weight: 700;
		color: var(--color-primary);
	}

	@media (min-width: 768px) {
		.posts {
			grid-template-columns: repeat(3, minmax(0, 1fr));
		}
	}
</style>
