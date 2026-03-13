import axios from './axiosConfig';

/**
 * Ticket服务API客户端
 * 端口: 8894
 * 提供: 工单创建、查询、评论、诊断等功能
 */
export const ticketAPI = {
  /**
   * 提交工单
   * @param {Object} ticketData - 工单数据
   * @param {string} ticketData.title - 工单标题
   * @param {string} ticketData.description - 问题描述
   * @param {string} ticketData.category - 工单类型
   * @param {string} ticketData.priority - 优先级 (high/medium/low)
   * @param {number} ticketData.userId - 用户ID
   * @param {string} ticketData.userName - 用户名
   * @param {string} ticketData.userEmail - 用户邮箱
   * @returns {Promise} { id, status }
   */
  createTicket: (ticketData) =>
    axios.post('/ticket/tickets', ticketData),

  /**
   * 获取工单列表
   * @param {Object} filters - 查询条件
   * @returns {Promise} { total, data }
   */
  getTickets: (filters) =>
    axios.get('/ticket/tickets', { params: filters }),

  /**
   * 获取工单详情
   * @param {number} ticketId - 工单ID
   * @returns {Promise} 工单详情
   */
  getTicketDetail: (ticketId) =>
    axios.get(`/ticket/tickets/${ticketId}`),

  /**
   * 更新工单状态
   * @param {number} ticketId - 工单ID
   * @param {string} status - 新状态
   * @returns {Promise}
   */
  updateTicketStatus: (ticketId, status) =>
    axios.put(`/ticket/tickets/${ticketId}/status`, { status }),

  /**
   * 获取工单消息列表
   * @param {number} ticketId - 工单ID
   * @returns {Promise} { total, data }
   */
  getTicketMessages: (ticketId) =>
    axios.get(`/ticket/tickets/${ticketId}/messages`),

  /**
   * 发送工单消息
   * @param {number} ticketId - 工单ID
   * @param {string} content - 消息内容
   * @param {string} type - 消息类型 (user/agent/system)
   * @returns {Promise} { id }
   */
  sendMessage: (ticketId, content, type = 'user') =>
    axios.post(`/ticket/tickets/${ticketId}/messages`, { content, type }),
};

export default ticketAPI;
