/**
 * Dashboard 加载器 - 开发环境
 * 用于 npm run dev 开发模式
 */

const DASHBOARD_ENTRY_URL = '/apps/dashboard/index.html';

export async function loadDashboardSPA() {
  console.log('[Dashboard Loader Dev] Loading dashboard as independent SPA...');

  try {
    // 隐藏主应用元素
    const rootEl = document.getElementById('root');
    const helpCenter = document.getElementById('help-center-page');
    const footer = document.querySelector('.quantum-footer');
    const pageOverlay = document.getElementById('page-transition-overlay');

    if (rootEl) rootEl.style.display = 'none';
    if (helpCenter) helpCenter.style.display = 'none';
    if (footer) footer.style.display = 'none';
    if (pageOverlay) pageOverlay.style.display = 'none';

    // 禁用 portal CSS
    const portalLinks = document.querySelectorAll('link[href*="/css/"], link[href="/tailwind.css"]');
    portalLinks.forEach(link => link.disabled = true);

    // 创建或获取容器
    let dashboardContainer = document.getElementById('dashboard-root');
    if (!dashboardContainer) {
      dashboardContainer = document.createElement('div');
      dashboardContainer.id = 'dashboard-root';
      dashboardContainer.style.cssText = 'width: 100%; height: 100vh; overflow: hidden;';
      document.body.appendChild(dashboardContainer);

      // 获取 HTML
      const response = await fetch(DASHBOARD_ENTRY_URL);
      if (!response.ok) throw new Error(`Failed to load dashboard: ${response.status}`);
      const html = await response.text();

      // 解析 HTML
      const headMatch = html.match(/<head>([\s\S]*?)<\/head>/i);
      const bodyMatch = html.match(/<body>([\s\S]*?)<\/body>/i);

      if (headMatch && bodyMatch) {
        const headContent = headMatch[1];
        const bodyContent = bodyMatch[1];

        // 加载 CSS
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = headContent;
        const links = tempDiv.querySelectorAll('link');

        for (const link of links) {
          const href = link.getAttribute('href');
          if (href && !document.querySelector(`link[href="${href}"]`)) {
            const newLink = link.cloneNode(true);
            document.head.appendChild(newLink);
            await new Promise(resolve => {
              if (newLink.complete) resolve();
              else {
                newLink.onload = resolve;
                newLink.onerror = resolve;
              }
            });
          }
        }

        // 设置容器内容
        dashboardContainer.innerHTML = bodyContent;

        // 开发模式：从 body 中加载脚本（Vite 将脚本放在 body 中）
        const bodyTempDiv = document.createElement('div');
        bodyTempDiv.innerHTML = bodyContent;
        const scripts = Array.from(bodyTempDiv.querySelectorAll('script[type="module"]'));

        console.log('[Dashboard Loader Dev] Found', scripts.length, 'scripts in body');

        for (const oldScript of scripts) {
          const src = oldScript.getAttribute('src');
          if (src) {
            console.log('[Dashboard Loader Dev] Loading:', src);
            const newScript = document.createElement('script');
            newScript.type = 'module';
            newScript.src = src; // 保留 Vite 时间戳参数

            // 复制所有属性
            oldScript.getAttributeNames().forEach(attr => {
              if (attr !== 'type' && attr !== 'src') {
                newScript.setAttribute(attr, oldScript.getAttribute(attr));
              }
            });

            await new Promise((resolve) => {
              newScript.onload = () => {
                console.log('[Dashboard Loader Dev] Loaded:', src);
                resolve();
              };
              newScript.onerror = () => resolve();
              document.head.appendChild(newScript);
            });
          }
        }
      }
    } else {
      dashboardContainer.style.display = 'block';
    }

    document.title = 'Dashboard - Quantum Proxy';
    if (window.location.pathname !== '/dashboard') {
      window.history.pushState({ dashboard: true }, '', '/dashboard');
    }

    console.log('[Dashboard Loader Dev] Dashboard loaded successfully');
    return true;

  } catch (error) {
    console.error('[Dashboard Loader Dev] Failed:', error);
    document.body.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: center; height: 100vh; font-family: system-ui;">
        <div style="text-align: center;">
          <h1>Dashboard 加载失败</h1>
          <p>${error.message}</p>
          <button onclick="window.location.href='/'" style="padding: 10px 20px;">返回首页</button>
        </div>
      </div>
    `;
    return false;
  }
}

export function unloadDashboardSPA() {
  const dashboardContainer = document.getElementById('dashboard-root');
  if (dashboardContainer) dashboardContainer.style.display = 'none';

  const rootEl = document.getElementById('root');
  if (rootEl) rootEl.style.display = 'block';

  const helpCenter = document.getElementById('help-center-page');
  if (helpCenter) helpCenter.style.display = 'block';

  const footer = document.querySelector('.quantum-footer');
  if (footer) footer.style.display = 'block';

  const pageOverlay = document.getElementById('page-transition-overlay');
  if (pageOverlay) pageOverlay.style.display = '';

  document.querySelectorAll('link[href*="/css/"], link[href="/tailwind.css"]').forEach(link => {
    link.disabled = false;
  });

  document.title = 'Quantum Proxy - 量子代理';
  console.log('[Dashboard Loader Dev] Dashboard unloaded');
}

export function shouldLoadDashboard() {
  const pathname = window.location.pathname;
  const hash = window.location.hash;
  return pathname === '/dashboard' || pathname === '/dashboard/' || hash === '#dashboard' || hash === '#dashboard/';
}
