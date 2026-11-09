import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Wind, Play, Pause, Check } from 'lucide-react-native';
import { colors, spacing, borderRadius } from '../../theme';
import { Button } from '../common/Button';

interface RelaxationCardProps {
  onComplete: () => void;
}

export const RelaxationCard: React.FC<RelaxationCardProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'Tarik' | 'Tahan' | 'Hembus'>('Tarik');
  const [secondsLeft, setSecondsLeft] = useState(4);
  const [isActive, setIsActive] = useState(false);
  const [cycleCount, setCycleCount] = useState(0);

  useEffect(() => {
    let timer: any;
    if (isActive) {
      timer = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            if (phase === 'Tarik') {
              setPhase('Tahan');
              return 7;
            } else if (phase === 'Tahan') {
              setPhase('Hembus');
              return 8;
            } else {
              setPhase('Tarik');
              setCycleCount((c) => c + 1);
              return 4;
            }
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isActive, phase]);

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.badgeIcon}>
          <Wind size={18} color={colors.brandGreen[600]} />
        </View>
        <View style={styles.headerText}>
          <Text style={styles.title}>Latihan Napas Tenang (4-7-8)</Text>
          <Text style={styles.subtitle}>Relaksasi Terpandu Sistem Saraf</Text>
        </View>
      </View>

      {/* Interactive Breathing Sphere / Box */}
      <View style={styles.breathingSphere}>
        <Text style={styles.phaseText}>{phase} Napas</Text>
        <Text style={styles.timerNumber}>{secondsLeft}s</Text>
        <Text style={styles.cycleLabel}>Siklus ke-{cycleCount + 1} dari 4</Text>
      </View>

      <Text style={styles.instructions}>
        Tarik napas dalam melalui hidung (4 dtk), tahan sejenak (7 dtk), lalu
        hembuskan perlahan lewat mulut (8 dtk).
      </Text>

      {/* Control row */}
      <View style={styles.controlsRow}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setIsActive(!isActive)}
          style={[styles.playButton, isActive && styles.pauseButton]}
        >
          {isActive ? (
            <>
              <Pause size={16} color={colors.surface} />
              <Text style={styles.playButtonText}>Jeda Latihan</Text>
            </>
          ) : (
            <>
              <Play size={16} color={colors.surface} />
              <Text style={styles.playButtonText}>Mulai Relaksasi</Text>
            </>
          )}
        </TouchableOpacity>

        <Button
          title="Selesai & Lanjut"
          variant="outline"
          size="sm"
          iconRight={<Check size={14} color={colors.brandGreen[600]} />}
          onPress={onComplete}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.brandGreen[50],
    borderWidth: 1,
    borderColor: colors.brandGreen[100],
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginVertical: spacing.sm,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  badgeIcon: {
    width: 32,
    height: 32,
    borderRadius: borderRadius.full,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.brandGreen[700],
  },
  subtitle: {
    fontSize: 10.5,
    color: colors.brandGreen[600],
  },
  breathingSphere: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    marginVertical: spacing.xs,
    borderWidth: 1,
    borderColor: colors.brandGreen[100],
  },
  phaseText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.brandGreen[600],
  },
  timerNumber: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.textPrimary,
    marginVertical: 4,
  },
  cycleLabel: {
    fontSize: 10.5,
    color: colors.textMuted,
  },
  instructions: {
    fontSize: 11,
    color: colors.textSecondary,
    lineHeight: 16,
    textAlign: 'center',
    marginVertical: spacing.xs,
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.xs,
    gap: spacing.sm,
  },
  playButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.brandGreen[600],
    paddingVertical: 10,
    borderRadius: borderRadius.md,
    gap: 6,
  },
  pauseButton: {
    backgroundColor: colors.textSecondary,
  },
  playButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.surface,
  },
});
