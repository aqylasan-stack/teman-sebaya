# TEMAN SEBAYA — MOBILE APPLICATION (REACT NATIVE)

Aplikasi super pendamping digital (*digital companion super app*) dan **ruang konseling inklusif remaja** untuk mengenali emosi, psikoedukasi terstruktur, pelacakan emosi harian (*mood tracking*), ruang obrolan aman (*AI conversation assistant* & konselor sebaya PIK-R BKKBN), simulasi dilema remaja (*Teman Bermain*), keterhubungan komunitas (*Teman Supportif*), serta akses darurat krisis 24 jam (*SEJIWA 119 Ext 8*).

Dikembangkan berdasarkan spesifikasi resmi:
- **`assets/BRIEF TEMAN SEBAYA.pdf`** (Wireframe Specification & User Experience Document 47 Halaman)
- **`markdown/prototype/prd.md`** & **`architecture.md`**
- **`markdown/prototype/design_system.md`** (Design System Single Source of Truth)
- **`markdown/prototype/components.md`** & **`component_inventory.md`**

---

## 🚀 Fitur Utama & Struktur Modul

### 1. Onboarding & Autentikasi Terproteksi
- **Zero-Guest Access**: Seluruh akses fitur inti memerlukan akun demi menjaga kerahasiaan catatan emosi remaja.
- **Form Mulai Kosong (*Strictly Empty Initial State*)**: Sesuai aturan desain, seluruh form (Login, Register, Forgot Password, OTP, Buat Sandi) dimulai dalam kondisi kosong tanpa data contoh dummy.
- **Indikator Kekuatan Sandi Terintegrasi (*Password Strength Meter*)**: Evaluasi dinamis 3 kriteria (minimal 8 karakter, kombinasi huruf & angka, simbol) dengan 3 bar indikator responsif.
- **Perlindungan Remaja & Safeguarding Usia**: Layar persetujuan etika komunitas dan ruang aman bagi pengguna usia 13–19 tahun.

### 2. Navigasi Utama (5 Bottom Navigation Tabs)
- **Tab 1: Beranda (`HomeScreen`)**:
  - Greeting personal sapaan hangat.
  - Kartu *Daily Mood Check-in* (interaktif: status tercatat atau quick pills 5 emosi).
  - 6 Grid Pintasan Fitur Lengkap: Teman Cerita, Teman Mood, Teman Belajar, Teman Bermain, Teman Supportif, dan Teman Akses.
  - Kartu sesi konseling mendatang dan rekomendasi bacaan 2 menit.
- **Tab 2: Teman Mood (`MoodScreen`, `MoodSelectionScreen`, `MoodStatsScreen`)**:
  - Pelacakan 6 spektrum emosi utama (*Bahagia, Tenang, Marah, Sedih, Lelah, Cemas*).
  - Tag deskriptor emosi sekunder mendalam dan tag konteks (*Sekolah, Keluarga, Teman, Diri Sendiri, Tidur*).
  - Jurnal refleksi mandiri terenkripsi.
  - Grafik distribusi emosi mingguan (7 hari) dan ringkasan kalender runtun aktif.
- **Tab 3: Teman Cerita (`CeritaScreen`, `AIChatScreen`, `BookingScreen`)**:
  - *Service Switcher*: Pilihan antara **Asisten AI Percakapan (24 Jam)** dan **Konselor Sebaya Nyata (PIK-R & Profesional Mitra)**.
  - Penafian etis AI transparan di bagian atas percakapan.
  - *Guardrails & Safety Response*: Otomatis mendeteksi indikasi krisis untuk eskalasi ke hotline 119.
  - Latihan relaksasi pernapasan terpandu *Box Breathing 4-7-8* interaktif.
  - Direktori konselor sebaya bersertifikasi BKKBN & alur booking jadwal konsultasi (Chat, Audio, Video).
- **Tab 4: Teman Belajar (`BelajarScreen`, `ArticleDetailScreen`)**:
  - Kategori: *Kesehatan Mental, Relasi Sehat, Masa Depan, Literasi Emosi, TRIAD KRR*.
  - Pencarian dan filter bookmark tersimpan.
  - Artikel ringkas 2–3 menit baca ramah remaja.
  - Kuis uji pemahaman 3 soal *non-punitive* dengan umpan balik edukatif tanpa sistem penilaian yang menghakimi.
- **Tab 5: Profil Pengguna (`ProfileScreen`, `EditProfileScreen`, `PrivacySettingsScreen`)**:
  - Identitas remaja dengan mode nama samaran / anonim.
  - Lencana proteksi enkripsi data.
  - Statistik runtun aktivitas (*active streak days*, jumlah refleksi mood, tantangan diselesaikan).
  - Pengaturan privasi data, izin pembacaan riwayat emosi untuk AI, dan jadwal pengingat check-in.
  - Dialog konfirmasi keamanan logout.

### 3. Modul Akses Cepat & Pendukung
- **Teman Bermain (`BermainScreen`)**: 3 skenario interaktif bercabang (*Butterfly Effect*, *Name That Feeling*, *Digital Dilemma*).
- **Teman Supportif (`SupportifScreen`)**: Direktori PIK-R Garuda Muda Karawang, Forum GenRe Karawang, kalender agenda workshop remaja, dan ruang bergabung komunitas.
- **Modal Krisis & Darurat 119 (`CrisisModal`)**: Akses langsung satu sentuhan ke Hotline SEJIWA 119 Ext 8, Panggilan Darurat 112, dan layanan Puskesmas PKPR Faskes 1 BPJS.

---

## 🎨 Design System & Token Warna

Sesuai `markdown/prototype/design_system.md`:

| Token | Nilai Hex | Peran |
|---|---|---|
| `brandBlue.600` | `#2563EB` | Warna primer tombol, header aktif, elemen interaktif |
| `brandBlue.50` | `#EFF6FF` | Surface kartu utama, wadah icon, badge soft |
| `brandGreen.500`| `#10B981` | Warna sekunder, feedback sukses, lencana capaian |
| `canvas` | `#F8FAFC` | Background layar utama mobile (Slate 50) |
| `surface` | `#FFFFFF` | Latar belakang kartu, input field, modal |
| `textPrimary` | `#0F172A` | Teks judul kontras tinggi (WCAG AA compliant) |
| `crisis.dangerText`| `#DC2626` | Peringatan darurat, tombol krisis, hotline 119 |

---

## 🛠️ Panduan Menjalankan Aplikasi

Aplikasi dibangun menggunakan **React Native + Expo SDK 58 (TypeScript)**.

### Prasyarat
- Node.js `v20+` (teruji pada Node `v24.13.0`)
- npm `v10+`

### Langkah Menjalankan
1. Masuk ke direktori `mobile`:
   ```bash
   cd mobile
   ```

2. Jalankan Expo Development Server:
   ```bash
   npm start
   ```

3. Pilih platform target:
   - Tekan `w` untuk membuka di web browser.
   - Tekan `a` untuk membuka di emulator Android.
   - Pindai QR code menggunakan aplikasi **Expo Go** pada smartphone fisik Android / iOS.

4. Menjalankan Type-Check TypeScript:
   ```bash
   npx tsc --noEmit
   ```

