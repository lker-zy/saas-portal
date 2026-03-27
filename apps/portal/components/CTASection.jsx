import React from 'react';
import { useTranslation } from 'react-i18next';

function CTASection() {
  const { t } = useTranslation();
  return (
    <section className="cta-section">
      <div className="section-container">
        <h2 className="cta-title">{t('开始使用Quantum-Proxy')}</h2>
        <p className="cta-desc">
          {t('注册即送免费测试额度')}
        </p>
        <div className="cta-buttons">
          <a href="/register" className="cta-button cta-button-primary">
            {t('免费注册')}
          </a>
          <a href="/?tab=solutions" className="cta-button cta-button-secondary">
            {t('解决方案')}
          </a>
        </div>
      </div>
    </section>
  );
}

export default CTASection;
