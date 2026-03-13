import React, { useState } from 'react';
import {
  X,
  Search,
  MessageCircle,
  FileText,
  HelpCircle,
  ChevronRight,
  ChevronDown,
  Book,
  Video,
  Mail,
  Phone,
  ExternalLink,
  Send,
  Paperclip,
  Clock,
  Loader2,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { ticketService } from '../services/ticketService';

const HelpCenter = ({ onClose, darkMode }) => {
  const [activeSection, setActiveSection] = useState('faq'); // faq, docs, contact, ticket
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [ticketForm, setTicketForm] = useState({
    subject: '',
    category: 'technical',
    message: '',
    priority: 'normal',
    orderId: '' // 可选的关联订单号
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);

  // FAQ 数据
  const faqs = [
    {
      id: 1,
      category: '账户相关',
      question: '如何修改账户密码？',
      answer: '您可以在"设置" > "账户安全"中修改密码。点击"修改密码"按钮，输入当前密码和新密码即可完成修改。建议定期更换密码以保障账户安全。'
    },
    {
      id: 2,
      category: '账户相关',
      question: '忘记密码怎么办？',
      answer: '在登录页面点击"忘记密码"，输入您注册时使用的邮箱地址，系统会发送密码重置链接到您的邮箱。请在24小时内完成重置操作。'
    },
    {
      id: 3,
      category: '代理使用',
      question: '如何获取代理IP？',
      answer: '购买代理套餐后，您可以在"我的代理"页面查看已购买的代理。支持API提取和手动复制两种方式获取代理IP。'
    },
    {
      id: 4,
      category: '代理使用',
      question: '代理连接失败怎么办？',
      answer: '请检查以下几点：1) 确认代理是否在有效期内；2) 检查用户名密码是否正确；3) 确认本地网络是否正常；4) 尝试更换代理端口。如问题持续，请联系客服。'
    },
    {
      id: 5,
      category: '付款相关',
      question: '支持哪些支付方式？',
      answer: '我们支持支付宝、微信支付、银行卡转账以及USDT等多种支付方式。企业客户还可以申请对公转账。'
    },
    {
      id: 6,
      category: '付款相关',
      question: '如何申请退款？',
      answer: '如果您对服务不满意，可以在购买后7天内申请退款。请在"订单中心"找到对应订单，点击"申请退款"并填写退款原因。'
    },
    {
      id: 7,
      category: '技术问题',
      question: 'API调用频率限制是多少？',
      answer: '免费用户每分钟最多100次请求，付费用户根据套餐等级有不同的限制。企业版用户可享受无限制API调用。'
    },
    {
      id: 8,
      category: '技术问题',
      question: '如何配置代理到浏览器？',
      answer: '我们提供详细的配置教程，支持Chrome、Firefox、Safari等主流浏览器。您可以在"文档中心"查看图文教程，或观看视频教程。'
    }
  ];

  // 文档分类
  const docs = [
    {
      id: 1,
      title: '快速入门指南',
      icon: <Book className="w-5 h-5" />,
      description: '5分钟了解如何开始使用我们的代理服务',
      link: '#'
    },
    {
      id: 2,
      title: 'API 文档',
      icon: <FileText className="w-5 h-5" />,
      description: '完整的API接口文档和代码示例',
      link: '#'
    },
    {
      id: 3,
      title: '视频教程',
      icon: <Video className="w-5 h-5" />,
      description: '手把手教您配置和使用代理',
      link: '#'
    },
    {
      id: 4,
      title: '常见问题解答',
      icon: <HelpCircle className="w-5 h-5" />,
      description: '解答用户最常遇到的问题',
      link: '#'
    }
  ];

  // 筛选FAQ
  const filteredFaqs = faqs.filter(faq => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return faq.question.toLowerCase().includes(term) || 
           faq.answer.toLowerCase().includes(term) ||
           faq.category.toLowerCase().includes(term);
  });

  // 按分类分组FAQ
  const groupedFaqs = filteredFaqs.reduce((acc, faq) => {
    if (!acc[faq.category]) {
      acc[faq.category] = [];
    }
    acc[faq.category].push(faq);
    return acc;
  }, {});

  const handleTicketSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      const result = await ticketService.submitTicket(ticketForm);

      setSubmitResult(result);

      if (result.success) {
        // 重置表单
        setTicketForm({
          subject: '',
          category: 'technical',
          message: '',
          priority: 'normal',
          orderId: ''
        });
      }
    } catch (error) {
      console.error('Submit ticket error:', error);
      setSubmitResult({
        success: false,
        message: error.message || '工单提交失败，请稍后重试'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[85vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold mb-2">帮助中心</h2>
              <p className="text-indigo-100 text-sm">有任何问题？我们随时为您提供帮助</p>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          {/* Search */}
          <div className="mt-4 relative">
            <Search className="w-5 h-5 text-indigo-300 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="搜索常见问题..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-indigo-200 focus:outline-none focus:ring-2 focus:ring-white/30"
            />
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-gray-200 bg-gray-50">
          {[
            { id: 'faq', label: '常见问题', icon: <HelpCircle className="w-4 h-4" /> },
            { id: 'docs', label: '文档中心', icon: <FileText className="w-4 h-4" /> },
            { id: 'contact', label: '联系我们', icon: <MessageCircle className="w-4 h-4" /> },
            { id: 'ticket', label: '提交工单', icon: <Mail className="w-4 h-4" /> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
                activeSection === tab.id
                  ? 'text-indigo-600 border-b-2 border-indigo-600 bg-white'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* FAQ Section */}
          {activeSection === 'faq' && (
            <div className="space-y-6">
              {Object.keys(groupedFaqs).length > 0 ? (
                Object.entries(groupedFaqs).map(([category, items]) => (
                  <div key={category}>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                      {category}
                    </h3>
                    <div className="space-y-2">
                      {items.map(faq => (
                        <div 
                          key={faq.id}
                          className="border border-gray-200 rounded-xl overflow-hidden"
                        >
                          <button
                            onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                            className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                          >
                            <span className="font-medium text-gray-900">{faq.question}</span>
                            {expandedFaq === faq.id ? (
                              <ChevronDown className="w-5 h-5 text-gray-400" />
                            ) : (
                              <ChevronRight className="w-5 h-5 text-gray-400" />
                            )}
                          </button>
                          {expandedFaq === faq.id && (
                            <div className="px-4 pb-4 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-3 bg-gray-50">
                              {faq.answer}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-gray-400">
                  <HelpCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>没有找到相关问题</p>
                  <p className="text-sm mt-1">试试其他关键词，或直接联系客服</p>
                </div>
              )}
            </div>
          )}

          {/* Docs Section */}
          {activeSection === 'docs' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {docs.map(doc => (
                <a
                  key={doc.id}
                  href={doc.link}
                  className="flex items-start gap-4 p-4 border border-gray-200 rounded-xl hover:border-indigo-300 hover:bg-indigo-50/50 transition-all group"
                >
                  <div className="p-3 bg-indigo-100 text-indigo-600 rounded-lg group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    {doc.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                      {doc.title}
                      <ExternalLink className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h4>
                    <p className="text-sm text-gray-500 mt-1">{doc.description}</p>
                  </div>
                </a>
              ))}
            </div>
          )}

          {/* Contact Section */}
          {activeSection === 'contact' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-6 border border-gray-200 rounded-xl text-center">
                  <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">在线客服</h4>
                  <p className="text-sm text-gray-500 mb-4">工作时间：9:00 - 22:00</p>
                  <button className="w-full py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                    立即咨询
                  </button>
                </div>
                
                <div className="p-6 border border-gray-200 rounded-xl text-center">
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-6 h-6" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">邮件支持</h4>
                  <p className="text-sm text-gray-500 mb-4">support@example.com</p>
                  <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                    发送邮件
                  </button>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">电话支持（企业客户专属）</h4>
                    <p className="text-sm text-gray-500">400-888-8888 | 工作日 9:00-18:00</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3">
                <Clock className="w-5 h-5 text-amber-600 mt-0.5" />
                <div>
                  <p className="text-sm text-amber-800 font-medium">响应时间说明</p>
                  <p className="text-sm text-amber-700 mt-1">
                    在线客服通常在5分钟内响应，邮件支持在24小时内回复，电话支持即时响应。
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Ticket Section */}
          {activeSection === 'ticket' && (
            <form onSubmit={handleTicketSubmit} className="space-y-4">
              {/* 提交结果显示 */}
              {submitResult && (
                <div className={`p-4 rounded-lg border ${
                  submitResult.success
                    ? 'bg-green-50 border-green-200 text-green-800'
                    : 'bg-red-50 border-red-200 text-red-800'
                }`}>
                  <div className="flex items-start gap-2">
                    {submitResult.success ? (
                      <CheckCircle2 className="w-5 h-5 mt-0.5" />
                    ) : (
                      <XCircle className="w-5 h-5 mt-0.5" />
                    )}
                    <p className="text-sm">{submitResult.message}</p>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  问题主题 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={ticketForm.subject}
                  onChange={(e) => setTicketForm({...ticketForm, subject: e.target.value})}
                  placeholder="请简要描述您的问题"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    问题类型
                  </label>
                  <select
                    value={ticketForm.category}
                    onChange={(e) => setTicketForm({...ticketForm, category: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  >
                    <option value="technical">技术问题</option>
                    <option value="billing">付款问题</option>
                    <option value="account">账户问题</option>
                    <option value="suggestion">建议反馈</option>
                    <option value="other">其他</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    优先级
                  </label>
                  <select
                    value={ticketForm.priority}
                    onChange={(e) => setTicketForm({...ticketForm, priority: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  >
                    <option value="low">低 - 一般咨询</option>
                    <option value="normal">中 - 需要帮助</option>
                    <option value="high">高 - 影响使用</option>
                    <option value="urgent">紧急 - 服务中断</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  关联订单号 <span className="text-gray-400">(可选)</span>
                </label>
                <input
                  type="text"
                  value={ticketForm.orderId}
                  onChange={(e) => setTicketForm({...ticketForm, orderId: e.target.value})}
                  placeholder="如有相关订单，请输入订单号"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  问题描述 <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={5}
                  value={ticketForm.message}
                  onChange={(e) => setTicketForm({...ticketForm, message: e.target.value})}
                  placeholder="请详细描述您遇到的问题，包括操作步骤、错误信息等"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 resize-none"
                />
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <button
                  type="button"
                  className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Paperclip className="w-4 h-4" />
                  添加附件
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      提交中...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      提交工单
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;

