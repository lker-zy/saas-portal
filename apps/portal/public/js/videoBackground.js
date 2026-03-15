(function () {
  // ====== 设备检测 & 视频源 ======
  var isMobileDevice = window.innerWidth <= 768;
  var firstVideoSrc = isMobileDevice ? '/assets/sample2_optimized.mp4' : '/assets/sample2.mp4';
  var loopVideoSrc  = isMobileDevice ? '/assets/sample_optimized.mp4'  : '/assets/sample.mp4';

  // ====== 状态变量 ======
  var videoContainer = null;
  var video1 = null;          // 片头视频（播放一次）
  var video2 = null;          // 循环视频
  var heroSection = null;
  var phase = 'idle';         // idle → intro → switching → loop → fallback
  var video2Ready = false;    // video2 是否已可流畅播放

  // ====== 工具函数 ======
  function log(msg) { console.log('[Video] ' + msg); }
  function warn(msg) { console.warn('[Video] ' + msg); }

  /**
   * 安全播放：检查 src，捕获所有异常
   */
  function safePlay(v) {
    if (!v) return null;
    if (!v.src || v.src === '' || v.src === location.href) {
      warn('safePlay: no src on video');
      return null;
    }
    try {
      var p = v.play();
      if (p && p.then) {
        p.catch(function (e) { warn('safePlay rejected: ' + e.message); });
        return p;
      }
    } catch (e) {
      warn('safePlay threw: ' + e.message);
    }
    return null;
  }

  // ====== 核心切换逻辑 ======

  /**
   * 将 video2 设为前台循环播放，淡出 video1
   * 关键：先让 video2 可见 & 播放，延迟一帧后再淡出 video1，避免黑闪
   */
  function activateLoopVideo() {
    phase = 'loop';
    log('Phase → loop (video2 active)');

    // video2 提到前台
    video2.style.zIndex = '2';
    video2.style.opacity = '1';

    // 延迟淡出 video1，确保 video2 画面已渲染
    setTimeout(function () {
      video1.style.opacity = '0';
      video1.style.zIndex = '1';
      // 等淡出动画结束后暂停 video1 释放资源
      setTimeout(function () {
        try { video1.pause(); } catch (e) {}
      }, 1300); // 比 CSS transition 1.2s 稍长
    }, 50);
  }

  /**
   * 兜底：video2 无法播放时，让 video1 循环
   */
  function fallbackToVideo1Loop() {
    warn('Falling back: looping video1');
    phase = 'fallback';

    video1.style.opacity = '1';
    video1.style.zIndex = '2';
    video2.style.opacity = '0';
    video2.style.zIndex = '1';
    try { video2.pause(); video2.currentTime = 0; } catch (e) {}

    video1.loop = true;
    video1.currentTime = 0;
    safePlay(video1);
  }

  /**
   * 执行从 video1 → video2 的切换
   * 只允许在 phase === 'intro' 时调用，且只执行一次
   */
  function doSwitch() {
    if (phase !== 'intro') return;   // 已切换过或正在切换
    phase = 'switching';
    log('Phase → switching');

    // 检查 video2 源
    if (!video2.src || video2.src === '' || video2.src === location.href) {
      warn('video2 has no src');
      fallbackToVideo1Loop();
      return;
    }

    // 确保属性正确
    video2.muted = true;
    video2.loop = true;
    video2.currentTime = 0;

    // 如果 video2 已经就绪，直接切换
    if (video2Ready) {
      var p = safePlay(video2);
      if (p && p.then) {
        p.then(function () {
          activateLoopVideo();
        }).catch(function () {
          fallbackToVideo1Loop();
        });
      } else {
        fallbackToVideo1Loop();
      }
      return;
    }

    // video2 尚未就绪，等待 canplaythrough 或超时
    log('Waiting for video2 to be ready...');
    var switched = false;

    function onReady() {
      if (switched) return;
      switched = true;
      video2.removeEventListener('canplaythrough', onReady);
      clearTimeout(readyTimeout);
      log('video2 ready, playing...');

      var p = safePlay(video2);
      if (p && p.then) {
        p.then(function () {
          activateLoopVideo();
        }).catch(function () {
          fallbackToVideo1Loop();
        });
      } else {
        fallbackToVideo1Loop();
      }
    }

    video2.addEventListener('canplaythrough', onReady);

    // 超时 3 秒：强制尝试播放，如果失败则 fallback
    var readyTimeout = setTimeout(function () {
      if (switched) return;
      switched = true;
      video2.removeEventListener('canplaythrough', onReady);
      warn('video2 ready timeout, force attempting play...');

      var p = safePlay(video2);
      if (p && p.then) {
        p.then(function () {
          activateLoopVideo();
        }).catch(function () {
          fallbackToVideo1Loop();
        });
      } else {
        fallbackToVideo1Loop();
      }
    }, 3000);
  }

  // ====== video2 播放监控 ======
  function startVideo2Monitor() {
    setInterval(function () {
      if (phase !== 'loop' || !video2) return;
      if (!video2.src || video2.src === '' || video2.src === location.href) return;
      if (document.hidden) return;

      if (video2.paused) {
        warn('video2 paused unexpectedly, resuming...');
        video2.muted = true;
        safePlay(video2);
      }
    }, 2000);
  }

  // ====== 初始化 ======
  function initVideo() {
    if (document.getElementById('global-hero-video-container')) return;

    videoContainer = document.createElement('div');
    videoContainer.id = 'global-hero-video-container';
    videoContainer.style.display = 'block';

    // ── video1：片头（播放一次） ──
    video1 = document.createElement('video');
    video1.className = 'hero-video';
    video1.muted = true;
    video1.loop = false;
    video1.playsInline = true;
    video1.preload = 'auto';
    video1.setAttribute('playsinline', '');
    video1.setAttribute('webkit-playsinline', '');
    video1.setAttribute('x5-playsinline', '');
    video1.setAttribute('x5-video-player-type', 'h5');
    video1.setAttribute('x5-video-player-fullscreen', 'false');
    video1.setAttribute('aria-hidden', 'true');
    video1.setAttribute('disablePictureInPicture', '');
    video1.setAttribute('disableRemotePlayback', '');
    video1.style.zIndex = '2';
    video1.style.opacity = '1';

    // ── video2：循环视频 ──
    video2 = document.createElement('video');
    video2.className = 'hero-video';
    video2.muted = true;
    video2.loop = true;
    video2.playsInline = true;
    video2.preload = 'auto';
    video2.setAttribute('playsinline', '');
    video2.setAttribute('webkit-playsinline', '');
    video2.setAttribute('x5-playsinline', '');
    video2.setAttribute('x5-video-player-type', 'h5');
    video2.setAttribute('x5-video-player-fullscreen', 'false');
    video2.setAttribute('aria-hidden', 'true');
    video2.setAttribute('disablePictureInPicture', '');
    video2.setAttribute('disableRemotePlayback', '');
    video2.style.zIndex = '1';
    video2.style.opacity = '0';

    // ── 立即设置 src 并开始加载 ──
    video1.src = firstVideoSrc;
    video2.src = loopVideoSrc;
    video1.load();
    video2.load();
    log('Sources set: video1=' + firstVideoSrc + ', video2=' + loopVideoSrc);

    // ── 标记 video2 就绪 ──
    video2.addEventListener('canplaythrough', function () {
      if (!video2Ready) {
        video2Ready = true;
        log('video2 canplaythrough — ready for seamless switch');
      }
    });

    // ── 切换策略1：timeupdate 提前切换 ──
    video1.addEventListener('loadedmetadata', function () {
      var duration = video1.duration;
      log('video1 duration: ' + duration);
      if (!duration || !isFinite(duration) || duration <= 0) return;

      // 桌面端提前 0.3s，手机端提前 0.8s
      var leadTime = isMobileDevice ? 0.8 : 0.3;
      var threshold = Math.max(0, duration - leadTime);
      log('Switch threshold: ' + threshold);

      video1.addEventListener('timeupdate', function onTU() {
        if (phase !== 'intro') {
          video1.removeEventListener('timeupdate', onTU);
          return;
        }
        if (video1.currentTime >= threshold) {
          log('timeupdate reached threshold: ' + video1.currentTime);
          video1.removeEventListener('timeupdate', onTU);
          doSwitch();
        }
      });
    });

    // ── 切换策略2：ended 兜底 ──
    video1.addEventListener('ended', function () {
      log('video1 ended');
      doSwitch();
    });

    // ── 切换策略3：卡顿检测 ──
    var lastTime = -1;
    var stallCount = 0;
    var stallChecker = setInterval(function () {
      if (phase !== 'intro') { clearInterval(stallChecker); return; }
      if (!video1 || video1.paused || video1.ended) return;

      if (video1.currentTime > 0 && video1.currentTime === lastTime) {
        stallCount++;
        if (stallCount >= 3) {
          warn('video1 stalled 3s, forcing switch');
          clearInterval(stallChecker);
          doSwitch();
        }
      } else {
        stallCount = 0;
      }
      lastTime = video1.currentTime;
    }, 1000);

    // ── 切换策略4：超时保底 30s ──
    setTimeout(function () {
      if (phase === 'intro') {
        warn('30s timeout, forcing switch');
        doSwitch();
      }
    }, 30000);

    // ── 防止 video2 在 intro 阶段意外播放 ──
    var introGuard = setInterval(function () {
      if (phase !== 'intro' && phase !== 'idle') {
        clearInterval(introGuard);
        return;
      }
      if (video2 && !video2.paused) {
        try { video2.pause(); video2.currentTime = 0; } catch (e) {}
      }
    }, 500);

    // ── 启动 video2 播放监控 ──
    startVideo2Monitor();

    // ── 挂载到 DOM ──
    videoContainer.appendChild(video1);
    videoContainer.appendChild(video2);

    // ── 开始播放 video1 ──
    phase = 'intro';
    log('Phase → intro');
    video1.autoplay = true;
    safePlay(video1);
  }

  // ====== Hero 区域查找 & 挂载 ======
  function findHeroSection() {
    var direct = document.querySelector('.hero-section');
    if (direct) return direct;

    var headings = document.querySelectorAll('h1, h2, h3, h4, h5');
    var target = Array.from(headings).find(function (h) {
      return h.textContent && h.textContent.trim() === '世界级 ISP代理';
    });
    return target
      ? target.closest('section') || target.parentElement
      : null;
  }

  function checkAndAttachVideo() {
    heroSection = findHeroSection();
    if (!heroSection) return;

    if (!videoContainer) initVideo();

    // 再次检查 videoContainer 是否成功创建
    if (!videoContainer) return;

    // 已正确挂载则不再操作
    if (videoContainer.parentNode === heroSection) return;

    var cs = window.getComputedStyle(heroSection);
    if (cs.position === 'static') {
      heroSection.style.position = 'relative';
    }

    heroSection.insertBefore(videoContainer, heroSection.firstChild);

    videoContainer.style.position = 'absolute';
    videoContainer.style.top = '0';
    videoContainer.style.left = '0';
    videoContainer.style.width = '100%';
    videoContainer.style.height = '100%';
    videoContainer.style.overflow = 'hidden';
    videoContainer.style.transform = 'none';
    videoContainer.style.display = 'block';

    if (!heroSection.dataset.videoInjected) {
      heroSection.dataset.videoInjected = 'true';

      if (cs.backgroundImage && cs.backgroundImage !== 'none') {
        heroSection.style.backgroundImage = 'none';
      }
      if (cs.backgroundColor && cs.backgroundColor !== 'rgba(0, 0, 0, 0)') {
        heroSection.style.backgroundColor = 'transparent';
      }

      Array.from(heroSection.children).forEach(function (child) {
        if (child !== videoContainer) {
          child.style.position = 'relative';
          child.style.zIndex = '1';
        }
      });
    }

    // 重新挂载后恢复当前阶段的播放
    if (phase === 'loop') {
      if (video2 && video2.paused) { video2.muted = true; safePlay(video2); }
    } else if (phase === 'fallback') {
      if (video1 && video1.paused) { video1.muted = true; safePlay(video1); }
    } else if (phase === 'intro') {
      // 确保 video2 在 intro 阶段不播放
      if (video2 && !video2.paused) {
        try { video2.pause(); video2.currentTime = 0; } catch (e) {}
      }
      if (video1 && video1.paused && !video1.ended) {
        video1.muted = true;
        safePlay(video1);
      }
    }
  }

  function initSyncLoop() {
    checkAndAttachVideo();
    setInterval(checkAndAttachVideo, 500);
  }

  // ====== Tab 切换逻辑（use cases） ======
  var tabData = {
    '电商运营': {
      title: '电商运营',
      desc: '使用静态住宅i p、电商运营 多账号矩阵运营的护航者',
      img: ''
    },
    '在线直播': {
      title: '在线直播',
      desc: '高速稳定的网络连接，确保直播画面流畅不卡顿，助力全球直播业务。',
      img: '/assets/scene-live.png'
    },
    '数据分析与市场研究': {
      title: '数据分析与市场研究',
      desc: '轻松获取全球市场数据，精准分析竞品动态，为业务决策提供强有力的数据支持。',
      img: '/assets/scene-analysis.png'
    },
    'AI访问与数据': {
      title: 'AI访问与数据',
      desc: '解锁AI模型地域限制，高效采集训练数据，赋能人工智能应用开发与落地。',
      img: '/assets/scene-ai.png'
    },
    '社交媒体运营': {
      title: '社交媒体运营',
      desc: '轻松管理全球社交媒体账号，突破地域限制，实现多账号安全运营与增长。',
      img: '/assets/scene-social.png'
    },
    'WEB3应用': {
      title: 'WEB3应用',
      desc: '安全连接去中心化网络，保障数字资产交易安全，探索Web3无限可能。',
      img: '/assets/scene-web3.png'
    },
    '限量抢购BOT&智能爬虫': {
      title: '限量抢购BOT&智能爬虫',
      desc: '毫秒级响应速度，高并发支持，助力抢购业务成功，高效采集全网数据。',
      img: '/assets/scene-bot.png'
    }
  };

  var activeTabName = '电商运营';
  var autoPlayTimer = null;
  var isUserInteracted = false;
  var isAnimating = false;

  function switchTabContent(data) {
    var headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5'));
    var titleEl = headings.find(function (h) {
      return Object.values(tabData).some(function (d) { return d.title === h.textContent.trim(); });
    });

    if (!titleEl) return;

    var descEl = titleEl.nextElementSibling;
    var textContainer = titleEl.parentElement;
    var mainContainer = textContainer.parentElement;
    var imgEl = mainContainer.querySelector('.tab-content-img');

    if (!imgEl) {
      imgEl = document.createElement('img');
      imgEl.className = 'tab-content-img';
      imgEl.alt = 'Scene Illustration';
      mainContainer.appendChild(imgEl);
      imgEl.style.display = 'none';
    }

    var originalImg = document.querySelector('.illustration-img');

    if (titleEl.textContent === data.title) return;
    if (isAnimating) return;
    isAnimating = true;

    mainContainer.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    mainContainer.style.opacity = '0';
    mainContainer.style.transform = 'translateX(-20px)';

    setTimeout(function () {
      titleEl.textContent = data.title;
      if (descEl) descEl.textContent = data.desc;

      var isMobileView = window.innerWidth <= 768;

      if (data.title === '电商运营') {
        mainContainer.style.display = '';
        mainContainer.style.flexDirection = '';
        mainContainer.style.alignItems = '';
        mainContainer.style.justifyContent = '';
        textContainer.style.flex = '';
        imgEl.style.display = 'none';
        if (originalImg) originalImg.style.display = '';
      } else {
        mainContainer.style.display = 'flex';

        if (isMobileView) {
          mainContainer.style.flexDirection = 'column';
          mainContainer.style.alignItems = 'center';
          mainContainer.style.justifyContent = 'flex-start';
          textContainer.style.flex = 'none';
          textContainer.style.width = '100%';
          textContainer.style.textAlign = 'center';
        } else {
          mainContainer.style.flexDirection = 'row';
          mainContainer.style.alignItems = 'center';
          mainContainer.style.justifyContent = 'space-between';
          textContainer.style.flex = '1';
          textContainer.style.width = '';
          textContainer.style.textAlign = '';
        }

        if (originalImg) originalImg.style.display = 'none';

        if (data.img) {
          imgEl.src = data.img;
          imgEl.style.display = 'block';
          if (isMobileView) {
            imgEl.style.maxWidth = '100%';
            imgEl.style.marginLeft = '0';
            imgEl.style.marginTop = '16px';
            imgEl.style.order = '2';
          } else {
            imgEl.style.maxWidth = '50%';
            imgEl.style.marginLeft = '24px';
            imgEl.style.marginTop = '';
            imgEl.style.order = '';
          }
        } else {
          imgEl.style.display = 'none';
        }
      }

      mainContainer.style.transition = 'none';
      mainContainer.style.transform = 'translateX(20px)';
      mainContainer.offsetHeight; // force reflow

      mainContainer.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      mainContainer.style.opacity = '1';
      mainContainer.style.transform = 'translateX(0)';

      setTimeout(function () {
        isAnimating = false;
      }, 300);
    }, 300);
  }

  function switchTab(name) {
    var data = tabData[name];
    if (!data) return;

    activeTabName = name;

    var tabButtons = Array.from(document.querySelectorAll('button')).filter(function (btn) {
      return tabData[btn.textContent.trim()];
    });

    tabButtons.forEach(function (btn) {
      if (btn.textContent.trim() === name) {
        btn.classList.add('force-tab-active');
        btn.classList.remove('force-tab-inactive');
      } else {
        btn.classList.remove('force-tab-active');
        btn.classList.add('force-tab-inactive');
      }
    });

    switchTabContent(data);
  }

  function startAutoPlay() {
    if (autoPlayTimer) clearInterval(autoPlayTimer);
    autoPlayTimer = setInterval(function () {
      if (isUserInteracted) {
        clearInterval(autoPlayTimer);
        return;
      }

      var tabButtons = Array.from(document.querySelectorAll('button')).filter(function (btn) {
        return tabData[btn.textContent.trim()];
      });

      if (tabButtons.length === 0) return;

      var currentBtnIndex = tabButtons.findIndex(function (btn) {
        return btn.textContent.trim() === activeTabName;
      });

      var nextIndex = 0;
      if (currentBtnIndex !== -1) {
        nextIndex = (currentBtnIndex + 1) % tabButtons.length;
      }

      var nextTabName = tabButtons[nextIndex].textContent.trim();
      switchTab(nextTabName);
    }, 3000);
  }

  var tabsInitDone = false;
  var tabsPollTimer = null;

  function initTabs() {
    var tabButtons = Array.from(document.querySelectorAll('button')).filter(function (btn) {
      return tabData[btn.textContent.trim()];
    });

    if (tabButtons.length === 0) return;

    var currentBtn = tabButtons.find(function (btn) {
      return btn.textContent.trim() === activeTabName;
    });
    if (currentBtn) {
      tabButtons.forEach(function (b) {
        if (b === currentBtn) {
          b.classList.add('force-tab-active');
          b.classList.remove('force-tab-inactive');
        } else {
          b.classList.remove('force-tab-active');
          b.classList.add('force-tab-inactive');
        }
      });
    }

    tabButtons.forEach(function (btn) {
      if (btn.dataset.tabBound) return;
      btn.dataset.tabBound = 'true';

      btn.addEventListener('click', function () {
        var name = btn.textContent.trim();
        if (!tabData[name]) return;

        isUserInteracted = true;
        if (autoPlayTimer) clearInterval(autoPlayTimer);

        switchTab(name);
      });
    });

    if (!autoPlayTimer && !isUserInteracted) {
      startAutoPlay();
    }

    if (!tabsInitDone) {
      tabsInitDone = true;
      if (tabsPollTimer) { clearInterval(tabsPollTimer); tabsPollTimer = null; }
    }
  }

  // ====== 启动 ======
  window.addEventListener('load', function () {
    initVideo();
    initSyncLoop();

    // 手机端：用户交互触发播放（部分移动浏览器要求用户手势）
    if (isMobileDevice) {
      var hasTriggered = false;
      var triggerPlay = function () {
        if (hasTriggered) return;
        hasTriggered = true;
        log('Mobile user interaction, triggering play...');

        if (video1 && video1.paused) {
          video1.muted = true;
          safePlay(video1);
        }

        // 预授权 video2：播放一帧后立即暂停
        if (video2 && phase === 'intro' && video2.src && video2.src !== location.href) {
          video2.muted = true;
          try {
            var p2 = video2.play();
            if (p2 && p2.then) {
              p2.then(function () {
                if (phase === 'intro') {
                  video2.pause();
                  video2.currentTime = 0;
                }
              }).catch(function () {});
            }
          } catch (e) {}
        }

        document.removeEventListener('touchstart', triggerPlay);
        document.removeEventListener('click', triggerPlay);
      };
      document.addEventListener('touchstart', triggerPlay, { passive: true });
      document.addEventListener('click', triggerPlay);
    }

    tabsPollTimer = setInterval(initTabs, 500);
  });
})();
