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
import StripePaymentSuccess from './components/StripePaymentSuccess';
import StripePaymentCancel from './components/StripePaymentCancel';

// 根据环境选择 dashboardLoader - 使用 Vite 的条件导入
let loadDashboardSPA;
let dashboardLoaderReady = false;

// 创建一个 Promise 来等待 loader 加载完成
const dashboardLoaderPromise = (async () => {
  try {
    if (import.meta.env?.DEV) {
      console.log('[Main] Importing dashboardLoader.dev.js for development');
      const module = await import('./utils/dashboardLoader.dev.js');
      loadDashboardSPA = module.loadDashboardSPA;
      console.log('[Main] Development dashboard loader loaded');
    } else {
      console.log('[Main] Importing dashboardLoader.js for production');
      const module = await import('./utils/dashboardLoader.js');
      loadDashboardSPA = module.loadDashboardSPA;
      console.log('[Main] Production dashboard loader loaded');
    }
    dashboardLoaderReady = true;
  } catch (err) {
    console.error('[Main] Failed to load dashboard loader:', err);
    dashboardLoaderReady = true; // 标记为已尝试加载
  }
})();

// 辅助函数：等待 dashboard loader 准备就绪
async function waitForDashboardLoader() {
  await dashboardLoaderPromise;
  return loadDashboardSPA;
}

// 恢复 Portal 状态（用于从 Dashboard 返回其他页面）
function restorePortalState() {
  console.log('[Main] Restoring Portal state...');

  // 隐藏 dashboard
  const dashboardRoot = document.getElementById('dashboard-root');
  if (dashboardRoot) {
    dashboardRoot.style.display = 'none';
    console.log('[Main] Hidden dashboard-root');
  }

  // 显示主应用根元素
  const rootEl = document.getElementById('root');
  if (rootEl) {
    rootEl.style.display = 'block';
  }

  // 显示帮助中心
  const helpCenter = document.getElementById('help-center-page');
  if (helpCenter) {
    helpCenter.style.display = 'block';
  }

  // 显示 Footer
  const footer = document.querySelector('.quantum-footer');
  if (footer) {
    footer.style.display = 'block';
  }

  // 恢复页面过渡叠加层
  const pageOverlay = document.getElementById('page-transition-overlay');
  if (pageOverlay) {
    pageOverlay.style.display = '';
  }

  // 恢复 Portal 导航元素
  const homeHeader = document.querySelector('.home-header');
  if (homeHeader) {
    homeHeader.style.display = '';
  }

  // 恢复移动端导航抽屉
  const mobileNavDrawer = document.querySelector('.mobile-nav-drawer');
  if (mobileNavDrawer) {
    mobileNavDrawer.style.display = '';
  }

  // 重新启用 Portal 的 CSS
  const portalLinks = document.querySelectorAll('link[href*="/css/"], link[href="/tailwind.css"]');
  portalLinks.forEach(link => {
    link.disabled = false;
    console.log('[Main] Re-enabled portal CSS:', link.href);
  });

  console.log('[Main] Portal state restored');
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

console.log('[Main] Route check:', { pathname, tab, hash });

// 对于所有非 Dashboard 路由，恢复 Portal 状态
// 这确保从 Dashboard 导航到其他页面时，Portal 的 CSS 和元素正确恢复
if (pathname !== '/dashboard') {
  restorePortalState();
}

// ───── Route: /payment/success ─────
if (pathname === '/payment/success') {
  console.log('[Main] === PAYMENT SUCCESS ROUTE ===');
  hideMainApp();
  const mountEl = getMountPoint('payment-success-root');
  const root = ReactDOM.createRoot(mountEl);
  root.render(
    <React.StrictMode>
      <StripePaymentSuccess />
    </React.StrictMode>
  );
}

// ───── Route: /payment/cancel ─────
else if (pathname === '/payment/cancel') {
  console.log('[Main] === PAYMENT CANCEL ROUTE ===');
  hideMainApp();
  const mountEl = getMountPoint('payment-cancel-root');
  const root = ReactDOM.createRoot(mountEl);
  root.render(
    <React.StrictMode>
      <StripePaymentCancel />
    </React.StrictMode>
  );
}

// 首页：使用 HomePage 组件渲染
else if (!tab && !hash && pathname === '/') {
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
  // 等待 dashboard loader 加载完成
  waitForDashboardLoader().then(loader => {
    if (loader) {
      console.log('[Main] Dashboard loader ready, loading dashboard...');
      loader();
    } else {
      console.error('[Main] Dashboard loader failed to load');
    }
  }).catch(err => {
    console.error('[Main] Error waiting for dashboard loader:', err);
  });
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
