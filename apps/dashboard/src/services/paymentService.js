/**
 * Payment Service
 * Encapsulates payment methods and payment-related business logic
 */

// 支付方式配置数据
const PAYMENT_METHODS = [
  {
    id: 'stripe',
    name: '银行卡',
    iconType: 'card',
    brandColor: '#1A73E8',
    bgActive: 'border-blue-400 bg-blue-50/50 ring-2 ring-blue-100',
    description: 'Visa、Mastercard、American Express'
  },
  {
    id: 'wechat',
    name: '微信支付',
    iconType: 'wechat',
    brandColor: '#07C160',
    bgActive: 'border-green-400 bg-green-50/50 ring-2 ring-green-100',
    description: 'WeChat Pay · 安全快捷'
  },
  {
    id: 'alipay',
    name: '支付宝',
    iconType: 'alipay',
    brandColor: '#1677FF',
    bgActive: 'border-blue-400 bg-blue-50/50 ring-2 ring-blue-100',
    description: 'Alipay · 全球信赖'
  },
  {
    id: 'usdt',
    name: 'USDT',
    iconType: 'usdt',
    brandColor: '#26A17B',
    bgActive: 'border-emerald-400 bg-emerald-50/50 ring-2 ring-emerald-100',
    description: '稳定币 · 去中心化支付'
  },
];

// 余额支付配置（不作为独立支付方式，用于 renderPaymentFooter）
export const BALANCE_PAYMENT_CONFIG = {
  id: 'balance',
  name: '余额支付',
  iconType: 'wallet',
  brandColor: '#10B981',
  description: '使用账户余额支付'
};

// USDT 支持的网络
const USDT_NETWORKS = [
  { id: 'TRC20', name: 'TRC20', fee: '1 USDT', minAmount: 10 },
  { id: 'ERC20', name: 'ERC20', fee: '5 USDT', minAmount: 10 },
  { id: 'BSC', name: 'BSC (BEP20)', fee: '0.5 USDT', minAmount: 10 },
  { id: 'OMNI', name: 'OMNI', fee: '10 USDT', minAmount: 50 },
];

/**
 * Payment Service
 */
export const paymentService = {
  /**
   * 获取所有支付方式
   * @returns {Array<Object>} 支付方式列表
   */
  getPaymentMethods() {
    return PAYMENT_METHODS;
  },

  /**
   * 根据 ID 获取支付方式
   * @param {string} methodId - 支付方式ID
   * @returns {Object|null} 支付方式对象
   */
  getPaymentMethodById(methodId) {
    return PAYMENT_METHODS.find(m => m.id === methodId) || null;
  },

  /**
   * 获取 USDT 支持的网络列表
   * @returns {Array<Object>} USDT网络列表
   */
  getUsdtNetworks() {
    return USDT_NETWORKS;
  },

  /**
   * 根据 ID 获取 USDT 网络
   * @param {string} networkId - 网络ID
   * @returns {Object|null} 网络对象
   */
  getUsdtNetworkById(networkId) {
    return USDT_NETWORKS.find(n => n.id === networkId) || null;
  },

  /**
   * 检查支付方式是否可用
   * @param {string} methodId - 支付方式ID
   * @param {number} amount - 支付金额
   * @param {Object} userBalance - 用户余额 { balance: number, currency: string }
   * @returns {Object} { available: boolean, reason?: string }
   */
  isPaymentMethodAvailable(methodId, amount, userBalance = null) {
    const method = this.getPaymentMethodById(methodId);
    if (!method) {
      return { available: false, reason: '支付方式不存在' };
    }

    if (methodId === 'balance') {
      if (!userBalance) {
        return { available: false, reason: '未获取到余额信息' };
      }
      if (userBalance.balance < amount) {
        return { available: false, reason: '余额不足' };
      }
    }

    return { available: true };
  },

  /**
   * 获取推荐支付方式
   * @param {number} amount - 支付金额
   * @param {Object} userBalance - 用户余额
   * @returns {string} 推荐的支付方式ID
   */
  getRecommendedPaymentMethod(amount, userBalance = null) {
    // 如果余额足够，推荐使用余额支付
    if (userBalance && userBalance.balance >= amount) {
      return 'balance';
    }
    // 否则推荐 Stripe
    return 'stripe';
  },

  /**
   * 计算支付手续费
   * @param {string} methodId - 支付方式ID
   * @param {number} amount - 支付金额
   * @param {string} usdtNetwork - USDT网络（仅当methodId为usdt时需要）
   * @returns {number} 手续费金额
   */
  calculateFee(methodId, amount, usdtNetwork = null) {
    if (methodId === 'balance' || methodId === 'stripe') {
      return 0; // 余额和Stripe无手续费
    }

    if (methodId === 'usdt' && usdtNetwork) {
      const network = this.getUsdtNetworkById(usdtNetwork);
      if (network) {
        const feeMatch = network.fee.match(/([\d.]+)\s*USDT/);
        if (feeMatch) {
          return parseFloat(feeMatch[1]);
        }
      }
    }

    return 0;
  },

  /**
   * 计算实际支付金额（包含手续费）
   * @param {string} methodId - 支付方式ID
   * @param {number} amount - 订单金额
   * @param {string} usdtNetwork - USDT网络
   * @returns {Object} { total: number, fee: number, breakdown: string }
   */
  calculatePaymentAmount(methodId, amount, usdtNetwork = null) {
    const fee = this.calculateFee(methodId, amount, usdtNetwork);
    const total = amount + fee;

    return {
      total,
      fee,
      breakdown: fee > 0 ? `订单金额 $${amount} + 手续费 $${fee}` : `订单金额 $${amount}`,
    };
  },

  /**
   * 验证支付金额
   * @param {string} methodId - 支付方式ID
   * @param {number} amount - 支付金额
   * @param {string} usdtNetwork - USDT网络
   * @returns {Object} { valid: boolean, reason?: string }
   */
  validatePaymentAmount(methodId, amount, usdtNetwork = null) {
    if (amount <= 0) {
      return { valid: false, reason: '支付金额必须大于0' };
    }

    if (methodId === 'usdt' && usdtNetwork) {
      const network = this.getUsdtNetworkById(usdtNetwork);
      if (network && amount < network.minAmount) {
        return { valid: false, reason: `${network.name} 最低支付金额为 ${network.minAmount} USDT` };
      }
    }

    return { valid: true };
  },

  /**
   * 格式化支付金额显示
   * @param {number} amount - 金额
   * @param {string} currency - 货币代码
   * @returns {string} 格式化后的金额字符串
   */
  formatPaymentAmount(amount, currency = 'USD') {
    if (typeof amount !== 'number') return '$0.00';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
    }).format(amount);
  },
};

export default paymentService;
