import { clientAPI } from '../api/client';
import { userService } from './userService';

/**
 * 余额服务
 * 封装余额相关的业务逻辑
 */
export const balanceService = {
  /**
   * 获取当前余额
   * @returns {Promise} 余额信息
   */
  async getBalance() {
    try {
      const response = await clientAPI.getBalance();

      if (response.code === 200 || response.code === 0) {
        // 更新本地用户信息中的余额
        if (response.data && response.data.balance !== undefined) {
          userService.updateLocalUser({ balance: response.data.balance });
        }

        return {
          success: true,
          data: response.data,
        };
      } else {
        return {
          success: false,
          message: response.message || '获取余额失败',
        };
      }
    } catch (error) {
      console.error('Get balance service error:', error);
      return {
        success: false,
        message: error.message || '获取余额失败，请稍后重试',
      };
    }
  },

  /**
   * 获取余额交易历史
   * @param {Object} params - 查询参数 { page, pageSize }
   * @returns {Promise} 交易历史
   */
  async getTransactions(params = {}) {
    try {
      const { page = 1, pageSize = 10 } = params;

      const response = await clientAPI.getBalanceTransactions({ page, pageSize });

      if (response.code === 200 || response.code === 0) {
        // 转换后端数据格式为前端期望的格式
        const backendData = response.data;
        const transactions = (backendData.transactions || []).map(tx => this.transformTransaction(tx));

        return {
          success: true,
          data: {
            ...backendData,
            transactions,
          },
        };
      } else {
        return {
          success: false,
          message: response.message || '获取交易历史失败',
        };
      }
    } catch (error) {
      console.error('Get transactions service error:', error);
      return {
        success: false,
        message: error.message || '获取交易历史失败，请稍后重试',
      };
    }
  },

  /**
   * 转换后端交易数据为前端格式
   * @param {Object} tx - 后端交易数据
   * @returns {Object} 前端格式的交易数据
   */
  transformTransaction(tx) {
    // 根据交易类型确定前端类型
    let type = 'purchase';
    if (tx.transactionType === 'recharge') {
      type = 'recharge';
    } else if (tx.transactionType === 'platform_adjust') {
      type = 'adjustment';
    } else if (tx.transactionType === 'payment') {
      type = 'purchase';
    }

    // 格式化交易时间（后端已返回格式化的字符串，直接使用）
    const date = tx.createdAt || '';

    // 生成账单交易单号（使用 TRX- 前缀 + 交易ID）
    const transactionId = `TRX-${String(tx.id).padStart(6, '0')}`;

    // 提取关联的购买订单号
    let orderId = '';
    if (tx.orderId) {
      orderId = String(tx.orderId);
    } else if (tx.description && tx.description.includes('订单支付:')) {
      const match = tx.description.match(/订单支付:\s*([A-Z0-9-]+)/);
      if (match) {
        orderId = match[1];
      }
    }

    // 生成标题
    let title = tx.description || this.formatTransactionType(tx.transactionType);
    if (tx.transactionType === 'payment') {
      title = '订单支付';
    } else if (tx.transactionType === 'recharge') {
      title = '账户充值';
    } else if (tx.transactionType === 'platform_adjust') {
      title = '平台调整';
    }

    return {
      id: transactionId, // 使用 TRX- 前缀的交易单号
      date: date,
      title: title,
      paymentMethod: this.getPaymentMethodLabel(tx.transactionType),
      amount: tx.amount, // 不取绝对值，保持原始符号
      currency: 'USD',
      status: 'completed', // 余额交易都是已完成的
      orderId: orderId, // 关联的购买订单号（如果有）
      type: type,
      transactionType: tx.transactionType, // 原始交易类型，用于过滤
      originalAmount: tx.balanceBefore,
      newAmount: tx.balanceAfter,
    };
  },

  /**
   * 获取支付方式标签
   * @param {string} transactionType - 交易类型
   * @returns {string} 支付方式
   */
  getPaymentMethodLabel(transactionType) {
    if (transactionType === 'recharge') {
      return 'alipay';
    } else if (transactionType === 'platform_adjust') {
      return 'system';
    } else {
      return 'balance';
    }
  },

  /**
   * 充值（预留接口）
   * @param {number} amount - 充值金额
   * @param {string} paymentMethod - 支付方式
   * @returns {Promise} 充值结果
   */
  async recharge(amount, paymentMethod) {
    try {
      const response = await clientAPI.recharge(amount, paymentMethod);

      if (response.code === 200 || response.code === 0) {
        return {
          success: true,
          data: response.data,
        };
      } else {
        return {
          success: false,
          message: response.message || '充值请求失败',
        };
      }
    } catch (error) {
      console.error('Recharge service error:', error);
      return {
        success: false,
        message: error.message || '充值失败，请稍后重试',
      };
    }
  },

  /**
   * 从本地获取当前余额
   * @returns {number|null}
   */
  getLocalBalance() {
    const user = userService.getLocalUser();
    return user ? user.balance : null;
  },

  /**
   * 格式化余额显示
   * @param {number} balance - 余额
   * @returns {string} 格式化后的余额字符串
   */
  formatBalance(balance) {
    if (balance === null || balance === undefined) {
      return '0.00';
    }
    return parseFloat(balance).toFixed(2);
  },

  /**
   * 格式化交易类型显示
   * @param {string} type - 交易类型
   * @returns {string} 中文交易类型
   */
  formatTransactionType(type) {
    const typeMap = {
      'recharge': '充值',
      'purchase': '购买',
      'refund': '退款',
      'deduct': '扣费',
      'reward': '奖励',
      'withdraw': '提现',
      'frozen': '冻结',
      'unfrozen': '解冻',
    };
    return typeMap[type] || type;
  },

  /**
   * 判断交易是否为收入
   * @param {string} type - 交易类型
   * @returns {boolean}
   */
  isIncome(type) {
    return ['recharge', 'refund', 'reward', 'unfrozen'].includes(type);
  },

  /**
   * 获取交易类型颜色类
   * @param {string} type - 交易类型
   * @returns {string} Tailwind CSS 类名
   */
  getTransactionTypeColor(type) {
    if (this.isIncome(type)) {
      return 'text-green-600 bg-green-50';
    }
    return 'text-red-600 bg-red-50';
  },
};

export default balanceService;
