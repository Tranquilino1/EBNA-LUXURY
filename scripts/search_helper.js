export async function searchImagesDuckDuckGo(query) {
  try {
    const tokenUrl = `https://duckduckgo.com/?q=${encodeURIComponent(query)}`;
    const tokenRes = await fetch(tokenUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36'
      }
    });
    const tokenHtml = await tokenRes.text();
    const vqdMatch = tokenHtml.match(/vqd=([\d-]+)/);
    if (!vqdMatch) {
      return [];
    }
    const vqd = vqdMatch[1];
    const apiUrl = `https://duckduckgo.com/i.js?l=es-es&o=json&q=${encodeURIComponent(query)}&vqd=${vqd}&f=,,,;&p=1`;
    const apiRes = await fetch(apiUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
        'Referer': 'https://duckduckgo.com/'
      }
    });
    const data = await apiRes.json();
    if (data.results && data.results.length > 0) {
      return data.results.map(r => {
        let hdUrl = r.image;
        // Shein CDN high-res conversion: remove thumbnail dimensions
        if (hdUrl.includes('img.ltwebstatic.com')) {
          hdUrl = hdUrl.replace(/_thumbnail_\d+x\d*/, '').replace(/_thumbnail_\d+x/, '');
        }
        return {
          title: r.title,
          image: hdUrl,
          width: r.width,
          height: r.height,
          source: r.url
        };
      });
    }
  } catch (err) {
    console.warn(`Search error for ${query}:`, err.message);
  }
  return [];
}
