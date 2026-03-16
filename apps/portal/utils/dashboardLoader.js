/**
 * Dashboard 独立 SPA 加载器 - 生产环境
 * 用于构建后的生产环境，脚本在 <head> 中
 */

const DASHBOARD_ENTRY_URL = '/apps/dashboard/index.html';

export async function loadDashboardSPA() {
  console.log('[Dashboard Loader] Loading dashboard as independent SPA...');

  try {
    // 隐藏主应用
    const rootEl = document.getElementById('root');
    const helpCenter = document.getElementById('help-center-page');

    if (rootEl) rootEl.style.display = 'none';
    if (helpCenter) helpCenter.style.display = 'none';

    // 隐藏 portal 特有的元素
    const footer = document.querySelector('.quantum-footer');
    if (footer) footer.style.display = 'none';

    // 隐藏页面过渡叠加层（"正在加载..."白条）
    const pageOverlay = document.getElementById('page-transition-overlay');
    if (pageOverlay) pageOverlay.style.display = 'none';

    // 隐藏 Portal 导航元素
    const homeHeader = document.querySelector('.home-header');
    if (homeHeader) homeHeader.style.display = 'none';

    // 隐藏移动端导航抽屉（如果存在）
    const mobileNavDrawer = document.querySelector('.mobile-nav-drawer');
    if (mobileNavDrawer) {
      mobileNavDrawer.style.display = 'none';
      console.log('[Dashboard Loader] Hidden mobile nav drawer');
    }

    // 禁用 portal 的 CSS（避免影响 dashboard）
    const portalLinks = document.querySelectorAll('link[href*="/css/"], link[href="/tailwind.css"]');
    portalLinks.forEach(link => {
      link.disabled = true;
      console.log('[Dashboard Loader] Disabled portal CSS:', link.href);
    });

    // 检查是否已经加载过 dashboard
    let dashboardContainer = document.getElementById('dashboard-root');

    if (!dashboardContainer) {
      // 创建 dashboard 容器
      dashboardContainer = document.createElement('div');
      dashboardContainer.id = 'dashboard-root';
      dashboardContainer.style.cssText = 'width: 100%; height: 100vh; overflow: hidden;';
      document.body.appendChild(dashboardContainer);

      // 获取 dashboard HTML 内容
      const response = await fetch(DASHBOARD_ENTRY_URL);
      if (!response.ok) {
        throw new Error(`Failed to load dashboard: ${response.status}`);
      }
      let html = await response.text();

      // 提取 head 中的样式和脚本
      const headMatch = html.match(/<head>([\s\S]*?)<\/head>/i);
      const bodyMatch = html.match(/<body>([\s\S]*?)<\/body>/i);

      if (headMatch && bodyMatch) {
        const headContent = headMatch[1];
        const bodyContent = bodyMatch[1];

        // 添加 head 中的样式到当前页面
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = headContent;

        // 提取并添加 link 标签
        const links = tempDiv.querySelectorAll('link');
        const cssPromises = [];
        links.forEach(link => {
          // 检查是否已经存在
          const href = link.getAttribute('href');
          console.log('[Dashboard Loader] Processing link:', href);

          if (href && !document.querySelector(`link[href="${href}"]`)) {
            const newLink = link.cloneNode(true);
            console.log('[Dashboard Loader] Adding new CSS link:', href);

            // 等待 CSS 加载完成
            const loadPromise = new Promise((resolve) => {
              newLink.onload = () => {
                console.log('[Dashboard Loader] CSS loaded:', href);
                resolve();
              };
              newLink.onerror = () => {
                console.error('[Dashboard Loader] CSS failed to load:', href);
                resolve(); // 即使失败也继续
              };
              // 如果已经缓存，立即resolve
              if (newLink.complete || newLink.readyState === 'complete') {
                console.log('[Dashboard Loader] CSS already cached:', href);
                resolve();
              }
            });
            cssPromises.push(loadPromise);
            document.head.appendChild(newLink);
          } else {
            console.log('[Dashboard Loader] CSS already exists or no href:', href);
          }
        });

        console.log('[Dashboard Loader] Waiting for', cssPromises.length, 'CSS files to load...');

        // 等待所有 CSS 加载完成
        await Promise.all(cssPromises);

        console.log('[Dashboard Loader] All CSS loaded, proceeding with scripts...');

        // 8. 设置 body 内容
        dashboardContainer.innerHTML = bodyContent;

        // 9. 从 head 中提取并执行 script 标签
        const scriptTempDiv = document.createElement('div');
        scriptTempDiv.innerHTML = headContent;
        const headScripts = scriptTempDiv.querySelectorAll('script[type="module"]');
        console.log('[Dashboard Loader] Found', headScripts.length, 'module scripts in head');

        headScripts.forEach((oldScript, index) => {
          const src = oldScript.getAttribute('src');
          if (src) {
            console.log('[Dashboard Loader] Loading script:', src, `(${index + 1}/${headScripts.length})`);
            const newScript = document.createElement('script');
            newScript.type = 'module';
            newScript.src = src;
            newScript.crossorigin = oldScript.getAttribute('crossorigin') || 'anonymous';
            newScript.onload = () => {
              console.log('[Dashboard Loader] Script loaded:', src);
            };
            newScript.onerror = (error) => {
              console.error('[Dashboard Loader] Script failed to load:', src, error);
            };
            document.head.appendChild(newScript);
          }
        });

        console.log('[Dashboard Loader] Dashboard loaded successfully');
      } else {
        throw new Error('Invalid dashboard HTML format');
      }
    } else {
      // Dashboard 容器已存在，只需显示
      dashboardContainer.style.display = 'block';
    }

    // 设置页面标题
    document.title = 'Dashboard - Quantum Proxy';

    // 更新 URL（不刷新页面）
    if (window.location.pathname !== '/dashboard') {
      window.history.pushState({ dashboard: true }, '', '/dashboard');
    }

    console.log('[Dashboard Loader] Dashboard SPA ready');
    return true;

  } catch (error) {
    console.error('[Dashboard Loader] Failed to load dashboard:', error);

    // 显示错误信息
    document.body.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: center; height: 100vh; font-family: system-ui;">
        <div style="text-align: center;">
          <h1>Dashboard 加载失败</h1>
          <p>错误: ${error.message}</p>
          <button onclick="window.location.href='/'" style="padding: 10px 20px; margin-top: 20px; cursor: pointer;">
            返回首页
          </button>
        </div>
      </div>
    `;
    return false;
  }
}

/**
 * 退出 dashboard，返回主应用
 */
export function unloadDashboardSPA() {
  console.log('[Dashboard Loader] Unloading dashboard...');

  // 隐藏 dashboard
  const dashboardContainer = document.getElementById('dashboard-root');
  if (dashboardContainer) {
    dashboardContainer.style.display = 'none';
  }

  // 显示主应用
  const rootEl = document.getElementById('root');
  if (rootEl) rootEl.style.display = 'block';

  // 显示 help center
  const helpCenter = document.getElementById('help-center-page');
  if (helpCenter) helpCenter.style.display = 'block';

  // 显示 footer
  const footer = document.querySelector('.quantum-footer');
  if (footer) footer.style.display = 'block';

  // 恢复页面过渡叠加层
  const pageOverlay = document.getElementById('page-transition-overlay');
  if (pageOverlay) pageOverlay.style.display = '';

  // 恢复 Portal 导航元素
  const homeHeader = document.querySelector('.home-header');
  if (homeHeader) homeHeader.style.display = '';

  // 恢复移动端导航抽屉
  const mobileNavDrawer = document.querySelector('.mobile-nav-drawer');
  if (mobileNavDrawer) {
    mobileNavDrawer.style.display = '';
    console.log('[Dashboard Loader] Restored mobile nav drawer');
  }

  // 重新启用 portal 的 CSS
  const portalLinks = document.querySelectorAll('link[href*="/css/"], link[href="/tailwind.css"]');
  portalLinks.forEach(link => {
    link.disabled = false;
    console.log('[Dashboard Loader] Re-enabled portal CSS:', link.href);
  });

  // 恢复页面标题
  document.title = 'Quantum Proxy - 量子代理';

  console.log('[Dashboard Loader] Dashboard unloaded');
}

/**
 * 检查是否需要加载 dashboard
 */
export function shouldLoadDashboard() {
  const pathname = window.location.pathname;
  const hash = window.location.hash;

  // 检查路径
  if (pathname === '/dashboard' || pathname === '/dashboard/') {
    return true;
  }

  // 检查 hash
  if (hash === '#dashboard' || hash === '#dashboard/') {
    return true;
  }

  return false;
}
