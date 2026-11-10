import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Clock, Bookmark } from 'lucide-react-native';
import { colors, spacing, borderRadius } from '../../theme';
import { Article } from '../../types';

interface ArticleCardProps {
  article: Article;
  onPress: () => void;
  onToggleBookmark: () => void;
  variant?: 'featured' | 'row';
}

const articleImages: Record<string, any> = {
  article_overthinking: require('../../../assets/articles/article_overthinking.jpg'),
  article_burnout: require('../../../assets/articles/article_burnout.jpg'),
  article_konflik: require('../../../assets/articles/article_konflik.jpg'),
  article_asertif: require('../../../assets/articles/article_asertif.jpg'),
  article_detoks: require('../../../assets/articles/article_detoks.jpg'),
  article_mengenal_diri: require('../../../assets/articles/article_mengenal_diri.jpg'),
  article_regulasi_emosi: require('../../../assets/articles/article_regulasi_emosi.jpg'),
  article_komunikasi: require('../../../assets/articles/article_komunikasi.jpg'),
  article_tidur_sehat: require('../../../assets/articles/article_tidur_sehat.jpg'),

  // Fallback to real community documentation photos
  genre_workshop: require('../../../assets/community/genre_workshop.jpg'),
  genre_activity_1: require('../../../assets/community/genre_activity_1.jpg'),
  genre_activity_2: require('../../../assets/community/genre_activity_2.jpg'),
  pikr_group: require('../../../assets/community/pikr_group.jpg'),
};

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  onPress,
  onToggleBookmark,
  variant = 'row',
}) => {
  const coverImage = article.imageKey ? articleImages[article.imageKey] : null;

  if (variant === 'featured') {
    return (
      <TouchableOpacity
        activeOpacity={0.88}
        onPress={onPress}
        style={styles.featuredContainer}
      >
        {coverImage && (
          <Image
            source={coverImage}
            style={styles.featuredImage}
            resizeMode="cover"
          />
        )}

        <View style={styles.featuredContent}>
          {/* Category Kicker */}
          <Text style={styles.categoryKicker}>{article.category}</Text>

          {/* Prominent Editorial Headline */}
          <Text style={styles.featuredTitle}>{article.title}</Text>

          {/* Concise Summary Deck */}
          <Text style={styles.featuredSummary} numberOfLines={2}>
            {article.summary}
          </Text>

          {/* Metadata & Actions */}
          <View style={styles.metaRow}>
            <View style={styles.metaLeft}>
              <Clock size={12} color={colors.textMuted} />
              <Text style={styles.metaText}>{article.readingMinutes} menit baca</Text>
              <Text style={styles.metaDot}>•</Text>
              <Text style={styles.metaText}>{article.publishedDate}</Text>
            </View>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={onToggleBookmark}
              style={styles.bookmarkBtn}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Bookmark
                size={18}
                color={article.isSaved ? colors.brandBlue[600] : colors.textMuted}
                fill={article.isSaved ? colors.brandBlue[600] : 'transparent'}
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  // Row Layout: Editorial list item with thumbnail on left, typography on right
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={styles.rowContainer}
    >
      {coverImage && (
        <Image
          source={coverImage}
          style={styles.rowThumbnail}
          resizeMode="cover"
        />
      )}

      <View style={styles.rowContent}>
        <View style={styles.rowTopLine}>
          <Text style={styles.categoryKickerSmall} numberOfLines={1}>
            {article.category}
          </Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onToggleBookmark}
            style={styles.bookmarkBtnSmall}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Bookmark
              size={15}
              color={article.isSaved ? colors.brandBlue[600] : colors.textMuted}
              fill={article.isSaved ? colors.brandBlue[600] : 'transparent'}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.rowTitle} numberOfLines={2}>
          {article.title}
        </Text>

        <View style={styles.rowMeta}>
          <Clock size={11} color={colors.textMuted} />
          <Text style={styles.rowMetaText}>
            {article.readingMinutes} mnt · {article.publishedDate}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  /* Featured Lead Story Styles */
  featuredContainer: {
    paddingBottom: spacing.lg,
    marginBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  featuredImage: {
    width: '100%',
    height: 190,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.sm,
    backgroundColor: colors.surfaceAlt,
  },
  featuredContent: {
    paddingHorizontal: 2,
  },
  categoryKicker: {
    fontSize: 11.5,
    fontWeight: '600',
    color: colors.brandBlue[600],
    textTransform: 'uppercase',
    letterSpacing: 0.4,
    marginBottom: 4,
  },
  featuredTitle: {
    fontSize: 17,
    fontWeight: '600',
    lineHeight: 24,
    color: colors.textPrimary,
    marginBottom: 6,
  },
  featuredSummary: {
    fontSize: 13,
    lineHeight: 19,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 4,
  },
  metaLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  metaText: {
    fontSize: 11.5,
    color: colors.textMuted,
  },
  metaDot: {
    fontSize: 11.5,
    color: colors.borderMedium,
  },
  bookmarkBtn: {
    padding: 4,
  },

  /* Row Story Styles */
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  rowThumbnail: {
    width: 92,
    height: 92,
    borderRadius: borderRadius.md,
    backgroundColor: colors.surfaceAlt,
  },
  rowContent: {
    flex: 1,
    justifyContent: 'space-between',
    minHeight: 92,
    paddingVertical: 2,
  },
  rowTopLine: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  categoryKickerSmall: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.brandBlue[600],
    textTransform: 'uppercase',
    letterSpacing: 0.3,
    flex: 1,
    marginRight: 6,
  },
  bookmarkBtnSmall: {
    padding: 2,
  },
  rowTitle: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
    color: colors.textPrimary,
    marginVertical: 4,
  },
  rowMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rowMetaText: {
    fontSize: 11,
    color: colors.textMuted,
  },
});
