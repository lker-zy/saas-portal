import React, { useState } from 'react';
import { 
  Bell, 
  Search, 
  Filter, 
  CheckCircle2, 
  AlertCircle, 
  Info, 
  Clock, 
  Trash2, 
  Mail,
  MailOpen,
  MoreVertical,
  Check
} from 'lucide-react';

const MessageCenter = () => {
  const [activeTab, setActiveTab] = useState('all'); // all, unread, system, promotion
  const [selectedMessageId, setSelectedMessageId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock Data
  const [messages, setMessages] = useState([
    {
      id: 1,
      title: '系统维护通知',
      content: '我们将于 2023年11月1日 02:00 (UTC) 进行系统维护，预计耗时 2 小时。期间可能会出现短暂的服务中断，请提前做好准备。',
      type: 'system', // system, promotion, alert
      date: '2023-10-30 10:00',
      read: false,
      sender: 'System Admin'
    },
    {
      id: 2,
      title: '双十一特惠活动开启！',
      content: '双十一狂欢季来了！全场静态 ISP 代理享 8 折优惠，充值返现高达 20%。立即查看详情！',
      type: 'promotion',
      date: '2023-10-29 14:30',
      read: true,
      sender: 'Marketing Team'
    },
    {
      id: 3,
      title: '您的订阅即将到期',
      content: '您购买的 "静态住宅 ISP - 美国" 将于 3 天后到期。为避免服务中断，请及时续费。',
      type: 'alert',
      date: '2023-10-28 09:15',
      read: false,
      sender: 'Billing System'
    },
    {
      id: 4,
      title: '新功能上线：API 提取优化',
      content: '我们对 API 提取功能进行了重大升级，现在支持更灵活的筛选参数和更高的并发限制。查看文档了解更多。',
      type: 'system',
      date: '2023-10-25 16:20',
      read: true,
      sender: 'Product Team'
    },
    {
      id: 5,
      title: '安全警告：异地登录提醒',
      content: '系统检测到您的账户于 2023-10-24 23:11 在 新加坡 IP 103.2.x.x 登录。如非本人操作，请立即修改密码。',
      type: 'alert',
      date: '2023-10-24 23:12',
      read: true,
      sender: 'Security Center'
    }
  ]);

  const filteredMessages = messages.filter(msg => {
    // Tab Filter
    if (activeTab === 'unread' && msg.read) return false;
    if (activeTab === 'system' && msg.type !== 'system') return false;
    if (activeTab === 'promotion' && msg.type !== 'promotion') return false;
    if (activeTab === 'alert' && msg.type !== 'alert') return false;

    // Search Filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      return msg.title.toLowerCase().includes(term) || msg.content.toLowerCase().includes(term);
    }
    return true;
  });

  const unreadCount = messages.filter(m => !m.read).length;

  const handleMarkAsRead = (id) => {
    setMessages(messages.map(m => m.id === id ? { ...m, read: true } : m));
  };

  const handleMarkAllRead = () => {
    setMessages(messages.map(m => ({ ...m, read: true })));
  };

  const handleDelete = (id) => {
    setMessages(messages.filter(m => m.id !== id));
    if (selectedMessageId === id) setSelectedMessageId(null);
  };

  const getIcon = (type) => {
    switch(type) {
      case 'system': return <Info className="w-5 h-5 text-blue-500" />;
      case 'alert': return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'promotion': return <GiftIcon className="w-5 h-5 text-purple-500" />;
      default: return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  // Helper component for Gift Icon to avoid conflict if not imported
  const GiftIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13"/><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/><path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.9 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"/></svg>
  );

  return (
    <div className="flex h-[calc(100vh-100px)] gap-6 animate-in fade-in duration-500">
      {/* Left: Message List */}
      <div className="w-full md:w-1/3 bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-lg text-gray-900 flex items-center gap-2">
              <Bell className="w-5 h-5" /> 站内消息
              {unreadCount > 0 && <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">{unreadCount}</span>}
            </h2>
            <button onClick={handleMarkAllRead} className="text-xs text-gray-500 hover:text-indigo-600 flex items-center gap-1" title="全部已读">
              <Check className="w-3 h-3" /> 全部已读
            </button>
          </div>
          
          <div className="relative mb-3">
             <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
             <input 
               type="text" 
               placeholder="搜索消息..." 
               className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
             />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
            {[
              { id: 'all', label: '全部' },
              { id: 'unread', label: '未读' },
              { id: 'system', label: '系统' },
              { id: 'promotion', label: '活动' },
              { id: 'alert', label: '告警' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1 text-xs font-medium rounded-full whitespace-nowrap transition-colors ${
                  activeTab === tab.id 
                    ? 'bg-indigo-50 text-indigo-600 ring-1 ring-indigo-200' 
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
          {filteredMessages.length > 0 ? (
            filteredMessages.map(msg => (
              <div 
                key={msg.id}
                onClick={() => {
                  setSelectedMessageId(msg.id);
                  if (!msg.read) handleMarkAsRead(msg.id);
                }}
                className={`p-4 cursor-pointer transition-colors hover:bg-gray-50 ${
                  selectedMessageId === msg.id ? 'bg-indigo-50/50' : ''
                } ${!msg.read ? 'bg-blue-50/10' : ''}`}
              >
                <div className="flex justify-between items-start mb-1">
                  <div className="flex items-center gap-2">
                    {!msg.read && <div className="w-2 h-2 rounded-full bg-red-500 shrink-0" />}
                    <span className="text-xs font-medium px-1.5 py-0.5 rounded bg-gray-100 text-gray-500">
                      {msg.type === 'system' ? '系统' : msg.type === 'promotion' ? '活动' : '告警'}
                    </span>
                    <span className="text-xs text-gray-400">{msg.date.split(' ')[0]}</span>
                  </div>
                </div>
                <h3 className={`text-sm mb-1 line-clamp-1 ${!msg.read ? 'font-bold text-gray-900' : 'font-medium text-gray-700'}`}>
                  {msg.title}
                </h3>
                <p className="text-xs text-gray-500 line-clamp-2">
                  {msg.content}
                </p>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-gray-400 flex flex-col items-center">
              <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                <Mail className="w-6 h-6 text-gray-300" />
              </div>
              <p className="text-sm">没有找到相关消息</p>
            </div>
          )}
        </div>
      </div>

      {/* Right: Message Detail */}
      <div className="flex-1 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
        {selectedMessageId ? (
          (() => {
            const msg = messages.find(m => m.id === selectedMessageId);
            if (!msg) return null;
            return (
              <>
                <div className="p-6 border-b border-gray-100 flex justify-between items-start">
                  <div>
                    <h1 className="text-xl font-bold text-gray-900 mb-2">{msg.title}</h1>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" /> {msg.date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <UserIcon className="w-4 h-4" /> {msg.sender}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleDelete(msg.id)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title="删除"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="p-8 overflow-y-auto flex-1">
                  <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed">
                    {msg.content}
                  </div>
                  
                  {msg.type === 'promotion' && (
                    <div className="mt-8 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100 flex items-center justify-between">
                      <div>
                        <div className="font-bold text-indigo-900">限时优惠活动</div>
                        <div className="text-xs text-indigo-700 mt-1">点击查看详情，不错过任何优惠</div>
                      </div>
                      <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors">
                        立即查看
                      </button>
                    </div>
                  )}
                </div>
              </>
            );
          })()
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
              <MailOpen className="w-8 h-8 text-gray-300" />
            </div>
            <p className="text-lg font-medium text-gray-500">选择一条消息查看详情</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Simple User Icon Helper
const UserIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);

export default MessageCenter;






























