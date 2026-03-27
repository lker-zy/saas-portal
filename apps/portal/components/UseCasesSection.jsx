import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

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

const AUTO_PLAY_INTERVAL = 3000;   // 每 3 秒自动切换
const RESUME_DELAY       = 8000;   // 用户点击后 8 秒恢复自动轮播

function UseCasesSection() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('ecommerce');
  const [userPaused, setUserPaused] = useState(false);
  const resumeTimerRef = useRef(null);

  // ── 自动轮播 ──
  useEffect(() => {
    if (userPaused) return;

    const timer = setInterval(() => {
      setActiveTab(prev => {
        const idx = useCaseData.findIndex(c => c.id === prev);
        const next = (idx + 1) % useCaseData.length;
        return useCaseData[next].id;
      });
    }, AUTO_PLAY_INTERVAL);

    return () => clearInterval(timer);
  }, [userPaused]);

  // ── 用户点击 tab：暂停自动轮播，一段时间后自动恢复 ──
  const handleTabClick = (id) => {
    setActiveTab(id);
    setUserPaused(true);

    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      setUserPaused(false);
    }, RESUME_DELAY);
  };

  // 清理恢复定时器
  useEffect(() => {
    return () => {
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };
  }, []);

  const currentCase = useCaseData.find(c => c.id === activeTab) || useCaseData[0];

  return (
    <section className="use-cases-section" data-react-use-cases>
      <h2 className="section-title">{t('在什么场景中能使用到？')}</h2>

      {/* Tab Buttons */}
      <div className="use-cases-tabs">
        {useCaseData.map((useCase) => (
          <button
            key={useCase.id}
            className={`tab-btn ${activeTab === useCase.id ? 'active force-tab-active' : 'force-tab-inactive'}`}
            onClick={() => handleTabClick(useCase.id)}
          >
            {t(useCase.name)}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="use-case-content">
        {/* Left: Text Content */}
        <div className="use-case-text">
          <div className="case-icon">{caseIconSvg}</div>
          <h3>{t(currentCase.title)}</h3>
          <p>{t(currentCase.desc)}</p>
          <button className="learn-more-btn">{t('了解更多')}</button>
        </div>

        {/* Right: Illustration */}
        <div className="use-case-illustration">
          {currentCase.img ? (
            <img
              src={currentCase.img}
              alt={t(currentCase.name)}
              className="tab-content-img"
            />
          ) : (
            <img
              src="/assets/home2-D-tg2ggl.png"
              alt={t(currentCase.name)}
              className="illustration-img"
            />
          )}
        </div>
      </div>
    </section>
  );
}

export default UseCasesSection;
