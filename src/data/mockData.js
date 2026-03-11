
export const PRODUCT_CONFIG = {
  stockThreshold: 50
};

export const REGIONS = [
  { id: 'us', name: '美国', enName: 'United States', code: 'US', flag: '🇺🇸', stock: '充足' },
  { id: 'gb', name: '英国', enName: 'United Kingdom', code: 'GB', flag: '🇬🇧', stock: '充足' },
  { id: 'hk', name: '香港', enName: 'Hong Kong', code: 'HK', flag: '🇭🇰', stock: '少量' },
  { id: 'sg', name: '新加坡', enName: 'Singapore', code: 'SG', flag: '🇸🇬', stock: '充足' },
  { id: 'jp', name: '日本', enName: 'Japan', code: 'JP', flag: '🇯🇵', stock: '紧张' },
];

export const BUSINESS_CATEGORIES = [
  { 
    id: 'ecommerce', 
    name: '跨境电商', 
    icon: 'ShoppingCart',
    scenarios: [
      { id: 'amazon', name: 'Amazon', recommend: { bandwidthMode: 'traffic', desc: '适合店铺运营，推荐流量包模式' } },
      { id: 'ebay', name: 'eBay', recommend: { bandwidthMode: 'traffic', desc: '适合店铺运营，推荐流量包模式' } },
      { id: 'shopify', name: 'Shopify', recommend: { bandwidthMode: 'traffic', desc: '独立站管理，按流量计费更划算' } },
      { id: 'tiktok_shop', name: 'TikTok Shop', recommend: { bandwidthMode: 'bandwidth', desc: '直播带货需大带宽，推荐独享带宽' } },
    ]
  },
  { 
    id: 'social', 
    name: '社媒营销', 
    icon: 'Share2',
    scenarios: [
      { id: 'facebook', name: 'Facebook', recommend: { bandwidthMode: 'traffic', desc: '账号养号，少量流量即可' } },
      { id: 'instagram', name: 'Instagram', recommend: { bandwidthMode: 'traffic', desc: '图文发布，流量包模式更划算' } },
      { id: 'tiktok_live', name: 'TikTok Live', recommend: { bandwidthMode: 'bandwidth', desc: '长时间直播，必须使用独享带宽' } },
      { id: 'whatsapp', name: 'WhatsApp', recommend: { bandwidthMode: 'traffic', desc: '社群营销，低延迟需求' } },
    ]
  },
  { 
    id: 'scraping', 
    name: '数据采集', 
    icon: 'Database',
    scenarios: [
      { id: 'seo', name: 'SEO Monitoring', recommend: { bandwidthMode: 'traffic', desc: '高并发请求，流量包模式' } },
      { id: 'price', name: 'Price Comparison', recommend: { bandwidthMode: 'traffic', desc: '短时高频，流量包模式' } },
    ]
  },
];

export const TERMINALS = [
  { id: 'fingerprint', name: '指纹浏览器', icon: 'Globe', desc: 'AdsPower, BitBrowser等', recommendedProtocol: 'SOCKS5', compatible: ['SOCKS5', 'HTTP'] },
  { id: 'mobile', name: '手机/模拟器', icon: 'Smartphone', desc: 'iOS, Android, 雷电模拟器', recommendedProtocol: 'SOCKS5', compatible: ['SOCKS5', 'HTTP', 'Wireguard'] },
  { id: 'server', name: '服务器/VPS', icon: 'Server', desc: 'Linux, Windows Server', recommendedProtocol: 'SOCKS5', compatible: ['SOCKS5', 'HTTP', 'VLESS'] },
  { id: 'router', name: '路由', icon: 'Wifi', desc: 'OpenWrt, Merlin', recommendedProtocol: 'SOCKS5', compatible: ['SOCKS5', 'HTTP', 'Trojan'] },
  { id: 'api', name: 'API集成', icon: 'Terminal', desc: 'Code Integration', recommendedProtocol: 'HTTP', compatible: ['HTTP', 'SOCKS5'] },
];

export const SKUS = {
  traffic: [
    { id: 't_1g', name: '1 GB', price: 5, unit: 'USD/Month' },
    { id: 't_5g', name: '5 GB', price: 20, unit: 'USD/Month' },
    { id: 't_10g', name: '10 GB', price: 35, unit: 'USD/Month' },
    { id: 't_50g', name: '50 GB', price: 150, unit: 'USD/Month' },
  ],
  bandwidth: [
    { id: 'b_5m', name: '5 Mbps', price: 10, unit: 'USD/Month' },
    { id: 'b_10m', name: '10 Mbps', price: 18, unit: 'USD/Month' },
    { id: 'b_20m', name: '20 Mbps', price: 30, unit: 'USD/Month' },
    { id: 'b_50m', name: '50 Mbps', price: 60, unit: 'USD/Month' },
  ]
};

export const DURATIONS = [
  { id: 'd_1', days: 1, label: '1天', discountRate: 1, discountLabel: '' },
  { id: 'd_7', days: 7, label: '7天', discountRate: 1, discountLabel: '' },
  { id: 'd_14', days: 14, label: '14天', discountRate: 1, discountLabel: '' },
  { id: 'd_30', days: 30, label: '1个月', discountRate: 1, discountLabel: '' },
  { id: 'd_60', days: 60, label: '2个月', discountRate: 0.95, discountLabel: '95折' },
  { id: 'd_90', days: 90, label: '3个月', discountRate: 0.9, discountLabel: '9折' },
  { id: 'd_180', days: 180, label: '6个月', discountRate: 0.85, discountLabel: '85折' },
  { id: 'd_365', days: 365, label: '1年', discountRate: 0.8, discountLabel: '8折' },
  { id: 'custom', days: null, label: '自定义', discountRate: 1, discountLabel: '' },
];

export const SUBSCRIPTION_CYCLES = [
  { id: 'c_7', days: 7, label: '每7天', discountRate: 1, discountLabel: '' },
  { id: 'c_14', days: 14, label: '每14天', discountRate: 1, discountLabel: '' },
  { id: 'c_30', days: 30, label: '每月', discountRate: 1, discountLabel: '' },
  { id: 'c_90', days: 90, label: '每季度', discountRate: 0.95, discountLabel: '95折' },
  { id: 'c_365', days: 365, label: '每年', discountRate: 0.9, discountLabel: '9折' },
];

export const ALL_PROTOCOLS = ['SOCKS5', 'HTTP', 'HTTPS', 'Wireguard', 'VLESS', 'Trojan'];

// Mock User Balance
export const USER_BALANCE = 50.00; // Example balance

// Mock Saved Payment Methods
export const SAVED_PAYMENT_METHODS = [
  {
    id: 'pm_1',
    type: 'card',
    last4: '4242',
    expiry: '12/25',
    brand: 'visa',
    isDefault: true
  },
  {
    id: 'pm_2',
    type: 'paypal',
    email: 'chen***@yahoo.com',
    isDefault: false
  }
];

// 模拟从管理端资源池提取的可用IP资源 (按国家与业务场景映射)
export const RESOURCE_POOL = {
  'us': { 
    total: 1250, 
    available: 890,
    scenarios: {
      'amazon': { available: 800 },
      'ebay': { available: 45 },
      'shopify': { available: 210 },
      'tiktok_shop': { available: 120 }
    }
  },
  'gb': { 
    total: 500, 
    available: 320,
    scenarios: {
      'amazon': { available: 150 },
      'ebay': { available: 80 }
    }
  },
  'hk': { 
    total: 200, 
    available: 45,
    scenarios: {
      'facebook': { available: 10 }
    }
  },
  'sg': { 
    total: 300, 
    available: 210,
    scenarios: {
      'whatsapp': { available: 100 }
    }
  },
  'jp': { 
    total: 150, 
    available: 20,
    scenarios: {
      'facebook': { available: 15 },
      'instagram': { available: 5 }
    }
  },
};











