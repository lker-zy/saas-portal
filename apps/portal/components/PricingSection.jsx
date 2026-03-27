import React from 'react';
import { useTranslation } from 'react-i18next';

const pricingPlans = [
  {
    id: 'static',
    title: '静态住宅IP',
    features: ['多协议支持', '多地域接入', '多行业适配'],
    bgImage: '/assets/home3-D_4FbplO.png'
  },
  {
    id: 'dynamic',
    title: '动态住宅IP',
    features: ['多协议支持', '多地域接入', '多行业适配'],
    bgImage: '/assets/home3-D_4FbplO.png'
  },
  {
    id: 'datacenter',
    title: '数据中心IP',
    features: ['多协议支持', '多地域接入', '多行业适配'],
    bgImage: '/assets/home3-D_4FbplO.png'
  }
];

function PricingSection() {
  const { t } = useTranslation();
  return (
    <section className="pricing-section">
      <h2 className="section-title">{t('选择代理套餐')}</h2>
      <div className="pricing-cards">
        {pricingPlans.map((plan) => (
          <div
            key={plan.id}
            className="pricing-card"
            style={{ backgroundImage: `url("${plan.bgImage}")` }}
          >
            <h3 className="card-title">{t(plan.title)}</h3>
            <ul className="features-list">
              {plan.features.map((feature, index) => (
                <li key={index}>
                  <span className="dot"></span>
                  {t(feature)}
                </li>
              ))}
            </ul>
            <button className="pricing-btn">{t('立即购买')}</button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default PricingSection;
