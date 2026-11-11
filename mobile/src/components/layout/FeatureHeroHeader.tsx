import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { ArrowLeft, Info, X, CheckCircle2 } from 'lucide-react-native';
import { colors, spacing, borderRadius } from '../../theme';
import { Modal } from '../common/Modal';
import {
  MoodPattern,
  CeritaPattern,
  BelajarPattern,
  BermainPattern,
  SupportifPattern,
} from './patterns/FeatureHeroPatterns';

export type FeatureKey = 'mood' | 'cerita' | 'belajar' | 'bermain' | 'supportif';

export interface HeroBadge {
  icon?: React.ComponentType<{ size?: number; color?: string; style?: any }>;
  label: string;
  onPress?: () => void;
}

export interface HeroInfoContent {
  title: string;
  description: string;
  bulletPoints?: string[];
}

export interface FeatureHeroHeaderProps {
  feature: FeatureKey;
  title: string;
  subtitle: string;
  badge?: HeroBadge;
  onBack?: () => void;
  infoContent?: HeroInfoContent;
  rightAction?: React.ReactNode;
  style?: ViewStyle;
}

// Token konfigurasi warna resmi TEMAN SEBAYA per fitur
const FEATURE_THEMES: Record<
  FeatureKey,
  {
    bg: string;
    badgeBg: string;
    badgeBorder: string;
    accentColor: string;
  }
> = {
  mood: {
    bg: colors.brandGreen[600], // #059669
    badgeBg: 'rgba(255, 255, 255, 0.18)',
    badgeBorder: 'rgba(255, 255, 255, 0.32)',
    accentColor: colors.brandGreen[600],
  },
  cerita: {
    bg: colors.brandBlue[600], // #2563EB
    badgeBg: 'rgba(255, 255, 255, 0.18)',
    badgeBorder: 'rgba(255, 255, 255, 0.32)',
    accentColor: colors.brandBlue[600],
  },
  belajar: {
    bg: colors.accentAmber[600], // #D97706
    badgeBg: 'rgba(255, 255, 255, 0.18)',
    badgeBorder: 'rgba(255, 255, 255, 0.32)',
    accentColor: colors.accentAmber[600],
  },
  bermain: {
    bg: colors.accentViolet[600], // #7C3AED
    badgeBg: 'rgba(255, 255, 255, 0.18)',
    badgeBorder: 'rgba(255, 255, 255, 0.32)',
    accentColor: colors.accentViolet[600],
  },
  supportif: {
    bg: colors.accentPeach[600], // #EA580C
    badgeBg: 'rgba(255, 255, 255, 0.18)',
    badgeBorder: 'rgba(255, 255, 255, 0.32)',
    accentColor: colors.accentPeach[600],
  },
};

export const FeatureHeroHeader: React.FC<FeatureHeroHeaderProps> = ({
  feature,
  title,
  subtitle,
  badge,
  onBack,
  infoContent,
  rightAction,
  style,
}) => {
  const [isInfoModalVisible, setIsInfoModalVisible] = useState(false);
  const theme = FEATURE_THEMES[feature];

  // Render pola line-art ilustrasi sesuai konteks fitur
  const renderPattern = () => {
    switch (feature) {
      case 'mood':
        return <MoodPattern opacity={0.16} />;
      case 'cerita':
        return <CeritaPattern opacity={0.16} />;
      case 'belajar':
        return <BelajarPattern opacity={0.16} />;
      case 'bermain':
        return <BermainPattern opacity={0.16} />;
      case 'supportif':
        return <SupportifPattern opacity={0.16} />;
      default:
        return null;
    }
  };

  const BadgeIcon = badge?.icon;

  return (
    <>
      <View style={[styles.heroContainer, { backgroundColor: theme.bg }, style]}>
        {/* Background Line-Art Pattern */}
        {renderPattern()}

        {/* Top Control Bar: Back Button (Left) & Info / Action (Right) */}
        <View style={styles.topControlRow}>
          {onBack ? (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={onBack}
              style={styles.whiteCircleBtn}
              accessibilityRole="button"
              accessibilityLabel="Kembali ke halaman sebelumnya"
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <ArrowLeft size={18} color="#0F172A" strokeWidth={2.4} />
            </TouchableOpacity>
          ) : (
            <View style={styles.placeholderBox} />
          )}

          <View style={styles.rightActionsRow}>
            {rightAction}

            {infoContent && (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setIsInfoModalVisible(true)}
                style={styles.whiteCircleBtn}
                accessibilityRole="button"
                accessibilityLabel={`Informasi tentang ${title}`}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <Info size={18} color={theme.accentColor} strokeWidth={2.4} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Content Hierarchy: Dominant Title, Subtitle, & Badge */}
        <View style={styles.contentWrap}>
          <Text style={styles.heroTitle} numberOfLines={2}>
            {title}
          </Text>

          <Text style={styles.heroSubtitle} numberOfLines={2}>
            {subtitle}
          </Text>

          {badge && (
            <TouchableOpacity
              activeOpacity={badge.onPress ? 0.8 : 1}
              onPress={badge.onPress}
              disabled={!badge.onPress}
              style={[
                styles.badgePill,
                {
                  backgroundColor: theme.badgeBg,
                  borderColor: theme.badgeBorder,
                },
              ]}
              accessibilityRole={badge.onPress ? 'button' : 'text'}
              accessibilityLabel={badge.label}
            >
              {BadgeIcon && (
                <BadgeIcon
                  size={13}
                  color="#FFFFFF"
                  style={{ marginRight: 6 }}
                />
              )}
              <Text style={styles.badgeText}>{badge.label}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Info Modal Dialog */}
      {infoContent && (
        <Modal
          visible={isInfoModalVisible}
          onClose={() => setIsInfoModalVisible(false)}
          animationType="fade"
        >
          <View style={styles.modalContent}>
            {/* Modal Header */}
            <View style={styles.modalHeaderRow}>
              <View style={[styles.modalIconWrap, { backgroundColor: `${theme.accentColor}18` }]}>
                <Info size={20} color={theme.accentColor} strokeWidth={2.2} />
              </View>

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setIsInfoModalVisible(false)}
                style={styles.modalCloseBtn}
                accessibilityLabel="Tutup dialog informasi"
              >
                <X size={18} color="#64748B" />
              </TouchableOpacity>
            </View>

            {/* Modal Title & Desc */}
            <Text style={styles.modalTitle}>{infoContent.title}</Text>
            <Text style={styles.modalDescription}>{infoContent.description}</Text>

            {/* Bullet Points */}
            {infoContent.bulletPoints && infoContent.bulletPoints.length > 0 && (
              <View style={styles.bulletList}>
                {infoContent.bulletPoints.map((point, idx) => (
                  <View key={idx} style={styles.bulletItemRow}>
                    <CheckCircle2
                      size={15}
                      color={theme.accentColor}
                      style={{ marginTop: 2, marginRight: 8, flexShrink: 0 }}
                    />
                    <Text style={styles.bulletItemText}>{point}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* Dismiss Button */}
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => setIsInfoModalVisible(false)}
              style={[styles.modalActionBtn, { backgroundColor: theme.accentColor }]}
              accessibilityRole="button"
              accessibilityLabel="Mengerti"
            >
              <Text style={styles.modalActionBtnText}>Mengerti</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  /* Hero Main Container with Curved Bottom Edges */
  heroContainer: {
    position: 'relative',
    overflow: 'hidden',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 22,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },

  /* Top Control Row (Back button & Info button) */
  topControlRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 42,
    marginBottom: 10,
  },
  placeholderBox: {
    width: 38,
    height: 38,
  },
  rightActionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  whiteCircleBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
  },

  /* Content Wrap */
  contentWrap: {
    justifyContent: 'flex-start',
  },
  heroTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#FFFFFF',
    lineHeight: 32,
    letterSpacing: -0.4,
  },
  heroSubtitle: {
    fontSize: 13,
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 0.92)',
    lineHeight: 18.5,
    marginTop: 5,
    maxWidth: '94%',
  },

  /* Metadata Badge */
  badgePill: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginTop: 12,
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 14,
    borderWidth: 1,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.2,
  },

  /* Info Modal Styles */
  modalContent: {
    paddingVertical: 4,
  },
  modalHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  modalIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalCloseBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 6,
    letterSpacing: -0.2,
  },
  modalDescription: {
    fontSize: 13,
    color: '#475569',
    lineHeight: 19,
    marginBottom: 14,
  },
  bulletList: {
    gap: 8,
    marginBottom: 18,
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  bulletItemRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  bulletItemText: {
    flex: 1,
    fontSize: 12,
    color: '#334155',
    lineHeight: 17,
  },
  modalActionBtn: {
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalActionBtnText: {
    fontSize: 13.5,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

