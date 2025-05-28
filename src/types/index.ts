// Definition of a web mention
export interface Mention {
  id: string;
  title: string;
  snippet: string;
  url: string;
  date: string;
  source: string;
  commentCount: number;
}

// Definition for metrics data
export interface Metric {
  date: string;
  label: string;
  count: number;
  commentCount: number;
  uniqueSources: number;
  avgCommentsPerMention: number;
  sourceDistribution: Record<string, number>;
}