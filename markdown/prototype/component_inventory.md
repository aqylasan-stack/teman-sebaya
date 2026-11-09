# COMPONENT INVENTORY & REUSABLE ASSETS CATALOG
## TEMAN SEBAYA — RUANG KONSELING INKLUSIF REMAJA
### Katalog Komponen Terstandarisasi, Struktur Auto Layout, Varian & Registri Penggunaan Layar

> **Dokumen ID**: `INV-TS-007`  
> **Status Dokumen**: 🟡 **PROPOSED / HIGH-FIDELITY COMPONENT CATALOG**  
> **Platform Target**: Mobile Android-First (360 × 800 px)  
> **Lokasi File**: `markdown/prototype/component_inventory.md`  
> **Tujuan**: Mencegah duplikasi komponen dan memastikan kepatuhan 100% terhadap Auto Layout native FigCraft.

---

## 1. COMPONENT CLASSIFICATION & SUMMARY

Katalog komponen Teman Sebaya dikelompokkan ke dalam 8 kategori fungsional:

```
├── 1. NAVIGATION & APP BAR (Header, Back Bar, Bottom Nav, Stepper)
├── 2. BUTTONS & INTERACTIVE CALLS-TO-ACTION (Primary, Secondary, Outline, Danger, Pill)
├── 3. CARDS & CONTAINERS (Portal Card, Hero Card, Article Card, Overview Card)
├── 4. FORM INPUTS & SELECTION CONTROLS (Input Field, Password Field, Segmented Filter, Checkbox)
├── 5. MOOD CHECK-IN ASSETS (Emotion Grid Card, Feeling Pill, Capsule Track, Bubble Node)
├── 6. CHAT CONVERSATION ASSETS (User Bubble, AI Bubble, Topic Pill, Composer Bar)
├── 7. FEEDBACK & DIALOG MODALS (Success Alert, Crisis Modal, Logout Modal, Empty State)
└── 8. DATA VISUALIZATION & METRICS (Percentage Display, Linear Progress, Y-Axis Scale)
```

---

## 2. DETAILED COMPONENT SPECIFICATIONS

### 2.1. Kategori 1: Navigation & App Chrome

#### CMP-NAV-001: Persistent Global Header
- **Status**: `[EXISTING / APPROVED]`
- **Tujuan**: Header utama persisten di level dashboard Beranda yang menampilkan identitas brand, sakelar bahasa, dan akses profil.
- **Dimensi**: Lebar `360 px`, Tinggi `56 px`.
- **Auto Layout**: `layout: 'horizontal'`, `mainAlign: 'spaceBetween'`, `crossAlign: 'center'`, padding `[12, 16, 12, 16]`.
- **Tokens Mapped**: Background `#FFFFFF`, Stroke bawah `#E2E8F0` ($1\text{ px}$), Teks Judul `#0F172A` (15px Bold).
- **Sub-Elemen**:
  1. *Brand Title*: `"TEMAN SEBAYA"`
  2. *Language Switcher Pill*: Background `#F1F5F9`, border `#CBD5E1`, icon `globe` 13px, label `"ID | EN"` (11px Medium `#334155`).
  3. *Profile Avatar Circle*: Diameter 32 px `#EFF6FF`, border `#DBEAFE`, icon `user` 16px `#2563EB`.
- **Interaksi**: Avatar menghubungkan ke `SCR-012` (Profil Pengguna).
- **Daftar Layar**: Digunakan pada `SCR-007`, `SCR-007-A`, `MC-017`.

#### CMP-NAV-002: Sub-Page Back Bar
- **Status**: `[EXISTING / APPROVED]`
- **Tujuan**: Navigasi atas pada halaman modul sekunder untuk mempermudah kembali ke alur sebelumnya.
- **Dimensi**: Lebar `360 px`, Tinggi `56 px`.
- **Auto Layout**: `layout: 'horizontal'`, `gap: 12`, `crossAlign: 'center'`, padding `[12, 16, 12, 16]`.
- **Tokens Mapped**: Background `#FFFFFF`, Stroke bawah `#E2E8F0` ($1\text{ px}$).
- **Sub-Elemen**:
  1. *Back Button Container*: 34×34 px `#F1F5F9`, radius 8 px, border `#CBD5E1`, icon `arrowLeft` 16px `#0F172A`.
  2. *Page Title*: Teks `15 px Bold #0F172A`.
- **Interaksi**: Back button menghubungkan kembali ke layar induk.
- **Daftar Layar**: `SCR-006` s.d `SCR-006-D`, `SCR-007-B` s.d `SCR-007-F`, `SCR-008` s.d `SCR-012`, `MC-002` s.d `MC-007`, `MC-014` s.d `MC-016`.

#### CMP-NAV-003: Persistent Bottom Navigation Bar
- **Status**: `[EXISTING / APPROVED]`
- **Tujuan**: Menu navigasi utama 5 tab di bagian bawah layar.
- **Dimensi**: Lebar `360 px`, Tinggi `64 px`.
- **Auto Layout**: `layout: 'horizontal'`, padding `[0, 0, 0, 0]`.
- **Tokens Mapped**: Background `#FFFFFF`, Stroke atas `#E2E8F0` ($1\text{ px}$).
- **Struktur Tab**: 5 Item merata selebar `72 px` ($360 / 5$):
  - Tab 1: `Beranda` (`home`)
  - Tab 2: `Cerita` (`messageCircle`)
  - Tab 3: `Belajar` (`bookOpen`)
  - Tab 4: `Tumbuh` (`sprout`)
  - Tab 5: `Akses` (`compass`)
- **Perilaku Aktif**: Garis indikator atas 28×3 px `#2563EB`, icon 20px `#2563EB` (stroke 2.2px), teks `10 px Bold #2563EB`. Status inaktif: tanpa bar atas, icon & teks `#64748B`.
- **Daftar Layar**: `SCR-007`, `SCR-007-A`, `SCR-008`, `SCR-008-A`, `SCR-008-B`, `SCR-009`, `SCR-009-A`, `SCR-010`, `SCR-011`, `SCR-011-A`.

---

### 2.2. Kategori 2: Buttons & Calls to Action

#### CMP-BTN-001: Primary Button
- **Status**: `[EXISTING / APPROVED]`
- **Tujuan**: Tombol aksi utama dengan visual paling dominan pada form atau alur.
- **Dimensi**: Lebar `328 px` (Full Width) atau `hug`, Tinggi `46 px`, Corner Radius `8 px`.
- **Auto Layout**: `layout: 'horizontal'`, `mainAlign: 'center'`, `crossAlign: 'center'`, padding `[12, 16, 12, 16]`.
- **Tokens Mapped**: Fill `brand-blue-600` (`#2563EB`), Teks `13 px SemiBold #FFFFFF`, Tanpa Border.
- **States**: Default (`#2563EB`), Pressed/Hover (`#1D4ED8`), Disabled (`#CBD5E1` teks `#94A3B8`).
- **Daftar Layar**: Seluruh formulir masuk, konfirmasi simpan mood, dan CTA onboarding.

#### CMP-BTN-002: Secondary Button
- **Status**: `[EXISTING / APPROVED]`
- **Tujuan**: Tombol aksi alternatif yang mendukung tombol utama.
- **Dimensi**: Lebar `328 px` atau `hug`, Tinggi `44 px`, Corner Radius `8 px`.
- **Auto Layout**: `layout: 'horizontal'`, `mainAlign: 'center'`, `crossAlign: 'center'`, padding `[10, 16, 10, 16]`.
- **Tokens Mapped**: Fill `brand-blue-50` (`#EFF6FF`), Border `brand-blue-100` (`#DBEAFE`) 1px, Teks `13 px SemiBold #2563EB`.
- **Daftar Layar**: Tombol "Lanjut sebagai Tamu" pada login, opsi batal pada formulir.

#### CMP-BTN-003: Crisis Danger Button
- **Status**: `[EXISTING / APPROVED]`
- **Tujuan**: Tombol darurat prioritas tinggi untuk rujukan keselamatan krisis 119.
- **Dimensi**: Lebar `328 px` atau Pill, Tinggi `44 px`, Corner Radius `8 px` atau `9999 px`.
- **Tokens Mapped**: Fill `crisis-danger-bg` (`#FEF2F2`), Border `crisis-danger-border` (`#EF4444`) 1px, Teks `13 px Bold #DC2626`.
- **Daftar Layar**: Dialog darurat `SCR-007-G`, header obrolan Teman Cerita.

---

### 2.3. Kategori 3: Cards & Containers

#### CMP-CRD-001: Portal Action Card
- **Status**: `[EXISTING / APPROVED]`
- **Tujuan**: Kartu navigasi modul utama pada Beranda yang mengarahkan pengguna ke fitur terkait.
- **Dimensi**: Lebar `328 px`, Tinggi Otomatis (`sizingV: 'hug'`), Corner Radius `12 px`.
- **Auto Layout**: `layout: 'vertical'`, `gap: 8`, padding `[14, 16, 14, 16]`.
- **Tokens Mapped**: Fill `#FFFFFF`, Border `#E2E8F0` 1px inside, Elevation Level 1.
- **Sub-Elemen**:
  1. *Header Row*: Badge kategori (fill `#EFF6FF`, teks `#2563EB` 11px) + Icon `chevronRight` 16px `#94A3B8`.
  2. *Judul Modul*: Teks `14 px Bold #0F172A`.
  3. *Deskripsi*: Teks `12.5 px Regular #475569`, **wajib auto wrap `296 px`**.
- **Daftar Layar**: `SCR-007`, `SCR-007-A`, `MC-017`.

#### CMP-CRD-002: Emotion Reflection Immersive Container
- **Status**: `[EXISTING / APPROVED]`
- **Tujuan**: Wadah layar penuh untuk menampilkan refleksi emosi terpersonalisasi (mengadaptasi referensi visual).
- **Dimensi**: Lebar `360 px`, Tinggi `800 px`.
- **Tokens Mapped**: Background Imersif (`#1E293B` / Dark Slate Surface), Heart Icon Putih 40px, Teks Kutipan Besar `#FFFFFF` (16.5px Bold, max-width 300px), Pill Bagikan `#0F172A`, Dua Tombol Bulat 58px Thumbs Up/Down, Pill Bawah Putih `#FFFFFF` "Tutup".
- **Daftar Layar**: `MC-008` s.d `MC-013`.

---

### 2.4. Kategori 4: Form Inputs & Selection Controls

#### CMP-INP-001: Text Input Box
- **Status**: `[EXISTING / APPROVED]`
- **Tujuan**: Formulir isian nama, email, nomor telepon, dan pesan.
- **Dimensi**: Lebar `328 px`, Tinggi Field `42 px`, Corner Radius `8 px`.
- **Auto Layout**: `layout: 'vertical'`, `gap: 6`, `sizingH: 'fixed'`, `sizingV: 'hug'`.
- **Tokens Mapped**: Fill `#FFFFFF`, Border `#CBD5E1` 1px, Label `12 px Medium #334155`, Placeholder `12.5 px Regular #94A3B8`.
- **Daftar Layar**: `SCR-005`, `SCR-006`, `SCR-006-C`, `SCR-006-D`, `MC-014`.

#### CMP-INP-002: Password Input Box with Eye Toggle
- **Status**: `[EXISTING / APPROVED]`
- **Tujuan**: Input kata sandi dengan ikon intip sandi terintegrasi.
- **Sub-Elemen Tambahan**: Ikon Lucide `eye` 16px `#94A3B8` di sisi kanan field.
- **Daftar Layar**: `SCR-005`, `SCR-006`, `SCR-006-D`.

#### CMP-SEL-001: Segmented Filter Pill Row
- **Status**: `[EXISTING / APPROVED]`
- **Tujuan**: Baris pemilih filter kategori pada modul Belajar dan Akses.
- **Dimensi Pill**: Tinggi `32–36 px`, Corner Radius `9999 px (Full Pill)`.
- **Kondisi Aktif**: Fill `brand-blue-600` (`#2563EB`), Teks `#FFFFFF` SemiBold.
- **Kondisi Inaktif**: Fill `surface-alt` (`#F1F5F9`), Border `#CBD5E1` 1px, Teks `#334155` Medium.
- **Daftar Layar**: `SCR-008`, `SCR-009`, `SCR-010`, `SCR-011`.

---

### 2.5. Kategori 5: Mood Check-in Assets

#### CMP-MOD-001: Emotion Grid Selection Card
- **Status**: `[EXISTING / APPROVED]`
- **Tujuan**: Kartu pemilih emosi 6 kategori pada alur Mood Check-in (`MC-001`).
- **Dimensi**: Lebar `156 px`, Tinggi `72 px`, Corner Radius `12 px`.
- **Tokens Mapped**: Fill `#FFFFFF`, Border `#E2E8F0` 1px, Elevation Level 1.
- **Sub-Elemen**: Ikon Lucide emosi 24px + Label teks `13 px SemiBold #0F172A`.
- **Kondisi Terpilih**: Border `#2563EB` 2px, Fill `#EFF6FF`.

#### CMP-MOD-002: Capsule Track & Floating Face Node
- **Status**: `[EXISTING / APPROVED]`
- **Tujuan**: Visualisasi metrik statistik emosi pada `MC-015` dan `MC-016` (mengadaptasi referensi visual).
- **Dimensi Track**: Lebar `38 px`, Tinggi `140 px`, Corner Radius `19 px`, Fill `#F1F5F9`.
- **Floating Face Node**: Lingkaran 28×28 px yang melayang pada ketinggian sesuai data emosi, memuat ikon wajah emosi bergaris bersih.
- **Label Bawah**: Teks `11 px SemiBold #0F172A` (contoh: *Bahagia, Sedih, Marah, Cemas*).

---

### 2.6. Kategori 6: Chat Interface Assets

#### CMP-CHT-001: User Message Bubble
- **Dimensi**: Lebar Maksimal `240 px`, Auto Layout Vertikal, Radius `16 px` (kanan bawah `4 px`).
- **Tokens Mapped**: Fill `brand-blue-600` (`#2563EB`), Teks `13 px Regular #FFFFFF`.

#### CMP-CHT-002: AI Assistant Message Bubble
- **Dimensi**: Lebar Maksimal `260 px`, Auto Layout Vertikal, Radius `16 px` (kiri bawah `4 px`).
- **Tokens Mapped**: Fill `#F1F5F9`, Border `#E2E8F0` 1px, Teks `13 px Regular #0F172A`.

#### CMP-CHT-003: Chat Input Composer Bar
- **Dimensi**: Lebar `360 px`, Tinggi `68 px`, Padding `[10, 16, 10, 16]`.
- **Tokens Mapped**: Background `#FFFFFF`, Stroke atas `#E2E8F0`, Input Box selebar `270 px`, Tombol Kirim Bulat `#2563EB` 40×40 px dengan icon `send` putih.

---

### 2.7. Kategori 7: Feedback & Dialog Modals

#### CMP-MDL-001: Emergency Crisis Modal (`SCR-007-G`)
- **Tujuan**: Pop-up intervensi keselamatan darurat saat remaja membutuhkan bantuan krisis segera.
- **Dimensi**: Lebar `320 px`, Tinggi Otomatis, Radius `16 px`, Padding `[20, 20, 20, 20]`, Elevation Level 3.
- **Sub-Elemen**: Icon segitiga bahaya merah `#DC2626`, Judul `"Butuh Bantuan Mendesak?"`, Tombol Telp 119 Ext 8, Tombol Telp Darurat 112, Tombol Kembali.

#### CMP-MDL-002: Logout Confirmation Dialog (`SCR-013`)
- **Tujuan**: Dialog konfirmasi sebelum mengakhiri sesi akun.
- **Dimensi**: Lebar `320 px`, Radius `16 px`, Padding `[20, 20, 20, 20]`.
- **Sub-Elemen**: Icon `logOut` merah, Judul `"Keluar dari Sesi?"`, Teks penjelasan privasi, Tombol "Keluar" merah, Tombol "Batal" sekunder.

---

## 3. SCREEN USAGE INVENTORY MATRIX

| Komponen ID | Nama Komponen Baku | Frekuensi Pakai | Layar Terkait Utama |
| :--- | :--- | :---: | :--- |
| `CMP-NAV-001` | Persistent Global Header | 3 Layar | `SCR-007`, `SCR-007-A`, `MC-017` |
| `CMP-NAV-002` | Sub-Page Back Bar | 24 Layar | Seluruh sub-modul obrolan, kuis, refleksi, profil |
| `CMP-NAV-003` | Persistent Bottom Navigation | 10 Layar | `SCR-007` s.d `SCR-011-A` |
| `CMP-BTN-001` | Primary Button | 18 Layar | Auth, simpan mood, onboarding, CTA kuis |
| `CMP-BTN-002` | Secondary Button | 8 Layar | Akses tamu, batalkan form, ulang kuis |
| `CMP-BTN-003` | Crisis Danger Button | 3 Layar | `SCR-007-G`, header chat, modal krisis |
| `CMP-CRD-001` | Portal Action Card | 7 Layar | Beranda utama, integrasi mood |
| `CMP-CRD-002` | Emotion Reflection Container | 6 Layar | `MC-008` s.d `MC-013` (6 Emosi) |
| `CMP-INP-001` | Text Input Box | 6 Layar | Login, register, catatan mood harian |
| `CMP-SEL-001` | Segmented Filter Pill Row | 5 Layar | Belajar, Komunitas, Akses jalur bantuan |
| `CMP-MOD-001` | Emotion Grid Selection Card | 1 Layar | `MC-001` (Mood Selection) |
| `CMP-MOD-002` | Capsule Track & Face Node | 2 Layar | `MC-015`, `MC-016` (Mood Statistics) |
| `CMP-CHT-001` | Chat Message Bubbles | 3 Layar | `SCR-007-C`, `SCR-007-D`, `SCR-007-F` |
| `CMP-MDL-001` | Emergency Crisis Modal | 2 Layar | `SCR-007-G`, `SCR-011` |

