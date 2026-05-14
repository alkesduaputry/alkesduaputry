<script lang="ts">
	const steps = [
		{ number: '01', title: 'Free Konsultasi & Demo Produk' },
		{ number: '02', title: 'Pengadaan & Pembayaran' },
		{ number: '03', title: 'Pengiriman & Free Training' }
	];
</script>

<section class="section flow">
	<div class="container">
		<h2 class="section-title centered">Transaksi Lebih Mudah & Cepat</h2>
		<div class="steps">
			{#each steps as step}
				<div class="step">
					<div class="number">{step.number}</div>
					<h3>{step.title}</h3>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.flow {
		background: linear-gradient(180deg, rgba(7, 63, 96, 0.03), rgba(7, 63, 96, 0.08));
	}

	.centered {
		text-align: center;
		margin-inline: auto;
	}

	.steps {
		margin-top: 2rem;
		display: grid;
		gap: 1rem;
	}

	.step {
		position: relative;
		padding: 1.5rem;
		background: var(--color-white);
		border-radius: var(--radius-md);
		border: 1px solid var(--color-border);
		box-shadow: var(--shadow-soft);
	}

	.number {
		font-family: 'Fraunces', serif;
		font-size: 2.7rem;
		color: rgba(10, 92, 138, 0.18);
	}

	h3 {
		margin: 0.6rem 0 0;
		max-width: 16ch;
		font-size: 1.1rem;
	}

	@media (min-width: 768px) {
		.steps {
			grid-template-columns: repeat(3, minmax(0, 1fr));
			align-items: stretch;
		}

		.step::after {
			content: '';
			position: absolute;
			top: 50%;
			right: -0.75rem;
			width: 1.5rem;
			height: 2px;
			background: rgba(10, 92, 138, 0.2);
		}

		.step:last-child::after {
			display: none;
		}
	}
</style>
