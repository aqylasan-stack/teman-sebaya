# MANDATORY AI DESIGN & CODING RULES
## TEMAN SEBAYA — RUANG KONSELING INKLUSIF REMAJA
### Panduan Operasional Mutlak bagi AI Design Agent dalam Fase High-Fidelity UI Design

> **Dokumen ID**: `RULE-TS-008`  
> **Status Dokumen**: 🟢 **MANDATORY & ENFORCED (Wajib Dipatuhi 100% Tanpa Pengecualian)**  
> **Lokasi File**: `markdown/prototype/AI_DESIGN_RULES.md`  
> **Platform Target**: FigCraft Desktop Engine via MCP / CLI (Live Port 7979)  
> **File Kanvas Utama**: `teman-sebaya.figcraft`

---

## 1. HIERARKI BACAAN WAJIB (MANDATORY READING DIRECTIVE)

Setiap kali AI Agent menerima instruksi desain baru, revisi layar, atau implementasi fitur di fase High-Fidelity, AI **WAJIB** membaca dokumen-dokumen berikut sebelum menjalankan tool atau menulis kode:

```
  ┌────────────────────────────────────────────────────────┐
  │ 1. prd.md                 → Pahami Kebutuhan Produk   │
  │ 2. design_direction.md    → Pahami Arah Seni & Warna   │
  │ 3. design_system.md       → Pahami Token & Komponen    │
  │ 4. user_flows.md          → Pahami Alur & Navigasi     │
  │ 5. ux_writing.md          → Pahami Teks & Bahasa       │
  │ 6. component_inventory.md → Cari Komponen yang Ada     │
  └────────────────────────────────────────────────────────┘
```

1. **BACA `prd.md`**: Pahami fitur apa yang sedang dibangun, siapa penggunanya, dan apa batasan fungsionalnya.
2. **BACA `design_direction.md`**: Pahami karakter visual "Modern Friendly Digital Companion", analisis referensi, dan batasan identitas brand.
3. **BACA `design_system.md`**: Gunakan token warna, tipografi, grid, dan radius resmi. Jangan mengarang token hex baru!
4. **BACA `user_flows.md`**: Pastikan layar terhubung ke alur sebelum dan sesudahnya tanpa ada jalan buntu (*dead end*).
5. **BACA `ux_writing.md`**: Pastikan teks menggunakan Bahasa Indonesia ramah remaja, menyertakan penafian etis AI dan keselamatan krisis.
6. **BACA `component_inventory.md`**: Utamakan penggunaan ulang (*reuse*) komponen yang sudah ada sebelum membuat frame baru.

---

## 2. ATURAN KRITIS 01: WIREFRAME VS. FINAL HIGH-FIDELITY UI

> [!CAUTION]
> **DILARANG KERAS MENIRU TAMPILAN GRAYSCALE WIREFRAME SEBAGAI DESAIN FINAL!**

- **Peran Wireframe**: Wireframe pada folder `markdown/wireframe/` atau kanvas sebelumnya **HANYA BERFUNGSI SEBAGAI ACUAN STRUKTUR, INFORMASI, LAYOUT, DAN INTERAKSI**. Wireframe sengaja dibuat grayscale untuk mengevaluasi fungsionalitas murni.
- **Kewajiban High-Fidelity**: Seluruh pengerjaan pada fase High-Fidelity **wajib** menggunakan:
  - Latar belakang terang dan bersih (`#F8FAFC` dan `#FFFFFF`), bukan abu-abu gelap kusam.
  - Warna identitas brand resmi: **Primary Blue (`#3B82F6` / `#2563EB`)** dan **Supporting Green (`#10B981`)**.
  - Aksen hangat: **Peach / Coral (`#F97316`)** dan **Sunshine Yellow (`#F59E0B`)**.
  - Kartu dengan border halus (`#E2E8F0`), sudut membulat (`12–16 px`), dan elevasi lembut (*subtle diffuse shadow*).
  - Tipografi modern sans-serif (`Plus Jakarta Sans` / `Inter`) dengan hierarki kontras tinggi.

---

## 3. ATURAN KRITIS 02: ADAPTASI GAMBAR REFERENSI VISUAL

Ketika pengguna melampirkan screenshot atau gambar referensi visual (Dribbble, Behance, Canva, screenshot aplikasi):

1. **Prinsip Dasar**:
   > *"Use the reference for design direction, not as a replacement for the existing design system."*
2. **Elemen yang DIADAPTASI (Boleh Diambil)**:
   - Pola susunan layout, grid, dan komposisi ruang.
   - Hirarki penempatan elemen dan alur membaca (*visual reading path*).
   - Bentuk kartu informasi terstruktur (*modular cards*).
   - Visualisasi data kreatif (seperti *floating bubble cluster* atau *capsule track bars*).
3. **Elemen yang WAJIB DIPERTAHANKAN (Dilarang Mengikuti Referensi)**:
   - Token warna brand Teman Sebaya (jangan menyalin warna ungu, gradien gelap, atau warna asing dari referensi).
   - Skala tipografi dan font resmi Teman Sebaya.
   - Header persisten dan Bottom Navigation 5 tab standar.
   - Koleksi vektor Lucide SVG native.
   - Standar keselamatan krisis dan penafian etis remaja.

---

## 4. ATURAN KRITIS 03: TEKNIS AUTO LAYOUT & TEXT WRAPPING

> [!IMPORTANT]
> **JANGAN PERNAH MEMBUAT FRAME TANPA AUTO LAYOUT ATAU TEXT LAYER TANPA BATAS LEBAR!**

1. **Wajib Auto Layout**: Seluruh container, kartu, baris tombol, dan tumpukan konten utama wajib menggunakan Auto Layout FigCraft native (`layout: 'vertical'` atau `'horizontal'`).
2. **Aturan Lebar Teks Eksplisit (Anti-Overflow)**:
   - Setiap text node multi-baris **wajib memiliki parameter `width` eksplisit**:
     - `width: 328` untuk teks pada tingkat layar.
     - `width: 296` untuk teks di dalam kartu ber-padding 16 px ($328 - 32$).
   - Dilarang membuat text node tanpa `width` yang memanjang horizontal melebihi 328 px atau keluar dari kartu!
3. **Sizing Attributes yang Sah**:
   - Kontainer anak di dalam stack utama wajib menggunakan `sizingH: 'fill'` (atau fixed width `328 px`) dan `sizingV: 'hug'` (menyesuaikan tinggi konten secara vertikal).
   - `crossAlign`: gunakan nilai sah `'min' | 'center' | 'max' | 'baseline'`. (Jangan gunakan `'bottom'`!).
   - `mainAlign`: gunakan nilai sah `'min' | 'center' | 'max' | 'spaceBetween' | 'spaceAround' | 'spaceEvenly'`.

---

## 5. ATURAN KRITIS 04: PENGENDALIAN CAKUPAN KERJA (STRICT SCOPE CONTROL)

1. **Isolasi Target Modifikasi**:
   - Jika pengguna meminta perubahan pada layar tertentu (misal: *"Perbaiki tampilan Teman Cerita"*), maka **HANYA** frame layar tersebut yang boleh dimodifikasi.
   - Dilarang menyentuh, merombak, atau menghapus layar lain yang sudah stabil di luar ruang lingkup tugas.
2. **Larangan Redesign Massal Tanpa Izin**:
   - Dilarang merombak 46 layar sekaligus tanpa instruksi tertulis eksplisit.
   - Seluruh penyesuaian harus bersifat terukur, terarah, dan dapat dilacak (*auditable*).

---

## 6. ATURAN KRITIS 05: CONTENT & PRODUCTIZATION (BEBAS ARTEFAK DUMMY)

1. **Eliminasi Artefak Pengujian**:
   - Dilarang menampilkan istilah pengembangan: *demo, simulasi, dummy, placeholder, testing, mockup, sample, respons otomatis untuk demo*.
   - Ubah menjadi copywriting fungsional yang hangat dan matang (lihat panduan `ux_writing.md`).
2. **Integritas Penafian Etis & Krisis**:
   - Peringatan AI transparan dan tombol darurat 119 **wajib selalu ada** pada modul sensitif (Teman Cerita dan Teman Akses). Jangan pernah menghilangkannya demi estetika semata!

---

## 7. QUALITY ASSURANCE CHECKLIST (12 POIN VERIFIKASI WAJIB)

Sebelum melaporkan pekerjaan selesai kepada pengguna, AI Agent wajib memverifikasi 12 poin berikut:

- [ ] **1. Scope Integrity**: Hanya layar target yang berubah; layar lain tidak rusak atau tergeser.
- [ ] **2. High-Fi Visual Styling**: Warna menggunakan token Azure Blue, Fresh Mint, dan Soft Canvas; bebas dari tampilan abu-abu wireframe.
- [ ] **3. Native Auto Layout**: Seluruh wadah baru menggunakan Auto Layout (`vertical`/`horizontal`, `gap`, `padding`).
- [ ] **4. Zero Text Overflow**: Setiap teks multi-baris memiliki `width: 328` atau `296`; tidak ada teks memanjang keluar layar.
- [ ] **5. Zero Coordinate Collision**: Tidak ada kartu atau layer yang saling menimpa (*overlapping*) tanpa alasan fungsional.
- [ ] **6. Spacing Consistency**: Margin layar konsisten $16\text{ px}$, gap antar-kartu konsisten $12\text{ px}$.
- [ ] **7. Touch Target Standards**: Seluruh tombol sentuh memiliki tinggi minimal $44\text{ px}$ dan touch target nyaman.
- [ ] **8. Lucide Vector Standard**: $100\%$ ikon menggunakan SVG path Lucide resmi; bebas dari emoji dan kurung siku `[>]`.
- [ ] **9. Prototype Continuity**: Seluruh tautan interaksi prototype, tombol kembali, dan tab navigasi bawah tetap terhubung dengan benar.
- [ ] **10. Productized Copy**: Seluruh teks telah dibersihkan dari kata-kata *dummy, testing, demo*, sesuai dengan `ux_writing.md`.
- [ ] **11. Safety & Crisis Compliance**: Banner privasi AI dan tombol darurat 119 tampil jelas pada modul sensitif.
- [ ] **12. Live Desktop Sync**: File kanvas `teman-sebaya.figcraft` telah disinkronkan ke jendela FigCraft desktop tanpa error.

