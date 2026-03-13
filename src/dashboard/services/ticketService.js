import { ticketAPI } from '../api/ticket';
import { userService } from './userService';

/**
 * 工单服务 (Dashboard 用户端)
 * 对接 ticket service (8894)
 * 用户提交工单功能
 */
export const ticketService = {
  /**
   * 提交工单
   * @param {Object} ticketData - 工单数据
   * @param {string} ticketData.subject - 问题主题
   * @param {string} ticketData.category - 问题类型
   * @param {string} ticketData.message - 问题描述
   * @param {string} ticketData.priority - 优先级
   * @param {string} ticketData.orderId - 关联订单号（可选）
   * @returns {Promise} { success, message, data }
   */
  async submitTicket(ticketData) {
    try {
      // 获取用户信息
      const user = userService.getLocalUser();
      if (!user) {
        return {
          success: false,
          message: '请先登录',
        };
      }

      // 映射优先级 (normal -> medium)
      const priorityMap = {
        'low': 'low',
        'normal': 'medium',
        'high': 'high',
        'urgent': 'high',
      };

      // 映射工单类型
      const categoryMap = {
        'technical': 'technical',
        'billing': 'payment',
        'account': 'account',
        'suggestion': 'suggestion',
        'other': 'other',
      };

      // 构建工单数据
      const data = {
        title: ticketData.subject,
        description: this.buildDescription(ticketData),
        category: categoryMap[ticketData.category] || ticketData.category,
        priority: priorityMap[ticketData.priority] || 'medium',
        userId: user.id || 0,
        userName: user.nickname || user.email || '用户',
        orderId: ticketData.orderId || '',
      };

      const result = await ticketAPI.createTicket(data);

      // result 直接是 {id, status} (axios拦截器已返回response.data)
      if (result && result.id) {
        return {
          success: true,
          message: `工单提交成功！工单编号：${result.id}。我们会尽快处理您的问题。`,
          data: {
            ticketId: result.id,
            id: result.id,
          },
        };
      } else {
        return {
          success: false,
          message: result?.message || '工单提交失败，请稍后重试',
        };
      }
    } catch (error) {
      console.error('Submit ticket service error:', error);
      return {
        success: false,
        message: error.response?.data?.message || error.message || '工单提交失败，请稍后重试',
      };
    }
  },

  /**
   * 构建工单描述
   * @param {Object} ticketData - 工单数据
   * @returns {string} 格式化的描述
   */
  buildDescription(ticketData) {
    const priorityLabels = {
      'low': '【低优先级】',
      'normal': '【中优先级】',
      'high': '【高优先级】',
      'urgent': '【紧急】',
    };

    const priorityLabel = priorityLabels[ticketData.priority] || '';
    let desc = `${priorityLabel} ${ticketData.subject}\n\n`;

    // 如果有关联订单，添加订单信息
    if (ticketData.orderId) {
      desc += `关联订单：${ticketData.orderId}\n\n`;
    }

    desc += `问题描述：\n${ticketData.message}`;
    return desc;
  },

  /**
   * 获取我的工单列表
   * @param {Object} filters - 查询条件
   * @param {number} filters.page - 页码
   * @param {number} filters.pageSize - 每页数量
   * @returns {Promise} { success, data, message }
   */
  async getMyTickets(filters = {}) {
    try {
      const result = await ticketAPI.getTickets(filters);

      // axios 响应拦截器已返回 response.data，所以 result 直接是 { total, data }
      if (result && result.total !== undefined) {
        return {
          success: true,
          data: result,
          message: '获取工单列表成功',
        };
      } else {
        return {
          success: false,
          message: result?.message || '获取工单列表失败',
        };
      }
    } catch (error) {
      console.error('Get ticket list service error:', error);
      return {
        success: false,
        message: error.message || '获取工单列表失败，请稍后重试',
      };
    }
  },

  /**
   * 格式化工单类型标签
   * @param {string} type - 工单类型
   * @returns {string} 中文类型
   */
  formatTicketType(type) {
    const typeMap = {
      'technical': '技术问题',
      'payment': '付款问题',
      'account': '账户问题',
      'suggestion': '建议反馈',
      'other': '其他问题',
    };
    return typeMap[type] || type;
  },

  /**
   * 格式化工单优先级标签
   * @param {string} priority - 优先级
   * @returns {string} 中文优先级
   */
  formatTicketPriority(priority) {
    const priorityMap = {
      'low': '低',
      'medium': '中',
      'high': '高',
    };
    return priorityMap[priority] || priority;
  },

  /**
   * 获取工单状态颜色
   * @param {string} status - 工单状态
   * @returns {string} Tailwind CSS 类名
   */
  getTicketStatusColor(status) {
    const colorMap = {
      'pending': 'text-yellow-600 bg-yellow-50 border-yellow-100',
      'processing': 'text-blue-600 bg-blue-50 border-blue-100',
      'completed': 'text-green-600 bg-green-50 border-green-100',
      'closed': 'text-gray-600 bg-gray-50 border-gray-100',
    };
    return colorMap[status] || 'text-gray-600 bg-gray-50 border-gray-100';
  },

  /**
   * 格式化工单状态标签
   * @param {string} status - 工单状态
   * @returns {string} 中文状态
   */
  formatTicketStatus(status) {
    const statusMap = {
      'pending': '待处理',
      'processing': '处理中',
      'completed': '已完成',
      'closed': '已关闭',
    };
    return statusMap[status] || status;
  },
};

export default ticketService;
