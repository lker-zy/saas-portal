import React, { useState, useRef, useEffect } from 'react';
import SliderCaptcha from './SliderCaptcha';
import './RegisterPage.css';

/* ─────── Country code data ─────── */
const COUNTRY_CODES = [
  { code: '+86',  label: '中国', flag: '🇨🇳' },
  { code: '+1',   label: '美国/加拿大', flag: '🇺🇸' },
  { code: '+44',  label: '英国', flag: '🇬🇧' },
  { code: '+81',  label: '日本', flag: '🇯🇵' },
  { code: '+82',  label: '韩国', flag: '🇰🇷' },
  { code: '+852', label: '中国香港', flag: '🇭🇰' },
  { code: '+886', label: '中国台湾', flag: '🇹🇼' },
  { code: '+65',  label: '新加坡', flag: '🇸🇬' },
  { code: '+60',  label: '马来西亚', flag: '🇲🇾' },
  { code: '+61',  label: '澳大利亚', flag: '🇦🇺' },
  { code: '+49',  label: '德国', flag: '🇩🇪' },
  { code: '+33',  label: '法国', flag: '🇫🇷' },
  { code: '+7',   label: '俄罗斯', flag: '🇷🇺' },
  { code: '+91',  label: '印度', flag: '🇮🇳' },
  { code: '+55',  label: '巴西', flag: '🇧🇷' },
  { code: '+62',  label: '印度尼西亚', flag: '🇮🇩' },
  { code: '+66',  label: '泰国', flag: '🇹🇭' },
  { code: '+84',  label: '越南', flag: '🇻🇳' },
  { code: '+971', label: '阿联酋', flag: '🇦🇪' },
  { code: '+966', label: '沙特', flag: '🇸🇦' },
];

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+86');
  const [showCodeDropdown, setShowCodeDropdown] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [agreement, setAgreement] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const timerRef = useRef(null);
  const dropdownRef = useRef(null);

  // Cleanup timer
  useEffect(() => () => { if (timerRef.current) clearInterval(timerRef.current); }, []);

  // Close country code dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowCodeDropdown(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  /* ── Helpers ── */
  const getPasswordStrength = (pwd) => {
    if (!pwd) return { level: 0, text: '', color: '' };
    let s = 0;
    if (pwd.length >= 6) s++;
    if (pwd.length >= 10) s++;
    if (/[a-z]/.test(pwd)) s++;
    if (/[A-Z]/.test(pwd)) s++;
    if (/\d/.test(pwd)) s++;
    if (/[^A-Za-z0-9]/.test(pwd)) s++;
    if (s <= 2) return { level: 1, text: '弱', color: '#ef4444' };
    if (s <= 4) return { level: 2, text: '中', color: '#f59e0b' };
    return { level: 3, text: '强', color: '#22c55e' };
  };

  const pwdStrength = getPasswordStrength(password);

  /* ── Validate ── */
  const validate = () => {
    const errs = {};
    // Email is required
    if (!email.trim()) errs.email = '请输入邮箱地址';
    else if (!/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(email)) errs.email = '请输入正确的邮箱格式';
    // Phone is optional, but validate format if filled
    if (phone.trim() && !/^\d{5,15}$/.test(phone)) errs.phone = '请输入有效的手机号码';
    if (!password) errs.password = '请输入密码';
    else if (password.length < 6) errs.password = '密码长度至少6位';
    if (!confirmPassword) errs.confirmPassword = '请确认密码';
    else if (password !== confirmPassword) errs.confirmPassword = '两次密码输入不一致';
    if (!verificationCode) errs.verificationCode = '请输入验证码';
    if (!captchaVerified) errs.captcha = '请完成滑块验证';
    if (!agreement) errs.agreement = '请阅读并同意相关协议';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  /* ── Send verification code ── */
  const handleSendCode = async () => {
    // Must pass captcha before sending code
    if (!captchaVerified) {
      setErrors(prev => ({ ...prev, captcha: '请先完成人机验证' }));
      return;
    }
    // Validate email before sending
    if (!email.trim() || !/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(email)) {
      setErrors(prev => ({ ...prev, email: '请输入正确的邮箱地址' }));
      return;
    }

    setIsSending(true);
    try {
      const resp = await fetch('/api/client/send-verification-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data.message || data.error || '发送失败');

      // 测试模式：自动填充验证码
      if (data.data?.code) {
        setVerificationCode(data.data.code);
        console.log('[测试模式] 验证码已自动填充:', data.data.code);
      }

      // Start countdown
      setCountdown(60);
      timerRef.current && clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setIsSending(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err) {
      console.error('发送验证码失败:', err);
      setIsSending(false);
      setErrors(prev => ({ ...prev, verificationCode: err.message || '验证码发送失败，请稍后重试' }));
    }
  };

  /* ── Submit ── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);

    try {
      const regBody = { email, password, verificationCode };
      if (phone.trim()) regBody.phone = `${countryCode}${phone}`;
      const regResp = await fetch('/api/client/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(regBody),
      });
      const regData = await regResp.json();
      if (!regResp.ok) throw new Error(regData.message || regData.error || '注册失败');

      // Auto login
      try {
        const loginResp = await fetch('/api/client/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
        const loginData = await loginResp.json();
        if (loginData?.data?.accessToken) {
          localStorage.setItem('token', loginData.data.accessToken);
          localStorage.setItem('accessToken', loginData.data.accessToken);
          if (loginData.data.user) localStorage.setItem('userInfo', JSON.stringify(loginData.data.user));
          window.location.href = '/app/dashboard';
          return;
        }
      } catch (_) { /* auto-login failed, redirect to login */ }
      window.location.href = '/login';
    } catch (err) {
      console.error('注册失败:', err);
      let msg = err.message || '注册失败，请稍后重试';
      if (msg.includes('verification code')) msg = '验证码无效或已过期，请重新获取';
      if (msg.includes('already exists')) msg = '该邮箱已被注册，请直接登录或使用其他邮箱';
      setErrors(prev => ({ ...prev, submit: msg }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const goLogin = () => { window.location.href = '/login'; };

  /* ── Render ── */
  return (
    <div
      className="min-h-screen overflow-y-auto bg-gray-50 py-4 px-3 sm:py-6 sm:px-4 md:py-8 md:px-4 flex justify-center items-start"
      style={{
        backgroundImage: 'url(/assets/bulebackend-BzfAwCnt.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="flex w-full max-w-[480px] md:max-w-[1230px] md:w-[80vw] lg:w-[64vw] my-auto items-stretch rounded-2xl md:rounded-lg">
        {/* ── Left: Image ── */}
        <div className="hidden md:block w-[45%] rounded-l-lg overflow-hidden">
          <img
            src="/assets/intro-DrSfAFvm.png"
            alt="IPSaaS"
            className="w-full h-full object-cover"
          />
        </div>

        {/* ── Right: Form ── */}
        <div className="flex-1 p-5 sm:p-6 md:p-8 lg:p-10 flex flex-col justify-center bg-white rounded-2xl md:rounded-r-lg md:rounded-l-none">
          {/* Header */}
          <div className="flex justify-between items-center mb-4 sm:mb-5">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">账号注册</h2>
            <a
              href="/login"
              onClick={(e) => { e.preventDefault(); goLogin(); }}
              className="text-[#1A73E8] cursor-pointer hover:text-[#1557B0] transition-colors text-sm"
            >
              已有账号？
            </a>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-3.5">
            {/* ── Email field (required) ── */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5">
                <span className="flex items-center gap-1.5">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  邮箱地址
                </span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setErrors(prev => ({ ...prev, email: '' })); }}
                placeholder="请输入邮箱地址"
                className={`w-full px-4 py-2.5 rounded-lg border ${errors.email ? 'border-red-400' : 'border-gray-300 focus:border-[#1A73E8]'} bg-gray-50 focus:bg-white outline-none transition-colors text-sm`}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            {/* ── Phone field (optional) ── */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5">
                <span className="flex items-center gap-1.5">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
                  手机号码
                  <span className="text-gray-400 font-normal text-xs">（选填）</span>
                </span>
              </label>
              <div className="flex gap-2">
                {/* Country code selector */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    type="button"
                    onClick={() => setShowCodeDropdown(!showCodeDropdown)}
                    className="flex items-center gap-1 px-3 py-2.5 rounded-lg border border-gray-300 bg-gray-50 hover:bg-white text-sm min-w-[100px] focus:border-[#1A73E8] outline-none transition-colors"
                  >
                    <span>{COUNTRY_CODES.find(c => c.code === countryCode)?.flag}</span>
                    <span className="text-gray-700">{countryCode}</span>
                    <svg className="ml-auto w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg>
                  </button>
                  {showCodeDropdown && (
                    <div className="absolute z-50 top-full left-0 mt-1 w-56 sm:w-64 max-h-60 overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-xl">
                      {COUNTRY_CODES.map((c) => (
                        <button
                          key={c.code}
                          type="button"
                          onClick={() => { setCountryCode(c.code); setShowCodeDropdown(false); }}
                          className={`w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-blue-50 transition-colors ${
                            countryCode === c.code ? 'bg-blue-50 text-[#1A73E8]' : 'text-gray-700'
                          }`}
                        >
                          <span>{c.flag}</span>
                          <span>{c.label}</span>
                          <span className="ml-auto text-gray-400">{c.code}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                {/* Phone input */}
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => { setPhone(e.target.value.replace(/\D/g, '')); setErrors(prev => ({ ...prev, phone: '' })); }}
                  placeholder="请输入手机号码"
                  className={`flex-1 px-4 py-2.5 rounded-lg border ${errors.phone ? 'border-red-400' : 'border-gray-300 focus:border-[#1A73E8]'} bg-gray-50 focus:bg-white outline-none transition-colors text-sm`}
                />
              </div>
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>

            {/* ── Password ── */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5">密码</label>
              <div className="relative">
                <input
                  type={showPwd ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setErrors(prev => ({ ...prev, password: '' })); }}
                  placeholder="请输入密码（至少6位）"
                  className={`w-full px-4 py-2.5 pr-10 rounded-lg border ${errors.password ? 'border-red-400' : 'border-gray-300 focus:border-[#1A73E8]'} bg-gray-50 focus:bg-white outline-none transition-colors text-sm`}
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPwd ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8-11 8-11-8-11-8-11 8-11 8z"/><circle cx="12" cy="12" r="3"/></svg>
                  )}
                </button>
              </div>
              {password && (
                <div className="flex items-center gap-2 mt-1.5">
                  <div className="flex gap-1">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="w-8 h-1 rounded-full transition-colors"
                        style={{ backgroundColor: pwdStrength.level >= i ? pwdStrength.color : '#e5e7eb' }}
                      />
                    ))}
                  </div>
                  <span className="text-xs" style={{ color: pwdStrength.color }}>
                    {pwdStrength.text}
                  </span>
                </div>
              )}
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            {/* ── Confirm password ── */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5">确认密码</label>
              <div className="relative">
                <input
                  type={showConfirmPwd ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => { setConfirmPassword(e.target.value); setErrors(prev => ({ ...prev, confirmPassword: '' })); }}
                  placeholder="请再次输入密码"
                  className={`w-full px-4 py-2.5 pr-10 rounded-lg border ${errors.confirmPassword ? 'border-red-400' : 'border-gray-300 focus:border-[#1A73E8]'} bg-gray-50 focus:bg-white outline-none transition-colors text-sm`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPwd(!showConfirmPwd)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPwd ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8-11 8-11-8-11-8-11 8-11 8z"/><circle cx="12" cy="12" r="3"/></svg>
                  )}
                </button>
              </div>
              {confirmPassword && password === confirmPassword && (
                <p className="text-green-500 text-xs mt-1 flex items-center gap-1">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                  密码匹配
                </p>
              )}
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
            </div>

            {/* ── Slider CAPTCHA (must pass before sending code) ── */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5">人机验证</label>
              <SliderCaptcha onVerified={(v) => { setCaptchaVerified(v); setErrors(prev => ({ ...prev, captcha: '' })); }} />
              {errors.captcha && <p className="text-red-500 text-xs mt-1">{errors.captcha}</p>}
            </div>

            {/* ── Verification code ── */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5">验证码</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  maxLength={6}
                  value={verificationCode}
                  onChange={(e) => { setVerificationCode(e.target.value); setErrors(prev => ({ ...prev, verificationCode: '' })); }}
                  placeholder="请输入6位验证码"
                  className={`flex-1 px-4 py-2.5 rounded-lg border ${errors.verificationCode ? 'border-red-400' : 'border-gray-300 focus:border-[#1A73E8]'} bg-gray-50 focus:bg-white outline-none transition-colors text-sm`}
                />
                <button
                  type="button"
                  onClick={handleSendCode}
                  disabled={isSending || countdown > 0 || isSubmitting || !captchaVerified}
                  className={`min-w-[90px] sm:min-w-[120px] px-2.5 sm:px-4 py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                    countdown > 0 || isSending || isSubmitting || !captchaVerified
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-[#1A73E8] text-white hover:bg-[#1557B0]'
                  }`}
                  title={!captchaVerified ? '请先完成人机验证' : ''}
                >
                  {countdown > 0 ? `重新发送 (${countdown}s)` : isSending ? '发送中...' : '发送验证码'}
                </button>
              </div>
              {errors.verificationCode && <p className="text-red-500 text-xs mt-1">{errors.verificationCode}</p>}
              {!captchaVerified && !errors.verificationCode && (
                <p className="text-gray-400 text-xs mt-1 flex items-center gap-1">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                  请先完成上方人机验证后再获取验证码
                </p>
              )}
            </div>

            {/* ── Agreement ── */}
            <div>
              <label className="flex items-start gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={agreement}
                  onChange={(e) => { setAgreement(e.target.checked); setErrors(prev => ({ ...prev, agreement: '' })); }}
                  className="mt-0.5 w-4 h-4 rounded border-gray-300 text-[#1A73E8] focus:ring-[#1A73E8]"
                />
                <span className="text-xs text-gray-500 leading-relaxed">
                  我已阅读并同意
                  <a href="/terms" target="_blank" className="text-[#1A73E8] hover:text-[#1557B0] mx-0.5">《用户协议》</a>
                  和
                  <a href="/privacy" target="_blank" className="text-[#1A73E8] hover:text-[#1557B0] mx-0.5">《隐私政策》</a>
                </span>
              </label>
              {errors.agreement && <p className="text-red-500 text-xs mt-1">{errors.agreement}</p>}
            </div>

            {/* ── Submit error ── */}
            {errors.submit && (
              <div className="bg-red-50 text-red-600 text-sm px-4 py-2.5 rounded-lg border border-red-200">
                {errors.submit}
              </div>
            )}

            {/* ── Submit button ── */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 rounded-lg bg-[#1A73E8] hover:bg-[#1557B0] text-white font-medium text-sm transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/></svg>
                  注册中...
                </span>
              ) : '立即注册'}
            </button>
          </form>

          {/* ── Divider ── */}
          <div className="flex items-center my-3 sm:my-4">
            <div className="flex-1 border-t border-gray-200"></div>
            <span className="px-3 sm:px-4 text-xs text-gray-400">其他注册方式</span>
            <div className="flex-1 border-t border-gray-200"></div>
          </div>

          {/* ── Social ── */}
          <div className="flex justify-center gap-3 sm:gap-4">
            <button type="button" className="w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-all" title="微信">
              <svg className="w-5 h-5 sm:w-7 sm:h-7" viewBox="0 0 24 24" fill="rgb(7,193,96)">
                <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05.857-2.578 3.157-4.972 5.853-4.972 3.25 0 5.853 2.295 5.853 5.126 0 1.487-.736 2.819-1.874 3.743-.107.087-.215.17-.324.252.086.367.148.742.148 1.131 0 .393-.062.771-.176 1.14 2.705-.648 4.71-3.091 4.71-6.013 0-3.41-2.818-6.176-6.29-6.176-.276 0-.543.027-.811.05-.857-2.578-3.157-4.442-5.853-4.442zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18z"/>
              </svg>
            </button>
            <button type="button" className="w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-all" title="Facebook">
              <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-7 sm:h-7 text-[#1877F2]" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
            </button>
            <button type="button" className="w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-all" title="Google">
              <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-7 sm:h-7">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
            </button>
            <button type="button" className="w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-all" title="微博">
              <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-7 sm:h-7 text-[#E6162D]" fill="currentColor">
                <path d="M10.098 20c-3.63 0-6.637-2.029-6.637-4.525 0-2.496 3.007-4.525 6.637-4.525.836 0 1.632.117 2.363.324.96-1.024 2.7-2.066 4.432-1.968-.045 1.35-1.266 2.455-2.145 3.023 1.295.729 2.096 1.771 2.096 2.934 0 2.496-3.007 4.525-6.637 4.525l-.109-.318z"/>
                <path d="M20.695 6.157c0-1.62-1.426-2.933-3.185-2.933-1.76 0-3.186 1.313-3.186 2.933 0 1.62 1.426 2.934 3.186 2.934 1.759 0 3.185-1.314 3.185-2.934zm-2.846 1.755c-.926 0-1.677-.699-1.677-1.562 0-.862.751-1.562 1.677-1.562.927 0 1.678.7 1.678 1.562 0 .863-.751 1.562-1.678 1.562z"/>
              </svg>
            </button>
          </div>

          {/* ── Bottom link ── */}
          <p className="text-center text-xs text-gray-400 mt-4">
            已有账号？
            <a href="/login" onClick={(e) => { e.preventDefault(); goLogin(); }} className="text-[#1A73E8] cursor-pointer hover:text-[#1557B0] font-medium ml-1">
              立即登录
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
