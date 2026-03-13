import { clientAPI } from '../api/client';
import { authService } from './authService';

/**
 * 用户信息服务
 * 封装用户信息相关的业务逻辑
 */
export const userService = {
  /**
   * 获取用户资料
   * @returns {Promise} 用户资料
   */
  async getProfile() {
    try {
      const response = await clientAPI.getProfile();

      if (response.code === 200 || response.code === 0) {
        // 更新本地存储的用户信息
        if (response.data) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }

        return {
          success: true,
          data: response.data,
        };
      } else {
        return {
          success: false,
          message: response.message || '获取用户信息失败',
        };
      }
    } catch (error) {
      console.error('Get profile service error:', error);
      return {
        success: false,
        message: error.message || '获取用户信息失败，请稍后重试',
      };
    }
  },

  /**
   * 更新用户资料
   * @param {Object} data - 更新数据 { nickname, phone }
   * @returns {Promise} 更新结果
   */
  async updateProfile(data) {
    try {
      const response = await clientAPI.updateProfile(data);

      if (response.code === 200 || response.code === 0) {
        // 更新成功后重新获取用户信息
        await this.getProfile();

        return {
          success: true,
          message: response.message || '更新成功',
        };
      } else {
        return {
          success: false,
          message: response.message || '更新失败',
        };
      }
    } catch (error) {
      console.error('Update profile service error:', error);
      return {
        success: false,
        message: error.message || '更新失败，请稍后重试',
      };
    }
  },

  /**
   * 修改密码
   * @param {string} oldPassword - 旧密码
   * @param {string} newPassword - 新密码
   * @returns {Promise} 修改结果
   */
  async changePassword(oldPassword, newPassword) {
    try {
      const response = await clientAPI.changePassword(oldPassword, newPassword);

      if (response.code === 200 || response.code === 0) {
        return {
          success: true,
          message: response.message || '密码修改成功',
        };
      } else {
        return {
          success: false,
          message: response.message || '密码修改失败',
        };
      }
    } catch (error) {
      console.error('Change password service error:', error);
      return {
        success: false,
        message: error.message || '密码修改失败，请稍后重试',
      };
    }
  },

  /**
   * 从本地获取当前用户信息
   * @returns {Object|null}
   */
  getLocalUser() {
    return authService.getCurrentUser();
  },

  /**
   * 更新本地用户信息
   * @param {Object} newData - 新的用户数据
   */
  updateLocalUser(newData) {
    const currentUser = this.getLocalUser();
    if (currentUser) {
      const updatedUser = { ...currentUser, ...newData };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return updatedUser;
    }
    return null;
  },
};

export default userService;
