import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { BookOpen, Clock, Bookmark } from 'lucide-react-native';
import { colors, spacing, borderRadius, typography } from '../../theme';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Article } from '../../types';

interface ArticleCardProps {
  article: Article;
  onPress: () => void;
  onToggleBookmark: () => void;
}

const articleImages: Record<string, any> = {
  genre_workshop: require('../../../assets/community/genre_workshop.jpg'),
  genre_activity_1: require('../../../assets/community/genre_activity_1.jpg'),
  genre_activity_2: require('../../../assets/community/genre_activity_2.jpg'),
  pikr_group: require('../../../assets/community/pikr_group.jpg'),
};

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  onPress,
  onToggleBookmark,
}) => {
  const coverImage = article.imageKey ? articleImages[article.imageKey] : null;

  return (
    <Card style={styles.card} onPress={onPress}>
      {coverImage && (
        <Image source={coverImage} style={styles.coverImage} resizeMode="cover" />
      )}

      <View style={styles.cardBody}>
        <View style={styles.topRow}>
          <Badge
            label={article.category}
            variant={
              article.category === 'Kesehatan Mental'
                ? 'blue'
                : article.category === 'Relasi Sehat'
                ? 'green'
                : article.category === 'TRIAD KRR'
                ? 'danger'
                : 'amber'
            }
          />
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onToggleBookmark}
            style={styles.bookmarkButton}
          >
            <Bookmark
              size={18}
              color={article.isSaved ? colors.brandBlue[600] : colors.textPlaceholder}
              fill={article.isSaved ? colors.brandBlue[600] : 'transparent'}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>{article.title}</Text>
        <Text style={styles.summary} numberOfLines={2}>
          {article.summary}
        </Text>

        <View style={styles.footerRow}>
          <View style={styles.metaItem}>
            <Clock size={12} color={colors.textMuted} />
            <Text style={styles.metaText}>{article.readingMinutes} menit baca</Text>
          </View>
          <Text style={styles.authorText}>Oleh {article.author}</Text>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 0,
    overflow: 'hidden',
  },
  coverImage: {
    width: '100%',
    height: 120,
  },
  cardBody: {
    padding: spacing.md,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  bookmarkButton: {
    padding: 4,
  },
  title: {
    ...typography.cardHeading,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  summary: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.surfaceAlt,
    paddingTop: spacing.xs,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 11,
    color: colors.textMuted,
  },
  authorText: {
    fontSize: 10.5,
    color: colors.textMuted,
    fontStyle: 'italic',
  },
});
