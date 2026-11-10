# Proyek Teman Sebaya - Panduan Integrasi FigCraft

## ⛔ ATURAN KETAT: DILARANG MENGEDIT FIGCRAFT KECUALI DIMINTA EKSPLISIT

> [!CAUTION]
> **DILARANG KERAS MENGUBAH / MENGEDIT FIGCRAFT KECUALI DIMINTA SECARA EKSPLISIT OLEH USER.**
>
> 1. AI Assistant **TIDAK BOLEH** memodifikasi file `.figcraft`, memanggil API FigCraft MCP/CLI (port 7979), mengubah node/layer/halaman, atau menambah/menghapus frame di FigCraft secara otomatis.
> 2. Perubahan pada kanvas FigCraft **HANYA BOLEH DILAKUKAN JIKA DAN HANYA JIKA** user memberikan perintah langsung dan eksplisit (contoh: *"Update canvas FigCraft"*, *"Tolong ubah frame ini di FigCraft"*).
> 3. Jika user sedang membahas fitur, alur logika, bug kode, atau UI mobile, fokuskan seluruh pekerjaan pada codebase React Native (`mobile/src/`), dan **biarkan FigCraft tetap apa adanya (untouched)**.
> 4. Rujukan lengkap kebijakan ini ada di: [`FIGCRAFT_POLICY.md`](file:///c:/Users/Fhazar/Fhazar_Workspace/02_PROJECTS/teman-sebaya/FIGCRAFT_POLICY.md).

Proyek ini terintegrasi penuh dengan **FigCraft** melalui Model Context Protocol (MCP) dan `figcraft-cli`.

## Status Integrasi

- **Mode Saat Ini**: 🟢 **Live GUI Sync (Aktif pada Port 7979)**
- **Aplikasi Terbuka**: Jendela desktop FigCraft sedang berjalan dengan flag `--control 7979`.
- **File Aktif**: [`teman-sebaya.figcraft`](file:///c:/Users/Fhazar/Fhazar_Workspace/02_PROJECTS/teman-sebaya/teman-sebaya.figcraft) terbuka langsung di kanvas desktop.
- Setiap manipulasi desain (layer, teks, warna, komponen) yang dijalankan akan langsung ter-render secara visual di layar Anda.

## Konfigurasi MCP Aktif

```json
{
  "mcpServers": {
    "figcraft": {
      "command": "C:\\Users\\Fhazar\\AppData\\Local\\Programs\\ArtCraft\\FigCraft\\figcraft-cli.exe",
      "args": ["mcp", "--attach", "7979"]
    }
  }
}
```

## Lokasi Binary

- **FigCraft GUI**: `C:\Users\Fhazar\AppData\Local\Programs\ArtCraft\FigCraft\figcraft.exe`
- **FigCraft CLI / MCP**: `C:\Users\Fhazar\AppData\Local\Programs\ArtCraft\FigCraft\figcraft-cli.exe`

## Panduan Kerja Desain UI/UX & Design System

Setiap kali merancang antarmuka baru, memodifikasi layer, atau memperbaiki komponen UI/UX:
- **Wajib Membaca Design System**: [`design_system.md`](file:///c:/Users/Fhazar/Fhazar_Workspace/02_PROJECTS/teman-sebaya/design_system.md) di root project merupakan **sumber kebenaran tunggal (single source of truth)** untuk seluruh token warna, tipografi, grid layout, hierarki Auto Layout, dan katalog komponen aplikasi.
- **Kepatuhan Auto Layout & Text Wrapping**: Setiap text node multi-baris wajib memiliki parameter `width` eksplisit (`width: 328` pada level layar, `width: 296` di dalam kartu). Seluruh frame dan container wajib menggunakan struktur Auto Layout native FigCraft.
- **Dilarang Mengarang Token**: Gunakan token warna, tipografi, dan padding yang telah terstandarisasi dalam `design_system.md`.

## Panduan Kerja Desain Berbasis Referensi Visual

Setiap kali pengguna memberikan **gambar referensi, screenshot, atau contoh desain** (Dribbble, Behance, Pinterest, aplikasi nyata, dll.):
- **Wajib Membaca**: [`REFERENCE_DESIGN_GUIDELINES.md`](file:///c:/Users/Fhazar/Fhazar_Workspace/02_PROJECTS/teman-sebaya/REFERENCE_DESIGN_GUIDELINES.md) dan [`design_system.md`](file:///c:/Users/Fhazar/Fhazar_Workspace/02_PROJECTS/teman-sebaya/design_system.md) di root project sebelum merancang atau memodifikasi layer/kanvas.
- **Prinsip Utama**: *"Use the reference for design direction, not as a replacement for the existing design system."*
  - Gambar referensi digunakan untuk menentukan arah layout, komposisi spasial, dan hirarki konten.
  - Design system aplikasi (palet warna `#0F172A`, `#F8FAFC`, `#CBD5E1`, tipografi `Inter`, tombol native `drawButtonAL`, ikon Lucide SVG) wajib dipertahankan 100%.
  - Batasi modifikasi hanya pada layar/section target (Strict Scope Control) tanpa merombak layar lain.

