# PRODUCT REQUIREMENTS DOCUMENT (PRD)
## TEMAN SEBAYA — RUANG KONSELING INKLUSIF REMAJA
### High-Fidelity UI Design Specification & System Master Document

> **Dokumen ID**: `PRD-TS-001-REV2`  
> **Status Dokumen**: 🟢 **APPROVED / HIGH-FIDELITY IMPLEMENTED**  
> **Target Pengguna**: Remaja Usia 13–19 Tahun (Siswa SMP, SMA/SMK, Anggota PIK-R, Forum GenRe)  
> **Platform Utama**: Mobile-First Android Standard (Baseline Layar: 412 × 917 px)  
> **Halaman Desain Resmi**: Single Page Rule — `Hi-fi Design` (Page ID `1821`) pada `teman-sebaya.figcraft`  
> **Status Implementasi**: 32 Layar High-Fidelity Lengkap (Row 1 s/d Row 8), 116 Prototype Interactions Aktif  

---

## 1. PRODUCT OVERVIEW & VISION

### 1.1. Ringkasan Produk
**Teman Sebaya** adalah aplikasi super pendamping digital (*digital companion super app*) yang dirancang khusus sebagai **ruang konseling inklusif remaja**. Berdasarkan spesifikasi resmi (*BRIEF TEMAN SEBAYA*), aplikasi ini menyediakan ekosistem terpadu dengan 6 pilar fitur utama:
1. **Teman Mood**: Pelacak emosi harian (4 emosi dasar: Bahagia, Sedih, Marah, Biasa Saja) dengan 7 pilihan konteks dan refleksi mandiri.
2. **Teman Cerita**: Layanan pendampingan konseling berjadwal bersama Konselor Sebaya (60 menit) dan Psikolog Profesional (30 menit).
3. **Teman Belajar**: Hub psikoedukasi 9 kategori komprehensif (Kesehatan Mental, Mengelola Emosi, Digital Wellbeing, Relasi Sehat, TRIAD KRR, Life Skills, Perencanaan Hidup, Transisi Remaja, PIK-R & GenRe).
4. **Teman Bermain**: Permainan dan skenario interaktif psikologi remaja (Butterfly Effect, Name That Feeling, Digital Dilemma) yang mengasah kecerdasan emosi tanpa peringkat kompetitif/beban performa mental.
5. **Teman Supportif**: Pusat kegiatan komunitas remaja positif (PIK-R dan Forum GenRe Karawang).
6. **Teman Akses**: Asisten obrolan AI ("Teman Digitalmu") yang dilengkapi penafian etis transparan, izin data mood opsional, dan protokol respon krisis darurat.

### 1.2. Pernyataan Masalah (Problem Statement)
1. **Stigma & Ketakutan Mengakses Bantuan**: Remaja Indonesia sering merasa takut, malu, atau dihakimi ketika ingin menceritakan beban mental, kebingungan masa depan, hubungan sosial, maupun kesehatan reproduksi.
2. **Ketiadaan Ruang Aman Tanpa Menghakimi**: Saluran media sosial umum penuh dengan tekanan sosial dan perundungan (*cyberbullying*), sedangkan layanan psikologis formal terasa kaku, menakutkan, atau berjarak secara biaya dan birokrasi.
3. **Misinformasi Digital**: Informasi terkait seksualitas, kesehatan mental, dan perencanaan karier di internet kerap tidak terverifikasi atau bahkan menjerumuskan.
4. **Kebingungan Menavigasi Jalur Rujukan**: Ketika mengalami krisis atau tekanan berat, remaja tidak tahu harus menghubungi siapa, apa perbedaan konselor sebaya vs psikolog profesional, dan bagaimana menjaga kerahasiaan diri.

### 1.3. Visi Produk (Product Vision)
> *"Mewujudkan ruang digital yang hangat, aman, inklusif, dan tidak menggurui di mana setiap remaja Indonesia merasa didengar, divalidasi perasaannya, dibekali literasi hidup yang sehat, serta dipandu dengan aman menuju pertolongan nyata ketika membutuhkan."*

### 1.4. Pilar Nilai Produk (Core Value Pillars)
- **Empathetic & Non-Judgmental**: Tidak menyalahkan, tidak mendiagnosis sepihak, dan tidak menggurui.
- **Safety-First & Crisis-Ready**: Jalur darurat dan disclaimers keselamatan selalu mudah diakses dalam 1 sentuhan.
- **Inklusif & Ramah Remaja**: Bahasa natural, visual segar, cerah, tidak klinis, dan mudah dipahami tanpa beban istilah medis rumit.
- **Transparansi AI**: Secara tegas menyatakan bahwa asisten obrolan adalah respons otomatis AI untuk refleksi awal, bukan pengganti konselor manusia atau dokter spesialis.
- **Kebijakan Zero-Guest Access (Kerahasiaan Akun Penuh)**: Untuk menjamin privasi catatan emosional dan keamanan remaja, seluruh akses fitur inti memerlukan akun terotentikasi (opsi "Lanjut sebagai Tamu" dihapus sepenuhnya).

---

## 2. TARGET USERS & PERSONAS

### 2.1. Segmentasi Pengguna

| Segmen Pengguna | Rentang Usia | Karakteristik & Perilaku | Kebutuhan Utama di Aplikasi |
| :--- | :--- | :--- | :--- |
| **Siswa SMP (Remaja Awal)** | 13–15 Tahun | Mulai mengalami perubahan fisik/emosi pubertas, mudah cemas akan penerimaan sosial, rentan stres tugas sekolah. | Validasi emosi, artikel pubertas/kesehatan reproduksi bahasa sederhana, pelacak suasana hati harian. |
| **Siswa SMA/SMK (Remaja Menengah)** | 16–18 Tahun | Menghadapi kebingungan arah karier, pertemanan kompleks, tekanan ekspektasi keluarga, pencarian jati diri. | Teman curhat AI tanpa menghakimi, eksplorasi minat/bakat, tantangan kebiasaan positif harian. |
| **Penggiat PIK-R & GenRe (Sebaya Aktif)** | 15–19 Tahun | Aktif dalam organisasi konseling sebaya di sekolah/kecamatan, butuh referensi materi edukasi sehat. | Ruang komunitas, pemahaman alur rujukan profesional, modul literasi digital dan kesehatan mental. |
| **Remaja Membutuhkan Privasi Penuh** | 13–19 Tahun | Ingin mencatat emosi tanpa terhubung ke identitas asli dunia nyata. | Nama samaran / akun anonim terlindungi enkripsi, tanpa nomor ponsel publik. |

---

## 3. SPATIAL & SCREEN MATRIX (32 MOBILE SCREENS)

Seluruh 32 layar high-fidelity ditempatkan pada Page `Hi-fi Design` (Page ID `1821`) terbagi ke dalam 8 baris teratur:

| Baris | Nama Alur / Fitur | Node ID Layar | Dimensi & Posisi |
| :--- | :--- | :--- | :--- |
| **Row 1** | 01 — SPLASH SCREEN FLOW | 4404, 4420, 4435, 4450 | 412 × 917 px, $y = 80$ |
| **Row 2** | 02 — ONBOARDING FLOW | 4467, 4500, 4541, 4575 | 412 × 917 px, $y = 1180$ |
| **Row 3** | 03 — AUTHENTICATION FLOW | 4606, 4650, 4699, 4728 | 412 × 917 px, $y = 2280$ |
| **Row 4** | 04 — PASSWORD RECOVERY FLOW | 4749, 4804, 4836, 4870 | 412 × 917 px, $y = 3380$ |
| **Row 5** | 05 — BERANDA & MOOD INTEGRATION | 5243, 5322, 5391, 5442 | 412 × 917 px, $y = 4480$ |
| **Row 6** | 06 — TEMAN CERITA (AI & SAFETY) | 5502, 5561, 5592, 5617 | 412 × 917 px, $y = 5560$ |
| **Row 7** | 07 — TEMAN BELAJAR & TEMAN TUMBUH | 5633, 5685, 5711, 5764 | 412 × 917 px, $y = 6640$ |
| **Row 8** | 08 — TEMAN KOMUNITAS, AKSES & PROFIL | 5802, 5883, 5967, 6044 | 412 × 917 px, $y = 7720$ |

---

## 4. CORE FUNCTIONAL SPECIFICATIONS (ALIGNED WITH MASTER BRIEF)

### 4.1. Entry, Onboarding & Autentikasi (Screens A01–A07)
- **Onboarding 3 Langkah Edukatif**:
  - Slide 1: "Kenali Dirimu" — Luangkan waktu sejenak untuk memahami perasaanmu hari ini.
  - Slide 2: "Temukan Ruang Ceritamu" — Konselor sebaya dan tenaga profesional siap mendengarkan tanpa menghakimi.
  - Slide 3: "Belajar dan Bertumbuh" — Kumpulan artikel, tips praktis, dan wawasan kesehatan mental untuk remaja.
- **Layar Selamat Datang (Screen A02)**: Copywriting "Setiap perasaan punya cerita. Setiap cerita layak didengarkan." dengan CTA "Mulai Sekarang" dan "Saya Sudah Punya Akun".
- **Zero-Guest Access**: Keamanan akun dan catatan pribadi terlindungi penuh dengan autentikasi email terverifikasi.

### 4.2. Teman Mood — Pelacak Emosi Harian (Screens C01–C05)
- **4 Emosi Primer Terstandarisasi**:
  1. *Bahagia* ("Aku sedang merasa bahagia")
  2. *Sedih* ("Aku sedang merasa sedih")
  3. *Marah* ("Aku sedang merasa marah")
  4. *Biasa Saja* ("Aku merasa biasa saja")
- **Pilihan Konteks Emosi (7 Kategori Opsional)**: Keluarga, Pertemanan, Pendidikan, Hubungan sosial, Aktivitas sehari-hari, Hal lainnya, Belum tahu.
- **Refleksi Pribadi**: Pertanyaan "Apa yang membuatmu merasa seperti ini?" dengan placeholder non-intrusif: "Ceritakan apa pun yang ingin kamu tulis. Tidak harus panjang."
- **Konfirmasi & Umpan Balik (Screen C04)**: Copywriting konfirmasi "Catatanmu berhasil disimpan. Terima kasih sudah meluangkan waktu untuk memahami dirimu hari ini." dengan tombol "Kembali ke Mood" dan "Lihat Riwayat".

### 4.3. Teman Cerita — Layanan Pendampingan Konseling (Screens D01–D07)
- **2 Jalur Layanan Resmi**:
  1. *Konselor Sebaya (60 Menit)*: Pendampingan sebaya terlatih PIK-R / Forum GenRe untuk validasi emosi dan curhat pertemanan.
  2. *Profesional (30 Menit)*: Konsultasi psikologis klinis bersama psikolog atau psikiater terverifikasi.
- **Direktori & Profil Konselor**: Tampilan kredensial, keahlian khusus, jadwal ketersediaan, dan alur booking konfirmasi.
- **Pemisahan Jelas dari AI**: Teman Cerita sepenuhnya beranggotakan pendamping manusia; interaksi AI ditempatkan di Teman Akses.

### 4.4. Teman Belajar — Hub Psikoedukasi 9 Kategori (Screens E01–E05)
- **9 Kategori Kurikulum Remaja**:
  1. Kesehatan Mental
  2. Mengenal & Mengelola Emosi
  3. Digital Wellbeing
  4. Relasi & Pertemanan
  5. TRIAD KRR (Seksualitas, Napza, Pernikahan Dini)
  6. Life Skills
  7. Perencanaan Kehidupan Berkeluarga
  8. Transisi Kehidupan Remaja
  9. PIK-R & GenRe
- **Format Konten**: Artikel bacaan ringkas 2–3 menit, video edukatif, rangkuman poin penting (*key takeaways*), dan fitur penanda (*bookmark*).

### 4.5. Teman Bermain — Permainan & Skenario Edukatif (Screens F01–F03)
- **3 Format Game Interaktif**:
  1. *Butterfly Effect*: Skenario interaktif berbasis pilihan konsekuensi kehidupan remaja.
  2. *Name That Feeling*: Game literasi emosi untuk memperkaya kosakata perasaan.
  3. *Digital Dilemma*: Simulasi etika digital dan penanganan perundungan siber.
- **Pedoman Etis Gamifikasi**: Tanpa peringkat kompetitif atau penilaian klinis; fokus murni pada refleksi diri positif dan badge partisipasi.

### 4.6. Teman Supportif — Komunitas Remaja (Screens G01–G05)
- **Ekosistem Komunitas Positif**: Informasi PIK-R, Forum GenRe Karawang, kalender agenda bersama, dan galeri aktivitas inspiratif remaja.

### 4.7. Teman Akses — Asisten AI Digital Remaja (Screens H01–H04)
- **Transparansi & Batasan Etis**: Penafian jelas bahwa AI bukan manusia, psikolog, atau pengganti layanan darurat.
- **4 Rekomendasi Prompt Awal**:
  1. "Aku ingin mengenali perasaanku."
  2. "Bagaimana cara mengelola emosi?"
  3. "Aku sedang merasa kewalahan."
  4. "Aku ingin belajar tentang kesehatan mental."
- **Izin Akses Data Mood Opsional**: Persetujuan eksplisit pengguna sebelum AI membaca ringkasan catatan mood.
- **Protokol Tanggap Krisis**: Deteksi kata kunci krisis darurat langsung mengarahkan ke hotline SEJIWA Kemenkes 119 Ext 8.

---

## 5. METRIK KEBERHASILAN (SUCCESS METRICS)

1. **Konsistensi Desain**: 100% kepatuhan terhadap Design System (`design_system.md`), token warna, dan tipografi Inter / Plus Jakarta Sans.
2. **Kepatuhan Auto Layout & A11y**: 0 text truncation tidak diinginkan, rasio kontras teks minimum WCAG AA 4.5:1 (warna teks `#0F172A` di atas `#FFFFFF` mencapai 15.8:1).
3. **Konektivitas Prototipe**: 100% layar terhubung (116 links), 0 dead ends, transisi konsisten (dissolve 200–250ms dan instant 0ms untuk tab switching).
