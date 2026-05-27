<script lang="ts">
	const baseText = 'Halo, saya ingin bertanya mengenai produk AlkesDuaPutry.';

	let name = $state('');
	let phone = $state('');
	let email = $state('');
	let company = $state('');
	let need = $state('Hospital Furniture');
	let budget = $state('<50jt');

	function handleSubmit(event: SubmitEvent) {
		event.preventDefault();

		const lines = [
			baseText,
			'',
			`Nama: ${name}`,
			`Nomor WhatsApp: ${phone}`,
			`Email: ${email}`,
			`Perusahaan/Institusi: ${company}`,
			`Saya Mencari: ${need}`,
			`Alokasi Budget: ${budget}`
		];

		const url = `https://api.whatsapp.com/send?phone=6285780199904&text=${encodeURIComponent(lines.join('\n'))}`;
		window.open(url, '_blank', 'noopener,noreferrer');
	}
</script>

<section class="section">
	<div class="container">
		<div class="cta card">
			<div class="heading">
				<span class="eyebrow">Konsultasi Cepat</span>
				<h2>Dapatkan Harga Khusus Sekarang</h2>
				<p>Sampaikan kebutuhan produk, institusi, dan kisaran budget. Tim kami akan merespons lewat WhatsApp.</p>
			</div>
			<form onsubmit={handleSubmit}>
				<div class="field-grid">
					<label>
						<span>Nama</span>
						<input bind:value={name} type="text" required />
					</label>
					<label>
						<span>Nomor WhatsApp</span>
						<input bind:value={phone} type="tel" required />
					</label>
					<label>
						<span>Email</span>
						<input bind:value={email} type="email" required />
					</label>
					<label>
						<span>Perusahaan/Institusi</span>
						<input bind:value={company} type="text" required />
					</label>
					<label>
						<span>Saya Mencari</span>
						<select bind:value={need}>
							<option>Hospital Furniture</option>
							<option>Lemari Instrumen</option>
							<option>Trolley Medis</option>
							<option>Peralatan Nursery</option>
							<option>Hospital Bed</option>
							<option>E-Katalog LKPP</option>
							<option>Lainnya</option>
						</select>
					</label>
					<label>
						<span>Alokasi Budget</span>
						<select bind:value={budget}>
							<option>&lt;50jt</option>
							<option>50-250jt</option>
							<option>250-500jt</option>
							<option>500jt-1M</option>
							<option>&gt;1M</option>
						</select>
					</label>
				</div>
				<button class="btn btn-accent submit" type="submit">Kirim ke WhatsApp</button>
			</form>
		</div>
	</div>
</section>

<style>
	.cta {
		padding: 1.5rem;
		background:
			radial-gradient(circle at top right, rgba(232, 160, 32, 0.24), transparent 28%),
			linear-gradient(135deg, #0a5c8a 0%, #073f60 100%);
		color: var(--color-white);
		overflow: hidden;
	}

	.heading {
		margin-bottom: 1.5rem;
	}

	.heading :global(.eyebrow) {
		background: rgba(255, 255, 255, 0.12);
		color: var(--color-white);
	}

	h2 {
		margin: 1rem 0 0.7rem;
		font-family: 'Fraunces', serif;
		font-size: clamp(2rem, 4vw, 3.2rem);
	}

	p {
		margin: 0;
		max-width: 56ch;
		color: rgba(255, 255, 255, 0.82);
		line-height: 1.75;
	}

	form {
		display: grid;
		gap: 1.25rem;
	}

	.field-grid {
		display: grid;
		gap: 1rem;
	}

	label {
		display: grid;
		gap: 0.45rem;
	}

	label span {
		font-size: 0.92rem;
		font-weight: 600;
	}

	input,
	select {
		width: 100%;
		padding: 0.95rem 1rem;
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 1rem;
		background: rgba(255, 255, 255, 0.1);
		color: var(--color-white);
	}

	select option {
		color: var(--color-text);
	}

	input::placeholder {
		color: rgba(255, 255, 255, 0.7);
	}

	.submit {
		justify-self: start;
	}

	@media (min-width: 768px) {
		.cta {
			padding: 2.2rem;
		}

		.field-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}
</style>
