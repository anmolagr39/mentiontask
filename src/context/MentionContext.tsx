import React, { createContext, useContext, useState, useEffect } from 'react';
import { Mention, Metric } from '../types';
import { fetchMentions } from '../services/mentionService';
import { generateMetrics } from '../services/metricService';

interface MentionContextType {
  searchTerm: string;
  isLoading: boolean;
  mentions: Mention[];
  metrics: Metric[];
  hasResults: boolean;
  results: {
    mentions: Mention[];
    metrics: Metric[];
  };
  startSearch: (term: string) => void;
}

const MentionContext = createContext<MentionContextType | undefined>(undefined);

export const MentionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mentions, setMentions] = useState<Mention[]>([]);
  const [metrics, setMetrics] = useState<Metric[]>([]);

  const startSearch = async (term: string) => {
    setSearchTerm(term);
    setIsLoading(true);
    
    try {
      const data = await fetchMentions(term);
      setMentions(data);
      
      // Generate metrics based on the fetched mentions
      const metricsData = generateMetrics(data);
      setMetrics(metricsData);
    } catch (error) {
      console.error('Error fetching mentions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const hasResults = mentions.length > 0;
  
  const results = {
    mentions,
    metrics,
  };

  return (
    <MentionContext.Provider value={{
      searchTerm,
      isLoading,
      mentions,
      metrics,
      hasResults,
      results,
      startSearch,
    }}>
      {children}
    </MentionContext.Provider>
  );
};

export const useMentionContext = () => {
  const context = useContext(MentionContext);
  if (context === undefined) {
    throw new Error('useMentionContext must be used within a MentionProvider');
  }
  return context;
};