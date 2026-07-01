import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	// 🚧 GERBANG maintenance
	if (event.platform?.env?.MAINTENANCE === 'true') {
		return new Response(HALAMAN_TAGIHAN, {
			status: 503,
			headers: {
				'content-type': 'text/html; charset=utf-8',
				'Cache-Control': 'no-store'
			}
		});
	}

	return resolve(event); // ⬅️ situs jalan normal
};

const HALAMAN_TAGIHAN = `<!DOCTYPE html>
<html lang="id">
<head>
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<title>Website Dinonaktifkan Sementara</title>
	<style>
		body {
			margin: 0;
			font-family: system-ui, sans-serif;
			background: #0f172a;
			color: #e2e8f0;
			display: flex;
			align-items: center;
			justify-content: center;
			min-height: 100vh;
			text-align: center;
			padding: 24px;
		}
		.box { max-width: 480px; }
		h1 { font-size: 1.6rem; margin-bottom: 12px; }
		p { color: #94a3b8; line-height: 1.6; }
		.btn {
			display: inline-block;
			margin-top: 20px;
			padding: 12px 24px;
			background: #22c55e;
			color: #fff;
			text-decoration: none;
			border-radius: 8px;
			font-weight: 600;
		}
	</style>
</head>
<body>
	<div class="box">
		<h1>🔒 Website Perlu Diperpanjang</h1>
		<p>
			Mohon maaf, layanan website ini dinonaktifkan sementara karena masa
			aktif telah berakhir. Silakan lakukan pembayaran untuk mengaktifkan
			kembali.
		</p>
		<a class="btn" href="https://wa.me/6287854545274">Hubungi &amp; Bayar via WhatsApp</a>
	</div>
</body>
</html>`;