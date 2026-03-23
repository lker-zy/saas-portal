import { orderAPI } from '../api/order';
import { balanceService } from './balanceService';
import { userService } from './userService';

/**
 * 订单服务
 * 封装订单相关的业务逻辑
 */
export const orderService = {
  /**
   * 获取订单列表
   * @param {Object} filters - 查询条件 { page, pageSize, status }
   * @returns {Promise} 订单列表
   */
  async getOrders(filters = {}) {
    try {
      const { page = 1, pageSize = 10, status } = filters;

      const response = await orderAPI.getOrders({ page, pageSize, status });

      if (response.code === 200 || response.code === 0) {
        return {
          success: true,
          data: response.data,
        };
      } else {
        return {
          success: false,
          message: response.message || '获取订单列表失败',
        };
      }
    } catch (error) {
      console.error('Get orders service error:', error);
      return {
        success: false,
        message: error.message || '获取订单列表失败，请稍后重试',
      };
    }
  },

  /**
   * 获取订单详情
   * @param {number} orderId - 订单ID
   * @returns {Promise} 订单详情
   */
  async getOrderDetail(orderId) {
    try {
      const response = await orderAPI.getOrderDetail(orderId);

      if (response.code === 200 || response.code === 0) {
        return {
          success: true,
          data: response.data,
        };
      } else {
        return {
          success: false,
          message: response.message || '获取订单详情失败',
        };
      }
    } catch (error) {
      console.error('Get order detail service error:', error);
      return {
        success: false,
        message: error.message || '获取订单详情失败，请稍后重试',
      };
    }
  },

  /**
   * 创建订单
   * @param {Object} orderData - 订单数据
   * @returns {Promise} 创建结果
   */
  async createOrder(orderData) {
    try {
      const response = await orderAPI.createOrder(orderData);

      if (response.code === 200 || response.code === 0) {
        // 如果响应中包含新余额，更新本地余额
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
          message: response.message || '创建订单失败',
        };
      }
    } catch (error) {
      console.error('Create order service error:', error);
      return {
        success: false,
        message: error.message || '创建订单失败，请稍后重试',
      };
    }
  },

  /**
   * 支付订单
   * @param {number} orderId - 订单ID
   * @param {string} paymentMethod - 支付方式 (balance, alipay, wechat)
   * @returns {Promise} 支付结果
   */
  async payOrder(orderId, paymentMethod) {
    try {
      const response = await orderAPI.payOrder(orderId, paymentMethod);

      if (response.code === 200 || response.code === 0) {
        // 支付成功后刷新余额
        await balanceService.getBalance();

        return {
          success: true,
          message: response.message || '支付成功',
          data: response.data,
        };
      } else {
        return {
          success: false,
          message: response.message || '支付失败',
        };
      }
    } catch (error) {
      console.error('Pay order service error:', error);
      return {
        success: false,
        message: error.message || '支付失败，请稍后重试',
      };
    }
  },

  /**
   * 申请订单（激活订单）
   * @param {number} orderId - 订单ID
   * @returns {Promise} 申请结果
   */
  async applyOrder(orderId) {
    try {
      const response = await orderAPI.applyOrder(orderId);

      if (response.code === 200 || response.code === 0) {
        return {
          success: true,
          message: response.message || '申请成功',
        };
      } else {
        return {
          success: false,
          message: response.message || '申请失败',
        };
      }
    } catch (error) {
      console.error('Apply order service error:', error);
      return {
        success: false,
        message: error.message || '申请失败，请稍后重试',
      };
    }
  },

  /**
   * 获取订单的代理节点列表
   * @param {number} orderId - 订单ID
   * @returns {Promise} 代理节点列表（适配 ProxyExportModal 格式）
   */
  async getProxyNodes(orderId) {
    try {
      const response = await orderAPI.getProxyNodes(orderId);

      if (response.code === 200 || response.code === 0) {
        // 适配数据格式以匹配 ProxyExportModal 的要求
        const adaptedData = this.adaptProxyNodesForExport(response.data);
        return {
          success: true,
          data: adaptedData,
        };
      } else {
        return {
          success: false,
          message: response.message || '获取代理节点失败',
        };
      }
    } catch (error) {
      console.error('Get proxy nodes service error:', error);
      return {
        success: false,
        message: error.message || '获取代理节点失败，请稍后重试',
      };
    }
  },

  /**
   * 获取订单详情（包含代理节点配置）
   * @param {number} orderId - 订单ID
   * @returns {Promise} 订单详情和代理节点
   */
  async getOrderWithProxyNodes(orderId) {
    try {
      const [detailResult, nodesResult] = await Promise.all([
        this.getOrderDetail(orderId),
        this.getProxyNodes(orderId).catch(() => ({ success: false, data: { proxy_nodes: [] } }))
      ]);

      return {
        success: true,
        order: detailResult.data,
        proxyNodes: nodesResult.data?.proxy_nodes || nodesResult.data || [],
      };
    } catch (error) {
      console.error('Get order with proxy nodes error:', error);
      return {
        success: false,
        message: error.message || '获取订单信息失败',
      };
    }
  },

  /**
   * 适配代理节点数据格式以匹配 ProxyExportModal 的要求
   * @param {Object} data - 后端返回的原始数据
   * @returns {Object} 适配后的数据
   */
  adaptProxyNodesForExport(data) {
    if (!data) return { proxy_nodes: [] };

    // 处理 V2 格式（ip_allocations）
    if (data.ip_allocations && Array.isArray(data.ip_allocations)) {
      return this.adaptV2Format(data);
    }

    // 处理旧的 proxy_nodes 格式（向后兼容）
    const proxyNodes = data.proxy_nodes || data.proxyNodes || data.list || [];
    const country = data.country || data.country_code || 'US';

    // 将代理节点转换为 ProxyExportModal 需要的格式
    const adaptedNodes = proxyNodes.map(node => {
      // 提取地理位置信息
      const geoInfo = node.geo_info || node.geoInfo || {};

      // 处理 accessNodes 格式
      if (node.accessNodes && node.accessNodes.length > 0) {
        // 已经是 accessNodes 格式，直接使用
        return {
          id: node.id || node.node_uuid || `${node.ip}_${node.port}`,
          ip: node.ip || node.ipAddress,
          port: node.port || node.server_port,
          city: geoInfo.city || node.city || 'Unknown',
          region: geoInfo.region || node.region || 'Unknown',
          region_code: geoInfo.region_code || node.region_code || geoInfo.regionCode || '',
          country: geoInfo.country || node.country || country,
          country_code: geoInfo.country_code || node.country_code || geoInfo.countryCode || country,
          continent: geoInfo.continent || node.continent || '',
          continent_code: geoInfo.continent_code || node.continent_code || geoInfo.continentCode || '',
          latitude: geoInfo.latitude || node.latitude || 0,
          longitude: geoInfo.longitude || node.longitude || 0,
          timezone: geoInfo.timezone || node.timezone || '',
          zip: geoInfo.zip || node.zip || node.postal_code || '',
          // 保留 accessNodes
          accessNodes: node.accessNodes.map(an => ({
            id: an.id,
            tag: an.tag,
            protocol: an.protocol,
            port: an.port || an.server_port,
            ipAddress: an.ip_address || an.ipAddress,
            serverPort: an.port || an.server_port,
            clientConfig: an.client_config || an.clientConfig || null,
            nodeUuid: an.node_uuid || an.nodeUuid
          }))
        };
      }

      // 处理单个节点格式（新格式：client_config 直接是 inbound 内容）
      const clientConfig = node.client_config || node.clientConfig || node.config;
      const protocols = node.protocols || node.availableProtocols || ['HTTP'];

      // 解析 clientConfig
      let configObj = {};
      try {
        configObj = typeof clientConfig === 'string' ? JSON.parse(clientConfig) : (clientConfig || {});
      } catch (e) {
        console.warn('Failed to parse clientConfig:', e);
      }

      // 新格式：client_config 直接是 inbound 内容（扁平化结构）
      if (configObj.tag && configObj.port && configObj.protocol) {
        return {
          id: node.id || node.node_uuid || `${node.ip}_${node.port}`,
          ip: node.ip || node.ipAddress,
          port: node.port || node.server_port,
          city: geoInfo.city || node.city || 'Unknown',
          region: geoInfo.region || node.region || 'Unknown',
          region_code: geoInfo.region_code || node.region_code || geoInfo.regionCode || '',
          country: geoInfo.country || node.country || country,
          country_code: geoInfo.country_code || node.country_code || geoInfo.countryCode || country,
          continent: geoInfo.continent || node.continent || '',
          continent_code: geoInfo.continent_code || node.continent_code || geoInfo.continentCode || '',
          latitude: geoInfo.latitude || node.latitude || 0,
          longitude: geoInfo.longitude || node.longitude || 0,
          timezone: geoInfo.timezone || node.timezone || '',
          zip: geoInfo.zip || node.zip || node.postal_code || '',
          // 转换为 accessNodes 格式
          accessNodes: [{
            id: `${node.id}_inbound_0`,
            tag: configObj.tag,
            protocol: configObj.protocol || protocols[0] || 'HTTP',
            port: configObj.port || node.port || node.server_port,
            ipAddress: configObj.server || node.ip || node.ipAddress,
            serverPort: configObj.port || node.port || node.server_port,
            clientConfig: JSON.stringify(configObj),
            nodeUuid: node.node_uuid || node.nodeUuid || node.id
          }]
        };
      }

      // 简化格式：直接返回
      return {
        id: node.id || node.node_uuid || `${node.ip}_${node.port}`,
        ip: node.ip || node.ipAddress,
        port: node.port || node.server_port || 0,
        city: geoInfo.city || node.city || 'Unknown',
        region: geoInfo.region || node.region || 'Unknown',
        region_code: geoInfo.region_code || node.region_code || geoInfo.regionCode || '',
        country: geoInfo.country || node.country || country,
        country_code: geoInfo.country_code || node.country_code || geoInfo.countryCode || country,
        continent: geoInfo.continent || node.continent || '',
        continent_code: geoInfo.continent_code || node.continent_code || geoInfo.continentCode || '',
        latitude: geoInfo.latitude || node.latitude || 0,
        longitude: geoInfo.longitude || node.longitude || 0,
        timezone: geoInfo.timezone || node.timezone || '',
        zip: geoInfo.zip || node.zip || node.postal_code || '',
        protocols: protocols,
        availableProtocols: protocols,
        // 认证信息
        username: node.username || '',
        password: node.password || '',
        uuid: node.uuid || ''
      };
    });

    return {
      proxy_nodes: adaptedNodes,
      total_ips: adaptedNodes.length,
      protocols: data.protocols || protocols,
      country: country
    };
  },

  /**
   * 适配 V2 格式（ip_allocations）
   * @param {Object} data - 后端返回的 V2 格式数据
   * @returns {Object} 适配后的数据
   */
  adaptV2Format(data) {
    const adaptedNodes = [];
    const protocols = data.order?.delivery_protocols || data.protocols || [];
    const country = data.order?.country || data.country || 'US';

    // 遍历每个 IP 分配
    data.ip_allocations.forEach(ipAlloc => {
      const accessNode = ipAlloc.access_node;
      if (!accessNode) return;

      // 为该 IP 的每个协议创建代理节点
      accessNode.access_inbounds.forEach(inbound => {
        const clientConfig = inbound.client_config || inbound.config || {};
        const auth = inbound.auth || {};

        // 获取服务器地址（优先级：client_config.server > domain_binding > ip_address）
        let ipAddress = ipAlloc.ip_address;
        // 第一优先级：从 client_config 中提取 server（可能包含域名绑定）
        if (clientConfig.server && typeof clientConfig.server === 'string') {
          ipAddress = clientConfig.server;
        }
        // 第二优先级：检查 domain_binding 字段（兼容旧格式）
        else if (ipAlloc.has_domain_binding && ipAlloc.domain_binding?.primary_domain) {
          ipAddress = ipAlloc.domain_binding.primary_domain;
        }

        adaptedNodes.push({
          id: `${ipAlloc.allocation_id}_${inbound.protocol}_${inbound.port}`,
          ip: ipAddress,
          port: inbound.port,
          protocol: inbound.protocol?.toLowerCase() || 'http',
          protocols: protocols.map(p => p?.toLowerCase() || 'http'),
          availableProtocols: protocols.map(p => p?.toLowerCase() || 'http'),
          status: 'active',
          country: country,
          country_code: geoInfo.country_code || country,
          city: geoInfo.city || 'Unknown',
          region: geoInfo.region || 'Unknown',
          region_code: geoInfo.region_code || '',
          continent: geoInfo.continent || '',
          continent_code: geoInfo.continent_code || '',
          latitude: geoInfo.latitude || 0,
          longitude: geoInfo.longitude || 0,
          timezone: geoInfo.time_zone || '',
          zip: geoInfo.zip_code || '',
          // 认证信息
          username: auth.username || '',
          password: auth.password || '',
          uuid: auth.uuid || '',
          ssMethod: auth.method || '',
          method: auth.method || '',
          // 传输配置
          transport: inbound.transport || {},
          // 转换为 accessNodes 格式
          accessNodes: [{
            id: `${accessNode.id}_${inbound.protocol}`,
            tag: inbound.tag,
            protocol: inbound.protocol?.toLowerCase() || 'http',
            port: inbound.port,
            ipAddress: ipAddress,
            serverPort: accessNode.server_port,
            clientConfig: JSON.stringify(clientConfig),
            nodeUuid: accessNode.node_uuid
          }],
          // 元数据
          _tag: inbound.tag,
          _accessNodeAddress: `${accessNode.server}:${accessNode.server_port}`,
          _accessNodeIpAddress: ipAlloc.ip_address,
          _source: 'accessNode'
        });
      });
    });

    return {
      proxy_nodes: adaptedNodes,
      total_ips: data.total_ips || adaptedNodes.length,
      protocols: protocols,
      country: country
    };
  },

  /**
   * 获取可选国家列表
   * @returns {Promise} 国家列表
   */
  async getCountries() {
    try {
      const response = await orderAPI.getCountries();

      if (response.code === 200 || response.code === 0) {
        return {
          success: true,
          data: response.data,
        };
      } else {
        return {
          success: false,
          message: response.message || '获取国家列表失败',
        };
      }
    } catch (error) {
      console.error('Get countries service error:', error);
      return {
        success: false,
        message: error.message || '获取国家列表失败，请稍后重试',
      };
    }
  },

  /**
   * 获取场景列表
   * @returns {Promise} 场景列表
   */
  async getScenarios() {
    try {
      const response = await orderAPI.getScenarios();

      if (response.code === 200 || response.code === 0) {
        return {
          success: true,
          data: response.data,
        };
      } else {
        return {
          success: false,
          message: response.message || '获取场景列表失败',
        };
      }
    } catch (error) {
      console.error('Get scenarios service error:', error);
      return {
        success: false,
        message: error.message || '获取场景列表失败，请稍后重试',
      };
    }
  },

  /**
   * 查询库存
   * @param {string} country - 国家代码
   * @returns {Promise} 库存信息
   */
  async getStock(country) {
    try {
      const response = await orderAPI.getStock(country);

      if (response.code === 200 || response.code === 0) {
        return {
          success: true,
          data: response.data,
        };
      } else {
        return {
          success: false,
          message: response.message || '查询库存失败',
        };
      }
    } catch (error) {
      console.error('Get stock service error:', error);
      return {
        success: false,
        message: error.message || '查询库存失败，请稍后重试',
      };
    }
  },

  /**
   * 计算订单价格
   * @param {Object} params - 计算参数
   * @returns {Promise} 价格信息
   */
  async calculatePrice(params) {
    try {
      const response = await orderAPI.calculatePrice(params);

      if (response.code === 200 || response.code === 0) {
        return {
          success: true,
          data: response.data,
        };
      } else {
        return {
          success: false,
          message: response.message || '计算价格失败',
        };
      }
    } catch (error) {
      console.error('Calculate price service error:', error);
      return {
        success: false,
        message: error.message || '计算价格失败，请稍后重试',
      };
    }
  },

  /**
   * 查询折扣信息
   * @param {Object} params - 折扣查询参数
   * @returns {Promise} 折扣信息
   */
  async getDiscount(params) {
    try {
      const response = await orderAPI.getDiscount(params);

      if (response.code === 200 || response.code === 0) {
        return {
          success: true,
          data: response.data,
        };
      } else {
        return {
          success: false,
          message: response.message || '获取折扣信息失败',
        };
      }
    } catch (error) {
      console.error('Get discount service error:', error);
      return {
        success: false,
        message: error.message || '获取折扣信息失败，请稍后重试',
      };
    }
  },

  /**
   * 格式化订单状态显示
   * @param {string} status - 订单状态
   * @returns {string} 中文状态
   */
  formatOrderStatus(status) {
    const statusMap = {
      'pending': '待支付',
      'paid': '已支付',
      'active': '生效中',
      'expired': '已过期',
      'cancelled': '已取消',
      'refunded': '已退款',
    };
    return statusMap[status] || status;
  },

  /**
   * 获取订单状态颜色
   * @param {string} status - 订单状态
   * @returns {string} Tailwind CSS 类名
   */
  getOrderStatusColor(status) {
    const colorMap = {
      'pending': 'text-yellow-600 bg-yellow-50',
      'paid': 'text-blue-600 bg-blue-50',
      'active': 'text-green-600 bg-green-50',
      'expired': 'text-gray-600 bg-gray-50',
      'cancelled': 'text-red-600 bg-red-50',
      'refunded': 'text-purple-600 bg-purple-50',
    };
    return colorMap[status] || 'text-gray-600 bg-gray-50';
  },

  /**
   * 获取订单订阅信息
   * @param {number} orderId - 订单ID
   * @returns {Promise} 订阅信息
   */
  async getSubscriptionInfo(orderId) {
    try {
      const response = await orderAPI.getSubscriptionInfo(orderId);

      if (response.success || response.code === 200 || response.code === 0) {
        return {
          success: true,
          data: response.data || response,
        };
      } else {
        return {
          success: false,
          message: response.message || '获取订阅信息失败',
        };
      }
    } catch (error) {
      console.error('Get subscription info service error:', error);
      return {
        success: false,
        message: error.message || '获取订阅信息失败，请稍后重试',
      };
    }
  },

  /**
   * 开启自动续费
   * @param {number} orderId - 订单ID
   * @param {number} renewDurationDays - 续费周期（天数）
   * @returns {Promise} 开启结果
   */
  async enableAutoRenew(orderId, renewDurationDays = 30) {
    try {
      const response = await orderAPI.enableAutoRenew(orderId, renewDurationDays);

      if (response.success || response.code === 200 || response.code === 0) {
        return {
          success: true,
          message: response.message || '自动续费已开启',
          data: response.data || response,
        };
      } else {
        return {
          success: false,
          message: response.message || '开启自动续费失败',
        };
      }
    } catch (error) {
      console.error('Enable auto renew service error:', error);
      return {
        success: false,
        message: error.message || '开启自动续费失败，请稍后重试',
      };
    }
  },

  /**
   * 关闭自动续费
   * @param {number} orderId - 订单ID
   * @param {string} subscriptionId - 第三方订阅ID（可选）
   * @returns {Promise} 关闭结果
   */
  async disableAutoRenew(orderId, subscriptionId) {
    try {
      const response = await orderAPI.disableAutoRenew(orderId, subscriptionId);

      if (response.success || response.code === 200 || response.code === 0) {
        return {
          success: true,
          message: response.message || '自动续费已关闭',
          data: response.data || response,
        };
      } else {
        return {
          success: false,
          message: response.message || '关闭自动续费失败',
        };
      }
    } catch (error) {
      console.error('Disable auto renew service error:', error);
      return {
        success: false,
        message: error.message || '关闭自动续费失败，请稍后重试',
      };
    }
  },
};

export default orderService;
