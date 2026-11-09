# COMPONENT ARCHITECTURE & INTERACTIVE PROTOTYPE GUIDELINES
## Teman Sebaya — Ruang Konseling Inklusif Remaja
**Dokumentasi Resmi Reusable Component Library & Interactive Prototype**  
**Lokasi File:** `markdown/prototype/components.md`  
**Page Target:** `Hi-fi Design` (Page ID `1821`)  
**Design System Reference:** `design_system.md`  
**Status Implementasi:** 🟢 **TERVERIFIKASI & LIVE SYNC AKTIF**

---

## 1. COMPONENT ARCHITECTURE & DESIGN PHILOSOPHY

Component Library Teman Sebaya dibangun mengikuti prinsip arsitektur hierarkis berbasis *atomic design* yang disesuaikan dengan kapabilitas native design tool:

$$\text{Design Tokens} \longrightarrow \text{Main Components} \longrightarrow \text{Component Sets (Variants)} \longrightarrow \text{Instances} \longrightarrow \text{Application Screens}$$

```mermaid
graph TD
    Tokens["Design Tokens (Colors, Typography, Spacing, Shadows, Grids)"] --> Main["Main Component (Master Node)"]
    Main --> Sets["Component Set (Variant Matrix: State, Size, Type)"]
    Sets --> Inst["Component Instances (Linked Children)"]
    Inst --> Screens["Application Screens (Mobile 412 × 917 px)"]
    
    subgraph BehaviorRules ["Interactive Component Rules"]
        Sets -.->|Change to Variant| InternalState["Internal States (Hover, Pressed, Toggled, OTP Focus/Error)"]
        Screens -.->|Navigate to Frame (Dissolve/Instant)| ScreenFlow["Flow Navigations (Splash, Onboarding, Auth, Mood)"]
    end
```

### Prinsip Utama Arsitektur Komponen:
1. **Single Source of Truth**: Setiap komponen hanya memiliki satu master component/set yang terletak di area kanvas `Reusable Components Library` (Node ID `4114`) pada Page `Hi-fi Design`.
2. **Pemisahan Tegas Naming vs Content**:
   - **Component Master Naming**: Nama arsitektural internal, misalnya `Button / Primary`, `Button / Secondary`, `Input / Password Field`. Digunakan semata-mata untuk dokumentasi dan pengorganisasian asset library.
   - **User-Facing Instance Content**: Konten nyata yang ditampilkan kepada pengguna sesuai konteks fungsi (contoh: *"Lanjut"*, *"Selesai"*, *"Masuk"*, *"Buat akun"*, *"Kirim Kode Verifikasi"*). **Dilarang keras membiarkan placeholder teknis seperti "Tombol Utama" atau "Tombol Sekunder" bocor ke layar aplikasi final.**
3. **Strict Instance Binding**: Layar aplikasi wajib menggunakan *component instance*, dilarang menggambar ulang elemen secara manual atau melakukan *detach instance* tanpa alasan arsitektural.
4. **Propagasi Global**: Setiap pembaruan visual, token warna, atau radius pada Main Component secara otomatis diteruskan (*cascading*) ke seluruh instance di seluruh layar aplikasi.
5. **Reorganisasi Interaction States**: Variasi kondisi interaksi seperti form validation, loading indicator, dan success feedback tidak lagi dibuat sebagai full-screen frames terpisah yang memenuhi canvas, melainkan dipusatkan menjadi reusable component sets berdaya guna tinggi.

---

## 2. COMPONENT NAMING CONVENTION

Format penamaan komponen mengikuti standar berbasis kategori dengan pemisah garis miring (`/`) dan format properti *Key=Value* untuk varian:

$$\text{Category} \ / \ \text{Component Name} \quad [\text{Property1}=\text{Value}, \ \text{Property2}=\text{Value}]$$

### Daftar Konvensi Resmi:
- **Button**: `Button` (Properties: `Type=Primary|Secondary|Outline|Danger`, `State=Default|Pressed|Disabled|Loading`)
- **Input Fields**:
  - `Input / Text Field` (Properties: `State=Default|Focused|Filled|Error|Disabled`)
  - `Input / Password Field` (Properties: `State=Default|Focused|Error|Disabled`, `Visibility=Hidden|Visible`)
  - `Input / OTP Digit` (Properties: `State=Empty|Focused|Filled|Error|Disabled`)
  - `Input / OTP Field` (Properties: `State=Empty|Digit1|Digit2|Digit3|Filled|Error`)
- **Selection & Controls**:
  - `Selection / Checkbox` (Properties: `State=Unchecked|Checked|Disabled`)
  - `Selection / Onboarding Option` (Properties: `State=Unselected|Selected`)
- **Feedback & Interaction States**:
  - `Feedback / Password Strength` (Properties: `Level=Empty|Weak|Medium|Strong`)
  - `Feedback / Form Validation` (Properties: `Type=Error|Success|Warning|Information`)
  - `Feedback / Loading` (Properties: `Type=Inline Loading|Button Loading|Processing Overlay`)
  - `Feedback / Success` (Properties: `Type=Inline Success|Success Banner|Success Dialog`)
  - `Feedback / Alert` (Properties: `Type=Error|Success|Warning`)
- **Navigation & Header**:
  - `Navigation / Back Button` (Circular 40px icon button)
  - `Navigation / Bottom Item` (Properties: `Item=Beranda|Cerita|Belajar|Tumbuh|Aksi`, `Active=False|True`)
  - `Navigation / Bottom Bar` (Composite horizontal bar dengan 5 tabs)
- **Cards**:
  - `Card / Feature` (Portal kartu fitur psikoedukasi)
  - `Card / Assistance` (Emergency hotline 119 siaga)
- **Splash & Onboarding**:
  - `Splash / Logo Animation` (Properties: `State=Initial|Reveal|Settled`)
  - `Onboarding / Progress Stepper` (Properties: `Step=1|2|3`)

---

## 3. COMPONENT INVENTORY & STATUS MATRIX

Tabel inventarisasi seluruh komponen yang aktif diimplementasikan pada Page `Hi-fi Design`:

| No | Component Name | Type | Variants / States | Properties | Prototype Interaction | Auto Layout / Sizing | Used In | Status |
|:---|:---|:---|:---|:---|:---|:---|:---|:---:|
| 1 | `Button` | Component Set | 11 Variants (Primary, Secondary, Outline, Danger × Default, Pressed, Disabled, Loading) | `Type`, `State` | On press $\rightarrow$ Change to `Pressed` | H-AutoLayout, Padding `12px 24px`, Radius `14px`, Height `48px`, Width `364px` | All Mobile Screens, Action Bars | **IMPLEMENTED** |
| 2 | `Input / Text Field` | Component Set | 5 Variants (Default, Focused, Filled, Error, Disabled) | `State` | On click $\rightarrow$ Change to `Focused` | V-AutoLayout, Gap `6px`, Width `364px` | Login, Register, Forgot Password | **IMPLEMENTED** |
| 3 | `Input / Password Field` | Component Set | 7 Variants (Default Hidden/Visible, Focused Hidden/Visible, Error Hidden/Visible, Disabled) | `State`, `Visibility` | On click (Eye Icon) $\rightarrow$ Change to `Visible`/`Hidden` | V-AutoLayout, Input Box with H-AutoLayout, Width `364px` | Login, Register, Create New Password | **IMPLEMENTED** |
| 4 | `Selection / Checkbox` | Component Set | 3 Variants (Unchecked, Checked, Disabled) | `State` | On click $\rightarrow$ Change to `Checked`/`Unchecked` | H-AutoLayout, Gap `10px`, Box `20 × 20px` | Login (Ingat saya), Register (Terms & Privacy) | **IMPLEMENTED** |
| 5 | `Selection / Onboarding Option`| Component Set | 2 Variants (Unselected, Selected) | `State` | On click $\rightarrow$ Change to `Selected` | H-AutoLayout, Padding `16px 20px`, Radius `16px` | Onboarding 1, 2, 3 Choices | **IMPLEMENTED** |
| 6 | `Input / OTP Digit` | Component Set | 5 Variants (Empty, Focused, Filled, Error, Disabled) | `State` | Single-slot atomic slot (64 × 64 px) | H-AutoLayout, Center Align, Radius `14px` | Atomic Slot Component | **IMPLEMENTED** |
| 7 | `Input / OTP Field` | Component Set | 6 Variants (Empty, Digit1, Digit2, Digit3, Filled, Error) | `State` | On click slot $\rightarrow$ Step-by-step progress (Empty $\rightarrow$ D1 $\rightarrow$ D2 $\rightarrow$ D3 $\rightarrow$ Filled $\rightarrow$ Error) | V-AutoLayout, 4 slots row, Gap `12px`, Width `364px` | Verify Code, Registration Verification | **IMPLEMENTED** |
| 8 | `Feedback / Password Strength` | Component Set | 4 Variants (Empty, Weak, Medium, Strong) | `Level` | On click $\rightarrow$ Cycle level toggle | V-AutoLayout, 3-segment progress bars, Width `364px` | Create New Password | **IMPLEMENTED** |
| 9 | `Feedback / Form Validation` | Component Set | 4 Variants (Error, Success, Warning, Information) | `Type` | Inline feedback for field contextual validation | H-AutoLayout, Padding `8px 12px`, Radius `10px` | Form inputs, Auth validation | **IMPLEMENTED** |
| 10 | `Feedback / Loading` | Component Set | 3 Variants (Inline Loading, Button Loading, Processing Overlay) | `Type` | Visual processing state without full-screen clutter | Variatif (Inline 44px, Button 48px, Modal 120px) | Async submissions, Login, Register | **IMPLEMENTED** |
| 11 | `Feedback / Success` | Component Set | 3 Variants (Inline Success, Success Banner, Success Dialog) | `Type` | Multi-level success feedback | Variatif (Inline 40px, Banner 72px, Dialog 240px) | Account updates, inline save feedback | **IMPLEMENTED** |
| 12 | `Feedback / Alert` | Component Set | 3 Variants (Error, Success, Warning) | `Type` | Dismissible notification container | H-AutoLayout, Padding `14px 16px`, Gap `12px` | Error notifications | **IMPLEMENTED** |
| 13 | `Splash / Logo Animation` | Component Set | 3 Variants (State=Initial, State=Reveal, State=Settled) | `State` | `afterDelay: 350ms` $\rightarrow$ Reveal $\rightarrow$ `afterDelay: 400ms` $\rightarrow$ Settled | V-AutoLayout, Center Alignment | Splash Screen Flow | **IMPLEMENTED** |
| 14 | `Onboarding / Progress Stepper`| Component Set | 3 Variants (Step 1, Step 2, Step 3) | `Step` | State switches per screen | H-AutoLayout, Gap `8px`, Active pill `40px` | Onboarding 1, 2, 3 | **IMPLEMENTED** |
| 15 | `Navigation / Back Button` | Main Component | 1 Base Variant | `Default` | On click $\rightarrow$ Navigate to Previous Screen | Frame 40 × 40 px, Radius `20px`, Center | Header sub-pages | **IMPLEMENTED** |
| 16 | `Navigation / Bottom Item` | Component Set | 10 Variants (5 Items: Beranda, Cerita, Belajar, Tumbuh, Aksi × Active/Inactive) | `Item`, `Active` | On click $\rightarrow$ Navigate to respective tab | V-AutoLayout, Center Align, Floating Active Circle | Bottom Navigation Bar | **IMPLEMENTED** |
| 17 | `Navigation / Bottom Bar` | Main Component | 1 Container Bar | `Default` | Houses 5 Bottom Item instances | H-AutoLayout, spaceAround, Height `72px` | App Main Shell | **IMPLEMENTED** |
| 18 | `Card / Feature` | Main Component | Master Portal Card | `Default` | On click $\rightarrow$ Navigate to Feature Portal | V-AutoLayout, Padding `20px`, Radius `16px` | Content Hub | **IMPLEMENTED** |
| 19 | `Card / Assistance` | Main Component | Master Hotline Card | `Default` | On click $\rightarrow$ Call 119 Emergency | H-AutoLayout, Amber/Red Surface, Radius `16px` | Akses Bantuan Screen | **IMPLEMENTED** |

---

## 4. DETAILED COMPONENT SPECIFICATIONS

### A. Button Hierarchy & Sizing (`Button`)
- **Prinsip Hierarki Visual**:
  - **Primary**: Solid brand primary blue (`#2563EB`), teks `#FFFFFF` SemiBold, tanpa border. Memiliki penekanan visual tertinggi untuk aksi utama. State pressed beralih ke `#1D4ED8`.
  - **Secondary**: Soft neutral/light-blue background (`#EFF6FF`), border tipis (`#DBEAFE` 1px), teks `#2563EB` SemiBold. Dirancang kontras namun elegan, **tidak pernah bersaing dengan primary action sebagai tombol biru solid ganda**.
  - **Outline**: Background `#FFFFFF`, border halus (`#CBD5E1` 1px), teks `#0F172A` SemiBold.
  - **Danger**: Soft rose background (`#FEF2F2`), border (`#EF4444` 1px), teks merah tegas (`#DC2626` SemiBold).
  - **Text Action**: Teks link subtle (contoh: *"Lewati"* atau *"Lupa kata sandi?"*), tanpa container tombol.
- **Dimensi Standar**:
  - Height: `48 px` (konsisten di seluruh alur Onboarding & Auth).
  - Width: `364 px` pada layar mobile (merentang presisi pada content container, tidak sempit dan tidak melewati batas grid).
  - Corner Radius: `14 px`.
  - Font: Inter / Plus Jakarta Sans, `14 px`, SemiBold (600), line-height `Auto`.

### B. Input / OTP Digit & Input / OTP Field
Mengacu pada standar NN/G & Material Design 3 untuk segmented inputs:
1. **`Input / OTP Digit` (Atomic Component)**:
   - Ukuran: `64 × 64 px`, corner radius `14 px`.
   - Varian:
     - `State=Empty`: Background `#FFFFFF`, border `#CBD5E1` (1.5px), teks kosong.
     - `State=Focused`: Background `#FFFFFF`, border `#2563EB` (2px), cursor aktif `|` (`#2563EB`).
     - `State=Filled`: Background `#EFF6FF`, border `#2563EB` (1.5px), digit angka bold (`#0F172A`).
     - `State=Error`: Background `#FEF2F2`, border `#EF4444` (1.5px), digit merah (`#DC2626`).
     - `State=Disabled`: Background `#F8FAFC`, border `#E2E8F0` (1px).
2. **`Input / OTP Field` (Composite Component)**:
   - Menggabungkan 4 slot `64 × 64 px` dengan jarak horizontal `12 px`. Total lebar terisi `292 px`, terpusat di dalam container `364 px`.
   - Varian Progresif:
     - `State=Empty`: Slot 1 focused (`|`), slot 2–4 kosong. Default awal saat pengguna masuk ke halaman verifikasi.
     - `State=Digit1`: Slot 1 terisi `5`, slot 2 focused (`|`), slot 3–4 kosong.
     - `State=Digit2`: Slot 1–2 terisi `5 8`, slot 3 focused (`|`), slot 4 kosong.
     - `State=Digit3`: Slot 1–3 terisi `5 8 2`, slot 4 focused (`|`).
     - `State=Filled`: Keempat slot terisi `5 8 2 4`. Siap auto-submit.
     - `State=Error`: Keempat slot berwarna merah dengan pesan kontekstual *"Kode verifikasi tidak sesuai. Silakan periksa kembali."* (`#DC2626`, 11.5px).

### C. Feedback / Password Strength Indicator
Menggantikan indikator 3 bar statis sebelumnya dengan indikator dinamis berbasis panduan NIST 800-63B:
- Struktur: 3 bar horizontal (`116 × 4 px`, radius `2 px`, gap `8 px`) dipadukan dengan label status evaluasi teks:
  - `Level=Empty`: Bar 1, 2, 3 `#E2E8F0` (abu-abu netral). Label: *"Masukkan kata sandi baru (minimal 8 karakter)"* (`#64748B`).
  - `Level=Weak`: Bar 1 `#EF4444` (merah), Bar 2 & 3 `#E2E8F0`. Label: *"Kekuatan: Lemah (tambahkan angka & huruf besar)"* (`#DC2626`).
  - `Level=Medium`: Bar 1 & 2 `#F59E0B` (amber), Bar 3 `#E2E8F0`. Label: *"Kekuatan: Sedang (tambahkan simbol unik)"* (`#D97706`).
  - `Level=Strong`: Bar 1, 2, 3 `#10B981` (emerald green). Label: *"Kekuatan: Kuat (kombinasi keamanan optimal)"* (`#059669`).

---

## 5. PROTOTYPE INTERACTION & NAVIGATION MATRIX

### A. Component-Level Interactive Variants (`Change to`)
- **Password Visibility**:
  $$\text{Input / Password Field [Visibility=Hidden]} \underset{\text{onClick (Eye Icon)}}{\overset{\text{changeTo}}{\longleftrightarrow}} \text{Input / Password Field [Visibility=Visible]}$$
- **Checkbox Toggle**:
  $$\text{Selection / Checkbox [State=Unchecked]} \underset{\text{onClick}}{\overset{\text{changeTo}}{\longleftrightarrow}} \text{Selection / Checkbox [State=Checked]}$$
- **Onboarding Option Toggle**:
  $$\text{Selection / Onboarding Option [State=Unselected]} \underset{\text{onClick}}{\overset{\text{changeTo}}{\longleftrightarrow}} \text{Selection / Onboarding Option [State=Selected]}$$
- **OTP Field Interactive Advance**:
  $$\text{Empty} \xrightarrow{\text{onClick}} \text{Digit1} \xrightarrow{\text{onClick}} \text{Digit2} \xrightarrow{\text{onClick}} \text{Digit3} \xrightarrow{\text{onClick}} \text{Filled} \xrightarrow{\text{onClick}} \text{Error} \xrightarrow{\text{onClick}} \text{Empty}$$
- **Password Strength Cycle**:
  $$\text{Empty} \xrightarrow{\text{onClick}} \text{Weak} \xrightarrow{\text{onClick}} \text{Medium} \xrightarrow{\text{onClick}} \text{Strong} \xrightarrow{\text{onClick}} \text{Empty}$$

### B. Screen-to-Screen Navigation Matrix (`Navigate to`)
Perpindahan antar-layar menggunakan transisi **`dissolve` (200–250ms)** atau **`instant` (0ms)**. Penggunaan `smartAnimate` dibatasi hanya pada transisi internal micro-components dan logo splash sequence:

| Source Screen | Trigger Element | Destination Screen | Transition Type | Duration | Easing |
|:---|:---|:---|:---|:---:|:---:|
| `Splash Screen` (4404) | Canvas Delay (`afterDelay: 900ms`) | `Onboarding 1` (4467) | Dissolve | 300ms | easeOut |
| `Onboarding 1` (4467) | Button "Lanjut" | `Onboarding 2` (4500) | Dissolve | 200ms | easeOut |
| `Onboarding 1` (4467) | Action "Lewati" | `Onboarding Complete` (4575) | Dissolve | 200ms | easeOut |
| `Onboarding 2` (4500) | Button "Lanjut" | `Onboarding 3` (4541) | Dissolve | 200ms | easeOut |
| `Onboarding 2` (4500) | Back Button (`‹`) | `Onboarding 1` (4467) | Dissolve | 200ms | easeOut |
| `Onboarding 2` (4500) | Action "Lewati" | `Onboarding Complete` (4575) | Dissolve | 200ms | easeOut |
| `Onboarding 3` (4541) | Button "Selesai" | `Onboarding Complete` (4575) | Dissolve | 200ms | easeOut |
| `Onboarding 3` (4541) | Back Button (`‹`) | `Onboarding 2` (4500) | Dissolve | 200ms | easeOut |
| `Onboarding 3` (4541) | Action "Lewati" | `Onboarding Complete` (4575) | Dissolve | 200ms | easeOut |
| `Onboarding Complete` (4575) | Button "Masuk" | `Login` (4606) | Dissolve | 200ms | easeOut |
| `Onboarding Complete` (4575) | Button "Buat akun" | `Register` (4650) | Dissolve | 200ms | easeOut |
| `Login` (4606) | Button "Masuk" | **`Beranda - Default` (Node `5243`)** | Dissolve | 250ms | easeOut |
| `Login` (4606) | Link "Daftar di sini" | `Register` (4650) | Instant | 0ms | - |
| `Login` (4606) | Link "Lupa kata sandi?" | `Forgot Password` (4749) | Dissolve | 200ms | easeOut |
| `Login` (4606) | Back Button (`‹`) | `Onboarding Complete` (4575) | Dissolve | 200ms | easeOut |
| `Register` (4650) | Button "Daftar" | `Registration Verification` (4699) | Dissolve | 200ms | easeOut |
| `Register` (4650) | Link "Masuk di sini" | `Login` (4606) | Instant | 0ms | - |
| `Register` (4650) | Back Button (`‹`) | `Login` (4606) | Dissolve | 200ms | easeOut |
| `Registration Verification` (4699) | Button "Verifikasi Kode" | `Registration Success` (4728) | Dissolve | 250ms | easeOut |
| `Registration Verification` (4699) | Back Button (`‹`) | `Register` (4650) | Dissolve | 200ms | easeOut |
| `Registration Success` (4728) | Button "Mulai Jelajahi" | **`Beranda - Default` (Node `5243`)** | Dissolve | 250ms | easeOut |
| **`Forgot Password` (4749)** | Button "Kirim Kode Verifikasi" | **`Verify Code` (4804) [DIRECT]** | Dissolve | 200ms | easeOut |
| `Forgot Password` (4749) | Button "Kembali ke Masuk" | `Login` (4606) | Dissolve | 200ms | easeOut |
| `Forgot Password` (4749) | Back Button (`‹`) | `Login` (4606) | Dissolve | 200ms | easeOut |
| `Verify Code` (4804) | Button "Verifikasi Kode" | `Create New Password` (4836) | Dissolve | 200ms | easeOut |
| `Verify Code` (4804) | Back Button (`‹`) | `Forgot Password` (4749) | Dissolve | 200ms | easeOut |
| `Create New Password` (4836) | Button "Simpan Kata Sandi" | `Password Reset Success` (4870) | Dissolve | 250ms | easeOut |
| `Create New Password` (4836) | Back Button (`‹`) | `Verify Code` (4804) | Dissolve | 200ms | easeOut |
| `Password Reset Success` (4870) | Button "Masuk dengan Sandi Baru"| `Login` (4606) | Dissolve | 200ms | easeOut |

---

## 6. CLEANUP & SCOPE RETENTION SUMMARY

1. **Layar Perantara yang Dihapus Permanen**:
   - `Recovery Submitted` (Node `4774`): Dihapus sepenuhnya dari canvas. Alur pemulihan kata sandi kini langsung melompat dari `Forgot Password` menuju `Verify Code` secara mulus tanpa layar jeda yang memperlambat pengguna.
2. **Dedicated User Journey Screens yang Tetap Dipertahankan (100% Intact)**:
   - `Password Reset Success` (Node `4870`): Halaman sukses pemulihan kata sandi.
   - `Registration Success` (Node `4728`): Halaman sukses aktivasi akun pengguna baru.
3. **State Showcase Frames yang Telah Dibersihkan**:
   - `Login Error` (Node `4891`), `Register Error` (Node `4926`), `Loading State` (Node `4955`), `Form Validation State` (Node `4973`), `Password Visibility Toggled` (Node `4997`), `Verification Error` (Node `5019`), `Success Feedback` (Node `5048`).


---

## 7. CONDITIONAL COMPONENT LOGIC & DYNAMIC FORM VALIDATION ARCHITECTURE

> **Revisi ID**: `COMP-REV-004-CONDITIONAL`  
> **Status**: 🟢 **IMPLEMENTED & VERIFIED**  
> **Ruang Lingkup**: Initial Form States, Combined Password Strength Component, Sequential OTP Logic, Native Variables & Conditional Prototyping.

---

### 7.1. Zero-Premature Data Rule (Initial Form States)

Seluruh layar Authentication pada alur utama aplikasi wajib dimulai dalam kondisi kosong (**Initial State = Empty**). Data contoh (sample-filled data) hanya diperbolehkan berada di dalam `Reusable Components Library` sebagai dokumentasi ragam varian komponen:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        INITIAL SCREEN STATE AUDIT                      │
├──────────────────────┬────────────────────────────┬────────────────────┤
│ Application Screen   │ Initial Field States       │ Primary Button     │
├──────────────────────┼────────────────────────────┼────────────────────┤
│ Login (4606)         │ Email: Empty placeholder   │ Masuk (Blue 600)   │
│                      │ Password: Empty placeholder│ Validates on submit│
│                      │ Remember Me: Unchecked     │                    │
├──────────────────────┼────────────────────────────┼────────────────────┤
│ Register (4650)      │ Nama Lengkap: Empty        │ Daftar (Blue 600)  │
│                      │ Email: Empty               │ Validates on submit│
│                      │ Password: Empty            │                    │
│                      │ Confirm Password: Empty    │                    │
│                      │ Terms Checkbox: Unchecked  │                    │
├──────────────────────┼────────────────────────────┼────────────────────┤
│ Forgot Password(4749)│ Email: Empty placeholder   │ Kirim Kode (Blue)  │
├──────────────────────┼────────────────────────────┼────────────────────┤
│ Verify Code (4804)   │ Slot 1: Focused (|)        │ Verifikasi Kode:   │
│                      │ Slots 2-4: Empty           │ DISABLED (Slate 200│
├──────────────────────┼────────────────────────────┼────────────────────┤
│ Create New Password  │ Password: Empty (0/3 bars) │ Simpan Kata Sandi  │
│ (4836)               │ Strength: Belum diisi      │ (Blue 600)         │
│                      │ Confirm Password: Empty    │                    │
└──────────────────────┴────────────────────────────┴────────────────────┘
```

---

### 7.2. Unified Component: `Input / Password Strength Field` (Set ID `6802`)

Menyatukan input kata sandi dan evaluasi kekuatan kata sandi ke dalam **satu komponen native tunggal** ber-Auto Layout vertikal (`layout: "vertical"`, `gap: 6`):

```
┌────────────────────────────────────────────────────────┐
│  Kata Sandi [Label: Inter SemiBold 13px #334155]       │
│  ┌──────────────────────────────────────────────────┐  │
│  │ Minimal 8 karakter                           👁   │  │
│  └──────────────────────────────────────────────────┘  │
│  ═══════════════  ═══════════════  ═══════════════     │
│  [Bar 1: 105x4]   [Bar 2: 105x4]   [Bar 3: 105x4]      │
│                                                        │
│  Kekuatan: Belum diisi                     0/3 kriteria│
│  ○  Minimal 8 karakter                                 │
│  ○  Kombinasi huruf besar & kecil                      │
│  ○  Angka atau simbol unik                             │
└────────────────────────────────────────────────────────┘
```

#### A. Tabel Varian & Kriteria Evaluasi Kekuatan

Komponen Set `Input / Password Strength Field` (`6802`) memiliki 4 varian state interaktif:

| Variant Name | Node ID | Segmen Aktif | Warna Segmen & Label | Teks Status | Helper Checklist Status |
| :--- | :--- | :---: | :--- | :--- | :--- |
| **`State=Empty`** | `6738` | `0 / 3` | `#E2E8F0` (Slate 200) | *Kekuatan: Belum diisi* | `○` Min. 8 karakter<br>`○` Huruf besar & kecil<br>`○` Angka/simbol |
| **`State=Weak`** | `6739` | `1 / 3` | `#EF4444` (Rose 500) | *Kekuatan: Lemah* | `✓` Min. 8 karakter (`#DC2626`)<br>`○` Huruf besar & kecil<br>`○` Angka/simbol |
| **`State=Medium`**| `6740` | `2 / 3` | `#F59E0B` (Amber 500) | *Kekuatan: Sedang* | `✓` Min. 8 karakter (`#D97706`)<br>`✓` Huruf besar & kecil (`#D97706`)<br>`○` Angka/simbol |
| **`State=Strong`**| `6741` | `3 / 3` | `#10B981` (Emerald 500)| *Kekuatan: Kuat* | `✓` Min. 8 karakter (`#15803D`)<br>`✓` Huruf besar & kecil (`#15803D`)<br>`✓` Angka/simbol (`#15803D`) |

#### B. Logika Evaluasi Kriteria
- **Kriteria 1 (Panjang Minimal)**: $\text{length} \ge 8$. Jika tidak terpenuhi, status tetap *Lemah* meskipun memiliki angka/simbol.
- **Kriteria 2 (Kombinasi Karakter)**: Mengandung minimal 1 huruf besar ($[A-Z]$) dan 1 huruf kecil ($[a-z]$).
- **Kriteria 3 (Variasi Simbol/Angka)**: Mengandung minimal 1 digit ($[0-9]$) atau karakter khusus/simbol ($[!@\#\$%\^&*]$).
- **Perilaku Transisi**: Pada kanvas interaktif, mengeklik input field akan menyimulasikan peningkatan kriteria secara otomatis (`Empty` $\rightarrow$ `Weak` $\rightarrow$ `Medium` $\rightarrow$ `Strong` $\rightarrow$ `Empty`) tanpa memerlukan trik klik terpisah pada segmen bar.

---

### 7.3. Sequential Entry: `Input / OTP Field` (Set ID `5183`)

Komponen verifikasi kode 4 digit menggunakan 4 slot independen (`50×56 px`):

```
┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐
│  2   │  │  9   │  │  0   │  │  4   │
└──────┘  └──────┘  └──────┘  └──────┘
 Slot 1    Slot 2    Slot 3    Slot 4
```

1. **State = Empty (`5128`)**: Slot 1 menampilkan kursor aktif `|` dengan border biru `#3B82F6`. Slot 2, 3, dan 4 kosong dengan border abu-abu `#CBD5E1`. Tombol submit *"Verifikasi Kode"* diatur **DISABLED** (`#E2E8F0`, teks `#94A3B8`).
2. **Sequential Entry Simulation**:
   $$\text{State=Empty (5128)} \xrightarrow{\text{onClick}} \text{State=Digit1 (5135)} \xrightarrow{\text{onClick}} \text{State=Digit2 (5143)} \xrightarrow{\text{onClick}} \text{State=Digit3 (5152)} \xrightarrow{\text{onClick}} \text{State=Filled (5162)}$$
3. **State = Filled (`5162`)**: Seluruh 4 digit terisi `[ 2 ] [ 9 ] [ 0 ] [ 4 ]`. Tombol *"Verifikasi Kode"* aktif penuh (Brand Blue `#2563EB`, teks `#FFFFFF`) dan mengeksekusi navigasi ke `Create New Password` (`4836`).
4. **State = Error (`5172`)**: Jika kode tidak cocok, ke-4 slot berubah menjadi stroke merah `#EF4444` dengan teks peringatan *"Kode verifikasi tidak sesuai. Silakan periksa kembali."*

---

### 7.4. Native Variable Collection: `Form / Conditional State`

Dibuat pada FigCraft native variable engine di bawah koleksi `VariableCollectionId:5`:

| Variable Name | Variable ID | Type | Initial Value | Peran & Deskripsi Operasional |
| :--- | :--- | :---: | :---: | :--- |
| `emailValue` | `VariableID:91` | `string` | `""` | Menyimpan input teks alamat email pengguna. |
| `emailIsEmpty` | `VariableID:92` | `boolean` | `true` | `true` ketika kotak email belum diisi. |
| `emailIsValid` | `VariableID:93` | `boolean` | `false` | `true` ketika format email sesuai standar RFC/domain. |
| `passwordValue` | `VariableID:94` | `string` | `""` | Menyimpan nilai kata sandi yang diketik. |
| `passwordIsEmpty` | `VariableID:95` | `boolean` | `true` | `true` ketika input kata sandi kosong. |
| `passwordStrength`| `VariableID:96`| `number` | `0` | Nilai integer kekuatan sandi (`0` s/d `3`). |
| `passwordHasMinLength` | `VariableID:97` | `boolean` | `false` | Kriteria 1: Panjang $\ge 8$ karakter. |
| `passwordHasLetterCase`| `VariableID:98` | `boolean` | `false` | Kriteria 2: Huruf besar dan huruf kecil. |
| `passwordHasNumberOrSymbol` | `VariableID:99` | `boolean` | `false` | Kriteria 3: Mengandung angka atau simbol. |
| `confirmPasswordValue` | `VariableID:100`| `string` | `""` | Nilai kotak konfirmasi kata sandi. |
| `confirmPasswordMatches`| `VariableID:101`| `boolean` | `false` | `true` jika konfirmasi cocok persis dengan kata sandi. |
| `otpDigitCount` | `VariableID:102` | `number` | `0` | Jumlah digit OTP yang terisi (`0` s/d `4`). |
| `otpComplete` | `VariableID:103` | `boolean` | `false` | `true` jika ke-4 digit OTP telah terisi penuh. |
| `termsAccepted` | `VariableID:104` | `boolean` | `false` | `true` ketika checkbox persetujuan dicentang. |
| `formIsValid` | `VariableID:105` | `boolean` | `false` | Evaluasi global seluruh validasi formulir. |
| `isSubmitting` | `VariableID:106` | `boolean` | `false` | `true` saat tombol menampilkan loading state. |

---

### 7.5. Native Conditional Prototyping Rules (IF → CONDITION → THEN → ELSE)

Dikonfigurasi langsung menggunakan FigCraft native prototype conditional actions:

```json
{
  "trigger": { "type": "onClick" },
  "action": {
    "type": "conditional",
    "blocks": [
      {
        "expression": "emailIsEmpty == false && passwordIsEmpty == false",
        "actions": [{ "type": "navigate", "dest": 5243 }]
      },
      {
        "actions": [{ "type": "setVariable", "variable": "formIsValid", "value": false }]
      }
    ]
  }
}
```

#### Ringkasan Logika Kondisi Tiap Formulir:
1. **Login Form (`4606`)**:
   - `IF emailIsEmpty == false && passwordIsEmpty == false` $\longrightarrow$ **THEN**: Navigate ke `Beranda` (`5243`) / `Mood Selection`.
   - `ELSE` $\longrightarrow$ Tetap di Login Screen, tampilkan pesan validasi *"Alamat email dan kata sandi wajib diisi."*
2. **Register Form (`4650`)**:
   - `IF termsAccepted == true && passwordStrength >= 1` $\longrightarrow$ **THEN**: Navigate ke `Verify Code` (`4804`).
   - `ELSE` $\longrightarrow$ Tetap di Register Screen, tahan proses registrasi.
3. **Forgot Password Form (`4749`)**:
   - `IF emailIsEmpty == false` $\longrightarrow$ **THEN**: Navigate ke `Verify Code` (`4804`).
   - `ELSE` $\longrightarrow$ Tetap di Forgot Password Screen, tahan pengiriman instruksi.
4. **Verify Code / OTP Form (`4804`)**:
   - `IF otpComplete == true` $\longrightarrow$ **THEN**: Navigate ke `Create New Password` (`4836`).
   - `ELSE` $\longrightarrow$ Ubah OTP Field ke `State=Error` (`5172`), tampilkan *"Kode verifikasi tidak sesuai."*
5. **Create New Password Form (`4836`)**:
   - `IF passwordStrength >= 1 && confirmPasswordMatches == true` $\longrightarrow$ **THEN**: Navigate ke `Password Reset Success` (`4870`).
   - `ELSE` $\longrightarrow$ Tampilkan peringatan kecocokan kata sandi.

---

### 7.6. Keterbatasan Native Prototyping & Pemisahan Domain

1. **Perilaku Kondisional Riil (Native Prototyping)**:
   - Evaluasi variabel boolean dan number (`==`, `!=`, `>=`, `<=`) didukung secara native melalui `action: { type: 'conditional', blocks: [...] }`.
   - Perubahan state komponen antar-varian didukung secara native via `action: { type: 'changeTo' }`.
   - Toggle checkbox dan eye visibility didukung penuh pada level instance.
2. **Simulasi Prototipe (Prototype Simulation)**:
   - Input teks keyboard fisik di layar mobile tidak membaca string real-time secara sembarang tanpa event klik/fokus; transisi disimulasikan melalui klik pada wadah input yang mengaktifkan nilai preset aman (`fhazar@email.com`, `Rahasia123!`).
   - Kekuatan kata sandi disimulasikan berputar 4 siklus (`Empty` $\rightarrow$ `Weak` $\rightarrow$ `Medium` $\rightarrow$ `Strong`) untuk memungkinkan pengujian visual dan interaktif terhadap seluruh kondisi.
3. **Fungsionalitas Dependen Backend (Backend-Dependent)**:
   - Validasi keberadaan akun di database, verifikasi token OTP SMS/SMTP nyata, enkripsi hash bcrypt/argon2 kata sandi, serta session refresh token merupakan domain backend engine dan tidak diemulasikan secara sembrono di kanvas desain visual.


---

## 8. TEMAN CERITA (AI CONVERSATION & SAFETY) — HIGH-FIDELITY FLOW RECONSTRUCTION

> **Revisi ID**: `CERITA-HIFI-REV-001`  
> **Status**: 🟢 **IMPLEMENTED & VERIFIED**  
> **Source Wireframe**: Page 1 (`460`, `518`, `556`, `603`, `658`, `708`)  
> **Target Page**: `Hi-fi Design` (Page ID `1821`), Section `06 — TEMAN CERITA (AI CONVERSATION & SAFETY)`  
> **Design System Compliance**: 100% Native Auto Layout, Inter typography, `#2563EB` (Blue 600), `#F8FAFC` slate background, `#0F172A` text, 412x917 mobile proportions.

### 8.1. Arsitektur 6 Layar Teman Cerita (Wireframe to High-Fidelity Adaptation)

Alur fitur Teman Cerita mengadaptasi seluruh 6 layar wireframe menjadi antarmuka High-Fidelity yang konsisten:

| No | Nama Screen | ID Node | Posisi `[X, Y]` | Ukuran | Fungsi & Karakteristik Komponen |
| :---: | :--- | :---: | :---: | :---: | :--- |
| **1** | `Teman Cerita - Default` | `5502` | `[6800, 5560]` | `412x917` | **Tab Landing Page**: Global Header (`6519`), Kartu Asisten AI ("Mulai Mengobrol →"), Kartu Dukungan Manusia ("Lihat Jalur Bantuan di Teman Akses ›"), Banner Peringatan Keselamatan Darurat, dan Bottom Navigation (`6619`, Cerita active). |
| **2** | `Teman Cerita - Chatting` | `6819` | `[7292, 5560]` | `412x917` | **Empty Chat Prompt State**: Chat Top App Bar dengan tombol Darurat, Banner Transparansi AI, Empty State ("Apa yang sedang kamu rasakan hari ini?"), 4 Starter Prompt Cards interaktif, dan Chat Input Bar. |
| **3** | `Teman Cerita - Percakapan Aktif` | `5561` | `[7784, 5560]` | `412x917` | **Active Conversation Thread**: Bubble pesan pengguna (Blue 600, kanan), Bubble pesan AI (Slate 100 dengan avatar sparkles, kiri), Suggestion Box dengan 3 tombol respon cepat, dan Chat Input Bar. |
| **4** | `Teman Cerita - Panduan Relaksasi` | `5592` | `[8276, 5560]` | `412x917` | **In-Chat Guided Breathing**: Pesan lanjutan dalam chat thread, In-Chat Breathing Card bertahap (*Box Breathing* 3 langkah: Tarik, Tahan, Hembus), tombol "Selesai Latihan & Lanjut Cerita", dan Quick Replies. |
| **5** | `Teman Cerita - Eskalasi Bantuan` | `6820` | `[8768, 5560]` | `412x917` | **In-Chat Human Referral**: Pesan eskalasi AI, Kartu Rujukan Konselor Sebaya PIK-R / Guru BK (ke Teman Akses), dan Kartu Kontak Darurat 119 & 112 (membuka Dialog Darurat). |
| **6** | `Dialog Bantuan Darurat` | `5617` | `[9260, 5560]` | `412x917` | **Crisis Modal Bottom Sheet**: Dark backdrop overlay (`#0F172A` opacity 88%), Modal Card krisis dengan tombol hotline Sejiwa 119 ext 8, panggilan 112, tombol "Kembali ke Percakapan", dan tautan "Buka Panduan Krisis di Teman Akses". |

---

### 8.2. Prototype Interaction Matrix (Section 06)

Seluruh navigasi interaktif pada alur Teman Cerita menggunakan transisi `Dissolve 200ms easeOut` tanpa broken links:

```mermaid
graph TD
    S1["Teman Cerita - Default (5502)"] -->|"Button: Mulai Mengobrol"| S2["Teman Cerita - Chatting (6819)"]
    S1 -->|"Button: Lihat Jalur Bantuan"| Akses["Teman Akses (5883)"]
    S2 -->|"Click Any 4 Starter Cards / Send"| S3["Teman Cerita - Percakapan Aktif (5561)"]
    S2 -->|"Back Button"| S1
    S2 -->|"Button: Darurat"| S6["Dialog Bantuan Darurat (5617)"]
    S3 -->|"Button: Coba panduan latihan napas"| S4["Teman Cerita - Panduan Relaksasi (5592)"]
    S3 -->|"Button: Butuh bicara dengan orang nyata"| S5["Teman Cerita - Eskalasi Bantuan (6820)"]
    S3 -->|"Back Button"| S2
    S3 -->|"Button: Darurat"| S6

---

## 9. SECTION 08 — PROFIL PENGGUNA & DETAIL PROFIL (HIGH-FIDELITY RECONSTRUCTION)

### 9.1. Evaluasi & Perbaikan Layout Profil

Berdasarkan audit desain, implementasi awal layar `Profil Pengguna` memiliki ketidakseimbangan visual (konten terpusat di atas menyisakan ~400px ruang putih kosong) dan ketiadaan atribut identitas personal remaja yang realistis. Dilakukan rekonstruksi menyeluruh dengan menambahkan layar terdedikasi `Detail Profil Pengguna` serta memperkaya kartu-kartu informasi pada layar profil utama:

| No | Nama Screen | ID Node | Posisi `[X, Y]` | Ukuran | Fungsi & Karakteristik Komponen |
| :---: | :--- | :---: | :---: | :---: | :--- |
| **1** | `Profil Pengguna` | `5967` | `[7784, 7720]` | `412x917` | **Main Profile & Hub**: Contextual Header (`6535`), Hero Identity Card (Avatar AS, nama, handle, pill PIK-R Garuda Muda, dan banner privasi E2E), Card Detail Informasi Remaja (nama panggilan, gender, jenjang SMA XI, email terverifikasi, sekolah binaan, preferensi AI, dan tag chip minat konseling), Card Aktivitas Sebaya (3 stats: 14 hari streak, 12 catatan mood, 5 modul selesai), Card Pengaturan & Keamanan (4 item menu berikon Lucide), Button Keluar dari Akun, dan metadata versi aplikasi. |
| **2** | `Detail Profil Pengguna` | `7018` | `[8276, 7720]` | `412x917` | **Dedicated Profile & Settings Form**: Contextual Header dengan tombol Kembali dan tombol pill "Simpan", Card Avatar & Foto (dengan tombol Ganti Avatar Sebaya dan catatan privasi), Card Identitas Personal Remaja (input form nama lengkap, nama panggilan, jenis kelamin, usia & jenjang, sekolah, dan PIK-R binaan), Card Minat & Konseling (selector chip 2 baris dan input preferensi gaya AI), Card Privasi & Data (toggle Mode Anonim ON, email terdaftar, kontak darurat wali terenkripsi), dan tombol utama "Simpan Perubahan Profil". |
| **3** | `Dialog Logout` | `6044` | `[8768, 7720]` | `412x917` | **Logout Confirmation Dialog**: Dark backdrop overlay, kartu modal konfirmasi keluar dengan icon alert warning, tombol bahaya "Ya, Keluar Akun", dan tombol sekunder "Batal, Tetap di Sini". |

### 9.2. Prototype Interaction Matrix (Profile Flow)

```mermaid
graph TD
    Beranda["Beranda (5243)"] -->|"Profile Button (Top App Bar)"| S1["Profil Pengguna (5967)"]
    S1 -->|"Back Button"| Beranda
    S1 -->|"Button: Ubah Detail →"| S2["Detail Profil Pengguna (7018)"]
    S1 -->|"Button: Keluar dari Akun"| S3["Dialog Logout (6044)"]
    S2 -->|"Back Button / Button: Simpan"| S1
    S2 -->|"Button: Simpan Perubahan Profil"| S1
    S3 -->|"Button: Batal, Tetap di Sini"| S1
    S3 -->|"Button: Ya, Keluar Akun"| Login["Login (4606)"]
```

---

## 10. SECTION 10 — VISUAL QUALITY OVERHAUL COMPONENT SPECIFICATIONS

### 10.1. FloatingToast Component (`FloatingToast.tsx`)
- **Tujuan**: Menyediakan umpan balik mikro (*transient micro-interaction*) saat aksi seperti bookmark artikel atau simpan refleksi dilakukan tanpa memicu pergeseran tata letak (*zero layout shift*).
- **Arsitektur**:
  - Posisi: `position: 'absolute'`, `top: 16`, `left: 16`, `right: 16`, `zIndex: 9999`.
  - Animasi: `Animated.Value` untuk `translateY` (-20px $\to$ 0px) dan `opacity` (0 $\to$ 1).
  - Varian: `success` (Lucide `CheckCircle2`, soft emerald tint), `info` (Lucide `Info`, soft blue tint).
  - Integrasi: Dirender melalui prop `floatingOverlay` pada `ScreenContainer.tsx` yang berada di luar hierarki `ScrollView`.

### 10.2. Scenario Quiz & Archetype Result Components
- **MentalGamePlayScreen**:
  - Top Bar: Close button 44px tap target, kategori pill, progress tracker `Skenario X dari Y`.
  - Focal Scenario: Card ber-padding 20px, font 15px, line height 23px.
  - Choices (A, B, C): Tap target min 52px, active border theme, letter circle 26px, choice tag tanpa emoji.
  - Reflection Card: Semantic green tint, wawasan psikologis berbasis data (JMIR Serious Games 2023).
  - Docked CTA: Fixed bottom bar, active hanya jika pilihan dipilih, tidak menutupi opsi terakhir (padding bottom 110px).
- **MentalGameResultScreen**:
  - Hero Archetype: Judul arketipe 22px bold, visual badge 80px, subtitle empatik.
  - Non-Clinical Disclaimer: Kotak info netral menegaskan fungsi psikoedukasi.
  - Dimension Breakdown: Progress bar horizontal spektrum positif (Openness, Resiliensi, Empati, Keandalan).
  - Superpowers & Growth Points: Kartu semantik terpisah berikon Lucide `Sparkles` dan `Compass`.
  - Action CTAs: Simpan ke profil (toggle bookmark), bagikan arketipe, dan bridge konsultasi ke Teman Cerita.

### 10.3. Emergency Crisis Dialog (`CrisisModal.tsx`)
- **Tujuan**: Eskalasi keselamatan krisis kesehatan mental remaja berbasis nomor resmi terverifikasi.
- **Visual Design**:
  - Radius 20px, padding 20px, controlled semantic styling (menolak latar merah menyala pekat).
  - 3 Layanan Resmi: SEJIWA 119 Ext 8 (Kemenkes RI), Panggilan Darurat 112 (Nasional), Layanan PKPR Puskesmas Faskes 1 (BPJS Peduli Remaja).
  - Tombol aksi "Panggil" dengan format pill konsisten (minWidth & padding proporsional, teks tidak terpotong).
  - Tombol sekunder "Tutup & Kembali ke Aplikasi".

