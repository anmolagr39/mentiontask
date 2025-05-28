# mentiontask
Deployed link:
https://timely-taiyaki-e1b43e.netlify.app/



# Mention Monitor

A modern web application that tracks mentions of companies or individuals across the web, with specialized metrics for Hacker News data. Built with React, TypeScript, and Supabase.

![Mention Monitor Demo](https://timely-taiyaki-e1b43e.netlify.app/)

## Features

- 🔍 **Web Mention Tracking**: Search for mentions of any company or person across multiple sources
- 📊 **Hacker News Metrics**: Visualize engagement data from Hacker News over the last 7 days
- 📈 **Interactive Charts**: View mentions, comments, sources, and engagement metrics
- 🌐 **Multi-Source Scraping**: Aggregates data from Hacker News and Google News
- 🎨 **Modern UI**: Clean, responsive interface with smooth animations
- ⚡ **Real-time Results**: Fast, efficient data fetching and visualization

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Supabase Edge Functions (Deno)
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Deployment**: Netlify

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (version 16 or higher)
- npm or yarn package manager
- A Supabase account and project

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/mentiontask.git
   cd mentiontask
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory and add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

   You can find these values in your Supabase project dashboard under Settings > API.

### Supabase Setup

1. **Create a new Supabase project** at [supabase.com](https://supabase.com)

2. **Install Supabase CLI** (if you haven't already)
   ```bash
   npm install -g supabase
   ```

3. **Login to Supabase**
   ```bash
   supabase login
   ```

4. **Link your project**
   ```bash
   supabase link --project-ref your-project-ref
   ```

5. **Deploy the Edge Function**
   ```bash
   supabase functions deploy scraper
   ```

   The scraper function is located in `supabase/functions/scraper/index.ts` and handles:
   - Fetching data from Hacker News API
   - Scraping Google News results
   - CORS handling for frontend requests

### Development

1. **Start the development server**
   ```bash
   npm run dev
   ```

2. **Open your browser** and navigate to `http://localhost:5173`

3. **Test the application** by searching for a company or person (e.g., "Apple", "Elon Musk")

### Building for Production

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Preview the build**
   ```bash
   npm run preview
   ```

## Project Structure

```
mentiontask/
├── src/
│   ├── components/          # React components
│   │   ├── Layout.tsx       # Main layout wrapper
│   │   ├── SearchForm.tsx   # Search input form
│   │   ├── ResultsDisplay.tsx # Results container
│   │   ├── MetricsChart.tsx # Interactive metrics chart
│   │   └── MentionsList.tsx # List of mentions
│   ├── context/
│   │   └── MentionContext.tsx # Global state management
│   ├── services/
│   │   ├── mentionService.ts # API calls to Supabase
│   │   └── metricService.ts  # Metrics calculation logic
│   ├── types/
│   │   └── index.ts         # TypeScript type definitions
│   └── App.tsx              # Main application component
├── supabase/
│   └── functions/
│       └── scraper/
│           └── index.ts     # Edge function for web scraping
└── public/                  # Static assets
```

## How It Works

1. **User Input**: Enter a search term (company or person name)
2. **Data Fetching**: The app calls the Supabase Edge Function which:
   - Searches Hacker News API for recent mentions (last 7 days)
   - Scrapes Google News for additional web mentions
3. **Data Processing**: Results are processed and metrics are calculated
4. **Visualization**: Data is displayed in interactive charts and lists

## API Endpoints

The application uses a single Supabase Edge Function:

- **POST** `/functions/v1/scraper`
  - **Body**: `{ "searchTerm": "your search term" }`
  - **Response**: Array of mention objects with metrics

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_SUPABASE_URL` | Your Supabase project URL | Yes |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anonymous key | Yes |

## Deployment

### Netlify (Recommended)

1. **Connect your repository** to Netlify
2. **Set build command**: `npm run build`
3. **Set publish directory**: `dist`
4. **Add environment variables** in Netlify dashboard
5. **Deploy**

### Manual Deployment

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Upload the `dist` folder** to your hosting provider

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Troubleshooting

### Common Issues

**1. CORS Errors**
- Ensure your Supabase Edge Function is deployed correctly
- Check that CORS headers are properly set in the function

**2. Environment Variables Not Loading**
- Make sure your `.env` file is in the root directory
- Restart your development server after adding environment variables
- Verify variable names start with `VITE_`

**3. Build Errors**
- Run `npm install` to ensure all dependencies are installed
- Check that your Node.js version is 16 or higher

**4. Supabase Function Errors**
- Verify your Supabase project is active
- Check that the Edge Function is deployed: `supabase functions list`
- Review function logs: `supabase functions logs scraper`

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Live Demo

Check out the live application: [https://timely-taiyaki-e1b43e.netlify.app/](https://timely-taiyaki-e1b43e.netlify.app/)

## Support

If you encounter any issues or have questions, please [open an issue](https://github.com/yourusername/mentiontask/issues) on GitHub.
