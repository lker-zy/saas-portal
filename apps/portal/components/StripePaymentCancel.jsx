import React from 'react';
import { XCircle, Home, RotateCcw } from 'lucide-react';

/**
 * Stripe 支付取消页面
 */
export const StripePaymentCancel = () => {
  const handleReturnToDashboard = () => {
    // 检查是否从订单详情页发起的支付
    const paymentSource = sessionStorage.getItem('payment_source');
    const returnOrderId = sessionStorage.getItem('payment_return_order_id');

    console.log('[StripePaymentCancel] paymentSource:', paymentSource);
    console.log('[StripePaymentCancel] returnOrderId:', returnOrderId);

    if (paymentSource === 'order_detail' && returnOrderId) {
      // 从订单详情页发起的支付，返回订单详情页
      console.log('[StripePaymentCancel] 返回订单详情页, orderId:', returnOrderId);
      window.location.href = `/dashboard?tab=orders&orderId=${returnOrderId}`;
    } else if (paymentSource === 'purchase') {
      // 从购买页发起的支付，返回对应的购买页面
      const returnTab = sessionStorage.getItem('stripe_return_tab') || 'buy_static_isp';
      console.log('[StripePaymentCancel] 返回购买页, tab:', returnTab);
      // 判断是否是 portal 的购买页（purchase tab）还是 dashboard 的购买页
      if (returnTab === 'purchase') {
        window.location.href = `/?tab=purchase`;
      } else {
        window.location.href = `/dashboard?tab=${returnTab}`;
      }
    } else {
      // 默认返回到 dashboard 的购买页面
      const returnTab = sessionStorage.getItem('stripe_return_tab') || 'buy_static_isp';
      console.log('[StripePaymentCancel] 返回购买页, tab:', returnTab);
      window.location.href = `/dashboard?tab=${returnTab}`;
    }
  };

  const handleRetry = () => {
    // 检查是否从订单详情页发起的支付
    const paymentSource = sessionStorage.getItem('payment_source');
    const returnOrderId = sessionStorage.getItem('payment_return_order_id');
    const type = sessionStorage.getItem('stripe_type');

    console.log('[StripePaymentCancel] handleRetry - paymentSource:', paymentSource);

    if (paymentSource === 'order_detail' && returnOrderId) {
      // 从订单详情页发起的支付，返回订单详情页
      window.location.href = `/dashboard?tab=orders&orderId=${returnOrderId}`;
    } else if (paymentSource === 'purchase') {
      // 从购买页发起的支付，返回对应的购买页面
      const returnTab = sessionStorage.getItem('stripe_return_tab') || 'buy_static_isp';
      if (returnTab === 'purchase') {
        window.location.href = `/?tab=purchase`;
      } else {
        window.location.href = `/dashboard?tab=${returnTab}`;
      }
    } else if (type === 'recharge') {
      window.location.href = '/?tab=finance';
    } else {
      // 返回到 dashboard 的购买页面重新支付
      const returnTab = sessionStorage.getItem('stripe_return_tab') || 'buy_static_isp';
      window.location.href = `/dashboard?tab=${returnTab}`;
    }
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
              <span>继续支付</span>
            </button>
            <button
              onClick={handleReturnToDashboard}
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 font-semibold rounded-xl transition-all"
            >
              <Home className="w-4 h-4" />
              <span>返回</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StripePaymentCancel;
