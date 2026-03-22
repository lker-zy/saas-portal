import axios from './axiosConfig';

/**
 * Client服务API客户端
 * 端口: 8081
 * 提供: 用户注册、登录、个人信息、余额管理等功能
 */
export const clientAPI = {
  // ==================== 认证相关 ====================

  /**
   * 用户登录
   * @param {string} email - 用户邮箱
   * @param {string} password - 用户密码
   * @returns {Promise} { accessToken: string, user: Object }
   */
  login: (email, password) =>
    axios.post('/client/login', { email, password }),

  /**
   * 用户注册
   * @param {Object} data - 注册数据
   * @param {string} data.email - 邮箱
   * @param {string} data.password - 密码
   * @param {string} data.nickname - 昵称（可选）
   * @param {string} data.phone - 手机号（可选）
   * @param {string} data.invitationCode - 邀请码（可选）
   * @returns {Promise}
   */
  register: (data) =>
    axios.post('/client/register', data),

  /**
   * 发送验证码
   * @param {string} email - 邮箱地址
   * @returns {Promise}
   */
  sendVerificationCode: (email) =>
    axios.post('/client/send-verification-code', { email }),

  // ==================== 个人信息相关 ====================

  /**
   * 获取当前登录用户信息
   * @returns {Promise} { user: Object }
   */
  getProfile: () =>
    axios.get('/client/profile'),

  /**
   * 更新用户资料
   * @param {Object} data - 更新数据
   * @param {string} data.nickname - 昵称
   * @param {string} data.phone - 手机号
   * @returns {Promise}
   */
  updateProfile: (data) =>
    axios.put('/client/profile', data),

  /**
   * 修改密码
   * @param {string} oldPassword - 旧密码
   * @param {string} newPassword - 新密码
   * @returns {Promise}
   */
  changePassword: (oldPassword, newPassword) =>
    axios.put('/client/password', {
      oldPassword,
      newPassword,
    }),

  // ==================== 余额管理相关 ====================

  /**
   * 查询当前余额
   * @returns {Promise} { balance: number, lastUpdated: string }
   */
  getBalance: () =>
    axios.get('/client/balance'),

  /**
   * 查询余额变动历史
   * @param {Object} params - 查询参数
   * @param {number} params.page - 页码
   * @param {number} params.pageSize - 每页数量
   * @param {string} params.startDate - 开始日期（可选）
   * @param {string} params.endDate - 结束日期（可选）
   * @returns {Promise} { transactions: Array, total: number, page: number, pageSize: number }
   */
  getBalanceTransactions: (params) =>
    axios.get('/client/balance/transactions', { params }),

  /**
   * 充值（预留接口）
   * @param {number} amount - 充值金额
   * @param {string} paymentMethod - 支付方式（alipay, wechat等）
   * @returns {Promise} { transactionId: string, paymentUrl: string, amount: number }
   */
  recharge: (amount, paymentMethod) =>
    axios.post('/client/balance/recharge', {
      amount,
      paymentMethod,
    }),

  // ==================== 优惠券相关 ====================

  /**
   * 获取当前用户的优惠券列表
   * @returns {Promise} { total: number, data: Array }
   */
  getCoupons: () =>
    axios.get('/client/coupons'),

  /**
   * 验证优惠券代码
   * @param {string} code - 优惠券代码
   * @param {number} amount - 订单金额
   * @returns {Promise} { valid: boolean, canUse: boolean, discountAmount: number, ... }
   */
  validateCoupon: (code, amount = 0) =>
    axios.post('/client/coupons/validate', { code, amount }),

  /**
   * 兑换优惠券代码
   * @param {string} code - 优惠券代码
   * @returns {Promise}
   */
  redeemCoupon: (code) =>
    axios.post('/client/coupons/redeem', { code }),
};

export default clientAPI;
