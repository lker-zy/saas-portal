import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Gift, 
  Copy, 
  Users, 
  DollarSign, 
  Award, 
  ChevronRight, 
  ExternalLink,
  CheckCircle2,
  Clock,
  Share2,
  TrendingUp,
  Star,
  Wallet,
  Percent,
  ArrowRightLeft,
  AlertCircle,
  Sparkles,
  ArrowRight,
  Info,
  Zap,
  X,
  Shield,
  FileText,
  MessageCircle,
  Mail,
  Phone,
  Send,
  Headphones,
  BookOpen,
  Scale,
  Ban,
  RefreshCw,
  AlertTriangle,
  ChevronDown,
  CreditCard,
  GitBranch,
  ArrowDown,
  Layers,
  Target
} from 'lucide-react';

/**
 * ── 客户端推广中心（优化版） ──
 *
 * 优化点：
 * 1. 邀请链接从当前用户数据动态生成
 * 2. 奖励规则使用 i18n 国际化
 * 3. 积分 / 余额 / 推广奖励信息
 * 4. 新增「提现规则」展示区
 * 5. 新增「我的推广链路」可视化
 * 6. 整体布局优化、视觉层次更清晰
 */

/* ── localStorage 读取工具 ── */
const STORAGE_KEY = 'sales_invite_system_v1';

const MIN_EXCHANGE_POINTS = 100;

function readInviteState() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : null;
  } catch {
    return null;
  }
}

function writeInviteState(next) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...next, updatedAt: Date.now() }));
  } catch { /* ignore */ }
}

/** 确保 localStorage 中存在初始种子数据 */
function ensureClientSeed() {
  const existing = readInviteState();
  if (existing) return;
  const seed = {
    users: [
      {
        id: 'client_alex',
        role: 'customer',
        name: 'Alex User',
        email: 'alex@example.com',
        phone: '13800000099',
        inviterId: null,
        managerId: null,
        points: 1200,
        balance: 87.50,
        totalSpend: 560,
        discount: null,
        inviteCode: 'ALEX2024',
        createdAt: Date.now() - 1000 * 60 * 60 * 24 * 60,
      },
    ],
    invites: [],
    registrations: [],
    ledger: [],
    pointsExchangeTiers: [
      { level: 1, name: '普通', minSpend: 0,    pointsPerUSD: 100, desc: '默认：100积分=$1' },
      { level: 2, name: '白银', minSpend: 500,  pointsPerUSD: 80,  desc: '消费≥$500：80积分=$1' },
      { level: 3, name: '黄金', minSpend: 2000, pointsPerUSD: 60,  desc: '消费≥$2000：60积分=$1' },
      { level: 4, name: '钻石', minSpend: 5000, pointsPerUSD: 50,  desc: '消费≥$5000：50积分=$1' },
    ],
    milestoneTiers: {
      pointsRewardTiers: [
        { minSpend: 100, maxSpend: 1000, pointsPer100: 1000, desc: '$100~$1000区间：每$100送1000积分' },
        { minSpend: 1000, maxSpend: null, pointsPer100: 200, desc: '$1000以上区间：每$100送200积分' },
      ],
      discountMilestones: [
        { totalSpend: 2000, discountPercent: 80, desc: '累计$2000，全账户享8折' },
        { totalSpend: 5000, discountPercent: 70, desc: '累计$5000，全账户享7折' },
      ],
    },
    withdrawalRules: {
      minAmount: 100,
      maxDailyAmount: 50000,
      autoApproveThreshold: 5000,
      processingDays: 3,
      feeRate: 0,
      pointsExpiry: 365,
      withdrawalMethods: ['balance', 'bank', 'usdt'],
      enabled: true,
    },
    updatedAt: Date.now(),
  };
  writeInviteState(seed);
}

function getUserFromState(state, userId) {
  if (!state?.users) return null;
  return state.users.find(u => u.id === userId) || null;
}

function getPointsExchangeTiers(state) {
  const tiers = state?.pointsExchangeTiers;
  if (!Array.isArray(tiers) || tiers.length === 0) {
    return [{ level: 1, name: '普通', minSpend: 0, pointsPerUSD: 100, desc: '默认：100积分=$1' }];
  }
  return [...tiers].sort((a, b) => a.minSpend - b.minSpend);
}

function getMilestoneTiersFromState(state) {
  const mt = state?.milestoneTiers;
  if (!mt || typeof mt !== 'object') {
    return {
      pointsRewardTiers: [
        { minSpend: 100, maxSpend: 1000, pointsPer100: 1000, desc: '$100~$1000区间：每$100送1000积分' },
        { minSpend: 1000, maxSpend: null, pointsPer100: 200, desc: '$1000以上区间：每$100送200积分' },
      ],
      discountMilestones: [
        { totalSpend: 2000, discountPercent: 80, desc: '累计$2000，全账户享8折' },
        { totalSpend: 5000, discountPercent: 70, desc: '累计$5000，全账户享7折' },
      ],
    };
  }
  const ensureArr = v => Array.isArray(v) ? v : [];
  return {
    pointsRewardTiers: ensureArr(mt.pointsRewardTiers).sort((a, b) => a.minSpend - b.minSpend),
    discountMilestones: ensureArr(mt.discountMilestones).sort((a, b) => a.totalSpend - b.totalSpend),
  };
}

function getInviterReferralTotalSpend(state, inviterId) {
  if (!inviterId || !state) return 0;
  const inviteeIds = (state.registrations || [])
    .filter(r => r.inviterId === inviterId)
    .map(r => r.inviteeId);
  let total = 0;
  inviteeIds.forEach(id => {
    const user = (state.users || []).find(u => u.id === id);
    if (user) total += Number(user.totalSpend) || 0;
  });
  return total;
}

function calculateMilestonePoints(state, totalSpend) {
  const { pointsRewardTiers } = getMilestoneTiersFromState(state);
  const spend = Number(totalSpend) || 0;
  let totalPoints = 0;
  const breakdown = [];
  for (const tier of pointsRewardTiers) {
    const low = Number(tier.minSpend) || 0;
    const high = tier.maxSpend !== null && tier.maxSpend !== '' ? Number(tier.maxSpend) : Infinity;
    if (spend <= low) continue;
    const effectiveSpend = Math.min(spend, high) - low;
    const blocks = Math.floor(effectiveSpend / 100);
    const pts = blocks * (Number(tier.pointsPer100) || 0);
    if (pts > 0) {
      breakdown.push({
        range: high === Infinity ? `$${low}+` : `$${low}~$${high}`,
        spend: effectiveSpend,
        blocks,
        pointsPer100: tier.pointsPer100,
        points: pts,
      });
      totalPoints += pts;
    }
  }
  return { totalPoints, breakdown };
}

function getMilestoneDiscount(state, totalSpend) {
  const { discountMilestones } = getMilestoneTiersFromState(state);
  const spend = Number(totalSpend) || 0;
  let matched = null;
  let nextMilestone = null;
  for (let i = discountMilestones.length - 1; i >= 0; i--) {
    if (spend >= discountMilestones[i].totalSpend) { matched = discountMilestones[i]; break; }
  }
  for (const m of discountMilestones) {
    if (spend < m.totalSpend) { nextMilestone = m; break; }
  }
  return { discountPercent: matched ? matched.discountPercent : 100, milestone: matched, nextMilestone, allMilestones: discountMilestones };
}

function getUserExchangeTier(state, totalSpend) {
  const tiers = getPointsExchangeTiers(state);
  const spend = Number(totalSpend) || 0;
  let matched = tiers[0];
  for (let i = tiers.length - 1; i >= 0; i--) {
    if (spend >= tiers[i].minSpend) {
      matched = tiers[i];
      break;
    }
  }
  return {
    ...matched,
    exchangeRate: 100 / matched.pointsPerUSD,
  };
}

function exchangePointsToBalance(userId, pointsToExchange) {
  const pts = Math.floor(Number(pointsToExchange) || 0);
  if (pts <= 0) return { ok: false, error: '兑换积分数必须大于0。' };
  if (pts < MIN_EXCHANGE_POINTS) return { ok: false, error: `最少兑换 ${MIN_EXCHANGE_POINTS} 积分。` };

  const state = readInviteState();
  if (!state) return { ok: false, error: '系统数据异常。' };

  const userIdx = state.users.findIndex(u => u.id === userId);
  if (userIdx < 0) return { ok: false, error: '用户不存在。' };

  const user = state.users[userIdx];
  const currentPoints = Number(user.points) || 0;
  if (pts > currentPoints) return { ok: false, error: `积分不足，当前可用 ${currentPoints} 积分。` };

  const totalSpend = Number(user.totalSpend) || 0;
  const tier = getUserExchangeTier(state, totalSpend);
  const exchangedUSD = pts / tier.pointsPerUSD;

  const updatedUser = {
    ...user,
    points: currentPoints - pts,
    balance: (Number(user.balance) || 0) + exchangedUSD,
  };

  const updatedUsers = [...state.users];
  updatedUsers[userIdx] = updatedUser;

  const now = Date.now();
  const makeLedgerId = () => String(now) + '_' + Math.random().toString(16).slice(2);

  const newLedgerEntries = [
    {
      id: makeLedgerId(),
      userId,
      delta: -pts,
      reason: `积分兑换余额[${tier.name}档]（${pts}积分→$${exchangedUSD.toFixed(2)}，汇率:${tier.pointsPerUSD}积分=$1）`,
      type: 'points',
      createdAt: now,
    },
    {
      id: makeLedgerId(),
      userId,
      delta: exchangedUSD,
      reason: `积分兑换到账[${tier.name}档]（${pts}积分→$${exchangedUSD.toFixed(2)}）`,
      type: 'balance',
      createdAt: now,
    },
  ];

  writeInviteState({ ...state, users: updatedUsers, ledger: [...newLedgerEntries, ...(state.ledger || [])] });

  return {
    ok: true,
    exchangedUSD,
    tier,
    remainingPoints: updatedUser.points,
    newBalance: updatedUser.balance,
  };
}

/* ── 提现规则读取 ── */
function getWithdrawalRules(state) {
  const defaults = {
    minAmount: 100,
    maxDailyAmount: 50000,
    autoApproveThreshold: 5000,
    processingDays: 3,
    feeRate: 0,
    pointsExpiry: 365,
    withdrawalMethods: ['balance', 'bank', 'usdt'],
    enabled: true,
  };
  if (!state?.withdrawalRules) return defaults;
  return { ...defaults, ...state.withdrawalRules };
}

/* ═══════════════════════════════════════════
   子 Tab 定义
   ═══════════════════════════════════════════ */
const SUB_TABS = [
  { id: 'overview', label: '推广概览', icon: Target },
  { id: 'exchange', label: '积分兑换', icon: ArrowRightLeft },
  { id: 'records', label: '邀请记录', icon: Users },
  { id: 'rules', label: '规则与提现', icon: Shield },
];

const ReferralView = ({ 
  user = { name: 'Alex User', email: 'alex@example.com', balance: 87.50, inviteCode: 'ALEX2024', id: null },
  darkMode = false 
}) => {
  const { t } = useTranslation();
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [tick, setTick] = useState(0);
  const [activeSubTab, setActiveSubTab] = useState('overview');

  useEffect(() => { ensureClientSeed(); }, []);
  useEffect(() => {
    const timer = setInterval(() => setTick(t => t + 1), 5000);
    return () => clearInterval(timer);
  }, []);

  const inviteState = useMemo(() => readInviteState(), [tick]);

  const currentUser = useMemo(() => {
    if (!inviteState?.users) return null;
    if (user.id) {
      const found = inviteState.users.find(u => u.id === user.id);
      if (found) return found;
    }
    if (user.email) {
      const found = inviteState.users.find(u => 
        String(u.email || '').toLowerCase() === String(user.email || '').toLowerCase()
      );
      if (found) return found;
    }
    return null;
  }, [inviteState, user.id, user.email]);

  const inviteCode = currentUser?.id || user.inviteCode || 'ALEX2024';

  const inviteLink = useMemo(() => {
    if (typeof window === 'undefined') return '';
    const url = new URL(window.location.origin);
    url.searchParams.set('invite', inviteCode);
    return url.toString();
  }, [inviteCode]);

  const discount = currentUser?.discount || null;
  const points = currentUser?.points || 0;
  const balance = currentUser?.balance || 0;

  const myRegistrations = useMemo(() => {
    if (!inviteState?.registrations) return [];
    const myId = currentUser?.id;
    if (!myId) return [];
    return inviteState.registrations.filter(r => r.inviterId === myId);
  }, [inviteState, currentUser]);

  const myLedger = useMemo(() => {
    if (!inviteState?.ledger) return [];
    const myId = currentUser?.id;
    if (!myId) return [];
    return inviteState.ledger.filter(l => l.userId === myId);
  }, [inviteState, currentUser]);

  const totalEarned = useMemo(() => {
    return myLedger.reduce((sum, l) => sum + (Number(l.delta) || 0), 0);
  }, [myLedger]);

  const stats = {
    totalInvited: myRegistrations.length,
    activeUsers: myRegistrations.filter(r => {
      const invitee = getUserFromState(inviteState, r.inviteeId);
      return invitee != null;
    }).length,
    totalEarned: totalEarned,
    pendingEarned: 0,
  };

  const history = useMemo(() => {
    if (myRegistrations.length > 0) {
      return myRegistrations.slice(0, 10).map((r, idx) => {
        const invitee = getUserFromState(inviteState, r.inviteeId);
        const commission = Array.isArray(r.commission) ? r.commission : [];
        const myCommission = commission.find(c => c.userId === currentUser?.id);
        return {
          id: r.id || idx,
          user: invitee ? `${invitee.name.substring(0, 3)}***` : r.inviteeId,
          date: new Date(r.createdAt).toLocaleDateString(),
          status: 'active',
          reward: myCommission?.points || 0,
          currency: 'Points',
        };
      });
    }
    return [
      { id: 1, user: 'user_8821***', date: '2025-10-28', status: 'active', reward: 50, currency: 'Points' },
      { id: 2, user: 'david_w***', date: '2025-10-27', status: 'pending', reward: 50, currency: 'Points' },
      { id: 3, user: 'studio_x***', date: '2025-10-25', status: 'active', reward: 25.00, currency: 'USD' },
    ];
  }, [myRegistrations, inviteState, currentUser]);

  const inviteConfig = useMemo(() => {
    if (!inviteState?.invites) return null;
    const myId = currentUser?.id;
    if (!myId) return null;
    return inviteState.invites.find(i => i.inviterId === myId) || null;
  }, [inviteState, currentUser]);

  const milestoneStatus = useMemo(() => {
    const myId = currentUser?.id;
    if (!myId || !inviteState) return null;
    const referralSpend = getInviterReferralTotalSpend(inviteState, myId);
    const { totalPoints, breakdown } = calculateMilestonePoints(inviteState, referralSpend);
    const discountInfo = getMilestoneDiscount(inviteState, referralSpend);
    const config = getMilestoneTiersFromState(inviteState);
    return { referralSpend, totalPoints, breakdown, discount: discountInfo, config };
  }, [inviteState, currentUser]);

  const rewardRules = useMemo(() => {
    const rules = [
      { title: t('referral.rule1_title'), desc: t('referral.rule1_desc') },
      { title: t('referral.rule2_title'), desc: t('referral.rule2_desc') },
    ];

    if (milestoneStatus?.config) {
      const { pointsRewardTiers, discountMilestones } = milestoneStatus.config;
      const ptParts = pointsRewardTiers.map(tr => {
        const high = tr.maxSpend !== null && tr.maxSpend !== '' ? `$${tr.maxSpend}` : '以上';
        return `$${tr.minSpend}~${high}：每$100消费送${tr.pointsPer100}积分`;
      });
      const dParts = discountMilestones.map(d => `累计$${Number(d.totalSpend).toLocaleString()}享${d.discountPercent / 10}折`);
      const desc = `您的被邀请客户累计消费达到指定额度后，您将获得积分奖励：${ptParts.join('；')}。` +
        (dParts.length > 0 ? `达标折扣：${dParts.join('；')}。` : '');
      rules.push({ title: t('referral.rule3_title'), desc });
    } else {
      rules.push({ title: t('referral.rule3_title'), desc: t('referral.rule3_desc') });
    }

    if (inviteConfig?.clientReward?.enabled) {
      const cr = inviteConfig.clientReward;
      const rewardText = cr.type === 'points' 
        ? `${cr.value} ${t('referral.points_unit', '积分')}` 
        : `¥${cr.value}`;
      rules.push({
        title: t('referral.client_reward_title', '推广奖励'),
        desc: t('referral.client_reward_desc', {
          defaultValue: `您每成功邀请1位新用户注册，将获得 {{reward}} 奖励。`,
          reward: rewardText,
        }),
      });
    }

    return rules;
  }, [t, inviteConfig, milestoneStatus]);

  // ── 积分兑换状态 ──
  const [exchangeAmount, setExchangeAmount] = useState('');
  const [exchangeResult, setExchangeResult] = useState(null);
  const [isExchanging, setIsExchanging] = useState(false);

  const userTier = useMemo(() => {
    const totalSpend = Number(currentUser?.totalSpend) || 0;
    return getUserExchangeTier(inviteState, totalSpend);
  }, [inviteState, currentUser]);

  const allTiers = useMemo(() => {
    return getPointsExchangeTiers(inviteState);
  }, [inviteState]);

  const walletInfo = useMemo(() => {
    const pts = currentUser?.points || 0;
    const bal = currentUser?.balance || 0;
    const ppu = userTier.pointsPerUSD || 100;
    const pointsValueUSD = pts / ppu;
    return {
      points: pts,
      balance: bal,
      totalSpend: Number(currentUser?.totalSpend) || 0,
      tier: userTier,
      pointsPerUSD: ppu,
      pointsValueUSD,
      pointsValueCNY: pointsValueUSD * 7.2,
      totalValueUSD: bal + pointsValueUSD,
    };
  }, [currentUser, userTier]);

  const walletSummary = useMemo(() => {
    const summary = {
      totalPointsEarned: 0,
      totalPointsSpent: 0,
      totalBalanceIn: 0,
      totalBalanceOut: 0,
      totalCommissionEarned: 0,
      totalCashBackEarned: 0,
    };
    myLedger.forEach(entry => {
      const delta = Number(entry.delta) || 0;
      if (entry.type === 'points' || entry.type === 'commission') {
        if (delta > 0) summary.totalPointsEarned += delta;
        else summary.totalPointsSpent += Math.abs(delta);
        if (entry.type === 'commission') summary.totalCommissionEarned += Math.max(0, delta);
      }
      if (entry.type === 'balance') {
        if (delta > 0) {
          summary.totalBalanceIn += delta;
          if (entry.reason?.includes('返现')) summary.totalCashBackEarned += delta;
        } else {
          summary.totalBalanceOut += Math.abs(delta);
        }
      }
    });
    return summary;
  }, [myLedger]);

  // 提现规则
  const withdrawalRules = useMemo(() => getWithdrawalRules(inviteState), [inviteState]);

  const handleExchange = useCallback(() => {
    if (!currentUser?.id) return;
    const pts = Math.floor(Number(exchangeAmount) || 0);
    if (pts <= 0) {
      setExchangeResult({ ok: false, error: '请输入要兑换的积分数。' });
      return;
    }
    setIsExchanging(true);
    setTimeout(() => {
      const result = exchangePointsToBalance(currentUser.id, pts);
      setExchangeResult(result);
      if (result.ok) {
        setExchangeAmount('');
        setTick(t => t + 1);
      }
      setIsExchanging(false);
      if (result.ok) setTimeout(() => setExchangeResult(null), 4000);
    }, 300);
  }, [currentUser, exchangeAmount]);

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    if (type === 'link') {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } else {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const quickExchangeOptions = useMemo(() => {
    const pts = walletInfo.points;
    const options = [100, 500, 1000, 5000].filter(v => v <= pts);
    if (pts > 0 && !options.includes(pts)) options.push(pts);
    return options.sort((a, b) => a - b).slice(0, 4);
  }, [walletInfo.points]);

  // ── 弹窗状态 ──
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [termsExpandedSection, setTermsExpandedSection] = useState(null);

  // ── 联系表单状态 ──
  const [contactForm, setContactForm] = useState({ name: '', email: '', type: 'general', message: '' });
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [copiedContact, setCopiedContact] = useState(null);

  const handleContactSubmit = () => {
    if (!contactForm.name.trim() || !contactForm.email.trim() || !contactForm.message.trim()) return;
    setContactSubmitted(true);
    setTimeout(() => {
      setContactSubmitted(false);
      setContactForm({ name: '', email: '', type: 'general', message: '' });
    }, 5000);
  };

  const handleCopyContact = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedContact(key);
    setTimeout(() => setCopiedContact(null), 2000);
  };

  const WITHDRAWAL_METHOD_MAP = {
    balance: { label: '兑换余额', icon: Wallet, color: 'text-green-600 bg-green-50' },
    bank: { label: '银行卡', icon: CreditCard, color: 'text-blue-600 bg-blue-50' },
    usdt: { label: 'USDT', icon: DollarSign, color: 'text-amber-600 bg-amber-50' },
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      {/* ══════ Header Banner ══════ */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 rounded-2xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2 text-indigo-200 font-medium text-sm">
            <Gift className="w-4 h-4" />
            <span>{t('referral.program_label', 'Referral Program')}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-3">{t('referral.title')}</h1>
          <p className="text-indigo-100 text-sm sm:text-base mb-6 opacity-90 max-w-xl">
            {t('referral.subtitle')}
          </p>
          
          {/* 邀请链接 & 邀请码 */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 bg-white/10 backdrop-blur-md rounded-xl p-1 border border-white/20 flex items-center min-w-0">
              <div className="pl-3 pr-2 text-sm text-indigo-100 truncate flex-1 select-all font-mono">
                {inviteLink}
              </div>
              <button 
                onClick={() => handleCopy(inviteLink, 'link')}
                className="ml-auto px-4 py-2 bg-white text-indigo-600 rounded-lg font-bold text-sm hover:bg-indigo-50 transition-colors flex items-center gap-2 shrink-0"
              >
                {copiedLink ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copiedLink ? t('referral.copied') : t('referral.copy_link')}
              </button>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-1 border border-white/20 flex items-center shrink-0">
              <div className="pl-3 pr-2 text-sm text-indigo-100">
                {t('referral.code')}: <span className="font-mono font-bold text-white">{inviteCode}</span>
              </div>
              <button 
                onClick={() => handleCopy(inviteCode, 'code')}
                className="ml-auto px-3 py-2 bg-indigo-500/50 hover:bg-indigo-500/70 text-white rounded-lg font-bold text-sm transition-colors"
              >
                {copiedCode ? t('referral.copied') : t('referral.copy')}
              </button>
            </div>
          </div>

          {/* 快速统计 */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
            {[
              { label: t('referral.total_invited'), value: stats.totalInvited, unit: t('referral.people_unit', '人'), icon: Users },
              { label: t('referral.my_points', '我的积分'), value: walletInfo.points.toLocaleString(), icon: Star },
              { label: t('referral.my_balance', '推广余额'), value: `$${walletInfo.balance.toFixed(2)}`, icon: Wallet },
              { label: t('referral.total_value', '总价值'), value: `$${walletInfo.totalValueUSD.toFixed(2)}`, icon: TrendingUp },
            ].map((s, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                <div className="flex items-center gap-2 mb-1">
                  <s.icon className="w-3.5 h-3.5 text-indigo-200" />
                  <span className="text-[11px] text-indigo-200">{s.label}</span>
                </div>
                <div className="text-lg font-bold">{s.value}{s.unit ? <span className="text-xs font-normal ml-0.5 opacity-70">{s.unit}</span> : null}</div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="absolute top-0 right-0 -mt-10 -mr-10 opacity-10">
          <Gift className="w-80 h-80" />
        </div>
      </div>

      {/* ── 客户折扣提示 ── */}
      {discount && (
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
            <Percent className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <div className="font-bold text-amber-900 text-sm">{t('referral.my_discount', '我的专属折扣')}</div>
            <div className="text-amber-700 text-xs mt-0.5">
              {discount.type === 'percentage' && `${t('referral.discount_percentage', { value: discount.value, defaultValue: '{{value}}折 优惠已绑定到您的账户' })}`}
              {discount.type === 'fixed_amount' && `${t('referral.discount_fixed', { value: discount.value, defaultValue: '减免 ¥{{value}} 已绑定到您的账户' })}`}
              {discount.type === 'full_reduction' && `${t('referral.discount_full', { threshold: discount.threshold, value: discount.value, defaultValue: '满¥{{threshold}}减¥{{value}} 已绑定到您的账户' })}`}
            </div>
          </div>
          <div className="px-3 py-1.5 bg-amber-100 rounded-lg text-amber-800 font-bold text-sm shrink-0">
            {discount.type === 'percentage' ? `${discount.value}折` : discount.type === 'fixed_amount' ? `-¥${discount.value}` : `满${discount.threshold}减${discount.value}`}
          </div>
        </div>
      )}

      {/* ══════ Sub Tabs ══════ */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="flex gap-1 px-4 pt-3 border-b border-gray-100 overflow-x-auto">
          {SUB_TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id)}
              className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium border-b-2 transition-all whitespace-nowrap ${
                activeSubTab === tab.id
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <tab.icon className="w-4 h-4" /> {tab.label}
            </button>
          ))}
        </div>

        <div className="p-5">
          {/* ═══════ Tab: 推广概览 ═══════ */}
          {activeSubTab === 'overview' && (
            <div className="space-y-6">
              {/* 资产概览卡片 */}
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-sm opacity-80 mb-1">{t('referral.current_balance', '当前可用余额')}</div>
                    <div className="text-3xl font-bold">${walletInfo.balance.toFixed(2)}</div>
                    <div className="text-xs opacity-60 mt-1">≈ ¥{(walletInfo.balance * 7.2).toFixed(2)} CNY</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm opacity-80 mb-1">{t('referral.available_points', '可用积分')}</div>
                    <div className="text-3xl font-bold">{walletInfo.points.toLocaleString()}</div>
                    <div className="text-xs opacity-60 mt-1">≈ ${walletInfo.pointsValueUSD.toFixed(2)}</div>
                  </div>
                </div>
                <div className="flex gap-4 pt-3 border-t border-white/20">
                  <div>
                    <div className="text-[10px] opacity-60 uppercase">{t('referral.total_value', '总价值')}</div>
                    <div className="text-sm font-bold mt-0.5">${walletInfo.totalValueUSD.toFixed(2)}</div>
                  </div>
                  <div>
                    <div className="text-[10px] opacity-60 uppercase">累计消费</div>
                    <div className="text-sm font-bold mt-0.5">${walletInfo.totalSpend.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-[10px] opacity-60 uppercase">兑换档次</div>
                    <div className="text-sm font-bold mt-0.5">{walletInfo.tier?.name || '普通'}档</div>
                  </div>
                  <div className="ml-auto">
                    <button
                      onClick={() => setActiveSubTab('exchange')}
                      className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-bold transition-colors flex items-center gap-1.5"
                    >
                      <ArrowRightLeft className="w-4 h-4" /> 去兑换
                    </button>
                  </div>
                </div>
              </div>

              {/* 收支明细 */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { label: t('referral.total_points_earned', '累计获得积分'), value: `+${walletSummary.totalPointsEarned.toLocaleString()}`, color: 'text-amber-600', dot: 'bg-amber-400' },
                  { label: t('referral.total_points_spent', '累计消耗积分'), value: `-${walletSummary.totalPointsSpent.toLocaleString()}`, color: 'text-red-500', dot: 'bg-red-400' },
                  { label: t('referral.total_commission', '累计提成收入'), value: `+${walletSummary.totalCommissionEarned.toLocaleString()} 分`, color: 'text-indigo-600', dot: 'bg-indigo-400' },
                  { label: t('referral.total_balance_in', '累计余额收入'), value: `+$${walletSummary.totalBalanceIn.toFixed(2)}`, color: 'text-green-600', dot: 'bg-green-400' },
                  { label: t('referral.total_balance_out', '累计余额支出'), value: `-$${walletSummary.totalBalanceOut.toFixed(2)}`, color: 'text-orange-500', dot: 'bg-orange-400' },
                  ...(walletSummary.totalCashBackEarned > 0 ? [{ label: t('referral.total_cashback', '累计返现'), value: `+$${walletSummary.totalCashBackEarned.toFixed(2)}`, color: 'text-purple-600', dot: 'bg-purple-400' }] : []),
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 p-3 bg-gray-50 rounded-xl">
                    <div className={`w-2 h-2 rounded-full ${item.dot} shrink-0`}></div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[11px] text-gray-500 truncate">{item.label}</div>
                      <div className={`text-sm font-bold ${item.color}`}>{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* 消费里程碑进度 */}
              {milestoneStatus && (
                <div className="space-y-4">
                  <h3 className="font-bold text-gray-900 flex items-center gap-2 text-sm">
                    <TrendingUp className="w-4 h-4 text-emerald-600" />
                    {t('referral.milestone_title', '消费达标奖励')}
                  </h3>
                  
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-emerald-50 rounded-xl p-3 text-center">
                      <div className="text-[10px] text-emerald-600 font-medium mb-1">{t('referral.referral_total_spend', '客户累计消费')}</div>
                      <div className="text-xl font-bold text-emerald-700">${milestoneStatus.referralSpend.toLocaleString()}</div>
                    </div>
                    <div className="bg-amber-50 rounded-xl p-3 text-center">
                      <div className="text-[10px] text-amber-600 font-medium mb-1">{t('referral.milestone_points_earned', '已获里程碑积分')}</div>
                      <div className="text-xl font-bold text-amber-700">{milestoneStatus.totalPoints.toLocaleString()}</div>
                    </div>
                    <div className="bg-indigo-50 rounded-xl p-3 text-center">
                      <div className="text-[10px] text-indigo-600 font-medium mb-1">{t('referral.account_discount', '账户折扣')}</div>
                      <div className="text-xl font-bold text-indigo-700">
                        {milestoneStatus.discount.discountPercent < 100
                          ? `${milestoneStatus.discount.discountPercent / 10}折`
                          : t('referral.no_discount', '无')
                        }
                      </div>
                    </div>
                  </div>

                  {/* 积分明细 */}
                  {milestoneStatus.breakdown.length > 0 && (
                    <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
                      <div className="px-4 py-2 bg-gray-100 border-b border-gray-200">
                        <span className="text-xs font-bold text-gray-600">{t('referral.milestone_points_detail', '积分奖励明细')}</span>
                      </div>
                      <div className="divide-y divide-gray-100">
                        {milestoneStatus.breakdown.map((b, idx) => (
                          <div key={idx} className="flex items-center justify-between px-4 py-2 text-xs">
                            <span className="text-gray-600">{b.range} 区间</span>
                            <span className="text-gray-500">${b.spend.toLocaleString()} ÷ 100 × {b.pointsPer100}</span>
                            <span className="font-bold text-emerald-700">+{b.points.toLocaleString()} 积分</span>
                          </div>
                        ))}
                        <div className="flex items-center justify-between px-4 py-2 text-xs bg-emerald-50 font-bold">
                          <span className="text-emerald-800">{t('referral.total', '合计')}</span>
                          <span></span>
                          <span className="text-emerald-700">{milestoneStatus.totalPoints.toLocaleString()} 积分</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 折扣里程碑进度 */}
                  {milestoneStatus.discount.allMilestones.length > 0 && (
                    <div className="space-y-2">
                      {milestoneStatus.discount.allMilestones.map((m, idx) => {
                        const reached = milestoneStatus.referralSpend >= m.totalSpend;
                        const progress = Math.min(100, (milestoneStatus.referralSpend / m.totalSpend) * 100);
                        return (
                          <div key={idx} className={`p-3 rounded-lg border ${reached ? 'bg-amber-50 border-amber-200' : 'bg-gray-50 border-gray-200'}`}>
                            <div className="flex items-center justify-between mb-1.5">
                              <div className="flex items-center gap-2">
                                {reached ? <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" /> : <Clock className="w-3.5 h-3.5 text-gray-400" />}
                                <span className={`text-xs font-bold ${reached ? 'text-amber-800' : 'text-gray-600'}`}>
                                  累计消费 ${Number(m.totalSpend).toLocaleString()}
                                </span>
                              </div>
                              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${reached ? 'bg-amber-200 text-amber-800' : 'bg-gray-200 text-gray-500'}`}>
                                {m.discountPercent / 10}折
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-1.5">
                              <div
                                className={`h-1.5 rounded-full transition-all ${reached ? 'bg-amber-500' : 'bg-emerald-400'}`}
                                style={{ width: `${progress}%` }}
                              ></div>
                            </div>
                            {!reached && (
                              <div className="text-[11px] text-gray-400 mt-1">
                                还差 ${(m.totalSpend - milestoneStatus.referralSpend).toLocaleString()} 即可解锁
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* 推广提成配置 */}
              {inviteConfig?.commissionConfig && (
                <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-4 rounded-xl border border-indigo-100">
                  <h3 className="font-bold text-indigo-900 mb-3 flex items-center gap-2 text-sm">
                    <GitBranch className="w-4 h-4 text-indigo-600" /> {t('referral.commission_config', '我的提成配置')}
                  </h3>
                  <div className="space-y-2">
                    {(() => {
                      const cfg = inviteConfig.commissionConfig;
                      const levels = cfg.levels || 3;
                      const items = [];
                      const levelLabels = [
                        t('referral.level1', '一级（直推）'),
                        t('referral.level2', '二级（间推）'),
                        t('referral.level3', '三级'),
                      ];
                      for (let i = 1; i <= Math.min(levels, 3); i++) {
                        const lCfg = cfg[`L${i}`];
                        if (lCfg && lCfg.value) {
                          items.push(
                            <div key={i} className="flex items-center gap-2 text-sm">
                              <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                              <span className="text-indigo-800 font-medium w-24">{levelLabels[i - 1]}</span>
                              <span className="font-bold text-indigo-900">
                                {lCfg.value}{lCfg.type === 'percentage' ? '%' : ` ${t('referral.yuan', '元')}`}
                              </span>
                            </div>
                          );
                        }
                      }
                      return items.length > 0 ? items : (
                        <div className="text-xs text-indigo-400">{t('referral.no_commission_config', '暂无提成配置')}</div>
                      );
                    })()}
                  </div>
                  <div className="mt-3 text-[11px] text-indigo-500">
                    佣金以积分形式发放，可在「积分兑换」中兑换为余额
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ═══════ Tab: 积分兑换 ═══════ */}
          {activeSubTab === 'exchange' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 左：积分兑换 */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-1">
                    <ArrowRightLeft className="w-5 h-5 text-amber-600" />
                    <h3 className="font-bold text-gray-900">{t('referral.exchange_title', '积分兑换余额')}</h3>
                  </div>
                  <p className="text-xs text-gray-500">
                    当前档次：<span className="font-bold text-amber-700">{walletInfo.tier?.name || '普通'}</span>
                    {' · '}汇率：{walletInfo.pointsPerUSD}积分 = $1.00
                    {' · '}最低兑换 {MIN_EXCHANGE_POINTS} 积分
                  </p>

                  {/* 当前档次 */}
                  <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-100">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-xs ${
                      (walletInfo.tier?.level || 1) >= 4 ? 'bg-purple-500' :
                      (walletInfo.tier?.level || 1) >= 3 ? 'bg-amber-500' :
                      (walletInfo.tier?.level || 1) >= 2 ? 'bg-blue-500' : 'bg-slate-400'
                    }`}>
                      L{walletInfo.tier?.level || 1}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-bold text-amber-900">
                        {walletInfo.tier?.name || '普通'}档 · 100积分 = ${walletInfo.tier?.exchangeRate?.toFixed(2) || '1.00'}
                      </div>
                      <div className="text-[11px] text-amber-600 mt-0.5">
                        累计消费 ${walletInfo.totalSpend.toLocaleString()} USD
                        {(() => {
                          const nextTier = allTiers.find(t => t.minSpend > walletInfo.totalSpend);
                          if (nextTier) {
                            const remaining = nextTier.minSpend - walletInfo.totalSpend;
                            return ` · 再消费 $${remaining.toLocaleString()} 升级到 ${nextTier.name}档`;
                          }
                          return ' · 已达最高档次';
                        })()}
                      </div>
                    </div>
                  </div>

                  {/* 积分概览 */}
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-amber-50 rounded-xl p-3 text-center">
                      <div className="text-[10px] text-amber-600 font-medium mb-1">{t('referral.available_points', '可用积分')}</div>
                      <div className="text-xl font-bold text-amber-700">{walletInfo.points.toLocaleString()}</div>
                      <div className="text-[10px] text-amber-500 mt-0.5">≈ ${walletInfo.pointsValueUSD.toFixed(2)}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-300 shrink-0" />
                    <div className="flex-1 bg-green-50 rounded-xl p-3 text-center">
                      <div className="text-[10px] text-green-600 font-medium mb-1">{t('referral.current_balance', '当前余额')}</div>
                      <div className="text-xl font-bold text-green-700">${walletInfo.balance.toFixed(2)}</div>
                      <div className="text-[10px] text-green-500 mt-0.5">≈ ¥{(walletInfo.balance * 7.2).toFixed(2)}</div>
                    </div>
                  </div>

                  {/* 兑换输入 */}
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-2">{t('referral.exchange_amount', '兑换积分数')}</label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <input
                          type="number"
                          min="0"
                          step="100"
                          value={exchangeAmount}
                          onChange={(e) => { setExchangeAmount(e.target.value); setExchangeResult(null); }}
                          placeholder={`${t('referral.min_exchange', '最少')} ${MIN_EXCHANGE_POINTS}`}
                          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-amber-400 pr-20"
                        />
                        {exchangeAmount > 0 && (
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                            ≈ ${(Number(exchangeAmount) / walletInfo.pointsPerUSD).toFixed(2)}
                          </span>
                        )}
                      </div>
                      <button
                        onClick={handleExchange}
                        disabled={isExchanging || !currentUser?.id || walletInfo.points < MIN_EXCHANGE_POINTS}
                        className={`px-5 py-2.5 rounded-lg font-bold text-sm transition-all flex items-center gap-1.5 shrink-0 ${
                          isExchanging || !currentUser?.id || walletInfo.points < MIN_EXCHANGE_POINTS
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 shadow-md shadow-amber-100 active:scale-[0.97]'
                        }`}
                      >
                        {isExchanging ? (
                          <><Clock className="w-4 h-4 animate-spin" /> {t('referral.exchanging', '兑换中...')}</>
                        ) : (
                          <><Zap className="w-4 h-4" /> {t('referral.exchange_btn', '立即兑换')}</>
                        )}
                      </button>
                    </div>

                    {/* 快捷选择 */}
                    {quickExchangeOptions.length > 0 && (
                      <div className="flex gap-2 mt-2">
                        {quickExchangeOptions.map(opt => (
                          <button
                            key={opt}
                            onClick={() => { setExchangeAmount(String(opt)); setExchangeResult(null); }}
                            className={`px-3 py-1 rounded-md text-xs font-medium transition-all border ${
                              Number(exchangeAmount) === opt
                                ? 'border-amber-400 bg-amber-50 text-amber-700'
                                : 'border-gray-200 text-gray-500 hover:border-amber-300 hover:text-amber-600'
                            }`}
                          >
                            {opt.toLocaleString()} {t('referral.points_unit', '积分')}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* 兑换结果 */}
                  {exchangeResult && (
                    <div className={`flex items-start gap-2 p-3 rounded-lg text-sm ${
                      exchangeResult.ok
                        ? 'bg-green-50 text-green-800 border border-green-200'
                        : 'bg-red-50 text-red-700 border border-red-200'
                    }`}>
                      {exchangeResult.ok ? <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" /> : <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />}
                      <div>
                        {exchangeResult.ok ? (
                          <>
                            <div className="font-medium">{t('referral.exchange_success', '兑换成功！')}</div>
                            <div className="text-xs mt-0.5 text-green-600">
                              {t('referral.exchange_success_detail', {
                                defaultValue: '已兑换 ${{usd}}，剩余积分 {{points}}，当前余额 ${{balance}}',
                                usd: exchangeResult.exchangedUSD?.toFixed(2),
                                points: exchangeResult.remainingPoints,
                                balance: exchangeResult.newBalance?.toFixed(2),
                              })}
                              {exchangeResult.tier && (
                                <span className="ml-1">（{exchangeResult.tier.name}档汇率）</span>
                              )}
                            </div>
                          </>
                        ) : (
                          <div>{exchangeResult.error}</div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* 右：兑换档次一览 */}
                <div className="space-y-4">
                  <h3 className="font-bold text-gray-900 text-sm flex items-center gap-2">
                    <Layers className="w-4 h-4 text-indigo-600" /> {t('referral.tier_table_title', '兑换档次一览')}
                  </h3>

                  <div className="space-y-2">
                    {allTiers.map((tier, idx) => {
                      const isCurrent = walletInfo.tier?.level === tier.level;
                      const rate100 = 100 / tier.pointsPerUSD;
                      return (
                        <div key={idx} className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${isCurrent ? 'bg-amber-50 border-amber-200 shadow-sm' : 'bg-gray-50 border-gray-100'}`}>
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold ${
                            idx >= 3 ? 'bg-purple-500' : idx >= 2 ? 'bg-amber-500' : idx >= 1 ? 'bg-blue-500' : 'bg-slate-400'
                          }`}>L{tier.level}</div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className={`text-sm font-bold ${isCurrent ? 'text-amber-800' : 'text-gray-700'}`}>{tier.name}</span>
                              {isCurrent && <span className="text-[10px] px-1.5 py-0.5 bg-amber-200 text-amber-800 rounded-full font-bold">当前</span>}
                            </div>
                            <div className="text-[11px] text-gray-500 mt-0.5">
                              消费 ≥${Number(tier.minSpend).toLocaleString()} · 100积分=${rate100.toFixed(2)}
                            </div>
                          </div>
                          <div className={`text-sm font-bold ${isCurrent ? 'text-amber-700' : 'text-gray-600'}`}>
                            {tier.pointsPerUSD}分/$1
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* 兑换说明 */}
                  <div className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg">
                    <Info className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                    <div className="text-xs text-gray-500 leading-relaxed space-y-1">
                      <p>· 当前汇率：{walletInfo.pointsPerUSD} 积分 = $1.00 USD（{walletInfo.tier?.name || '普通'}档）</p>
                      <p>· 最低兑换：{MIN_EXCHANGE_POINTS} 积分起兑</p>
                      <p>· 积分必须先兑换为余额后才能用于消费</p>
                      <p>· 累计消费越多，积分兑换汇率越优惠</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ═══════ Tab: 邀请记录 ═══════ */}
          {activeSubTab === 'records' && (
            <div className="space-y-6">
              {/* 邀请历史 */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-bold text-gray-900 text-sm">{t('referral.history_title')}</h3>
                  <button className="text-xs text-indigo-600 hover:text-indigo-700 font-medium">{t('referral.view_all')}</button>
                </div>
                <div className="overflow-x-auto rounded-xl border border-gray-200">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-gray-50 text-xs text-gray-500 uppercase">
                        <th className="px-4 py-3 font-semibold">{t('referral.user')}</th>
                        <th className="px-4 py-3 font-semibold">{t('referral.reg_time')}</th>
                        <th className="px-4 py-3 font-semibold">{t('referral.status')}</th>
                        <th className="px-4 py-3 font-semibold text-right">{t('referral.reward')}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {history.length === 0 ? (
                        <tr>
                          <td colSpan="4" className="px-4 py-10 text-center text-gray-400 text-sm">
                            {t('referral.no_records', '暂无邀请记录，分享您的邀请链接开始推广吧！')}
                          </td>
                        </tr>
                      ) : (
                        history.map((item) => (
                          <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                            <td className="px-4 py-3">
                              <div className="font-medium text-gray-900 text-sm">{item.user}</div>
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-500">{item.date}</td>
                            <td className="px-4 py-3">
                              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                                item.status === 'active' ? 'bg-emerald-100 text-emerald-800' :
                                item.status === 'pending' ? 'bg-amber-100 text-amber-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {item.status === 'active' ? t('referral.active') : item.status === 'pending' ? t('referral.pending') : t('referral.inactive')}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-right">
                              <span className={`font-bold text-sm ${item.reward > 0 ? 'text-emerald-600' : 'text-gray-400'}`}>
                                {item.currency === 'USD' ? `+$${item.reward.toFixed(2)}` : item.currency === 'Points' ? `+${item.reward} ${t('referral.points_unit', '积分')}` : `${item.reward} ${t('referral.coupon_unit', '张折扣券')}`}
                              </span>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 积分/佣金明细 */}
              {myLedger.length > 0 && (
                <div>
                  <h3 className="font-bold text-gray-900 text-sm mb-3">{t('referral.ledger_title', '积分/佣金明细')}</h3>
                  <div className="overflow-x-auto rounded-xl border border-gray-200">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-gray-50 text-xs text-gray-500 uppercase">
                          <th className="px-4 py-3 font-semibold">{t('referral.ledger_time', '时间')}</th>
                          <th className="px-4 py-3 font-semibold">{t('referral.ledger_type', '类型')}</th>
                          <th className="px-4 py-3 font-semibold">{t('referral.ledger_reason', '说明')}</th>
                          <th className="px-4 py-3 font-semibold text-right">{t('referral.ledger_amount', '变动')}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {myLedger.slice(0, 10).map((entry) => (
                          <tr key={entry.id} className="hover:bg-gray-50/50 transition-colors">
                            <td className="px-4 py-3 text-sm text-gray-500">{new Date(entry.createdAt).toLocaleString()}</td>
                            <td className="px-4 py-3">
                              <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                                entry.type === 'commission' ? 'bg-indigo-50 text-indigo-700' :
                                entry.type === 'balance' ? 'bg-green-50 text-green-700' :
                                'bg-amber-50 text-amber-700'
                              }`}>
                                {entry.type === 'commission' ? t('referral.type_commission', '提成') : entry.type === 'balance' ? t('referral.type_balance', '返现') : t('referral.type_points', '积分')}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-700">{entry.reason}</td>
                            <td className="px-4 py-3 text-right">
                              <span className={`font-bold ${entry.delta > 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                                {entry.delta > 0 ? '+' : ''}{entry.delta}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ═══════ Tab: 规则与提现 ═══════ */}
          {activeSubTab === 'rules' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 左：奖励规则 */}
                <div className="space-y-4">
                  <h3 className="font-bold text-gray-900 flex items-center gap-2 text-sm">
                    <Award className="w-4 h-4 text-amber-500" /> {t('referral.rules_title')}
                  </h3>
                  <div className="space-y-3">
                    {rewardRules.map((rule, idx) => (
                      <div key={idx} className="flex gap-3 p-3 bg-gray-50 rounded-xl">
                        <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-600 shrink-0">
                          {idx + 1}
                        </div>
                        <div>
                          <div className="text-sm font-bold text-gray-900">{rule.title}</div>
                          <div className="text-xs text-gray-500 leading-relaxed mt-1">{rule.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => setShowTermsModal(true)}
                    className="w-full py-2.5 border border-gray-200 rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-colors flex items-center justify-center gap-2"
                  >
                    <FileText className="w-4 h-4" /> {t('referral.full_terms')}
                  </button>
                </div>

                {/* 右：提现规则 */}
                <div className="space-y-4">
                  <h3 className="font-bold text-gray-900 flex items-center gap-2 text-sm">
                    <Wallet className="w-4 h-4 text-emerald-500" /> 积分提现规则
                  </h3>

                  {withdrawalRules.enabled ? (
                    <div className="space-y-3">
                      {/* 提现方式 */}
                      <div className="p-3 bg-gray-50 rounded-xl">
                        <div className="text-xs text-gray-500 mb-2 font-medium">支持的提现方式</div>
                        <div className="flex gap-2 flex-wrap">
                          {withdrawalRules.withdrawalMethods.map(method => {
                            const m = WITHDRAWAL_METHOD_MAP[method];
                            if (!m) return null;
                            return (
                              <div key={method} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-gray-200 ${m.color}`}>
                                <m.icon className="w-3.5 h-3.5" /> {m.label}
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* 规则明细 */}
                      <div className="bg-gray-50 rounded-xl overflow-hidden border border-gray-100">
                        {[
                          { label: '最低提现', value: `${withdrawalRules.minAmount} 积分` },
                          { label: '每日上限', value: `${withdrawalRules.maxDailyAmount.toLocaleString()} 积分` },
                          { label: '自动审批', value: `≤${withdrawalRules.autoApproveThreshold.toLocaleString()} 积分自动通过` },
                          { label: '处理时间', value: `${withdrawalRules.processingDays} 个工作日` },
                          { label: '手续费', value: withdrawalRules.feeRate > 0 ? `${withdrawalRules.feeRate}%` : '免手续费' },
                          { label: '积分有效期', value: `${withdrawalRules.pointsExpiry} 天` },
                        ].map((item, idx) => (
                          <div key={idx} className={`flex items-center justify-between px-4 py-2.5 text-xs ${idx > 0 ? 'border-t border-gray-100' : ''}`}>
                            <span className="text-gray-500">{item.label}</span>
                            <span className="font-bold text-gray-700">{item.value}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg border border-blue-100">
                        <Info className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                        <div className="text-xs text-blue-700 leading-relaxed">
                          <p>· 积分必须先兑换为余额后才能用于消费</p>
                          <p>· 超过自动审批阈值的提现需人工审核</p>
                          <p>· 过期积分将自动清零，请及时兑换</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-6 bg-gray-50 rounded-xl text-center">
                      <AlertCircle className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">提现功能暂未开放</p>
                    </div>
                  )}

                  {/* 联系客服 */}
                  <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
                    <h3 className="font-bold text-indigo-900 mb-2 text-sm">{t('referral.need_help')}</h3>
                    <p className="text-xs text-indigo-700 mb-3">{t('referral.contact_text')}</p>
                    <button
                      onClick={() => setShowContactModal(true)}
                      className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-bold transition-colors flex items-center justify-center gap-2 shadow-md shadow-indigo-200 active:scale-[0.97]"
                    >
                      <Headphones className="w-4 h-4" /> {t('referral.contact_btn')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          查看完整条款 Modal
          ═══════════════════════════════════════════ */}
      {showTermsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in" onClick={() => setShowTermsModal(false)}>
          <div
            className="bg-white rounded-2xl w-full max-w-2xl max-h-[85vh] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-indigo-50 to-purple-50 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center">
                  <Scale className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <h2 className="font-bold text-gray-900 text-lg">{t('referral.terms_title', '推广计划完整条款')}</h2>
                  <p className="text-xs text-gray-500">{t('referral.terms_updated', '最后更新：2026年3月1日')}</p>
                </div>
              </div>
              <button onClick={() => setShowTermsModal(false)} className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
              <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-100">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-indigo-600 mt-0.5 shrink-0" />
                  <div className="text-sm text-indigo-800 leading-relaxed">
                    {t('referral.terms_overview', '本条款适用于所有参与推广计划的用户。参与本计划即表示您同意以下所有条款和条件。我们保留在不提前通知的情况下修改本条款的权利。')}
                  </div>
                </div>
              </div>

              {[
                {
                  id: 'eligibility',
                  icon: <Users className="w-4 h-4" />,
                  title: t('referral.terms_s1_title', '一、参与资格'),
                  content: [
                    t('referral.terms_s1_1', '1. 所有已注册并完成实名认证的用户均可参与推广计划。'),
                    t('referral.terms_s1_2', '2. 每个用户仅可拥有一个推广账户，禁止使用多个账户进行自推自买。'),
                    t('referral.terms_s1_3', '3. 被邀请用户必须是首次注册的新用户，已注册用户通过邀请链接再次注册无效。'),
                    t('referral.terms_s1_4', '4. 平台有权审核推广资格，对于违规账户可随时取消推广权限。'),
                  ],
                },
                {
                  id: 'rewards',
                  icon: <Gift className="w-4 h-4" />,
                  title: t('referral.terms_s2_title', '二、奖励规则'),
                  content: [
                    t('referral.terms_s2_1', '1. 注册奖励：新用户通过您的邀请链接成功注册后，系统将自动发放注册奖励积分。'),
                    t('referral.terms_s2_2', '2. 首购佣金：邀请用户首次充值或购买，您将获得订单返现最高获得1万积分。'),
                    t('referral.terms_s2_3', '3. 消费达标奖励：您的被邀请客户累计消费总额达到指定区间后，系统将按分段规则自动奖励您积分（如$100~$1000每$100送1000积分，$1000以上每$100送200积分）。累计消费达到里程碑门槛时，您的账户还可享受全局折扣（如$2000享8折，$5000享7折）。'),
                    t('referral.terms_s2_4', '4. 客户推广奖励：如果您的邀请码配置了客户推广奖励，您邀请的新用户也可以通过推广获得积分或返现。'),
                    t('referral.terms_s2_5', '5. 佣金比例可能因邀请码配置不同而有所差异，以实际配置为准。'),
                  ],
                },
                {
                  id: 'points',
                  icon: <Star className="w-4 h-4" />,
                  title: t('referral.terms_s3_title', '三、积分与余额'),
                  content: [
                    t('referral.terms_s3_1', '1. 积分兑换：积分必须先兑换为余额后才能用于消费，不可直接抵扣订单。'),
                    t('referral.terms_s3_2', '2. 分档汇率：兑换汇率根据您的累计引流消费金额分档，消费越多汇率越优惠（如：普通档 100积分=$1，白银档 100积分=$2）。'),
                    t('referral.terms_s3_3', '3. 最低兑换：每次兑换最少 100 积分，兑换后不可逆转。'),
                    t('referral.terms_s3_4', '4. 余额用途：余额可用于购买平台所有代理产品，支付时可选择余额抵扣。'),
                    t('referral.terms_s3_5', '5. 抵扣优先级：优惠券 → 余额抵扣 → 剩余金额在线支付。'),
                    t('referral.terms_s3_6', '6. 积分有效期：积分自获得之日起 12 个月内有效，过期积分将自动清零。'),
                  ],
                },
                {
                  id: 'withdrawal',
                  icon: <Wallet className="w-4 h-4" />,
                  title: '四、提现规则',
                  content: [
                    '1. 积分可通过兑换为余额后消费，也可按提现规则申请提现到银行卡或USDT钱包。',
                    `2. 最低提现：${withdrawalRules.minAmount} 积分起提。`,
                    `3. 每日提现上限：${withdrawalRules.maxDailyAmount.toLocaleString()} 积分。`,
                    `4. ≤${withdrawalRules.autoApproveThreshold.toLocaleString()} 积分的提现申请自动审批，超出部分需人工审核。`,
                    `5. 提现处理时间：${withdrawalRules.processingDays} 个工作日内完成。`,
                    withdrawalRules.feeRate > 0 ? `6. 提现手续费：${withdrawalRules.feeRate}%。` : '6. 提现免手续费。',
                    `7. 积分有效期 ${withdrawalRules.pointsExpiry} 天，过期积分将自动清零。`,
                  ],
                },
                {
                  id: 'commission',
                  icon: <TrendingUp className="w-4 h-4" />,
                  title: t('referral.terms_s4_title', '五、提成与结算'),
                  content: [
                    t('referral.terms_s4_1', '1. 提成层级：系统支持最多 5 级提成（L1 直推、L2 间推、L3~L5 多级裂变），具体比例以邀请码配置为准。'),
                    t('referral.terms_s4_2', '2. 结算周期：佣金积分在被邀请用户完成付款后实时到账，无需等待结算周期。'),
                    t('referral.terms_s4_3', '3. 退款处理：如被邀请用户申请退款，对应的佣金积分将被扣回。'),
                    t('referral.terms_s4_4', '4. 提成上限：单笔订单佣金不超过 $500 USD 等值积分，超出部分不予发放。'),
                  ],
                },
                {
                  id: 'discount',
                  icon: <Percent className="w-4 h-4" />,
                  title: t('referral.terms_s5_title', '六、折扣与优惠'),
                  content: [
                    t('referral.terms_s5_1', '1. 邀请码折扣：部分邀请码可为新用户提供专属折扣，折扣在注册时自动绑定到用户账户。'),
                    t('referral.terms_s5_2', '2. 折扣类型：支持百分比折扣、固定金额减免、满减优惠三种类型。'),
                    t('referral.terms_s5_3', '3. 折扣叠加：邀请码折扣与优惠券可叠加使用，但单笔订单总折扣不超过订单金额的 50%。'),
                    t('referral.terms_s5_4', '4. 折扣有效期：邀请码绑定的折扣在首次购买时生效，部分折扣可持续使用。'),
                  ],
                },
                {
                  id: 'prohibited',
                  icon: <Ban className="w-4 h-4" />,
                  title: t('referral.terms_s6_title', '七、禁止行为'),
                  content: [
                    t('referral.terms_s6_1', '1. 禁止通过虚假注册、机器人注册等方式刷取推广奖励。'),
                    t('referral.terms_s6_2', '2. 禁止使用多个账户进行自推自买或相互推广套取佣金。'),
                    t('referral.terms_s6_3', '3. 禁止在推广过程中发布虚假信息、误导性内容或垃圾信息。'),
                    t('referral.terms_s6_4', '4. 禁止通过任何技术手段篡改推广数据或绕过系统限制。'),
                    t('referral.terms_s6_5', '5. 违反上述规定，平台有权冻结账户、扣除全部佣金，并保留追究法律责任的权利。'),
                  ],
                },
                {
                  id: 'changes',
                  icon: <RefreshCw className="w-4 h-4" />,
                  title: t('referral.terms_s7_title', '八、条款变更'),
                  content: [
                    t('referral.terms_s7_1', '1. 平台保留随时修改本条款的权利，修改后的条款将在平台公布后立即生效。'),
                    t('referral.terms_s7_2', '2. 重大条款变更将通过站内消息、邮件等方式提前通知用户。'),
                    t('referral.terms_s7_3', '3. 继续参与推广计划即视为接受修改后的条款。'),
                    t('referral.terms_s7_4', '4. 如对条款有异议，用户可随时退出推广计划，已获得的有效佣金不受影响。'),
                  ],
                },
                {
                  id: 'liability',
                  icon: <Shield className="w-4 h-4" />,
                  title: t('referral.terms_s8_title', '九、免责声明'),
                  content: [
                    t('referral.terms_s8_1', '1. 平台不对推广效果做任何保证，推广收益取决于用户的推广方式和被邀请用户的消费行为。'),
                    t('referral.terms_s8_2', '2. 因不可抗力导致的推广数据丢失或佣金延迟发放，平台不承担赔偿责任。'),
                    t('referral.terms_s8_3', '3. 平台有权对异常推广数据进行审查，审查期间相关佣金可能暂时冻结。'),
                    t('referral.terms_s8_4', '4. 本条款的最终解释权归平台所有。'),
                  ],
                },
              ].map((section) => (
                <div key={section.id} className="border border-gray-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setTermsExpandedSection(termsExpandedSection === section.id ? null : section.id)}
                    className="w-full flex items-center justify-between px-5 py-3.5 bg-white hover:bg-gray-50 transition-colors text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
                        {section.icon}
                      </div>
                      <span className="font-bold text-gray-900 text-sm">{section.title}</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${termsExpandedSection === section.id ? 'rotate-180' : ''}`} />
                  </button>
                  {termsExpandedSection === section.id && (
                    <div className="px-5 pb-4 pt-1 bg-gray-50/50 border-t border-gray-100">
                      <div className="space-y-2">
                        {section.content.map((line, idx) => (
                          <p key={idx} className="text-sm text-gray-600 leading-relaxed pl-10">{line}</p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
                  <div className="text-sm text-amber-800 leading-relaxed">
                    <p className="font-bold mb-1">{t('referral.terms_important', '重要提示')}</p>
                    <p>{t('referral.terms_important_desc', '参与推广计划即表示您已阅读、理解并同意本条款的全部内容。如有任何疑问，请通过"联系商务专员"功能与我们取得联系。')}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between shrink-0">
              <div className="text-xs text-gray-400">
                {t('referral.terms_version', '版本 v2.2 · 生效日期 2026-03-01')}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => { setShowTermsModal(false); setShowContactModal(true); }}
                  className="px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-lg transition-colors"
                >
                  {t('referral.terms_contact', '有疑问？联系我们')}
                </button>
                <button
                  onClick={() => setShowTermsModal(false)}
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-bold transition-colors shadow-md shadow-indigo-200"
                >
                  {t('referral.terms_agree', '我已了解')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════
          联系商务专员 Modal
          ═══════════════════════════════════════════ */}
      {showContactModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in" onClick={() => setShowContactModal(false)}>
          <div
            className="bg-white rounded-2xl w-full max-w-lg max-h-[85vh] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-indigo-50 to-blue-50 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center">
                  <Headphones className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <h2 className="font-bold text-gray-900 text-lg">{t('referral.contact_title', '联系商务专员')}</h2>
                  <p className="text-xs text-gray-500">{t('referral.contact_subtitle', '我们的团队将在 24 小时内回复您')}</p>
                </div>
              </div>
              <button onClick={() => setShowContactModal(false)} className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
              {contactSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{t('referral.contact_success', '消息已发送！')}</h3>
                  <p className="text-sm text-gray-500 max-w-sm mx-auto">
                    {t('referral.contact_success_desc', '感谢您的咨询，我们的商务专员将在 24 小时内通过邮件或站内消息与您联系。')}
                  </p>
                  <div className="mt-6 p-4 bg-gray-50 rounded-xl text-left max-w-xs mx-auto">
                    <div className="text-xs text-gray-400 mb-2">{t('referral.contact_ref', '咨询编号')}</div>
                    <div className="font-mono text-sm text-gray-700 font-bold">
                      TK-{Date.now().toString(36).toUpperCase().slice(-6)}
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div>
                    <h3 className="text-sm font-bold text-gray-700 mb-3">{t('referral.contact_channels', '快捷联系方式')}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        { icon: Mail, color: 'bg-blue-100 text-blue-600', label: t('referral.contact_email_label', '商务邮箱'), value: 'business@proxyservice.com', key: 'email', hoverColor: 'hover:text-blue-600 hover:bg-blue-50' },
                        { icon: Phone, color: 'bg-green-100 text-green-600', label: t('referral.contact_phone_label', '商务热线'), value: '400-888-9999', key: 'phone', hoverColor: 'hover:text-green-600 hover:bg-green-50' },
                        { icon: MessageCircle, color: 'bg-emerald-100 text-emerald-600', label: t('referral.contact_wechat_label', '企业微信'), value: 'ProxyBiz_Support', key: 'wechat', hoverColor: 'hover:text-emerald-600 hover:bg-emerald-50' },
                        { icon: Send, color: 'bg-sky-100 text-sky-600', label: 'Telegram', value: '@ProxyBiz_Official', key: 'telegram', hoverColor: 'hover:text-sky-600 hover:bg-sky-50' },
                      ].map(ch => (
                        <div key={ch.key} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors group">
                          <div className={`w-9 h-9 rounded-lg ${ch.color} flex items-center justify-center shrink-0`}>
                            <ch.icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs text-gray-400">{ch.label}</div>
                            <div className="text-sm font-medium text-gray-800 truncate">{ch.value}</div>
                          </div>
                          <button
                            onClick={() => handleCopyContact(ch.value, ch.key)}
                            className={`p-1.5 rounded-lg text-gray-400 ${ch.hoverColor} transition-colors opacity-0 group-hover:opacity-100`}
                          >
                            {copiedContact === ch.key ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 px-4 py-2.5 bg-amber-50 rounded-lg border border-amber-100">
                    <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                    <span className="text-xs text-amber-700">
                      {t('referral.contact_hours', '工作时间：周一至周五 9:00-18:00（UTC+8），紧急事务请通过 Telegram 联系。')}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-px bg-gray-200"></div>
                    <span className="text-xs text-gray-400 font-medium">{t('referral.contact_or', '或在线留言')}</span>
                    <div className="flex-1 h-px bg-gray-200"></div>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1.5">{t('referral.contact_form_name', '您的姓名')} *</label>
                        <input
                          type="text"
                          value={contactForm.name}
                          onChange={e => setContactForm(f => ({ ...f, name: e.target.value }))}
                          placeholder={t('referral.contact_form_name_ph', '请输入姓名')}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1.5">{t('referral.contact_form_email', '邮箱地址')} *</label>
                        <input
                          type="email"
                          value={contactForm.email}
                          onChange={e => setContactForm(f => ({ ...f, email: e.target.value }))}
                          placeholder={t('referral.contact_form_email_ph', 'your@email.com')}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1.5">{t('referral.contact_form_type', '咨询类型')}</label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {[
                          { id: 'general', label: t('referral.contact_type_general', '一般咨询') },
                          { id: 'commission', label: t('referral.contact_type_commission', '佣金问题') },
                          { id: 'partnership', label: t('referral.contact_type_partner', '深度合作') },
                          { id: 'technical', label: t('referral.contact_type_tech', '技术支持') },
                        ].map(opt => (
                          <button
                            key={opt.id}
                            onClick={() => setContactForm(f => ({ ...f, type: opt.id }))}
                            className={`px-3 py-2 rounded-lg text-xs font-medium border transition-all ${
                              contactForm.type === opt.id
                                ? 'border-indigo-400 bg-indigo-50 text-indigo-700'
                                : 'border-gray-200 text-gray-500 hover:border-gray-300'
                            }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1.5">{t('referral.contact_form_message', '留言内容')} *</label>
                      <textarea
                        value={contactForm.message}
                        onChange={e => setContactForm(f => ({ ...f, message: e.target.value }))}
                        placeholder={t('referral.contact_form_message_ph', '请详细描述您的问题或合作需求，我们将尽快为您处理...')}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 resize-none"
                      />
                    </div>

                    {contactForm.type === 'partnership' && (
                      <div className="flex items-start gap-2 p-3 bg-purple-50 rounded-lg border border-purple-100">
                        <Sparkles className="w-4 h-4 text-purple-600 mt-0.5 shrink-0" />
                        <div className="text-xs text-purple-700 leading-relaxed">
                          <p className="font-bold mb-1">{t('referral.contact_partner_tip_title', '大客户 / 流量合作')}</p>
                          <p>{t('referral.contact_partner_tip', '如果您拥有大量流量资源（如 KOL、社群、网站流量等），我们可以为您提供专属佣金比例、定制邀请码、独立结算通道等深度合作方案。请在留言中简要介绍您的资源情况。')}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>

            {!contactSubmitted && (
              <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between shrink-0">
                <div className="text-xs text-gray-400">
                  {t('referral.contact_privacy', '您的信息将被严格保密')}
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowContactModal(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    {t('common.cancel', '取消')}
                  </button>
                  <button
                    onClick={handleContactSubmit}
                    disabled={!contactForm.name.trim() || !contactForm.email.trim() || !contactForm.message.trim()}
                    className={`px-5 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${
                      !contactForm.name.trim() || !contactForm.email.trim() || !contactForm.message.trim()
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-200 active:scale-[0.97]'
                    }`}
                  >
                    <Send className="w-4 h-4" /> {t('referral.contact_submit', '发送消息')}
                  </button>
                </div>
              </div>
            )}
            {contactSubmitted && (
              <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50 flex justify-end shrink-0">
                <button
                  onClick={() => setShowContactModal(false)}
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-bold transition-colors shadow-md shadow-indigo-200"
                >
                  {t('referral.contact_close', '关闭')}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReferralView;
