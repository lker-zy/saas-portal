import React from 'react';
import { useTranslation } from 'react-i18next';
import { XCircle, RotateCcw, Home } from 'lucide-react';

/**
 * Stripe 支付取消页面
 *
 * 用户取消 Stripe Checkout 时显示
 */
export const StripePaymentCancel = () => {
  const { t } = useTranslation();

  /**
   * 返回下单页面
   * 从 sessionStorage 中读取保存的标签页信息，返回到下单前的页面
   */
  const handleReturnToPurchase = () => {
    // 返回到下单前的标签页
    const returnTab = sessionStorage.getItem('stripe_return_tab') || 'buy_static_isp';
    window.location.href = `/dashboard?tab=${returnTab}`;
  };

  /**
   * 重试支付
   */
  const handleRetry = () => {
    // 返回上一页或订单页
    const type = sessionStorage.getItem('stripe_type');
    if (type === 'recharge') {
      window.location.href = '/?tab=finance';
    } else {
      window.location.href = '/?tab=orders';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-amber-50 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center animate-in fade-in">
        {/* 取消图标 */}
        <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-100 rounded-full mb-6">
          <XCircle className="w-10 h-10 text-orange-600" />
        </div>

        {/* 标题 */}
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {t('stripe.paymentCanceled') || '支付已取消'}
        </h1>

        {/* 说明文字 */}
        <p className="text-gray-600 mb-6">
          {t('stripe.paymentCanceledMessage') || '您已取消支付。订单将被保留，您可以稍后继续完成支付。'}
        </p>

        {/* 帮助信息 */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-left">
          <p className="text-sm text-blue-800">
            <strong>{t('stripe.needHelp') || '需要帮助？'}</strong>
          </p>
          <ul className="text-sm text-blue-700 mt-2 space-y-1 list-disc list-inside">
            <li>{t('stripe.tryAgain') || '您可以稍后重新发起支付'}</li>
            <li>{t('stripe.supportContact') || '如有问题请联系客服'}</li>
            <li>{t('stripe.orderReserved') || '订单将被保留30分钟'}</li>
          </ul>
        </div>

        {/* 操作按钮 */}
        <div className="flex gap-3 justify-center">
          <button
            onClick={handleRetry}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#635bff] hover:bg-[#7c3aed] text-white font-medium rounded-lg transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>{t('stripe.retryPayment') || '重新支付'}</span>
          </button>
          <button
            onClick={handleReturnToPurchase}
            className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-lg transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>{t('stripe.backToPurchase') || '返回购买页'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StripePaymentCancel;
