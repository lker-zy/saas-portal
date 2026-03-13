// Sections Data for Portal Homepage Components
// Extracted from original portal at localhost:3001
// Date: March 13, 2026

export const coverageSectionData = {
  title: '覆盖全球60+国家，可用性高达99.99%',
  features: [
    '满足各类场景',
    '多种协议',
    '10G+高速带宽',
    '定制化服务'
  ],
  countries: [
    { id: 1, name: '美国', ips: '468327', flag: '🇺🇸', flagCode: 'US' },
    { id: 2, name: '加拿大', ips: '468327', flag: '🇨🇦', flagCode: 'CA' },
    { id: 3, name: '英国', ips: '468327', flag: '🇬🇧', flagCode: 'GB' },
    { id: 4, name: '法国', ips: '468327', flag: '🇫🇷', flagCode: 'FR' },
    { id: 5, name: '印尼', ips: '468327', flag: '🇮🇩', flagCode: 'ID' },
    { id: 6, name: '香港 中国', ips: '468327', flag: '🇭🇰', flagCode: 'HK' },
    { id: 7, name: '印度', ips: '468327', flag: '🇮🇳', flagCode: 'IN', status: '已售罄', action: '补货通知' },
    { id: 8, name: '韩国', ips: '468327', flag: '🇰🇷', flagCode: 'KR' },
    { id: 9, name: '德国', ips: '468327', flag: '🇩🇪', flagCode: 'DE' },
    { id: 10, name: '巴西', ips: '468327', flag: '🇧🇷', flagCode: 'BR' },
    { id: 11, name: '日本', ips: '468327', flag: '🇯🇵', flagCode: 'JP' }
  ],
  viewMore: '查看更多国家',
  stats: [
    { number: '60+', label: '覆盖国家', icon: '🌍' },
    { number: '99.99%', label: '可用性', icon: '✓' },
    { number: '10G+', label: '高速带宽', icon: '⚡' }
  ]
};

export const pricingSectionData = {
  title: '选择代理套餐',
  subtitle: '灵活的定价方案，满足不同业务需求',
  billingCycle: 'monthly', // 'monthly' | 'yearly'
  plans: [
    {
      id: 'static',
      name: '静态住宅IP',
      icon: '🏠',
      description: '高质量纯净住宅IP，稳定可靠',
      price: {
        monthly: 0.15,
        yearly: 0.12,
        discount: 20 // 20% off for yearly
      },
      unit: 'IP / 天',
      features: [
        '多协议支持',
        '多地域接入',
        '多行业适配',
        '99.99% 可用性',
        '24/7 技术支持'
      ],
      popular: true,
      badge: '最受欢迎'
    },
    {
      id: 'dynamic',
      name: '动态住宅IP',
      icon: '🔄',
      description: '真实住宅IP池，自动轮换',
      price: {
        monthly: 0.08,
        yearly: 0.06,
        discount: 25 // 25% off for yearly
      },
      unit: 'IP / 天',
      features: [
        '多协议支持',
        '多地域接入',
        '多行业适配',
        '自动IP轮换',
        '无限并发'
      ],
      popular: false
    },
    {
      id: 'datacenter',
      name: '数据中心IP',
      icon: '🖥️',
      description: '高性能数据中心IP，极速稳定',
      price: {
        monthly: 0.05,
        yearly: 0.04,
        discount: 20 // 20% off for yearly
      },
      unit: 'IP / 天',
      features: [
        '多协议支持',
        '多地域接入',
        '多行业适配',
        '极速连接',
        '高性价比'
      ],
      popular: false
    }
  ],
  billingOptions: {
    monthly: {
      label: '月付',
      discountBadge: null
    },
    yearly: {
      label: '年付',
      discountBadge: '省17%'
    }
  },
  trustBadges: [
    {
      icon: '🔒',
      text: '安全支付',
      description: 'SSL加密保护'
    },
    {
      icon: '🕐',
      text: '7x24小时支持',
      description: '专业技术团队'
    },
    {
      icon: '💰',
      text: '退款保证',
      description: '7天无理由退款'
    }
  ]
};

export const quickStartSectionData = {
  title: '如何快速上手使用？',
  subtitle: '三步开启您的全球代理之旅',
  steps: [
    {
      number: '01',
      icon: '🎯',
      title: '简单选择您的代理需求',
      description: '仅需几步，轻松定义您的代理配置。从选择国家/地区和具体使用场景（如跨境电商、社交媒体），到设定IP级别、使用终端和交付协议，每项选择都将精准匹配您的业务场景。',
      details: [
        '选择国家/地区',
        '选择使用场景',
        '设定IP级别',
        '选择使用终端',
        '配置交付协议'
      ],
      duration: '2-3 分钟',
      difficulty: '简单'
    },
    {
      number: '02',
      icon: '⚡',
      title: '智能推荐方案',
      description: '基于您在第一步中确定的多维度业务场景，我们的智能系统将自动为您生成一套高度匹配的代理推荐方案。告别繁琐选择，高效找到最适合您的代理服务组合。',
      details: [
        'AI智能分析',
        '自动匹配方案',
        '性价比优化',
        '性能预估',
        '兼容性检查'
      ],
      duration: '即时',
      difficulty: '自动'
    },
    {
      number: '03',
      icon: '🚀',
      title: '一键下单，体验高速服务',
      description: '专属方案为您量身定制，点击立即下单可直接跳转到购买页面，系统将自动填充完您所有配置，无论是集成至软件路由、指纹浏览器，还是代理客户端都能轻松部署，即刻享受稳定、高速的全球代理服务。',
      details: [
        '自动填充配置',
        '支持多种集成方式',
        '即时生效',
        '24/7 技术支持',
        '性能监控'
      ],
      duration: '1 分钟',
      difficulty: '简单'
    }
  ],
  cta: {
    buttonText: '立即开始',
    buttonIcon: '→',
    note: '无需信用卡 · 免费试用 · 随时取消'
  },
  helpLinks: [
    {
      text: '需要帮助？查看使用指南',
      url: '/help',
      icon: '❓'
    },
    {
      text: '联系技术支持',
      url: '/contact',
      icon: '📧'
    }
  ]
};

// Export all data as a single object
export const sectionsData = {
  coverage: coverageSectionData,
  pricing: pricingSectionData,
  quickStart: quickStartSectionData
};

// Default export
export default sectionsData;
