// Vercel Serverless Function - News API Proxy
// This proxies requests to NewsAPI.org from the server-side to bypass CORS and production restrictions
// Updated: Environment variable configured in Vercel

export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { endpoint, ...params } = req.query;
    // Try both REACT_APP_NEWS_API_KEY and NEWS_API_KEY for compatibility
    const API_KEY = process.env.NEWS_API_KEY || process.env.REACT_APP_NEWS_API_KEY;

    if (!API_KEY) {
        console.error('API key missing. Available env vars:', Object.keys(process.env));
        return res.status(500).json({
            error: 'API key not configured',
            hint: 'Please set NEWS_API_KEY or REACT_APP_NEWS_API_KEY in Vercel environment variables',
            availableEnvVars: Object.keys(process.env).filter(k => k.includes('API') || k.includes('NEWS'))
        });
    }

    try {
        // Build NewsAPI URL
        const baseUrl = 'https://newsapi.org/v2';
        const apiEndpoint = endpoint || 'top-headlines';

        console.log('Making request to NewsAPI:', apiEndpoint, 'with params:', params);
        const url = new URL(`${baseUrl}/${apiEndpoint}`);

        // Add all query params
        Object.keys(params).forEach(key => {
            url.searchParams.append(key, params[key]);
        });

        // Add API key
        url.searchParams.append('apiKey', API_KEY);

        // Fetch from NewsAPI
        const response = await fetch(url.toString());
        const data = await response.json();

        console.log('NewsAPI response status:', response.status);

        if (!response.ok) {
            console.error('NewsAPI error:', data);
            return res.status(response.status).json(data);
        }

        console.log('NewsAPI success, returning', data.totalResults || 0, 'articles');
        // Return the data
        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching from NewsAPI:', error);
        res.status(500).json({ error: 'Failed to fetch news', message: error.message });
    }
}
