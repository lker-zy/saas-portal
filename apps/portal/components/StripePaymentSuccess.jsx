import React, { useEffect, useState } from 'react';
import { CheckCircle, Receipt } from 'lucide-react';

/**
 * Stripe 支付成功页面
 */
export const StripePaymentSuccess = () => {
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    console.log('[PaymentSuccess] Component mounted');

    // 清除表单状态（支付成功后不需要保留）
    sessionStorage.removeItem('purchase_form_state');
    console.log('[PaymentSuccess] Form state cleared');

    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get('session_id');
    console.log('[PaymentSuccess] Session ID:', sessionId);

    // 存储 session_id 用于后续查询
    if (sessionId) {
      sessionStorage.setItem('stripe_session_id', sessionId);
    }

    const timer = setInterval(() => {
      setCountdown((prev) => {
        console.log('[PaymentSuccess] Countdown:', prev - 1);
        if (prev <= 1) {
          clearInterval(timer);
          console.log('[PaymentSuccess] Redirecting to dashboard orders...');
          // 跳转到 dashboard 的订单页面
          window.location.href = '/dashboard?tab=orders';
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const handleGoToOrders = () => {
    console.log('[PaymentSuccess] Manual redirect to dashboard orders');
    window.location.href = '/dashboard?tab=orders';
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ background: 'linear-gradient(to bottom right, #f0fdf4, #d1fae5, #99f6e4)' }}
    >
      <div className="max-w-md w-full">
        <div className="bg-white rounded-3xl shadow-2xl p-10 text-center">
          <div className="relative inline-block mb-8">
            <div
              className="relative inline-flex items-center justify-center w-24 h-24 rounded-full shadow-lg"
              style={{
                background: 'linear-gradient(to bottom right, #4ade80, #10b981)',
              }}
            >
              <CheckCircle className="w-14 h-14 text-white" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            支付成功！
          </h1>

          <p className="text-gray-600 mb-6 text-lg">
            感谢您的购买，订单正在处理中
          </p>

          <div
            className="rounded-xl p-4 mb-6 border"
            style={{
              backgroundColor: '#f0fdf4',
              borderColor: '#bbf7d0',
              color: '#15803d',
            }}
          >
            <div className="flex items-center justify-center gap-2">
              <Receipt className="w-5 h-5" />
              <span className="text-sm">
                <span className="font-semibold">{countdown}</span> 秒后自动跳转到订单列表
              </span>
            </div>
          </div>

          <button
            onClick={handleGoToOrders}
            className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 text-white font-semibold rounded-xl transition-all shadow-lg"
            style={{
              background: 'linear-gradient(to right, #22c55e, #059669)',
            }}
          >
            <Receipt className="w-5 h-5" />
            <span>立即查看订单</span>
          </button>
        </div>

        <p className="text-center text-gray-500 text-sm mt-6">
          如有疑问，请联系客服支持
        </p>
      </div>
    </div>
  );
};

export default StripePaymentSuccess;
