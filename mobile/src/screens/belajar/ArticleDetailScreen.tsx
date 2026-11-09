import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Bookmark, Clock, CheckCircle2, HelpCircle, ArrowRight } from 'lucide-react-native';
import { colors, spacing, borderRadius, typography } from '../../theme';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { ContextualHeader } from '../../components/layout/ContextualHeader';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { QuizModal } from '../../components/learning/QuizModal';
import { FloatingToast } from '../../components/common/FloatingToast';
import { useApp } from '../../state/AppContext';

const articleImages: Record<string, any> = {
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
        ? '🔖 Ditambahkan ke Bacaan Tersimpan!'
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
        {coverImage && (
          <Image
            source={coverImage}
            style={styles.heroCoverImage}
            resizeMode="cover"
          />
        )}
        {/* Title & Metadata */}
        <View style={styles.titleSection}>
          <Text style={styles.articleTitle}>{article.title}</Text>
          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <Clock size={13} color={colors.textMuted} />
              <Text style={styles.metaText}>{article.readingMinutes} menit baca</Text>
            </View>
            <Text style={styles.metaDivider}>•</Text>
            <Text style={styles.metaText}>{article.publishedDate}</Text>
            <Text style={styles.metaDivider}>•</Text>
            <Text style={styles.metaText}>{article.author}</Text>
          </View>
        </View>

        {/* Key Takeaways Card */}
        <Card variant="tintBlue" style={styles.takeawaysCard}>
          <Text style={styles.takeawaysTitle}>💡 Poin Kunci Bacaan:</Text>
          {article.keyTakeaways.map((point, idx) => (
            <View key={idx} style={styles.pointRow}>
              <CheckCircle2 size={14} color={colors.brandBlue[600]} style={{ marginTop: 2 }} />
              <Text style={styles.pointText}>{point}</Text>
            </View>
          ))}
        </Card>

        {/* Content Paragraphs */}
        <View style={styles.paragraphsContainer}>
          {article.content.map((paragraph, idx) => (
            <Text key={idx} style={styles.paragraph}>
              {paragraph}
            </Text>
          ))}
        </View>

        {/* Interactive Quiz Launcher */}
        {article.quiz && (
          <Card variant="tintAmber" style={styles.quizCard}>
            <View style={styles.quizHeader}>
              <View style={styles.quizIconWrap}>
                <HelpCircle size={22} color={colors.accentAmber[600]} />
              </View>
              <View style={styles.quizInfo}>
                <Text style={styles.quizTitle}>{article.quiz.title}</Text>
                <Text style={styles.quizSub}>
                  3 pertanyaan non-punitive untuk menguji pemahaman dan refleksimu.
                </Text>
              </View>
            </View>
            <Button
              title="Mulai Kuis Singkat"
              variant="primary"
              fullWidth
              iconRight={<ArrowRight size={16} color={colors.surface} />}
              onPress={() => setIsQuizOpen(true)}
              style={styles.quizBtn}
            />
          </Card>
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
    paddingBottom: spacing.xxl,
  },
  heroCoverImage: {
    width: '100%',
    height: 180,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.sm,
  },
  bookmarkAction: {
    padding: 6,
  },
  titleSection: {
    marginVertical: spacing.md,
  },
  articleTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textPrimary,
    lineHeight: 28,
    marginBottom: spacing.xs,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexWrap: 'wrap',
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
  metaDivider: {
    color: colors.borderMedium,
  },
  takeawaysCard: {
    padding: spacing.md,
    gap: spacing.xs,
    marginVertical: spacing.xs,
  },
  takeawaysTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.brandBlue[700],
    marginBottom: 4,
  },
  pointRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.xs,
  },
  pointText: {
    fontSize: 12,
    color: colors.textSecondary,
    lineHeight: 18,
    flex: 1,
  },
  paragraphsContainer: {
    gap: spacing.md,
    marginVertical: spacing.md,
  },
  paragraph: {
    fontSize: 14,
    lineHeight: 23,
    color: colors.textSecondary,
  },
  quizCard: {
    padding: spacing.md,
    marginTop: spacing.md,
  },
  quizHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  quizIconWrap: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.full,
    backgroundColor: colors.surface,
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
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
  },
  quizBtn: {
    marginTop: spacing.xs,
  },
});

