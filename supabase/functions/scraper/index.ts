import { createClient } from "npm:@supabase/supabase-js@2.39.3";
import { load } from "npm:cheerio@1.0.0-rc.12";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

async function fetchHackerNews(searchTerm: string) {
  const response = await fetch(`https://hn.algolia.com/api/v1/search?query=${encodeURIComponent(searchTerm)}&numericFilters=created_at_i>${Math.floor((Date.now()/1000) - (7 * 24 * 60 * 60))}`);
  const data = await response.json();
  
  return data.hits.map((hit: any) => ({
    id: hit.objectID,
    title: hit.title || hit.story_title,
    snippet: hit.story_text || hit.comment_text || '',
    url: hit.url || `https://news.ycombinator.com/item?id=${hit.objectID}`,
    date: new Date(hit.created_at).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }),
    source: 'hackernews',
    commentCount: hit.num_comments || 0,
  }));
}

async function scrapeWebResults(searchTerm: string) {
  const response = await fetch(`https://news.google.com/search?q=${encodeURIComponent(searchTerm)}&hl=en-US&gl=US&ceid=US:en`);
  const html = await response.text();
  const $ = load(html);
  
  const results = [];
  $('article').each((_, element) => {
    const title = $(element).find('h3').text();
    const url = $(element).find('a').attr('href');
    if (title && url) {
      results.push({
        id: `news-${results.length}`,
        title,
        snippet: $(element).find('p').text() || '',
        url: url.startsWith('./article') ? `https://news.google.com${url.slice(1)}` : url,
        date: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        }),
        source: 'news',
        commentCount: 0,
      });
    }
  });
  
  return results;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  try {
    const { searchTerm } = await req.json();
    
    if (!searchTerm) {
      return new Response(
        JSON.stringify({ error: "Search term is required" }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders,
          },
        }
      );
    }

    const [hackerNewsResults, webResults] = await Promise.all([
      fetchHackerNews(searchTerm),
      scrapeWebResults(searchTerm)
    ]);

    const results = [...hackerNewsResults, ...webResults];
    
    return new Response(
      JSON.stringify({
        success: true,
        results,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  }
});