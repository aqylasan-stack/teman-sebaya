import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Gamepad2, Sparkles, CheckCircle2, RefreshCw } from 'lucide-react-native';
import { colors, spacing, borderRadius, typography } from '../../theme';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { ContextualHeader } from '../../components/layout/ContextualHeader';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { gameScenarios } from '../../data/seedData';
import { useApp } from '../../state/AppContext';
import { GameScenario } from '../../types';

export const BermainScreen: React.FC = () => {
  const { goBack } = useApp();

  const [activeTab, setActiveTab] = useState<'Butterfly Effect' | 'Name That Feeling' | 'Digital Dilemma'>('Butterfly Effect');
  const [selectedChoiceIdx, setSelectedChoiceIdx] = useState<number | null>(null);

  const scenario = gameScenarios.find((s) => s.category === activeTab) || gameScenarios[0];

  const handleSelectTab = (tab: 'Butterfly Effect' | 'Name That Feeling' | 'Digital Dilemma') => {
    setActiveTab(tab);
    setSelectedChoiceIdx(null);
  };

  const choice = selectedChoiceIdx !== null ? scenario.choices[selectedChoiceIdx] : null;

  return (
    <ScreenContainer
      header={<ContextualHeader title="Teman Bermain" onBack={goBack} />}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Simulasi Interaktif & Dilema Remaja</Text>
        <Text style={styles.subtitle}>
          Belajar mengenali konsekuensi dan mengasah kecerdasan emosi lewat skenario kehidupan nyata.
        </Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabsRow}>
        {(['Butterfly Effect', 'Name That Feeling', 'Digital Dilemma'] as const).map(
          (tab) => {
            const isActive = activeTab === tab;
            return (
              <TouchableOpacity
                key={tab}
                activeOpacity={0.7}
                onPress={() => handleSelectTab(tab)}
                style={[styles.tabBtn, isActive && styles.tabBtnActive]}
              >
                <Text style={[styles.tabBtnText, isActive && styles.tabBtnTextActive]}>
                  {tab === 'Butterfly Effect'
                    ? 'Butterfly'
                    : tab === 'Name That Feeling'
                    ? 'Feelings'
                    : 'Dilema'}
                </Text>
              </TouchableOpacity>
            );
          }
        )}
      </View>

      {/* Scenario Container */}
      <Card style={styles.scenarioCard}>
        <View style={styles.scenarioCategoryWrap}>
          <Badge label={scenario.category} variant="violet" />
        </View>

        <Text style={styles.scenarioTitle}>{scenario.title}</Text>
        <Text style={styles.situationText}>{scenario.situation}</Text>

        <View style={styles.choicesSection}>
          <Text style={styles.choicesHeading}>Apa keputusanmu?</Text>
          {scenario.choices.map((c, idx) => {
            const isSelected = selectedChoiceIdx === idx;
            return (
              <TouchableOpacity
                key={idx}
                activeOpacity={0.7}
                onPress={() => setSelectedChoiceIdx(idx)}
                style={[
                  styles.choiceBtn,
                  isSelected && styles.choiceBtnSelected,
                ]}
              >
                <View style={[styles.choiceBullet, isSelected && styles.choiceBulletActive]}>
                  <Text style={[styles.choiceBulletText, isSelected && styles.choiceBulletTextActive]}>
                    {String.fromCharCode(65 + idx)}
                  </Text>
                </View>
                <Text style={[styles.choiceText, isSelected && styles.choiceTextActive]}>
                  {c.text}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Feedback Outcome Card */}
        {choice && (
          <Card variant="tintBlue" style={styles.outcomeCard}>
            <View style={styles.outcomeHeader}>
              <Sparkles size={16} color={colors.brandBlue[600]} />
              <Text style={styles.outcomeTitle}>Hasil & Refleksi Keputusan:</Text>
            </View>
            <Text style={styles.outcomeFeedback}>{choice.feedback}</Text>
            <View style={styles.reflectionBox}>
              <Text style={styles.reflectionLabel}>💡 Pelajaran Berharga:</Text>
              <Text style={styles.reflectionText}>{choice.reflectionPoint}</Text>
            </View>
          </Card>
        )}
      </Card>

      {/* Main Takeaway */}
      <Card variant="tintGreen" style={styles.takeawayCard}>
        <Text style={styles.takeawayTitle}>Prinsip Bijak Remaja:</Text>
        <Text style={styles.takeawayText}>{scenario.takeaway}</Text>
      </Card>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    marginVertical: spacing.md,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  subtitle: {
    ...typography.bodyRegular,
    color: colors.textSecondary,
    marginTop: 2,
  },
  tabsRow: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceAlt,
    borderRadius: borderRadius.md,
    padding: 4,
    marginBottom: spacing.md,
    gap: 4,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: borderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBtnActive: {
    backgroundColor: colors.surface,
    elevation: 1,
  },
  tabBtnText: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.textMuted,
  },
  tabBtnTextActive: {
    color: colors.accentViolet[600],
    fontWeight: '700',
  },
  scenarioCard: {
    padding: spacing.lg,
    marginBottom: spacing.layout.cardGap,
  },
  scenarioCategoryWrap: {
    marginBottom: spacing.xs,
  },
  scenarioTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  situationText: {
    ...typography.bodyRegular,
    fontSize: 13.5,
    lineHeight: 21,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  choicesSection: {
    gap: spacing.sm,
  },
  choicesHeading: {
    fontSize: 12.5,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  choiceBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.borderMedium,
    backgroundColor: colors.surface,
    gap: 10,
  },
  choiceBtnSelected: {
    borderColor: colors.brandBlue[600],
    backgroundColor: colors.brandBlue[50],
  },
  choiceBullet: {
    width: 26,
    height: 26,
    borderRadius: borderRadius.full,
    backgroundColor: colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  choiceBulletActive: {
    backgroundColor: colors.brandBlue[600],
  },
  choiceBulletText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  choiceBulletTextActive: {
    color: colors.surface,
  },
  choiceText: {
    fontSize: 12.5,
    color: colors.textPrimary,
    flex: 1,
    lineHeight: 18,
  },
  choiceTextActive: {
    fontWeight: '600',
    color: colors.brandBlue[700],
  },
  outcomeCard: {
    marginTop: spacing.md,
    padding: spacing.md,
  },
  outcomeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: spacing.xs,
  },
  outcomeTitle: {
    fontSize: 12.5,
    fontWeight: '700',
    color: colors.brandBlue[700],
  },
  outcomeFeedback: {
    ...typography.bodyRegular,
    color: colors.textPrimary,
    lineHeight: 18,
    marginBottom: spacing.xs,
  },
  reflectionBox: {
    backgroundColor: colors.surface,
    padding: spacing.sm,
    borderRadius: borderRadius.sm,
    borderLeftWidth: 3,
    borderLeftColor: colors.brandBlue[600],
  },
  reflectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.brandBlue[700],
    marginBottom: 2,
  },
  reflectionText: {
    fontSize: 11.5,
    color: colors.textSecondary,
    lineHeight: 16,
  },
  takeawayCard: {
    padding: spacing.md,
    marginBottom: spacing.xxl,
  },
  takeawayTitle: {
    fontSize: 12.5,
    fontWeight: '700',
    color: colors.brandGreen[700],
    marginBottom: 2,
  },
  takeawayText: {
    fontSize: 12,
    color: colors.brandGreen[700],
    lineHeight: 18,
  },
});

