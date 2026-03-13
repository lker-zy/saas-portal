import React, { useState } from 'react';

const useCaseData = [
  {
    id: 'ecommerce',
    name: '电商运营',
    icon: '🛒',
    title: '电商矩阵运营',
    desc: '使用静态住宅IP，实现多账号矩阵运营，防止账号关联，提升运营效率。',
    btnText: '了解更多',
    href: '/?tab=cross_border_ecommerce'
  },
  {
    id: 'live',
    name: '在线直播',
    icon: '📺',
    title: '全球直播加速',
    desc: '高速稳定的网络连接，确保直播画面流畅不卡顿，助力全球直播业务拓展。',
    btnText: '了解更多',
    href: '/?tab=ai_data_mining'
  },
  {
    id: 'data',
    name: '数据分析',
    icon: '📊',
    title: '市场数据洞察',
    desc: '轻松获取全球市场数据，精准分析竞品动态，为业务决策提供强有力的数据支持。',
    btnText: '了解更多',
    href: '/?tab=stock_market'
  },
  {
    id: 'ai',
    name: 'AI数据采集',
    icon: '🤖',
    title: 'AI模型训练',
    desc: '解锁AI模型地域限制，高效采集训练数据，赋能人工智能应用开发与落地。',
    btnText: '了解更多',
    href: '/?tab=ai_data_mining'
  },
  {
    id: 'social',
    name: '社媒运营',
    icon: '💬',
    title: '社交媒体管理',
    desc: '轻松管理全球社交媒体账号，突破地域限制，实现多账号安全运营与增长。',
    btnText: '了解更多',
    href: '/?tab=ai_data_mining'
  },
  {
    id: 'web3',
    name: 'WEB3应用',
    icon: '⛓️',
    title: '去中心化网络',
    desc: '安全连接去中心化网络，保障数字资产交易安全，探索Web3无限可能。',
    btnText: '了解更多',
    href: '/?tab=ai_data_mining'
  },
  {
    id: 'bot',
    name: '智能爬虫',
    icon: '🕷️',
    title: '数据采集工具',
    desc: '毫秒级响应速度，高并发支持，助力抢购业务成功，高效采集全网数据。',
    btnText: '了解更多',
    href: '/?tab=smart_crawler'
  }
];

function UseCasesSection() {
  const [activeTab, setActiveTab] = useState('ecommerce');

  const currentCase = useCaseData.find(c => c.id === activeTab) || useCaseData[0];

  return (
    <section className="use-cases-section">
      <h2 className="section-title">应用场景</h2>

      {/* Tab Buttons */}
      <div className="use-cases-tabs">
        {useCaseData.map((useCase) => (
          <button
            key={useCase.id}
            className={`tab-btn ${activeTab === useCase.id ? 'active force-tab-active' : 'force-tab-inactive'}`}
            onClick={() => setActiveTab(useCase.id)}
          >
            {useCase.icon} {useCase.name}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="use-case-content">
        {/* Left: Text Content */}
        <div className="use-case-text">
          <div className="case-icon">{currentCase.icon}</div>
          <h3>{currentCase.title}</h3>
          <p>{currentCase.desc}</p>
          <button
            className="learn-more-btn"
            onClick={() => window.location.href = currentCase.href}
          >
            {currentCase.btnText}
          </button>
        </div>

        {/* Right: Illustration */}
        <div className="use-case-illustration">
          <img
            src="/assets/home1-DPH3jV-n.png"
            alt={currentCase.name}
            className="illustration-img"
          />
        </div>
      </div>
    </section>
  );
}

export default UseCasesSection;
