import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// Debug: 确认 main.jsx 被加载
console.log('[Main] main.jsx loaded!');
console.log('[Main] Location:', window.location.pathname, window.location.search, window.location.hash);
console.log('[Main] Environment:', import.meta.env?.DEV ? 'Development' : 'Production');

import HomePage from './components/HomePage';
import StaticResidentialPurchase from './components/StaticResidentialPurchase';
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';

// 根据环境选择 dashboardLoader - 使用 Vite 的条件导入
let loadDashboardSPA;
if (import.meta.env?.DEV) {
  console.log('[Main] Importing dashboardLoader.dev.js for development');
  // 动态导入开发版本
  import('./utils/dashboardLoader.dev.js').then(module => {
    loadDashboardSPA = module.loadDashboardSPA;
    console.log('[Main] Development dashboard loader loaded');
  }).catch(err => {
    console.error('[Main] Failed to load dev dashboard loader:', err);
  });
} else {
  console.log('[Main] Importing dashboardLoader.js for production');
  import('./utils/dashboardLoader.js').then(module => {
    loadDashboardSPA = module.loadDashboardSPA;
    console.log('[Main] Production dashboard loader loaded');
  }).catch(err => {
    console.error('[Main] Failed to load prod dashboard loader:', err);
  });
}

import StaticISPPage from './components/StaticISPPage';
import SolutionsPage from './components/SolutionsPage';
import CompanyPage from './components/CompanyPage';
import ContactPage from './components/ContactPage';
import JoinPage from './components/JoinPage';
import PrivacyPage from './components/PrivacyPage';
import TermsPage from './components/TermsPage';
import RefundPage from './components/RefundPage';
// HelpCenterPage is rendered via the static HTML in index.html + helpCenter.js
import ApiDocsPage from './components/ApiDocsPage';
import FaqPage from './components/FaqPage';
import AiDataMiningPage from './components/AiDataMiningPage';
import StockMarketPage from './components/StockMarketPage';
import SmartCrawlerPage from './components/SmartCrawlerPage';
import DynamicResidentialPage from './components/DynamicResidentialPage';
import StaticResidentialPage from './components/StaticResidentialPage';
import DataCenterPage from './components/DataCenterPage';
import CrossBorderEcommercePage from './components/CrossBorderEcommercePage';
import BusinessCooperationPage from './components/BusinessCooperationPage';
import BecomeAgentPage from './components/BecomeAgentPage';

// ───── Helpers ─────
function hideMainApp() {
  // Hide React root
  const rootEl = document.getElementById('root');
  if (rootEl) rootEl.style.display = 'none';

  // Hide help center
  const helpCenter = document.getElementById('help-center-page');
  if (helpCenter) helpCenter.style.display = 'none';
}

function getMountPoint(id) {
  let el = document.getElementById(id);
  if (!el) {
    el = document.createElement('div');
    el.id = id;
    document.body.insertBefore(el, document.body.firstChild);
  }
  el.style.display = 'block';
  return el;
}

// ───── Route: / (Home Page) ─────
const pathname = window.location.pathname;
const params = new URLSearchParams(window.location.search);
const tab = params.get('tab');
const hash = window.location.hash;

console.log('[Main] Route check:', { pathname, tab, hash, isHome: !tab && !hash && pathname === '/' });

// 首页：使用 HomePage 组件渲染
if (!tab && !hash && pathname === '/') {
  console.log('[Main] === HOME PAGE ROUTE ===');

  // 确保帮助中心隐藏
  const helpCenter = document.getElementById('help-center-page');
  if (helpCenter) helpCenter.style.display = 'none';

  // 确保根元素可见
  const rootEl = document.getElementById('root');
  if (rootEl) {
    rootEl.style.display = 'block';
  }

  const root = ReactDOM.createRoot(document.getElementById('root'));
  console.log('[Main] Root created, rendering HomePage...');

  root.render(
    <React.StrictMode>
      <HomePage />
    </React.StrictMode>
  );
  console.log('[Main] HomePage rendered!');
}

// ───── Route: /register ─────
if (pathname === '/register') {
  hideMainApp();
  const mountEl = getMountPoint('register-root');
  const root = ReactDOM.createRoot(mountEl);
  root.render(
    <React.StrictMode>
      <RegisterPage />
    </React.StrictMode>
  );
}

// ───── Route: /login or /#login ─────
if (pathname === '/login' || hash === '#login' || hash === '#/login') {
  hideMainApp();
  const mountEl = getMountPoint('login-root');
  const root = ReactDOM.createRoot(mountEl);
  root.render(
    <React.StrictMode>
      <LoginPage />
    </React.StrictMode>
  );
}

// ───── Route: /dashboard ─────
// Dashboard 作为独立 SPA，使用动态 HTML 加载
if (pathname === '/dashboard') {
  console.log('[Main] === DASHBOARD ROUTE - Loading as independent SPA ===');
  if (loadDashboardSPA) {
    loadDashboardSPA();
  } else {
    console.warn('[Main] loadDashboardSPA not loaded yet, retrying...');
    // 如果函数还没加载，等待一下再试
    setTimeout(() => {
      if (loadDashboardSPA) {
        loadDashboardSPA();
      } else {
        console.error('[Main] Failed to load dashboard SPA');
      }
    }, 100);
  }
}

// ───── Route: Purchase pages (all product types) ─────
const region = params.get('region');

if (tab === 'purchase') {
  // For now, all purchase pages use the same component
  // In the future, you can add different components for different product types
  hideMainApp();
  const ispRoot = getMountPoint('isp-root');

  // Smooth entrance: start with entering state
  ispRoot.classList.add('entering');

  const root = ReactDOM.createRoot(ispRoot);
  root.render(
    <React.StrictMode>
      <StaticResidentialPurchase initialRegionId={region} />
    </React.StrictMode>
  );

  // Dismiss transition overlay and trigger entrance animation
  requestAnimationFrame(() => {
    const overlay = document.getElementById('page-transition-overlay');
    if (overlay) overlay.classList.remove('active');
    // Small delay so the entering class is rendered first, then trigger transition
    setTimeout(() => {
      ispRoot.classList.remove('entering');
      ispRoot.classList.add('entered');
    }, 50);
  });
} else if (tab === 'static_isp') {
  // ───── Route: Static ISP Page (Empty/Placeholder) ─────
  hideMainApp();
  const staticRoot = getMountPoint('static-isp-root');
  const root = ReactDOM.createRoot(staticRoot);
  root.render(
    <React.StrictMode>
      <StaticISPPage />
    </React.StrictMode>
  );
} else if (tab === 'solutions') {
  // ───── Route: Solutions Page (Empty/Placeholder) ─────
  hideMainApp();
  const solutionsRoot = getMountPoint('solutions-root');
  const root = ReactDOM.createRoot(solutionsRoot);
  root.render(
    <React.StrictMode>
      <SolutionsPage />
    </React.StrictMode>
  );
} else if (tab === 'company') {
  // ───── Route: Company Page (Empty/Placeholder) ─────
  hideMainApp();
  const companyRoot = getMountPoint('company-root');
  const root = ReactDOM.createRoot(companyRoot);
  root.render(
    <React.StrictMode>
      <CompanyPage />
    </React.StrictMode>
  );
} else if (tab === 'contact') {
  // ───── Route: Contact Page (Empty/Placeholder) ─────
  hideMainApp();
  const contactRoot = getMountPoint('contact-root');
  const root = ReactDOM.createRoot(contactRoot);
  root.render(
    <React.StrictMode>
      <ContactPage />
    </React.StrictMode>
  );
} else if (tab === 'join') {
  // ───── Route: Join Page (Empty/Placeholder) ─────
  hideMainApp();
  const joinRoot = getMountPoint('join-root');
  const root = ReactDOM.createRoot(joinRoot);
  root.render(
    <React.StrictMode>
      <JoinPage />
    </React.StrictMode>
  );
} else if (tab === 'privacy') {
  // ───── Route: Privacy Page (Empty/Placeholder) ─────
  hideMainApp();
  const privacyRoot = getMountPoint('privacy-root');
  const root = ReactDOM.createRoot(privacyRoot);
  root.render(
    <React.StrictMode>
      <PrivacyPage />
    </React.StrictMode>
  );
} else if (tab === 'terms') {
  // ───── Route: Terms Page (Empty/Placeholder) ─────
  hideMainApp();
  const termsRoot = getMountPoint('terms-root');
  const root = ReactDOM.createRoot(termsRoot);
  root.render(
    <React.StrictMode>
      <TermsPage />
    </React.StrictMode>
  );
} else if (tab === 'refund') {
  // ───── Route: Refund Page (Empty/Placeholder) ─────
  hideMainApp();
  const refundRoot = getMountPoint('refund-root');
  const root = ReactDOM.createRoot(refundRoot);
  root.render(
    <React.StrictMode>
      <RefundPage />
    </React.StrictMode>
  );
} else if (tab === 'help_center') {
  // 隐藏主应用，但不隐藏帮助中心页面
  const rootEl = document.getElementById('root');
  if (rootEl) rootEl.style.display = 'none';
  // 使用原始 HTML 帮助中心页面
  if (typeof window.openHelpCenter === 'function') {
    window.openHelpCenter();
  } else {
    // openHelpCenter 可能还没加载，等 DOM 就绪后再调用
    window.addEventListener('DOMContentLoaded', () => {
      if (typeof window.openHelpCenter === 'function') {
        window.openHelpCenter();
      }
    });
    // 也做一个 fallback 延迟调用
    setTimeout(() => {
      if (typeof window.openHelpCenter === 'function') {
        window.openHelpCenter();
      }
    }, 500);
  }
} else if (tab === 'api_docs') {
  hideMainApp();
  const apiRoot = getMountPoint('api-root');
  const root = ReactDOM.createRoot(apiRoot);
  root.render(<React.StrictMode><ApiDocsPage /></React.StrictMode>);
} else if (tab === 'faq') {
  hideMainApp();
  const faqRoot = getMountPoint('faq-root');
  const root = ReactDOM.createRoot(faqRoot);
  root.render(<React.StrictMode><FaqPage /></React.StrictMode>);
} else if (tab === 'ai_data_mining') {
  hideMainApp();
  const aiRoot = getMountPoint('ai-root');
  const root = ReactDOM.createRoot(aiRoot);
  root.render(<React.StrictMode><AiDataMiningPage /></React.StrictMode>);
} else if (tab === 'stock_market') {
  hideMainApp();
  const stockRoot = getMountPoint('stock-root');
  const root = ReactDOM.createRoot(stockRoot);
  root.render(<React.StrictMode><StockMarketPage /></React.StrictMode>);
} else if (tab === 'smart_crawler') {
  hideMainApp();
  const crawlerRoot = getMountPoint('crawler-root');
  const root = ReactDOM.createRoot(crawlerRoot);
  root.render(<React.StrictMode><SmartCrawlerPage /></React.StrictMode>);
} else if (tab === 'dynamic_residential') {
  hideMainApp();
  const dynamicRoot = getMountPoint('dynamic-root');
  const root = ReactDOM.createRoot(dynamicRoot);
  root.render(<React.StrictMode><DynamicResidentialPage /></React.StrictMode>);
} else if (tab === 'static_residential') {
  hideMainApp();
  const staticResRoot = getMountPoint('static-res-root');
  const root = ReactDOM.createRoot(staticResRoot);
  root.render(<React.StrictMode><StaticResidentialPage /></React.StrictMode>);
} else if (tab === 'datacenter') {
  hideMainApp();
  const datacenterRoot = getMountPoint('datacenter-root');
  const root = ReactDOM.createRoot(datacenterRoot);
  root.render(<React.StrictMode><DataCenterPage /></React.StrictMode>);
} else if (tab === 'cross_border_ecommerce') {
  hideMainApp();
  const ecommerceRoot = getMountPoint('ecommerce-root');
  const root = ReactDOM.createRoot(ecommerceRoot);
  root.render(<React.StrictMode><CrossBorderEcommercePage /></React.StrictMode>);
} else if (tab === 'business_cooperation') {
  // ───── Route: Business Cooperation (企业服务) ─────
  hideMainApp();
  const bizRoot = getMountPoint('biz-root');
  const root = ReactDOM.createRoot(bizRoot);
  root.render(<React.StrictMode><BusinessCooperationPage /></React.StrictMode>);
} else if (tab === 'become_agent') {
  // ───── Route: Become Agent ─────
  hideMainApp();
  const agentRoot = getMountPoint('agent-root');
  const root = ReactDOM.createRoot(agentRoot);
  root.render(<React.StrictMode><BecomeAgentPage /></React.StrictMode>);
}
