import https from 'https';

async function searchImagesDuckDuckGo(query) {
  // DuckDuckGo image search API
  const tokenUrl = `https://duckduckgo.com/?q=${encodeURIComponent(query)}`;
  const tokenRes = await fetch(tokenUrl, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
  });
  const tokenHtml = await tokenRes.text();
  const vqdMatch = tokenHtml.match(/vqd=([\d-]+)/);
  if (!vqdMatch) {
    console.log('No vqd token found');
    return [];
  }
  const vqd = vqdMatch[1];
  const apiUrl = `https://duckduckgo.com/i.js?l=es-es&o=json&q=${encodeURIComponent(query)}&vqd=${vqd}&f=,,,;&p=1`;
  const apiRes = await fetch(apiUrl, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      'Referer': 'https://duckduckgo.com/'
    }
  });
  const data = await apiRes.json();
  if (data.results && data.results.length > 0) {
    return data.results.map(r => ({
      title: r.title,
      image: r.image,
      width: r.width,
      height: r.height,
      source: r.url
    }));
  }
  return [];
}

const results = await searchImagesDuckDuckGo('SHEIN INAWLY Solva Vestido Largo Y Sin Espalda De Mujer');
console.log('Results count:', results.length);
if (results.length > 0) {
  console.log('Top result:', results[0]);
}
