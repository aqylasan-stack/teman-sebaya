import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { User, School, Heart, Check, Save } from 'lucide-react-native';
import { colors, spacing, borderRadius, typography } from '../../theme';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { ContextualHeader } from '../../components/layout/ContextualHeader';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { useApp } from '../../state/AppContext';

export const EditProfileScreen: React.FC = () => {
  const { user, updateProfile, goBack } = useApp();

  const [name, setName] = useState(user?.name || '');
  const [pseudonym, setPseudonym] = useState(user?.pseudonym || '');
  const [school, setSchool] = useState(user?.schoolOrOrg || 'SMAN 1 Karawang');
  const [interests, setInterests] = useState<string[]>(
    user?.interests || ['Manajemen Stres', 'Komunikasi Sehat']
  );
  const [isSaved, setIsSaved] = useState(false);

  const interestOptions = [
    'Manajemen Stres',
    'Komunikasi Sehat',
    'Eksplorasi Karier',
    'TRIAD KRR',
    'Regulasi Emosi',
    'Self-Compassion',
  ];

  const toggleInterest = (tag: string) => {
    if (interests.includes(tag)) {
      setInterests(interests.filter((t) => t !== tag));
    } else {
      setInterests([...interests, tag]);
    }
  };

  const handleSave = () => {
    updateProfile({
      name,
      pseudonym,
      schoolOrOrg: school,
      interests,
    });
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      goBack();
    }, 600);
  };

  return (
    <ScreenContainer
      header={<ContextualHeader title="Detail Profil Pengguna" onBack={goBack} />}
    >
      <View style={styles.container}>
        {/* Avatar Circle */}
        <View style={styles.avatarWrap}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>{user?.avatarInitials || 'AS'}</Text>
          </View>
          <Text style={styles.avatarHint}>Inisial Profil Terenkripsi</Text>
        </View>

        {/* Inputs */}
        <View style={styles.form}>
          <Input
            label="Nama Lengkap"
            placeholder="Masukkan nama lengkap"
            value={name}
            onChangeText={setName}
            leftIcon={<User size={18} color={colors.textMuted} />}
          />

          <Input
            label="Nama Samaran / Anonim (Ditampilkan di Chat)"
            placeholder="Misal: Anya Sebaya (Anonim)"
            value={pseudonym}
            onChangeText={setPseudonym}
            helperText="Nama ini yang akan dilihat oleh konselor atau teman obrolan."
            leftIcon={<User size={18} color={colors.textMuted} />}
          />

          <Input
            label="Sekolah / Kelompok Binaan PIK-R"
            placeholder="Misal: PIK-R SMAN 1 Karawang"
            value={school}
            onChangeText={setSchool}
            leftIcon={<School size={18} color={colors.textMuted} />}
          />

          {/* Interests */}
          <View style={styles.interestsSection}>
            <Text style={styles.sectionTitle}>Fokus & Minat Konseling</Text>
            <View style={styles.chipsRow}>
              {interestOptions.map((opt) => {
                const isSelected = interests.includes(opt);
                return (
                  <TouchableOpacity
                    key={opt}
                    activeOpacity={0.7}
                    onPress={() => toggleInterest(opt)}
                    style={[
                      styles.interestChip,
                      isSelected && styles.interestChipActive,
                    ]}
                  >
                    {isSelected && (
                      <Check size={12} color={colors.surface} style={{ marginRight: 4 }} />
                    )}
                    <Text
                      style={[
                        styles.chipText,
                        isSelected && styles.chipTextActive,
                      ]}
                    >
                      {opt}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>

        <Button
          title={isSaved ? 'Perubahan Tersimpan!' : 'Simpan Profil'}
          variant="primary"
          fullWidth
          iconLeft={
            isSaved ? (
              <Check size={18} color={colors.surface} />
            ) : (
              <Save size={18} color={colors.surface} />
            )
          }
          onPress={handleSave}
          style={styles.saveBtn}
        />
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.md,
    gap: spacing.lg,
    marginBottom: spacing.xxl,
  },
  avatarWrap: {
    alignItems: 'center',
    marginVertical: spacing.xs,
  },
  avatarCircle: {
    width: 72,
    height: 72,
    borderRadius: borderRadius.full,
    backgroundColor: colors.brandBlue[50],
    borderWidth: 2,
    borderColor: colors.brandBlue[200],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.brandBlue[700],
  },
  avatarHint: {
    fontSize: 11,
    color: colors.textMuted,
  },
  form: {
    gap: spacing.xs,
  },
  interestsSection: {
    marginTop: spacing.xs,
  },
  sectionTitle: {
    fontSize: 12.5,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  interestChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.borderMedium,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: borderRadius.full,
  },
  interestChipActive: {
    backgroundColor: colors.brandBlue[600],
    borderColor: colors.brandBlue[600],
  },
  chipText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  chipTextActive: {
    color: colors.surface,
    fontWeight: '600',
  },
  saveBtn: {
    marginTop: spacing.sm,
  },
});

