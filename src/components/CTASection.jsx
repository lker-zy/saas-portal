import React from 'react';

function CTASection() {
  return (
    <section className="cta-section">
      <div className="section-container">
        <h2 className="cta-title">开始使用量子代理</h2>
        <p className="cta-desc">
          注册即送免费测试额度
        </p>
        <div className="cta-buttons">
          <a href="/register" className="cta-button cta-button-primary">
            免费注册
          </a>
          <a href="/?tab=solutions" className="cta-button cta-button-secondary">
            解决方案
          </a>
        </div>
      </div>
    </section>
  );
}

export default CTASection;
