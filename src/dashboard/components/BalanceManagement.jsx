import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { balanceService } from '../services/balanceService';
import {
  Wallet,
  ArrowUpCircle,
  ArrowDownCircle,
  Clock,
  RefreshCw,
  CreditCard,
  AlertCircle,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

/**
 * 余额管理页面组件
 * 显示余额和交易历史
 */
const BalanceManagement = () => {
  const { user, refreshUserInfo } = useAuth();
  const [balance, setBalance] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const pageSize = 10;
  const [message, setMessage] = useState(null);

  /**
   * 显示提示消息
   */
  const showMessage = (msg, type = 'success') => {
    setMessage({ text: msg, type });
    setTimeout(() => setMessage(null), 3000);
  };

  /**
   * 获取余额数据
   */
  const fetchBalance = async () => {
    try {
      const result = await balanceService.getBalance();
      if (result.success) {
        setBalance(result.data);
      } else {
        showMessage(result.message || '获取余额失败', 'error');
      }
    } catch (error) {
      console.error('Fetch balance error:', error);
      showMessage('获取余额失败，请稍后重试', 'error');
    }
  };

  /**
   * 获取交易历史
   */
  const fetchTransactions = async (page) => {
    try {
      const result = await balanceService.getTransactions({ page, pageSize });
      if (result.success) {
        setTransactions(result.data.transactions || []);
        setTotal(result.data.total || 0);
        setTotalPages(Math.ceil((result.data.total || 0) / pageSize));
      } else {
        showMessage(result.message || '获取交易历史失败', 'error');
      }
    } catch (error) {
      console.error('Fetch transactions error:', error);
      showMessage('获取交易历史失败，请稍后重试', 'error');
    }
  };

  /**
   * 刷新数据
   */
  const handleRefresh = async () => {
    setRefreshing(true);
    await Promise.all([
      fetchBalance(),
      fetchTransactions(currentPage),
      refreshUserInfo(),
    ]);
    setRefreshing(false);
    showMessage('数据已刷新', 'success');
  };

  /**
   * 初始化数据
   */
  useEffect(() => {
    const init = async () => {
      setLoading(true);
      await Promise.all([
        fetchBalance(),
        fetchTransactions(1),
      ]);
      setLoading(false);
    };

    init();
  }, []);

  /**
   * 页码变化
   */
  useEffect(() => {
    if (currentPage > 1) {
      fetchTransactions(currentPage);
    }
  }, [currentPage]);

  /**
   * 处理充值按钮点击
   */
  const handleRecharge = () => {
    // TODO: 打开充值模态框
    showMessage('充值功能开发中', 'info');
  };

  /**
   * 渲染加载状态
   */
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">加载中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* 页面标题 */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">余额管理</h1>
          <p className="text-gray-600 mt-1">查看您的余额和交易记录</p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
          刷新
        </button>
      </div>

      {/* 消息提示 */}
      {message && (
        <div
          className={`mb-6 rounded-lg p-4 flex items-center ${
            message.type === 'success'
              ? 'bg-green-50 text-green-800 border border-green-200'
              : message.type === 'info'
              ? 'bg-blue-50 text-blue-800 border border-blue-200'
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

      {/* 余额卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* 当前余额 */}
        <div className="md:col-span-2 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm mb-1">当前余额</p>
              <div className="text-4xl font-bold">
                ¥{balanceService.formatBalance(balance?.balance || user?.balance || 0)}
              </div>
              {balance?.lastUpdated && (
                <p className="text-blue-200 text-xs mt-2 flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  更新时间: {balance.lastUpdated}
                </p>
              )}
            </div>
            <Wallet className="h-16 w-16 text-blue-300 opacity-50" />
          </div>
        </div>

        {/* 充值入口 */}
        <button
          onClick={handleRecharge}
          className="bg-white rounded-lg shadow-sm border-2 border-dashed border-gray-300 p-6 flex flex-col items-center justify-center hover:border-blue-500 hover:bg-blue-50 transition-colors"
        >
          <CreditCard className="h-10 w-10 text-gray-400 mb-2" />
          <span className="font-semibold text-gray-700">立即充值</span>
        </button>
      </div>

      {/* 交易历史 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">交易历史</h2>
        </div>

        {transactions.length === 0 ? (
          <div className="p-12 text-center">
            <Clock className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">暂无交易记录</p>
          </div>
        ) : (
          <>
            {/* 交易列表 */}
            <div className="divide-y divide-gray-200">
              {transactions.map((transaction) => (
                <div key={transaction.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center flex-1">
                      {/* 金额图标 */}
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                        balanceService.isIncome(transaction.transactionType)
                          ? 'bg-green-100'
                          : 'bg-red-100'
                      }`}>
                        {balanceService.isIncome(transaction.transactionType) ? (
                          <ArrowUpCircle className="h-5 w-5 text-green-600" />
                        ) : (
                          <ArrowDownCircle className="h-5 w-5 text-red-600" />
                        )}
                      </div>

                      {/* 交易信息 */}
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">
                              {balanceService.formatTransactionType(transaction.transactionType)}
                            </p>
                            <p className="text-sm text-gray-500">{transaction.description}</p>
                          </div>
                          <div className="text-right">
                            <p
                              className={`font-semibold ${
                                balanceService.isIncome(transaction.transactionType)
                                  ? 'text-green-600'
                                  : 'text-red-600'
                              }`}
                            >
                              {balanceService.isIncome(transaction.transactionType) ? '+' : '-'}
                              ¥{balanceService.formatBalance(transaction.amount)}
                            </p>
                            <p className="text-xs text-gray-500">
                              余额: ¥{balanceService.formatBalance(transaction.balanceAfter)}
                            </p>
                          </div>
                        </div>

                        {/* 交易时间 */}
                        <p className="text-xs text-gray-400 mt-1 flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {transaction.createdAt}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 分页 */}
            {totalPages > 1 && (
              <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  共 {total} 条记录，第 {currentPage} / {totalPages} 页
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    上一页
                  </button>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    下一页
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* 底部提示 */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex">
          <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
          <div className="text-sm text-blue-800">
            <p className="font-semibold mb-1">余额说明</p>
            <ul className="list-disc list-inside space-y-1 text-blue-700">
              <li>余额可用于购买代理服务产品</li>
              <li>所有交易记录都会保存在交易历史中</li>
              <li>如对余额有疑问，请联系客服</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalanceManagement;
