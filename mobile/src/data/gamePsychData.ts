/**
 * Evidence-Based Gamified Psychological Assessment Engine
 * Landasan Teoretis & Jurnal:
 * 1. Situational Judgment Tests (SJT) & Serious Games for Youth (JMIR Serious Games, 2023)
 * 2. Big Five Personality Framework for Adolescents (McCrae & Costa; De Fruyt et al.)
 * 3. Connor-Davidson Resilience Model (CD-RISC) & Lazarus-Folkman Coping Theory
 * 4. Mayer-Salovey Emotional Intelligence & Assertive Communication Paradigm
 */

export interface PsychGameChoice {
  id: string;
  text: string;
  tag: string;
  energyChange: number; // -15 to +15
  clarityChange: number; // -15 to +15
  traitScores: Record<string, number>; // e.g. { openness: 25, resilience: 20 }
  feedback: string;
  learningPoint: string;
}

export interface PsychGameScene {
  id: string;
  order: number;
  situation: string;
  contextBanner?: string;
  choices: PsychGameChoice[];
}

export interface PsychGameCategory {
  id: 'karakter' | 'resiliensi' | 'relasi';
  title: string;
  subtitle: string;
  scientificBasis: string;
  journalReference: string;
  durationMinutes: number;
  badgeLabel: string;
  themeColor: string;
  themeBg: string;
  scenes: PsychGameScene[];
  archetypes: {
    minScore: number;
    title: string;
    subtitle: string;
    description: string;
    superpowers: string[];
    growthAreas: string[];
    recommendedMissions: string[];
  }[];
}

export const PSYCH_GAME_CATEGORIES: PsychGameCategory[] = [
  // ==========================================
  // GAME 1: BUTTERFLY EFFECT (DECISION-BASED STORY)
  // Sesuai Screen F01 & F02 BRIEF TEMAN SEBAYA
  // ==========================================
  {
    id: 'karakter',
    title: 'Butterfly Effect',
    subtitle: 'Setiap pilihan memiliki cerita. Lihat bagaimana keputusan kecil dapat membawa hasil yang berbeda.',
    scientificBasis:
      'Diadaptasi dari Model Lima Faktor Kepribadian (Big Five OCEAN) oleh McCrae & Costa serta adaptasi remaja oleh De Fruyt et al. Menilai kecenderungan Openness, Conscientiousness, Extraversion, Agreeableness, dan Emotional Stability.',
    journalReference:
      'Journal of Medical Internet Research (JMIR) Serious Games (2023) & Frontiers in Psychology (2022).',
    durationMinutes: 4,
    badgeLabel: 'Decision-Based Story',
    themeColor: '#2563EB',
    themeBg: '#EFF6FF',
    scenes: [
      {
        id: 'k1_s1',
        order: 1,
        situation:
          'Kelasmu terpilih untuk menampilkan karya pada Festival Budaya Sekolah minggu depan. Teman-temanmu bingung memilih antara format drama konvensional atau pertunjukan multimedia interaktif. Apa langkah yang kamu ambil?',
        contextBanner: 'Skenario 1: Ide Festival Kreatif',
        choices: [
          {
            id: 'c1',
            text: 'Mengusulkan konsep multimedia baru yang berani dan menawarkan diri membuat sketsa visual awalnya.',
            tag: 'Inovatif & Eksploratif',
            energyChange: 5,
            clarityChange: 10,
            traitScores: { openness: 30, conscientiousness: 15 },
            feedback:
              'Kamu menunjukkan keterbukaan tinggi terhadap ide orisinal (High Openness) serta inisiatif proaktif!',
            learningPoint:
              'Eksplorasi ide baru memberi warna segar pada kelompok, asalkan diimbangi rencana kerja yang realistis.',
          },
          {
            id: 'c2',
            text: 'Membuat jadwal kerja terstruktur dulu dan menghitung waktu persiapan agar acara tidak terlambat.',
            tag: 'Terencana & Disiplin',
            energyChange: 5,
            clarityChange: 15,
            traitScores: { conscientiousness: 35, stability: 10 },
            feedback:
              'Kamu berfokus pada ketelitian dan keandalan eksekusi (High Conscientiousness).',
            learningPoint:
              'Struktur kerja yang rapi membuat tim merasa tenang dan memiliki kepastian target.',
          },
          {
            id: 'c3',
            text: 'Mengajak teman-teman yang pendiam berdiskusi santai agar semua suara dan ide mereka didengarkan.',
            tag: 'Empatis & Kolaboratif',
            energyChange: 10,
            clarityChange: 5,
            traitScores: { agreeableness: 35, extraversion: 15 },
            feedback:
              'Kamu mengutamakan harmoni emosional kelompok dan inklusivitas (High Agreeableness).',
            learningPoint:
              'Kelompok yang merasa didengar memiliki kohesi dan semangat kerja yang jauh lebih tinggi.',
          },
        ],
      },
      {
        id: 'k1_s2',
        order: 2,
        situation:
          'Dua hari menjelang festival, salah satu anggota tim tampak pendiam dan belum menyelesaikan bagian naskahnya karena sedang ada masalah keluarga. Sikapmu?',
        contextBanner: 'Skenario 2: Hambatan Tim & Empati',
        choices: [
          {
            id: 'c1',
            text: 'Menghampirinya secara pribadi di waktu istirahat, mendengarkan keadaannya, dan membantu membagi tugasnya.',
            tag: 'Pendukung Tulus',
            energyChange: 5,
            clarityChange: 10,
            traitScores: { agreeableness: 30, stability: 20 },
            feedback:
              'Pendekatan empatikmu membangun rasa aman psikologis (Psychological Safety) yang kuat.',
            learningPoint:
              'Mendukung teman saat sulit mempererat ikatan dan memulihkan motivasi jauh lebih cepat daripada teguran.',
          },
          {
            id: 'c2',
            text: 'Mengambil alih naskah secara sistematis dan mengerjakannya sendiri agar proyek tetap tuntas tepat waktu.',
            tag: 'Penyelesai Mandiri',
            energyChange: -10,
            clarityChange: 5,
            traitScores: { conscientiousness: 30, openness: 10 },
            feedback:
              'Tanggung jawabmu tinggi, namun waspadai risiko kelelahan jika menanggung beban sendirian.',
            learningPoint:
              'Meminta bantuan anggota lain untuk berbagi beban adalah kunci kepemimpinan yang sehat.',
          },
          {
            id: 'c3',
            text: 'Mengajak seluruh tim berkumpul mencari solusi bersama secara santai tanpa menyudutkan siapapun.',
            tag: 'Fasilitator Terbuka',
            energyChange: 10,
            clarityChange: 10,
            traitScores: { extraversion: 25, agreeableness: 25 },
            feedback:
              'Kamu mahir memediasi situasi sosial dengan komunikasi terbuka (High Extraversion & Agreeableness).',
            learningPoint:
              'Transparansi suportif menghindarkan prasangka dan memperkuat solidaritas tim.',
          },
        ],
      },
      {
        id: 'k1_s3',
        order: 3,
        situation:
          'Tepat saat pertunjukan dimulai, laptop proyektor mati mendadak dan lampu panggung meredup. Penonton mulai gaduh berbisik. Reaksi spontanmu?',
        contextBanner: 'Skenario 3: Krisis Tak Terduga',
        choices: [
          {
            id: 'c1',
            text: 'Tarik napas dalam, tetap tenang, lalu maju ke depan menyapa penonton dengan humor segar mencairkan suasana.',
            tag: 'Tenang & Adaptif',
            energyChange: 5,
            clarityChange: 15,
            traitScores: { stability: 35, extraversion: 25 },
            feedback:
              'Kestabilan emosimu luar biasa tinggi! Kamu mampu meregulasi stres di bawah tekanan.',
            learningPoint:
              'Ketenangan seorang anggota mampu menenangkan seluruh orang di ruangan secara menular.',
          },
          {
            id: 'c2',
            text: 'Segera bergerak ke belakang panggung memeriksa kabel cadangan dan menyalakan sound backup.',
            tag: 'Fokus Solutif',
            energyChange: 0,
            clarityChange: 10,
            traitScores: { conscientiousness: 30, openness: 20 },
            feedback:
              'Kamu berorientasi pada penyelesaian masalah taktis yang cepat dan terukur.',
            learningPoint:
              'Fokus pada hal yang bisa dikontrol langsung adalah strategi koping terbaik saat krisis.',
          },
          {
            id: 'c3',
            text: 'Menenangkan anggota tim yang mulai panik dan memberi instruksi improvisasi sederhana.',
            tag: 'Jangkar Emosi',
            energyChange: 5,
            clarityChange: 10,
            traitScores: { agreeableness: 25, stability: 25 },
            feedback:
              'Kamu bertindak sebagai penyeimbang emosi kelompok yang sangat diandalkan teman-temanmu.',
            learningPoint:
              'Menguatkan mental tim saat situasi sulit menyelamatkan hasil akhir pertunjukan.',
          },
        ],
      },
    ],
    archetypes: [
      {
        minScore: 80,
        title: 'Sang Visioner Tangguh (The Resilient Innovator)',
        subtitle: 'Kombinasi Keterbukaan Ide Tinggi & Regulasi Emosi Seimbang',
        description:
          'Kamu memiliki imajinasi luas, berani mencoba hal baru, serta mampu tetap tenang saat menghadapi perubahan mendadak.',
        superpowers: [
          'Berpikir kreatif di luar batas (Out-of-the-box thinker)',
          'Regulasi emosi adaptif di situasi menekan',
          'Mudah memotivasi teman sebaya untuk berkolaborasi',
        ],
        growthAreas: [
          'Waspada jangan terlalu banyak mengambil proyek sekaligus',
          'Sediakan waktu jeda untuk istirahat pikiran',
        ],
        recommendedMissions: [
          'Tuliskan 1 ide kreatifmu di catatan harian minggu ini',
          'Coba latihan Box Breathing 2 menit saat ide terasa menumpuk',
        ],
      },
      {
        minScore: 50,
        title: 'Sang Penjaga Harmoni (The Empathetic Harmonizer)',
        subtitle: 'Kekuatan Utama pada Kepedulian Sosial & Rasa Tanggung Jawab',
        description:
          'Kamu adalah pendengar yang hangat, peka terhadap perasaan teman, dan selalu menjaga agar lingkungan di sekitarmu tetap damai.',
        superpowers: [
          'Empati interpersonal yang mendalam',
          'Dapat diandalkan dalam menjalankan komitmen',
          'Mampu menjadi penengah konflik pertemanan',
        ],
        growthAreas: [
          'Belajarlah mengatakan tidak bila energimu sudah terkuras',
          'Jangan memikul masalah orang lain menjadi tanggung jawabmu sepenuhnya',
        ],
        recommendedMissions: [
          'Terapkan batasan diri yang sehat (healthy boundaries)',
          'Bagikan perasaanmu juga kepada teman yang kamu percayai',
        ],
      },
      {
        minScore: 0,
        title: 'Sang Pengatur Terpercaya (The Reliable Strategist)',
        subtitle: 'Ketelitian Tinggi, Realistis, & Berorientasi Solusi',
        description:
          'Kamu berpikir logis, runtut, dan menghargai kepastian. Kamu menjadi fondasi yang membuat segala rencana berjalan aman.',
        superpowers: [
          'Manajemen tugas yang rapi dan terarah',
          'Fokus solutif tanpa mudah terdistraksi drama',
          'Perencana yang cermat dan antisipatif',
        ],
        growthAreas: [
          'Beri ruang untuk spontanitas dan ketidaksempurnaan',
          'Rayakan progres kecil tanpa menunggu semuanya sempurna',
        ],
        recommendedMissions: [
          'Luangkan 10 menit tanpa rencana terstruktur di akhir pekan',
          'Refleksikan 3 hal yang sudah berjalan baik hari ini',
        ],
      },
    ],
  },

  // ==========================================
  // GAME 2: NAME THAT FEELING (EMOTIONAL LITERACY)
  // Sesuai Screen F01 & F03 BRIEF TEMAN SEBAYA
  // ==========================================
  {
    id: 'resiliensi',
    title: 'Name That Feeling',
    subtitle: 'Bisakah kamu mengenali emosi dari berbagai situasi?',
    scientificBasis:
      'Berdasarkan Skala Resiliensi Connor-Davidson (CD-RISC) dan Teori Koping Lazarus-Folkman. Mengukur gaya koping adaptif (Problem-Focused & Positive Reappraisal) versus maladaptif (Avoidance & Rumination).',
    journalReference:
      'Frontiers in Psychiatry (2023) - Adolescent Psychological Resilience and Gamified Micro-Interventions.',
    durationMinutes: 3,
    badgeLabel: 'Emotional Literacy',
    themeColor: '#10B981',
    themeBg: '#ECFDF5',
    scenes: [
      {
        id: 'r1_s1',
        order: 1,
        situation:
          'Pukul 21.00 malam, kamu baru ingat ada tugas presentasi penting yang belum selesai untuk besok pagi, sementara kuota internetmu menipis. Energimu drop drastis. Reaksimu?',
        contextBanner: 'Skenario 1: Kejutan Tenggat Waktu',
        choices: [
          {
            id: 'c1',
            text: 'Tarik napas, buat daftar 3 poin inti materi yang paling wajib, lalu cicil 45 menit sebelum tidur cukup.',
            tag: 'Prioritas & Reappraisal',
            energyChange: -5,
            clarityChange: 15,
            traitScores: { resilience: 35, problemFocused: 30 },
            feedback:
              'Pilihan adaptif! Kamu memilih strategi koping berfokus masalah dan tetap menjaga batas fisik.',
            learningPoint:
              'Saat waktu terbatas, menyelesaikan 80% poin esensial jauh lebih sehat daripada panik tanpa hasil.',
          },
          {
            id: 'c2',
            text: 'Memaksakan diri begadang semalaman suntuk sambil terus merasa bersalah dan cemas.',
            tag: 'Overdrive & Rumination',
            energyChange: -25,
            clarityChange: -10,
            traitScores: { resilience: 10, rumination: 30 },
            feedback:
              'Waspada! Begadang sambil overthinking justru menguras energi otak untuk hari esok.',
            learningPoint:
              'Istirahat yang cukup adalah bagian dari persiapan mental, bukan kemalasan.',
          },
          {
            id: 'c3',
            text: 'Chat teman kelompok meminta salinan catatan dan bersepakat membagi bagian presentasi secara adil.',
            tag: 'Pencari Dukungan Sosial',
            energyChange: 5,
            clarityChange: 10,
            traitScores: { resilience: 30, socialSupport: 30 },
            feedback:
              'Mencari dukungan sosial (Social Support Seeking) adalah pilar resiliensi utama!',
            learningPoint:
              'Meminta bantuan di saat genting menunjukkan kedewasaan emosional yang tinggi.',
          },
        ],
      },
      {
        id: 'r1_s2',
        order: 2,
        situation:
          'Kamu membaca komentar kurang menyenangkan di grup percakapan kelas tentang caramu berbicara saat memimpin diskusi. Dadamu terasa sesak. Apa yang kamu lakukan?',
        contextBanner: 'Skenario 2: Dinamika Media Sosial',
        choices: [
          {
            id: 'c1',
            text: 'Menjauhkan HP sejenak, minum air hangat, dan membedakan antara kritik yang membangun vs ejekan tanpa dasar.',
            tag: 'Regulasi Kognitif',
            energyChange: 10,
            clarityChange: 15,
            traitScores: { resilience: 35, emotionRegulation: 30 },
            feedback:
              'Luar biasa! Kamu melakukan teknik "Jeda Sebelum Merespons" (Pause & Reflect).',
            learningPoint:
              'Opini orang lain adalah pantulan dari mereka, bukan nilai utuh dari dirimu.',
          },
          {
            id: 'c2',
            text: 'Langsung membalas dengan kalimat pedas di grup untuk membela diri di depan semua orang.',
            tag: 'Reaksi Impulsif',
            energyChange: -15,
            clarityChange: -15,
            traitScores: { resilience: 10, reactivity: 30 },
            feedback:
              'Reaksi cepat saat marah sering kali memperbesar konflik yang sebenarnya sepele.',
            learningPoint:
              'Kemenangan sejati adalah menjaga ketenangan pikiranmu sendiri dari provokasi.',
          },
          {
            id: 'c3',
            text: 'Curhat kepada sahabat terdekat atau konselor sebaya untuk melegakan perasaan yang mengganjal.',
            tag: 'Ventilasi Aman',
            energyChange: 10,
            clarityChange: 10,
            traitScores: { resilience: 25, socialSupport: 25 },
            feedback:
              'Menyalurkan emosi di wadah yang aman menghindarkanmu dari stres berkepanjangan.',
            learningPoint:
              'Ruang aman untuk bercerita membantu otak memproses emosi luka secara sehat.',
          },
        ],
      },
      {
        id: 'r1_s3',
        order: 3,
        situation:
          'Hasil ujian keluar dan nilaimu jauh di bawah harapanmu, padahal kamu sudah belajar berhari-hari. Bagaimana pikiran dalam kepalamu berbicara?',
        contextBanner: 'Skenario 3: Menghadapi Hasil Tak Sesuai',
        choices: [
          {
            id: 'c1',
            text: '"Kecewa itu wajar. Nilai ini menunjukkan bagian materi yang perlu kuperbaiki, bukan akhir kemampuanku."',
            tag: 'Growth Mindset',
            energyChange: 5,
            clarityChange: 15,
            traitScores: { resilience: 40, growthMindset: 35 },
            feedback:
              'Pola pikir bertumbuh (Growth Mindset) membedakan kegagalan sebagai peristiwa belajar.',
            learningPoint:
              'Resiliensi bukan tentang tidak pernah jatuh, melainkan cara kita bangkit kembali.',
          },
          {
            id: 'c2',
            text: '"Memang aku tidak berbakat di bidang ini, percuma saja belajar keras."',
            tag: 'Fixed Mindset',
            energyChange: -15,
            clarityChange: -10,
            traitScores: { resilience: 5, selfDoubt: 30 },
            feedback:
              'Pikiran ini adalah bias kognitif yang mengecilkan potensimu yang sebenarnya.',
            learningPoint:
              'Bicaralah pada dirimu seperti kamu berbicara kepada sahabat yang sedang sedih.',
          },
          {
            id: 'c3',
            text: 'Membahas soal yang salah bersama guru atau teman sebaya agar paham konsepnya.',
            tag: 'Tindakan Konstruktif',
            energyChange: 5,
            clarityChange: 10,
            traitScores: { resilience: 30, problemFocused: 30 },
            feedback:
              'Mengubah rasa kecewa menjadi aksi nyata adalah tanda ketahanan mental tinggi.',
            learningPoint:
              'Langkah kecil untuk memahami kesalahan jauh lebih berharga daripada penyesalan.',
          },
        ],
      },
    ],
    archetypes: [
      {
        minScore: 75,
        title: 'Benteng Baja (High Resilience Champion)',
        subtitle: 'Ketahanan Mental Tinggi & Regulasi Emosi Adaptif',
        description:
          'Kamu memiliki daya lentur psikologis yang sangat baik. Tekanan dan kegagalan tidak mematahkan semangatmu, melainkan menjadi bahan bakar untuk belajar.',
        superpowers: [
          'Mampu melihat sisi positif saat situasi genting (Positive Reappraisal)',
          'Tidak mudah terpengaruh oleh provokasi media sosial',
          'Pola pikir bertumbuh yang kokoh',
        ],
        growthAreas: [
          'Ingat bahwa tidak apa-apa untuk merasa lelah dan beristirahat',
          'Jangan merasa harus selalu tampak kuat di hadapan orang lain',
        ],
        recommendedMissions: [
          'Berikan apresiasi pada tubuhmu yang telah berjuang hari ini',
          'Bagikan tips ketenanganmu kepada teman yang sedang cemas',
        ],
      },
      {
        minScore: 45,
        title: 'Tunas Lentur (Emerging Resilient)',
        subtitle: 'Sedang Mengembangkan Strategi Koping yang Stabil',
        description:
          'Kamu sudah memiliki kesadaran emosi yang baik, namun terkadang masih overwhelmed ketika beberapa masalah datang bersamaan.',
        superpowers: [
          'Sensitif terhadap kondisi diri',
          'Mau mencari teman berbagi dan terbuka pada solusi',
          'Memiliki tekad untuk memperbaiki situasi',
        ],
        growthAreas: [
          'Kurangi kebiasaan memikirkan skenario terburuk berulang kali (rumination)',
          'Latihlah pernapasan teratur saat mendadak panik',
        ],
        recommendedMissions: [
          'Gunakan fitur Teman Mood setiap hari untuk mendeteksi pemicu stres',
          'Coba latihan pernapasan Box Breathing 3 menit saat mulai cemas',
        ],
      },
      {
        minScore: 0,
        title: 'Jiwa Perlu Pemulihan (Resting Soul)',
        subtitle: 'Kapasitas Batin Sedang Terbebani & Butuh Ruang Aman',
        description:
          'Beban pikiranmu saat ini sedang cukup tinggi. Ini adalah sinyal alami bahwa tubuh dan batinmu membutuhkan jeda serta dukungan dari sekitar.',
        superpowers: [
          'Kepekaan perasaan yang mendalam',
          'Kejujuran mengakui keterbatasan diri',
        ],
        growthAreas: [
          'Hindari memikul beban sendirian di dalam hati',
          'Segera manfaatkan ruang curhat Teman Cerita atau konselor sebaya',
        ],
        recommendedMissions: [
          'Luangkan waktu 1 sesi curhat di Teman Cerita bersama asisten AI/konselor',
          'Tidur 1 jam lebih awal malam ini untuk merestart sistem saraf',
        ],
      },
    ],
  },

  // ==========================================
  // GAME 3: DIGITAL DILEMMA (DIGITAL WELLBEING)
  // Sesuai Screen F01 & F04 BRIEF TEMAN SEBAYA
  // ==========================================
  {
    id: 'relasi',
    title: 'Digital Dilemma',
    subtitle: 'Hadapi berbagai situasi di dunia digital dan pilih respons yang paling bijak.',
    scientificBasis:
      'Berdasarkan Kerangka Kecerdasan Emosional Interpersonal Mayer-Salovey serta Prinsip Komunikasi Asertif dan Batasan Personal (Healthy Boundaries) Remaja.',
    journalReference:
      'JMIR Mental Health (2022) - Adolescent Peer Connection, Emotional Regulation, and Interactive Serious Games.',
    durationMinutes: 4,
    badgeLabel: 'Digital Wellbeing',
    themeColor: '#8B5CF6',
    themeBg: '#F5F3FF',
    scenes: [
      {
        id: 'rel_s1',
        order: 1,
        situation:
          'Sahabatmu membatalkan janji belajar bersama di menit-menit terakhir untuk ketiga kalinya dalam bulan ini tanpa alasan yang jelas. Bagaimana kamu merespon?',
        contextBanner: 'Skenario 1: Batasan Waktu & Komunikasi',
        choices: [
          {
            id: 'c1',
            text: 'Menyampaikan dengan tenang: "Aku menghargai waktumu, tapi aku merasa kurang dihargai kalau dibatalkan mendadak. Ada apa sebenarnya?"',
            tag: 'Komunikasi Asertif',
            energyChange: 5,
            clarityChange: 15,
            traitScores: { assertive: 35, empathy: 20 },
            feedback:
              'Pilihan asertif yang sempurna! Menyampaikan perasaan tanpa menyerang lawan bicara.',
            learningPoint:
              'Batasan yang sehat bukan tentang menjauh, melainkan menjaga agar relasi tetap awet dan saling menghargai.',
          },
          {
            id: 'c2',
            text: 'Memendam rasa kesal, berkata "Nggak apa-apa kok", lalu menyindirnya di status media sosial.',
            tag: 'Pasif-Agresif',
            energyChange: -15,
            clarityChange: -15,
            traitScores: { passiveAggressive: 35 },
            feedback:
              'Sindiran media sosial sering menimbulkan kesalahpahaman baru dan merusak rasa percaya.',
            learningPoint:
              'Bicaralah langsung secara privat untuk menjaga marwah pertemanan kalian.',
          },
          {
            id: 'c3',
            text: 'Menanyakan apakah dia sedang menghadapi masa sulit dan menawarkan waktu lain yang lebih luang.',
            tag: 'Empati Tinggi',
            energyChange: 5,
            clarityChange: 10,
            traitScores: { empathy: 35, warmth: 25 },
            feedback:
              'Sikap berprasangka baik yang hangat membantunya merasa tidak dihakimi.',
            learningPoint:
              'Kadang teman kita membatalkan janji bukan karena benci, tapi karena kelelahan emosional.',
          },
        ],
      },
      {
        id: 'rel_s2',
        order: 2,
        situation:
          'Di kantin, salah satu teman mulai menggosipkan rahasia pribadi orang lain yang tidak ada di meja. Semua orang tertawa. Sikapmu?',
        contextBanner: 'Skenario 2: Tekanan Teman Sebaya (Peer Pressure)',
        choices: [
          {
            id: 'c1',
            text: 'Mengalihkan topik pembicaraan dengan santai ke hal positif tanpa harus mempermalukan siapapun.',
            tag: 'Peredam Elegan',
            energyChange: 5,
            clarityChange: 15,
            traitScores: { socialTact: 35, integrity: 30 },
            feedback:
              'Strategi diplomatis yang cerdas untuk menghentikan pembicaraan beracun secara elegan.',
            learningPoint:
              'Kamu tidak harus konfrontatif untuk menjadi agen kebaikan di lingkaran pertemananmu.',
          },
          {
            id: 'c2',
            text: 'Ikut tertawa dan menambahi gosip agar tidak dianggap aneh atau sok suci oleh kelompok.',
            tag: 'Konformitas Pasif',
            energyChange: -10,
            clarityChange: -10,
            traitScores: { conformity: 30 },
            feedback:
              'Mengorbankan integritas demi diterima kelompok sering meninggalkan rasa bersalah batin.',
            learningPoint:
              'Pertemanan sejati menghargai nilai-nilai kebaikanmu, bukan konformitas buta.',
          },
          {
            id: 'c3',
            text: 'Berkata sopan: "Eh kayaknya kita jangan bahas dia pas orangnya nggak ada deh, nggak adil buat dia."',
            tag: 'Keberanian Moral',
            energyChange: 10,
            clarityChange: 10,
            traitScores: { integrity: 40, assertive: 30 },
            feedback:
              'Keberanian moral yang luar biasa! Sikap ini menginspirasi teman lain yang sebenarnya juga tidak setuju.',
            learningPoint:
              'Satu suara berani sering kali cukup untuk mengubah budaya kelompok menjadi lebih aman.',
          },
        ],
      },
      {
        id: 'rel_s3',
        order: 3,
        situation:
          'Seorang teman curhat sambil menangis tentang masalah berat di rumahnya. Kamu sendiri sebenarnya sedang lelah dan ada urusan lain. Sikapmu?',
        contextBanner: 'Skenario 3: Empati Berbatas (Compassion Fatigue)',
        choices: [
          {
            id: 'c1',
            text: 'Menemaninya 15 menit dengan penuh kehadiran, mendengarkan, lalu jujur bahwa kamu harus pergi dan berjanji menghubunginya lagi nanti malam.',
            tag: 'Empati Berbatas Sehat',
            energyChange: 5,
            clarityChange: 15,
            traitScores: { empathy: 35, boundaries: 35 },
            feedback:
              'Kombinasi ideal antara cinta kasih dan batasan diri (Compassionate Boundaries).',
            learningPoint:
              'Kamu tidak bisa menuangkan air dari teko yang kosong. Merawat diri memungkinkanmu merawat orang lain dengan tulus.',
          },
          {
            id: 'c2',
            text: 'Mengabaikan urusanmu sendiri dan mendengarkannya berjam-jam sampai energimu habis total.',
            tag: 'Penyelamat Berlebihan',
            energyChange: -25,
            clarityChange: -5,
            traitScores: { selfSacrifice: 35 },
            feedback:
              'Niatmu mulia, namun waspadai sindrom penyelamat (savior complex) yang merugikan kesehatan mentalmu.',
            learningPoint:
              'Teman membutuhkan kehadiran yang stabil, bukan pengorbanan yang berujung kelelahan kronis.',
          },
          {
            id: 'c3',
            text: 'Menghubungkannya dengan konselor sebaya PIK-R atau layanan Teman Cerita agar ia mendapat pendampingan yang tepat.',
            tag: 'Jembatan Bantuan',
            energyChange: 10,
            clarityChange: 15,
            traitScores: { resourcefulness: 35, empathy: 25 },
            feedback:
              'Langkah paling bertanggung jawab saat masalah teman sudah di luar kapasitas kemampuanmu.',
            learningPoint:
              'Menghubungkan teman ke bantuan profesional adalah bentuk kasih sayang tertinggi.',
          },
        ],
      },
    ],
    archetypes: [
      {
        minScore: 75,
        title: 'Mercusuar Empati (The Empathetic Beacon)',
        subtitle: 'Kecerdasan Interpersonal Tinggi & Memiliki Batasan Sehat',
        description:
          'Kamu memiliki radar sosial yang peka, mampu mendengarkan tanpa menghakimi, sekaligus berani menjaga batas diri agar tidak terkuras oleh lingkungan beracun.',
        superpowers: [
          'Komunikasi asertif yang menyejukkan hati',
          'Mampu menjadi pendengar aktif yang menyembuhkan',
          'Kekuatan batasan personal yang sehat',
        ],
        growthAreas: [
          'Ingat bahwa tidak semua masalah orang lain harus kamu selesaikan',
          'Terima bahwa kadang ada orang yang belum siap menerima kebaikanmu',
        ],
        recommendedMissions: [
          'Kirimkan 1 pesan apresiasi tulus kepada orang tua atau sahabatmu hari ini',
          'Jadwalkan 30 menit me-time tanpa ponsel untuk recharge energi batin',
        ],
      },
      {
        minScore: 45,
        title: 'Jembatan Harmoni (The Balanced Diplomat)',
        subtitle: 'Peka Terhadap Perasaan Orang Lain & Menghindari Konflik',
        description:
          'Kamu sangat menghargai kedamaian di kelompok. Kadang kamu ragu mengungkapkan ketidaksetujuan karena khawatir membuat teman kecewa.',
        superpowers: [
          'Kemampuan adaptasi sosial yang luwes',
          'Menghargai keberagaman sudut pandang teman',
          'Ramah dan mudah diterima di berbagai lingkaran pertemanan',
        ],
        growthAreas: [
          'Latihlah mengungkapkan pendapat asertifmu secara berkala',
          'Jangan merasa bersalah jika kamu berbeda pandangan dari mayoritas',
        ],
        recommendedMissions: [
          'Coba katakan "Maaf, aku belum bisa bantu sekarang" saat kamu benar-benar lelah',
          'Gunakan teknik I-Message saat merasa ada hal yang mengganjal',
        ],
      },
      {
        minScore: 0,
        title: 'Petualang Batasan Diri (The Boundary Explorer)',
        subtitle: 'Sedang Belajar Menyeimbangkan Kebutuhan Diri & Lingkungan',
        description:
          'Kamu sering merasakan lelah sosial (social burnout) akibat tekanan kelompok atau kebingungan membedakan mana empati dan mana pengorbanan berlebih.',
        superpowers: [
          'Kejujuran batin untuk terus berkembang',
          'Keinginan kuat memiliki lingkaran pertemanan yang aman dan positif',
        ],
        growthAreas: [
          'Pahami bahwa kamu berhak menetapkan batasan tanpa merasa egois',
          'Jauhi lingkaran yang memicu drama atau gosip berulang',
        ],
        recommendedMissions: [
          'Baca modul psikoedukasi "Seni Menetapkan Boundaries Remaja" di Teman Belajar',
          'Konsultasikan dinamika pertemananmu dengan Konselor Sebaya di Teman Cerita',
        ],
      },
    ],
  },
];

