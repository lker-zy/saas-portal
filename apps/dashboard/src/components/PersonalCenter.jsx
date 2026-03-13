import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { userService } from '../services/userService';
import ChangePasswordModal from './ChangePasswordModal';
import {
  User,
  Mail,
  Phone,
  Edit2,
  Save,
  X,
  CheckCircle,
  AlertCircle,
  Calendar,
  Shield,
  Lock,
} from 'lucide-react';

/**
 * 个人中心页面组件
 * 显示和编辑用户个人信息
 */
const PersonalCenter = () => {
  const { user, refreshUserInfo } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [formData, setFormData] = useState({
    nickname: '',
    phone: '',
  });

  // 初始化表单数据
  useEffect(() => {
    if (user) {
      setFormData({
        nickname: user.nickname || '',
        phone: user.phone || '',
      });
    }
  }, [user]);

  /**
   * 显示提示消息
   */
  const showMessage = (msg, type = 'success') => {
    setMessage({ text: msg, type });
    setTimeout(() => setMessage(null), 3000);
  };

  /**
   * 处理编辑按钮点击
   */
  const handleEdit = () => {
    setIsEditing(true);
    setMessage(null);
  };

  /**
   * 处理取消按钮点击
   */
  const handleCancel = () => {
    setIsEditing(false);
    // 重置表单数据
    if (user) {
      setFormData({
        nickname: user.nickname || '',
        phone: user.phone || '',
      });
    }
    setMessage(null);
  };

  /**
   * 处理表单提交
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const result = await userService.updateProfile(formData);

      if (result.success) {
        // 刷新用户信息
        await refreshUserInfo();
        setIsEditing(false);
        showMessage('个人资料更新成功', 'success');
      } else {
        showMessage(result.message || '更新失败', 'error');
      }
    } catch (error) {
      console.error('Update profile error:', error);
      showMessage('更新失败，请稍后重试', 'error');
    } finally {
      setLoading(false);
    }
  };

  /**
   * 处理输入变化
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">加载中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* 页面标题 */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">个人中心</h1>
        <p className="text-gray-600 mt-1">查看和管理您的个人信息</p>
      </div>

      {/* 消息提示 */}
      {message && (
        <div
          className={`mb-6 rounded-lg p-4 flex items-center ${
            message.type === 'success'
              ? 'bg-green-50 text-green-800 border border-green-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          {message.type === 'success' ? (
            <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0" />
          ) : (
            <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      {/* 主卡片 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* 头部 */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-8">
          <div className="flex items-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-blue-600 text-2xl font-bold shadow-lg">
              {(user.nickname || user.email || 'User').charAt(0).toUpperCase()}
            </div>
            <div className="ml-4 text-white">
              <h2 className="text-xl font-bold">{user.nickname || '未设置昵称'}</h2>
              <p className="text-blue-100 text-sm">{user.email}</p>
            </div>
          </div>
        </div>

        {/* 内容区域 */}
        <div className="p-6">
          <form onSubmit={handleSubmit}>
            {/* 账户信息 */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <User className="h-5 w-5 mr-2" />
                账户信息
              </h3>

              <div className="space-y-4">
                {/* 邮箱 - 只读 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Mail className="h-4 w-4 inline mr-1" />
                    邮箱地址
                  </label>
                  <input
                    type="email"
                    value={user.email}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
                  />
                  <p className="text-xs text-gray-500 mt-1">邮箱地址不可修改</p>
                </div>

                {/* 昵称 - 可编辑 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    昵称
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="nickname"
                      value={formData.nickname}
                      onChange={handleChange}
                      placeholder="请输入昵称"
                      maxLength={64}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <div className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50">
                      {user.nickname || '未设置'}
                    </div>
                  )}
                </div>

                {/* 手机号 - 可编辑 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Phone className="h-4 w-4 inline mr-1" />
                    手机号
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="请输入手机号"
                      maxLength={20}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <div className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50">
                      {user.phone || '未设置'}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 账户状态 */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                账户状态
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-1">账户状态</div>
                  <div className="font-semibold text-gray-900">
                    {user.status || 'normal'}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-1">
                    <Calendar className="h-4 w-4 inline mr-1" />
                    注册时间
                  </div>
                  <div className="font-semibold text-gray-900 text-sm">
                    {user.createdAt || '-'}
                  </div>
                </div>
              </div>
            </div>

            {/* 操作按钮 */}
            <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
              {isEditing ? (
                <>
                  <button
                    type="button"
                    onClick={handleCancel}
                    disabled={loading}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <X className="h-4 w-4 inline mr-1" />
                    取消
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        保存中...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-1" />
                        保存
                      </>
                    )}
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={handleEdit}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center"
                >
                  <Edit2 className="h-4 w-4 mr-1" />
                  编辑资料
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* 修改密码入口 */}
      <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Lock className="h-5 w-5 text-gray-600 mr-3" />
            <div>
              <h3 className="font-semibold text-gray-900">修改密码</h3>
              <p className="text-sm text-gray-600">定期修改密码可以保护您的账户安全</p>
            </div>
          </div>
          <button
            type="button"
            className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => setShowPasswordModal(true)}
          >
            修改密码
          </button>
        </div>
      </div>

      {/* 修改密码模态框 */}
      <ChangePasswordModal
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
      />
    </div>
  );
};

export default PersonalCenter;
