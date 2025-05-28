import { Mention, Metric } from '../types';

export const generateMetrics = (mentions: Mention[]): Metric[] => {
  const today = new Date();
  const metrics: Metric[] = [];
  
  // Generate metrics for the last 7 days
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    const formattedDate = formatDate(date);
    const dayLabel = i === 0 ? 'Today' : i === 1 ? 'Yesterday' : formatDayLabel(date);
    
    // Get mentions for this day
    const dayMentions = mentions.filter(mention => mention.date === formattedDate);
    
    // Calculate metrics
    const count = dayMentions.length;
    const commentCount = dayMentions.reduce((sum, mention) => sum + mention.commentCount, 0);
    const uniqueSources = new Set(dayMentions.map(mention => mention.source)).size;
    const avgCommentsPerMention = count > 0 ? Math.round(commentCount / count) : 0;
    
    // Calculate source distribution
    const sourceDistribution = dayMentions.reduce((acc, mention) => {
      acc[mention.source] = (acc[mention.source] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    metrics.push({
      date: formattedDate,
      label: dayLabel,
      count,
      commentCount,
      uniqueSources,
      avgCommentsPerMention,
      sourceDistribution,
    });
  }
  
  return metrics;
};

const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const formatDayLabel = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    weekday: 'short'
  });
};