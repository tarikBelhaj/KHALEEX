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
  
  const { hotel_key, chk_in, chk_out, adults = 1, rooms = 1, currency = 'EUR' } = req.query;
  
  if (!hotel_key || !chk_in || !chk_out) {
    return res.status(400).json({ error: 'Missing required parameters: hotel_key, chk_in, chk_out' });
  }
  
  try {
    const response = await fetch(
      `https://data.xotelo.com/api/rates?hotel_key=${hotel_key}&chk_in=${chk_in}&chk_out=${chk_out}&adults=${adults}&rooms=${rooms}&currency=${currency}`
    );

    if (!response.ok) {
        throw new Error(`Xotelo API error: ${response.status}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Proxy Error (Rates):", error);
    res.status(500).json({ error: 'Failed to fetch rates from provider' });
  }
}