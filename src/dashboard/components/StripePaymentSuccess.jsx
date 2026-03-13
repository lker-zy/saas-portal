import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircle, Loader2, Home, Receipt } from 'lucide-react';
import { stripeAPI, STRIPE_STATUS } from '../api/stripe';

/**
 * Stripe 支付成功页面
 *
 * 显示支付成功状态，轮询确认支付完成
 */
export const StripePaymentSuccess = () => {
  const { t } = useTranslation();
  const [status, setStatus] = useState('loading');
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 从 URL 参数获取信息
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get('session_id');
    const type = urlParams.get('type') || sessionStorage.getItem('stripe_type');

    if (!sessionId) {
      setStatus('error');
      setError(t('stripe.noSessionId') || '未找到支付会话信息');
      return;
    }

    // 开始轮询支付状态
    pollPaymentStatus(sessionId, type);
  }, []);

  /**
   * 轮询支付状态
   */
  const pollPaymentStatus = async (sessionId, type) => {
    try {
      const result = await stripeAPI.pollPaymentStatus(sessionId, {
        interval: 2000,
        maxAttempts: 30,
        onStatusChange: (data) => {
          console.log('Payment status:', data);
          setPaymentInfo(data);
        },
      });

      // 支付成功
      setStatus('succeeded');
      setPaymentInfo(result);

      // 清除 sessionStorage
      sessionStorage.removeItem('stripe_session_id');
      sessionStorage.removeItem('stripe_order_id');
      sessionStorage.removeItem('stripe_type');
    } catch (err) {
      console.error('Poll payment status error:', err);
      setStatus('error');
      setError(err.message || t('stripe.statusCheckFailed') || '支付状态查询失败');
    }
  };

  /**
   * 返回首页
   */
  const handleGoHome = () => {
    window.location.href = '/?tab=dashboard';
  };

  /**
   * 查看订单详情
   */
  const handleViewOrder = () => {
    const orderId = sessionStorage.getItem('stripe_order_id');
    window.location.href = `/?tab=orders&orderId=${orderId}`;
  };

  // 加载状态
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-[#635bff] animate-spin mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-700">
            {t('stripe.confirmingPayment') || '正在确认支付状态...'}
          </h2>
          <p className="text-gray-500 mt-2">{t('stripe.pleaseWait') || '请稍候'}</p>
        </div>
      </div>
    );
  }

  // 支付成功状态
  if (status === 'succeeded') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-50 p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center animate-in fade-in">
          {/* 成功图标 */}
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>

          {/* 标题 */}
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {t('stripe.paymentSuccess') || '支付成功'}
          </h1>

          <p className="text-gray-600 mb-6">
            {t('stripe.paymentSuccessMessage') || '您的支付已成功完成'}
          </p>

          {/* 支付详情 */}
          {paymentInfo && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">{t('stripe.amount') || '金额'}:</span>
                <span className="font-semibold">
                  {paymentInfo.currency === 'usd' ? '$' : '¥'}
                  {paymentInfo.amount?.toFixed(2) || paymentInfo.amount}
                </span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">{t('stripe.status') || '状态'}:</span>
                <span className="font-semibold text-green-600">
                  {t('stripe.succeeded') || '支付成功'}
                </span>
              </div>
              {paymentInfo.payment_id && (
                <div className="flex justify-between">
                  <span className="text-gray-600 text-sm">{t('stripe.transactionId') || '交易ID'}:</span>
                  <span className="font-mono text-xs">
                    {paymentInfo.payment_id?.slice(0, 16)}...
                  </span>
                </div>
              )}
            </div>
          )}

          {/* 操作按钮 */}
          <div className="flex gap-3 justify-center">
            <button
              onClick={handleViewOrder}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#635bff] hover:bg-[#7c3aed] text-white font-medium rounded-lg transition-colors"
            >
              <Receipt className="w-4 h-4" />
              <span>{t('stripe.viewOrder') || '查看订单'}</span>
            </button>
            <button
              onClick={handleGoHome}
              className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-lg transition-colors"
            >
              <Home className="w-4 h-4" />
              <span>{t('stripe.backHome') || '返回首页'}</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 错误状态
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center">
        {/* 错误图标 */}
        <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6">
          <CheckCircle className="w-10 h-10 text-red-600" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {t('stripe.statusCheckError') || '状态查询失败'}
        </h1>

        <p className="text-red-600 mb-6">{error}</p>

        <button
          onClick={handleGoHome}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-lg transition-colors"
        >
          <Home className="w-4 h-4" />
          <span>{t('stripe.backHome') || '返回首页'}</span>
        </button>
      </div>
    </div>
  );
};

export default StripePaymentSuccess;
