import { Mention } from '../types';

export const fetchMentions = async (searchTerm: string): Promise<Mention[]> => {
  const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/scraper`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
    },
    body: JSON.stringify({ searchTerm }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch mentions');
  }

  const data = await response.json();
  return data.results;
};