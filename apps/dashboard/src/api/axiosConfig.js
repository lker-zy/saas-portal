import axios from 'axios';

/**
 * Axios实例配置
 * 配置基础URL、超时、拦截器等
 */
const axiosInstance = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * 请求拦截器
 * 在每个请求发送前自动添加JWT token和用户信息到headers
 */
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // 添加用户ID到请求头
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        if (user.id) {
          // 确保 X-User-ID 是数字类型，避免类型错误
          config.headers['X-User-ID'] = String(user.id);
        }
        // 使用 user.id (数字) 而不是 email 或 nickname，完全避免中文编码问题
        // HTTP headers 只能包含 ASCII 字符
        if (user.id) {
          config.headers['X-User-Name'] = String(user.id);
        }
      } catch (e) {
        console.error('Failed to parse user from localStorage:', e);
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * 响应拦截器
 * 处理响应数据和错误
 * 特别处理401未授权错误（token过期或无效）
 */
axiosInstance.interceptors.response.use(
  (response) => {
    // 返回响应的data部分，简化API调用
    return response.data;
  },
  async (error) => {
    // 处理401未授权错误
    if (error.response?.status === 401) {
      // 清除本地存储的认证信息
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');

      // 如果不在登录页，跳转到登录页
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }

    // 返回统一的错误格式
    return Promise.reject({
      code: error.response?.status || 500,
      message: error.response?.data?.message || error.message || '请求失败',
      data: error.response?.data || null,
    });
  }
);

export default axiosInstance;
