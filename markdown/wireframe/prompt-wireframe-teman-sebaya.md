# PROMPT — Wireframe & User Flow End-to-End: TEMAN SEBAYA (Mobile App)

> Cara pakai: copy seluruh isi file ini dan paste ke AI lain sebagai satu prompt.
> Semua teks UI di dalam wireframe harus berbahasa Indonesia.
> Prompt ini mengikuti prinsip MASTER PROMPT end-to-end wireframe & user flow
> (analisis kebutuhan → arsitektur informasi → user flow → desain layar →
> interaksi → states → prototype → audit → deliverables).

---

# BAGIAN A — SOURCE MATERIAL (Sumber kebenaran utama)

Diambil dari analisis langsung prototipe Canva "Super App UI UX untuk Remaja"
(TEMAN SEBAYA), 8 November 2026. Link sumber:
https://www.canva.com/design/DAHaMTdI110/oDFJNEC8ZB3kIwUByw-d0A/edit

**Gunakan materi ini sebagai sumber kebenaran. Jangan mengubah konsep produk,
fitur, atau copy yang sudah ada. Copy di bawah ini adalah teks asli dari Canva,
pakai apa adanya di wireframe. Yang tidak ada di Canva jangan dikarang, beri
tanda [...] sebagai placeholder.**

## A.1 Gambaran produk

TEMAN SEBAYA — "Ruang Konseling Inklusif Remaja". Super app pendamping remaja:
ruang yang aman, empatik, dan tidak menggurui untuk bercerita, belajar,
bertumbuh, bertemu sebaya, dan menemukan jalur bantuan. Audiens: remaja.
Contoh lokasi: Karawang dan Jawa Barat. Merujuk ke program remaja Indonesia:
PIK-R dan Forum GenRe.

**Yang TIDAK ADA di dalam prototipe Canva (jangan dikarang):** tombol
login/daftar, kolom pencarian, tautan eksternal, backend, notifikasi, layar
pengaturan, data mitra/kontak/jadwal yang terverifikasi. Semua status (emosi,
obrolan, kuis, tantangan) hanya berlaku selama sesi, tidak tersimpan permanen.

## A.2 Enam tampilan utama (navigasi atas, semua berfungsi)

Header di semua tampilan: logo "TEMAN SEBAYA", navigasi Beranda, Cerita,
Belajar, Tumbuh, Komunitas, Akses. Sakelar bahasa ID / EN (EN terverifikasi
penuh hanya di Beranda dan Belajar; teks EN untuk Cerita, Tumbuh, Komunitas,
Akses belum tercatat — tandai [...] bila dibutuhkan). Footer di semua tampilan:
"Teman Sebaya · Ruang demonstrasi yang mengutamakan empati, kejelasan, dan
langkah yang aman." Setiap tampilan anak punya tautan "← Kembali ke beranda".

### 1. BERANDA (tampilan awal)

- Lencana: "Ada ruang untuk jadi dirimu sendiri"
- Judul: "Apa pun ceritamu, kamu punya teman di sini."
- Subjudul: "Mau cerita, mencari jawaban, atau menemukan langkah berikutnya?
  Mulai dari yang terasa nyaman buatmu"
- Kartu mood: "Bagaimana perasaanmu hari ini?" / "Pilih satu emosi untuk
  mencatat suasana hatimu."
- 4 tombol emosi: "Senang", "Marah", "Sedih", "Biasa Saja". Setelah memilih:
  "Emosi hari ini: Senang. Terima kasih sudah mengenali perasaanmu."
  (pola sama untuk emosi lain).
- Catatan: "Catatan ini hanya untuk sesi demo di perangkat ini, bukan
  penilaian kesehatan."
- Tombol: "Mulai bercerita" → membuka tampilan Cerita.
- "Lima teman, banyak cara untuk mulai." / "Pilih ruang yang paling kamu
  butuhkan hari ini."
- 5 kartu (masing-masing membuka tampilan terkait):
  1. "Teman Cerita — Mulai ngobrol dan temukan pilihan dukungan manusia."
  2. "Teman Belajar — Baca hal penting tentang diri, kesehatan, dan dunia digital."
  3. "Teman Tumbuh — Kenali minat dan coba langkah kecil yang berarti."
  4. "Teman Komunitas — Jelajahi inspirasi kegiatan dan ruang bertemu sebaya."
  5. "Teman Akses — Pahami jalur bantuan yang sesuai dengan kebutuhanmu."

### 2. CERITA (obrolan simulasi otomatis, BUKAN konseling sungguhan)

- "Cerita dimulai dari sini."
- "Tidak harus tahu mau mulai dari mana. Pilih topik atau tulis beberapa kata.
  Obrolan ini hanya simulasi otomatis, bukan konseling sungguhan."
- Label: "Ruang ngobrol · simulasi"
- Pesan pembuka bot: "Hai! Aku respons otomatis untuk demo, bukan konselor.
  Kamu boleh pilih topik atau menulis cerita. Jangan tulis informasi pribadi
  yang sensitif, ya."
- Kotak teks: "Apa yang ingin kamu ceritakan?" + tombol "Kirim"
- "Mulai dari topik ini:" — "Lagi stres", "Masa depan", "Pertemanan"
- Balasan bot per topik:
  - "Lagi stres" → pengguna: "Aku lagi merasa stres"; bot: "Kedengarannya
    ini tidak mudah. Mau coba menyebutkan satu hal yang paling memberatkan
    saat ini? Jika perasaan ini berlanjut, cari dukungan orang tepercaya
    atau tenaga profesional."
  - "Masa depan" → pengguna: "Aku bingung tentang masa depan"; bot: "Kamu
    tidak harus punya semua jawabannya sekarang. Coba tulis satu hal yang
    menarik bagimu dan satu langkah kecil untuk mencobanya."
  - "Pertemanan" → pengguna: "Aku bingung tentang pertemanan"; bot:
    "Pertemanan bisa terasa rumit. Kamu lebih ingin didengarkan, memikirkan
    batasan yang sehat, atau mencari cara memulai obrolan?"
  - Pesan bebas (contoh teruji) → bot: "Terima kasih sudah berbagi. Apa
    bagian yang paling ingin kamu ceritakan lebih dulu? Kalau ingin berbicara
    dengan manusia, buka Teman Akses."
  - Setelah topik dipilih, placeholder kotak teks berubah menjadi
    "Aku ingin cerita tentang..."
- "Ingin bicara dengan manusia? Kamu bisa mempertimbangkan pendamping sebaya
  atau tenaga profesional. Lihat dulu langkah dan keterbatasan tiap pilihan."
- Tombol: "Konselor sebaya" → Akses tab Konselor sebaya; "Tenaga profesional"
  → Akses tab Tenaga profesional; "Lihat pilihan bantuan" → tampilan Akses.
- Peringatan: "Teman Sebaya bukan layanan darurat. Jika kamu dalam bahaya,
  segera cari bantuan langsung dari orang dewasa terpercaya atau layanan
  darurat setempat."

### 3. BELAJAR (artikel per topik + kuis singkat)

- "Belajar tanpa harus tahu segalanya."
- "Pilih satu topik, baca pelan-pelan, lalu coba kuis singkatnya."
- 5 tab, masing-masing 1 artikel singkat:
  - Kesehatan mental — "Mengenali perasaan adalah awal yang baik." /
    "Coba beri nama perasaanmu, beristirahat saat perlu, dan bercerita
    kepada orang yang kamu percaya. Meminta bantuan bukan tanda lemah. Jika
    perasaan berat terus berlanjut, carilah pendamping profesional."
  - Kesehatan reproduksi — "Kenali tubuh, hormati batas diri." /
    "Perubahan tubuh saat remaja itu wajar. Pelajari kebersihan diri,
    persetujuan, dan batasan pribadi dari sumber kesehatan yang tepercaya.
    Pertanyaan medis pribadi sebaiknya dibicarakan dengan tenaga kesehatan."
  - Keterampilan hidup — "Keterampilan hidup bisa dilatih." / "Mulai dengan
    satu kebiasaan: mengatur waktu, mendengar dengan saksama, atau
    menyampaikan kebutuhan dengan jelas. Coba, amati hasilnya, lalu
    sesuaikan."
  - Masa depan — "Rencana masa depan boleh berubah." / "Tulis minatmu, satu
    keterampilan yang ingin dipelajari, dan pilihan pendidikan atau pekerjaan
    yang ingin kamu jelajahi. Cari informasi dari sumber resmi."
  - Literasi digital — "Punya kendali di ruang digital." / "Periksa sumber
    sebelum membagikan kabar. Jaga data pribadi dan privasi akun. Jika
    mengalami gangguan daring, ceritakan kepada orang tepercaya."
- "Belajar dengan cara yang cocok buatmu" / "Artikel singkat tersedia di tiap
  tab. Video dan infografis belum tersedia dalam demo ini." / Label:
  "Video & infografis · belum tersedia"
- "Kuis cepat" / "Tiga pertanyaan, tanpa tekanan. Kamu boleh mengulang."
- 3 soal kuis:
  1. "Saat perasaan terasa berat, apa yang membantu?" — "Bercerita kepada
     orang tepercaya" / "Memendam semuanya sendirian"
  2. "Sebelum menyebarkan informasi daring..." — "Langsung bagikan" /
     "Periksa sumbernya"
  3. "Rencana masa depan bisa..." — "Berubah sambil belajar" /
     "Tidak boleh berubah"
- Tombol: "Lihat hasil", "Ulangi kuis"
- Hasil teruji: semua benar → "3 dari 3 benar. Bagus! Kamu sudah memahami
  langkah dasarnya."; semua salah → "0 dari 3 benar. Tidak apa-apa. Baca
  kembali ringkasannya dan coba lagi, ya." Pesan untuk skor 1–2 dari 3 TIDAK
  diketahui — tandai [...] jangan dikarang.

### 4. TUMBUH (jelajah minat, keterampilan, pendidikan/karier, tantangan)

- "Bertumbuh dengan caramu."
- "Tidak ada satu jalan yang cocok untuk semua orang. Coba kenali dirimu,
  lalu ambil langkah kecil."
- 4 tab:
  - Minat & potensi — "Jelajah minat singkat" / "Pilih yang terasa paling
    dekat. Hasilnya inspirasi eksplorasi, bukan penilaian psikologis."
    - "Apa yang paling menarik bagimu?" — "Membantu orang lain" /
      "Berkarya dan berkreasi" / "Mencari solusi"
    - "Kekuatan apa yang ingin kamu pakai?" — "Kerja sama" /
      "Mengembangkan ide" / "Memperhatikan detail"
    - Tombol: "Lihat inspirasiku"
    - Hasil teruji (kombinasi lain belum teruji — tandai [...]):
      - Membantu orang lain + Kerja sama → "Kamu mungkin menikmati kegiatan
        yang melibatkan orang lain, seperti organisasi atau pendampingan
        sebaya. Coba mulai dari proyek bersama teman. Ini inspirasi awal,
        bukan tes psikologis."
      - Berkarya dan berkreasi + Mengembangkan ide → "Kamu mungkin menikmati
        proyek kreatif seperti menulis, desain, atau membuat konten edukasi.
        Coba tulis satu ide dan wujudkan versi kecilnya. Ini inspirasi awal,
        bukan tes psikologis."
      - Mencari solusi + Memperhatikan detail → "Kamu mungkin menikmati
        riset, teknologi, atau memecahkan masalah kecil di sekitarmu. Coba
        buat rencana sederhana dengan langkah yang jelas. Ini inspirasi awal,
        bukan tes psikologis."
  - Keterampilan hidup — "Mulai dari keterampilan sehari-hari" / "Latih
    komunikasi dengan mendengar sampai selesai sebelum merespons. Untuk
    mengatur waktu, pilih satu tugas penting dan beri waktu khusus untuk
    menyelesaikannya."
  - Pendidikan & karier — "Jelajahi pilihan, bukan menebak satu jawaban" /
    "Bandingkan minatmu dengan bidang studi atau pekerjaan yang ingin
    diketahui. Tanyakan pengalaman kepada guru atau orang yang bekerja di
    bidang itu, lalu periksa persyaratan resmi."
  - Tantangan positif — "Tantangan baik hari ini" / "Centang setelah dicoba.
    Progres berlaku selama halaman ini terbuka." / 3 tantangan: "Luangkan
    lima menit untuk jeda.", "Tulis satu hal yang kamu syukuri.",
    "Dengarkan seorang teman tanpa menyela." / Penghitung: "0 dari 3
    tantangan selesai." (berubah sesuai centang) / Tombol "Mulai ulang".

### 5. KOMUNITAS (contoh ruang/kegiatan — SEMUA belum terverifikasi)

- "Ruang untuk terhubung dan bergerak."
- "Lihat contoh ruang dan kegiatan positif. Semua contoh di bawah belum
  terverifikasi sebagai mitra atau acara aktif."
- 3 tab:
  - PIK-R — label "CONTOH · belum terverifikasi" / "Diskusi sebaya bersama
    PIK-R" / "Lokasi contoh: Karawang" / "Contoh sesi tentang komunikasi
    sehat dan cara mencari dukungan bersama teman sebaya. Bukan pengumuman
    kegiatan aktif." / Detail: "Contoh kegiatan: diskusi sebaya PIK-R
    tentang komunikasi sehat. Ini ilustrasi di Karawang, bukan acara
    terverifikasi. Tanyakan kepada sekolah atau pengelola setempat tentang
    kelompok yang aktif." / Catatan: "Kartu di atas adalah ilustrasi, bukan
    riwayat kegiatan terverifikasi atau undangan untuk mendaftar."
  - Forum GenRe — "Lokakarya bersama Forum GenRe" / "Lokasi contoh: Jawa
    Barat" / "Inspirasi ruang diskusi remaja tentang tujuan hidup dan
    kolaborasi. Jadwal dan penyelenggara belum diverifikasi." / Detail:
    "Contoh kegiatan: lokakarya perencanaan masa depan bersama Forum GenRe.
    Ini ilustrasi untuk Jawa Barat. Periksa kanal resmi sebelum mengikuti
    kegiatan." / Catatan: "Kartu di atas adalah ilustrasi, bukan riwayat
    kegiatan terverifikasi atau undangan untuk mendaftar. Selalu periksa
    informasi melalui penyelenggara resmi."
  - Kegiatan positif — 2 kartu, keduanya berlabel "DEMO · bukan acara
    aktif": "Aksi lingkungan bersama PIK-R" / "Lokasi contoh: Karawang" /
    "Ide kegiatan kerja bakti dan belajar menjaga ruang bersama." dan
    "Kelas kreatif bersama GenRe" / "Lokasi contoh: Jawa Barat" / "Ide
    kegiatan relawan remaja membuat materi edukasi yang ramah sebaya."
- Tombol: "Lihat detail contoh" (membuka kotak penjelasan di bawah kartu),
  "Lihat jalur komunitas di Teman Akses" → Akses tab PIK-R mitra.

### 6. AKSES (panduan jalur bantuan — BUKAN direktori layanan aktif)

- "Cari langkah yang cocok untukmu."
- "Pilih kebutuhan, pelajari jalurnya, lalu lihat langkah berikutnya. Ini
  panduan demo, bukan direktori layanan aktif atau sambungan langsung."
- Filter: "Apa yang sedang kamu butuhkan?" — "Lihat semua pilihan" /
  "Ingin didengarkan" / "Butuh pendampingan profesional" /
  "Ingin terhubung ke komunitas"
  - "Ingin didengarkan" → hanya tab Konselor sebaya ("Pilihan konselor
    sebaya ditampilkan.")
  - "Butuh pendampingan profesional" → tab Tenaga profesional dan Layanan
    rujukan ("Pilihan profesional dan rujukan ditampilkan.")
  - "Ingin terhubung ke komunitas" → tab PIK-R dan Forum GenRe ("Pilihan
    PIK-R dan Forum GenRe ditampilkan.")
  - "Lihat semua pilihan" → kelima tab kembali.
- "Semua jalur ditampilkan. Pilih satu untuk melihat detail."
- 5 tab jalur, masing-masing dengan tombol "Lihat langkah berikutnya"
  (membuka kotak langkah di bawah kartu):
  - Konselor sebaya — "Bercerita kepada konselor sebaya" / "Pendamping
    sebaya dapat menjadi langkah awal untuk didengarkan. Tanyakan kepada
    sekolah atau pengelola PIK-R setempat tentang privasi dan batas
    perannya. Kontak mitra belum diverifikasi." / Langkah: "Tanyakan kepada
    sekolah atau pengelola PIK-R setempat apakah tersedia konselor sebaya,
    bagaimana privasi dijaga, dan kapan kamu dapat berbicara. Demo ini
    tidak menyediakan kontak terverifikasi."
  - Tenaga profesional — "Berbicara dengan tenaga profesional" / "Untuk
    kebutuhan kesehatan atau pendampingan lebih lanjut, tanyakan layanan di
    fasilitas kesehatan resmi wilayahmu. Periksa jadwal, biaya, dan cara
    mengaksesnya secara langsung." / Langkah: "Hubungi fasilitas kesehatan
    resmi di wilayahmu secara mandiri untuk menanyakan tenaga yang tersedia,
    jadwal, dan biaya. Demo ini tidak menyediakan pemesanan."
  - Layanan rujukan — "Mencari layanan lain" / "Petugas kesehatan atau
    orang dewasa tepercaya dapat membantu mencari layanan sesuai kebutuhan.
    Demo ini tidak membuat surat rujukan." / Langkah: "Minta bantuan petugas
    kesehatan atau orang dewasa tepercaya untuk memilih rujukan yang sesuai.
    Demo ini tidak menerbitkan rujukan resmi."
  - PIK-R mitra — "Menemukan kelompok sebaya" / "Tanyakan kepada sekolah
    atau instansi setempat apakah ada kelompok PIK-R yang aktif. Nama,
    alamat, dan kontak mitra belum tersedia di demo ini." / Langkah:
    "Tanyakan kepada sekolah atau instansi setempat tentang PIK-R yang
    aktif. Nama dan kontak mitra belum diverifikasi."
  - Forum GenRe — "Mengenal Forum GenRe" / "Forum GenRe dapat menjadi titik
    awal pencarian kegiatan remaja. Periksa kanal resmi untuk memastikan
    pengurus, jadwal, dan cara bergabung." / Langkah: "Periksa kanal resmi
    Forum GenRe melalui sumber yang kamu percayai. Demo ini tidak memiliki
    jadwal terverifikasi."
- Catatan: "Belum ada nomor, tautan, alamat, jadwal, atau ketersediaan
  layanan yang terverifikasi. Tombol ini tidak menghubungkan langsung ke
  pihak luar. Teman Sebaya bukan layanan darurat; saat keselamatan terancam,
  cari bantuan langsung."

## A.3 Penafian yang wajib dipertahankan di wireframe

- "Obrolan ini hanya simulasi otomatis, bukan konseling sungguhan."
- "Catatan ini hanya untuk sesi demo di perangkat ini, bukan penilaian kesehatan."
- "Video dan infografis belum tersedia dalam demo ini."
- "Ini panduan demo, bukan direktori layanan aktif atau sambungan langsung."
- "Semua contoh di bawah belum terverifikasi sebagai mitra atau acara aktif."
- "Hasilnya inspirasi eksplorasi, bukan penilaian psikologis."
- "Teman Sebaya bukan layanan darurat. Jika kamu dalam bahaya, segera cari
  bantuan langsung dari orang dewasa terpercaya atau layanan darurat setempat."

## A.4 Referensi visual (dari Canva, sebagai referensi saja)

Latar krem/kertas pucat, panel hero biru muda, teks dan tombol utama biru navy
gelap, aksen pastel (biru muda, kuning pucat, hijau muda, persik), kotak hasil
hijau pucat. Kartu bersudut membulat, tab berbentuk pil, tipografi sans-serif,
judul tebal, banyak ruang kosong. Ilustrasi vektor datar yang ramah.
**Wireframe tetap grayscale sesuai aturan di bawah; warna Canva hanya referensi
arah visual, bukan untuk diwarnai di wireframe.**

## A.5 Hal yang belum diketahui (jangan dikarang, tandai [...] di wireframe)

- Nama klien/pemilik produk.
- Isi profil pengguna (nama, username, bio, statistik) — belum ada di Canva.
- Pesan hasil kuis untuk skor 1–2 dari 3.
- Teks hasil "Lihat inspirasiku" untuk kombinasi minat/kekuatan yang belum teruji.
- Teks bahasa Inggris untuk Cerita, Tumbuh, Komunitas, Akses.
- Nomor, tautan, alamat, jadwal, atau kontak layanan apa pun (tidak ada yang
  terverifikasi).
- Tujuan pasti tombol "Lihat pilihan bantuan" di Cerita (saat diuji membuka
  Akses, tab yang tampil mengikuti tab terakhir yang dipilih).

---

# BAGIAN B — MASTER PROMPT (prinsip kerja yang harus diikuti)

## 1. YOUR ROLE

Act as a Senior UX/UI Designer, Product Designer, UX Architect, and Interaction Designer.

Your responsibility is to design a complete, logically connected, and comprehensive application wireframe based on the product requirements provided.

You must think beyond individual screens. Design the application as a complete product experience, covering the user's entire journey from the first time they open the application until they log out.

The final result must not be a collection of disconnected mockups.

It must be a complete wireframe system where:
- Every required screen exists.
- Every screen has a clearly defined purpose.
- Every interactive element has a defined behavior.
- Every navigation path leads to a valid destination.
- Every important user action has an appropriate response.
- Every relevant success, failure, loading, empty, and validation state is considered.
- No essential user journey is left unfinished.

**IMPORTANT: Do not immediately generate the screens. Understand the requirements, plan the architecture, map the flows, and then generate the complete wireframe.**

---

## 2. PROJECT CONTEXT

Use the following information as the primary source of truth. Section A above is the detailed source material for this context.

- Product name: TEMAN SEBAYA — Ruang Konseling Inklusif Remaja
- Product description: A mobile super app and safe companion space for teenagers: a place to share stories (automated simulation chat, not real counselling), learn through short articles and quizzes, explore interests and take small growth steps, discover peer community activities, and find safe help pathways. All content in the source is demo content with clear disclaimers; it is a guidance and inspiration app, not a live service directory, not an emergency service, and not a health assessment tool.
- Platform: MOBILE (Android-first). Frame size 360 x 800 (the standard Android baseline width that fits all Android devices; do not base the design on iPhone dimensions). Screens may be made taller when content needs to scroll.
- Target users: Teenagers (remaja) in Indonesia; example locations Karawang and Jawa Barat; connected to youth programs PIK-R and Forum GenRe.
- User roles: ONE role only — Remaja (the user). There is no admin, staff, or counsellor role in the source material. Do not invent an admin dashboard or staff screens.
- Main objectives: (1) Give teenagers a safe, empathetic first place to express feelings; (2) Provide short, trustworthy learning content; (3) Help teenagers explore interests and take small steps; (4) Inspire positive peer community activity; (5) Guide teenagers to the right human help safely, with clear limits.
- Core features: (1) Beranda with daily mood check-in (4 emotions) and 5 feature cards; (2) Teman Cerita — automated simulation chat with 3 starter topics and free text, with escalation to human help; (3) Teman Belajar — 5 topic tabs with short articles + 3-question quiz with scoring and retry; (4) Teman Tumbuh — interest explorer (2 questions, result per combination), life skills, education & career, positive daily challenges with progress counter and reset; (5) Teman Komunitas — example PIK-R, Forum GenRe, and positive activity cards with detail panels (all labelled unverified examples); (6) Teman Akses — need filter + 5 help-pathway tabs, each with "next step" detail panel.
- Additional features: ID/EN language toggle (full EN verified only for Beranda and Belajar); session-only state (mood, chat history, quiz answers, challenge progress persist only during the session); safety warning for emergency situations; demo disclaimers on every relevant screen (see A.3).
- Design references: Canva prototype https://www.canva.com/design/DAHaMTdI110/oDFJNEC8ZB3kIwUByw-d0A/edit and the detailed source material in Section A.
- Design direction: Minimalist, empathetic, clean, calm, safe. Grayscale wireframe (see section 6D). Use the Canva colours only as a visual-direction reference, not as wireframe colours.
- Additional constraints:
  - NO emoji anywhere. Use drawn line icons only (bottom navigation, back, search, eye, settings, and all other icons).
  - All UI copy in Indonesian. Use the exact copy from Section A. Anything not in Section A stays as a [...] placeholder — never invent it.
  - Bottom navigation with 6 items (Beranda, Cerita, Belajar, Tumbuh, Komunitas, Akses), active state clearly visible.
  - Grid: 4 columns, margin 16, gutter 16 on every screen.
  - Splash, Onboarding, Login, and Profile screens are requested by the client as the app shell but are NOT in the Canva source. Design them simply, consistently with the source, and mark them clearly as client-requested additions (assumption, not source content). Keep authentication minimal: Login, Register, Forgot Password, Logout with confirmation. No backend exists; design states only.
  - Never invent: partner names, contacts, phone numbers, addresses, schedules, prices, statistics, or verification status. Keep every "unverified / demo / not a real service" label from the source.
  - Do not add features outside this scope (no search, no payments, no notifications system, no admin) just to look comprehensive.

Use all available project documents, descriptions, reference images, and previously provided instructions as supporting context.

Do not arbitrarily change the product concept, business requirements, or existing feature specifications.

If some information is missing:
1. Identify what is missing.
2. Distinguish between essential missing requirements and minor details.
3. Do not invent business logic or features without justification.
4. For non-critical gaps, make reasonable assumptions and document them.
5. For critical ambiguities that would materially change the architecture, ask concise clarification questions before proceeding.

---

## 3. PHASE ONE — REQUIREMENT AND FUNCTIONAL ANALYSIS

Before designing anything, understand how the application is supposed to work.

Analyze the following:

### A. User and role identification
Identify every type of user who interacts with the application.

For each role, determine:
- Their objectives.
- Their permissions.
- Their available features.
- Their accessible screens.
- Their restrictions.
- Their expected user journey.

Do not mix interfaces or permissions between roles.

For this product there is one role (Remaja). There is no administrator or staff role in the source; do not create one.

### B. Feature analysis

Break down every feature into its actual functionality.

For each feature, identify:
- What the feature does.
- Who can access it.
- What information it displays.
- What actions users can perform.
- What screens are required.
- What data or conditions are necessary.
- What happens after an action is performed.
- What happens when an operation fails.

Do not interpret a feature name as a complete functional specification.

For example:

"Profile Management" must be analyzed into:
- View profile.
- Edit profile.
- Update personal information.
- Change profile picture, if supported.
- Save changes.
- Cancel editing.
- Display validation errors.
- Display update confirmation.

A feature must be translated into actual user interactions and corresponding screens or states.

Apply the same breakdown to every Teman Sebaya feature in Section A — for example "Teman Cerita" is not one screen, it is: open chat, read the bot opening message, pick a topic or type free text, send, receive the scripted reply, escalate to human help (Konselor sebaya / Tenaga profesional / Lihat pilihan bantuan), and read the emergency warning. "Teman Belajar" is: switch topic tabs, read the article, open the quiz, answer 3 questions, view the result, retry. "Teman Tumbuh" is: switch tabs, answer 2 explorer questions, view the inspiration result, read life-skills and education content, check/uncheck 3 challenges, watch the counter, reset. "Teman Akses" is: pick a need in the filter, see the matching tabs, open a pathway card, reveal the next-step panel, read the no-verified-contact note.

---

## 4. PHASE TWO — INFORMATION ARCHITECTURE AND SCREEN INVENTORY

Create the complete application structure before generating the wireframe.

### A. Build the sitemap

Organize all screens into logical groups.

At minimum, evaluate these categories:

1. Entry and splash screens.
2. Introduction and onboarding.
3. Authentication.
4. Main application.
5. Core feature modules.
6. Detail and management screens.
7. Profile and account management.
8. Notifications.
9. Settings and preferences.
10. Help and support.
11. Confirmation dialogs and overlays.
12. Logout and session management.
13. Error and recovery screens.

Only include categories relevant to the actual product. Do not add unnecessary features merely to make the application look comprehensive.

For Teman Sebaya, the relevant groups are: Entry (Splash), Onboarding, Authentication (Login / Register / Forgot Password), Main application (Beranda + 5 core modules with bottom navigation), Detail states inside modules (article view, quiz result, explorer result, challenge progress, community detail panel, access next-step panel), Profile and account management, Help and safety information, Logout and session management, Error and recovery states. There is no notifications system and no admin section in the source — do not add them.

### B. Create a complete screen inventory

List every screen that needs to be designed.

Use this structure:

| ID | Screen Name | User Role | Purpose | Entry Point | Available Actions | Next Destination |
|---|---|---|---|---|---|---|
| SCR-001 | Splash Screen | All | Initial application entry | Application launch | Automatic routing | Onboarding / Login / Dashboard |
| SCR-002 | Login | Guest | Authenticate users | Splash | Login, Register, Forgot Password | Dashboard / Register / Recovery |
| SCR-003 | Register | Guest | Create an account | Login | Submit registration, Back to Login | Verification |
| SCR-004 | Dashboard | User | Main application overview | Authentication | Navigate to features | Relevant feature screens |

Continue until every required screen has been identified.

Assign a unique ID to every screen.

Also distinguish between:
- Full-page screens.
- Modal dialogs.
- Bottom sheets.
- Popovers.
- Dropdown menus.
- Toast notifications.
- Inline component states.
- Loading and error states.

Do not treat every interaction as a new full-page screen when an overlay or state change is more appropriate.

For Teman Sebaya: tab switches inside Belajar / Tumbuh / Komunitas / Akses are inline states, not new screens. The quiz result, the explorer result, the community detail panel, and the access next-step panel are inline expanded states or overlays, not separate full screens — unless the layout materially changes. The mood confirmation on Beranda is an inline state. The filter in Akses changes which tabs are visible — an inline state.

**Completeness requirement:** Every feature identified in Phase One must have corresponding screens and interactions in the screen inventory.

---

## 5. PHASE THREE — COMPLETE USER FLOW DESIGN

This is one of the most important stages.

Map the entire application journey, including primary paths, alternative paths, and failure conditions.

### A. Application entry flow

Design the initial experience:

Application Launch → Splash Screen → Initial Routing

Determine what happens based on the user's authentication status.

- First-time visitor: Show onboarding if the product requires it.
- Unauthenticated returning visitor: Navigate to Login or the appropriate public entry page.
- Authenticated user: Navigate to the relevant dashboard.
- Expired session: Request authentication again.
- Invalid or unavailable session: Handle the situation appropriately.

Do not send every user through the same route regardless of their session status.

Note for Teman Sebaya: the Canva source has no authentication at all — the app shell (Splash → Onboarding → Login → Beranda) is a client-requested addition. Keep the entry flow simple and mark it as an assumption. The core experience (Beranda and the 5 modules) must also be reachable and understandable without an account, because the source demo works that way.

### B. Onboarding flow

When onboarding is relevant, include:
- Introduction screens.
- Product explanation.
- Feature introduction.
- Skip action, if permitted.
- Next and Previous navigation.
- Page indicators.
- Get Started action.
- Transition to registration or login.

Make sure onboarding can actually be completed and exited.

For Teman Sebaya, build onboarding from the Canva hero copy and the five feature descriptions in Section A (Beranda): the safe-space message, the mood check-in, and the five "Teman" spaces. Three onboarding screens are enough; do not invent new promises.

### C. Registration flow

Do not create a Register button without implementing the registration journey.

Evaluate the following:
- Registration form.
- Required and optional fields.
- Input validation.
- Email or phone number validation.
- Password requirements.
- Confirm password, if applicable.
- Show/hide password.
- Terms and conditions acceptance, if required.
- Duplicate account handling.
- Invalid input handling.
- Loading state during submission.
- Registration success.
- Email or OTP verification, if required.
- Verification failure.
- Resend verification.
- Verification success.
- Transition to onboarding or dashboard.

Include an explicit route back to Login.

Keep this minimal for Teman Sebaya: the source has no registration, so design the simplest credible form and document it as a client-requested assumption. Do not design verification flows that imply a real backend unless you mark them as assumed.

### D. Login flow

Include:
- Login form.
- Email or username field, as appropriate.
- Password field.
- Show/hide password.
- Remember me, if relevant.
- Forgot Password.
- Register navigation.
- Empty field validation.
- Invalid credentials.
- Account not verified.
- Account disabled or restricted, if applicable.
- Loading state.
- Successful authentication.
- Redirect to the appropriate destination.

### E. Forgot password and recovery flow

Include the complete recovery process:

Login → Forgot Password → Recovery Form → Submission Feedback → Verification → Reset Password → Confirm New Password → Success → Login

Consider:
- Invalid email or account.
- Expired recovery link or OTP.
- Incorrect verification code.
- Resend code.
- Password requirements.
- Password mismatch.
- Successful password reset.

Do not stop at a page that merely says "Enter your email".

### F. Main application flow

After successful authentication, design the complete main application.

For every core feature, identify:

1. Where the user enters the feature.
2. What the main screen displays.
3. What can be clicked.
4. What happens when an item is selected.
5. Whether there is a detail page.
6. Whether information can be created.
7. Whether existing information can be edited.
8. Whether information can be deleted.
9. Whether there are confirmation dialogs.
10. What success feedback is displayed.
11. What happens when something fails.
12. Where the user goes next.

For features involving data management, evaluate the applicable CRUD operations:

- Create.
- Read.
- Update.
- Delete.

Do not automatically force CRUD into features that do not require it.

Teman Sebaya is mostly read-and-interact, not CRUD: the user reads articles, answers a quiz, checks challenges, picks emotions, and chats with a scripted bot. Do not force create/edit/delete flows onto it. The only "creation" is a chat message and a mood selection, and the only "reset" is the quiz retry and the challenge reset.

If a feature contains a list, determine whether it needs:
- Search.
- Filtering.
- Sorting.
- Pagination or load more.
- Item selection.
- Detail view.
- Empty state.
- No-results state.

The Akses filter is the one real filtering interaction in the source — design it exactly as specified in Section A (each filter option shows a defined subset of tabs). There is no search in the source; do not add one.

If a feature contains forms, determine its complete submission and recovery behavior.

### G. Navigation flow

Every navigation component must be functional within the prototype.

Evaluate:
- Sidebar navigation.
- Bottom navigation.
- Top navigation.
- Navigation tabs.
- Breadcrumbs.
- Back buttons.
- Close buttons.
- Profile dropdowns.
- Notification menus.
- Context menus.
- Nested navigation.

The active navigation state must be visually identifiable.

The back button must return users to a logical previous destination, not an arbitrary screen.

For Teman Sebaya: bottom navigation with 6 items is the primary navigation. Each module screen has "← Kembali ke beranda". Tabs inside Belajar, Tumbuh, Komunitas, and Akses switch content inline. The header language toggle switches ID/EN and persists across screens.

### H. Profile and account management

When relevant, include:
- View profile.
- Edit profile.
- Update profile information.
- Change profile picture.
- Change password.
- Account preferences.
- Notification preferences.
- Privacy settings.
- Account security.
- Save changes.
- Cancel changes.
- Validation and success feedback.

For Teman Sebaya, Profile is a client-requested shell screen. All personal content (name, username, bio, stats) is unknown — use [...] placeholders and keep the screen simple: profile info, mood history placeholder, story history placeholder, settings rows, help, logout. Do not invent a real profile.

### I. Logout flow

Logout must be part of the complete journey.

Implement:

Profile / Settings → Logout → Confirmation Dialog → Successful Logout → Login or Public Entry Screen

Include:
- Logout button.
- Confirmation dialog.
- Cancel action.
- Confirm logout action.
- Redirect after logout.
- Session termination feedback, where appropriate.
- Handling of browser or application back navigation after logout.

The user must not be able to return to protected screens through ordinary navigation after their session has ended.

---

## 6. PHASE FOUR — DETAILED SCREEN DESIGN

Once the information architecture and user flows are complete, begin generating the wireframes.

For EVERY screen in the screen inventory, provide a sufficiently detailed layout.

### A. Screen structure

Define:
- Header.
- Navigation.
- Main content area.
- Sections and subsections.
- Cards.
- Forms.
- Tables.
- Lists.
- Buttons.
- Input fields.
- Menus.
- Footer, when relevant.

Use logical hierarchy and consistent spacing.

### B. Component-level details

Do not simply draw a rectangle and label it "Form".

Specify the actual components.

For example:

**Login Screen**

- Application logo.
- Welcome heading.
- Supporting description.
- Email input with label and placeholder.
- Password input with label and visibility toggle.
- Remember me checkbox, if supported.
- Forgot Password link.
- Primary Login button.
- Divider.
- Alternative authentication options, if supported.
- Register navigation.
- Relevant supporting information.

Every component should have a clear purpose.

Apply the same component-level detail to the Teman Sebaya screens: Beranda (logo, badge, headline, subheadline, mood card with 4 emotion buttons and confirmation state, disclaimer note, primary CTA, 5 feature cards), Cerita (chat header, bot opening message, topic chips, message input + send, escalation buttons, emergency warning), Belajar (5 tabs, article card, media-unavailable note, 3-question quiz, result state, retry), Tumbuh (4 tabs, 2 explorer questions + result, life-skills and education content, 3 challenge checkboxes + counter + reset), Komunitas (3 tabs, example cards with unverified labels, detail panel, note), Akses (need filter, 5 pathway tabs, pathway card, next-step panel, no-verified-contact note).

### C. Content accuracy

Use realistic sample content relevant to the application.

Do not use excessive lorem ipsum.

Use consistent:
- Naming conventions.
- User information.
- Dates.
- Numbers.
- Labels.
- Statuses.
- Data relationships.

Do not invent statistics, business rules, or data that conflict with the project requirements.

For Teman Sebaya this is strict: use the exact copy from Section A. Where Section A says the content is unknown or untested, use [...] — for example profile fields, quiz messages for scores 1–2 of 3, explorer results for untested combinations, and any contact or schedule information.

### D. Visual consistency

Establish a consistent low-fidelity visual system.

Define:
- Wireframe color scheme.
- Typography hierarchy.
- Spacing system.
- Grid and alignment.
- Component sizing.
- Border and divider conventions.
- Form structure.
- Button hierarchy.
- Navigation patterns.

Unless explicitly requested otherwise, use grayscale wireframes.

Prioritize information architecture, usability, and screen hierarchy over decorative visual styling.

Do not turn a wireframe task into a fully polished UI design unless requested.

For Teman Sebaya: grayscale wireframe. Frame 360 x 800 (Android baseline; taller frames allowed for scrolling content). Grid: 4 columns, margin 16, gutter 16. Bottom navigation with 6 icon items (line icons, no emoji). Consistent card, tab-pill, button, and input styling across all screens. The Canva colours are a visual-direction reference only.

---

## 7. PHASE FIVE — INTERACTION AND COMPONENT BEHAVIOR

Every interactive element must have a defined behavior.

**There must be no decorative or dead interactive components.**

For every button, link, icon, card, menu item, form, and control, define the expected result.

Use this interaction specification:

| Screen | Component | User Action | Expected Behavior | Destination / Result |
|---|---|---|---|---|
| Login | Login Button | Click | Validate and submit credentials | Dashboard / Error |
| Login | Register Link | Click | Open registration screen | Register |
| Login | Forgot Password | Click | Open recovery form | Forgot Password |
| Register | Submit Button | Click | Validate registration data | Verification / Error |
| Profile | Edit Button | Click | Open editable profile form | Edit Profile |
| Profile | Save Button | Click | Validate and save changes | Success State |
| Settings | Logout | Click | Display confirmation dialog | Logout Dialog |
| Logout Dialog | Cancel | Click | Close confirmation | Previous Screen |
| Logout Dialog | Confirm | Click | End session | Login |

Add equivalent rows for every Teman Sebaya interaction, for example: Beranda mood button → shows the "Emosi hari ini: ..." confirmation and marks the button selected; Beranda "Mulai bercerita" and each feature card → opens the matching module; Cerita topic chip → sends the scripted user message and bot reply; Cerita "Kirim" → sends free text and returns the scripted generic reply; Cerita "Konselor sebaya" / "Tenaga profesional" → opens Akses on the matching tab; Belajar tab → swaps the article; Belajar "Lihat hasil" → shows the score message; "Ulangi kuis" → clears answers; Tumbuh "Lihat inspirasiku" → shows the result for the selected combination; Tumbuh challenge checkbox → updates the "n dari 3 tantangan selesai." counter; "Mulai ulang" → resets to 0; Komunitas "Lihat detail contoh" → opens the green detail panel; Akses filter option → shows only the matching tabs; Akses "Lihat langkah berikutnya" → opens the next-step panel. The language toggle switches ID/EN and persists across screens.

### Mandatory interaction rules

1. Every button must trigger an actual action or a clearly defined disabled state.
2. Every navigation link must point to a valid destination.
3. Every form must have a submission behavior.
4. Every input must have a defined validation rule where applicable.
5. Every destructive action must have appropriate confirmation.
6. Every modal must have a clear way to close or cancel, where appropriate.
7. Every successful action must provide feedback.
8. Every failed action must explain the problem and offer a recovery path.
9. Every dropdown must display its actual options.
10. Every tab must switch to its corresponding content.
11. Every back action must have a logical destination.
12. Every protected route must respect authentication and role permissions.

If a button performs an action within the same screen, show the resulting state instead of creating an unrelated screen.

---

## 8. PHASE SIX — SYSTEM STATES AND EDGE CASES

Do not design only the ideal scenario where everything works perfectly.

Evaluate relevant system states for every important feature.

### A. Loading state
- Loading indicator.
- Skeleton placeholder, where appropriate.
- Disabled submission buttons during processing.
- Appropriate loading feedback.

### B. Empty state
- No available data.
- First-time user with no records.
- No notifications.
- No search results.
- No transaction or activity history, where applicable.

Provide a useful next action instead of displaying an empty blank area.

For Teman Sebaya, the relevant empty states are: first-time user with no mood recorded yet, no chat history yet, no quiz attempted yet, no challenges completed yet (counter at "0 dari 3"), and profile history placeholders.

### C. Error state
- Network failure.
- Server error.
- Invalid input.
- Failed submission.
- Unauthorized access.
- Expired session.
- Missing or unavailable data.

Explain the error and provide a reasonable recovery action.

For Teman Sebaya, the most relevant "error" states are content states, not server errors: video/infografis unavailable in Belajar, no verified contacts or schedules in Akses and Komunitas, and the emergency warning in Cerita. Design these as honest in-product states, not as broken screens.

### D. Success state
- Successful registration.
- Successful login.
- Successful data creation.
- Successful update.
- Successful deletion.
- Successful password reset.
- Successful logout.

Use meaningful confirmation feedback.

For Teman Sebaya, the success states are small and local: mood recorded, quiz result shown, explorer result shown, challenge progress updated, message sent.

### E. Validation state

Include:
- Required field missing.
- Invalid email format.
- Password too short.
- Incorrect password.
- Password mismatch.
- Invalid number or date.
- Unsupported file type, where applicable.
- File size exceeding limits, where applicable.

Show validation feedback next to the relevant field whenever practical.

Validation applies mainly to the client-requested auth shell (Login / Register / Forgot Password) and to the chat input (do not send an empty message; remind the user not to write sensitive personal information).

### F. Other relevant conditions

Also consider:
- Disabled buttons.
- Unauthorized roles.
- Duplicate submissions.
- Duplicate records.
- Session expiration.
- Permission denial.
- Offline access.
- Confirmation before leaving an unsaved form.
- Data conflicts, where applicable.

Do not create every possible state indiscriminately. Include states that are relevant to the product's functionality and user risks.

When a state materially changes the layout or interaction, create a separate wireframe frame, variant, or overlay. For minor feedback, document the state within the corresponding screen.

---

## 9. PHASE SEVEN — PROTOTYPE CONNECTIONS

Connect the generated wireframes into a navigable prototype whenever the tool supports prototyping.

Do not stop after generating the visual screens.

### Required prototype behavior

- Every primary CTA must work.
- Every secondary action must work.
- Every navigation menu item must work.
- Every relevant card and list item must lead to the correct destination.
- Forms must demonstrate validation and submission feedback.
- Dropdown menus must open and close.
- Modals must open, close, confirm, or cancel.
- Tabs must switch content.
- Back buttons must work.
- Authentication routes must be connected.
- Logout must return users to the appropriate entry screen.

For state changes that do not require navigation, use interactions, component variants, overlays, or other supported mechanisms.

### Flow organization

Organize the prototype into clearly identifiable flow groups:

1. Application Entry.
2. Onboarding.
3. Authentication.
4. Password Recovery.
5. Main Application.
6. Core Feature Workflows.
7. Profile Management.
8. Settings.
9. Logout.
10. Error and Recovery Scenarios.

For Teman Sebaya, the core feature workflow groups are: Mood Check-in, Teman Cerita (chat + escalation), Teman Belajar (article + quiz), Teman Tumbuh (explorer + challenges), Teman Komunitas (example cards + detail), Teman Akses (filter + pathways). Settings is not in the source; only include it if it is part of the Profile shell, kept minimal.

Create appropriate starting points for the major user journeys.

Use consistent frame names and identifiers so that screens can be located easily.

If your platform does not support clickable connections, provide explicit interaction annotations and a complete connection map instead. Never claim that a prototype is interactive when it is not.

---

## 10. PHASE EIGHT — COMPLETENESS AUDIT

Before considering the task complete, conduct a systematic UX audit.

Do not rely on visual appearance alone.

### A. Screen completeness audit
- Is every required screen present?
- Are all core features represented?
- Are all relevant user roles covered?
- Are authentication screens complete?
- Are detail screens present where needed?
- Are profile and settings screens covered?
- Are relevant overlays and dialogs included?

### B. Navigation audit
- Can users reach every required screen?
- Can users return to appropriate previous screens?
- Are all menus connected?
- Are there broken navigation destinations?
- Are any screens unreachable?
- Are there accidental dead ends?

### C. Interaction audit
- Does every interactive component have a defined behavior?
- Do forms have validation?
- Do buttons provide appropriate feedback?
- Do destructive operations have confirmation?
- Do search and filter controls behave logically?
- Do dropdowns and tabs work?
- Are disabled states clear?

### D. Authentication audit
- Can a new user register?
- Can an existing user log in?
- Can users recover forgotten passwords?
- Is verification handled when required?
- Does authentication route users correctly?
- Can users log out?
- Are protected screens inaccessible after logout?

### E. State audit
- Are loading states considered?
- Are empty states considered?
- Are error states considered?
- Are success states considered?
- Are relevant permission and session states considered?

### F. Consistency audit
- Are layouts consistent?
- Are labels and naming conventions consistent?
- Is navigation behavior consistent?
- Are components reused appropriately?
- Are screen dimensions consistent?
- Are data and content logically consistent?

### G. Flow integrity audit

Perform a simulated walkthrough of these scenarios:

**Scenario 1 — New User**
Application Launch → Splash → Onboarding (if applicable) → Register → Verification (if applicable) → Dashboard → Explore Features → Profile → Settings → Logout → Login.

**Scenario 2 — Returning User**
Application Launch → Splash → Login → Dashboard → Use Core Features → Logout.

**Scenario 3 — Password Recovery**
Login → Forgot Password → Submit Email → Verification → Reset Password → Success → Login.

**Scenario 4 — Data Management**
Dashboard → Feature List → Create New Record → Submit → Success → Detail → Edit → Save → Delete → Confirmation.

**Scenario 5 — Error Recovery**
Perform an invalid action → Display Error → Explain the Problem → Offer Recovery Action → Return to a Valid Flow.

Adjust these scenarios to match the actual application. Do not force irrelevant operations into the product.

For Teman Sebaya, adapt the walkthroughs to the real journeys:
- Scenario 1 — New User: Launch → Splash → Onboarding → Register → Beranda → record a mood → open Teman Cerita → open Teman Belajar → Profile → Logout → Login.
- Scenario 2 — Returning User: Launch → Splash → Login → Beranda → use a core module → Logout.
- Scenario 3 — Password Recovery: as written above.
- Scenario 4 — Core interaction loop (replaces generic data management): Beranda → Teman Belajar → read article → take quiz → view result → retry; Beranda → Teman Tumbuh → answer explorer → view result → check a challenge → counter updates → reset; Beranda → Teman Akses → pick a need in the filter → open a pathway → reveal next steps.
- Scenario 5 — Error / limit recovery: try to open a video in Belajar (unavailable state) → read the explanation; open Akses and find no verified contact → read the note and the safe next step; send an empty chat message → validation feedback; encounter the emergency warning in Cerita → safe guidance shown.

---

## 11. FINAL DELIVERABLES

The final result must contain:

**01. Product Structure**
- Product overview.
- User roles and permissions.
- Feature breakdown.
- Information architecture.
- Sitemap.

**02. User Flow Documentation**
- Complete user journey.
- Authentication flows.
- Core feature workflows.
- Alternative paths.
- Error and recovery paths.
- Logout flow.

**03. Screen Inventory**
- Unique screen IDs.
- Screen names.
- User roles.
- Screen objectives.
- Entry points.
- Actions.
- Destination mapping.

**04. Complete Wireframe**
- Every required screen.
- Detailed component layouts.
- Realistic sample content.
- Consistent component design.
- Relevant modal and system states.

**05. Interaction Mapping**
- Component interactions.
- Navigation connections.
- Form validation.
- Dialog behavior.
- Success and error feedback.
- Prototype links.

**06. Quality Assurance Report**
- Completed checklist.
- Missing or incomplete elements.
- Unresolved assumptions.
- Unsupported interactions.
- Recommended corrections.

The Quality Assurance Report must list as unresolved assumptions everything marked [...] in this prompt, including: profile content, quiz messages for scores 1–2 of 3, explorer results for untested combinations, EN copy for Cerita / Tumbuh / Komunitas / Akses, and all contact, schedule, and partner information (none verified). It must also state clearly which screens are client-requested additions (Splash, Onboarding, Login, Register, Forgot Password, Profile) rather than source content.

---

## 12. STRICT EXECUTION RULES

These rules must be followed throughout the task.

**RULE 1 — DO NOT STOP AT THE FIRST FEW SCREENS**

Creating Splash, Login, Register, and Dashboard does not mean the task is complete. Continue until every required screen and feature has been addressed.

**RULE 2 — DO NOT GENERATE DISCONNECTED MOCKUPS**

All screens must belong to a logical application structure and have defined entry points and destinations.

**RULE 3 — DO NOT IGNORE SECONDARY ACTIONS**

Buttons such as Edit, Delete, Cancel, Back, View Details, Save, Search, Filter, and Logout must be accounted for.

**RULE 4 — DO NOT LEAVE INCOMPLETE FLOWS**

Every important user journey must reach a valid outcome, a clear cancellation path, or a meaningful recovery state.

**RULE 5 — DO NOT INVENT FEATURES**

Completeness does not mean adding unnecessary functionality. Stay within the product scope.

**RULE 6 — DO NOT SACRIFICE FUNCTIONALITY FOR APPEARANCE**

A visually attractive screen with undefined interactions is not an acceptable result.

**RULE 7 — PRESERVE DESIGN CONSISTENCY**

Use a consistent design language, layout system, navigation structure, and reusable components.

**RULE 8 — VERIFY BEFORE FINISHING**

Run the completeness audit and correct identified gaps before declaring the result complete.

**RULE 9 — BE TRANSPARENT ABOUT LIMITATIONS**

If the tool cannot generate a particular screen, interaction, or prototype connection, document it explicitly. Do not pretend that an unimplemented feature works.

**RULE 10 — COMPLETE THE ACTUAL DESIGN TASK**

Analysis, sitemap, and user flow are preparation, not the final deliverable. After planning, proceed to generate the actual wireframes and connect the interactions.

If the work exceeds the tool's output or generation capacity, divide it into logically organized batches while preserving the original screen inventory, naming conventions, and flow connections. Continue from the last completed screen rather than silently omitting the remaining work.

---

## FINAL ACCEPTANCE CRITERIA

The task is considered complete only when:

- All required features have corresponding screens.
- All required screens are represented in the screen inventory.
- All primary and relevant secondary interactions are mapped.
- Authentication and account recovery are complete where applicable.
- Core user journeys can be followed from start to finish.
- Relevant system states have been designed.
- Navigation destinations are valid.
- Logout works as an endpoint of the authenticated journey.
- The completeness audit has no unresolved critical gaps.

**Final instruction: Think like a product designer responsible for the entire application, not an AI image generator responsible for producing a few attractive screens. Prioritize functional completeness, logical consistency, and a coherent end-to-end user experience.**
