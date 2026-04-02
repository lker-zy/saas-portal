import axios from './axiosConfig';

/**
 * Order服务API客户端
 * 端口: 8889
 * 提供: 订单创建、支付、查询、价格计算等功能
 */
export const orderAPI = {
  // ==================== 订单相关 ====================

  /**
   * 查询订单列表
   * @param {Object} filters - 查询条件
   * @param {number} filters.page - 页码
   * @param {number} filters.pageSize - 每页数量
   * @param {string} filters.status - 订单状态（可选）
   * @returns {Promise} { orders: Array, total: number, page: number, pageSize: number }
   */
  getOrders: (filters) =>
    axios.post('/order/internal/client/list', filters),

  /**
   * 查询订单详情
   * @param {number} orderId - 订单ID
   * @returns {Promise} { order: Object }
   */
  getOrderDetail: (orderId) =>
    axios.get('/order/internal/client/detail', {
      params: { order_id: orderId },
    }),

  /**
   * 创建订单
   * @param {Object} orderData - 订单数据
   * @param {string} orderData.country - 国家
   * @param {string} orderData.scenario - 场景
   * @param {string} orderData.ip_level - IP等级
   * @param {string} orderData.bandwidth_traffic - 带宽/流量
   * @param {string} orderData.purchase_time - 购买时间
   * @param {string} orderData.expire_time - 过期时间
   * @returns {Promise} { order: Object, balance: number }
   */
  createOrder: (orderData) =>
    axios.post('/order/internal/client/create', orderData),

  /**
   * 支付订单
   * @param {number} orderId - 订单ID
   * @param {string} paymentMethod - 支付方式（balance, alipay, wechat等）
   * @param {Object} options - 支付选项
   * @param {string} options.cancel_url - 取消支付时的回调URL
   * @param {string} options.success_url - 支付成功时的回调URL
   * @returns {Promise} { success: boolean, message: string, balance: number }
   */
  payOrder: (orderId, paymentMethod, options = {}) =>
    axios.post('/order/internal/pay', {
      order_id: orderId,
      payment_method: paymentMethod,
      cancel_url: options.cancel_url,
      success_url: options.success_url,
    }),

  /**
   * 申请订单（激活订单）
   * @param {number} orderId - 订单ID
   * @returns {Promise} { success: boolean, message: string }
   */
  applyOrder: (orderId) =>
    axios.post('/order/internal/apply', {
      order_id: orderId,
    }),

  /**
   * 获取订单的代理节点列表
   * @param {number} orderId - 订单ID
   * @returns {Promise} { proxy_nodes: Array, total_ips: number, protocols: Array, country: string }
   */
  getProxyNodes: (orderId) =>
    axios.get('/order/internal/client/proxy-nodes', {
      params: { order_id: orderId },
    }),

  // ==================== 资源相关 ====================

  /**
   * 查询可选国家列表
   * @returns {Promise} { countries: Array<string> }
   */
  getCountries: () =>
    axios.get('/order/internal/client/countries'),

  /**
   * 查询场景列表
   * @returns {Promise} { scenarios: Array<Object> }
   */
  getScenarios: () =>
    axios.get('/order/internal/client/scenarios'),

  /**
   * 查询库存
   * @param {string} country - 国家代码
   * @returns {Promise} { stock: number, country: string }
   */
  getStock: (country) =>
    axios.get('/order/internal/client/stock', {
      params: { country },
    }),

  // ==================== 价格计算 ====================

  /**
   * 计算订单价格
   * @param {Object} params - 计算参数
   * @param {string} params.country - 国家
   * @param {string} params.scenario - 场景
   * @param {string} params.ip_level - IP等级
   * @param {string} params.bandwidth_traffic - 带宽/流量
   * @param {number} params.duration_days - 购买天数
   * @returns {Promise} { price: number, originalPrice: number, discount: number }
   */
  calculatePrice: (params) =>
    axios.post('/order/internal/client/calculate-price', params),

  /**
   * 查询折扣信息
   * @param {Object} params - 折扣查询参数
   * @param {string} params.orderType - 订单类型
   * @param {string} params.country - 国家
   * @param {string} params.scenario - 场景
   * @param {number} params.amount - 订单原价
   * @param {number} params.quantity - 数量
   * @param {number} params.duration - 购买时长（天）
   * @param {string} params.couponCode - 优惠券代码（可选）
   * @returns {Promise} { originalAmount, finalAmount, totalDiscount, discounts, appliedDiscounts }
   */
  getDiscount: (params) =>
    axios.post('/order/client/products/discount', params),

  // ==================== 售后工单 ====================

  /**
   * 创建售后工单
   * @param {Object} ticketData - 工单数据
   * @param {string} ticketData.order_id - 订单编号
   * @param {string} ticketData.problem_type - 问题类型
   * @param {string} ticketData.problem_desc - 问题描述
   * @returns {Promise} { after_sale_id: string, id: number }
   */
  createAfterSaleTicket: (ticketData) =>
    axios.post('/order/internal/after-sale/create', ticketData),

  /**
   * 查询售后工单列表
   * @param {Object} filters - 查询条件
   * @param {number} filters.page - 页码
   * @param {number} filters.page_size - 每页数量
   * @returns {Promise} { list: Array, total: number }
   */
  getAfterSaleTickets: (filters) =>
    axios.post('/order/internal/after-sale/list', filters),

  // ==================== 订阅/自动续费 ====================

  /**
   * 获取订单订阅信息
   * @param {number} orderId - 订单ID
   * @returns {Promise} { auto_renew_enabled, renew_duration_days, next_renew_at, subscription_id, last_renewed_at }
   */
  getSubscriptionInfo: (orderId) =>
    axios.get('/order/subscription/info', {
      params: { order_id: orderId },
    }),

  /**
   * 开启自动续费
   * @param {number} orderId - 订单ID
   * @param {number} renewDurationDays - 续费周期（天数）
   * @returns {Promise} { success, message, auto_renew, next_renew_at }
   */
  enableAutoRenew: (orderId, renewDurationDays = 30) => {
    // 确保 orderId 是数字类型
    const numericOrderId = typeof orderId === 'string' ? parseInt(orderId) : orderId;
    console.log('[orderAPI.enableAutoRenew] orderId:', orderId, '-> numericOrderId:', numericOrderId, 'type:', typeof numericOrderId);

    return axios.post('/order/subscription/enable', {
      order_id: numericOrderId,
      renew_duration_days: renewDurationDays,
    });
  },

  /**
   * 关闭自动续费
   * @param {number} orderId - 订单ID
   * @param {string} subscriptionId - 第三方订阅ID（可选）
   * @returns {Promise} { success, message, auto_renew }
   */
  disableAutoRenew: (orderId, subscriptionId) => {
    // 确保 orderId 是数字类型
    const numericOrderId = typeof orderId === 'string' ? parseInt(orderId) : orderId;
    console.log('[orderAPI.disableAutoRenew] orderId:', orderId, '-> numericOrderId:', numericOrderId, 'type:', typeof numericOrderId);

    return axios.post('/order/subscription/disable', {
      order_id: numericOrderId,
      subscription_id: subscriptionId,
    });
  },

  // ==================== 订单关闭 ====================

  /**
   * 关闭订单
   * @param {number} orderId - 订单ID
   * @param {Object} options - 关闭选项
   * @param {string} options.closeType - 关闭类型: cancel(用户取消), close(到期关闭/违规关闭)
   * @param {string} options.closeReason - 关闭原因
   * @param {boolean} options.forceClose - 是否强制关闭（跳过状态检查）
   * @returns {Promise} { success, message, order_id, previous_status, new_status, deleted_proxy_nodes, released_ips, affected_nodes, config_version }
   */
  closeOrder: (orderId, options = {}) => {
    const numericOrderId = typeof orderId === 'string' ? parseInt(orderId) : orderId;
    console.log('[orderAPI.closeOrder] orderId:', orderId, '-> numericOrderId:', numericOrderId, 'options:', options);

    return axios.post('/order/internal/close', {
      order_id: numericOrderId,
      close_type: options.closeType || 'close',
      close_reason: options.closeReason || 'user_request',
      force_close: options.forceClose || false,
    });
  },
};

export default orderAPI;
