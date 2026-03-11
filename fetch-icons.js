// Fetch brand SVG paths from simple-icons CDN (older version v11 which still had Amazon etc.)
const https = require('https');

function fetch(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetch(res.headers.location).then(resolve).catch(reject);
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, data }));
    }).on('error', reject);
  });
}

async function main() {
  const brands = ['amazon', 'walmart', 'openai', 'midjourney'];
  
  for (const brand of brands) {
    try {
      // Try v11 first, then v10, v9
      for (const ver of ['11', '10', '9', '8', '7']) {
        const url = `https://cdn.jsdelivr.net/npm/simple-icons@${ver}/icons/${brand}.svg`;
        const res = await fetch(url);
        if (res.status === 200 && res.data.includes('<path')) {
          const match = res.data.match(/d="([^"]+)"/);
          if (match) {
            console.log(`\n// ${brand} (from simple-icons v${ver})`);
            console.log(`'${brand}': '${match[1]}',`);
            break;
          }
        }
      }
    } catch (e) {
      console.log(`${brand}: error - ${e.message}`);
    }
  }
}

main().then(() => console.log('\nDone.'));










