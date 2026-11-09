export interface CommunityGroup {
  id: string;
  name: string;
  type: 'PIK-R' | 'Forum GenRe' | 'Aksi Remaja';
  badge: string; // e.g. "Terverifikasi BKKBN", "Mitra Resmi", "Didampingi Konselor"
  description: string;
  memberCount: number;
  meetingSchedule: string;
  isJoined?: boolean;
}

export interface YouthEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  organizer: string;
  quota: string;
  description: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  date: string;
  category: 'Edukasi' | 'Sosialisasi' | 'Kampanye' | 'Komunitas';
  summary: string;
}

