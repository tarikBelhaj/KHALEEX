export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { location_key, limit = 20, sort = 'best_value' } = req.query;
  
  if (!location_key) {
    return res.status(400).json({ error: 'location_key parameter is required' });
  }
  
  try {
    const response = await fetch(
      `https://data.xotelo.com/api/list?location_key=${location_key}&limit=${limit}&sort=${sort}`
    );
    
    if (!response.ok) {
        throw new Error(`Xotelo API error: ${response.status}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Proxy Error (Hotels):", error);
    res.status(500).json({ error: 'Failed to fetch hotels from provider' });
  }
}