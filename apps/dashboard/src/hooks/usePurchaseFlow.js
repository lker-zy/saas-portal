import { useState } from 'react';
import { orderService } from '../services/orderService';

/**
 * 购买流程Hook
 * 处理订单创建和支付的完整流程
 */
export const usePurchaseFlow = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [error, setError] = useState(null);

  /**
   * 执行购买流程
   * @param {Object} orderData - 订单数据
   * @param {string} paymentMethod - 支付方式
   * @param {Function} onSuccess - 成功回调
   * @param {Function} onError - 错误回调
   */
  const executePurchase = async (orderData, paymentMethod = 'balance', onSuccess, onError) => {
    setIsProcessing(true);
    setError(null);

    try {
      // 步骤1: 创建订单
      console.log('Creating order with data:', orderData);
      const createResult = await orderService.createOrder(orderData);

      if (!createResult.success) {
        setError(createResult.message || '创建订单失败');
        if (onError) onError(createResult.message);
        return { success: false, error: createResult.message };
      }

      const orderId = createResult.data.order_id;
      console.log('Order created successfully, order_id:', orderId);
      setCurrentOrder({ orderId, ...createResult.data });

      // 检查后端是否已经处理了支付和部署（余额支付时后端会自动处理）
      const isPaymentHandled = createResult.data.payment?.success;
      const isDeploymentHandled = createResult.data.deployment?.success;

      console.log('Backend handled payment:', isPaymentHandled, 'deployment:', isDeploymentHandled);

      // 步骤2: 支付订单（仅当后端未处理时）
      let payResult = createResult.data.payment;
      if (!isPaymentHandled) {
        console.log('Paying order:', orderId, 'with method:', paymentMethod);
        const payResponse = await orderService.payOrder(orderId, paymentMethod);

        if (!payResponse.success) {
          setError(payResponse.message || '支付失败');
          if (onError) onError(payResponse.message);
          return { success: false, error: payResponse.message };
        }
        payResult = payResponse.data;
        console.log('Payment response:', payResult);

        // 处理 Stripe 支付：跳转到 Stripe Checkout
        if (paymentMethod.startsWith('stripe') && payResult?.checkout_url) {
          console.log('Redirecting to Stripe Checkout:', payResult.checkout_url);

          // 保存订单信息用于支付成功后验证
          sessionStorage.setItem('pending_order_id', orderId);
          sessionStorage.setItem('pending_order_no', createResult.data.order_no);

          // 保存来源页面信息，用于支付取消后返回
          const currentUrl = new URL(window.location.href);
          const currentTab = currentUrl.searchParams.get('tab') || 'dashboard';
          sessionStorage.setItem('stripe_return_tab', currentTab);

          // 直接跳转到 Stripe Checkout
          window.location.href = payResult.checkout_url;
          return { success: true, redirecting: true, checkoutUrl: payResult.checkout_url };
        }

        console.log('Payment successful');
        setCurrentOrder({ ...currentOrder, paymentStatus: 'paid' });
      } else {
        console.log('Payment already handled by backend');
      }

      // 步骤3: 激活订单（仅余额支付且后端未处理时）
      // 支付方式可能是 "balance" 或 "balance:xxx" 格式
      /*
      const isBalancePayment = paymentMethod === 'balance' || paymentMethod.startsWith('balance:');
      if (isBalancePayment && !isDeploymentHandled) {
        console.log('Applying order:', orderId);
        const applyResult = await orderService.applyOrder(orderId);

        if (applyResult.success) {
          console.log('Order applied successfully');
          setCurrentOrder({ ...currentOrder, status: 'active' });
        } else {
          console.warn('Order apply failed, but payment succeeded:', applyResult.message);
        }
      } else if (isDeploymentHandled) {
        console.log('Deployment already handled by backend');
      }
      */

      // 成功回调
      if (onSuccess) {
        onSuccess({
          orderId,
          orderNo: createResult.data.order_no,
          amount: createResult.data.amount,
          actualPay: createResult.data.actual_pay,
        });
      }

      return { success: true, data: createResult.data };
    } catch (err) {
      console.error('Purchase flow error:', err);
      const errorMsg = err.message || '购买流程失败，请稍后重试';
      setError(errorMsg);
      if (onError) onError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setIsProcessing(false);
    }
  };

  /**
   * 重置状态
   */
  const reset = () => {
    setIsProcessing(false);
    setCurrentOrder(null);
    setError(null);
  };

  return {
    isProcessing,
    currentOrder,
    error,
    executePurchase,
    reset,
  };
};

export default usePurchaseFlow;
