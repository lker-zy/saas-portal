import clientAPI from '../api/client';

/**
 * 优惠券服务
 * 提供优惠券验证、列表获取等功能
 */
const couponService = {
  /**
   * 验证优惠券代码
   * @param {string} code - 优惠券代码
   * @param {number} amount - 订单金额（用于验证满减门槛）
   * @returns {Promise<Object>} 验证结果
   */
  async validateCoupon(code, amount = 0) {
    try {
      const response = await clientAPI.validateCoupon(code, amount);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error('验证优惠券失败:', error);
      return {
        success: false,
        error: error.response?.data?.message || '验证优惠券失败',
      };
    }
  },

  /**
   * 获取当前用户的优惠券列表
   * @returns {Promise<Object>} 优惠券列表
   */
  async getCoupons() {
    try {
      const response = await clientAPI.getCoupons();
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error('获取优惠券列表失败:', error);
      return {
        success: false,
        error: error.response?.data?.message || '获取优惠券列表失败',
      };
    }
  },

  /**
   * 兑换优惠券代码
   * @param {string} code - 优惠券代码
   * @returns {Promise<Object>} 兑换结果
   */
  async redeemCoupon(code) {
    try {
      const response = await clientAPI.redeemCoupon(code);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error('兑换优惠券失败:', error);
      return {
        success: false,
        error: error.response?.data?.message || '兑换优惠券失败',
      };
    }
  },

  /**
   * 格式化优惠券数据用于显示
   * @param {Object} couponData - 后端返回的优惠券数据
   * @returns {Object} 格式化后的优惠券数据
   */
  formatCouponForDisplay(couponData) {
    const coupon = couponData.coupon || {};
    return {
      code: coupon.code || couponData.code,
      type: coupon.type === 'amount_off' ? 'fixed' : 'percentage',
      discountPercent: coupon.type === 'discount' ? coupon.discountValue : 0,
      fixedDiscount: coupon.type === 'amount_off' ? coupon.discountValue : 0,
      label: coupon.name || '优惠券',
      description: coupon.name || '优惠券折扣',
      minSpend: coupon.threshold || 0,
      maxDiscount: coupon.discountValue || 0,
      expiryDate: couponData.expiresAt || '',
      status: couponData.status || 'unknown',
      canUse: couponData.canUse || false,
      reason: couponData.cannotUseReason || couponData.reason || '',
    };
  },
};

export default couponService;
