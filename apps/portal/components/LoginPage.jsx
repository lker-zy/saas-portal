import React, { useState, useEffect } from 'react';
import './RegisterPage.css'; // 复用注册页面的样式

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  /* ── Validate ── */
  const validate = () => {
    const errs = {};
    if (!email.trim()) errs.email = '请输入邮箱地址';
    else if (!/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(email)) errs.email = '请输入正确的邮箱格式';
    if (!password) errs.password = '请输入密码';
    else if (password.length < 6) errs.password = '密码长度至少6位';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  /* ── Submit ── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);

    try {
      const loginResp = await fetch('/client/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const loginData = await loginResp.json();

      if (!loginResp.ok || loginData.code !== 0) {
        throw new Error(loginData.message || loginData.error || '登录失败');
      }

      // 保存 token 和用户信息
      if (loginData.data?.accessToken) {
        localStorage.setItem('token', loginData.data.accessToken);
        localStorage.setItem('accessToken', loginData.data.accessToken);
        if (loginData.data.user) {
          localStorage.setItem('userInfo', JSON.stringify(loginData.data.user));
          // Also save to 'user' key for dashboard compatibility
          localStorage.setItem('user', JSON.stringify(loginData.data.user));
        }

        // 记住我功能
        if (rememberMe) {
          localStorage.setItem('rememberMe', 'true');
          localStorage.setItem('savedEmail', email);
        } else {
          localStorage.removeItem('rememberMe');
          localStorage.removeItem('savedEmail');
        }

        // 跳转到主页或原来的页面
        const redirectUrl = new URLSearchParams(window.location.search).get('redirect');
        window.location.href = redirectUrl || '/dashboard';
      } else {
        throw new Error('登录失败，请检查账号密码');
      }
    } catch (err) {
      console.error('登录失败:', err);
      let msg = err.message || '登录失败，请稍后重试';
      if (msg.includes('401') || msg.includes('Unauthorized')) {
        msg = '邮箱或密码错误';
      }
      setErrors(prev => ({ ...prev, submit: msg }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const goRegister = () => {
    window.location.href = '/register';
  };

  // 初始化：检查是否有保存的邮箱
  useEffect(() => {
    const savedEmail = localStorage.getItem('savedEmail');
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

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
      <div className="flex w-full max-w-[480px] md:max-w-[1230px] md:w-[80vw] lg:w-[64vw] my-auto items-stretch rounded-2xl md:rounded-lg shadow-2xl">
        {/* ── Left: Image ── */}
        <div className="hidden md:block w-[45%] rounded-l-lg overflow-hidden">
          <img
            src="/assets/intro-DrSfAFvm.png"
            alt="Quantum Proxy"
            className="w-full h-full object-cover"
          />
        </div>

        {/* ── Right: Form ── */}
        <div className="flex-1 p-5 sm:p-6 md:p-8 lg:p-10 flex flex-col justify-center bg-white rounded-2xl md:rounded-r-lg md:rounded-l-none">
          {/* Header */}
          <div className="flex justify-between items-center mb-4 sm:mb-5">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">账号登录</h2>
            <a
              href="/register"
              onClick={(e) => { e.preventDefault(); goRegister(); }}
              className="text-[#1A73E8] cursor-pointer hover:text-[#1557B0] transition-colors text-sm"
            >
              还没有账号？
            </a>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-3.5">
            {/* ── Email field ── */}
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
                onChange={(e) => { setEmail(e.target.value); setErrors(prev => ({ ...prev, email: null, submit: null })); }}
                placeholder="请输入邮箱地址"
                className={`w-full px-4 py-2.5 rounded-lg border ${errors.email ? 'border-red-400 focus:ring-red-100' : 'border-gray-300 focus:ring-blue-100'} bg-gray-50 focus:bg-white focus:border-[#1A73E8] focus:ring-2 outline-none transition-all text-sm`}
                disabled={isSubmitting}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            {/* ── Password ── */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5">
                <span className="flex items-center gap-1.5">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  密码
                </span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setErrors(prev => ({ ...prev, password: null, submit: null })); }}
                  placeholder="请输入密码（至少6位）"
                  className={`w-full px-4 py-2.5 pr-10 rounded-lg border ${errors.password ? 'border-red-400 focus:ring-red-100' : 'border-gray-300 focus:ring-blue-100'} bg-gray-50 focus:bg-white focus:border-[#1A73E8] focus:ring-2 outline-none transition-all text-sm`}
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  )}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            {/* ── Remember Me & Forgot Password ── */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-[#1A73E8] focus:ring-[#1A73E8]"
                />
                <span className="ml-2 text-xs text-gray-600">记住我</span>
              </label>
              <a href="#" className="text-xs text-[#1A73E8] hover:text-[#1557B0] transition-colors">
                忘记密码？
              </a>
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
                  登录中...
                </span>
              ) : '登录'}
            </button>
          </form>

          {/* ── Divider ── */}
          <div className="flex items-center my-3 sm:my-4">
            <div className="flex-1 border-t border-gray-200"></div>
            <span className="px-3 sm:px-4 text-xs text-gray-400">其他登录方式</span>
            <div className="flex-1 border-t border-gray-200"></div>
          </div>

          {/* ── Social ── */}
          <div className="flex justify-center gap-3 sm:gap-4">
            <button type="button" className="w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-all" title="微信">
              <svg className="w-5 h-5 sm:w-7 sm:h-7" viewBox="0 0 24 24" fill="rgb(7,193,96)">
                <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18z"/>
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
              <svg viewBox="64 64 896 896" className="w-5 h-5 sm:w-7 sm:h-7 text-[#E6162D]" fill="currentColor"><path d="M457.3 543c-68.1-17.7-145 16.2-174.6 76.2-30.1 61.2-1 129.1 67.8 151.3 71.2 23 155.2-12.2 184.4-78.3 28.7-64.6-7.2-131-77.6-149.2zm-52 156.2c-13.8 22.1-43.5 31.7-65.8 21.6-22-10-28.5-35.7-14.6-57.2 13.7-21.4 42.3-31 64.4-21.7 22.4 9.5 29.6 35 16 57.3zm45.5-58.5c-5 8.6-16.1 12.7-24.7 9.1-8.5-3.5-11.2-13.1-6.4-21.5 5-8.4 15.6-12.4 24.1-9.1 8.7 3.2 11.8 12.9 7 21.5zm334.5-197.2c15 4.8 31-3.4 35.9-18.3 11.8-36.6 4.4-78.4-23.2-109a111.39 111.39 0 00-106-34.3 28.45 28.45 0 00-21.9 33.8 28.39 28.39 0 0033.8 21.8c18.4-3.9 38.3 1.8 51.9 16.7a54.2 54.2 0 011.3 53.3 28.45 28.45 0 0018.2 36zm99.8-206c-56.7-62.9-140.4-86.9-217.7-70.5a32.98 32.98 0 00-25.4 39.3 33.12 33.12 0 0039.3 25.5c55-11.7 114.4 5.4 154.8 50.1 40.3 44.7 51.2 105.7 34 159.1-5.6 17.4 3.9 36 21.3 41.7 17.4 5.6 36-3.9 41.6-21.2v-.1c24.1-75.4 8.9-161.1-47.9-223.9zM729 499c-12.2-3.6-20.5-6.1-14.1-22.1 13.8-34.7 15.2-64.7.3-86-28-40.1-104.8-37.9-192.8-1.1 0 0-27.6 12.1-20.6-9.8 13.5-43.5 11.5-79.9-9.6-101-47.7-47.8-174.6 1.8-283.5 110.6C127.3 471.1 80 557.5 80 632.2 80 775.1 263.2 862 442.5 862c235 0 391.3-136.5 391.3-245 0-65.5-55.2-102.6-104.8-118zM443 810.8c-143 14.1-266.5-50.5-275.8-144.5-9.3-93.9 99.2-181.5 242.2-195.6 143-14.2 266.5 50.5 275.8 144.4C694.4 709 586 796.6 443 810.8z" /></svg>
            </button>
          </div>

          {/* ── Bottom link ── */}
          <p className="text-center text-xs text-gray-400 mt-4">
            还没有账号？
            <a href="/register" onClick={(e) => { e.preventDefault(); goRegister(); }} className="text-[#1A73E8] cursor-pointer hover:text-[#1557B0] font-medium ml-1">
              立即注册
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

export default LoginPage;
