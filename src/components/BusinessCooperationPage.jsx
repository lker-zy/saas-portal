import React from 'react';

const styles = {
  page: {
    minHeight: '100vh',
    backgroundColor: '#0f172a',
    color: '#fff',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    overflowX: 'hidden',
  },
  /* ── Hero Section ── */
  hero: {
    position: 'relative',
    padding: '140px 20px 80px',
    textAlign: 'center',
    background: 'linear-gradient(180deg, #0f172a 0%, #1a2744 50%, #0f172a 100%)',
    overflow: 'hidden',
  },
  heroBgOrb1: {
    position: 'absolute',
    top: '-120px',
    left: '-80px',
    width: '400px',
    height: '400px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(79,142,255,0.15) 0%, transparent 70%)',
    filter: 'blur(60px)',
    pointerEvents: 'none',
  },
  heroBgOrb2: {
    position: 'absolute',
    bottom: '-80px',
    right: '-60px',
    width: '350px',
    height: '350px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)',
    filter: 'blur(60px)',
    pointerEvents: 'none',
  },
  heroBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 20px',
    borderRadius: '100px',
    background: 'rgba(79,142,255,0.1)',
    border: '1px solid rgba(79,142,255,0.25)',
    color: '#8BB4FF',
    fontSize: '14px',
    fontWeight: 600,
    marginBottom: '24px',
  },
  heroTitle: {
    fontSize: 'clamp(28px, 5vw, 48px)',
    fontWeight: 800,
    lineHeight: 1.2,
    marginBottom: '20px',
    background: 'linear-gradient(135deg, #ffffff 0%, #8BB4FF 50%, #a78bfa 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  heroDesc: {
    fontSize: 'clamp(15px, 2vw, 18px)',
    color: 'rgba(255,255,255,0.6)',
    maxWidth: '680px',
    margin: '0 auto 40px',
    lineHeight: 1.7,
  },
  heroActions: {
    display: 'flex',
    justifyContent: 'center',
    gap: '16px',
    flexWrap: 'wrap',
  },
  btnPrimary: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '14px 32px',
    borderRadius: '100px',
    background: 'linear-gradient(135deg, #4F8EFF 0%, #2563eb 100%)',
    color: '#fff',
    fontSize: '16px',
    fontWeight: 600,
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 4px 20px rgba(37,99,235,0.4)',
    transition: 'all 0.3s ease',
    textDecoration: 'none',
  },
  btnOutline: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '14px 32px',
    borderRadius: '100px',
    background: 'transparent',
    color: '#8BB4FF',
    fontSize: '16px',
    fontWeight: 600,
    border: '1px solid rgba(79,142,255,0.4)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textDecoration: 'none',
  },
  /* ── Stats Strip ── */
  statsStrip: {
    display: 'flex',
    justifyContent: 'center',
    gap: 'clamp(24px, 4vw, 60px)',
    padding: '40px 20px',
    borderTop: '1px solid rgba(255,255,255,0.06)',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
    flexWrap: 'wrap',
  },
  statItem: {
    textAlign: 'center',
  },
  statValue: {
    fontSize: 'clamp(24px, 3vw, 36px)',
    fontWeight: 800,
    background: 'linear-gradient(135deg, #4F8EFF, #a78bfa)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  statLabel: {
    fontSize: '14px',
    color: 'rgba(255,255,255,0.5)',
    marginTop: '4px',
  },
  /* ── Section ── */
  section: {
    padding: 'clamp(40px, 6vw, 80px) 20px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  sectionTitle: {
    fontSize: 'clamp(22px, 3vw, 32px)',
    fontWeight: 700,
    textAlign: 'center',
    marginBottom: '12px',
  },
  sectionDesc: {
    textAlign: 'center',
    color: 'rgba(255,255,255,0.55)',
    fontSize: '16px',
    marginBottom: '48px',
    maxWidth: '600px',
    margin: '0 auto 48px',
  },
  /* ── Advantage Cards ── */
  cardsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '24px',
  },
  card: {
    background: 'linear-gradient(135deg, rgba(30,41,59,0.7) 0%, rgba(15,23,42,0.9) 100%)',
    border: '1px solid rgba(79,142,255,0.12)',
    borderRadius: '16px',
    padding: '32px 28px',
    transition: 'all 0.3s ease',
    cursor: 'default',
  },
  cardIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '56px',
    height: '56px',
    borderRadius: '14px',
    fontSize: '28px',
    marginBottom: '20px',
  },
  cardTitle: {
    fontSize: '18px',
    fontWeight: 700,
    marginBottom: '10px',
  },
  cardDesc: {
    fontSize: '14px',
    color: 'rgba(255,255,255,0.55)',
    lineHeight: 1.7,
  },
  /* ── Pricing / Tiers ── */
  tiersGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '28px',
    maxWidth: '900px',
    margin: '0 auto',
  },
  tier: {
    background: 'linear-gradient(135deg, rgba(30,41,59,0.6) 0%, rgba(15,23,42,0.8) 100%)',
    border: '1px solid rgba(79,142,255,0.15)',
    borderRadius: '20px',
    padding: '36px 32px',
    position: 'relative',
    overflow: 'hidden',
  },
  tierHighlight: {
    background: 'linear-gradient(135deg, rgba(30,41,59,0.8) 0%, rgba(25,35,60,0.9) 100%)',
    border: '1px solid rgba(79,142,255,0.35)',
    boxShadow: '0 0 40px rgba(79,142,255,0.08)',
  },
  tierBadge: {
    position: 'absolute',
    top: '16px',
    right: '16px',
    padding: '4px 14px',
    borderRadius: '100px',
    background: 'linear-gradient(135deg, #4F8EFF, #2563eb)',
    color: '#fff',
    fontSize: '12px',
    fontWeight: 700,
  },
  tierTitle: {
    fontSize: '20px',
    fontWeight: 700,
    marginBottom: '8px',
  },
  tierDiscount: {
    fontSize: 'clamp(28px, 4vw, 36px)',
    fontWeight: 800,
    background: 'linear-gradient(135deg, #4F8EFF, #a78bfa)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    marginBottom: '20px',
  },
  tierFeatures: {
    listStyle: 'none',
    padding: 0,
    margin: '0 0 28px',
  },
  tierFeature: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '8px 0',
    fontSize: '14px',
    color: 'rgba(255,255,255,0.75)',
    borderBottom: '1px solid rgba(255,255,255,0.05)',
  },
  tierCheck: {
    color: '#4F8EFF',
    fontSize: '16px',
    flexShrink: 0,
  },
  /* ── Steps ── */
  stepsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '24px',
    maxWidth: '1000px',
    margin: '0 auto',
  },
  step: {
    textAlign: 'center',
    padding: '28px 20px',
  },
  stepNumber: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, rgba(79,142,255,0.2), rgba(139,92,246,0.15))',
    border: '1px solid rgba(79,142,255,0.3)',
    fontSize: '20px',
    fontWeight: 800,
    color: '#8BB4FF',
    marginBottom: '16px',
  },
  stepTitle: {
    fontSize: '16px',
    fontWeight: 700,
    marginBottom: '8px',
  },
  stepDesc: {
    fontSize: '13px',
    color: 'rgba(255,255,255,0.5)',
    lineHeight: 1.6,
  },
  /* ── CTA Banner ── */
  ctaBanner: {
    margin: '0 20px 60px',
    padding: 'clamp(40px, 5vw, 64px) 32px',
    borderRadius: '24px',
    background: 'linear-gradient(135deg, rgba(79,142,255,0.12) 0%, rgba(139,92,246,0.08) 100%)',
    border: '1px solid rgba(79,142,255,0.2)',
    textAlign: 'center',
    maxWidth: '1000px',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: '60px',
  },
  ctaTitle: {
    fontSize: 'clamp(20px, 3vw, 28px)',
    fontWeight: 700,
    marginBottom: '16px',
  },
  ctaDesc: {
    color: 'rgba(255,255,255,0.55)',
    fontSize: '15px',
    marginBottom: '32px',
    maxWidth: '500px',
    margin: '0 auto 32px',
  },
};

const advantages = [
  {
    icon: '💰',
    title: '阶梯折扣优惠',
    desc: '买的越多折扣越大，消费量越高优惠力度越强，显著降低采购成本。',
    bg: 'linear-gradient(135deg, rgba(79,142,255,0.15), rgba(37,99,235,0.1))',
  },
  {
    icon: '🔌',
    title: 'API 全面对接',
    desc: '提供完整的API接口调用能力，轻松集成到您的系统，高效自动化管理。',
    bg: 'linear-gradient(135deg, rgba(139,92,246,0.15), rgba(109,40,217,0.1))',
  },
  {
    icon: '📦',
    title: '预充值消耗模式',
    desc: '无需囤货垫资，按需充值按量消耗，灵活便捷，资金零风险。',
    bg: 'linear-gradient(135deg, rgba(16,185,129,0.15), rgba(5,150,105,0.1))',
  },
  {
    icon: '🛡️',
    title: '专属技术支持',
    desc: '配备专业技术团队一对一对接，7×24小时响应，确保业务稳定运行。',
    bg: 'linear-gradient(135deg, rgba(245,158,11,0.15), rgba(217,119,6,0.1))',
  },
  {
    icon: '🌐',
    title: '全球优质资源',
    desc: '覆盖190+国家和地区的海量IP资源，纯净住宅/数据中心IP，高匿可用率99%。',
    bg: 'linear-gradient(135deg, rgba(236,72,153,0.15), rgba(219,39,119,0.1))',
  },
  {
    icon: '📊',
    title: '可视化管理后台',
    desc: '独立经销商后台，实时查看消耗、佣金及客户管理数据，运营一目了然。',
    bg: 'linear-gradient(135deg, rgba(14,165,233,0.15), rgba(2,132,199,0.1))',
  },
];

const steps = [
  { num: '1', title: '提交申请', desc: '填写企业信息与资质材料，提交合作申请表' },
  { num: '2', title: '资质审核', desc: '专业团队在1-3个工作日内完成资质审核' },
  { num: '3', title: '签署协议', desc: '双方确认合作条款，正式签署合作协议' },
  { num: '4', title: '开始合作', desc: '获取专属账户与API权限，即刻开展业务' },
];

const BusinessCooperationPage = () => {
  const handleBack = () => {
    window.location.href = window.location.pathname;
  };

  return (
    <div style={styles.page}>
      {/* ── Hero ── */}
      <section style={styles.hero}>
        <div style={styles.heroBgOrb1} />
        <div style={styles.heroBgOrb2} />
        <div style={styles.heroBadge}>🏢 Enterprise Partner Program</div>
        <h1 style={styles.heroTitle}>企业服务 · IP转售合作计划</h1>
        <p style={styles.heroDesc}>
          面向具有ISP/IDC资质的服务商及企业级用户，提供深度定制化合作方案。
          买的越多折扣越大，专属技术支持与API全接入，助力您快速拓展业务版图。
        </p>
        <div style={styles.heroActions}>
          <a href="#apply" style={styles.btnPrimary}>立即申请合作</a>
          <button onClick={handleBack} style={styles.btnOutline}>← 返回首页</button>
        </div>
      </section>

      {/* ── Stats ── */}
      <div style={styles.statsStrip}>
        {[
          { value: '190+', label: '覆盖国家和地区' },
          { value: '9000万+', label: '全球IP资源池' },
          { value: '99.9%', label: '服务可用率' },
          { value: '更多', label: '量大折扣更大' },
        ].map((s, i) => (
          <div key={i} style={styles.statItem}>
            <div style={styles.statValue}>{s.value}</div>
            <div style={styles.statLabel}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── Advantages ── */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>为什么选择企业合作</h2>
        <p style={styles.sectionDesc}>我们为转售服务商提供全链路支持，让合作更高效、更安心</p>
        <div style={styles.cardsGrid}>
          {advantages.map((a, i) => (
            <div
              key={i}
              style={styles.card}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = 'rgba(79,142,255,0.3)';
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(79,142,255,0.1)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(79,142,255,0.12)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{ ...styles.cardIcon, background: a.bg }}>{a.icon}</div>
              <div style={styles.cardTitle}>{a.title}</div>
              <div style={styles.cardDesc}>{a.desc}</div>
            </div>
          ))}
        </div>
      </section>


      {/* ── Steps ── */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>合作流程</h2>
        <p style={styles.sectionDesc}>简单四步，快速开启企业级合作</p>
        <div style={styles.stepsGrid}>
          {steps.map((s, i) => (
            <div key={i} style={styles.step}>
              <div style={styles.stepNumber}>{s.num}</div>
              <div style={styles.stepTitle}>{s.title}</div>
              <div style={styles.stepDesc}>{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <div id="apply" style={styles.ctaBanner}>
        <h2 style={styles.ctaTitle}>准备好开始合作了吗？</h2>
        <p style={styles.ctaDesc}>联系我们的商务团队，获取专属合作方案与报价</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <a href="mailto:business@example.com" style={styles.btnPrimary}>📧 联系商务团队</a>
          <a
            href={window.location.pathname + '?tab=become_agent'}
            style={styles.btnOutline}
          >
            🤝 了解代理计划
          </a>
        </div>
      </div>
    </div>
  );
};

export default BusinessCooperationPage;

