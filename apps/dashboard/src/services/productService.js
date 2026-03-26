import { productAPI } from '../api/product';

/**
 * Product Service
 * Encapsulates product catalog business logic
 * Handles regions, inventory, templates, and delivery protocols
 *
 * SKU Data Structure:
 * - id: 模板ID (template_id) - 提交订单时需要发送此字段
 * - name: SKU名称
 * - country: 国家代码
 * - scenario: 场景代码
 * - traffic: 流量规格 (如 "50GB")
 * - bandwidth: 带宽规格 (如 "10Mbps")
 * - billing_mode: 计费模式 ("traffic" | "bandwidth")
 * - pricing: 价格字典 { "traffic_50GB": { monthly: 29.99 } }
 * - available_protocols: 可用协议列表
 */

// 终端配置数据（作为服务层的数据源）
const TERMINALS = [
  { id: 'fingerprint', name: '指纹浏览器', icon: 'Globe', desc: 'AdsPower, BitBrowser等', recommendedProtocol: 'socks', compatible: ['socks', 'http'] },
  { id: 'mobile', name: '手机/模拟器', icon: 'Smartphone', desc: 'iOS, Android, 雷电模拟器', recommendedProtocol: 'socks', compatible: ['socks', 'http', 'shadowtls'] },
  { id: 'server', name: '服务器/VPS', icon: 'Server', desc: 'Linux, Windows Server', recommendedProtocol: 'socks', compatible: ['socks', 'http', 'vless', 'vmess'] },
  { id: 'router', name: '路由', icon: 'Wifi', desc: 'OpenWrt, Merlin', recommendedProtocol: 'socks', compatible: ['socks', 'http', 'trojan'] },
  { id: 'api', name: 'API集成', icon: 'Terminal', desc: 'Code Integration', recommendedProtocol: 'http', compatible: ['http', 'socks', 'vless', 'vmess'] },
];

export const productService = {
  /**
   * Get available regions
   * @returns {Promise<{success: boolean, data?: Array, message?: string}>}
   */
  async getRegions() {
    try {
      const response = await productAPI.getRegions();

      if (response.code === 200 || response.code === 0) {
        return {
          success: true,
          data: response.data?.regions || response.data || [],
        };
      } else {
        return {
          success: false,
          message: response.message || 'Failed to fetch regions',
        };
      }
    } catch (error) {
      console.error('Get regions service error:', error);
      return {
        success: false,
        message: error.message || 'Failed to fetch regions, please try again later',
      };
    }
  },

  /**
   * Get available scenarios (business categories)
   * @returns {Promise<{success: boolean, data?: Array, message?: string}>}
   */
  async getScenarios() {
    try {
      const response = await productAPI.getScenarios();

      if (response.code === 200 || response.code === 0) {
        return {
          success: true,
          data: response.data?.scenarios || response.data || [],
        };
      } else {
        return {
          success: false,
          message: response.message || 'Failed to fetch scenarios',
        };
      }
    } catch (error) {
      console.error('Get scenarios service error:', error);
      return {
        success: false,
        message: error.message || 'Failed to fetch scenarios, please try again later',
      };
    }
  },

  /**
   * Get available scenarios by country (business categories filtered by country)
   * @param {string} countryCode - Country code (e.g., 'US', 'JP')
   * @returns {Promise<{success: boolean, data?: Array, message?: string}>}
   */
  async getScenariosByCountry(countryCode) {
    try {
      const response = await productAPI.getScenariosByCountry(countryCode);

      if (response.code === 200 || response.code === 0) {
        return {
          success: true,
          data: response.data?.scenarios || response.data || [],
        };
      } else {
        return {
          success: false,
          message: response.message || 'Failed to fetch scenarios by country',
        };
      }
    } catch (error) {
      console.error('Get scenarios by country service error:', error);
      return {
        success: false,
        message: error.message || 'Failed to fetch scenarios by country, please try again later',
      };
    }
  },

  /**
   * Get available SKUs for a country and scenario
   * @param {string} country - Country code
   * @param {string} scenario - Scenario ID
   * @returns {Promise<{success: boolean, data?: Array, message?: string}>}
   */
  async getSKUs(country, scenario) {
    try {
      const response = await productAPI.getSKUs(country, scenario);

      if (response.code === 200 || response.code === 0) {
        return {
          success: true,
          data: response.data?.skus || response.data || [],
        };
      } else {
        return {
          success: false,
          message: response.message || 'Failed to fetch SKUs',
        };
      }
    } catch (error) {
      console.error('Get SKUs service error:', error);
      return {
        success: false,
        message: error.message || 'Failed to fetch SKUs, please try again later',
      };
    }
  },

  /**
   * Get available purchase durations
   * @returns {Promise<{success: boolean, data?: Array, message?: string}>}
   */
  async getDurations() {
    try {
      const response = await productAPI.getDurations();

      if (response.code === 200 || response.code === 0) {
        return {
          success: true,
          data: response.data?.durations || response.data || [],
        };
      } else {
        return {
          success: false,
          message: response.message || 'Failed to fetch durations',
        };
      }
    } catch (error) {
      console.error('Get durations service error:', error);
      return {
        success: false,
        message: error.message || 'Failed to fetch durations, please try again later',
      };
    }
  },

  /**
   * Calculate price for selected configuration
   * @param {Object} params - Calculation parameters
   * @returns {Promise<{success: boolean, data?: Object, message?: string}>}
   */
  async calculatePrice(params) {
    try {
      const response = await productAPI.calculatePrice(params);

      if (response.code === 200 || response.code === 0) {
        return {
          success: true,
          data: response.data,
        };
      } else {
        return {
          success: false,
          message: response.message || 'Failed to calculate price',
        };
      }
    } catch (error) {
      console.error('Calculate price service error:', error);
      return {
        success: false,
        message: error.message || 'Failed to calculate price, please try again later',
      };
    }
  },

  /**
   * Get stock status for a country and scenario
   * @param {string} country - Country code
   * @param {string} scenario - Scenario ID
   * @returns {Promise<{success: boolean, data?: Object, message?: string}>}
   */
  async getStock(country, scenario) {
    try {
      const response = await productAPI.getStock(country, scenario);

      if (response.code === 200 || response.code === 0) {
        return {
          success: true,
          data: response.data,
        };
      } else {
        return {
          success: false,
          message: response.message || 'Failed to fetch stock',
        };
      }
    } catch (error) {
      console.error('Get stock service error:', error);
      return {
        success: false,
        message: error.message || 'Failed to fetch stock, please try again later',
      };
    }
  },

  // ==================== 数据处理方法 ====================

  /**
   * 构建资源池数据（从regions数据）
   * @param {Array} regions - Regions数据
   * @returns {Object} 资源池对象 {regionId: {total, available, scenarios}}
   */
  buildResourcePool(regions) {
    if (!Array.isArray(regions)) return {};

    const pool = {};
    regions.forEach(region => {
      pool[region.id] = {
        total: region.total_stock || region.stock || 0,
        available: region.available_stock || region.stock || 0,
        scenarios: region.scenario_stock || {},
      };
    });
    return pool;
  },

  /**
   * 从SKU数据中提取唯一协议列表
   * @param {Array} skus - SKU数据数组
   * @returns {Array<string>} 唯一协议列表
   */
  extractUniqueProtocols(skus) {
    if (!Array.isArray(skus) || skus.length === 0) return [];

    const protocolsSet = new Set();

    skus.forEach(sku => {
      // 优先使用 available_protocols
      if (sku.available_protocols && Array.isArray(sku.available_protocols)) {
        sku.available_protocols.forEach(proto => protocolsSet.add(proto));
      } else if (sku.protocol) {
        // 降级：使用单个 protocol
        protocolsSet.add(sku.protocol);
      }
    });

    return Array.from(protocolsSet);
  },

  /**
   * 按计费模式分组SKU
   * @param {Array} skus - SKU数据数组
   * @returns {Object} {traffic: Array, bandwidth: Array}
   */
  groupSKUsByBillingMode(skus) {
    if (!Array.isArray(skus)) return { traffic: [], bandwidth: [] };

    const trafficSKUs = skus.filter(sku => sku.billing_mode === 'traffic');
    const bandwidthSKUs = skus.filter(sku => sku.billing_mode === 'bandwidth');

    return {
      traffic: trafficSKUs,
      bandwidth: bandwidthSKUs,
    };
  },

  /**
   * 获取指定国家/场景的可用协议列表
   * @param {string} country - 国家代码
   * @param {string} scenario - 场景ID
   * @returns {Promise<{success: boolean, data?: Array<string>, message?: string}>}
   */
  async getAvailableProtocols(country, scenario) {
    const result = await this.getSKUs(country, scenario);

    if (!result.success) {
      return result;
    }

    const protocols = this.extractUniqueProtocols(result.data);

    return {
      success: true,
      data: protocols,
    };
  },

  /**
   * 批量加载产品数据（regions, scenarios, durations）
   * @returns {Promise<{success: boolean, data?: Object, message?: string}>}
   */
  async loadProductCatalog() {
    try {
      const [regionsResult, scenariosResult, durationsResult] = await Promise.all([
        this.getRegions(),
        this.getScenarios(),
        this.getDurations(),
      ]);

      if (!regionsResult.success) {
        return {
          success: false,
          message: regionsResult.message || 'Failed to load regions',
        };
      }

      if (!scenariosResult.success) {
        return {
          success: false,
          message: scenariosResult.message || 'Failed to load scenarios',
        };
      }

      if (!durationsResult.success) {
        return {
          success: false,
          message: durationsResult.message || 'Failed to load durations',
        };
      }

      // 构建资源池
      const resourcePool = this.buildResourcePool(regionsResult.data);

      return {
        success: true,
        data: {
          regions: regionsResult.data,
          scenarios: scenariosResult.data,
          durations: durationsResult.data,
          resourcePool,
        },
      };
    } catch (error) {
      console.error('Load product catalog error:', error);
      return {
        success: false,
        message: error.message || 'Failed to load product catalog',
      };
    }
  },

  /**
   * 加载SKU数据并提取协议
   * @param {string} country - 国家代码
   * @param {string} scenario - 场景ID
   * @returns {Promise<{success: boolean, data?: Object, message?: string}>}
   */
  async loadSKUData(country, scenario) {
    const result = await this.getSKUs(country, scenario);

    if (!result.success) {
      return result;
    }

    const skus = result.data;
    const groupedSKUs = this.groupSKUsByBillingMode(skus);
    const protocols = this.extractUniqueProtocols(skus);

    return {
      success: true,
      data: {
        skus: groupedSKUs,
        protocols,
        rawSKUs: skus,
      },
    };
  },

  // ==================== 工具方法 ====================

  /**
   * 格式化协议名称显示
   * @param {string} protocol - 协议名称
   * @returns {string} 格式化后的协议名称
   */
  formatProtocolName(protocol) {
    if (!protocol) return '';
    return protocol.toUpperCase();
  },

  /**
   * 格式化库存状态
   * @param {number} available - 可用库存
   * @param {number} threshold - 低库存阈值（默认50）
   * @returns {Object} {label, color, isOutOfStock, isLowStock}
   */
  getStockStatus(available, threshold = 50) {
    if (available <= 0) {
      return {
        label: '缺货',
        color: 'text-red-500',
        bg: 'bg-red-50',
        isOutOfStock: true
      };
    }
    if (available < threshold) {
      return {
        label: `仅剩 ${available}`,
        color: 'text-amber-600',
        bg: 'bg-amber-50',
        isLowStock: true
      };
    }
    return {
      label: '充足',
      color: 'text-emerald-600',
      bg: 'bg-emerald-50'
    };
  },

  /**
   * 检查SKU是否可用
   * @param {Object} sku - SKU对象
   * @returns {boolean}
   */
  isSKUAvailable(sku) {
    return sku && sku.enabled && sku.stock > 0;
  },

  /**
   * 过滤可用的SKU
   * @param {Array} skus - SKU数组
   * @returns {Array} 可用的SKU列表
   */
  filterAvailableSKUs(skus) {
    if (!Array.isArray(skus)) return [];
    return skus.filter(sku => this.isSKUAvailable(sku));
  },

  /**
   * 获取推荐的首选协议
   * @param {Array<string>} availableProtocols - 可用协议列表
   * @returns {string} 推荐的协议
   */
  getRecommendedProtocol(availableProtocols) {
    if (!Array.isArray(availableProtocols) || availableProtocols.length === 0) {
      return 'SOCKS5'; // 默认协议
    }

    // 优先级顺序
    const protocolPriority = ['vless', 'vmess', 'socks', 'http', 'shadowtls'];

    for (const priority of protocolPriority) {
      const found = availableProtocols.find(p => p.toLowerCase().includes(priority));
      if (found) return found;
    }

    return availableProtocols[0];
  },

  /**
   * 验证选择的配置是否有效
   * @param {Object} config - 配置对象
   * @returns {Object} {valid: boolean, errors: Array<string>}
   */
  validateConfiguration(config) {
    const errors = [];

    if (!config.country) {
      errors.push('请选择国家/地区');
    }

    if (!config.scenario) {
      errors.push('请选择业务场景');
    }

    if (!config.protocol) {
      errors.push('请选择交付协议');
    }

    if (!config.duration) {
      errors.push('请选择购买时长');
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  },

  /**
   * 格式化价格显示
   * @param {number} price - 价格
   * @param {string} currency - 货币代码（默认USD）
   * @returns {string} 格式化后的价格字符串
   */
  formatPrice(price, currency = 'USD') {
    if (typeof price !== 'number') return '$0.00';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
    }).format(price);
  },

  /**
   * 格式化SKU规格显示
   * @param {Object} sku - SKU对象
   * @returns {string} 格式式化后的规格字符串
   */
  formatSKUSpec(sku) {
    if (!sku) return '';

    if (sku.billing_mode === 'traffic' && sku.traffic) {
      return sku.traffic;
    }

    if (sku.billing_mode === 'bandwidth' && sku.bandwidth) {
      return sku.bandwidth;
    }

    return sku.traffic || sku.bandwidth || '';
  },

  // ==================== 终端兼容性检查方法 ====================

  /**
   * 检查协议是否与终端兼容
   * @param {string} protocol - 协议名称（小写）
   * @param {Object} terminal - 终端对象
   * @returns {boolean}
   */
  isProtocolCompatibleWithTerminal(protocol, terminal) {
    if (!terminal || !terminal.compatible || !protocol) return true;

    const protocolLower = protocol.toLowerCase();
    return terminal.compatible.some(p => p.toLowerCase() === protocolLower);
  },

  /**
   * 获取终端兼容的协议列表（过滤可用协议）
   * @param {Object} terminal - 终端对象
   * @param {Array<string>} availableProtocols - 可用协议列表
   * @returns {Array<string>} 兼容的协议列表
   */
  getCompatibleProtocolsForTerminal(terminal, availableProtocols) {
    if (!terminal || !terminal.compatible || !Array.isArray(availableProtocols)) {
      return availableProtocols || [];
    }

    const compatibleLower = terminal.compatible.map(p => p.toLowerCase());
    return availableProtocols.filter(p => compatibleLower.includes(p.toLowerCase()));
  },

  /**
   * 获取终端推荐的协议（如果可用且兼容）
   * @param {Object} terminal - 终端对象
   * @param {Array<string>} availableProtocols - 可用协议列表
   * @returns {string|null} 推荐的协议，如果不兼容则返回第一个兼容协议
   */
  getRecommendedProtocolForTerminal(terminal, availableProtocols) {
    if (!terminal) return this.getRecommendedProtocol(availableProtocols);

    // 先使用终端的推荐协议
    if (terminal.recommendedProtocol) {
      const recProto = terminal.recommendedProtocol.toLowerCase();
      const isAvailable = availableProtocols.some(p => p.toLowerCase() === recProto);

      if (isAvailable) {
        return terminal.recommendedProtocol;
      }
    }

    // 如果推荐协议不可用，返回第一个兼容的协议
    const compatibleProtocols = this.getCompatibleProtocolsForTerminal(terminal, availableProtocols);
    return compatibleProtocols.length > 0 ? compatibleProtocols[0] : null;
  },

  /**
   * 检查协议是否应该被禁用（与选定终端不兼容）
   * @param {string} protocol - 协议名称
   * @param {Object} terminal - 选中的终端对象
   * @param {Array<string>} availableProtocols - 可用协议列表
   * @returns {boolean}
   */
  shouldDisableProtocol(protocol, terminal, availableProtocols) {
    if (!terminal) return false;

    // 检查协议是否在可用列表中
    const isAvailable = availableProtocols.some(p => p.toLowerCase() === protocol.toLowerCase());
    if (!isAvailable) return true;

    // 检查是否与终端兼容
    return !this.isProtocolCompatibleWithTerminal(protocol, terminal);
  },

  /**
   * 获取协议的禁用原因文本
   * @param {string} protocol - 协议名称
   * @param {Object} terminal - 选中的终端对象
   * @param {Array<string>} availableProtocols - 可用协议列表
   * @returns {string|null} 禁用原因，如果没有禁用则返回null
   */
  getProtocolDisableReason(protocol, terminal, availableProtocols) {
    if (!terminal) return null;

    const isAvailable = availableProtocols.some(p => p.toLowerCase() === protocol.toLowerCase());
    if (!isAvailable) {
      return '该协议暂不可用';
    }

    if (!this.isProtocolCompatibleWithTerminal(protocol, terminal)) {
      return `与 ${terminal.name} 不兼容`;
    }

    return null;
  },

  /**
   * 获取SKU的显示名称（包含规格）
   * @param {Object} sku - SKU对象
   * @returns {string} 显示名称
   */
  getSKUDisplayName(sku) {
    if (!sku) return '';

    const spec = this.formatSKUSpec(sku);
    if (spec) {
      return `${sku.name} - ${spec}`;
    }

    return sku.name;
  },

  /**
   * 按规格大小排序SKU
   * @param {Array} skus - SKU数组
   * @param {string} mode - 计费模式 (traffic/bandwidth)
   * @returns {Array} 排序后的SKU数组
   */
  sortSKUsBySpec(skus, mode = 'traffic') {
    if (!Array.isArray(skus)) return [];

    return skus.sort((a, b) => {
      const aValue = this.extractSpecValue(a, mode);
      const bValue = this.extractSpecValue(b, mode);
      return aValue - bValue;
    });
  },

  /**
   * 提取规格数值
   * @param {Object} sku - SKU对象
   * @param {string} mode - 计费模式 (traffic/bandwidth)
   * @returns {number} 规格数值
   */
  extractSpecValue(sku, mode = 'traffic') {
    if (!sku) return 0;

    if (mode === 'traffic' && sku.traffic) {
      const match = sku.traffic.match(/(\d+)/);
      return match ? parseInt(match[1], 10) : 0;
    }

    if (mode === 'bandwidth' && sku.bandwidth) {
      const match = sku.bandwidth.match(/(\d+)/);
      return match ? parseInt(match[1], 10) : 0;
    }

    return 0;
  },

  /**
   * 获取SKU的规格单位
   * @param {Object} sku - SKU对象
   * @returns {string} 规格单位 (GB/Mbps)
   */
  getSpecUnit(sku) {
    if (!sku) return '';

    if (sku.billing_mode === 'traffic') {
      return 'GB';
    }

    if (sku.billing_mode === 'bandwidth') {
      return 'Mbps';
    }

    return '';
  },

  /**
   * 检查SKU是否支持指定的规格
   * @param {Object} sku - SKU对象
   * @param {string} spec - 规格字符串 (如 "50GB", "10Mbps")
   * @returns {boolean}
   */
  hasSpec(sku, spec) {
    if (!sku || !spec) return false;

    if (sku.billing_mode === 'traffic') {
      return sku.traffic === spec;
    }

    if (sku.billing_mode === 'bandwidth') {
      return sku.bandwidth === spec;
    }

    return false;
  },

  /**
   * 获取可用的终端列表
   * @returns {Array<Object>} 终端列表
   */
  getTerminals() {
    return TERMINALS;
  },

  /**
   * 根据 ID 获取指定终端
   * @param {string} terminalId - 终端ID
   * @returns {Object|null} 终端对象
   */
  getTerminalById(terminalId) {
    return TERMINALS.find(t => t.id === terminalId) || null;
  },

  /**
   * 获取 SKU 的价格
   * @param {Object} sku - SKU对象
   * @param {string} period - 计费周期 (daily/weekly/monthly，默认monthly)
   * @returns {number} 价格
   */
  getSkuPrice(sku, period = 'monthly') {
    if (!sku || !sku.pricing) return 0;

    // 构建价格key：traffic_50GB 或 bandwidth_10Mbps
    let priceKey = '';
    if (sku.billing_mode === 'traffic' && sku.traffic) {
      priceKey = `traffic_${sku.traffic}`;
    } else if (sku.billing_mode === 'bandwidth' && sku.bandwidth) {
      priceKey = `bandwidth_${sku.bandwidth}`;
    }

    if (!priceKey) return 0;

    const pricingInfo = sku.pricing[priceKey];
    if (!pricingInfo) return 0;

    return pricingInfo[period] || pricingInfo.monthly || 0;
  },

  /**
   * 获取 SKU 的显示价格（格式化）
   * @param {Object} sku - SKU对象
   * @returns {string} 格式化后的价格字符串
   */
  getSkuDisplayPrice(sku) {
    const price = this.getSkuPrice(sku);
    if (price <= 0) return '价格待定';
    return `$${price}/月`;
  },
};

export default productService;
