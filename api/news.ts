import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { category, q, page } = req.query;
  const API_KEY = process.env.GNEWS_API_KEY;
  
  if (!API_KEY) {
    return res.status(500).json({ error: 'Server configuration error: API key missing' });
  }

  const endpoint = q ? 'search' : 'top-headlines';
  const url = new URL(`https://gnews.io/api/v4/${endpoint}`);

  url.searchParams.append('token', API_KEY);
  url.searchParams.append('lang', 'uk');
  url.searchParams.append('country', 'ua');
  url.searchParams.append('max', '10');

  if (q) url.searchParams.append('q', String(q));
  if (category && category !== 'general') {
    url.searchParams.append('category', String(category));
  }
  if (page) url.searchParams.append('page', String(page));

  try {
    const response = await fetch(url.toString());
    
    if (!response.ok) {
      const errorData = await response.json();
      return res.status(response.status).json({ error: errorData.errors?.[0] || 'GNews API Error' });
    }

    const data = await response.json();

    res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate=300');
    
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ errorMessage: 'Internal Server Error', error });
  }
}