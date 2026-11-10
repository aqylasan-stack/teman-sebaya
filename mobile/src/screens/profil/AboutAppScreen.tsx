import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Platform } from 'react-native';
import {
  ShieldCheck,
  Lock,
  HeartHandshake,
  PhoneCall,
  Heart,
  MessageCircle,
  BookOpen,
  Compass,
  CheckCircle2,
} from 'lucide-react-native';
import { colors, spacing, borderRadius } from '../../theme';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { ContextualHeader } from '../../components/layout/ContextualHeader';
import { Card } from '../../components/common/Card';
import { useApp } from '../../state/AppContext';

export const AboutAppScreen: React.FC = () => {
  const { goBack, openCrisisModal, switchTab } = useApp();

  const corePillars = [
    {
      id: 'stigma_free',
      title: '100% Bebas Stigma & Kerahasiaan',
      description:
        'Ruang bercerita yang inklusif, suportif, dan bebas penghakiman bagi setiap remaja.',
      icon: ShieldCheck,
      color: colors.brandGreen[600],
      bgColor: colors.brandGreen[50],
    },
    {
      id: 'encryption',
      title: 'Data Terenkripsi & Mode Anonim',
      description:
        'Catatan emosi dan riwayat obrolan aman terlindungi tanpa membagikan identitas aslimu.',
      icon: Lock,
      color: colors.brandBlue[600],
      bgColor: colors.brandBlue[50],
    },
    {
      id: 'pikr_collaboration',
      title: 'Didukung Binaan PIK-R & BKKBN',
      description:
        'Materi literasi dan pendampingan terstandarisasi untuk remaja Generasi Berencana (GenRe).',
      icon: HeartHandshake,
      color: colors.accentPeach[500],
      bgColor: colors.accentPeach[50],
    },
    {
      id: 'crisis_integration',
      title: 'Hotline Krisis SEJIWA 119 Ext 8',
      description:
        'Akses instan ke bantuan medis dan psikolog profesional saat menghadapi kondisi gawat darurat.',
      icon: PhoneCall,
      color: colors.crisis.dangerBorder,
      bgColor: colors.crisis.dangerBg,
      action: openCrisisModal,
    },
  ];

  const features = [
    {
      title: 'Teman Mood',
      desc: 'Check-in suasana hati harian, identifikasi subemosi, dan grafik refleksi.',
      icon: Heart,
      tab: 'mood' as const,
    },
    {
      title: 'Teman Cerita',
      desc: 'Konseling sebaya terenkripsi bersama teman sebaya dan konselor sebaya terlatih.',
      icon: MessageCircle,
      tab: 'cerita' as const,
    },
    {
      title: 'Teman Belajar',
      desc: 'Artikel psikoedukasi, regulasi stres, literasi KRR, dan panduan tumbuh kembang.',
      icon: BookOpen,
      tab: 'belajar' as const,
    },
    {
      title: 'Teman Bermain',
      desc: 'Butterfly Hug, latihan pernapasan terpandu, dan mini games relaksasi pikiran.',
      icon: Compass,
      tab: 'beranda' as const,
    },
  ];

  return (
    <ScreenContainer
      header={<ContextualHeader title="Tentang TEMAN SEBAYA" onBack={goBack} />}
    >
      <View style={styles.container}>
        {/* ============================================================== */}
        {/* 1. BRAND HERO SECTION                                          */}
        {/* ============================================================== */}
        <View style={styles.heroSection}>
          <View style={styles.logoBadge}>
            <Image
              source={require('../../../assets/branding/logo.png')}
              style={styles.logoImg}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.appTitle}>TEMAN SEBAYA</Text>
          <Text style={styles.appTagline}>
            Ruang Aman Konseling & Literasi Remaja Indonesia
          </Text>
          <View style={styles.versionPill}>
            <Text style={styles.versionPillText}>
              Versi 1.0.0 (Release 2026.11)
            </Text>
          </View>
        </View>

        {/* ============================================================== */}
        {/* 2. ABOUT DESCRIPTION CARD                                      */}
        {/* ============================================================== */}
        <Card variant="surface" style={styles.descriptionCard}>
          <Text style={styles.sectionHeading}>Tentang Platform</Text>
          <Text style={styles.bodyParagraph}>
            TEMAN SEBAYA adalah platform kesehatan mental digital ramah remaja yang
            dirancang untuk mendampingi generasi muda melewati masa pubertas,
            tekanan emosional, pertemanan, dan tantangan hidup sehari-hari.
          </Text>
          <Text style={styles.bodyParagraph}>
            Bekerja sama erat dengan kelompok Pusat Informasi dan Konseling Remaja
            (PIK-R) binaan BKKBN, kami menyediakan ruang curhat sebaya yang aman,
            beretika, dan sepenuhnya menjaga kerahasiaan identitas pengguna.
          </Text>
        </Card>

        {/* ============================================================== */}
        {/* 3. CORE COMMITMENTS & VALUES                                   */}
        {/* ============================================================== */}
        <View style={styles.sectionWrap}>
          <Text style={styles.sectionHeading}>Komitmen & Nilai Utama</Text>
          <View style={styles.pillarsList}>
            {corePillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <TouchableOpacity
                  key={pillar.id}
                  activeOpacity={pillar.action ? 0.7 : 1}
                  onPress={pillar.action}
                  style={styles.pillarCard}
                >
                  <View
                    style={[
                      styles.pillarIconWrap,
                      { backgroundColor: pillar.bgColor },
                    ]}
                  >
                    <Icon size={20} color={pillar.color} strokeWidth={2.0} />
                  </View>
                  <View style={styles.pillarTextCol}>
                    <Text style={styles.pillarTitle}>{pillar.title}</Text>
                    <Text style={styles.pillarDesc}>{pillar.description}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* ============================================================== */}
        {/* 4. ECOSYSTEM HIGHLIGHTS                                         */}
        {/* ============================================================== */}
        <View style={styles.sectionWrap}>
          <Text style={styles.sectionHeading}>Ekosistem Fitur</Text>
          <View style={styles.featureGrid}>
            {features.map((feat) => {
              const Icon = feat.icon;
              return (
                <TouchableOpacity
                  key={feat.title}
                  activeOpacity={0.7}
                  onPress={() => switchTab(feat.tab)}
                  style={styles.featureCard}
                >
                  <View style={styles.featureIconWrap}>
                    <Icon size={18} color={colors.brandBlue[600]} strokeWidth={2.0} />
                  </View>
                  <Text style={styles.featureTitle}>{feat.title}</Text>
                  <Text style={styles.featureDesc}>{feat.desc}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* ============================================================== */}
        {/* 5. FOOTER & COPYRIGHT                                          */}
        {/* ============================================================== */}
        <View style={styles.footerWrap}>
          <Text style={styles.footerApp}>TEMAN SEBAYA Indonesia</Text>
          <Text style={styles.footerSubtitle}>
            Didedikasikan untuk Generasi Berencana (GenRe) Indonesia
          </Text>
          <Text style={styles.copyrightText}>
            © 2026 Hak Cipta Terpelihara. Ruang Aman Kesehatan Mental Remaja.
          </Text>
        </View>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 4,
    gap: spacing.lg,
    paddingBottom: spacing.xl,
  },

  /* Hero Section */
  heroSection: {
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  logoBadge: {
    width: 64,
    height: 64,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: colors.borderLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  logoImg: {
    width: 44,
    height: 44,
  },
  appTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.textPrimary,
    letterSpacing: 0.5,
  },
  appTagline: {
    fontSize: 12.5,
    fontWeight: '500',
    color: colors.textSecondary,
    marginTop: 4,
    textAlign: 'center',
  },
  versionPill: {
    backgroundColor: colors.brandBlue[50],
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.brandBlue[200],
    marginTop: 10,
  },
  versionPillText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.brandBlue[700],
  },

  /* Description Card */
  descriptionCard: {
    padding: spacing.md,
    gap: 8,
  },
  sectionHeading: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
    letterSpacing: 0.2,
    marginBottom: 6,
  },
  bodyParagraph: {
    fontSize: 13,
    lineHeight: 20,
    color: colors.textSecondary,
  },

  /* Pillars Section */
  sectionWrap: {
    gap: 8,
  },
  pillarsList: {
    gap: 8,
  },
  pillarCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: 14,
    padding: 12,
    gap: 12,
  },
  pillarIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillarTextCol: {
    flex: 1,
  },
  pillarTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  pillarDesc: {
    fontSize: 11.5,
    lineHeight: 16,
    color: colors.textMuted,
  },

  /* Feature Grid */
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  featureCard: {
    width: '48.5%',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: 14,
    padding: 12,
    gap: 4,
  },
  featureIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: colors.brandBlue[50],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  featureTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  featureDesc: {
    fontSize: 11,
    lineHeight: 15,
    color: colors.textMuted,
  },

  /* Footer */
  footerWrap: {
    alignItems: 'center',
    paddingVertical: spacing.md,
    gap: 3,
  },
  footerApp: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  footerSubtitle: {
    fontSize: 11,
    color: colors.textMuted,
    textAlign: 'center',
  },
  copyrightText: {
    fontSize: 10,
    color: colors.textPlaceholder,
    textAlign: 'center',
    marginTop: 4,
  },
});
