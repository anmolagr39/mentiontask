import React from 'react';
import { useMentionContext } from '../context/MentionContext';
import MetricsChart from './MetricsChart';
import MentionsList from './MentionsList';
import { Loader2 } from 'lucide-react';

const ResultsDisplay: React.FC = () => {
  const { searchTerm, isLoading, results, hasResults } = useMentionContext();

  if (isLoading) {
    return (
      <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-6 flex flex-col items-center justify-center min-h-[300px]">
        <Loader2 className="animate-spin h-8 w-8 text-blue-500 mb-4" />
        <p className="text-gray-600">Gathering mentions for "{searchTerm}"...</p>
      </div>
    );
  }

  if (!hasResults) {
    return null;
  }

  return (
    <div className="w-full space-y-8">
      <div className="bg-white rounded-lg shadow-sm p-6 transition-all duration-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Hacker News Metrics - Last 7 Days
        </h2>
        <MetricsChart />
      </div>

      <MentionsList />
    </div>
  );
};

export default ResultsDisplay;