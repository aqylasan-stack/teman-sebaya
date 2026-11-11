import type { ChatMessage } from '../types';

export interface AiResponseResult {
  replyText: string;
  isBreathingPrompt?: boolean;
  isCrisisNotice?: boolean;
  recommendedArticleId?: string;
  recommendedArticleTitle?: string;
  detectedIntent?: string;
}

/**
 * Clean & normalize text for intent matching.
 * Lowercase, removes punctuation, trims excessive spaces.
 */
const normalizeText = (raw: string): string => {
  return raw
    .toLowerCase()
    .replace(/[,.!?~`@#$%^&*()_\-+=[\]{}|\\:;"'<>/]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

/**
 * Extracts a friendly first name from the user's pseudonym / name.
 * e.g., "Anya Sebaya" -> "Anya"
 */
const extractFirstName = (pseudonym?: string): string => {
  if (!pseudonym) return '';
  const clean = pseudonym.trim();
  // If the user name is just "Teman" or generic, return empty so we use natural pronouns
  if (clean.toLowerCase() === 'teman' || clean.toLowerCase() === 'kamu') return '';
  return clean.split(' ')[0];
};

/**
 * Checks if a string is gibberish, keyboard smash, or repeating characters.
 * e.g., "asdfghjkl", "asdasdasd", "qwertyuiop", "zzzzzzz"
 */
const isGibberishOrKeyboardSmash = (raw: string): boolean => {
  const text = raw.trim().toLowerCase();
  if (text.length < 5) return false;

  // Repeating character 4+ times (e.g. "aaaaa", "zzzzzz")
  if (/(.)\1{3,}/.test(text)) {
    // If it's laughter like "hahahaha" or "wkwkwk", handled separately
    if (/^(ha|he|wk|wk|xi|hi|lo|hu)+/i.test(text)) return false;
    return true;
  }

  // Common keyboard smash sequences
  const smashPatterns = [
    'asdf',
    'fdsa',
    'hjkl',
    'lkjh',
    'qwerty',
    'ytrewq',
    'zxcv',
    'vcxz',
    'asdasd',
    'dasdas',
  ];
  if (smashPatterns.some((pattern) => text.includes(pattern))) {
    return true;
  }

  // Very high consonant-to-vowel ratio in a word >= 6 letters without common vowels
  const words = text.split(/\s+/);
  for (const word of words) {
    if (word.length >= 7) {
      const vowelCount = (word.match(/[aeiou]/gi) || []).length;
      if (vowelCount === 0 || vowelCount / word.length < 0.15) {
        return true;
      }
    }
  }

  return false;
};

/**
 * Checks if the user is spamming the exact same message repeatedly.
 */
const countConsecutiveIdentical = (
  history: ChatMessage[],
  currentNormalized: string,
  rawCurrentText: string
): number => {
  const userMessages = history.filter((m) => m.sender === 'user');
  if (userMessages.length === 0) return 1;

  const lastMsg = history[history.length - 1];
  const isCurrentAlreadyInHistory =
    lastMsg &&
    lastMsg.sender === 'user' &&
    (lastMsg.text === rawCurrentText || normalizeText(lastMsg.text) === currentNormalized);

  let consecutive = 0;
  for (let i = userMessages.length - 1; i >= 0; i--) {
    if (normalizeText(userMessages[i].text) === currentNormalized) {
      consecutive++;
    } else {
      break;
    }
  }

  return isCurrentAlreadyInHistory ? consecutive : consecutive + 1;
};

/**
 * Thoriq Conversational AI Engine for Teman Akses
 * Offline-first, context-aware rule-and-intent system designed for
 * teen companion interactions, safeguarding, and educational guidance.
 */
export const generateAiChatResponse = (
  userText: string,
  history: ChatMessage[],
  pseudonym?: string
): AiResponseResult => {
  const rawText = userText.trim();
  const text = normalizeText(rawText);
  const firstName = extractFirstName(pseudonym);
  const nameSalutation = firstName ? ` ${firstName}` : '';

  // Extract history context
  // AppContext appends the current user message before calling generateAiChatResponse.
  const aiMessages = history.filter((m) => m.sender === 'ai');
  const lastAiMessage =
    aiMessages.length > 0 ? aiMessages[aiMessages.length - 1].text.toLowerCase() : '';
  const hasPriorUserTurn = history.some(
    (m, idx) => m.sender === 'user' && (idx < history.length - 1 || m.text !== rawText)
  );
  const isFirstExchange = !hasPriorUserTurn;

  // =========================================================================
  // 1. SAFETY & CRISIS PROTOCOL (Highest Priority - Never Overridden)
  // =========================================================================
  const crisisKeywords = [
    'mati',
    'bunuh diri',
    'mengakhiri hidup',
    'melukai diri',
    'self harm',
    'sayat',
    'tak sanggup hidup',
    'nggak sanggup hidup',
    'gak sanggup hidup',
    'mau mati',
    'pengen mati',
    'capek hidup',
    'ingin hilang',
    'ga ada gunanya hidup',
    'gak ada gunanya hidup',
    'menghabisi nyawa',
  ];

  if (crisisKeywords.some((kw) => text.includes(kw))) {
    const crisisGreeting = firstName ? `${firstName}, ` : '';
    return {
      replyText:
        `${crisisGreeting}aku mendengar betapa berat dan melelahkannya situasi yang kamu hadapi saat ini. Keberadaan dan keselamatanmu sangatlah berharga.\n\nSebagai asisten digital, Thoriq memiliki keterbatasan dan tidak bisa memberikan pendampingan medis langsung di saat darurat. Tolong jangan lalui situasi ini sendirian ya.\n\nSegera hubungi orang dewasa tepercaya di sekitarmu, atau hubungi layanan bantuan darurat 24 jam gratis SEJIWA (119 Ext 8). Kamu juga bisa langsung menekan tombol bantuan darurat di bawah ini:`,
      isCrisisNotice: true,
      detectedIntent: 'crisis_safety',
    };
  }

  // =========================================================================
  // 2. CONSECUTIVE REPETITION & SPAM HANDLING
  // =========================================================================
  const repeatCount = countConsecutiveIdentical(history, text, rawText);

  if (repeatCount >= 3) {
    return {
      replyText:
        'Aku masih menyimak kok, tapi sepertinya pesanmu terkirim berulang kali. Coba ceritakan apa yang sebenarnya lagi kamu rasakan atau pikirkan ya.',
      detectedIntent: 'spam_repetition_high',
    };
  }

  if (repeatCount === 2 && text.length > 0) {
    return {
      replyText:
        'Pesanmu masih sama nih. Ada hal spesifik yang ingin kamu bicarakan bareng Thoriq?',
      detectedIntent: 'spam_repetition_low',
    };
  }

  // Laughter spam (e.g. "HAHAHAHAHA", "wkwkwkwk", "xixixi")
  const cleanSpam = text.replace(/\s+/g, '');
  if (
    /^(?:ha){2,}$|^(?:he){2,}$|^(?:hi){2,}$|^(?:xi){2,}$|^[wk]{3,}$|^(?:hu){2,}$|^l+o+l+$|^lma+o+$/i.test(
      cleanSpam
    ) ||
    text.includes('hahaha') ||
    text.includes('wkwkwk')
  ) {
    return {
      replyText: 'Wah, lagi ada yang lucu banget nih? 😄 Mau berbagi ceritanya?',
      detectedIntent: 'spam_laughter',
    };
  }

  // Gibberish / keyboard smash (e.g. "asdfghjkl", "asdasdasd")
  if (isGibberishOrKeyboardSmash(rawText)) {
    return {
      replyText:
        'Hehe, sepertinya pesannya belum terbaca jelas nih 😅 Bisa coba tulis ulang dengan kalimat lain?',
      detectedIntent: 'unclear_gibberish',
    };
  }

  // Message too short to discern meaning (1-2 non-meaningful characters)
  if (text.length <= 1 && !['y', 'g', 'p'].includes(text)) {
    return {
      replyText: 'Aku belum menangkap maksud pesanmu. Coba ceritakan sedikit, ya.',
      detectedIntent: 'unclear_too_short',
    };
  }

  // =========================================================================
  // 3. PROFANITY & AGGRESSION HANDLING
  // =========================================================================
  // A. Insults directed directly at Thoriq / chatbot
  const botInsults = [
    'lu bego',
    'lu bodoh',
    'bot bego',
    'bot bodoh',
    'kamu bodoh',
    'kamu bego',
    'thoriq bego',
    'thoriq bodoh',
    'ga guna',
    'gak guna',
    'nggak guna',
    'lu tolol',
    'kamu tolol',
    'bot tolol',
    'lu payah',
    'jelek banget',
  ];

  if (botInsults.some((insult) => text.includes(insult))) {
    return {
      replyText:
        'Hehe, sepertinya ada yang bikin kamu kesal 😅 Bagian mana dari jawabanku yang menurutmu kurang tepat?',
      detectedIntent: 'bot_insult',
    };
  }

  // B. Teen slang curse words used as expression of intense frustration
  const frustrationCurses = [
    'anjir',
    'anjing',
    'bangsat',
    'babi',
    'tai',
    'sialan',
    'brengsek',
    'kampret',
    'bego',
    'tolol',
    'kesel banget',
    'kesel bgt',
    'muak banget',
    'capek bgt',
  ];

  if (frustrationCurses.some((curse) => text.includes(curse))) {
    return {
      replyText:
        'Wah, kedengarannya kamu lagi benar-benar kesal atau frustrasi. Ada sesuatu yang baru saja terjadi?',
      detectedIntent: 'frustration_expression',
    };
  }

  // =========================================================================
  // 4. MULTI-TURN CONVERSATION CONTEXT (Linking previous interactions)
  // =========================================================================

  // A. Follow-up to relaxation/breathing invitation
  if (
    lastAiMessage.includes('latihan pernapasan') ||
    lastAiMessage.includes('teknik relaksasi napas') ||
    lastAiMessage.includes('rilekskan badan')
  ) {
    if (
      text === 'iya' ||
      text === 'ya' ||
      text === 'mau' ||
      text === 'boleh' ||
      text === 'coba' ||
      text.includes('mau coba') ||
      text.includes('boleh deh') ||
      text.includes('yuk')
    ) {
      return {
        replyText:
          'Bagus, yuk kita rilekskan badan dulu sebentar. Ikuti ritme pernapasan 4-4-4 di bawah ini secara perlahan ya: tarik napas pelan... tahan... lalu hembuskan.',
        isBreathingPrompt: true,
        detectedIntent: 'breathing_accept',
      };
    }
    if (
      text === 'enggak' ||
      text === 'nggak' ||
      text === 'ga' ||
      text === 'ngga' ||
      text === 'tidak' ||
      text === 'nanti' ||
      text.includes('nggak mau') ||
      text.includes('nanti aja')
    ) {
      return {
        replyText:
          'Oke, santai saja! Nggak perlu dipaksakan kok. Mau kita ngobrol tentang hal lain?',
        detectedIntent: 'breathing_decline',
      };
    }
  }

  // B. Follow-up to school task questions ("tugas apa yang paling bikin tertekan?")
  if (
    lastAiMessage.includes('tugas apa yang paling') ||
    lastAiMessage.includes('bagian mana yang paling membuatmu kewalahan')
  ) {
    return {
      replyText:
        'Wah, pasti bikin kewalahan 😟 Coba cicil satu bagian kecil dulu selama 15 menit, jangan pikirkan semuanya sekaligus. Mau coba tarik napas sebentar biar kepalamu lebih rileks?',
      isBreathingPrompt: true,
      detectedIntent: 'school_followup_specific',
    };
  }

  // C. Follow-up to fatigue inquiry ("apa yang bikin kamu merasa secapek itu?")
  if (lastAiMessage.includes('apa yang bikin kamu merasa secapek itu')) {
    if (
      text.includes('tugas') ||
      text.includes('sekolah') ||
      text.includes('pr') ||
      text.includes('belajar')
    ) {
      return {
        replyText:
          'Tugas sekolah lagi menumpuk ya? Dari semua tugas itu, ada yang paling mendesak harus diselesaikan dulu?',
        detectedIntent: 'school_fatigue_dialogue',
      };
    }
  }

  // D. Follow-up when user answers short confirmations ("iya", "banyak banget", "banget")
  if (
    text === 'iya' ||
    text === 'iya banyak banget' ||
    text === 'banyak banget' ||
    text === 'banget' ||
    text.includes('banyak banget')
  ) {
    if (lastAiMessage.includes('menumpuk')) {
      return {
        replyText:
          'Wah, pasti bikin kewalahan. Dari semua tugas itu, ada yang paling mendesak harus diselesaikan dulu?',
        detectedIntent: 'task_overwhelm_followup',
      };
    }
  }

  // =========================================================================
  // 5. GRATITUDE & POSITIVE RESOLUTION
  // =========================================================================
  const gratitudeKeywords = [
    'terima kasih',
    'makasih',
    'makasi',
    'thanks',
    'tengkyu',
    'makasih ya',
    'udah mendingan',
    'sudah lebih baik',
    'lebih tenang',
    'merasa lega',
    'udah lega',
    'udah enakan',
    'plong',
  ];

  if (gratitudeKeywords.some((kw) => text.includes(kw))) {
    return {
      replyText:
        'Sama-sama! Senang banget dengarnya kalau kamu sudah merasa lebih plong 😄 Kalau nanti butuh teman ngobrol lagi, Thoriq selalu ada di sini ya.',
      detectedIntent: 'gratitude_positive',
    };
  }

  // =========================================================================
  // 6. EMOTIONAL SUPPORT (School, Fatigue, Sadness, Failure, Conflict)
  // =========================================================================

  // A. Failure / Fear of disappointing others
  if (
    text.includes('gagal') ||
    text.includes('takut gagal') ||
    text.includes('mengecewakan') ||
    text.includes('ngecewain') ||
    text.includes('beban') ||
    text.includes('nggak berguna') ||
    text.includes('ga berguna')
  ) {
    return {
      replyText:
        'Pasti berat ya kalau terus-menerus merasa memikul ekspektasi orang lain. Ingat ya, kamu sudah berusaha sebaik mungkin, dan satu kegagalan bukan berarti kamu gagal seutuhnya. Apa yang lagi bikin kamu merasa seperti itu?',
      detectedIntent: 'emotional_failure_fear',
    };
  }

  // B. School & Academic Overwhelm
  if (
    text.includes('tugas sekolah') ||
    text.includes('tugas') ||
    text.includes('sekolah') ||
    text.includes('ujian') ||
    text.includes('ulangan') ||
    text.includes('pr') ||
    text.includes('pusing belajar')
  ) {
    return {
      replyText:
        'Tugas sekolah atau ujian lagi bikin pusing ya? Kadang memang berat kalau semuanya datang barengan. Mau cerita tugas apa yang paling bikin kamu tertekan sekarang?',
      recommendedArticleId: 'art_007',
      recommendedArticleTitle: 'Manajemen Waktu Pelajar: Metode Matriks Eisenhower agar Tidak Menumpuk Tugas',
      detectedIntent: 'emotional_school_stress',
    };
  }

  // C. Fatigue & Low Social Battery
  if (
    text.includes('capek') ||
    text.includes('lelah') ||
    text.includes('baterai sosial') ||
    text.includes('drop') ||
    text.includes('habis energi') ||
    text.includes('letih')
  ) {
    return {
      replyText:
        'Sepertinya hari ini cukup melelahkan, ya 😟 Mau cerita apa yang bikin kamu merasa secapek itu?',
      detectedIntent: 'emotional_fatigue',
    };
  }

  // D. Sadness & Loneliness
  if (
    text.includes('sedih') ||
    text.includes('kesepian') ||
    text.includes('sendiri') ||
    text.includes('nangis') ||
    text.includes('hampa') ||
    text.includes('kecewa')
  ) {
    return {
      replyText:
        'Pasti nggak nyaman rasanya memendam perasaan sedih atau kesepian sendirian. Ruang ini aman kok buat kamu meluapkan unek-unek. Ada kejadian tertentu yang lagi mengganjal di hatimu?',
      detectedIntent: 'emotional_sadness',
    };
  }

  // E. Friendship Conflict
  if (
    (text.includes('teman') || text.includes('sahabat') || text.includes('kawan')) &&
    (text.includes('berantem') ||
      text.includes('marah') ||
      text.includes('sindir') ||
      text.includes('musuhan') ||
      text.includes('dijauhin') ||
      text.includes('masalah'))
  ) {
    return {
      replyText:
        'Masalah sama teman memang sering bikin kepikiran seharian dan serba salah. Ada kejadian tertentu yang bikin hubungan kalian jadi renggang?',
      recommendedArticleId: 'art_002',
      recommendedArticleTitle: 'Batasan Asertif dalam Pertemanan',
      detectedIntent: 'emotional_friend_conflict',
    };
  }

  // F. Confusion about emotions (Emotion awareness)
  if (
    text.includes('campur aduk') ||
    text.includes('bingung sebenarnya') ||
    text.includes('nggak tahu rasa apa') ||
    text.includes('ga tau rasa apa') ||
    text.includes('perasaanku aneh') ||
    (text.includes('bingung') && text.includes('perasaan'))
  ) {
    return {
      replyText:
        'Nggak apa-apa kalau kamu belum bisa menamainya sekarang. Emosi kita memang sering datang berlapis-lapis dan membingungkan. Akhir-akhir ini, kamu lebih sering merasa gelisah, sedih, kesal, atau justru kehilangan semangat?',
      recommendedArticleId: 'art_005',
      recommendedArticleTitle: 'Name That Feeling: Mengapa Menamai Emosi Membantu Menenangkannya?',
      detectedIntent: 'emotion_awareness',
    };
  }

  // =========================================================================
  // 7. MENTAL HEALTH EDUCATION (Concise, teen-friendly, no essays)
  // =========================================================================

  // A. "Apa bedanya sedih dan depresi?"
  if (
    (text.includes('beda') || text.includes('perbedaan')) &&
    text.includes('sedih') &&
    text.includes('depresi')
  ) {
    return {
      replyText:
        'Bedanya ada di durasi dan dampaknya. Sedih itu emosi wajar yang biasanya mereda saat situasinya membaik. Sedangkan depresi itu rasa hampa dan lelah mendalam yang berlangsung berminggu-minggu sampai mengganggu aktivitas harian.\n\nTapi ingat ya, diagnosis medis cuma bisa ditentukan oleh psikolog atau psikiater profesional.',
      detectedIntent: 'edu_sad_vs_depression',
    };
  }

  // B. "Apa itu kesehatan mental?"
  if (
    text.includes('apa itu kesehatan mental') ||
    text.includes('kesehatan mental itu apa') ||
    text.includes('belajar tentang kesehatan mental') ||
    text.includes('arti kesehatan mental')
  ) {
    return {
      replyText:
        'Secara sederhana, kesehatan mental itu tentang gimana kita berpikir, merasakan, dan menyikapi hari-hari kita. Sama seperti tubuh fisik yang bisa lelah atau flu, pikiran dan emosi kita juga butuh dirawat supaya tetap seimbang.',
      recommendedArticleId: 'art_001',
      recommendedArticleTitle: 'Mengenal Burnout Sekolah dan Tanda Tubuhmu Butuh Istirahat',
      detectedIntent: 'edu_mental_health',
    };
  }

  // C. "Apa itu kecemasan / anxiety?"
  if (text.includes('apa itu kecemasan') || text.includes('apa itu anxiety')) {
    return {
      replyText:
        'Kecemasan itu sebenarnya alarm alami tubuh saat merasa ada ancaman. Tapi kalau alarmnya terus bunyi kencang padahal situasinya aman, tubuh kita jadi gampang tegang dan overthinking.',
      recommendedArticleId: 'art_005',
      recommendedArticleTitle: 'Name That Feeling: Mengapa Menamai Emosi Membantu Menenangkannya?',
      detectedIntent: 'edu_anxiety',
    };
  }

  // D. "Bagaimana cara menjaga kesehatan mental?"
  if (
    text.includes('menjaga kesehatan mental') ||
    text.includes('merawat kesehatan mental')
  ) {
    return {
      replyText:
        'Kuncinya ada di hal-hal sederhana: tidur cukup, beri jeda dari media sosial saat lelah, jujur sama perasaan sendiri, dan jangan ragu cari teman cerita saat beban terasa berat.',
      detectedIntent: 'edu_maintenance',
    };
  }

  // =========================================================================
  // 8. COPING SUGGESTIONS (Practical, Contextual, Varied)
  // =========================================================================

  // A. Trouble sleeping due to overthinking
  if (
    text.includes('sulit tidur') ||
    text.includes('susah tidur') ||
    text.includes('insomnia') ||
    text.includes('begadang') ||
    (text.includes('tidur') && text.includes('pikiran'))
  ) {
    return {
      replyText:
        'Kalau sulit tidur karena kepala penuh, coba letakkan ponsel agak jauh, redupkan lampu, dan tulis apa saja yang mengganjal di selembar kertas biar nggak muter-muter di kepala. Mau Thoriq temani coba teknik relaksasi napas singkat?',
      isBreathingPrompt: true,
      detectedIntent: 'coping_sleep',
    };
  }

  // B. General Calming & Stress Management (Practical non-breathing first)
  if (
    text.includes('cara mengatasi stres') ||
    text.includes('cara mengelola stres') ||
    text.includes('gimana biar tenang') ||
    text.includes('supaya lebih tenang') ||
    text.includes('cara tenang') ||
    text.includes('tips tenang')
  ) {
    return {
      replyText:
        'Coba berhenti sejenak dari apa pun yang lagi kamu kerjakan. Minum segelas air putih perlahan, lalu beri jeda beberapa menit untuk meluruskan punggung. Tubuh yang rileks bakal bantu pikiranmu melihat masalah dengan lebih jernih.',
      detectedIntent: 'coping_calm_practical',
    };
  }

  // C. Explicit breathing request
  if (
    text.includes('latihan napas') ||
    text.includes('relaksasi napas') ||
    text.includes('tarik napas') ||
    text.includes('pernapasan')
  ) {
    return {
      replyText:
        'Yuk kita tenangkan detak jantung dan pikiran bersama. Ikuti ritme pernapasan terpandu di bawah ini ya:',
      isBreathingPrompt: true,
      detectedIntent: 'coping_breathing_explicit',
    };
  }

  // =========================================================================
  // 9. GREETING INTENT (Short, natural, context-aware)
  // =========================================================================
  const greetingKeywords = [
    'halo',
    'hai',
    'hei',
    'hello',
    'hi',
    'pagi',
    'siang',
    'sore',
    'malam',
    'selamat pagi',
    'selamat siang',
    'selamat sore',
    'selamat malam',
    'assalamualaikum',
    'apa kabar',
  ];

  if (
    greetingKeywords.some(
      (kw) => text === kw || text.startsWith(`${kw} `) || text.includes(kw)
    ) &&
    text.length <= 35
  ) {
    if (isFirstExchange) {
      return {
        replyText: firstName
          ? `Hai ${firstName}! Lagi ingin ngobrol tentang sesuatu hari ini?`
          : 'Hai! Lagi ingin ngobrol tentang sesuatu hari ini?',
        detectedIntent: 'greeting_initial',
      };
    } else {
      return {
        replyText: firstName
          ? `Hai lagi ${firstName}! Ada hal lain yang ingin kamu bahas atau tanyakan?`
          : 'Hai lagi! Ada hal lain yang ingin kamu bahas atau tanyakan?',
        detectedIntent: 'greeting_continuous',
      };
    }
  }

  // =========================================================================
  // 10. SHORT FILLERS & GENERAL CONVERSATIONAL FALLBACK
  // =========================================================================
  if (['hmm', 'hm', 'oke', 'ok', 'iya deh', 'yaudah', 'ya udah'].includes(text)) {
    return {
      replyText:
        'Aku menyimakmu kok. Santai saja ya, kalau ada hal lain yang ingin kamu ceritakan, Thoriq siap mendengarkan.',
      detectedIntent: 'short_filler_acknowledgment',
    };
  }

  // General natural empathetic fallback
  return {
    replyText:
      'Aku menyimak apa yang kamu sampaikan. Kalau boleh tahu lebih lanjut, ada hal spesifik yang lagi bikin kamu kepikiran saat ini?',
    detectedIntent: 'general_conversational_fallback',
  };
};
