import { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../services/authService';
import { userService } from '../services/userService';
import { tokenUtils } from '../utils/tokenUtils';

/**
 * 认证上下文
 * 管理全局认证状态和用户信息
 */
const AuthContext = createContext(null);

/**
 * AuthProvider组件
 * 包装应用，提供认证状态和相关方法
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /**
   * 初始化：检查本地存储的token和用户信息
   */
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('accessToken');
      const savedUser = localStorage.getItem('user');

      if (token && savedUser) {
        // 验证token是否有效
        if (tokenUtils.isTokenValid(token)) {
          try {
            // 先使用本地数据快速渲染
            const userData = JSON.parse(savedUser);
            setUser(userData);

            // 从服务器刷新用户信息（包括余额等最新数据）
            const result = await userService.getProfile();
            if (result.success && result.data) {
              setUser(result.data);
            }

            // 可选：验证token是否即将过期，如果是则显示提示
            if (tokenUtils.isTokenExpiringSoon(token)) {
              const timeRemaining = tokenUtils.getTimeToExpiry(token);
              console.log(`Token将在${tokenUtils.formatTimeRemaining(timeRemaining)}后过期`);
            }
          } catch (e) {
            console.error('Failed to parse saved user data:', e);
            clearAuthData();
          }
        } else {
          // Token已过期
          console.log('Stored token has expired');
          clearAuthData();
        }
      }

      setLoading(false);
    };

    initAuth();
  }, []);

  /**
   * 用户登录
   * @param {string} email - 邮箱
   * @param {string} password - 密码
   * @returns {Promise} 登录结果
   */
  const login = async (email, password) => {
    const result = await authService.login(email, password);

    if (result.success) {
      const { user: userData } = result.data;
      setUser(userData);
    }

    return result;
  };

  /**
   * 用户注册
   * @param {Object} data - 注册数据
   * @returns {Promise} 注册结果
   */
  const register = async (data) => {
    return await authService.register(data);
  };

  /**
   * 用户登出
   */
  const logout = () => {
    authService.logout();
    clearAuthData();
    setUser(null);
  };

  /**
   * 更新用户信息
   * @param {Object} newUserData - 新的用户数据
   */
  const updateUser = (newUserData) => {
    setUser((prev) => {
      const updated = { ...prev, ...newUserData };
      localStorage.setItem('user', JSON.stringify(updated));
      return updated;
    });
  };

  /**
   * 更新用户余额
   * @param {number} newBalance - 新的余额
   */
  const updateBalance = (newBalance) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, balance: newBalance };
      localStorage.setItem('user', JSON.stringify(updated));
      return updated;
    });
  };

  /**
   * 刷新用户信息
   * 从服务器重新获取用户信息
   */
  const refreshUserInfo = async () => {
    const result = await userService.getProfile();

    if (result.success && result.data) {
      setUser(result.data);
    } else {
      // 如果刷新失败（如token过期），清除认证信息
      clearAuthData();
      setUser(null);
    }
  };

  /**
   * 清除认证数据
   */
  const clearAuthData = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
  };

  /**
   * 检查是否已登录
   * @returns {boolean}
   */
  const isAuthenticated = () => {
    return !!user;
  };

  /**
   * 获取当前token
   * @returns {string|null}
   */
  const getToken = () => {
    return localStorage.getItem('accessToken');
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateUser,
    updateBalance,
    refreshUserInfo,
    isAuthenticated,
    getToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * useAuth Hook
 * 用于在组件中使用认证上下文
 * @returns {Object} 认证上下文值
 */
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
};

export default AuthContext;
