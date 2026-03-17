import React from 'react';
import { XCircle, Home, RotateCcw } from 'lucide-react';

/**
 * Stripe 支付取消页面
 */
export const StripePaymentCancel = () => {
  const handleGoHome = () => {
    window.location.href = '/';
  };

  const handleRetry = () => {
    window.location.href = '/?tab=purchase';
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ background: 'linear-gradient(to bottom right, #fff7ed, #ffedd5, #fed7aa)' }}
    >
      <div className="max-w-md w-full">
        <div className="bg-white rounded-3xl shadow-2xl p-10 text-center">
          <div className="relative inline-block mb-8">
            <div
              className="relative inline-flex items-center justify-center w-24 h-24 rounded-full shadow-lg"
              style={{
                background: 'linear-gradient(to bottom right, #fb923c, #f97316)',
              }}
            >
              <XCircle className="w-14 h-14 text-white" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            支付已取消
          </h1>

          <p className="text-gray-600 mb-6 text-lg">
            您已取消支付。您可以稍后继续完成支付。
          </p>

          <div
            className="rounded-xl p-4 mb-6 border text-left"
            style={{
              backgroundColor: '#eff6ff',
              borderColor: '#bfdbfe',
              color: '#1e40af',
            }}
          >
            <p className="text-sm font-semibold mb-2">需要帮助？</p>
            <ul className="text-sm space-y-1 list-disc list-inside">
              <li>您可以稍后重新发起支付</li>
              <li>如有问题请联系客服</li>
              <li>订单将被保留30分钟</li>
            </ul>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleRetry}
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 text-white font-semibold rounded-xl transition-all shadow-lg"
              style={{
                background: 'linear-gradient(to right, #635bff, #7c3aed)',
              }}
            >
              <RotateCcw className="w-4 h-4" />
              <span>重新支付</span>
            </button>
            <button
              onClick={handleGoHome}
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 font-semibold rounded-xl transition-all"
            >
              <Home className="w-4 h-4" />
              <span>返回首页</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StripePaymentCancel;
