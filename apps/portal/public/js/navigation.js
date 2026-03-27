(function() {
  'use strict';

  // ========== 注入"商务合作"导航项到所有 nav-menu ==========
  // 主页 header 由 Vite 打包的 React 组件渲染，nav-menu 中没有"商务合作"
  // 此函数在"文档"链接后面动态插入"商务合作"下拉容器
  function injectBusinessCoopNavItem() {
    var navMenus = document.querySelectorAll('.home-header .nav-menu');
    if (!navMenus || navMenus.length === 0) return;

    navMenus.forEach(function(navMenu) {
      // 跳过React渲染的主页header（检查是否在home-container内）
      if (navMenu.closest('.home-container')) return;

      // 如果该 nav-menu 已经有"商务合作"则跳过
      var existingText = navMenu.textContent || '';
      if (existingText.indexOf('商务合作') !== -1) return;

      // 找到"文档"链接（React 渲染的是 <a href="#docs">文档</a>）
      var docsLink = null;
      var links = navMenu.querySelectorAll('a');
      for (var i = 0; i < links.length; i++) {
        var txt = (links[i].textContent || '').trim();
        var href = links[i].getAttribute('href') || '';
        if (txt === '文档' || txt === 'Docs' || href.indexOf('docs') !== -1 || href.indexOf('api_docs') !== -1) {
          docsLink = links[i];
          break;
        }
      }

      if (!docsLink) return;

      // 创建"商务合作"下拉容器（与"产品""价格"结构一致）
      var dropdown = document.createElement('div');
      dropdown.className = 'dropdown';
      var a = document.createElement('a');
      a.href = '#';
      a.className = 'dropdown-link';
      a.onclick = function(e) { e.preventDefault(); };
      a.innerHTML = '商务合作 <span class="arrow"></span>';
      dropdown.appendChild(a);

      // 插入到"文档"链接之后
      // 如果"文档"链接的父节点也是 dropdown，则在其父元素后面插入
      var insertAfter = docsLink.parentNode.classList && docsLink.parentNode.classList.contains('dropdown')
        ? docsLink.parentNode
        : docsLink;
      insertAfter.parentNode.insertBefore(dropdown, insertAfter.nextSibling);
    });
  }

  function injectDropdowns() {
    // 找到所有导航栏（包括首页和帮助中心）
    var headerNavs = document.querySelectorAll('.home-header .nav-menu');
    if (!headerNavs || headerNavs.length === 0) return false;

    var injectedAny = false;

    headerNavs.forEach(function(headerNav) {
      // 跳过React渲染的主页header（检查是否在home-container内）
      if (headerNav.closest('.home-container')) return;
      var dropdowns = headerNav.querySelectorAll('.dropdown');
      
      // 遍历每个下拉框容器
      dropdowns.forEach(function(dropdown) {
        var text = (dropdown.textContent || '').trim();
        var link = dropdown.querySelector('a');
        var href = link ? (link.getAttribute('href') || '') : '';
        
        // 1. 处理“产品”下拉菜单
        // 增加 href 匹配，防止文本因编码问题匹配失败
        if (text.indexOf('产品') !== -1 || text.indexOf('Products') !== -1 || href.indexOf('products') !== -1) {
          if (!dropdown.querySelector('.products-dropdown-menu')) {
            var menu = document.createElement('div');
            menu.className = 'products-dropdown-menu';
            menu.innerHTML =
              '<a href="' + window.location.pathname + '?tab=static_isp">' +
                '<span class="menu-icon">🏠</span>' +
                '<span class="menu-text">' +
                  '<span class="menu-label">静态住宅ISP代理</span>' +
                  '<span class="menu-desc">高质量纯净住宅IP，稳定可靠</span>' +
                '</span>' +
              '</a>';
            dropdown.appendChild(menu);
            injectedAny = true;
          }
        }
        
        // 2. 处理"价格"下拉菜单
        else if (text.indexOf('价格') !== -1 || text.indexOf('Pricing') !== -1 || href.indexOf('price') !== -1) {
          if (!dropdown.querySelector('.products-dropdown-menu')) {
            var menu = document.createElement('div');
            menu.className = 'products-dropdown-menu';
            menu.innerHTML =
              '<a href="' + window.location.pathname + '?tab=purchase&product=buy_static_isp">' +
                '<span class="menu-icon" style="display:flex;align-items:center;justify-content:center;">' +
                  '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">' +
                    '<path d="M3 9.5L12 2.5L21 9.5V20.5C21 21.0523 20.5523 21.5 20 21.5H4C3.44772 21.5 3 21.0523 3 20.5V9.5Z" stroke="#4F8EFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>' +
                    '<path d="M9 21.5V12.5H15V21.5" stroke="#4F8EFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>' +
                    '<path d="M2 11.5L12 3.5L22 11.5" stroke="#4F8EFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>' +
                  '</svg>' +
                '</span>' +
                '<span class="menu-text">' +
                  '<span class="menu-label">静态住宅ISP代理</span>' +
                  '<span class="menu-desc">低至 <span style="color:#4F8EFF;font-weight:700;">$0.15</span> / IP / 天</span>' +
                '</span>' +
              '</a>';
            dropdown.appendChild(menu);
            injectedAny = true;
          }
        }

        // 3. 处理"商务合作"下拉菜单
        else if (text.indexOf('商务合作') !== -1 || text.indexOf('Partners') !== -1 || href.indexOf('partners') !== -1) {
          if (!dropdown.querySelector('.products-dropdown-menu')) {
            var menu = document.createElement('div');
            menu.className = 'products-dropdown-menu partners-dropdown-menu';
            menu.innerHTML =
              '<a href="' + window.location.pathname + '?tab=business_cooperation">' +
                '<span class="menu-icon" style="display:flex;align-items:center;justify-content:center;">' +
                  '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">' +
                    '<path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3" stroke="#4F8EFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>' +
                  '</svg>' +
                '</span>' +
                '<span class="menu-text">' +
                  '<span class="menu-label">企业服务</span>' +
                  '<span class="menu-desc">IP转售 · 专属折扣 · 技术支持</span>' +
                '</span>' +
              '</a>' +
              '<a href="' + window.location.pathname + '?tab=become_agent">' +
                '<span class="menu-icon" style="display:flex;align-items:center;justify-content:center;">' +
                  '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">' +
                    '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" stroke="#4F8EFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>' +
                    '<circle cx="9" cy="7" r="4" stroke="#4F8EFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>' +
                    '<path d="M19 8v6M22 11h-6" stroke="#4F8EFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>' +
                  '</svg>' +
                '</span>' +
                '<span class="menu-text">' +
                  '<span class="menu-label">成为代理</span>' +
                  '<span class="menu-desc">阶梯佣金 · 快速提现 · 专人辅导</span>' +
                '</span>' +
              '</a>';
            dropdown.appendChild(menu);
            injectedAny = true;
          }
        }
      });
    });

    return injectedAny;
  }

  // 1. 持续监听 DOM 变化（应对 React 路由切换或重渲染）
  var observer = new MutationObserver(function() {
    injectBusinessCoopNavItem();  // 先注入导航项容器
    injectDropdowns();            // 再注入下拉菜单内容
  });
  observer.observe(document.body, { childList: true, subtree: true });

  // 2. 定时检查兜底（防止 MutationObserver 漏掉）
  setInterval(function() {
    injectBusinessCoopNavItem();
    injectDropdowns();
  }, 500);

  // 3. 拦截特定链接跳转
  function updateLinks() {
    // 拦截“解决方案”
    var solutionsLinks = document.querySelectorAll('a[href="#solutions"]');
    solutionsLinks.forEach(function(link) {
      if (!link.dataset.solutionsUpdated) {
        link.onclick = function(e) {
          e.preventDefault();
          window.location.href = window.location.pathname + '?tab=solutions';
        };
        link.dataset.solutionsUpdated = 'true';
      }
    });

    // 拦截底部链接（公司简介、联系我们、加入我们）
    // 由于这些链接可能没有特定的 href 或 class，我们通过文本内容查找
    var allLinks = document.querySelectorAll('a');
    allLinks.forEach(function(link) {
      if (link.dataset.linkUpdated) return;

      var text = (link.textContent || '').trim();
      
      if (text === '公司简介' || text === 'Company Profile') {
        link.onclick = function(e) {
          e.preventDefault();
          window.location.href = window.location.pathname + '?tab=company';
        };
        link.dataset.linkUpdated = 'true';
      } else if (text === '联系我们' || text === 'Contact Us') {
        link.onclick = function(e) {
          e.preventDefault();
          window.location.href = window.location.pathname + '?tab=contact';
        };
        link.dataset.linkUpdated = 'true';
      } else if (text === '加入我们' || text === 'Join Us') {
        link.onclick = function(e) {
          e.preventDefault();
          window.location.href = window.location.pathname + '?tab=join';
        };
        link.dataset.linkUpdated = 'true';
      } else if (text === '隐私政策' || text === 'Privacy Policy') {
        link.onclick = function(e) {
          e.preventDefault();
          window.location.href = window.location.pathname + '?tab=privacy';
        };
        link.dataset.linkUpdated = 'true';
      } else if (text === '服务条款' || text === 'Terms of Service') {
        link.onclick = function(e) {
          e.preventDefault();
          window.location.href = window.location.pathname + '?tab=terms';
        };
        link.dataset.linkUpdated = 'true';
      } else if (text === '退款协议' || text === 'Refund Policy') {
        link.onclick = function(e) {
          e.preventDefault();
          window.location.href = window.location.pathname + '?tab=refund';
        };
        link.dataset.linkUpdated = 'true';
      } else if (text === '帮助中心' || text === 'Help Center') {
        link.onclick = function(e) {
          e.preventDefault();
          window.location.href = window.location.pathname + '?tab=help_center';
        };
        link.dataset.linkUpdated = 'true';
      } else if (text === 'API文档' || text === 'API Docs') {
        link.onclick = function(e) {
          e.preventDefault();
          window.location.href = window.location.pathname + '?tab=api_docs';
        };
        link.dataset.linkUpdated = 'true';
      } else if (text === '常见问题' || text === 'FAQ') {
        link.onclick = function(e) {
          e.preventDefault();
          window.location.href = window.location.pathname + '?tab=faq';
        };
        link.dataset.linkUpdated = 'true';
      } else if (text === 'AI数据挖掘' || text === 'AI Data Mining' || text === 'AI访问加速' || text === 'AI Access Boost') {
        link.onclick = function(e) {
          e.preventDefault();
          window.location.href = window.location.pathname + '?tab=ai_data_mining';
        };
        link.dataset.linkUpdated = 'true';
      } else if (text === '股票市场' || text === 'Stock Market') {
        link.onclick = function(e) {
          e.preventDefault();
          window.location.href = window.location.pathname + '?tab=stock_market';
        };
        link.dataset.linkUpdated = 'true';
      } else if (text === '智能爬虫' || text === 'Intelligent Crawler' || text.indexOf('智能爬虫') !== -1) {
        link.onclick = function(e) {
          e.preventDefault();
          window.location.href = window.location.pathname + '?tab=smart_crawler';
        };
        link.dataset.linkUpdated = 'true';
      } else if (text === '动态住宅代理' || text === 'Dynamic Residential Proxy') {
        link.onclick = function(e) {
          e.preventDefault();
          window.location.href = window.location.pathname + '?tab=dynamic_residential';
        };
        link.dataset.linkUpdated = 'true';
      } else if (text === '静态住宅代理' || text === 'Static Residential Proxy') {
        link.onclick = function(e) {
          e.preventDefault();
          window.location.href = window.location.pathname + '?tab=static_residential';
        };
        link.dataset.linkUpdated = 'true';
      } else if (text === '数据中心代理' || text === 'Data Center Proxy') {
        link.onclick = function(e) {
          e.preventDefault();
          window.location.href = window.location.pathname + '?tab=datacenter';
        };
        link.dataset.linkUpdated = 'true';
      } else if (text === '跨境电商' || text === 'Cross-border E-commerce') {
        link.onclick = function(e) {
          e.preventDefault();
          window.location.href = window.location.pathname + '?tab=cross_border_ecommerce';
        };
        link.dataset.linkUpdated = 'true';
      } else if (text === '企业服务' || text === 'Enterprise Service' || text === 'Business Cooperation') {
        link.onclick = function(e) {
          e.preventDefault();
          window.location.href = window.location.pathname + '?tab=business_cooperation';
        };
        link.dataset.linkUpdated = 'true';
      } else if (text === '成为代理' || text === 'Become Agent') {
        link.onclick = function(e) {
          e.preventDefault();
          window.location.href = window.location.pathname + '?tab=become_agent';
        };
        link.dataset.linkUpdated = 'true';
      }
    });
  }
  
  // 加入到监听循环中
  var linkObserver = new MutationObserver(function() {
    updateLinks();
  });
  linkObserver.observe(document.body, { childList: true, subtree: true });
  setInterval(updateLinks, 500);

  // ========== 手机端汉堡菜单 ==========
  var mobileMenuResponsiveInitDone = false;

  function cleanupStaticMobileMenu() {
    document.querySelectorAll('header.home-header').forEach(function(header) {
      if (header.closest('.home-container')) return;
      var btn = header.querySelector('.mobile-menu-btn');
      if (btn) btn.remove();
      delete header.dataset.mobileMenuInit;
    });

    document.querySelectorAll('body > .mobile-nav-overlay, body > .mobile-nav-drawer').forEach(function(el) {
      el.remove();
    });
  }

  function initMobileMenu() {
    if (window.innerWidth > 1024) {
      cleanupStaticMobileMenu();
      return;
    }

    // 优先选择可见的 header.home-header
    var headers = document.querySelectorAll('header.home-header');
    var header = null;
    for (var i = 0; i < headers.length; i++) {
      if (!headers[i].dataset.mobileMenuInit && headers[i].style.display !== 'none') {
        header = headers[i];
        break;
      }
    }
    // 如果没有找到未初始化的可见 header，回退到任何未初始化的 header
    if (!header) {
      for (var j = 0; j < headers.length; j++) {
        if (!headers[j].dataset.mobileMenuInit) {
          header = headers[j];
          break;
        }
      }
    }
    if (!header) return;

    // 跳过React渲染的主页header（检查是否在home-container内）
    if (header.closest('.home-container')) {
      header.dataset.mobileMenuInit = 'true'; // 标记为已处理，避免重复检查
      return;
    }

    header.dataset.mobileMenuInit = 'true';

    // 创建汉堡按钮
    var btn = document.createElement('button');
    btn.className = 'mobile-menu-btn';
    btn.setAttribute('aria-label', '菜单');
    btn.innerHTML = '<span></span><span></span><span></span>';
    // 将汉堡按钮插入到 header-content 最前面（logo 左侧）
    var headerContent = header.querySelector('.header-content');
    if (headerContent && headerContent.firstChild) {
      headerContent.insertBefore(btn, headerContent.firstChild);
    } else {
      header.insertBefore(btn, header.firstChild);
    }

    // 创建遮罩层
    var overlay = document.createElement('div');
    overlay.className = 'mobile-nav-overlay';
    document.body.appendChild(overlay);

    // 创建抽屉菜单
    var drawer = document.createElement('div');
    drawer.className = 'mobile-nav-drawer';

    // 构建与桌面版完全一致的菜单内容
    function buildDrawerContent() {
      var basePath = window.location.pathname;
      var drawerHTML = '';

      // ── 1. 产品（可展开子菜单） ──
      drawerHTML += '<div class="drawer-section">';
      drawerHTML += '<div class="drawer-section-header" data-section="products">';
      drawerHTML += '<span class="drawer-section-icon">📦</span>';
      drawerHTML += '<span class="drawer-section-text">产品</span>';
      drawerHTML += '<span class="drawer-section-arrow">›</span>';
      drawerHTML += '</div>';
      drawerHTML += '<div class="drawer-section-items" data-section-items="products">';
      drawerHTML += '<a href="' + basePath + '?tab=static_isp" class="drawer-sub-link">';
      drawerHTML += '<span class="drawer-sub-icon">🏠</span>';
      drawerHTML += '<span class="drawer-sub-text">';
      drawerHTML += '<span class="drawer-sub-label">静态住宅ISP代理</span>';
      drawerHTML += '<span class="drawer-sub-desc">高质量纯净住宅IP，稳定可靠</span>';
      drawerHTML += '</span>';
      drawerHTML += '</a>';
      drawerHTML += '</div>';
      drawerHTML += '</div>';

      // ── 2. 价格（可展开子菜单） ──
      drawerHTML += '<div class="drawer-section">';
      drawerHTML += '<div class="drawer-section-header" data-section="pricing">';
      drawerHTML += '<span class="drawer-section-icon">💰</span>';
      drawerHTML += '<span class="drawer-section-text">价格</span>';
      drawerHTML += '<span class="drawer-section-arrow">›</span>';
      drawerHTML += '</div>';
      drawerHTML += '<div class="drawer-section-items" data-section-items="pricing">';
      drawerHTML += '<a href="' + basePath + '?tab=purchase&product=buy_static_isp" class="drawer-sub-link">';
      drawerHTML += '<span class="drawer-sub-icon">🏠</span>';
      drawerHTML += '<span class="drawer-sub-text">';
      drawerHTML += '<span class="drawer-sub-label">静态住宅ISP代理</span>';
      drawerHTML += '<span class="drawer-sub-desc">低至 $0.15 / IP / 天</span>';
      drawerHTML += '</span>';
      drawerHTML += '</a>';
      drawerHTML += '</div>';
      drawerHTML += '</div>';

      drawerHTML += '<div class="drawer-divider"></div>';

      // ── 3. 解决方案 ──
      drawerHTML += '<a href="' + basePath + '?tab=solutions" class="drawer-link">';
      drawerHTML += '<span class="drawer-link-icon">💡</span>';
      drawerHTML += '<span>解决方案</span>';
      drawerHTML += '</a>';

      // ── 4. 帮助中心 ──
      drawerHTML += '<a href="' + basePath + '?tab=help_center" class="drawer-link">';
      drawerHTML += '<span class="drawer-link-icon">📚</span>';
      drawerHTML += '<span>帮助中心</span>';
      drawerHTML += '</a>';

      // ── 5. 文档 ──
      drawerHTML += '<a href="' + basePath + '?tab=api_docs" class="drawer-link">';
      drawerHTML += '<span class="drawer-link-icon">📄</span>';
      drawerHTML += '<span>文档</span>';
      drawerHTML += '</a>';

      // ── 6. 商务合作（可展开子菜单） ──
      drawerHTML += '<div class="drawer-section">';
      drawerHTML += '<div class="drawer-section-header" data-section="partners">';
      drawerHTML += '<span class="drawer-section-icon">🤝</span>';
      drawerHTML += '<span class="drawer-section-text">商务合作</span>';
      drawerHTML += '<span class="drawer-section-arrow">›</span>';
      drawerHTML += '</div>';
      drawerHTML += '<div class="drawer-section-items" data-section-items="partners">';
      drawerHTML += '<a href="' + basePath + '?tab=business_cooperation" class="drawer-sub-link">';
      drawerHTML += '<span class="drawer-sub-icon">';
      drawerHTML += '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4F8EFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3"/></svg>';
      drawerHTML += '</span>';
      drawerHTML += '<span class="drawer-sub-text">';
      drawerHTML += '<span class="drawer-sub-label">企业服务</span>';
      drawerHTML += '<span class="drawer-sub-desc">IP转售 · 专属折扣 · 技术支持</span>';
      drawerHTML += '</span>';
      drawerHTML += '</a>';
      drawerHTML += '<a href="' + basePath + '?tab=become_agent" class="drawer-sub-link">';
      drawerHTML += '<span class="drawer-sub-icon">';
      drawerHTML += '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4F8EFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M19 8v6M22 11h-6"/></svg>';
      drawerHTML += '</span>';
      drawerHTML += '<span class="drawer-sub-text">';
      drawerHTML += '<span class="drawer-sub-label">成为代理</span>';
      drawerHTML += '<span class="drawer-sub-desc">阶梯佣金 · 快速提现 · 专人辅导</span>';
      drawerHTML += '</span>';
      drawerHTML += '</a>';
      drawerHTML += '</div>';
      drawerHTML += '</div>';

      drawerHTML += '<div class="drawer-divider"></div>';

      // ── 6. 注册/登录按钮 ──
      drawerHTML += '<a href="/login#/login" class="drawer-login-btn">注册/登录</a>';

      return drawerHTML;
    }

    drawer.innerHTML = buildDrawerContent();
    document.body.appendChild(drawer);

    // 展开/折叠子菜单逻辑
    var sectionHeaders = drawer.querySelectorAll('.drawer-section-header');
    sectionHeaders.forEach(function(sHeader) {
      sHeader.addEventListener('click', function() {
        var sectionName = sHeader.getAttribute('data-section');
        var items = drawer.querySelector('[data-section-items="' + sectionName + '"]');
        if (!items) return;
        var isOpen = sHeader.classList.contains('open');
        // 先关闭所有其他展开的 section
        sectionHeaders.forEach(function(other) {
          other.classList.remove('open');
          var otherItems = drawer.querySelector('[data-section-items="' + other.getAttribute('data-section') + '"]');
          if (otherItems) otherItems.classList.remove('open');
        });
        // 切换当前 section
        if (!isOpen) {
          sHeader.classList.add('open');
          items.classList.add('open');
        }
      });
    });

    // 切换逻辑
    function toggleMenu() {
      var isOpen = btn.classList.contains('active');
      btn.classList.toggle('active');
      drawer.classList.toggle('open');
      overlay.classList.toggle('open');
      document.body.style.overflow = isOpen ? '' : 'hidden';
    }

    function closeMenu() {
      btn.classList.remove('active');
      drawer.classList.remove('open');
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    }

    btn.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', closeMenu);

    // 点击抽屉中的链接后关闭菜单（排除 section-header 内的元素）
    drawer.querySelectorAll('a').forEach(function(a) {
      a.addEventListener('click', function() {
        closeMenu();
        // 关闭所有展开的 section
        sectionHeaders.forEach(function(sh) {
          sh.classList.remove('open');
          var si = drawer.querySelector('[data-section-items="' + sh.getAttribute('data-section') + '"]');
          if (si) si.classList.remove('open');
        });
      });
    });

    // ESC 关闭
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') closeMenu();
    });
  }

  function initMobileMenuResponsiveWatcher() {
    if (mobileMenuResponsiveInitDone) return;
    mobileMenuResponsiveInitDone = true;

    var resizeTimer = null;
    window.addEventListener('resize', function() {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(function() {
        if (window.innerWidth > 1024) {
          cleanupStaticMobileMenu();
        } else {
          initMobileMenu();
        }
      }, 120);
    });
  }

  // ========== 帮助中心侧边栏手机端折叠 ==========
  function initHelpCenterSidebarToggle() {
    var sidebar = document.querySelector('.help-sidebar');
    if (!sidebar || sidebar.dataset.toggleInit) return;
    
    var mainContent = sidebar.parentElement;
    if (!mainContent) return;
    sidebar.dataset.toggleInit = 'true';

    // 创建切换按钮
    var toggleBtn = document.createElement('button');
    toggleBtn.className = 'hc-sidebar-toggle';
    toggleBtn.innerHTML = '<span class="toggle-icon">▼</span> 目录导航';
    mainContent.insertBefore(toggleBtn, sidebar);

    toggleBtn.addEventListener('click', function() {
      toggleBtn.classList.toggle('open');
      sidebar.classList.toggle('mobile-open');
    });

    // 点击目录项后自动收起（平板/手机端）
    // 排除含子菜单的章节项（点击展开子菜单时不应收起侧边栏）
    sidebar.addEventListener('click', function(e) {
      var chapterItem = e.target.closest('.toc-chapter-item');
      var subChapterItem = e.target.closest('.toc-sub-chapter-item');

      // 如果点击的是含子菜单的章节（has-sub），不收起侧边栏
      if (chapterItem && chapterItem.classList.contains('has-sub')) return;

      // 点击普通章节或子章节时，收起侧边栏
      if (chapterItem || subChapterItem) {
        if (window.innerWidth <= 1024) {
          setTimeout(function() {
            toggleBtn.classList.remove('open');
            sidebar.classList.remove('mobile-open');
          }, 200);
        }
      }
    });
  }

  // ========== 滚动监听：header 背景切换 ==========
  var headerScrollInitDone = false;
  function initHeaderScrollEffect() {
    if (headerScrollInitDone) return;
    // 确保 header 存在后再初始化
    var header = document.querySelector('header.home-header');
    if (!header) return;
    headerScrollInitDone = true;

    var scrolled = false;

    function onScroll() {
      // 每次都重新获取 header（应对 React 可能重建 DOM）
      var h = document.querySelector('header.home-header');
      if (!h) return;

      var threshold = window.innerHeight; // 一屏高度
      var shouldBeScrolled = window.scrollY >= threshold;

      if (shouldBeScrolled && !scrolled) {
        h.classList.add('header-scrolled');
        scrolled = true;
      } else if (!shouldBeScrolled && scrolled) {
        h.classList.remove('header-scrolled');
        scrolled = false;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    // 页面加载时也检查一次（用户可能刷新时已在页面中部）
    onScroll();
  }

  // 初始化
  function initMobileFeatures() {
    initMobileMenu();
    initMobileMenuResponsiveWatcher();
    initHelpCenterSidebarToggle();
    initHeaderScrollEffect();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileFeatures);
  } else {
    initMobileFeatures();
  }
  // 延迟再初始化一次（应对 React 动态渲染）
  setTimeout(initMobileFeatures, 1000);
  setTimeout(initMobileFeatures, 2500);

})();