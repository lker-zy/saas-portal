import { clientAPI } from '../api/client';
import { tokenUtils } from '../utils/tokenUtils';

/**
 * 认证服务
 * 封装所有认证相关的业务逻辑
 */
export const authService = {
  /**
   * 用户登录
   * @param {string} email - 邮箱
   * @param {string} password - 密码
   * @returns {Promise} 登录结果
   */
  async login(email, password) {
    try {
      const response = await clientAPI.login(email, password);

      if ((response.code === 200 || response.code === 0) && response.data) {
        const { accessToken, user } = response.data;

        // 验证token格式
        if (!tokenUtils.isTokenValid(accessToken)) {
          return {
            success: false,
            message: 'Invalid token received from server',
          };
        }

        // 存储token和用户信息到localStorage
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('user', JSON.stringify(user));

        return {
          success: true,
          data: { accessToken, user },
        };
      } else {
        return {
          success: false,
          message: response.message || '登录失败',
        };
      }
    } catch (error) {
      console.error('Login service error:', error);
      return {
        success: false,
        message: error.message || '登录失败，请稍后重试',
      };
    }
  },

  /**
   * 用户注册
   * @param {Object} data - 注册数据
   * @returns {Promise} 注册结果
   */
  async register(data) {
    try {
      const response = await clientAPI.register(data);

      if (response.code === 200 || response.code === 0) {
        return {
          success: true,
          message: response.message || '注册成功',
        };
      } else {
        return {
          success: false,
          message: response.message || '注册失败',
        };
      }
    } catch (error) {
      console.error('Register service error:', error);
      return {
        success: false,
        message: error.message || '注册失败，请稍后重试',
      };
    }
  },

  /**
   * 发送验证码
   * @param {string} email - 邮箱地址
   * @returns {Promise} 发送结果
   */
  async sendVerificationCode(email) {
    try {
      const response = await clientAPI.sendVerificationCode(email);

      if (response.code === 200 || response.code === 0) {
        return {
          success: true,
          message: response.message || '验证码发送成功',
        };
      } else {
        return {
          success: false,
          message: response.message || '验证码发送失败',
        };
      }
    } catch (error) {
      console.error('Send verification code error:', error);
      return {
        success: false,
        message: error.message || '验证码发送失败，请稍后重试',
      };
    }
  },

  /**
   * 用户登出
   */
  logout() {
    // 清除本地存储
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
  },

  /**
   * 检查用户是否已登录
   * @returns {boolean}
   */
  isAuthenticated() {
    const token = localStorage.getItem('accessToken');
    const user = localStorage.getItem('user');

    if (!token || !user) {
      return false;
    }

    // 验证token是否有效
    return tokenUtils.isTokenValid(token);
  },

  /**
   * 获取当前用户信息
   * @returns {Object|null}
   */
  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;

    try {
      return JSON.parse(userStr);
    } catch (e) {
      console.error('Failed to parse user data:', e);
      return null;
    }
  },

  /**
   * 获取当前token
   * @returns {string|null}
   */
  getToken() {
    return localStorage.getItem('accessToken');
  },

  /**
   * 检查token是否即将过期（1小时内）
   * @returns {boolean}
   */
  isTokenExpiringSoon() {
    const token = this.getToken();
    if (!token) return false;

    return tokenUtils.isTokenExpiringSoon(token);
  },

  /**
   * 获取token剩余时间
   * @returns {number} 剩余秒数
   */
  getTimeToExpiry() {
    const token = this.getToken();
    if (!token) return 0;

    return tokenUtils.getTimeToExpiry(token);
  },
};

export default authService;
