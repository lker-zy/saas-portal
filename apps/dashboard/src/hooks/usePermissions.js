import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

/**
 * 权限检查Hook
 * 用于检查当前用户是否具有特定权限
 */
export const usePermissions = () => {
  const { user } = useContext(AuthContext);

  /**
   * 检查用户是否是管理员
   * @returns {boolean}
   */
  const isAdmin = () => {
    if (!user) return false;

    // 方法1: 检查用户ID（与后端保持一致：userId == 1 是超级管理员）
    if (user.id === 1 || user.userId === 1) {
      return true;
    }

    // 方法2: 检查用户名（与后端保持一致：username == "admin" 是超级管理员）
    if (user.username === 'admin' || user.email === 'admin') {
      return true;
    }

    // 方法3: 检查roleCode
    if (user.roleCode === 'super_admin' || user.roleCode === 'admin') {
      return true;
    }

    // 方法4: 检查roleId
    if (user.roleId === 1) {
      return true;
    }

    // 方法5: 检查permissions数组中是否包含管理权限
    if (user.permissions && Array.isArray(user.permissions)) {
      const adminPermissions = [
        'customer:edit',
        'customer:delete',
        'customer:balance',
        'system:admin'
      ];
      return user.permissions.some(p => adminPermissions.includes(p));
    }

    return false;
  };

  /**
   * 检查用户是否有特定权限
   * @param {string} permission - 权限标识
   * @returns {boolean}
   */
  const hasPermission = (permission) => {
    if (!user) return false;

    // 管理员拥有所有权限
    if (isAdmin()) return true;

    // 检查permissions数组
    if (user.permissions && Array.isArray(user.permissions)) {
      return user.permissions.includes(permission);
    }

    return false;
  };

  /**
   * 检查用户是否有任一权限
   * @param {string[]} permissions - 权限标识数组
   * @returns {boolean}
   */
  const hasAnyPermission = (permissions) => {
    if (!user || !Array.isArray(permissions)) return false;
    return permissions.some(p => hasPermission(p));
  };

  /**
   * 检查用户是否有所有权限
   * @param {string[]} permissions - 权限标识数组
   * @returns {boolean}
   */
  const hasAllPermissions = (permissions) => {
    if (!user || !Array.isArray(permissions)) return false;
    return permissions.every(p => hasPermission(p));
  };

  return {
    user,
    isAdmin,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
  };
};

export default usePermissions;
