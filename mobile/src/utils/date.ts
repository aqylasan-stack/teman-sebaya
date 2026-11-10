import { MoodEntry, MoodDayStat } from '../types';

/**
 * Membangun array 7 hari (Senin s/d Minggu) untuk minggu kalender yang sedang berjalan.
 * Hari-hari yang belum tiba (masa depan) dijamin kosong (primaryEmotion: undefined).
 */
export const buildCurrentWeekStats = (
  entries: MoodEntry[],
  todayEntry: MoodEntry | null
): MoodDayStat[] => {
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0 = Sun, 1 = Mon, ..., 6 = Sat
  const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  const monday = new Date(now.getFullYear(), now.getMonth(), now.getDate() + diffToMonday);

  const dayNames = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];
  const monthNamesShort = [
    'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun',
    'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des',
  ];

  const all = [...entries];
  if (todayEntry && !all.some((e) => e.id === todayEntry.id)) {
    all.unshift(todayEntry);
  }

  // Awal hari ini (jam 00:00:00) untuk perbandingan masa depan
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();

  return dayNames.map((dayName, idx) => {
    const d = new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + idx);
    const dateString = `${String(d.getDate()).padStart(2, '0')} ${monthNamesShort[d.getMonth()]}`;
    const dateTime = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();

    // Hari yang berada setelah hari ini adalah hari masa depan yang belum terjadi
    const isFuture = dateTime > startOfToday;

    if (isFuture) {
      return {
        dayName,
        dateString,
        primaryEmotion: undefined,
        percentage: 0,
      };
    }

    // Cari catatan mood pada tanggal ini
    const match = all.find((e) => {
      const ed = new Date(e.timestamp);
      return (
        ed.getFullYear() === d.getFullYear() &&
        ed.getMonth() === d.getMonth() &&
        ed.getDate() === d.getDate()
      );
    });

    if (match) {
      return {
        dayName,
        dateString,
        primaryEmotion: match.primaryEmotion,
        secondaryEmotion: match.secondaryEmotions?.[0],
        note: match.note,
        percentage: match.intensity ? match.intensity * 20 : 80,
      };
    }

    // Hari yang sudah lewat tapi tidak memiliki catatan
    return {
      dayName,
      dateString,
      primaryEmotion: undefined,
      percentage: 0,
    };
  });
};
