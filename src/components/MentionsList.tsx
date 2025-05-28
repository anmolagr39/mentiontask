import React, { useState } from 'react';
import { useMentionContext } from '../context/MentionContext';
import { ExternalLink, Calendar, MessageSquare } from 'lucide-react';
import { Mention } from '../types';

const MentionsList: React.FC = () => {
  const { mentions } = useMentionContext();
  const [filter, setFilter] = useState('all');
  
  const filteredMentions = filter === 'all' 
    ? mentions 
    : mentions.filter(mention => mention.source === filter);
  
  const sources = ['all', ...new Set(mentions.map(mention => mention.source))];
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 transition-all duration-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Web Mentions ({mentions.length})
        </h2>
        
        <div className="flex space-x-2">
          {sources.map(source => (
            <button
              key={source}
              onClick={() => setFilter(source)}
              className={`px-3 py-1 text-sm rounded-full transition-all duration-200 ${
                filter === source 
                  ? 'bg-blue-100 text-blue-800' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {source.charAt(0).toUpperCase() + source.slice(1)}
            </button>
          ))}
        </div>
      </div>
      
      <div className="space-y-4">
        {filteredMentions.length > 0 ? (
          filteredMentions.map((mention, index) => (
            <MentionCard key={index} mention={mention} />
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            No mentions found with the current filter.
          </div>
        )}
      </div>
    </div>
  );
};

const MentionCard: React.FC<{ mention: Mention }> = ({ mention }) => {
  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-200">
      <div className="flex justify-between items-start mb-2">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          mention.source === 'hackernews' ? 'bg-orange-100 text-orange-800' :
          mention.source === 'reddit' ? 'bg-red-100 text-red-800' :
          'bg-blue-100 text-blue-800'
        }`}>
          {mention.source}
        </span>
        <div className="flex items-center text-gray-500 text-sm">
          <Calendar className="h-3 w-3 mr-1" />
          {mention.date}
        </div>
      </div>
      
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        {mention.title}
      </h3>
      
      <p className="text-gray-600 mb-3 line-clamp-2">
        {mention.snippet}
      </p>
      
      <div className="flex justify-between items-center">
        <div className="flex items-center text-gray-500 text-sm">
          <MessageSquare className="h-3 w-3 mr-1" />
          {mention.commentCount} comments
        </div>
        
        <a 
          href={mention.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
        >
          View source <ExternalLink className="h-3 w-3 ml-1" />
        </a>
      </div>
    </div>
  );
};

export default MentionsList;