import axios from './axiosConfig';

/**
 * Stripe Payment API 客户端
 * 与后端 Payment 服务 (端口 8892) 对接
 *
 * 功能：
 * - 创建 Stripe Checkout 会话
 * - 查询支付状态
 * - 创建充值会话
 * - 轮询支付状态
 */

/**
 * Stripe Payment API
 */
export const stripeAPI = {
  /**
   * 创建 Stripe Checkout 会话（用于订单支付）
   * @param {Object} params - 创建参数
   * @param {string} params.order_id - 订单ID
   * @param {number} params.amount - 金额
   * @param {string} params.currency - 货币类型 (usd, cny, eur)
   * @param {string} params.success_url - 支付成功跳转URL
   * @param {string} params.cancel_url - 支付取消跳转URL
   * @returns {Promise<{checkout_url: string, session_id: string}>}
   */
  createCheckoutSession: (params) => {
    return axios.post('/payment/checkout', params);
  },

  /**
   * 创建 Stripe Payment Intent（用于直接支付）
   * @param {Object} params - 创建参数
   * @param {string} params.order_id - 订单ID
   * @param {number} params.amount - 金额
   * @param {string} params.currency - 货币类型
   * @returns {Promise<{client_secret: string, payment_id: string}>}
   */
  createPaymentIntent: (params) => {
    return axios.post('/payment/intent', params);
  },

  /**
   * 查询支付状态
   * @param {string} transactionId - 交易ID（PaymentIntent ID 或 Session ID）
   * @returns {Promise<{status: string, amount: number, currency: string}>}
   */
  getPaymentStatus: (transactionId) => {
    return axios.get(`/payment/${transactionId}`);
  },

  /**
   * 创建余额充值会话
   * @param {Object} params - 充值参数
   * @param {number} params.amount - 充值金额
   * @param {string} params.currency - 货币类型 (默认 usd)
   * @param {string} params.success_url - 支付成功跳转URL
   * @param {string} params.cancel_url - 支付取消跳转URL
   * @returns {Promise<{checkout_url: string, session_id: string}>}
   */
  createRechargeSession: (params) => {
    return axios.post('/payment/recharge', params);
  },

  /**
   * 查询充值详情
   * @param {string} rechargeId - 充值ID
   * @returns {Promise<{recharge: Object}>}
   */
  getRecharge: (rechargeId) => {
    return axios.get(`/payment/recharge/${rechargeId}`);
  },

  /**
   * 查询充值历史
   * @param {Object} filters - 查询条件
   * @param {number} filters.page - 页码
   * @param {number} filters.pageSize - 每页数量
   * @returns {Promise<{recharges: Array, total: number}>}
   */
  listRecharges: (filters) => {
    return axios.get('/payment/recharges', {
      params: filters,
    });
  },

  /**
   * 轮询支付状态
   * @param {string} transactionId - 交易ID
   * @param {Object} options - 轮询选项
   * @param {number} options.interval - 轮询间隔（毫秒），默认2000
   * @param {number} options.maxAttempts - 最大尝试次数，默认30
   * @param {Function} options.onStatusChange - 状态变化回调
   * @returns {Promise<Object>} 最终支付状态
   */
  pollPaymentStatus: async (
    transactionId,
    { interval = 2000, maxAttempts = 30, onStatusChange } = {}
  ) => {
    let attempts = 0;

    while (attempts < maxAttempts) {
      try {
        const result = await stripeAPI.getPaymentStatus(transactionId);

        // 触发状态变化回调
        if (onStatusChange && result.data) {
          onStatusChange(result.data);
        }

        // 检查支付是否完成
        const status = result.data?.status;
        if (
          status === 'succeeded' ||
          status === 'failed' ||
          status === 'canceled'
        ) {
          return result.data;
        }

        // 等待后重试
        await new Promise((resolve) => setTimeout(resolve, interval));
        attempts++;
      } catch (error) {
        console.error('Poll payment status error:', error);
        // 等待后重试
        await new Promise((resolve) => setTimeout(resolve, interval));
        attempts++;
      }
    }

    throw new Error('支付状态查询超时');
  },
};

/**
 * Stripe 支付状态枚举
 */
export const STRIPE_STATUS = {
  PENDING: 'pending',           // 待处理
  PROCESSING: 'processing',     // 处理中
  SUCCEEDED: 'succeeded',       // 支付成功
  FAILED: 'failed',             // 支付失败
  CANCELED: 'canceled',         // 已取消
  REQUIRES_ACTION: 'requires_action',  // 需要操作
};

export default stripeAPI;
