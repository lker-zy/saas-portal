/**
 * JWT Token 工具函数
 * 用于管理、验证和解析JWT token
 */
export const tokenUtils = {
  /**
   * 检查token是否有效（未过期）
   * @param {string} token - JWT token
   * @returns {boolean} - token是否有效
   */
  isTokenValid: (token) => {
    if (!token) return false;

    try {
      // JWT token格式: header.payload.signature
      const parts = token.split('.');
      if (parts.length !== 3) return false;

      // 解码payload
      const payload = JSON.parse(atob(parts[1]));
      const now = Math.floor(Date.now() / 1000);

      // 检查是否过期
      return payload.exp > now;
    } catch (e) {
      console.error('Token validation error:', e);
      return false;
    }
  },

  /**
   * 从token中提取payload数据
   * @param {string} token - JWT token
   * @returns {Object|null} - token payload数据
   */
  getTokenPayload: (token) => {
    if (!token) return null;

    try {
      const parts = token.split('.');
      if (parts.length !== 3) return null;

      return JSON.parse(atob(parts[1]));
    } catch (e) {
      console.error('Token parsing error:', e);
      return null;
    }
  },

  /**
   * 获取token过期时间（剩余秒数）
   * @param {string} token - JWT token
   * @returns {number} - 剩余秒数，0表示已过期或无效
   */
  getTimeToExpiry: (token) => {
    const payload = tokenUtils.getTokenPayload(token);
    if (!payload) return 0;

    const now = Math.floor(Date.now() / 1000);
    return Math.max(0, payload.exp - now);
  },

  /**
   * 获取token中的用户ID
   * @param {string} token - JWT token
   * @returns {number|null} - 用户ID
   */
  getUserId: (token) => {
    const payload = tokenUtils.getTokenPayload(token);
    return payload?.user_id || null;
  },

  /**
   * 获取token中的用户名/邮箱
   * @param {string} token - JWT token
   * @returns {string|null} - 用户名/邮箱
   */
  getUsername: (token) => {
    const payload = tokenUtils.getTokenPayload(token);
    return payload?.username || null;
  },

  /**
   * 检查token是否即将过期（1小时内）
   * @param {string} token - JWT token
   * @returns {boolean} - 是否即将过期
   */
  isTokenExpiringSoon: (token) => {
    const timeToExpiry = tokenUtils.getTimeToExpiry(token);
    return timeToExpiry > 0 && timeToExpiry < 3600; // 1小时 = 3600秒
  },

  /**
   * 格式化剩余时间为可读字符串
   * @param {number} seconds - 剩余秒数
   * @returns {string} - 格式化的时间字符串
   */
  formatTimeRemaining: (seconds) => {
    if (seconds <= 0) return '已过期';

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    if (hours > 0) {
      return `${hours}小时${minutes}分钟`;
    } else if (minutes > 0) {
      return `${minutes}分钟`;
    } else {
      return '不到1分钟';
    }
  },
};

export default tokenUtils;
