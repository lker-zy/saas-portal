// ========== 帮助中心逻辑 ==========
(function() {
  // 帮助中心目录数据
  const helpCenterData = [
    {
      id: 'getting-started',
      title: '快速入门',
      icon: '🚀',
      chapters: [
        { id: 'intro', title: '产品介绍' },
        { id: 'register', title: '注册与登录' },
        { id: 'first-proxy', title: '创建第一个代理' },
        { id: 'dashboard', title: '控制台概览' }
      ]
    },
    {
      id: 'proxy-types',
      title: '代理类型',
      icon: '🌐',
      chapters: [
        { id: 'static-residential', title: '静态住宅代理' },
        { id: 'dynamic-residential', title: '动态住宅代理' },
        { id: 'datacenter', title: '数据中心代理' },
        { id: 'comparison', title: '代理类型对比' }
      ]
    },
    {
      id: 'usage-guide',
      title: '使用指南',
      icon: '📖',
      chapters: [
        { id: 'api-integration', title: 'API 接入指南' },
        { id: 'browser-config', title: '浏览器配置', subChapters: [
          { id: 'browser-adspower', title: 'AdsPower 配置教程' },
          { id: 'browser-bitbrowser', title: '比特浏览器配置教程' },
          { id: 'browser-houniao', title: '候鸟浏览器配置教程' },
          { id: 'browser-vmlogin', title: 'VMLogin 配置教程' },
          { id: 'browser-hubstudio', title: 'HubStudio 配置教程' },
          { id: 'browser-mulogin', title: 'MuLogin 配置教程' },
          { id: 'browser-ziniao', title: '紫鸟浏览器配置教程' },
          { id: 'browser-morelogin', title: 'MoreLogin 配置教程' },
          { id: 'browser-nstbrowser', title: 'Nstbrowser 配置教程' },
          { id: 'browser-mostlogin', title: 'MostLogin 配置教程' }
        ]},
        { id: 'cloud-phone', title: '云手机', subChapters: [
          { id: 'cloud-phone-overview', title: '云手机使用概览' },
          { id: 'cloud-phone-proxy', title: '云手机代理配置' },
          { id: 'cloud-phone-multi', title: '多开与批量管理' },
          { id: 'cloud-phone-faq', title: '云手机常见问题' }
        ]},
        { id: 'software-config', title: '软件配置' },
        { id: 'ip-rotation', title: 'IP 轮换设置' },
        { id: 'geo-targeting', title: '地理位置定向' }
      ]
    },
    {
      id: 'faq',
      title: '常见问题',
      icon: '❓',
      chapters: [
        { id: 'connection-issues', title: '连接问题' },
        { id: 'speed-issues', title: '速度优化' },
        { id: 'ip-blocked', title: 'IP 被封解决方案' },
        { id: 'account-issues', title: '账户相关问题' }
      ]
    },
    {
      id: 'security',
      title: '安全与合规',
      icon: '🔒',
      chapters: [
        { id: 'data-security', title: '数据安全' },
        { id: 'privacy-policy', title: '隐私政策' },
        { id: 'terms-of-service', title: '服务条款' },
        { id: 'compliance', title: '合规使用指南' }
      ]
    },
    {
      id: 'contact',
      title: '联系我们',
      icon: '📞',
      chapters: [
        { id: 'support', title: '技术支持' },
        { id: 'feedback', title: '意见反馈' },
        { id: 'business', title: '商务合作' }
      ]
    }
  ];

  let currentCategory = null;
  let currentChapter = null;

  // 初始化帮助中心
  function initHelpCenter() {
    renderTOC();
    bindSearchEvents();
    bindHelpCenterLink();
  }

  // 渲染目录
  function renderTOC() {
    const container = document.getElementById('toc-container');
    if (!container) return;

    let html = '';
    helpCenterData.forEach((category, catIndex) => {
      html += `
        <div class="toc-category" data-category="${category.id}">
          <div class="toc-category-header" onclick="toggleCategory('${category.id}')">
            <div class="toc-category-title">
              <div class="toc-category-icon">${category.icon}</div>
              <span>${category.title}</span>
            </div>
            <svg class="toc-category-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </div>
          <div class="toc-chapters" id="chapters-${category.id}">
            ${category.chapters.map((chapter, chIndex) => {
              const hasSub = chapter.subChapters && chapter.subChapters.length > 0;
              let chapterHtml = `
              <div class="toc-chapter-item${hasSub ? ' has-sub' : ''}" 
                   data-category="${category.id}" 
                   data-chapter="${chapter.id}"
                   onclick="${hasSub ? `toggleSubChapters('${category.id}', '${chapter.id}')` : `selectChapter('${category.id}', '${chapter.id}')`}">
                <span style="display:flex;align-items:center;gap:6px;">
                  <span class="toc-chapter-number">${catIndex + 1}.${chIndex + 1}</span>
                  <span>${chapter.title}</span>
                </span>
                ${hasSub ? '<svg class="toc-sub-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>' : ''}
              </div>`;
              if (hasSub) {
                chapterHtml += `<div class="toc-sub-chapters" id="sub-${category.id}-${chapter.id}">
                  ${chapter.subChapters.map(sub => `
                    <div class="toc-sub-chapter-item"
                         data-category="${category.id}"
                         data-chapter="${chapter.id}"
                         data-sub="${sub.id}"
                         onclick="selectSubChapter('${category.id}', '${chapter.id}', '${sub.id}')">
                      <span class="sub-dot"></span>
                      <span>${sub.title}</span>
                    </div>
                  `).join('')}
                </div>`;
              }
              return chapterHtml;
            }).join('')}
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  }

  // 切换分类展开/收起
  window.toggleCategory = function(categoryId) {
    const header = document.querySelector(`[data-category="${categoryId}"] .toc-category-header`);
    const chapters = document.getElementById(`chapters-${categoryId}`);
    
    if (!header || !chapters) return;

    const isExpanded = chapters.classList.contains('expanded');

    // 收起所有其他分类
    document.querySelectorAll('.toc-chapters').forEach(el => {
      el.classList.remove('expanded');
    });
    document.querySelectorAll('.toc-category-header').forEach(el => {
      el.classList.remove('active');
    });

    // 切换当前分类
    if (!isExpanded) {
      chapters.classList.add('expanded');
      header.classList.add('active');
    }
  };

  // 切换子菜单展开/收起
  window.toggleSubChapters = function(categoryId, chapterId) {
    const parentItem = document.querySelector(`.toc-chapter-item[data-category="${categoryId}"][data-chapter="${chapterId}"]`);
    const subContainer = document.getElementById(`sub-${categoryId}-${chapterId}`);
    if (!parentItem || !subContainer) return;
    const isExpanded = subContainer.classList.contains('expanded');
    // 收起所有其他子菜单
    document.querySelectorAll('.toc-sub-chapters').forEach(el => el.classList.remove('expanded'));
    document.querySelectorAll('.toc-chapter-item.has-sub').forEach(el => el.classList.remove('sub-expanded'));
    if (!isExpanded) {
      subContainer.classList.add('expanded');
      parentItem.classList.add('sub-expanded');
    }
  };

  // 选择子章节
  window.selectSubChapter = function(categoryId, chapterId, subId) {
    currentCategory = categoryId;
    currentChapter = subId;

    // 清除所有选中
    document.querySelectorAll('.toc-chapter-item').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.toc-sub-chapter-item').forEach(el => el.classList.remove('active'));
    const selectedItem = document.querySelector(`.toc-sub-chapter-item[data-sub="${subId}"]`);
    if (selectedItem) selectedItem.classList.add('active');

    const category = helpCenterData.find(c => c.id === categoryId);
    const chapter = category?.chapters.find(ch => ch.id === chapterId);
    const sub = chapter?.subChapters?.find(s => s.id === subId);
    if (!category || !chapter || !sub) return;

    // 更新面包屑
    const breadcrumb = document.getElementById('content-breadcrumb');
    if (breadcrumb) {
      breadcrumb.innerHTML = `
        <span>帮助中心</span><span class="separator">›</span>
        <span>${category.title}</span><span class="separator">›</span>
        <span>${chapter.title}</span><span class="separator">›</span>
        <span class="current">${sub.title}</span>
      `;
    }

    // 根据章节类型路由到不同的内容生成函数
    if (chapterId === 'browser-config') {
      showContent(sub.title, getBrowserTutorialContent(subId));
    } else if (chapterId === 'cloud-phone') {
      showContent(sub.title, getCloudPhoneTutorialContent(subId));
    } else {
      showContent(sub.title, null);
    }
  };

  // 显示内容的通用函数
  function showContent(title, htmlContent) {
    const placeholder = document.getElementById('content-placeholder');
    const contentDisplay = document.getElementById('content-display');
    const contentTitle = document.getElementById('content-title');
    const contentText = document.getElementById('content-text');

    if (placeholder) placeholder.style.display = 'none';
    if (contentDisplay) contentDisplay.classList.add('active');
    if (contentTitle) contentTitle.textContent = title;
    if (contentText) {
      if (htmlContent) {
        contentText.innerHTML = htmlContent;
        contentText.classList.add('has-content');
      } else {
        contentText.textContent = '内容区域（暂留为空白）';
        contentText.classList.remove('has-content');
      }
    }
    const contentBody = document.getElementById('content-body');
    if (contentBody) contentBody.scrollTop = 0;

    // 手机/平板端：选择主题后自动滚动到内容区域
    if (window.innerWidth <= 1024) {
      setTimeout(function() {
        var contentArea = document.querySelector('.help-content-area');
        if (contentArea) {
          contentArea.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300); // 等待侧边栏收起动画完成
    }
  }

  // 选择章节
  window.selectChapter = function(categoryId, chapterId) {
    currentCategory = categoryId;
    currentChapter = chapterId;

    // 更新选中状态
    document.querySelectorAll('.toc-chapter-item').forEach(el => {
      el.classList.remove('active');
    });
    document.querySelectorAll('.toc-sub-chapter-item').forEach(el => {
      el.classList.remove('active');
    });
    const selectedItem = document.querySelector(`.toc-chapter-item[data-category="${categoryId}"][data-chapter="${chapterId}"]`);
    if (selectedItem) {
      selectedItem.classList.add('active');
    }

    // 获取分类和章节信息
    const category = helpCenterData.find(c => c.id === categoryId);
    const chapter = category?.chapters.find(ch => ch.id === chapterId);

    if (!category || !chapter) return;

    // 更新面包屑
    const breadcrumb = document.getElementById('content-breadcrumb');
    if (breadcrumb) {
      breadcrumb.innerHTML = `
        <span>帮助中心</span>
        <span class="separator">›</span>
        <span>${category.title}</span>
        <span class="separator">›</span>
        <span class="current">${chapter.title}</span>
      `;
    }

    // 根据章节 ID 加载自定义内容
    let contentHtml = null;
    showContent(chapter.title, contentHtml);
  };

  // ── 生成真实截图展示框 ──
  function realScreenshot(imgSrc, caption, stepLabel) {
    return `<div class="tutorial-screenshot">
      <div class="screenshot-title">
        ${stepLabel ? `<span class="step-badge">${stepLabel}</span>` : ''}
        <span>📷 操作截图</span>
      </div>
      <img src="${imgSrc}" alt="${caption || '操作截图'}" loading="lazy" />
      ${caption ? `<div class="screenshot-caption">${caption}</div>` : ''}
    </div>`;
  }

  // ── 生成截图模拟框 ──
  function mockScreenshot(titleText, rows) {
    return `<div class="screenshot-mock">
      <div class="mock-titlebar">
        <div class="mock-dot red"></div><div class="mock-dot yellow"></div><div class="mock-dot green"></div>
        <span style="margin-left:8px;font-size:11px;color:#5f6368;">${titleText}</span>
      </div>
      <div class="mock-body">${rows}</div>
    </div>`;
  }

  // ── 通用代理配置截图 ──
  function proxyFormMock(browserName, opts) {
    const proto = opts?.proto || 'HTTP';
    return mockScreenshot(browserName + ' — 代理设置', `
      <div class="mock-row">
        <span class="mock-label">代理类型</span>
        <div class="mock-select">${proto} ▾</div>
      </div>
      <div class="mock-row">
        <span class="mock-label">代理主机</span>
        <div class="mock-input">192.168.1.1</div>
      </div>
      <div class="mock-row">
        <span class="mock-label">代理端口</span>
        <div class="mock-input">8080</div>
      </div>
      <div class="mock-row">
        <span class="mock-label">代理账号</span>
        <div class="mock-input">user_abc123</div>
      </div>
      <div class="mock-row">
        <span class="mock-label">代理密码</span>
        <div class="mock-input">••••••••</div>
      </div>
      <div class="mock-row" style="justify-content:flex-end;gap:8px;margin-top:12px;">
        <div class="mock-btn green">检测代理</div>
        <div class="mock-btn">确认保存</div>
      </div>
    `);
  }

  // ── 批量提取代理截图 ──
  function extractProxyMock(proto) {
    const rawEx = proto === 'SOCKS5'
      ? '192.168.1.1:1080:user_abc:pass_xyz\n10.0.0.2:1080:user_def:pass_uvw'
      : '192.168.1.1:8080:user_abc:pass_xyz\n10.0.0.2:8080:user_def:pass_uvw';
    const stdEx = proto === 'SOCKS5'
      ? 'socks5://user_abc:pass_xyz@192.168.1.1:1080\nsocks5://user_def:pass_uvw@10.0.0.2:1080'
      : 'http://user_abc:pass_xyz@192.168.1.1:8080\nhttp://user_def:pass_uvw@10.0.0.2:8080';
    return mockScreenshot('客户端 — 批量提取代理 — ' + proto, `
      <div style="display:flex;gap:12px;margin-bottom:10px;">
        <div class="mock-tag">${proto}</div>
        <div class="mock-tag">密码模式</div>
      </div>
      <div style="margin-bottom:8px;">
        <div style="font-size:11px;color:#5f6368;margin-bottom:4px;">● 纯文本格式 <span style="color:#1a73e8;font-weight:600;">IP:Port:User:Pass</span></div>
        <div style="background:#1e1e1e;color:#d4d4d4;padding:10px;border-radius:6px;font-family:monospace;font-size:11px;line-height:1.6;white-space:pre;">${rawEx}</div>
      </div>
      <div>
        <div style="font-size:11px;color:#5f6368;margin-bottom:4px;">● 标准 URL <span style="color:#1a73e8;font-weight:600;">protocol://user:pass@ip:port</span></div>
        <div style="background:#1e1e1e;color:#d4d4d4;padding:10px;border-radius:6px;font-family:monospace;font-size:11px;line-height:1.6;white-space:pre;">${stdEx}</div>
      </div>
    `);
  }

  // ── 验证结果截图 ──
  function verifyMock() {
    return mockScreenshot('whoer.net — IP 验证结果', `
      <div class="mock-row"><span class="mock-label">您的 IP</span><div class="mock-input" style="color:#34a853;font-weight:600;">192.168.1.1</div></div>
      <div class="mock-row"><span class="mock-label">国家</span><div class="mock-input">🇺🇸 美国</div></div>
      <div class="mock-row"><span class="mock-label">ISP</span><div class="mock-input">Residential ISP</div></div>
      <div class="mock-row"><span class="mock-label">匿名性</span><div class="mock-input" style="color:#34a853;font-weight:600;">✓ 高匿名</div></div>
    `);
  }

  // ── 浏览器教程内容生成器 ──
  function getBrowserTutorialContent(subId) {
    // 浏览器配置信息映射
    const browserMap = {
      'browser-adspower': {
        name: 'AdsPower',
        fullName: 'AdsPower 指纹浏览器',
        desc: 'AdsPower 是一款专业的反检测浏览器，广泛用于多账号管理、电商运营、社交媒体营销等场景。支持 HTTP、SOCKS5 等多种代理协议，可批量导入代理配置。',
        website: 'https://www.adspower.com',
        hasCustomContent: 'adspower',
        steps: {
          create: '打开 AdsPower 客户端，点击左上角 <strong>"新建浏览器"</strong> 按钮',
          proxySection: '在新建浏览器配置页面中，找到 <strong>"代理设置"</strong> 区域，代理方式选择 <strong>"自定义"</strong>',
          proxyType: '在代理类型下拉菜单中选择 <strong>"HTTP"</strong> 或 <strong>"SOCKS5"</strong>',
          fillInfo: '依次填入代理信息：<strong>代理主机</strong>（IP地址）、<strong>代理端口</strong>（端口号）、<strong>代理账号</strong>（用户名）、<strong>代理密码</strong>（密码）',
          check: '点击 <strong>"检查代理"</strong> 按钮验证代理连通性，显示绿色 ✓ 表示连接成功',
          save: '点击 <strong>"确定"</strong> 保存配置，然后在浏览器列表中点击 <strong>"打开"</strong> 启动浏览器'
        }
      },
      'browser-bitbrowser': {
        name: '比特浏览器',
        fullName: '比特浏览器 (BitBrowser)',
        desc: '比特浏览器是一款国产反指纹浏览器，支持多开浏览器窗口，每个窗口拥有独立的浏览器指纹和代理IP。广泛应用于跨境电商、社交媒体营销、广告投放等多账号管理场景。',
        website: 'https://www.bitbrowser.cn',
        hasCustomContent: 'bitbrowser',
        steps: {
          create: '打开比特浏览器，点击 <strong>"创建窗口"</strong> 或 <strong>"新建浏览器"</strong>',
          proxySection: '在配置页面中找到 <strong>"代理设置"</strong> 模块',
          proxyType: '代理类型选择 <strong>"HTTP"</strong> 或 <strong>"SOCKS5"</strong>',
          fillInfo: '填入 <strong>主机IP</strong>、<strong>端口</strong>、<strong>账号</strong>、<strong>密码</strong>',
          check: '点击 <strong>"检测代理"</strong> 按钮，确认代理可用',
          save: '点击 <strong>"保存"</strong>，然后 <strong>"打开"</strong> 浏览器窗口'
        }
      },
      'browser-houniao': {
        name: '候鸟浏览器',
        fullName: '候鸟浏览器 (HouNiao Browser)',
        desc: '候鸟浏览器是一款专为跨境电商设计的反指纹浏览器，支持团队协作和批量管理。每个会话环境拥有独立的浏览器指纹和代理IP，支持 SOCKS5、HTTP 等多种代理协议。',
        website: 'https://www.houniao.com',
        hasCustomContent: 'houniao',
        steps: {
          create: '打开候鸟浏览器，点击 <strong>"新建环境配置"</strong>',
          proxySection: '在环境配置中找到 <strong>"代理Proxy"</strong> 区域',
          proxyType: '代理类型选择 <strong>"SOCKS5"</strong> 或 <strong>"HTTP"</strong>',
          fillInfo: '输入 <strong>代理IP</strong>、<strong>端口</strong>、<strong>Account</strong>、<strong>Password</strong>',
          check: '点击 <strong>"检查代理"</strong> 按钮验证连通性',
          save: '点击 <strong>"创建环境"</strong> 保存配置，然后点击 <strong>"运行"</strong> 启动浏览器'
        }
      },
      'browser-vmlogin': {
        name: 'VMLogin',
        fullName: 'VMLogin 指纹浏览器',
        desc: 'VMLogin 是一款专业的虚拟多登防关联浏览器，每个浏览器配置文件拥有独立的浏览器指纹和代理IP，支持 HTTP、HTTPS、SOCKS5 等多种代理协议，适合大规模多账号管理。',
        website: 'https://www.vmlogin.cc',
        hasCustomContent: 'vmlogin',
        steps: {
          create: '打开 VMLogin，点击 <strong>"新建浏览器配置文件"</strong>',
          proxySection: '在配置页面中切换到 <strong>"代理服务器"</strong> 选项卡',
          proxyType: '代理类型选择 <strong>"HTTP"</strong> 或 <strong>"SOCKS5"</strong>',
          fillInfo: '填入 <strong>IP地址</strong>、<strong>端口</strong>、<strong>用户名</strong>、<strong>密码</strong>。也支持批量导入格式：<code>协议:IP:端口:用户名:密码</code>',
          check: '点击 <strong>"测试代理"</strong> 验证连接',
          save: '点击 <strong>"保存"</strong>，然后 <strong>"启动"</strong> 浏览器'
        },
        extra: `<div class="info-box">
          <strong>💡 批量导入提示：</strong>VMLogin 支持通过 TXT 文件批量导入代理，格式为：<br>
          <code>HTTP:IP:端口:用户名:密码</code> 或 <code>SOCKS5:IP:端口:用户名:密码</code><br>
          无账密时使用：<code>SOCKS5:IP:端口::</code>（冒号占位）
        </div>`
      },
      'browser-hubstudio': {
        name: 'HubStudio',
        fullName: 'HubStudio 指纹浏览器',
        desc: 'HubStudio 是一款免费的多账号安全管理系统（防关联指纹浏览器），支持 HTTP、SOCKS5 等多种代理协议，可灵活配置环境参数，适合跨境电商、社交媒体等多账号管理场景。',
        website: 'https://www.hubstudio.cn',
        hasCustomContent: 'hubstudio',
        steps: {
          create: '打开 HubStudio，点击 <strong>"新建环境"</strong> 或 <strong>"创建配置"</strong>',
          proxySection: '在环境设置中找到 <strong>"代理配置"</strong> 区域',
          proxyType: '选择代理协议：<strong>"HTTP"</strong> 或 <strong>"SOCKS5"</strong>',
          fillInfo: '输入 <strong>代理地址</strong>、<strong>端口号</strong>、<strong>账号</strong>、<strong>密码</strong>',
          check: '点击 <strong>"检测代理"</strong> 确认连接正常',
          save: '保存设置后 <strong>"启动"</strong> 浏览器环境'
        }
      },
      'browser-mulogin': {
        name: 'MuLogin',
        fullName: 'MuLogin 指纹浏览器',
        desc: 'MuLogin 是一款多账号防关联浏览器，提供独立的浏览器指纹环境，支持 HTTP、SOCKS5 等多种代理协议，可按格式粘入代理信息，适合跨境电商和社媒运营多账号管理。',
        website: 'https://www.mulogin.com',
        hasCustomContent: 'mulogin',
        steps: {
          create: '打开 MuLogin，点击 <strong>"添加浏览器"</strong>',
          proxySection: '在浏览器配置中找到 <strong>"代理设置"</strong>',
          proxyType: '代理类型选择 <strong>"HTTP"</strong> 或 <strong>"SOCKS5"</strong>',
          fillInfo: '填入 <strong>IP</strong>、<strong>端口</strong>、<strong>用户名</strong>、<strong>密码</strong>',
          check: '点击 <strong>"检测"</strong> 按钮测试代理',
          save: '点击 <strong>"确定"</strong> 保存，然后 <strong>"启动"</strong> 浏览器'
        }
      },
      'browser-ziniao': {
        name: '紫鸟浏览器',
        fullName: '紫鸟浏览器 (ZiNiao Browser)',
        desc: '紫鸟浏览器是一款面向跨境电商的安全浏览器，提供独立的浏览器环境和IP隔离功能，支持设备管理与账号管理分离，可为每个店铺账号绑定独立的代理设备。',
        website: 'https://www.ziniao.com',
        hasCustomContent: true,
        steps: {
          create: '打开紫鸟浏览器，在左侧导航栏点击 <strong>"管理"</strong> 进入管理系统',
          proxySection: '在设备管理页面，点击 <strong>"添加自有设备"</strong> → <strong>"单个添加"</strong>',
          proxyType: '在添加设备弹窗中，勾选 <strong>"支持代理"</strong>，代理类型选择 <strong>"HTTP"</strong> 或 <strong>"sock5"</strong>',
          fillInfo: '输入 <strong>设备地址或域名</strong>（IP地址）、<strong>端口</strong>，选择 <strong>"已设置"</strong> 账密后填入 <strong>登录账号</strong>（用户名）和 <strong>登录密码</strong>（密码）',
          check: '点击 <strong>"检测"</strong> 按钮验证代理连通性，系统会进行自有设备风险检测',
          save: '确认添加设备后，进入 <strong>"账号管理"</strong> → <strong>"添加账号"</strong>，绑定设备后点击 <strong>"启动"</strong> 打开浏览器'
        }
      },
      'browser-morelogin': {
        name: 'MoreLogin',
        fullName: 'MoreLogin 指纹浏览器',
        desc: 'MoreLogin 是一款新一代反检测浏览器，支持高级创建（Advanced create）模式和详细的代理配置选项，提供 Chrome 和 Firefox 双内核选择，适合跨境电商和社媒运营多账号管理。',
        website: 'https://www.morelogin.com',
        hasCustomContent: 'morelogin',
        steps: {
          create: '打开 MoreLogin，点击 <strong>"New profile"</strong> → 选择 <strong>"Advanced create"</strong>（高级创建）',
          proxySection: '在配置页面中找到 <strong>"Proxy settings"</strong>（代理设置）区域',
          proxyType: '选择代理协议：<strong>"HTTP"</strong> 或 <strong>"SOCKS5"</strong>',
          fillInfo: '填入 <strong>Host</strong>（主机IP）、<strong>Port</strong>（端口）、<strong>Username</strong>（用户名）、<strong>Password</strong>（密码）',
          check: '点击 <strong>"Proxy detection"</strong>（代理检测）验证连接',
          save: '点击 <strong>"OK"</strong> 保存，然后 <strong>"Start"</strong> 启动浏览器'
        }
      },
      'browser-nstbrowser': {
        name: 'Nstbrowser',
        fullName: 'Nstbrowser 指纹浏览器',
        desc: 'Nstbrowser 是一款现代化的反检测浏览器，内置 Agent 连接功能，提供直观的 Profile 管理和代理配置界面，支持 Custom 自定义代理、Saved Proxies 和 Proxy Group 等多种代理管理方式，适合跨境电商和社媒运营多账号管理。',
        website: 'https://www.nstbrowser.io',
        hasCustomContent: 'nstbrowser',
        steps: {
          create: '打开 Nstbrowser，点击 <strong>"Create Profile"</strong>，在 Overview 中设置基本信息',
          proxySection: '切换到 <strong>"Proxy"</strong> 选项卡，类型选择 <strong>"Custom"</strong>（自定义）',
          proxyType: '在协议下拉菜单中选择 <strong>"HTTP"</strong> 或 <strong>"SOCKS5"</strong>',
          fillInfo: '填入 <strong>Host</strong>、<strong>Port</strong>、<strong>Username</strong>、<strong>Password</strong>，或直接粘贴标准格式',
          check: '点击 <strong>"Check Proxy"</strong> 检测代理连通性，显示 IP 和地理位置信息',
          save: '点击 <strong>"Create Profile"</strong> 保存配置'
        }
      },
      'browser-mostlogin': {
        name: 'MostLogin',
        fullName: 'MostLogin 指纹浏览器',
        desc: 'MostLogin 是一款高效的反指纹浏览器，支持多种代理协议和团队协作功能，提供简洁的 Profile 管理和代理配置界面。',
        website: 'https://www.mostlogin.com',
        hasCustomContent: 'mostlogin',
        steps: {
          create: '打开 MostLogin，点击 <strong>"新建浏览器"</strong> 或 <strong>"Create Browser"</strong>',
          proxySection: '在配置页面中找到 <strong>"代理设置"</strong> / <strong>"Proxy Settings"</strong>',
          proxyType: '代理类型选择 <strong>"HTTP"</strong> 或 <strong>"SOCKS5"</strong>',
          fillInfo: '填入 <strong>IP</strong>、<strong>端口</strong>、<strong>用户名</strong>、<strong>密码</strong>',
          check: '点击 <strong>"检测代理"</strong> / <strong>"Check"</strong> 验证连接',
          save: '保存配置后 <strong>"启动"</strong> 浏览器'
        }
      }
    };

    const browser = browserMap[subId];
    if (!browser) return null;

    // ── 使用真实截图的详细教程 ──
    if (browser.hasCustomContent === 'adspower') {
      return getAdsPowerCustomContent(browser);
    }
    if (browser.hasCustomContent === 'bitbrowser') {
      return getBitBrowserCustomContent(browser);
    }
    if (browser.hasCustomContent === 'houniao') {
      return getHouNiaoCustomContent(browser);
    }
    if (browser.hasCustomContent === 'vmlogin') {
      return getVMLoginCustomContent(browser);
    }
    if (browser.hasCustomContent === 'hubstudio') {
      return getHubStudioCustomContent(browser);
    }
    if (browser.hasCustomContent === 'mulogin') {
      return getMuLoginCustomContent(browser);
    }
    if (browser.hasCustomContent === 'morelogin') {
      return getMoreLoginCustomContent(browser);
    }
    if (browser.hasCustomContent === 'nstbrowser') {
      return getNstbrowserCustomContent(browser);
    }
    if (browser.hasCustomContent === 'mostlogin') {
      return getMostLoginCustomContent(browser);
    }
    if (browser.hasCustomContent) {
      return getZiNiaoCustomContent(browser);
    }

    return getDefaultBrowserContent(browser);
  }

  // ── 比特浏览器专属详细教程（含真实截图） ──
  function getBitBrowserCustomContent(browser) {
    const imgBase = 'assets/help-screenshots/bitbrowser';
    const clientImgBase = 'assets/help-screenshots/client';
    return `<div class="tutorial-content">
      <!-- 浏览器简介 -->
      <div class="info-box">
        <strong>📌 ${browser.fullName}</strong><br>
        ${browser.desc}<br>
        <strong>官网：</strong><a href="${browser.website}" target="_blank" style="color:#1a73e8;">${browser.website}</a>
      </div>

      <!-- ═══════ 前置准备：从量子代理客户端获取代理信息 ═══════ -->
      <h3>📋 前置准备：从量子代理客户端获取代理信息</h3>
      <p>在配置比特浏览器之前，您需要先从 <strong>量子代理（ProxyManager）</strong> 客户端批量提取代理信息。以下是详细步骤：</p>

      <!-- 准备步骤1：进入我的订单 -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">1</div>
          <div class="step-title">进入"我的订单"页面</div>
        </div>
        <div class="step-body">
          <p>登录 <strong>量子代理客户端</strong>，在左侧导航栏点击 <strong>"我的订单"</strong>，进入订单列表页面。页面会显示您所有已购买的代理订单。</p>
          ${realScreenshot(clientImgBase + '/order-list.png', '在量子代理客户端左侧导航栏点击 <strong>"我的订单"</strong>，进入订单列表页面', '步骤1')}
        </div>
      </div>

      <!-- 准备步骤2：点击对应订单进入详情 -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">2</div>
          <div class="step-title">点击对应订单，进入订单详情页面</div>
        </div>
        <div class="step-body">
          <p>在订单列表中，找到您需要提取代理的订单（如图红框所示），<strong>鼠标点击该订单</strong> 即可进入订单详情页面。在订单详情页右上方，点击蓝色的 <strong>⚡ 批量提取代理</strong> 按钮。</p>
          ${realScreenshot(clientImgBase + '/order-detail.png', '点击对应订单进入详情页面后，点击右上角 <strong>⚡ 批量提取代理</strong> 按钮', '步骤2')}
        </div>
      </div>

      <!-- 准备步骤3：选择协议和格式 -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">3</div>
          <div class="step-title">选择协议、授权方式和复制格式</div>
        </div>
        <div class="step-body">
          <p>在弹出的 <strong>"批量查看 / 导出"</strong> 窗口中，按以下步骤操作：</p>
          <ol>
            <li><strong>选择协议</strong>：顶部选择 <strong>HTTP</strong> 或 <strong>SOCKS5</strong>（根据比特浏览器中要配置的代理类型选择）</li>
            <li><strong>查看模式</strong>：左侧选择 <strong>"列表文本"</strong></li>
            <li><strong>授权方式</strong>：选择 <strong>"密码模式"</strong>（推荐，比特浏览器支持账密认证）</li>
            <li><strong>复制格式</strong>：选择 <strong>"纯文本格式"</strong>（格式为 <code>IP:Port:User:Pass</code>）</li>
            <li>点击底部 <strong>"📋 一键复制"</strong> 按钮，将代理列表复制到剪贴板</li>
          </ol>
          ${realScreenshot(clientImgBase + '/export-modal-listtext.png', '在批量导出窗口中：选择 <strong>HTTP</strong> 协议 → <strong>列表文本</strong> → <strong>密码模式</strong> → <strong>纯文本格式</strong>，右侧显示代理列表', '步骤2')}

          <div class="info-box warning">
            <strong>⚠️ 重要提示：</strong><br>
            • 比特浏览器中的 <strong>"socks5"</strong> 对应量子代理中的 <strong>SOCKS5</strong> 协议<br>
            • 如果选择 <strong>HTTP</strong> 协议，则在比特浏览器中代理类型选择 <strong>"http"</strong><br>
            • 请确保两端协议一致，否则代理将无法连接
          </div>
        </div>
      </div>

      <!-- 准备步骤4：理解代理格式 -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">4</div>
          <div class="step-title">理解提取的代理格式</div>
        </div>
        <div class="step-body">
          <p>复制后的代理信息格式如下，每行一条代理：</p>

          <table class="format-table">
            <thead>
              <tr>
                <th>格式类型</th>
                <th>HTTP 示例</th>
                <th>SOCKS5 示例</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>纯文本（密码模式）</strong><br><span style="color:#1a73e8;font-size:11px;">推荐 ✓</span></td>
                <td><code>192.168.1.101:10000:user_123:pass_xyz</code></td>
                <td><code>192.168.1.101:10000:user_123:pass_xyz</code></td>
              </tr>
              <tr>
                <td><strong>纯文本（白名单模式）</strong></td>
                <td><code>192.168.1.101:10000</code></td>
                <td><code>192.168.1.101:10000</code></td>
              </tr>
              <tr>
                <td><strong>标准URL（密码模式）</strong></td>
                <td><code>http://user_123:pass_xyz@192.168.1.101:10000</code></td>
                <td><code>socks5://user_123:pass_xyz@192.168.1.101:10000</code></td>
              </tr>
              <tr>
                <td><strong>标准URL（白名单模式）</strong></td>
                <td><code>http://192.168.1.101:10000</code></td>
                <td><code>socks5://192.168.1.101:10000</code></td>
              </tr>
            </tbody>
          </table>

          <div class="info-box">
            <strong>📝 字段说明（纯文本格式 <code>IP:Port:User:Pass</code>）：</strong><br>
            <table class="format-table" style="margin-top:8px;">
              <thead>
                <tr><th>字段</th><th>含义</th><th>比特浏览器对应项</th><th>示例值</th></tr>
              </thead>
              <tbody>
                <tr><td><strong>IP</strong></td><td>代理服务器地址</td><td>代理主机</td><td><code>192.168.1.101</code></td></tr>
                <tr><td><strong>Port</strong></td><td>代理端口号</td><td>代理端口</td><td><code>10000</code></td></tr>
                <tr><td><strong>User</strong></td><td>认证用户名</td><td>代理账号</td><td><code>user_123</code></td></tr>
                <tr><td><strong>Pass</strong></td><td>认证密码</td><td>代理密码</td><td><code>pass_xyz</code></td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- ═══════ 第一部分：比特浏览器配置步骤 ═══════ -->
      <h3>🔧 第一部分：比特浏览器代理配置步骤</h3>

      <!-- 步骤1：打开比特浏览器，点击创建窗口 -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">1</div>
          <div class="step-title">打开比特浏览器，点击"创建窗口"</div>
        </div>
        <div class="step-body">
          <p>打开 <strong>比特浏览器客户端</strong>，在左侧导航栏点击 <strong>"浏览器窗口"</strong>，然后点击顶部的蓝色 <strong>"+ 创建窗口"</strong> 按钮。</p>
          ${realScreenshot(imgBase + '/step01-create-window.png', '在比特浏览器主界面，点击 <strong>"+ 创建窗口"</strong> 按钮', '步骤1')}
        </div>
      </div>

      <!-- 步骤2：选择代理类型 -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">2</div>
          <div class="step-title">选择代理方式和代理类型</div>
        </div>
        <div class="step-body">
          <p>在弹出的 <strong>"创建窗口"</strong> 配置页面中，找到 <strong>"代理设置"</strong> 区域：</p>
          <ol>
            <li><strong>代理方式</strong>：选择 <strong>"自定义代理"</strong></li>
            <li><strong>代理类型</strong>：在下拉菜单中选择 <strong>"http"</strong> 或 <strong>"socks5"</strong>（根据您从量子代理客户端提取的代理协议选择）</li>
          </ol>
          ${realScreenshot(imgBase + '/step02-proxy-type.png', '在创建窗口页面，代理方式选择 <strong>"自定义代理"</strong>，代理类型选择 <strong>http</strong> 或 <strong>socks5</strong>', '步骤2')}
        </div>
      </div>

      <!-- 步骤3：配置 HTTP 代理 -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">3</div>
          <div class="step-title">填入代理信息并检测（HTTP 示例）</div>
        </div>
        <div class="step-body">
          <p>如果选择 <strong>HTTP</strong> 代理类型，将从量子代理客户端获取的代理信息依次填入：</p>
          <ol>
            <li><strong>代理类型</strong>：选择 <strong>"http"</strong></li>
            <li><strong>代理主机</strong>：填入代理 IP 地址</li>
            <li><strong>代理端口</strong>：填入端口号</li>
            <li><strong>代理账号</strong>：填入用户名</li>
            <li><strong>代理密码</strong>：填入密码</li>
          </ol>
          <p>填写完成后，点击右侧 <strong>"代理检测"</strong> 按钮，如果显示绿色的 IP 信息和地理位置，说明代理连接成功。</p>
          ${realScreenshot(imgBase + '/step03-http-config.png', '选择 <strong>http</strong> 代理类型，填入代理主机、端口、账号、密码，点击 <strong>"代理检测"</strong> 验证连通性', '步骤3')}
        </div>
      </div>

      <!-- 步骤4：配置 SOCKS5 代理 -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">4</div>
          <div class="step-title">填入代理信息并检测（SOCKS5 示例）</div>
        </div>
        <div class="step-body">
          <p>如果选择 <strong>SOCKS5</strong> 代理类型，操作方式与 HTTP 相同：</p>
          <ol>
            <li><strong>代理类型</strong>：选择 <strong>"socks5"</strong></li>
            <li><strong>代理主机</strong>：填入代理 IP 地址</li>
            <li><strong>代理端口</strong>：填入端口号</li>
            <li><strong>代理账号</strong>：填入用户名</li>
            <li><strong>代理密码</strong>：填入密码</li>
          </ol>
          <p>同样点击 <strong>"代理检测"</strong> 按钮验证连通性。</p>
          ${realScreenshot(imgBase + '/step04-socks5-config.png', '选择 <strong>socks5</strong> 代理类型，填入代理主机、端口、账号、密码，点击 <strong>"代理检测"</strong> 验证连通性', '步骤4')}

          <div class="info-box">
            <strong>💡 HTTP 与 SOCKS5 的区别：</strong><br>
            • <strong>HTTP</strong>：适用于 HTTP/HTTPS 网页浏览，兼容性好<br>
            • <strong>SOCKS5</strong>：支持所有类型的网络流量（TCP/UDP），兼容性更强，推荐优先使用
          </div>
        </div>
      </div>

      <!-- 步骤5：保存设置 -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">5</div>
          <div class="step-title">完成其他设置，点击"确定"保存</div>
        </div>
        <div class="step-body">
          <p>如果需要修改其他设置（如常用设置、浏览器窗口工作台页面等），可在下方进行调整。设置完成后，点击右下角的 <strong>"确定"</strong> 按钮保存窗口配置。</p>
          ${realScreenshot(imgBase + '/step05-save-settings.png', '完成所有设置后，点击右下角 <strong>"确定"</strong> 按钮保存配置', '步骤5')}
        </div>
      </div>

      <!-- 步骤6：打开浏览器窗口 -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">6</div>
          <div class="step-title">在浏览器窗口列表中，点击"打开"启动</div>
        </div>
        <div class="step-body">
          <p>返回 <strong>"浏览器窗口"</strong> 列表页面，找到您刚刚创建的窗口配置，点击右侧的 <strong>"打开"</strong> 按钮即可启动浏览器，开始使用量子代理的 IP 访问网站。</p>
          ${realScreenshot(imgBase + '/step06-open-browser.png', '在浏览器窗口列表中，点击 <strong>"打开"</strong> 按钮启动浏览器', '步骤6')}
        </div>
      </div>

      <!-- ═══════ 第二部分：验证代理 ═══════ -->
      <h3>✅ 第二部分：验证代理是否生效</h3>
      <p>浏览器启动后，访问以下网站验证 IP 是否已切换：</p>
      <ul>
        <li><strong>whoer.net</strong> — 查看当前 IP、地理位置和匿名性</li>
        <li><strong>ipinfo.io</strong> — 查看 IP 详细信息</li>
        <li><strong>browserleaks.com</strong> — 检查浏览器指纹信息</li>
      </ul>

      ${realScreenshot(clientImgBase + '/whoer-verify.png', '打开 <strong>whoer.net</strong> 验证 IP 地址，显示的 IP 与代理 IP 一致，说明代理配置成功！', '验证1')}

      <p>也可以打开当前页面的 <strong>services → Whois</strong>，输入查询到的 IP 进行查询：</p>
      ${realScreenshot(clientImgBase + '/whois-query.png', '打开 Whois 服务，输入代理 IP 进行查询', '验证2')}

      <p>查询结果可以看到当前 IP 的地理位置信息：</p>
      ${realScreenshot(clientImgBase + '/whois-result.png', '查询结果显示当前 IP 的地理位置信息，确认代理已生效', '验证3')}

      <div class="info-box success">
        <strong>🎉 配置完成！</strong>如上图所示，whoer.net 显示的 IP 地址与代理设备的 IP 一致，伪装度为 100%，说明代理已成功生效。您现在可以安全地进行多账号操作了。
      </div>

      <!-- 常见问题 -->
      <h3>❓ 常见问题</h3>
      <div class="step-card">
        <h4>Q: 比特浏览器的代理类型选择 "http" 还是 "socks5"？</h4>
        <p>比特浏览器支持 <strong>http</strong>、<strong>https</strong> 和 <strong>socks5</strong> 三种代理协议。根据您从量子代理客户端提取的代理协议进行选择。<br>
        一般推荐优先使用 <strong>socks5</strong>，兼容性更好，支持所有类型的网络流量。</p>
      </div>
      <div class="step-card">
        <h4>Q: 代理检测失败怎么办？</h4>
        <ul>
          <li>检查代理信息是否填写正确（主机IP、端口、账号、密码）</li>
          <li>确认代理协议类型选择正确（http / socks5）</li>
          <li>检查代理是否已过期或流量已用完</li>
          <li>尝试更换其他代理节点</li>
        </ul>
      </div>
      <div class="step-card">
        <h4>Q: 如何批量导入代理到比特浏览器？</h4>
        <p>比特浏览器支持批量导入功能。在 <strong>"浏览器窗口"</strong> 页面，可以通过 <strong>"批量导入"</strong> 功能一次性导入多个代理配置，提高效率。格式支持 <code>IP:端口:账号:密码</code>，与量子代理客户端导出的纯文本格式完全兼容。</p>
      </div>
      <div class="step-card">
        <h4>Q: 代理测试无法连通怎么办？</h4>
        <p>HTTP(S) 和 SOCKS5 代理需要在 <strong>外网环境</strong> 下才能正常连通。请确认您当前的网络环境已具备外网访问能力（即能够正常访问境外网站），否则代理将无法建立连接。</p>
      </div>
    </div>`;
  }

  // ── MostLogin 专属详细教程（含真实截图） ──
  function getMostLoginCustomContent(browser) {
    const imgBase = 'assets/help-screenshots/mostlogin';
    const clientImgBase = 'assets/help-screenshots/client';
    return `<div class="tutorial-content">
      <!-- 浏览器简介 -->
      <div class="info-box">
        <strong>📌 ${browser.fullName}</strong><br>
        ${browser.desc}<br>
        <strong>官网：</strong><a href="${browser.website}" target="_blank" style="color:#1a73e8;">${browser.website}</a>
      </div>

      <div class="info-box warning">
        <strong>⚠️ 重要提示：</strong>量子代理平台的所有代理产品均需要在 <strong>境外网络环境</strong> 下使用，境外网络环境由客户自行配置。本教程涉及的网络环境已实现境外环境配置。
      </div>

      <!-- ═══════ 前置准备：从量子代理客户端获取代理信息 ═══════ -->
      <h3>📋 前置准备：从量子代理客户端获取代理信息</h3>
      <p>在配置 MostLogin 浏览器之前，您需要先从 <strong>量子代理（ProxyManager）</strong> 客户端批量提取代理信息。以下是详细步骤：</p>

      <!-- 准备步骤1：进入我的订单 -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">1</div>
          <div class="step-title">进入"我的订单"页面</div>
        </div>
        <div class="step-body">
          <p>登录 <strong>量子代理客户端</strong>，在左侧导航栏点击 <strong>"我的订单"</strong>，进入订单列表页面。页面会显示您所有已购买的代理订单。</p>
          ${realScreenshot(clientImgBase + '/order-list.png', '在量子代理客户端左侧导航栏点击 <strong>"我的订单"</strong>，进入订单列表页面', '步骤1')}
        </div>
      </div>

      <!-- 准备步骤2：点击对应订单进入详情 -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">2</div>
          <div class="step-title">点击对应订单，进入订单详情页面</div>
        </div>
        <div class="step-body">
          <p>在订单列表中，找到您需要提取代理的订单（如图红框所示），<strong>鼠标点击该订单</strong> 即可进入订单详情页面。在订单详情页右上方，点击蓝色的 <strong>⚡ 批量提取代理</strong> 按钮。</p>
          ${realScreenshot(clientImgBase + '/order-detail.png', '点击对应订单进入详情页面后，点击右上角 <strong>⚡ 批量提取代理</strong> 按钮', '步骤2')}
        </div>
      </div>

      <!-- 准备步骤3：选择协议和格式 -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">3</div>
          <div class="step-title">选择协议、授权方式和复制格式</div>
        </div>
        <div class="step-body">
          <p>在弹出的 <strong>"批量查看 / 导出"</strong> 窗口中，按以下步骤操作：</p>
          <ol>
            <li><strong>选择协议</strong>：顶部选择 <strong>HTTP</strong> 或 <strong>SOCKS5</strong>（根据 MostLogin 中要配置的代理类型选择）</li>
            <li><strong>查看模式</strong>：左侧选择 <strong>"列表文本"</strong></li>
            <li><strong>授权方式</strong>：选择 <strong>"密码模式"</strong>（推荐，MostLogin 支持账密认证）</li>
            <li><strong>复制格式</strong>：选择 <strong>"纯文本格式"</strong>（格式为 <code>IP:Port:User:Pass</code>），方便手动拆分填写到 MostLogin 各字段中</li>
            <li>点击底部 <strong>"📋 一键复制"</strong> 按钮，将代理列表复制到剪贴板</li>
          </ol>
          ${realScreenshot(clientImgBase + '/export-modal-listtext.png', '在批量导出窗口中：选择 <strong>HTTP</strong> 或 <strong>SOCKS5</strong> 协议 → <strong>列表文本</strong> → <strong>密码模式</strong> → <strong>纯文本格式</strong>，右侧显示代理列表', '步骤2')}

          <div class="info-box warning">
            <strong>⚠️ 重要提示：</strong><br>
            • MostLogin 中的 <strong>"socks5"</strong> 对应量子代理中的 <strong>SOCKS5</strong> 协议<br>
            • 如果选择 <strong>HTTP</strong> 协议，则在 MostLogin 中 Proxy protocol 选择 <strong>"HTTP"</strong><br>
            • 建议使用 <strong>"纯文本格式"</strong> 导出，方便手动拆分填写到 MostLogin 的各字段中<br>
            • 请确保两端协议一致，否则代理将无法连接
          </div>
        </div>
      </div>

      <!-- 准备步骤4：理解代理格式 -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">4</div>
          <div class="step-title">理解提取的代理格式</div>
        </div>
        <div class="step-body">
          <p>复制后的代理信息格式如下，每行一条代理：</p>

          <table class="format-table">
            <thead>
              <tr>
                <th>格式类型</th>
                <th>HTTP 示例</th>
                <th>SOCKS5 示例</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>纯文本（密码模式）</strong><br><span style="color:#1a73e8;font-size:11px;">推荐 ✓</span></td>
                <td><code>192.168.1.101:10000:user_123:pass_xyz</code></td>
                <td><code>192.168.1.101:10000:user_123:pass_xyz</code></td>
              </tr>
              <tr>
                <td><strong>纯文本（白名单模式）</strong></td>
                <td><code>192.168.1.101:10000</code></td>
                <td><code>192.168.1.101:10000</code></td>
              </tr>
              <tr>
                <td><strong>标准URL（密码模式）</strong></td>
                <td><code>http://user_123:pass_xyz@192.168.1.101:10000</code></td>
                <td><code>socks5://user_123:pass_xyz@192.168.1.101:10000</code></td>
              </tr>
              <tr>
                <td><strong>标准URL（白名单模式）</strong></td>
                <td><code>http://192.168.1.101:10000</code></td>
                <td><code>socks5://192.168.1.101:10000</code></td>
              </tr>
            </tbody>
          </table>

          <div class="info-box">
            <strong>📝 字段说明（纯文本格式 <code>IP:Port:User:Pass</code>）：</strong><br>
            <table class="format-table" style="margin-top:8px;">
              <thead>
                <tr><th>字段</th><th>含义</th><th>MostLogin 对应项</th><th>示例值</th></tr>
              </thead>
              <tbody>
                <tr><td><strong>IP</strong></td><td>代理服务器地址</td><td>Proxy host（代理主机）</td><td><code>38.32.81.2</code></td></tr>
                <tr><td><strong>Port</strong></td><td>代理端口号</td><td>Proxy port（代理端口）</td><td><code>20828</code></td></tr>
                <tr><td><strong>User</strong></td><td>认证用户名</td><td>Proxy account（代理账号）</td><td><code>user_123</code></td></tr>
                <tr><td><strong>Pass</strong></td><td>认证密码</td><td>Proxy password（代理密码）</td><td><code>pass_xyz</code></td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- ═══════ 第一部分：MostLogin 配置步骤 ═══════ -->
      <h3>🔧 第一部分：MostLogin 代理配置步骤</h3>

      <!-- 步骤1：打开 MostLogin -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">1</div>
          <div class="step-title">打开 MostLogin 指纹浏览器并登录</div>
        </div>
        <div class="step-body">
          <p>安装并打开 <strong>MostLogin 指纹浏览器</strong> 客户端，使用您的账号登录。登录后进入主界面，可以看到浏览器环境列表（Browser Profiles）。</p>
          ${realScreenshot(imgBase + '/ml-img12.png', '打开 MostLogin 指纹浏览器并登录，进入主界面', '步骤1')}
        </div>
      </div>

      <!-- 步骤2：点击 Create Profile -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">2</div>
          <div class="step-title">点击"Create profile"新建浏览器环境</div>
        </div>
        <div class="step-body">
          <p>在主界面中，点击 <strong>"Create profile"</strong>（创建个人资料）按钮，进入新建浏览器环境页面。根据需求选择：</p>
          <ul>
            <li><strong>窗口类型</strong>：选择浏览器类型（如 Chrome）</li>
            <li><strong>系统型号</strong>：选择操作系统（如 Windows、macOS）</li>
            <li><strong>窗口名称</strong>：为该浏览器环境命名，方便管理</li>
          </ul>
          ${realScreenshot(imgBase + '/ml-img13.png', '点击 <strong>"Create profile"</strong>，设置窗口类型、系统型号和窗口名称', '步骤2')}
        </div>
      </div>

      <!-- 步骤3：选择代理类型并配置 -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">3</div>
          <div class="step-title">在 Type 中选择 Proxy，配置代理信息</div>
        </div>
        <div class="step-body">
          <p>在创建配置页面中，找到 <strong>"Type"</strong>（类型）选项，选择 <strong>"proxy"</strong>（代理）模式。然后按以下步骤配置代理信息：</p>
          <ol>
            <li><strong>Proxy protocol</strong>（代理协议）：根据从量子代理客户端提取的协议类型，选择 <strong>"socks5"</strong> 或 <strong>"HTTP"</strong></li>
            <li><strong>Proxy host</strong>（代理主机）：填入代理服务器的 <strong>IP 地址</strong>（如 <code>38.32.81.2</code>）</li>
            <li><strong>Proxy port</strong>（代理端口）：填入代理的 <strong>端口号</strong>（如 <code>20828</code>）</li>
            <li><strong>Proxy account</strong>（代理账号）：填入从量子代理客户端获取的 <strong>用户名</strong></li>
            <li><strong>Proxy password</strong>（代理密码）：填入从量子代理客户端获取的 <strong>密码</strong></li>
          </ol>
          ${realScreenshot(imgBase + '/ml-img14.png', '在 Type 选择 <strong>proxy</strong>，Proxy protocol 选择 <strong>socks5</strong>，然后填写 Proxy host、Proxy port、Proxy account、Proxy password', '步骤3')}

          <div class="info-box">
            <strong>💡 提示：</strong>MostLogin 的 Type 选项提供 <strong>"proxy"</strong>（代理）和 <strong>"direct"</strong>（直连）两种模式。使用量子代理时，请选择 <strong>"proxy"</strong> 模式。Proxy protocol 支持 <strong>socks5</strong>、<strong>HTTP</strong>、<strong>HTTPS</strong> 等协议。
          </div>
        </div>
      </div>

      <!-- 步骤4：检测代理 -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">4</div>
          <div class="step-title">点击"Check proxy server IP"检测代理连通性</div>
        </div>
        <div class="step-body">
          <p>代理信息填写完成后，点击 <strong>"Check proxy server IP"</strong> 按钮检测代理连通性。如果代理连接成功，会显示出口 IP 信息：</p>
          <ul>
            <li>检测结果显示的 <strong>出口 IP</strong> 应与量子代理后台显示的 IP 一致</li>
            <li>如果显示了正确的 IP 地址，说明代理配置正确</li>
          </ul>
          ${realScreenshot(imgBase + '/ml-img15.png', '点击 <strong>"Check proxy server IP"</strong> 后，检测结果显示出口 IP 信息，与量子代理后台一致，代理检测成功', '步骤4')}

          <div class="info-box success">
            <strong>✅ 代理验证成功标志：</strong><br>
            • 检测结果显示正确的 <strong>出口 IP 地址</strong><br>
            • 出口 IP 与量子代理客户端中显示的 IP 一致<br>
            • 说明代理主机、端口、账号、密码均填写正确，代理连接正常
          </div>

          <p>检测成功后，点击 <strong>"Confirm"</strong>（确认）按钮保存配置。</p>
        </div>
      </div>

      <!-- 步骤5：启动浏览器 -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">5</div>
          <div class="step-title">点击"START"启动浏览器环境</div>
        </div>
        <div class="step-body">
          <p>保存配置后，返回主界面的浏览器环境列表。找到刚刚创建的配置文件，点击右侧的 <strong>"START"</strong> 按钮启动浏览器环境。</p>
          ${realScreenshot(imgBase + '/ml-img16.png', '在浏览器环境列表中，点击 <strong>"START"</strong> 按钮启动配置好的浏览器环境', '步骤5')}
        </div>
      </div>

      <!-- ═══════ 第二部分：验证代理 ═══════ -->
      <h3>✅ 第二部分：验证代理是否生效</h3>
      <p>浏览器启动后，访问以下网站验证 IP 是否已切换：</p>
      <ul>
        <li><strong>whoer.net</strong> — 查看当前 IP、地理位置和匿名性</li>
        <li><strong>ipinfo.io</strong> — 查看 IP 详细信息</li>
        <li><strong>browserleaks.com</strong> — 检查浏览器指纹信息</li>
      </ul>

      ${realScreenshot(imgBase + '/ml-img17.png', '在 MostLogin 启动的浏览器中打开 <strong>whoer.net</strong>，显示当前 IP 信息，与代理检测结果一致，说明代理配置成功！', '验证')}

      <div class="info-box success">
        <strong>🎉 配置完成！</strong>如上图所示，whoer.net 显示的 IP 地址与代理检测的出口 IP 一致，说明代理已成功生效。您现在可以安全地进行多账号操作了。
      </div>

      <!-- 常见问题 -->
      <h3>❓ 常见问题</h3>
      <div class="step-card">
        <h4>Q: MostLogin 的 Proxy protocol 选择哪个？</h4>
        <p>根据您从量子代理客户端提取的代理协议进行选择：<br>
        • 如果提取时选择的是 <strong>SOCKS5</strong> 协议，则在 MostLogin 中 Proxy protocol 选择 <strong>"socks5"</strong><br>
        • 如果提取时选择的是 <strong>HTTP</strong> 协议，则选择 <strong>"HTTP"</strong><br>
        一般推荐优先使用 <strong>socks5</strong>，兼容性更好，支持所有类型的网络流量。</p>
      </div>
      <div class="step-card">
        <h4>Q: Type 选项中 proxy 和 direct 有什么区别？</h4>
        <p><strong>proxy</strong>（代理）：通过代理服务器访问网络，适合需要切换 IP 的场景。<br>
        <strong>direct</strong>（直连）：不使用代理，直接使用本机网络访问。<br>
        使用量子代理时，请选择 <strong>proxy</strong> 模式。</p>
      </div>
      <div class="step-card">
        <h4>Q: Check proxy server IP 检测失败怎么办？</h4>
        <ul>
          <li>检查代理信息是否填写正确（Proxy host、Proxy port、Proxy account、Proxy password）</li>
          <li>确认 Proxy protocol 选择正确（socks5 / HTTP），需与量子代理客户端提取的协议一致</li>
          <li>检查代理是否已过期或流量已用完</li>
          <li>确认当前网络环境是否具备外网访问能力</li>
          <li>尝试更换其他代理节点</li>
        </ul>
      </div>
      <div class="step-card">
        <h4>Q: 如何修改已有配置的代理设置？</h4>
        <p>在 MostLogin 的浏览器环境列表中，找到需要修改的配置文件，点击 <strong>"Edit"</strong>（编辑）按钮，重新进入配置页面修改代理设置，然后点击 <strong>"Confirm"</strong> 保存即可。</p>
      </div>
      <div class="step-card">
        <h4>Q: 可以批量创建多个浏览器环境吗？</h4>
        <p>是的，MostLogin 支持批量创建浏览器环境。您可以为每个环境配置不同的代理 IP，实现多账号独立 IP 操作。建议每个账号使用独立的代理 IP，避免关联风险。</p>
      </div>
      <div class="step-card">
        <h4>Q: 代理测试无法连通怎么办？</h4>
        <p>HTTP(S) 和 SOCKS5 代理需要在 <strong>外网环境</strong> 下才能正常连通。请确认您当前的网络环境已具备外网访问能力（即能够正常访问境外网站），否则代理将无法建立连接。</p>
      </div>
    </div>`;
  }

  // ── Nstbrowser 专属详细教程（含真实截图） ──
  function getNstbrowserCustomContent(browser) {
    const imgBase = 'assets/help-screenshots/nstbrowser';
    const clientImgBase = 'assets/help-screenshots/client';
    return `<div class="tutorial-content">
      <!-- 浏览器简介 -->
      <div class="info-box">
        <strong>📌 ${browser.fullName}</strong><br>
        ${browser.desc}<br>
        <strong>官网：</strong><a href="${browser.website}" target="_blank" style="color:#1a73e8;">${browser.website}</a>
      </div>

      <div class="info-box warning">
        <strong>⚠️ 重要提示：</strong>量子代理平台的所有代理产品均需要在 <strong>境外网络环境</strong> 下使用，境外网络环境由客户自行配置。本教程涉及的网络环境已实现境外环境配置。
      </div>

      <!-- ═══════ 前置准备：从量子代理客户端获取代理信息 ═══════ -->
      <h3>📋 前置准备：从量子代理客户端获取代理信息</h3>
      <p>在配置 Nstbrowser 浏览器之前，您需要先从 <strong>量子代理（ProxyManager）</strong> 客户端批量提取代理信息。以下是详细步骤：</p>

      <!-- 准备步骤1：进入我的订单 -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">1</div>
          <div class="step-title">进入"我的订单"页面</div>
        </div>
        <div class="step-body">
          <p>登录 <strong>量子代理客户端</strong>，在左侧导航栏点击 <strong>"我的订单"</strong>，进入订单列表页面。页面会显示您所有已购买的代理订单。</p>
          ${realScreenshot(clientImgBase + '/order-list.png', '在量子代理客户端左侧导航栏点击 <strong>"我的订单"</strong>，进入订单列表页面', '步骤1')}
        </div>
      </div>

      <!-- 准备步骤2：点击对应订单进入详情 -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">2</div>
          <div class="step-title">点击对应订单，进入订单详情页面</div>
        </div>
        <div class="step-body">
          <p>在订单列表中，找到您需要提取代理的订单（如图红框所示），<strong>鼠标点击该订单</strong> 即可进入订单详情页面。在订单详情页右上方，点击蓝色的 <strong>⚡ 批量提取代理</strong> 按钮。</p>
          ${realScreenshot(clientImgBase + '/order-detail.png', '点击对应订单进入详情页面后，点击右上角 <strong>⚡ 批量提取代理</strong> 按钮', '步骤2')}
        </div>
      </div>

      <!-- 准备步骤3：选择协议和格式 -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">3</div>
          <div class="step-title">选择协议、授权方式和复制格式</div>
        </div>
        <div class="step-body">
          <p>在弹出的 <strong>"批量查看 / 导出"</strong> 窗口中，按以下步骤操作：</p>
          <ol>
            <li><strong>选择协议</strong>：顶部选择 <strong>HTTP</strong> 或 <strong>SOCKS5</strong>（根据 Nstbrowser 中要配置的代理类型选择）</li>
            <li><strong>查看模式</strong>：左侧选择 <strong>"列表文本"</strong></li>
            <li><strong>授权方式</strong>：选择 <strong>"密码模式"</strong>（推荐，Nstbrowser 支持账密认证）</li>
            <li><strong>复制格式</strong>：选择 <strong>"标准URL格式"</strong>（格式为 <code>socks5://user:pass@IP:Port</code>），Nstbrowser 支持 Proxy URL 直接粘贴</li>
            <li>点击底部 <strong>"📋 一键复制"</strong> 按钮，将代理列表复制到剪贴板</li>
          </ol>
          ${realScreenshot(clientImgBase + '/export-modal-listtext.png', '在批量导出窗口中：选择 <strong>HTTP</strong> 或 <strong>SOCKS5</strong> 协议 → <strong>列表文本</strong> → <strong>密码模式</strong> → <strong>标准URL格式</strong>，右侧显示代理列表', '步骤2')}

          <div class="info-box warning">
            <strong>⚠️ 重要提示：</strong><br>
            • Nstbrowser 中的 <strong>"socks5"</strong> 对应量子代理中的 <strong>SOCKS5</strong> 协议<br>
            • 如果选择 <strong>HTTP</strong> 协议，则在 Nstbrowser 中 Proxy Type 右侧下拉选择 <strong>"http"</strong><br>
            • Nstbrowser 支持 <strong>Proxy URL</strong> 直接粘入标准URL格式的代理信息<br>
            • 也可以选择 <strong>"纯文本格式"</strong> 手动拆分填写 Host、Port、Username、Password<br>
            • 请确保两端协议一致，否则代理将无法连接
          </div>
        </div>
      </div>

      <!-- 准备步骤4：理解代理格式 -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">4</div>
          <div class="step-title">理解提取的代理格式</div>
        </div>
        <div class="step-body">
          <p>复制后的代理信息格式如下，每行一条代理：</p>

          <table class="format-table">
            <thead>
              <tr>
                <th>格式类型</th>
                <th>HTTP 示例</th>
                <th>SOCKS5 示例</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>纯文本（密码模式）</strong></td>
                <td><code>192.168.1.101:10000:user_123:pass_xyz</code></td>
                <td><code>192.168.1.101:10000:user_123:pass_xyz</code></td>
              </tr>
              <tr>
                <td><strong>纯文本（白名单模式）</strong></td>
                <td><code>192.168.1.101:10000</code></td>
                <td><code>192.168.1.101:10000</code></td>
              </tr>
              <tr>
                <td><strong>标准URL（密码模式）</strong><br><span style="color:#1a73e8;font-size:11px;">推荐 ✓（可直接粘入 Proxy URL）</span></td>
                <td><code>http://user_123:pass_xyz@192.168.1.101:10000</code></td>
                <td><code>socks5://user_123:pass_xyz@192.168.1.101:10000</code></td>
              </tr>
              <tr>
                <td><strong>标准URL（白名单模式）</strong></td>
                <td><code>http://192.168.1.101:10000</code></td>
                <td><code>socks5://192.168.1.101:10000</code></td>
              </tr>
            </tbody>
          </table>

          <div class="info-box">
            <strong>📝 字段说明（纯文本格式 <code>IP:Port:User:Pass</code>）：</strong><br>
            <table class="format-table" style="margin-top:8px;">
              <thead>
                <tr><th>字段</th><th>含义</th><th>Nstbrowser 对应项</th><th>示例值</th></tr>
              </thead>
              <tbody>
                <tr><td><strong>IP</strong></td><td>代理服务器地址</td><td>Host and Port（左侧输入框）</td><td><code>38.32.81.2</code></td></tr>
                <tr><td><strong>Port</strong></td><td>代理端口号</td><td>Host and Port（右侧端口框）</td><td><code>20828</code></td></tr>
                <tr><td><strong>User</strong></td><td>认证用户名</td><td>Proxy Username</td><td><code>user_123</code></td></tr>
                <tr><td><strong>Pass</strong></td><td>认证密码</td><td>Proxy Password</td><td><code>pass_xyz</code></td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- ═══════ 第一部分：Nstbrowser 配置步骤 ═══════ -->
      <h3>🔧 第一部分：Nstbrowser 代理配置步骤</h3>

      <!-- 步骤1：打开 Nstbrowser -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">1</div>
          <div class="step-title">打开 Nstbrowser 指纹浏览器并登录</div>
        </div>
        <div class="step-body">
          <p>打开安装好的 <strong>Nstbrowser 指纹浏览器</strong> 客户端并登录。进入 <strong>Profiles</strong>（配置文件）主界面。左侧导航栏可以看到 <strong>Profiles</strong>、<strong>Groups</strong>、<strong>Team</strong>、<strong>Proxies</strong>、<strong>RPA</strong>、<strong>Extensions</strong>、<strong>Billing</strong>、<strong>API</strong> 等功能模块。</p>
          ${realScreenshot(imgBase + '/ns-img14.png', '打开 Nstbrowser 指纹浏览器，进入 <strong>Profiles</strong> 主界面', '步骤1')}
        </div>
      </div>

      <!-- 步骤2：点击 Create Profile -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">2</div>
          <div class="step-title">点击"Create Profile"新建浏览器环境</div>
        </div>
        <div class="step-body">
          <p>在 Profiles 页面顶部，点击紫色的 <strong>"+ Create Profile"</strong> 按钮新建浏览器环境。</p>
          ${realScreenshot(imgBase + '/ns-img15.png', '点击 <strong>"+ Create Profile"</strong> 按钮新建浏览器环境', '步骤2')}
        </div>
      </div>

      <!-- 步骤3：切换到 Proxy 选项卡，选择 Custom -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">3</div>
          <div class="step-title">在 Proxy 选项卡中选择 Custom 代理类型</div>
        </div>
        <div class="step-body">
          <p>进入 <strong>Profile Create</strong>（配置创建）页面后，先在 <strong>"Overview"</strong> 中设置好指纹信息（如操作系统、浏览器内核等），然后点击顶部的 <strong>"Proxy"</strong> 选项卡进入代理配置区域。按以下步骤配置：</p>
          <ol>
            <li><strong>Proxy Setting</strong>（代理设置）：选择 <strong>"Custom"</strong>（自定义）模式</li>
            <li><strong>Proxy Type</strong>（代理类型）：左侧下拉选择 <strong>"Custom"</strong>，右侧下拉选择具体协议 <strong>"socks5"</strong> 或 <strong>"http"</strong></li>
            <li>如果使用标准URL格式，可以直接在 <strong>"Proxy URL"</strong> 输入框中粘入完整代理URL</li>
          </ol>
          ${realScreenshot(imgBase + '/ns-img16.png', '在 <strong>"Proxy"</strong> 选项卡中，Proxy Type 选择 <strong>"Custom"</strong>，下拉菜单中选择 Custom 模式', '步骤3')}

          <div class="info-box">
            <strong>💡 提示：</strong>Nstbrowser 的 Proxy Setting 提供三种模式：<strong>"Custom"</strong>（自定义）、<strong>"Saved Proxies"</strong>（已保存代理）和 <strong>"Saved Proxy Group"</strong>（代理组）。使用量子代理时，请选择 <strong>"Custom"</strong> 模式。
          </div>
        </div>
      </div>

      <!-- 步骤4：填写代理信息 -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">4</div>
          <div class="step-title">选择协议并填写代理信息</div>
        </div>
        <div class="step-body">
          <p>选择好 Custom 模式后，在右侧下拉菜单中选择对应的代理协议（如 <strong>socks5</strong>），然后按以下字段填写代理信息：</p>
          <ol>
            <li><strong>Proxy URL</strong>：可直接粘入标准URL格式的代理（如 <code>socks5://user:pass@38.32.81.2:20828</code>），系统会自动拆分到下方各字段</li>
            <li><strong>Host and Port</strong>（主机和端口）：左侧填入代理 <strong>IP 地址</strong>（如 38.32.81.2），右侧填入 <strong>端口号</strong>（如 20828）</li>
            <li><strong>Proxy Username</strong>（代理用户名）：填入从量子代理客户端获取的 <strong>用户名</strong></li>
            <li><strong>Proxy Password</strong>（代理密码）：填入从量子代理客户端获取的 <strong>密码</strong></li>
          </ol>
          ${realScreenshot(imgBase + '/ns-img17.png', '选择 <strong>socks5</strong> 协议，填写 Proxy URL 或分别填写 Host、Port、Username、Password', '步骤4')}
        </div>
      </div>

      <!-- 步骤5：Check Proxy 检测 -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">5</div>
          <div class="step-title">点击"Check Proxy"检测代理连通性</div>
        </div>
        <div class="step-body">
          <p>代理信息填写完成后，点击下方的 <strong>"Check Proxy"</strong> 按钮检测代理连通性。如果代理连接成功，会在按钮上方显示绿色 ✅ 检测结果：</p>
          <ul>
            <li><strong>Check proxy success</strong>（代理检测成功）</li>
            <li>🇺🇸 <strong>Proxy in US</strong>（代理位于美国）</li>
            <li>显示代理协议、出口 IP 地址、时区等信息（如 <code>socks5 • 154.30.131.160 Timezone • America/Chicago</code>）</li>
          </ul>
          ${realScreenshot(imgBase + '/ns-img18.png', '点击 <strong>"Check Proxy"</strong> 后显示 <strong>Check proxy success</strong>，代理连接成功，显示出口 IP 和时区信息', '步骤5')}

          <div class="info-box success">
            <strong>✅ 代理验证成功标志：</strong><br>
            • 显示 <strong>"Check proxy success"</strong> 绿色提示<br>
            • 显示代理所在国家（如 🇺🇸 Proxy in US）<br>
            • 显示出口 IP 地址（如 154.30.131.160）和时区（如 America/Chicago）<br>
            • 说明代理 IP、端口、账号、密码均填写正确，代理连接正常
          </div>
        </div>
      </div>

      <!-- 步骤6：保存并启动 -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">6</div>
          <div class="step-title">点击"Create Profile"保存，然后在列表中启动浏览器</div>
        </div>
        <div class="step-body">
          <p>代理检测通过后，点击底部的 <strong>"Create Profile"</strong>（或 <strong>"Update Profile"</strong>）按钮保存配置。保存成功后，返回 <strong>"Profiles"</strong> 列表界面，可以看到刚刚创建的浏览器配置文件（如 NST_1），右侧 Proxy 列显示代理信息（如 🇺🇸 socks5://...）。点击 Actions 列中的 <strong>▶ 播放按钮</strong> 即可启动浏览器。</p>
          ${realScreenshot(imgBase + '/ns-img20.png', '在 <strong>Profiles</strong> 列表中，点击 <strong>▶ 播放按钮</strong> 启动浏览器', '步骤6')}
        </div>
      </div>

      <!-- ═══════ 第二部分：验证代理 ═══════ -->
      <h3>✅ 第二部分：验证代理是否生效</h3>
      <p>浏览器启动后，访问以下网站验证 IP 是否已切换：</p>
      <ul>
        <li><strong>whoer.net</strong> — 查看当前 IP、地理位置和匿名性</li>
        <li><strong>ipinfo.io</strong> — 查看 IP 详细信息</li>
        <li><strong>browserleaks.com</strong> — 检查浏览器指纹信息</li>
      </ul>

      ${realScreenshot(imgBase + '/ns-img21.png', '打开 <strong>whoer.net</strong> 验证 IP 地址，显示的 IP（154.30.131.160）与代理检测结果一致，位于 <strong>Estados Unidos</strong>（美国），说明代理配置成功！', '验证1')}

      <p>也可以打开当前页面的 <strong>Services → Whois</strong>，输入查询到的 IP 进行查询：</p>
      ${realScreenshot(imgBase + '/ns-img22.png', '打开 <strong>Services → Whois</strong> 服务，输入代理 IP 进行查询', '验证2')}

      <p>查询结果可以看到当前 IP 的详细地理位置信息：</p>
      ${realScreenshot(imgBase + '/ns-img23.png', '查询结果显示 IP 地址 <strong>154.30.131.160</strong>，位于 <strong>Estados Unidos (US)</strong>，ISP 为 <strong>Cogent Communications</strong>，确认代理已生效', '验证3')}

      <div class="info-box success">
        <strong>🎉 配置完成！</strong>如上图所示，whoer.net 显示的 IP 地址与代理检测的出口 IP 一致，说明代理已成功生效。您现在可以安全地进行多账号操作了。
      </div>

      <!-- 常见问题 -->
      <h3>❓ 常见问题</h3>
      <div class="step-card">
        <h4>Q: Nstbrowser 的 Proxy Type 选择哪个？</h4>
        <p>Nstbrowser 的 Proxy Type 左侧下拉选择 <strong>"Custom"</strong>，右侧下拉选择具体的代理协议：<strong>"socks5"</strong> 或 <strong>"http"</strong>。根据您从量子代理客户端提取的代理协议进行选择。<br>
        一般推荐优先使用 <strong>socks5</strong>，兼容性更好，支持所有类型的网络流量。</p>
      </div>
      <div class="step-card">
        <h4>Q: 可以直接粘贴代理URL吗？</h4>
        <p>是的，Nstbrowser 支持在 <strong>"Proxy URL"</strong> 输入框中直接粘入标准URL格式的代理信息（如 <code>socks5://user:pass@IP:Port</code>）。粘入后，系统会自动将信息拆分到 Host and Port、Proxy Username、Proxy Password 各字段中，非常方便。<br>
        建议在量子代理客户端中选择 <strong>"标准URL格式"</strong> 导出，可以直接复制粘贴使用。</p>
      </div>
      <div class="step-card">
        <h4>Q: Check Proxy 检测失败怎么办？</h4>
        <ul>
          <li>检查代理信息是否填写正确（Host、Port、Proxy Username、Proxy Password）</li>
          <li>确认代理协议选择正确（socks5 / http），需与量子代理客户端提取的协议一致</li>
          <li>检查代理是否已过期或流量已用完</li>
          <li>确认 IP Checker 选择为 <strong>"IP INFO"</strong>（默认选项）</li>
          <li>尝试更换其他代理节点</li>
        </ul>
      </div>
      <div class="step-card">
        <h4>Q: Custom、Saved Proxies 和 Saved Proxy Group 有什么区别？</h4>
        <p><strong>Custom</strong>（自定义）：手动填写代理信息，适合单次使用。<br>
        <strong>Saved Proxies</strong>（已保存代理）：从已保存的代理列表中选择，适合频繁使用的代理。<br>
        <strong>Saved Proxy Group</strong>（代理组）：从预设的代理组中选择，适合批量管理多个代理。<br>
        使用量子代理时，首次配置建议选择 <strong>Custom</strong> 模式，后续可以将常用代理保存到 Saved Proxies 中复用。</p>
      </div>
      <div class="step-card">
        <h4>Q: 如何修改已有配置的代理设置？</h4>
        <p>在 Nstbrowser 的 <strong>Profiles</strong> 列表中，找到需要修改的配置文件，点击 Actions 列中的 <strong>更多操作（⋮）</strong> 按钮，选择 <strong>"Edit"</strong>（编辑），重新进入 Proxy 选项卡修改代理设置，然后点击 <strong>"Update Profile"</strong> 保存即可。</p>
      </div>
      <div class="step-card">
        <h4>Q: 代理测试无法连通怎么办？</h4>
        <p>HTTP(S) 和 SOCKS5 代理需要在 <strong>外网环境</strong> 下才能正常连通。请确认您当前的网络环境已具备外网访问能力（即能够正常访问境外网站），否则代理将无法建立连接。</p>
      </div>
    </div>`;
  }

  // ── MoreLogin 专属详细教程（含真实截图） ──
  function getMoreLoginCustomContent(browser) {
    const imgBase = 'assets/help-screenshots/morelogin';
    const clientImgBase = 'assets/help-screenshots/client';
    return `<div class="tutorial-content">
      <!-- 浏览器简介 -->
      <div class="info-box">
        <strong>📌 ${browser.fullName}</strong><br>
        ${browser.desc}<br>
        <strong>官网：</strong><a href="${browser.website}" target="_blank" style="color:#1a73e8;">${browser.website}</a>
      </div>

      <div class="info-box warning">
        <strong>⚠️ 重要提示：</strong>量子代理平台的所有代理产品均需要在 <strong>境外网络环境</strong> 下使用，境外网络环境由客户自行配置。本教程涉及的网络环境已实现境外环境配置。
      </div>

      <!-- ═══════ 前置准备：从量子代理客户端获取代理信息 ═══════ -->
      <h3>📋 前置准备：从量子代理客户端获取代理信息</h3>
      <p>在配置 MoreLogin 浏览器之前，您需要先从 <strong>量子代理（ProxyManager）</strong> 客户端批量提取代理信息。以下是详细步骤：</p>

      <!-- 准备步骤1：进入我的订单 -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">1</div>
          <div class="step-title">进入"我的订单"页面</div>
        </div>
        <div class="step-body">
          <p>登录 <strong>量子代理客户端</strong>，在左侧导航栏点击 <strong>"我的订单"</strong>，进入订单列表页面。页面会显示您所有已购买的代理订单。</p>
          ${realScreenshot(clientImgBase + '/order-list.png', '在量子代理客户端左侧导航栏点击 <strong>"我的订单"</strong>，进入订单列表页面', '步骤1')}
        </div>
      </div>

      <!-- 准备步骤2：点击对应订单进入详情 -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">2</div>
          <div class="step-title">点击对应订单，进入订单详情页面</div>
        </div>
        <div class="step-body">
          <p>在订单列表中，找到您需要提取代理的订单（如图红框所示），<strong>鼠标点击该订单</strong> 即可进入订单详情页面。在订单详情页右上方，点击蓝色的 <strong>⚡ 批量提取代理</strong> 按钮。</p>
          ${realScreenshot(clientImgBase + '/order-detail.png', '点击对应订单进入详情页面后，点击右上角 <strong>⚡ 批量提取代理</strong> 按钮', '步骤2')}
        </div>
      </div>

      <!-- 准备步骤3：选择协议和格式 -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">3</div>
          <div class="step-title">选择协议、授权方式和复制格式</div>
        </div>
        <div class="step-body">
          <p>在弹出的 <strong>"批量查看 / 导出"</strong> 窗口中，按以下步骤操作：</p>
          <ol>
            <li><strong>选择协议</strong>：顶部选择 <strong>HTTP</strong> 或 <strong>SOCKS5</strong>（根据 MoreLogin 中要配置的代理类型选择）</li>
            <li><strong>查看模式</strong>：左侧选择 <strong>"列表文本"</strong></li>
            <li><strong>授权方式</strong>：选择 <strong>"密码模式"</strong>（推荐，MoreLogin 支持账密认证）</li>
            <li><strong>复制格式</strong>：选择 <strong>"纯文本格式"</strong>（格式为 <code>IP:Port:User:Pass</code>）</li>
            <li>点击底部 <strong>"📋 一键复制"</strong> 按钮，将代理列表复制到剪贴板</li>
          </ol>
          ${realScreenshot(clientImgBase + '/export-modal-listtext.png', '在批量导出窗口中：选择 <strong>HTTP</strong> 或 <strong>SOCKS5</strong> 协议 → <strong>列表文本</strong> → <strong>密码模式</strong> → <strong>纯文本格式</strong>，右侧显示代理列表', '步骤2')}

          <div class="info-box warning">
            <strong>⚠️ 重要提示：</strong><br>
            • MoreLogin 中的 <strong>"Socks5"</strong> 对应量子代理中的 <strong>SOCKS5</strong> 协议<br>
            • 如果选择 <strong>HTTP</strong> 协议，则在 MoreLogin 中 Proxy type 选择 <strong>"HTTP"</strong><br>
            • MoreLogin 还支持 <strong>HTTPS</strong> 和 <strong>Socks4</strong> 协议<br>
            • 请确保两端协议一致，否则代理将无法连接
          </div>
        </div>
      </div>

      <!-- 准备步骤4：理解代理格式 -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">4</div>
          <div class="step-title">理解提取的代理格式</div>
        </div>
        <div class="step-body">
          <p>复制后的代理信息格式如下，每行一条代理：</p>

          <table class="format-table">
            <thead>
              <tr>
                <th>格式类型</th>
                <th>HTTP 示例</th>
                <th>SOCKS5 示例</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>纯文本（密码模式）</strong><br><span style="color:#1a73e8;font-size:11px;">推荐 ✓</span></td>
                <td><code>192.168.1.101:10000:user_123:pass_xyz</code></td>
                <td><code>192.168.1.101:10000:user_123:pass_xyz</code></td>
              </tr>
              <tr>
                <td><strong>纯文本（白名单模式）</strong></td>
                <td><code>192.168.1.101:10000</code></td>
                <td><code>192.168.1.101:10000</code></td>
              </tr>
              <tr>
                <td><strong>标准URL（密码模式）</strong></td>
                <td><code>http://user_123:pass_xyz@192.168.1.101:10000</code></td>
                <td><code>socks5://user_123:pass_xyz@192.168.1.101:10000</code></td>
              </tr>
              <tr>
                <td><strong>标准URL（白名单模式）</strong></td>
                <td><code>http://192.168.1.101:10000</code></td>
                <td><code>socks5://192.168.1.101:10000</code></td>
              </tr>
            </tbody>
          </table>

          <div class="info-box">
            <strong>📝 字段说明（纯文本格式 <code>IP:Port:User:Pass</code>）：</strong><br>
            <table class="format-table" style="margin-top:8px;">
              <thead>
                <tr><th>字段</th><th>含义</th><th>MoreLogin 对应项</th><th>示例值</th></tr>
              </thead>
              <tbody>
                <tr><td><strong>IP</strong></td><td>代理服务器地址</td><td>Proxy server（左侧输入框）</td><td><code>102.129.224.117</code></td></tr>
                <tr><td><strong>Port</strong></td><td>代理端口号</td><td>Proxy server（右侧端口框）</td><td><code>14422</code></td></tr>
                <tr><td><strong>User</strong></td><td>认证用户名</td><td>Proxy account</td><td><code>user1234</code></td></tr>
                <tr><td><strong>Pass</strong></td><td>认证密码</td><td>Proxy password</td><td><code>pass_xyz</code></td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- ═══════ 第一部分：MoreLogin 配置步骤 ═══════ -->
      <h3>🔧 第一部分：MoreLogin 代理配置步骤</h3>

      <!-- 步骤1：打开 MoreLogin -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">1</div>
          <div class="step-title">打开 MoreLogin 指纹浏览器</div>
        </div>
        <div class="step-body">
          <p>打开安装好的 <strong>MoreLogin 指纹浏览器</strong> 客户端，登录后进入 <strong>Browser Profile</strong>（浏览器配置文件）主界面。左侧导航栏可以看到 <strong>Browser Profile</strong>、<strong>Proxy Service</strong>、<strong>Recycle Bin</strong>、<strong>Extension</strong>、<strong>Team</strong> 等功能模块。</p>
          ${realScreenshot(imgBase + '/ml-img14.png', '打开 MoreLogin 指纹浏览器，进入 <strong>Browser Profile</strong> 主界面', '步骤1')}
        </div>
      </div>

      <!-- 步骤2：点击 New profile → Advanced create -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">2</div>
          <div class="step-title">点击"New profile"，选择"Advanced create"</div>
        </div>
        <div class="step-body">
          <p>点击左上角 <strong>"+ New profile"</strong> 按钮，在弹出的创建页面中选择 <strong>"Advanced create"</strong>（高级创建）选项卡。在 <strong>"Basic information"</strong>（基本信息）区域中：</p>
          <ul>
            <li>填写 <strong>Browser profile name</strong>（浏览器配置文件名称）</li>
            <li>选择 <strong>Browser</strong>（浏览器内核）：Chrome 或 Firefox</li>
            <li>选择 <strong>Operating system</strong>（操作系统）：Windows / macOS / Android / iOS</li>
            <li>可选开启 <strong>Canvas fingerprint technology innovation</strong>（Canvas 指纹技术创新）</li>
          </ul>
          ${realScreenshot(imgBase + '/ml-img15.png', '点击 <strong>"+ New profile"</strong> → 选择 <strong>"Advanced create"</strong>，填写基本信息', '步骤2')}
        </div>
      </div>

      <!-- 步骤3：切换到 Proxy settings 选项卡 -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">3</div>
          <div class="step-title">切换到"Proxy settings"，选择代理类型并填写代理信息</div>
        </div>
        <div class="step-body">
          <p>在创建页面顶部，点击 <strong>"Proxy settings"</strong>（代理设置）选项卡，然后选择 <strong>"Custom"</strong>（自定义）模式，按以下步骤配置：</p>
          <ol>
            <li><strong>Proxy type</strong>（代理类型）：在下拉菜单中选择 <strong>"Socks5"</strong> 或 <strong>"HTTP"</strong>（根据从量子代理客户端提取的协议类型选择）</li>
            <li><strong>Proxy server</strong>（代理服务器）：左侧输入框填入代理 <strong>IP 地址</strong>，右侧输入框填入 <strong>端口号</strong></li>
            <li><strong>Proxy account</strong>（代理账号）：填入从量子代理客户端获取的 <strong>用户名</strong></li>
            <li><strong>Proxy password</strong>（代理密码）：填入从量子代理客户端获取的 <strong>密码</strong></li>
          </ol>
          ${realScreenshot(imgBase + '/ml-img16.png', '在 <strong>"Proxy settings"</strong> 选项卡中，选择 <strong>Socks5</strong> 代理类型，填写 IP、端口、账号和密码', '步骤3')}

          <div class="info-box">
            <strong>💡 提示：</strong>MoreLogin 还提供 <strong>"Use existing proxy"</strong>（使用已有代理）和 <strong>"Purchase proxy"</strong>（购买代理）选项。使用量子代理时，请选择 <strong>"Custom"</strong>（自定义）模式手动填写代理信息。
          </div>
        </div>
      </div>

      <!-- 步骤4：代理检测 -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">4</div>
          <div class="step-title">点击"proxy detection"检测代理连通性</div>
        </div>
        <div class="step-body">
          <p>代理信息填写完成后，向下滚动页面，找到 <strong>"proxy detection"</strong>（代理检测）按钮并点击。如果代理连接成功，会在按钮右侧显示绿色 ✅ 标识和检测结果：</p>
          <ul>
            <li><strong>Pass detection!</strong>（检测通过）</li>
            <li><strong>Export IP</strong>：显示代理的出口 IP 地址</li>
            <li><strong>Location</strong>：显示 IP 所在的国家/地区</li>
          </ul>
          ${realScreenshot(imgBase + '/ml-img17.png', '点击 <strong>"proxy detection"</strong> 按钮，显示 <strong>Pass detection!</strong> 和出口 IP 信息，代理连接成功', '步骤4')}

          <div class="info-box success">
            <strong>✅ 代理验证成功标志：</strong><br>
            • 显示 <strong>"Pass detection!"</strong> 绿色提示<br>
            • 显示 <strong>Export IP</strong> 地址（如 23.26.241.155）和 <strong>Location</strong>（如 US/California）<br>
            • 说明代理 IP、端口、账号、密码均填写正确，代理连接正常
          </div>
        </div>
      </div>

      <!-- 步骤5：保存并启动浏览器 -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">5</div>
          <div class="step-title">点击"OK"保存，然后在浏览器列表中"Start"启动</div>
        </div>
        <div class="step-body">
          <p>代理检测通过后，点击底部的 <strong>"OK"</strong> 按钮保存配置。保存成功后，返回 <strong>"Browser Profile"</strong> 列表界面，可以看到刚刚创建的浏览器配置文件，状态为 <strong>"ready"</strong>（就绪），右侧显示代理信息（如 <code>socks5://102.129.224.1...</code>）。点击 <strong>"Start"</strong> 按钮即可启动浏览器。</p>
          ${realScreenshot(imgBase + '/ml-img18.png', '在 <strong>Browser Profile</strong> 列表中，点击 <strong>"Start"</strong> 按钮启动浏览器', '步骤5')}
        </div>
      </div>

      <!-- ═══════ 第二部分：验证代理 ═══════ -->
      <h3>✅ 第二部分：验证代理是否生效</h3>
      <p>浏览器启动后，访问以下网站验证 IP 是否已切换：</p>
      <ul>
        <li><strong>whoer.net</strong> — 查看当前 IP、地理位置和匿名性</li>
        <li><strong>ipinfo.io</strong> — 查看 IP 详细信息</li>
        <li><strong>browserleaks.com</strong> — 检查浏览器指纹信息</li>
      </ul>

      ${realScreenshot(imgBase + '/ml-img19.png', '打开 <strong>whoer.net</strong> 验证 IP 地址，显示的 IP（23.26.241.155）与代理检测结果一致，说明代理配置成功！', '验证1')}

      <p>也可以打开当前页面的 <strong>Services → Whois</strong>，输入查询到的 IP 进行查询：</p>
      ${realScreenshot(imgBase + '/ml-img20.png', '打开 <strong>Services → Whois</strong> 服务，输入代理 IP 进行查询', '验证2')}

      <p>查询结果可以看到当前 IP 的详细地理位置信息：</p>
      ${realScreenshot(imgBase + '/ml-img21.png', '查询结果显示 IP 地址 <strong>23.26.241.155</strong>，位于 <strong>United States (US) / Texas / Baytown</strong>，确认代理已生效', '验证3')}

      <div class="info-box success">
        <strong>🎉 配置完成！</strong>如上图所示，whoer.net 显示的 IP 地址与代理检测的出口 IP 一致，说明代理已成功生效。您现在可以安全地进行多账号操作了。
      </div>

      <!-- 常见问题 -->
      <h3>❓ 常见问题</h3>
      <div class="step-card">
        <h4>Q: MoreLogin 的 Proxy type 选择哪个？</h4>
        <p>MoreLogin 支持 <strong>HTTP</strong>、<strong>HTTPS</strong>、<strong>Socks4</strong>、<strong>Socks5</strong> 四种代理协议。根据您从量子代理客户端提取的代理协议进行选择。<br>
        一般推荐优先使用 <strong>Socks5</strong>，兼容性更好，支持所有类型的网络流量。</p>
      </div>
      <div class="step-card">
        <h4>Q: Quick create 和 Advanced create 有什么区别？</h4>
        <p><strong>Quick create</strong>（快速创建）适合快速创建浏览器配置，使用默认设置；<strong>Advanced create</strong>（高级创建）提供更多自定义选项，包括详细的代理设置、指纹配置、账户信息等。<br>
        配置量子代理时，建议使用 <strong>Advanced create</strong> 模式，以便精确配置代理参数。</p>
      </div>
      <div class="step-card">
        <h4>Q: proxy detection 检测失败怎么办？</h4>
        <ul>
          <li>检查代理信息是否填写正确（Proxy server IP 和端口、Proxy account、Proxy password）</li>
          <li>确认 Proxy type 选择正确（HTTP / Socks5），需与量子代理客户端提取的协议一致</li>
          <li>检查代理是否已过期或流量已用完</li>
          <li>尝试更换其他代理节点</li>
        </ul>
      </div>
      <div class="step-card">
        <h4>Q: MoreLogin 支持批量导入浏览器配置吗？</h4>
        <p>是的，MoreLogin 支持 <strong>"Bulk import"</strong>（批量导入）功能。在创建页面顶部选择 <strong>"Bulk import"</strong> 选项卡，可以通过文本格式批量导入代理配置和浏览器配置文件。左侧导航栏也有 <strong>"Bulk import"</strong> 快捷入口。</p>
      </div>
      <div class="step-card">
        <h4>Q: 如何修改已有浏览器配置的代理设置？</h4>
        <p>在 MoreLogin 的 <strong>Browser Profile</strong> 列表中，找到需要修改的配置文件，点击右侧的 <strong>更多操作（⋮）</strong> 按钮，选择 <strong>"Edit"</strong>（编辑），重新进入配置页面修改代理设置，然后点击 <strong>"OK"</strong> 保存即可。</p>
      </div>
      <div class="step-card">
        <h4>Q: 代理测试无法连通怎么办？</h4>
        <p>HTTP(S) 和 SOCKS5 代理需要在 <strong>外网环境</strong> 下才能正常连通。请确认您当前的网络环境已具备外网访问能力（即能够正常访问境外网站），否则代理将无法建立连接。</p>
      </div>
    </div>`;
  }

  // ── MuLogin 专属详细教程（含真实截图） ──
  function getMuLoginCustomContent(browser) {
    const imgBase = 'assets/help-screenshots/mulogin';
    const clientImgBase = 'assets/help-screenshots/client';
    return `<div class="tutorial-content">
      <!-- 浏览器简介 -->
      <div class="info-box">
        <strong>📌 ${browser.fullName}</strong><br>
        ${browser.desc}<br>
        <strong>官网：</strong><a href="${browser.website}" target="_blank" style="color:#1a73e8;">${browser.website}</a>
      </div>

      <div class="info-box warning">
        <strong>⚠️ 重要提示：</strong>量子代理平台的所有代理产品均需要在 <strong>境外网络环境</strong> 下使用，境外网络环境由客户自行配置。本教程涉及的网络环境已实现境外环境配置。
      </div>

      <!-- ═══════ 前置准备：从量子代理客户端获取代理信息 ═══════ -->
      <h3>📋 前置准备：从量子代理客户端获取代理信息</h3>
      <p>在配置 MuLogin 浏览器之前，您需要先从 <strong>量子代理（ProxyManager）</strong> 客户端批量提取代理信息。以下是详细步骤：</p>

      <!-- 准备步骤1：进入我的订单 -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">1</div>
          <div class="step-title">进入"我的订单"页面</div>
        </div>
        <div class="step-body">
          <p>登录 <strong>量子代理客户端</strong>，在左侧导航栏点击 <strong>"我的订单"</strong>，进入订单列表页面。页面会显示您所有已购买的代理订单。</p>
          ${realScreenshot(clientImgBase + '/order-list.png', '在量子代理客户端左侧导航栏点击 <strong>"我的订单"</strong>，进入订单列表页面', '步骤1')}
        </div>
      </div>

      <!-- 准备步骤2：点击对应订单进入详情 -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">2</div>
          <div class="step-title">点击对应订单，进入订单详情页面</div>
        </div>
        <div class="step-body">
          <p>在订单列表中，找到您需要提取代理的订单（如图红框所示），<strong>鼠标点击该订单</strong> 即可进入订单详情页面。在订单详情页右上方，点击蓝色的 <strong>⚡ 批量提取代理</strong> 按钮。</p>
          ${realScreenshot(clientImgBase + '/order-detail.png', '点击对应订单进入详情页面后，点击右上角 <strong>⚡ 批量提取代理</strong> 按钮', '步骤2')}
        </div>
      </div>

      <!-- 准备步骤3：选择协议和格式 -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">3</div>
          <div class="step-title">选择协议、授权方式和复制格式</div>
        </div>
        <div class="step-body">
          <p>在弹出的 <strong>"批量查看 / 导出"</strong> 窗口中，按以下步骤操作：</p>
          <ol>
            <li><strong>选择协议</strong>：顶部选择 <strong>HTTP</strong> 或 <strong>SOCKS5</strong>（根据 MuLogin 中要配置的代理类型选择）</li>
            <li><strong>查看模式</strong>：左侧选择 <strong>"列表文本"</strong></li>
            <li><strong>授权方式</strong>：选择 <strong>"密码模式"</strong>（推荐，MuLogin 支持账密认证）</li>
            <li><strong>复制格式</strong>：选择 <strong>"纯文本格式"</strong>（格式为 <code>IP:Port:User:Pass</code>）</li>
            <li>点击底部 <strong>"📋 一键复制"</strong> 按钮，将代理列表复制到剪贴板</li>
          </ol>
          ${realScreenshot(clientImgBase + '/export-modal-listtext.png', '在批量导出窗口中：选择 <strong>HTTP</strong> 或 <strong>SOCKS5</strong> 协议 → <strong>列表文本</strong> → <strong>密码模式</strong> → <strong>纯文本格式</strong>，右侧显示代理列表', '步骤2')}

          <div class="info-box warning">
            <strong>⚠️ 重要提示：</strong><br>
            • MuLogin 中的 <strong>"SOCKS5"</strong> 对应量子代理中的 <strong>SOCKS5</strong> 协议<br>
            • 如果选择 <strong>HTTP</strong> 协议，则在 MuLogin 中代理设置选择 <strong>"HTTP"</strong><br>
            • MuLogin 还支持 <strong>SOCKS4</strong> 和 <strong>HTTPS</strong> 协议<br>
            • 请确保两端协议一致，否则代理将无法连接
          </div>
        </div>
      </div>

      <!-- 准备步骤4：理解代理格式 -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">4</div>
          <div class="step-title">理解提取的代理格式</div>
        </div>
        <div class="step-body">
          <p>复制后的代理信息格式如下，每行一条代理：</p>

          <table class="format-table">
            <thead>
              <tr>
                <th>格式类型</th>
                <th>HTTP 示例</th>
                <th>SOCKS5 示例</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>纯文本（密码模式）</strong><br><span style="color:#1a73e8;font-size:11px;">推荐 ✓</span></td>
                <td><code>192.168.1.101:10000:user_123:pass_xyz</code></td>
                <td><code>192.168.1.101:10000:user_123:pass_xyz</code></td>
              </tr>
              <tr>
                <td><strong>纯文本（白名单模式）</strong></td>
                <td><code>192.168.1.101:10000</code></td>
                <td><code>192.168.1.101:10000</code></td>
              </tr>
              <tr>
                <td><strong>标准URL（密码模式）</strong></td>
                <td><code>http://user_123:pass_xyz@192.168.1.101:10000</code></td>
                <td><code>socks5://user_123:pass_xyz@192.168.1.101:10000</code></td>
              </tr>
              <tr>
                <td><strong>标准URL（白名单模式）</strong></td>
                <td><code>http://192.168.1.101:10000</code></td>
                <td><code>socks5://192.168.1.101:10000</code></td>
              </tr>
            </tbody>
          </table>

          <div class="info-box">
            <strong>📝 字段说明（纯文本格式 <code>IP:Port:User:Pass</code>）：</strong><br>
            <table class="format-table" style="margin-top:8px;">
              <thead>
                <tr><th>字段</th><th>含义</th><th>MuLogin 对应项</th><th>示例值</th></tr>
              </thead>
              <tbody>
                <tr><td><strong>IP</strong></td><td>代理服务器地址</td><td>IP地址</td><td><code>172.107.115.185</code></td></tr>
                <tr><td><strong>Port</strong></td><td>代理端口号</td><td>端口</td><td><code>18014</code></td></tr>
                <tr><td><strong>User</strong></td><td>认证用户名</td><td>登录用户</td><td><code>user_123</code></td></tr>
                <tr><td><strong>Pass</strong></td><td>认证密码</td><td>登录密码</td><td><code>pass_xyz</code></td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- ═══════ 第一部分：MuLogin 配置步骤 ═══════ -->
      <h3>🔧 第一部分：MuLogin 代理配置步骤</h3>

      <!-- 步骤1：打开 MuLogin -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">1</div>
          <div class="step-title">打开 MuLogin 指纹浏览器</div>
        </div>
        <div class="step-body">
          <p>打开安装好的 <strong>MuLogin 指纹浏览器</strong> 客户端，登录后进入浏览器列表主界面。</p>
          ${realScreenshot(imgBase + '/mu-img14.png', '打开 MuLogin 指纹浏览器，进入浏览器列表主界面', '步骤1')}
        </div>
      </div>

      <!-- 步骤2：添加浏览器并填写名称 -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">2</div>
          <div class="step-title">点击"添加浏览器"，填写名称</div>
        </div>
        <div class="step-body">
          <p>点击左上角 <strong>"添加浏览器"</strong> 按钮，弹出添加浏览器窗口。在 <strong>"基本配置"</strong> 选项卡中，填写 <strong>"显示名称"</strong> 等基本信息。</p>
          ${realScreenshot(imgBase + '/mu-img15.png', '点击 <strong>"添加浏览器"</strong>，在基本配置中填写显示名称', '步骤2')}
        </div>
      </div>

      <!-- 步骤3：选择代理协议 -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">3</div>
          <div class="step-title">在基本配置中选择代理协议</div>
        </div>
        <div class="step-body">
          <p>在基本配置页面下方找到 <strong>"代理设置"</strong> 区域，点击代理设置下拉菜单，根据您从量子代理客户端提取的代理协议类型，选择对应的协议：</p>
          <ul>
            <li><strong>HTTP</strong> — 适用于 HTTP 代理</li>
            <li><strong>SOCKS5</strong> — 适用于 SOCKS5 代理（推荐）</li>
            <li>MuLogin 还支持 SOCKS4、HTTPS 等协议</li>
          </ul>
          ${realScreenshot(imgBase + '/mu-img16.png', '在代理设置下拉菜单中选择 <strong>SOCKS5</strong> 或 <strong>HTTP</strong> 协议', '步骤3')}

          <div class="info-box">
            <strong>💡 提示：</strong>MuLogin 支持 <strong>"按格式粘入代理"</strong> 功能（代理设置右侧的剪贴板图标），可以直接粘贴从量子代理客户端复制的代理信息，自动解析 IP、端口、用户名和密码。
          </div>
        </div>
      </div>

      <!-- 步骤4：填写代理信息并检查网络 -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">4</div>
          <div class="step-title">填写代理信息并检查网络连通性</div>
        </div>
        <div class="step-body">
          <p>选择好代理协议后，将从量子代理客户端获取的代理信息分别填入对应字段：</p>
          <ol>
            <li><strong>IP地址</strong>：填入代理服务器的 IP 地址</li>
            <li><strong>端口</strong>：填入代理端口号</li>
            <li><strong>登录用户</strong>：填入从量子代理客户端获取的代理用户名</li>
            <li><strong>登录密码</strong>：填入从量子代理客户端获取的代理密码</li>
          </ol>
          <p>填写完成后，点击 <strong>"检查网络"</strong> 按钮，检测代理 IP 的连通性。如果代理连接成功，会在下方显示 IP 信息和国家/地区。</p>
          ${realScreenshot(imgBase + '/mu-img17.png', '填写代理 IP、端口、用户名、密码后，点击 <strong>"检查网络"</strong> 检测连通性，显示连接成功', '步骤4')}

          <div class="info-box success">
            <strong>✅ 代理验证成功标志：</strong><br>
            • 检查网络后下方显示 IP 地址和 <strong>国家/地区</strong> 信息（如 VA / US / Sterling）<br>
            • 说明代理 IP、端口、用户名、密码均填写正确，代理连接正常
          </div>
        </div>
      </div>

      <!-- 步骤5：保存并打开浏览器 -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">5</div>
          <div class="step-title">点击"保存"，然后在浏览器列表中"打开"</div>
        </div>
        <div class="step-body">
          <p>代理检测通过后，点击底部的 <strong>"保存"</strong> 按钮保存配置。保存成功后，您可以在 <strong>"浏览器列表"</strong> 界面看到刚刚配置的窗口，点击 <strong>"打开"</strong> 按钮即可启动浏览器，开始使用量子代理访问网站。</p>
          ${realScreenshot(imgBase + '/mu-img18.png', '在浏览器列表中，点击 <strong>"打开"</strong> 按钮启动浏览器', '步骤5')}
        </div>
      </div>

      <!-- ═══════ 第二部分：验证代理 ═══════ -->
      <h3>✅ 第二部分：验证代理是否生效</h3>
      <p>浏览器启动后，访问以下网站验证 IP 是否已切换：</p>
      <ul>
        <li><strong>whoer.net</strong> — 查看当前 IP、地理位置和匿名性</li>
        <li><strong>ipinfo.io</strong> — 查看 IP 详细信息</li>
        <li><strong>browserleaks.com</strong> — 检查浏览器指纹信息</li>
      </ul>

      ${realScreenshot(imgBase + '/mu-img19.png', '打开 <strong>whoer.net</strong> 验证 IP 地址，显示的 IP 与代理 IP 一致，说明代理配置成功！', '验证1')}

      <p>也可以打开当前页面的 <strong>Services → Whois</strong>，输入查询到的 IP 进行查询：</p>
      ${realScreenshot(imgBase + '/mu-img20.png', '打开 Whois 服务，输入代理 IP 进行查询', '验证2')}

      <p>查询结果可以看到当前 IP 的地理位置信息：</p>
      ${realScreenshot(imgBase + '/mu-img21.png', '查询结果显示当前 IP 的地理位置信息，确认代理已生效', '验证3')}

      <div class="info-box success">
        <strong>🎉 配置完成！</strong>如上图所示，whoer.net 显示的 IP 地址与代理设备的 IP 一致，说明代理已成功生效。您现在可以安全地进行多账号操作了。
      </div>

      <!-- 常见问题 -->
      <h3>❓ 常见问题</h3>
      <div class="step-card">
        <h4>Q: MuLogin 的代理类型选择哪个？</h4>
        <p>MuLogin 支持 <strong>HTTP</strong>、<strong>SOCKS4</strong>、<strong>SOCKS5</strong>、<strong>HTTPS</strong> 四种代理协议。根据您从量子代理客户端提取的代理协议进行选择。<br>
        一般推荐优先使用 <strong>SOCKS5</strong>，兼容性更好，支持所有类型的网络流量。</p>
      </div>
      <div class="step-card">
        <h4>Q: 如何使用"按格式粘入代理"功能？</h4>
        <p>在代理设置区域，点击代理设置右侧的 <strong>📋 剪贴板图标</strong>，可以直接粘贴从量子代理客户端复制的代理信息。MuLogin 支持多种粘贴格式：<br>
        <code>IP:端口:用户名:密码</code><br>
        <code>socks5://用户名:密码@IP:端口</code><br>
        <code>http://用户名:密码@IP:端口</code></p>
      </div>
      <div class="step-card">
        <h4>Q: 检查网络失败怎么办？</h4>
        <ul>
          <li>检查代理信息是否填写正确（IP地址、端口、登录用户、登录密码）</li>
          <li>确认代理协议类型选择正确（HTTP / SOCKS5）</li>
          <li>检查代理是否已过期或流量已用完</li>
          <li>尝试更换其他代理节点</li>
        </ul>
      </div>
      <div class="step-card">
        <h4>Q: MuLogin 支持批量添加浏览器吗？</h4>
        <p>是的，MuLogin 支持通过 <strong>"批量添加"</strong> 功能批量创建浏览器配置。在浏览器列表页面点击 <strong>"批量添加"</strong> 按钮，可以通过文本格式批量导入代理配置。同时也支持 <strong>"批量导入 cookie"</strong> 功能。</p>
      </div>
      <div class="step-card">
        <h4>Q: 如何修改已有浏览器的代理设置？</h4>
        <p>在 MuLogin 浏览器列表中，找到需要修改的浏览器，点击右侧的 <strong>编辑按钮（✏️）</strong>，重新进入配置页面修改代理设置，然后点击 <strong>"保存"</strong> 即可。</p>
      </div>
      <div class="step-card">
        <h4>Q: 代理测试无法连通怎么办？</h4>
        <p>HTTP(S) 和 SOCKS5 代理需要在 <strong>外网环境</strong> 下才能正常连通。请确认您当前的网络环境已具备外网访问能力（即能够正常访问境外网站），否则代理将无法建立连接。</p>
      </div>
    </div>`;
  }

  // ── HubStudio 专属详细教程（含真实截图） ──
  function getHubStudioCustomContent(browser) {
    const imgBase = 'assets/help-screenshots/hubstudio';
    const clientImgBase = 'assets/help-screenshots/client';
    return `<div class="tutorial-content">
      <!-- 浏览器简介 -->
      <div class="info-box">
        <strong>📌 ${browser.fullName}</strong><br>
        ${browser.desc}<br>
        <strong>官网：</strong><a href="${browser.website}" target="_blank" style="color:#1a73e8;">${browser.website}</a>
      </div>

      <div class="info-box warning">
        <strong>⚠️ 重要提示：</strong>量子代理平台的所有代理产品均需要在 <strong>境外网络环境</strong> 下使用，境外网络环境由客户自行配置。本教程涉及的网络环境已实现境外环境配置。
      </div>

      <!-- ═══════ 前置准备：从量子代理客户端获取代理信息 ═══════ -->
      <h3>📋 前置准备：从量子代理客户端获取代理信息</h3>
      <p>在配置 HubStudio 浏览器之前，您需要先从 <strong>量子代理（ProxyManager）</strong> 客户端批量提取代理信息。以下是详细步骤：</p>

      <!-- 准备步骤1：进入我的订单 -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">1</div>
          <div class="step-title">进入"我的订单"页面</div>
        </div>
        <div class="step-body">
          <p>登录 <strong>量子代理客户端</strong>，在左侧导航栏点击 <strong>"我的订单"</strong>，进入订单列表页面。页面会显示您所有已购买的代理订单。</p>
          ${realScreenshot(clientImgBase + '/order-list.png', '在量子代理客户端左侧导航栏点击 <strong>"我的订单"</strong>，进入订单列表页面', '步骤1')}
        </div>
      </div>

      <!-- 准备步骤2：点击对应订单进入详情 -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">2</div>
          <div class="step-title">点击对应订单，进入订单详情页面</div>
        </div>
        <div class="step-body">
          <p>在订单列表中，找到您需要提取代理的订单（如图红框所示），<strong>鼠标点击该订单</strong> 即可进入订单详情页面。在订单详情页右上方，点击蓝色的 <strong>⚡ 批量提取代理</strong> 按钮。</p>
          ${realScreenshot(clientImgBase + '/order-detail.png', '点击对应订单进入详情页面后，点击右上角 <strong>⚡ 批量提取代理</strong> 按钮', '步骤2')}
        </div>
      </div>

      <!-- 准备步骤3：选择协议和格式 -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">3</div>
          <div class="step-title">选择协议、授权方式和复制格式</div>
        </div>
        <div class="step-body">
          <p>在弹出的 <strong>"批量查看 / 导出"</strong> 窗口中，按以下步骤操作：</p>
          <ol>
            <li><strong>选择协议</strong>：顶部选择 <strong>HTTP</strong> 或 <strong>SOCKS5</strong>（根据 HubStudio 中要配置的代理类型选择）</li>
            <li><strong>查看模式</strong>：左侧选择 <strong>"列表文本"</strong></li>
            <li><strong>授权方式</strong>：选择 <strong>"密码模式"</strong>（推荐，HubStudio 支持账密认证）</li>
            <li><strong>复制格式</strong>：选择 <strong>"纯文本格式"</strong>（格式为 <code>IP:Port:User:Pass</code>）</li>
            <li>点击底部 <strong>"📋 一键复制"</strong> 按钮，将代理列表复制到剪贴板</li>
          </ol>
          ${realScreenshot(clientImgBase + '/export-modal-listtext.png', '在批量导出窗口中：选择 <strong>HTTP</strong> 或 <strong>SOCKS5</strong> 协议 → <strong>列表文本</strong> → <strong>密码模式</strong> → <strong>纯文本格式</strong>，右侧显示代理列表', '步骤2')}

          <div class="info-box warning">
            <strong>⚠️ 重要提示：</strong><br>
            • HubStudio 中的 <strong>"Socks5"</strong> 对应量子代理中的 <strong>SOCKS5</strong> 协议<br>
            • 如果选择 <strong>HTTP</strong> 协议，则在 HubStudio 中代理类型选择 <strong>"HTTP"</strong><br>
            • 请确保两端协议一致，否则代理将无法连接
          </div>
        </div>
      </div>

      <!-- 准备步骤4：理解代理格式 -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">4</div>
          <div class="step-title">理解提取的代理格式</div>
        </div>
        <div class="step-body">
          <p>复制后的代理信息格式如下，每行一条代理：</p>

          <table class="format-table">
            <thead>
              <tr>
                <th>格式类型</th>
                <th>HTTP 示例</th>
                <th>SOCKS5 示例</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>纯文本（密码模式）</strong><br><span style="color:#1a73e8;font-size:11px;">推荐 ✓</span></td>
                <td><code>192.168.1.101:10000:user_123:pass_xyz</code></td>
                <td><code>192.168.1.101:10000:user_123:pass_xyz</code></td>
              </tr>
              <tr>
                <td><strong>纯文本（白名单模式）</strong></td>
                <td><code>192.168.1.101:10000</code></td>
                <td><code>192.168.1.101:10000</code></td>
              </tr>
              <tr>
                <td><strong>标准URL（密码模式）</strong></td>
                <td><code>http://user_123:pass_xyz@192.168.1.101:10000</code></td>
                <td><code>socks5://user_123:pass_xyz@192.168.1.101:10000</code></td>
              </tr>
              <tr>
                <td><strong>标准URL（白名单模式）</strong></td>
                <td><code>http://192.168.1.101:10000</code></td>
                <td><code>socks5://192.168.1.101:10000</code></td>
              </tr>
            </tbody>
          </table>

          <div class="info-box">
            <strong>📝 字段说明（纯文本格式 <code>IP:Port:User:Pass</code>）：</strong><br>
            <table class="format-table" style="margin-top:8px;">
              <thead>
                <tr><th>字段</th><th>含义</th><th>HubStudio 对应项</th><th>示例值</th></tr>
              </thead>
              <tbody>
                <tr><td><strong>IP</strong></td><td>代理服务器地址</td><td>代理主机</td><td><code>172.107.115.185</code></td></tr>
                <tr><td><strong>Port</strong></td><td>代理端口号</td><td>代理端口</td><td><code>18014</code></td></tr>
                <tr><td><strong>User</strong></td><td>认证用户名</td><td>代理帐号</td><td><code>user_123</code></td></tr>
                <tr><td><strong>Pass</strong></td><td>认证密码</td><td>代理密码</td><td><code>pass_xyz</code></td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- ═══════ 第一部分：HubStudio 配置步骤 ═══════ -->
      <h3>🔧 第一部分：HubStudio 代理配置步骤</h3>

      <!-- 步骤1：打开 HubStudio 官网注册下载 -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">1</div>
          <div class="step-title">打开 HubStudio 官网，注册并下载客户端</div>
        </div>
        <div class="step-body">
          <p>打开 <strong>HubStudio 官网</strong> <a href="https://www.hubstudio.cn" target="_blank" style="color:#1a73e8;">https://www.hubstudio.cn</a>，注册账号并下载安装 HubStudio 客户端。</p>
          ${realScreenshot(imgBase + '/hub-img14.png', '打开 HubStudio 官网，点击 <strong>"免费注册"</strong> 注册账号并下载客户端', '步骤1')}
        </div>
      </div>

      <!-- 步骤2：打开 HubStudio 客户端 -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">2</div>
          <div class="step-title">打开 HubStudio 防关联指纹浏览器</div>
        </div>
        <div class="step-body">
          <p>安装完成后，打开 <strong>HubStudio 防关联指纹浏览器</strong> 客户端，登录后进入环境管理主界面。</p>
          ${realScreenshot(imgBase + '/hub-img15.png', '打开 HubStudio 客户端，进入环境管理主界面', '步骤2')}
        </div>
      </div>

      <!-- 步骤3：新建环境并配置代理 -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">3</div>
          <div class="step-title">点击"新建环境"，配置代理信息</div>
        </div>
        <div class="step-body">
          <p>点击左上角 <strong>"+ 新建环境"</strong> 按钮，弹出设置环境界面。在界面中进行以下配置：</p>
          <ol>
            <li><strong>设置环境</strong>：填写环境名称等基本信息</li>
            <li><strong>设置代理</strong>：在下方 <strong>"设置代理"</strong> 区域进行代理配置</li>
            <li><strong>代理类型</strong>：选择 <strong>"Socks5"</strong> 或 <strong>"HTTP"</strong>（根据您从量子代理客户端提取的代理协议选择）</li>
          </ol>
          ${realScreenshot(imgBase + '/hub-img16.png', '点击 <strong>"新建环境"</strong>，在设置代理区域选择代理类型为 <strong>Socks5</strong> 或 <strong>HTTP</strong>', '步骤3')}

          <div class="info-box">
            <strong>💡 HubStudio 支持的代理类型：</strong><br>
            • <strong>Socks5</strong> — 支持所有类型的网络流量（TCP/UDP），推荐优先使用<br>
            • <strong>HTTP</strong> — 适用于 HTTP 网页浏览<br>
            • HubStudio 还支持 <strong>按粘性IP规则使用</strong> 等高级使用方式
          </div>
        </div>
      </div>

      <!-- 步骤4：填入代理信息 -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">4</div>
          <div class="step-title">填入代理主机、端口、帐号和密码</div>
        </div>
        <div class="step-body">
          <p>将从量子代理客户端获取的代理信息分别填入对应字段：</p>
          <ol>
            <li><strong>代理主机</strong>：填入代理服务器的 IP 地址（如 <code>172.107.115.185</code>）</li>
            <li><strong>代理端口</strong>：填入代理端口号（如 <code>18014</code>）</li>
            <li><strong>代理帐号</strong>：填入从量子代理客户端获取的代理用户名</li>
            <li><strong>代理密码</strong>：填入从量子代理客户端获取的代理密码</li>
          </ol>
          ${realScreenshot(imgBase + '/hub-img18.png', '在代理主机、代理端口、代理帐号、代理密码输入框中分别填入从量子代理客户端获取的代理信息', '步骤4')}

          <div class="info-box">
            <strong>💡 提示：</strong>HubStudio 支持通过 <strong>"主机:端口:帐号:密码"</strong> 格式粘贴代理信息，与量子代理客户端导出的纯文本格式完全一致，可直接粘贴到代理主机输入框中自动解析。
          </div>
        </div>
      </div>

      <!-- 步骤5：检查代理 -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">5</div>
          <div class="step-title">点击"检查代理"验证连通性</div>
        </div>
        <div class="step-body">
          <p>所有代理信息填写完成后，点击 <strong>"检查代理"</strong> 按钮验证代理连接是否正常。如果代理连接成功，会显示连通成功的提示信息。</p>

          <div class="info-box success">
            <strong>✅ 代理验证成功标志：</strong><br>
            • 检查代理后显示连通成功<br>
            • 说明代理 IP、端口、帐号、密码均填写正确，代理连接正常
          </div>
        </div>
      </div>

      <!-- 步骤6：点击完成保存环境 -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">6</div>
          <div class="step-title">点击"完成"保存环境配置</div>
        </div>
        <div class="step-body">
          <p>代理验证通过后，点击右上角的 <strong>"完成"</strong> 按钮，保存环境配置。环境新建完成。</p>
          ${realScreenshot(imgBase + '/hub-img18.png', '所有代理信息填写完成后，点击右上角 <strong>"完成"</strong> 按钮保存环境配置', '步骤6')}
        </div>
      </div>

      <!-- 步骤7：打开环境 -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">7</div>
          <div class="step-title">回到环境列表，点击"打开"启动浏览器</div>
        </div>
        <div class="step-body">
          <p>保存完成后，回到 HubStudio 首页环境列表中，找到刚刚创建的环境，点击右侧的 <strong>"打开"</strong> 按钮启动浏览器环境。</p>
          ${realScreenshot(imgBase + '/hub-img19.png', '在环境列表中，点击右侧 <strong>"打开"</strong> 按钮启动浏览器环境', '步骤7')}
        </div>
      </div>

      <!-- ═══════ 第二部分：验证代理 ═══════ -->
      <h3>✅ 第二部分：验证代理是否生效</h3>
      <p>浏览器启动后，访问以下网站验证 IP 是否已切换：</p>
      <ul>
        <li><strong>whoer.net</strong> — 查看当前 IP、地理位置和匿名性</li>
        <li><strong>ipinfo.io</strong> — 查看 IP 详细信息</li>
        <li><strong>browserleaks.com</strong> — 检查浏览器指纹信息</li>
      </ul>

      ${realScreenshot(imgBase + '/hub-img20.png', '打开 <strong>whoer.net</strong> 验证 IP 地址，显示的 IP 与代理 IP 一致，说明代理配置成功！', '验证1')}

      <p>也可以打开当前页面的 <strong>Services → Whois</strong>，输入查询到的 IP 进行查询：</p>
      ${realScreenshot(imgBase + '/hub-img21.png', '打开 Whois 服务，输入代理 IP 进行查询', '验证2')}

      <p>查询结果可以看到当前 IP 的地理位置信息：</p>
      ${realScreenshot(imgBase + '/hub-img22.png', '查询结果显示当前 IP 的地理位置信息，确认代理已生效', '验证3')}

      <div class="info-box success">
        <strong>🎉 配置完成！</strong>如上图所示，whoer.net 显示的 IP 地址与代理设备的 IP 一致，说明代理已成功生效。您现在可以安全地进行多账号操作了。
      </div>

      <!-- 常见问题 -->
      <h3>❓ 常见问题</h3>
      <div class="step-card">
        <h4>Q: HubStudio 的代理类型选择 "HTTP" 还是 "Socks5"？</h4>
        <p>HubStudio 支持 <strong>HTTP</strong> 和 <strong>Socks5</strong> 两种代理协议。根据您从量子代理客户端提取的代理协议进行选择。<br>
        一般推荐优先使用 <strong>Socks5</strong>，兼容性更好，支持所有类型的网络流量。</p>
      </div>
      <div class="step-card">
        <h4>Q: 代理检查失败怎么办？</h4>
        <ul>
          <li>检查代理信息是否填写正确（代理主机、代理端口、代理帐号、代理密码）</li>
          <li>确认代理协议类型选择正确（HTTP / Socks5）</li>
          <li>检查代理是否已过期或流量已用完</li>
          <li>尝试更换其他代理节点</li>
        </ul>
      </div>
      <div class="step-card">
        <h4>Q: HubStudio 支持批量导入代理吗？</h4>
        <p>HubStudio 支持通过 <strong>"批量导入"</strong> 功能批量创建环境。在环境列表页面点击 <strong>"批量导入"</strong> 按钮，可以通过 Excel 或文本格式批量导入代理配置。<br>
        同时，HubStudio 的代理主机输入框支持 <strong>"主机:端口:帐号:密码"</strong> 格式粘贴，与量子代理客户端导出的纯文本格式完全一致。</p>
      </div>
      <div class="step-card">
        <h4>Q: 如何修改已有环境的代理设置？</h4>
        <p>在 HubStudio 环境列表中，找到需要修改的环境，点击环境名称或编辑按钮进入环境设置页面，在 <strong>"设置代理"</strong> 区域重新修改代理信息，然后点击 <strong>"完成"</strong> 保存即可。</p>
      </div>
      <div class="step-card">
        <h4>Q: 代理测试无法连通怎么办？</h4>
        <p>HTTP(S) 和 SOCKS5 代理需要在 <strong>外网环境</strong> 下才能正常连通。请确认您当前的网络环境已具备外网访问能力（即能够正常访问境外网站），否则代理将无法建立连接。</p>
      </div>
    </div>`;
  }

  // ── VMLogin 专属详细教程（含真实截图） ──
  function getVMLoginCustomContent(browser) {
    const imgBase = 'assets/help-screenshots/vmlogin';
    const clientImgBase = 'assets/help-screenshots/client';
    return `<div class="tutorial-content">
      <!-- 浏览器简介 -->
      <div class="info-box">
        <strong>📌 ${browser.fullName}</strong><br>
        ${browser.desc}<br>
        <strong>官网：</strong><a href="${browser.website}" target="_blank" style="color:#1a73e8;">${browser.website}</a>
      </div>

      <div class="info-box warning">
        <strong>⚠️ 重要提示：</strong>量子代理平台的所有代理产品均需要在 <strong>境外网络环境</strong> 下使用，境外网络环境由客户自行配置。本教程涉及的网络环境已实现境外环境配置。
      </div>

      <!-- ═══════ 前置准备：从量子代理客户端获取代理信息 ═══════ -->
      <h3>📋 前置准备：从量子代理客户端获取代理信息</h3>
      <p>在配置 VMLogin 浏览器之前，您需要先从 <strong>量子代理（ProxyManager）</strong> 客户端批量提取代理信息。以下是详细步骤：</p>

      <!-- 准备步骤1：进入我的订单 -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">1</div>
          <div class="step-title">进入"我的订单"页面</div>
        </div>
        <div class="step-body">
          <p>登录 <strong>量子代理客户端</strong>，在左侧导航栏点击 <strong>"我的订单"</strong>，进入订单列表页面。页面会显示您所有已购买的代理订单。</p>
          ${realScreenshot(clientImgBase + '/order-list.png', '在量子代理客户端左侧导航栏点击 <strong>"我的订单"</strong>，进入订单列表页面', '步骤1')}
        </div>
      </div>

      <!-- 准备步骤2：点击对应订单进入详情 -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">2</div>
          <div class="step-title">点击对应订单，进入订单详情页面</div>
        </div>
        <div class="step-body">
          <p>在订单列表中，找到您需要提取代理的订单（如图红框所示），<strong>鼠标点击该订单</strong> 即可进入订单详情页面。在订单详情页右上方，点击蓝色的 <strong>⚡ 批量提取代理</strong> 按钮。</p>
          ${realScreenshot(clientImgBase + '/order-detail.png', '点击对应订单进入详情页面后，点击右上角 <strong>⚡ 批量提取代理</strong> 按钮', '步骤2')}
        </div>
      </div>

      <!-- 准备步骤3：选择协议和格式 -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">3</div>
          <div class="step-title">选择协议、授权方式和复制格式</div>
        </div>
        <div class="step-body">
          <p>在弹出的 <strong>"批量查看 / 导出"</strong> 窗口中，按以下步骤操作：</p>
          <ol>
            <li><strong>选择协议</strong>：顶部选择 <strong>HTTP</strong> 或 <strong>SOCKS5</strong>（根据 VMLogin 中要配置的代理类型选择）</li>
            <li><strong>查看模式</strong>：左侧选择 <strong>"列表文本"</strong></li>
            <li><strong>授权方式</strong>：选择 <strong>"密码模式"</strong>（推荐，VMLogin 支持账密认证）</li>
            <li><strong>复制格式</strong>：选择 <strong>"纯文本格式"</strong>（格式为 <code>IP:Port:User:Pass</code>）</li>
            <li>点击底部 <strong>"📋 一键复制"</strong> 按钮，将代理列表复制到剪贴板</li>
          </ol>
          ${realScreenshot(clientImgBase + '/export-modal-listtext.png', '在批量导出窗口中：选择 <strong>HTTP</strong> 协议 → <strong>列表文本</strong> → <strong>密码模式</strong> → <strong>纯文本格式</strong>，右侧显示代理列表', '步骤2')}

          <div class="info-box warning">
            <strong>⚠️ 重要提示：</strong><br>
            • VMLogin 中的 <strong>"SOCKS5"</strong> 对应量子代理中的 <strong>SOCKS5</strong> 协议<br>
            • 如果选择 <strong>HTTP</strong> 协议，则在 VMLogin 中代理类型选择 <strong>"HTTP"</strong><br>
            • 请确保两端协议一致，否则代理将无法连接
          </div>
        </div>
      </div>

      <!-- 准备步骤4：理解代理格式 -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">4</div>
          <div class="step-title">理解提取的代理格式</div>
        </div>
        <div class="step-body">
          <p>复制后的代理信息格式如下，每行一条代理：</p>

          <table class="format-table">
            <thead>
              <tr>
                <th>格式类型</th>
                <th>HTTP 示例</th>
                <th>SOCKS5 示例</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>纯文本（密码模式）</strong><br><span style="color:#1a73e8;font-size:11px;">推荐 ✓</span></td>
                <td><code>192.168.1.101:10000:user_123:pass_xyz</code></td>
                <td><code>192.168.1.101:10000:user_123:pass_xyz</code></td>
              </tr>
              <tr>
                <td><strong>纯文本（白名单模式）</strong></td>
                <td><code>192.168.1.101:10000</code></td>
                <td><code>192.168.1.101:10000</code></td>
              </tr>
              <tr>
                <td><strong>标准URL（密码模式）</strong></td>
                <td><code>http://user_123:pass_xyz@192.168.1.101:10000</code></td>
                <td><code>socks5://user_123:pass_xyz@192.168.1.101:10000</code></td>
              </tr>
              <tr>
                <td><strong>标准URL（白名单模式）</strong></td>
                <td><code>http://192.168.1.101:10000</code></td>
                <td><code>socks5://192.168.1.101:10000</code></td>
              </tr>
            </tbody>
          </table>

          <div class="info-box">
            <strong>📝 字段说明（纯文本格式 <code>IP:Port:User:Pass</code>）：</strong><br>
            <table class="format-table" style="margin-top:8px;">
              <thead>
                <tr><th>字段</th><th>含义</th><th>VMLogin 对应项</th><th>示例值</th></tr>
              </thead>
              <tbody>
                <tr><td><strong>IP</strong></td><td>代理服务器地址</td><td>IP地址</td><td><code>192.168.1.101</code></td></tr>
                <tr><td><strong>Port</strong></td><td>代理端口号</td><td>端口</td><td><code>10000</code></td></tr>
                <tr><td><strong>User</strong></td><td>认证用户名</td><td>登录用户</td><td><code>user_123</code></td></tr>
                <tr><td><strong>Pass</strong></td><td>认证密码</td><td>登录密码</td><td><code>pass_xyz</code></td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- ═══════ 第一部分：VMLogin 配置步骤 ═══════ -->
      <h3>🔧 第一部分：VMLogin 代理配置步骤</h3>

      <!-- 步骤1：打开 VMLogin -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">1</div>
          <div class="step-title">打开 VMLogin 防关联浏览器</div>
        </div>
        <div class="step-body">
          <p>打开已安装好的 <strong>VMLogin 防关联浏览器</strong> 客户端，进入登录界面。</p>
          ${realScreenshot(imgBase + '/vm-img14.png', '打开 VMLogin 防关联浏览器客户端', '步骤1')}
        </div>
      </div>

      <!-- 步骤2：新建浏览器配置文件 -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">2</div>
          <div class="step-title">点击"新建浏览器配置文件"</div>
        </div>
        <div class="step-body">
          <p>进入 VMLogin 主界面后，点击下方的 <strong>"新建浏览器配置文件"</strong> 按钮，开始创建新的浏览器环境。</p>
          ${realScreenshot(imgBase + '/vm-img15.png', '在 VMLogin 主界面，点击 <strong>"新建浏览器配置文件"</strong> 按钮', '步骤2')}
        </div>
      </div>

      <!-- 步骤3：进入配置窗口 -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">3</div>
          <div class="step-title">在新建配置窗口中进行基本设置</div>
        </div>
        <div class="step-body">
          <p>在弹出的 <strong>"新建浏览器配置文件"</strong> 窗口中，可以设置配置文件名称等基本信息。</p>
          ${realScreenshot(imgBase + '/vm-img16.png', '在新建浏览器配置文件窗口中进行基本设置', '步骤3')}
        </div>
      </div>

      <!-- 步骤4：设置代理服务器 -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">4</div>
          <div class="step-title">点击"设置代理服务器"</div>
        </div>
        <div class="step-body">
          <p>在配置窗口中，找到并点击 <strong>"设置代理服务器"</strong> 按钮，进入代理设置界面。</p>
          ${realScreenshot(imgBase + '/vm-img17.png', '点击 <strong>"设置代理服务器"</strong> 按钮，进入代理配置界面', '步骤4')}
        </div>
      </div>

      <!-- 步骤5：启用代理并选择协议 -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">5</div>
          <div class="step-title">启用代理服务器，选择代理协议</div>
        </div>
        <div class="step-body">
          <p>在代理设置界面中：</p>
          <ol>
            <li>勾选 <strong>"启用代理服务器"</strong></li>
            <li>在代理类型下拉菜单中选择 <strong>"SOCKS5"</strong> 或 <strong>"HTTP"</strong>（根据您从量子代理客户端提取的代理协议选择）</li>
          </ol>
          ${realScreenshot(imgBase + '/vm-img18.png', '启用代理服务器，在代理类型中选择 <strong>SOCKS5</strong> 或 <strong>HTTP</strong>', '步骤5')}

          <div class="info-box">
            <strong>💡 VMLogin 支持的代理协议：</strong><br>
            • <strong>HTTP</strong> — 适用于 HTTP 网页浏览<br>
            • <strong>HTTPS</strong> — 加密的 HTTP 代理<br>
            • <strong>SOCKS5</strong> — 支持所有类型的网络流量（TCP/UDP），推荐优先使用
          </div>
        </div>
      </div>

      <!-- 步骤6：填入IP和端口 -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">6</div>
          <div class="step-title">填入代理 IP 地址和端口号</div>
        </div>
        <div class="step-body">
          <p>将从量子代理客户端获取的代理信息填入对应字段：</p>
          <ol>
            <li><strong>IP地址</strong>：填入代理服务器的 IP 地址（如 <code>172.107.115.185</code>）</li>
            <li><strong>端口</strong>：填入代理端口号（如 <code>18014</code>）</li>
          </ol>
          ${realScreenshot(imgBase + '/vm-img20.png', '在 IP地址 和 端口 输入框中分别填入代理服务器地址和端口号', '步骤6')}
        </div>
      </div>

      <!-- 步骤7：填入用户名和密码 -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">7</div>
          <div class="step-title">填入登录用户和登录密码</div>
        </div>
        <div class="step-body">
          <p>继续填入认证信息：</p>
          <ol>
            <li><strong>登录用户</strong>：填入从量子代理客户端获取的代理用户名</li>
            <li><strong>登录密码</strong>：填入从量子代理客户端获取的代理密码</li>
          </ol>
          ${realScreenshot(imgBase + '/vm-img21.png', '在登录用户和登录密码输入框中分别填入代理的用户名和密码', '步骤7')}
        </div>
      </div>

      <!-- 步骤8：测试代理 -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">8</div>
          <div class="step-title">点击"测试代理"验证连通性</div>
        </div>
        <div class="step-body">
          <p>所有信息填写完成后，点击 <strong>"测试代理"</strong> 按钮。如果代理连接成功，会显示 <span style="color:#34a853;font-weight:bold;">"代理测试成功"</span> 的提示信息，表示代理配置正确。</p>
          ${realScreenshot(imgBase + '/vm-img22.png', '点击 <strong>"测试代理"</strong> 按钮，显示 <strong>"代理测试成功"</strong>，代理设置完成', '步骤8')}

          <div class="info-box success">
            <strong>✅ 代理验证成功标志：</strong><br>
            • 弹出 <strong>"代理测试成功"</strong> 提示<br>
            • 说明代理 IP、端口、用户名、密码均填写正确，代理连接正常
          </div>
        </div>
      </div>

      <!-- 步骤9：保存并启动浏览器 -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">9</div>
          <div class="step-title">保存配置，启动浏览器</div>
        </div>
        <div class="step-body">
          <p>代理测试成功后，点击 <strong>"保存"</strong> 按钮保存配置文件。返回 VMLogin 主界面，在配置文件列表中找到刚刚创建的配置文件，<strong>双击</strong> 即可启动浏览器。</p>
          ${realScreenshot(imgBase + '/vm-img23.png', '在配置文件列表中，双击刚创建的配置文件启动浏览器', '步骤9')}
        </div>
      </div>

      <!-- ═══════ 第二部分：验证代理 ═══════ -->
      <h3>✅ 第二部分：验证代理是否生效</h3>
      <p>浏览器启动后，访问以下网站验证 IP 是否已切换：</p>
      <ul>
        <li><strong>whoer.net</strong> — 查看当前 IP、地理位置和匿名性</li>
        <li><strong>ipinfo.io</strong> — 查看 IP 详细信息</li>
        <li><strong>browserleaks.com</strong> — 检查浏览器指纹信息</li>
      </ul>

      ${realScreenshot(imgBase + '/vm-img24.png', '打开 <strong>whoer.net</strong> 验证 IP 地址，显示的 IP 与代理 IP 一致，说明代理配置成功！', '验证1')}

      <p>也可以打开当前页面的 <strong>Services → Whois</strong>，输入查询到的 IP 进行查询：</p>
      ${realScreenshot(imgBase + '/vm-img25.png', '打开 Whois 服务，输入代理 IP 进行查询', '验证2')}

      <p>查询结果可以看到当前 IP 的地理位置信息：</p>
      ${realScreenshot(imgBase + '/vm-img26.png', '查询结果显示当前 IP 的地理位置信息，确认代理已生效', '验证3')}

      <div class="info-box success">
        <strong>🎉 配置完成！</strong>如上图所示，whoer.net 显示的 IP 地址与代理设备的 IP 一致，说明代理已成功生效。您现在可以安全地进行多账号操作了。
      </div>

      <!-- 常见问题 -->
      <h3>❓ 常见问题</h3>
      <div class="step-card">
        <h4>Q: VMLogin 的代理类型选择 "HTTP" 还是 "SOCKS5"？</h4>
        <p>VMLogin 支持 <strong>HTTP</strong>、<strong>HTTPS</strong>、<strong>SOCKS5</strong> 三种代理协议。根据您从量子代理客户端提取的代理协议进行选择。<br>
        一般推荐优先使用 <strong>SOCKS5</strong>，兼容性更好，支持所有类型的网络流量。</p>
      </div>
      <div class="step-card">
        <h4>Q: 代理测试失败怎么办？</h4>
        <ul>
          <li>检查代理信息是否填写正确（IP地址、端口、登录用户、登录密码）</li>
          <li>确认代理协议类型选择正确（HTTP / HTTPS / SOCKS5）</li>
          <li>确认已勾选 <strong>"启用代理服务器"</strong></li>
          <li>检查代理是否已过期或流量已用完</li>
          <li>尝试更换其他代理节点</li>
        </ul>
      </div>
      <div class="step-card">
        <h4>Q: VMLogin 支持批量导入代理吗？</h4>
        <p>VMLogin 支持通过 TXT 文件批量导入代理配置，格式为：<br>
        <code>HTTP:IP:端口:用户名:密码</code> 或 <code>SOCKS5:IP:端口:用户名:密码</code><br>
        无账密时使用：<code>SOCKS5:IP:端口::</code>（冒号占位）<br>
        与量子代理客户端导出的格式稍有不同，需要在前面加上协议类型前缀。</p>
      </div>
      <div class="step-card">
        <h4>Q: 如何修改已有配置文件的代理设置？</h4>
        <p>在 VMLogin 主界面的配置文件列表中，右键点击需要修改的配置文件，选择 <strong>"编辑配置文件"</strong>，然后点击 <strong>"设置代理服务器"</strong> 即可重新修改代理信息。</p>
      </div>
      <div class="step-card">
        <h4>Q: 代理测试无法连通怎么办？</h4>
        <p>HTTP(S) 和 SOCKS5 代理需要在 <strong>外网环境</strong> 下才能正常连通。请确认您当前的网络环境已具备外网访问能力（即能够正常访问境外网站），否则代理将无法建立连接。</p>
      </div>
    </div>`;
  }

  // ── 候鸟浏览器专属详细教程（含真实截图） ──
  function getHouNiaoCustomContent(browser) {
    const imgBase = 'assets/help-screenshots/houniao';
    const clientImgBase = 'assets/help-screenshots/client';
    return `<div class="tutorial-content">
      <!-- 浏览器简介 -->
      <div class="info-box">
        <strong>📌 ${browser.fullName}</strong><br>
        ${browser.desc}<br>
        <strong>官网：</strong><a href="${browser.website}" target="_blank" style="color:#1a73e8;">${browser.website}</a>
      </div>

      <div class="info-box warning">
        <strong>⚠️ 重要提示：</strong>量子代理平台的所有代理产品均需要在 <strong>境外网络环境</strong> 下使用，境外网络环境由客户自行配置。本教程涉及的网络环境已实现境外环境配置。
      </div>

      <!-- ═══════ 前置准备：从量子代理客户端获取代理信息 ═══════ -->
      <h3>📋 前置准备：从量子代理客户端获取代理信息</h3>
      <p>在配置候鸟浏览器之前，您需要先从 <strong>量子代理（ProxyManager）</strong> 客户端批量提取代理信息。以下是详细步骤：</p>

      <!-- 准备步骤1：进入我的订单 -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">1</div>
          <div class="step-title">进入"我的订单"页面</div>
        </div>
        <div class="step-body">
          <p>登录 <strong>量子代理客户端</strong>，在左侧导航栏点击 <strong>"我的订单"</strong>，进入订单列表页面。页面会显示您所有已购买的代理订单。</p>
          ${realScreenshot(clientImgBase + '/order-list.png', '在量子代理客户端左侧导航栏点击 <strong>"我的订单"</strong>，进入订单列表页面', '步骤1')}
        </div>
      </div>

      <!-- 准备步骤2：点击对应订单进入详情 -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">2</div>
          <div class="step-title">点击对应订单，进入订单详情页面</div>
        </div>
        <div class="step-body">
          <p>在订单列表中，找到您需要提取代理的订单（如图红框所示），<strong>鼠标点击该订单</strong> 即可进入订单详情页面。在订单详情页右上方，点击蓝色的 <strong>⚡ 批量提取代理</strong> 按钮。</p>
          ${realScreenshot(clientImgBase + '/order-detail.png', '点击对应订单进入详情页面后，点击右上角 <strong>⚡ 批量提取代理</strong> 按钮', '步骤2')}
        </div>
      </div>

      <!-- 准备步骤3：选择协议和格式 -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">3</div>
          <div class="step-title">选择协议、授权方式和复制格式</div>
        </div>
        <div class="step-body">
          <p>在弹出的 <strong>"批量查看 / 导出"</strong> 窗口中，按以下步骤操作：</p>
          <ol>
            <li><strong>选择协议</strong>：顶部选择 <strong>HTTP</strong> 或 <strong>SOCKS5</strong>（根据候鸟浏览器中要配置的代理类型选择）</li>
            <li><strong>查看模式</strong>：左侧选择 <strong>"列表文本"</strong></li>
            <li><strong>授权方式</strong>：选择 <strong>"密码模式"</strong>（推荐，候鸟浏览器支持账密认证）</li>
            <li><strong>复制格式</strong>：选择 <strong>"纯文本格式"</strong>（格式为 <code>IP:Port:User:Pass</code>）</li>
            <li>点击底部 <strong>"📋 一键复制"</strong> 按钮，将代理列表复制到剪贴板</li>
          </ol>
          ${realScreenshot(clientImgBase + '/export-modal-listtext.png', '在批量导出窗口中：选择 <strong>HTTP</strong> 协议 → <strong>列表文本</strong> → <strong>密码模式</strong> → <strong>纯文本格式</strong>，右侧显示代理列表', '步骤2')}

          <div class="info-box warning">
            <strong>⚠️ 重要提示：</strong><br>
            • 候鸟浏览器中的 <strong>"SOCKS5"</strong> 对应量子代理中的 <strong>SOCKS5</strong> 协议<br>
            • 如果选择 <strong>HTTP</strong> 协议，则在候鸟浏览器中代理类型选择 <strong>"HTTP"</strong><br>
            • 请确保两端协议一致，否则代理将无法连接
          </div>
        </div>
      </div>

      <!-- 准备步骤4：理解代理格式 -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">4</div>
          <div class="step-title">理解提取的代理格式</div>
        </div>
        <div class="step-body">
          <p>复制后的代理信息格式如下，每行一条代理：</p>

          <table class="format-table">
            <thead>
              <tr>
                <th>格式类型</th>
                <th>HTTP 示例</th>
                <th>SOCKS5 示例</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>纯文本（密码模式）</strong><br><span style="color:#1a73e8;font-size:11px;">推荐 ✓</span></td>
                <td><code>192.168.1.101:10000:user_123:pass_xyz</code></td>
                <td><code>192.168.1.101:10000:user_123:pass_xyz</code></td>
              </tr>
              <tr>
                <td><strong>纯文本（白名单模式）</strong></td>
                <td><code>192.168.1.101:10000</code></td>
                <td><code>192.168.1.101:10000</code></td>
              </tr>
              <tr>
                <td><strong>标准URL（密码模式）</strong></td>
                <td><code>http://user_123:pass_xyz@192.168.1.101:10000</code></td>
                <td><code>socks5://user_123:pass_xyz@192.168.1.101:10000</code></td>
              </tr>
              <tr>
                <td><strong>标准URL（白名单模式）</strong></td>
                <td><code>http://192.168.1.101:10000</code></td>
                <td><code>socks5://192.168.1.101:10000</code></td>
              </tr>
            </tbody>
          </table>

          <div class="info-box">
            <strong>📝 字段说明（纯文本格式 <code>IP:Port:User:Pass</code>）：</strong><br>
            <table class="format-table" style="margin-top:8px;">
              <thead>
                <tr><th>字段</th><th>含义</th><th>候鸟浏览器对应项</th><th>示例值</th></tr>
              </thead>
              <tbody>
                <tr><td><strong>IP</strong></td><td>代理服务器地址</td><td>代理 IP 地址</td><td><code>192.168.1.101</code></td></tr>
                <tr><td><strong>Port</strong></td><td>代理端口号</td><td>端口 (Port)</td><td><code>10000</code></td></tr>
                <tr><td><strong>User</strong></td><td>认证用户名</td><td>Account</td><td><code>user_123</code></td></tr>
                <tr><td><strong>Pass</strong></td><td>认证密码</td><td>Password</td><td><code>pass_xyz</code></td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- ═══════ 第一部分：候鸟浏览器配置步骤 ═══════ -->
      <h3>🔧 第一部分：候鸟浏览器代理配置步骤</h3>

      <!-- 步骤1：登录候鸟浏览器 -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">1</div>
          <div class="step-title">登录候鸟浏览器</div>
        </div>
        <div class="step-body">
          <p>打开 <strong>候鸟浏览器客户端</strong>，输入您的账号和密码，点击 <strong>"登录"</strong> 按钮进入主界面。</p>
          ${realScreenshot(imgBase + '/hn-img12.png', '打开候鸟浏览器客户端，输入账号密码后点击 <strong>"登录"</strong>', '步骤1')}
        </div>
      </div>

      <!-- 步骤2：新建环境配置 -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">2</div>
          <div class="step-title">点击"新建环境配置"</div>
        </div>
        <div class="step-body">
          <p>登录成功后进入候鸟浏览器主界面，在左下角找到并点击 <strong>"+ 新建环境配置"</strong> 按钮，开始创建新的浏览器环境。</p>
          ${realScreenshot(imgBase + '/hn-img13.png', '在候鸟浏览器主界面左下角，点击 <strong>"+ 新建环境配置"</strong> 按钮', '步骤2')}
        </div>
      </div>

      <!-- 步骤3：选择代理类型 -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">3</div>
          <div class="step-title">选择代理类型</div>
        </div>
        <div class="step-body">
          <p>在弹出的环境配置页面中，找到 <strong>"代理Proxy"</strong> 区域：</p>
          <ol>
            <li>点击代理类型下拉菜单（默认为 <strong>"No Proxy"</strong>）</li>
            <li>在下拉列表中选择 <strong>"SOCKS5"</strong> 或 <strong>"HTTP"</strong>（根据您从量子代理客户端提取的代理协议选择）</li>
          </ol>
          ${realScreenshot(imgBase + '/hn-img14.png', '在代理Proxy区域，点击下拉菜单选择 <strong>SOCKS5</strong> 或 <strong>HTTP</strong> 代理类型', '步骤3')}

          <div class="info-box">
            <strong>💡 候鸟浏览器支持的代理类型：</strong><br>
            • <strong>SOCKS5</strong> — 支持所有类型的网络流量（TCP/UDP），推荐优先使用<br>
            • <strong>HTTP</strong> — 适用于 HTTP/HTTPS 网页浏览<br>
            • <strong>HTTPS</strong> — 加密的 HTTP 代理<br>
            • <strong>SOCKS4 / SOCKS4A</strong> — 较旧的 SOCKS 协议版本
          </div>
        </div>
      </div>

      <!-- 步骤4：填入代理IP和端口 -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">4</div>
          <div class="step-title">填入代理 IP 地址和端口</div>
        </div>
        <div class="step-body">
          <p>选择代理类型后，将从量子代理客户端获取的代理信息填入对应字段：</p>
          <ol>
            <li><strong>代理类型</strong>：已选择 <strong>SOCKS5</strong>（或 HTTP）</li>
            <li><strong>IP 地址</strong>：填入代理服务器的 IP 地址（如 <code>172.107.115.18</code>）</li>
            <li><strong>Port 端口</strong>：填入代理端口号（如 <code>18014</code>）</li>
          </ol>
          ${realScreenshot(imgBase + '/hn-img16.png', '选择 <strong>SOCKS5</strong> 代理类型后，填入代理 IP 地址和端口号', '步骤4')}
        </div>
      </div>

      <!-- 步骤5：填入账号密码并检查代理 -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">5</div>
          <div class="step-title">填入账号密码，点击"检查代理"验证</div>
        </div>
        <div class="step-body">
          <p>继续填入认证信息并验证代理连通性：</p>
          <ol>
            <li><strong>Account</strong>：填入代理用户名</li>
            <li><strong>Password</strong>：填入代理密码</li>
            <li>点击右侧 <strong>"检查代理"</strong> 按钮</li>
          </ol>
          <p>如果代理连接成功，右上方会显示 <span style="color:#34a853;font-weight:bold;">"代理测试成功"</span> 提示，同时 <strong>公网IP</strong> 会自动识别并显示代理的出口 IP 地址和地理位置信息。</p>
          ${realScreenshot(imgBase + '/hn-img17.png', '填入 Account 和 Password 后，点击 <strong>"检查代理"</strong>，显示 <strong>"代理测试成功"</strong> 和公网IP信息', '步骤5')}

          <div class="info-box success">
            <strong>✅ 代理验证成功标志：</strong><br>
            • 右上方显示 <strong>"代理测试成功"</strong> 绿色提示<br>
            • <strong>公网IP</strong> 显示代理的出口 IP 地址（如 <code>172.107.115.185</code>）<br>
            • <strong>指纹识别设置</strong> 区域自动匹配时区和国家信息
          </div>
        </div>
      </div>

      <!-- 步骤6：创建环境 -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">6</div>
          <div class="step-title">点击"创建环境"保存配置</div>
        </div>
        <div class="step-body">
          <p>代理验证成功后，可根据需要修改其他配置（如配置名称、指纹识别设置等），然后点击右下角的 <strong>"创建环境"</strong> 按钮保存环境配置。</p>
          ${realScreenshot(imgBase + '/hn-img17.png', '确认所有设置无误后，点击右下角 <strong>"创建环境"</strong> 按钮保存配置', '步骤6')}
        </div>
      </div>

      <!-- 步骤7：运行浏览器环境 -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">7</div>
          <div class="step-title">点击"运行"启动浏览器环境</div>
        </div>
        <div class="step-body">
          <p>返回候鸟浏览器主界面，在 <strong>"会话环境管理"</strong> 列表中找到刚刚创建的环境配置，点击右侧的 <strong>"▶ 运行"</strong> 按钮即可启动浏览器，开始使用量子代理的 IP 访问网站。</p>
          ${realScreenshot(imgBase + '/hn-img18.png', '在会话环境管理列表中，点击 <strong>"▶ 运行"</strong> 按钮启动浏览器环境', '步骤7')}
        </div>
      </div>

      <!-- ═══════ 第二部分：验证代理 ═══════ -->
      <h3>✅ 第二部分：验证代理是否生效</h3>
      <p>浏览器启动后，访问以下网站验证 IP 是否已切换：</p>
      <ul>
        <li><strong>whoer.net</strong> — 查看当前 IP、地理位置和匿名性</li>
        <li><strong>ipinfo.io</strong> — 查看 IP 详细信息</li>
        <li><strong>browserleaks.com</strong> — 检查浏览器指纹信息</li>
      </ul>

      ${realScreenshot(imgBase + '/hn-img19.png', '打开 <strong>whoer.net</strong> 验证 IP 地址，显示的 IP 与代理 IP 一致，说明代理配置成功！', '验证1')}

      <p>也可以打开当前页面的 <strong>Services → Whois</strong>，输入查询到的 IP 进行查询：</p>
      ${realScreenshot(imgBase + '/hn-img20.png', '打开 Whois 服务，输入代理 IP 进行查询', '验证2')}

      <p>查询结果可以看到当前 IP 的地理位置信息：</p>
      ${realScreenshot(imgBase + '/hn-img21.png', '查询结果显示当前 IP 的地理位置信息，确认代理已生效', '验证3')}

      <div class="info-box success">
        <strong>🎉 配置完成！</strong>如上图所示，whoer.net 显示的 IP 地址与代理设备的 IP 一致，说明代理已成功生效。您现在可以安全地进行多账号操作了。
      </div>

      <!-- 常见问题 -->
      <h3>❓ 常见问题</h3>
      <div class="step-card">
        <h4>Q: 候鸟浏览器的代理类型选择 "SOCKS5" 还是 "HTTP"？</h4>
        <p>候鸟浏览器支持 <strong>SOCKS5</strong>、<strong>HTTP</strong>、<strong>HTTPS</strong>、<strong>SOCKS4</strong>、<strong>SOCKS4A</strong> 等多种代理协议。根据您从量子代理客户端提取的代理协议进行选择。<br>
        一般推荐优先使用 <strong>SOCKS5</strong>，兼容性更好，支持所有类型的网络流量。</p>
      </div>
      <div class="step-card">
        <h4>Q: 代理检查失败怎么办？</h4>
        <ul>
          <li>检查代理信息是否填写正确（IP地址、端口、Account、Password）</li>
          <li>确认代理协议类型选择正确（SOCKS5 / HTTP）</li>
          <li>检查代理是否已过期或流量已用完</li>
          <li>尝试更换其他代理节点</li>
        </ul>
      </div>
      <div class="step-card">
        <h4>Q: 如何修改已创建环境的代理配置？</h4>
        <p>在候鸟浏览器主界面的 <strong>"会话环境管理"</strong> 列表中，找到需要修改的环境，点击环境名称或右键选择 <strong>"编辑"</strong>，即可重新修改代理配置信息。</p>
      </div>
      <div class="step-card">
        <h4>Q: 代理测试无法连通怎么办？</h4>
        <p>HTTP(S) 和 SOCKS5 代理需要在 <strong>外网环境</strong> 下才能正常连通。请确认您当前的网络环境已具备外网访问能力（即能够正常访问境外网站），否则代理将无法建立连接。</p>
      </div>
    </div>`;
  }

  // ── AdsPower 专属详细教程（含真实截图） ──
  function getAdsPowerCustomContent(browser) {
    const imgBase = 'assets/help-screenshots/adspower';
    return `<div class="tutorial-content">
      <!-- 浏览器简介 -->
      <div class="info-box">
        <strong>📌 ${browser.fullName}</strong><br>
        ${browser.desc}<br>
        <strong>官网：</strong><a href="${browser.website}" target="_blank" style="color:#1a73e8;">${browser.website}</a>
      </div>

      <div class="info-box warning">
        <strong>⚠️ 重要提示：</strong>量子代理平台的所有代理产品均需要在 <strong>境外网络环境</strong> 下使用，境外网络环境由客户自行配置。本教程涉及的网络环境已实现境外环境配置。
      </div>

      <!-- ═══════ 前置准备：从量子代理客户端获取代理信息 ═══════ -->
      <h3>📋 前置准备：从量子代理客户端获取代理信息</h3>
      <p>在配置 AdsPower 浏览器之前，您需要先从 <strong>量子代理（ProxyManager）</strong> 客户端批量提取代理信息。以下是详细步骤：</p>

      <!-- 准备步骤1：进入我的订单 -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">1</div>
          <div class="step-title">进入"我的订单"页面</div>
        </div>
        <div class="step-body">
          <p>登录 <strong>量子代理客户端</strong>，在左侧导航栏点击 <strong>"我的订单"</strong>，进入订单列表页面。页面会显示您所有已购买的代理订单。</p>
          ${realScreenshot('assets/help-screenshots/client/order-list.png', '在量子代理客户端左侧导航栏点击 <strong>"我的订单"</strong>，进入订单列表页面', '步骤1')}
        </div>
      </div>

      <!-- 准备步骤2：点击对应订单进入详情 -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">2</div>
          <div class="step-title">点击对应订单，进入订单详情页面</div>
        </div>
        <div class="step-body">
          <p>在订单列表中，找到您需要提取代理的订单（如图红框所示），<strong>鼠标点击该订单</strong> 即可进入订单详情页面。在订单详情页右上方，点击蓝色的 <strong>⚡ 批量提取代理</strong> 按钮。</p>
          ${realScreenshot('assets/help-screenshots/client/order-detail.png', '点击对应订单进入详情页面后，点击右上角 <strong>⚡ 批量提取代理</strong> 按钮', '步骤2')}
        </div>
      </div>

      <!-- 准备步骤3：选择协议和格式 -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">3</div>
          <div class="step-title">选择协议、授权方式和复制格式</div>
        </div>
        <div class="step-body">
          <p>在弹出的 <strong>"批量查看 / 导出"</strong> 窗口中，按以下步骤操作：</p>
          <ol>
            <li><strong>选择协议</strong>：顶部选择 <strong>HTTP</strong> 或 <strong>SOCKS5</strong>（根据 AdsPower 中要配置的代理类型选择）</li>
            <li><strong>查看模式</strong>：左侧选择 <strong>"列表文本"</strong></li>
            <li><strong>授权方式</strong>：选择 <strong>"密码模式"</strong>（推荐，AdsPower 支持账密认证）</li>
            <li><strong>复制格式</strong>：选择 <strong>"纯文本格式"</strong>（格式为 <code>IP:Port:User:Pass</code>）</li>
            <li>点击底部 <strong>"📋 一键复制"</strong> 按钮，将代理列表复制到剪贴板</li>
          </ol>
          ${realScreenshot('assets/help-screenshots/client/export-modal-listtext.png', '在批量导出窗口中：选择 <strong>HTTP</strong> 协议 → <strong>列表文本</strong> → <strong>密码模式</strong> → <strong>纯文本格式</strong>，右侧显示代理列表', '步骤2')}

          <div class="info-box warning">
            <strong>⚠️ 重要提示：</strong><br>
            • AdsPower 中的 <strong>"Socks5"</strong> 对应量子代理中的 <strong>SOCKS5</strong> 协议<br>
            • 如果选择 <strong>HTTP</strong> 协议，则在 AdsPower 中代理类型选择 <strong>"HTTP"</strong><br>
            • 请确保两端协议一致，否则代理将无法连接
          </div>
        </div>
      </div>

      <!-- 准备步骤4：理解代理格式 -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">4</div>
          <div class="step-title">理解提取的代理格式</div>
        </div>
        <div class="step-body">
          <p>复制后的代理信息格式如下，每行一条代理：</p>

          <table class="format-table">
            <thead>
              <tr>
                <th>格式类型</th>
                <th>HTTP 示例</th>
                <th>SOCKS5 示例</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>纯文本（密码模式）</strong><br><span style="color:#1a73e8;font-size:11px;">推荐 ✓</span></td>
                <td><code>192.168.1.101:10000:user_123:pass_xyz</code></td>
                <td><code>192.168.1.101:10000:user_123:pass_xyz</code></td>
              </tr>
              <tr>
                <td><strong>纯文本（白名单模式）</strong></td>
                <td><code>192.168.1.101:10000</code></td>
                <td><code>192.168.1.101:10000</code></td>
              </tr>
              <tr>
                <td><strong>标准URL（密码模式）</strong></td>
                <td><code>http://user_123:pass_xyz@192.168.1.101:10000</code></td>
                <td><code>socks5://user_123:pass_xyz@192.168.1.101:10000</code></td>
              </tr>
              <tr>
                <td><strong>标准URL（白名单模式）</strong></td>
                <td><code>http://192.168.1.101:10000</code></td>
                <td><code>socks5://192.168.1.101:10000</code></td>
              </tr>
            </tbody>
          </table>

          <div class="info-box">
            <strong>📝 字段说明（纯文本格式 <code>IP:Port:User:Pass</code>）：</strong><br>
            <table class="format-table" style="margin-top:8px;">
              <thead>
                <tr><th>字段</th><th>含义</th><th>AdsPower 对应项</th><th>示例值</th></tr>
              </thead>
              <tbody>
                <tr><td><strong>IP</strong></td><td>代理服务器地址</td><td>主机（代理主机）</td><td><code>192.168.1.101</code></td></tr>
                <tr><td><strong>Port</strong></td><td>代理端口号</td><td>端口（代理端口）</td><td><code>10000</code></td></tr>
                <tr><td><strong>User</strong></td><td>认证用户名</td><td>代理账号</td><td><code>user_123</code></td></tr>
                <tr><td><strong>Pass</strong></td><td>认证密码</td><td>代理密码</td><td><code>pass_xyz</code></td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- ═══════ 第一部分：AdsPower 配置步骤 ═══════ -->
      <h3>🔧 第一部分：AdsPower 代理配置步骤</h3>

      <!-- 步骤1：打开 AdsPower -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">1</div>
          <div class="step-title">打开 AdsPower，点击"新建浏览器"</div>
        </div>
        <div class="step-body">
          <p>打开安装好的 <strong>AdsPower 防关联浏览器</strong>，在左上角点击 <strong>"+ 新建浏览器"</strong> 按钮，进入浏览器环境创建页面。</p>
          ${realScreenshot(imgBase + '/step01-open-adspower.png', '打开 AdsPower 客户端，点击左上角 <strong>"+ 新建浏览器"</strong> 按钮', '步骤1')}
        </div>
      </div>

      <!-- 步骤2：新建浏览器配置页面 -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">2</div>
          <div class="step-title">进入新建浏览器环境配置页面</div>
        </div>
        <div class="step-body">
          <p>在 <strong>"新建浏览器环境"</strong> 页面中，按需要填写自己的信息。向下滚动找到 <strong>"代理配置"</strong> 区域，代理方式默认选择 <strong>"自定义"</strong> 即可。</p>
          ${realScreenshot(imgBase + '/step02-new-browser.png', '在新建浏览器环境页面中，找到 <strong>"代理配置"</strong> 区域，代理方式选择 <strong>"自定义"</strong>', '步骤2')}
        </div>
      </div>

      <!-- 步骤3：选择代理类型 -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">3</div>
          <div class="step-title">选择代理类型</div>
        </div>
        <div class="step-body">
          <p>在 <strong>"代理类型"</strong> 下拉菜单中，选择代理协议。量子代理目前支持 <strong>HTTP</strong> 和 <strong>SOCKS5</strong> 两种代理协议。</p>
          <ul>
            <li>如果您在量子代理客户端提取的是 <strong>SOCKS5</strong> 协议 → 选择 <strong>"Socks5"</strong></li>
            <li>如果您在量子代理客户端提取的是 <strong>HTTP</strong> 协议 → 选择 <strong>"HTTP"</strong></li>
          </ul>
          ${realScreenshot(imgBase + '/step03-proxy-type.png', '在代理类型下拉菜单中选择 <strong>HTTP</strong> 或 <strong>Socks5</strong>，与量子代理客户端提取的协议保持一致', '步骤3')}
        </div>
      </div>

      <!-- 步骤4：填写代理主机和端口 -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">4</div>
          <div class="step-title">填写代理主机和端口</div>
        </div>
        <div class="step-body">
          <p>在 <strong>"主机 : 端口"</strong> 输入框中，将从量子代理客户端复制的代理信息中的 <strong>IP 地址</strong> 和 <strong>端口号</strong> 分别填入。</p>
          <p>例如，提取的代理信息为 <code>172.107.115.185:18014:user_123:pass_xyz</code>，则：</p>
          <ul>
            <li><strong>主机</strong>：填入 <code>172.107.115.185</code></li>
            <li><strong>端口</strong>：填入 <code>18014</code></li>
          </ul>
          ${realScreenshot(imgBase + '/step04-fill-ip-port.png', '在主机和端口输入框中分别填入代理 <strong>IP 地址</strong> 和 <strong>端口号</strong>', '步骤4')}
        </div>
      </div>

      <!-- 步骤5：填写代理账号密码 -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">5</div>
          <div class="step-title">填写代理账号和密码</div>
        </div>
        <div class="step-body">
          <p>继续在代理配置区域，将量子代理客户端提取的 <strong>用户名</strong> 和 <strong>密码</strong> 分别填入 <strong>"代理账号"</strong> 和 <strong>"代理密码"</strong> 输入框中。</p>
          <p>例如，提取的代理信息为 <code>172.107.115.185:18014:user_123:pass_xyz</code>，则：</p>
          <ul>
            <li><strong>代理账号</strong>：填入 <code>user_123</code></li>
            <li><strong>代理密码</strong>：填入 <code>pass_xyz</code></li>
          </ul>
          ${realScreenshot(imgBase + '/step05-fill-credentials.png', '在代理账号和代理密码输入框中分别填入 <strong>用户名</strong> 和 <strong>密码</strong>，然后点击 <strong>"检查代理"</strong> 验证连通性', '步骤5')}

          <div class="info-box warning">
            <strong>⚠️ 字段对应关系：</strong><br>
            提取的 <code>IP:Port:User:Pass</code> 分别对应 AdsPower 中的：<br>
            <strong>主机</strong> = IP &nbsp;|&nbsp; <strong>端口</strong> = Port &nbsp;|&nbsp; <strong>代理账号</strong> = User &nbsp;|&nbsp; <strong>代理密码</strong> = Pass
          </div>
        </div>
      </div>

      <!-- 步骤6：检查代理 -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">6</div>
          <div class="step-title">检查代理连通性</div>
        </div>
        <div class="step-body">
          <p>信息填写完成后，点击右侧的 <strong>"检查代理"</strong> 按钮，验证代理 IP 是否可用。</p>
          <ul>
            <li>如果显示 <strong style="color:green;">✓ 连接成功</strong>，说明代理配置正确</li>
            <li>如果显示连接失败，请检查代理信息是否填写正确，以及网络环境是否具备外网访问能力</li>
          </ul>
          ${realScreenshot(imgBase + '/step05-fill-credentials.png', '点击 <strong>"检查代理"</strong> 按钮，验证代理连通性', '步骤6')}
        </div>
      </div>

      <!-- 步骤7：保存配置 -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">7</div>
          <div class="step-title">确定保存配置</div>
        </div>
        <div class="step-body">
          <p>代理检查通过后，点击页面底部的 <strong>"确定"</strong> 按钮，保存该浏览器环境配置。浏览器会返回到 <strong>"账号管理"</strong> 列表页面。</p>
        </div>
      </div>

      <!-- 步骤8：启动浏览器 -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">8</div>
          <div class="step-title">启动浏览器</div>
        </div>
        <div class="step-body">
          <p>在 <strong>"账号管理"</strong> 列表中，找到刚刚创建的浏览器环境记录，点击右侧的 <strong>"打开"</strong> 按钮，启动浏览器。</p>
          ${realScreenshot(imgBase + '/step06-account-list.png', '在账号管理列表中找到刚创建的记录，点击 <strong>"打开"</strong> 按钮启动浏览器', '步骤8')}
        </div>
      </div>

      <!-- ═══════ 第二部分：验证代理 ═══════ -->
      <h3>✅ 第二部分：验证代理是否生效</h3>
      <p>浏览器启动后，访问以下网站验证 IP 是否已切换：</p>
      <ul>
        <li><strong>whoer.net</strong> — 查看当前 IP、地理位置和匿名性</li>
        <li><strong>ipinfo.io</strong> — 查看 IP 详细信息</li>
        <li><strong>browserleaks.com</strong> — 检查浏览器指纹信息</li>
      </ul>

      <!-- 验证步骤1：whoer.net -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">9</div>
          <div class="step-title">打开 whoer.net 验证 IP</div>
        </div>
        <div class="step-body">
          <p>在 AdsPower 启动的浏览器中打开 <a href="https://whoer.net/" target="_blank" style="color:#1a73e8;">https://whoer.net/</a>，页面会显示当前的 IP 信息。确认显示的 IP 地址与您配置的代理 IP 一致。</p>
          ${realScreenshot(imgBase + '/step07-whoer-verify.png', '打开 <strong>whoer.net</strong> 验证 IP 地址，显示的 IP 与代理 IP 一致，说明代理配置成功', '验证1')}
        </div>
      </div>

      <!-- 验证步骤2：Whois 查询 -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">10</div>
          <div class="step-title">Whois 查询 IP 地理位置</div>
        </div>
        <div class="step-body">
          <p>也可以在 whoer.net 页面点击 <strong>Services → Whois</strong>，输入查询到的 IP 地址，点击 <strong>"Check"</strong> 查询 IP 的详细地理位置信息。</p>
          ${realScreenshot(imgBase + '/step08-whois-query.png', '打开 <strong>Services → Whois</strong>，输入代理 IP 进行查询', '验证2')}
        </div>
      </div>

      <div class="info-box success">
        <strong>🎉 配置完成！</strong>如果 whoer.net 显示的 IP 地址与您在量子代理客户端提取的代理 IP 一致，说明代理已成功生效。您现在可以安全地进行多账号操作了。
      </div>

      <!-- 常见问题 -->
      <h3>❓ 常见问题</h3>
      <div class="step-card">
        <h4>Q: AdsPower 的代理类型应该选择 "HTTP" 还是 "Socks5"？</h4>
        <p>根据您在量子代理客户端提取代理时选择的协议来决定：<br>
        • 提取时选择 <strong>HTTP</strong> → AdsPower 选择 <strong>"HTTP"</strong><br>
        • 提取时选择 <strong>SOCKS5</strong> → AdsPower 选择 <strong>"Socks5"</strong><br>
        两端协议必须一致，否则代理将无法连接。</p>
      </div>
      <div class="step-card">
        <h4>Q: 使用白名单模式时如何配置？</h4>
        <p>如果您在量子代理客户端选择了 <strong>白名单模式</strong>（IP 白名单授权），则在 AdsPower 中只需填入 <strong>主机</strong>（IP）和 <strong>端口</strong>，<strong>代理账号</strong> 和 <strong>代理密码</strong> 留空即可。请确保您的当前 IP 已添加到量子代理的白名单中。</p>
      </div>
      <div class="step-card">
        <h4>Q: 检查代理时提示连接失败怎么办？</h4>
        <ul>
          <li>检查代理信息是否填写正确（主机 IP、端口、账号、密码）</li>
          <li>确认代理协议类型选择正确（HTTP / Socks5）</li>
          <li>检查代理是否已过期或流量已用完</li>
          <li>确认当前网络环境已具备外网访问能力</li>
          <li>尝试更换其他代理节点</li>
        </ul>
      </div>
      <div class="step-card">
        <h4>Q: HTTP 和 SOCKS5 应该选哪个？</h4>
        <p><strong>HTTP 代理</strong>：适合网页浏览、电商操作等 HTTP/HTTPS 场景，兼容性最好。<br>
        <strong>SOCKS5 代理</strong>：支持所有类型的网络流量（TCP/UDP），适合需要更底层网络支持的场景。<br>
        一般推荐优先使用 <strong>SOCKS5</strong>，兼容性更好。</p>
      </div>
      <div class="step-card">
        <h4>Q: 代理测试无法连通怎么办？</h4>
        <p>HTTP(S) 和 SOCKS5 代理需要在 <strong>外网环境</strong> 下才能正常连通。请确认您当前的网络环境已具备外网访问能力（即能够正常访问境外网站），否则代理将无法建立连接。</p>
      </div>
    </div>`;
  }

  // ── 紫鸟浏览器专属详细教程（含真实截图） ──
  function getZiNiaoCustomContent(browser) {
    const imgBase = 'assets/help-screenshots/ziniao';
    return `<div class="tutorial-content">
      <!-- 浏览器简介 -->
      <div class="info-box">
        <strong>📌 ${browser.fullName}</strong><br>
        ${browser.desc}<br>
        <strong>官网：</strong><a href="${browser.website}" target="_blank" style="color:#1a73e8;">${browser.website}</a>
      </div>

      <!-- ═══════ 前置准备：从量子代理客户端获取代理信息 ═══════ -->
      <h3>📋 前置准备：从量子代理客户端获取代理信息</h3>
      <p>在配置紫鸟浏览器之前，您需要先从 <strong>量子代理（ProxyManager）</strong> 客户端批量提取代理信息。以下是详细步骤：</p>

      <!-- 准备步骤1：进入我的订单 -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">1</div>
          <div class="step-title">进入"我的订单"页面</div>
        </div>
        <div class="step-body">
          <p>登录 <strong>量子代理客户端</strong>，在左侧导航栏点击 <strong>"我的订单"</strong>，进入订单列表页面。页面会显示您所有已购买的代理订单。</p>
          ${realScreenshot('assets/help-screenshots/client/order-list.png', '在量子代理客户端左侧导航栏点击 <strong>"我的订单"</strong>，进入订单列表页面', '步骤1')}
        </div>
      </div>

      <!-- 准备步骤2：点击对应订单进入详情 -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">2</div>
          <div class="step-title">点击对应订单，进入订单详情页面</div>
        </div>
        <div class="step-body">
          <p>在订单列表中，找到您需要提取代理的订单（如图红框所示），<strong>鼠标点击该订单</strong> 即可进入订单详情页面。在订单详情页右上方，点击蓝色的 <strong>⚡ 批量提取代理</strong> 按钮。</p>
          ${realScreenshot('assets/help-screenshots/client/order-detail.png', '点击对应订单进入详情页面后，点击右上角 <strong>⚡ 批量提取代理</strong> 按钮', '步骤2')}
        </div>
      </div>

      <!-- 准备步骤3：选择协议和格式 -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">3</div>
          <div class="step-title">选择协议、授权方式和复制格式</div>
        </div>
        <div class="step-body">
          <p>在弹出的 <strong>"批量查看 / 导出"</strong> 窗口中，按以下步骤操作：</p>
          <ol>
            <li><strong>选择协议</strong>：顶部选择 <strong>HTTP</strong> 或 <strong>SOCKS5</strong>（根据紫鸟浏览器中要配置的代理类型选择）</li>
            <li><strong>查看模式</strong>：左侧选择 <strong>"列表文本"</strong></li>
            <li><strong>授权方式</strong>：选择 <strong>"密码模式"</strong>（推荐，紫鸟浏览器支持账密认证）</li>
            <li><strong>复制格式</strong>：选择 <strong>"纯文本格式"</strong>（格式为 <code>IP:Port:User:Pass</code>）</li>
            <li>点击底部 <strong>"📋 一键复制"</strong> 按钮，将代理列表复制到剪贴板</li>
          </ol>
          ${realScreenshot('assets/help-screenshots/client/export-modal-listtext.png', '在批量导出窗口中：选择 <strong>HTTP</strong> 协议 → <strong>列表文本</strong> → <strong>密码模式</strong> → <strong>纯文本格式</strong>，右侧显示代理列表', '步骤2')}

          <div class="info-box warning">
            <strong>⚠️ 重要提示：</strong><br>
            • 紫鸟浏览器中的 <strong>"sock5"</strong> 对应量子代理中的 <strong>SOCKS5</strong> 协议<br>
            • 如果选择 <strong>HTTP</strong> 协议，则在紫鸟浏览器中代理类型选择 <strong>"HTTP"</strong><br>
            • 请确保两端协议一致，否则代理将无法连接
          </div>
        </div>
      </div>

      <!-- 准备步骤4：理解代理格式 -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">4</div>
          <div class="step-title">理解提取的代理格式</div>
        </div>
        <div class="step-body">
          <p>复制后的代理信息格式如下，每行一条代理：</p>

          <table class="format-table">
            <thead>
              <tr>
                <th>格式类型</th>
                <th>HTTP 示例</th>
                <th>SOCKS5 示例</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>纯文本（密码模式）</strong><br><span style="color:#1a73e8;font-size:11px;">推荐 ✓</span></td>
                <td><code>192.168.1.101:10000:user_123:pass_xyz</code></td>
                <td><code>192.168.1.101:10000:user_123:pass_xyz</code></td>
              </tr>
              <tr>
                <td><strong>纯文本（白名单模式）</strong></td>
                <td><code>192.168.1.101:10000</code></td>
                <td><code>192.168.1.101:10000</code></td>
              </tr>
              <tr>
                <td><strong>标准URL（密码模式）</strong></td>
                <td><code>http://user_123:pass_xyz@192.168.1.101:10000</code></td>
                <td><code>socks5://user_123:pass_xyz@192.168.1.101:10000</code></td>
              </tr>
              <tr>
                <td><strong>标准URL（白名单模式）</strong></td>
                <td><code>http://192.168.1.101:10000</code></td>
                <td><code>socks5://192.168.1.101:10000</code></td>
              </tr>
            </tbody>
          </table>

          <div class="info-box">
            <strong>📝 字段说明（纯文本格式 <code>IP:Port:User:Pass</code>）：</strong><br>
            <table class="format-table" style="margin-top:8px;">
              <thead>
                <tr><th>字段</th><th>含义</th><th>紫鸟浏览器对应项</th><th>示例值</th></tr>
              </thead>
              <tbody>
                <tr><td><strong>IP</strong></td><td>代理服务器地址</td><td>设备地址或域名</td><td><code>192.168.1.101</code></td></tr>
                <tr><td><strong>Port</strong></td><td>代理端口号</td><td>端口</td><td><code>10000</code></td></tr>
                <tr><td><strong>User</strong></td><td>认证用户名</td><td>登录账号</td><td><code>user_123</code></td></tr>
                <tr><td><strong>Pass</strong></td><td>认证密码</td><td>登录密码</td><td><code>pass_xyz</code></td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- ═══════ 第一部分：紫鸟浏览器配置步骤（含真实截图） ═══════ -->
      <h3>🔧 第一部分：紫鸟浏览器代理配置步骤</h3>

      <!-- 步骤1：进入管理系统 - 设备管理 -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">1</div>
          <div class="step-title">进入紫鸟管理系统 — 设备管理</div>
        </div>
        <div class="step-body">
          <p>打开 <strong>紫鸟浏览器管理系统</strong>，在左侧导航栏中点击 <strong>"设备管理"</strong> → <strong>"添加自有设备"</strong>。</p>
          ${realScreenshot(imgBase + '/step12-device-list.png', '进入紫鸟浏览器管理系统，点击左侧 <strong>"管理"</strong> 进入设备管理页面', '步骤1')}
        </div>
      </div>

      <!-- 步骤2：添加自有设备 -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">2</div>
          <div class="step-title">添加自有设备</div>
        </div>
        <div class="step-body">
          <p>在 <strong>"设备管理"</strong> 页面中，点击 <strong>"添加自有设备"</strong> 下拉按钮，选择 <strong>"单个添加"</strong>。</p>
          ${realScreenshot(imgBase + '/step13-account-manage.png', '在设备管理页面点击 <strong>"添加自有设备"</strong> → <strong>"单个添加"</strong>，开始添加代理设备', '步骤2')}
        </div>
      </div>

      <!-- 步骤3：填写代理设备信息 -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">3</div>
          <div class="step-title">填写代理设备信息</div>
        </div>
        <div class="step-body">
          <p>在 <strong>"添加自有设备"</strong> 弹窗中，按照以下步骤填写：</p>
          <ol>
            <li><strong>设备名称</strong>：自定义名称（如 <code>20231227-1</code>）或点击"自动生成"</li>
            <li><strong>网络属性</strong>：选择 <strong>"静态"</strong></li>
            <li><strong>设备功能</strong>：勾选 ✅ <strong>"支持代理"</strong></li>
            <li><strong>代理类型</strong>：选择 <strong>"sock5"</strong>（即 SOCKS5）或 HTTP</li>
            <li><strong>设备地址或域名</strong>：填入代理 <strong>IP 地址</strong>（如 <code>102.129.224.117</code>）</li>
            <li><strong>端口</strong>：填入代理 <strong>端口号</strong>（如 <code>14422</code>）</li>
            <li><strong>是否有设置账密</strong>：选择 <strong>"已设置"</strong></li>
            <li><strong>登录账号</strong>：填入代理 <strong>用户名</strong>（如 <code>user1234</code>）</li>
            <li><strong>登录密码</strong>：填入代理 <strong>密码</strong>（如 <code>test1234</code>）</li>
          </ol>

          ${realScreenshot(imgBase + '/step14-add-account.png', '在弹窗中填写代理信息：代理类型选择 <strong>sock5</strong>，填入 IP 地址、端口、用户名、密码', '步骤3')}

          <div class="info-box warning">
            <strong>⚠️ 字段对应关系：</strong><br>
            提取的 <code>IP:Port:User:Pass</code> 分别对应紫鸟浏览器中的：<br>
            <strong>设备地址或域名</strong> = IP &nbsp;|&nbsp; <strong>端口</strong> = Port &nbsp;|&nbsp; <strong>登录账号</strong> = User &nbsp;|&nbsp; <strong>登录密码</strong> = Pass
          </div>
        </div>
      </div>

      <!-- 步骤4：选择代理类型 -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">4</div>
          <div class="step-title">选择代理类型与协议</div>
        </div>
        <div class="step-body">
          <p>在添加设备弹窗中，代理类型选择 <strong>"sock5"</strong>（即 SOCKS5 协议）或 <strong>"HTTP"</strong>。根据您提取的协议类型进行选择。</p>
          ${realScreenshot(imgBase + '/step14-add-account.png', '选择代理类型：<strong>sock5</strong>（SOCKS5）或 <strong>HTTP</strong>，与提取的协议保持一致', '步骤4')}
        </div>
      </div>

      <!-- 步骤5：检测代理 -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">5</div>
          <div class="step-title">检测代理连通性</div>
        </div>
        <div class="step-body">
          <p>填写完成后，点击右下角 <strong>"检测"</strong> 按钮，确认代理 IP 通畅。</p>
          ${realScreenshot(imgBase + '/step14-add-account.png', '点击 <strong>"检测"</strong> 按钮，验证代理 IP 连通性', '步骤5')}
        </div>
      </div>

      <!-- 步骤6：确认添加设备 -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">6</div>
          <div class="step-title">确认添加设备</div>
        </div>
        <div class="step-body">
          <p>系统会弹出 <strong>"自有设备风险检测"</strong> 对话框，显示录入的设备地址与真实地址信息。确认无误后点击 <strong>"确认添加"</strong>。</p>
          ${realScreenshot(imgBase + '/step15-bind-device.png', '风险检测对话框，确认信息后点击 <strong>"确认添加"</strong> 完成设备添加', '步骤6')}
        </div>
      </div>

      <!-- 步骤7：设备添加成功 -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">7</div>
          <div class="step-title">设备添加成功</div>
        </div>
        <div class="step-body">
          <p>设备添加成功后，在 <strong>"设备管理"</strong> → <strong>"自有设备"</strong> 页面，可以看到刚添加的设备信息。</p>
          ${realScreenshot(imgBase + '/step16-risk-check.png', '设备添加成功后，在自有设备列表中可以看到设备名称、IP 地址等信息', '步骤7')}
        </div>
      </div>

      <!-- ═══════ 第二部分：账号管理 ═══════ -->
      <h3>👤 第二部分：账号管理 — 添加账号并绑定设备</h3>

      <!-- 步骤8：进入账号管理 -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">8</div>
          <div class="step-title">进入账号管理，添加账号</div>
        </div>
        <div class="step-body">
          <p>在 <strong>紫鸟浏览器管理系统</strong> 中的 <strong>"账号管理"</strong> → <strong>"添加账号"</strong>。</p>
          ${realScreenshot(imgBase + '/step17-account-list.png', '切换到 <strong>"账号管理"</strong> 页面，点击 <strong>"+ 添加账号"</strong> 按钮开始创建账号', '步骤8')}
        </div>
      </div>

      <!-- 步骤9：填写账号信息 -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">9</div>
          <div class="step-title">填写账号信息并绑定设备</div>
        </div>
        <div class="step-body">
          <p>在添加账号页面中：</p>
          <ol>
            <li>选择 <strong>目标平台</strong> 和 <strong>自定义账号名称</strong></li>
            <li><strong>设备信息</strong> → <strong>"绑定设备"</strong> 处选择刚才添加的代理设备</li>
            <li>点击 <strong>"下一步"</strong></li>
          </ol>
          ${realScreenshot(imgBase + '/step18-fill-account.png', '填写账号基础信息（所属平台、账号名称），在设备信息中绑定之前添加的代理设备，然后点击 <strong>"下一步"</strong>', '步骤9')}
        </div>
      </div>

      <!-- 步骤10：确认绑定 -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">10</div>
          <div class="step-title">确认绑定设备</div>
        </div>
        <div class="step-body">
          <p>在弹出的 <strong>"绑定设备"</strong> 对话框中，选择要绑定的设备，然后点击 <strong>"确定绑定"</strong>。</p>
          ${realScreenshot(imgBase + '/step19-next-step.png', '在绑定设备对话框中选择代理设备，点击 <strong>"确定绑定"</strong>', '步骤10')}
        </div>
      </div>

      <!-- 步骤11：风险检测 -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">11</div>
          <div class="step-title">风险检测并完成</div>
        </div>
        <div class="step-body">
          <p>系统会进行风险检测，确认无风险后点击 <strong>"继续绑定"</strong>，最后点击 <strong>"完成"</strong> 完成账号创建。</p>
          ${realScreenshot(imgBase + '/step20-risk-detect.png', '风险检测通过后，点击 <strong>"继续绑定"</strong>，然后点击 <strong>"完成"</strong> 完成整个配置流程', '步骤11')}
        </div>
      </div>

      <!-- 步骤12：启动浏览器 -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">12</div>
          <div class="step-title">启动浏览器</div>
        </div>
        <div class="step-body">
          <p>在 <strong>"账号管理"</strong> → <strong>"全部账号"</strong> 页面，找到刚创建的账号信息，点击 <strong>"启动"</strong> 按钮开始使用代理访问目标网站。</p>
          ${realScreenshot(imgBase + '/step21-launch.png', '在账号列表中点击 <strong>"启动"</strong> 按钮，打开绑定代理的浏览器环境', '步骤12')}
        </div>
      </div>

      <!-- ═══════ 第三部分：验证代理 ═══════ -->
      <h3>✅ 第三部分：验证代理是否生效</h3>
      <p>浏览器启动后，访问以下网站验证 IP 是否已切换：</p>
      <ul>
        <li><strong>whoer.net</strong> — 查看当前 IP、地理位置和匿名性</li>
        <li><strong>ipinfo.io</strong> — 查看 IP 详细信息</li>
        <li><strong>browserleaks.com</strong> — 检查浏览器指纹信息</li>
      </ul>

      ${realScreenshot(imgBase + '/step22-whoer.png', '打开 <strong>whoer.net</strong> 验证 IP 地址，显示的 IP 与代理 IP 一致，说明代理配置成功！', '验证1')}

      <p>也可以打开当前页面的 <strong>services → Whois</strong>，输入查询到的 IP 进行查询：</p>
      ${realScreenshot(imgBase + '/step23-whois.png', '打开 Whois 服务，输入代理 IP 进行查询', '验证2')}

      <p>查询结果可以看到当前 IP 的地理位置信息：</p>
      ${realScreenshot(imgBase + '/step24-whois-result.png', '查询结果显示当前 IP 的地理位置信息，确认代理已生效', '验证3')}

      <div class="info-box success">
        <strong>🎉 配置完成！</strong>如上图所示，whoer.net 显示的 IP 地址与代理设备的 IP 一致，伪装度为 100%，说明代理已成功生效。您现在可以安全地进行多账号操作了。
      </div>

      <!-- 常见问题 -->
      <h3>❓ 常见问题</h3>
      <div class="step-card">
        <h4>Q: 紫鸟浏览器的代理类型选择 "sock5" 还是 "HTTP"？</h4>
        <p>紫鸟浏览器中的 <strong>"sock5"</strong> 对应标准的 SOCKS5 协议。如果您提取的是 SOCKS5 代理，选择 sock5；如果是 HTTP 代理，选择 HTTP。<br>
        一般推荐优先使用 <strong>SOCKS5 (sock5)</strong>，兼容性更好。</p>
      </div>
      <div class="step-card">
        <h4>Q: 检测时提示"设备地址与真实地址不一致"怎么办？</h4>
        <p>这是正常现象。紫鸟浏览器会检测您录入的代理 IP 与实际出口 IP 是否一致。如果代理是通过中转节点连接的，两个 IP 可能不同。确认信息无误后，点击 <strong>"确认添加"</strong> 即可。</p>
      </div>
      <div class="step-card">
        <h4>Q: 使用白名单模式时如何配置？</h4>
        <p>如果您选择了 <strong>白名单模式</strong>（IP 白名单授权），则在添加设备时，"是否有设置账密"选择 <strong>"未设置"</strong>，只需填入 <strong>设备地址</strong> 和 <strong>端口</strong> 即可。请确保您的当前 IP 已添加到白名单中。</p>
      </div>
      <div class="step-card">
        <h4>Q: 代理检测失败怎么办？</h4>
        <ul>
          <li>检查代理信息是否填写正确（IP、端口、账号、密码）</li>
          <li>确认代理协议类型选择正确（HTTP / sock5）</li>
          <li>检查代理是否已过期或流量已用完</li>
          <li>尝试更换其他代理节点</li>
        </ul>
      </div>
      <div class="step-card">
        <h4>Q: 代理测试无法连通怎么办？</h4>
        <p>HTTP(S) 和 SOCKS5 代理需要在 <strong>外网环境</strong> 下才能正常连通。请确认您当前的网络环境已具备外网访问能力（即能够正常访问境外网站），否则代理将无法建立连接。</p>
      </div>
    </div>`;
  }

  // ── 默认浏览器教程内容（使用模拟截图） ──
  function getDefaultBrowserContent(browser) {
    return `<div class="tutorial-content">
      <!-- 浏览器简介 -->
      <div class="info-box">
        <strong>📌 ${browser.fullName}</strong><br>
        ${browser.desc}
      </div>

      <!-- 前置准备 -->
      <h3>📋 前置准备</h3>
      <p>在配置 ${browser.name} 之前，您需要先从客户端获取代理信息：</p>

      <!-- 准备步骤1：进入我的订单 -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">1</div>
          <div class="step-title">进入"我的订单"页面</div>
        </div>
        <div class="step-body">
          <p>登录量子代理客户端后，在左侧导航栏中点击 <strong>"我的订单"</strong>，进入订单列表页面。</p>
          <div class="screenshot-container">
            <img src="assets/help-screenshots/client/order-list.png" alt="我的订单列表页面" style="max-width:100%;border-radius:8px;box-shadow:0 2px 12px rgba(0,0,0,0.1);">
          </div>
        </div>
      </div>

      <!-- 准备步骤2：点击订单进入详情 -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">2</div>
          <div class="step-title">点击对应订单进入订单详情</div>
        </div>
        <div class="step-body">
          <p>在订单列表中，找到您需要使用的代理订单，<strong>点击该订单</strong>进入订单详情页面，在此页面可以看到 <strong>⚡ 批量提取代理</strong> 按钮。</p>
          <div class="screenshot-container">
            <img src="assets/help-screenshots/client/order-detail.png" alt="订单详情页面" style="max-width:100%;border-radius:8px;box-shadow:0 2px 12px rgba(0,0,0,0.1);">
          </div>
        </div>
      </div>

      <!-- 准备步骤3：选择协议和格式 -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">3</div>
          <div class="step-title">选择协议、授权方式和复制格式</div>
        </div>
        <div class="step-body">
          <p>在提取面板中，选择 <strong>HTTP</strong> 或 <strong>SOCKS5</strong> 协议标签页，然后选择提取格式：</p>

          <h4>HTTP 协议提取</h4>
          ${extractProxyMock('HTTP')}

          <h4>SOCKS5 协议提取</h4>
          ${extractProxyMock('SOCKS5')}

          <div class="info-box">
            <strong>💡 格式说明：</strong><br>
            <strong>纯文本格式</strong>（密码模式）：<code>IP:Port:User:Pass</code>（白名单模式：<code>IP:Port</code>）<br>
            <strong>标准 URL 格式</strong>（密码模式）：<code>protocol://user:pass@ip:port</code>（白名单模式：<code>protocol://ip:port</code>）
          </div>

          <table class="format-table">
            <thead>
              <tr>
                <th>格式类型</th>
                <th>HTTP 示例</th>
                <th>SOCKS5 示例</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>纯文本（密码模式）</strong></td>
                <td><code>192.168.1.1:8080:user:pass</code></td>
                <td><code>192.168.1.1:1080:user:pass</code></td>
              </tr>
              <tr>
                <td><strong>纯文本（白名单模式）</strong></td>
                <td><code>192.168.1.1:8080</code></td>
                <td><code>192.168.1.1:1080</code></td>
              </tr>
              <tr>
                <td><strong>标准URL（密码模式）</strong></td>
                <td><code>http://user:pass@192.168.1.1:8080</code></td>
                <td><code>socks5://user:pass@192.168.1.1:1080</code></td>
              </tr>
              <tr>
                <td><strong>标准URL（白名单模式）</strong></td>
                <td><code>http://192.168.1.1:8080</code></td>
                <td><code>socks5://192.168.1.1:1080</code></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- 浏览器配置步骤 -->
      <h3>🔧 ${browser.name} 配置步骤</h3>

      <div class="step-card">
        <div class="step-header">
          <div class="step-num">1</div>
          <div class="step-title">新建浏览器环境</div>
        </div>
        <div class="step-body">
          <p>${browser.steps.create}</p>
          ${mockScreenshot(browser.name + ' — 主界面', `
            <div class="mock-row" style="justify-content:space-between;">
              <div style="font-size:13px;font-weight:600;color:#202124;">${browser.name}</div>
              <div class="mock-btn" style="font-size:11px;">+ 新建浏览器</div>
            </div>
            <div style="border-top:1px solid #e0e0e0;margin-top:10px;padding-top:10px;font-size:11px;color:#9aa0a6;text-align:center;">暂无浏览器环境，请点击上方按钮创建</div>
          `)}
        </div>
      </div>

      <div class="step-card">
        <div class="step-header">
          <div class="step-num">2</div>
          <div class="step-title">找到代理设置区域</div>
        </div>
        <div class="step-body">
          <p>${browser.steps.proxySection}</p>
        </div>
      </div>

      <div class="step-card">
        <div class="step-header">
          <div class="step-num">3</div>
          <div class="step-title">选择代理协议类型</div>
        </div>
        <div class="step-body">
          <p>${browser.steps.proxyType}</p>
          <div class="info-box warning">
            <strong>⚠️ 注意：</strong>请确保选择的协议类型与您从客户端提取的代理协议一致。HTTP 代理选择 HTTP，SOCKS5 代理选择 SOCKS5。
          </div>
        </div>
      </div>

      <div class="step-card">
        <div class="step-header">
          <div class="step-num">4</div>
          <div class="step-title">填写代理信息</div>
        </div>
        <div class="step-body">
          <p>${browser.steps.fillInfo}</p>

          <h4>使用 HTTP 代理</h4>
          ${proxyFormMock(browser.name, { proto: 'HTTP' })}

          <h4>使用 SOCKS5 代理</h4>
          ${proxyFormMock(browser.name, { proto: 'SOCKS5' })}

          <div class="info-box">
            <strong>💡 如何从提取的文本中获取各字段：</strong><br>
            <strong>纯文本格式</strong> <code>IP:Port:User:Pass</code> → 依次对应填入 主机、端口、账号、密码<br>
            <strong>标准 URL</strong> <code>http://user:pass@ip:port</code> → 解析 URL 后分别填入各字段
          </div>
        </div>
      </div>

      <div class="step-card">
        <div class="step-header">
          <div class="step-num">5</div>
          <div class="step-title">检测代理连通性</div>
        </div>
        <div class="step-body">
          <p>${browser.steps.check}</p>
          ${mockScreenshot(browser.name + ' — 代理检测结果', `
            <div class="mock-row">
              <span class="mock-label">状态</span>
              <div class="mock-input" style="color:#34a853;font-weight:600;">✓ 连接成功</div>
            </div>
            <div class="mock-row">
              <span class="mock-label">IP 地址</span>
              <div class="mock-input">192.168.1.1</div>
            </div>
            <div class="mock-row">
              <span class="mock-label">地理位置</span>
              <div class="mock-input">🇺🇸 美国 洛杉矶</div>
            </div>
            <div class="mock-row">
              <span class="mock-label">延迟</span>
              <div class="mock-input" style="color:#34a853;">68ms</div>
            </div>
          `)}
        </div>
      </div>

      <div class="step-card">
        <div class="step-header">
          <div class="step-num">6</div>
          <div class="step-title">保存并启动浏览器</div>
        </div>
        <div class="step-body">
          <p>${browser.steps.save}</p>
        </div>
      </div>

      ${browser.extra || ''}

      <!-- 验证 -->
      <h3>✅ 验证代理是否生效</h3>
      <p>浏览器启动后，访问以下网站验证 IP 是否已切换：</p>
      <ul>
        <li><strong>whoer.net</strong> — 查看当前 IP、地理位置和匿名性</li>
        <li><strong>ipinfo.io</strong> — 查看 IP 详细信息</li>
        <li><strong>browserleaks.com</strong> — 检查浏览器指纹信息</li>
      </ul>
      ${verifyMock()}

      <div class="info-box success">
        <strong>🎉 配置完成！</strong>如果验证页面显示的 IP 地址与您配置的代理 IP 一致，说明代理已成功生效。您现在可以安全地进行多账号操作了。
      </div>

      <!-- 常见问题 -->
      <h3>❓ 常见问题</h3>
      <div class="step-card">
        <h4>Q: 代理检测失败怎么办？</h4>
        <ul>
          <li>检查代理信息是否填写正确（IP、端口、账号、密码）</li>
          <li>确认代理协议类型选择正确（HTTP / SOCKS5）</li>
          <li>检查代理是否已过期或流量已用完</li>
          <li>尝试更换其他代理节点</li>
        </ul>
      </div>
      <div class="step-card">
        <h4>Q: 使用白名单模式时如何配置？</h4>
        <p>如果您在客户端选择了 <strong>白名单模式</strong>（IP 白名单授权），则无需填写账号密码，只需填入 <strong>IP</strong> 和 <strong>端口</strong> 即可。请确保您的当前 IP 已添加到白名单中。</p>
      </div>
      <div class="step-card">
        <h4>Q: HTTP 和 SOCKS5 应该选哪个？</h4>
        <p><strong>HTTP 代理</strong>：适合网页浏览、电商操作等 HTTP/HTTPS 场景，兼容性最好。<br>
        <strong>SOCKS5 代理</strong>：支持所有类型的网络流量（TCP/UDP），适合需要更底层网络支持的场景。<br>
        一般推荐优先使用 <strong>HTTP</strong>，如有特殊需求再选择 SOCKS5。</p>
      </div>
    </div>`;
  }

  // ========== 云手机教程内容 ==========
  function getCloudPhoneTutorialContent(subId) {
    const contentMap = {
      'cloud-phone-overview': getCloudPhoneOverviewContent,
      'cloud-phone-proxy': getCloudPhoneProxyContent,
      'cloud-phone-multi': getCloudPhoneMultiContent,
      'cloud-phone-faq': getCloudPhoneFaqContent
    };
    const fn = contentMap[subId];
    return fn ? fn() : null;
  }

  function getCloudPhoneOverviewContent() {
    return `<div class="tutorial-content">
      <div class="info-box">
        <strong>📌 云手机使用概览</strong><br>
        云手机（Cloud Phone）是一种基于云端运行的虚拟安卓手机，用户无需实体设备即可在云端操控完整的安卓系统。结合量子代理的 IP 代理服务，可实现多账号隔离运营、海外社媒管理、跨境电商等场景。
      </div>

      <h3>🔍 什么是云手机？</h3>
      <div class="step-card">
        <div class="step-body">
          <p>云手机是运行在远程服务器上的虚拟安卓设备，通过网络串流技术将画面实时传输到您的电脑或手机上。您可以像操作真实手机一样使用它，但它拥有以下独特优势：</p>
          <ul>
            <li><strong>无需实体设备</strong> — 一台电脑即可管理数十甚至上百台云手机</li>
            <li><strong>独立环境</strong> — 每台云手机拥有独立的设备指纹、MAC 地址、IMEI 等信息</li>
            <li><strong>24小时在线</strong> — 云端运行，不受本地设备电量和网络限制</li>
            <li><strong>弹性扩展</strong> — 按需创建和释放，灵活管理成本</li>
          </ul>
        </div>
      </div>

      <h3>🎯 适用场景</h3>
      <div class="step-card">
        <div class="step-body">
          <table class="format-table">
            <thead>
              <tr>
                <th>场景</th>
                <th>说明</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>跨境电商</strong></td>
                <td>多店铺运营（Amazon、Shopee、TikTok Shop 等），每台云手机绑定独立 IP，避免关联</td>
              </tr>
              <tr>
                <td><strong>社媒营销</strong></td>
                <td>批量管理 Facebook、Instagram、TikTok、WhatsApp 等社交媒体账号</td>
              </tr>
              <tr>
                <td><strong>应用测试</strong></td>
                <td>在不同网络环境和地区模拟真实用户行为，进行 App 兼容性测试</td>
              </tr>
              <tr>
                <td><strong>游戏多开</strong></td>
                <td>手游多账号同时在线，支持批量操作和脚本自动化</td>
              </tr>
              <tr>
                <td><strong>海外业务</strong></td>
                <td>模拟海外用户环境，进行市场调研、广告投放验证等</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <h3>🔗 云手机 + 量子代理的优势</h3>
      <div class="step-card">
        <div class="step-body">
          <p>将量子代理与云手机结合使用，可以实现：</p>
          <ul>
            <li><strong>IP 隔离</strong> — 每台云手机分配独立的代理 IP，确保账号之间完全隔离</li>
            <li><strong>地域模拟</strong> — 通过选择不同国家/地区的代理节点，模拟当地用户访问</li>
            <li><strong>稳定连接</strong> — 静态住宅 IP 提供长期稳定的网络环境，降低账号风控风险</li>
            <li><strong>批量管理</strong> — 从量子代理客户端批量提取代理，快速分配给多台云手机</li>
          </ul>

          <div class="info-box success">
            <strong>💡 推荐搭配：</strong>跨境电商和社媒运营场景建议使用 <strong>静态住宅代理</strong>，IP 稳定且不易被平台检测。游戏多开等短期场景可使用 <strong>动态住宅代理</strong>，成本更低。
          </div>
        </div>
      </div>

      <h3>📋 快速开始</h3>
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">1</div>
          <div class="step-title">获取云手机</div>
        </div>
        <div class="step-body">
          <p>选择一家云手机服务商（如雷电云手机、红手指、多多云等），注册账号并创建云手机实例。</p>
        </div>
      </div>

      <div class="step-card">
        <div class="step-header">
          <div class="step-num">2</div>
          <div class="step-title">获取代理信息</div>
        </div>
        <div class="step-body">
          <p>登录 <strong>量子代理客户端</strong>，在 <strong>"我的订单"</strong> 中批量提取代理信息（HTTP 或 SOCKS5 协议）。详细步骤请参考 <strong>"云手机代理配置"</strong> 教程。</p>
        </div>
      </div>

      <div class="step-card">
        <div class="step-header">
          <div class="step-num">3</div>
          <div class="step-title">配置代理到云手机</div>
        </div>
        <div class="step-body">
          <p>在云手机的网络设置或代理管理工具中，填入从量子代理提取的代理信息（IP、端口、用户名、密码）。</p>
        </div>
      </div>

      <div class="step-card">
        <div class="step-header">
          <div class="step-num">4</div>
          <div class="step-title">验证并使用</div>
        </div>
        <div class="step-body">
          <p>在云手机中打开浏览器，访问 <strong>whoer.net</strong> 或 <strong>ipinfo.io</strong> 验证 IP 是否已切换为代理 IP。确认后即可正常使用。</p>
        </div>
      </div>
    </div>`;
  }

  function getCloudPhoneProxyContent() {
    const clientImgBase = 'assets/help-screenshots/client';
    return `<div class="tutorial-content">
      <div class="info-box">
        <strong>📌 云手机代理配置教程</strong><br>
        本教程将指导您如何从量子代理客户端获取代理信息，并在云手机中完成代理配置，实现独立 IP 访问。
      </div>

      <!-- ═══════ 前置准备：从量子代理客户端获取代理信息 ═══════ -->
      <h3>📋 前置准备：从量子代理客户端获取代理信息</h3>
      <p>在配置云手机代理之前，您需要先从 <strong>量子代理（ProxyManager）</strong> 客户端批量提取代理信息。以下是详细步骤：</p>

      <!-- 准备步骤1：进入我的订单 -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">1</div>
          <div class="step-title">进入"我的订单"页面</div>
        </div>
        <div class="step-body">
          <p>登录 <strong>量子代理客户端</strong>，在左侧导航栏点击 <strong>"我的订单"</strong>，进入订单列表页面。页面会显示您所有已购买的代理订单。</p>
          ${realScreenshot(clientImgBase + '/order-list.png', '在量子代理客户端左侧导航栏点击 <strong>"我的订单"</strong>，进入订单列表页面', '步骤1')}
        </div>
      </div>

      <!-- 准备步骤2：点击对应订单进入详情 -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">2</div>
          <div class="step-title">点击对应订单，进入订单详情页面</div>
        </div>
        <div class="step-body">
          <p>在订单列表中，找到您需要提取代理的订单（如图红框所示），<strong>鼠标点击该订单</strong> 即可进入订单详情页面。在订单详情页右上方，点击蓝色的 <strong>⚡ 批量提取代理</strong> 按钮。</p>
          ${realScreenshot(clientImgBase + '/order-detail.png', '点击对应订单进入详情页面后，点击右上角 <strong>⚡ 批量提取代理</strong> 按钮', '步骤2')}
        </div>
      </div>

      <!-- 准备步骤3：选择协议和格式 -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">3</div>
          <div class="step-title">选择协议、授权方式和复制格式</div>
        </div>
        <div class="step-body">
          <p>在弹出的 <strong>"批量查看 / 导出"</strong> 窗口中，按以下步骤操作：</p>
          <ol>
            <li><strong>选择协议</strong>：顶部选择 <strong>HTTP</strong> 或 <strong>SOCKS5</strong>（根据云手机支持的代理类型选择）</li>
            <li><strong>查看模式</strong>：左侧选择 <strong>"列表文本"</strong></li>
            <li><strong>授权方式</strong>：选择 <strong>"密码模式"</strong>（推荐）</li>
            <li><strong>复制格式</strong>：选择 <strong>"纯文本格式"</strong>（格式为 <code>IP:Port:User:Pass</code>）</li>
            <li>点击底部 <strong>"📋 一键复制"</strong> 按钮，将代理列表复制到剪贴板</li>
          </ol>
          ${realScreenshot(clientImgBase + '/export-modal-listtext.png', '在批量导出窗口中：选择协议 → <strong>列表文本</strong> → <strong>密码模式</strong> → <strong>纯文本格式</strong>，右侧显示代理列表', '步骤3')}
        </div>
      </div>

      <!-- 准备步骤4：理解代理格式 -->
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">4</div>
          <div class="step-title">理解提取的代理格式</div>
        </div>
        <div class="step-body">
          <p>复制后的代理信息格式如下，每行一条代理：</p>
          <table class="format-table">
            <thead>
              <tr>
                <th>格式类型</th>
                <th>HTTP 示例</th>
                <th>SOCKS5 示例</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>纯文本（密码模式）</strong><br><span style="color:#1a73e8;font-size:11px;">推荐 ✓</span></td>
                <td><code>192.168.1.101:10000:user_123:pass_xyz</code></td>
                <td><code>192.168.1.101:10000:user_123:pass_xyz</code></td>
              </tr>
              <tr>
                <td><strong>纯文本（白名单模式）</strong></td>
                <td><code>192.168.1.101:10000</code></td>
                <td><code>192.168.1.101:10000</code></td>
              </tr>
              <tr>
                <td><strong>标准URL（密码模式）</strong></td>
                <td><code>http://user_123:pass_xyz@192.168.1.101:10000</code></td>
                <td><code>socks5://user_123:pass_xyz@192.168.1.101:10000</code></td>
              </tr>
              <tr>
                <td><strong>标准URL（白名单模式）</strong></td>
                <td><code>http://192.168.1.101:10000</code></td>
                <td><code>socks5://192.168.1.101:10000</code></td>
              </tr>
            </tbody>
          </table>

          <div class="info-box">
            <strong>📝 字段说明（纯文本格式 <code>IP:Port:User:Pass</code>）：</strong><br>
            <table class="format-table" style="margin-top:8px;">
              <thead>
                <tr><th>字段</th><th>含义</th><th>云手机对应项</th><th>示例值</th></tr>
              </thead>
              <tbody>
                <tr><td><strong>IP</strong></td><td>代理服务器地址</td><td>代理主机 / 服务器地址</td><td><code>192.168.1.101</code></td></tr>
                <tr><td><strong>Port</strong></td><td>代理端口号</td><td>代理端口</td><td><code>10000</code></td></tr>
                <tr><td><strong>User</strong></td><td>认证用户名</td><td>代理账号 / 用户名</td><td><code>user_123</code></td></tr>
                <tr><td><strong>Pass</strong></td><td>认证密码</td><td>代理密码</td><td><code>pass_xyz</code></td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- ═══════ 云手机代理配置方法 ═══════ -->
      <h3>🔧 云手机代理配置方法</h3>
      <p>以下介绍几种常见的云手机代理配置方式：</p>

      <h4>方式一：通过云手机系统设置配置代理</h4>
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">1</div>
          <div class="step-title">打开 WiFi / 网络设置</div>
        </div>
        <div class="step-body">
          <p>在云手机中，进入 <strong>设置 → WiFi</strong>，长按当前连接的 WiFi 网络，选择 <strong>"修改网络"</strong>。</p>
        </div>
      </div>

      <div class="step-card">
        <div class="step-header">
          <div class="step-num">2</div>
          <div class="step-title">配置代理信息</div>
        </div>
        <div class="step-body">
          <p>在网络设置中，找到 <strong>"代理"</strong> 选项，选择 <strong>"手动"</strong>，然后填入以下信息：</p>
          <table class="format-table">
            <thead>
              <tr><th>字段</th><th>HTTP 代理填写</th><th>说明</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>代理主机名</strong></td><td><code>192.168.1.101</code></td><td>从量子代理提取的 IP 地址</td></tr>
              <tr><td><strong>代理端口</strong></td><td><code>10000</code></td><td>从量子代理提取的端口号</td></tr>
            </tbody>
          </table>
          <div class="info-box warning">
            <strong>⚠️ 注意：</strong>安卓系统原生 WiFi 代理设置仅支持 HTTP 代理，且不支持账号密码认证。如需使用 SOCKS5 或账密认证，请使用代理工具 App（见方式二）。
          </div>
        </div>
      </div>

      <h4>方式二：通过代理工具 App 配置（推荐）</h4>
      <div class="step-card">
        <div class="step-header">
          <div class="step-num">1</div>
          <div class="step-title">安装代理工具</div>
        </div>
        <div class="step-body">
          <p>在云手机中安装以下任一代理工具 App：</p>
          <ul>
            <li><strong>Postern</strong> — 支持 HTTP / SOCKS5，界面简洁，推荐使用</li>
            <li><strong>ProxyDroid</strong> — 功能强大，需要 Root 权限</li>
            <li><strong>SocksDroid</strong> — 轻量级 SOCKS5 代理工具</li>
            <li><strong>Drony</strong> — 支持多种代理协议，无需 Root</li>
          </ul>
        </div>
      </div>

      <div class="step-card">
        <div class="step-header">
          <div class="step-num">2</div>
          <div class="step-title">配置代理信息（以 Postern 为例）</div>
        </div>
        <div class="step-body">
          <p>打开 Postern，添加新的代理配置：</p>
          <ol>
            <li>点击 <strong>"添加代理服务器"</strong></li>
            <li><strong>代理类型</strong>：选择 <strong>HTTP</strong> 或 <strong>SOCKS5</strong></li>
            <li><strong>服务器地址</strong>：填入代理 IP，如 <code>192.168.1.101</code></li>
            <li><strong>端口</strong>：填入代理端口，如 <code>10000</code></li>
            <li><strong>用户名</strong>：填入 <code>user_123</code></li>
            <li><strong>密码</strong>：填入 <code>pass_xyz</code></li>
            <li>保存配置并 <strong>启用代理</strong></li>
          </ol>

          <div class="info-box">
            <strong>💡 提示：</strong>使用代理工具 App 的优势是支持全局代理，所有 App 的流量都会通过代理转发，且支持 SOCKS5 协议和账密认证。
          </div>
        </div>
      </div>

      <div class="step-card">
        <div class="step-header">
          <div class="step-num">3</div>
          <div class="step-title">验证代理是否生效</div>
        </div>
        <div class="step-body">
          <p>配置完成后，在云手机中打开浏览器，访问以下网站验证 IP：</p>
          <ul>
            <li><strong>whoer.net</strong> — 查看当前 IP 和地理位置</li>
            <li><strong>ipinfo.io</strong> — 查看 IP 详细信息</li>
            <li><strong>ip.sb</strong> — 快速查看当前出口 IP</li>
          </ul>
          <p>如果显示的 IP 地址与您配置的代理 IP 一致，说明代理已成功生效。</p>
        </div>
      </div>

      <h4>方式三：通过云手机平台内置代理功能</h4>
      <div class="step-card">
        <div class="step-body">
          <p>部分云手机平台（如雷电云、多多云等）内置了代理配置功能，可以直接在云手机管理后台设置代理：</p>
          <ol>
            <li>登录云手机管理后台</li>
            <li>找到目标云手机实例，点击 <strong>"网络设置"</strong> 或 <strong>"代理配置"</strong></li>
            <li>选择代理类型（HTTP / SOCKS5）</li>
            <li>填入代理 IP、端口、用户名、密码</li>
            <li>保存并重启云手机使配置生效</li>
          </ol>
          <div class="info-box">
            <strong>💡 提示：</strong>使用平台内置代理功能的好处是配置更简单，且代理在系统层面生效，无需额外安装 App。具体操作请参考您所使用的云手机平台文档。
          </div>
        </div>
      </div>

      <!-- 常见问题 -->
      <h3>❓ 常见问题</h3>
      <div class="step-card">
        <h4>Q: 云手机配置代理后无法上网？</h4>
        <ul>
          <li>检查代理信息是否填写正确（IP、端口、用户名、密码）</li>
          <li>确认代理协议类型与工具设置一致</li>
          <li>确认代理未过期且流量充足</li>
          <li>此 HTTP(S) / SOCKS5 代理需有外网环境才能连通</li>
        </ul>
      </div>
      <div class="step-card">
        <h4>Q: 安卓系统代理设置不支持账密认证怎么办？</h4>
        <p>安卓原生 WiFi 代理不支持账号密码认证，建议使用 <strong>Postern</strong>、<strong>Drony</strong> 等代理工具 App，或在量子代理客户端中切换为 <strong>白名单模式</strong>（将云手机的出口 IP 添加到白名单）。</p>
      </div>
    </div>`;
  }

  function getCloudPhoneMultiContent() {
    return `<div class="tutorial-content">
      <div class="info-box">
        <strong>📌 多开与批量管理</strong><br>
        本教程介绍如何高效管理多台云手机，并为每台云手机分配独立的代理 IP，实现多账号隔离运营。
      </div>

      <h3>📋 批量分配代理的流程</h3>
      <p>当您需要为多台云手机分别配置不同的代理 IP 时，可以按照以下流程操作：</p>

      <div class="step-card">
        <div class="step-header">
          <div class="step-num">1</div>
          <div class="step-title">批量提取代理</div>
        </div>
        <div class="step-body">
          <p>在量子代理客户端中，进入 <strong>"我的订单"</strong> → 点击对应订单 → 点击 <strong>⚡ 批量提取代理</strong>，一次性提取多条代理信息。</p>
          <div class="info-box">
            <strong>💡 提示：</strong>建议提取的代理数量与云手机数量一致，确保每台云手机分配一个独立 IP。
          </div>
        </div>
      </div>

      <div class="step-card">
        <div class="step-header">
          <div class="step-num">2</div>
          <div class="step-title">整理代理分配表</div>
        </div>
        <div class="step-body">
          <p>将提取的代理信息整理成对应关系表，方便逐一配置：</p>
          <table class="format-table">
            <thead>
              <tr><th>云手机编号</th><th>代理 IP</th><th>端口</th><th>用户名</th><th>密码</th><th>用途</th></tr>
            </thead>
            <tbody>
              <tr><td>云手机 #1</td><td><code>103.xx.xx.1</code></td><td><code>10001</code></td><td><code>user_001</code></td><td><code>pass_001</code></td><td>TikTok 账号 A</td></tr>
              <tr><td>云手机 #2</td><td><code>103.xx.xx.2</code></td><td><code>10002</code></td><td><code>user_002</code></td><td><code>pass_002</code></td><td>TikTok 账号 B</td></tr>
              <tr><td>云手机 #3</td><td><code>103.xx.xx.3</code></td><td><code>10003</code></td><td><code>user_003</code></td><td><code>pass_003</code></td><td>Facebook 账号 A</td></tr>
              <tr><td>...</td><td>...</td><td>...</td><td>...</td><td>...</td><td>...</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="step-card">
        <div class="step-header">
          <div class="step-num">3</div>
          <div class="step-title">逐一配置或批量导入</div>
        </div>
        <div class="step-body">
          <p>根据您使用的云手机平台，选择合适的配置方式：</p>
          <ul>
            <li><strong>逐一配置</strong>：逐台打开云手机，使用代理工具 App（如 Postern）配置对应的代理信息</li>
            <li><strong>批量导入</strong>：部分云手机平台支持通过后台批量导入代理配置，可将代理列表以 CSV 或文本格式导入</li>
            <li><strong>脚本自动化</strong>：高级用户可编写 ADB 脚本，批量推送代理配置到每台云手机</li>
          </ul>
        </div>
      </div>

      <div class="step-card">
        <div class="step-header">
          <div class="step-num">4</div>
          <div class="step-title">验证所有云手机的 IP</div>
        </div>
        <div class="step-body">
          <p>配置完成后，逐一检查每台云手机的出口 IP 是否正确：</p>
          <ol>
            <li>在每台云手机中打开浏览器，访问 <strong>ip.sb</strong> 或 <strong>whoer.net</strong></li>
            <li>确认显示的 IP 与分配的代理 IP 一致</li>
            <li>确认不同云手机显示的 IP 互不相同</li>
          </ol>
        </div>
      </div>

      <h3>⚙️ 管理最佳实践</h3>
      <div class="step-card">
        <div class="step-body">
          <table class="format-table">
            <thead>
              <tr><th>建议</th><th>说明</th></tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>一机一 IP</strong></td>
                <td>每台云手机绑定一个固定的代理 IP，避免多台设备共用同一 IP 导致关联风险</td>
              </tr>
              <tr>
                <td><strong>地域匹配</strong></td>
                <td>代理 IP 的地理位置应与目标平台的运营地区一致（如运营美国 TikTok 账号，使用美国 IP）</td>
              </tr>
              <tr>
                <td><strong>定期检查</strong></td>
                <td>定期验证代理连通性和 IP 一致性，及时更换异常代理</td>
              </tr>
              <tr>
                <td><strong>记录管理</strong></td>
                <td>维护云手机与代理的对应关系表，方便排查问题和后续管理</td>
              </tr>
              <tr>
                <td><strong>使用静态 IP</strong></td>
                <td>多账号运营场景建议使用静态住宅代理，确保 IP 长期不变</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>`;
  }

  function getCloudPhoneFaqContent() {
    return `<div class="tutorial-content">
      <div class="info-box">
        <strong>📌 云手机常见问题</strong><br>
        以下是使用云手机配合量子代理时的常见问题及解决方案。
      </div>

      <h3>❓ 常见问题</h3>

      <div class="step-card">
        <h4>Q: 云手机配置代理后无法上网怎么办？</h4>
        <div class="step-body">
          <p>请按以下步骤排查：</p>
          <ol>
            <li><strong>检查代理信息</strong>：确认 IP、端口、用户名、密码填写正确，注意不要有多余空格</li>
            <li><strong>检查协议类型</strong>：确保代理工具中选择的协议（HTTP/SOCKS5）与量子代理提取时选择的协议一致</li>
            <li><strong>检查代理状态</strong>：在量子代理客户端中确认代理未过期且流量充足</li>
            <li><strong>检查网络环境</strong>：此 HTTP(S) / SOCKS5 代理需有外网环境才能连通</li>
            <li><strong>重启代理工具</strong>：关闭并重新启用代理工具 App</li>
            <li><strong>重启云手机</strong>：如以上步骤无效，尝试重启云手机实例</li>
          </ol>
        </div>
      </div>

      <div class="step-card">
        <h4>Q: 云手机的 IP 和代理 IP 不一致？</h4>
        <div class="step-body">
          <p>可能原因：</p>
          <ul>
            <li>代理工具未正确启用，流量未经过代理转发</li>
            <li>部分 App 可能绕过了代理设置（如使用 UDP 协议的应用）</li>
            <li>WiFi 代理设置仅对 HTTP 流量生效，其他协议流量不受影响</li>
          </ul>
          <p><strong>解决方案：</strong>使用 <strong>Postern</strong> 等支持全局代理的工具，确保所有流量都通过代理转发。</p>
        </div>
      </div>

      <div class="step-card">
        <h4>Q: 安卓系统不支持 SOCKS5 代理怎么办？</h4>
        <div class="step-body">
          <p>安卓原生网络设置仅支持 HTTP 代理。如需使用 SOCKS5，请安装第三方代理工具：</p>
          <ul>
            <li><strong>Postern</strong>（推荐）— 支持 SOCKS5，无需 Root</li>
            <li><strong>SocksDroid</strong> — 轻量级 SOCKS5 工具</li>
            <li><strong>ProxyDroid</strong> — 功能全面，需 Root 权限</li>
          </ul>
        </div>
      </div>

      <div class="step-card">
        <h4>Q: 安卓原生代理不支持账密认证怎么办？</h4>
        <div class="step-body">
          <p>两种解决方案：</p>
          <ol>
            <li><strong>使用代理工具 App</strong>：安装 Postern 或 Drony，这些工具支持账号密码认证</li>
            <li><strong>切换为白名单模式</strong>：在量子代理客户端中，将授权方式改为 <strong>"白名单模式"</strong>，并将云手机的出口 IP 添加到白名单中。这样只需填入 IP 和端口，无需账密</li>
          </ol>
        </div>
      </div>

      <div class="step-card">
        <h4>Q: 多台云手机可以使用同一个代理 IP 吗？</h4>
        <div class="step-body">
          <p><strong>不建议。</strong>多台设备共用同一 IP 会增加平台检测到关联的风险。建议：</p>
          <ul>
            <li>每台云手机分配一个独立的代理 IP（一机一 IP）</li>
            <li>使用量子代理的 <strong>批量提取</strong> 功能，一次性获取足够数量的代理</li>
            <li>维护云手机与代理 IP 的对应关系表</li>
          </ul>
        </div>
      </div>

      <div class="step-card">
        <h4>Q: 云手机代理速度慢怎么优化？</h4>
        <div class="step-body">
          <p>优化建议：</p>
          <ul>
            <li><strong>选择就近节点</strong>：代理 IP 的地理位置尽量靠近云手机服务器所在地区</li>
            <li><strong>使用 HTTP 代理</strong>：HTTP 代理通常比 SOCKS5 速度更快，适合网页浏览场景</li>
            <li><strong>检查代理负载</strong>：如果代理响应慢，可尝试更换其他代理节点</li>
            <li><strong>升级套餐</strong>：使用更高带宽的代理套餐</li>
          </ul>
        </div>
      </div>

      <div class="step-card">
        <h4>Q: HTTP 和 SOCKS5 代理在云手机中应该选哪个？</h4>
        <div class="step-body">
          <p><strong>HTTP 代理</strong>：适合网页浏览、电商操作、社媒管理等 HTTP/HTTPS 场景，兼容性好，配置简单。<br>
          <strong>SOCKS5 代理</strong>：支持所有类型的网络流量（TCP/UDP），适合需要全局代理或使用非 HTTP 协议的场景（如某些游戏、即时通讯工具）。</p>
          <div class="info-box">
            <strong>💡 推荐：</strong>一般场景优先使用 <strong>HTTP</strong> 代理。如果需要全局代理或有特殊协议需求，选择 <strong>SOCKS5</strong>。
          </div>
        </div>
      </div>
    </div>`;
  }

  // 搜索功能
  function bindSearchEvents() {
    const searchInput = document.getElementById('help-search-input');
    const clearBtn = document.getElementById('help-search-clear');
    const resultsHint = document.getElementById('search-results-hint');

    if (!searchInput) return;

    searchInput.addEventListener('input', function(e) {
      const query = e.target.value.trim().toLowerCase();
      
      // 显示/隐藏清除按钮
      if (clearBtn) {
        clearBtn.classList.toggle('visible', query.length > 0);
      }

      if (query.length === 0) {
        // 清除搜索高亮
        document.querySelectorAll('.toc-chapter-item').forEach(el => {
          el.classList.remove('search-match');
        });
        document.querySelectorAll('.toc-sub-chapter-item').forEach(el => {
          el.classList.remove('search-match');
        });
        if (resultsHint) {
          resultsHint.classList.remove('visible');
        }
        return;
      }

      // 搜索匹配
      let matchCount = 0;
      document.querySelectorAll('.toc-chapter-item').forEach(el => {
        const text = el.textContent.toLowerCase();
        if (text.includes(query)) {
          el.classList.add('search-match');
          matchCount++;
          
          // 展开包含匹配项的分类
          const categoryId = el.getAttribute('data-category');
          const chapters = document.getElementById(`chapters-${categoryId}`);
          const header = document.querySelector(`[data-category="${categoryId}"] .toc-category-header`);
          if (chapters) chapters.classList.add('expanded');
          if (header) header.classList.add('active');
        } else {
          el.classList.remove('search-match');
        }
      });
      // 搜索子菜单项
      document.querySelectorAll('.toc-sub-chapter-item').forEach(el => {
        const text = el.textContent.toLowerCase();
        if (text.includes(query)) {
          el.classList.add('search-match');
          matchCount++;
          const categoryId = el.getAttribute('data-category');
          const chapterId = el.getAttribute('data-chapter');
          const chapters = document.getElementById(`chapters-${categoryId}`);
          const header = document.querySelector(`[data-category="${categoryId}"] .toc-category-header`);
          const subContainer = document.getElementById(`sub-${categoryId}-${chapterId}`);
          const parentItem = document.querySelector(`.toc-chapter-item[data-category="${categoryId}"][data-chapter="${chapterId}"]`);
          if (chapters) chapters.classList.add('expanded');
          if (header) header.classList.add('active');
          if (subContainer) subContainer.classList.add('expanded');
          if (parentItem) parentItem.classList.add('sub-expanded');
        } else {
          el.classList.remove('search-match');
        }
      });

      // 显示搜索结果数量
      if (resultsHint) {
        resultsHint.classList.add('visible');
        const countEl = document.getElementById('search-count');
        if (countEl) {
          countEl.textContent = matchCount;
        }
      }
    });

    // 回车键跳转到第一个匹配项
    searchInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        const firstMatch = document.querySelector('.toc-chapter-item.search-match');
        if (firstMatch) {
          const categoryId = firstMatch.getAttribute('data-category');
          const chapterId = firstMatch.getAttribute('data-chapter');
          selectChapter(categoryId, chapterId);
        }
      }
    });
  }

  // 清除搜索
  window.clearHelpSearch = function() {
    const searchInput = document.getElementById('help-search-input');
    const clearBtn = document.getElementById('help-search-clear');
    const resultsHint = document.getElementById('search-results-hint');

    if (searchInput) {
      searchInput.value = '';
      searchInput.focus();
    }
    if (clearBtn) {
      clearBtn.classList.remove('visible');
    }
    if (resultsHint) {
      resultsHint.classList.remove('visible');
    }

    // 清除搜索高亮
    document.querySelectorAll('.toc-chapter-item').forEach(el => {
      el.classList.remove('search-match');
    });
    document.querySelectorAll('.toc-sub-chapter-item').forEach(el => {
      el.classList.remove('search-match');
    });
  };

  // 打开帮助中心
  window.openHelpCenter = function() {
    const helpPage = document.getElementById('help-center-page');
    if (helpPage) {
      helpPage.classList.add('active');
      document.body.style.overflow = 'hidden';
      
      // 聚焦搜索框
      setTimeout(() => {
        const searchInput = document.getElementById('help-search-input');
        if (searchInput) searchInput.focus();
      }, 300);

      // 确保语言切换器存在并移动到帮助中心头部
      const headerContent = helpPage.querySelector('.header-content');
      if (headerContent) {
        const loginBtn = headerContent.querySelector('.login-btn');

        // 获取或创建语言切换器
        let switcher = document.getElementById('lang-switcher');
        if (!switcher) {
          // 如果语言切换器不存在，创建它
          if (typeof createSwitcher === 'function') {
            switcher = createSwitcher();
          }
        }

        // 如果仍然获取不到，尝试延迟获取
        if (!switcher) {
          setTimeout(() => {
            switcher = document.getElementById('lang-switcher');
            if (switcher && headerContent) {
               if (loginBtn) {
                headerContent.insertBefore(switcher, loginBtn);
              } else {
                headerContent.appendChild(switcher);
              }
            }
          }, 100);
        } else {
          // 把语言切换器放到登录按钮左侧
          if (loginBtn) {
            headerContent.insertBefore(switcher, loginBtn);
          } else {
            headerContent.appendChild(switcher);
          }
        }
      }
    }
  };

  // 关闭帮助中心
  window.closeHelpCenter = function() {
    const helpPage = document.getElementById('help-center-page');
    if (helpPage) {
      helpPage.classList.remove('active');
      document.body.style.overflow = '';

      // 检查是否通过 URL ?tab=help_center 进入的帮助中心
      const search = window.location.search || '';
      const params = new URLSearchParams(search);
      const currentTab = params.get('tab');

      if (currentTab === 'help_center') {
        // 通过 URL 进入的，需要导航回首页
        window.location.href = window.location.pathname;
        return;
      }

      // 从首页弹出的帮助中心，恢复首页显示
      const rootEl = document.getElementById('root');
      if (rootEl && rootEl.style.display === 'none') {
        rootEl.style.display = '';
      }

      // 将语言切换器移回合适的位置（如果已存在）
      const switcher = document.getElementById('lang-switcher');
      if (switcher) {
        // 首先尝试移回首页头部
        const headerContent = document.querySelector('#root .header-content');
        if (headerContent) {
          const loginBtn = headerContent.querySelector('.login-btn');
          if (loginBtn) {
            headerContent.insertBefore(switcher, loginBtn);
            return;
          } else {
            headerContent.appendChild(switcher);
            return;
          }
        }

        // 如果首页header不存在，检查是否在购买页面
        const isPurchasePage = params.get('tab') === 'purchase';
        
        if (isPurchasePage) {
          const ispAnchor = document.getElementById('isp-lang-anchor');
          if (ispAnchor) {
            ispAnchor.appendChild(switcher);
            return;
          }
        }

        // 如果都不存在，保持在body中（不应该发生，但作为fallback）
        if (!document.body.contains(switcher)) {
          document.body.appendChild(switcher);
        }
      } else {
        // 如果语言切换器不存在，尝试创建它
        setTimeout(function() {
          if (!document.getElementById('lang-switcher')) {
            insertSwitcher();
          }
        }, 100);
      }
    }
  };

  // 绑定帮助中心链接点击事件
  function bindHelpCenterLink() {
    // 使用 MutationObserver 监听 DOM 变化，因为内容是动态加载的（已节流）
    let helpDebounce = null;
    const observer = new MutationObserver(function(mutations) {
      if (helpDebounce) return; // 防抖：批量 DOM 变化只处理一次
      helpDebounce = setTimeout(function() {
        helpDebounce = null;
        const helpLinks = document.querySelectorAll('a');
        helpLinks.forEach(link => {
          if (link.textContent.trim() === '帮助中心' && !link.dataset.helpBound) {
            link.dataset.helpBound = 'true';
            link.addEventListener('click', function(e) {
              e.preventDefault();
              openHelpCenter();
            });
            link.style.cursor = 'pointer';
          }
        });
      }, 300);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    // 初始绑定
    setTimeout(() => {
      const helpLinks = document.querySelectorAll('a');
      helpLinks.forEach(link => {
        if (link.textContent.trim() === '帮助中心' && !link.dataset.helpBound) {
          link.dataset.helpBound = 'true';
          link.addEventListener('click', function(e) {
            e.preventDefault();
            openHelpCenter();
          });
          link.style.cursor = 'pointer';
        }
      });
    }, 1000);
  }

  // ESC 键关闭帮助中心
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeHelpCenter();
    }
  });

  // 页面加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHelpCenter);
  } else {
    initHelpCenter();
  }
})();
