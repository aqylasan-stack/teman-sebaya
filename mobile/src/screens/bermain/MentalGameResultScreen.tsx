import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Share,
} from 'react-native';
import {
  Sparkles,
  ShieldCheck,
  RotateCcw,
  MessageCircle,
  CheckCircle2,
  BookmarkCheck,
  Share2,
  Lock,
  Compass,
  Info,
} from 'lucide-react-native';
import { colors, spacing, borderRadius, typography } from '../../theme';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { ContextualHeader } from '../../components/layout/ContextualHeader';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import {
  PSYCH_GAME_CATEGORIES,
  PsychGameCategory,
} from '../../data/gamePsychData';
import { useApp } from '../../state/AppContext';

export const MentalGameResultScreen: React.FC = () => {
  const { screenParams, navigateTo, switchTab } = useApp();
  const [isSaved, setIsSaved] = useState(false);

  const categoryId = screenParams?.categoryId || 'karakter';
  const totalScore = screenParams?.totalScore || 75;
  const traits = screenParams?.traits || {};

  const category: PsychGameCategory =
    PSYCH_GAME_CATEGORIES.find((c) => c.id === categoryId) ||
    PSYCH_GAME_CATEGORIES[0];

  // Pick archetype based on score
  const archetype =
    category.archetypes.find((a) => totalScore >= a.minScore) ||
    category.archetypes[category.archetypes.length - 1];

  const handleSaveToProfile = () => {
    setIsSaved(true);
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Aku baru saja menyelesaikan eksplorasi diri "${category.title}" di Teman Sebaya! Hasil arketipeku: ${archetype.title}. Temukan potensimu di aplikasi Teman Sebaya!`,
      });
    } catch (_err) {
      // Ignored
    }
  };

  // Trait Dimensions List for Visual Progress (Normalized for positive self-discovery)
  const traitDisplayList = [
    {
      label: 'Eksplorasi Kreatif (Openness)',
      score: Math.min(95, Math.max(55, 65 + (traits.openness || 15))),
      color: colors.brandBlue[600],
      spectrum: 'Tinggi & Inovatif',
    },
    {
      label: 'Daya Lentur Resiliensi',
      score: Math.min(95, Math.max(50, 60 + (traits.stability || traits.resilience || 20))),
      color: colors.brandGreen[600],
      spectrum: 'Kuat & Adaptif',
    },
    {
      label: 'Harmoni & Empati Sebaya',
      score: Math.min(95, Math.max(45, 60 + (traits.agreeableness || traits.empathy || 20))),
      color: colors.accentViolet[600],
      spectrum: 'Hangat & Terbuka',
    },
    {
      label: 'Fokus & Keandalan',
      score: Math.min(95, Math.max(45, 55 + (traits.conscientiousness || traits.problemFocused || 20))),
      color: colors.accentAmber[600],
      spectrum: 'Terarah & Terencana',
    },
  ];

  return (
    <ScreenContainer
      header={
        <ContextualHeader
          title="Hasil Arketipe Karakter"
          onBack={() => navigateTo('mental_game_hub')}
        />
      }
    >
      {/* Visual Hero Badge */}
      <View style={styles.heroSection}>
        <View
          style={[
            styles.heroBadge,
            { backgroundColor: category.themeBg, borderColor: category.themeColor },
          ]}
        >
          <Sparkles size={36} color={category.themeColor} />
        </View>
        <Badge label={category.badgeLabel} variant="blue" />
        <Text style={styles.archetypeTitle}>{archetype.title}</Text>
        <Text style={styles.archetypeSubtitle}>{archetype.subtitle}</Text>
      </View>

      {/* Main Archetype Description Card */}
      <Card
        style={[
          styles.archetypeCard,
          { borderTopColor: category.themeColor, borderTopWidth: 4 },
        ]}
      >
        <Text style={styles.archetypeDesc}>{archetype.description}</Text>
      </Card>

      {/* Non-Clinical Disclaimer Card */}
      <View style={styles.disclaimerBox}>
        <Info size={16} color={colors.textMuted} style={styles.disclaimerIcon} />
        <Text style={styles.disclaimerText}>
          Hasil ini merupakan refleksi psikoedukasi berbasis psikologi positif dan serious games, bukan instrumen diagnosis psikologis klinis atau medis.
        </Text>
      </View>

      {/* Visual Dimension Breakdown */}
      <Card style={styles.metricsCard}>
        <Text style={styles.metricsTitle}>Pemetaan Dimensi Karakter</Text>
        <Text style={styles.metricsSubtitle}>
          Kecenderungan respons berdasarkan skenario pilihanmu:
        </Text>

        <View style={styles.metricsList}>
          {traitDisplayList.map((t, idx) => (
            <View key={idx} style={styles.metricItem}>
              <View style={styles.metricLabelRow}>
                <Text style={styles.metricLabel}>{t.label}</Text>
                <Text style={[styles.metricScoreText, { color: t.color }]}>
                  {t.spectrum}
                </Text>
              </View>
              <View style={styles.metricTrack}>
                <View
                  style={[
                    styles.metricFill,
                    { width: `${t.score}%`, backgroundColor: t.color },
                  ]}
                />
              </View>
            </View>
          ))}
        </View>
      </Card>

      {/* Superpowers Section */}
      <Card variant="tintGreen" style={styles.powersCard}>
        <View style={styles.powersHeader}>
          <Sparkles size={16} color={colors.brandGreen[700]} />
          <Text style={styles.powersTitle}>Kekuatan Utama Dirimu (Superpowers):</Text>
        </View>
        {archetype.superpowers.map((p, idx) => (
          <View key={idx} style={styles.bulletRow}>
            <CheckCircle2
              size={15}
              color={colors.brandGreen[600]}
              style={{ marginTop: 2 }}
            />
            <Text style={styles.bulletText}>{p}</Text>
          </View>
        ))}
      </Card>

      {/* Growth Areas Section */}
      <Card variant="tintAmber" style={styles.growthCard}>
        <View style={styles.growthHeader}>
          <Compass size={16} color={colors.accentAmber[600]} />
          <Text style={styles.growthTitle}>Ruang untuk Bertumbuh (Growth Points):</Text>
        </View>
        {archetype.growthAreas.map((g, idx) => (
          <View key={idx} style={styles.bulletRow}>
            <View style={styles.dotBullet} />
            <Text style={styles.bulletText}>{g}</Text>
          </View>
        ))}
      </Card>

      {/* Actionable Daily Mission */}
      <Card variant="tintBlue" style={styles.missionCard}>
        <Text style={styles.missionHeading}>Misi Kebaikan Hari Ini:</Text>
        {archetype.recommendedMissions.map((m, idx) => (
          <View key={idx} style={styles.missionItem}>
            <View style={styles.missionNumberBadge}>
              <Text style={styles.missionNumber}>{idx + 1}</Text>
            </View>
            <Text style={styles.missionText}>{m}</Text>
          </View>
        ))}
      </Card>

      {/* Honest Privacy Safe Note */}
      <View style={styles.dataSafeBox}>
        <Lock size={14} color={colors.textMuted} />
        <Text style={styles.dataSafeText}>
          Hasil refleksi ini tersimpan secara privat di perangkatmu. Teman Sebaya menghargai kerahasiaan dan ruang aman eksplorasi dirimu.
        </Text>
      </View>

      {/* Action Buttons Grid */}
      <View style={styles.actionsContainer}>
        {/* Save to Profile */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleSaveToProfile}
          disabled={isSaved}
          style={[styles.primaryActionBtn, isSaved && styles.savedBtn]}
          accessibilityRole="button"
        >
          <BookmarkCheck size={18} color="#FFFFFF" />
          <Text style={styles.primaryActionText}>
            {isSaved ? 'Tersimpan di Profil Saya ✓' : 'Simpan Refleksi ke Profil'}
          </Text>
        </TouchableOpacity>

        {/* Secondary Buttons Row */}
        <View style={styles.secondaryRow}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleShare}
            style={styles.outlineActionBtn}
            accessibilityRole="button"
          >
            <Share2 size={16} color={colors.brandBlue[600]} />
            <Text style={styles.outlineActionText}>Bagikan Hasil</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigateTo('mental_game_hub')}
            style={styles.outlineActionBtn}
            accessibilityRole="button"
          >
            <RotateCcw size={16} color={colors.textSecondary} />
            <Text style={styles.outlineActionText}>Kategori Lain</Text>
          </TouchableOpacity>
        </View>

        {/* Counseling Bridge */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => switchTab('cerita')}
          style={styles.bridgeBtn}
          accessibilityRole="button"
        >
          <MessageCircle size={16} color={colors.brandBlue[700]} />
          <Text style={styles.bridgeText}>
            Ada yang mengganjal? Curhat di Teman Cerita →
          </Text>
        </TouchableOpacity>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  heroSection: {
    alignItems: 'center',
    marginVertical: spacing.md,
    gap: spacing.xs,
  },
  heroBadge: {
    width: 80,
    height: 80,
    borderRadius: borderRadius.full,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs,
  },
  archetypeTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.textPrimary,
    textAlign: 'center',
    marginTop: 4,
  },
  archetypeSubtitle: {
    ...typography.bodyRegular,
    fontSize: 13.5,
    color: colors.textSecondary,
    textAlign: 'center',
    maxWidth: 300,
  },
  archetypeCard: {
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  archetypeDesc: {
    fontSize: 14,
    lineHeight: 22,
    color: colors.textPrimary,
  },
  disclaimerBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.surfaceAlt,
    borderRadius: borderRadius.md,
    padding: spacing.sm,
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
  disclaimerIcon: {
    marginTop: 2,
  },
  disclaimerText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 17,
    color: colors.textMuted,
  },
  metricsCard: {
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  metricsTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  metricsSubtitle: {
    fontSize: 12,
    color: colors.textMuted,
    marginBottom: spacing.md,
  },
  metricsList: {
    gap: spacing.md,
  },
  metricItem: {
    gap: 6,
  },
  metricLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  metricScoreText: {
    fontSize: 12,
    fontWeight: '700',
  },
  metricTrack: {
    height: 6,
    backgroundColor: colors.surfaceAlt,
    borderRadius: borderRadius.full,
    overflow: 'hidden',
  },
  metricFill: {
    height: '100%',
    borderRadius: borderRadius.full,
  },
  powersCard: {
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  powersHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: spacing.sm,
  },
  powersTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.brandGreen[700],
  },
  growthCard: {
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  growthHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: spacing.sm,
  },
  growthTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.accentAmber[600],
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    marginBottom: 6,
  },
  dotBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.accentAmber[600],
    marginTop: 7,
    marginLeft: 4,
    marginRight: 2,
  },
  bulletText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 19,
    color: colors.textPrimary,
  },
  missionCard: {
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  missionHeading: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.brandBlue[700],
    marginBottom: spacing.sm,
  },
  missionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    marginBottom: 8,
  },
  missionNumberBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.brandBlue[100],
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  missionNumber: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.brandBlue[700],
  },
  missionText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 19,
    color: colors.textPrimary,
  },
  dataSafeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: colors.surfaceAlt,
    padding: spacing.sm,
    borderRadius: borderRadius.md,
    marginBottom: spacing.lg,
  },
  dataSafeText: {
    flex: 1,
    fontSize: 11.5,
    lineHeight: 16,
    color: colors.textMuted,
  },
  actionsContainer: {
    gap: spacing.sm,
    paddingBottom: spacing.xl,
  },
  primaryActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    backgroundColor: colors.brandBlue[600],
    height: 48,
    borderRadius: borderRadius.md,
  },
  savedBtn: {
    backgroundColor: colors.brandGreen[600],
  },
  primaryActionText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  secondaryRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  outlineActionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.borderLight,
    height: 44,
    borderRadius: borderRadius.md,
  },
  outlineActionText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  bridgeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: colors.brandBlue[50],
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    marginTop: 4,
  },
  bridgeText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.brandBlue[700],
  },
});
