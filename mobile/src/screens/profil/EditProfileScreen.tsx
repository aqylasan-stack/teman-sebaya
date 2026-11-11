import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { User, School, Heart, Check, Save, Camera, Trash2 } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import { colors, spacing, borderRadius, typography } from '../../theme';
import { validateNickname } from '../../utils/validation';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { ContextualHeader } from '../../components/layout/ContextualHeader';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { useApp } from '../../state/AppContext';

export const EditProfileScreen: React.FC = () => {
  const { user, updateProfile, goBack } = useApp();

  const initialPseudonym = (user?.pseudonym || user?.nickname || user?.name || '')
    .replace(/\s*\(Anonim\)/gi, '')
    .trim();

  const [pseudonym, setPseudonym] = useState(initialPseudonym);
  const [pseudonymError, setPseudonymError] = useState<string | null>(null);

  const [school, setSchool] = useState(user?.schoolOrOrg || '');
  const [interests, setInterests] = useState<string[]>(user?.interests || []);
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(user?.avatarUrl);
  const [isUploading, setIsUploading] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const avatarInitials = React.useMemo(() => {
    const nameToUse = pseudonym || user?.nickname || user?.pseudonym || user?.name || '';
    if (nameToUse && nameToUse.trim()) {
      const parts = nameToUse.trim().split(/\s+/);
      if (parts.length >= 2) {
        return (parts[0][0] + parts[1][0]).toUpperCase();
      }
      return parts[0][0].toUpperCase();
    }
    if (user?.avatarInitials && user.avatarInitials !== 'G') {
      return user.avatarInitials.toUpperCase();
    }
    if (user?.email) {
      return user.email.slice(0, 1).toUpperCase();
    }
    return 'TS';
  }, [pseudonym, user]);

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

  const handlePseudonymChange = (val: string) => {
    setPseudonym(val);
    if (val.trim()) {
      const validation = validateNickname(val);
      setPseudonymError(validation.isValid ? null : validation.error || null);
    } else {
      setPseudonymError('Nama samaran tidak boleh kosong.');
    }
  };

  const handlePickImage = async () => {
    try {
      setIsUploading(true);
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert(
            'Izin Akses Diperlukan',
            'Mohon izinkan akses galeri foto pada pengaturan perangkat Anda untuk mengunggah foto profil.'
          );
          setIsUploading(false);
          return;
        }
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.85,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setAvatarUrl(result.assets[0].uri);
        setImageError(false);
      }
    } catch (err) {
      console.warn('Gagal memilih gambar:', err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setAvatarUrl(undefined);
  };

  const handleSave = () => {
    const cleanPseudonym = pseudonym.replace(/\s*\(Anonim\)/gi, '').trim();
    const pseudoVal = validateNickname(cleanPseudonym);
    if (!pseudoVal.isValid) {
      setPseudonymError(pseudoVal.error || 'Nama samaran tidak valid.');
      return;
    }

    setPseudonymError(null);

    const parts = cleanPseudonym.split(/\s+/);
    const updatedInitials = parts.length >= 2
      ? (parts[0][0] + parts[1][0]).toUpperCase()
      : parts[0][0].toUpperCase();

    updateProfile({
      name: cleanPseudonym,
      nickname: cleanPseudonym,
      pseudonym: cleanPseudonym,
      avatarInitials: updatedInitials,
      schoolOrOrg: school.trim(),
      interests,
      avatarUrl: avatarUrl,
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
        {/* Avatar Section with Photo Upload */}
        <View style={styles.avatarWrap}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handlePickImage}
            style={styles.avatarContainer}
            accessibilityLabel="Ubah Foto Profil"
            accessibilityRole="button"
          >
            <View style={styles.avatarCircle}>
              {avatarUrl && !imageError ? (
                <Image
                  source={{ uri: avatarUrl }}
                  style={styles.avatarImg}
                  resizeMode="cover"
                  onError={() => setImageError(true)}
                />
              ) : (
                <Text style={styles.avatarText}>{avatarInitials}</Text>
              )}
            </View>

            {/* Badge Icon Kamera */}
            <View style={styles.cameraBadge}>
              {isUploading ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Camera size={14} color="#FFFFFF" strokeWidth={2.2} />
              )}
            </View>
          </TouchableOpacity>

          {/* Action Row: Unggah / Hapus */}
          <View style={styles.avatarActionRow}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handlePickImage}
              style={styles.changePhotoBtn}
            >
              <Text style={styles.changePhotoText}>
                {isUploading ? 'Memproses...' : avatarUrl ? 'Ganti Foto' : 'Unggah Foto Profil'}
              </Text>
            </TouchableOpacity>

            {avatarUrl && (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={handleRemoveImage}
                style={styles.removePhotoBtn}
              >
                <Trash2 size={12} color={colors.textMuted} style={{ marginRight: 4 }} />
                <Text style={styles.removePhotoText}>Hapus Foto</Text>
              </TouchableOpacity>
            )}
          </View>

          <Text style={styles.avatarHint}>
            Format JPG/PNG. Foto tersimpan aman di profil akun Anda.
          </Text>
        </View>

        {/* Inputs: Hanya Nama Samaran & Sekolah */}
        <View style={styles.form}>
          <Input
            label="Nama Samaran"
            placeholder="Misal: Anya Sebaya"
            value={pseudonym}
            onChangeText={handlePseudonymChange}
            error={pseudonymError || undefined}
            leftIcon={
              <User
                size={18}
                color={pseudonymError ? colors.crisis.dangerText : colors.textMuted}
              />
            }
          />

          <Input
            label="Sekolah"
            placeholder="Misal: SMAN 1 Karawang"
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
          disabled={Boolean(pseudonymError || !pseudonym.trim())}
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
    paddingVertical: 0,
    gap: spacing.lg,
    paddingBottom: spacing.lg,
  },
  avatarWrap: {
    alignItems: 'center',
    marginVertical: spacing.sm,
  },
  avatarContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: colors.brandBlue[50],
    borderWidth: 3,
    borderColor: colors.brandBlue[200],
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  avatarImg: {
    width: '100%',
    height: '100%',
  },
  cameraBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.brandBlue[600],
    borderWidth: 2.5,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  avatarActionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 12,
    marginBottom: 6,
  },
  changePhotoBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: borderRadius.full,
    backgroundColor: colors.brandBlue[50],
    borderWidth: 1,
    borderColor: colors.brandBlue[200],
  },
  changePhotoText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.brandBlue[600],
  },
  removePhotoBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: borderRadius.full,
    backgroundColor: colors.canvas,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  removePhotoText: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.textMuted,
  },
  avatarText: {
    fontSize: 26,
    fontWeight: '700',
    color: colors.brandBlue[700],
  },
  avatarHint: {
    fontSize: 11,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: 2,
  },
  form: {
    gap: spacing.sm,
  },
  interestsSection: {
    marginTop: spacing.sm,
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
    marginTop: spacing.md,
  },
});

