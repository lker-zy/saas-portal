(function() {
  'use strict';

  // ═══════════════════════════════════════════
  //  Data — country mapping, inventory, biz types
  // ═══════════════════════════════════════════

  var countryToCode = {
    'United States': 'US', 'American': 'US', '美国': 'US',
    'United Kingdom': 'GB', 'UK': 'GB', '英国': 'GB',
    'Hong Kong': 'HK', '香港': 'HK',
    'Singapore': 'SG', '新加坡': 'SG',
    'Japan': 'JP', '日本': 'JP',
    'Germany': 'DE', '德国': 'DE',
    'France': 'FR', '法国': 'FR',
    'Canada': 'CA', '加拿大': 'CA',
    'Brazil': 'BR', '巴西': 'BR',
    'Korea': 'KR', '韩国': 'KR',
    'Indonesia': 'ID', '印度尼西亚': 'ID',
    'India': 'IN', 'Indie': 'IN', '印度': 'IN'
  };

  var codeToName = {
    'US': '美国', 'GB': '英国', 'HK': '香港', 'SG': '新加坡',
    'JP': '日本', 'DE': '德国', 'FR': '法国', 'CA': '加拿大',
    'BR': '巴西', 'KR': '韩国', 'ID': '印度尼西亚', 'IN': '印度'
  };

  var inventoryData = {
    'US': { available: 1200, status: 'in_stock' },
    'GB': { available: 800, status: 'in_stock' },
    'HK': { available: 35, status: 'low_stock' },
    'SG': { available: 600, status: 'in_stock' },
    'JP': { available: 12, status: 'low_stock' },
    'DE': { available: 400, status: 'in_stock' },
    'FR': { available: 300, status: 'in_stock' },
    'CA': { available: 500, status: 'in_stock' },
    'BR': { available: 200, status: 'in_stock' },
    'KR': { available: 150, status: 'in_stock' },
    'ID': { available: 100, status: 'in_stock' },
    'IN': { available: 0, status: 'out_of_stock' }
  };

  // Business categories with products
  var BIZ_TYPES = [
    { id: 'ecommerce', name: '跨境电商', icon: '🛒',
      products: [
        { id: 'amazon', name: 'Amazon', color: '#FF9900' },
        { id: 'ebay', name: 'eBay', color: '#E53238' },
        { id: 'shopify', name: 'Shopify', color: '#96BF48' },
        { id: 'tiktok_shop', name: 'TikTok Shop', color: '#010101' },
        { id: 'shopee', name: 'Shopee', color: '#EE4D2D' },
        { id: 'etsy', name: 'Etsy', color: '#F56400' },
        { id: 'walmart', name: 'Walmart', color: '#0071CE' }
      ]
    },
    { id: 'social', name: '社媒营销', icon: '📱',
      products: [
        { id: 'facebook', name: 'Facebook', color: '#1877F2' },
        { id: 'instagram', name: 'Instagram', color: '#E4405F' },
        { id: 'tiktok_live', name: 'TikTok Live', color: '#010101' },
        { id: 'whatsapp', name: 'WhatsApp', color: '#25D366' },
        { id: 'twitter', name: 'Twitter / X', color: '#1DA1F2' },
        { id: 'telegram', name: 'Telegram', color: '#26A5E4' }
      ]
    },
    { id: 'scraping', name: '数据采集', icon: '🔍',
      products: [
        { id: 'seo', name: 'SEO Monitoring', color: '#4285F4' },
        { id: 'price', name: 'Price Comparison', color: '#34A853' },
        { id: 'crawler', name: '通用爬虫', color: '#7C3AED' }
      ]
    },
    { id: 'ai', name: 'AI 访问', icon: '🤖',
      products: [
        { id: 'chatgpt', name: 'ChatGPT / OpenAI', color: '#10A37F' },
        { id: 'gemini', name: 'Gemini', color: '#4285F4' },
        { id: 'claude', name: 'Claude', color: '#D97706' },
        { id: 'midjourney', name: 'Midjourney', color: '#000000' }
      ]
    },
    { id: 'game', name: '网络游戏', icon: '🎮',
      products: [
        { id: 'steam', name: 'Steam', color: '#1B2838' },
        { id: 'blizzard', name: 'Blizzard', color: '#00AEFF' },
        { id: 'epic', name: 'Epic Games', color: '#313131' }
      ]
    },
    { id: 'other', name: '其他', icon: '💼',
      products: [
        { id: 'other', name: '其他场景', color: '#6B7280' }
      ]
    }
  ];

  // Brand logos – loaded via Google Favicon API (colored, app-store style)
  // Format: https://www.google.com/s2/favicons?domain={domain}&sz=64
  var BRAND_SVGS = {
    // ── E-commerce ──
    amazon:     '<img src="https://www.google.com/s2/favicons?domain=amazon.com&sz=64" width="18" height="18" alt="Amazon" style="object-fit:contain;border-radius:3px">',
    ebay:       '<img src="https://www.google.com/s2/favicons?domain=ebay.com&sz=64" width="18" height="18" alt="eBay" style="object-fit:contain;border-radius:3px">',
    shopify:    '<img src="https://www.google.com/s2/favicons?domain=shopify.com&sz=64" width="18" height="18" alt="Shopify" style="object-fit:contain;border-radius:3px">',
    tiktok_shop:'<img src="https://www.google.com/s2/favicons?domain=tiktok.com&sz=64" width="18" height="18" alt="TikTok Shop" style="object-fit:contain;border-radius:3px">',
    shopee:     '<img src="https://www.google.com/s2/favicons?domain=shopee.com&sz=64" width="18" height="18" alt="Shopee" style="object-fit:contain;border-radius:3px">',
    etsy:       '<img src="https://www.google.com/s2/favicons?domain=etsy.com&sz=64" width="18" height="18" alt="Etsy" style="object-fit:contain;border-radius:3px">',
    walmart:    '<img src="https://www.google.com/s2/favicons?domain=walmart.com&sz=64" width="18" height="18" alt="Walmart" style="object-fit:contain;border-radius:3px">',
    // ── Social ──
    facebook:   '<img src="https://www.google.com/s2/favicons?domain=facebook.com&sz=64" width="18" height="18" alt="Facebook" style="object-fit:contain;border-radius:3px">',
    instagram:  '<img src="https://www.google.com/s2/favicons?domain=instagram.com&sz=64" width="18" height="18" alt="Instagram" style="object-fit:contain;border-radius:3px">',
    tiktok_live:'<img src="https://www.google.com/s2/favicons?domain=tiktok.com&sz=64" width="18" height="18" alt="TikTok Live" style="object-fit:contain;border-radius:3px">',
    whatsapp:   '<img src="https://www.google.com/s2/favicons?domain=whatsapp.com&sz=64" width="18" height="18" alt="WhatsApp" style="object-fit:contain;border-radius:3px">',
    twitter:    '<img src="https://www.google.com/s2/favicons?domain=x.com&sz=64" width="18" height="18" alt="X" style="object-fit:contain;border-radius:3px">',
    telegram:   '<img src="https://www.google.com/s2/favicons?domain=telegram.org&sz=64" width="18" height="18" alt="Telegram" style="object-fit:contain;border-radius:3px">',
    // ── Data / Scraping （功能类，非品牌，保留图标）──
    seo:        '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>',
    price:      '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></svg>',
    crawler:    '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
    // ── AI ──
    chatgpt:    '<img src="https://www.google.com/s2/favicons?domain=chatgpt.com&sz=64" width="18" height="18" alt="ChatGPT" style="object-fit:contain;border-radius:3px">',
    gemini:     '<img src="https://www.google.com/s2/favicons?domain=gemini.google.com&sz=64" width="18" height="18" alt="Gemini" style="object-fit:contain;border-radius:3px">',
    claude:     '<img src="https://www.google.com/s2/favicons?domain=claude.ai&sz=64" width="18" height="18" alt="Claude" style="object-fit:contain;border-radius:3px">',
    midjourney: '<img src="https://www.google.com/s2/favicons?domain=midjourney.com&sz=64" width="18" height="18" alt="Midjourney" style="object-fit:contain;border-radius:3px">',
    // ── Games ──
    steam:      '<img src="https://www.google.com/s2/favicons?domain=store.steampowered.com&sz=64" width="18" height="18" alt="Steam" style="object-fit:contain;border-radius:3px">',
    blizzard:   '<img src="https://www.google.com/s2/favicons?domain=blizzard.com&sz=64" width="18" height="18" alt="Blizzard" style="object-fit:contain;border-radius:3px">',
    epic:       '<img src="https://www.google.com/s2/favicons?domain=epicgames.com&sz=64" width="18" height="18" alt="Epic Games" style="object-fit:contain;border-radius:3px">',
    // ── Other （通用类，保留图标）──
    other:      '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="7" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>'
  };

  // ═══════════════════════════════════════════
  //  Helpers
  // ═══════════════════════════════════════════

  function getRegionCode(text) {
    var keys = Object.keys(countryToCode);
    for (var i = 0; i < keys.length; i++) {
      if (text.indexOf(keys[i]) !== -1) return countryToCode[keys[i]];
    }
    return null;
  }

  function getRegionFromItem(el) {
    var text = el.textContent || el.innerText || '';
    var code = getRegionCode(text);
    if (!code) {
      var img = el.querySelector('img');
      if (img && img.alt) code = getRegionCode(img.alt);
    }
    if (!code) {
      var imgs = el.querySelectorAll('img');
      for (var i = 0; i < imgs.length; i++) {
        var src = imgs[i].src || '';
        if (src.indexOf('American') !== -1) { code = 'US'; break; }
        if (src.indexOf('UK') !== -1) { code = 'GB'; break; }
        if (src.indexOf('Hong') !== -1 || src.indexOf('HK') !== -1) { code = 'HK'; break; }
        if (src.indexOf('Singapore') !== -1) { code = 'SG'; break; }
        if (src.indexOf('Japan') !== -1) { code = 'JP'; break; }
        if (src.indexOf('Germany') !== -1) { code = 'DE'; break; }
        if (src.indexOf('France') !== -1) { code = 'FR'; break; }
        if (src.indexOf('Canada') !== -1) { code = 'CA'; break; }
        if (src.indexOf('Brazil') !== -1) { code = 'BR'; break; }
        if (src.indexOf('Korea') !== -1) { code = 'KR'; break; }
        if (src.indexOf('Indonesia') !== -1) { code = 'ID'; break; }
        if (src.indexOf('Indie') !== -1 || src.indexOf('India') !== -1) { code = 'IN'; break; }
      }
    }
    return code;
  }

  function getFlagImg(el) {
    var img = el.querySelector('img.country-flag-img') || el.querySelector('img');
    return img ? img.src : '';
  }

  // ═══════════════════════════════════════════
  //  Out-of-stock Card Overlay
  // ═══════════════════════════════════════════

  function showOosOverlay(countryItem, regionCode) {
    // Ensure the country-item has position:relative
    countryItem.style.position = 'relative';
    countryItem.style.overflow = 'hidden';
    countryItem.classList.remove('clicked-active');

    // Remove existing overlay if present
    var existing = countryItem.querySelector('.oos-card-overlay');
    if (existing) existing.remove();

    var overlay = document.createElement('div');
    overlay.className = 'oos-card-overlay';
    overlay.innerHTML =
      '<div class="oos-badge"><span class="dot"></span>暂时缺货</div>' +
      '<button class="oos-notify-btn" data-region="' + regionCode + '">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>' +
        '补货通知' +
      '</button>';

    // Prevent underlying card click
    overlay.addEventListener('click', function(e) {
      e.stopPropagation();
    });

    countryItem.appendChild(overlay);

    // Auto-dismiss after 6 seconds
    var timer = setTimeout(function() {
      if (overlay.parentNode) {
        overlay.style.transition = 'opacity 0.3s ease';
        overlay.style.opacity = '0';
        setTimeout(function() { overlay.remove(); }, 300);
      }
    }, 6000);

    // Click on "补货通知" button → open modal
    overlay.querySelector('.oos-notify-btn').addEventListener('click', function(e) {
      e.stopPropagation();
      clearTimeout(timer);
      overlay.remove();
      openRestockModal(regionCode, getFlagImg(countryItem));
    });
  }

  // ═══════════════════════════════════════════
  //  Toast Notification
  // ═══════════════════════════════════════════

  function showOosToast(countryName) {
    // Remove old toasts
    document.querySelectorAll('.oos-toast').forEach(function(t) { t.remove(); });

    var toast = document.createElement('div');
    toast.className = 'oos-toast';
    toast.innerHTML =
      '<div class="oos-toast-icon">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>' +
      '</div>' +
      '<div class="oos-toast-text">' +
        '<div class="title">' + (countryName || '该地区') + ' · 暂时缺货</div>' +
        '<div class="subtitle">点击卡片上的"补货通知"可订阅到货提醒</div>' +
      '</div>';

    document.body.appendChild(toast);

    setTimeout(function() {
      toast.classList.add('leaving');
      setTimeout(function() { toast.remove(); }, 350);
    }, 3500);
  }

  // ═══════════════════════════════════════════
  //  Restock Notification Modal
  // ═══════════════════════════════════════════

  function openRestockModal(regionCode, flagImgSrc) {
    var countryName = codeToName[regionCode] || regionCode;
    var selectedBiz = null;
    var selectedProduct = null;

    // Remove any existing modal
    var old = document.getElementById('restock-modal-backdrop');
    if (old) old.remove();

    // Build modal HTML
    var backdrop = document.createElement('div');
    backdrop.className = 'restock-backdrop';
    backdrop.id = 'restock-modal-backdrop';

    var flagHTML = flagImgSrc
      ? '<img class="restock-country-flag" src="' + flagImgSrc + '" alt="' + countryName + '">'
      : '<div class="restock-country-flag" style="background:linear-gradient(135deg,#e0e7ff,#c7d2fe);display:flex;align-items:center;justify-content:center;font-size:24px">🌍</div>';

    var bizCardsHTML = '';
    BIZ_TYPES.forEach(function(biz) {
      bizCardsHTML +=
        '<div class="biz-type-card" data-biz="' + biz.id + '">' +
          '<div class="biz-icon">' + biz.icon + '</div>' +
          '<div class="biz-name">' + biz.name + '</div>' +
        '</div>';
    });

    backdrop.innerHTML =
      '<div class="restock-modal">' +
        // Header
        '<div class="restock-header">' +
          '<button class="restock-close-btn" id="restock-close">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>' +
          '</button>' +
          '<div class="restock-country-row">' +
            flagHTML +
            '<div class="restock-country-info">' +
              '<h3>' + countryName + '</h3>' +
              '<span class="oos-tag"><span class="dot"></span>当前缺货中</span>' +
            '</div>' +
          '</div>' +
          '<div class="restock-header-desc">' +
            '<svg class="icon-bell" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>' +
            '<span>订阅补货通知后，一旦 <b style="color:#1f2937">' + countryName + '</b> 地区恢复库存，我们将第一时间通过邮件通知您。</span>' +
          '</div>' +
        '</div>' +

        // Body (form)
        '<div class="restock-body" id="restock-body">' +
          // Step 1: Business Type
          '<div class="restock-form-group">' +
            '<div class="restock-form-label"><span class="step-num">1</span>业务类型</div>' +
            '<div class="biz-type-grid" id="biz-grid">' + bizCardsHTML + '</div>' +
          '</div>' +

          // Step 2: Product (dynamic, initially hidden)
          '<div class="restock-form-group" id="product-section" style="display:none">' +
            '<div class="restock-form-label"><span class="step-num">2</span>具体产品</div>' +
            '<div class="product-chips-wrap" id="product-chips"></div>' +
          '</div>' +

          // Step 3: Contact
          '<div class="restock-form-group">' +
            '<div class="restock-form-label"><span class="step-num">3</span>通知邮箱</div>' +
            '<div class="restock-input-wrap">' +
              '<div class="restock-input-prefix">' +
                '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>' +
              '</div>' +
              '<input class="restock-input" id="restock-email" type="email" placeholder="请输入您的邮箱地址" autocomplete="email">' +
            '</div>' +
          '</div>' +

          // Step 4: Human Verification (CAPTCHA)
          '<div class="restock-form-group">' +
            '<div class="restock-form-label"><span class="step-num">4</span>人机验证</div>' +
            '<div class="restock-captcha-box" id="rcap-box">' +
              '<div class="restock-captcha-bar" id="rcap-bar">' +
                '<div class="cap-checkbox" id="rcap-checkbox">' +
                  '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>' +
                '</div>' +
                '<span class="cap-text" id="rcap-text">点击进行人机验证</span>' +
              '</div>' +
              '<div class="rcap-popup-area" id="rcap-popup" style="display:none">' +
                '<div class="rcap-popup-hd">' +
                  '<span>请完成安全验证</span>' +
                  '<button type="button" class="rcap-close" id="rcap-close-btn">' +
                    '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>' +
                  '</button>' +
                '</div>' +
                '<div class="rcap-canvas-wrap">' +
                  '<canvas id="rcap-canvas" width="260" height="145" style="width:100%;height:auto;display:block"></canvas>' +
                  '<button type="button" class="rcap-refresh" id="rcap-refresh-btn" title="换一张">' +
                    '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>' +
                  '</button>' +
                  '<div id="rcap-overlay" style="display:none"></div>' +
                '</div>' +
                '<div class="rcap-slider" id="rcap-slider">' +
                  '<div class="rcap-slider-fill" id="rcap-fill"></div>' +
                  '<span class="rcap-slider-text" id="rcap-slider-text">拖动滑块完成拼图</span>' +
                  '<div class="rcap-slider-handle" id="rcap-handle">' +
                    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1A73E8" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>' +
                  '</div>' +
                '</div>' +
                '<div class="rcap-footer">' +
                  '<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>' +
                  '<span>安全验证由系统提供</span>' +
                '</div>' +
              '</div>' +
            '</div>' +
          '</div>' +

          // Step 5: Email Verification Code
          '<div class="restock-form-group">' +
            '<div class="restock-form-label"><span class="step-num">5</span>邮箱验证</div>' +
            '<div class="restock-verify-section" id="verify-section">' +
              '<div class="restock-verify-hint" id="verify-hint">' +
                '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>' +
                '<span>请先完成人机验证后再发送验证码</span>' +
              '</div>' +
              '<div class="restock-verify-row">' +
                '<input class="restock-verify-input" id="restock-code" type="text" maxlength="6" placeholder="输入6位验证码" autocomplete="off">' +
                '<button type="button" class="restock-send-code-btn" id="send-code-btn" disabled>发送验证码</button>' +
              '</div>' +
              '<div class="restock-verify-status" id="verify-status" style="display:none"></div>' +
            '</div>' +
          '</div>' +

        '</div>' +

        // Footer
        '<div class="restock-footer">' +
          '<button class="restock-submit-btn primary" id="restock-submit" disabled>' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>' +
            '订阅补货通知' +
          '</button>' +
          '<div class="restock-footer-note">我们承诺不会向您发送垃圾邮件，仅在库存恢复时通知。</div>' +
        '</div>' +
      '</div>';

    document.body.appendChild(backdrop);

    // ── Element references ──
    var modal = backdrop.querySelector('.restock-modal');
    var bizGrid = document.getElementById('biz-grid');
    var productSection = document.getElementById('product-section');
    var productChips = document.getElementById('product-chips');
    var emailInput = document.getElementById('restock-email');
    var submitBtn = document.getElementById('restock-submit');

    // CAPTCHA elements
    var rcapBox = document.getElementById('rcap-box');
    var rcapBar = document.getElementById('rcap-bar');
    var rcapCheckbox = document.getElementById('rcap-checkbox');
    var rcapText = document.getElementById('rcap-text');
    var rcapPopup = document.getElementById('rcap-popup');
    var rcapCloseBtn = document.getElementById('rcap-close-btn');
    var rcapCanvas = document.getElementById('rcap-canvas');
    var rcapRefresh = document.getElementById('rcap-refresh-btn');
    var rcapOverlay = document.getElementById('rcap-overlay');
    var rcapSlider = document.getElementById('rcap-slider');
    var rcapFill = document.getElementById('rcap-fill');
    var rcapSliderText = document.getElementById('rcap-slider-text');
    var rcapHandle = document.getElementById('rcap-handle');

    // Email verification elements
    var verifySection = document.getElementById('verify-section');
    var verifyHint = document.getElementById('verify-hint');
    var codeInput = document.getElementById('restock-code');
    var sendCodeBtn = document.getElementById('send-code-btn');
    var verifyStatus = document.getElementById('verify-status');

    // ── Verification state ──
    var captchaVerified = false;
    var emailCodeVerified = false;
    var modalClosed = false;
    var captchaData = { targetX: 0, targetY: 0, bgData: null, pieceCanvas: null };
    var capPos = 0;
    var capDragging = false;
    var capStartX = 0;
    var capSliderW = 0;
    var codeCountdown = 0;
    var codeCountdownTimer = null;
    var generatedCode = '';
    var CAP_W = 260, CAP_H = 145, CAP_S = 40, CAP_R = 7, CAP_TOL = 6;

    // ── Close function ──
    function closeModal() {
      modalClosed = true;
      backdrop.classList.add('closing');
      if (codeCountdownTimer) clearInterval(codeCountdownTimer);
      setTimeout(function() { backdrop.remove(); }, 300);
    }

    document.getElementById('restock-close').addEventListener('click', closeModal);
    backdrop.addEventListener('click', function(e) {
      if (e.target === backdrop) closeModal();
    });
    document.addEventListener('keydown', function handler(e) {
      if (e.key === 'Escape') { closeModal(); document.removeEventListener('keydown', handler); }
    });

    // ═══════════════════════════════
    //  CAPTCHA – Puzzle Verification
    // ═══════════════════════════════

    function capPiecePath(ctx, x, y, s, r) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + s / 2 - r, y);
      ctx.arc(x + s / 2, y, r, Math.PI, 0, false);
      ctx.lineTo(x + s, y);
      ctx.lineTo(x + s, y + s / 2 - r);
      ctx.arc(x + s, y + s / 2, r, -Math.PI / 2, Math.PI / 2, false);
      ctx.lineTo(x + s, y + s);
      ctx.lineTo(x, y + s);
      ctx.closePath();
    }

    function capPaintBg(ctx, w, h) {
      var pals = [
        ['#0d47a1','#1976d2','#42a5f5','#90caf9'],
        ['#bf360c','#e65100','#ff9800','#ffcc02'],
        ['#1b5e20','#388e3c','#66bb6a','#a5d6a7'],
        ['#4a148c','#7b1fa2','#ab47bc','#ce93d8'],
        ['#880e4f','#c2185b','#f06292','#f8bbd0'],
        ['#006064','#00838f','#00bcd4','#80deea'],
        ['#37474f','#546e7a','#78909c','#b0bec5']
      ];
      var p = pals[Math.floor(Math.random() * pals.length)];
      var g = ctx.createLinearGradient(0, 0, w, h);
      g.addColorStop(0, p[0]); g.addColorStop(0.35, p[1]);
      g.addColorStop(0.65, p[2]); g.addColorStop(1, p[3]);
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
      for (var i = 0; i < 18; i++) {
        ctx.beginPath();
        ctx.arc(Math.random() * w, Math.random() * h, Math.random() * 28 + 6, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,' + (Math.random() * 0.12 + 0.03) + ')';
        ctx.fill();
      }
      for (var j = 0; j < 6; j++) {
        ctx.beginPath();
        ctx.moveTo(Math.random() * w, Math.random() * h);
        ctx.bezierCurveTo(Math.random()*w, Math.random()*h, Math.random()*w, Math.random()*h, Math.random()*w, Math.random()*h);
        ctx.strokeStyle = 'rgba(255,255,255,' + (Math.random() * 0.1 + 0.04) + ')';
        ctx.lineWidth = Math.random() * 2 + 1;
        ctx.stroke();
      }
      for (var k = 0; k < 10; k++) {
        var dx = Math.random() * w, dy = Math.random() * h, ds = Math.random() * 10 + 4;
        ctx.beginPath();
        ctx.moveTo(dx, dy - ds); ctx.lineTo(dx + ds, dy);
        ctx.lineTo(dx, dy + ds); ctx.lineTo(dx - ds, dy);
        ctx.closePath();
        ctx.fillStyle = 'rgba(255,255,255,' + (Math.random() * 0.08 + 0.02) + ')';
        ctx.fill();
      }
    }

    function capRedraw(xPct) {
      if (!rcapCanvas || !rcapCanvas.getContext) return;
      var ctx = rcapCanvas.getContext('2d');
      if (!captchaData.bgData || !captchaData.pieceCanvas) return;
      ctx.putImageData(captchaData.bgData, 0, 0);
      var maxX = CAP_W - captchaData.pieceCanvas.width;
      var px = (xPct / 100) * maxX;
      ctx.save();
      ctx.shadowColor = 'rgba(0,0,0,0.35)';
      ctx.shadowBlur = 6;
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;
      ctx.drawImage(captchaData.pieceCanvas, px, captchaData.targetY - CAP_R);
      ctx.restore();
    }

    function generateCaptcha() {
      captchaVerified = false;
      capPos = 0;
      rcapOverlay.style.display = 'none';
      rcapSlider.className = 'rcap-slider';
      rcapFill.style.width = '0%';
      rcapSliderText.textContent = '拖动滑块完成拼图';
      rcapHandle.className = 'rcap-slider-handle';
      rcapHandle.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1A73E8" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';
      rcapHandle.style.left = '0px';

      var ctx = rcapCanvas.getContext('2d');
      capPaintBg(ctx, CAP_W, CAP_H);

      var PAD = CAP_R + 3;
      var minTx = Math.floor(CAP_W * 0.4);
      var maxTx = CAP_W - CAP_S - CAP_R - PAD;
      var tx = Math.floor(Math.random() * (maxTx - minTx) + minTx);
      var ty = Math.floor(Math.random() * (CAP_H - CAP_S - PAD * 2) + PAD);
      captchaData.targetX = tx;
      captchaData.targetY = ty;

      var full = ctx.getImageData(0, 0, CAP_W, CAP_H);

      // Extract puzzle piece
      var pw = CAP_S + CAP_R + 4, ph = CAP_S + CAP_R + 4;
      var pc = document.createElement('canvas');
      pc.width = pw; pc.height = ph;
      var pCtx = pc.getContext('2d');
      pCtx.save();
      capPiecePath(pCtx, 0, CAP_R, CAP_S, CAP_R);
      pCtx.clip();
      pCtx.drawImage(rcapCanvas, tx, ty - CAP_R, pw, ph, 0, 0, pw, ph);
      pCtx.restore();
      pCtx.save();
      capPiecePath(pCtx, 0, CAP_R, CAP_S, CAP_R);
      pCtx.strokeStyle = 'rgba(255,255,255,0.85)';
      pCtx.lineWidth = 2;
      pCtx.stroke();
      pCtx.restore();
      captchaData.pieceCanvas = pc;

      // Draw hole on background
      ctx.putImageData(full, 0, 0);
      ctx.save();
      capPiecePath(ctx, tx, ty, CAP_S, CAP_R);
      ctx.fillStyle = 'rgba(0,0,0,0.45)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,0.3)';
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.restore();

      captchaData.bgData = ctx.getImageData(0, 0, CAP_W, CAP_H);
      capRedraw(0);
    }

    // CAPTCHA bar click → show puzzle
    rcapBar.addEventListener('click', function() {
      if (captchaVerified) return;
      rcapPopup.style.display = 'block';
      generateCaptcha();
    });

    // Close / Refresh CAPTCHA
    rcapCloseBtn.addEventListener('click', function() { rcapPopup.style.display = 'none'; });
    rcapRefresh.addEventListener('click', function() { generateCaptcha(); });

    // Slider drag handlers
    function capHandleStart(clientX) {
      if (captchaVerified || modalClosed) return;
      capStartX = clientX;
      capSliderW = rcapSlider.offsetWidth || CAP_W;
      capDragging = true;
      rcapSlider.classList.add('dragging');
      rcapSlider.classList.remove('failed');
    }
    function capHandleMove(clientX) {
      if (!capDragging || captchaVerified || modalClosed) return;
      var pct = Math.min(Math.max(((clientX - capStartX) / (capSliderW - 32)) * 100, 0), 100);
      capPos = pct;
      rcapFill.style.width = pct + '%';
      rcapHandle.style.left = 'calc(' + pct + '% - ' + (pct * 0.32) + 'px)';
      capRedraw(pct);
    }
    function capHandleEnd() {
      if (!capDragging || modalClosed) return;
      capDragging = false;
      rcapSlider.classList.remove('dragging');

      var maxX = CAP_W - (CAP_S + CAP_R + 4);
      var cx = (capPos / 100) * maxX;
      if (Math.abs(cx - captchaData.targetX) <= CAP_TOL) {
        // ✓ Success
        captchaVerified = true;
        rcapSlider.classList.add('verified');
        rcapHandle.classList.add('verified');
        rcapSliderText.textContent = '✓ 验证通过';
        rcapHandle.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>';
        rcapOverlay.className = 'rcap-overlay success';
        rcapOverlay.style.display = 'flex';
        rcapOverlay.innerHTML = '<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>';

        setTimeout(function() {
          rcapPopup.style.display = 'none';
          rcapBar.classList.add('verified');
          rcapBox.classList.add('verified');
          rcapCheckbox.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>';
          rcapText.textContent = '✓ 人机验证已通过';
          // Unlock email verification
          verifySection.classList.add('active');
          verifyHint.innerHTML =
            '<svg viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>' +
            '<span>人机验证已通过，请发送并输入邮箱验证码</span>';
          verifyHint.style.color = '#16a34a';
          updateSendCodeState();
          validate();
        }, 800);
      } else {
        // ✕ Failed
        rcapSlider.classList.add('failed');
        rcapHandle.classList.add('failed');
        rcapSliderText.textContent = '✕ 请重试';
        rcapHandle.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
        rcapOverlay.className = 'rcap-overlay fail';
        rcapOverlay.style.display = 'flex';
        rcapOverlay.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';

        setTimeout(function() {
          capPos = 0;
          rcapFill.style.width = '0%';
          rcapHandle.style.left = '0px';
          rcapSlider.className = 'rcap-slider';
          rcapHandle.className = 'rcap-slider-handle';
          rcapSliderText.textContent = '拖动滑块完成拼图';
          rcapHandle.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1A73E8" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';
          rcapOverlay.style.display = 'none';
          capRedraw(0);
        }, 600);
      }
    }

    rcapHandle.addEventListener('mousedown', function(e) { e.preventDefault(); capHandleStart(e.clientX); });
    rcapHandle.addEventListener('touchstart', function(e) { capHandleStart(e.touches[0].clientX); }, { passive: true });
    document.addEventListener('mousemove', function(e) { capHandleMove(e.clientX); });
    document.addEventListener('touchmove', function(e) { if (capDragging) capHandleMove(e.touches[0].clientX); }, { passive: true });
    document.addEventListener('mouseup', capHandleEnd);
    document.addEventListener('touchend', capHandleEnd);

    // ═══════════════════════════════
    //  Email Verification Code
    // ═══════════════════════════════

    function updateSendCodeState() {
      var emailOk = emailInput.value.trim().length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim());
      sendCodeBtn.disabled = !captchaVerified || !emailOk || codeCountdown > 0;
    }

    codeInput.addEventListener('input', function() {
      codeInput.value = codeInput.value.replace(/\D/g, '').slice(0, 6);
      if (codeInput.value.length === 6) {
        if (generatedCode && codeInput.value === generatedCode) {
          emailCodeVerified = true;
          verifyStatus.style.display = 'flex';
          verifyStatus.className = 'restock-verify-status success';
          verifyStatus.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> 邮箱验证成功';
          codeInput.style.borderColor = '#22c55e';
        } else {
          emailCodeVerified = false;
          verifyStatus.style.display = 'flex';
          verifyStatus.className = 'restock-verify-status error';
          verifyStatus.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg> 验证码不正确，请重新输入';
          codeInput.style.borderColor = '#ef4444';
        }
      } else {
        emailCodeVerified = false;
        verifyStatus.style.display = 'none';
        codeInput.style.borderColor = '';
      }
      validate();
    });

    sendCodeBtn.addEventListener('click', function() {
      if (sendCodeBtn.disabled) return;
      var email = emailInput.value.trim();
      if (!email) return;

      sendCodeBtn.disabled = true;
      sendCodeBtn.textContent = '发送中...';
      generatedCode = String(Math.floor(100000 + Math.random() * 900000));

      // Try API first, fallback to demo mode
      fetch('/client/send-verification-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email })
      }).then(function(resp) {
        return resp.json();
      }).then(function(data) {
        if (data.code) generatedCode = data.code;
        startCodeCountdown();
        showCodeStatus('info',
          '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg> 验证码已发送至 ' + email);
      }).catch(function() {
        startCodeCountdown();
        showCodeStatus('info',
          '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg> 验证码已发送至 ' + email + ' <span style="color:#f59e0b">(演示码: ' + generatedCode + ')</span>');
      });
    });

    function showCodeStatus(type, html) {
      verifyStatus.style.display = 'flex';
      verifyStatus.className = 'restock-verify-status ' + type;
      verifyStatus.innerHTML = html;
    }

    function startCodeCountdown() {
      codeCountdown = 60;
      sendCodeBtn.textContent = '重新发送 (' + codeCountdown + 's)';
      sendCodeBtn.disabled = true;
      if (codeCountdownTimer) clearInterval(codeCountdownTimer);
      codeCountdownTimer = setInterval(function() {
        codeCountdown--;
        if (codeCountdown <= 0) {
          clearInterval(codeCountdownTimer);
          codeCountdownTimer = null;
          codeCountdown = 0;
          sendCodeBtn.textContent = '发送验证码';
          updateSendCodeState();
        } else {
          sendCodeBtn.textContent = '重新发送 (' + codeCountdown + 's)';
        }
      }, 1000);
    }

    // ── Validation (all 5 steps required) ──
    function validate() {
      var emailOk = emailInput.value.trim().length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim());
      var bizOk = !!selectedBiz;
      var prodOk = !!selectedProduct;
      // If "其他场景" is selected, the input must be filled
      if (prodOk && selectedProduct === 'other' && selectedBiz && selectedBiz.id === 'other') {
        var otherInput = document.getElementById('other-scene-input');
        if (otherInput && otherInput.value.trim().length === 0) {
          prodOk = false;
        }
      }
      var capOk = captchaVerified;
      var codeOk = emailCodeVerified;
      submitBtn.disabled = !(emailOk && bizOk && prodOk && capOk && codeOk);
    }

    emailInput.addEventListener('input', function() {
      updateSendCodeState();
      validate();
    });

    // ── Business type selection ──
    bizGrid.addEventListener('click', function(e) {
      var card = e.target.closest('.biz-type-card');
      if (!card) return;
      var bizId = card.dataset.biz;
      selectedBiz = BIZ_TYPES.find(function(b) { return b.id === bizId; });
      selectedProduct = null;

      // Update active state
      bizGrid.querySelectorAll('.biz-type-card').forEach(function(c) { c.classList.remove('selected'); });
      card.classList.add('selected');

      // Render products
      renderProducts(selectedBiz);
      validate();
    });

    // ── Render product chips ──
    function renderProducts(biz) {
      if (!biz) { productSection.style.display = 'none'; return; }
      productSection.style.display = 'block';

      var html = '';
      biz.products.forEach(function(prod) {
        var c = prod.color || '#6B7280';
        var brandSvg = BRAND_SVGS[prod.id];
        var avatarHTML;
        if (brandSvg) {
          var isImg = brandSvg.indexOf('<img') !== -1;
          if (isImg) {
            // Colored favicon → white bg, app-store style
            avatarHTML = '<span data-color="' + c + '" style="width:22px;height:22px;border-radius:6px;background:#fff;display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;box-shadow:0 1px 3px rgba(0,0,0,0.10);overflow:hidden">' + brandSvg + '</span>';
          } else {
            // White SVG icon → colored bg
          avatarHTML = '<span style="width:22px;height:22px;border-radius:6px;background:' + c + ';display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;box-shadow:0 2px 4px rgba(0,0,0,0.15)">' + brandSvg + '</span>';
          }
        } else {
          var letter = prod.name.charAt(0).toUpperCase();
          avatarHTML = '<span style="width:22px;height:22px;border-radius:6px;background:' + c + ';display:inline-flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#fff;flex-shrink:0;letter-spacing:0">' + letter + '</span>';
        }
        html +=
          '<div class="product-chip" data-product="' + prod.id + '">' +
            avatarHTML +
            '<span>' + prod.name + '</span>' +
            '<svg class="chip-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>' +
          '</div>';
      });
      // If business type is "other", add a text input next to the chip
      if (biz.id === 'other') {
        html += '<div class="other-scene-input-wrap">' +
          '<input class="other-scene-input" id="other-scene-input" type="text" placeholder="请描述您的使用场景" maxlength="100">' +
        '</div>';
      }

      productChips.innerHTML = html;

      // Bind input events for "other" scene input
      var otherInput = document.getElementById('other-scene-input');
      if (otherInput) {
        otherInput.addEventListener('input', function() { validate(); });
        otherInput.addEventListener('focus', function() {
          // Auto-select the "其他场景" chip when user starts typing
          var otherChip = productChips.querySelector('.product-chip[data-product="other"]');
          if (otherChip && !otherChip.classList.contains('selected')) {
            selectedProduct = 'other';
            productChips.querySelectorAll('.product-chip').forEach(function(c) { c.classList.remove('selected'); });
            otherChip.classList.add('selected');
          }
          validate();
        });
      }

      // Add fallback for favicon images that fail to load
      var brandImgs = productChips.querySelectorAll('.product-chip img');
      for (var bi = 0; bi < brandImgs.length; bi++) {
        (function(img) {
          img.onerror = function() {
            var parent = this.parentNode;
            if (!parent) return;
            var brandColor = parent.getAttribute('data-color') || '#6B7280';
            var chip = this.closest('.product-chip');
            var nameSpan = chip ? chip.querySelectorAll('span') : [];
            var name = nameSpan.length > 1 ? nameSpan[nameSpan.length - 1].textContent : (this.alt || '?');
            var letter = name.charAt(0).toUpperCase() || '?';
            parent.innerHTML = letter;
            parent.style.background = brandColor;
            parent.style.boxShadow = '0 2px 4px rgba(0,0,0,0.15)';
            parent.style.fontSize = '11px';
            parent.style.fontWeight = '700';
            parent.style.color = '#fff';
            parent.style.letterSpacing = '0';
          };
        })(brandImgs[bi]);
      }

      // Animate product chips in
      var chips = productChips.querySelectorAll('.product-chip');
      chips.forEach(function(chip, idx) {
        chip.style.opacity = '0';
        chip.style.transform = 'translateY(6px)';
        chip.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
        setTimeout(function() {
          chip.style.opacity = '1';
          chip.style.transform = 'translateY(0)';
        }, 40 * idx);
      });

      // Smooth scroll to products
      productSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // ── Product selection ──
    productChips.addEventListener('click', function(e) {
      var chip = e.target.closest('.product-chip');
      if (!chip) return;
      selectedProduct = chip.dataset.product;
      productChips.querySelectorAll('.product-chip').forEach(function(c) { c.classList.remove('selected'); });
      chip.classList.add('selected');

      // If "其他场景" is selected, focus the input field
      if (selectedProduct === 'other') {
        var otherInput = document.getElementById('other-scene-input');
        if (otherInput) {
          otherInput.classList.add('active');
          setTimeout(function() { otherInput.focus(); }, 50);
        }
      }
      validate();
    });

    // ── Submit ──
    submitBtn.addEventListener('click', function() {
      if (submitBtn.disabled) return;
      if (!captchaVerified || !emailCodeVerified) return;

      var email = emailInput.value.trim();
      var bizObj = selectedBiz;
      var prodName = '';
      if (bizObj) {
        var found = bizObj.products.find(function(p) { return p.id === selectedProduct; });
        prodName = found ? found.name : selectedProduct;
        // If "其他场景" with custom input, use the input value
        if (selectedProduct === 'other' && bizObj.id === 'other') {
          var otherInput = document.getElementById('other-scene-input');
          if (otherInput && otherInput.value.trim()) {
            prodName = '其他: ' + otherInput.value.trim();
          }
        }
      }

      // Simulate submitting
      submitBtn.disabled = true;
      submitBtn.innerHTML =
        '<svg class="animate-spin" style="width:16px;height:16px;animation:spin 1s linear infinite" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10" stroke-dasharray="60" stroke-dashoffset="20"/></svg>' +
        '提交中...';

      setTimeout(function() {
        // Save subscription locally
        var subs = JSON.parse(localStorage.getItem('qs-restock-subs') || '[]');
        subs.push({
          region: regionCode,
          country: countryName,
          bizType: bizObj ? bizObj.name : '',
          product: prodName,
          email: email,
          captchaVerified: true,
          emailVerified: true,
          time: new Date().toISOString()
        });
        localStorage.setItem('qs-restock-subs', JSON.stringify(subs));

        // Show success state
        var body = document.getElementById('restock-body');
        var footer = backdrop.querySelector('.restock-footer');
        body.innerHTML =
          '<div class="restock-success">' +
            '<div class="restock-success-icon">' +
              '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>' +
            '</div>' +
            '<h3>订阅成功！</h3>' +
            '<p>我们会在 <b>' + countryName + '</b> 地区恢复库存时<br>第一时间通知您。</p>' +
            '<div class="details-card">' +
              '<div class="detail-row"><span class="label">地区</span><span class="value">' + countryName + ' (' + regionCode + ')</span></div>' +
              '<div class="detail-row"><span class="label">业务类型</span><span class="value">' + (bizObj ? bizObj.icon + ' ' + bizObj.name : '-') + '</span></div>' +
              '<div class="detail-row"><span class="label">目标产品</span><span class="value">' + (prodName || '-') + '</span></div>' +
              '<div class="detail-row"><span class="label">通知邮箱</span><span class="value">' + email + '</span></div>' +
            '</div>' +
            '<div class="close-countdown" id="close-cd">将在 <b>5</b> 秒后自动关闭</div>' +
          '</div>';
        footer.style.display = 'none';

        // Countdown to auto-close
        var count = 5;
        var cdEl = document.getElementById('close-cd');
        var cdTimer = setInterval(function() {
          count--;
          if (cdEl) cdEl.innerHTML = '将在 <b>' + count + '</b> 秒后自动关闭';
          if (count <= 0) {
            clearInterval(cdTimer);
            closeModal();
          }
        }, 1000);

      }, 1200); // Simulate API delay
    });

    // Focus email on open
    setTimeout(function() { emailInput.focus(); }, 400);
  }

  // ═══════════════════════════════════════════
  //  Inventory Check & Redirect
  // ═══════════════════════════════════════════

  function checkInventoryAndRedirect(regionCode, clickedItem) {
    var inv = inventoryData[regionCode];
    if (inv && inv.status === 'out_of_stock') {
      // For oos items, directly open restock modal
      openRestockModal(regionCode, getFlagImg(clickedItem));
      return;
    }

    // ── Smooth page transition ──
    var overlay = document.getElementById('page-transition-overlay');
    if (overlay) overlay.classList.add('active');
    
    // Save scroll position
    sessionStorage.setItem('home_scroll_pos', window.scrollY);
    
    var targetUrl = window.location.pathname + '?tab=purchase&product=buy_static_isp&region=' + regionCode;
    setTimeout(function() { window.location.href = targetUrl; }, 380);
  }

  // ═══════════════════════════════════════════
  //  Scan & Mark Out-of-Stock Country Items
  // ═══════════════════════════════════════════

  function markOosItems() {
    var items = document.querySelectorAll('.country-item');
    items.forEach(function(item) {
      // Skip already-marked items
      if (item.classList.contains('oos-item')) return;

      var regionCode = getRegionFromItem(item);
      if (!regionCode) return;

      var inv = inventoryData[regionCode];
      if (!inv || inv.status !== 'out_of_stock') return;

      // Mark with class
      item.classList.add('oos-item');

      // Inject the hover overlay layer
      var layer = document.createElement('div');
      layer.className = 'oos-hover-layer';
      
      // "Sold Out" Icon (Heroicons archive-box-x-mark style)
      // Replaces text "缺货"
      var soldOutIcon = 
        '<div class="oos-icon-wrapper">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="oos-main-icon">' +
            '<path d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3.251l4.286 5.828M15 10.751l-4.286 5.828m4.286-5.828l-4.286-5.828m4.286 5.828H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5" />' +
          '</svg>' +
          '<span class="oos-icon-label">已售罄</span>' +
        '</div>';

      layer.innerHTML =
        soldOutIcon +
        '<button class="oos-hover-notify" data-region="' + regionCode + '">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
            '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/>' +
            '<path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>' +
          '</svg>' +
          '补货通知' +
        '</button>';

      // Click on notify button → open restock modal
      layer.querySelector('.oos-hover-notify').addEventListener('click', function(e) {
        e.stopPropagation();
        e.preventDefault();
        openRestockModal(regionCode, getFlagImg(item));
      });

      // Prevent hover-layer clicks from bubbling to card
      layer.addEventListener('click', function(e) {
        e.stopPropagation();
      });

      item.appendChild(layer);

      // Inject a small red corner dot (always visible indicator)
      var dot = document.createElement('span');
      dot.className = 'oos-corner-dot';
      item.appendChild(dot);
    });
  }

  // Run immediately + observe for dynamically rendered items（已节流）
  markOosItems();
  var oosDebounce = null;
  var oosObserver = new MutationObserver(function() {
    if (oosDebounce) return;
    oosDebounce = setTimeout(function() { oosDebounce = null; markOosItems(); }, 300);
  });
  var countryList = document.querySelector('.country-list');
  if (countryList) {
    oosObserver.observe(countryList, { childList: true, subtree: true });
  } else {
    // Fallback: observe body and find list later
    var bodyObs = new MutationObserver(function() {
      var cl = document.querySelector('.country-list');
      if (cl) {
        bodyObs.disconnect();
        markOosItems();
        oosObserver.observe(cl, { childList: true, subtree: true });
      }
    });
    bodyObs.observe(document.body, { childList: true, subtree: true });
  }

  // ═══════════════════════════════════════════
  //  Click Handler (event delegation)
  // ═══════════════════════════════════════════

  document.addEventListener('click', function(e) {
    // Don't interfere with hover overlay buttons
    if (e.target.closest('.oos-hover-layer')) return;
    if (e.target.closest('.oos-card-overlay')) return;

    var countryItem = e.target.closest('.country-item');
    if (!countryItem) return;

    e.preventDefault();
    e.stopPropagation();

    // If it's an out-of-stock item, open restock modal directly
    if (countryItem.classList.contains('oos-item')) {
      var rc = getRegionFromItem(countryItem);
      if (rc) openRestockModal(rc, getFlagImg(countryItem));
      return;
    }

    countryItem.classList.add('clicked-active');

    var regionCode = getRegionFromItem(countryItem);

    if (regionCode) {
      checkInventoryAndRedirect(regionCode, countryItem);
    } else {
      countryItem.classList.remove('clicked-active');
    }
  }, true);

  // ═══════════════════════════════════════════
  //  Pricing Button "立即购买" Click Handler
  // ═══════════════════════════════════════════

  document.addEventListener('click', function(e) {
    var btn = e.target.closest('.pricing-btn');
    if (!btn) return;

    // Prevent double-click
    if (btn.classList.contains('is-loading')) return;

    e.preventDefault();
    e.stopPropagation();

    // ── Ripple effect ──
    var ripple = document.createElement('span');
    ripple.className = 'btn-ripple';
    var rect = btn.getBoundingClientRect();
    var size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
    ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
    btn.appendChild(ripple);
    ripple.addEventListener('animationend', function() {
      ripple.remove();
    });

    // ── Determine product type from pricing card title ──
    var card = btn.closest('.pricing-card');
    var cardTitle = card ? (card.querySelector('.card-title') || card.querySelector('h3')) : null;
    var titleText = cardTitle ? cardTitle.textContent.trim() : '';

    // Map card title to product parameter
    var productParam = 'buy_static_isp'; // default: 静态住宅IP
    if (titleText.indexOf('动态') !== -1) {
      productParam = 'buy_dynamic_residential';
    } else if (titleText.indexOf('数据中心') !== -1) {
      productParam = 'buy_datacenter';
    }

    // ── Special handling for Dynamic Residential IP (Out of Stock) ──
    if (productParam === 'buy_dynamic_residential') {
      openRestockModal('动态住宅IP', null);
      return;
    }

    // ── Loading state ──
    btn.classList.add('is-loading');

    // ── Smooth page transition ──
    var overlay = document.getElementById('page-transition-overlay');
    if (overlay) overlay.classList.add('active');

    // Save scroll position
    sessionStorage.setItem('home_scroll_pos', window.scrollY);

    // Navigate after transition animation
    var targetUrl = window.location.pathname + '?tab=purchase&product=' + productParam;
    setTimeout(function() {
      window.location.href = targetUrl;
    }, 400);
  }, true);

})();