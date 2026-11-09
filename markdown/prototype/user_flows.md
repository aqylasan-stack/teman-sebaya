# COMPLETE USER FLOWS SPECIFICATION
## TEMAN SEBAYA — RUANG KONSELING INKLUSIF REMAJA
### Pemetaan Alur Pengguna End-to-End, Diagram Interaksi & Transisi Layar

> **Dokumen ID**: `FLOW-TS-005`  
> **Status Dokumen**: 🟢 **VERIFIED / HIGH-FIDELITY IMPLEMENTATION**  
> **Platform Target**: Mobile Android & iOS (412 × 917 px & 360 × 800 px)  
> **Lokasi File**: `markdown/prototype/user_flows.md`  
> **Tujuan**: Menjamin seluruh alur terhubung secara logis tanpa adanya halaman buntu (*zero dead-end navigation*).

---

## 1. GLOBAL USER FLOW OVERVIEW

Alur perjalanan pengguna Teman Sebaya dirancang mengutamakan kemudahan akses (*low friction*), kenyamanan emosional (*emotional safety*), dan kejelasan navigasi (*clear wayfinding*):

```mermaid
flowchart TD
    Start([Buka Aplikasi]) --> Splash[Splash Screen]
    Splash -->|afterDelay: 900ms| Onb1[Onboarding 1]
    Onb1 -->|Lanjut| Onb2[Onboarding 2]
    Onb2 -->|Lanjut| Onb3[Onboarding 3]
    Onb1 & Onb2 & Onb3 -->|Lewati| OnbComp[Onboarding Complete]
    Onb3 -->|Selesai| OnbComp
    
    OnbComp -->|Masuk| Login[Layar Login]
    OnbComp -->|Buat akun| Register[Layar Register]
    
    Login -->|Masuk| MoodSelection[Mood Selection]
    Login -->|Daftar di sini| Register
    Login -->|Lupa kata sandi?| ForgotPass[Lupa Kata Sandi]
    
    Register -->|Daftar| RegOTP[Verifikasi Akun OTP]
    RegOTP -->|Verifikasi Kode| SuksesReg[Pendaftaran Berhasil]
    SuksesReg -->|Mulai Jelajahi| MoodSelection
    
    subgraph DirectRecoveryFlow [Alur Pemulihan Kata Sandi Langsung]
        ForgotPass -->|Kirim Kode Verifikasi| VerifyOTP[Verifikasi Kode OTP]
        VerifyOTP -->|Verifikasi Kode| CreateNewPass[Buat Kata Sandi Baru]
        CreateNewPass -->|Simpan Kata Sandi| SuksesReset[Kata Sandi Diperbarui]
        SuksesReset -->|Masuk dengan Sandi Baru| Login
    end
    
    subgraph MoodExperience [Alur Mood Check-in Mandiri]
        MoodSelection --> EmotionDetail[Eksplorasi 50 Perasaan]
        EmotionDetail --> Reflection[Refleksi Emosional Imersif]
        Reflection -->|Konfirmasi Sesuai| MoodConfirm[Konfirmasi Catatan]
        Reflection -->|Pilih Perasaan Lain| EmotionDetail
        MoodConfirm --> Stats[Statistik Emosi Visual]
    end
    
    Stats --> Beranda[Beranda Utama]
    
    subgraph CoreHub [Lima Ruang Teman Sebaya]
        Beranda <--> Cerita[Teman Cerita]
        Beranda <--> Belajar[Teman Belajar]
        Beranda <--> Tumbuh[Teman Tumbuh]
        Beranda <--> Komunitas[Teman Komunitas]
        Beranda <--> Akses[Teman Akses]
    end
    
    Beranda --> Profile[Profil & Pengaturan]
    Profile --> LogoutModal[Dialog Konfirmasi Logout]
    LogoutModal -->|Keluar| Login
```

---

## 2. DETAIL USER FLOW PER MODUL

### 2.1. Alur 01: Entry, Onboarding & Autentikasi

```mermaid
sequenceDiagram
    autonumber
    actor User as Pengguna Remaja
    participant Splash as Splash Screen
    participant Onb as Onboarding 1..3
    participant OnbComp as Onboarding Complete
    participant Login as Login
    participant Reg as Register
    participant RegOTP as Verifikasi Akun OTP
    participant Mood as Mood Selection
    
    User->>Splash: Membuka aplikasi Teman Sebaya
    Splash-->>Onb: Otomatis transisi ke Onboarding 1 (afterDelay: 900ms, Dissolve 300ms)
    User->>Onb: Menjawab pertanyaan atau tap 'Lanjut'/'Lewati'
    Onb-->>OnbComp: Tiba di Onboarding Complete
    
    alt Skenario A: Masuk Akun Terdaftar
        User->>OnbComp: Tap 'Masuk' (Dissolve 200ms)
        OnbComp-->>Login: Buka formulir Login
        User->>Login: Masukkan email & kata sandi, lalu tap 'Masuk'
        Login-->>Mood: Sesi terotentikasi, masuk ke Mood Check-in
    else Skenario B: Pendaftaran Akun Baru
        User->>OnbComp: Tap 'Buat akun' (Dissolve 200ms)
        OnbComp-->>Reg: Buka formulir Register
        User->>Reg: Masukkan nama, email & kata sandi, lalu tap 'Daftar'
        Reg-->>RegOTP: Kirim kode 4 digit, buka layar verifikasi
        User->>RegOTP: Masukkan kode OTP (starts empty)
        RegOTP-->>Mood: Verifikasi sukses, lanjut ke Mood Check-in
    end
```

### 2.2. Alur 02: Pemulihan Kata Sandi Langsung (Direct Password Recovery)

Alur pemulihan kata sandi direkonstruksi untuk menghilangkan layar jeda (*intermediate friction screen*) `Recovery Submitted`:

```mermaid
sequenceDiagram
    autonumber
    actor User as Pengguna Remaja
    participant Login as Login
    participant Forgot as Lupa Kata Sandi
    participant Verify as Verifikasi Kode
    participant NewPass as Buat Kata Sandi Baru
    participant Success as Kata Sandi Diperbarui
    
    User->>Login: Tap 'Lupa kata sandi?' (Dissolve 200ms)
    Login-->>Forgot: Buka layar Lupa Kata Sandi
    User->>Forgot: Masukkan alamat email akun, tap 'Kirim Kode Verifikasi'
    Note over Forgot,Verify: Transisi langsung tanpa layar perantara!
    Forgot-->>Verify: Buka layar Verifikasi Kode (Dissolve 200ms)
    Note over Verify: Menampilkan masked email (fh****@gmail.com) & countdown timer 00:58
    User->>Verify: Masukkan 4 digit OTP, tap 'Verifikasi Kode'
    Verify-->>NewPass: Buka layar Buat Kata Sandi Baru (Dissolve 200ms)
    Note over NewPass: Indikator Password Strength dinamis (Empty/Weak/Medium/Strong)
    User->>NewPass: Masukkan kata sandi baru & konfirmasi, tap 'Simpan Kata Sandi'
    NewPass-->>Success: Buka layar Kata Sandi Diperbarui (Dissolve 250ms)
    User->>Success: Tap 'Masuk dengan Sandi Baru' (Dissolve 200ms)
    Success-->>Login: Kembali ke layar Login untuk masuk
```

#### Kebijakan Keamanan & Anti-Enumeration:
1. **Masked Recipient Display**: Email disamarkan sebagian (`fh****@gmail.com`) untuk menjaga privasi visual pengguna di ruang publik.
2. **Anti-Account Enumeration Copy**: Salinan instruksi menggunakan kalimat terbuka: *"Jika email terdaftar, kode verifikasi akan segera masuk ke kotak pesan."* Hal ini mencegah pihak tak berwenang memvalidasi keberadaan akun orang lain.
3. **Pemberian Waktu Jeda Resend**: Timer countdown 58 detik ("Kirim ulang dalam 00:58") mencegah serangan brute force atau spamming permintaan OTP.

---

## 3. MOOD CHECK-IN FLOW & CORE SPACES

(Sesuai implementasi Page 1195 `Mood Check-in Flow` dan Page 1 `Teman Sebaya Core Spaces`).
