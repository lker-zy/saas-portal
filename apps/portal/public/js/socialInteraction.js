/**
 * socialInteraction.js
 * 为页脚社交图标添加交互功能：悬浮 tooltip、点击打开链接/弹窗
 * 桌面端、平板端、手机端全兼容
 */
(function () {
  'use strict';

  /* ── 社交平台配置 ── */
  var platforms = {
    wechat:    { name: '微信',      color: '#07C160', action: 'none',   link: '' },
    send:      { name: 'Telegram',  color: '#26A5E4', action: 'link',   link: 'https://t.me/quantum_proxies' },
    instagram: { name: 'Instagram', color: '#E4405F', action: 'link',   link: 'https://www.instagram.com/quantumproxy' },
    facebook:  { name: 'Facebook',  color: '#1877F2', action: 'link',   link: 'https://www.facebook.com/quantumproxy' },
    'whats-app': { name: 'WhatsApp', color: '#25D366', action: 'link',  link: 'https://wa.me/message/quantumproxy' },
    youtube:   { name: 'YouTube',   color: '#FF0000', action: 'link',   link: 'https://www.youtube.com/@quantumproxy' },
    medium:    { name: 'Medium',    color: '#000000', action: 'link',   link: 'https://medium.com/@quantumproxy' }
  };

  /* ── 判断是否移动端 ── */
  function isMobile() {
    return window.innerWidth <= 768;
  }
  function isTablet() {
    return window.innerWidth > 768 && window.innerWidth <= 1024;
  }

  /* ══════════════════════════════════════
     Tooltip
     ══════════════════════════════════════ */
  var tooltip = null;

  function ensureTooltip() {
    if (tooltip) return tooltip;
    tooltip = document.createElement('div');
    tooltip.className = 'social-tooltip';
    tooltip.style.cssText =
      'position:fixed;z-index:99999;pointer-events:none;opacity:0;' +
      'padding:6px 14px;border-radius:8px;font-size:13px;font-weight:500;' +
      'color:#fff;white-space:nowrap;transition:opacity .2s ease,transform .2s ease;' +
      'transform:translateY(4px);box-shadow:0 4px 16px rgba(0,0,0,.2);';
    document.body.appendChild(tooltip);
    return tooltip;
  }

  function showTooltip(el, text, color) {
    var t = ensureTooltip();
    t.textContent = text;
    t.style.background = color || 'rgba(30,41,59,.92)';
    t.style.opacity = '1';
    t.style.transform = 'translateY(0)';
    positionTooltip(el);
  }

  function positionTooltip(el) {
    var t = ensureTooltip();
    var rect = el.getBoundingClientRect();
    var tw = t.offsetWidth;
    var left = rect.left + rect.width / 2 - tw / 2;
    if (left < 8) left = 8;
    if (left + tw > window.innerWidth - 8) left = window.innerWidth - tw - 8;
    t.style.left = left + 'px';
    t.style.top = (rect.top - t.offsetHeight - 10) + 'px';
  }

  function hideTooltip() {
    if (!tooltip) return;
    tooltip.style.opacity = '0';
    tooltip.style.transform = 'translateY(4px)';
  }

  /* ══════════════════════════════════════
     微信弹窗 (Modal)
     ══════════════════════════════════════ */
  function showWeChatModal() {
    // 如果已经存在则不重复创建
    if (document.getElementById('wechat-modal-overlay')) return;

    var overlay = document.createElement('div');
    overlay.id = 'wechat-modal-overlay';
    overlay.style.cssText =
      'position:fixed;inset:0;z-index:100000;display:flex;align-items:center;justify-content:center;' +
      'background:rgba(0,0,0,.5);backdrop-filter:blur(4px);opacity:0;transition:opacity .3s ease;';

    var modal = document.createElement('div');
    modal.className = 'wechat-modal';
    modal.style.cssText =
      'background:#fff;border-radius:20px;padding:36px 32px 28px;max-width:360px;width:90%;' +
      'text-align:center;position:relative;box-shadow:0 24px 64px rgba(0,0,0,.2);' +
      'transform:scale(.9);transition:transform .3s ease;';

    modal.innerHTML =
      '<button class="wechat-modal-close" style="position:absolute;top:12px;right:14px;background:none;border:none;font-size:22px;cursor:pointer;color:#94a3b8;line-height:1;padding:4px;border-radius:50%;transition:all .2s;" onmouseover="this.style.color=\'#1e293b\';this.style.background=\'#f1f5f9\'" onmouseout="this.style.color=\'#94a3b8\';this.style.background=\'none\'">&times;</button>' +
      '<div style="width:64px;height:64px;border-radius:50%;background:linear-gradient(135deg,#07C160,#06AD56);display:flex;align-items:center;justify-content:center;margin:0 auto 18px;">' +
        '<svg viewBox="64 64 896 896" width="32" height="32" fill="#fff">' +
          '<path d="M690.1 377.4c5.9 0 11.8.2 17.6.5-24.4-128.7-158.3-227.1-319.9-227.1C209 150.8 64 271.4 64 420.2c0 81.1 43.6 154.2 111.9 203.6a21.5 21.5 0 019.1 17.6c0 2.4-.5 4.6-1.1 6.9-5.5 20.3-14.2 52.8-14.6 54.3-.7 2.6-1.7 5.2-1.7 7.9 0 5.9 4.8 10.8 10.8 10.8 2.3 0 4.2-.9 6.2-2l70.9-40.9c5.3-3.1 11-5 17.2-5 3.2 0 6.4.5 9.5 1.4 33.1 9.5 68.8 14.8 105.7 14.8 6 0 11.9-.1 17.8-.4-7.1-21-10.9-43.1-10.9-66 0-135.8 132.2-245.8 295.3-245.8zm-194.3-86.5c23.8 0 43.2 19.3 43.2 43.1s-19.3 43.1-43.2 43.1c-23.8 0-43.2-19.3-43.2-43.1s19.4-43.1 43.2-43.1zm-215.9 86.2c-23.8 0-43.2-19.3-43.2-43.1s19.3-43.1 43.2-43.1 43.2 19.3 43.2 43.1-19.4 43.1-43.2 43.1zm586.8 415.6c56.9-41.2 93.2-102 93.2-169.7 0-124-120.8-224.5-269.9-224.5-149 0-269.9 100.5-269.9 224.5S540.9 847.5 690 847.5c30.8 0 60.6-4.4 88.1-12.3 2.6-.8 5.2-1.2 7.9-1.2 5.2 0 9.9 1.6 14.3 4.1l59.1 34c1.7 1 3.3 1.7 5.2 1.7a9 9 0 006.4-2.6 9 9 0 002.6-6.4c0-2.2-.9-4.4-1.4-6.6-.3-1.2-7.6-28.3-12.2-45.3-.5-1.9-.9-3.8-.9-5.7.1-5.9 3.1-11.2 7.6-14.5zM600.2 587.2c-19.9 0-36-16.1-36-35.9 0-19.8 16.1-35.9 36-35.9s36 16.1 36 35.9c0 19.8-16.2 35.9-36 35.9zm179.9 0c-19.9 0-36-16.1-36-35.9 0-19.8 16.1-35.9 36-35.9s36 16.1 36 35.9a36.08 36.08 0 01-36 35.9z"/>' +
        '</svg>' +
      '</div>' +
      '<h3 style="font-size:20px;font-weight:700;color:#1e293b;margin:0 0 6px;">添加微信</h3>' +
      '<p style="font-size:14px;color:#64748b;margin:0 0 24px;line-height:1.5;">扫描下方二维码或搜索微信号添加</p>' +

      '<!-- 二维码占位 -->' +
      '<div style="width:180px;height:180px;margin:0 auto 16px;background:#f8fafc;border-radius:16px;border:2px dashed #cbd5e1;display:flex;align-items:center;justify-content:center;color:#94a3b8;font-size:13px;">二维码位置</div>' +

      '<div style="display:flex;align-items:center;justify-content:center;gap:8px;margin-bottom:20px;">' +
        '<span style="font-size:13px;color:#64748b;">微信号：</span>' +
        '<span id="wechat-id-text" style="font-size:15px;font-weight:600;color:#1e293b;letter-spacing:.5px;">QuantumProxy_CS</span>' +
        '<button id="wechat-copy-btn" style="background:#f1f5f9;border:1px solid #e2e8f0;border-radius:8px;padding:4px 12px;font-size:12px;color:#475569;cursor:pointer;transition:all .2s;">复制</button>' +
      '</div>' +

      '<p style="font-size:12px;color:#94a3b8;margin:0;">工作时间：周一至周五 9:00 - 18:00</p>';

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    // 动画入场
    requestAnimationFrame(function () {
      overlay.style.opacity = '1';
      modal.style.transform = 'scale(1)';
    });

    // 关闭按钮
    var closeBtn = modal.querySelector('.wechat-modal-close');
    closeBtn.addEventListener('click', function () { closeWeChatModal(overlay, modal); });

    // 点击遮罩关闭
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeWeChatModal(overlay, modal);
    });

    // ESC 关闭
    function onKey(e) { if (e.key === 'Escape') { closeWeChatModal(overlay, modal); document.removeEventListener('keydown', onKey); } }
    document.addEventListener('keydown', onKey);

    // 复制功能
    var copyBtn = document.getElementById('wechat-copy-btn');
    var wechatId = document.getElementById('wechat-id-text');
    if (copyBtn && wechatId) {
      copyBtn.addEventListener('click', function () {
        var text = wechatId.textContent;
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(function () {
            copyBtn.textContent = '已复制 ✓';
            copyBtn.style.background = '#07C160';
            copyBtn.style.color = '#fff';
            copyBtn.style.borderColor = '#07C160';
            setTimeout(function () {
              copyBtn.textContent = '复制';
              copyBtn.style.background = '#f1f5f9';
              copyBtn.style.color = '#475569';
              copyBtn.style.borderColor = '#e2e8f0';
            }, 2000);
          });
        } else {
          // fallback
          var ta = document.createElement('textarea');
          ta.value = text;
          ta.style.cssText = 'position:fixed;left:-9999px;';
          document.body.appendChild(ta);
          ta.select();
          document.execCommand('copy');
          document.body.removeChild(ta);
          copyBtn.textContent = '已复制 ✓';
          setTimeout(function () { copyBtn.textContent = '复制'; }, 2000);
        }
      });
    }
  }

  function closeWeChatModal(overlay, modal) {
    overlay.style.opacity = '0';
    modal.style.transform = 'scale(.9)';
    setTimeout(function () { if (overlay.parentNode) overlay.parentNode.removeChild(overlay); }, 300);
  }

  /* ══════════════════════════════════════
     绑定交互
     ══════════════════════════════════════ */
  function bindSocialInteractions() {
    var icons = document.querySelectorAll('.social-icons .social-icon');
    if (!icons || icons.length === 0) return;

    icons.forEach(function (icon) {
      // 防止重复绑定
      if (icon.dataset.socialBound === '1') return;
      icon.dataset.socialBound = '1';

      // 通过 aria-label 识别平台
      var label = icon.getAttribute('aria-label') || '';
      var cfg = platforms[label];
      if (!cfg) return;

      // 设置 title (无障碍)
      icon.setAttribute('title', cfg.name);
      icon.style.cursor = 'pointer';
      icon.style.position = 'relative';

      /* ─ 桌面端: hover tooltip ─ */
      icon.addEventListener('mouseenter', function () {
        if (isMobile()) return;
        showTooltip(icon, cfg.name, cfg.color);
        // 品牌色 hover
        icon.style.background = cfg.color;
        icon.style.color = '#fff';
        icon.style.transform = 'translateY(-4px) scale(1.1)';
        icon.style.boxShadow = '0 8px 24px ' + hexToRgba(cfg.color, 0.4);
      });

      icon.addEventListener('mouseleave', function () {
        hideTooltip();
        icon.style.background = '';
        icon.style.color = '';
        icon.style.transform = '';
        icon.style.boxShadow = '';
      });

      /* ─ 手机端: 点击涟漪 + 动作 ─ */
      icon.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();

        // 涟漪动画
        createRipple(icon, cfg.color);

        if (cfg.action === 'popup') {
          showWeChatModal();
        } else if (cfg.link) {
          // 延迟打开让涟漪有时间播放
          setTimeout(function () {
            window.open(cfg.link, '_blank', 'noopener,noreferrer');
          }, 200);
        }
      });

      /* ─ 手机端: 长按显示名称 Toast ─ */
      var pressTimer = null;
      icon.addEventListener('touchstart', function (e) {
        pressTimer = setTimeout(function () {
          showMobileToast(cfg.name, cfg.color);
        }, 500);
      }, { passive: true });
      icon.addEventListener('touchend', function () {
        clearTimeout(pressTimer);
      });
      icon.addEventListener('touchmove', function () {
        clearTimeout(pressTimer);
      });
    });
  }

  /* ══════════════════════════════════════
     涟漪效果
     ══════════════════════════════════════ */
  function createRipple(el, color) {
    var ripple = document.createElement('span');
    ripple.style.cssText =
      'position:absolute;border-radius:50%;transform:scale(0);opacity:.5;pointer-events:none;' +
      'background:' + (color || '#fff') + ';animation:socialRipple .5s ease-out forwards;';
    var size = Math.max(el.offsetWidth, el.offsetHeight) * 2;
    ripple.style.width = size + 'px';
    ripple.style.height = size + 'px';
    ripple.style.left = '50%';
    ripple.style.top = '50%';
    ripple.style.marginLeft = -(size / 2) + 'px';
    ripple.style.marginTop = -(size / 2) + 'px';

    // 需要 position relative
    if (getComputedStyle(el).position === 'static') {
      el.style.position = 'relative';
    }
    // 微信图标需要 overflow:visible 来显示二维码弹窗
    if (!el.classList.contains('wechat-icon-wrapper')) {
      el.style.overflow = 'hidden';
    }
    el.appendChild(ripple);
    setTimeout(function () { if (ripple.parentNode) ripple.parentNode.removeChild(ripple); }, 600);
  }

  /* ══════════════════════════════════════
     手机端 Toast
     ══════════════════════════════════════ */
  function showMobileToast(text, color) {
    var existing = document.getElementById('social-toast');
    if (existing) existing.parentNode.removeChild(existing);

    var toast = document.createElement('div');
    toast.id = 'social-toast';
    toast.textContent = text;
    toast.style.cssText =
      'position:fixed;bottom:80px;left:50%;transform:translateX(-50%) translateY(10px);' +
      'z-index:100001;padding:10px 24px;border-radius:24px;font-size:14px;font-weight:500;' +
      'color:#fff;background:' + (color || 'rgba(30,41,59,.9)') + ';' +
      'box-shadow:0 8px 24px rgba(0,0,0,.15);opacity:0;transition:all .3s ease;';
    document.body.appendChild(toast);

    requestAnimationFrame(function () {
      toast.style.opacity = '1';
      toast.style.transform = 'translateX(-50%) translateY(0)';
    });

    setTimeout(function () {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(10px)';
      setTimeout(function () { if (toast.parentNode) toast.parentNode.removeChild(toast); }, 300);
    }, 1500);
  }

  /* ── 工具函数 ── */
  function hexToRgba(hex, alpha) {
    var r = 0, g = 0, b = 0;
    if (hex.length === 7) {
      r = parseInt(hex.slice(1, 3), 16);
      g = parseInt(hex.slice(3, 5), 16);
      b = parseInt(hex.slice(5, 7), 16);
    }
    return 'rgba(' + r + ',' + g + ',' + b + ',' + alpha + ')';
  }

  /* ══════════════════════════════════════
     注入 CSS keyframes
     ══════════════════════════════════════ */
  function injectStyles() {
    if (document.getElementById('social-interaction-styles')) return;
    var style = document.createElement('style');
    style.id = 'social-interaction-styles';
    style.textContent =
      '@keyframes socialRipple {' +
        '0% { transform: scale(0); opacity: .4; }' +
        '100% { transform: scale(1); opacity: 0; }' +
      '}' +

      /* 覆盖 hover 默认样式，让 JS 控制品牌色 */
      '.social-icons .social-icon[data-social-bound="1"] {' +
        'transition: all .3s cubic-bezier(.4,0,.2,1) !important;' +
      '}' +
      '.social-icons .social-icon[data-social-bound="1"]:not(.wechat-icon-wrapper) {' +
        'overflow: hidden;' +
      '}' +

      /* 手机端触摸反馈 */
      '@media (max-width: 768px) {' +
        '.social-icons .social-icon[data-social-bound="1"]:active {' +
          'transform: scale(.9) !important;' +
        '}' +
      '}' +

      /* 平板端稍大点击区域 */
      '@media (min-width: 769px) and (max-width: 1024px) {' +
        '.social-icons .social-icon[data-social-bound="1"] {' +
          'width: 42px !important;' +
          'height: 42px !important;' +
          'font-size: 18px !important;' +
        '}' +
      '}';
    document.head.appendChild(style);
  }

  /* ══════════════════════════════════════
     启动
     ══════════════════════════════════════ */
  function init() {
    injectStyles();
    bindSocialInteractions();
  }

  // DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // 监听 DOM 变化（React 可能重新渲染）
  var observer = new MutationObserver(function () {
    bindSocialInteractions();
  });
  observer.observe(document.body, { childList: true, subtree: true });

  // 兜底定时检查
  setInterval(function () {
    bindSocialInteractions();
  }, 1000);

})();

