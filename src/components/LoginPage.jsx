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
      const loginResp = await fetch('/api/client/login', {
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
        window.location.href = redirectUrl || '/app/dashboard';
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
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-white" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
            量子代理 Quantum Proxy
          </h1>
          <p className="text-white/80 text-sm mt-1" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
            登录您的账户
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">登录</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                邮箱地址 <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors(prev => ({ ...prev, email: null, submit: null }));
                }}
                className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="请输入邮箱地址"
                disabled={isSubmitting}
              />
              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                密码 <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrors(prev => ({ ...prev, password: null, submit: null }));
                  }}
                  className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition pr-10 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="请输入密码（至少6位）"
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-600">记住我</span>
              </label>
              <a href="#" className="text-sm text-blue-600 hover:text-blue-700">
                忘记密码？
              </a>
            </div>

            {/* Submit Error */}
            {errors.submit && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                {errors.submit}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? '登录中...' : '登录'}
            </button>
          </form>

          {/* Register Link */}
          <div className="mt-6 text-center text-sm text-gray-600">
            还没有账户？
            <button
              onClick={goRegister}
              className="text-blue-600 hover:text-blue-700 font-medium ml-1"
            >
              立即注册
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
