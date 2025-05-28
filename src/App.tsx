import React from 'react';
import { Search } from 'lucide-react';
import Layout from './components/Layout';
import SearchForm from './components/SearchForm';
import ResultsDisplay from './components/ResultsDisplay';
import { MentionProvider } from './context/MentionContext';

function App() {
  return (
    <MentionProvider>
      <Layout>
        <div className="flex flex-col items-center w-full max-w-4xl mx-auto px-4 py-8">
          <header className="w-full text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Search className="h-8 w-8 text-blue-500 mr-2" />
              <h1 className="text-3xl font-bold text-gray-800">Mention Monitor</h1>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Track mentions of companies or individuals across the web and visualize Hacker News metrics
            </p>
          </header>
          
          <SearchForm />
          <ResultsDisplay />
        </div>
      </Layout>
    </MentionProvider>
  );
}

export default App;