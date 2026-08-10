# POUK Graha Prima

Source code standalone untuk website publik POUK Graha Prima. Proyek ini tidak memiliki login, database, atau layanan privat. Agenda, galeri, dokumen, dan video memakai sumber publik yang sudah dikonfigurasi di dalam aplikasi.

## Menjalankan secara lokal

Persyaratan: Node.js 22.13 atau lebih baru.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Buka `http://localhost:3000`.

Isi `NEXT_PUBLIC_SITE_URL` di `.env.local` dengan alamat produksi agar canonical URL, sitemap, robots, dan schema SEO memakai domain Anda.

## Build produksi

```bash
npm run test
npm start
```

Secara default server produksi berjalan pada port `3000`. Atur environment variable `PORT` dan, bila diperlukan, `HOSTNAME=0.0.0.0` sesuai konfigurasi hosting Anda.

## Deploy dengan Docker

```bash
docker build -t pouk-graha-prima .
docker run --rm -p 3000:3000 \
  -e NEXT_PUBLIC_SITE_URL=https://domain-anda.com \
  pouk-graha-prima
```

Proyek juga dapat dipasang pada layanan hosting Node.js yang mendukung Next.js. Pastikan `NEXT_PUBLIC_SITE_URL` tersedia saat proses build.

## Struktur utama

- `app/` — halaman, komponen, metadata, dan API route publik
- `public/` — logo, foto gereja, dan favicon
- `next.config.ts` — konfigurasi build standalone

Tidak ada database schema karena website ini tidak memakai database.
