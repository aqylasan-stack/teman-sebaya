import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Compass, ShieldCheck, Heart, ArrowRight, Clock, BookOpen } from 'lucide-react-native';
import { colors, spacing, borderRadius, typography } from '../../theme';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { ContextualHeader } from '../../components/layout/ContextualHeader';
import { Card } from '../../components/common/Card';
import { PSYCH_GAME_CATEGORIES, PsychGameCategory } from '../../data/gamePsychData';
import { useApp } from '../../state/AppContext';

export const MentalGameHubScreen: React.FC = () => {
  const { navigateTo, goBack } = useApp();
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('semua');

  const handleStartGame = (category: PsychGameCategory) => {
    navigateTo('mental_game_play', { categoryId: category.id });
  };

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'karakter':
        return Compass;
      case 'resiliensi':
        return ShieldCheck;
      case 'relasi':
        return Heart;
      default:
        return BookOpen;
    }
  };

  const filteredCategories =
    activeCategoryFilter === 'semua'
      ? PSYCH_GAME_CATEGORIES
      : PSYCH_GAME_CATEGORIES.filter((c) => c.id === activeCategoryFilter);

  return (
    <ScreenContainer
      header={<ContextualHeader title="Teman Bermain" onBack={goBack} />}
    >
      {/* 1. Header & Introduction (Sesuai Screen F01 BRIEF TEMAN SEBAYA) */}
      <View style={styles.introHeader}>
        <Text style={styles.headingTitle}>Teman Bermain</Text>
        <Text style={styles.headingSubtitle}>
          Belajar tidak selalu harus serius. Yuk, kenali dirimu lewat permainan.
        </Text>
      </View>

      {/* 2. Category Filter Tabs */}
      <View style={styles.categoryFilterRow}>
        {[
          { id: 'semua', label: 'Semua Permainan' },
          { id: 'karakter', label: 'Butterfly Effect' },
          { id: 'resiliensi', label: 'Name That Feeling' },
          { id: 'relasi', label: 'Digital Dilemma' },
        ].map((tab) => {
          const isActive = activeCategoryFilter === tab.id;
          return (
            <TouchableOpacity
              key={tab.id}
              activeOpacity={0.7}
              onPress={() => setActiveCategoryFilter(tab.id)}
              style={[styles.filterPill, isActive && styles.filterPillActive]}
            >
              <Text style={[styles.filterPillText, isActive && styles.filterPillTextActive]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* 3. Available Game Scenarios List */}
      <View style={styles.scenariosList}>
        {filteredCategories.map((category) => {
          const Icon = getCategoryIcon(category.id);

          return (
            <Card
              key={category.id}
              style={styles.scenarioCard}
              onPress={() => handleStartGame(category)}
            >
              <View style={styles.cardHeaderRow}>
                <View style={[styles.iconContainer, { backgroundColor: category.themeBg }]}>
                  <Icon size={22} color={category.themeColor} strokeWidth={2} />
                </View>
                <View style={styles.cardHeaderInfo}>
                  <Text style={styles.cardCategoryLabel}>{category.badgeLabel}</Text>
                  <Text style={styles.cardTitle}>{category.title}</Text>
                </View>
              </View>

              <Text style={styles.cardDescription}>{category.subtitle}</Text>

              {/* Meta & Action Row */}
              <View style={styles.cardFooter}>
                <View style={styles.metaRow}>
                  <Clock size={13} color={colors.textMuted} />
                  <Text style={styles.metaText}>{category.durationMinutes} menit</Text>
                  <Text style={styles.metaDot}>•</Text>
                  <Text style={styles.metaText}>{category.scenes.length} skenario</Text>
                </View>

                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => handleStartGame(category)}
                  style={styles.playButton}
                >
                  <Text style={styles.playButtonText}>Mulai Skenario</Text>
                  <ArrowRight size={14} color={colors.brandBlue[600]} />
                </TouchableOpacity>
              </View>
            </Card>
          );
        })}
      </View>

      {/* 4. Trust & Safeguarding Note */}
      <View style={styles.safeNotice}>
        <ShieldCheck size={16} color={colors.textMuted} />
        <Text style={styles.safeNoticeText}>
          Eksplorasi mandiri untuk refleksi diri positif, bukan diagnosis medis psikiatri.
        </Text>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  introHeader: {
    marginVertical: spacing.md,
  },
  headingTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.textPrimary,
    lineHeight: 28,
    marginBottom: spacing.xs,
  },
  headingSubtitle: {
    ...typography.bodyRegular,
    fontSize: 13.5,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  categoryFilterRow: {
    flexDirection: 'row',
    gap: spacing.xs,
    marginBottom: spacing.lg,
  },
  filterPill: {
    paddingVertical: 7,
    paddingHorizontal: 16,
    borderRadius: borderRadius.full,
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  filterPillActive: {
    backgroundColor: colors.brandBlue[600],
    borderColor: colors.brandBlue[600],
  },
  filterPillText: {
    fontSize: 12.5,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  filterPillTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  scenariosList: {
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  scenarioCard: {
    padding: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.xs,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardHeaderInfo: {
    flex: 1,
  },
  cardCategoryLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.brandBlue[600],
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  cardDescription: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 19,
    marginVertical: spacing.xs,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.sm,
    paddingTop: spacing.xs,
    borderTopWidth: 1,
    borderTopColor: colors.surfaceAlt,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 11.5,
    color: colors.textMuted,
  },
  metaDot: {
    fontSize: 11.5,
    color: colors.borderMedium,
    marginHorizontal: 2,
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  playButtonText: {
    fontSize: 12.5,
    fontWeight: '700',
    color: colors.brandBlue[600],
  },
  safeNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: spacing.sm,
    marginBottom: spacing.xxl,
  },
  safeNoticeText: {
    fontSize: 11.5,
    color: colors.textMuted,
  },
});
