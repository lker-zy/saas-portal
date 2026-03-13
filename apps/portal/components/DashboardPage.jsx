import React, { useState, useEffect } from 'react';

function DashboardPage() {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    // 从 localStorage 获取用户信息
    const savedUserInfo = localStorage.getItem('userInfo');
    if (savedUserInfo) {
      try {
        setUserInfo(JSON.parse(savedUserInfo));
      } catch (e) {
        console.error('解析用户信息失败:', e);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userInfo');
    window.location.href = '/login';
  };

  const goToPurchase = () => {
    window.location.href = '/?tab=purchase';
  };

  const goHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">用户中心</h1>
              <p className="text-gray-600 mt-1">
                {userInfo?.email || '欢迎回来'}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              退出登录
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {/* Purchase Card */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition cursor-pointer" onClick={goToPurchase}>
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">购买产品</h3>
                <p className="text-gray-600 text-sm">浏览并购买代理产品</p>
              </div>
            </div>
          </div>

          {/* Home Card */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition cursor-pointer" onClick={goHome}>
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">返回首页</h3>
                <p className="text-gray-600 text-sm">查看产品介绍</p>
              </div>
            </div>
          </div>

          {/* Account Info Card */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg">
                <svg className="w-8 h-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">账户信息</h3>
                <p className="text-gray-600 text-sm">查看账户详情</p>
              </div>
            </div>
          </div>
        </div>

        {/* User Info Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">账户详情</h2>
          {userInfo ? (
            <div className="space-y-3">
              <div className="flex border-b pb-3">
                <span className="text-gray-600 w-32">邮箱:</span>
                <span className="text-gray-900">{userInfo.email || 'N/A'}</span>
              </div>
              <div className="flex border-b pb-3">
                <span className="text-gray-600 w-32">用户ID:</span>
                <span className="text-gray-900">{userInfo.id || userInfo.userId || 'N/A'}</span>
              </div>
              <div className="flex">
                <span className="text-gray-600 w-32">状态:</span>
                <span className="text-green-600">已激活</span>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">无法加载用户信息</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
