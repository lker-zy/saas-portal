import axios from './axiosConfig';

/**
 * Product API Client
 * Port: 8889 (Order service)
 * Provides: Product catalog queries (regions, scenarios, SKUs, durations, price calculation)
 */
export const productAPI = {
  /**
   * Get available regions
   * @returns {Promise} { regions: Array<RegionInfo> }
   */
  getRegions: () =>
    axios.get('/order/client/products/regions'),

  /**
   * Get available scenarios (business categories)
   * @returns {Promise} { scenarios: Array<BusinessCategory> }
   */
  getScenarios: () =>
    axios.get('/order/client/products/scenarios'),

  /**
   * Get available SKUs for a country and scenario
   * @param {string} country - Country code (e.g., 'US', 'GB')
   * @param {string} scenario - Scenario ID (e.g., 'amazon', 'facebook')
   * @returns {Promise} { skus: Array<SKU> }
   */
  getSKUs: (country, scenario) =>
    axios.get('/order/client/products/skus', {
      params: { country, scenario },
    }),

  /**
   * Get available purchase durations
   * @returns {Promise} { durations: Array<Duration> }
   */
  getDurations: () =>
    axios.get('/order/client/products/durations'),

  /**
   * Calculate price for selected configuration
   * @param {Object} params - Calculation parameters
   * @param {string} params.country - Country code
   * @param {string} params.scenario - Scenario ID
   * @param {string} params.sku_id - SKU ID
   * @param {number} params.duration_days - Purchase duration in days
   * @returns {Promise} { price: number, originalPrice: number, discount: number }
   */
  calculatePrice: (params) =>
    axios.post('/order/client/products/calculate', params),

  /**
   * Get stock status for a country and scenario
   * @param {string} country - Country code (e.g., 'US', 'GB')
   * @param {string} scenario - Scenario ID (e.g., 'amazon', 'facebook')
   * @returns {Promise} { stock: number, country: string, scenario: string }
   */
  getStock: (country, scenario) =>
    axios.get('/order/client/products/stock', {
      params: { country, scenario },
    }),
};

export default productAPI;
