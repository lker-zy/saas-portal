import React from 'react';

const styles = {
  page: {
    minHeight: '100vh',
    backgroundColor: '#0f172a',
    color: '#fff',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    overflowX: 'hidden',
  },
  /* ── Hero ── */
  hero: {
    position: 'relative',
    padding: '140px 20px 80px',
    textAlign: 'center',
    background: 'linear-gradient(180deg, #0f172a 0%, #1e2a45 50%, #0f172a 100%)',
    overflow: 'hidden',
  },
  heroBgOrb1: {
    position: 'absolute',
    top: '-100px',
    right: '-80px',
    width: '380px',
    height: '380px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%)',
    filter: 'blur(60px)',
    pointerEvents: 'none',
  },
  heroBgOrb2: {
    position: 'absolute',
    bottom: '-60px',
    left: '-80px',
    width: '320px',
    height: '320px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(79,142,255,0.12) 0%, transparent 70%)',
    filter: 'blur(60px)',
    pointerEvents: 'none',
  },
  heroBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 20px',
    borderRadius: '100px',
    background: 'rgba(16,185,129,0.1)',
    border: '1px solid rgba(16,185,129,0.3)',
    color: '#34d399',
    fontSize: '14px',
    fontWeight: 600,
    marginBottom: '24px',
  },
  heroTitle: {
    fontSize: 'clamp(28px, 5vw, 48px)',
    fontWeight: 800,
    lineHeight: 1.2,
    marginBottom: '20px',
    background: 'linear-gradient(135deg, #ffffff 0%, #34d399 50%, #4F8EFF 100%)',
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
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    color: '#fff',
    fontSize: '16px',
    fontWeight: 600,
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 4px 20px rgba(16,185,129,0.35)',
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
    color: '#34d399',
    fontSize: '16px',
    fontWeight: 600,
    border: '1px solid rgba(16,185,129,0.4)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textDecoration: 'none',
  },
  /* ── Stats ── */
  statsStrip: {
    display: 'flex',
    justifyContent: 'center',
    gap: 'clamp(24px, 4vw, 60px)',
    padding: '40px 20px',
    borderTop: '1px solid rgba(255,255,255,0.06)',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
    flexWrap: 'wrap',
  },
  statItem: { textAlign: 'center' },
  statValue: {
    fontSize: 'clamp(24px, 3vw, 36px)',
    fontWeight: 800,
    background: 'linear-gradient(135deg, #10b981, #4F8EFF)',
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
  /* ── Benefit Cards ── */
  cardsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: '24px',
  },
  card: {
    background: 'linear-gradient(135deg, rgba(30,41,59,0.7) 0%, rgba(15,23,42,0.9) 100%)',
    border: '1px solid rgba(16,185,129,0.12)',
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
  /* ── Commission Tiers ── */
  tiersGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: '24px',
    maxWidth: '1000px',
    margin: '0 auto',
  },
  tier: {
    background: 'linear-gradient(135deg, rgba(30,41,59,0.6) 0%, rgba(15,23,42,0.8) 100%)',
    border: '1px solid rgba(16,185,129,0.15)',
    borderRadius: '20px',
    padding: '32px 28px',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  tierHighlight: {
    border: '1px solid rgba(16,185,129,0.4)',
    boxShadow: '0 0 40px rgba(16,185,129,0.08)',
  },
  tierBadge: {
    position: 'absolute',
    top: '14px',
    right: '14px',
    padding: '4px 14px',
    borderRadius: '100px',
    background: 'linear-gradient(135deg, #10b981, #059669)',
    color: '#fff',
    fontSize: '12px',
    fontWeight: 700,
  },
  tierIcon: {
    fontSize: '40px',
    marginBottom: '12px',
  },
  tierTitle: {
    fontSize: '18px',
    fontWeight: 700,
    marginBottom: '6px',
  },
  tierRange: {
    fontSize: '13px',
    color: 'rgba(255,255,255,0.45)',
    marginBottom: '16px',
  },
  tierRate: {
    fontSize: 'clamp(28px, 4vw, 36px)',
    fontWeight: 800,
    background: 'linear-gradient(135deg, #10b981, #34d399)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    marginBottom: '8px',
  },
  tierNote: {
    fontSize: '13px',
    color: 'rgba(255,255,255,0.5)',
  },
  /* ── How It Works ── */
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
    position: 'relative',
  },
  stepNumber: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, rgba(16,185,129,0.2), rgba(5,150,105,0.15))',
    border: '1px solid rgba(16,185,129,0.3)',
    fontSize: '20px',
    fontWeight: 800,
    color: '#34d399',
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
  /* ── FAQ ── */
  faqGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '20px',
    maxWidth: '900px',
    margin: '0 auto',
  },
  faqItem: {
    background: 'rgba(30,41,59,0.5)',
    border: '1px solid rgba(255,255,255,0.06)',
    borderRadius: '14px',
    padding: '24px',
  },
  faqQ: {
    fontSize: '15px',
    fontWeight: 700,
    marginBottom: '8px',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '10px',
  },
  faqA: {
    fontSize: '14px',
    color: 'rgba(255,255,255,0.55)',
    lineHeight: 1.7,
    paddingLeft: '28px',
  },
  /* ── CTA ── */
  ctaBanner: {
    margin: '0 auto 60px',
    padding: 'clamp(40px, 5vw, 64px) 32px',
    borderRadius: '24px',
    background: 'linear-gradient(135deg, rgba(16,185,129,0.1) 0%, rgba(79,142,255,0.06) 100%)',
    border: '1px solid rgba(16,185,129,0.2)',
    textAlign: 'center',
    maxWidth: '1000px',
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

const benefits = [
  {
    icon: '💰',
    title: '高额佣金返利',
    desc: '高额阶梯佣金，用户持续消费您持续获利，终生返佣，躺赚不停。',
    bg: 'linear-gradient(135deg, rgba(16,185,129,0.15), rgba(5,150,105,0.1))',
  },
  {
    icon: '⚡',
    title: '次月快速提现',
    desc: '支持微信、支付宝和银行卡多渠道提现，佣金次月到账，提现流程简单快捷。',
    bg: 'linear-gradient(135deg, rgba(245,158,11,0.15), rgba(217,119,6,0.1))',
  },
  {
    icon: '🎓',
    title: '专人辅导培训',
    desc: '一对一运营指导，提供专业推广素材和话术，快速上手无门槛。',
    bg: 'linear-gradient(135deg, rgba(79,142,255,0.15), rgba(37,99,235,0.1))',
  },
  {
    icon: '📈',
    title: '实时数据看板',
    desc: '独立代理后台，实时查看推广数据、用户消费和佣金收益，运营透明。',
    bg: 'linear-gradient(135deg, rgba(139,92,246,0.15), rgba(109,40,217,0.1))',
  },
  {
    icon: '🔗',
    title: '专属推广链接',
    desc: '自动生成专属推广链接和二维码，支持多渠道分享追踪，推广更便捷。',
    bg: 'linear-gradient(135deg, rgba(236,72,153,0.15), rgba(219,39,119,0.1))',
  },
  {
    icon: '🤝',
    title: '零门槛零风险',
    desc: '免费注册成为代理，无需囤货无需垫资，纯推广分佣模式，轻松创业。',
    bg: 'linear-gradient(135deg, rgba(14,165,233,0.15), rgba(2,132,199,0.1))',
  },
];

const commissionTiers = [
  { icon: '🌱', title: '初级代理', range: '入门级推广量', rate: '基础', note: '适合个人兼职推广' },
  { icon: '🌿', title: '高级代理', range: '中等推广量', rate: '进阶', note: '适合全职推广人员', highlight: false },
  { icon: '🌳', title: '金牌代理', range: '大量推广', rate: '最高', note: '适合团队/工作室', highlight: true },
];

const steps = [
  { num: '1', title: '免费注册', desc: '填写基本信息，一键注册成为推广代理' },
  { num: '2', title: '获取链接', desc: '登录代理后台，获取您的专属推广链接' },
  { num: '3', title: '分享推广', desc: '通过社交媒体、社群等渠道分享推广' },
  { num: '4', title: '赚取佣金', desc: '用户消费即可获得佣金，次月到账' },
];

const faqs = [
  { q: '注册需要费用吗？', a: '完全免费！注册成为代理不收取任何费用，零门槛加入。' },
  { q: '佣金如何计算？', a: '佣金按您推荐用户的实际消费金额按比例计算，具体比例请联系客服了解，终生有效，用户每次消费您都能获得返利。' },
  { q: '提现有最低金额限制吗？', a: '提现门槛低，支持微信、支付宝和银行卡多种方式。' },
  { q: '推广素材从哪里获取？', a: '代理后台提供专业推广素材包，包括Banner、文案、视频等，也可联系专属客服定制。' },
];

const BecomeAgentPage = () => {
  const handleBack = () => {
    window.location.href = window.location.pathname;
  };

  return (
    <div style={styles.page}>
      {/* ── Hero ── */}
      <section style={styles.hero}>
        <div style={styles.heroBgOrb1} />
        <div style={styles.heroBgOrb2} />
        <div style={styles.heroBadge}>🤝 Agent Partner Program</div>
        <h1 style={styles.heroTitle}>成为代理 · 轻松赚取高额佣金</h1>
        <p style={styles.heroDesc}>
          加入我们的代理推广计划，分享即赚钱！高额终生返佣，
          支持微信/支付宝极速提现，专人辅导助您快速起步。
        </p>
        <div style={styles.heroActions}>
          <a href="#join" style={styles.btnPrimary}>🚀 立即加入</a>
          <button onClick={handleBack} style={styles.btnOutline}>← 返回首页</button>
        </div>
      </section>

      {/* ── Stats ── */}
      <div style={styles.statsStrip}>
        {[
          { value: '高额', label: '阶梯佣金比例' },
          { value: '终生', label: '返佣有效期' },
          { value: '次月', label: '佣金到账' },
          { value: '¥0', label: '加入成本' },
        ].map((s, i) => (
          <div key={i} style={styles.statItem}>
            <div style={styles.statValue}>{s.value}</div>
            <div style={styles.statLabel}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── Benefits ── */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>代理专属权益</h2>
        <p style={styles.sectionDesc}>我们为每一位代理伙伴提供全方位支持，助您轻松开启副业</p>
        <div style={styles.cardsGrid}>
          {benefits.map((b, i) => (
            <div
              key={i}
              style={styles.card}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = 'rgba(16,185,129,0.3)';
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(16,185,129,0.1)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(16,185,129,0.12)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{ ...styles.cardIcon, background: b.bg }}>{b.icon}</div>
              <div style={styles.cardTitle}>{b.title}</div>
              <div style={styles.cardDesc}>{b.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Commission Tiers ── */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>佣金阶梯</h2>
        <p style={styles.sectionDesc}>推广越多佣金越高，终生锁定最高佣金等级</p>
        <div style={styles.tiersGrid}>
          {commissionTiers.map((t, i) => (
            <div key={i} style={{ ...styles.tier, ...(t.highlight ? styles.tierHighlight : {}) }}>
              {t.highlight && <div style={styles.tierBadge}>🔥 热门</div>}
              <div style={styles.tierIcon}>{t.icon}</div>
              <div style={styles.tierTitle}>{t.title}</div>
              <div style={styles.tierRange}>{t.range}</div>
              <div style={styles.tierRate}>{t.rate} 佣金</div>
              <div style={styles.tierNote}>{t.note}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── How It Works ── */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>如何开始</h2>
        <p style={styles.sectionDesc}>四步轻松开启您的推广赚钱之旅</p>
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

      {/* ── FAQ ── */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>常见问题</h2>
        <p style={styles.sectionDesc}>关于代理计划，您可能想了解的</p>
        <div style={styles.faqGrid}>
          {faqs.map((f, i) => (
            <div key={i} style={styles.faqItem}>
              <div style={styles.faqQ}>
                <span style={{ color: '#34d399', flexShrink: 0 }}>Q:</span>
                {f.q}
              </div>
              <div style={styles.faqA}>{f.a}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <div id="join" style={styles.ctaBanner}>
        <h2 style={styles.ctaTitle}>加入代理，开启您的副业之旅 🎉</h2>
        <p style={styles.ctaDesc}>零门槛、零风险、高回报，分享即赚钱</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <a href="mailto:agent@example.com" style={styles.btnPrimary}>📧 申请成为代理</a>
          <a
            href={window.location.pathname + '?tab=business_cooperation'}
            style={styles.btnOutline}
          >
            🏢 了解企业服务
          </a>
        </div>
      </div>
    </div>
  );
};

export default BecomeAgentPage;

