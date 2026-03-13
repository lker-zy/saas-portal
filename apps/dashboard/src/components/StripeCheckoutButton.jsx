import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CreditCard, Loader2 } from 'lucide-react';
import { stripeAPI } from '../api/stripe';

/**
 * Stripe Checkout 支付按钮组件
 *
 * @param {Object} props
 * @param {string} props.type - 支付类型: 'order' | 'recharge'
 * @param {string|number} props.orderId - 订单ID (type='order' 时必填)
 * @param {number} props.amount - 金额
 * @param {string} props.currency - 货币类型 (默认 'usd')
 * @param {Function} props.onSuccess - 支付成功回调
 * @param {Function} props.onCancel - 支付取消回调
 * @param {Function} props.onError - 错误回调
 * @param {string} props.className - 自定义样式类名
 * @param {boolean} props.disabled - 是否禁用
 * @param {React.ReactNode} props.children - 自定义按钮内容
 */
export const StripeCheckoutButton = ({
  type = 'order',
  orderId = null,
  amount = null,
  currency = 'usd',
  onSuccess = null,
  onCancel = null,
  onError = null,
  className = '',
  disabled = false,
  children = null,
}) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  /**
   * 处理支付点击
   */
  const handleCheckout = async () => {
    if (loading || disabled) return;

    // 参数验证
    if (type === 'order' && !orderId) {
      alert(t('stripe.orderIdRequired') || '订单ID不能为空');
      return;
    }

    if (type === 'recharge' && (!amount || amount <= 0)) {
      alert(t('stripe.amountRequired') || '充值金额必须大于0');
      return;
    }

    setLoading(true);

    try {
      // 构建回调URL
      const baseUrl = window.location.origin;
      const successUrl = `${baseUrl}/?tab=finance&status=success&type=${type}`;
      const cancelUrl = `${baseUrl}/?tab=finance&status=cancel&type=${type}`;

      let response;

      if (type === 'order') {
        // 订单支付
        response = await stripeAPI.createCheckoutSession({
          order_id: orderId,
          amount: parseFloat(amount),
          currency: currency,
          success_url: successUrl,
          cancel_url: cancelUrl,
        });
      } else {
        // 余额充值
        response = await stripeAPI.createRechargeSession({
          amount: parseFloat(amount),
          currency: currency,
          success_url: successUrl,
          cancel_url: cancelUrl,
        });
      }

      // 检查响应
      if (response.data?.checkout_url) {
        // 保存 session ID 用于支付成功后验证
        sessionStorage.setItem('stripe_session_id', response.data.session_id);
        if (type === 'order') {
          sessionStorage.setItem('stripe_order_id', orderId);
        }
        sessionStorage.setItem('stripe_type', type);

        // 跳转到 Stripe Checkout
        window.location.href = response.data.checkout_url;
      } else {
        throw new Error(t('stripe.createSessionFailed') || '创建支付会话失败');
      }
    } catch (error) {
      console.error('Stripe checkout error:', error);
      const errorMsg = error.data?.message || error.message || t('stripe.checkoutError') || '发起支付失败';

      if (onError) {
        onError(error);
      } else {
        alert(errorMsg);
      }
    } finally {
      setLoading(false);
    }
  };

  // 默认按钮内容
  const defaultContent = loading ? (
    <>
      <Loader2 className="w-4 h-4 animate-spin" />
      <span>{t('stripe.processing') || '处理中...'}</span>
    </>
  ) : (
    <>
      <CreditCard className="w-4 h-4" />
      <span>{type === 'recharge'
        ? (t('stripe.recharge') || '充值余额')
        : (t('stripe.payWithStripe') || '使用 Stripe 支付')}</span>
    </>
  );

  return (
    <button
      onClick={handleCheckout}
      disabled={disabled || loading}
      className={`
        inline-flex items-center justify-center gap-2 px-6 py-3
        bg-[#635bff] hover:bg-[#7c3aed] text-white
        font-medium rounded-lg
        transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        shadow-lg hover:shadow-xl
        ${className}
      `}
    >
      {children || defaultContent}
    </button>
  );
};

/**
 * Stripe 订单支付按钮（快捷组件）
 */
export const StripePayOrderButton = ({ orderId, ...props }) => {
  return <StripeCheckoutButton type="order" orderId={orderId} {...props} />;
};

/**
 * Stripe 充值按钮（快捷组件）
 */
export const StripeRechargeButton = ({ amount, currency = 'usd', ...props }) => {
  return <StripeCheckoutButton type="recharge" amount={amount} currency={currency} {...props} />;
};

export default StripeCheckoutButton;
