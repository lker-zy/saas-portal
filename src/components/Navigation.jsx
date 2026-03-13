import React, { useState, useRef, useEffect } from 'react';

function Navigation() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState(null);
  const navRef = useRef(null);

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

  // Close mobile menu
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileDropdown(null);
  };

  // Toggle mobile dropdown
  const toggleMobileDropdown = (name) => {
    setMobileDropdown(mobileDropdown === name ? null : name);
  };

  // Desktop nav menu items with dropdown data
  const navItems = [
    {
      text: '产品',
      hasDropdown: true,
      items: [
        {
          icon: '🏠',
          label: '静态住宅ISP代理',
          desc: '高质量纯净住宅IP，稳定可靠',
          href: '/?tab=static_isp'
        }
      ]
    },
    {
      text: '价格',
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
          label: '静态住宅ISP代理',
          desc: <span>低至 <span style={{color:'#4F8EFF',fontWeight:700}}>$0.15</span> / IP / 天</span>,
          href: '/?tab=purchase&product=buy_static_isp'
        }
      ]
    },
    { text: '解决方案', href: '/?tab=solutions' },
    { text: '帮助中心', href: '/?tab=help_center' },
    { text: '文档', href: '/?tab=api_docs' },
    {
      text: '商务合作',
      hasDropdown: true,
      items: [
        {
          icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3" stroke="#4F8EFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ),
          label: '企业服务',
          desc: 'IP转售 · 专属折扣 · 技术支持',
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
          label: '成为代理',
          desc: '阶梯佣金 · 快速提现 · 专人辅导',
          href: '/?tab=become_agent'
        }
      ]
    },
  ];

  // Mobile nav items with sub-menus
  const mobileSections = [
    {
      title: '产品',
      icon: '📦',
      items: [
        { text: '静态住宅ISP代理', desc: '高质量纯净住宅IP，稳定可靠', href: '/?tab=static_isp' }
      ]
    },
    {
      title: '价格',
      icon: '💰',
      items: [
        { text: '静态住宅ISP代理', desc: '低至 $0.15 / IP / 天', href: '/?tab=purchase&product=buy_static_isp' }
      ]
    },
    {
      title: '解决方案',
      icon: '💡',
      href: '/?tab=solutions'
    },
    {
      title: '帮助中心',
      icon: '📚',
      href: '/?tab=help_center'
    },
    {
      title: '文档',
      icon: '📄',
      href: '/?tab=api_docs'
    },
    {
      title: '商务合作',
      icon: '🤝',
      items: [
        { text: '企业服务', desc: 'IP转售 · 专属折扣 · 技术支持', href: '/?tab=business_cooperation' },
        { text: '成为代理', desc: '阶梯佣金 · 快速提现 · 专人辅导', href: '/?tab=become_agent' }
      ]
    }
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <header className="home-header">
        <div className="header-content">
          {/* Hamburger Button for Mobile */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="菜单"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          {/* Logo */}
          <div className="logo" onClick={() => window.location.href = '/'}>
            量子代理
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
            注册/登录
          </button>
        </div>
      </header>

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
          注册/登录
        </a>
      </div>
    </>
  );
}

export default Navigation;
