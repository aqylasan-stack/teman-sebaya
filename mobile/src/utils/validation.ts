export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * Daftar kata terlarang (profanity & vulgarity filter)
 * demi menjaga etika, kenyamanan, dan rasa aman pengguna.
 */
const SUBSTRING_BLOCKED_WORDS = [
  // Organ intim & seksualitas eksplisit (Indonesia)
  'kontol',
  'kntl',
  'memek',
  'mmk',
  'jembut',
  'pepek',
  'peler',
  'toket',
  'tetek',
  'ngentot',
  'ngentt',
  'entot',
  'ngewe',
  'kentu',
  'pukimak',
  'kimak',
  'pantek',
  'kampang',
  'bangsat',
  'bgst',
  'bajingan',
  'anjing',
  'anjir',
  'pelacur',
  'jablay',
  'goblok',
  'gblk',
  'tolol',
  'jancok',
  'jancuk',
  'dancok',

  // Bahasa Inggris eksplisit
  'fuck',
  'fck',
  'pussy',
  'cunt',
  'bitch',
  'asshole',
  'nigger',
  'nigga',
  'porno',
  'bokep',
];

const EXACT_OR_TOKEN_BLOCKED_WORDS = [
  'asu',
  'babi',
  'itil',
  'titit',
  'nenen',
  'coli',
  'coly',
  'sange',
  'bugil',
  'lonte',
  'perek',
  'sundal',
  'bego',
  'idiot',
  'bloon',
  'dick',
  'cock',
  'shit',
  'slut',
  'whore',
  'cabul',
  'mesum',
  'rape',
  'perkosa',
  'pedofil',
];

/**
 * Validasi nama panggilan / nama samaran pengguna.
 * Menjamin nama manusiawi dan bermakna:
 * - Minimal 2 karakter, maksimal 25 karakter.
 * - Hanya memuat huruf alfabet, spasi, tanda hubung (-), atau petik (').
 * - Tidak memuat angka, simbol aneh, atau tanda baca (koma, titik koma, dsb).
 * - Wajib memuat huruf vokal agar wajar dilafalkan.
 * - Mencegah keyboard mash / konsonan acak berturut-turut.
 * - Mencegah pengulangan huruf berlebihan.
 * - Menyaring kata kasar, vulgar, seksual, atau tidak etis (profanity filter).
 */
export const validateNickname = (rawName: string): ValidationResult => {
  const trimmed = rawName.trim();

  if (!trimmed) {
    return {
      isValid: false,
      error: 'Nama panggilan tidak boleh kosong.',
    };
  }

  if (trimmed.length < 2) {
    return {
      isValid: false,
      error: 'Nama panggilan minimal 2 karakter.',
    };
  }

  if (trimmed.length > 25) {
    return {
      isValid: false,
      error: 'Nama panggilan maksimal 25 karakter.',
    };
  }

  // 1. Karakter hanya boleh alfabet, spasi, tanda hubung (-), dan petik (')
  const validCharRegex = /^[a-zA-Z\s'-]+$/;
  if (!validCharRegex.test(trimmed)) {
    return {
      isValid: false,
      error: 'Nama hanya boleh menggunakan huruf, spasi, atau tanda hubung.',
    };
  }

  // 2. Tanda baca tidak boleh di awal/akhir atau berurutan
  if (/^['-]|['-]$|\s{2,}|['-]{2,}/.test(trimmed)) {
    return {
      isValid: false,
      error: 'Hindari tanda baca di awal/akhir atau spasi ganda.',
    };
  }

  // 3. Wajib memuat setidaknya satu huruf vokal (a, i, u, e, o, y)
  const hasVowel = /[aeiouyAEIOUY]/.test(trimmed);
  if (!hasVowel) {
    return {
      isValid: false,
      error: 'Nama panggilan harus memuat huruf vokal yang wajar.',
    };
  }

  // 4. Mencegah keyboard mash (5 konsonan berturut-turut tanpa jeda vokal)
  const consecutiveConsonants = /[bcdfghjklmnpqrstvwxzBCDFGHJKLMNPQRSTVWXZ]{5,}/;
  if (consecutiveConsonants.test(trimmed)) {
    return {
      isValid: false,
      error: 'Nama tidak wajar. Hindari pengetikan huruf acak.',
    };
  }

  // 5. Mencegah pengulangan karakter yang sama lebih dari 3 kali berturut-turut
  const repetitiveChar = /(.)\1{3,}/i;
  if (repetitiveChar.test(trimmed)) {
    return {
      isValid: false,
      error: 'Nama tidak wajar. Hindari pengulangan huruf berlebih.',
    };
  }

  // 6. Menyaring kata-kata kasar / tidak etis (Profanity & Vulgarity Filter)
  let normalized = trimmed.toLowerCase();
  normalized = normalized
    .replace(/0/g, 'o')
    .replace(/1/g, 'i')
    .replace(/3/g, 'e')
    .replace(/4/g, 'a')
    .replace(/5/g, 's')
    .replace(/@/g, 'a')
    .replace(/\$/g, 's');

  const condensed = normalized.replace(/[^a-z]/g, '');
  const tokens: string[] = normalized.match(/[a-z]+/g) || [];

  for (const word of SUBSTRING_BLOCKED_WORDS) {
    if (condensed.includes(word)) {
      return {
        isValid: false,
        error: 'Nama tidak pantas atau memuat kata kasar. Mohon gunakan nama yang etis dan sopan.',
      };
    }
  }

  for (const word of EXACT_OR_TOKEN_BLOCKED_WORDS) {
    if (tokens.includes(word) || condensed === word) {
      return {
        isValid: false,
        error: 'Nama tidak pantas atau memuat kata kasar. Mohon gunakan nama yang etis dan sopan.',
      };
    }
  }

  return { isValid: true };
};

