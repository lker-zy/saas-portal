import React, { useState, useEffect } from 'react';

const caseIconSvg = (
  <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
    <circle cx="30" cy="30" r="30" fill="#4A90E2"></circle>
    <path d="M25 20h10c2.21 0 4 1.79 4 4v12c0 2.21-1.79 4-4 4H25c-2.21 0-4-1.79-4-4V24c0-2.21 1.79-4 4-4z" stroke="white" strokeWidth="2" fill="none"></path>
    <path d="M27 28h6M27 32h4" stroke="white" strokeWidth="2" strokeLinecap="round"></path>
  </svg>
);

const useCaseData = [
  {
    id: 'ecommerce',
    name: '电商运营',
    title: '电商运营',
    desc: '使用静态住宅isp、电商运营 多账号矩阵运营的护航者',
    img: ''
  },
  {
    id: 'live',
    name: '在线直播',
    title: '在线直播',
    desc: '高速稳定的网络连接，确保直播画面流畅不卡顿，助力全球直播业务。',
    img: '/assets/scene-live.png'
  },
  {
    id: 'data',
    name: '数据分析与市场研究',
    title: '数据分析与市场研究',
    desc: '轻松获取全球市场数据，精准分析竞品动态，为业务决策提供强有力的数据支持。',
    img: '/assets/scene-analysis.png'
  },
  {
    id: 'ai',
    name: 'AI访问与数据',
    title: 'AI访问与数据',
    desc: '解锁AI模型地域限制，高效采集训练数据，赋能人工智能应用开发与落地。',
    img: '/assets/scene-ai.png'
  },
  {
    id: 'social',
    name: '社交媒体运营',
    title: '社交媒体运营',
    desc: '轻松管理全球社交媒体账号，突破地域限制，实现多账号安全运营与增长。',
    img: '/assets/scene-social.png'
  },
  {
    id: 'web3',
    name: 'WEB3应用',
    title: 'WEB3应用',
    desc: '安全连接去中心化网络，保障数字资产交易安全，探索Web3无限可能。',
    img: '/assets/scene-web3.png'
  },
  {
    id: 'bot',
    name: '限量抢购BOT&智能爬虫',
    title: '限量抢购BOT&智能爬虫',
    desc: '毫秒级响应速度，高并发支持，助力抢购业务成功，高效采集全网数据。',
    img: '/assets/scene-bot.png'
  }
];

function UseCasesSection() {
  const [activeTab, setActiveTab] = useState('ecommerce');

  const currentCase = useCaseData.find(c => c.id === activeTab) || useCaseData[0];

  useEffect(() => {
    // 初始化 tab 切换功能（模拟原版 videoBackground.js 的功能）
    const handleTabClick = (e) => {
      const btn = e.target.closest('button');
      if (!btn) return;

      const tabName = btn.textContent.trim();
      const matchedCase = useCaseData.find(c => c.name === tabName);
      if (matchedCase) {
        setActiveTab(matchedCase.id);
      }
    };

    const tabsContainer = document.querySelector('.use-cases-tabs');
    if (tabsContainer) {
      tabsContainer.addEventListener('click', handleTabClick);
      return () => tabsContainer.removeEventListener('click', handleTabClick);
    }
  }, []);

  return (
    <section className="use-cases-section">
      <h2 className="section-title">在什么场景中能使用到？</h2>

      {/* Tab Buttons */}
      <div className="use-cases-tabs">
        {useCaseData.map((useCase) => (
          <button
            key={useCase.id}
            className={`tab-btn ${activeTab === useCase.id ? 'active force-tab-active' : 'force-tab-inactive'}`}
          >
            {useCase.name}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="use-case-content">
        {/* Left: Text Content */}
        <div className="use-case-text">
          <div className="case-icon">{caseIconSvg}</div>
          <h3>{currentCase.title}</h3>
          <p>{currentCase.desc}</p>
          <button className="learn-more-btn">了解更多</button>
        </div>

        {/* Right: Illustration */}
        <div className="use-case-illustration">
          {currentCase.img ? (
            <img
              src={currentCase.img}
              alt={currentCase.name}
              className="tab-content-img"
            />
          ) : (
            <img
              src="/assets/home2-D-tg2ggl.png"
              alt={currentCase.name}
              className="illustration-img"
            />
          )}
        </div>
      </div>
    </section>
  );
}

export default UseCasesSection;
