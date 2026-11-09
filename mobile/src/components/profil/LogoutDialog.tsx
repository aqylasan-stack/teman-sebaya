import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LogOut } from 'lucide-react-native';
import { colors, spacing, borderRadius, typography } from '../../theme';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { useApp } from '../../state/AppContext';

export const LogoutDialog: React.FC = () => {
  const { isLogoutDialogOpen, closeLogoutDialog, logout } = useApp();

  return (
    <Modal visible={isLogoutDialogOpen} onClose={closeLogoutDialog}>
      <View style={styles.container}>
        {/* Warning / Logout badge */}
        <View style={styles.iconBadge}>
          <LogOut size={26} color={colors.crisis.dangerText} />
        </View>

        {/* Text descriptions */}
        <Text style={styles.title}>Keluar dari Akun?</Text>
        <Text style={styles.desc}>
          Catatan suasana hati dan refleksimu tetap tersimpan dengan enkripsi aman.
          Kamu dapat masuk kembali kapan saja menggunakan akunmu.
        </Text>

        {/* Actions */}
        <View style={styles.actions}>
          <Button
            title="Batal, Tetap di Sini"
            variant="outline"
            fullWidth
            onPress={closeLogoutDialog}
          />
          <Button
            title="Ya, Keluar Akun"
            variant="danger"
            fullWidth
            onPress={logout}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: spacing.md,
  },
  iconBadge: {
    width: 52,
    height: 52,
    borderRadius: borderRadius.full,
    backgroundColor: colors.crisis.dangerBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
    textAlign: 'center',
  },
  desc: {
    ...typography.bodyRegular,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 18,
  },
  actions: {
    width: '100%',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
});

