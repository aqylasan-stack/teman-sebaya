# ASSET INVENTORY & PROVENANCE REGISTRY
## TEMAN SEBAYA — RUANG KONSELING INKLUSIF REMAJA
### Inventarisasi Aset Visual, Koleksi Ikon Vektor, Fotografi, Ilustrasi & Lisensi

> **Dokumen ID**: `AST-TS-010`  
> **Status Dokumen**: 🟢 **VERIFIED / ASSET BASELINE**  
> **Platform Target**: Mobile Android & iOS (412 × 917 px & 360 × 800 px)  
> **Lokasi File**: `markdown/prototype/asset_inventory.md`  
> **Tujuan**: Menjamin seluruh aset visual yang digunakan memiliki lisensi legal, konsistensi gaya visual tinggi, dan sesuai untuk pengguna remaja.

---

## 1. ICONOGRAPHY INVENTORY — LUCIDE SVG NATIVE

Seluruh ikon antarmuka aplikasi menggunakan **Lucide SVG Native Icons** dengan standar ketebalan garis (*stroke weight*) seragam **2.0 px** (dan 1.8 px untuk state inaktif navigasi). Dilarang keras mencampur ikon dari library berbeda atau mengganti ikon antarmuka dengan emoji.

| No | Nama Ikon Lucide | Simbol & Peran | Ukuran Baku | Stroke | Warna Baku | Layar Penggunaan | Lisensi |
|:---:|:---|:---|:---:|:---:|:---:|:---|:---:|
| 1 | `home` | Tab Beranda Utama | 20 × 20 px | 2.0 / 1.8 px | `#2563EB` / `#64748B` | Bottom Navigation Bar (Semua Layar Utama) | ISC License |
| 2 | `messageCircle`| Tab Teman Cerita & Chat AI | 20 × 20 px | 2.0 / 1.8 px | `#2563EB` / `#64748B` | Bottom Navigation Bar, Chat Bubbles | ISC License |
| 3 | `bookOpen` | Tab Teman Belajar & Edukasi | 20 × 20 px | 2.0 / 1.8 px | `#2563EB` / `#64748B` | Bottom Navigation Bar, Kartu Modul | ISC License |
| 4 | `sprout` | Tab Teman Tumbuh & Minat | 20 × 20 px | 2.0 / 1.8 px | `#2563EB` / `#64748B` | Bottom Navigation Bar, Kartu Kebiasaan | ISC License |
| 5 | `compass` | Tab Teman Akses & Bantuan | 20 × 20 px | 2.0 / 1.8 px | `#2563EB` / `#64748B` | Bottom Navigation Bar, Filter Kategori | ISC License |
| 6 | `user` | Profil Pengguna & Avatar | 18 × 18 px | 2.0 px | `#2563EB` / `#0F172A` | Global Persistent Header, Akun | ISC License |
| 7 | `arrowLeft` | Tombol Kembali Sub-Halaman | 16 × 16 px | 2.0 px | `#0F172A` | Sub-Page Header (Semua Sub-Layar) | ISC License |
| 8 | `chevronRight`| Penanda Aksi Kartu Portal | 16 × 16 px | 2.0 px | `#94A3B8` | Portal Cards di Beranda | ISC License |
| 9 | `alertTriangle`| Tombol Darurat Krisis 119 | 16 × 16 px | 2.0 px | `#DC2626` | Header Chat Teman Cerita, Dialog Krisis | ISC License |
| 10 | `checkCircle` | Konfirmasi Catatan Berhasil | 18 × 18 px | 2.0 px | `#059669` | Banner Sukses Beranda, Hasil Kuis 3/3 | ISC License |
| 11 | `heart` | Refleksi Suasana Hati | 40 × 40 px | 2.0 px | `#FFFFFF` | Layar Imersif Refleksi Emosi (MC-008..013) | ISC License |
| 12 | `share2` | Tombol Bagikan Refleksi | 16 × 16 px | 2.0 px | `#FFFFFF` | Layar Imersif Refleksi Emosi | ISC License |
| 13 | `thumbsUp` | Konfirmasi Relevansi Kutipan | 22 × 22 px | 2.0 px | `#FFFFFF` | Layar Imersif Refleksi Emosi | ISC License |
| 14 | `thumbsDown` | Penolakan Kutipan Refleksi | 22 × 22 px | 2.0 px | `#FFFFFF` | Layar Imersif Refleksi Emosi | ISC License |
| 15 | `send` | Tombol Kirim Obrolan | 16 × 16 px | 2.0 px | `#FFFFFF` | Baris Input Pengirim Pesan Teman Cerita | ISC License |
| 16 | `eye` | Toggle Sembunyikan/Lihat Sandi| 16 × 16 px | 1.8 px | `#94A3B8` | Input Password (Login, Register, New Pass) | ISC License |
| 17 | `shield` | Lencana Keamanan Privasi | 16 × 16 px | 2.0 px | `#2563EB` | Profil Pengguna, Onboarding 2 | ISC License |
| 18 | `check` | Checklist Verifikasi & Kuis | 14 × 14 px | 2.2 px | `#059669` | Password Strength Checklist, Kuis 3/3 | ISC License |
| 19 | `sparkles` | Wawasan Psikologi & Arketipe | 16 × 16 px | 2.0 px | `#10B981` / `#D97706` | Game Play, Game Result | ISC License |
| 20 | `shieldCheck`| Jaminan Privasi & Amanat Data | 18 × 18 px | 2.0 px | `#2563EB` / `#059669` | Onboarding, Modal Krisis, Result | ISC License |
| 21 | `heartHandshake` | Empati Sebaya & Onboarding 1 | 48 × 48 px | 2.0 px | `#2563EB` | Onboarding Screen | ISC License |
| 22 | `users` | Komunitas & Onboarding 3 | 48 × 48 px | 2.0 px | `#7C3AED` | Onboarding Screen, Komunitas | ISC License |
| 23 | `bookmarkCheck` | Simpan Refleksi & Artikel | 18 × 18 px | 2.0 px | `#2563EB` / `#059669` | Game Result, Belajar Screen | ISC License |
| 24 | `rotateCcw` | Ulangi Permainan / Kuis | 16 × 16 px | 2.0 px | `#64748B` | Game Result Screen | ISC License |
| 25 | `brain` | Wawasan Edukasi Psikoedukasi | 14 × 14 px | 2.0 px | `#2563EB` | Game Play Screen | ISC License |
| 26 | `alertCircle` | Peringatan Krisis Darurat | 22 × 22 px | 2.0 px | `#DC2626` | Crisis Modal Dialog | ISC License |
| 27 | `phone` | Panggil Hotline Darurat 119/112| 18 × 18 px | 2.0 px | `#DC2626` / `#2563EB` | Crisis Modal Dialog | ISC License |
| 28 | `x` | Tombol Tutup Modal / Layar | 18 × 18 px | 2.0 px | `#64748B` | Crisis Modal, Game Play Screen | ISC License |
| 29 | `info` | Penafian Non-Klinis (Disclaimer)| 16 × 16 px | 2.0 px | `#64748B` | Game Result Screen | ISC License |

> [!IMPORTANT]
> **Kebijakan Ketat Nol Emoji untuk Ikon UI**: Seluruh icon navigasi, badge tindakan, status, dan tombol dilarang keras menggunakan karakter emoji sistem (seperti 🤖, 🏆, 🧠, ⚡, 🤝, 🏠, 📖, 🌱, 📞, 🛡️, 🔔). Seluruh visual kontrol wajib menggunakan ikon vektor Lucide SVG native beresolusi tinggi dengan konsistensi stroke dan warna semantik yang terstandarisasi.

---

## 2. BRAND & VECTOR ASSETS

| No | Asset Name | Format | Dimensi Asal | Sumber / Asal | Peran Desain | Status | Lisensi |
|:---:|:---|:---:|:---:|:---|:---|:---:|:---:|
| 1 | **Logo Resmi Teman Sebaya** | Vector / PNG Raster | 1080 × 1080 px | Client Asset (`media_1794168515878_01c76b2f.jpg`) | Identitas Brand Utama, Maskot Karakter Remaja Ramah, Kata "TEMAN" Biru, "SEBAYA" Hijau Mint | Aktif Digunakan | Kepemilikan Proyek Teman Sebaya |
| 2 | **Maskot Logo (Character Only)** | Vector Path | 120 × 120 px | Turunan Logo Resmi | Splash Screen, Onboarding Complete, Profile Header | Aktif Digunakan | Kepemilikan Proyek Teman Sebaya |
| 3 | **Capsule Chart Track Nodes** | Native Vector | 38 × 140 px | FigCraft Custom Vector | Grafik Statistik Emosi Mingguan di `MC-015` & `MC-016` | Aktif Digunakan | Proprietary Design System |
| 4 | **Floating Bubble Nodes** | Native Vector | 64 × 64 px | FigCraft Custom Vector | Visualisasi Kluster Persentase Emosi di `MC-016` | Aktif Digunakan | Proprietary Design System |

---

## 3. PHOTOGRAPHY & ILLUSTRATIVE GUIDELINES

Sesuai kriteria Fase 2.2:
- **Fotografi**: Digunakan secara selektif pada kartu komunitas dan artikel edukasi remaja. Sumber resmi: Unsplash / Pexels (Unsplash License & Pexels License — Free for commercial & personal use, no attribution required, without defamatory context).
- **Ilustrasi**: Vektor datar modern (*clean flat vector*) dengan karakter manusia ramah bersuasana positif.
- **Larangan Ketat**: Dilarang menggunakan foto wajah remaja dengan konteks mengeksploitasi penderitaan, foto klinis rumah sakit yang menakutkan, gambar ber-watermark, atau gambar beresolusi rendah yang pecah.

| No | Domain Aset | Tipe Aset | Sumber Rekomendasi | Tautan Sumber Resmi | Kriteria Seleksi |
|:---:|:---|:---|:---|:---|:---|
| 1 | Komunitas Remaja Sebaya | Fotografi | Unsplash | [Unsplash Youth Community](https://unsplash.com/s/photos/teen-community) | Kebersamaan santai, inklusif, ramah, aktivitas luar ruangan sehat. |
| 2 | Relaksasi & Ketenangan | Fotografi & Vektor | Unsplash / Blush | [Unsplash Calm Nature](https://unsplash.com/s/photos/calm-nature) | Tone warna pastel menenangkan, dedaunan hijau alami, langit bersih. |
| 3 | Eksplorasi Karier & Belajar| Vektor Datar | Storyset / Open-source | [Storyset Education](https://storyset.com/education) | Gaya vektor modern sans-serif, warna biru & hijau mint seirama brand. |

---

## 4. TYPOGRAPHY ASSETS & LICENSING

| Typeface | Klasifikasi | Penggunaan di Aplikasi | Sumber | Lisensi |
|:---|:---|:---|:---|:---|
| **Plus Jakarta Sans** | Geometric Sans-serif | Primary Interface: Body, Label, Tombol, Subjudul, Navigation | [Google Fonts - Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) | SIL Open Font License (OFL) |
| **Inter** | Neo-grotesque Sans-serif| Fallback Universal Interface Font | [Google Fonts - Inter](https://fonts.google.com/specimen/Inter) | SIL Open Font License (OFL) |
| **Outfit** | Friendly Geometric Display | Display Titles, Hero Headings | [Google Fonts - Outfit](https://fonts.google.com/specimen/Outfit) | SIL Open Font License (OFL) |

