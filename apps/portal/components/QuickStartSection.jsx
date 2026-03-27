import React from 'react';
import { useTranslation } from 'react-i18next';

const steps = [
  {
    number: '01',
    title: '简单选择您的代理需求',
    description: '仅需几步，轻松定义您的代理配置。从选择国家/地区和具体使用场景（如跨境电商、社交媒体），到设定IP级别、使用终端和交付协议，每项选择都将精准匹配您的业务场景。'
  },
  {
    number: '02',
    title: '智能推荐，最优匹配',
    description: '基于您在第一步中确定的多维度业务场景，我们的智能系统将自动为您生成一套高度匹配的代理推荐方案。告别繁琐选择，高效找到最适合您的代理服务组合。'
  },
  {
    number: '03',
    title: '一键下单，体验高速服务',
    description: '专属方案为您量身定制，点击立即下单可直接跳转到购买页面，系统将自动为您填充所有配置，无论是集成至软件路由、指纹浏览器，还是代理客户端都能轻松部署，即刻享受稳定、高速的全球代理服务。'
  }
];

function QuickStartSection() {
  const { t } = useTranslation();
  return (
    <section
      className="quick-start-section"
      style={{ backgroundImage: `url("/assets/home4-BDYEdLJU.png")` }}
    >
      <h2 className="section-title">{t('如何快速开始使用？')}</h2>
      <p>{t('quickstart.intro')}</p>
      <div className="steps-container">
        {steps.map((step, index) => (
          <div key={index} className="step-card">
            <div className="step-number">{step.number}</div>
            <h3>{t(step.title)}</h3>
            <p>{t(step.description)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default QuickStartSection;
