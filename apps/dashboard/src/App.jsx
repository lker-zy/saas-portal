import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from './contexts/AuthContext';
import Header from './components/Header';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import PurchaseGuideWizard from './components/PurchaseGuideWizard';
import StaticResidentialPurchase from './components/StaticResidentialPurchase';
import BillingCenter from './components/BillingCenter';
import { orderService } from './services/orderService';
import { ticketService } from './services/ticketService';
import ReferralView from './components/ReferralView';
import MessageCenter from './components/MessageCenter';
import CouponCenter from './components/CouponCenter';
import UserProfile from './components/UserProfile';
import ProfileSettings from './components/ProfileSettings';
import AddressManagement from './components/AddressManagement';
import PaymentManagement from './components/PaymentManagement';
import ProxyExportModal from './components/ProxyExportModal';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Settings, 
  User, 
  Search, 
  Filter, 
  Download, 
  Copy, 
  Shield, 
  Globe, 
  Zap, 
  Server, 
  Clock, 
  QrCode,
  FileText,
  List,
  X,
  CheckCircle2,
  Share2,
  Terminal,
  Smartphone,
  Wifi,
  Lock,
  Eye,
  EyeOff,
  Table2,
  MapPin,
  Calendar,
  Activity,
  HardDrive,
  Layers,
  Network,
  Hash,
  AlertCircle,
  FileWarning,
  ChevronRight,
  ChevronLeft,
  ArrowLeft,
  CreditCard,
  Signal,
  ChevronDown,
  ChevronUp,
  Box,
  Monitor,
  Save,
  DownloadCloud,
  FolderOpen,
  RefreshCw,
  Cpu,
  Code2,
  Laptop,
  Check,
  BookOpen,
  MousePointerClick,
  AppWindow,
  Router as RouterIcon,
  FileCode,
  Sliders,
  Play,
  CheckSquare,
  ArrowRight,
  Plus,
  Trash2,
  Smartphone as DevicePhone,
  Tv,
  Gamepad2,
  MoreHorizontal,
  Command, 
  Rocket,  
  Bot,
  MessageSquare,
  LifeBuoy,
  Mail,
  Paperclip,
  Send,
  MessageCircle,
  AlertTriangle,
  CheckCircle,
  MoreVertical,
  Info,
  ExternalLink,
  Gift,
  Bell,
  Ticket,
  Briefcase,
  Sparkles,
  TrendingUp,
  Home,
  Loader2,
} from 'lucide-react';

// --- 1. Basic Tools & Data ---

const copyToClipboard = (text) => {
  if (typeof navigator !== 'undefined' && navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
    navigator.clipboard.writeText(text).catch((err) => {
      console.warn('Copy failed:', err);
    });
  } else {
    // Fallback for older browsers or non-secure contexts
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
    } catch (err) {
      console.error('Fallback copy failed', err);
    }
    document.body.removeChild(textArea);
  }
};

const safeBtoa = (str) => {
  if (typeof btoa === 'function') {
    return btoa(str);
  }
  if (typeof Buffer !== 'undefined') {
    return Buffer.from(str, 'utf-8').toString('base64');
  }
  throw new Error('No base64 encoder available for btoa');
};


const ORDERS_DATA = [
  {
    id: "ORD-20231025-8823",
    user: "alex_proxy_user",
    status: "active",
    type: "Static Residential ISP",
    typeLabel: "静态住宅 ISP",
    region: "US - United States (Optimized)",
    bandwidth: "Unlimited / 1Gbps",
    trafficUsed: "124.5 GB",
    purchaseDate: "2023-10-25",
    expireDate: "2025-12-31",
    scenarios: ["E-commerce", "Social Media"],
    supportedProtocols: ["HTTP", "SOCKS5", "VLESS"],
    totalIps: 25,
    mockIps: ["192.168.1.101", "192.168.1.102"],
    terms: "本服务仅限用于合法合规的业务用途。严禁用于垃圾邮件(SPAM)、网络攻击等。",
    scope: "✅ 允许范围：跨境电商、社媒管理等\n❌ 禁止范围：邮件群发、金融欺诈",
  },
  {
    id: "ORD-20231102-9941",
    user: "alex_proxy_user",
    status: "expiring",
    type: "Datacenter IPv4",
    typeLabel: "数据中心 IPv4",
    region: "HK - Hong Kong CN2",
    bandwidth: "10TB Monthly",
    trafficUsed: "8.2 TB",
    purchaseDate: "2023-11-02",
    expireDate: "2023-11-30",
    scenarios: ["Data Scraping", "SEO Monitoring"],
    supportedProtocols: ["HTTP", "SOCKS5"],
    totalIps: 100,
    mockIps: ["10.0.0.55", "10.0.0.56"],
    terms: "禁止用于任何形式的网络攻击或非法爬取。",
    scope: "✅ 允许范围：公开数据采集、SEO工具\n❌ 禁止范围：绕过版权限制、DDoS",
  },
  {
    id: "ORD-20230915-7712",
    user: "alex_proxy_user",
    status: "expired",
    type: "Static Residential ISP",
    typeLabel: "静态住宅 ISP",
    region: "GB - United Kingdom",
    bandwidth: "Unlimited",
    trafficUsed: "500.1 GB",
    purchaseDate: "2023-09-15",
    expireDate: "2023-10-15",
    scenarios: ["E-commerce"],
    supportedProtocols: ["HTTP", "SOCKS5", "VMess"],
    totalIps: 10,
    mockIps: ["172.16.0.1"],
    terms: "本服务仅限用于合法合规的业务用途。",
    scope: "✅ 允许范围：跨境电商\n❌ 禁止范围：邮件群发",
  },
  {
    id: "ORD-20240110-3321",
    user: "alex_proxy_user",
    status: "active",
    type: "Mobile 4G/5G",
    typeLabel: "移动 4G/5G",
    region: "JP - Tokyo",
    bandwidth: "50GB Monthly",
    trafficUsed: "12.5 GB",
    purchaseDate: "2024-01-10",
    expireDate: "2024-02-10",
    scenarios: ["App Testing", "Account Reg"],
    supportedProtocols: ["HTTP", "SOCKS5"],
    totalIps: 5,
    mockIps: ["10.10.10.10"],
    terms: "仅限用于应用测试和账号注册。",
    scope: "✅ 允许范围：App测试\n❌ 禁止范围：大流量下载",
  }
];

// 使用条款和授权范围辅助函数
const getTermsOfUse = (scenario) => {
  const termsMap = {
    'ecommerce': '本服务仅限用于合法合规的电商业务用途。严禁用于垃圾邮件(SPAM)、网络攻击等违规活动。',
    'social_media': '本服务仅限用于社媒账号管理等合规用途。禁止用于批量注册、刷粉刷赞等违规操作。',
    'scraping': '本服务仅限用于公开数据采集。严禁用于绕过网站访问限制、窃取版权内容等行为。',
    'gaming': '本服务仅限用于游戏加速和降低延迟。禁止用于游戏外挂、作弊程序等相关活动。',
    'seo': '本服务仅限用于SEO监控和优化工具。禁止用于恶意爬取、DDoS攻击等行为。',
    'ads': '本服务仅限用于广告投放和效果监控。禁止用于点击欺诈、虚假流量等违规操作。',
    'default': '本服务仅限用于合法合规的业务用途。严禁用于任何违法违规活动。',
  };
  return termsMap[scenario] || termsMap['default'];
};

const getAuthorizationScope = (scenario) => {
  const scopeMap = {
    'ecommerce': '✅ 允许范围：跨境电商店铺管理、价格监控、商品上架\n❌ 禁止范围：垃圾邮件营销、刷单刷评',
    'social_media': '✅ 允许范围：社媒账号管理、内容发布、数据分析\n❌ 禁止范围：批量注册、机器刷粉、恶意营销',
    'scraping': '✅ 允许范围：公开数据采集、SEO工具、市场分析\n❌ 禁止范围：绕过版权限制、DDoS攻击、窃取数据',
    'gaming': '✅ 允许范围：游戏加速、降低延迟、连接优化\n❌ 禁止范围：游戏外挂、作弊程序、辅助脚本',
    'seo': '✅ 允许范围：SEO监控、关键词排名、竞品分析\n❌ 禁止范围：恶意爬取、大规模采集、绕过限制',
    'ads': '✅ 允许范围：广告投放、效果监控、A/B测试\n❌ 禁止范围：点击欺诈、虚假流量、恶意刷单',
    'default': '✅ 允许范围：合法业务用途\n❌ 禁止范围：任何违法违规活动',
  };
  return scopeMap[scenario] || scopeMap['default'];
};

const LOCATIONS = [
  { city: "Mountain View", region: "California", region_code: "CA", country: "United States", country_code: "US", continent: "North America", continent_code: "NA", latitude: 37.3860, longitude: -122.0838, timezone: "America/Los_Angeles", zip: "94043" },
  { city: "New York", region: "New York", region_code: "NY", country: "United States", country_code: "US", continent: "North America", continent_code: "NA", latitude: 40.7128, longitude: -74.0060, timezone: "America/New_York", zip: "10001" },
  { city: "London", region: "England", region_code: "ENG", country: "United Kingdom", country_code: "GB", continent: "Europe", continent_code: "EU", latitude: 51.5074, longitude: -0.1278, timezone: "Europe/London", zip: "SW1A 1AA" },
  { city: "Tokyo", region: "Tokyo", region_code: "13", country: "Japan", country_code: "JP", continent: "Asia", continent_code: "AS", latitude: 35.6762, longitude: 139.6503, timezone: "Asia/Tokyo", zip: "100-0001" },
  { city: "Singapore", region: "Singapore", region_code: "SG", country: "Singapore", country_code: "SG", continent: "Asia", continent_code: "AS", latitude: 1.3521, longitude: 103.8198, timezone: "Asia/Singapore", zip: "018956" },
];

const getProtocolsForIndex = (i) => {
  const base = ["HTTP", "SOCKS5"];
  if (i % 4 === 0) return [...base, "VLESS", "VMess"];
  return [...base];
};

const generateProxyList = (count, region) => {
  return Array.from({ length: count }).map((_, i) => {
    const loc = LOCATIONS[i % LOCATIONS.length];
    return {
      id: i + 1,
      ip: `192.168.${Math.floor(Math.random() * 255)}.${100 + i}`,
      port: 10000 + i,
      protocols: getProtocolsForIndex(i),
      ...loc,
      status: "online",
      username: "user_123",
      password: "pass_xyz_" + i,
      uuid: "550e8400-e29b-41d4-a716-446655440000",
      trojanPass: "trojan-pass-888",
      ssMethod: "aes-256-gcm",
      ssPass: "ss-secret-key",
    };
  });
};

const generateDetailedProxyList = (order) => {
  const totalIps = order.totalIps || order.quantity || order.ip_quantity || 1;
  const protocols = order.supportedProtocols || order.protocols || ['HTTP'];
  const country = order.region || order.country || 'US';

  return Array.from({ length: totalIps }).map((_, i) => {
    const loc = LOCATIONS[i % LOCATIONS.length];
    // Generate IP based on country code
    const ipBase = country === 'US' ? '192' : country === 'CN' ? '10' : '172';
    const ip = `${ipBase}.168.1.${100 + i}`;

    return {
      id: `${order.id}_node_${i + 1}`,
      orderId: order.id,
      ip: ip,
      port: 10000 + i,
      availableProtocols: protocols,
      ...loc,
      status: "online",
      username: "user_123",
      password: "pass_xyz_" + i,
      uuid: "550e8400-e29b-41d4-a716-446655440000",
    };
  });
};

const PURCHASE_OPTIONS = {
  regions: [
    { id: 'us', name: '美国', enName: 'United States', flag: '🇺🇸', stock: '充足', stockColor: 'text-green-600' },
    { id: 'hk', name: '香港', enName: 'Hong Kong', flag: '🇭🇰', stock: '少量', stockColor: 'text-amber-600' },
    { id: 'sg', name: '新加坡', enName: 'Singapore', flag: '🇸🇬', stock: '充足', stockColor: 'text-green-600' },
  ],
  scenarios: [
    { id: '电商', name: '跨境电商', sub: 'Amazon / eBay', icon: ShoppingCart },
    { id: '社媒', name: '社媒营销', sub: 'FB / TikTok', icon: Share2 },
    { id: '爬虫', name: '数据采集', sub: 'SEO / Price', icon: Code2 },
    { id: '游戏', name: '游戏加速', sub: 'Low Ping', icon: Zap },
  ],
  ipLevels: [
    { id: 'basic', name: '基础版', desc: '共享 IP 池', priceMod: 1, badge: '性价比' },
    { id: 'standard', name: '标准版', desc: '独享 IP', priceMod: 1.5, badge: '推荐' },
    { id: 'premium', name: '高级版', desc: '原生双ISP', priceMod: 2.5, badge: '企业级' },
  ],
  terminals: [
    { id: 'browser', name: '指纹浏览器', icon: Globe },
    { id: 'mobile', name: '手机/模拟器', icon: Smartphone },
    { id: 'server', name: '服务器 VPS', icon: Server },
    { id: 'api', name: 'API 对接', icon: Terminal },
  ],
  protocols: ['Socks5', 'HTTP(s)', 'Vmess', 'Shadowsocks', 'Wireguard'],
  durations: [
    { id: 7, label: '7天' },
    { id: 30, label: '30天', sub: '月付', discount: '-5%' },
  ]
};

// --- 2. Basic Components ---

const StatusBadge = ({ status }) => (
  <span className={`px-2 py-0.5 rounded text-xs font-medium border flex items-center gap-1.5 w-fit ${
    status === 'active' || status === 'online' ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
    "bg-gray-50 text-gray-500 border-gray-200"
  }`}>
    {(status === 'active' || status === 'online') && <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />}
    {status === 'active' || status === 'online' ? '正常运行' : status}
  </span>
);

const TicketStatusBadge = ({ status, label }) => {
  const styles = {
    processing: "bg-blue-50 text-blue-700 border-blue-200 ring-blue-100",
    resolved: "bg-green-50 text-green-700 border-green-200 ring-green-100",
    closed: "bg-gray-50 text-gray-500 border-gray-200 ring-gray-100",
    pending: "bg-amber-50 text-amber-700 border-amber-200 ring-amber-100",
  };
  
  const icon = {
    processing: <RefreshCw className="w-3 h-3 animate-spin-slow" />,
    resolved: <CheckCircle className="w-3 h-3" />,
    closed: <X className="w-3 h-3" />,
    pending: <Clock className="w-3 h-3" />,
  };

  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-medium border flex items-center gap-1.5 w-fit ring-1 ${styles[status] || styles.closed}`}>
      {icon[status]}
      {label}
    </span>
  );
};

const ProtocolTag = ({ type }) => {
  const styles = {
    HTTP: "bg-blue-50 text-blue-700 border-blue-100",
    SOCKS5: "bg-purple-50 text-purple-700 border-purple-100",
    VLESS: "bg-blue-50 text-blue-700 border-blue-100",
    VMess: "bg-pink-50 text-pink-700 border-pink-100",
  };
  return (
    <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold border cursor-default whitespace-nowrap ${styles[type] || "bg-gray-50 text-gray-600"}`}>
      {type}
    </span>
  );
};

const PasswordField = ({ value }) => {
  const [show, setShow] = useState(false);
  return (
    <div className="flex items-center gap-2 group">
      <span className="font-mono text-xs text-gray-700 bg-gray-50 px-2 py-1 rounded border border-gray-200 min-w-[100px]">
        {show ? value : "••••••••"}
      </span>
      <button onClick={() => setShow(!show)} className="text-gray-400 hover:text-blue-600" type="button">
        {show ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
      </button>
      <button onClick={() => copyToClipboard(value)} className="text-gray-400 hover:text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" title="复制" type="button">
        <Copy className="w-3 h-3" />
      </button>
    </div>
  );
};

// --- DASHBOARD VIEW ---
const generateMockYaml = (config) => {
  if (!config) return '';
  const net = config.networkConfig || { mixedPort: 7890, allowLan: true, mode: 'rule', bindAddress: '*' };
  const rules = config.lanRules || [];
  
  const proxyList = Object.keys(config.proxySelections || {}).map(pid => `  - { name: "${pid}", type: ss, server: 1.2.3.4, port: 443 }`).join('\n');
  const groupProxies = Object.keys(config.proxySelections || {}).map(pid => `"${pid}"`).join(', ');

  const lanRulesYaml = rules.map(r => `  - SRC-IP-CIDR,${r.ip}/32,${r.proxyId === 'auto' ? 'PROXY' : `"${r.proxyId}"`}`).join('\n');

  return `# ProxyManager Config: ${config.name}
# Client: ${config.client}
# Updated: ${config.updateTime || new Date().toLocaleString()}

mixed-port: ${net.mixedPort}
allow-lan: ${net.allowLan}
bind-address: "${net.bindAddress}"
mode: ${net.mode}
log-level: info

proxies:
${proxyList || '  - { name: "Default-Node", type: ss, server: 1.2.3.4, port: 443 }'}

proxy-groups:
  - name: PROXY
    type: select
    proxies: [AUTO, DIRECT, ${groupProxies || '"Default-Node"'}]
  
  - name: AUTO
    type: url-test
    url: 'http://www.gstatic.com/generate_204'
    interval: 300
    proxies: [${groupProxies || '"Default-Node"'}]

rules:
${lanRulesYaml || '  - MATCH,PROXY'}
  - MATCH,PROXY`;
};

const YamlConfigModal = ({ config, onClose }) => {
  if (!config) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[85vh]">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div>
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              查看 YAML 配置
            </h3>
            <p className="text-[10px] text-gray-400 font-mono mt-0.5">{config.name} - {config.client}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-lg text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto flex-1 bg-slate-900 text-left">
          <pre className="text-xs md:text-sm font-mono text-blue-300 leading-relaxed overflow-x-auto whitespace-pre-wrap">
            {generateMockYaml(config)}
          </pre>
        </div>
        <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3 bg-gray-50">
          <button 
            onClick={() => {
              navigator.clipboard.writeText(generateMockYaml(config));
              alert('配置已复制到剪贴板');
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all flex items-center gap-2"
          >
            <Copy className="w-4 h-4" /> 复制代码
          </button>
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  );
};

const DashboardView = ({ savedConfigs, onNavigate, onOpenWizard, onOpenPurchaseGuide, purchaseGuideHidden, onRestorePurchaseGuide, onEditConfig }) => {
  const [viewingYamlConfig, setViewingYamlConfig] = useState(null);
  const { t, i18n } = useTranslation();
  const [is3DMode, setIs3DMode] = useState(true);
  
  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'zh' : 'en');
  };
  
  return (
    <div className="relative min-h-screen pb-20" style={{perspective: '2000px'}}>
      {/* Cyberpunk Background with 3D depth */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 -z-10"></div>
      <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgxMDAsMTAwLDI1NSwwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30 -z-10" style={{transform: 'translateZ(-100px)'}}></div>
      
      {/* 3D Mode Toggle - Moved to top left */}
      <button
        onClick={() => setIs3DMode(!is3DMode)}
        className="fixed top-4 left-4 z-50 px-3 py-2 bg-slate-800/80 backdrop-blur-xl border border-cyan-500/50 rounded-lg text-cyan-400 text-[10px] font-medium uppercase hover:bg-cyan-500/20 transition-all shadow-lg shadow-cyan-500/20 flex items-center gap-2"
        style={{transform: 'translateZ(100px)'}}
        title={is3DMode ? '点击关闭3D模式' : '点击开启3D模式'}
      >
        <div className={`w-2 h-2 rounded-full ${is3DMode ? 'bg-cyan-400 animate-pulse' : 'bg-slate-500'}`}></div>
        {is3DMode ? '3D ON' : '3D OFF'}
      </button>
      
      <div className="space-y-6 animate-in fade-in duration-700" style={{transformStyle: 'preserve-3d'}}>
        {/* HUD Header with 3D Effect */}
        <div 
          className="relative transition-all duration-500 hover:scale-[1.02]" 
          style={{
            transform: is3DMode ? 'translateZ(50px) rotateX(2deg)' : 'none',
            transformStyle: 'preserve-3d'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-transparent to-purple-500/20 blur-3xl"></div>
          <div className="relative bg-gradient-to-r from-slate-900/80 to-slate-800/80 backdrop-blur-xl border-l-4 border-cyan-400 rounded-r-2xl p-6 shadow-2xl shadow-cyan-500/20" style={{
            boxShadow: is3DMode ? '0 25px 50px -12px rgba(6, 182, 212, 0.5), 0 0 0 1px rgba(6, 182, 212, 0.1), inset 0 2px 4px 0 rgba(255, 255, 255, 0.06)' : undefined
          }}>
            <div className="flex items-center justify-between">
              <div>
                <div 
                  onClick={toggleLanguage}
                  className="flex items-center gap-1 mb-2 cursor-pointer hover:bg-cyan-500/10 px-3 py-1 -mx-3 -my-1 rounded-lg transition-all group"
                  title={i18n.language === 'zh' ? '点击切换到英文' : 'Click to switch to Chinese'}
                >
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse shadow-lg shadow-cyan-400 group-hover:scale-125 transition-transform"></div>
                  <span className="text-cyan-400 text-xs font-medium uppercase tracking-wider group-hover:text-cyan-300 transition-colors">
                    {i18n.language === 'zh' ? '系统在线' : 'System Online'}
                  </span>
                  <span className="text-cyan-400/50 text-[10px] ml-1 group-hover:text-cyan-300 transition-colors">
                    [{i18n.language === 'zh' ? 'ZH' : 'EN'}]
                  </span>
                </div>
                <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 tracking-tight" style={{
                  textShadow: is3DMode ? '0 0 30px rgba(34, 211, 238, 0.5), 0 4px 8px rgba(0, 0, 0, 0.3)' : undefined
                }}>
                  {i18n.language === 'zh' ? '指挥中心' : 'COMMAND CENTER'}
                </h1>
                <p className="text-slate-400 mt-1 font-medium">{i18n.language === 'zh' ? '神经网络资源管理系统' : 'Neural Network Resource Management System'}</p>
              </div>
              <div className="hidden md:flex items-center gap-4">
                <div className="text-right" style={{transform: is3DMode ? 'translateZ(20px)' : 'none'}}>
                  <div className="text-xs text-slate-500 font-mono uppercase">{i18n.language === 'zh' ? '运行时间' : 'UPTIME'}</div>
                  <div className="text-2xl font-black text-emerald-400">99.98%</div>
                </div>
                <div className="w-px h-12 bg-slate-700"></div>
                <div className="text-right" style={{transform: is3DMode ? 'translateZ(20px)' : 'none'}}>
                  <div className="text-xs text-slate-500 font-mono uppercase">{i18n.language === 'zh' ? '带宽' : 'BANDWIDTH'}</div>
                  <div className="text-2xl font-black text-purple-400">16.8 MB/s</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats HUD with 3D Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4" style={{transformStyle: 'preserve-3d'}}>
          {[
            { label: 'ACTIVE NODES', labelZh: '活跃节点', value: '12', icon: Activity, color: 'cyan', gradient: 'from-cyan-500 to-blue-500', path: 'M0 25 Q 15 15, 30 20 T 60 10 T 100 20' },
            { label: 'CONFIGS', labelZh: '配置数量', value: savedConfigs.length, icon: FileCode, color: 'purple', gradient: 'from-purple-500 to-pink-500', path: 'M0 20 Q 25 25, 50 15 T 100 10' },
            { label: 'DEVICES', labelZh: '设备数量', value: '8', icon: Monitor, color: 'emerald', gradient: 'from-emerald-500 to-teal-500', path: 'M0 25 L 20 25 L 20 15 L 40 15 L 40 25 L 60 25 L 60 10 L 80 10 L 80 25 L 100 25' },
            { label: 'TRAFFIC', labelZh: '流量统计', value: '2.4TB', icon: TrendingUp, color: 'amber', gradient: 'from-amber-500 to-orange-500', path: 'M0 30 C 20 30, 20 10, 40 10 C 60 10, 60 25, 80 25 C 90 25, 90 5, 100 5' }
          ].map((stat, i) => (
            <div 
              key={i} 
              className="group relative transition-all duration-500 hover:scale-110"
              style={{
                transform: is3DMode ? `translateZ(${30 + i * 10}px) rotateY(${i * 2}deg)` : 'none',
                transformStyle: 'preserve-3d',
                animationDelay: `${i * 100}ms`
              }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-20 blur-xl group-hover:opacity-40 transition-all duration-500`}></div>
              <div 
                className="relative bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-xl p-4 hover:border-slate-600 transition-all duration-300 clip-corner overflow-hidden"
                style={{
                  boxShadow: is3DMode ? `0 20px 40px -10px rgba(var(--tw-shadow-color), 0.5), inset 0 2px 4px 0 rgba(255, 255, 255, 0.06)` : undefined
                }}
              >
                {/* Sparkline SVG */}
                <div className="absolute bottom-0 left-0 right-0 h-16 opacity-20 group-hover:opacity-40 transition-opacity pointer-events-none">
                   <svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 100 30">
                      <path d={stat.path} fill="none" stroke="currentColor" strokeWidth="3" className={`text-${stat.color}-400`} vectorEffect="non-scaling-stroke" />
                      <path d={`${stat.path} V 30 L 0 30 Z`} fill="currentColor" stroke="none" className={`text-${stat.color}-500/30`} />
                   </svg>
                </div>

                <div className="flex items-center justify-between mb-3 relative z-10">
                  <div 
                    className={`p-2 bg-gradient-to-br ${stat.gradient} rounded-lg shadow-lg`}
                    style={{transform: is3DMode ? 'translateZ(15px)' : 'none'}}
                  >
                    <stat.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="w-8 h-8 border-2 border-dashed border-slate-700 rounded-full animate-spin-slow opacity-20"></div>
                </div>
                <div className="text-xs text-slate-500 font-medium uppercase tracking-wider relative z-10">
                  {i18n.language === 'zh' ? stat.labelZh : stat.label}
                </div>
                <div 
                  className={`text-3xl font-black text-${stat.color}-400 mt-1 relative z-10`}
                  style={{
                    textShadow: is3DMode ? `0 0 20px rgba(var(--tw-shadow-color), 0.8), 0 4px 6px rgba(0, 0, 0, 0.4)` : undefined,
                    transform: is3DMode ? 'translateZ(10px)' : 'none'
                  }}
                >
                  {stat.value}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Control Center */}
          <div className="lg:col-span-2 space-y-6">
            {/* Router Config Card with 3D Effect */}
            <div 
              className="group relative transition-all duration-500"
              style={{
                transform: is3DMode ? 'translateZ(40px) rotateX(3deg)' : 'none',
                transformStyle: 'preserve-3d'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur-2xl opacity-50 group-hover:opacity-100 transition-all duration-700"></div>
              <div 
                className="relative bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl overflow-hidden"
                style={{
                  boxShadow: is3DMode ? '0 30px 60px -15px rgba(6, 182, 212, 0.5), inset 0 2px 4px 0 rgba(255, 255, 255, 0.06)' : undefined
                }}
              >
                {/* Animated Border */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 blur-sm transition-all duration-500" style={{padding: '1px'}}></div>
                
                <div className="relative bg-slate-900/95 rounded-2xl p-6 m-[1px]">
                  {/* Scan Lines */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent opacity-50 pointer-events-none animate-scan"></div>
                  
                  <div className="flex flex-col lg:flex-row items-center gap-6">
                    <div className="flex-1 space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="relative" style={{transform: is3DMode ? 'translateZ(30px)' : 'none'}}>
                          <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/50">
                            <Wifi className="w-5 h-5 text-white" />
                          </div>
                          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg blur opacity-50 animate-pulse"></div>
                        </div>
                        <div>
                          <div className="text-[10px] text-cyan-400 font-medium uppercase tracking-wider">
                            {i18n.language === 'zh' ? '神经网关' : 'NEURAL GATEWAY'}
                          </div>
                          <h3 className="text-xl font-black text-white" style={{
                            textShadow: is3DMode ? '0 0 20px rgba(34, 211, 238, 0.5), 0 4px 8px rgba(0, 0, 0, 0.3)' : undefined
                          }}>
                            {i18n.language === 'zh' ? '路由配置' : 'Router Configuration'}
                          </h3>
                        </div>
                      </div>
                      
                      <p className="text-slate-400 text-xs leading-relaxed">
                        {i18n.language === 'zh' 
                          ? '跨多个平台部署优化的网络配置。支持工作室/多设备环境和高级流量路由。'
                          : 'Deploy optimized network configurations across multiple platforms. Supports studio/multi-device environments with advanced traffic routing.'}
                      </p>
                      
                      <button 
                        onClick={() => onOpenWizard('mihomo')}
                        className="group/btn relative px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-bold text-white overflow-hidden shadow-lg shadow-cyan-500/50 hover:shadow-cyan-500/80 transition-all duration-300"
                        style={{
                          transform: is3DMode ? 'translateZ(20px)' : 'none',
                          boxShadow: is3DMode ? '0 10px 30px -5px rgba(6, 182, 212, 0.8)' : undefined
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
                        <span className="relative flex items-center gap-2 uppercase text-xs font-medium">
                          <Zap className="w-4 h-4" />
                          {i18n.language === 'zh' ? '初始化配置' : 'INITIALIZE CONFIG'}
                          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </span>
                      </button>
                    </div>
                    
                    {/* Platform Grid with 3D Cards */}
                    <div className="grid grid-cols-3 gap-3" style={{transformStyle: 'preserve-3d'}}>
                      {[
                        { name: 'Windows', icon: Monitor, color: 'blue', action: 'clash_win' },
                        { name: 'macOS', icon: Command, color: 'slate', action: 'surge_mac' },
                        { name: 'iOS', icon: Rocket, color: 'pink', action: 'shadowrocket' },
                        { name: 'Android', icon: Smartphone, color: 'emerald', action: 'v2rayng' },
                        { name: 'Router', nameZh: '路由器', icon: RouterIcon, color: 'purple', action: 'openwrt' },
                        { name: 'Linux', icon: Terminal, color: 'amber', action: 'mihomo' }
                      ].map((platform, i) => (
                        <div 
                          key={i}
                          onClick={() => onOpenWizard(platform.action)}
                          className="group/platform relative p-4 bg-slate-800/50 border border-slate-700/50 rounded-lg hover:bg-slate-700/50 hover:border-slate-600 cursor-pointer transition-all duration-300 hover:scale-110"
                          style={{
                            transform: is3DMode ? `translateZ(${15 + i * 5}px) rotateY(${i * 3}deg)` : 'none',
                            transformStyle: 'preserve-3d'
                          }}
                        >
                          <div className={`absolute inset-0 bg-gradient-to-br from-${platform.color}-500/20 to-transparent opacity-0 group-hover/platform:opacity-100 transition-opacity rounded-lg`}></div>
                          <platform.icon 
                            className={`w-6 h-6 text-${platform.color}-400 mx-auto mb-2`}
                            style={{transform: is3DMode ? 'translateZ(10px)' : 'none'}}
                          />
                          <div className="text-[10px] text-slate-400 text-center font-medium uppercase">
                            {platform.nameZh && i18n.language === 'zh' ? platform.nameZh : platform.name}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Saved Configs with 3D Effect */}
            <div 
              className="relative bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl overflow-hidden transition-all duration-500"
              style={{
                transform: is3DMode ? 'translateZ(30px) rotateX(2deg)' : 'none',
                transformStyle: 'preserve-3d',
                boxShadow: is3DMode ? '0 20px 40px -10px rgba(168, 85, 247, 0.4)' : undefined
              }}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <FileCode className="w-5 h-5 text-purple-400" style={{transform: is3DMode ? 'translateZ(15px)' : 'none'}} />
                    <h3 className="text-lg font-black text-white uppercase text-xs font-medium" style={{
                      textShadow: is3DMode ? '0 0 20px rgba(168, 85, 247, 0.5)' : undefined,
                      transform: is3DMode ? 'translateZ(10px)' : 'none'
                    }}>
                      {i18n.language === 'zh' ? '已保存配置' : 'SAVED CONFIGURATIONS'}
                    </h3>
                  </div>
                  <button 
                    onClick={() => onNavigate('router_config')}
                    className="text-xs text-cyan-400 hover:text-cyan-300 font-medium uppercase tracking-wider hover:underline transition-colors"
                    style={{transform: is3DMode ? 'translateZ(10px)' : 'none'}}
                  >
                    {i18n.language === 'zh' ? '查看全部 →' : 'VIEW ALL →'}
                  </button>
                </div>
                
                {savedConfigs.length === 0 ? (
                  <div className="py-12 text-center">
                    <FileCode className="w-16 h-16 mx-auto mb-4 text-slate-700" />
                    <p className="text-slate-500 font-medium uppercase text-xs">
                      {i18n.language === 'zh' ? '未找到配置' : 'No configurations found'}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3" style={{transformStyle: 'preserve-3d'}}>
                    {savedConfigs.map((config, i) => (
                      <div 
                        key={config.id}
                        className="group/config relative bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 hover:bg-slate-800 hover:border-slate-600 transition-all duration-300 hover:scale-105"
                        style={{
                          animationDelay: `${i * 100}ms`,
                          transform: is3DMode ? `translateZ(${10 + i * 5}px)` : 'none',
                          transformStyle: 'preserve-3d'
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div 
                              className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-black text-sm shadow-lg"
                              style={{transform: is3DMode ? 'translateZ(15px)' : 'none'}}
                            >
                              {config.client.substring(0,2).toUpperCase()}
                            </div>
                            <div>
                              <div className="font-bold text-white">{config.name}</div>
                              <div className="text-xs text-slate-500 font-medium uppercase flex items-center gap-2 mt-1">
                                <span>{config.nodeCount} {i18n.language === 'zh' ? '节点' : 'nodes'}</span>
                                <span>•</span>
                                <span>{config.updateTime}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            <button 
                              onClick={() => setViewingYamlConfig(config)}
                              className="p-2 bg-cyan-500/10 border border-cyan-500/30 rounded-lg text-cyan-400 hover:bg-cyan-500 hover:text-white transition-all duration-300"
                              title={i18n.language === 'zh' ? '查看 YAML' : 'View YAML'}
                              style={{transform: is3DMode ? 'translateZ(10px)' : 'none'}}
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button 
                              className="p-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-slate-400 hover:bg-slate-600 hover:text-white transition-all duration-300"
                              title={i18n.language === 'zh' ? '下载' : 'Download'}
                              style={{transform: is3DMode ? 'translateZ(10px)' : 'none'}}
                            >
                              <DownloadCloud className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => onEditConfig(config)}
                              className="p-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-slate-400 hover:bg-slate-600 hover:text-white transition-all duration-300"
                              title={i18n.language === 'zh' ? '编辑' : 'Edit'}
                              style={{transform: is3DMode ? 'translateZ(10px)' : 'none'}}
                            >
                              <Settings className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Ad Banner - Full Width with 3D Effect */}
            <div 
              className="group relative transition-all duration-500 mb-6"
              style={{
                transform: is3DMode ? 'translateZ(60px) rotateX(3deg)' : 'none',
                transformStyle: 'preserve-3d'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 blur-3xl opacity-50 group-hover:opacity-100 transition-all duration-700"></div>
              <div 
                className="relative bg-gradient-to-r from-slate-900/90 via-slate-800/90 to-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl overflow-hidden"
                style={{
                  boxShadow: is3DMode ? '0 30px 60px -15px rgba(139, 92, 246, 0.5)' : undefined
                }}
              >
                {/* Scan Line Animation */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent animate-scan-slow pointer-events-none"></div>
                
                <div className="relative p-6 flex flex-col lg:flex-row items-center justify-between gap-4">
                  <div className="flex-1 text-center lg:text-left">
                    <div 
                      className="inline-flex items-center gap-2 px-2.5 py-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 rounded-full text-cyan-400 text-[10px] font-medium uppercase mb-3"
                      style={{transform: is3DMode ? 'translateZ(30px)' : 'none'}}
                    >
                      <Shield className="w-3 h-3" />
                      {i18n.language === 'zh' ? '企业解决方案' : 'ENTERPRISE SOLUTION'}
                    </div>
                    <h3 
                      className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 mb-2"
                      style={{
                        textShadow: is3DMode ? '0 0 30px rgba(139, 92, 246, 0.8), 0 4px 8px rgba(0, 0, 0, 0.4)' : undefined,
                        transform: is3DMode ? 'translateZ(25px)' : 'none'
                      }}
                    >
                      {i18n.language === 'zh' ? '定制企业计划' : 'Custom Enterprise Plans Available'}
                    </h3>
                    <p className="text-slate-400 max-w-3xl uppercase text-[10px] font-medium leading-relaxed">
                      {i18n.language === 'zh' 
                        ? '专用资源、私有基础设施、API 集成和 24/7 高级支持，为您的业务需求量身定制。'
                        : 'Dedicated resources, private infrastructure, API integration, and 24/7 premium support tailored for your business needs.'}
                    </p>
                  </div>
                  
                  <button 
                    className="group/btn relative px-6 py-3 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-xl font-black text-white text-xs uppercase overflow-hidden shadow-xl shadow-purple-500/40 hover:shadow-purple-500/60 transition-all duration-300"
                    style={{
                      transform: is3DMode ? 'translateZ(40px)' : 'none',
                      boxShadow: is3DMode ? '0 15px 40px -10px rgba(139, 92, 246, 0.6)' : undefined
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
                    <span className="relative flex items-center gap-2 text-xs font-bold">
                      {i18n.language === 'zh' ? '联系销售' : 'CONTACT SALES'}
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Live Monitor */}
            <div className="relative bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent"></div>
              
              <div className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Activity className="w-5 h-5 text-emerald-400" />
                  <h3 className="text-lg font-black text-white">LIVE MONITOR</h3>
                  <div className="ml-auto flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                    <span className="text-xs text-emerald-400 font-mono">ONLINE</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {[
                    { name: 'MacBook Pro', ip: '192.168.10.101', node: 'US-LA-01', speed: '4.5 MB/s', status: 'active' },
                    { name: 'Windows PC', ip: '192.168.10.102', node: 'UK-LON-03', speed: '8.2 MB/s', status: 'active' },
                    { name: 'Android Phone', ip: '192.168.10.108', node: 'JP-TYO-02', speed: '2.1 MB/s', status: 'idle' }
                  ].map((device, i) => (
                    <div key={i} className="p-4 bg-slate-800/50 border border-slate-700/50 rounded-lg hover:bg-slate-800 transition-all duration-300">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <Monitor className="w-4 h-4 text-slate-400" />
                          <div>
                            <div className="text-sm font-bold text-white">{device.name}</div>
                            <div className="text-[10px] text-slate-500 font-mono">{device.ip}</div>
                          </div>
                        </div>
                        <div className={`px-2 py-1 ${device.status === 'active' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-700 text-slate-400'} rounded text-[10px] font-bold uppercase`}>
                          {device.status}
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-cyan-400 font-mono">{device.node}</span>
                        <span className="text-slate-400">↓ {device.speed}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Purchase Guide / Ad Space 1 with 3D Effect */}
            {!purchaseGuideHidden ? (
              <div 
                className="group relative transition-all duration-500"
                style={{
                  transform: is3DMode ? 'translateZ(50px) rotateY(-5deg)' : 'none',
                  transformStyle: 'preserve-3d'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-pink-500/30 blur-2xl opacity-70 group-hover:opacity-100 transition-all duration-500"></div>
                <div 
                  className="relative bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-900 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-6 overflow-hidden"
                  style={{
                    boxShadow: is3DMode ? '0 25px 50px -12px rgba(168, 85, 247, 0.6)' : undefined
                  }}
                >
                  {/* Holographic Effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-4">
                      <Bot className="w-5 h-5 text-purple-400" style={{transform: is3DMode ? 'translateZ(20px)' : 'none'}} />
                      <span className="text-xs text-purple-400 font-medium uppercase tracking-wider">
                        {i18n.language === 'zh' ? 'AI 助手' : 'AI ASSISTANT'}
                      </span>
                    </div>
                    
                    <h3 
                      className="text-2xl font-black text-white mb-3"
                      style={{
                        textShadow: is3DMode ? '0 0 20px rgba(168, 85, 247, 0.6), 0 4px 8px rgba(0, 0, 0, 0.3)' : undefined,
                        transform: is3DMode ? 'translateZ(15px)' : 'none'
                      }}
                    >
                      {i18n.language === 'zh' ? '智能购买指南' : 'Smart Purchase Guide'}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-6 uppercase text-xs font-medium">
                      {i18n.language === 'zh' 
                        ? '让 AI 在 3 步内为您的业务需求推荐完美的网络解决方案。'
                        : 'Let AI recommend the perfect network solution for your business needs in just 3 steps.'}
                    </p>
                    
                    <button 
                      onClick={onOpenPurchaseGuide}
                      className="w-full group/btn relative px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold text-white overflow-hidden shadow-lg shadow-purple-500/50 uppercase text-xs font-medium"
                      style={{
                        transform: is3DMode ? 'translateZ(25px)' : 'none',
                        boxShadow: is3DMode ? '0 15px 35px -10px rgba(168, 85, 247, 0.8)' : undefined
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
                      <span className="relative flex items-center justify-between">
                        <span>{i18n.language === 'zh' ? '开始引导' : 'START GUIDE'}</span>
                        <ChevronRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
                <Bot className="w-8 h-8 text-slate-600 mb-3" />
                <h3 className="text-lg font-bold text-white mb-2">Guide Hidden</h3>
                <p className="text-slate-500 text-sm mb-4">Purchase guide is currently disabled.</p>
                <button 
                  onClick={onRestorePurchaseGuide}
                  className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-lg transition-colors"
                >
                  Restore Guide
                </button>
              </div>
            )}


            {/* Ad Space 2 - Promotional Banner with 3D Effect */}
            <div 
              className="group relative transition-all duration-500"
              style={{
                transform: is3DMode ? 'translateZ(40px) rotateY(-3deg)' : 'none',
                transformStyle: 'preserve-3d'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/30 to-orange-500/30 blur-2xl opacity-60 group-hover:opacity-100 transition-all duration-500"></div>
              <div 
                className="relative bg-gradient-to-br from-amber-900/30 via-slate-900 to-orange-900/30 backdrop-blur-xl border border-amber-500/30 rounded-2xl p-6 overflow-hidden cursor-pointer hover:scale-[1.05] transition-all duration-300"
                style={{
                  boxShadow: is3DMode ? '0 20px 40px -10px rgba(245, 158, 11, 0.5)' : undefined
                }}
              >
                {/* Animated Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/20 via-transparent to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="relative z-10 text-center">
                  <div 
                    className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 border border-amber-500/30 rounded-full text-amber-400 text-xs font-medium uppercase mb-4"
                    style={{transform: is3DMode ? 'translateZ(20px)' : 'none'}}
                  >
                    <Sparkles className="w-3 h-3" />
                    {i18n.language === 'zh' ? '赞助' : 'SPONSORED'}
                  </div>
                  
                  <h4 
                    className="text-xl font-black text-white mb-2 uppercase text-xs font-medium"
                    style={{
                      textShadow: is3DMode ? '0 0 20px rgba(245, 158, 11, 0.6), 0 4px 8px rgba(0, 0, 0, 0.3)' : undefined,
                      transform: is3DMode ? 'translateZ(15px)' : 'none'
                    }}
                  >
                    {i18n.language === 'zh' ? '高级功能' : 'Premium Features'}
                  </h4>
                  <p className="text-slate-400 text-sm mb-4 uppercase text-xs font-medium">
                    {i18n.language === 'zh' ? '解锁高级分析和优先支持' : 'Unlock advanced analytics & priority support'}
                  </p>
                  
                  <button 
                    className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-bold uppercase text-xs rounded-lg transition-all duration-300 shadow-lg shadow-amber-500/30"
                    style={{
                      transform: is3DMode ? 'translateZ(20px)' : 'none',
                      boxShadow: is3DMode ? '0 10px 25px -5px rgba(245, 158, 11, 0.6)' : undefined
                    }}
                  >
                    {i18n.language === 'zh' ? '了解更多 →' : 'Learn More →'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

       <YamlConfigModal 
         config={viewingYamlConfig} 
         onClose={() => setViewingYamlConfig(null)} 
       />
    </div>
  );
};

const RouterConfigDetailView = ({ config, onBack, onDownload, onUpdateConfig }) => {
  const [localNetworkConfig, setLocalNetworkConfig] = useState(config?.networkConfig || {
    mixedPort: 7890,
    allowLan: true,
    bindAddress: '*',
    mode: 'rule'
  });
  const [localLanRules, setLocalLanRules] = useState(config?.lanRules || []);
  const [localProxySelections, setLocalProxySelections] = useState(config?.proxySelections || {});
  const [isSaving, setIsSaving] = useState(false);
  const [showAddProxyModal, setShowAddProxyModal] = useState(false);
  const [proxySearchTerm, setProxySearchTerm] = useState('');
  
  // Modal states for adding proxies (wizard-style)
  const [modalProxySelections, setModalProxySelections] = useState({});
  const [expandedOrdersInModal, setExpandedOrdersInModal] = useState({});

  // 批量选择状态
  const [selectedProxyIds, setSelectedProxyIds] = useState(new Set());
  const [selectedRuleIds, setSelectedRuleIds] = useState(new Set());

  if (!config) return null;

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      onUpdateConfig({
        ...config,
        networkConfig: localNetworkConfig,
        lanRules: localLanRules,
        proxySelections: localProxySelections,
        nodeCount: Object.keys(localProxySelections).length,
        updateTime: new Date().toLocaleString()
      });
      setIsSaving(false);
      alert('配置已更新并保存');
    }, 600);
  };

  const removeProxy = (proxyId) => {
    const newSelections = { ...localProxySelections };
    delete newSelections[proxyId];
    setLocalProxySelections(newSelections);
    // 同时删除引用该节点的局域网规则
    setLocalLanRules(localLanRules.map(r => r.proxyId === proxyId ? { ...r, proxyId: 'auto' } : r));
    // 清除选择
    const newSelected = new Set(selectedProxyIds);
    newSelected.delete(proxyId);
    setSelectedProxyIds(newSelected);
  };

  const batchRemoveProxies = () => {
    if (selectedProxyIds.size === 0) return;
    if (!window.confirm(`确定要批量删除选中的 ${selectedProxyIds.size} 个代理节点吗？`)) return;

    const newSelections = { ...localProxySelections };
    let newRules = [...localLanRules];

    selectedProxyIds.forEach(id => {
      delete newSelections[id];
      newRules = newRules.map(r => r.proxyId === id ? { ...r, proxyId: 'auto' } : r);
    });

    setLocalProxySelections(newSelections);
    setLocalLanRules(newRules);
    setSelectedProxyIds(new Set());
  };

  const batchRemoveRules = () => {
    if (selectedRuleIds.size === 0) return;
    if (!window.confirm(`确定要批量删除选中的 ${selectedRuleIds.size} 条局域网规则吗？`)) return;

    setLocalLanRules(localLanRules.filter(r => !selectedRuleIds.has(r.id)));
    setSelectedRuleIds(new Set());
  };

  const toggleProxySelection = (id) => {
    const newSelected = new Set(selectedProxyIds);
    if (newSelected.has(id)) newSelected.delete(id);
    else newSelected.add(id);
    setSelectedProxyIds(newSelected);
  };

  const toggleRuleSelection = (id) => {
    const newSelected = new Set(selectedRuleIds);
    if (newSelected.has(id)) newSelected.delete(id);
    else newSelected.add(id);
    setSelectedRuleIds(newSelected);
  };

  const toggleSelectAllProxies = () => {
    const allIds = Object.keys(localProxySelections);
    if (selectedProxyIds.size === allIds.length) {
      setSelectedProxyIds(new Set());
    } else {
      setSelectedProxyIds(new Set(allIds));
    }
  };

  const toggleSelectAllRules = () => {
    if (selectedRuleIds.size === localLanRules.length) {
      setSelectedRuleIds(new Set());
    } else {
      setSelectedRuleIds(new Set(localLanRules.map(r => r.id)));
    }
  };

  // --- Modal Helpers ---
  const toggleModalOrderExpand = (orderId) => {
    setExpandedOrdersInModal(prev => ({ ...prev, [orderId]: !prev[orderId] }));
  };

  const toggleModalSelectAllInOrder = (orderId, proxies) => {
    const newSelections = { ...modalProxySelections };
    const allIds = proxies.map(p => p.id);
    const isAll = allIds.every(id => newSelections[id] && newSelections[id].length === proxies[0].availableProtocols.length);

    if (isAll) {
      allIds.forEach(id => delete newSelections[id]);
    } else {
      allIds.forEach(id => {
        const p = proxies.find(x => x.id === id);
        newSelections[id] = [...p.availableProtocols];
      });
    }
    setModalProxySelections(newSelections);
  };

  const toggleModalProxyAll = (proxyId, availableProtos) => {
    const newSelections = { ...modalProxySelections };
    if (newSelections[proxyId]) {
      delete newSelections[proxyId];
    } else {
      newSelections[proxyId] = [availableProtos[0]];
    }
    setModalProxySelections(newSelections);
  };

  const toggleModalProxyProtocol = (proxyId, proto) => {
    const newSelections = { ...modalProxySelections };
    const current = newSelections[proxyId] || [];
    if (current.includes(proto)) {
      const filtered = current.filter(p => p !== proto);
      if (filtered.length === 0) delete newSelections[proxyId];
      else newSelections[proxyId] = filtered;
    } else {
      newSelections[proxyId] = [...current, proto];
    }
    setModalProxySelections(newSelections);
  };

  const handleConfirmAddProxies = () => {
    setLocalProxySelections({
      ...localProxySelections,
      ...modalProxySelections
    });
    setShowAddProxyModal(false);
    setModalProxySelections({});
  };

  const availableProxies = PURCHASED_PROXIES.filter(p => !localProxySelections[p.id]);

  // 按订单分组显示可用代理 (Modal)
  const groupedAvailableProxies = useMemo(() => {
    const groups = {};
    availableProxies
      .filter(p => p.ip.includes(proxySearchTerm) || p.region.includes(proxySearchTerm))
      .forEach(proxy => {
        const orderId = proxy.orderId || '其他资源';
        if (!groups[orderId]) {
          groups[orderId] = {
            orderId,
            orderInfo: ORDERS_DATA.find(o => o.id === orderId),
            proxies: []
          };
        }
        groups[orderId].proxies.push(proxy);
      });
    return groups;
  }, [availableProxies, proxySearchTerm]);

  // 按订单分组显示已选代理
  const groupedSelections = useMemo(() => {
    const groups = {};
    Object.entries(localProxySelections).forEach(([proxyId, protocols]) => {
      const proxyInfo = PURCHASED_PROXIES.find(p => p.id === proxyId);
      const orderId = proxyInfo?.orderId || '其他资源';
      if (!groups[orderId]) {
        groups[orderId] = {
          orderId,
          orderInfo: ORDERS_DATA.find(o => o.id === orderId),
          proxies: []
        };
      }
      groups[orderId].proxies.push({ proxyId, protocols, proxyInfo });
    });
    return groups;
  }, [localProxySelections]);

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-xl text-gray-500 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              编辑配置：{config.name}
              <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded-lg text-[10px] uppercase font-black tracking-widest border border-blue-100/50">
                {config.client}
              </span>
            </h1>
            <p className="text-xs text-gray-400 mt-1 font-medium">在此直接管理代理节点与局域网出口分流规则</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack}
            className="px-4 py-2 bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 rounded-xl text-sm font-bold transition-all"
          >
            返回
          </button>
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className={`px-8 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 shadow-lg ${
              isSaving ? 'bg-gray-100 text-gray-400' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-200'
            }`}
          >
            <Save className="w-4 h-4"/> {isSaving ? '正在保存...' : '保存更改'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          
          {/* 1. 已选代理 IP 管理 */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/30">
              <div className="flex items-center gap-4">
                <div 
                  className="flex items-center gap-2 cursor-pointer group"
                  onClick={toggleSelectAllProxies}
                >
                  <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${selectedProxyIds.size === Object.keys(localProxySelections).length && Object.keys(localProxySelections).length > 0 ? 'bg-blue-600 border-blue-600' : 'bg-white border-gray-300 group-hover:border-blue-400'}`}>
                    {selectedProxyIds.size === Object.keys(localProxySelections).length && Object.keys(localProxySelections).length > 0 && <Check className="w-3 h-3 text-white" />}
                  </div>
                  <h3 className="font-bold text-gray-900 flex items-center gap-2">
                    已选代理 IP（{Object.keys(localProxySelections).length}）
                  </h3>
                </div>
                {selectedProxyIds.size > 0 && (
                  <button 
                    onClick={batchRemoveProxies}
                    className="px-3 py-1 bg-red-50 text-red-600 rounded-lg text-xs font-bold hover:bg-red-100 transition-all flex items-center gap-1.5 animate-in fade-in slide-in-from-left-2"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> 批量删除 ({selectedProxyIds.size})
                  </button>
                )}
              </div>
              <button 
                onClick={() => setShowAddProxyModal(true)}
                className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold hover:bg-blue-100 transition-colors flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" /> 添加代理 IP
              </button>
            </div>
            <div className="p-6">
              {Object.keys(localProxySelections).length === 0 ? (
                <div className="py-10 text-center text-gray-400 border-2 border-dashed border-gray-100 rounded-2xl">
                   <p className="text-sm">暂未选择任何代理节点，请点击上方按钮添加</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {Object.values(groupedSelections).map(group => (
                    <div key={group.orderId} className="border border-gray-100 rounded-2xl overflow-hidden bg-white shadow-sm">
                      {/* Order Sub-header */}
                      <div className="bg-slate-50/50 px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-1.5 bg-white rounded-lg border border-slate-200 shadow-sm">
                            <ShoppingCart className="w-3.5 h-3.5 text-blue-500" />
                          </div>
                          <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-black text-slate-700">订单: {group.orderId}</span>
                              <span className="px-1.5 py-0.5 bg-white border border-slate-200 text-[9px] font-bold text-slate-400 rounded uppercase">{group.orderInfo?.region || '多地区'}</span>
                            </div>
                            <span className="text-[10px] text-slate-400 mt-0.5">{group.orderInfo?.typeLabel || '代理资源'}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                           <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                             {group.proxies.length} 个节点
                           </span>
                        </div>
                      </div>

                      {/* Proxies List (Wizard-style rows) */}
                      <div className="divide-y divide-gray-50">
                        {group.proxies.map(({ proxyId, protocols, proxyInfo }) => (
                          <div 
                            key={proxyId} 
                            className={`flex flex-col sm:flex-row sm:items-center gap-4 p-4 transition-all group/row ${selectedProxyIds.has(proxyId) ? 'bg-blue-50/30' : 'hover:bg-slate-50/50'}`}
                          >
                            {/* Left: Checkbox & IP Info */}
                            <div className="flex items-center gap-4 flex-1">
                              <div 
                                className="cursor-pointer p-1"
                                onClick={() => toggleProxySelection(proxyId)}
                              >
                                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${selectedProxyIds.has(proxyId) ? 'bg-blue-600 border-blue-600 shadow-sm shadow-blue-200' : 'bg-white border-gray-300 group-hover/row:border-blue-400'}`}>
                                  {selectedProxyIds.has(proxyId) && <Check className="w-3 h-3 text-white" />}
                                </div>
                              </div>
                              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 shadow-sm border border-blue-100/50">
                                <Server className="w-5 h-5" />
                              </div>
                              <div className="min-w-0">
                                <div className="flex items-center gap-3">
                                  <span className="font-mono text-sm font-black text-gray-800">{proxyInfo?.ip || proxyId}</span>
                                  <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded uppercase">PORT: {proxyInfo?.port || '8888'}</span>
                                </div>
                                <div className="flex items-center gap-2 mt-1">
                                  <span className="text-[10px] font-bold text-gray-500 flex items-center gap-1"><Globe className="w-3 h-3"/> {proxyInfo?.region} · {proxyInfo?.city}</span>
                                </div>
                              </div>
                            </div>

                            {/* Right: Protocols & Actions */}
                            <div className="flex flex-wrap items-center gap-3 sm:justify-end pl-9 sm:pl-0">
                              <div className="flex gap-1.5">
                                {protocols.map(p => (
                                  <span key={p} className="text-[9px] px-2 py-1 bg-emerald-50 text-emerald-600 rounded-lg font-black border border-emerald-100 uppercase shadow-sm">{p}</span>
                                ))}
                              </div>
                              <div className="w-px h-4 bg-gray-200 mx-1 hidden sm:block"></div>
                              <button 
                                onClick={() => removeProxy(proxyId)}
                                className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                title="移除节点"
                              >
                                <Trash2 className="w-4.5 h-4.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* 2. 局域网 IP 与代理 IP 关联管理 */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/30">
              <div className="flex items-center gap-4">
                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                  <Network className="w-4 h-4 text-blue-600" /> 局域网出口分流规则（IP 关联）
                </h3>
                {selectedRuleIds.size > 0 && (
                  <button 
                    onClick={batchRemoveRules}
                    className="px-3 py-1 bg-red-50 text-red-600 rounded-lg text-xs font-bold hover:bg-red-100 transition-all flex items-center gap-1.5 animate-in fade-in slide-in-from-left-2"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> 批量删除 ({selectedRuleIds.size})
                  </button>
                )}
              </div>
              <button 
                onClick={() => setLocalLanRules([...localLanRules, { id: Date.now(), name: '新设备', ip: '192.168.10.x', proxyId: 'auto', protocol: 'SOCKS5' }])}
                className="px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-lg text-xs font-bold hover:bg-emerald-100 transition-colors flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" /> 新增关联规则
              </button>
            </div>
            <div className="p-0 overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50 text-[10px] uppercase font-bold text-gray-500 tracking-wider">
                    <th className="px-6 py-3 w-10">
                      <div 
                        className="cursor-pointer"
                        onClick={toggleSelectAllRules}
                      >
                        <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${selectedRuleIds.size === localLanRules.length && localLanRules.length > 0 ? 'bg-blue-600 border-blue-600' : 'bg-white border-gray-300'}`}>
                          {selectedRuleIds.size === localLanRules.length && localLanRules.length > 0 && <Check className="w-3 h-3 text-white" />}
                        </div>
                      </div>
                    </th>
                    <th className="px-6 py-3">本地设备 / IP 地址</th>
                    <th className="px-6 py-3">出口代理节点</th>
                    <th className="px-6 py-3">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {localLanRules.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="px-6 py-10 text-center text-gray-400 text-sm">暂无关联规则</td>
                    </tr>
                  ) : (
                    localLanRules.map((rule, idx) => (
                      <tr key={rule.id} className={`hover:bg-gray-50/50 transition-colors ${selectedRuleIds.has(rule.id) ? 'bg-blue-50/20' : ''}`}>
                        <td className="px-6 py-4">
                          <div 
                            className="cursor-pointer"
                            onClick={() => toggleRuleSelection(rule.id)}
                          >
                            <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${selectedRuleIds.has(rule.id) ? 'bg-blue-600 border-blue-600' : 'bg-white border-gray-300 group-hover:border-blue-400'}`}>
                              {selectedRuleIds.has(rule.id) && <Check className="w-3 h-3 text-white" />}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                           <div className="flex flex-col gap-1">
                              <input 
                                value={rule.name}
                                onChange={(e) => {
                                  const newRules = [...localLanRules];
                                  newRules[idx].name = e.target.value;
                                  setLocalLanRules(newRules);
                                }}
                                className="text-sm font-bold text-gray-900 bg-transparent border-none outline-none focus:ring-1 focus:ring-blue-500 rounded px-1 -ml-1"
                              />
                              <input 
                                value={rule.ip}
                                onChange={(e) => {
                                  const newRules = [...localLanRules];
                                  newRules[idx].ip = e.target.value;
                                  setLocalLanRules(newRules);
                                }}
                                className="text-xs font-mono text-gray-500 bg-transparent border-none outline-none focus:ring-1 focus:ring-blue-500 rounded px-1 -ml-1"
                              />
                           </div>
                        </td>
                        <td className="px-6 py-4">
                           <select 
                             value={rule.proxyId}
                             onChange={(e) => {
                               const newRules = [...localLanRules];
                               newRules[idx].proxyId = e.target.value;
                               setLocalLanRules(newRules);
                             }}
                             className="text-xs font-bold text-blue-600 bg-blue-50 border border-blue-100 rounded-lg px-3 py-1.5 outline-none focus:ring-2 focus:ring-blue-500 max-w-[180px]"
                           >
                            <option value="auto">自动负载均衡（默认）</option>
                             {Object.keys(localProxySelections).map(pid => {
                               const pInfo = PURCHASED_PROXIES.find(p => p.id === pid);
                               return <option key={pid} value={pid}>{pInfo?.ip || pid} ({pInfo?.region})</option>;
                             })}
                           </select>
                        </td>
                        <td className="px-6 py-4">
                          <button 
                            onClick={() => setLocalLanRules(localLanRules.filter((_, i) => i !== idx))}
                            className="p-2 text-gray-300 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right: Summary & Realtime YAML */}
        <div className="space-y-6">
          <div className="bg-slate-900 rounded-2xl shadow-xl overflow-hidden flex flex-col h-full min-h-[600px]">
            <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center bg-white/5">
              <div>
                <h3 className="font-bold text-blue-200 text-sm flex items-center gap-2">
                  <FileCode className="w-4 h-4" /> 实时 YAML 预览
                </h3>
              </div>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(generateMockYaml({...config, networkConfig: localNetworkConfig, lanRules: localLanRules, proxySelections: localProxySelections}));
                  alert('配置已复制到剪贴板');
                }}
                className="p-1.5 hover:bg-white/10 rounded-lg text-blue-300 transition-colors"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6 flex-1 overflow-auto custom-scrollbar">
              <pre className="text-xs font-mono text-blue-300 leading-relaxed whitespace-pre-wrap">
                {generateMockYaml({...config, networkConfig: localNetworkConfig, lanRules: localLanRules, proxySelections: localProxySelections})}
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Add Proxy Modal (Wizard-style) */}
      {showAddProxyModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
           <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col max-h-[90vh] border border-gray-100 animate-in zoom-in-95 duration-300">
              <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                 <div>
                    <h3 className="text-xl font-black text-gray-900 flex items-center gap-3">
                       <Plus className="w-6 h-6 text-blue-600"/> 添加代理 IP
                    </h3>
                    <p className="text-xs text-gray-400 mt-1 font-medium text-left">选择您希望添加到当前配置的代理节点与协议</p>
                 </div>
                 <button 
                   onClick={() => { setShowAddProxyModal(false); setModalProxySelections({}); }} 
                   className="p-2.5 hover:bg-gray-100 rounded-xl transition-colors text-gray-400 hover:text-gray-600"
                 >
                   <X className="w-6 h-6"/>
                 </button>
              </div>

              <div className="p-8 flex-1 flex flex-col overflow-hidden">
                 <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar text-left">
                    {ORDERS_DATA.map(order => {
                       const orderProxies = generateDetailedProxyList(order);
                       // Filter out proxies that are already in the configuration
                       const filteredProxies = orderProxies.filter(p => !localProxySelections[p.id]);
                       if (filteredProxies.length === 0) return null;

                       let selectedInModalCount = 0;
                       filteredProxies.forEach(p => {
                          if (modalProxySelections[p.id]) selectedInModalCount++;
                       });

                       const isAll = selectedInModalCount === filteredProxies.length && filteredProxies.every(p => (modalProxySelections[p.id]||[]).length === p.availableProtocols.length);
                       const isIndeterminate = selectedInModalCount > 0 && !isAll;

                       return (
                         <div key={order.id} className="border border-gray-200 rounded-2xl overflow-hidden transition-all hover:border-blue-200 shadow-sm bg-white">
                            <div className="bg-gray-50/50 p-4 flex items-center justify-between cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => toggleModalOrderExpand(order.id)}>
                               <div className="flex items-center gap-4">
                                  <button 
                                    onClick={(e) => { e.stopPropagation(); toggleModalSelectAllInOrder(order.id, filteredProxies); }}
                                    className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-all ${isAll ? 'bg-blue-600 border-blue-600' : isIndeterminate ? 'bg-blue-100 border-blue-600' : 'border-gray-300 bg-white hover:border-blue-400'}`}
                                  >
                                      {isAll && <Check className="w-3.5 h-3.5 text-white" />}
                                      {isIndeterminate && <div className="w-2.5 h-2.5 bg-blue-600 rounded-sm" />}
                                  </button>
                                  <div>
                                     <div className="font-black text-gray-900 flex items-center gap-2">
                                        {order.typeLabel} <span className="font-medium text-gray-400 text-[10px] bg-white border border-gray-100 px-1.5 py-0.5 rounded uppercase tracking-wider">{order.region}</span>
                                     </div>
                                     <div className="text-[10px] font-bold text-blue-600/60 uppercase tracking-widest mt-0.5">订单: {order.id} · 可选 {filteredProxies.length} 个节点</div>
                                  </div>
                               </div>
                               <div className="flex items-center gap-3">
                                  {selectedInModalCount > 0 && <span className="px-2 py-0.5 bg-blue-600 text-white text-[10px] font-black rounded-full shadow-sm shadow-blue-200">已选 {selectedInModalCount}</span>}
                                  {expandedOrdersInModal[order.id] ? <ChevronDown className="w-5 h-5 text-gray-400"/> : <ChevronRight className="w-5 h-5 text-gray-400"/>}
                               </div>
                            </div>
                            
                            {expandedOrdersInModal[order.id] && (
                               <div className="p-3 bg-white grid grid-cols-1 gap-2 animate-in slide-in-from-top-2">
                                  {filteredProxies.map(proxy => {
                                      const currentSelected = modalProxySelections[proxy.id] || [];
                                      const isProxySelected = currentSelected.length > 0;

                                      return (
                                         <div 
                                           key={proxy.id} 
                                           className={`flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-xl border transition-all ${isProxySelected ? 'border-blue-200 bg-blue-50/20' : 'border-gray-50 hover:border-gray-200'}`}
                                         >
                                            <div className="flex items-center gap-4 flex-1 cursor-pointer group/proxy" onClick={() => toggleModalProxyAll(proxy.id, proxy.availableProtocols)}>
                                                <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-all ${isProxySelected ? 'bg-blue-600 border-blue-600 shadow-sm shadow-blue-200' : 'border-gray-300 bg-white group-hover/proxy:border-blue-400'}`}>
                                                    {isProxySelected && <Check className="w-3 h-3 text-white" />}
                                                </div>
                                                <div className="min-w-0">
                                                   <div className="flex items-center gap-3">
                                                      <span className="font-mono text-sm font-black text-gray-800">{proxy.ip}</span>
                                                      <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded uppercase tracking-tighter">PORT: {proxy.port}</span>
                                                   </div>
                                                   <div className="flex items-center gap-2 mt-1">
                                                      <span className="text-[10px] font-bold text-gray-500 flex items-center gap-1"><Globe className="w-3 h-3"/> {proxy.city}</span>
                                                   </div>
                                                </div>
                                            </div>

                                            <div className="flex flex-wrap gap-1.5 sm:justify-end pl-9 sm:pl-0">
                                               {proxy.availableProtocols.map(proto => {
                                                   const isProtoSelected = currentSelected.includes(proto);
                                                   return (
                                                       <button
                                                         key={proto}
                                                         onClick={(e) => { e.stopPropagation(); toggleModalProxyProtocol(proxy.id, proto); }}
                                                         className={`px-3 py-1.5 rounded-lg text-[9px] font-black border transition-all uppercase tracking-wider ${
                                                             isProtoSelected 
                                                             ? 'bg-blue-600 text-white border-blue-600 shadow-sm' 
                                                             : 'bg-white text-gray-400 border-gray-200 hover:border-blue-300 hover:text-blue-600'
                                                         }`}
                                                       >
                                                           {proto}
                                                       </button>
                                                   )
                                               })}
                                            </div>
                                         </div>
                                      );
                                  })}
                               </div>
                            )}
                         </div>
                       );
                    })}
                 </div>
              </div>

              <div className="px-8 py-6 border-t border-gray-100 bg-gray-50 flex justify-between items-center">
                 <div className="text-sm font-medium text-gray-500">
                    已选 <span className="text-blue-600 font-black">{Object.keys(modalProxySelections).length}</span> 个新节点
                 </div>
                 <div className="flex gap-3">
                    <button 
                      onClick={() => { setShowAddProxyModal(false); setModalProxySelections({}); }} 
                      className="px-6 py-2.5 bg-white border border-gray-200 text-gray-600 rounded-xl text-sm font-bold hover:bg-gray-50 transition-all"
                    >
                      取消
                    </button>
                    <button 
                      onClick={handleConfirmAddProxies}
                      disabled={Object.keys(modalProxySelections).length === 0}
                      className={`px-8 py-2.5 rounded-xl text-sm font-black transition-all flex items-center gap-2 shadow-lg ${
                        Object.keys(modalProxySelections).length === 0 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-200'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4"/> 确认添加
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}
*** End Patch
    </div>
  );
};

const RouterConfigView = ({ savedConfigs, onBack, onDelete, onDownload, onEdit }) => {
    const [viewingYamlConfig, setViewingYamlConfig] = useState(null);

    return (
      <div className="space-y-6 animate-in fade-in duration-300">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors md:hidden">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <RouterIcon className="w-6 h-6 text-blue-600" />
              路由配置管理
            </h1>
          </div>
          <p className="text-sm text-gray-500">管理你在“新建配置”向导中生成的全部配置文件</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          {savedConfigs.length === 0 ? (
            <div className="p-20 text-center text-gray-400">
              <FileCode className="w-16 h-16 mx-auto mb-4 opacity-10" />
              <p className="text-lg font-medium">暂无保存的配置</p>
              <p className="text-sm mt-1">你可以在仪表盘点击“新建配置”来生成第一份配置</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {savedConfigs.map(config => (
                <div key={config.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between hover:bg-gray-50/50 transition-colors group gap-4">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 font-black text-xl uppercase shadow-sm border border-blue-100/50">
                      {config.client.substring(0,2)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-gray-900 text-lg">{config.name}</h3>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          config.status === 'running' || config.status === 'Running' 
                            ? 'bg-emerald-100 text-emerald-700' 
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {config.status}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 flex flex-wrap items-center gap-x-3 gap-y-1 mt-1">
                        <span className="flex items-center gap-1"><Box className="w-3 h-3"/> {config.nodeCount} 节点</span>
                        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                        <span className="flex items-center gap-1"><Monitor className="w-3 h-3"/> {config.devices || 0} 设备</span>
                        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                        <span className="flex items-center gap-1"><RefreshCw className="w-3 h-3"/> 更新于 {config.updateTime}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setViewingYamlConfig(config)}
                      className="p-2.5 bg-blue-50 text-blue-600 border border-blue-100 rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                      title="查看 YAML 配置"
                    >
                      <Eye className="w-5 h-5"/>
                    </button>
                    <button 
                      onClick={() => onDownload(config)}
                      className="flex-1 md:flex-none px-4 py-2.5 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-xl text-sm font-bold hover:bg-emerald-600 hover:text-white transition-all shadow-sm flex items-center justify-center gap-2"
                    >
                      <DownloadCloud className="w-4 h-4"/> 下载配置
                    </button>
                    <button 
                      onClick={() => onEdit(config)}
                      className="p-2.5 bg-slate-50 text-slate-600 border border-slate-200 rounded-xl hover:bg-slate-200 transition-all shadow-sm"
                      title="编辑配置"
                    >
                      <Settings className="w-5 h-5"/>
                    </button>
                    <button 
                      onClick={() => onDelete(config.id)}
                      className="p-2.5 bg-red-50 text-red-600 border border-red-100 rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-sm"
                      title="删除配置"
                    >
                      <Trash2 className="w-5 h-5"/>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* YAML Preview Modal */}
        {viewingYamlConfig && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[85vh]">
              <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <div>
                  <h3 className="font-bold text-gray-900 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-600" />
                    查看 YAML 配置
                  </h3>
                  <p className="text-[10px] text-gray-400 font-mono mt-0.5">{viewingYamlConfig.name} - {viewingYamlConfig.client}</p>
                </div>
                <button onClick={() => setViewingYamlConfig(null)} className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 overflow-y-auto flex-1 bg-slate-900">
                <pre className="text-xs md:text-sm font-mono text-blue-300 leading-relaxed overflow-x-auto whitespace-pre-wrap">
                  {generateMockYaml(viewingYamlConfig)}
                </pre>
              </div>
              <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3 bg-gray-50">
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(generateMockYaml(viewingYamlConfig));
                    alert('配置已复制到剪贴板');
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all flex items-center gap-2"
                >
                  <Copy className="w-4 h-4" /> 复制代码
                </button>
                <button 
                  onClick={() => setViewingYamlConfig(null)}
                  className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all"
                >
                  关闭
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Pro Tip */}
        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5 flex gap-4">
          <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center shrink-0">
            <Zap className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-amber-900">使用提示</h4>
            <p className="text-xs text-amber-700 mt-1 leading-relaxed">
              生成的配置文件包含您的专享代理节点信息，请妥善保管。如需在多个设备使用，建议在“新建配置”向导的第三步开启“允许局域网连接 (Allow LAN)”，并配置相应的局域网分流规则。</p>
          </div>
        </div>
      </div>
    );
};

const OrderListView = ({ onSelectOrder, onExportAll, onNavigateToSupport }) => {
    const [searchText, setSearchText] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);

    // Load orders on mount
    useEffect(() => {
      const loadOrders = async () => {
        setIsLoading(true);
        setError(null);

        try {
          const result = await orderService.getOrders({ page: 1, pageSize: 100 });

          if (result.success) {
            // Transform backend data to match UI format
            const orderList = result.data?.list || result.data || [];
            console.log('[OrderListView] Raw API response:', orderList[0]);
            const mappedOrders = orderList.map(order => {
              // Parse bandwidth_traffic field (format: "bandwidth/unlimited" or "traffic/50GB")
              let bandwidth = '不限';
              let traffic = '不限';
              if (order.bandwidth_traffic) {
                const parts = order.bandwidth_traffic.split('/');
                if (parts.length >= 2) {
                  const mode = parts[0] || '';
                  const value = parts[1] || '';
                  if (mode === 'bandwidth') {
                    bandwidth = value || '不限';
                  } else if (mode === 'traffic') {
                    traffic = value || '不限';
                  }
                }
              }

              // Parse expire_time
              const expireDate = order.expire_time ? new Date(order.expire_time).toLocaleDateString('zh-CN') : '待设置';

              // Parse scenarios
              const scenarios = order.scenario ? [order.scenario] : [];

              // Parse supported protocols
              let supportedProtocols = [];
              if (order.included_protocols) {
                supportedProtocols = order.included_protocols.split(',').map(p => p.trim().toUpperCase());
              } else if (order.protocol) {
                supportedProtocols = [order.protocol.toUpperCase()];
              }

              const mappedOrder = {
                id: order.order_id || order.id || order.orderId,
                typeLabel: order.product_name || order.template_name || '静态住宅 ISP',
                region: order.country || 'US',
                status: order.pay_status === 'paid' ? 'active' : (order.order_status || 'pending'),
                createdAt: order.created_at || order.create_time || order.purchase_time,
                amount: order.amount || 0,
                bandwidth: bandwidth,
                traffic: traffic,
                expireDate: expireDate,
                totalIps: order.quantity || order.ip_quantity || 0,
                scenarios: scenarios,
                supportedProtocols: supportedProtocols,
                trafficUsed: order.traffic_used || '0',
                protocol: order.protocol || 'HTTP',
                // 使用条款和授权范围（根据业务类型动态生成）
                terms: getTermsOfUse(order.business_type || order.scenario),
                scope: getAuthorizationScope(order.business_type || order.scenario),
              };

              console.log('[OrderListView] Mapped order:', mappedOrder);

              return mappedOrder;
            });
            setOrders(mappedOrders);
          } else {
            console.warn('Failed to load orders, using fallback data:', result.message);
          }
        } catch (err) {
          console.error('Error loading orders:', err);
          setError(err.message);
          // Fallback to mock data is already set as initial state
        } finally {
          setIsLoading(false);
        }
      };

      loadOrders();
    }, []);

    const filteredOrders = useMemo(() => {
      return orders.filter(order => order.id.toLowerCase().includes(searchText.toLowerCase()) || order.region.toLowerCase().includes(searchText.toLowerCase()));
    }, [searchText, orders]);

    // Show loading state
    if (isLoading) {
      return (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
            <p className="text-gray-600">加载订单数据中...</p>
          </div>
        </div>
      );
    }

    // Show error state
    if (error) {
      return (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <p className="text-gray-800 font-medium">加载失败</p>
            <p className="text-gray-600 text-sm mt-2">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              重新加载
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-6 animate-in fade-in duration-300">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div><h1 className="text-2xl font-bold text-gray-900">我的订单</h1></div>
          <button onClick={onExportAll} className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2">
             <Download className="w-4 h-4" /> 批量导出所有资源</button>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <div className="flex-1 relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" placeholder="搜索订单ID..." className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none" value={searchText} onChange={e => setSearchText(e.target.value)} />
            </div>
        </div>
        <div className="space-y-4">
          {filteredOrders.map(order => (
            <div key={order.id} className="group bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-all cursor-pointer" onClick={() => onSelectOrder(order)}>
               <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
                  <div className="space-y-3 flex-1">
                     <div className="flex items-center gap-3"><span className="font-mono text-sm text-gray-500">{order.id}</span><StatusBadge status={order.status} /></div>
                     <div className="flex items-center gap-2"><h3 className="text-lg font-bold text-gray-900">{order.typeLabel}</h3><span className="text-gray-300">|</span><span className="text-gray-600 flex items-center gap-1 text-sm"><Globe className="w-3.5 h-3.5"/> {order.region}</span></div>
                  </div>
                  <div className="flex items-center gap-3">
                      <button onClick={(e) => { e.stopPropagation(); onNavigateToSupport(order.id); }} className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-blue-600 hover:bg-blue-50 border border-transparent hover:border-blue-100 rounded-lg transition-colors flex items-center gap-1">
                          <MessageSquare className="w-4 h-4"/> 售后
                      </button>
                      <button className="px-4 py-2 text-sm font-medium text-emerald-600 border border-emerald-200 rounded-lg hover:bg-emerald-50 transition-colors">续费</button>
                  </div>
               </div>
            </div>
          ))}
        </div>
      </div>
    );
};

const PURCHASE_TABS = [
  { 
    id: 'buy_static_isp', 
    label: '静态住宅 ISP', 
    icon: Shield, 
    desc: '独享原生住宅IP',
    gradient: 'from-blue-500 to-indigo-600',
    lightBg: 'bg-blue-50',
    lightText: 'text-blue-600',
    lightBorder: 'border-blue-200',
    activeBg: 'bg-gradient-to-r from-blue-500 to-indigo-600',
  },
  { 
    id: 'buy_dynamic_isp', 
    label: '动态住宅 ISP', 
    icon: Globe, 
    desc: '海量IP轮换池',
    gradient: 'from-emerald-500 to-teal-600',
    lightBg: 'bg-emerald-50',
    lightText: 'text-emerald-600',
    lightBorder: 'border-emerald-200',
    activeBg: 'bg-gradient-to-r from-emerald-500 to-teal-600',
  },
  { 
    id: 'buy_datacenter', 
    label: '数据中心代理', 
    icon: Server, 
    desc: '高速低延迟节点',
    gradient: 'from-violet-500 to-purple-600',
    lightBg: 'bg-violet-50',
    lightText: 'text-violet-600',
    lightBorder: 'border-violet-200',
    activeBg: 'bg-gradient-to-r from-violet-500 to-purple-600',
  },
  { 
    id: 'buy_vps', 
    label: '云服务器 VPS', 
    icon: Cpu, 
    desc: '独享云端算力',
    gradient: 'from-amber-500 to-orange-600',
    lightBg: 'bg-amber-50',
    lightText: 'text-amber-600',
    lightBorder: 'border-amber-200',
    activeBg: 'bg-gradient-to-r from-amber-500 to-orange-600',
  },
];

const PurchaseView = ({ productType = 'buy_static_isp', onOpenPurchaseGuide, onChangeType }) => {
    const [activeProduct, setActiveProduct] = useState(productType);
    
    // Sync with external state
    useEffect(() => {
      setActiveProduct(productType);
    }, [productType]);

    const handleTabChange = (tabId) => {
      setActiveProduct(tabId);
      if (onChangeType) onChangeType(tabId);
    };

    const activeTabData = PURCHASE_TABS.find(t => t.id === activeProduct) || PURCHASE_TABS[0];

    const renderTabContent = () => {
      switch (activeProduct) {
        case 'buy_static_isp':
          return <StaticResidentialPurchase onOpenPurchaseGuide={onOpenPurchaseGuide} />;
        case 'buy_dynamic_isp':
          return (
            <div className="flex flex-col items-center justify-center py-20 animate-in fade-in duration-500">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center mb-6">
                <Globe className="w-10 h-10 text-emerald-500" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">动态住宅 ISP 代理</h3>
              <p className="text-sm text-gray-400 mb-6 text-center max-w-md">海量 7200万+ 真实住宅 IP 池，支持城市/州级精准定位，按流量计费永不过期</p>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 text-sm font-medium">
                <Rocket className="w-4 h-4" />
                即将上线，敬请期待
              </div>
            </div>
          );
        case 'buy_datacenter':
          return (
            <div className="flex flex-col items-center justify-center py-20 animate-in fade-in duration-500">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-100 to-purple-100 flex items-center justify-center mb-6">
                <Server className="w-10 h-10 text-violet-500" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">数据中心代理</h3>
              <p className="text-sm text-gray-400 mb-6 text-center max-w-md">高并发、低延迟的性价比之选，全球 200+ 机房节点覆盖，99.9% 连通率</p>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-violet-50 border border-violet-100 text-violet-600 text-sm font-medium">
                <Rocket className="w-4 h-4" />
                即将上线，敬请期待
              </div>
            </div>
          );
        case 'buy_vps':
          return (
            <div className="flex flex-col items-center justify-center py-20 animate-in fade-in duration-500">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center mb-6">
                <Cpu className="w-10 h-10 text-amber-500" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">云服务器 VPS</h3>
              <p className="text-sm text-gray-400 mb-6 text-center max-w-md">独享云端算力，灵活配置，全球多区域部署，支持一键管理与弹性扩容</p>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-100 text-amber-600 text-sm font-medium">
                <Rocket className="w-4 h-4" />
                即将上线，敬请期待
              </div>
            </div>
          );
        default:
          return null;
      }
    };

    return (
      <div className="animate-in fade-in duration-300">
        {/* ═══════════════ Product Tab Navigation ═══════════════ */}
        <div className="mb-6">
          {/* Tab Header */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-[#1A73E8]" />
                在线购买
              </h1>
              <p className="text-sm text-gray-400 mt-0.5">选择适合您业务场景的代理产品</p>
            </div>
            {onOpenPurchaseGuide && (
              <button onClick={onOpenPurchaseGuide}
                className="flex items-center gap-1.5 text-[13px] text-[#1A73E8] hover:text-[#1765CC] font-medium transition-colors whitespace-nowrap shrink-0"
              >
                <BookOpen className="w-3.5 h-3.5" />
                购买引导
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Product Tabs - Card Style */}
          <div className="grid grid-cols-4 gap-3">
            {PURCHASE_TABS.map((tab) => {
              const isActive = activeProduct === tab.id;
              const TabIcon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`relative group rounded-xl p-3.5 text-left transition-all duration-300 border overflow-hidden ${
                    isActive
                      ? 'bg-white border-gray-200 shadow-lg shadow-gray-200/50 ring-2 ring-blue-500/20'
                      : 'bg-white/60 border-gray-100 hover:bg-white hover:border-gray-200 hover:shadow-md'
                  }`}
                >
                  {/* Active indicator bar */}
                  <div className={`absolute top-0 left-0 right-0 h-[3px] rounded-b-full transition-all duration-300 ${
                    isActive ? `bg-gradient-to-r ${tab.gradient}` : 'bg-transparent group-hover:bg-gray-200'
                  }`} />
                  
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300 ${
                      isActive 
                        ? `${tab.activeBg} text-white shadow-md` 
                        : `${tab.lightBg} ${tab.lightText} group-hover:scale-105`
                    }`}>
                      <TabIcon className="w-[18px] h-[18px]" />
                    </div>
                    <div className="min-w-0">
                      <div className={`text-[13px] font-semibold truncate transition-colors duration-200 ${
                        isActive ? 'text-gray-900' : 'text-gray-600 group-hover:text-gray-900'
                      }`}>
                        {tab.label}
                      </div>
                      <div className={`text-[11px] truncate transition-colors duration-200 ${
                        isActive ? 'text-gray-500' : 'text-gray-400'
                      }`}>
                        {tab.desc}
                      </div>
                    </div>
                  </div>

                  {/* Active dot indicator */}
                  {isActive && (
                    <div className="absolute bottom-2 right-3">
                      <span className="relative flex h-2 w-2">
                        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-gradient-to-r ${tab.gradient}`}></span>
                        <span className={`relative inline-flex rounded-full h-2 w-2 bg-gradient-to-r ${tab.gradient}`}></span>
                      </span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ═══════════════ Tab Content Area ═══════════════ */}
        <div className="min-h-[400px]">
          {renderTabContent()}
        </div>
      </div>
    );
};

const IPResourceManager = () => {
  const [expandedGroups, setExpandedGroups] = useState({});
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [currentGroupProxies, setCurrentGroupProxies] = useState([]);

  const resourceGroups = useMemo(() => {
    const groups = {};
    ORDERS_DATA.forEach(order => {
      if (order.status === 'expired') return;
      const key = `${order.scenarios.join(',')}|${order.supportedProtocols.join(',')}`;
      if (!groups[key]) {
        groups[key] = { id: key, scenarios: order.scenarios, protocols: order.supportedProtocols, orders: [], totalIps: 0, regions: new Set() };
      }
      groups[key].orders.push(order);
      groups[key].totalIps += order.totalIps;
      groups[key].regions.add(order.region);
    });
    return Object.values(groups);
  }, []);

  const handleExportGroup = (group) => {
    const allProxies = group.orders.flatMap(order => generateProxyList(order.totalIps, order.region));
    setCurrentGroupProxies(allProxies);
    setIsExportOpen(true);
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-300">
      <div><h1 className="text-2xl font-bold text-gray-900">IP 资源管理器</h1><p className="text-sm text-gray-500 mt-1">已自动为您合并 <strong>{resourceGroups.length}</strong> 个相同用途与协议的资源包</p></div>
      <div className="grid grid-cols-1 gap-6">
        {resourceGroups.map((group) => (
          <div key={group.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="p-6 flex flex-col md:flex-row justify-between gap-6 bg-white z-10 relative">
               <div className="space-y-3 flex-1">
                  <div className="flex items-center gap-3">
                     <div className="p-2 bg-blue-50 rounded-lg text-blue-600"><FolderOpen className="w-6 h-6" /></div>
                     <div>
                        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">资源包 {group.scenarios.join(' & ')}</h3>
                        <div className="text-xs text-gray-500 flex items-center gap-2 mt-1"><span>包含 {group.orders.length} 个订单</span><span>·</span><span className="flex items-center gap-1"><Globe className="w-3 h-3"/> {Array.from(group.regions).length} 个地区</span></div>
                     </div>
                  </div>
                  <div className="flex flex-wrap gap-2">{group.protocols.map(p => <ProtocolTag key={p} type={p}/>)}</div>
               </div>
               <div className="flex flex-col items-end justify-center min-w-[200px] border-l border-gray-100 pl-6 border-dashed">
                  <div className="text-3xl font-bold text-gray-900 mb-1">{group.totalIps} <span className="text-sm font-medium text-gray-400">IPs</span></div>
                  <div className="flex gap-2 w-full mt-2">
                     <button onClick={() => setExpandedGroups(prev => ({ ...prev, [group.id]: !prev[group.id] }))} className="flex-1 py-2 text-xs font-medium text-gray-600 border border-gray-200 rounded hover:bg-gray-50 transition-colors">{expandedGroups[group.id] ? '收起明细' : '查看明细'}</button>
                     <button onClick={() => handleExportGroup(group)} className="flex-1 py-2 text-xs font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors shadow-sm flex items-center justify-center gap-1"><Zap className="w-3 h-3" /> 批量提取</button>
                  </div>
               </div>
            </div>
            {expandedGroups[group.id] && (
               <div className="border-t border-gray-100 bg-gray-50/50 p-4 space-y-2 animate-in slide-in-from-top-2">
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 ml-2">包含以下订单</div>
                  {group.orders.map(order => (
                     <div key={order.id} className="flex justify-between items-center bg-white p-3 rounded-lg border border-gray-100 text-sm">
                        <div className="flex items-center gap-3"><div className={`w-2 h-2 rounded-full ${order.status === 'active' ? 'bg-green-500' : 'bg-gray-300'}`}></div><span className="font-mono text-gray-600">{order.id}</span><span className="text-gray-900 font-medium">{order.region}</span></div>
                        <div className="flex items-center gap-4 text-gray-500 text-xs"><span>{order.bandwidth}</span><span>到期: {order.expireDate}</span><span className="font-bold text-gray-700">{order.totalIps} IPs</span></div>
                     </div>
                  ))}
               </div>
            )}
          </div>
        ))}
      </div>
      <ProxyExportModal isOpen={isExportOpen} onClose={() => setIsExportOpen(false)} selectedProxies={currentGroupProxies} />
    </div>
  );
};

const OrderDetailView = ({ order, onBack, onExportOrder, onNavigateToSupport }) => {
    // Mock data for UI elements not in the main data object
    const trafficTotal = "1000 GB";
    const trafficPercentage = 12.5; 
    
    return (
        <div className="space-y-6 animate-in fade-in duration-300 pb-10">
             {/* Top Navigation */}
             <div>
                <button onClick={onBack} className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors mb-4">
                    <ArrowLeft className="w-4 h-4"/> 返回订单列表
                </button>
             </div>

             {/* Main Card */}
             <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
                 {/* Header Section */}
                 <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                     <div>
                         <div className="flex items-center gap-3 mb-2">
                             <h1 className="text-2xl font-bold text-gray-900">订单 #{order.id}</h1>
                             <StatusBadge status={order.status} />
                         </div>
                         <div className="flex flex-wrap gap-2">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100">
                                <Shield className="w-3.5 h-3.5" /> {order.typeLabel}
                            </span>
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100">
                                <Globe className="w-3.5 h-3.5" /> {order.region}
                            </span>
                         </div>
                     </div>
                     <div className="flex gap-3 w-full md:w-auto">
                        <button onClick={onExportOrder} className="flex-1 md:flex-none px-5 py-2.5 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700 shadow-lg shadow-blue-200 flex items-center justify-center gap-2 transition-all">
                             <Zap className="w-4 h-4"/> 批量提取代理
                        </button>
                        <button onClick={() => onNavigateToSupport(order.id)} className="flex-1 md:flex-none px-5 py-2.5 bg-white border border-gray-200 text-gray-700 text-sm font-bold rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2 transition-all">
                             <MessageSquare className="w-4 h-4"/> 售后反馈
                        </button>
                     </div>
                 </div>

                 {/* Info Grid - Row 1 */}
                 <div className="grid grid-cols-2 md:grid-cols-5 gap-6 border-t border-gray-100 pt-6 mb-8">
                     <div className="space-y-1">
                         <div className="text-xs font-bold text-gray-400 flex items-center gap-1"><Activity className="w-3.5 h-3.5"/> 带宽</div>
                         <div className="font-bold text-gray-900 text-lg">{order.bandwidth || '-'}</div>
                     </div>
                     <div className="space-y-1">
                         <div className="text-xs font-bold text-gray-400 flex items-center gap-1"><Calendar className="w-3.5 h-3.5"/> 到期</div>
                         <div className="font-bold text-gray-900 text-lg">{order.expireDate || '-'}</div>
                     </div>
                     <div className="space-y-1">
                         <div className="text-xs font-bold text-gray-400 flex items-center gap-1"><Hash className="w-3.5 h-3.5"/> 数量</div>
                         <div className="font-bold text-gray-900 text-lg">{order.totalIps || 0} IPs</div>
                     </div>
                     <div className="space-y-1">
                         <div className="text-xs font-bold text-gray-400 flex items-center gap-1"><Layers className="w-3.5 h-3.5"/> 场景</div>
                         <div className="flex flex-wrap gap-1.5">
                             {(order.scenarios || []).length > 0 ? (
                                 (order.scenarios || []).map(s => (
                                     <span key={s} className="px-1.5 py-0.5 border border-gray-200 rounded text-[10px] text-gray-600 bg-gray-50">{s}</span>
                                 ))
                             ) : (
                                 <span className="text-gray-400 text-xs">-</span>
                             )}
                         </div>
                     </div>
                     <div className="space-y-1">
                         <div className="text-xs font-bold text-gray-400 flex items-center gap-1"><Network className="w-3.5 h-3.5"/> 协议</div>
                         <div className="flex flex-wrap gap-1.5">
                             {(order.supportedProtocols || []).length > 0 ? (
                                 (order.supportedProtocols || []).map(p => (
                                     <span key={p} className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                                         p === 'SOCKS5' ? 'bg-purple-50 text-purple-700 border border-purple-100' :
                                         p === 'HTTP' ? 'bg-blue-50 text-blue-700 border border-blue-100' :
                                         'bg-gray-50 text-gray-600 border border-gray-200'
                                     }`}>{p}</span>
                                 ))
                             ) : (
                                 <span className="text-gray-400 text-xs">-</span>
                             )}
                         </div>
                     </div>
                 </div>

                 {/* Resource Management Title */}
                 <div className="mb-6">
                    <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                        <Settings className="w-5 h-5 text-gray-400" /> 资源配置与管理</h2>
                 </div>

                 {/* Cards Row */}
                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                     {/* Card 1: Traffic & Bandwidth */}
                     <div className="border border-gray-200 rounded-xl p-5 hover:border-gray-300 transition-colors">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-gray-800 flex items-center gap-2"><Signal className="w-4 h-4 text-emerald-500"/> 流量与带宽</h3>
                            <button className="text-xs text-blue-600 hover:underline">查看报表</button>
                        </div>
                        <div className="mb-4">
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-500">已用流量</span>
                                <span className="font-mono font-bold text-gray-900">{order.trafficUsed || '0'} / {trafficTotal}</span>
                            </div>
                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-500 rounded-full" style={{width: `${trafficPercentage}%`}}></div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3 mt-6">
                            <button className="py-2 px-3 border border-gray-200 rounded-lg text-xs font-bold text-gray-600 hover:bg-gray-50 hover:text-gray-900 flex items-center justify-center gap-1 transition-colors">
                                <Plus className="w-3 h-3"/> 购买流量
                            </button>
                            <button className="py-2 px-3 border border-gray-200 rounded-lg text-xs font-bold text-gray-600 hover:bg-gray-50 hover:text-gray-900 flex items-center justify-center gap-1 transition-colors">
                                <Zap className="w-3 h-3"/> 升级带宽
                            </button>
                        </div>
                     </div>

                     {/* Card 2: Protocol Config */}
                     <div className="border border-gray-200 rounded-xl p-5 hover:border-gray-300 transition-colors">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-bold text-gray-800 flex items-center gap-2"><Network className="w-4 h-4 text-blue-500"/> 协议配置</h3>
                            <span className="text-[10px] text-emerald-600 bg-emerald-50 border border-emerald-100 px-1.5 py-0.5 rounded">运行中</span>
                        </div>
                        <div className="space-y-4 mb-6">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600 font-medium">HTTP / HTTPS</span>
                                <div className="w-10 h-5 bg-blue-600 rounded-full relative cursor-pointer">
                                    <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full shadow-sm"></div>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600 font-medium">SOCKS5</span>
                                <div className="w-10 h-5 bg-blue-600 rounded-full relative cursor-pointer">
                                    <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full shadow-sm"></div>
                                </div>
                            </div>
                        </div>
                        <button className="w-full py-2 border border-gray-200 rounded-lg text-xs font-bold text-gray-600 hover:bg-gray-50 transition-colors">
                            重置端口配置
                        </button>
                     </div>

                     {/* Card 3: Package Info */}
                     <div className="border border-gray-200 rounded-xl p-5 hover:border-gray-300 transition-colors">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-gray-800 flex items-center gap-2"><FileText className="w-4 h-4 text-amber-500"/> 套餐与购买协议</h3>
                        </div>
                        <div className="space-y-2 mb-6 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-500">当前套餐</span>
                                <span className="font-bold text-gray-900">高级企业版 (Premium)</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">计费周期</span>
                                <span className="font-bold text-gray-900">季度 (Quarterly)</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500">自动续费</span>
                                <span className="text-xs text-emerald-600 font-medium">已开启</span>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <button className="w-full py-2 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 shadow-md shadow-blue-200 transition-colors flex items-center justify-center gap-2">
                                <RefreshCw className="w-3 h-3"/> 立即续费
                            </button>
                            <button className="w-full py-2 border border-gray-200 rounded-lg text-xs font-bold text-gray-600 hover:bg-gray-50 transition-colors">
                                变更套餐 / 协议
                            </button>
                        </div>
                     </div>
                 </div>

                 {/* Footer Info Row */}
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     {/* Terms */}
                     <div>
                         <h4 className="text-sm font-bold text-gray-400 mb-2 flex items-center gap-2"><FileWarning className="w-4 h-4"/> 使用条款</h4>
                         <div className="bg-amber-50/50 border border-amber-100 rounded-lg p-4 text-xs leading-relaxed text-amber-900/80">
                            {order.terms}
                         </div>
                     </div>
                     {/* Scope */}
                     <div>
                         <h4 className="text-sm font-bold text-gray-400 mb-2 flex items-center gap-2"><CheckCircle2 className="w-4 h-4"/> 授权范围</h4>
                         <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-4 text-xs leading-relaxed text-slate-700">
                             <div className="whitespace-pre-line">{order.scope}</div>
                         </div>
                     </div>
                 </div>
             </div>
        </div>
    );
};

// --- Support & Ticket Components ---

const TicketDetailView = ({ ticket, onBack }) => {
  const [replyText, setReplyText] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [showAllProxies, setShowAllProxies] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [localMessages, setLocalMessages] = useState(ticket.messages || []);
  const messagesEndRef = useRef(null);

  // 当 ticket.messages 变化时更新本地消息
  useEffect(() => {
    setLocalMessages(ticket.messages || []);
  }, [ticket.messages, ticket.id]);

  // 处理发送消息
  const handleSendMessage = async () => {
    if (!replyText.trim() || isSending) return;

    setIsSending(true);
    try {
      const { ticketAPI } = await import('./api/ticket');
      const result = await ticketAPI.sendMessage(ticket.id, replyText.trim(), 'user');

      // 添加新消息到本地状态
      const newMessage = {
        id: result.id || Date.now(),
        type: 'user',
        content: replyText.trim(),
        time: new Date().toLocaleString('zh-CN', { hour12: false }),
      };

      setLocalMessages(prev => [...prev, newMessage]);
      setReplyText('');
      // 滚动到底部
      setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    } catch (error) {
      console.error('Send message error:', error);
      alert('发送失败，请稍后重试');
    } finally {
      setIsSending(false);
    }
  };

  // 处理键盘事件
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const relatedOrder = useMemo(() => ORDERS_DATA.find(o => o.id === ticket.orderId), [ticket.orderId]);
  
  const fullProxyList = useMemo(() => {
      if (!relatedOrder) return [];
      return generateDetailedProxyList(relatedOrder);
  }, [relatedOrder]);

  const filteredProxies = useMemo(() => {
      if (!searchTerm) return fullProxyList;
      return fullProxyList.filter(p => p.ip.includes(searchTerm) || p.port.toString().includes(searchTerm));
  }, [fullProxyList, searchTerm]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [localMessages]);

  return (
    <div className="flex flex-col h-full bg-white relative animate-in fade-in slide-in-from-right-4 duration-300">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between shrink-0 bg-white z-10">
            <div className="flex items-center gap-3 overflow-hidden">
                <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 shrink-0">
                    <ArrowLeft className="w-5 h-5"/>
                </button>
                <div className="min-w-0">
                    <h2 className="text-lg font-bold text-gray-900 truncate">{ticket.subject}</h2>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                    <span className="font-mono bg-gray-100 px-1.5 py-0.5 rounded">#{ticket.id}</span>
                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                    <span className={`px-1.5 py-0.5 rounded border ${ticket.category === 'connection' ? 'bg-red-50 border-red-100 text-red-600' : 'bg-gray-50 border-gray-100'}`}>
                        {ticket.category === 'connection' ? '连接问题' : ticket.category === 'billing' ? '财务问题' : '其他'}
                    </span>
                    </div>
                </div>
            </div>
            <div className="shrink-0 flex items-center gap-2">
                <TicketStatusBadge status={ticket.status} label={ticket.statusLabel} />
            </div>
        </div>

        {/* Order Info Panel */}
        <div className="bg-slate-50 border-b border-gray-200">
            <div 
                className="px-6 py-3 flex items-center justify-between cursor-pointer hover:bg-slate-100 transition-colors"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="flex items-center gap-3 text-sm text-gray-700 font-medium">
                    <Box className="w-4 h-4 text-blue-600" />
                    {relatedOrder ? `订单: ${relatedOrder.id}` : (ticket.orderId || '未关联订单')}
                </div>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
            </div>
            
            {isExpanded && relatedOrder && (
                <div className="px-6 pb-4 animate-in slide-in-from-top-1">
                    <div className="bg-white rounded-lg border border-gray-200 p-4 text-xs shadow-sm">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                            <div>
                                <div className="text-gray-400 mb-1">产品类型</div>
                                <div className="font-medium text-gray-900">{relatedOrder.typeLabel}</div>
                            </div>
                            <div>
                                <div className="text-gray-400 mb-1">鍖哄煙</div>
                                <div className="font-medium text-gray-900">{relatedOrder.region}</div>
                            </div>
                            <div>
                                <div className="text-gray-400 mb-1">到期时间</div>
                                <div className="font-medium text-gray-900">{relatedOrder.expireDate}</div>
                            </div>
                            <div>
                                <div className="text-gray-400 mb-1">IP 数量</div>
                                <div className="font-medium text-gray-900">{relatedOrder.totalIps} IPs</div>
                            </div>
                        </div>
                        <div className="border-t border-gray-100 pt-3">
                            <div className="text-gray-400 mb-2 flex justify-between items-center">
                                <span>包含 IP 资源</span>
                                <div className="flex items-center gap-2">
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); setShowAllProxies(!showAllProxies); }}
                                        className="text-blue-600 hover:bg-blue-50 px-2 py-1 rounded transition-colors flex items-center gap-1"
                                    >
                                        {showAllProxies ? '收起列表' : '查看全部资源'} 
                                        {showAllProxies ? <ChevronDown className="w-3 h-3 rotate-180"/> : <ChevronDown className="w-3 h-3"/>}
                                    </button>
                                </div>
                            </div>
                            
                            {/* Expanded Full Proxy List */}
                            {showAllProxies ? (
                                <div className="mt-2 bg-gray-50 border border-gray-200 rounded-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                                    <div className="p-2 border-b border-gray-200 flex gap-2">
                                        <Search className="w-3.5 h-3.5 text-gray-400 my-auto ml-1" />
                                        <input 
                                            type="text" 
                                            placeholder="搜索 IP..." 
                                            className="bg-transparent border-none outline-none text-xs w-full text-gray-600 placeholder-gray-400"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            onClick={(e) => e.stopPropagation()}
                                        />
                                    </div>
                                    <div className="max-h-48 overflow-y-auto custom-scrollbar">
                                        <table className="w-full text-left">
                                            <thead className="bg-gray-100 text-gray-500 sticky top-0">
                                                <tr>
                                                    <th className="px-3 py-2 font-normal">IP:Port</th>
                                                    <th className="px-3 py-2 font-normal">协议</th>
                                                    <th className="px-3 py-2 font-normal text-right">状态</th>
                                                    <th className="px-3 py-2 font-normal text-right">操作</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-100">
                                                {filteredProxies.map((p) => (
                                                    <tr key={p.id} className="hover:bg-white transition-colors">
                                                        <td className="px-3 py-2 font-mono text-gray-700">{p.ip}:{p.port}</td>
                                                        <td className="px-3 py-2 text-gray-500">{p.availableProtocols[0]}</td>
                                                        <td className="px-3 py-2 text-right">
                                                            <span className="inline-flex items-center gap-1 text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                                                                <div className="w-1 h-1 bg-emerald-500 rounded-full"></div>在线
                                                            </span>
                                                        </td>
                                                        <td className="px-3 py-2 text-right">
                                                            <button 
                                                                onClick={(e) => { e.stopPropagation(); copyToClipboard(`${p.ip}:${p.port}`); }}
                                                                className="text-blue-600 hover:underline"
                                                            >
                                                                澶嶅埗
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                                {filteredProxies.length === 0 && (
                                                    <tr><td colSpan="4" className="text-center py-4 text-gray-400">未找到匹配的 IP</td></tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            ) : (
                                /* Compact Preview */
                                <div className="flex flex-wrap gap-2">
                                    {relatedOrder.mockIps.slice(0, 3).map(ip => (
                                        <span key={ip} className="bg-gray-100 px-1.5 py-0.5 rounded font-mono text-gray-600">{ip}</span>
                                    ))}
                                    {relatedOrder.totalIps > 3 && <span className="text-gray-400 px-1.5 py-0.5 text-[10px]">... 等 {relatedOrder.totalIps} 个 IP</span>}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
            {isExpanded && !relatedOrder && ticket.orderId && (
                 <div className="px-6 pb-4 animate-in slide-in-from-top-1">
                    <div className="bg-white rounded-lg border border-gray-200 p-4 text-xs shadow-sm text-gray-500 text-center">
                        此工单关联的是合并资源包或已归档订单，暂无详细预览。?                    </div>
                 </div>
            )}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 bg-white space-y-6">
            <div className="flex justify-center">
                <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">{ticket.updateTime} 创建工单</span>
            </div>
            
            {/* Render existing messages */}
            {localMessages && localMessages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex flex-col max-w-[80%] ${msg.type === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm whitespace-pre-wrap ${
                    msg.type === 'user'
                    ? 'bg-blue-600 text-white rounded-tr-sm'
                    : 'bg-white text-gray-800 border border-gray-200 rounded-tl-sm'
                }`}>
                    {msg.content}
                </div>
                <span className="text-[10px] text-gray-400 mt-1.5 mx-1">{msg.time}</span>
                </div>
            </div>
            ))}
            <div ref={messagesEndRef} />
        </div>

        {/* Reply Area */}
        <div className="p-4 border-t border-gray-100 bg-white shrink-0">
            <div className="relative">
                <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="输入回复内容... (Shift+Enter 换行)"
                className="w-full pl-4 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none text-sm min-h-[50px] max-h-[150px]"
                rows={1}
                disabled={isSending}
                />
                <button
                onClick={handleSendMessage}
                className="absolute right-2 bottom-2 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!replyText.trim() || isSending}
                >
                {isSending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                </button>
            </div>
            <div className="flex items-center justify-between mt-2 px-1">
                <button className="text-gray-400 hover:text-gray-600 transition-colors"><Paperclip className="w-5 h-5"/></button>
                <span className="text-xs text-gray-400">{isSending ? '发送中...' : '按 Enter 发送，Shift+Enter 换行'}</span>
            </div>
        </div>
    </div>
  );
}

const SupportView = ({ initialDraft, onClearDraft }) => {
  const [view, setView] = useState('list'); // 'list' | 'create' | 'detail'
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState('connection');
  const [orderId, setOrderId] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [isLoadingTickets, setIsLoadingTickets] = useState(true);

  const [selectedIPs, setSelectedIPs] = useState(new Set());
  const [ipIssues, setIpIssues] = useState({});

  // 订单相关状态
  const [orders, setOrders] = useState([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(false);
  const [orderProxies, setOrderProxies] = useState([]);
  const [isLoadingProxies, setIsLoadingProxies] = useState(false);

  const scenarioGroups = useMemo(() => {
    const groups = {};
    orders.forEach(order => {
      const scenario = order.scenario || 'other';
      const key = scenario;
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(order);
    });
    return groups;
  }, [orders]);

  const selectedOrderDetails = useMemo(() => {
    if (!orderId || orderId.startsWith('GROUP:')) return null;
    return orders.find(o => o.order_id === orderId);
  }, [orderId, orders]);

  useEffect(() => {
    if (initialDraft) {
      setView('create');
      if (initialDraft.orderId) setOrderId(initialDraft.orderId);
    }
  }, [initialDraft]);

  // 加载订单列表
  useEffect(() => {
    const loadOrders = async () => {
      setIsLoadingOrders(true);
      try {
        const result = await orderService.getOrders({ page: 1, pageSize: 50 });
        if (result.success && result.data) {
          setOrders(result.data.list || []);
        } else {
          console.error('Failed to load orders:', result.message);
          setOrders([]);
        }
      } catch (error) {
        console.error('Error loading orders:', error);
        setOrders([]);
      } finally {
        setIsLoadingOrders(false);
      }
    };

    // 只在 create 视图加载订单
    if (view === 'create') {
      loadOrders();
    }
  }, [view]);

  // 加载订单的代理节点
  useEffect(() => {
    const loadOrderProxies = async () => {
      if (!selectedOrderDetails || selectedOrderDetails.deployed_node_count === 0) {
        setOrderProxies([]);
        return;
      }

      setIsLoadingProxies(true);
      try {
        const result = await orderService.getProxyNodes(selectedOrderDetails.order_id);
        if (result.success && result.data) {
          // 转换代理节点格式
          const proxies = (result.data.proxy_nodes || []).map(node => ({
            ip: node.ip,
            port: node.port,
            id: node.id,
            status: node.status,
            country: node.country,
            protocols: node.protocols || [],
          }));
          setOrderProxies(proxies);
        } else {
          console.error('Failed to load proxy nodes:', result.message);
          setOrderProxies([]);
        }
      } catch (error) {
        console.error('Error loading proxy nodes:', error);
        setOrderProxies([]);
      } finally {
        setIsLoadingProxies(false);
      }
    };

    loadOrderProxies();
  }, [selectedOrderDetails]);

  useEffect(() => {
    setSelectedIPs(new Set());
    setIpIssues({});
  }, [orderId]);

  // 加载工单列表
  useEffect(() => {
    const loadTickets = async () => {
      setIsLoadingTickets(true);
      try {
        const result = await ticketService.getMyTickets({ page: 1, pageSize: 50 });
        if (result.success && result.data) {
          setTickets(result.data.data || []);
        } else {
          console.error('Failed to load tickets:', result.message);
          setTickets([]);
        }
      } catch (error) {
        console.error('Error loading tickets:', error);
        setTickets([]);
      } finally {
        setIsLoadingTickets(false);
      }
    };

    loadTickets();
  }, []);

  const toggleIP = (ip) => {
    const newSet = new Set(selectedIPs);
    if (newSet.has(ip)) {
      newSet.delete(ip);
      const newIssues = { ...ipIssues };
      delete newIssues[ip];
      setIpIssues(newIssues);
    } else {
      newSet.add(ip);
    }
    setSelectedIPs(newSet);
  };

  const updateIpIssue = (ip, text) => {
    setIpIssues(prev => ({ ...prev, [ip]: text }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    let fullDescription = description;
    if (selectedIPs.size > 0) {
      const ipDetails = Array.from(selectedIPs).map(ip => `- ${ip}: ${ipIssues[ip] || '未填写具体问题'}`).join('\n');
      fullDescription += `\n\n[受影响 IP 列表]:\n${ipDetails}`;
    }

    // 映射 SupportView 的 category 到 ticketService 的 category
    const categoryMap = {
      'connection': 'technical',
      'speed': 'technical',
      'billing': 'billing',
      'suggestion': 'suggestion',
      'other': 'other',
    };

    try {
      const result = await ticketService.submitTicket({
        subject: subject,
        category: categoryMap[category] || category,
        message: fullDescription,
        priority: 'normal',
        orderId: orderId || '',
      });

      if (result.success) {
        // 提交成功，刷新工单列表
        const ticketsResult = await ticketService.getMyTickets({ page: 1, pageSize: 50 });
        if (ticketsResult.success && ticketsResult.data) {
          // 更新工单列表数据
          setTickets(ticketsResult.data.data || []);
        }

        alert(result.message || '工单提交成功！');

        // 重置表单
        setSubject('');
        setOrderId('');
        setDescription('');
        setSelectedIPs(new Set());
        setIpIssues({});

        setView('list');
        if (onClearDraft) onClearDraft();
      } else {
        alert(`工单提交失败：${result.message}`);
      }
    } catch (error) {
      console.error('Submit ticket error:', error);
      alert(`工单提交失败：${error.message || '网络错误，请稍后重试'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackToList = () => {
    setView('list');
    setSelectedTicket(null);
    if (onClearDraft) onClearDraft();
  };

  const handleSelectTicket = async (ticket) => {
    // 加载工单消息
    try {
      const { ticketAPI } = await import('./api/ticket');
      const messagesResult = await ticketAPI.getTicketMessages(ticket.id);

      // 更新工单对象的消息列表
      const ticketWithMessages = {
        ...ticket,
        messages: messagesResult.data || [],
      };

      setSelectedTicket(ticketWithMessages);
      setView('detail');
    } catch (error) {
      console.error('Failed to load ticket messages:', error);
      // 即使加载消息失败，也显示工单详情
      setSelectedTicket(ticket);
      setView('detail');
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-full animate-in fade-in duration-300">
      {/* Main Content Area */}
      <div className="flex-1 bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col overflow-hidden h-[calc(100vh-140px)] lg:h-auto">
         
         {/* Detail Mode */}
         {view === 'detail' && selectedTicket && (
            <TicketDetailView ticket={selectedTicket} onBack={handleBackToList} />
         )}

         {/* Create Mode */}
         {view === 'create' && (
           <div className="flex flex-col h-full p-6 overflow-y-auto">
             <div className="flex items-center gap-2 mb-6 shrink-0">
                <button onClick={handleBackToList} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"><ArrowLeft className="w-5 h-5"/></button>
                <h2 className="text-xl font-bold text-gray-900">新建工单</h2>
             </div>
             
             <form onSubmit={handleSubmit} className="space-y-5 flex-1 flex flex-col">
                <div>
                   <label className="block text-sm font-bold text-gray-700 mb-1.5">标题 / 摘要</label>
                   <input 
                     type="text" 
                     required
                     className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                     placeholder="简要描述您遇到的问题?.."
                     value={subject}
                     onChange={e => setSubject(e.target.value)}
                   />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                   <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1.5">关联订单 (可选)</label>
                      <div className="relative">
                        <select
                          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none appearance-none cursor-pointer text-sm"
                          value={orderId}
                          onChange={e => setOrderId(e.target.value)}
                          disabled={isLoadingOrders}
                        >
                          <option value="">-- 选择相关订单 --</option>

                          {isLoadingOrders ? (
                            <option disabled>加载订单中...</option>
                          ) : orders.length === 0 ? (
                            <option disabled>暂无订单</option>
                          ) : (
                            <>
                              {/* Render Group Options */}
                              {Object.entries(scenarioGroups).map(([scenario, groupOrders]) => (
                                groupOrders.length > 1 && (
                                  <option key={`group-${scenario}`} value={`GROUP:${scenario}`} className="font-bold text-blue-600 bg-blue-50">
                                    合并工单: {scenario} (共 {groupOrders.length} 个订单)
                                  </option>
                                )
                              ))}

                              <optgroup label="单笔订单">
                                {orders.map(order => (
                                  <option key={order.order_id} value={order.order_id}>
                                    {order.order_id} - {order.country} [{order.template_name || order.resource_type}]
                                  </option>
                                ))}
                              </optgroup>
                            </>
                          )}
                        </select>
                        <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                      <p className="text-[10px] text-gray-400 mt-1.5">💡 提示：相同使用场景的订单可以选择"合并工单"进行批量反馈。</p>
                   </div>
                   <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1.5">问题分类</label>
                      <div className="relative">
                        <select 
                          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none appearance-none cursor-pointer text-sm"
                          value={category}
                          onChange={e => setCategory(e.target.value)}
                        >
                          <option value="connection">连接超时 / 无法连接</option>
                          <option value="speed">速度慢 / 丢包</option>
                          <option value="billing">账单 / 续费问题</option>
                          <option value="suggestion">功能建议</option>
                          <option value="other">其他问题</option>
                        </select>
                        <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                   </div>
                </div>

                {/* --- Affected IPs Selection --- */}
                {isLoadingProxies ? (
                  <div className="bg-slate-50 rounded-xl border border-gray-200 p-4 flex items-center justify-center">
                    <RefreshCw className="w-5 h-5 text-gray-400 animate-spin mr-2" />
                    <span className="text-sm text-gray-500">加载代理节点中...</span>
                  </div>
                ) : orderProxies.length > 0 ? (
                  <div className="bg-slate-50 rounded-xl border border-gray-200 p-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-amber-500" />
                        选择具体故障 IP (可选)
                      </label>
                      <span className="text-xs text-gray-500 bg-white px-2 py-0.5 rounded border border-gray-200">
                        已选 <span className="font-bold text-blue-600">{selectedIPs.size}</span> 个
                      </span>
                    </div>
                    <div className="max-h-48 overflow-y-auto custom-scrollbar pr-1 space-y-2">
                      {orderProxies.map(p => (
                        <div
                          key={`${p.ip}:${p.port}`}
                          onClick={() => toggleIP(`${p.ip}:${p.port}`)}
                          className={`group flex items-center gap-3 p-2.5 rounded-lg border cursor-pointer transition-all ${
                            selectedIPs.has(`${p.ip}:${p.port}`)
                              ? 'bg-white border-blue-300 shadow-sm ring-1 ring-blue-100'
                              : 'bg-white/50 border-transparent hover:bg-white hover:border-gray-300'
                          }`}
                        >
                          <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                            selectedIPs.has(`${p.ip}:${p.port}`) ? 'bg-blue-600 border-blue-600' : 'border-gray-300 bg-white'
                          }`}>
                            {selectedIPs.has(`${p.ip}:${p.port}`) && <Check className="w-3 h-3 text-white" />}
                          </div>
                          <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-2">
                             <span className={`font-mono text-sm ${selectedIPs.has(`${p.ip}:${p.port}`) ? 'text-gray-900 font-bold' : 'text-gray-600'}`}>
                               {p.ip}:{p.port}
                             </span>
                             {selectedIPs.has(`${p.ip}:${p.port}`) && (
                               <input
                                 type="text"
                                 placeholder="请描述该 IP 的具体问题?.."
                                 className="flex-1 text-xs border-b border-gray-200 focus:border-blue-500 outline-none bg-transparent py-1 px-2 text-gray-700 placeholder-gray-400 animate-in fade-in slide-in-from-left-2"
                                 value={ipIssues[`${p.ip}:${p.port}`] || ''}
                                 onChange={(e) => updateIpIssue(`${p.ip}:${p.port}`, e.target.value)}
                                 onClick={(e) => e.stopPropagation()}
                                 autoFocus
                               />
                             )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : selectedOrderDetails ? (
                  <div className="bg-slate-50 rounded-xl border border-gray-200 p-4 text-center">
                    <p className="text-sm text-gray-500">该订单暂无可用代理节点</p>
                  </div>
                ) : null}

                <div className="flex-1 min-h-[150px] flex flex-col">
                   <label className="block text-sm font-bold text-gray-700 mb-1.5">详细描述</label>
                   <textarea 
                     required
                     className="w-full h-full p-4 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none text-sm"
                     placeholder={selectedIPs.size > 0 ? "已选择具体 IP，您可以在此补充更多背景信息..." : "请详细描述问题复现步骤、报错信息等..."}
                     value={description}
                     onChange={e => setDescription(e.target.value)}
                   ></textarea>
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">附件 / 截图 (可选)</label>
                    <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 flex flex-col items-center justify-center text-gray-400 hover:border-blue-400 hover:bg-blue-50 transition-all cursor-pointer">
                        <Paperclip className="w-6 h-6 mb-2" />
                        <span className="text-xs">点击或拖拽文件到此处上传</span>
                    </div>
                </div>

                <button disabled={isSubmitting} className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-md shadow-blue-100 disabled:opacity-70 disabled:cursor-not-allowed">
                   {isSubmitting ? <RefreshCw className="w-4 h-4 animate-spin"/> : <Send className="w-4 h-4" />}
                   {isSubmitting ? '提交中...' : '提交工单'}
                </button>
             </form>
           </div>
         )}

         {/* List Mode */}
         {view === 'list' && (
            <div className="flex flex-col h-full">
               <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50 shrink-0">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">售后工单</h2>
                    <p className="text-sm text-gray-500 mt-1">查看工单进度或提交新问题</p>
                  </div>
                  <button onClick={() => setView('create')} className="px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-sm">
                     <Plus className="w-4 h-4" /> 新增工单
                  </button>
               </div>
               
               <div className="flex-1 overflow-y-auto">
                  {isLoadingTickets ? (
                    <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                       <RefreshCw className="w-8 h-8 mb-3 animate-spin" />
                       <p>加载工单列表...</p>
                    </div>
                  ) : tickets.length > 0 ? (
                    <div className="divide-y divide-gray-100">
                       {tickets.map(ticket => (
                          <div key={ticket.id} onClick={() => handleSelectTicket(ticket)} className="p-5 hover:bg-gray-50 transition-colors cursor-pointer group">
                             <div className="flex justify-between items-start mb-2">
                                <div className="flex items-center gap-3">
                                   <span className="font-mono text-xs text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">#{ticket.id}</span>
                                   <h3 className="font-bold text-gray-800 text-sm group-hover:text-blue-600 transition-colors">{ticket.title || ticket.subject}</h3>
                                </div>
                                <TicketStatusBadge status={ticket.status} label={ticketService.formatTicketStatus(ticket.status)} />
                             </div>
                             <div className="flex items-center gap-4 text-xs text-gray-500">
                                <span className="flex items-center gap-1"><Clock className="w-3 h-3"/> 更新于 {ticket.updatedAt || ticket.updateTime}</span>
                                {ticket.orderId && <span className="flex items-center gap-1"><Hash className="w-3 h-3"/> 关联订单: {ticket.orderId}</span>}
                             </div>
                          </div>
                       ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                       <MessageSquare className="w-12 h-12 mb-3 opacity-20" />
                       <p>暂无工单记录</p>
                    </div>
                  )}
               </div>
            </div>
         )}
      </div>
      
      {/* Right: Info */}
      <div className="w-full lg:w-80 space-y-6 hidden lg:block">
         <div className="bg-blue-600 text-white rounded-xl p-6 shadow-lg shadow-blue-200">
            <h3 className="font-bold text-lg mb-2 flex items-center gap-2"><LifeBuoy className="w-5 h-5"/> 需要紧急协助？</h3>
            <p className="text-blue-100 text-xs mb-4">对于严重的网络中断或账单问题，您可以通过以下方式直接联系我们。</p>
            <div className="space-y-3">
               <a href="#" className="flex items-center gap-3 p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                  <div className="p-1.5 bg-white rounded-full text-blue-600"><MessageCircle className="w-4 h-4" /></div>
                  <div className="text-sm font-medium">Telegram 客服</div>
               </a>
               <a href="#" className="flex items-center gap-3 p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                  <div className="p-1.5 bg-white rounded-full text-blue-600"><Mail className="w-4 h-4" /></div>
                  <div className="text-sm font-medium">support@proxy.com</div>
               </a>
            </div>
         </div>

         <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="p-4 border-b border-gray-100 bg-gray-50 font-bold text-sm text-gray-700">常见问题 (FAQ)</div>
            <div className="divide-y divide-gray-100">
               {[
                 "如何在指纹浏览器中配置代理？",
                 "为什么我的连接显示超时？",
                 "支持哪些支付方式？",
                 "流量耗尽后如何购买加油包？"
               ].map((q, i) => (
                 <button key={i} className="w-full text-left p-4 text-xs text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors flex justify-between items-center group">
                    {q}
                    <ChevronRight className="w-3 h-3 text-gray-300 group-hover:text-blue-400" />
                 </button>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
};

// --- Enhanced Router Wizard View ---
const RouterWizardView = ({ targetClient, onBack, onSaveConfig, initialConfig }) => {
  const [step, setStep] = useState(1);
  const [proxySelections, setProxySelections] = useState(initialConfig?.proxySelections || {}); 
  const [expandedOrders, setExpandedOrders] = useState({});
  const [template, setTemplate] = useState(initialConfig?.client || targetClient || 'mihomo'); 
  const [configName, setConfigName] = useState(initialConfig?.name || `我的${targetClient ? targetClient.toUpperCase() : '配置'}_${new Date().toLocaleDateString()}`);

  const [networkConfig, setNetworkConfig] = useState(initialConfig?.networkConfig || {
    mixedPort: 7890,
    redirPort: 7892,
    uiPort: 9090,
    allowLan: true,
    bindAddress: '*',
    mode: 'rule',
    outboundInterface: ''
  });

  const [lanRules, setLanRules] = useState(initialConfig?.lanRules || [
    { id: 1, name: '运营组 MacBook (01)', ip: '192.168.10.101', proxyId: 'auto', protocol: '' },
    { id: 2, name: '测试机 iPhone (Test)', ip: '192.168.10.55', proxyId: 'auto', protocol: '' }
  ]);

  const allProxies = useMemo(() => {
    return ORDERS_DATA.flatMap(order => generateDetailedProxyList(order));
  }, []);

  const selectedProxiesList = useMemo(() => {
    return allProxies.filter(p => proxySelections[p.id] && proxySelections[p.id].length > 0);
  }, [allProxies, proxySelections]);

  const toggleOrderExpand = (orderId) => {
    setExpandedOrders(prev => ({ ...prev, [orderId]: !prev[orderId] }));
  };

  const toggleProxyProtocol = (proxyId, protocol) => {
    setProxySelections(prev => {
      const currentProtos = prev[proxyId] || [];
      if (currentProtos.includes(protocol)) {
        const newProtos = currentProtos.filter(p => p !== protocol);
        if (newProtos.length === 0) {
           const newState = { ...prev };
           delete newState[proxyId];
           return newState;
        }
        return { ...prev, [proxyId]: newProtos };
      } else {
        return { ...prev, [proxyId]: [...currentProtos, protocol] };
      }
    });
  };

  const toggleProxyAll = (proxyId, availableProtocols) => {
     setProxySelections(prev => {
        const currentProtos = prev[proxyId];
        if (currentProtos && currentProtos.length === availableProtocols.length) {
           const newState = { ...prev };
           delete newState[proxyId];
           return newState;
        } else {
           return { ...prev, [proxyId]: availableProtocols };
        }
     });
  };

  const toggleSelectAllInOrder = (orderId, orderProxies) => {
    const allIds = orderProxies.map(p => p.id);
    const isFullSelected = orderProxies.every(p => {
       const selected = proxySelections[p.id] || [];
       return selected.length === p.availableProtocols.length;
    });

    setProxySelections(prev => {
       const newState = { ...prev };
       if (isFullSelected) {
          allIds.forEach(id => delete newState[id]);
       } else {
          orderProxies.forEach(p => {
             newState[p.id] = p.availableProtocols;
          });
       }
       return newState;
    });
  };
  
  const updateRule = (id, field, value) => {
    setLanRules(prevRules => {
      return prevRules.map(r => {
        if (r.id === id) {
          if (field === 'proxyId') {
             const proxy = selectedProxiesList.find(p => p.id === value);
             const available = proxy ? (proxySelections[proxy.id] || []) : [];
             return { ...r, [field]: value, protocol: available[0] || '' };
          }
          return { ...r, [field]: value };
        }
        return r;
      });
    });
  };
  
  const removeRule = (id) => {
    setLanRules(lanRules.filter(r => r.id !== id));
  };

  const generatedConfig = useMemo(() => {
    if (step < 4) return '';
    
    const configEntries = selectedProxiesList.flatMap(p => {
        const selectedProtos = proxySelections[p.id] || [];
        return selectedProtos.map(proto => {
            const name = `${p.city}_${p.ip.split('.').pop()}_${proto.toLowerCase()}`;
            return {
               id: p.id, 
               name: name,
               type: proto.toLowerCase(),
               server: p.ip,
               port: p.port,
            };
        });
    });

    const proxyNames = configEntries.map(e => `"${e.name}"`).join(', ');

    const lanRulesStr = lanRules.map(r => {
       if (r.ip && r.proxyId && r.proxyId !== 'auto') {
          const proxyObj = selectedProxiesList.find(p => p.id === r.proxyId);
          if (proxyObj) {
             const targetProto = r.protocol || (proxySelections[proxyObj.id] && proxySelections[proxyObj.id][0]) || '';
             if (targetProto) {
                const entryName = `${proxyObj.city}_${proxyObj.ip.split('.').pop()}_${targetProto.toLowerCase()}`;
                return `  - SRC-IP-CIDR,${r.ip}/32,${entryName}`;
             }
          }
       }
       return '';
    }).filter(Boolean).join('\n');

    return `# Generated by ProxyManager for ${template}
# 业务环境配置
name: ${configName}
mixed-port: ${networkConfig.mixedPort}
allow-lan: ${networkConfig.allowLan}
bind-address: "${networkConfig.bindAddress}"
mode: rule
log-level: info

# 代理节点汇总(${configEntries.length} nodes generated)
proxies:
${configEntries.map(e => `  - { name: "${e.name}", type: ${e.type}, server: ${e.server}, port: ${e.port} }`).join('\n')}

# 策略组(Business Logic)
proxy-groups:
  - name: PROXY
    type: select
    proxies: [AUTO, DIRECT, ${proxyNames}]
  
  - name: AUTO
    type: url-test
    url: 'http://www.gstatic.com/generate_204'
    interval: 300
    proxies: [${proxyNames}]

# 分流规则 (Traffic Rules)
rules:
${lanRulesStr}
  - MATCH,PROXY`;
  }, [step, selectedProxiesList, proxySelections, template, networkConfig, configName, lanRules]);

  const handleFinish = () => {
    onSaveConfig({
      id: initialConfig?.id || Date.now(),
      name: configName,
      client: template,
      nodeCount: selectedProxiesList.length,
      updateTime: new Date().toLocaleString(),
      status: 'running',
      devices: lanRules.length,
      // 保存完整状态以便后续编辑?      proxySelections,
      networkConfig,
      lanRules
    });
    onBack();
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500 pb-20">
      <div className="flex items-center justify-between">
         <button onClick={onBack} className="flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition-colors group">
           <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 返回首页
         </button>
         <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">步骤 {step}/4</span>
            <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
               <div className="h-full bg-blue-600 transition-all duration-500" style={{width: `${step * 25}%`}}></div>
            </div>
         </div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden min-h-[600px] flex flex-col">
         {/* STEP 1: Granular Selection with Protocol Checkboxes */}
         {step === 1 && (
            <div className="p-8 flex-1 flex flex-col">
               <h2 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2"><MousePointerClick className="w-6 h-6 text-blue-600"/> 第一步：选择代理资源与协议</h2>
               <p className="text-gray-500 text-sm mb-6">请勾选您希望使用的 IP 节点。您可以为每个 IP <strong>单独指定</strong> 需要导出的协议类型。</p>
               
               <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                   {ORDERS_DATA.map(order => {
                      const orderProxies = generateDetailedProxyList(order);
                      // Calc selected counts
                      let selectedIpsCount = 0;
                      orderProxies.forEach(p => {
                          if (proxySelections[p.id] && proxySelections[p.id].length > 0) selectedIpsCount++;
                      });
                      
                      const isAll = selectedIpsCount === orderProxies.length && orderProxies.every(p => (proxySelections[p.id]||[]).length === p.availableProtocols.length);
                      const isIndeterminate = selectedIpsCount > 0 && !isAll;

                      return (
                        <div key={order.id} className="border border-gray-200 rounded-xl overflow-hidden transition-all hover:border-blue-200">
                           {/* Order Header */}
                           <div className="bg-gray-50 p-4 flex items-center justify-between cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => toggleOrderExpand(order.id)}>
                              <div className="flex items-center gap-4">
                                 <button 
                                   onClick={(e) => { e.stopPropagation(); toggleSelectAllInOrder(order.id, orderProxies); }}
                                   className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${isAll ? 'bg-blue-600 border-blue-600' : isIndeterminate ? 'bg-blue-100 border-blue-600' : 'border-gray-300 bg-white'}`}
                                 >
                                     {isAll && <Check className="w-3.5 h-3.5 text-white" />}
                                     {isIndeterminate && <div className="w-2.5 h-2.5 bg-blue-600 rounded-sm" />}
                                 </button>
                                 <div>
                                    <div className="font-bold text-gray-900 flex items-center gap-2">
                                       {order.typeLabel} <span className="font-normal text-gray-500 text-xs">({order.region})</span>
                                    </div>
                                    <div className="text-xs text-gray-500">已选 {selectedIpsCount} / {order.totalIps} 个节点</div>
                                 </div>
                              </div>
                              <div className="flex items-center gap-2 text-gray-400">
                                 {expandedOrders[order.id] ? <ChevronDown className="w-5 h-5"/> : <ChevronRight className="w-5 h-5"/>}
                              </div>
                           </div>
                           
                           {/* Proxy List (Expandable) */}
                           {expandedOrders[order.id] && (
                              <div className="p-2 bg-white grid grid-cols-1 gap-2 animate-in slide-in-from-top-2">
                                 {orderProxies.map(proxy => {
                                     const currentSelected = proxySelections[proxy.id] || [];
                                     const isProxySelected = currentSelected.length > 0;

                                     return (
                                        <div 
                                          key={proxy.id} 
                                          className={`flex flex-col sm:flex-row sm:items-center gap-3 p-3 rounded-lg border transition-all ${isProxySelected ? 'border-blue-500 bg-blue-50/30' : 'border-gray-100 hover:border-gray-200'}`}
                                        >
                                           {/* Left: Checkbox & Info */}
                                           <div className="flex items-center gap-3 flex-1 cursor-pointer" onClick={() => toggleProxyAll(proxy.id, proxy.availableProtocols)}>
                                               <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${isProxySelected ? 'border-blue-600 bg-blue-600' : 'border-gray-300'}`}>
                                                   {isProxySelected && <Check className="w-2.5 h-2.5 text-white" />}
                                               </div>
                                               <div className="min-w-0">
                                                  <div className="flex items-center gap-2">
                                                     <span className="font-mono text-sm font-medium text-gray-700">{proxy.ip}</span>
                                                     <span className="text-[10px] text-gray-400">:{proxy.port}</span>
                                                  </div>
                                                  <div className="flex items-center gap-2 mt-0.5">
                                                     <span className="text-[10px] bg-gray-100 px-1.5 rounded text-gray-500">{proxy.city}</span>
                                                  </div>
                                               </div>
                                           </div>

                                           {/* Right: Protocol Selectors */}
                                           <div className="flex flex-wrap gap-2 sm:justify-end pl-7 sm:pl-0">
                                              {proxy.availableProtocols.map(proto => {
                                                  const isProtoSelected = currentSelected.includes(proto);
                                                  return (
                                                      <button
                                                        key={proto}
                                                        onClick={(e) => { e.stopPropagation(); toggleProxyProtocol(proxy.id, proto); }}
                                                        className={`px-2.5 py-1 rounded text-[10px] font-bold border transition-all ${
                                                            isProtoSelected 
                                                            ? 'bg-blue-100 text-blue-700 border-blue-200' 
                                                            : 'bg-white text-gray-400 border-gray-200 hover:border-gray-300'
                                                        }`}
                                                      >
                                                          {proto}
                                                      </button>
                                                  )
                                              })}
                                           </div>
                                        </div>
                                     );
                                 })}
                              </div>
                           )}
                        </div>
                      );
                   })}
               </div>
               <div className="mt-4 pt-4 border-t flex justify-between items-center">
                  <span className="text-sm text-gray-600">已选変腑 <strong>{selectedProxiesList.length}</strong> 个 IP 节点</span>
               </div>
            </div>
         )}

         {/* STEP 2: Template Selection */}
         {step === 2 && (
            <div className="p-8 flex-1">
               <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2"><AppWindow className="w-6 h-6 text-blue-600"/> 第二步：选择客户端 / 环境模板</h2>
               <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {[
                     { id: 'mihomo', name: 'Mihomo', tag: '企业路由', icon: Cpu },
                     { id: 'openwrt', name: 'OpenWrt', tag: '网关插件', icon: RouterIcon },
                     { id: 'nikki', name: 'Nikki', tag: 'ImmortalWrt', icon: RouterIcon }, 
                     { id: 'clash_win', name: 'Clash Verge', tag: 'Windows PC', icon: Monitor },
                     { id: 'v2rayn', name: 'v2rayN', tag: 'Windows PC', icon: Laptop },
                     { id: 'surge_mac', name: 'Surge Mac', tag: 'macOS', icon: Activity }, 
                     { id: 'clashx', name: 'ClashX Pro', tag: 'macOS', icon: Command }, 
                     { id: 'shadowrocket', name: 'Shadowrocket', tag: 'iOS / iPad', icon: Rocket }, 
                     { id: 'quanx', name: 'Quantumult X', tag: 'iOS / iPad', icon: Smartphone },
                     { id: 'v2rayng', name: 'v2rayNG', tag: 'Android', icon: Smartphone }, 
                     { id: 'clash_android', name: 'Clash Meta', tag: 'Android', icon: Smartphone }, 
                     { id: 'surfboard', name: 'Surfboard', tag: 'Android', icon: Smartphone }, 
                     { id: 'nekobox', name: 'NekoBox', tag: 'Android', icon: Box }, 
                  ].map(t => (
                     <button 
                       key={t.id}
                       onClick={() => setTemplate(t.id)}
                       className={`flex flex-col items-center text-center p-4 rounded-xl border-2 transition-all hover:shadow-md ${template === t.id ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-100 hover:border-gray-300 bg-white text-gray-600'}`}
                     >
                        <t.icon className={`w-8 h-8 mb-3 ${template === t.id ? 'text-blue-600' : 'text-gray-400'}`} />
                        <div className="font-bold text-xs whitespace-nowrap">{t.name}</div>
                        <div className={`text-[10px] px-2 py-0.5 rounded-full mt-2 ${t.tag.includes('Android') ? 'bg-green-50 text-green-600' : t.tag.includes('iOS') ? 'bg-pink-50 text-pink-600' : 'bg-gray-100 opacity-60'}`}>{t.tag}</div>
                     </button>
                  ))}
               </div>
               <div className="mt-8">
                  <label className="block text-sm font-medium text-gray-700 mb-2">配置名称 (备注)</label>
                  <input 
                    type="text" 
                    placeholder="例如: 工作室 主路由配置 v1"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    value={configName}
                    onChange={e => setConfigName(e.target.value)}
                  />
               </div>
            </div>
         )}

         {/* STEP 3: LAN & Routing (Updated with Protocol Select) */}
         {step === 3 && (
            <div className="p-8 flex-1 flex flex-col">
               <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2"><Network className="w-6 h-6 text-blue-600"/> 第三步：设备分流策略 (Policy Routing)</h2>
                  <button onClick={() => setLanRules([...lanRules, { id: Date.now(), name: '', ip: '', proxyId: 'auto', protocol: '' }])} className="px-3 py-1.5 bg-blue-50 text-blue-700 text-sm font-medium rounded-lg hover:bg-blue-100 flex items-center gap-1">
                     <Plus className="w-4 h-4" /> 添加设备规则
                  </button>
               </div>
               
               <div className="bg-blue-50 p-4 rounded-xl mb-6 text-sm text-blue-800 flex gap-3">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <div>
                     <strong>企业/工作室网关配置：</strong> 在此处添加局域网内的业务设备。您可以指定特定设备走特定的 IP 出口，并选择对应的连接协议。                  </div>
               </div>

               <div className="bg-white border border-gray-200 rounded-xl overflow-hidden flex-1 shadow-sm">
                  <div className="grid grid-cols-12 gap-4 p-3 bg-gray-50 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase">
                     <div className="col-span-3">业务设备名称</div>
                     <div className="col-span-3">局域网 IP</div>
                     <div className="col-span-5">指定出口代理 (IP & Protocol)</div>
                     <div className="col-span-1"></div>
                  </div>
                  <div className="divide-y divide-gray-100 overflow-y-auto max-h-[350px]">
                     {lanRules.map((rule) => (
                        <div key={rule.id} className="grid grid-cols-12 gap-4 p-3 items-center hover:bg-gray-50">
                           <div className="col-span-3 flex items-center gap-2">
                              <Monitor className="w-4 h-4 text-gray-400" />
                              <input type="text" placeholder="如: 运营A组 Mac" className="w-full bg-transparent outline-none text-sm border-b border-transparent focus:border-blue-300" value={rule.name} onChange={e => updateRule(rule.id, 'name', e.target.value)}/>
                           </div>
                           <div className="col-span-3">
                              <input type="text" placeholder="192.168.x.x" className="w-full bg-transparent outline-none text-sm font-mono border-b border-transparent focus:border-blue-300" value={rule.ip} onChange={e => updateRule(rule.id, 'ip', e.target.value)}/>
                           </div>
                           <div className="col-span-5 flex flex-col gap-2">
                              {/* 1. Select Proxy IP */}
                              <div className="relative border border-gray-200 rounded-lg bg-white hover:border-blue-300 transition-colors">
                                <select 
                                  className="w-full p-2 text-sm bg-transparent outline-none appearance-none cursor-pointer relative z-10"
                                  value={rule.proxyId} 
                                  onChange={e => updateRule(rule.id, 'proxyId', e.target.value)}
                                >
                                   <option value="auto">⚙️ 自动负载均衡 (Auto)</option>
                                   <optgroup label="手动指定固定 IP">
                                       {selectedProxiesList.map(p => <option key={p.id} value={p.id}>{p.ip} - {p.city} ({p.country_code})</option>)}
                                   </optgroup>
                                </select>
                                <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 z-0">
                                   <ChevronDown className="w-4 h-4" />
                                </div>
                              </div>
                              
                              {/* 2. Show Detail & Select Protocol - INTEGRATED CARD */}
                              {rule.proxyId && rule.proxyId !== 'auto' && (() => {
                                  const p = selectedProxiesList.find(x => String(x.id) === String(rule.proxyId));
                                  if (p) {
                                    // Get selectable protocols for this proxy (from Step 1 selection)
                                    const availableProtos = proxySelections[p.id] || [];
                                    return (
                                        <div className="bg-blue-50/50 p-2.5 rounded-lg border border-blue-100 animate-in slide-in-from-top-1 space-y-2">
                                            <div className="flex items-center justify-between text-[10px] text-gray-500">
                                                <div className="flex items-center gap-2">
                                                  <span className="flex items-center gap-1 font-medium text-gray-700"><Globe className="w-3 h-3 text-blue-500"/> {p.country}</span>
                                                  <span className="text-gray-300">|</span>
                                                  <span className="font-mono text-blue-700 font-bold">关联IP: {p.ip}</span>
                                                </div>
                                            </div>
                                            
                                            <div className="flex items-center gap-2 pt-1.5 border-t border-blue-100/50">
                                                <span className="text-[10px] text-gray-400 font-medium">协议:</span>
                                                <div className="flex flex-wrap gap-1.5">
                                                      {availableProtos.map(proto => (
                                                          <button 
                                                            key={proto}
                                                            onClick={() => updateRule(rule.id, 'protocol', proto)}
                                                            className={`px-2.5 py-1 rounded-full text-[9px] font-medium border transition-all ${rule.protocol === proto ? 'bg-blue-600 text-white border-blue-600 shadow-sm' : 'bg-white text-gray-500 border-gray-200 hover:border-blue-300 hover:text-blue-600'}`}
                                                          >
                                                              {proto}
                                                          </button>
                                                      ))}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                  }
                              })()}
                           </div>
                           <div className="col-span-1 flex justify-center">
                              <button onClick={() => removeRule(rule.id)} className="text-gray-400 hover:text-red-500"><Trash2 className="w-4 h-4"/></button>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
               
               <div className="mt-6 space-y-4">
                   <h3 className="font-bold text-gray-900 text-sm">监听设置 (Inbound)</h3>
                   <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 border rounded-lg flex justify-between items-center">
                           <span className="text-sm text-gray-600">允许局域网连接 (Allow LAN)</span>
                           <input type="checkbox" checked={networkConfig.allowLan} onChange={e => setNetworkConfig({...networkConfig, allowLan: e.target.checked})} className="toggle checkbox-xs" />
                        </div>
                        <div className="p-3 border rounded-lg flex items-center gap-2">
                            <span className="text-sm text-gray-600 whitespace-nowrap">混合端口</span>
                            <input type="number" className="w-full text-sm text-right outline-none font-mono" value={networkConfig.mixedPort} onChange={e => setNetworkConfig({...networkConfig, mixedPort: e.target.value})} />
                        </div>
                   </div>
               </div>
            </div>
         )}

         {/* STEP 4: FINISH */}
         {step === 4 && (
            <div className="p-0 flex-1 flex flex-col">
               <div className="p-8 bg-emerald-50/50 flex flex-col items-center justify-center text-center border-b border-emerald-100 py-12">
                   <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4 shadow-sm">
                      <Check className="w-8 h-8" />
                   </div>
                   <h2 className="text-2xl font-bold text-gray-900">配置生成成功！</h2>
                   <p className="text-gray-600 mt-2 max-w-md">
                      已生成适用于?<strong>{template}</strong> 的配置文件，包含 <strong>{selectedProxiesList.length}</strong> 个节点和 <strong>{lanRules.length}</strong> 条分流规则。?                   </p>
                   <div className="flex gap-3 mt-6">
                      <button onClick={handleFinish} className="px-6 py-2.5 bg-gray-900 text-white rounded-lg font-medium hover:bg-black shadow-lg flex items-center gap-2">
                         <Save className="w-4 h-4"/> 保存到仪表盘
                      </button>
                      <button className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 shadow-sm flex items-center gap-2">
                         <DownloadCloud className="w-4 h-4"/> 下载配置文件
                      </button>
                   </div>
               </div>
               <div className="flex-1 bg-slate-900 p-6 overflow-hidden relative">
                   <div className="absolute top-4 right-4 text-xs font-mono text-slate-500">PREVIEW</div>
                   <pre className="text-xs font-mono text-blue-300 h-full overflow-auto custom-scrollbar whitespace-pre-wrap">
                      {generatedConfig}
                   </pre>
               </div>
            </div>
         )}

         {/* Footer Navigation */}
         <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-between items-center">
            {step > 1 ? (
               <button onClick={() => setStep(step - 1)} className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-100 transition-colors">上一步</button>
            ) : (
               <div className="text-xs text-gray-400">配置向导 v3.2 (Enterprise)</div>
            )}
            {step < 4 && (
               <button 
                 onClick={() => setStep(step + 1)} 
                 disabled={step === 1 && Object.keys(proxySelections).length === 0}
                 className={`px-8 py-2.5 text-white rounded-lg font-medium transition-colors flex items-center gap-2 ${step === 1 && Object.keys(proxySelections).length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200'}`}
               >
                 {step === 3 ? '立即生成' : '下一步'} <ArrowRight className="w-4 h-4" />
               </button>
            )}
         </div>
      </div>
    </div>
  );
};

const HomeView = () => {
  return (
    <div className="w-[calc(100%+2rem)] md:w-[calc(100%+4rem)] h-[calc(100vh-64px)] -m-4 md:-m-8 overflow-hidden bg-white">
      <iframe 
        src="http://128.121.4.99:8081/" 
        className="w-full h-full border-0"
        title="主页"
      />
    </div>
  );
};

const App = () => {
  const { t, i18n } = useTranslation();
  const { user, loading, isAuthenticated, logout } = useAuth();

  // 认证状态管理
  const [authView, setAuthView] = useState('login'); // 'login' or 'register'

  const sidebarMenu = useMemo(() => [
    { id: 'home', label: '主页', icon: Home },
    { id: 'dashboard', label: t('menu.dashboard'), icon: LayoutDashboard },
    { id: 'purchase', label: t('menu.purchase'), icon: ShoppingCart },
    { id: 'orders', label: t('menu.orders'), icon: List },
    { id: 'resources', label: t('menu.resources'), icon: Box },
    { id: 'router_config', label: t('menu.router_config'), icon: RouterIcon },
    { id: 'finance', label: t('menu.finance'), icon: CreditCard },
    { id: 'messages', label: t('menu.messages'), icon: Bell },
    { id: 'referrals', label: t('menu.referrals'), icon: Gift },
    { id: 'coupons', label: t('menu.coupons'), icon: Ticket },
    { id: 'support', label: t('menu.support'), icon: MessageSquare },
    { 
      id: 'settings', 
      label: t('menu.settings'), 
      icon: Settings,
      children: [
        { id: 'profile', label: t('menu.profile') },
        { id: 'address', label: t('menu.address') },
        { id: 'sub_account', label: t('menu.sub_account') },
        { id: 'payment', label: t('menu.payment') },
      ]
    },
  ], [t]);

  const [activeTab, setActiveTab] = useState('dashboard');
  const previousTabRef = useRef('dashboard');
  const [settingsType, setSettingsType] = useState('profile'); 
  const [purchaseType, setPurchaseType] = useState('buy_static_isp');

  // Track previous tab for back navigation
  const handleNavigate = (tab) => {
    previousTabRef.current = activeTab;
    setActiveTab(tab);
  };
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [wizardClient, setWizardClient] = useState(null);
  const [editingConfig, setEditingConfig] = useState(null);
  const [viewingConfigDetail, setViewingConfigDetail] = useState(null);
  const [supportDraft, setSupportDraft] = useState(null);
  const PURCHASE_GUIDE_HIDE_KEY = 'pm_purchaseGuideHidden';

  const [savedConfigs, setSavedConfigs] = useState([
    { 
      id: 1, 
      name: '工作室-路由V1', 
      client: 'mihomo', 
      nodeCount: 2, 
      updateTime: '2023-10-26 10:00', 
      status: 'Running', 
      devices: 2,
      // 预设一些已选节点
      proxySelections: {
        'p-us-1': ['SOCKS5', 'HTTP'],
        'p-jp-1': ['SOCKS5'],
      },
      networkConfig: {
        mixedPort: 7890,
        redirPort: 7892,
        uiPort: 9090,
        allowLan: true,
        bindAddress: '*',
        mode: 'rule'
      },
      lanRules: [
        { id: 1, name: '运营组 MacBook (01)', ip: '192.168.10.101', proxyId: 'p-us-1', protocol: 'SOCKS5' },
        { id: 2, name: '测试机 iPhone (Test)', ip: '192.168.10.55', proxyId: 'p-jp-1', protocol: 'SOCKS5' }
      ]
    }
  ]);
  const [isPurchaseGuideOpen, setIsPurchaseGuideOpen] = useState(false);
  const [isPurchaseGuideHidden, setIsPurchaseGuideHidden] = useState(() => {
    try {
      return localStorage.getItem(PURCHASE_GUIDE_HIDE_KEY) === '1';
    } catch (_) {
      return false;
    }
  });

  const setPurchaseGuideHidden = (hidden) => {
    setIsPurchaseGuideHidden(Boolean(hidden));
    try {
      if (hidden) localStorage.setItem(PURCHASE_GUIDE_HIDE_KEY, '1');
      else localStorage.removeItem(PURCHASE_GUIDE_HIDE_KEY);
    } catch (_) {
      // ignore
    }
  };

  // State for Export Modal
  const [isProxyExportModalOpen, setIsProxyExportModalOpen] = useState(false);
  const [exportProxies, setExportProxies] = useState([]);

  const [expandedMenus, setExpandedMenus] = useState(['purchase']);

  const toggleMenu = (menuId) => {
    setExpandedMenus(prev => 
      prev.includes(menuId) 
        ? prev.filter(id => id !== menuId)
        : [...prev, menuId]
    );
  };

  const handleSaveConfig = (newConfig) => {
     setSavedConfigs(prev => {
       const exists = prev.find(c => c.id === newConfig.id);
       if (exists) {
         return prev.map(c => c.id === newConfig.id ? newConfig : c);
       }
       return [newConfig, ...prev];
     });
     setEditingConfig(null);
     setActiveTab('dashboard');
  };

  const handleExportAll = async () => {
     try {
       // 并行获取所有订单的代理节点配置
       const promises = ORDERS_DATA.map(order => orderService.getProxyNodes(order.id));
       const results = await Promise.allSettled(promises);

       const allProxyNodes = [];

       results.forEach((result, index) => {
         const order = ORDERS_DATA[index];

         if (result.status === 'fulfilled' && result.value.success) {
           const proxyNodes = result.value.data?.proxy_nodes || [];
           allProxyNodes.push(...proxyNodes);
         } else {
           console.warn(`Failed to load proxy nodes for order ${order.id}`);
         }
       });

       if (allProxyNodes.length === 0) {
         alert('暂无可用的代理节点，请确认订单状态');
         return;
       }

       setExportProxies(allProxyNodes);
       setIsProxyExportModalOpen(true);
     } catch (error) {
       console.error('Error loading proxy nodes:', error);
       alert(`获取代理节点配置失败：${error.message || '网络错误'}，请稍后重试`);
     }
  };

  const handleExportOrder = async (order) => {
     try {
       // 调用 orderService 获取真实的代理节点配置
       const result = await orderService.getProxyNodes(order.id);

       if (result.success && result.data && result.data.proxy_nodes) {
         const proxyNodes = result.data.proxy_nodes;

         if (proxyNodes.length === 0) {
           // 没有可用代理节点
           alert('该订单暂无可用的代理节点，请确认订单状态');
           return;
         }

         // 使用后端返回的真实数据
         setExportProxies(proxyNodes);
         setIsProxyExportModalOpen(true);
       } else {
         // 后端返回失败
         const errorMsg = result.message || '获取代理节点失败';
         alert(`获取代理节点配置失败：${errorMsg}，请稍后重试`);
       }
     } catch (error) {
       console.error('Error loading proxy nodes:', error);
       alert(`获取代理节点配置失败：${error.message || '网络错误'}，请稍后重试`);
     }
  };

  const handleNavigateToSupport = (orderId = '') => {
    setSupportDraft({ orderId });
    setActiveTab('support');
    setSelectedOrder(null); // Close order details if open
  };

  const renderContent = () => {
    switch(activeTab) {
      case 'home': return <HomeView />;
      case 'dashboard': 
        return (
          <DashboardView 
            savedConfigs={savedConfigs} 
            onNavigate={setActiveTab} 
            onOpenWizard={(client) => { setWizardClient(client); setEditingConfig(null); setActiveTab('wizard'); }} 
            onOpenPurchaseGuide={() => setIsPurchaseGuideOpen(true)} 
            purchaseGuideHidden={isPurchaseGuideHidden}
            onRestorePurchaseGuide={() => setPurchaseGuideHidden(false)}
            onEditConfig={(config) => { setViewingConfigDetail(config); setActiveTab('config_detail'); }}
          />
        );
      case 'config_detail':
        return (
          <RouterConfigDetailView 
            config={viewingConfigDetail} 
            onBack={() => { setActiveTab('dashboard'); setViewingConfigDetail(null); }}
            onEditInWizard={(config) => { setEditingConfig(config); setActiveTab('wizard'); }}
            onDownload={(config) => alert(`正在下载 ${config.name}...`)}
            onUpdateConfig={(updated) => {
              setSavedConfigs(prev => prev.map(c => c.id === updated.id ? updated : c));
              setViewingConfigDetail(updated);
            }}
          />
        );
      case 'wizard': return <RouterWizardView targetClient={wizardClient} initialConfig={editingConfig} onBack={() => { setActiveTab(editingConfig ? 'config_detail' : 'dashboard'); setEditingConfig(null); }} onSaveConfig={handleSaveConfig} />;
      case 'purchase': return <PurchaseView productType={purchaseType} onOpenPurchaseGuide={() => setIsPurchaseGuideOpen(true)} onChangeType={setPurchaseType} />;
      case 'orders': 
          return selectedOrder 
            ? <OrderDetailView order={selectedOrder} onBack={() => setSelectedOrder(null)} onExportOrder={() => handleExportOrder(selectedOrder)} onNavigateToSupport={handleNavigateToSupport} /> 
            : <OrderListView onSelectOrder={order => setSelectedOrder(order)} onExportAll={handleExportAll} onNavigateToSupport={handleNavigateToSupport} />;
      case 'resources': return <IPResourceManager />;
      case 'router_config': 
        return (
          <RouterConfigView 
            savedConfigs={savedConfigs} 
            onBack={() => setActiveTab('dashboard')} 
            onDelete={(id) => {
              if (window.confirm('确定删除该配置？')) {
                setSavedConfigs(prev => prev.filter(c => c.id !== id));
              }
            }}
            onDownload={(config) => alert(`正在下载 ${config.name} (已适配 ${config.client})...`)}
            onEdit={(config) => { setViewingConfigDetail(config); setActiveTab('config_detail'); }}
          />
        );
      case 'finance': return <BillingCenter />;
      case 'messages': return <MessageCenter />;
      case 'referrals': return <ReferralView />;
      case 'coupons': return <CouponCenter />;
      case 'support': return <SupportView initialDraft={supportDraft} onClearDraft={() => setSupportDraft(null)} />;
      case 'settings': {
        const goBack = () => {
          const prev = previousTabRef.current;
          if (prev && prev !== 'settings') {
            setActiveTab(prev);
          } else {
            setActiveTab('dashboard');
          }
        };
        if (settingsType === 'profile') return <ProfileSettings onBack={goBack} />;
        if (settingsType === 'address') return <AddressManagement />;
        if (settingsType === 'payment') return <PaymentManagement />;
        return <div className="p-10 text-center text-gray-400">Settings Module: {settingsType} (Under Construction)</div>;
      }
      default: return <div className="p-10 text-center text-gray-400">模块开发中...</div>;
    }
  };

  const isDashboard = activeTab === 'dashboard';

  // 加载状态
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">加载中...</p>
        </div>
      </div>
    );
  }

  // 未登录状态
  if (!isAuthenticated()) {
    if (authView === 'login') {
      return <LoginPage onNavigateToRegister={() => setAuthView('register')} />;
    } else {
      return <RegisterPage onNavigateToLogin={() => setAuthView('login')} />;
    }
  }

  return (
    <div className={`min-h-screen flex font-sans transition-colors duration-300 ${isDashboard ? 'bg-slate-950 text-slate-200 selection:bg-cyan-500/30' : 'bg-slate-50 text-slate-800'}`}>
      <PurchaseGuideWizard 
        isOpen={isPurchaseGuideOpen} 
        onClose={() => setIsPurchaseGuideOpen(false)}
        isEntryHidden={isPurchaseGuideHidden}
        onSetEntryHidden={setPurchaseGuideHidden}
        onNavigateToProduct={(type) => {
          if (type) setPurchaseType(type);
          setActiveTab('purchase');
          setIsPurchaseGuideOpen(false);
        }}
      />
      <ProxyExportModal 
        isOpen={isProxyExportModalOpen} 
        onClose={() => setIsProxyExportModalOpen(false)} 
        selectedProxies={exportProxies} 
      />

      <aside className={`w-64 flex-col hidden md:flex sticky top-0 h-screen overflow-y-auto z-40 transition-all duration-300 ${isDashboard ? 'bg-slate-900/80 backdrop-blur-xl border-r border-slate-800' : 'bg-white border-r border-gray-200'}`}>
         <div className={`p-6 border-b shrink-0 ${isDashboard ? 'border-slate-800' : 'border-gray-100'}`}>
            <div className="flex items-center gap-2 group cursor-pointer">
               <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold shadow-lg transition-transform duration-300 group-hover:scale-110 ${isDashboard ? 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-cyan-500/20' : 'bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-blue-200'}`}>P</div>
               <span className={`font-bold text-lg tracking-tight transition-colors ${isDashboard ? 'text-white group-hover:text-cyan-400' : 'text-gray-900'}`}>ProxyManager</span>
            </div>
         </div>
         <div className="flex-1 p-4 space-y-1">
            {sidebarMenu.map(item => (
               !item.children ? (
                <button key={item.id} onClick={() => { setActiveTab(item.id); setSelectedOrder(null); setSupportDraft(null); }} 
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 
                    ${activeTab === item.id 
                      ? (isDashboard 
                          ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.2)]' 
                          : 'bg-[#1A73E8] text-white shadow-md shadow-blue-200')
                      : (isDashboard 
                          ? 'text-slate-400 hover:bg-white/5 hover:text-white hover:translate-x-1' 
                          : 'text-gray-600 hover:bg-gray-50')
                    }`}
                >
                    <item.icon className={`w-5 h-5 ${
                      activeTab === item.id 
                        ? (isDashboard ? 'text-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,0.8)]' : 'text-white')
                        : (isDashboard ? 'text-slate-500 group-hover:text-slate-300' : 'text-gray-400')
                    }`} />{item.label}
                </button>
               ) : (
                <div key={item.id}>
                    <button 
                        onClick={() => toggleMenu(item.id)}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors 
                          ${isDashboard ? 'hover:bg-white/5' : 'hover:bg-gray-50'} 
                          ${expandedMenus.includes(item.id) 
                            ? (isDashboard ? 'text-white' : 'text-gray-900') 
                            : (isDashboard ? 'text-slate-400' : 'text-gray-600')
                          }`}
                    >
                        <div className="flex items-center gap-3">
                            <item.icon className={`w-5 h-5 ${expandedMenus.includes(item.id) 
                              ? (isDashboard ? 'text-cyan-400' : 'text-[#1A73E8]') 
                              : (isDashboard ? 'text-slate-500' : 'text-gray-400')
                            }`} />
                            {item.label}
                        </div>
                        {expandedMenus.includes(item.id) 
                          ? <ChevronDown className={`w-4 h-4 ${isDashboard ? 'text-slate-500' : 'text-gray-400'}`}/> 
                          : <ChevronRight className={`w-4 h-4 ${isDashboard ? 'text-slate-500' : 'text-gray-400'}`}/>}
                    </button>
                    {expandedMenus.includes(item.id) && (
                        <div className={`ml-4 border-l-2 pl-2 space-y-1 mt-1 ${isDashboard ? 'border-slate-800' : 'border-gray-100'}`}>
                            {item.children.map(child => (
                                <button 
                                    key={child.id} 
                                    onClick={() => { 
                                        setActiveTab(item.id); 
                                        if (item.id === 'purchase') setPurchaseType(child.id);
                                        if (item.id === 'settings') setSettingsType(child.id);
                                    }} 
                                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                                        (activeTab === item.id && ((item.id === 'purchase' && purchaseType === child.id) || (item.id === 'settings' && settingsType === child.id)))
                                            ? (isDashboard 
                                                ? 'text-cyan-400 bg-cyan-500/10 border border-cyan-500/20' 
                                                : 'text-[#1A73E8] bg-blue-50 font-medium')
                                            : (isDashboard 
                                                ? 'text-slate-500 hover:text-slate-300 hover:bg-white/5' 
                                                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50')
                                    }`}
                                >
                                    <span>{child.label}</span>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
               )
            ))}
         </div>
         <div className={`p-4 border-t ${isDashboard ? 'border-slate-800' : 'border-gray-100'}`}>
            <div className={`rounded-xl p-4 flex items-center gap-3 relative overflow-hidden group transition-all duration-300 ${
              isDashboard 
                ? 'bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 shadow-lg' 
                : 'bg-gray-50 border border-transparent'
            }`}>
               {isDashboard && <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>}
               <div className={`w-10 h-10 rounded-full flex items-center justify-center border relative z-10 ${
                 isDashboard 
                   ? 'bg-slate-700 border-slate-600 text-slate-300' 
                   : 'bg-white border-gray-100 shadow-sm text-gray-600'
               }`}>
                  <User className="w-5 h-5" />
               </div>
               <div className="flex-1 min-w-0 relative z-10">
                  <div className={`text-sm font-bold truncate ${isDashboard ? 'text-white' : 'text-gray-900'}`}>Alex User</div>
                  <div className={`text-xs truncate ${isDashboard ? 'text-slate-500' : 'text-gray-500'}`}>Pro Plan</div>
               </div>
            </div>
         </div>
      </aside>
      <main className="flex-1 min-w-0 h-screen overflow-y-auto flex flex-col">
         <Header
            activeTab={activeTab}
            darkMode={isDashboard}
            onNavigate={handleNavigate}
            unreadCount={129} // Mock unread count
            user={user ? {
              name: user.nickname || user.name || 'User',
              email: user.email || 'user@example.com',
              balance: user.balance || 0,
              inviteCode: user.inviteCode || ''
            } : { name: 'User', email: 'user@example.com', balance: 0 }}
            onLogout={logout}
         />
         <div className="p-4 md:p-8 max-w-7xl mx-auto w-full flex-1">
            {renderContent()}
         </div>
      </main>
    </div>
  );
};

export default App;
