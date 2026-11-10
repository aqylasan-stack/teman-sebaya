# Aturan Modifikasi FigCraft (FigCraft Modification Policy)

> [!CAUTION]
> **ATURAN MUTLAK: DILARANG MENGEDIT FIGCRAFT KECUALI ADA INSTRUKSI EKSPLISIT DARI USER.**

---

### 1. Prinsip Utama (Core Rule)

AI Assistant atau Agen Pengembang **DILARANG KERAS** melakukan modifikasi apa pun terhadap file FigCraft ([`teman-sebaya.figcraft`](file:///c:/Users/Fhazar/Fhazar_Workspace/02_PROJECTS/teman-sebaya/teman-sebaya.figcraft)), node, layer, komponen, teks, maupun kanvas desain di FigCraft, **KECUALI jika user secara tegas dan eksplisit memerintahkannya**.

---

### 2. Batasan Tindakan yang Dilarang Tanpa Instruksi User

Tanpa perintah eksplisit dari user:
1. ❌ **Dilarang Menjalankan Script Modifikasi FigCraft**: Tidak boleh menjalankan endpoint `edit.delete`, `node.update`, `canvas.create`, atau manipulasi REST/MCP port 7979.
2. ❌ **Dilarang Memodifikasi File Binary `.figcraft`**: Tidak boleh membongkar atau menimpa isi zip `teman-sebaya.figcraft` / `document.json`.
3. ❌ **Dilarang Mengasumsikan Perubahan Desain Kanvas**: Meskipun kode aplikasi React Native diperbarui, AI **tidak boleh berasumsi** bahwa kanvas FigCraft harus ikut diubah saat itu juga.
4. ❌ **Dilarang Mengubah Frame Arsip / Master**: Frame lama di FigCraft dibiarkan apa adanya sampai ada aba-aba langsung dari user untuk menyelaraskannya.

---

### 3. Kapan FigCraft Boleh Diedit?

FigCraft **HANYA** boleh dimodifikasi jika user memberikan instruksi langsung dan spesifik, seperti:
- *"Update desain di FigCraft"*
- *"Tolong ubah frame ini di FigCraft"*
- *"Sinkronkan kanvas FigCraft dengan kode"*
- *"Buatkan frame baru di FigCraft"*

Jika instruksi seperti itu **tidak ada**, AI wajib:
- Membiarkan kanvas FigCraft **100% tidak tersentuh (untouched)**.
- Memfokuskan seluruh perbaikan, pengkodean, dan penyesuaian pada codebase **React Native (`mobile/src/`)**.

