import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Search, 
  Copy, 
  Check,
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  ArrowRight,
  Tag,
  CreditCard,
  Zap,
  Gift,
  TrendingUp,
  ShieldCheck,
  Info,
  ChevronRight,
  ExternalLink,
  Percent,
  DollarSign,
  X,
  Filter
} from 'lucide-react';

const CouponCenter = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('all');
  const [redeemCode, setRedeemCode] = useState('');
  const [redeemStatus, setRedeemStatus] = useState(null);
  const [copiedCode, setCopiedCode] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState(null);

  /* ════════════════════════════════════════════
     MOCK DATA — Aligned with Header & Order Page
     ════════════════════════════════════════════ */
  const credits = [
    {
      id: 'CR-001',
      code: 'WELCOME10',
      type: 'percentage',
      value: 10,
      title: 'New User Welcome Credit',
      titleZh: '新用户欢迎礼',
      description: '首次购买静态住宅 ISP 代理可享 10% 折扣，无门槛。',
      descriptionEn: '10% off your first Static Residential ISP proxy purchase. No minimum.',
      originalAmount: null,      // percentage type — no fixed dollar amount
      remainingAmount: null,
      minSpend: 0,
      maxDiscount: 50,           // cap at $50
      issuedDate: '2026-01-01',
      expiryDate: '2026-12-31',
      status: 'active',
      scope: ['Static ISP', 'Dynamic ISP'],
      source: 'system',
      usageCount: 0,
      usageLimit: 1,
    },
    {
      id: 'CR-002',
      code: 'VIP20',
      type: 'percentage',
      value: 20,
      title: 'VIP Exclusive Discount',
      titleZh: 'VIP 专属折扣',
      description: 'VIP 用户专享 20% 折扣，适用于所有代理产品。',
      descriptionEn: '20% off all proxy products. Exclusive for VIP members.',
      originalAmount: null,
      remainingAmount: null,
      minSpend: 50,
      maxDiscount: 200,
      issuedDate: '2026-02-01',
      expiryDate: '2026-06-30',
      status: 'active',
      scope: ['All Products'],
      source: 'tier-upgrade',
      usageCount: 0,
      usageLimit: 3,
    },
    {
      id: 'CR-003',
      code: 'SAVE15',
      type: 'percentage',
      value: 15,
      title: 'Limited-Time Promotion',
      titleZh: '限时促销折扣',
      description: '限时 15% 折扣，订单满 $30 即可使用。',
      descriptionEn: '15% off orders over $30. Limited time offer.',
      originalAmount: null,
      remainingAmount: null,
      minSpend: 30,
      maxDiscount: 100,
      issuedDate: '2026-01-15',
      expiryDate: '2026-03-31',
      status: 'active',
      scope: ['Static ISP', 'Datacenter'],
      source: 'promotion',
      usageCount: 0,
      usageLimit: 1,
    },
    {
      id: 'CR-004',
      code: 'REFERRAL-10USD',
      type: 'fixed',
      value: 10,
      title: 'Referral Reward',
      titleZh: '推荐奖励额度',
      description: '通过邀请好友获得 $10.00 账户抵扣额度。',
      descriptionEn: '$10 account credit earned from referral program.',
      originalAmount: 10,
      remainingAmount: 10,
      minSpend: 50,
      maxDiscount: 10,
      issuedDate: '2025-11-20',
      expiryDate: '2026-11-30',
      status: 'active',
      scope: ['All Products'],
      source: 'referral',
      usageCount: 0,
      usageLimit: 1,
    },
    {
      id: 'CR-005',
      code: 'BFRIDAY50',
      type: 'percentage',
      value: 50,
      title: 'Black Friday Special',
      titleZh: 'Black Friday 特惠',
      description: '黑五限定 50% 折扣，仅限数据中心产品。',
      descriptionEn: '50% off Datacenter proxies. Black Friday exclusive.',
      originalAmount: null,
      remainingAmount: null,
      minSpend: 100,
      maxDiscount: 500,
      issuedDate: '2025-11-25',
      expiryDate: '2025-12-01',
      status: 'expired',
      scope: ['Datacenter'],
      source: 'promotion',
      usageCount: 0,
      usageLimit: 1,
    },
    {
      id: 'CR-006',
      code: 'SUMMER5',
      type: 'fixed',
      value: 5,
      title: 'Summer Promotion',
      titleZh: '夏季促销额度',
      description: '$5 抵扣额度，已于 2025-08-20 使用。',
      descriptionEn: '$5 credit, used on Aug 20, 2025.',
      originalAmount: 5,
      remainingAmount: 0,
      minSpend: 20,
      maxDiscount: 5,
      issuedDate: '2025-06-01',
      expiryDate: '2025-09-15',
      status: 'used',
      usedDate: '2025-08-20',
      scope: ['All Products'],
      source: 'promotion',
      usageCount: 1,
      usageLimit: 1,
    },
  ];

  /* ══ Derived Data ══ */
  const summary = useMemo(() => {
    const active = credits.filter(c => c.status === 'active');
    const totalFixedCredits = active
      .filter(c => c.type === 'fixed')
      .reduce((sum, c) => sum + (c.remainingAmount || 0), 0);
    const promotionCount = active.filter(c => c.type === 'percentage').length;
    const expiringSoon = active.filter(c => {
      const days = Math.ceil((new Date(c.expiryDate) - new Date()) / (1000 * 60 * 60 * 24));
      return days <= 30 && days > 0;
    });
    const totalSaved = credits
      .filter(c => c.status === 'used' && c.type === 'fixed')
      .reduce((sum, c) => sum + (c.originalAmount || 0), 0);
    return { active, totalFixedCredits, promotionCount, expiringSoon, totalSaved };
  }, [credits]);

  /* ══ Filtering ══ */
  const filteredCredits = useMemo(() => {
    let list = credits;
    if (activeTab !== 'all') list = list.filter(c => c.status === activeTab);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(c =>
        c.code.toLowerCase().includes(q) ||
        c.title.toLowerCase().includes(q) ||
        c.titleZh.includes(q) ||
        c.description.includes(q)
      );
    }
    return list;
  }, [credits, activeTab, searchQuery]);

  /* ══ Handlers ══ */
  const handleRedeem = (e) => {
    e.preventDefault();
    if (!redeemCode.trim()) return;
    setRedeemStatus('processing');
    setTimeout(() => {
      const valid = credits.some(c => c.code === redeemCode.trim().toUpperCase());
      if (redeemCode.toUpperCase() === 'NEWCODE50') {
        setRedeemStatus('success');
        setRedeemCode('');
      } else if (valid) {
        setRedeemStatus('duplicate');
      } else {
        setRedeemStatus('error');
      }
      setTimeout(() => setRedeemStatus(null), 4000);
    }, 800);
  };

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  /* ══ Helpers ══ */
  const getDaysRemaining = (dateStr) => {
    const days = Math.ceil((new Date(dateStr) - new Date()) / (1000 * 60 * 60 * 24));
    return days;
  };

  const getStatusConfig = (status) => {
    switch (status) {
      case 'active':
        return { label: 'Active', labelZh: '可用', color: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-200', dot: 'bg-emerald-500' };
      case 'expired':
        return { label: 'Expired', labelZh: '已过期', color: 'text-gray-500', bg: 'bg-gray-50', border: 'border-gray-200', dot: 'bg-gray-400' };
      case 'used':
        return { label: 'Used', labelZh: '已使用', color: 'text-gray-500', bg: 'bg-gray-50', border: 'border-gray-200', dot: 'bg-gray-400' };
      default:
        return { label: status, labelZh: status, color: 'text-gray-500', bg: 'bg-gray-50', border: 'border-gray-200', dot: 'bg-gray-400' };
    }
  };

  const getSourceLabel = (source) => {
    const map = {
      'system': '系统发放',
      'tier-upgrade': '等级升级',
      'promotion': '营销活动',
      'referral': '推荐奖励',
      'partner': '合作伙伴',
    };
    return map[source] || source;
  };

  const getTypeIcon = (type) => {
    return type === 'fixed'
      ? <DollarSign className="w-4 h-4" />
      : <Percent className="w-4 h-4" />;
  };

  /* ═══════════════════════════════════════
     RENDER
     ═══════════════════════════════════════ */
  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10 max-w-6xl mx-auto">

      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            额度与优惠
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">管理您的促销额度、折扣码和推荐奖励。</p>
        </div>
        <a
          href="#"
          className="text-sm text-[#1A73E8] hover:text-blue-800 font-medium flex items-center gap-1 transition-colors"
          onClick={(e) => e.preventDefault()}
        >
          了解促销政策
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* ── Summary Cards (GCP Billing Style) ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard
          icon={<CreditCard className="w-5 h-5 text-[#1A73E8]" />}
          label="可用额度"
          value={`$${summary.totalFixedCredits.toFixed(2)}`}
          sublabel="固定金额额度"
          accent="blue"
        />
        <SummaryCard
          icon={<Percent className="w-5 h-5 text-emerald-600" />}
          label="折扣券"
          value={`${summary.promotionCount} 张`}
          sublabel="百分比折扣可用"
          accent="emerald"
        />
        <SummaryCard
          icon={<Clock className="w-5 h-5 text-amber-600" />}
          label="即将过期"
          value={`${summary.expiringSoon.length} 张`}
          sublabel="30 天内到期"
          accent="amber"
        />
        <SummaryCard
          icon={<TrendingUp className="w-5 h-5 text-violet-600" />}
          label="累计节省"
          value={`$${summary.totalSaved.toFixed(2)}`}
          sublabel="历史已使用额度"
          accent="violet"
        />
      </div>

      {/* ── Redeem Code (AWS Style) ── */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-gray-900 mb-1 flex items-center gap-2">
              <Gift className="w-4 h-4 text-[#1A73E8]" />
              兑换促销代码
            </h3>
            <p className="text-xs text-gray-500">输入您收到的促销代码来激活额度或折扣券。</p>
          </div>
          <form onSubmit={handleRedeem} className="flex gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <input
                type="text"
                value={redeemCode}
                onChange={(e) => setRedeemCode(e.target.value.toUpperCase())}
                className="block w-full px-3.5 py-2 border border-gray-300 rounded-lg text-sm bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1A73E8]/20 focus:border-[#1A73E8] transition-all font-mono tracking-wider"
                placeholder="输入促销代码"
                spellCheck={false}
              />
            </div>
            <button
              type="submit"
              disabled={!redeemCode.trim() || redeemStatus === 'processing'}
              className="px-5 py-2 text-sm font-medium rounded-lg text-white bg-[#1A73E8] hover:bg-[#1557B0] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1A73E8] disabled:opacity-40 disabled:cursor-not-allowed transition-all whitespace-nowrap"
            >
              {redeemStatus === 'processing' ? '验证中…' : '兑换'}
            </button>
          </form>
        </div>

        {/* Status Feedback */}
        {redeemStatus && redeemStatus !== 'processing' && (
          <div className={`mt-3 flex items-center gap-2 text-sm px-3 py-2 rounded-lg ${
            redeemStatus === 'success' ? 'bg-emerald-50 text-emerald-700' :
            redeemStatus === 'duplicate' ? 'bg-amber-50 text-amber-700' :
            'bg-red-50 text-red-700'
          }`}>
            {redeemStatus === 'success' ? <CheckCircle2 className="w-4 h-4" /> :
             redeemStatus === 'duplicate' ? <Info className="w-4 h-4" /> :
             <AlertCircle className="w-4 h-4" />}
            {redeemStatus === 'success' && '促销代码已成功兑换，额度已添加到您的账户。'}
            {redeemStatus === 'duplicate' && '此促销代码已在您的账户中激活。'}
            {redeemStatus === 'error' && '促销代码无效或已过期，请检查后重试。'}
          </div>
        )}
      </div>

      {/* ── Filter Bar ── */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Tabs */}
          <div className="flex items-center gap-1">
            {[
              { id: 'all',     label: '全部',  count: credits.length },
              { id: 'active',  label: '可用',  count: credits.filter(c => c.status === 'active').length },
              { id: 'used',    label: '已使用', count: credits.filter(c => c.status === 'used').length },
              { id: 'expired', label: '已过期', count: credits.filter(c => c.status === 'expired').length },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 text-sm rounded-lg font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#1A73E8]/10 text-[#1A73E8]'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                {tab.label}
                <span className={`ml-1.5 text-xs ${activeTab === tab.id ? 'text-[#1A73E8]' : 'text-gray-400'}`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-56">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索代码或名称…"
              className="w-full pl-9 pr-3 py-1.5 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1A73E8]/20 focus:border-[#1A73E8] transition-all"
            />
          </div>
        </div>

        {/* ── Credits Table / List ── */}
        {filteredCredits.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {/* Table Header */}
            <div className="hidden lg:grid grid-cols-12 gap-4 px-5 py-2.5 text-[11px] font-semibold text-gray-400 uppercase tracking-wider bg-gray-50/50">
              <div className="col-span-4">额度 / 折扣</div>
              <div className="col-span-2">类型</div>
              <div className="col-span-2">适用范围</div>
              <div className="col-span-2">有效期</div>
              <div className="col-span-2 text-right">操作</div>
            </div>

            {filteredCredits.map((credit) => {
              const statusCfg = getStatusConfig(credit.status);
              const days = getDaysRemaining(credit.expiryDate);
              const isExpiringSoon = credit.status === 'active' && days <= 30 && days > 0;
              const isActive = credit.status === 'active';
              const isExpanded = expandedId === credit.id;

              return (
                <div key={credit.id} className={`group transition-colors ${isActive ? 'hover:bg-blue-50/30' : 'hover:bg-gray-50/50'}`}>
                  {/* Main Row */}
                  <div
                    className="grid grid-cols-1 lg:grid-cols-12 gap-2 lg:gap-4 px-5 py-4 items-center cursor-pointer"
                    onClick={() => setExpandedId(isExpanded ? null : credit.id)}
                  >
                    {/* Credit Info */}
                    <div className="col-span-1 lg:col-span-4 flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                        isActive ? 'bg-[#1A73E8]/10 text-[#1A73E8]' : 'bg-gray-100 text-gray-400'
                      }`}>
                        {getTypeIcon(credit.type)}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className={`text-sm font-semibold ${isActive ? 'text-gray-900' : 'text-gray-400'}`}>
                            {credit.type === 'fixed' ? `$${credit.value}` : `${credit.value}%`}
                          </span>
                          <span className={`text-sm ${isActive ? 'text-gray-700' : 'text-gray-400'}`}>
                            {credit.titleZh}
                          </span>
                          {isExpiringSoon && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-50 text-amber-600 border border-amber-200 font-medium whitespace-nowrap">
                              {days}天后过期
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <code className={`text-xs font-mono ${isActive ? 'text-gray-500' : 'text-gray-400'}`}>
                            {credit.code}
                          </code>
                          <span className={`inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded-full ${statusCfg.bg} ${statusCfg.color} border ${statusCfg.border}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${statusCfg.dot}`}></span>
                            {statusCfg.labelZh}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Type */}
                    <div className="hidden lg:block col-span-2">
                      <span className="text-xs text-gray-500">
                        {credit.type === 'fixed' ? '固定金额' : '百分比折扣'}
                      </span>
                      <div className="text-[11px] text-gray-400 mt-0.5">
                        {getSourceLabel(credit.source)}
                      </div>
                    </div>

                    {/* Scope */}
                    <div className="hidden lg:flex col-span-2 flex-wrap gap-1">
                      {credit.scope.map((s, i) => (
                        <span key={i} className="text-[11px] px-2 py-0.5 rounded bg-gray-50 text-gray-500 border border-gray-100">
                          {s}
                        </span>
                      ))}
                    </div>

                    {/* Expiry */}
                    <div className="hidden lg:block col-span-2">
                      <div className={`text-xs ${isActive ? 'text-gray-600' : 'text-gray-400'}`}>
                        {credit.expiryDate}
                      </div>
                      {credit.status === 'used' && credit.usedDate && (
                        <div className="text-[11px] text-gray-400 mt-0.5">
                          使用于 {credit.usedDate}
                        </div>
                      )}
                      {isActive && credit.usageLimit > 0 && (
                        <div className="text-[11px] text-gray-400 mt-0.5">
                          已用 {credit.usageCount}/{credit.usageLimit} 次
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="hidden lg:flex col-span-2 items-center justify-end gap-2">
                      {isActive && (
                        <>
                          <button
                            onClick={(e) => { e.stopPropagation(); handleCopy(credit.code); }}
                            className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-md border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all"
                          >
                            {copiedCode === credit.code ? (
                              <><Check className="w-3 h-3 text-emerald-500" /> 已复制</>
                            ) : (
                              <><Copy className="w-3 h-3" /> 复制</>
                            )}
                          </button>
                          <button
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-md bg-[#1A73E8] text-white hover:bg-[#1557B0] transition-all"
                          >
                            使用
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </>
                      )}
                      <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                    </div>

                    {/* Mobile Actions */}
                    <div className="flex lg:hidden items-center gap-2 mt-1">
                      {isActive && (
                        <>
                          <button
                            onClick={(e) => { e.stopPropagation(); handleCopy(credit.code); }}
                            className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-md border border-gray-200 text-gray-600 hover:bg-gray-50 transition-all"
                          >
                            {copiedCode === credit.code ? <><Check className="w-3 h-3 text-emerald-500" /> 已复制</> : <><Copy className="w-3 h-3" /> 复制代码</>}
                          </button>
                          <button className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-md bg-[#1A73E8] text-white hover:bg-[#1557B0] transition-all">
                            立即使用 <ArrowRight className="w-3 h-3" />
                          </button>
                        </>
                      )}
                      <span className={`text-[11px] ml-auto ${statusCfg.color}`}>{statusCfg.labelZh}</span>
                    </div>
                  </div>

                  {/* Expanded Detail Panel */}
                  {isExpanded && (
                    <div className="px-5 pb-4 pt-0">
                      <div className="ml-[52px] p-4 bg-gray-50 rounded-lg border border-gray-100 text-sm space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <DetailRow label="促销代码" value={credit.code} mono />
                          <DetailRow label="折扣类型" value={credit.type === 'fixed' ? `固定金额 $${credit.value}` : `${credit.value}% 折扣`} />
                          <DetailRow label="最低消费" value={credit.minSpend > 0 ? `$${credit.minSpend}` : '无门槛'} />
                          <DetailRow label="最高减免" value={credit.maxDiscount ? `$${credit.maxDiscount}` : '无上限'} />
                          <DetailRow label="发放日期" value={credit.issuedDate} />
                          <DetailRow label="到期日期" value={credit.expiryDate} />
                          <DetailRow label="来源" value={getSourceLabel(credit.source)} />
                          <DetailRow label="使用次数" value={`${credit.usageCount} / ${credit.usageLimit}`} />
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 mb-1">说明</div>
                          <p className="text-xs text-gray-600 leading-relaxed">{credit.description}</p>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 mb-1">适用范围</div>
                          <div className="flex flex-wrap gap-1.5">
                            {credit.scope.map((s, i) => (
                              <span key={i} className="text-[11px] px-2 py-0.5 rounded bg-white text-gray-600 border border-gray-200">
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          /* ── Empty State ── */
          <div className="py-16 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-3">
              <Tag className="w-5 h-5 text-gray-400" />
            </div>
            <h3 className="text-sm font-medium text-gray-900 mb-1">未找到匹配的额度</h3>
            <p className="text-xs text-gray-500">尝试更换筛选条件或清除搜索关键词。</p>
          </div>
        )}

        {/* ── Footer Info ── */}
        <div className="px-5 py-3 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between text-xs text-gray-400">
          <span>共 {filteredCredits.length} 条记录</span>
          <div className="flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" />
            <span>额度在结算时自动校验</span>
          </div>
        </div>
      </div>

      {/* ── Help Note (AWS Style) ── */}
      <div className="flex items-start gap-3 p-4 bg-blue-50/50 border border-blue-100 rounded-xl">
        <Info className="w-4 h-4 text-[#1A73E8] mt-0.5 shrink-0" />
        <div className="text-xs text-gray-600 leading-relaxed">
          <strong className="text-gray-800">关于额度与优惠</strong> — 促销额度和折扣码可在结算页的「促销代码」输入框中使用。
          百分比折扣直接从订单金额中扣减；固定金额额度将从应付金额中抵扣。多张额度不可叠加使用，系统将自动选择最优方案。
          如有疑问，请联系 <a href="#" className="text-[#1A73E8] hover:underline">客服支持</a>。
        </div>
      </div>
    </div>
  );
};

/* ═══ Sub-Components ═══ */

const SummaryCard = ({ icon, label, value, sublabel, accent = 'blue' }) => {
  const borderMap = {
    blue: 'border-l-[#1A73E8]',
    emerald: 'border-l-emerald-500',
    amber: 'border-l-amber-500',
    violet: 'border-l-violet-500',
  };
  return (
    <div className={`bg-white rounded-xl border border-gray-200 p-4 border-l-4 ${borderMap[accent]}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-gray-500 font-medium">{label}</span>
        {icon}
      </div>
      <div className="text-xl font-bold text-gray-900 tracking-tight">{value}</div>
      <div className="text-[11px] text-gray-400 mt-0.5">{sublabel}</div>
    </div>
  );
};

const DetailRow = ({ label, value, mono = false }) => (
  <div>
    <div className="text-[11px] text-gray-400 mb-0.5">{label}</div>
    <div className={`text-xs text-gray-700 ${mono ? 'font-mono tracking-wide' : ''}`}>{value}</div>
  </div>
);

export default CouponCenter;
