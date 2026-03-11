// Temporary script to extract official brand SVG paths from simple-icons
const icons = require('simple-icons');

const brandMap = {
  // E-commerce
  amazon: 'siAmazon',
  ebay: 'siEbay',
  shopify: 'siShopify',
  tiktok_shop: 'siTiktok',
  shopee: 'siShopee',
  etsy: 'siEtsy',
  walmart: 'siWalmart',
  // Social
  facebook: 'siFacebook',
  instagram: 'siInstagram',
  tiktok_live: 'siTiktok',
  whatsapp: 'siWhatsapp',
  twitter: 'siX',
  telegram: 'siTelegram',
  // Data
  seo: 'siGoogle',
  price: 'siGoogleanalytics',
  crawler: 'siApachenetbeanside',
  // AI
  chatgpt: 'siOpenai',
  gemini: 'siGooglegemini',
  claude: 'siAnthropic',
  midjourney: null,
  // Games
  steam: 'siSteam',
  blizzard: 'siBlizzardentertainment',
  epic: 'siEpicgames',
  // Other
  other: null
};

console.log('=== BRAND SVG PATHS ===\n');

for (const [prodId, siKey] of Object.entries(brandMap)) {
  if (!siKey) {
    console.log(`  ${prodId}: null,`);
    continue;
  }
  const icon = icons[siKey];
  if (icon) {
    console.log(`  // ${icon.title} (official color: #${icon.hex})`);
    console.log(`  ${prodId}: '${icon.path}',`);
    console.log('');
  } else {
    console.log(`  // ${siKey} NOT FOUND`);
    console.log(`  ${prodId}: null,`);
    console.log('');
  }
}










