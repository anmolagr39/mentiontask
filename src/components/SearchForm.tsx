import React, { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { useMentionContext } from '../context/MentionContext';

const SearchForm: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { startSearch, isLoading } = useMentionContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      startSearch(searchTerm);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-6 mb-8 transition-all duration-200 hover:shadow-md">
      <form onSubmit={handleSubmit} className="w-full">
        <label htmlFor="search-term" className="block text-sm font-medium text-gray-700 mb-2">
          Search for a company or person
        </label>
        <div className="relative">
          <input
            id="search-term"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="e.g., Apple, Elon Musk, Microsoft"
            className="w-full p-3 pl-10 pr-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            disabled={isLoading}
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
        </div>
        
        <div className="flex items-center justify-end mt-4">
          <button
            type="submit"
            disabled={isLoading || !searchTerm.trim()}
            className={`
              inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm 
              text-sm font-medium text-white bg-blue-600 
              ${isLoading || !searchTerm.trim() ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'}
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
              transition-all duration-200
            `}
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                Searching...
              </>
            ) : (
              'Start Crawl'
            )}
          </button>
        </div>
        
        {isLoading && (
          <div className="mt-4 text-sm text-gray-500 animate-pulse">
            Crawling the web for mentions... This may take a minute.
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchForm;