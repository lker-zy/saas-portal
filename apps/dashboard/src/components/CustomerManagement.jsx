import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { customerService } from '../services/customerService';
import { usePermissions } from '../hooks/usePermissions';
import {
  Users,
  Search,
  Filter,
  RefreshCw,
  Edit,
  Ban,
  CheckCircle,
  XCircle,
  Wallet,
  Mail,
  Phone,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Eye,
  MoreVertical,
  DollarSign,
  Lock,
} from 'lucide-react';

/**
 * 客户管理组件
 * 平台管理员管理终端用户
 * 管理员有完整操作权限，非管理员只有只读权限
 */
const CustomerManagement = () => {
  const { t } = useTranslation();
  const { isAdmin } = usePermissions();
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [message, setMessage] = useState(null);

  // 分页和筛选状态
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // 搜索和筛选
  const [searchKeyword, setSearchKeyword] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [emailFilter, setEmailFilter] = useState('');

  // 选中的客户
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showBalanceModal, setShowBalanceModal] = useState(false);

  // 编辑表单
  const [editForm, setEditForm] = useState({
    nickname: '',
    phone: '',
    accountStatus: '',
    autoRenew: false,
  });

  // 余额调整表单
  const [balanceForm, setBalanceForm] = useState({
    amount: '',
    description: '',
  });

  /**
   * 显示提示消息
   */
  const showMessage = (msg, type = 'success') => {
    setMessage({ text: msg, type });
    setTimeout(() => setMessage(null), 3000);
  };

  /**
   * 获取客户列表
   */
  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const params = {
        page: currentPage,
        pageSize,
        search: searchKeyword,
        accountStatus: statusFilter,
        email: emailFilter,
      };

      const result = await customerService.getCustomers(params);
      if (result.success) {
        // Backend returns: { total: 7, data: [...] }
        setCustomers(result.data.data || []);
        setTotal(result.data.total || 0);
        setTotalPages(Math.ceil((result.data.total || 0) / pageSize));
      } else {
        showMessage(result.message || '获取客户列表失败', 'error');
      }
    } catch (error) {
      console.error('Fetch customers error:', error);
      showMessage('获取客户列表失败，请稍后重试', 'error');
    } finally {
      setLoading(false);
    }
  };

  /**
   * 刷新数据
   */
  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchCustomers();
    setRefreshing(false);
    showMessage('数据已刷新', 'success');
  };

  /**
   * 搜索处理
   */
  const handleSearch = () => {
    setCurrentPage(1);
    fetchCustomers();
  };

  /**
   * 打开客户详情
   */
  const handleViewDetail = async (customer) => {
    setSelectedCustomer(customer);
    setShowDetailModal(true);
  };

  /**
   * 打开编辑对话框
   */
  const handleOpenEdit = (customer) => {
    if (!isAdmin) {
      showMessage('需要管理员权限才能编辑客户信息', 'error');
      return;
    }
    setSelectedCustomer(customer);
    setEditForm({
      nickname: customer.nickname || '',
      phone: customer.phone || '',
      accountStatus: customer.accountStatus || '',
      autoRenew: customer.autoRenew || false,
    });
    setShowEditModal(true);
  };

  /**
   * 保存编辑
   */
  const handleSaveEdit = async () => {
    try {
      const result = await customerService.updateCustomer(selectedCustomer.id, editForm);
      if (result.success) {
        showMessage('客户信息已更新', 'success');
        setShowEditModal(false);
        fetchCustomers();
      } else {
        showMessage(result.message || '更新失败', 'error');
      }
    } catch (error) {
      console.error('Update customer error:', error);
      showMessage('更新失败，请稍后重试', 'error');
    }
  };

  /**
   * 更新客户状态
   */
  const handleUpdateStatus = async (customer, newStatus) => {
    try {
      const result = await customerService.updateCustomerStatus(customer.id, newStatus);
      if (result.success) {
        showMessage(`客户状态已更新为 ${newStatus}`, 'success');
        fetchCustomers();
      } else {
        showMessage(result.message || '状态更新失败', 'error');
      }
    } catch (error) {
      console.error('Update status error:', error);
      showMessage('状态更新失败，请稍后重试', 'error');
    }
  };

  /**
   * 打开余额调整对话框
   */
  const handleOpenBalance = (customer) => {
    if (!isAdmin) {
      showMessage('需要管理员权限才能调整余额', 'error');
      return;
    }
    setSelectedCustomer(customer);
    setBalanceForm({
      amount: '',
      description: '',
    });
    setShowBalanceModal(true);
  };

  /**
   * 调整余额
   */
  const handleAdjustBalance = async () => {
    const amount = parseFloat(balanceForm.amount);
    if (isNaN(amount) || amount === 0) {
      showMessage('请输入有效的金额', 'error');
      return;
    }

    try {
      const result = await customerService.adjustBalance(selectedCustomer.id, {
        amount,
        description: balanceForm.description || '管理员手动调整',
      });
      if (result.success) {
        showMessage(`余额已${amount > 0 ? '增加' : '扣除'} ${Math.abs(amount)}`, 'success');
        setShowBalanceModal(false);
        fetchCustomers();
      } else {
        showMessage(result.message || '余额调整失败', 'error');
      }
    } catch (error) {
      console.error('Adjust balance error:', error);
      showMessage('余额调整失败，请稍后重试', 'error');
    }
  };

  /**
   * 格式化状态标签
   */
  const getStatusBadge = (status) => {
    const statusMap = {
      normal: { text: '正常', color: 'bg-green-100 text-green-800' },
      suspended: { text: '暂停', color: 'bg-yellow-100 text-yellow-800' },
      banned: { text: '封禁', color: 'bg-red-100 text-red-800' },
    };
    const s = statusMap[status] || { text: status, color: 'bg-gray-100 text-gray-800' };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${s.color}`}>
        {s.text}
      </span>
    );
  };

  /**
   * 初始化
   */
  useEffect(() => {
    fetchCustomers();
  }, [currentPage, pageSize]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* 提示消息 */}
      {message && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg ${
          message.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`}>
          {message.text}
        </div>
      )}

      {/* 头部 */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">客户管理</h1>
            <p className="text-gray-600">管理平台注册用户、余额和账户状态</p>
          </div>
          {!isAdmin && (
            <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200 rounded-lg">
              <Lock className="w-4 h-4 text-amber-600" />
              <span className="text-sm text-amber-800">只读模式 - 仅管理员可操作</span>
            </div>
          )}
        </div>
      </div>

      {/* 工具栏 */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-wrap gap-4 items-center">
          {/* 搜索 */}
          <div className="flex-1 min-w-[200px] flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="搜索邮箱或昵称"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={handleSearch}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <Search className="w-4 h-4" />
              搜索
            </button>
          </div>

          {/* 状态筛选 */}
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
              fetchCustomers();
            }}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">全部状态</option>
            <option value="normal">正常</option>
            <option value="suspended">暂停</option>
            <option value="banned">封禁</option>
          </select>

          {/* 刷新 */}
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2 disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            刷新
          </button>
        </div>
      </div>

      {/* 客户列表 */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">
            <RefreshCw className="w-6 h-6 mx-auto mb-2 animate-spin" />
            加载中...
          </div>
        ) : customers.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <Users className="w-12 h-12 mx-auto mb-2 opacity-50" />
            暂无客户数据
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">邮箱</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">昵称</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">余额</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">状态</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">注册时间</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {customers.map((customer) => (
                    <tr key={customer.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">{customer.id}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-900">{customer.email}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{customer.nickname || '-'}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4 text-gray-400" />
                          <span className="text-sm font-medium text-gray-900">
                            {customer.balance.toFixed(2)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">{getStatusBadge(customer.accountStatus)}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {customer.createdAt ? new Date(customer.createdAt).toLocaleDateString() : '-'}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleViewDetail(customer)}
                            className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded"
                            title="查看详情"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          {isAdmin ? (
                            <>
                              <button
                                onClick={() => handleOpenEdit(customer)}
                                className="p-1 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded"
                                title="编辑"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleOpenBalance(customer)}
                                className="p-1 text-green-600 hover:text-green-800 hover:bg-green-50 rounded"
                                title="调整余额"
                              >
                                <Wallet className="w-4 h-4" />
                              </button>
                            </>
                          ) : (
                            <button
                              disabled
                              className="p-1 text-gray-400 cursor-not-allowed rounded"
                              title="需要管理员权限"
                            >
                              <Lock className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* 分页 */}
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-700">
                共 {total} 条记录，第 {currentPage} / {totalPages} 页
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                  className="p-2 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <ChevronLeft className="w-4 h-4 -ml-3" />
                </button>
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="px-4 py-2 text-sm text-gray-700">
                  第 {currentPage} 页
                </span>
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
                  className="p-2 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-4 h-4" />
                  <ChevronRight className="w-4 h-4 -ml-3" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* 客户详情弹窗 */}
      {showDetailModal && selectedCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4">客户详情</h2>
              <button
                onClick={() => setShowDetailModal(false)}
                className="absolute top-6 right-6 text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-500">用户 ID</label>
                    <p className="text-gray-900 font-medium">{selectedCustomer.id}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">邮箱</label>
                    <p className="text-gray-900 font-medium">{selectedCustomer.email}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">昵称</label>
                    <p className="text-gray-900 font-medium">{selectedCustomer.nickname || '-'}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">手机号</label>
                    <p className="text-gray-900 font-medium">{selectedCustomer.phone || '-'}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">余额</label>
                    <p className="text-gray-900 font-medium text-green-600">
                      ${selectedCustomer.balance.toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">账户状态</label>
                    <p>{getStatusBadge(selectedCustomer.accountStatus)}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">自动续费</label>
                    <p className="text-gray-900 font-medium">
                      {selectedCustomer.autoRenew ? '已开启' : '未开启'}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">邀请码</label>
                    <p className="text-gray-900 font-medium">{selectedCustomer.invitationCode || '-'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 编辑弹窗 */}
      {showEditModal && selectedCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">编辑客户信息</h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">昵称</label>
                <input
                  type="text"
                  value={editForm.nickname}
                  onChange={(e) => setEditForm({ ...editForm, nickname: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">手机号</label>
                <input
                  type="text"
                  value={editForm.phone}
                  onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">账户状态</label>
                <select
                  value={editForm.accountStatus}
                  onChange={(e) => setEditForm({ ...editForm, accountStatus: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="normal">正常</option>
                  <option value="suspended">暂停</option>
                  <option value="banned">封禁</option>
                </select>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="autoRenew"
                  checked={editForm.autoRenew}
                  onChange={(e) => setEditForm({ ...editForm, autoRenew: e.target.checked })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="autoRenew" className="ml-2 text-sm text-gray-700">自动续费</label>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                取消
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                保存
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 余额调整弹窗 */}
      {showBalanceModal && selectedCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">调整客户余额</h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">当前余额</label>
                <p className="text-lg font-semibold text-green-600">
                  ${selectedCustomer.balance.toFixed(2)}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  调整金额 <span className="text-gray-400 font-normal">（正数增加，负数扣除）</span>
                </label>
                <input
                  type="number"
                  value={balanceForm.amount}
                  onChange={(e) => setBalanceForm({ ...balanceForm, amount: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="例如: 50 或 -30"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">调整原因</label>
                <textarea
                  value={balanceForm.description}
                  onChange={(e) => setBalanceForm({ ...balanceForm, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  rows="3"
                  placeholder="例如: 管理员充值、活动奖励等"
                />
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => setShowBalanceModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                取消
              </button>
              <button
                onClick={handleAdjustBalance}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                确认调整
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerManagement;
