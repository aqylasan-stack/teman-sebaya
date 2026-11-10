import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Bookmark, Clock, HelpCircle, ArrowRight } from 'lucide-react-native';
import { colors, spacing, borderRadius, typography } from '../../theme';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { ContextualHeader } from '../../components/layout/ContextualHeader';
import { Button } from '../../components/common/Button';
import { QuizModal } from '../../components/learning/QuizModal';
import { FloatingToast } from '../../components/common/FloatingToast';
import { useApp } from '../../state/AppContext';

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

export const ArticleDetailScreen: React.FC = () => {
  const { articles, screenParams, toggleBookmark, goBack } = useApp();

  const articleId = screenParams?.articleId || 'art_001';
  const article = articles.find((a) => a.id === articleId) || articles[0];
  const coverImage = article.imageKey ? articleImages[article.imageKey] : null;

  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleToggleBookmark = () => {
    const willBeSaved = !article.isSaved;
    toggleBookmark(article.id);
    setToastMessage(
      willBeSaved
        ? 'Ditambahkan ke Bacaan Tersimpan!'
        : 'Dihapus dari Bacaan Tersimpan'
    );
    setTimeout(() => {
      setToastMessage(null);
    }, 2200);
  };

  return (
    <ScreenContainer
      header={
        <ContextualHeader
          title={article.category}
          onBack={goBack}
          rightAction={
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleToggleBookmark}
              style={styles.bookmarkAction}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Bookmark
                size={20}
                color={article.isSaved ? colors.brandBlue[600] : colors.textMuted}
                fill={article.isSaved ? colors.brandBlue[600] : 'transparent'}
              />
            </TouchableOpacity>
          }
        />
      }
      floatingOverlay={
        <FloatingToast
          message={toastMessage}
          onDismiss={() => setToastMessage(null)}
          bottomOffset={32}
        />
      }
    >
      <View style={styles.container}>
        {/* 1. Category Kicker */}
        <Text style={styles.categoryKicker}>{article.category}</Text>

        {/* 2. Main Editorial Headline */}
        <Text style={styles.articleTitle}>{article.title}</Text>

        {/* 3. Narrative Summary Deck (Lead paragraph) */}
        {article.summary ? (
          <Text style={styles.articleDeck}>{article.summary}</Text>
        ) : null}

        {/* 4. Large Editorial Hero Cover Image */}
        {coverImage && (
          <Image
            source={coverImage}
            style={styles.heroCoverImage}
            resizeMode="cover"
          />
        )}

        {/* 5. Author & Reading Metadata Row */}
        <View style={styles.bylineSection}>
          <View style={styles.bylineTop}>
            <Text style={styles.authorName}>Oleh {article.author}</Text>
          </View>
          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <Clock size={12} color={colors.textMuted} />
              <Text style={styles.metaText}>{article.readingMinutes} menit baca</Text>
            </View>
            <Text style={styles.metaDivider}>•</Text>
            <Text style={styles.metaText}>{article.publishedDate}</Text>
          </View>
        </View>

        {/* Hairline Divider */}
        <View style={styles.sectionDivider} />

        {/* 6. Poin Kunci Bacaan (Editorial & Alami, Tanpa Container Berwarna atau Border Aksen) */}
        {article.keyTakeaways && article.keyTakeaways.length > 0 && (
          <View style={styles.takeawaysSection}>
            <Text style={styles.takeawaysHeading}>Poin Kunci Bacaan</Text>
            <View style={styles.takeawaysList}>
              {article.keyTakeaways.map((point, idx) => (
                <View key={idx} style={styles.pointRow}>
                  <Text style={styles.pointIndex}>{idx + 1}.</Text>
                  <Text style={styles.pointText}>{point}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* 7. Longform Content Paragraphs (Tipografi Nyaman & Berjarak Alami) */}
        <View style={styles.paragraphsContainer}>
          {article.content.map((paragraph, idx) => (
            <Text key={idx} style={styles.paragraph}>
              {paragraph}
            </Text>
          ))}
        </View>

        {/* 8. Interactive Quiz Reflection Section (Dignified Learning Block) */}
        {article.quiz && (
          <View style={styles.quizSection}>
            <View style={styles.quizHeader}>
              <View style={styles.quizIconWrap}>
                <HelpCircle size={20} color={colors.brandBlue[600]} />
              </View>
              <View style={styles.quizInfo}>
                <Text style={styles.quizTitle}>{article.quiz.title}</Text>
                <Text style={styles.quizSub}>
                  3 pertanyaan reflektif untuk menguji pemahaman dan refleksimu tanpa tekanan.
                </Text>
              </View>
            </View>
            <Button
              title="Mulai Kuis Singkat"
              variant="primary"
              fullWidth
              iconRight={<ArrowRight size={15} color={colors.surface} />}
              onPress={() => setIsQuizOpen(true)}
              style={styles.quizBtn}
            />
          </View>
        )}
      </View>

      {/* Quiz Modal */}
      {article.quiz && (
        <QuizModal
          visible={isQuizOpen}
          quiz={article.quiz}
          onClose={() => setIsQuizOpen(false)}
        />
      )}
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: spacing.xs,
    paddingBottom: spacing.xxl,
  },
  bookmarkAction: {
    padding: 6,
  },

  /* 1. Category Kicker */
  categoryKicker: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.brandBlue[600],
    textTransform: 'uppercase',
    letterSpacing: 0.4,
    marginBottom: 6,
  },

  /* 2. Headline */
  articleTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textPrimary,
    lineHeight: 28,
    marginBottom: 8,
  },

  /* 3. Narrative Deck */
  articleDeck: {
    fontSize: 14,
    lineHeight: 21,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },

  /* 4. Hero Image */
  heroCoverImage: {
    width: '100%',
    height: 200,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.surfaceAlt,
    marginBottom: spacing.sm,
  },

  /* 5. Byline & Meta */
  bylineSection: {
    paddingVertical: spacing.xs,
  },
  bylineTop: {
    marginBottom: 3,
  },
  authorName: {
    fontSize: 12.5,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 11.5,
    color: colors.textMuted,
  },
  metaDivider: {
    fontSize: 11,
    color: colors.borderMedium,
  },

  /* Divider Editorial Tipis */
  sectionDivider: {
    height: 1,
    backgroundColor: colors.borderLight,
    marginVertical: spacing.layout.sectionGap,
  },

  /* 6. Poin Kunci Bacaan (Editorial & Natural) */
  takeawaysSection: {
    marginVertical: spacing.md,
    paddingBottom: spacing.xs,
  },
  takeawaysHeading: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.sm,
    letterSpacing: -0.2,
  },
  takeawaysList: {
    gap: spacing.layout.itemGap,
  },
  pointRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.layout.itemGap,
  },
  pointIndex: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.brandBlue[600],
    lineHeight: 22,
    minWidth: 16,
  },
  pointText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 22,
    flex: 1,
  },

  /* 7. Content Paragraphs */
  paragraphsContainer: {
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  paragraph: {
    fontSize: 15,
    lineHeight: 25,
    color: '#334155', // Slate 700 - high contrast reading
    letterSpacing: 0.1,
  },

  /* 8. Quiz Section */
  quizSection: {
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: borderRadius.lg,
    padding: spacing.layout.cardPadding,
    marginTop: spacing.md,
  },
  quizHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  quizIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.brandBlue[50],
    alignItems: 'center',
    justifyContent: 'center',
  },
  quizInfo: {
    flex: 1,
  },
  quizTitle: {
    fontSize: 13.5,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  quizSub: {
    fontSize: 11.5,
    color: colors.textMuted,
    lineHeight: 16,
    marginTop: 2,
  },
  quizBtn: {
    marginTop: spacing.xs,
  },
});
