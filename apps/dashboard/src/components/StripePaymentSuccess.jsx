import React, { useEffect, useState } from 'react';
import { CheckCircle, Receipt } from 'lucide-react';

/**
 * Stripe 支付成功页面
 *
 * 简洁的支付成功页面，显示动画后自动跳转到订单详情
 */
export const StripePaymentSuccess = () => {
  // 版本标识：用于确认代码是否被更新
  const COMPONENT_VERSION = 'v3.0-' + Date.now();
  console.log('[PaymentSuccess ' + COMPONENT_VERSION + '] Component rendering...');

  const [countdown, setCountdown] = useState(3);
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    console.log('[PaymentSuccess] Component mounted');

    // 获取 session_id（用于后续查询订单详情）
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get('session_id');
    console.log('[PaymentSuccess] Session ID:', sessionId);

    // 从 sessionStorage 获取订单ID（在 usePurchaseFlow.js 中保存）
    let pendingOrderId = null;

    try {
      // 尝试多种方法获取 sessionStorage
      if (typeof sessionStorage !== 'undefined') {
        pendingOrderId = sessionStorage.getItem('pending_order_id');
        console.log('[PaymentSuccess] Pending Order ID from sessionStorage:', pendingOrderId);

        // 如果直接读取失败，尝试通过 window.sessionStorage
        if (!pendingOrderId && window.sessionStorage) {
          pendingOrderId = window.sessionStorage.getItem('pending_order_id');
          console.log('[PaymentSuccess] Pending Order ID from window.sessionStorage:', pendingOrderId);
        }
      }
    } catch (error) {
      console.error('[PaymentSuccess] Error reading sessionStorage:', error);
    }

    console.log('[PaymentSuccess] Final pendingOrderId:', pendingOrderId);

    if (pendingOrderId) {
      setOrderId(pendingOrderId);
      console.log('[PaymentSuccess] Order ID state set to:', pendingOrderId);
    } else {
      console.warn('[PaymentSuccess] No pending_order_id found!');
    }

    // 倒计时跳转
    const timer = setInterval(() => {
      setCountdown((prev) => {
        console.log('[PaymentSuccess] Countdown:', prev - 1);
        if (prev <= 1) {
          clearInterval(timer);
          console.log('[PaymentSuccess] Redirecting... pendingOrderId:', pendingOrderId);
          // 跳转到订单详情页面
          if (pendingOrderId) {
            console.log('[PaymentSuccess] Redirecting to order detail:', pendingOrderId);
            window.location.href = `/dashboard?tab=orders&orderId=${pendingOrderId}`;
          } else {
            console.log('[PaymentSuccess] Redirecting to order list (no orderId)');
            // 如果没有订单ID，跳转到订单列表
            window.location.href = '/dashboard?tab=orders';
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
      console.log('[PaymentSuccess] Component unmounted');
    };
  }, []);

  // 立即跳转到订单详情（手动点击按钮）
  const handleGoToOrders = () => {
    console.log('[PaymentSuccess] Manual redirect to order detail');
    if (orderId) {
      window.location.href = `/dashboard?tab=orders&orderId=${orderId}`;
    } else {
      window.location.href = '/dashboard?tab=orders';
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ background: 'linear-gradient(to bottom right, #f0fdf4, #d1fae5, #99f6e4)' }}
    >
      <div className="max-w-md w-full">
        <div className="bg-white rounded-3xl shadow-2xl p-10 text-center">
          {/* 成功图标 */}
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

          {/* 标题 */}
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Stripe 支付成功！
          </h1>

          {/* 说明文字 */}
          <p className="text-gray-600 mb-6 text-lg">
            感谢您的购买，订单正在处理中
          </p>

          {/* 倒计时提示 */}
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
                <span className="font-semibold">{countdown}</span> 秒后自动跳转到订单详情
              </span>
            </div>
          </div>

          {/* 立即查看按钮 */}
          <button
            onClick={handleGoToOrders}
            className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 text-white font-semibold rounded-xl transition-all shadow-lg"
            style={{
              background: 'linear-gradient(to right, #22c55e, #059669)',
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <Receipt className="w-5 h-5" />
            <span>立即查看订单</span>
          </button>
        </div>

        {/* 底部提示 */}
        <p className="text-center text-gray-500 text-sm mt-6">
          如有疑问，请联系客服支持
        </p>
      </div>
    </div>
  );
};

export default StripePaymentSuccess;
