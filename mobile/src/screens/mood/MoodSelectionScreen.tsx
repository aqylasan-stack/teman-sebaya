import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { ArrowLeft, Check, Sparkles } from 'lucide-react-native';
import { colors, spacing, borderRadius, typography } from '../../theme';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { ContextualHeader } from '../../components/layout/ContextualHeader';
import { MoodSelector } from '../../components/mood/MoodSelector';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { useApp } from '../../state/AppContext';
import { PrimaryEmotion } from '../../types';

export const MoodSelectionScreen: React.FC = () => {
  const { saveMood, navigateTo, goBack } = useApp();

  const [selectedEmotion, setSelectedEmotion] = useState<PrimaryEmotion>('Bahagia');
  const [selectedSubEmotions, setSelectedSubEmotions] = useState<string[]>([]);
  const [note, setNote] = useState('');
  const [selectedContexts, setSelectedContexts] = useState<string[]>(['Pertemanan']);

  const subEmotionOptions: Record<PrimaryEmotion, string[]> = {
    Bahagia: ['Ceria', 'Puas', 'Tertarik', 'Bangga', 'Berdaya', 'Bersyukur'],
    Sedih: ['Murung', 'Kecewa', 'Terluka', 'Sepi', 'Patah hati'],
    Marah: ['Kesal', 'Frustrasi', 'Jengkel', 'Tersinggung', 'Terbebani'],
    'Biasa Saja': ['Netral', 'Tenang', 'Santai', 'Mengalir', 'Stabil'],
    Tenang: ['Damai', 'Santai', 'Nyaman', 'Percaya diri', 'Lega'],
    Lelah: ['Letih', 'Mengantuk', 'Kurang energi', 'Butuh jeda', 'Jenuh'],
    Cemas: ['Khawatir', 'Gelisah', 'Ragu', 'Takut', 'Was-was'],
  };

  // Pilihan konteks resmi dari Screen C03 BRIEF TEMAN SEBAYA
  const contextOptions = [
    'Keluarga',
    'Pertemanan',
    'Pendidikan',
    'Hubungan sosial',
    'Aktivitas sehari-hari',
    'Hal lainnya',
    'Belum tahu',
  ];

  const toggleSubEmotion = (item: string) => {
    if (selectedSubEmotions.includes(item)) {
      setSelectedSubEmotions(selectedSubEmotions.filter((i) => i !== item));
    } else {
      setSelectedSubEmotions([...selectedSubEmotions, item]);
    }
  };

  const toggleContext = (item: string) => {
    if (selectedContexts.includes(item)) {
      setSelectedContexts(selectedContexts.filter((i) => i !== item));
    } else {
      setSelectedContexts([...selectedContexts, item]);
    }
  };

  const handleSave = () => {
    saveMood(
      selectedEmotion,
      selectedSubEmotions,
      note || `Hari ini merasa ${selectedEmotion}.`,
      selectedContexts
    );
    navigateTo('mood_stats');
  };

  return (
    <ScreenContainer
      header={<ContextualHeader title="Refleksi Suasana Hati" onBack={goBack} />}
    >
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>1. Pilih Emosi Utamamu Hari Ini</Text>
        <Text style={styles.sectionSubtitle}>
          Sentuh emosi yang paling menggambarkan keadaanmu sekarang:
        </Text>
        <MoodSelector
          selectedEmotion={selectedEmotion}
          onSelect={(em) => {
            setSelectedEmotion(em);
            setSelectedSubEmotions([]);
          }}
        />
      </View>

      {/* Secondary Emotion Descriptors */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          2. Deskripsi Perasaan yang Lebih Spesifik
        </Text>
        <Text style={styles.sectionSubtitle}>
          Pilih satu atau beberapa kata yang mewakili perasaanmu:
        </Text>
        <View style={styles.chipsRow}>
          {subEmotionOptions[selectedEmotion].map((sub) => {
            const isSelected = selectedSubEmotions.includes(sub);
            return (
              <TouchableOpacity
                key={sub}
                activeOpacity={0.7}
                onPress={() => toggleSubEmotion(sub)}
                style={[
                  styles.chip,
                  isSelected && styles.chipActive,
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
                  {sub}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Context Tags */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>3. Berhubungan dengan Apa?</Text>
        <View style={styles.chipsRow}>
          {contextOptions.map((ctx) => {
            const isSelected = selectedContexts.includes(ctx);
            return (
              <Badge
                key={ctx}
                label={`#${ctx}`}
                variant="gray"
                active={isSelected}
                onPress={() => toggleContext(ctx)}
              />
            );
          })}
        </View>
      </View>

      {/* Journal / Reflection Notes (Screen C03) */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>4. Apa yang membuatmu merasa seperti ini?</Text>
        <View style={styles.inputCard}>
          <TextInput
            style={styles.textArea}
            placeholder="Ceritakan apa pun yang ingin kamu tulis. Tidak harus panjang."
            placeholderTextColor={colors.textPlaceholder}
            multiline
            numberOfLines={4}
            value={note}
            onChangeText={setNote}
          />
        </View>
      </View>

      <Button
        title="Simpan Catatan Suasana Hati"
        variant="primary"
        fullWidth
        onPress={handleSave}
        style={styles.saveButton}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  sectionSubtitle: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.borderMedium,
  },
  chipActive: {
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
  inputCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.borderMedium,
    padding: spacing.md,
  },
  textArea: {
    fontSize: 13,
    color: colors.textPrimary,
    minHeight: 84,
    textAlignVertical: 'top',
  },
  saveButton: {
    marginTop: spacing.xs,
    marginBottom: spacing.xxl,
  },
});

