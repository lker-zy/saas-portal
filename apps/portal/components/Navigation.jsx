import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import BrandLogo from './BrandLogo';

const MOBILE_BREAKPOINT = 1024;

function Navigation() {
  const { t } = useTranslation();
  const [isMobileViewport, setIsMobileViewport] = useState(() => {
    if (typeof window === 'undefined') {
      return false;
    }
    return window.innerWidth <= MOBILE_BREAKPOINT;
  });
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState(null);
  const navRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileViewport(window.innerWidth <= MOBILE_BREAKPOINT);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (!isMobileViewport) {
      setMobileMenuOpen(false);
      setMobileDropdown(null);
    }
  }, [isMobileViewport]);

  // Close mobile menu
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileDropdown(null);
  };

  // Toggle mobile dropdown
  const toggleMobileDropdown = (name) => {
    setMobileDropdown(mobileDropdown === name ? null : name);
  };

  const navigateHome = () => {
    window.location.href = window.location.pathname;
  };

  // Desktop nav menu items with dropdown data
  const navItems = [
    {
      text: t('产品'),
      hasDropdown: true,
      items: [
        {
          icon: '🏠',
          label: t('静态住宅IP'),
          desc: t('使用静态住宅i p、电商运营 多账号矩阵运营的护航者'),
          href: '/?tab=static_isp'
        }
      ]
    },
    {
      text: t('价格'),
      hasDropdown: true,
      items: [
        {
          icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 9.5L12 2.5L21 9.5V20.5C21 21.0523 20.5523 21.5 20 21.5H4C3.44772 21.5 3 21.0523 3 20.5V9.5Z" stroke="#4F8EFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 21.5V12.5H15V21.5" stroke="#4F8EFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 11.5L12 3.5L22 11.5" stroke="#4F8EFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ),
          label: t('静态住宅IP'),
          desc: <span>{t('低至')} <span style={{color:'#4F8EFF',fontWeight:700}}>$0.15</span> / IP / {t('天')}</span>,
          href: '/?tab=purchase&product=buy_static_isp'
        }
      ]
    },
    { text: t('解决方案'), href: '/?tab=solutions' },
    { text: t('帮助中心'), href: '/?tab=help_center' },
    { text: t('文档'), href: '/?tab=api_docs' },
    {
      text: t('商务合作'),
      hasDropdown: true,
      items: [
        {
          icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3" stroke="#4F8EFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ),
          label: t('企业服务'),
          desc: t('IP转售 · 专属折扣 · 技术支持'),
          href: '/?tab=business_cooperation'
        },
        {
          icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" stroke="#4F8EFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="9" cy="7" r="4" stroke="#4F8EFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M19 8v6M22 11h-6" stroke="#4F8EFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ),
          label: t('成为代理'),
          desc: t('阶梯佣金 · 快速提现 · 专人辅导'),
          href: '/?tab=become_agent'
        }
      ]
    },
  ];

  // Mobile nav items with sub-menus
  const mobileSections = [
    {
      title: t('产品'),
      icon: '📦',
      items: [
        { text: t('静态住宅IP'), desc: t('使用静态住宅i p、电商运营 多账号矩阵运营的护航者'), href: '/?tab=static_isp' }
      ]
    },
    {
      title: t('价格'),
      icon: '💰',
      items: [
        { text: t('静态住宅IP'), desc: `${t('低至')} $0.15 / IP / ${t('天')}`, href: '/?tab=purchase&product=buy_static_isp' }
      ]
    },
    {
      title: t('解决方案'),
      icon: '💡',
      href: '/?tab=solutions'
    },
    {
      title: t('帮助中心'),
      icon: '📚',
      href: '/?tab=help_center'
    },
    {
      title: t('文档'),
      icon: '📄',
      href: '/?tab=api_docs'
    },
    {
      title: t('商务合作'),
      icon: '🤝',
      items: [
        { text: t('企业服务'), desc: t('IP转售 · 专属折扣 · 技术支持'), href: '/?tab=business_cooperation' },
        { text: t('成为代理'), desc: t('阶梯佣金 · 快速提现 · 专人辅导'), href: '/?tab=become_agent' }
      ]
    }
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <header className="home-header">
        <div className="header-content">
          {/* Hamburger Button for Mobile */}
          {isMobileViewport && (
            <button
              className={`mobile-menu-btn ${mobileMenuOpen ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="菜单"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          )}

          {/* Logo */}
          <div
            className="logo"
            onClick={navigateHome}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                navigateHome();
              }
            }}
            role="button"
            tabIndex={0}
            aria-label="Quantum-Proxy首页"
          >
            <BrandLogo />
          </div>

          {/* Desktop Navigation Menu */}
          <nav className="nav-menu" ref={navRef}>
            {navItems.map((item) => (
              item.hasDropdown ? (
                <div
                  key={item.text}
                  className="dropdown"
                  onMouseEnter={() => setOpenDropdown(item.text)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <a href="#" className="dropdown-link" onClick={(e) => e.preventDefault()}>
                    {item.text} <span className="arrow"></span>
                  </a>
                  <div className={`products-dropdown-menu ${openDropdown === item.text ? 'open' : ''}`}>
                    {item.items.map((subItem, idx) => (
                      <a key={idx} href={subItem.href}>
                        <span className="menu-icon">{subItem.icon}</span>
                        <span className="menu-text">
                          <span className="menu-label">{subItem.label}</span>
                          <span className="menu-desc">{subItem.desc}</span>
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              ) : (
                <a key={item.text} href={item.href} className="nav-link">
                  {item.text}
                </a>
              )
            ))}
          </nav>

          {/* Login Button - outside nav-menu for language switcher insertion */}
          <button className="login-btn" onClick={() => window.location.href = '/login#/login'}>
            {t('注册/登录')}
          </button>
        </div>
      </header>

      {isMobileViewport && (
        <>
          {/* Mobile Navigation Overlay */}
          <div className={`mobile-nav-overlay ${mobileMenuOpen ? 'open' : ''}`} onClick={closeMobileMenu}></div>

          {/* Mobile Navigation Drawer */}
          <div className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`}>
            {mobileSections.map((section, idx) => (
              <div key={idx}>
                {section.items ? (
                  <>
                    <div
                      className={`mobile-section-header ${mobileDropdown === section.title ? 'open' : ''}`}
                      onClick={() => toggleMobileDropdown(section.title)}
                    >
                      <span className="mobile-section-icon">{section.icon}</span>
                      <span>{section.title}</span>
                      <span className="mobile-section-arrow">›</span>
                    </div>
                    <div className={`mobile-section-items ${mobileDropdown === section.title ? 'open' : ''}`}>
                      {section.items.map((subItem, subIdx) => (
                        <a key={subIdx} href={subItem.href} className="mobile-sub-link" onClick={closeMobileMenu}>
                          <span>{subItem.text}</span>
                          {subItem.desc && <span className="mobile-sub-desc">{subItem.desc}</span>}
                        </a>
                      ))}
                    </div>
                  </>
                ) : (
                  <a href={section.href} className="mobile-link" onClick={closeMobileMenu}>
                    <span className="mobile-section-icon">{section.icon}</span>
                    <span>{section.title}</span>
                  </a>
                )}
              </div>
            ))}
            <a href="/login#/login" className="mobile-login-btn" onClick={closeMobileMenu}>
              {t('注册/登录')}
            </a>
          </div>
        </>
      )}
    </>
  );
}

export default Navigation;
