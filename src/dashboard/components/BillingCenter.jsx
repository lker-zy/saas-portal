import React, { useState, useMemo, useEffect } from 'react';
import {
  CreditCard,
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Download,
  Filter,
  Search,
  RefreshCw,
  Plus,
  ArrowRight,
  Receipt,
  FileText,
  X,
  Building2,
  Mail,
  ChevronRight,
  TrendingUp,
  Ticket,
  MapPin,
  Globe,
  User,
  Hash,
  Calendar,
  ChevronDown
} from 'lucide-react';
import { balanceService } from '../services/balanceService';
import { orderAPI } from '../api/order';

/* ── 读取统一余额（与 inviteSystem 共享 localStorage） ── */
const STORAGE_KEY = 'sales_invite_system_v1';
function getUnifiedBalance(email = 'alex@example.com') {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const state = JSON.parse(raw);
    if (!state?.users) return null;
    const user = state.users.find(u =>
      String(u.email || '').toLowerCase() === String(email).toLowerCase()
    );
    return user ? Number(user.balance) || 0 : null;
  } catch {
    return null;
  }
}

// --- Recharge Modal (Unchanged) ---
const RechargeModal = ({ isOpen, onClose, paymentMethods = [] }) => {
  const [amount, setAmount] = useState(100);
  const [customAmount, setCustomAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('alipay');
  
  if (!isOpen) return null;

  const handleAmountSelect = (val) => {
    setAmount(val);
    setCustomAmount('');
  };

  const finalAmount = customAmount ? parseFloat(customAmount) : amount;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-xl w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h3 className="font-bold text-gray-900">账户充值</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Amount Selection */}
          <div>
             <label className="block text-sm font-bold text-gray-700 mb-3">充值金额</label>
             <div className="grid grid-cols-3 gap-3 mb-3">
               {[50, 100, 200, 500, 1000].map(val => (
                 <button
                   key={val}
                   onClick={() => handleAmountSelect(val)}
                   className={`py-2 rounded-lg text-sm font-bold border transition-all ${
                     amount === val && !customAmount
                       ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                       : 'border-gray-200 hover:border-gray-300 text-gray-600'
                   }`}
                 >
                   ${val}
                 </button>
               ))}
               <div className="relative">
                 <input
                   type="number"
                   placeholder="自定义"
                   value={customAmount}
                   onChange={(e) => {
                     setCustomAmount(e.target.value);
                     setAmount(0);
                   }}
                   className={`w-full h-full px-3 rounded-lg border text-sm font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/20 ${
                     customAmount ? 'border-indigo-600 text-indigo-700' : 'border-gray-200'
                   }`}
                 />
               </div>
             </div>
          </div>

          {/* Payment Method */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3">支付方式</label>
            <div className="space-y-2">
              {paymentMethods.filter(m => m.id !== 'balance').map(method => (
                <button
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all ${
                    selectedMethod === method.id
                      ? 'border-indigo-600 bg-indigo-50/50 ring-1 ring-indigo-600'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-white border border-gray-100 shadow-sm`}>
                       {method.id === 'alipay' && <span className="text-blue-500 font-bold text-xs">支</span>}
                       {method.id === 'wechat' && <span className="text-green-500 font-bold text-xs">微</span>}
                       {method.id === 'usdt' && <span className="text-emerald-500 font-bold text-xs">₮</span>}
                       {method.id === 'card' && <CreditCard className="w-4 h-4 text-indigo-500" />}
                    </div>
                    <span className="font-medium text-gray-900">{method.name}</span>
                  </div>
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                    selectedMethod === method.id ? 'border-indigo-600 bg-indigo-600' : 'border-gray-300 bg-white'
                  }`}>
                    {selectedMethod === method.id && <div className="w-2 h-2 bg-white rounded-full" />}
                  </div>
                </button>
              ))}
            </div>
          </div>
          
          {/* Coupon Input */}
          <div className="bg-gray-50 p-3 rounded-lg border border-dashed border-gray-200">
             <div className="flex items-center gap-2 mb-2 text-xs text-gray-500 font-medium">
               <Ticket className="w-3 h-3" /> 使用优惠券/卡密
             </div>
             <div className="flex gap-2">
               <input 
                 type="text" 
                 placeholder="输入代码" 
                 className="flex-1 bg-white border border-gray-200 rounded px-2 py-1.5 text-xs focus:outline-none focus:border-indigo-500"
               />
               <button className="text-xs bg-gray-900 text-white px-3 py-1.5 rounded font-bold hover:bg-black">兑换</button>
             </div>
          </div>
        </div>

        <div className="p-4 border-t border-gray-100 bg-gray-50/50 flex justify-between items-center">
          <div className="text-sm text-gray-500">
             实付金额: <span className="text-xl font-bold text-gray-900">${finalAmount || 0}</span>
          </div>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg font-bold shadow-lg shadow-indigo-200 transition-all active:scale-95">
             确认支付
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Global Invoice Settings Modal (Unchanged) ---
const InvoiceSettingsModal = ({ isOpen, onClose }) => {
  const [entityType, setEntityType] = useState('company'); // 'company' or 'individual'

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
       <div className="bg-white rounded-xl w-full max-w-lg shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4 duration-200">
          <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              <Receipt className="w-5 h-5 text-gray-500" /> Invoice Settings (账单设置)
            </h3>
            <button onClick={onClose}><X className="w-5 h-5 text-gray-400 hover:text-gray-600" /></button>
          </div>
          
          <div className="p-6 max-h-[80vh] overflow-y-auto">
             <div className="bg-gray-50 text-gray-600 text-xs p-3 rounded-lg mb-6 flex items-start gap-2 border border-gray-100">
               <AlertCircle className="w-4 h-4 mt-0.5 shrink-0 text-indigo-500" />
               请完善您的账单信息，这些信息将显示在您的下载发票 (Invoice) 上。
             </div>

             <div className="space-y-5">
                {/* Entity Type */}
                <div>
                   <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Entity Type (主体类型)</label>
                   <div className="flex gap-3">
                     <button 
                       onClick={() => setEntityType('company')}
                       className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-all ${entityType === 'company' ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                     >
                       Company (企业)
                     </button>
                     <button 
                       onClick={() => setEntityType('individual')}
                       className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-all ${entityType === 'individual' ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                     >
                       Individual (个人)
                     </button>
                   </div>
                </div>

                {/* Name & ID */}
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                      {entityType === 'company' ? 'Company Name (公司名称)' : 'Full Name (姓名)'}
                    </label>
                    <div className="relative">
                      {entityType === 'company' ? <Building2 className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" /> : <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />}
                      <input type="text" className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" placeholder={entityType === 'company' ? "e.g. Acme Corp" : "e.g. John Doe"} />
                    </div>
                  </div>
                  
                  {entityType === 'company' && (
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Tax ID / VAT Number (税务/增值税号) <span className="text-gray-400 font-normal lowercase">(optional)</span></label>
                      <div className="relative">
                        <Hash className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input type="text" className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" placeholder="e.g. US123456789" />
                      </div>
                    </div>
                  )}
                </div>

                <hr className="border-gray-100" />

                {/* Billing Address */}
                <div>
                   <h4 className="font-bold text-gray-900 text-sm mb-3">Billing Address (账单地址)</h4>
                   <div className="grid grid-cols-1 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Country / Region (国家/地区)</label>
                        <div className="relative">
                           <Globe className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                           <select className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white">
                             <option>United States</option>
                             <option>United Kingdom</option>
                             <option>Singapore</option>
                             <option>China</option>
                             <option>Japan</option>
                             <option>Germany</option>
                             {/* Add more countries */}
                           </select>
                        </div>
                      </div>
                      
                      <div>
                         <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Address Line 1 (街道地址)</label>
                         <div className="relative">
                           <MapPin className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                           <input type="text" className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" placeholder="Street address, P.O. box" />
                         </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                         <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">City (城市)</label>
                            <input type="text" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" />
                         </div>
                         <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Postal Code (邮编)</label>
                            <input type="text" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" />
                         </div>
                      </div>
                   </div>
                </div>

                <div>
                   <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Billing Email (接收邮箱)</label>
                   <div className="relative">
                     <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                     <input type="email" className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" placeholder="invoices@company.com" />
                   </div>
                </div>
             </div>
             
             <div className="mt-8 pt-4 border-t border-gray-100 flex justify-end gap-3">
               <button onClick={onClose} className="px-4 py-2 text-gray-600 font-medium hover:bg-gray-100 rounded-lg text-sm transition-colors">
                 Cancel
               </button>
               <button onClick={onClose} className="bg-gray-900 text-white px-6 py-2 rounded-lg text-sm font-bold hover:bg-black transition-colors shadow-lg">
                 Save Settings
               </button>
             </div>
          </div>
       </div>
    </div>
  );
};

// --- Trend Chart (Simple SVG) (Unchanged) ---
const SpendingTrend = () => {
  const data = [120, 180, 150, 240, 200, 380, 310];
  const max = Math.max(...data);
  const height = 60;
  const width = 160;
  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - (val / max) * height;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="h-[60px] w-[160px] relative">
      <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" className="overflow-visible">
        <defs>
          <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={`M0,${height} ${points} ${width},${height}`} fill="url(#gradient)" />
        <path d={`M${points}`} fill="none" stroke="#10B981" strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx={width} cy={height - (data[data.length-1] / max) * height} r="3" fill="#10B981" stroke="white" strokeWidth="2" />
      </svg>
    </div>
  );
};

const BillingCenter = () => {
  // Data loading state
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [dataError, setDataError] = useState(null);
  const [billingRecords, setBillingRecords] = useState([]);
  const [currentBalance, setCurrentBalance] = useState(null);
  const [paymentMethods, setPaymentMethods] = useState([]);

  // 统计数据
  const [monthlySpending, setMonthlySpending] = useState(0);
  const [pendingOrderCount, setPendingOrderCount] = useState(0);
  const [pendingOrderAmount, setPendingOrderAmount] = useState(0);

  const [filterType, setFilterType] = useState('all'); // all, income, expense, recharge, purchase
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  const [showAdvancedFilter, setShowAdvancedFilter] = useState(false);

  // Advanced Filter States
  const [dateRange, setDateRange] = useState('all'); // all, 7days, 30days, thisMonth, lastMonth
  const [selectedPaymentMethods, setSelectedPaymentMethods] = useState([]); // [] = all

  // Modals
  const [showRecharge, setShowRecharge] = useState(false);
  const [showInvoiceSettings, setShowInvoiceSettings] = useState(false);

  // Load data on mount
  useEffect(() => {
    const loadBillingData = async () => {
      setIsLoadingData(true);
      setDataError(null);

      try {
        // Load balance, transactions, and pending orders in parallel
        const [balanceResult, transactionsResult, ordersResult] = await Promise.all([
          balanceService.getBalance(),
          balanceService.getTransactions({ page: 1, pageSize: 100 }),
          orderAPI.getOrders({ page: 1, pageSize: 100 }).catch(() => ({ data: { list: [] } })),
        ]);

        if (balanceResult.success) {
          setCurrentBalance(balanceResult.data?.balance || null);
        } else {
          console.warn('Failed to load balance, using fallback data:', balanceResult.message);
        }

        if (transactionsResult.success) {
          // Transform backend data to match UI format
          const records = transactionsResult.data?.transactions || transactionsResult.data?.list || [];
          setBillingRecords(Array.isArray(records) ? records : []);

          // 计算本月累计消费（只计算支付类型，金额取绝对值）
          const currentMonth = new Date().getMonth();
          const currentYear = new Date().getFullYear();
          const monthlyTotal = records
            .filter(r => {
              const recordDate = new Date(r.date);
              return r.transactionType === 'payment' &&
                     recordDate.getMonth() === currentMonth &&
                     recordDate.getFullYear() === currentYear;
            })
            .reduce((sum, r) => sum + Math.abs(r.amount), 0);
          setMonthlySpending(monthlyTotal);
        } else {
          console.warn('Failed to load transactions, using fallback data:', transactionsResult.message);
        }

        // 处理待支付订单
        if (ordersResult?.data?.list) {
          const pendingOrders = ordersResult.data.list.filter(
            order => order.payStatus === 'unpaid' || order.payStatus === 'pending'
          );
          setPendingOrderCount(pendingOrders.length);

          // 计算待支付总金额
          const pendingAmount = pendingOrders.reduce((sum, order) => {
            const amount = parseFloat(order.actualPay) || parseFloat(order.amount) || 0;
            return sum + amount;
          }, 0);
          setPendingOrderAmount(pendingAmount);
        }

      } catch (error) {
        console.error('Error loading billing data:', error);
        setDataError(error.message);
        // Fallback to mock data is already set as initial state
      } finally {
        setIsLoadingData(false);
      }
    };

    loadBillingData();
  }, []);

  // 从统一数据源读取余额（与 inviteSystem 共享）
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setTick(t => t + 1), 5000);
    return () => clearInterval(timer);
  }, []);
  const balance = useMemo(() => {
    // Use backend balance if available, otherwise fall back to unified balance
    if (currentBalance !== null) return currentBalance;
    const unified = getUnifiedBalance();
    return unified !== null ? unified : 87.50; // fallback
  }, [tick, currentBalance]);
  
  // 过滤逻辑
  const filteredRecords = (Array.isArray(billingRecords) ? billingRecords : []).filter(record => {
    // 1. 类型过滤 (Quick Filter)
    if (filterType !== 'all') {
      if (filterType === 'income' && record.amount < 0) return false;
      if (filterType === 'expense' && record.amount > 0) return false;
      if (filterType === 'pending' && record.status !== 'pending') return false;
    }
    
    // 2. 搜索过滤
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      if (!record.title.toLowerCase().includes(term) &&
          !record.id.toLowerCase().includes(term) &&
          !record.orderId.toLowerCase().includes(term)) {
        return false;
      }
    }

    // 3. 高级筛选 - 支付方式
    if (selectedPaymentMethods.length > 0) {
      if (!selectedPaymentMethods.includes(record.paymentMethod)) return false;
    }

    // 4. 高级筛选 - 时间范围 (Mock logic, assuming current date is 2023-10-30)
    if (dateRange !== 'all') {
      // In a real app, parse record.date and compare
      // For mock simplicity, we skip complex date parsing here unless requested
    }
    
    return true;
  });

  // Show loading state
  if (isLoadingData) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">加载账单数据中...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (dataError) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-gray-800 font-medium">加载失败</p>
          <p className="text-gray-600 text-sm mt-2">{dataError}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            重新加载
          </button>
        </div>
      </div>
    );
  }

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(filteredRecords.map(r => r.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(sid => sid !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const togglePaymentMethodFilter = (methodId) => {
    if (selectedPaymentMethods.includes(methodId)) {
      setSelectedPaymentMethods(selectedPaymentMethods.filter(id => id !== methodId));
    } else {
      setSelectedPaymentMethods([...selectedPaymentMethods, methodId]);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-emerald-600 bg-emerald-50 border-emerald-100';
      case 'pending': return 'text-amber-600 bg-amber-50 border-amber-100';
      case 'cancelled': return 'text-gray-500 bg-gray-50 border-gray-100';
      case 'processing': return 'text-blue-600 bg-blue-50 border-blue-100';
      default: return 'text-gray-600 bg-gray-50 border-gray-100';
    }
  };

  const getStatusLabel = (status) => {
     switch (status) {
      case 'completed': return '已完成';
      case 'pending': return '待支付';
      case 'cancelled': return '已取消';
      case 'processing': return '处理中';
      default: return status;
    }
  };

  const getPaymentIcon = (methodId) => {
    const method = paymentMethods.find(m => m.id === methodId);
    if (!method) return <Wallet className="w-4 h-4 text-gray-400" />;
    
    return (
      <div className="flex items-center gap-1.5" title={method.name}>
        {method.id === 'alipay' && <span className="text-blue-500 font-bold text-xs">支</span>}
        {method.id === 'wechat' && <span className="text-green-500 font-bold text-xs">微</span>}
        {method.id === 'usdt' && <span className="text-emerald-500 font-bold text-xs">₮</span>}
        {method.id === 'card' && <CreditCard className="w-3 h-3 text-indigo-500" />}
        {method.id === 'balance' && <Wallet className="w-3 h-3 text-amber-500" />}
        <span className="text-xs text-gray-600 hidden sm:inline">{method.name}</span>
      </div>
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      <RechargeModal
        isOpen={showRecharge}
        onClose={() => setShowRecharge(false)}
        paymentMethods={paymentMethods}
      />
      <InvoiceSettingsModal isOpen={showInvoiceSettings} onClose={() => setShowInvoiceSettings(false)} />

      {/* 顶部：账户概览 (Unchanged) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-2xl p-6 text-white shadow-lg shadow-indigo-200 relative overflow-hidden">
           <div className="absolute top-0 right-0 p-4 opacity-10">
              <Wallet className="w-32 h-32" />
           </div>
           <div className="relative z-10">
             <div className="text-indigo-100 text-sm font-medium mb-1">当前可用余额</div>
             <div className="text-4xl font-bold mb-6 flex items-baseline gap-1">
               <span className="text-2xl opacity-80">$</span>
               {balance.toFixed(2)}
             </div>
             <div className="flex gap-3">
               <button 
                 onClick={() => setShowRecharge(true)}
                 className="flex-1 bg-white text-indigo-600 py-2 rounded-lg font-bold text-sm hover:bg-indigo-50 transition-colors flex items-center justify-center gap-2"
               >
                 <Plus className="w-4 h-4" /> 立即充值
               </button>
               <button className="px-4 py-2 bg-indigo-500/30 text-white rounded-lg font-medium text-sm hover:bg-indigo-500/40 transition-colors backdrop-blur-sm">
                 提现
               </button>
             </div>
           </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between relative overflow-hidden">
           <div className="relative z-10">
             <div className="flex items-center gap-2 text-gray-500 text-sm font-medium mb-4">
               <TrendingUp className="w-4 h-4 text-emerald-500" /> 本月累计消费
             </div>
             <div className="text-3xl font-bold text-gray-900">${monthlySpending.toFixed(2)}</div>
           </div>
           <div className="absolute bottom-0 right-0 p-4 opacity-50">
              <SpendingTrend />
           </div>
           <div className="relative z-10 mt-4 pt-4 border-t border-gray-50 text-xs text-gray-400 flex justify-between">
             <span>较上月增长 12%</span>
             <button onClick={() => setShowInvoiceSettings(true)} className="text-indigo-600 hover:underline font-medium flex items-center gap-1">
                Invoice Settings <ChevronRight className="w-3 h-3" />
             </button>
           </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between">
           <div>
             <div className="flex items-center gap-2 text-gray-500 text-sm font-medium mb-4">
               <Clock className="w-4 h-4 text-amber-500" /> 待支付订单
             </div>
             <div className="text-3xl font-bold text-gray-900">{pendingOrderCount} <span className="text-sm font-normal text-gray-400">笔</span></div>
           </div>
           <div className="mt-4 pt-4 border-t border-gray-50 flex justify-between items-center">
             <span className="text-xs text-amber-600 font-medium">
               {pendingOrderAmount > 0 ? `需支付 $${pendingOrderAmount.toFixed(2)}` : '暂无待支付订单'}
             </span>
             {pendingOrderCount > 0 && (
               <button onClick={() => window.location.href = '/#/orders'} className="text-xs text-indigo-600 hover:underline font-medium">
                 去支付
               </button>
             )}
           </div>
        </div>
      </div>

      {/* 账单列表区域 */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {/* 工具栏 */}
        <div className="p-5 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <h2 className="font-bold text-lg text-gray-900 flex items-center gap-2">
              <Receipt className="w-5 h-5 text-gray-500" /> 账单明细
            </h2>
            
            <div className="flex flex-col sm:flex-row gap-3">
               <div className="relative">
                 <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                 <input 
                   type="text" 
                   placeholder="搜索订单号/内容..." 
                   className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 w-full sm:w-64"
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
                 />
               </div>
               
               <div className="flex bg-gray-100 p-1 rounded-lg">
                 {[
                   { id: 'all', label: '全部' },
                   { id: 'income', label: '充值/退款' },
                   { id: 'expense', label: '消费' },
                   { id: 'pending', label: '待支付' }
                 ].map(tab => (
                   <button
                     key={tab.id}
                     onClick={() => setFilterType(tab.id)}
                     className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                       filterType === tab.id 
                         ? 'bg-white text-gray-900 shadow-sm' 
                         : 'text-gray-500 hover:text-gray-900'
                     }`}
                   >
                     {tab.label}
                   </button>
                 ))}
               </div>
               
               <div className="flex gap-2">
                 <button 
                   onClick={() => setShowAdvancedFilter(!showAdvancedFilter)}
                   className={`p-2 border rounded-lg hover:bg-gray-50 text-gray-600 transition-colors ${showAdvancedFilter ? 'bg-gray-100 border-gray-300 text-gray-900' : 'border-gray-200'}`}
                   title="高级筛选"
                 >
                   <Filter className="w-4 h-4" />
                 </button>
                 <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600" title="导出账单">
                   <Download className="w-4 h-4" />
                 </button>
               </div>
            </div>
          </div>

          {/* Advanced Filter Panel */}
          {showAdvancedFilter && (
            <div className="pt-4 border-t border-gray-100 animate-in slide-in-from-top-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2 flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> Date Range
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: 'all', label: '全部时间' },
                      { id: '7days', label: '最近7天' },
                      { id: '30days', label: '最近30天' },
                      { id: 'thisMonth', label: '本月' },
                      { id: 'lastMonth', label: '上月' },
                    ].map(range => (
                      <button
                        key={range.id}
                        onClick={() => setDateRange(range.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                          dateRange === range.id
                            ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
                            : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {range.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2 flex items-center gap-1">
                    <CreditCard className="w-3 h-3" /> Payment Method
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {paymentMethods.map(method => (
                      <button
                        key={method.id}
                        onClick={() => togglePaymentMethodFilter(method.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                          selectedPaymentMethods.includes(method.id)
                            ? 'bg-indigo-50 border-indigo-200 text-indigo-700 ring-1 ring-indigo-200'
                            : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {method.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 列表内容 */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 text-gray-500 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-semibold w-10">
                  <input 
                    type="checkbox" 
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                    checked={filteredRecords.length > 0 && selectedIds.length === filteredRecords.length}
                    onChange={handleSelectAll}
                  />
                </th>
                <th className="px-6 py-4 font-semibold">交易时间 / 订单号</th>
                <th className="px-6 py-4 font-semibold">交易内容</th>
                <th className="px-6 py-4 font-semibold">支付方式</th>
                <th className="px-6 py-4 font-semibold text-right">金额</th>
                <th className="px-6 py-4 font-semibold text-center">状态</th>
                <th className="px-6 py-4 font-semibold text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredRecords.length > 0 ? (
                filteredRecords.map(record => {
                  const isSelected = selectedIds.includes(record.id);
                  return (
                    <tr key={record.id} className={`transition-colors group ${isSelected ? 'bg-indigo-50/30 hover:bg-indigo-50/50' : 'hover:bg-gray-50/50'}`}>
                      <td className="px-6 py-4">
                        <input 
                          type="checkbox" 
                          className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                          checked={isSelected}
                          onChange={() => handleSelectOne(record.id)}
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900 text-sm">{record.date}</div>
                        <div className="text-xs text-gray-400 font-mono mt-1">{record.id}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-start gap-3">
                           <div className={`mt-0.5 w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                             record.type === 'recharge' ? 'bg-emerald-100 text-emerald-600' :
                             record.type === 'adjustment' ? 'bg-amber-100 text-amber-600' :
                             record.type === 'refund' ? 'bg-blue-100 text-blue-600' :
                             'bg-indigo-100 text-indigo-600'
                           }`}>
                             {record.type === 'recharge' ? <ArrowDownLeft className="w-4 h-4" /> : 
                              record.type === 'adjustment' ? <RefreshCw className="w-4 h-4" /> :
                              record.type === 'refund' ? <RefreshCw className="w-4 h-4" /> :
                              <ArrowUpRight className="w-4 h-4" />}
                           </div>
                           <div>
                             <div className="text-sm font-medium text-gray-900">{record.title}</div>
                             <div className="text-xs text-gray-500 mt-0.5">关联订单: {record.orderId}</div>
                             {record.type === 'adjustment' && (
                               <div className="text-xs text-amber-600 mt-1 bg-amber-50 px-2 py-0.5 rounded inline-block">
                                 原价 ${Math.abs(record.originalAmount).toFixed(2)} → 现价 ${Math.abs(record.newAmount).toFixed(2)}
                               </div>
                             )}
                           </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {getPaymentIcon(record.paymentMethod)}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className={`font-bold ${record.amount > 0 ? 'text-emerald-600' : 'text-gray-900'}`}>
                          {record.amount > 0 ? '+' : ''}{record.amount.toFixed(2)} <span className="text-xs text-gray-400 font-normal">{record.currency}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(record.status)}`}>
                          {record.status === 'completed' && <CheckCircle2 className="w-3 h-3" />}
                          {record.status === 'pending' && <Clock className="w-3 h-3" />}
                          {record.status === 'cancelled' && <XCircle className="w-3 h-3" />}
                          {getStatusLabel(record.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                         <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                           {record.status === 'pending' && (
                             <button className="text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 px-3 py-1.5 rounded-md transition-colors">
                               去支付
                             </button>
                           )}
                           <button className="text-gray-400 hover:text-indigo-600 p-1 rounded" title="查看详情">
                             <FileText className="w-4 h-4" />
                           </button>
                           {record.status === 'completed' && (
                              <button className="text-gray-400 hover:text-indigo-600 p-1 rounded" title="下载 Invoice">
                                <Download className="w-4 h-4" />
                              </button>
                           )}
                         </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-16 text-center text-gray-400 bg-white">
                    <div className="flex flex-col items-center gap-2">
                       <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center">
                         <Filter className="w-6 h-6 text-gray-300" />
                       </div>
                       <p>没有找到相关交易记录</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* 分页与批量操作栏 */}
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/30">
           <div className="text-xs text-gray-500 flex items-center gap-4">
             <span>显示 {filteredRecords.length} 条记录</span>
             {selectedIds.length > 0 && (
               <span className="text-indigo-600 font-bold bg-indigo-50 px-2 py-0.5 rounded">
                 已选择 {selectedIds.length} 项
               </span>
             )}
           </div>
           <div className="flex gap-2">
             <button disabled className="px-3 py-1 text-xs border border-gray-200 rounded bg-white text-gray-400 disabled:opacity-50">上一页</button>
             <button className="px-3 py-1 text-xs border border-gray-200 rounded bg-white hover:bg-gray-50 text-gray-600">下一页</button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default BillingCenter;
