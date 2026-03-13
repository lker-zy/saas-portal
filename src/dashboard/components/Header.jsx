import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Bell, 
  Globe, 
  Settings, 
  LogOut, 
  User, 
  HelpCircle, 
  RefreshCw,
  Copy,
  Check,
  ChevronDown,
  Mail,
  Gift,
  X,
  ExternalLink,
  Link
} from 'lucide-react';

/* ── 读取统一余额（与 inviteSystem 共享 localStorage） ── */
const STORAGE_KEY = 'sales_invite_system_v1';
function getUnifiedUserData(email = 'alex@example.com') {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const state = JSON.parse(raw);
    if (!state?.users) return null;
    return state.users.find(u =>
      String(u.email || '').toLowerCase() === String(email).toLowerCase()
    ) || null;
  } catch {
    return null;
  }
}

const Header = ({ 
  user = { name: 'Alex User', email: 'alex@example.com', balance: 87.50, inviteCode: 'ALEX2024' }, 
  unreadCount = 0,
  onNavigate,
  onLogout,
  darkMode = false
}) => {
  const { t, i18n } = useTranslation();
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedCreditCode, setCopiedCreditCode] = useState(false);
  const [dismissedPromo, setDismissedPromo] = useState(false);
  const dropdownRef = useRef(null);

  // 定时刷新余额（与 inviteSystem 同步）
  const [balanceTick, setBalanceTick] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setBalanceTick(t => t + 1), 5000);
    return () => clearInterval(timer);
  }, []);
  const unifiedUser = useMemo(() => getUnifiedUserData(user.email), [user.email, balanceTick]);
  const displayBalance = unifiedUser ? (Number(unifiedUser.balance) || 0) : user.balance;

  // Available credits summary — linked with CouponCenter data
  const availableCredits = [
    { code: 'WELCOME10', type: 'percentage', value: 10, label: '新用户欢迎礼', expiry: '2026-12-31' },
    { code: 'VIP20', type: 'percentage', value: 20, label: 'VIP 专属折扣', expiry: '2026-06-30' },
    { code: 'SAVE15', type: 'percentage', value: 15, label: '限时促销折扣', expiry: '2026-03-31' },
    { code: 'REFERRAL-10USD', type: 'fixed', value: 10, label: '推荐奖励额度', expiry: '2026-11-30' },
  ];
  const creditsCount = availableCredits.length;
  const bestPercentOff = Math.max(...availableCredits.filter(c => c.type === 'percentage').map(c => c.value));
  const totalFixedCredit = availableCredits.filter(c => c.type === 'fixed').reduce((sum, c) => sum + c.value, 0);

  const handleCopyCreditCode = (e, code) => {
    e.stopPropagation();
    navigator.clipboard.writeText(code);
    setCopiedCreditCode(code);
    setTimeout(() => setCopiedCreditCode(false), 2000);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = (name) => {
    if (activeDropdown === name) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(name);
    }
  };

  const buildInviteUrl = () => {
    const url = new URL(window.location.origin);
    url.searchParams.set('invite', String(user.inviteCode || '').trim());
    return url.toString();
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(buildInviteUrl());
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setActiveDropdown(null);
  };

  const theme = {
    header: darkMode ? 'bg-slate-900/80 backdrop-blur-xl border-slate-800' : 'bg-white border-gray-200',
    textPrimary: darkMode ? 'text-white' : 'text-gray-900',
    textSecondary: darkMode ? 'text-slate-400' : 'text-gray-600',
    textLabel: darkMode ? 'text-slate-500' : 'text-gray-400',
    bgHover: darkMode ? 'hover:bg-white/5' : 'hover:bg-gray-100',
    iconColor: darkMode ? 'text-slate-400' : 'text-gray-500',
    divider: darkMode ? 'bg-slate-800' : 'bg-gray-200',
    dropdownBg: darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-100',
    dropdownHover: darkMode ? 'hover:bg-white/5' : 'hover:bg-gray-50',
    buttonRecharge: darkMode ? 'bg-cyan-600 hover:bg-cyan-500 text-white' : 'bg-[#1A73E8] hover:bg-[#1765CC] text-white',
    inviteBg: darkMode ? 'bg-white/5' : 'bg-gray-100',
    inviteText: darkMode ? 'text-white' : 'text-gray-900',
    inviteHover: darkMode ? 'group-hover:bg-cyan-500/10 group-hover:text-cyan-400' : 'group-hover:bg-blue-50 group-hover:text-[#1A73E8]',
    copyIcon: darkMode ? 'group-hover:text-cyan-400' : 'group-hover:text-[#1A73E8]',
    langActive: darkMode ? 'bg-cyan-500/10 text-cyan-400' : 'bg-blue-50 text-[#1A73E8]',
    langTextActive: darkMode ? 'text-cyan-400 font-medium' : 'text-[#1A73E8] font-medium',
    notificationDotRing: darkMode ? 'ring-slate-900' : 'ring-white',
    profileBorder: darkMode ? 'border-cyan-500/30 bg-cyan-500/10' : 'border-blue-200 bg-blue-50',
    profileHover: darkMode ? 'hover:bg-white/5' : 'hover:bg-gray-100',
    headerTitle: darkMode ? 'text-white' : 'text-gray-900',
    viewAllLink: darkMode ? 'text-cyan-400 hover:text-cyan-300' : 'text-[#1A73E8] hover:text-[#1765CC]',
    notificationItemHover: darkMode ? 'hover:bg-white/5' : 'hover:bg-gray-50',
    dropdownDivider: darkMode ? 'border-slate-800' : 'border-gray-50',
    dropdownHeader: darkMode ? 'bg-slate-800/50' : 'bg-gray-50/50'
  };

  return (
    <header className={`${theme.header} border-b px-6 py-3 sticky top-0 z-40 flex items-center justify-between shadow-sm`}>
      {/* Left: Quick Info (Hidden on small screens) */}
      <div className="hidden md:flex items-center gap-6 text-sm">
        <div className={`flex items-center gap-2 ${theme.textSecondary} group cursor-pointer`} onClick={handleCopyCode}>
          <Link className="w-3.5 h-3.5" />
          <span className={theme.textLabel}>{t('header.invite_code')}:</span>
          <span className={`font-mono font-medium px-2 py-0.5 rounded transition-colors truncate max-w-[180px] ${theme.inviteText} ${theme.inviteBg} ${theme.inviteHover}`} title={buildInviteUrl()}>
            {buildInviteUrl()}
          </span>
          {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className={`w-3.5 h-3.5 ${theme.textLabel} ${theme.copyIcon}`} />}
        </div>
        
        <div className={`h-4 w-px ${theme.divider}`}></div>
        
        <div className="flex items-center gap-2">
          <span className={theme.textLabel}>{t('header.balance')}:</span>
          <span className={`font-bold ${theme.textPrimary}`}>$ {displayBalance.toFixed(2)}</span>
          <button 
            onClick={() => onNavigate('finance')}
            className={`text-xs px-2 py-0.5 rounded transition-colors ml-1 ${theme.buttonRecharge}`}
          >
            {t('header.recharge')}
          </button>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2 ml-auto" ref={dropdownRef}>

        {/* ── Credits / Promotions — visible inline pill + dropdown ── */}
        {!dismissedPromo && creditsCount > 0 && (
          <div className="relative group">
            {/* Always-visible promo pill */}
            <button
              onClick={() => toggleDropdown('credits')}
              className={`flex items-center gap-2 pl-2.5 pr-3 py-1.5 rounded-full border transition-all duration-200 ${
                activeDropdown === 'credits'
                  ? darkMode
                    ? 'bg-cyan-500/10 border-cyan-500/30 shadow-sm'
                    : 'bg-blue-50 border-[#1A73E8]/30 shadow-sm shadow-blue-100'
                  : darkMode
                    ? 'bg-white/5 border-white/10 hover:bg-white/10'
                    : 'bg-gradient-to-r from-blue-50/80 to-white border-blue-100 hover:border-[#1A73E8]/30 hover:shadow-sm'
              }`}
            >
              {/* Icon */}
              <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                darkMode ? 'bg-cyan-500/20' : 'bg-[#1A73E8]/10'
              }`}>
                <Gift className={`w-3.5 h-3.5 ${darkMode ? 'text-cyan-400' : 'text-[#1A73E8]'}`} />
              </div>

              {/* Text: always visible on md+, hidden on mobile */}
              <div className="hidden sm:flex items-center gap-1.5">
                <span className={`text-[12px] font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  {creditsCount} 张优惠可用
                </span>
                <span className={`text-[11px] ${darkMode ? 'text-cyan-400' : 'text-[#1A73E8]'} font-medium`}>
                  最高减 {bestPercentOff}%
                  {totalFixedCredit > 0 && ` + $${totalFixedCredit}`}
                </span>
              </div>

              {/* Mobile: just show count badge */}
              <span className={`sm:hidden text-[11px] font-bold ${darkMode ? 'text-cyan-400' : 'text-[#1A73E8]'}`}>
                {creditsCount}
              </span>

              {/* Expand chevron */}
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${
                activeDropdown === 'credits' ? 'rotate-180' : ''
              } ${darkMode ? 'text-slate-500' : 'text-gray-400'}`} />
            </button>

            {/* Dismiss button (X) */}
            <button
              onClick={(e) => { e.stopPropagation(); setDismissedPromo(true); setActiveDropdown(null); }}
              className={`absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity ${
                darkMode ? 'bg-slate-700 text-slate-400 hover:text-white' : 'bg-gray-200 text-gray-400 hover:text-gray-600'
              }`}
              title="暂时关闭"
            >
              <X className="w-2.5 h-2.5" />
            </button>

            {/* Dropdown panel */}
            {activeDropdown === 'credits' && (
              <div className={`absolute right-0 mt-2 w-[340px] rounded-xl shadow-xl border overflow-hidden animate-in fade-in zoom-in-95 duration-200 z-50 ${theme.dropdownBg}`}>
                {/* Header */}
                <div className={`px-4 py-3 border-b flex justify-between items-center ${theme.dropdownDivider} ${theme.dropdownHeader}`}>
                  <div className="flex items-center gap-2">
                    <Gift className={`w-4 h-4 ${darkMode ? 'text-cyan-400' : 'text-[#1A73E8]'}`} />
                    <span className={`font-semibold text-sm ${theme.headerTitle}`}>我的优惠</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                      darkMode ? 'bg-cyan-500/20 text-cyan-400' : 'bg-[#1A73E8]/10 text-[#1A73E8]'
                    }`}>{creditsCount}</span>
                  </div>
                  <button
                    onClick={() => { onNavigate('coupons'); setActiveDropdown(null); }}
                    className={`text-xs font-medium ${theme.viewAllLink} flex items-center gap-0.5`}
                  >
                    全部管理 <ExternalLink className="w-3 h-3" />
                  </button>
                </div>

                {/* Credits List */}
                <div className="max-h-64 overflow-y-auto">
                  {availableCredits.map((credit, idx) => (
                    <div
                      key={credit.code}
                      className={`px-4 py-3 flex items-center gap-3 cursor-pointer transition-colors ${theme.notificationItemHover} ${
                        idx < availableCredits.length - 1 ? `border-b ${theme.dropdownDivider}` : ''
                      }`}
                      onClick={() => { onNavigate('coupons'); setActiveDropdown(null); }}
                    >
                      {/* Value badge */}
                      <div className={`w-12 h-12 rounded-lg flex flex-col items-center justify-center shrink-0 ${
                        darkMode ? 'bg-gradient-to-br from-cyan-500/20 to-blue-500/20' : 'bg-gradient-to-br from-[#1A73E8]/10 to-blue-100/50'
                      }`}>
                        <span className={`text-sm font-bold leading-none ${darkMode ? 'text-cyan-400' : 'text-[#1A73E8]'}`}>
                          {credit.type === 'fixed' ? `$${credit.value}` : `${credit.value}%`}
                        </span>
                        <span className={`text-[9px] mt-0.5 ${darkMode ? 'text-slate-500' : 'text-gray-400'}`}>
                          {credit.type === 'fixed' ? '额度' : '折扣'}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className={`text-[13px] font-medium ${theme.textPrimary}`}>{credit.label}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <code className={`text-[11px] font-mono px-1.5 py-0.5 rounded ${
                            darkMode ? 'bg-white/5 text-slate-400' : 'bg-gray-100 text-gray-500'
                          }`}>{credit.code}</code>
                          <span className={`text-[10px] ${theme.textLabel}`}>· 到期 {credit.expiry.slice(5)}</span>
                        </div>
                      </div>

                      {/* Copy button */}
                      <button
                        onClick={(e) => handleCopyCreditCode(e, credit.code)}
                        className={`p-1.5 rounded-lg transition-colors shrink-0 ${
                          darkMode ? 'hover:bg-white/5 text-slate-500 hover:text-cyan-400' : 'hover:bg-gray-100 text-gray-400 hover:text-[#1A73E8]'
                        }`}
                        title="复制优惠码"
                      >
                        {copiedCreditCode === credit.code
                          ? <Check className="w-3.5 h-3.5 text-green-500" />
                          : <Copy className="w-3.5 h-3.5" />
                        }
                      </button>
                    </div>
                  ))}
                </div>

                {/* Footer CTA */}
                <div className={`px-4 py-3 border-t ${theme.dropdownDivider} ${theme.dropdownHeader}`}>
                  <button
                    onClick={() => { onNavigate('coupons'); setActiveDropdown(null); }}
                    className={`w-full text-center text-[13px] font-medium py-2 rounded-lg transition-colors ${
                      darkMode ? 'bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20' : 'bg-[#1A73E8]/5 text-[#1A73E8] hover:bg-[#1A73E8]/10'
                    }`}
                  >
                    前往优惠中心查看全部 →
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Refresh */}
        <button className={`p-2 rounded-full transition-colors ${theme.iconColor} ${theme.bgHover}`} title={t('common.refresh')}>
          <RefreshCw className="w-5 h-5" />
        </button>

        {/* Language Switcher */}
        <div className="relative">
          <button 
            onClick={() => toggleDropdown('language')}
            className={`p-2 rounded-full transition-colors ${activeDropdown === 'language' ? theme.langActive : `${theme.iconColor} ${theme.bgHover}`}`}
          >
            <div className="flex items-center gap-1">
               <Globe className="w-5 h-5" />
               <span className="text-xs font-medium uppercase">{i18n.language === 'zh' ? 'CN' : 'EN'}</span>
            </div>
          </button>
          
          {activeDropdown === 'language' && (
            <div className={`absolute right-0 mt-2 w-32 rounded-xl shadow-lg border py-1 animate-in fade-in zoom-in-95 duration-200 ${theme.dropdownBg}`}>
              <button 
                onClick={() => changeLanguage('zh')}
                className={`w-full text-left px-4 py-2 text-sm flex items-center justify-between ${theme.dropdownHover} ${i18n.language === 'zh' ? theme.langTextActive : theme.textSecondary}`}
              >
                中文 {i18n.language === 'zh' && <Check className="w-3.5 h-3.5" />}
              </button>
              <button 
                onClick={() => changeLanguage('en')}
                className={`w-full text-left px-4 py-2 text-sm flex items-center justify-between ${theme.dropdownHover} ${i18n.language === 'en' ? theme.langTextActive : theme.textSecondary}`}
              >
                English {i18n.language === 'en' && <Check className="w-3.5 h-3.5" />}
              </button>
            </div>
          )}
        </div>

        {/* Notifications */}
        <div className="relative">
          <button 
            onClick={() => toggleDropdown('notifications')}
            className={`p-2 rounded-full transition-colors relative ${activeDropdown === 'notifications' ? theme.langActive : `${theme.iconColor} ${theme.bgHover}`}`}
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className={`absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ${theme.notificationDotRing}`}></span>
            )}
          </button>

          {activeDropdown === 'notifications' && (
            <div className={`absolute right-0 mt-2 w-80 rounded-xl shadow-lg border overflow-hidden animate-in fade-in zoom-in-95 duration-200 ${theme.dropdownBg}`}>
              <div className={`px-4 py-3 border-b flex justify-between items-center ${theme.dropdownDivider} ${theme.dropdownHeader}`}>
                <span className={`font-semibold text-sm ${theme.headerTitle}`}>{t('menu.messages')}</span>
                <button 
                  onClick={() => { onNavigate('messages'); setActiveDropdown(null); }}
                  className={`text-xs font-medium ${theme.viewAllLink}`}
                >
                  {t('common.view_all')}
                </button>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {/* Mock Notifications */}
                <div className={`p-4 border-b cursor-pointer ${theme.dropdownDivider} ${theme.notificationItemHover}`} onClick={() => { onNavigate('messages'); setActiveDropdown(null); }}>
                    <div className="flex gap-3">
                        <div className="mt-1 w-2 h-2 rounded-full bg-blue-500 shrink-0"></div>
                        <div>
                            <p className={`text-sm font-medium line-clamp-1 ${theme.textPrimary}`}>系统维护通知</p>
                            <p className={`text-xs mt-0.5 line-clamp-2 ${theme.textSecondary}`}>我们将于明日凌晨进行例行维护...</p>
                            <p className={`text-[10px] mt-1 ${theme.textLabel}`}>10 min ago</p>
                        </div>
                    </div>
                </div>
                 <div className={`p-4 cursor-pointer ${theme.notificationItemHover}`} onClick={() => { onNavigate('messages'); setActiveDropdown(null); }}>
                    <div className="flex gap-3">
                        <div className="mt-1 w-2 h-2 rounded-full bg-red-500 shrink-0"></div>
                        <div>
                            <p className={`text-sm font-medium line-clamp-1 ${theme.textPrimary}`}>您的订阅即将到期</p>
                            <p className={`text-xs mt-0.5 line-clamp-2 ${theme.textSecondary}`}>静态住宅 ISP - 美国 将于3天后到期...</p>
                            <p className={`text-[10px] mt-1 ${theme.textLabel}`}>2 hours ago</p>
                        </div>
                    </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Support */}
        <button 
            onClick={() => onNavigate('support')}
            className={`p-2 rounded-full transition-colors hidden sm:block ${theme.iconColor} ${theme.bgHover}`} 
            title={t('menu.support')}
        >
          <HelpCircle className="w-5 h-5" />
        </button>
        
        {/* Settings */}
        <button 
            onClick={() => onNavigate('settings')}
            className={`p-2 rounded-full transition-colors hidden sm:block ${theme.iconColor} ${theme.bgHover}`}
            title={t('menu.settings')}
        >
          <Settings className="w-5 h-5" />
        </button>

        <div className={`h-6 w-px mx-1 ${theme.divider}`}></div>

        {/* User Profile */}
        <div className="relative">
          <button 
            onClick={() => toggleDropdown('profile')}
            className={`flex items-center gap-2 pl-1 pr-2 py-1 rounded-full border transition-all ${activeDropdown === 'profile' ? theme.profileBorder : `border-transparent ${theme.profileHover}`}`}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-sm">
              {user.name.charAt(0)}
            </div>
            <ChevronDown className={`w-4 h-4 transition-transform ${theme.iconColor} ${activeDropdown === 'profile' ? 'rotate-180' : ''}`} />
          </button>

          {activeDropdown === 'profile' && (
            <div className={`absolute right-0 mt-2 w-56 rounded-xl shadow-lg border py-1 animate-in fade-in zoom-in-95 duration-200 ${theme.dropdownBg}`}>
              <div className={`px-4 py-3 border-b ${theme.dropdownDivider}`}>
                <p className={`text-sm font-bold ${theme.textPrimary}`}>{user.name}</p>
                <p className={`text-xs truncate ${theme.textLabel}`}>{user.email}</p>
              </div>
              
              <div className="py-1">
                <button 
                    onClick={() => { onNavigate('settings'); setActiveDropdown(null); }}
                    className={`w-full text-left px-4 py-2 text-sm flex items-center gap-2 ${theme.dropdownHover} ${theme.textSecondary}`}
                >
                    <User className={`w-4 h-4 ${theme.iconColor}`} />
                    {t('header.my_profile')}
                </button>
                <button 
                    onClick={() => { onNavigate('messages'); setActiveDropdown(null); }}
                    className={`w-full text-left px-4 py-2 text-sm flex items-center gap-2 ${theme.dropdownHover} ${theme.textSecondary}`}
                >
                    <Mail className={`w-4 h-4 ${theme.iconColor}`} />
                    {t('header.inbox')}
                    {unreadCount > 0 && <span className="ml-auto bg-red-500/20 text-red-400 text-[10px] px-1.5 py-0.5 rounded-full font-bold">{unreadCount}</span>}
                </button>
              </div>

              <div className={`border-t py-1 ${theme.dropdownDivider}`}>
                <button 
                    onClick={onLogout}
                    className={`w-full text-left px-4 py-2 text-sm text-red-400 flex items-center gap-2 ${darkMode ? 'hover:bg-red-500/10' : 'hover:bg-red-50'}`}
                >
                    <LogOut className="w-4 h-4" />
                    {t('header.logout')}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;