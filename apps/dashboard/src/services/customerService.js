import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_PLATFORM_API_URL || 'http://localhost:8890';

const customerApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// 请求拦截器
customerApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 响应拦截器
customerApi.interceptors.response.use(
  (response) => ({
    success: true,
    data: response.data,
  }),
  (error) => ({
    success: false,
    message: error.response?.data?.msg || error.message || '请求失败',
    data: error.response?.data || null,
  })
);

/**
 * 客户管理服务
 */
export const customerService = {
  /**
   * 获取客户列表
   * @param {Object} params - 查询参数 { page, pageSize, email, accountStatus, search }
   */
  getCustomers: async (params = {}) => {
    const response = await customerApi.get('/api/v1/customers', { params });
    return response;
  },

  /**
   * 获取客户详情
   * @param {number} id - 客户ID
   */
  getCustomer: async (id) => {
    const response = await customerApi.get(`/api/v1/customers/${id}`);
    return response;
  },

  /**
   * 更新客户信息
   * @param {number} id - 客户ID
   * @param {Object} data - 更新数据 { nickname, phone, accountStatus, autoRenew }
   */
  updateCustomer: async (id, data) => {
    const response = await customerApi.put(`/api/v1/customers/${id}`, data);
    return response;
  },

  /**
   * 更新客户状态
   * @param {number} id - 客户ID
   * @param {string} status - 状态 { normal, suspended, banned }
   */
  updateCustomerStatus: async (id, status) => {
    const response = await customerApi.put(`/api/v1/customers/${id}/status`, { status });
    return response;
  },

  /**
   * 调整客户余额
   * @param {number} id - 客户ID
   * @param {Object} data - { amount, description }
   */
  adjustBalance: async (id, data) => {
    const response = await customerApi.post(`/api/v1/customers/${id}/balance`, data);
    return response;
  },
};

export default customerService;
