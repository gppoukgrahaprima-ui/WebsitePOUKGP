# Website POUK Graha Prima

Source code website resmi POUK Graha Prima, Tambun Selatan, Bekasi. Project ini menggunakan Next.js, React, TypeScript, dan Tailwind CSS serta siap dijalankan secara lokal atau di-deploy ke Vercel.

## Fitur

- Beranda responsif untuk desktop dan perangkat mobile
- Pilihan bahasa Indonesia dan Inggris
- Informasi jadwal ibadah, pelayanan, agenda, galeri, dan persembahan
- Agenda dari Google Calendar
- Empat video terbaru dari kanal YouTube POUK Graha Prima
- Galeri foto dari folder Google Drive
- Metadata SEO, sitemap, robots.txt, favicon, dan web app manifest

## Persyaratan

- Node.js 20.9 atau lebih baru
- npm 10 atau lebih baru

## Menjalankan di komputer lokal

```bash
npm install
npm run dev
```

Buka `http://localhost:3000` di browser.

Untuk memeriksa versi produksi:

```bash
npm run build
npm start
```

## Deploy ke Vercel

1. Upload seluruh isi folder ini ke repository GitHub.
2. Di Vercel, pilih **Add New Project** lalu import repository tersebut.
3. Pastikan framework yang terdeteksi adalah **Next.js**.
4. Gunakan perintah build `npm run build`. Output directory tidak perlu diisi.
5. Klik **Deploy**.

Setelah repository terhubung, setiap commit baru yang di-push ke branch produksi akan otomatis memicu deployment terbaru di Vercel.

## Sumber konten eksternal

- Daftar folder galeri diatur di `app/api/gallery/route.ts`.
- Feed video YouTube diatur di `app/api/youtube/route.ts`.
- Google Calendar diatur di `app/page.tsx` dan `app/components/content-pages.tsx`.

Folder Google Drive yang dipakai untuk galeri harus dapat dilihat oleh publik agar foto bisa muncul di website.

## Struktur utama

```text
app/
├── api/               Endpoint galeri dan YouTube
├── components/        Komponen antarmuka dan halaman konten
├── agenda/            Halaman agenda
├── galeri/            Halaman galeri
├── pelayanan/         Halaman pelayanan
├── persembahan/       Halaman persembahan
├── tentang/           Halaman tentang gereja
├── globals.css        Gaya visual website
├── layout.tsx         Metadata dan layout utama
└── page.tsx           Halaman beranda

public/                 Logo, favicon, dan gambar website
```
