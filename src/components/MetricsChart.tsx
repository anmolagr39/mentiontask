import React, { useState } from 'react';
import { useMentionContext } from '../context/MentionContext';
import { BarChart, TrendingUp, MessageSquare, Share2 } from 'lucide-react';

const MetricsChart: React.FC = () => {
  const { metrics } = useMentionContext();
  const [activeMetric, setActiveMetric] = useState<'mentions' | 'comments' | 'sources' | 'engagement'>('mentions');
  
  const getMetricValue = (index: number) => {
    const metric = metrics[index];
    switch (activeMetric) {
      case 'mentions':
        return metric.count;
      case 'comments':
        return metric.commentCount;
      case 'sources':
        return metric.uniqueSources;
      case 'engagement':
        return metric.avgCommentsPerMention;
    }
  };
  
  // Calculate the maximum value for scaling
  const maxValue = Math.max(...metrics.map(m => getMetricValue(metrics.indexOf(m))), 5);
  
  const getMetricColor = () => {
    switch (activeMetric) {
      case 'mentions':
        return 'bg-blue-500 hover:bg-blue-600';
      case 'comments':
        return 'bg-purple-500 hover:bg-purple-600';
      case 'sources':
        return 'bg-green-500 hover:bg-green-600';
      case 'engagement':
        return 'bg-orange-500 hover:bg-orange-600';
    }
  };

  const getTotalMetrics = () => {
    return {
      mentions: metrics.reduce((sum, m) => sum + m.count, 0),
      comments: metrics.reduce((sum, m) => sum + m.commentCount, 0),
      sources: Math.max(...metrics.map(m => m.uniqueSources)),
      engagement: Math.round(
        metrics.reduce((sum, m) => sum + m.avgCommentsPerMention, 0) / metrics.length
      ),
    };
  };

  const totals = getTotalMetrics();
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <button
          onClick={() => setActiveMetric('mentions')}
          className={`p-4 rounded-lg ${activeMetric === 'mentions' ? 'bg-blue-50 border-2 border-blue-500' : 'bg-white'}`}
        >
          <div className="flex items-center justify-between">
            <BarChart className="h-5 w-5 text-blue-500" />
            <span className="text-sm text-gray-500">Total Mentions</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 mt-2">{totals.mentions}</p>
        </button>

        <button
          onClick={() => setActiveMetric('comments')}
          className={`p-4 rounded-lg ${activeMetric === 'comments' ? 'bg-purple-50 border-2 border-purple-500' : 'bg-white'}`}
        >
          <div className="flex items-center justify-between">
            <MessageSquare className="h-5 w-5 text-purple-500" />
            <span className="text-sm text-gray-500">Total Comments</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 mt-2">{totals.comments}</p>
        </button>

        <button
          onClick={() => setActiveMetric('sources')}
          className={`p-4 rounded-lg ${activeMetric === 'sources' ? 'bg-green-50 border-2 border-green-500' : 'bg-white'}`}
        >
          <div className="flex items-center justify-between">
            <Share2 className="h-5 w-5 text-green-500" />
            <span className="text-sm text-gray-500">Unique Sources</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 mt-2">{totals.sources}</p>
        </button>

        <button
          onClick={() => setActiveMetric('engagement')}
          className={`p-4 rounded-lg ${activeMetric === 'engagement' ? 'bg-orange-50 border-2 border-orange-500' : 'bg-white'}`}
        >
          <div className="flex items-center justify-between">
            <TrendingUp className="h-5 w-5 text-orange-500" />
            <span className="text-sm text-gray-500">Avg. Engagement</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 mt-2">{totals.engagement}</p>
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg">
        <div className="h-64">
          <div className="flex h-full items-end space-x-2">
            {metrics.map((day, index) => {
              const value = getMetricValue(index);
              const height = `${(value / maxValue) * 100}%`;
              
              return (
                <div 
                  key={index} 
                  className="relative flex-1 group"
                >
                  <div 
                    className={`absolute bottom-0 w-full rounded-t-sm transition-all duration-300 ${getMetricColor()}`}
                    style={{ height }}
                  />
                  
                  <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                    {activeMetric === 'mentions' && <span><strong>{value}</strong> mentions</span>}
                    {activeMetric === 'comments' && <span><strong>{value}</strong> comments</span>}
                    {activeMetric === 'sources' && <span><strong>{value}</strong> sources</span>}
                    {activeMetric === 'engagement' && <span><strong>{value}</strong> avg. comments</span>}
                    <br />
                    on {day.date}
                  </div>
                  
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-500">
                    {day.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-200 pt-4 flex justify-between items-center">
          <div className="text-sm text-gray-500">
            {activeMetric === 'mentions' && 'Number of mentions'}
            {activeMetric === 'comments' && 'Number of comments'}
            {activeMetric === 'sources' && 'Unique sources'}
            {activeMetric === 'engagement' && 'Average comments per mention'}
          </div>
          <span className="text-sm text-gray-500">Last 7 days</span>
        </div>
      </div>
    </div>
  );
};

export default MetricsChart;