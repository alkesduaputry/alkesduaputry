<script lang="ts">
	import brandIcon from '$lib/assets/brand-icon.png';
	import brandLogo from '$lib/assets/brand-logo.png';
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import { whatsappBase } from '$lib/data/products';
	import type { CatalogCategorySummary } from '$lib/server/catalog';

	let isScrolled = $state(false);
	let mobileOpen = $state(false);
	let dropdownOpen = $state(false);
	let navElement: HTMLElement | null = null;

	const catalogCategories = $derived((page.data.catalogCategories ?? []) as CatalogCategorySummary[]);
	const productLinks = $derived([
		{ href: '/produk', label: 'Semua Produk' },
		...catalogCategories.map((category) => ({
			href: `/kategori/${category.slug}`,
			label: `${category.shortTitle} (${category.count})`
		}))
	]);

	function closeMenus() {
		mobileOpen = false;
		dropdownOpen = false;
		if (typeof document !== 'undefined') {
			document.body.classList.remove('menu-open');
		}
	}

	function toggleMobile() {
		mobileOpen = !mobileOpen;
		if (typeof document !== 'undefined') {
			document.body.classList.toggle('menu-open', mobileOpen);
		}
	}

	function toggleDropdown() {
		dropdownOpen = !dropdownOpen;
	}

	$effect(() => {
		page.url.pathname;
		closeMenus();
	});

	onMount(() => {
		const updateScrolled = () => {
			isScrolled = window.scrollY > 40;
		};

		updateScrolled();
		window.addEventListener('scroll', updateScrolled, { passive: true });

		void (async () => {
			const { gsap } = await import('gsap');
			if (navElement) {
				gsap.from(navElement, {
					opacity: 0,
					y: -24,
					duration: 0.75,
					ease: 'power2.out'
				});
			}
		})();

		return () => {
			window.removeEventListener('scroll', updateScrolled);
			if (typeof document !== 'undefined') {
				document.body.classList.remove('menu-open');
			}
		};
	});

	const isProductsActive = () => page.url.pathname.startsWith('/produk') || page.url.pathname.startsWith('/kategori');
</script>

<nav class:scrolled={isScrolled} bind:this={navElement}>
	<div class="container nav-shell">
		<a class="brand" href="/">
			<img class="brand-icon" src={brandIcon} alt="Icon AlkesDuaPutry" />
			<span class="brand-copy">
				<img class="brand-logo" src={brandLogo} alt="AlkesDuaPutry" />
				<small>Medical Supply Partner</small>
			</span>
		</a>

		<div class="desktop-menu">
			<a class:active={page.url.pathname === '/'} href="/">Beranda</a>
			<a class:active={page.url.pathname.startsWith('/tentang')} href="/tentang-kami">Tentang Kami</a>
			<div
				class="dropdown"
				role="presentation"
				onmouseenter={() => (dropdownOpen = true)}
				onmouseleave={() => (dropdownOpen = false)}
			>
				<button class:active={isProductsActive()} type="button">Produk</button>
				<div class:visible={dropdownOpen} class="dropdown-menu">
					{#each productLinks as link}
						<a href={link.href}>{link.label}</a>
					{/each}
				</div>
			</div>
			<a class:active={page.url.pathname.startsWith('/kontak')} href="/kontak">Kontak</a>
		</div>

		<div class="actions">
			<a class="btn btn-accent cta" href={whatsappBase} target="_blank" rel="noreferrer">WhatsApp</a>
			<button class="hamburger" type="button" aria-label="Buka menu" onclick={toggleMobile}>
				<span></span>
				<span></span>
				<span></span>
			</button>
		</div>
	</div>

	{#if mobileOpen}
		<div class="mobile-panel">
			<a href="/">Beranda</a>
			<a href="/tentang-kami">Tentang Kami</a>
			<button type="button" onclick={toggleDropdown}>Produk</button>
			{#if dropdownOpen}
				<div class="mobile-dropdown">
					{#each productLinks as link}
						<a href={link.href}>{link.label}</a>
					{/each}
				</div>
			{/if}
			<a href="/kontak">Kontak</a>
		</div>
	{/if}
</nav>

<style>
	nav {
		position: sticky;
		top: 0;
		z-index: 40;
		padding: 0.9rem 0;
		transition:
			background 0.3s ease,
			box-shadow 0.3s ease,
			padding 0.3s ease;
	}

	nav.scrolled {
		background: rgba(255, 255, 255, 0.92);
		backdrop-filter: blur(12px);
		box-shadow: 0 10px 28px rgba(7, 63, 96, 0.1);
		padding: 0.65rem 0;
	}

	.nav-shell {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
	}

	.brand {
		display: inline-flex;
		align-items: center;
		gap: 0.8rem;
		min-width: 0;
	}

	.brand-icon {
		width: 2.85rem;
		height: 2.85rem;
		flex: 0 0 auto;
		border-radius: 999px;
		object-fit: cover;
		box-shadow: var(--shadow-card);
	}

	.brand-copy {
		display: grid;
		gap: 0.2rem;
	}

	.brand-logo {
		width: clamp(130px, 20vw, 190px);
		height: auto;
	}

	.brand-copy small {
		color: var(--color-muted);
		font-size: 0.76rem;
	}

	.desktop-menu,
	.actions {
		display: none;
	}

	.hamburger {
		width: 2.8rem;
		height: 2.8rem;
		display: inline-flex;
		flex-direction: column;
		justify-content: center;
		gap: 0.28rem;
		border: 1px solid rgba(10, 92, 138, 0.15);
		border-radius: 999px;
		background: var(--color-white);
	}

	.hamburger span {
		width: 1.1rem;
		height: 0.12rem;
		margin: 0 auto;
		background: var(--color-primary-dark);
		border-radius: 999px;
	}

	.mobile-panel {
		margin: 0.85rem auto 0;
		width: var(--container);
		padding: 1rem;
		display: grid;
		gap: 0.25rem;
		background: var(--color-white);
		border: 1px solid var(--color-border);
		border-radius: 1.4rem;
		box-shadow: var(--shadow-soft);
	}

	.mobile-panel a,
	.mobile-panel button {
		padding: 0.9rem 0.35rem;
		background: transparent;
		border: 0;
		text-align: left;
		font-weight: 600;
		color: var(--color-text);
	}

	.mobile-dropdown {
		display: grid;
		gap: 0.2rem;
		padding: 0 0 0.5rem 0.9rem;
	}

	.mobile-dropdown a {
		padding: 0.55rem 0;
		font-size: 0.94rem;
		color: var(--color-muted);
	}

	@media (min-width: 1024px) {
		.desktop-menu,
		.actions {
			display: flex;
			align-items: center;
		}

		.desktop-menu {
			gap: 1.35rem;
		}

		.desktop-menu a,
		.dropdown button {
			position: relative;
			padding: 0.7rem 0;
			border: 0;
			background: transparent;
			font-weight: 600;
			color: var(--color-text);
		}

		.desktop-menu a.active,
		.dropdown button.active {
			color: var(--color-primary);
		}

		.dropdown {
			position: relative;
		}

		.dropdown-menu {
			position: absolute;
			left: 0;
			top: calc(100% + 0.75rem);
			width: 260px;
			padding: 0.8rem;
			display: grid;
			gap: 0.3rem;
			opacity: 0;
			visibility: hidden;
			transform: translateY(8px);
			transition: all 0.22s ease;
			background: var(--color-white);
			border: 1px solid var(--color-border);
			border-radius: 1.2rem;
			box-shadow: var(--shadow-soft);
		}

		.dropdown-menu.visible {
			opacity: 1;
			visibility: visible;
			transform: translateY(0);
		}

		.dropdown-menu a {
			padding: 0.8rem 0.9rem;
			border-radius: 0.9rem;
		}

		.dropdown-menu a:hover {
			background: rgba(10, 92, 138, 0.06);
		}

		.actions {
			gap: 0.8rem;
		}

		.cta {
			padding-inline: 1.25rem;
		}

		.brand-logo {
			width: 180px;
		}

		.hamburger,
		.mobile-panel {
			display: none;
		}
	}
</style>
