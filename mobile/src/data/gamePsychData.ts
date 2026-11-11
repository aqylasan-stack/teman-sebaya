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
  illustration?: any;
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
    variant?: 'senang' | 'sedih' | 'harmoni';
  }[];
}

export const PSYCH_GAME_CATEGORIES: PsychGameCategory[] = [
  // ==========================================
  // GAME 1: BUTTERFLY EFFECT (DECISION-BASED STORY)
  // 7 Scenarios (Sesuai Standar Kuis & Asesmen Psikologi Remaja)
  // ==========================================
  {
    id: 'karakter',
    title: 'Butterfly Effect',
    subtitle: 'Setiap pilihan memiliki cerita. Eksplorasi bagaimana keputusan kecil membawa dampak berbeda.',
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
        illustration: require('../../assets/games/butterfly/butterfly_soal_1.png'),
        choices: [
          {
            id: 'c1',
            text: 'Mengusulkan konsep multimedia baru yang berani dan menawarkan diri membuat sketsa visual awalnya.',
            tag: 'Inovatif & Eksploratif',
            energyChange: 5,
            clarityChange: 10,
            traitScores: { openness: 15, conscientiousness: 10 },
            feedback: 'Kamu menunjukkan keterbukaan tinggi terhadap ide orisinal serta inisiatif proaktif!',
            learningPoint: 'Eksplorasi ide baru memberi warna segar pada kelompok bila diimbangi rencana kerja realistis.',
          },
          {
            id: 'c2',
            text: 'Membuat jadwal kerja terstruktur dulu dan menghitung waktu persiapan agar acara tidak terlambat.',
            tag: 'Terencana & Disiplin',
            energyChange: 5,
            clarityChange: 15,
            traitScores: { conscientiousness: 15, stability: 10 },
            feedback: 'Kamu berfokus pada ketelitian dan keandalan eksekusi.',
            learningPoint: 'Struktur kerja yang rapi membuat tim merasa tenang dan memiliki kepastian target.',
          },
          {
            id: 'c3',
            text: 'Mengajak teman-teman yang pendiam berdiskusi santai agar semua suara dan ide mereka didengarkan.',
            tag: 'Empatis & Kolaboratif',
            energyChange: 10,
            clarityChange: 5,
            traitScores: { agreeableness: 15, extraversion: 10 },
            feedback: 'Kamu mengutamakan harmoni emosional kelompok dan inklusivitas.',
            learningPoint: 'Kelompok yang merasa didengar memiliki kohesi dan semangat kerja yang jauh lebih tinggi.',
          },
        ],
      },
      {
        id: 'k1_s2',
        order: 2,
        situation:
          'Dua hari menjelang festival, salah satu anggota tim tampak pendiam dan belum menyelesaikan bagian naskahnya karena sedang ada masalah keluarga. Sikapmu?',
        contextBanner: 'Skenario 2: Hambatan Tim & Empati',
        illustration: require('../../assets/games/butterfly/butterfly_soal_2.png'),
        choices: [
          {
            id: 'c1',
            text: 'Menghampirinya secara pribadi di waktu istirahat, mendengarkan keadaannya, dan membantu membagi tugasnya.',
            tag: 'Pendukung Tulus',
            energyChange: 5,
            clarityChange: 10,
            traitScores: { agreeableness: 15, stability: 10 },
            feedback: 'Pendekatan empatikmu membangun rasa aman psikologis yang kuat.',
            learningPoint: 'Mendukung teman saat sulit mempererat ikatan dan memulihkan motivasi lebih cepat.',
          },
          {
            id: 'c2',
            text: 'Mengambil alih naskah secara sistematis dan mengerjakannya sendiri agar proyek tuntas tepat waktu.',
            tag: 'Penyelesai Mandiri',
            energyChange: -5,
            clarityChange: 5,
            traitScores: { conscientiousness: 15, openness: 5 },
            feedback: 'Tanggung jawabmu tinggi, namun waspadai risiko kelelahan memikul beban sendiri.',
            learningPoint: 'Meminta bantuan anggota lain untuk berbagi beban adalah kunci kepemimpinan yang sehat.',
          },
          {
            id: 'c3',
            text: 'Mengajak seluruh tim berkumpul mencari solusi bersama secara santai tanpa menyudutkan siapapun.',
            tag: 'Fasilitator Terbuka',
            energyChange: 10,
            clarityChange: 10,
            traitScores: { extraversion: 12, agreeableness: 12 },
            feedback: 'Kamu mahir memediasi situasi sosial dengan komunikasi terbuka.',
            learningPoint: 'Transparansi suportif menghindarkan prasangka dan memperkuat solidaritas tim.',
          },
        ],
      },
      {
        id: 'k1_s3',
        order: 3,
        situation:
          'Tepat saat gladi resik panggung, laptop proyektor mati mendadak dan sound system berdengung keras. Penonton mulai gaduh berbisik. Reaksi spontanmu?',
        contextBanner: 'Skenario 3: Krisis Tak Terduga',
        illustration: require('../../assets/games/butterfly/butterfly_soal_3.png'),
        choices: [
          {
            id: 'c1',
            text: 'Tarik napas dalam, tetap tenang, lalu maju ke depan menyapa penonton dengan humor segar mencairkan suasana.',
            tag: 'Tenang & Adaptif',
            energyChange: 5,
            clarityChange: 15,
            traitScores: { stability: 15, extraversion: 10 },
            feedback: 'Kestabilan emosimu luar biasa! Mampu meregulasi stres di bawah tekanan.',
            learningPoint: 'Ketenangan seorang anggota mampu menenangkan seluruh orang di ruangan secara menular.',
          },
          {
            id: 'c2',
            text: 'Segera bergerak ke belakang panggung memeriksa kabel cadangan dan menyalakan sound backup.',
            tag: 'Fokus Solutif',
            energyChange: 0,
            clarityChange: 10,
            traitScores: { conscientiousness: 15, openness: 10 },
            feedback: 'Kamu berorientasi pada penyelesaian masalah taktis yang cepat dan terukur.',
            learningPoint: 'Fokus pada hal yang bisa dikontrol langsung adalah strategi koping terbaik saat krisis.',
          },
          {
            id: 'c3',
            text: 'Menenangkan anggota tim yang mulai panik dan memberi instruksi improvisasi sederhana.',
            tag: 'Jangkar Emosi',
            energyChange: 5,
            clarityChange: 10,
            traitScores: { agreeableness: 12, stability: 12 },
            feedback: 'Kamu bertindak sebagai penyeimbang emosi kelompok yang sangat diandalkan.',
            learningPoint: 'Menguatkan mental tim saat situasi sulit menyelamatkan hasil akhir pertunjukan.',
          },
        ],
      },
      {
        id: 'k1_s4',
        order: 4,
        situation:
          'Terjadi perdebatan sengit antara tim dekorasi dan tim naskah mengenai tema warna backdrop panggung. Waktu persiapan tinggal 3 jam lagi. Bagaimana kamu menengahi?',
        contextBanner: 'Skenario 4: Menengahi Beda Pendapat',
        illustration: require('../../assets/games/butterfly/butterfly_soal_4.png'),
        choices: [
          {
            id: 'c1',
            text: 'Mengusulkan kompromi visual yang menggabungkan elemen terbaik dari kedua kubu secara harmonis.',
            tag: 'Penengah Solutif',
            energyChange: 5,
            clarityChange: 10,
            traitScores: { agreeableness: 15, openness: 10 },
            feedback: 'Kamu mahir menemukan titik temu dari dua sudut pandang berbeda.',
            learningPoint: 'Kolaborasi yang matang tidak harus ada yang kalah, melainkan saling melengkapi.',
          },
          {
            id: 'c2',
            text: 'Mengajak voting cepat dalam 5 menit agar keputusan bulat tercapai dan semua bisa lanjut bekerja.',
            tag: 'Tegas & Efisien',
            energyChange: 5,
            clarityChange: 10,
            traitScores: { conscientiousness: 15, stability: 10 },
            feedback: 'Keputusan yang cepat menyelamatkan waktu persiapan tim yang terbatas.',
            learningPoint: 'Dalam kondisi darurat waktu, kepastian arah lebih penting daripada perdebatan tanpa henti.',
          },
        ],
      },
      {
        id: 'k1_s5',
        order: 5,
        situation:
          '30 menit sebelum giliran kelasmu tampil, pemeran utama mendadak gemetar hebat dan mengaku tidak sanggup naik ke atas panggung karena demam panggung akut. Apa tindakanmu?',
        contextBanner: 'Skenario 5: Demam Panggung Sahabat',
        illustration: require('../../assets/games/butterfly/butterfly_soal_5.png'),
        choices: [
          {
            id: 'c1',
            text: 'Mengajaknya menepi sejenak, memandu latihan napas 4-7-8, dan meyakinkannya bahwa seluruh tim siap mendukungnya.',
            tag: 'Regulasi Empatik',
            energyChange: 10,
            clarityChange: 15,
            traitScores: { stability: 15, agreeableness: 12 },
            feedback: 'Kamu membantu mengembalikan ketenangan sistem sarafnya secara ilmiah dan suportif.',
            learningPoint: 'Teknik grounding fisik dan afirmasi hangat mampu memutus siklus panik seketika.',
          },
          {
            id: 'c2',
            text: 'Menyiapkan catatan contekan kecil untuk ia selipkan di properti agar merasa lebih aman saat berdialog.',
            tag: 'Bantuan Taktis',
            energyChange: 5,
            clarityChange: 10,
            traitScores: { conscientiousness: 12, openness: 10 },
            feedback: 'Solusi praktismu memberi rasa aman kognitif yang ia butuhkan.',
            learningPoint: 'Safety net sederhana seringkali cukup untuk mengembalikan kepercayaan diri seseorang.',
          },
        ],
      },
      {
        id: 'k1_s6',
        order: 6,
        situation:
          'Di tengah pementasan, seorang teman lupa dialog krusial dan hening selama beberapa detik di hadapan ratusan pasang mata penonton. Respon spontanmu dari samping panggung?',
        contextBanner: 'Skenario 6: Ujian Improvisasi',
        illustration: require('../../assets/games/butterfly/butterfly_soal_6.png'),
        choices: [
          {
            id: 'c1',
            text: 'Masuk secara natural sambil melontarkan dialog pancingan yang membantunya mengingat alur cerita.',
            tag: 'Cepat Tanggap & Berani',
            energyChange: 10,
            clarityChange: 15,
            traitScores: { openness: 15, extraversion: 12 },
            feedback: 'Keberanianmu berimprovisasi menyelamatkan momen panggung dengan gemilang!',
            learningPoint: 'Dalam kerja tim, saling menutupi kekurangan di lapangan adalah bentuk loyalitas tertinggi.',
          },
          {
            id: 'c2',
            text: 'Menginstruksikan tim sound untuk menaikkan musik latar agar keheningan tidak terasa canggung.',
            tag: 'Dukungan Latar',
            energyChange: 5,
            clarityChange: 10,
            traitScores: { conscientiousness: 12, stability: 12 },
            feedback: 'Ketelitianmu mengendalikan atmosfer panggung bekerja sangat efektif.',
            learningPoint: 'Bantuan tidak selalu harus terlihat di depan layar untuk memberikan dampak besar.',
          },
        ],
      },
      {
        id: 'k1_s7',
        order: 7,
        situation:
          'Malam hari setelah festival berakhir sukses, grup chat kelasmu dipenuhi curhatan haru dan evaluasi pencapaian bersama. Apa pesan penutup yang ingin kamu sampaikan kepada tim?',
        contextBanner: 'Skenario 7: Refleksi Perjalanan',
        illustration: require('../../assets/games/butterfly/butterfly_soal_7.png'),
        choices: [
          {
            id: 'c1',
            text: '"Terima kasih semua! Setiap keringat dan kepanikan kita terbayar lunas. Aku bangga bisa berproses bersama kalian."',
            tag: 'Pemersatu Tim',
            energyChange: 15,
            clarityChange: 15,
            traitScores: { agreeableness: 15, stability: 15 },
            feedback: 'Pesanmu menutup rangkaian pengalaman dengan rasa syukur dan kebersamaan yang mendalam.',
            learningPoint: 'Validasi positif di akhir proyek mempererat ikatan pertemanan hingga jauh ke masa depan.',
          },
          {
            id: 'c2',
            text: '"Hebat banget kerja sama kita! Istirahat yang cukup malam ini ya, besok kita siap hadapi tantangan baru."',
            tag: 'Peduli & Berimbang',
            energyChange: 10,
            clarityChange: 15,
            traitScores: { conscientiousness: 12, stability: 15 },
            feedback: 'Kamu mengingatkan pentingnya pemulihan energi setelah pencapaian besar.',
            learningPoint: 'Keseimbangan antara bekerja keras dan istirahat berkualitas adalah inti dari resiliensi.',
          },
        ],
      },
    ],
    archetypes: [
      {
        minScore: 165,
        variant: 'senang',
        title: 'Sang Visioner Kolaboratif (The Collaborative Innovator)',
        subtitle: 'Eksplorasi Ide Baru & Kolaborasi Tim yang Seimbang',
        description:
          'Pilihanmu mencerminkan keberanian mengeksplorasi ide kreatif dengan tetap menjaga kebersamaan dan ritme kerja kelompok.',
        superpowers: [
          'Berpikir kreatif dan terbuka pada sudut pandang baru',
          'Menjaga ketenangan kelompok di situasi yang menantang',
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
        minScore: 145,
        variant: 'harmoni',
        title: 'Sang Penjaga Harmoni (The Empathetic Harmonizer)',
        subtitle: 'Kepedulian Sosial & Tanggung Jawab Bersama',
        description:
          'Pilihanmu berfokus pada mendengarkan rekan satu tim, meredakan perselisihan, dan menjaga suasana kelompok tetap suportif.',
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
        variant: 'harmoni',
        title: 'Sang Pengatur Terpercaya (The Reliable Strategist)',
        subtitle: 'Kecermatan Berpikir & Solusi Praktis Terarah',
        description:
          'Pilihanmu berfokus pada rencana nyata, kejelasan langkah, dan mencari jalan keluar yang realistis saat menghadapi kendala.',
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
  // 8 Scenarios (Sesuai Standar Literasi Emosi Remaja)
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
        illustration: require('../../assets/games/emotion/soal1.png'),
        choices: [
          {
            id: 'c1',
            text: 'Tarik napas, buat daftar 3 poin inti materi yang paling wajib, lalu cicil 45 menit sebelum tidur cukup.',
            tag: 'Prioritas & Reappraisal',
            energyChange: -5,
            clarityChange: 15,
            traitScores: { resilience: 15, problemFocused: 12 },
            feedback: 'Pilihan adaptif! Kamu memilih strategi koping berfokus masalah dan tetap menjaga batas fisik.',
            learningPoint: 'Saat waktu terbatas, menyelesaikan poin esensial jauh lebih sehat daripada panik.',
          },
          {
            id: 'c2',
            text: 'Memaksakan diri begadang semalaman suntuk sambil terus merasa bersalah dan cemas.',
            tag: 'Overdrive & Rumination',
            energyChange: -20,
            clarityChange: -10,
            traitScores: { resilience: 5, rumination: 15 },
            feedback: 'Waspada! Begadang sambil overthinking justru menguras energi otak untuk hari esok.',
            learningPoint: 'Istirahat yang cukup adalah bagian dari persiapan mental, bukan kemalasan.',
          },
          {
            id: 'c3',
            text: 'Chat teman kelompok meminta salinan catatan dan bersepakat membagi bagian presentasi secara adil.',
            tag: 'Pencari Dukungan Sosial',
            energyChange: 5,
            clarityChange: 10,
            traitScores: { resilience: 12, socialSupport: 15 },
            feedback: 'Mencari dukungan sosial (Social Support Seeking) adalah pilar resiliensi utama!',
            learningPoint: 'Meminta bantuan di saat genting menunjukkan kedewasaan emosional yang tinggi.',
          },
        ],
      },
      {
        id: 'r1_s2',
        order: 2,
        situation:
          'Kamu membaca komentar kurang menyenangkan di grup percakapan kelas tentang caramu berbicara saat memimpin diskusi. Dadamu terasa sesak. Apa yang kamu lakukan?',
        contextBanner: 'Skenario 2: Dinamika Media Sosial',
        illustration: require('../../assets/games/emotion/soal2.png'),
        choices: [
          {
            id: 'c1',
            text: 'Menjauhkan HP sejenak, minum air hangat, dan membedakan antara kritik yang membangun vs ejekan tanpa dasar.',
            tag: 'Regulasi Kognitif',
            energyChange: 10,
            clarityChange: 15,
            traitScores: { resilience: 15, emotionRegulation: 12 },
            feedback: 'Luar biasa! Kamu melakukan teknik "Jeda Sebelum Merespons" (Pause & Reflect).',
            learningPoint: 'Opini orang lain adalah pantulan dari mereka, bukan nilai utuh dari dirimu.',
          },
          {
            id: 'c2',
            text: 'Langsung membalas panjang lebar dengan nada emosional untuk membela diri di hadapan semua orang.',
            tag: 'Reaksi Reaktif',
            energyChange: -15,
            clarityChange: -5,
            traitScores: { resilience: 5, reactivity: 15 },
            feedback: 'Merespon saat emosi memuncak seringkali memperkeruh suasana dan memicu penyesalan.',
            learningPoint: 'Beri jeda 10 menit agar otak rasionalmu kembali mengambil kendali.',
          },
          {
            id: 'c3',
            text: 'Bercerita kepada satu sahabat dekat yang kamu percaya untuk memvalidasi perasaanmu.',
            tag: 'Penyalur Sehat',
            energyChange: 5,
            clarityChange: 10,
            traitScores: { resilience: 12, socialSupport: 12 },
            feedback: 'Mencari tempat aman untuk meluapkan unek-unek membantu menstabilkan detak jantung.',
            learningPoint: 'Membagikan rasa sakit kepada orang tepat meredakan beban separuhnya.',
          },
        ],
      },
      {
        id: 'r1_s3',
        order: 3,
        situation:
          'Saat scrolling media sosial larut malam, kamu melihat feed teman sekelas yang memenangkan lomba dan liburan mewah. Kamu merasa hampa dan tertinggal jauh. Emosi apa ini?',
        contextBanner: 'Skenario 3: Perbandingan Sosial & FOMO',
        illustration: require('../../assets/games/emotion/soal3.png'),
        choices: [
          {
            id: 'c1',
            text: 'Mengakui rasa iri itu wajar, lalu menutup aplikasi dan mengingat kembali hal-hal kecil yang kamu syukuri hari ini.',
            tag: 'Self-Compassion',
            energyChange: 10,
            clarityChange: 15,
            traitScores: { resilience: 15, mindfulness: 12 },
            feedback: 'Kamu mengenali emosi tanpa menghakimi diri sendiri (Non-judgmental awareness).',
            learningPoint: 'Media sosial adalah highlight reel orang lain, bukan tolak ukur kecepatan hidupmu.',
          },
          {
            id: 'c2',
            text: 'Terus scrolling berjam-jam sambil membandingkan kekurangan dirimu dengan pencapaian mereka.',
            tag: 'Spiral Perbandingan',
            energyChange: -20,
            clarityChange: -10,
            traitScores: { resilience: 5, rumination: 15 },
            feedback: 'Spiral perbandingan ini mengikis harga diri dan mengganggu kualitas tidur malammu.',
            learningPoint: 'Membandingkan titik awalmu dengan titik puncak orang lain tidak pernah adil.',
          },
        ],
      },
      {
        id: 'r1_s4',
        order: 4,
        situation:
          'Nilai ulangan matematika yang sudah kamu pelajari seminggu penuh ternyata jauh di bawah target. Teman sebangkumu mendapat nilai sempurna tanpa banyak belajar. Tindakanmu?',
        contextBanner: 'Skenario 4: Menghadapi Kekecewaan',
        illustration: require('../../assets/games/emotion/soal4.png'),
        choices: [
          {
            id: 'c1',
            text: 'Beri waktu untuk kecewa sejenak, lalu duduk bersama guru atau teman untuk membedah bagian mana yang belum dipahami.',
            tag: 'Evaluasi Konstruktif',
            energyChange: 5,
            clarityChange: 15,
            traitScores: { resilience: 15, problemFocused: 12 },
            feedback: 'Pilihan tangguh! Mengubah kekecewaan menjadi aksi belajar nyata.',
            learningPoint: 'Kegagalan adalah data untuk perbaikan, bukan vonis atas kecerdasanmu.',
          },
          {
            id: 'c2',
            text: 'Menyobek kertas ujian dan memutuskan untuk tidak mau belajar matematika lagi karena merasa sia-sia.',
            tag: 'Keputusasaan Menyerah',
            energyChange: -15,
            clarityChange: -10,
            traitScores: { resilience: 5, avoidance: 15 },
            feedback: 'Reaksi ini wajar saat frustrasi, namun menghambat potensi belajarmu ke depan.',
            learningPoint: 'Otak kita berkembang paling cepat justru saat berusaha mengurai kesalahan.',
          },
        ],
      },
      {
        id: 'r1_s5',
        order: 5,
        situation:
          'Saat sedang berkumpul di kantin bersama teman-teman, ceritamu berulang kali dipotong dan mereka beralih membicarakan topik lain seolah kamu tak terlihat. Bagaimana respon batinmu?',
        contextBanner: 'Skenario 5: Rasa Terabaikan di Lingkungan',
        illustration: require('../../assets/games/emotion/soal5.png'),
        choices: [
          {
            id: 'c1',
            text: 'Menyadari bahwa situasi kantin memang berisik, lalu menunggu momen tenang untuk melanjutkan atau bercerita ke satu teman yang mendengarkan.',
            tag: 'Ketenangan Sosial',
            energyChange: 5,
            clarityChange: 10,
            traitScores: { resilience: 12, stability: 12 },
            feedback: 'Kamu tidak terburu-buru mengambil kesimpulan negatif tentang dirimu sendiri.',
            learningPoint: 'Ketidakpekaan orang lain seringkali bukan karena kebencian, melainkan distraksi situasi.',
          },
          {
            id: 'c2',
            text: 'Langsung pergi meninggalkan meja dengan wajah masam tanpa pamit.',
            tag: 'Menarik Diri Agresif',
            energyChange: -10,
            clarityChange: -5,
            traitScores: { resilience: 5, reactivity: 12 },
            feedback: 'Menarik diri secara tiba-tiba meninggalkan tanda tanya dan kesalahpahaman baru.',
            learningPoint: 'Komunikasi asertif yang tenang jauh lebih ampuh menyampaikan rasa tidak nyamanmu.',
          },
        ],
      },
      {
        id: 'r1_s6',
        order: 6,
        situation:
          'Sahabatmu mengajak pergi main ke mall sepulang sekolah, padahal baterai sosialmu sudah habis dan tubuhmu terasa sangat letih ingin istirahat di rumah. Bagaimana kamu menyampaikannya?',
        contextBanner: 'Skenario 6: Menjaga Batas Energi Diri',
        illustration: require('../../assets/games/emotion/soal6.png'),
        choices: [
          {
            id: 'c1',
            text: '"Mau banget sebenarnya jalan sama kamu, tapi energiku hari ini beneran drop. Kita reschedule ke akhir pekan ya!"',
            tag: 'Asertif & Hangat',
            energyChange: 10,
            clarityChange: 15,
            traitScores: { resilience: 15, boundaries: 15 },
            feedback: 'Sangat sehat! Menolak ajakan tanpa merusak kehangatan hubungan pertemanan.',
            learningPoint: 'Menghormati batas kapasitas tubuh sendiri adalah bentuk pertanggungjawaban tertinggi.',
          },
          {
            id: 'c2',
            text: 'Memaksakan diri ikut karena takut dianggap sombong, meski sepanjang jalan merasa tersiksa dan lelah.',
            tag: 'People Pleasing',
            energyChange: -20,
            clarityChange: -10,
            traitScores: { resilience: 5, peoplePleasing: 15 },
            feedback: 'Mengorbankan diri demi menyenangkan orang lain berujung pada kelelahan batin.',
            learningPoint: 'Sahabat sejati akan selalu memahami saat kamu membutuhkan waktu untuk pulih.',
          },
        ],
      },
      {
        id: 'r1_s7',
        order: 7,
        situation:
          'Teman yang sempat berselisih paham denganmu datang mendekat dan dengan tulus meminta maaf atas perkataan kasarnya tempo hari. Respon hatimu?',
        contextBanner: 'Skenario 7: Rekonsiliasi & Memaafkan',
        illustration: require('../../assets/games/emotion/soal7.png'),
        choices: [
          {
            id: 'c1',
            text: 'Menerima permintaan maafnya dengan lapang dada dan menghargai keberaniannya untuk mengakui kesalahan.',
            tag: 'Keluasan Hati',
            energyChange: 15,
            clarityChange: 15,
            traitScores: { resilience: 15, forgiveness: 15 },
            feedback: 'Memaafkan melepaskan racun kepahitan dari dalam dirimu sendiri.',
            learningPoint: 'Memaafkan bukan berarti melupakan, melainkan memilih damai daripada memelihara luka.',
          },
          {
            id: 'c2',
            text: 'Menolak berbicara dengannya dan berniat menyebarkan kesalahannya ke teman-teman lain.',
            tag: 'Dendam Bertahan',
            energyChange: -15,
            clarityChange: -10,
            traitScores: { resilience: 5, bitterness: 15 },
            feedback: 'Menyimpan amarah membakar diri sendiri perlahan-lahan.',
            learningPoint: 'Keluasan hati membuka ruang untuk hubungan yang lebih dewasa dan kuat.',
          },
        ],
      },
      {
        id: 'r1_s8',
        order: 8,
        situation:
          'Kamu berhasil melewati minggu ujian yang penuh tekanan dengan kepala tegak tanpa menyerah. Bagaimana kamu memberi apresiasi dan kasih sayang pada dirimu sendiri hari ini?',
        contextBanner: 'Skenario 8: Self-Love & Apresiasi Diri',
        illustration: require('../../assets/games/emotion/soal8.png'),
        choices: [
          {
            id: 'c1',
            text: 'Melakukan hal yang membuat rileks: mandi air hangat, mendengarkan musik favorit, dan tidur tanpa beban alarm.',
            tag: 'Pemulihan Utuh',
            energyChange: 15,
            clarityChange: 15,
            traitScores: { resilience: 15, selfCare: 15 },
            feedback: 'Perayaan pemulihan yang indah dan bermakna bagi jiwa dan ragamu.',
            learningPoint: 'Tubuh yang dirawat dengan penuh kasih akan selalu siap menemanimu melangkah lebih jauh.',
          },
          {
            id: 'c2',
            text: 'Langsung memforsir diri memikirkan target berikutnya tanpa memberi jeda bernapas sedetik pun.',
            tag: 'Non-stop Pressure',
            energyChange: -10,
            clarityChange: 5,
            traitScores: { resilience: 8, overdrive: 12 },
            feedback: 'Jangan lupa bahwa jeda istirahat adalah bagian esensial dari siklus pertumbuhan.',
            learningPoint: 'Pohon tidak bisa berbuah lebat jika akarnya tidak pernah diberi waktu menyerap air.',
          },
        ],
      },
    ],
    archetypes: [
      {
        minScore: 195,
        variant: 'senang',
        title: 'Penjelajah Emosi Bijak (The Mindful Explorer)',
        subtitle: 'Memberi Jeda & Merespons Emosi Secara Sadar',
        description:
          'Pilihanmu mencerminkan kebiasaan memberi jeda sejenak saat emosi hadir, memvalidasi perasaan tanpa terburu-buru bereaksi, dan memilih respons yang bijak.',
        superpowers: [
          'Peka mengenali perubahan sinyal tubuh dan emosi',
          'Mampu memberi jeda sebelum merespons situasi menegangkan',
          'Terbiasa mencari sudut pandang yang lebih jernih',
        ],
        growthAreas: [
          'Tetap izinkan diri merasa lelah tanpa harus selalu tampak kuat',
          'Sediakan waktu tenang untuk istirahat pikiran secara rutin',
        ],
        recommendedMissions: [
          'Luangkan 2 menit hening untuk memeriksa apa yang dirasakan tubuh',
          'Tuliskan satu hal yang membuatmu merasa lega hari ini',
        ],
      },
      {
        minScore: 175,
        variant: 'harmoni',
        title: 'Pengamat Rasa (The Emotional Observer)',
        subtitle: 'Mengenali Beragam Spektrum Rasa dalam Keseharian',
        description:
          'Kamu mulai peka mengenali berbagai emosi seperti lelah sosial, cemas, dan kecewa saat menghadapi dinamika sehari-hari.',
        superpowers: [
          'Jujur terhadap perasaan yang sedang dirasakan',
          'Terbuka untuk mendengarkan masukan dan sudut pandang baru',
          'Memiliki rasa ingin tahu untuk memahami diri lebih baik',
        ],
        growthAreas: [
          'Kurangi kebiasaan memutar ulang kekhawatiran berulang kali',
          'Latih pernapasan perlahan saat dada terasa sesak atau deg-degan',
        ],
        recommendedMissions: [
          'Gunakan fitur Teman Mood untuk mencatat suasana hatimu hari ini',
          'Coba latihan pernapasan santai 3 menit saat mulai merasa tegang',
        ],
      },
      {
        minScore: 0,
        variant: 'sedih',
        title: 'Pencari Ruang Teduh (The Self-Care Seeker)',
        subtitle: 'Mendengarkan Sinyal Lelah & Memberi Ruang Istirahat',
        description:
          'Skenario yang kamu lalui mengingatkan pentingnya mendengarkan batas tubuh dan baterai sosial, serta berani mengambil jeda saat merasa lelah.',
        superpowers: [
          'Kepekaan perasaan yang mendalam',
          'Keberanian menyadari kapan tubuh membutuhkan jeda',
        ],
        growthAreas: [
          'Jangan ragu berbagi cerita kepada teman atau orang yang dipercaya',
          'Ingat bahwa beristirahat adalah bagian penting dari merawat diri',
        ],
        recommendedMissions: [
          'Cobalah tidur lebih awal malam ini untuk memulihkan energi tubuh',
          'Luangkan waktu di Teman Cerita jika ada hal yang ingin kamu luapkan',
        ],
      },
    ],
  },

  // ==========================================
  // GAME 3: DIGITAL DILEMMA (DIGITAL WELLBEING)
  // 8 Scenarios (Sesuai Standar Kesejahteraan Digital Remaja)
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
          'Pukul 23.30 malam, saat matamu sudah mengantuk, ponselmu terus bergetar karena obrolan seru di grup pertemanan. Kamu merasa takut ketinggalan obrolan (FOMO). Pilihanmu?',
        contextBanner: 'Skenario 1: Menjaga Kualitas Tidur',
        illustration: require('../../assets/games/digital/digital_soal_1.png'),
        choices: [
          {
            id: 'c1',
            text: 'Mengaktifkan mode "Jangan Ganggu" (Do Not Disturb), menaruh HP jauh dari kasur, dan tidur tepat waktu.',
            tag: 'Disiplin Tidur Sehat',
            energyChange: 15,
            clarityChange: 15,
            traitScores: { digitalDiscipline: 15, selfCare: 15 },
            feedback: 'Keputusan brilian! Tidur berkualitas adalah fondasi kesehatan mental nomor satu.',
            learningPoint: 'Obrolan di grup bisa dibaca besok pagi, namun waktu tidur malam tidak bisa digantikan.',
          },
          {
            id: 'c2',
            text: 'Memaksakan mata tetap terbuka mengikuti obrolan sampai jam 2 pagi meski kepala terasa pusing.',
            tag: 'Korban FOMO',
            energyChange: -20,
            clarityChange: -15,
            traitScores: { digitalDiscipline: 5, fomo: 15 },
            feedback: 'Kurang tidur merusak fokus belajar dan memicu ketidakstabilan mood esok hari.',
            learningPoint: 'FOMO hanyalah ilusi kognitif yang memanipulasi rasa cemasmu.',
          },
        ],
      },
      {
        id: 'rel_s2',
        order: 2,
        situation:
          'Seseorang membuat unggahan tanpa nama (menfess) yang menyindir teman dekatmu dengan tuduhan palsu. Grup mulai ramai membicarakannya. Apa sikapmu?',
        contextBanner: 'Skenario 2: Menyikapi Rumor Maya',
        illustration: require('../../assets/games/digital/digital_soal_2.png'),
        choices: [
          {
            id: 'c1',
            text: 'Tidak ikut menyebarkan, mengajak teman-teman berhenti bergosip, dan menghubungi sahabatmu untuk memberi dukungan mental.',
            tag: 'Pelindung Etis',
            energyChange: 10,
            clarityChange: 15,
            traitScores: { digitalIntegrity: 15, empathy: 15 },
            feedback: 'Integritas digitalmu sangat tinggi! Berani memutus rantai cyberbullying.',
            learningPoint: 'Menolak menjadi penonton bisu adalah wujud nyata kepedulian pertemanan.',
          },
          {
            id: 'c2',
            text: 'Ikut mem-forward postingan ke grup lain untuk bertanya apakah gosip itu benar atau salah.',
            tag: 'Penyebar Tidak Sadar',
            energyChange: -10,
            clarityChange: -10,
            traitScores: { digitalIntegrity: 5, bystander: 12 },
            feedback: 'Meneruskan rumor tanpa konfirmasi justru memperluas dampak luka psikologis korban.',
            learningPoint: 'Saring sebelum sharing adalah prinsip etika digital yang wajib dipegang teguh.',
          },
        ],
      },
      {
        id: 'rel_s3',
        order: 3,
        situation:
          'Teman-teman satu geng bermain game online mengajakmu mabar push rank semalaman sebelum hari ujian dimulai. Mereka bilang "cuma 1 ronde kok". Responmu?',
        contextBanner: 'Skenario 3: Godaan Gaming vs Prioritas',
        illustration: require('../../assets/games/digital/digital_soal_3.png'),
        choices: [
          {
            id: 'c1',
            text: '"Malam ini aku skip dulu ya guys, mau fokus review materi ujian. Besok kelar ujian kita mabar puas-puas!"',
            tag: 'Tegas & Berkomitmen',
            energyChange: 10,
            clarityChange: 15,
            traitScores: { digitalDiscipline: 15, priority: 15 },
            feedback: 'Ketegasan yang sangat keren! Kamu tahu kapan harus bermain dan kapan harus fokus.',
            learningPoint: 'Menunda kesenangan sesaat (delayed gratification) adalah kunci keberhasilan jangka panjang.',
          },
          {
            id: 'c2',
            text: 'Ikut login dan akhirnya kebablasan bermain 5 ronde hingga larut malam.',
            tag: 'Prokrastinasi Digital',
            energyChange: -15,
            clarityChange: -15,
            traitScores: { digitalDiscipline: 5, procrastination: 15 },
            feedback: '"Cuma 1 ronde" adalah jebakan klasik yang mengorbankan kesiapan ujianmu.',
            learningPoint: 'Tetapkan batasan timer sebelum membuka aplikasi hiburan apapun.',
          },
        ],
      },
      {
        id: 'rel_s4',
        order: 4,
        situation:
          'Komentarmu yang berniat baik pada suatu postingan diserang secara agresif oleh netizen asing dengan kata-kata kasar. Jarimu gatal ingin membalas dendam. Langkahmu?',
        contextBanner: 'Skenario 4: Menghadapi Provokasi Netizen',
        illustration: require('../../assets/games/digital/digital_soal_4.png'),
        choices: [
          {
            id: 'c1',
            text: 'Memilih untuk tidak membalas, menghapus komentar jika perlu, lalu memblokir akun yang toksik demi kedamaian pikiran.',
            tag: 'Bijak Emosional',
            energyChange: 10,
            clarityChange: 15,
            traitScores: { digitalDiscipline: 15, emotionalStability: 15 },
            feedback: 'Kedewasaan digital tingkat tinggi! Tidak memberi makan api provokasi di internet.',
            learningPoint: 'Kamu tidak berkewajiban menghadiri setiap perdebatan yang mengundangmu.',
          },
          {
            id: 'c2',
            text: 'Membalas komentarnya dengan kata-kata yang tak kalah pedas dan adu argumen sampai malam.',
            tag: 'Perang Komentar',
            energyChange: -20,
            clarityChange: -15,
            traitScores: { digitalDiscipline: 5, reactivity: 15 },
            feedback: 'Adu argumen di kolom komentar publik hanya membuang energi berhargamu sia-sia.',
            learningPoint: 'Ketenangan batinmu jauh lebih berharga daripada memenangkan debat maya.',
          },
        ],
      },
      {
        id: 'rel_s5',
        order: 5,
        situation:
          'Seseorang meminta password akun media sosialmu dengan alasan "bukti keterbukaan dan rasa percaya dalam pertemanan". Bagaimana caramu meresponnya?',
        contextBanner: 'Skenario 5: Privasi & Keamanan Akun',
        illustration: require('../../assets/games/digital/digital_soal_5.png'),
        choices: [
          {
            id: 'c1',
            text: '"Rasa saling percaya gak diukur dari password akun. Password itu privasi keamanan pribadi masing-masing."',
            tag: 'Batas Privasi Sehat',
            energyChange: 10,
            clarityChange: 15,
            traitScores: { boundaries: 15, assertiveness: 15 },
            feedback: 'Batasan privasi digital yang sangat kuat dan patut diacungi jempol!',
            learningPoint: 'Hubungan yang sehat didasari oleh rasa saling menghormati ruang pribadi.',
          },
          {
            id: 'c2',
            text: 'Memberikannya karena merasa tidak enak dan takut dituduh menyembunyikan sesuatu.',
            tag: 'Kompromi Berbahaya',
            energyChange: -10,
            clarityChange: -10,
            traitScores: { boundaries: 5, peoplePleasing: 15 },
            feedback: 'Menyerahkan kata sandi membuka risiko pelanggaran privasi dan penyalahgunaan data.',
            learningPoint: 'Keamanan digital pribadimu tidak boleh dinegosiasikan demi menyenangkan orang lain.',
          },
        ],
      },
      {
        id: 'rel_s6',
        order: 6,
        situation:
          'Algoritma media sosialmu menampilkan konten yang memuat tanda-tanda keputusasaan mendalam dari seseorang yang kamu kenal di sekolah. Tindakan pertamamu?',
        contextBanner: 'Skenario 6: Kewaspadaan Sosial & Kepedulian',
        illustration: require('../../assets/games/digital/digital_soal_6.png'),
        choices: [
          {
            id: 'c1',
            text: 'Menghubunginya secara pribadi untuk menanyakan kabar, atau memberitahu guru BK / konselor sebaya untuk pendampingan aman.',
            tag: 'Penyelamat Empatik',
            energyChange: 10,
            clarityChange: 15,
            traitScores: { empathy: 15, actionOrientation: 15 },
            feedback: 'Kepekaanmu bisa menyelamatkan nyawa seseorang yang sedang terluka batin.',
            learningPoint: 'Tanda krisis di media sosial adalah panggilan minta tolong yang nyata.',
          },
          {
            id: 'c2',
            text: 'Mengabaikannya dan menganggap ia hanya sedang cari perhatian di medsos.',
            tag: 'Pengabaian Apatis',
            energyChange: -5,
            clarityChange: -5,
            traitScores: { empathy: 5, apathy: 12 },
            feedback: 'Mengabaikan sinyal bahaya memperkecil peluang intervensi dini yang menyelamatkan.',
            learningPoint: 'Lebih baik peduli dan salah duga, daripada abai dan menyesal kemudian.',
          },
        ],
      },
      {
        id: 'rel_s7',
        order: 7,
        situation:
          'Temanmu mengirim pesan "P" berkali-kali dan marah karena kamu tidak membalas chat dalam 10 menit saat kamu sedang makan malam bersama keluarga. Apa yang kamu jelaskan?',
        contextBanner: 'Skenario 7: Ekspektasi Balas Cepat',
        illustration: require('../../assets/games/digital/digital_soal_7.png'),
        choices: [
          {
            id: 'c1',
            text: '"Maaf ya tadi aku lagi makan malam bareng keluarga tanpa pegang HP. Kalau ada hal penting yang darurat, bisa telepon langsung."',
            tag: 'Komunikasi Real-Life',
            energyChange: 10,
            clarityChange: 15,
            traitScores: { assertiveness: 15, presence: 15 },
            feedback: 'Kamu menghargai kehadiran nyata di dunia fisik tanpa mengabaikan teman.',
            learningPoint: 'Kita berhak menikmati momen offline tanpa rasa bersalah harus selalu online 24/7.',
          },
          {
            id: 'c2',
            text: 'Meminta maaf berulang kali sambil panik dan merasa bersalah sepanjang sisa malam.',
            tag: 'Kecemasan Respons',
            energyChange: -15,
            clarityChange: -10,
            traitScores: { assertiveness: 5, anxiety: 15 },
            feedback: 'Kecemasan balas cepat ini membuatmu terbelenggu notifikasi tanpa henti.',
            learningPoint: 'Balas cepat bukanlah tolok ukur ketulusan kasih sayang dalam persahabatan.',
          },
        ],
      },
      {
        id: 'rel_s8',
        order: 8,
        situation:
          'Kamu menyadari screen time harianmu mencapai 7 jam dan membuat matamu lelah serta sulit fokus belajar. Komitmen digital wellbeing apa yang ingin kamu mulai hari ini?',
        contextBanner: 'Skenario 8: Komitmen Detoks Digital',
        illustration: require('../../assets/games/digital/digital_soal_8.png'),
        choices: [
          {
            id: 'c1',
            text: 'Memasang batasan screen time 1 jam sebelum tidur dan menggantinya dengan membaca buku atau journaling emosi.',
            tag: 'Kebiasaan Seimbang',
            energyChange: 15,
            clarityChange: 15,
            traitScores: { digitalDiscipline: 15, selfCare: 15 },
            feedback: 'Komitmen yang sangat terukur dan realistis untuk meningkatkan kesehatan mentalmu!',
            learningPoint: 'Mengatur jarak dengan gawai memberi ruang bagi pikiranmu untuk bernapas lega.',
          },
          {
            id: 'c2',
            text: 'Menghapus semua akun media sosial secara ekstrem hanya untuk mengunduhnya kembali esok lusa.',
            tag: 'Ekstremisme Sementara',
            energyChange: -5,
            clarityChange: 5,
            traitScores: { digitalDiscipline: 8, inconsistency: 12 },
            feedback: 'Langkah ekstrem seringkali tidak bertahan lama. Mulailah dari langkah bertahap yang konsisten.',
            learningPoint: 'Kunci kebiasaan sehat adalah keberlanjutan (sustainability), bukan aksi drastis sesaat.',
          },
        ],
      },
    ],
    archetypes: [
      {
        minScore: 205,
        variant: 'senang',
        title: 'Master Navigasi Digital (Digital Zen Master)',
        subtitle: 'Keseimbangan Sehat antara Dunia Nyata & Maya',
        description:
          'Kamu memahami batasan sehat dalam penggunaan gawai: memprioritaskan istirahat tidur, menjaga privasi, dan berinteraksi online secara bijak.',
        superpowers: [
          'Mampu menyaring notifikasi dan menghindari jebakan FOMO',
          'Konsisten menjaga batasan privasi dan waktu istirahat',
          'Menjaga etika komunikasi dan empati di ruang digital',
        ],
        growthAreas: [
          'Bagikan kebiasaan digital sehatmu kepada teman sebaya',
        ],
        recommendedMissions: [
          'Ajak temanmu berbincang santai tanpa memegang ponsel saat istirahat',
        ],
      },
      {
        minScore: 180,
        variant: 'harmoni',
        title: 'Penjelajah Sadar (Mindful Netizen)',
        subtitle: 'Kesadaran Batasan Digital yang Terus Bertumbuh',
        description:
          'Kamu menyadari dampak waktu layar dan perbandingan sosial di media sosial, serta berusaha menjaga interaksi daring tetap positif.',
        superpowers: [
          'Peka saat mulai merasa lelah atau jenuh scrolling gawai',
          'Menghargai etika pertemanan di media sosial',
        ],
        growthAreas: [
          'Biasakan menjauhkan ponsel menjelang jam tidur malam',
        ],
        recommendedMissions: [
          'Coba matikan notifikasi media sosial 1 jam sebelum tidur malam ini',
        ],
      },
      {
        minScore: 0,
        variant: 'sedih',
        title: 'Pencari Ketenangan Diri (The Digital Rest Seeker)',
        subtitle: 'Menyadari Pentingnya Jeda Sehat dari Notifikasi',
        description:
          'Skenario ini memberi pengingat berharga bahwa ruang digital terkadang bising, dan meluangkan waktu offline sangat membantu menyegarkan pikiran.',
        superpowers: [
          'Keinginan untuk mencari ketenangan dan kenyamanan batin',
        ],
        growthAreas: [
          'Kurangi konsumsi konten yang memicu rasa cemas atau minder',
        ],
        recommendedMissions: [
          'Letakkan ponsel di luar jangkauan saat sedang makan atau beristirahat',
        ],
      },
    ],
  },
];
