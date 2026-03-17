import React, { useState, useEffect, useRef } from 'react';
import { 
  Globe, ShoppingCart, Share2, Database, Smartphone, Server, Wifi, 
  CheckCircle, Zap, Shield, ArrowRight, CreditCard, Box, ChevronDown, Check, Info, Minus, Plus, Monitor, Terminal,
  Bell, X, Mail, Copy, Loader2, QrCode, Wallet, HelpCircle, Lock, Tag, Sparkles, ChevronRight, Star, TrendingUp, Package,
  UserPlus, LogIn, Eye, EyeOff, ArrowLeft, Home
} from 'lucide-react';
import { REGIONS, BUSINESS_CATEGORIES, TERMINALS, SKUS, RESOURCE_POOL, DURATIONS, SUBSCRIPTION_CYCLES, ALL_PROTOCOLS, PRODUCT_CONFIG, SAVED_PAYMENT_METHODS, USER_BALANCE } from '../data/mockData';
import SliderCaptcha from './SliderCaptcha';

import aliPayImg from '../assets/ali_pay.png';
import wxPayImg from '../assets/wx_pay.png';
import usdtImg from '../assets/ustd.png';
import bankImg from '../assets/bank.png';
import card1Img from '../assets/card1.png';
import card2Img from '../assets/card2.png';
import card3Img from '../assets/card3.png';
import amazonImg from '../assets/amazon.png';
import ebayImg from '../assets/eboy.png';
import shopifyImg from '../assets/shopify.png';
import tiktokImg from '../assets/tiktok.png';
const amexSvg = '/amex.svg';
const discoverSvg = '/discover.svg';

// ════════════════════════════════════════════════════════════
// Payment Brand Icons (SVG/PNG) — Card-badge style
// ════════════════════════════════════════════════════════════

// Helper for consistent card sizing
const getCardSize = (size) => {
  switch (size) {
    case 'lg': return 'w-20 h-12'; // 80x48px
    case 'md': return 'w-12 h-8'; // 48x32px
    case 'sm': return 'w-9 h-6'; // 36x24px
    case 'icon': return 'w-8 h-5'; // 32x20px rectangular for payment method selection
    default: return 'w-12 h-8';
  }
};

// ── Alipay ─────────────────────────────────────────────────
const AlipayIcon = ({ className, size = 'md' }) => {
  return (
    <img 
      src={aliPayImg} 
      alt="Alipay" 
      className={`inline-block object-contain rounded-[4px] ${getCardSize(size)} ${className || ''}`} 
    />
  );
};

// ── WeChat Pay ─────────────────────────────────────────────
const WeChatIcon = ({ className, size = 'md' }) => {
  return (
    <img 
      src={wxPayImg} 
      alt="WeChat Pay" 
      className={`inline-block object-contain rounded-[4px] ${getCardSize(size)} ${className || ''}`} 
    />
  );
};

// ── USDT (Tether) ──────────────────────────────────────────
const UsdtIcon = ({ className, size = 'md' }) => {
  return (
    <img 
      src={usdtImg} 
      alt="USDT" 
      className={`inline-block object-contain rounded-[4px] ${getCardSize(size)} ${className || ''}`} 
    />
  );
};

// ── eBay ───────────────────────────────────────────────────
const EbayIcon = ({ className }) => {
  return (
    <svg viewBox="0 0 1000 401" className={className} xmlns="http://www.w3.org/2000/svg">
      <path
        d="m 633.07803,212.53323 c -45.43873,1.48929 -73.6715,9.689 -73.6715,39.61897 0,19.37591 15.44713,40.38162 54.66334,40.38162 52.57698,0 80.64259,-28.65902 80.64259,-75.66331 l 0.003,-5.16994 c -18.43302,0 -41.16414,0.16089 -61.63704,0.83266 z m 111.75103,62.10248 c 0,14.58313 0.42155,28.9782 1.69406,41.94092 h -46.61408 c -1.24325,-10.67368 -1.6972,-21.27945 -1.6972,-31.56656 -25.20195,30.97941 -55.17735,39.88537 -96.76149,39.88537 -61.67674,0 -94.70072,-32.59982 -94.70072,-70.30689 0,-54.61215 44.91583,-73.86739 122.89013,-75.65391 21.32332,-0.48686 45.27419,-0.55894 65.07531,-0.55894 l -0.003,-5.33606 c 0,-36.56098 -23.44364,-51.59335 -64.06765,-51.59335 -30.15876,0 -52.38579,12.48057 -54.6764,34.0468 h -52.65168 c 5.57217,-53.77165 62.06643,-67.37115 111.74005,-67.37115 59.50837,0 109.77228,21.17288 109.77228,84.11481 z"
        fill="#ffbc13" 
      />
      <path
        d="m 199.63633,185.86602 c -1.94427,-46.87735 -35.77951,-64.41973 -71.94139,-64.41973 -38.99421,0 -70.12667,19.7327 -75.58026,64.41973 z M 51.034408,219.1909 c 2.704332,45.48365 34.069782,72.38437 77.197532,72.38437 29.88033,0 56.45979,-12.17498 65.35948,-38.66041 h 51.68424 c -10.05205,53.73979 -67.15384,71.98058 -116.303,71.98058 C 39.606424,324.89544 0,275.67889 0,209.30653 0,136.24203 40.965642,88.12194 129.78809,88.12194 c 70.69867,0 122.49992,36.99926 122.49992,117.75572 v 13.31324 z"
        fill="#f12c2d" 
      />
      <path
        d="m 380.83181,290.6235 c 46.57228,0 78.44078,-33.52181 78.44078,-84.10854 0,-50.58203 -31.8685,-84.10854 -78.44078,-84.10854 -46.31058,0 -78.44392,33.52651 -78.44392,84.10854 0,50.58673 32.13334,84.10854 78.44392,84.10854 z M 252.2854,0 h 50.10249 l -0.005,125.87707 c 24.55682,-29.25975 58.38892,-37.75513 91.68976,-37.75513 55.83503,0 117.85132,37.6773 117.85132,119.02875 0,68.12232 -49.32155,117.74475 -118.78114,117.74475 -36.35726,0 -70.58062,-13.04265 -91.68663,-38.88294 0,10.32107 -0.57618,20.72364 -1.70503,30.56413 h -49.17162 c 0.85513,-15.90944 1.70555,-35.7184 1.70555,-51.74693 z"
        fill="#0968f6" 
      />
      <path
        d="M 1000,96.45747 845.05541,400.75099 H 788.94926 L 833.49578,316.25589 716.89033,96.45747 h 58.6266 l 85.80469,171.73057 85.56283,-171.73057 z"
        fill="#93c822" 
      />
    </svg>
  );
};

// ── Visa ───────────────────────────────────────────────────
const VisaIcon = ({ className, size = 'md' }) => {
  return (
    <span className={`inline-flex items-center justify-center rounded-[4px] border border-gray-200 bg-white ${getCardSize(size)} ${className || ''}`}>
      <svg viewBox="0 0 24 24" className="w-[85%] h-[85%]" xmlns="http://www.w3.org/2000/svg">
        <path fill="#142787" d="M10.703 16.094l1.666-10.297h2.666l-1.666 10.297h-2.666zm-4.724-10.026c-.172-.066-.692-.132-1.344-.132-1.481 0-2.522.788-2.528 1.916-.01 1.349 1.203 1.411 2.122 1.862.944.462 1.261.758 1.258 1.171-.005.633-.76.924-1.464.924-1.365 0-2.092-.205-3.225-.7l-.454-.213-.474 2.948c.792.366 2.254.685 3.77.685 3.556 0 5.864-1.748 5.884-4.457.012-1.485-.886-2.618-2.83-3.543-.984-.488-1.588-.82-1.588-1.32.003-.456.507-.922 1.617-.922.915-.028 1.579.198 2.094.42l.35.162.41-2.601zm7.323 10.026l2.52-10.297h-2.604c-.81 0-1.42.233-1.772 1.07l-6.28 14.885h2.822l.562-1.557h3.443l.324 1.557h2.985zm-2.85-3.923l1.164-3.197.666 3.197h-1.83zm10.793-6.374h-2.062c-.636 0-1.116.183-1.395.85l-4.912 11.846h2.806l.965-2.67h3.427c.08.366.326 1.458.38 1.682.203.85.83 1.528 1.685 1.528h2.486l-3.379-13.236z" />
        <path fill="#F7B600" d="M14.93 7.197l-1.164 3.197h1.83l-.666-3.197z" />
      </svg>
    </span>
  );
};

// ── Mastercard ─────────────────────────────────────────────
const MastercardIcon = ({ className, size = 'md' }) => {
  return (
    <span className={`inline-flex items-center justify-center rounded-[4px] border border-gray-200 bg-white ${getCardSize(size)} ${className || ''}`}>
      <svg viewBox="0 0 24 24" className="w-[80%] h-[80%]" xmlns="http://www.w3.org/2000/svg">
        <rect fill="none" width="24" height="24"/>
        <circle fill="#EB001B" cx="7" cy="12" r="7"/>
        <circle fill="#F79E1B" cx="17" cy="12" r="7"/>
        <path fill="#FF5F00" d="M12,16.2c-1.8,0-3.4-0.6-4.7-1.7c-0.2-0.2-0.2-0.5,0-0.7c0.2-0.2,0.5-0.2,0.7,0c1.1,0.9,2.5,1.4,4,1.4 s2.9-0.5,4-1.4c0.2-0.2,0.5-0.2,0.7,0c0.2,0.2,0.2,0.5,0,0.7C15.4,15.6,13.8,16.2,12,16.2z"/>
      </svg>
    </span>
  );
};

// ── UnionPay ───────────────────────────────────────────────
const UnionPayIcon = ({ className, size = 'md' }) => {
  return (
    <span className={`inline-flex items-center justify-center rounded-[4px] border border-gray-200 bg-white ${getCardSize(size)} ${className || ''}`}>
      <svg viewBox="0 0 32 20" className="w-[85%] h-[75%]" xmlns="http://www.w3.org/2000/svg">
        <path fill="#006159" d="M19.23 2.62h6.4c.75 0 1.21.67 1.02 1.5l-3 11.5c-.19.83-.99 1.5-1.79 1.5h-6.4c-.8 0-1.21-.67-1.02-1.5l3-11.5c.2-.83.99-1.5 1.79-1.5z"/>
        <path fill="#005B9F" d="M13.23 2.62h6.93c.75 0 1.21.67 1.02 1.5l-3 11.5c-.19.83-.99 1.5-1.79 1.5H9.46c-.8 0-1.21-.67-1.02-1.5l3-11.5c.19-.83.99-1.5 1.79-1.5z"/>
        <path fill="#E81028" d="M7.73 2.62h6.4c.75 0 1.21.67 1.02 1.5l-3 11.5c-.19.83-.99 1.5-1.79 1.5H3.96c-.8 0-1.21-.67-1.02-1.5l3-11.5c.19-.83.99-1.5 1.79-1.5z"/>
      </svg>
    </span>
  );
};

// ── Amex ───────────────────────────────────────────────────
const AmexIcon = ({ className, size = 'md' }) => {
  return (
    <img 
      src={amexSvg} 
      alt="American Express" 
      className={`inline-block object-contain rounded-[4px] ${getCardSize(size)} ${className || ''}`} 
    />
  );
};

// ── Discover ───────────────────────────────────────────────────
const DiscoverIcon = ({ className, size = 'md' }) => {
  return (
    <img 
      src={discoverSvg} 
      alt="Discover" 
      className={`inline-block object-contain rounded-[4px] ${getCardSize(size)} ${className || ''}`} 
    />
  );
};

// ── Wallet / Card generic icon (blue) ──────────────────────
const WalletCardIcon = ({ className, size = 'md' }) => {
  return (
    <img 
      src={bankImg} 
      alt="Bank Card" 
      className={`inline-block object-contain rounded-[4px] ${getCardSize(size)} ${className || ''}`} 
    />
  );
};


// ════════════════════════════════════════════════════════════
// Payment Processing Modal
// ════════════════════════════════════════════════════════════
const PaymentProcessingModal = ({ isOpen, onClose, method, amount, onComplete }) => {
  const [step, setStep] = useState('processing');
  const [loading, setLoading] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    if (isOpen) { setStep('processing'); setLoading(false); setCopySuccess(false); }
  }, [isOpen]);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const handleSimulatePayment = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('success');
      setTimeout(() => onComplete(), 1500);
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h3 className="font-semibold text-gray-900 text-base">
            {step === 'success' ? '支付成功' : '支付确认'}
          </h3>
          <button onClick={onClose} className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto">
          {step === 'success' ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-in zoom-in">
                <CheckCircle className="w-8 h-8 text-emerald-500" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">支付成功!</h4>
              <p className="text-sm text-gray-500">您的订单已确认，代理资源将在 1-3 分钟内交付。</p>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="text-center py-2">
                <div className="text-xs text-gray-400 mb-1">支付金额</div>
                <div className="text-3xl font-bold text-gray-900 tracking-tight">
                  <span className="text-lg text-gray-400">¥</span>{amount}
                </div>
              </div>

              {(method?.id === 'alipay' || method?.id === 'wechat') && (
                <div className="space-y-4">
                  <div className={`p-5 rounded-2xl border flex flex-col items-center gap-4 ${method.id === 'alipay' ? 'border-blue-100 bg-blue-50/40' : 'border-green-100 bg-green-50/40'}`}>
                    {/* Payment brand badge */}
                    <div className="flex items-center gap-2">
                      {method.id === 'alipay' ? <AlipayIcon size="lg" /> : <WeChatIcon size="lg" />}
                      <span className="text-sm font-semibold text-gray-700">{method.name}</span>
                    </div>
                    <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100">
                      <QrCode className="w-28 h-28 text-gray-700" />
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-gray-900 text-sm mb-0.5">请使用{method.name}扫码支付</div>
                      <div className="text-xs text-gray-400">二维码有效期 5:00</div>
                    </div>
                  </div>
                  <button 
                    onClick={handleSimulatePayment}
                    disabled={loading}
                    className={`w-full py-3 font-semibold rounded-xl transition-all flex items-center justify-center gap-2 text-white text-sm ${method.id === 'alipay' ? 'bg-[#1677FF] hover:bg-blue-600' : 'bg-[#07C160] hover:bg-green-600'}`}
                  >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : '我已完成支付'}
                  </button>
                </div>
              )}

              {method?.id === 'usdt' && (
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 space-y-4">
                    {/* USDT brand badge */}
                    <div className="flex items-center justify-center gap-2">
                      <UsdtIcon size="lg" />
                      <span className="text-sm font-semibold text-gray-700">USDT (TRC20)</span>
                    </div>
                    <div className="flex items-center justify-center">
                      <div className="bg-white p-2.5 rounded-xl border border-gray-100">
                        <QrCode className="w-24 h-24 text-gray-700" />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">USDT (TRC20) 收款地址</div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-white px-3 py-2 rounded-lg border border-gray-100 text-xs font-mono text-gray-600 break-all">
                          T9yD14Nj9j7xAB4dbGeiX9h8zzLMzM2...
                        </div>
                        <button 
                          onClick={() => handleCopy('T9yD14Nj9j7xAB4dbGeiX9h8zzLMzM2X')}
                          className="p-2 bg-white border border-gray-100 rounded-lg hover:bg-gray-50 text-gray-400 transition-colors"
                        >
                          {copySuccess ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                    <div className="p-2.5 bg-amber-50 rounded-lg border border-amber-100 text-xs text-amber-700">
                      请务必使用 <span className="font-semibold">TRC20</span> 网络转账，否则资产将无法找回。
                    </div>
                  </div>
                  <button 
                    onClick={handleSimulatePayment}
                    disabled={loading}
                    className="w-full py-3 bg-[#26A17B] hover:bg-emerald-600 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2 text-sm"
                  >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : '我已完成转账'}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


// ════════════════════════════════════════════════════════════
// Restock Notification Modal
// ════════════════════════════════════════════════════════════
const RestockNotifyModal = ({ isOpen, onClose, region }) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) { setIsSuccess(false); setEmail(''); }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => { setIsSubmitting(false); setIsSuccess(true); }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-6">
          <div className="flex justify-between items-start mb-5">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-blue-50 rounded-xl">
                <Bell className="w-5 h-5 text-[#1A73E8]" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-gray-900">到货通知</h3>
                <p className="text-xs text-gray-400 mt-0.5">{region?.name} ({region?.code}) 节点</p>
              </div>
            </div>
            <button onClick={onClose} className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all">
              <X className="w-5 h-5" />
            </button>
          </div>

          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-sm text-gray-500 leading-relaxed">
                当前该区域节点资源紧缺。请留下您的邮箱，我们将在资源补充后第一时间通知您。
              </p>
              <div>
                <label className="text-xs font-medium text-gray-500 mb-1.5 block">接收邮箱</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                  <input 
                    type="email" required value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1A73E8]/20 focus:border-[#1A73E8] outline-none transition-all text-sm"
                  />
                </div>
              </div>
              <button 
                type="submit" disabled={isSubmitting}
                className="w-full py-2.5 bg-[#1A73E8] hover:bg-[#1765CC] text-white font-medium rounded-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
              >
                {isSubmitting ? (
                  <><Loader2 className="w-4 h-4 animate-spin" />提交中...</>
                ) : (
                  <><Bell className="w-4 h-4" />确认订阅</>
                )}
              </button>
            </form>
          ) : (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto">
                <CheckCircle className="w-7 h-7 text-emerald-500" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">订阅成功！</h4>
                <p className="text-sm text-gray-500 mt-1">
                  到货后将发送邮件至 <span className="font-medium text-gray-900">{email}</span>
                </p>
              </div>
              <button onClick={onClose} className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-colors text-sm">
                关闭
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


// ════════════════════════════════════════════════════════════
// Custom Dropdown Select (Google Style)
// ════════════════════════════════════════════════════════════
const CustomSelect = ({ label, value, options, onChange, placeholder, renderOption, renderValue, grouped = false, required = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (item) => { onChange(item); setIsOpen(false); };

  return (
    <div className="relative" ref={containerRef}>
      {label && (
        <label className="block text-[13px] font-medium text-gray-700 mb-2">
          {required && <span className="text-red-500 mr-0.5">*</span>}
          {label}
        </label>
      )}
      <div 
        className={`w-full bg-white border rounded-lg px-4 py-3 flex justify-between items-center cursor-pointer transition-all duration-200 ${
          isOpen ? 'border-blue-600 ring-1 ring-blue-600 shadow-sm' : 'border-gray-300 hover:border-gray-400'
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex-1 overflow-hidden">
          {value ? (renderValue ? renderValue(value) : <span className="text-gray-900 text-sm font-medium">{value.name}</span>) : <span className="text-gray-500 text-sm">{placeholder}</span>}
        </div>
        <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-200 shrink-0 ml-2 ${isOpen ? 'rotate-180 text-blue-600' : ''}`} />
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-72 overflow-y-auto animate-in fade-in slide-in-from-top-1 duration-150 py-1">
          {grouped ? (
            options.map((group) => (
              <div key={group.id} className="border-b border-gray-100 last:border-0">
                <div className="px-4 py-2 bg-gray-50 text-[11px] font-semibold text-gray-500 uppercase tracking-wider sticky top-0">{group.name}</div>
                {group.scenarios.map((item) => (
                  <div key={item.id} onClick={() => handleSelect({ ...item, categoryId: group.id, categoryName: group.name })}
                    className={`px-4 py-2.5 cursor-pointer flex items-center justify-between hover:bg-gray-50 transition-colors ${value?.id === item.id ? 'bg-blue-50 text-blue-700' : 'text-gray-700'}`}
                  >
                    {renderOption ? renderOption(item) : <span className="text-sm">{item.name}</span>}
                    {value?.id === item.id && <Check className="w-4 h-4 text-blue-600" />}
                  </div>
                ))}
              </div>
            ))
          ) : (
            options.map((item) => (
              <div key={item.id} onClick={() => handleSelect(item)}
                className={`px-4 py-2.5 cursor-pointer flex items-center justify-between hover:bg-gray-50 transition-colors ${value?.id === item.id ? 'bg-blue-50 text-blue-700' : 'text-gray-700'}`}
              >
                {renderOption ? renderOption(item) : <span className="text-sm">{item.name}</span>}
                {value?.id === item.id && <Check className="w-4 h-4 text-blue-600" />}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};


// ════════════════════════════════════════════════════════════
// Section Label (Google Style)
// ════════════════════════════════════════════════════════════
const SectionLabel = ({ title, required, subtitle, extra }) => (
  <div className="flex items-center justify-between mb-3">
    <div className="flex items-center gap-2">
      <label className="text-sm font-bold text-gray-900">
        {required && <span className="text-red-500 mr-1">*</span>}
        {title}
      </label>
      {subtitle && <span className="text-xs text-gray-400 font-normal">{subtitle}</span>}
    </div>
    {extra}
  </div>
);


// ════════════════════════════════════════════════════════════
// Order Detail Row
// ════════════════════════════════════════════════════════════
const OrderRow = ({ label, value, muted }) => (
  <div className="flex justify-between items-center py-1">
    <span className="text-[13px] text-gray-400">{label}</span>
    {muted ? (
      <span className="text-[13px] text-gray-300 italic">待选择</span>
    ) : (
      <span className="text-[13px] font-medium text-gray-800">{value}</span>
    )}
  </div>
);


// ════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ════════════════════════════════════════════════════════════
// Purchase Guide Data (ported from project2 OfficialPurchaseGuideSettings)
// ════════════════════════════════════════════════════════════
const GUIDE_SCENARIOS = [
  { 
    id: 'social', label: '社交媒体', icon: '📱',
    desc: 'WhatsApp · Facebook · TikTok · Instagram',
    children: ['WhatsApp', 'Facebook', 'Instagram', 'TikTok', 'Twitter/X', 'Telegram'],
    recommend: { bandwidthMode: 'traffic', tag: '运营首选', color: 'indigo',
      title: '静态住宅 ISP 代理',
      desc: '专为社媒运营优化，提供最稳定的原生家庭宽带环境，有效降低封号风险。' }
  },
  { 
    id: 'ecommerce', label: '跨境电商', icon: '🛒',
    desc: 'Amazon · eBay · Shopee · Shopify',
    children: ['Amazon', 'eBay', 'Shopee', 'Shopify', 'Etsy', 'Walmart'],
    recommend: { bandwidthMode: 'traffic', tag: '店铺运营首选', color: 'blue',
      title: '静态住宅 ISP 代理 (Premium)',
      desc: '专为跨境电商与店铺运营打造，100%真实住宅IP环境，安全稳定。' }
  },
  { 
    id: 'data', label: '数据采集', icon: '🔍',
    desc: 'Google · Bing · 通用爬虫',
    children: ['Google Search', 'Bing', '通用爬虫'],
    recommend: { bandwidthMode: 'bandwidth', tag: '性价比之选', color: 'emerald',
      title: '静态住宅 ISP 代理',
      desc: '高并发低延迟，适合大规模数据采集场景，按带宽计费更划算。' }
  },
  { 
    id: 'game', label: '网络游戏', icon: '🎮',
    desc: 'Steam · Blizzard · 手游模拟器',
    children: ['Steam', 'Blizzard', '手游模拟器'],
    recommend: { bandwidthMode: 'bandwidth', tag: '低延迟首选', color: 'purple',
      title: '静态住宅 ISP 代理',
      desc: '独享带宽保障，超低延迟，畅享全球游戏服务。' }
  },
  { id: 'other', label: '其他', icon: '💼', desc: '其他使用场景',
    recommend: { bandwidthMode: 'traffic', tag: '通用推荐', color: 'slate',
      title: '静态住宅 ISP 代理',
      desc: '原生住宅IP通用方案，灵活配置满足多样需求。' }
  },
];

const GUIDE_COUNTRIES = [
  { id: 'us', label: '美国', flag: '🇺🇸', hot: true },
  { id: 'gb', label: '英国', flag: '🇬🇧', hot: true },
  { id: 'hk', label: '香港', flag: '🇭🇰', hot: true },
  { id: 'sg', label: '新加坡', flag: '🇸🇬' },
  { id: 'jp', label: '日本', flag: '🇯🇵' },
  { id: 'de', label: '德国', flag: '🇩🇪' },
  { id: 'kr', label: '韩国', flag: '🇰🇷' },
  { id: 'tw', label: '台湾', flag: '🇹🇼' },
  { id: 'vn', label: '越南', flag: '🇻🇳' },
  { id: 'th', label: '泰国', flag: '🇹🇭' },
  { id: 'br', label: '巴西', flag: '🇧🇷' },
  { id: 'ph', label: '菲律宾', flag: '🇵🇭' },
];

const GUIDE_DURATIONS = [
  { id: 'short_hour', label: '< 1小时', desc: '临时使用，按量付费', icon: '⚡', mapDuration: 'd_1' },
  { id: 'short_day', label: '< 1天', desc: '短期任务', icon: '🕐', mapDuration: 'd_1' },
  { id: 'month', label: '1个月', desc: '月度订阅', icon: '📅', mapDuration: 'd_30' },
  { id: 'long', label: '长期使用', desc: '稳定运营，长期独享', icon: '🏢', mapDuration: 'd_180' },
  { id: 'unknown', label: '不清楚', desc: '先试试看', icon: '🤔', mapDuration: 'd_30' },
];

const GUIDE_STEPS = [
  { title: '使用场景', subtitle: '您打算将代理用于什么业务？' },
  { title: '目标地区', subtitle: '您需要哪个国家/地区的IP？' },
  { title: '使用时长', subtitle: '您预计使用多长时间？' },
  { title: '智能推荐', subtitle: '根据您的选择，为您推荐最优方案' },
];

// ════════════════════════════════════════════════════════════
const StaticResidentialPurchase = () => {
  // Form State
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [viewCategory, setViewCategory] = useState(BUSINESS_CATEGORIES[0]);
  const [selectedScenarios, setSelectedScenarios] = useState([]);

  const scenarioIcons = {
    amazon: amazonImg,
    ebay: ebayImg,
    shopify: shopifyImg,
    tiktok_shop: tiktokImg,
  };
  const [selectedTerminal, setSelectedTerminal] = useState(null);
  const [protocol, setProtocol] = useState('SOCKS5');
  const [quantity, setQuantity] = useState(1);
  const [selectedDuration, setSelectedDuration] = useState(DURATIONS[0]);
  const [customDurationDays, setCustomDurationDays] = useState(7);
  const [purchaseType, setPurchaseType] = useState('one_time');
  const [selectedCycle, setSelectedCycle] = useState(SUBSCRIPTION_CYCLES[2]);
  const [autoRenew, setAutoRenew] = useState(true);
  
  const [recommendation, setRecommendation] = useState(null);
  const [bandwidthMode, setBandwidthMode] = useState('traffic');
  const [userOverrideMode, setUserOverrideMode] = useState(false);

  const [selectedSku, setSelectedSku] = useState(null);
  const [showRestockModal, setShowRestockModal] = useState(false);
  
  // Payment state
  const [paymentMethod, setPaymentMethod] = useState('stripe');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [billingAddress, setBillingAddress] = useState({
    line1: '',
    line2: '',
    city: '',
    state: '',
    postalCode: '',
    country: ''
  });
  const [useSavedCard, setUseSavedCard] = useState(true);
  const [selectedSavedCardId, setSelectedSavedCardId] = useState(SAVED_PAYMENT_METHODS.length > 0 ? SAVED_PAYMENT_METHODS[0].id : null);
  const [useBalance, setUseBalance] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [agreedTerms, setAgreedTerms] = useState(true);
  const [usdtNetwork, setUsdtNetwork] = useState('TRC20');
  const [usdtCopySuccess, setUsdtCopySuccess] = useState(false);

  // Coupon / 折扣码
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(null);   // { code, discountPercent, label }
  const [couponError, setCouponError] = useState('');
  const [isValidatingCoupon, setIsValidatingCoupon] = useState(false);

  // Auth State
  const [showAuthForm, setShowAuthForm] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Mock login state
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authConfirmPassword, setAuthConfirmPassword] = useState('');
  const [authVerifyCode, setAuthVerifyCode] = useState('');
  const [authErrors, setAuthErrors] = useState({});
  const [authSubmitting, setAuthSubmitting] = useState(false);
  const [verifyCodeCountdown, setVerifyCodeCountdown] = useState(0);
  const [justRegistered, setJustRegistered] = useState(false);
  const [showAuthPassword, setShowAuthPassword] = useState(false);
  const [showAuthConfirmPwd, setShowAuthConfirmPwd] = useState(false);
  const [authPhone, setAuthPhone] = useState('');
  const [authCountryCode, setAuthCountryCode] = useState('+86');
  const [showAuthCodeDropdown, setShowAuthCodeDropdown] = useState(false);
  const [authCaptchaVerified, setAuthCaptchaVerified] = useState(false);
  const [authAgreement, setAuthAgreement] = useState(false);
  const authFormRef = useRef(null);
  const authDropdownRef = useRef(null);

  // Purchase Guide State
  const [showGuide, setShowGuide] = useState(false);
  const [guideStep, setGuideStep] = useState(0);
  const [guideScenario, setGuideScenario] = useState('');
  const [guideCountry, setGuideCountry] = useState('');
  const [guideDuration, setGuideDuration] = useState('');
  const [guideAnimDir, setGuideAnimDir] = useState('next'); // 'next' | 'prev'

  const openGuide = () => {
    setGuideStep(0);
    setGuideScenario('');
    setGuideCountry('');
    setGuideDuration('');
    setGuideAnimDir('next');
    setShowGuide(true);
  };

  const guideNext = () => {
    setGuideAnimDir('next');
    setGuideStep(s => Math.min(s + 1, 3));
  };

  const guidePrev = () => {
    setGuideAnimDir('prev');
    setGuideStep(s => Math.max(s - 1, 0));
  };

  const guideCanNext = () => {
    if (guideStep === 0) return !!guideScenario;
    if (guideStep === 1) return !!guideCountry;
    if (guideStep === 2) return !!guideDuration;
    return false;
  };

  const applyGuideResult = () => {
    // Map scenario to viewCategory + selectedScenarios
    const scenarioObj = GUIDE_SCENARIOS.find(s => s.id === guideScenario);
    if (guideScenario === 'ecommerce' || guideScenario === 'social' || guideScenario === 'data') {
      const cat = BUSINESS_CATEGORIES.find(c => c.id === guideScenario || 
        (guideScenario === 'data' && c.id === 'scraping'));
      if (cat) setViewCategory(cat);
    }

    // Map country to region
    const region = REGIONS.find(r => r.id === guideCountry);
    if (region) setSelectedRegion(region);

    // Map duration
    const durObj = GUIDE_DURATIONS.find(d => d.id === guideDuration);
    if (durObj) {
      const dur = DURATIONS.find(d => d.id === durObj.mapDuration);
      if (dur) setSelectedDuration(dur);
    }

    // Map bandwidth mode
    if (scenarioObj?.recommend?.bandwidthMode) {
      setBandwidthMode(scenarioObj.recommend.bandwidthMode);
      setUserOverrideMode(true);
    }

    // Set recommended quantity
    if (guideDuration === 'long') setQuantity(5);
    else if (guideDuration === 'month') setQuantity(3);
    else setQuantity(1);

    setShowGuide(false);
  };

  const PAYMENT_METHODS = [
    { id: 'stripe', name: '银行卡', icon: <WalletCardIcon size="icon" />, brandColor: '#1A73E8', bgActive: 'border-blue-400 bg-blue-50/50 ring-2 ring-blue-100' },
    { id: 'wechat', name: '微信支付', icon: <WeChatIcon size="icon" />, brandColor: '#07C160', bgActive: 'border-green-400 bg-green-50/50 ring-2 ring-green-100' },
    { id: 'alipay', name: '支付宝', icon: <AlipayIcon size="icon" />, brandColor: '#1677FF', bgActive: 'border-blue-400 bg-blue-50/50 ring-2 ring-blue-100' },
    { id: 'usdt', name: 'USDT', icon: <UsdtIcon size="icon" />, brandColor: '#26A17B', bgActive: 'border-emerald-400 bg-emerald-50/50 ring-2 ring-emerald-100' },
  ];

  // Stock check
  const getStockStatus = (region) => {
    if (!region) return null;
    const pool = RESOURCE_POOL[region.id];
    if (!pool) return { label: region.stock || '未知', color: 'text-gray-400', bg: 'bg-gray-50' };
    if (pool.available <= 0) return { label: '缺货', color: 'text-red-500', bg: 'bg-red-50', isOutOfStock: true };
    if (pool.available <= (PRODUCT_CONFIG.stockThreshold || 50)) return { label: `仅剩 ${pool.available}`, color: 'text-amber-600', bg: 'bg-amber-50', isLowStock: true };
    return { label: '充足', color: 'text-emerald-600', bg: 'bg-emerald-50' };
  };

  const stockStatus = getStockStatus(selectedRegion);
  const isOutOfStock = stockStatus?.isOutOfStock || false;

  // Notify language switcher when component is mounted
  useEffect(() => {
    // Trigger custom event to notify language switcher script
    const event = new CustomEvent('purchase-page-mounted', { detail: { anchorId: 'isp-lang-anchor' } });
    window.dispatchEvent(event);
    
    // Also try to trigger language switcher directly after a short delay
    setTimeout(() => {
      const anchor = document.getElementById('isp-lang-anchor');
      if (anchor) {
        const insertEvent = new CustomEvent('lang-switcher-insert', { detail: { anchorId: 'isp-lang-anchor' } });
        window.dispatchEvent(insertEvent);
      }
    }, 100);
  }, []);

  // Effects
  useEffect(() => {
    const lastScenario = selectedScenarios[selectedScenarios.length - 1];
    if (lastScenario?.recommend?.bandwidthMode) {
      if (!userOverrideMode) { setBandwidthMode(lastScenario.recommend.bandwidthMode); setSelectedSku(null); }
    }
    if (lastScenario || selectedTerminal) {
      const recProto = selectedTerminal?.recommendedProtocol || 'SOCKS5';
      if (selectedTerminal) {
        const compatible = selectedTerminal.compatible || [];
        if (!compatible.includes(protocol)) setProtocol(recProto);
      }
      setRecommendation({
        protocol: recProto,
        desc: lastScenario?.recommend?.desc || '请完善业务信息以获取推荐配置',
        modeLabel: lastScenario?.recommend?.bandwidthMode === 'traffic' ? '流量计费' : (lastScenario?.recommend?.bandwidthMode === 'bandwidth' ? '独享带宽' : '待定')
      });
    }
  }, [selectedScenarios, selectedTerminal, userOverrideMode, protocol]);

  const calculateTotal = () => {
    if (!selectedSku) return 0;
    const durationDays = purchaseType === 'subscription'
      ? selectedCycle?.days
      : (selectedDuration?.days ?? customDurationDays);
    if (!durationDays || durationDays <= 0) return 0;
    const durationFactor = durationDays / 30;
    const durationDiscount = purchaseType === 'subscription'
      ? (selectedCycle?.discountRate ?? 1)
      : (selectedDuration?.discountRate ?? 1);
    return selectedSku.price * quantity * durationFactor * durationDiscount;
  };

  const totalUSDValue = calculateTotal();
  const totalCNYValue = totalUSDValue * 7.2;

  // Balance & Coupon Deduction Logic
  let balanceDeduction = 0;
  let finalPayAmount = totalUSDValue;

  // Coupon / Credit Discount Logic
  const couponDiscountUSD = couponApplied
    ? (couponApplied.fixedDiscount
        ? Math.min(couponApplied.fixedDiscount, totalUSDValue)
        : totalUSDValue * (couponApplied.discountPercent / 100))
    : 0;
  const afterCouponUSD = totalUSDValue - couponDiscountUSD;
  const afterCouponCNY = afterCouponUSD * 7.2;

  // Recalculate balance deduction based on after-coupon amount
  if (useBalance) {
    if (USER_BALANCE >= afterCouponUSD) {
      balanceDeduction = afterCouponUSD;
      finalPayAmount = 0;
    } else {
      balanceDeduction = USER_BALANCE;
      finalPayAmount = afterCouponUSD - USER_BALANCE;
    }
  } else {
    finalPayAmount = afterCouponUSD;
  }

  const totalCNY = totalCNYValue.toFixed(2);
  const totalUSD = totalUSDValue.toFixed(2);
  const couponDiscountCNY = (couponDiscountUSD * 7.2).toFixed(2);
  const balanceDeductionCNY = (balanceDeduction * 7.2).toFixed(2);
  const finalPayAmountCNY = (finalPayAmount * 7.2).toFixed(2);

  // USDT constants
  const USDT_EXCHANGE_RATE = 7.18; // 1 USDT ≈ 7.18 CNY
  const USDT_NETWORKS = [
    { id: 'TRC20', name: 'TRC20', chain: 'TRON', fee: '~1 USDT', confirmTime: '~1 min', address: 'T9yD14Nj9j7xAB4dbGeiX9h8zzLMzM2X' },
    { id: 'ERC20', name: 'ERC20', chain: 'Ethereum', fee: '~5-20 USDT', confirmTime: '~5 min', address: '0x742d35Cc6634C0532925a3b844Bc9e7595f2bD18' },
    { id: 'BEP20', name: 'BEP20', chain: 'BSC', fee: '~0.3 USDT', confirmTime: '~15 sec', address: '0xBb2b8038a1640196FbE3e38816F3e67Cba72D940' },
  ];
  const totalUSDT = (totalCNYValue / USDT_EXCHANGE_RATE).toFixed(2);
  const finalPayUSDT = (finalPayAmount * 7.2 / USDT_EXCHANGE_RATE).toFixed(2);
  const selectedNetwork = USDT_NETWORKS.find(n => n.id === usdtNetwork) || USDT_NETWORKS[0];

  // Credits & Promotion codes (enterprise-grade, aligned with CouponCenter)
  const AVAILABLE_CREDITS = {
    'WELCOME10':    { discountPercent: 10, label: '新用户欢迎礼',   description: '首次购买 10% 折扣',  minSpend: 0,  expiry: '2026-12-31' },
    'VIP20':        { discountPercent: 20, label: 'VIP 专属折扣',    description: 'VIP 专享 20% 折扣',  minSpend: 50, expiry: '2026-06-30' },
    'SAVE15':       { discountPercent: 15, label: '限时促销折扣',    description: '满 $30 享 15% 折扣', minSpend: 30, expiry: '2026-03-31' },
    'REFERRAL-10USD': { discountPercent: 0, fixedDiscount: 10, label: '推荐奖励额度', description: '$10 额度抵扣', minSpend: 50, expiry: '2026-11-30' },
  };

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) return;
    setCouponError('');
    setIsValidatingCoupon(true);
    // Simulate API validation
    setTimeout(() => {
      const code = couponCode.trim().toUpperCase();
      const found = AVAILABLE_CREDITS[code];
      if (!found) {
        setCouponError('无效的促销代码。请检查后重试。');
        setCouponApplied(null);
      } else if (found.minSpend > 0 && totalUSDValue < found.minSpend) {
        setCouponError(`此代码要求最低消费 $${found.minSpend}，当前订单金额不足。`);
        setCouponApplied(null);
      } else {
        setCouponApplied({ code, ...found });
        setCouponError('');
      }
      setIsValidatingCoupon(false);
    }, 500);
  };

  const handleRemoveCoupon = () => {
    setCouponApplied(null);
    setCouponCode('');
    setCouponError('');
  };

  const handleUsdtCopy = (text) => {
    navigator.clipboard.writeText(text);
    setUsdtCopySuccess(true);
    setTimeout(() => setUsdtCopySuccess(false), 2000);
  };

  // Shared payment footer renderer
  const renderPaymentFooter = (brandColor = '#1A73E8') => (
    <>
      {/* Balance & Subscription */}
      <div className="space-y-3 pt-2 border-t border-gray-100">
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-200">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-blue-100 rounded-lg text-[#1A73E8]">
              <Wallet className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm font-semibold text-gray-900">使用余额支付</div>
              <div className="text-xs text-gray-500">可用余额: <span className="font-medium text-gray-900">${USER_BALANCE.toFixed(2)}</span></div>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" checked={useBalance} onChange={(e) => setUseBalance(e.target.checked)} />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1A73E8]"></div>
          </label>
        </div>

        <div className="flex items-start gap-3 p-3 bg-blue-50/50 rounded-xl border border-blue-100">
          <div className="pt-0.5">
            <input type="checkbox" className="rounded border-gray-300 text-[#1A73E8] focus:ring-blue-500 w-4 h-4" 
              checked={isSubscribed} onChange={(e) => setIsSubscribed(e.target.checked)} 
            />
          </div>
          <div>
            <div className="text-sm font-semibold text-gray-900">开启自动订阅</div>
            <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">
              勾选后将自动续费。系统将优先扣除账户余额，不足部分将从您的默认支付方式中扣除。
            </p>
          </div>
        </div>
      </div>

      <label className="flex items-center gap-2 cursor-pointer group pt-1">
        <input type="checkbox" className="rounded border-gray-300 text-[#1A73E8] focus:ring-blue-500 w-4 h-4" 
          checked={agreedTerms} onChange={(e) => setAgreedTerms(e.target.checked)} 
        />
        <span className="text-[13px] text-gray-600 group-hover:text-gray-800 transition-colors">
          我已经阅读并同意 <a href="#" className="text-[#1A73E8] hover:text-blue-700 font-medium">《退款协议》</a>
        </span>
      </label>

      <div className="space-y-3 pt-2">
        <button
          onClick={() => {
            if (!isLoggedIn) {
              setShowAuthForm(true);
              // Scroll to auth form
              if (authFormRef.current) {
                authFormRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
              } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
              return;
            }
            setIsProcessingPayment(true);
          }}
          disabled={!agreedTerms}
          style={{ backgroundColor: agreedTerms ? brandColor : undefined }}
          className={`w-full py-3.5 text-white rounded-xl font-semibold text-[15px] transition-all shadow-md shadow-blue-100 active:scale-[0.98] flex items-center justify-center gap-2 ${!agreedTerms ? 'bg-gray-300 cursor-not-allowed' : 'hover:opacity-90'}`}
        >
          <span>立即支付</span>
          {useBalance && balanceDeduction > 0 && (
            <span className="text-white/70 text-sm font-normal">
              (余额抵扣 ${balanceDeduction.toFixed(2)})
            </span>
          )}
        </button>
        <button className="w-full py-3.5 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-xl font-semibold text-[15px] transition-all active:scale-[0.98]">
          加入购物车
        </button>
      </div>
    </>
  );

  const getDurationLabel = () => {
    if (!selectedDuration) return '-';
    if (selectedDuration.id === 'custom') return `${customDurationDays || 0}天`;
    return selectedDuration.label;
  };

  const getPurchaseTypeLabel = () => purchaseType === 'subscription' ? '订阅' : '一次性';
  const getCycleLabel = () => selectedCycle?.label || '-';
  const isSubscription = purchaseType === 'subscription';

  const isFormComplete = selectedSku && selectedRegion && (
    purchaseType === 'one_time' 
      ? (selectedDuration && (selectedDuration?.id !== 'custom' || (customDurationDays && customDurationDays > 0)))
      : selectedCycle
  );

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) parts.push(match.substring(i, i + 4));
    return parts.length ? parts.join(' ') : v;
  };

  // Terminal icon mapping
  const terminalIcons = { fingerprint: Globe, mobile: Smartphone, server: Server, router: Wifi, api: Terminal };

  // Country codes for phone field
  const AUTH_COUNTRY_CODES = [
    { code: '+86',  label: '中国', flag: '🇨🇳' },
    { code: '+1',   label: '美国/加拿大', flag: '🇺🇸' },
    { code: '+44',  label: '英国', flag: '🇬🇧' },
    { code: '+81',  label: '日本', flag: '🇯🇵' },
    { code: '+82',  label: '韩国', flag: '🇰🇷' },
    { code: '+852', label: '中国香港', flag: '🇭🇰' },
    { code: '+886', label: '中国台湾', flag: '🇹🇼' },
    { code: '+65',  label: '新加坡', flag: '🇸🇬' },
    { code: '+60',  label: '马来西亚', flag: '🇲🇾' },
    { code: '+61',  label: '澳大利亚', flag: '🇦🇺' },
    { code: '+49',  label: '德国', flag: '🇩🇪' },
    { code: '+33',  label: '法国', flag: '🇫🇷' },
    { code: '+7',   label: '俄罗斯', flag: '🇷🇺' },
    { code: '+91',  label: '印度', flag: '🇮🇳' },
    { code: '+55',  label: '巴西', flag: '🇧🇷' },
  ];

  // Password strength helper
  const getAuthPwdStrength = (pwd) => {
    if (!pwd) return { level: 0, text: '', color: '' };
    let s = 0;
    if (pwd.length >= 6) s++;
    if (pwd.length >= 10) s++;
    if (/[a-z]/.test(pwd)) s++;
    if (/[A-Z]/.test(pwd)) s++;
    if (/\d/.test(pwd)) s++;
    if (/[^A-Za-z0-9]/.test(pwd)) s++;
    if (s <= 2) return { level: 1, text: '弱', color: '#ef4444' };
    if (s <= 4) return { level: 2, text: '中', color: '#f59e0b' };
    return { level: 3, text: '强', color: '#22c55e' };
  };
  const authPwdStrength = getAuthPwdStrength(authPassword);

  // Close country-code dropdown on outside click
  useEffect(() => {
    if (!showAuthCodeDropdown) return;
    const handler = (e) => {
      if (authDropdownRef.current && !authDropdownRef.current.contains(e.target)) setShowAuthCodeDropdown(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [showAuthCodeDropdown]);

  // Auth Handlers
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setAuthSubmitting(true);
    setTimeout(() => {
      setAuthSubmitting(false);
      if (authEmail && authPassword) {
        setIsLoggedIn(true);
        setShowAuthForm(false);
      } else {
        setAuthErrors({ email: '请输入邮箱', password: '请输入密码' });
      }
    }, 1500);
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    // Validate
    const errs = {};
    if (!authEmail.trim()) errs.email = '请输入邮箱地址';
    else if (!/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(authEmail)) errs.email = '请输入正确的邮箱格式';
    if (authPhone.trim() && !/^\d{5,15}$/.test(authPhone)) errs.phone = '请输入有效的手机号码';
    if (!authPassword) errs.password = '请输入密码';
    else if (authPassword.length < 6) errs.password = '密码长度至少6位';
    if (!authConfirmPassword) errs.confirmPassword = '请确认密码';
    else if (authPassword !== authConfirmPassword) errs.confirmPassword = '两次密码输入不一致';
    if (!authVerifyCode) errs.verifyCode = '请输入验证码';
    if (!authCaptchaVerified) errs.captcha = '请完成滑块验证';
    if (!authAgreement) errs.agreement = '请阅读并同意相关协议';
    if (Object.keys(errs).length > 0) { setAuthErrors(errs); return; }

    setAuthSubmitting(true);
    try {
      const regBody = { email: authEmail, password: authPassword, verificationCode: authVerifyCode };
      if (authPhone.trim()) regBody.phone = `${authCountryCode}${authPhone}`;
      const resp = await fetch('/client/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(regBody),
      });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data.message || data.error || '注册失败');
      setJustRegistered(true);
      setAuthMode('login');
      setAuthErrors({});
    } catch (err) {
      let msg = err.message || '注册失败，请稍后重试';
      if (msg.includes('verification code')) msg = '验证码无效或已过期';
      if (msg.includes('already exists')) msg = '该邮箱已被注册';
      setAuthErrors(prev => ({ ...prev, submit: msg }));
    } finally {
      setAuthSubmitting(false);
    }
  };

  const handleSendVerifyCode = async () => {
    if (verifyCodeCountdown > 0) return;
    if (!authEmail.trim() || !/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(authEmail)) {
      setAuthErrors(prev => ({ ...prev, email: '请输入正确的邮箱地址' }));
      return;
    }
    try {
      const resp = await fetch('/client/send-verification-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: authEmail }),
      });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data.message || data.error || '发送失败');
      setVerifyCodeCountdown(60);
      const timer = setInterval(() => {
        setVerifyCodeCountdown(prev => {
          if (prev <= 1) { clearInterval(timer); return 0; }
          return prev - 1;
        });
      }, 1000);
    } catch (err) {
      setAuthErrors(prev => ({ ...prev, verifyCode: err.message || '验证码发送失败' }));
    }
  };

  // Smooth back navigation to homepage
  const handleBackToHome = () => {
    const ispRoot = document.getElementById('isp-root');
    const overlay = document.getElementById('page-transition-overlay');
    if (ispRoot) ispRoot.classList.add('exiting');
    if (overlay) {
      // Update spinner text for going back
      const txt = overlay.querySelector('.spinner-text');
      if (txt) txt.textContent = '返回首页...';
      setTimeout(() => overlay.classList.add('active'), 150);
    }
    setTimeout(() => {
      window.location.href = '/';
    }, 420);
  };

  return (
    <div className="pb-12" style={{ animation: 'none' }}>
      {/* Global language switcher anchor for ISP purchase page */}
      <div id="isp-lang-anchor" className="fixed top-4 right-4 z-[1200]" />

      {/* ═══════════════ Breadcrumb / Back Navigation ═══════════════ */}
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={handleBackToHome}
            className="group flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-gray-500 hover:text-[#1A73E8] hover:bg-blue-50/60 transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
            <span>返回</span>
          </button>
          <div className="hidden sm:flex items-center gap-1.5 text-sm text-gray-400">
            <Home className="w-3.5 h-3.5" />
            <span className="cursor-pointer hover:text-[#1A73E8] transition-colors" onClick={handleBackToHome}>首页</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-700 font-medium">购买静态住宅（ISP）代理</span>
          </div>
        </div>
      </div>

      {/* ═══════════════ Page Header ═══════════════ */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <h1 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 tracking-tight">购买静态住宅（ISP）代理</h1>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 border border-emerald-100 text-[11px] font-medium text-emerald-600">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            资源可用
          </span>
        </div>
        <p className="text-xs sm:text-sm text-gray-400">独享原生住宅IP · 100%真实ISP分配 · 支持HTTP/SOCKS5/WireGuard</p>
      </div>

      {/* Auth form moved to below quantity selector */}

      {/* ═══════════════ Main Grid ═══════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* ─────────── LEFT: Configuration ─────────── */}
        <div className="lg:col-span-8 space-y-5">
          
          {/* Main Config Card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden p-3 sm:p-4 lg:p-6 space-y-5 sm:space-y-6 lg:space-y-8">
            
            {/* Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">需求配置</h2>
              <button onClick={openGuide}
                className="flex items-center gap-1.5 text-[13px] text-[#1A73E8] hover:text-[#1765CC] font-medium transition-colors whitespace-nowrap shrink-0 group"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                购买引导
                <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>

            {/* Region Selection */}
            <div>
              <SectionLabel title="需求配置" required />
              <CustomSelect 
                value={selectedRegion}
                options={REGIONS}
                onChange={setSelectedRegion}
                placeholder="请选择国家/地区..."
                renderValue={(region) => {
                  const status = getStockStatus(region);
                  return (
                    <div className="flex items-center justify-between w-full text-sm">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900">{region.code} {region.name}</span>
                        <span className="text-gray-400">-{region.enName}</span>
                      </div>
                      {status && (
                        <span className="text-[#1A73E8] font-medium">
                          {status.isLowStock || status.isOutOfStock ? status.label : `仅剩 ${Math.floor(Math.random() * 50) + 20}`}
                        </span>
                      )}
                    </div>
                  );
                }}
                renderOption={(region) => {
                  const status = getStockStatus(region);
                  return (
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-2">
                        <span className="text-base">{region.flag}</span>
                        <span className="text-sm font-medium text-gray-900">{region.name}</span>
                        <span className="text-xs text-gray-400">{region.enName}</span>
                      </div>
                      <span className={`text-[11px] font-medium px-2 py-0.5 rounded-md ${status?.color} ${status?.bg}`}>
                        {status?.label}
                      </span>
                    </div>
                  );
                }}
              />
            </div>

            {/* Business Scenario */}
            <div>
              <SectionLabel title="目标业务用途" required />
              <div className="flex flex-col sm:flex-row rounded-2xl border border-gray-100 overflow-hidden bg-white sm:min-h-[180px] sm:max-h-[330px]">
                {/* Mobile: Horizontal Category Tabs */}
                <div className="flex sm:hidden border-b border-gray-100 bg-[#F8F9FB] shrink-0">
                  {BUSINESS_CATEGORIES.map(cat => {
                    const isActive = viewCategory.id === cat.id;
                    return (
                      <button 
                        key={cat.id}
                        onClick={() => setViewCategory(cat)}
                        className={`relative flex-1 py-3 text-[13px] font-medium transition-all ${
                          isActive 
                            ? 'text-[#1A73E8] bg-white font-bold' 
                            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100/50'
                        }`}
                      >
                        {isActive && (
                          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] w-8 bg-[#1A73E8] rounded-t-full"></div>
                        )}
                        {cat.name}
                      </button>
                    );
                  })}
                </div>

                {/* Desktop: Left Sidebar */}
                <div className="hidden sm:flex w-24 lg:w-28 shrink-0 bg-[#F8F9FB] flex-col">
                  {BUSINESS_CATEGORIES.map(cat => {
                    const isActive = viewCategory.id === cat.id;
                    return (
                      <button 
                        key={cat.id}
                        onClick={() => setViewCategory(cat)}
                        className={`relative w-full text-center py-4 text-[13px] font-medium transition-all ${
                          isActive 
                            ? 'text-[#1A73E8] bg-white font-bold' 
                            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100/50'
                        }`}
                      >
                        {isActive && (
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-4 bg-[#1A73E8] rounded-r-full"></div>
                        )}
                        {cat.name}
                      </button>
                    );
                  })}
                </div>
                
                {/* Right Content */}
                <div className="flex-1 p-3 sm:p-3.5 lg:p-5 overflow-y-auto">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                    {viewCategory.scenarios.map(sc => {
                       const isActive = selectedScenarios.some(s => s.id === sc.id);
                       return (
                        <button 
                          key={sc.id}
                          onClick={() => { 
                            const isSelected = selectedScenarios.some(s => s.id === sc.id);
                            let newSelection;
                            if (isSelected) {
                              newSelection = selectedScenarios.filter(s => s.id !== sc.id);
                            } else {
                              newSelection = [...selectedScenarios, { ...sc, categoryId: viewCategory.id, categoryName: viewCategory.name }];
                            }
                            setSelectedScenarios(newSelection);
                            setUserOverrideMode(false); 
                            setSelectedSku(null); 
                          }}
                          className={`relative flex items-center gap-1.5 sm:gap-0 sm:justify-between px-2 py-2 sm:px-3 sm:py-2.5 rounded-xl border transition-all duration-200 ease-in-out group bg-white active:scale-[0.98] ${
                            isActive 
                              ? 'border-[#1A73E8] shadow-sm ring-1 ring-[#1A73E8] ring-opacity-50' 
                              : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                          }`}
                        >
                          <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-md bg-white flex items-center justify-center overflow-hidden shrink-0 transition-transform duration-200 group-hover:scale-110">
                            {sc.id === 'ebay' ? (
                              <EbayIcon className="w-full h-full object-contain" />
                            ) : scenarioIcons[sc.id] ? (
                              <img src={scenarioIcons[sc.id]} alt={sc.name} className="w-full h-full object-contain" />
                            ) : (
                              <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 text-xs font-bold">
                                {sc.name[0]}
                              </div>
                            )}
                          </div>
                            <span className="text-[11px] sm:text-[12px] font-bold text-gray-900 truncate" title={sc.name}>{sc.name}</span>
                          </div>
                          <span className="hidden sm:inline text-[11px] text-[#1A73E8] font-medium whitespace-nowrap">仅剩 45</span>
                          {isActive && (
                            <div className="absolute top-0 right-0 w-0 h-0 border-t-[12px] border-r-[12px] border-t-[#1A73E8] border-r-[#1A73E8] rounded-bl-lg rounded-tr-lg">
                              {/* Optional: Checkmark icon could go here if space permits, but simple triangle is cleaner */}
                            </div>
                          )}
                        </button>
                       )
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Recommendation */}
            {selectedScenarios.length > 0 && (
              <div className="flex items-start gap-2.5 p-3 bg-blue-50/60 border border-blue-100 rounded-xl animate-in fade-in duration-200">
                <Sparkles className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                <div className="text-[13px] text-blue-700 leading-relaxed">
                  <span className="font-semibold">系统建议：</span>
                  {recommendation?.desc}
                  <span className="ml-1.5 inline-flex items-center px-1.5 py-0.5 rounded bg-blue-100/60 text-[11px] font-medium text-blue-600">
                    {recommendation?.modeLabel}
                  </span>
                </div>
              </div>
            )}

            {/* Terminal */}
            <div>
              <SectionLabel title="使用环境" subtitle="可选-影响协议适配" />
              <div className="flex flex-wrap gap-3">
                {TERMINALS.map(term => {
                  const isActive = selectedTerminal?.id === term.id;
                  const IconComp = { fingerprint: Globe, mobile: Smartphone, server: Server, router: Wifi, api: Terminal }[term.id] || Globe;
                  return (
                    <button key={term.id}
                      onClick={() => setSelectedTerminal(isActive ? null : term)}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-[13px] font-medium transition-all duration-200 ${
                        isActive 
                          ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-sm ring-1 ring-blue-600' 
                          : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <IconComp className="w-4 h-4" />
                      {term.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Protocol */}
            <div>
              <SectionLabel title="交付协议" required />
              <div className="flex flex-wrap gap-3">
                {ALL_PROTOCOLS.map(p => {
                  const isSelected = protocol === p;
                  return (
                    <button key={p}
                      onClick={() => setProtocol(p)}
                      className={`min-w-[80px] px-4 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200 ${
                        isSelected
                          ? 'bg-[#1A73E8] text-white shadow-md shadow-blue-200'
                          : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300'
                      }`}
                    >
                      {p === 'Wireguard' ? 'Wirguard' : p}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Duration */}
            <div>
              <SectionLabel title="IP购买时长" required />
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 sm:gap-3">
                {DURATIONS.map(d => {
                  const isSelected = selectedDuration?.id === d.id;
                  return (
                    <button key={d.id}
                      onClick={() => setSelectedDuration(d)}
                      className={`relative py-2.5 rounded-lg text-[13px] font-medium transition-all duration-200 ${
                        isSelected
                          ? 'bg-[#1A73E8] text-white shadow-md shadow-blue-200'
                          : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300'
                      }`}
                    >
                      {d.label}
                      {d.discountLabel && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold leading-none shadow-sm z-10">
                          {d.discountLabel}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Billing Mode & SKU */}
            <div>
              <SectionLabel 
                title="规格套餐" required
                extra={
                  <div className="flex bg-gray-100 p-0.5 rounded-lg">
                    <button 
                      onClick={() => { setUserOverrideMode(true); setBandwidthMode('traffic'); setSelectedSku(null); }}
                      className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-all duration-150 ${bandwidthMode === 'traffic' ? 'bg-white text-[#1A73E8] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                      按流量
                    </button>
                    <button 
                      onClick={() => { setUserOverrideMode(true); setBandwidthMode('bandwidth'); setSelectedSku(null); }}
                      className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-all duration-150 ${bandwidthMode === 'bandwidth' ? 'bg-white text-[#1A73E8] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                      按带宽
                    </button>
                  </div>
                }
              />
              {selectedScenarios.length > 0 && selectedScenarios[selectedScenarios.length - 1]?.recommend?.bandwidthMode && userOverrideMode && (
                <div className="text-[11px] text-gray-400 -mt-1 mb-2">
                  系统推荐 <span className="font-semibold text-gray-600">{selectedScenarios[selectedScenarios.length - 1].recommend.bandwidthMode === 'traffic' ? '按流量' : '按带宽'}</span>
                  <span className="text-[#1A73E8] ml-1">· 已手动选择</span>
                </div>
              )}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
                {SKUS[bandwidthMode].map((sku, idx) => {
                  const isActive = selectedSku?.id === sku.id;
                  const isPopular = idx === 2; // 3rd item as popular
                  return (
                      <button key={sku.id}
                      onClick={() => setSelectedSku(sku)}
                      className={`relative p-3.5 rounded-xl border-2 transition-all duration-150 flex flex-col items-center gap-1 ${
                        isActive
                          ? 'border-[#1A73E8] bg-blue-50/60 shadow-sm shadow-blue-100'
                          : 'border-gray-100 bg-white hover:border-gray-200 hover:bg-gray-50/50'
                      }`}
                    >
                      {isPopular && (
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-[9px] px-2 py-0.5 rounded-full font-semibold leading-none shadow-sm whitespace-nowrap">
                          热销
                        </div>
                      )}
                      <div className={`text-base font-bold ${isActive ? 'text-[#1A73E8]' : 'text-gray-800'}`}>{sku.name}</div>
                      <div className={`text-[11px] ${isActive ? 'text-[#1A73E8]' : 'text-gray-400'}`}>
                        ${sku.price}/{bandwidthMode === 'traffic' ? '月' : '月'}
                      </div>
                      {isActive && (
                        <div className="absolute top-1.5 right-1.5 w-4 h-4 bg-[#1A73E8] rounded-full flex items-center justify-center">
                          <Check className="w-2.5 h-2.5 text-white" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <SectionLabel title="购买数量" required />
              <div className="flex items-center gap-3">
                <div className="inline-flex items-center border border-gray-200 rounded-xl overflow-hidden">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-9 h-9 flex items-center justify-center bg-gray-50 hover:bg-gray-100 text-gray-500 border-r border-gray-200 transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <input 
                    type="number" min={1} value={quantity}
                    onChange={(e) => { const v = parseInt(e.target.value); if (v > 0) setQuantity(v); }}
                    className="w-14 h-9 text-center font-semibold text-gray-900 text-sm border-0 focus:outline-none focus:ring-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <button onClick={() => setQuantity(quantity + 1)}
                    className="w-9 h-9 flex items-center justify-center bg-gray-50 hover:bg-gray-100 text-gray-500 border-l border-gray-200 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
                <span className="text-[12px] text-gray-400">
                  {selectedRegion ? `${selectedRegion.name} 区域可用` : '请先选择地区'}
                </span>
              </div>
            </div>

            {/* ═══════════════ Inline Auth Form (below quantity) ═══════════════ */}
            {showAuthForm && !isLoggedIn && (
              <div ref={authFormRef} className="mt-6 bg-white rounded-2xl border border-blue-100 shadow-sm p-3 sm:p-4 lg:p-6 space-y-4 sm:space-y-5 animate-in fade-in slide-in-from-top-4 duration-300">
                {/* Header with tabs */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 bg-gray-100/80 rounded-xl p-1">
                    <button 
                      onClick={() => { setAuthMode('register'); setAuthErrors({}); setJustRegistered(false); }}
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-[13px] font-medium transition-all ${authMode === 'register' ? 'bg-white text-[#1A73E8] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                      <UserPlus className="w-3.5 h-3.5" />
                      注册账户
                    </button>
                    <button 
                      onClick={() => { setAuthMode('login'); setAuthErrors({}); }}
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-[13px] font-medium transition-all ${authMode === 'login' ? 'bg-white text-[#1A73E8] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                      <LogIn className="w-3.5 h-3.5" />
                      登录
                    </button>
                  </div>
                  <button onClick={() => setShowAuthForm(false)} className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Info banner */}
                <div className="flex items-center gap-2.5 p-3 bg-blue-50/70 border border-blue-100 rounded-xl">
                  <Info className="w-4 h-4 text-blue-500 shrink-0" />
                  <span className="text-[13px] text-blue-700">
                    {authMode === 'register' ? '请先注册账户，即可完成支付购买代理资源' : '请登录您的账户以继续完成支付'}
                  </span>
                </div>

                {/* ──── Register Form ──── */}
                {authMode === 'register' && (
                  <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
                    {/* Email */}
                    <div>
                      <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
                        <span className="text-red-500 mr-0.5">*</span>邮箱地址
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                        <input 
                          type="email" value={authEmail} 
                          onChange={(e) => { setAuthEmail(e.target.value); if (authErrors.email) setAuthErrors(prev => ({...prev, email: ''})); }}
                          placeholder="请输入邮箱地址"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-blue-100 focus:border-[#1A73E8] outline-none transition-all text-sm placeholder:text-gray-300"
                        />
                      </div>
                      {authErrors.email && <span className="text-[12px] text-red-500 mt-1 block">{authErrors.email}</span>}
                    </div>

                    {/* Phone (optional) */}
                    <div>
                      <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
                        手机号码 <span className="text-gray-400 font-normal text-[11px]">（选填）</span>
                      </label>
                      <div className="flex gap-2">
                        <div className="relative" ref={authDropdownRef}>
                          <button type="button" onClick={() => setShowAuthCodeDropdown(!showAuthCodeDropdown)}
                            className="flex items-center gap-1 px-2.5 py-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-[13px] min-w-[90px] focus:border-[#1A73E8] focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                          >
                            <span>{AUTH_COUNTRY_CODES.find(c => c.code === authCountryCode)?.flag}</span>
                            <span className="text-gray-700">{authCountryCode}</span>
                            <ChevronDown className="ml-auto w-3 h-3 text-gray-400" />
                          </button>
                          {showAuthCodeDropdown && (
                            <div className="absolute z-50 top-full left-0 mt-1 w-56 max-h-48 overflow-y-auto bg-white border border-gray-200 rounded-xl shadow-xl">
                              {AUTH_COUNTRY_CODES.map((c) => (
                                <button key={c.code} type="button"
                                  onClick={() => { setAuthCountryCode(c.code); setShowAuthCodeDropdown(false); }}
                                  className={`w-full flex items-center gap-2 px-3 py-2 text-[13px] hover:bg-blue-50 transition-colors ${authCountryCode === c.code ? 'bg-blue-50 text-[#1A73E8]' : 'text-gray-700'}`}
                                >
                                  <span>{c.flag}</span><span>{c.label}</span><span className="ml-auto text-gray-400">{c.code}</span>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="relative flex-1">
                          <Smartphone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                          <input type="tel" value={authPhone}
                            onChange={(e) => { setAuthPhone(e.target.value.replace(/\D/g, '')); if (authErrors.phone) setAuthErrors(prev => ({...prev, phone: ''})); }}
                            placeholder="请输入手机号码"
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-blue-100 focus:border-[#1A73E8] outline-none transition-all text-sm placeholder:text-gray-300"
                          />
                        </div>
                      </div>
                      {authErrors.phone && <span className="text-[12px] text-red-500 mt-1 block">{authErrors.phone}</span>}
                    </div>

                    {/* Password */}
                    <div>
                      <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
                        <span className="text-red-500 mr-0.5">*</span>密码
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                        <input 
                          type={showAuthPassword ? 'text' : 'password'} value={authPassword}
                          onChange={(e) => { setAuthPassword(e.target.value); if (authErrors.password) setAuthErrors(prev => ({...prev, password: ''})); }}
                          placeholder="请输入密码（至少6位）"
                          className="w-full pl-10 pr-12 py-2.5 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-blue-100 focus:border-[#1A73E8] outline-none transition-all text-sm placeholder:text-gray-300"
                        />
                        <button type="button" onClick={() => setShowAuthPassword(!showAuthPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600">
                          {showAuthPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      {authPassword && (
                        <div className="flex items-center gap-2 mt-1.5">
                          <div className="flex gap-1">
                            {[1, 2, 3].map((i) => (
                              <div key={i} className="w-6 h-1 rounded-full transition-colors"
                                style={{ backgroundColor: authPwdStrength.level >= i ? authPwdStrength.color : '#e5e7eb' }} />
                            ))}
                          </div>
                          <span className="text-[11px]" style={{ color: authPwdStrength.color }}>{authPwdStrength.text}</span>
                        </div>
                      )}
                      {authErrors.password && <span className="text-[12px] text-red-500 mt-1 block">{authErrors.password}</span>}
                    </div>

                    {/* Confirm Password */}
                    <div>
                      <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
                        <span className="text-red-500 mr-0.5">*</span>确认密码
                      </label>
                      <div className="relative">
                        <Shield className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                        <input 
                          type={showAuthConfirmPwd ? 'text' : 'password'} value={authConfirmPassword}
                          onChange={(e) => { setAuthConfirmPassword(e.target.value); if (authErrors.confirmPassword) setAuthErrors(prev => ({...prev, confirmPassword: ''})); }}
                          placeholder="请再次输入密码"
                          className="w-full pl-10 pr-12 py-2.5 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-blue-100 focus:border-[#1A73E8] outline-none transition-all text-sm placeholder:text-gray-300"
                        />
                        <button type="button" onClick={() => setShowAuthConfirmPwd(!showAuthConfirmPwd)} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600">
                          {showAuthConfirmPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      {authConfirmPassword && authPassword === authConfirmPassword && (
                        <div className="flex items-center gap-1 mt-1">
                          <CheckCircle className="w-3 h-3 text-emerald-500" />
                          <span className="text-[12px] text-emerald-500">密码一致</span>
                        </div>
                      )}
                      {authErrors.confirmPassword && <span className="text-[12px] text-red-500 mt-1 block">{authErrors.confirmPassword}</span>}
                    </div>

                    {/* Verify Code */}
                    <div>
                      <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
                        <span className="text-red-500 mr-0.5">*</span>邮箱验证码
                      </label>
                      <div className="flex gap-2.5">
                        <div className="relative flex-1">
                          <Shield className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                          <input 
                            type="text" value={authVerifyCode} maxLength={6}
                            onChange={(e) => { setAuthVerifyCode(e.target.value.replace(/\D/g, '')); if (authErrors.verifyCode) setAuthErrors(prev => ({...prev, verifyCode: ''})); }}
                            placeholder="请输入6位验证码"
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-blue-100 focus:border-[#1A73E8] outline-none transition-all text-sm placeholder:text-gray-300"
                          />
                        </div>
                        <button 
                          type="button" onClick={handleSendVerifyCode}
                          disabled={verifyCodeCountdown > 0 || authSubmitting}
                          className="px-4 py-2.5 rounded-xl text-[13px] font-medium whitespace-nowrap transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-[#1A73E8] text-white hover:bg-[#1557B0] active:scale-[0.98]"
                        >
                          {verifyCodeCountdown > 0 ? `${verifyCodeCountdown}s` : '获取验证码'}
                        </button>
                      </div>
                      {authErrors.verifyCode && <span className="text-[12px] text-red-500 mt-1 block">{authErrors.verifyCode}</span>}
                    </div>

                    {/* Slider CAPTCHA */}
                    <div>
                      <label className="block text-[13px] font-medium text-gray-700 mb-1.5">
                        <span className="text-red-500 mr-0.5">*</span>人机验证
                      </label>
                      <SliderCaptcha onVerified={(v) => { setAuthCaptchaVerified(v); if (authErrors.captcha) setAuthErrors(prev => ({...prev, captcha: ''})); }} />
                      {authErrors.captcha && <span className="text-[12px] text-red-500 mt-1 block">{authErrors.captcha}</span>}
                    </div>

                    {/* Agreement */}
                    <div>
                      <label className="flex items-start gap-2 cursor-pointer select-none">
                        <input type="checkbox" checked={authAgreement}
                          onChange={(e) => { setAuthAgreement(e.target.checked); if (authErrors.agreement) setAuthErrors(prev => ({...prev, agreement: ''})); }}
                          className="mt-0.5 w-4 h-4 rounded border-gray-300 text-[#1A73E8] focus:ring-[#1A73E8]"
                        />
                        <span className="text-[12px] text-gray-500 leading-relaxed">
                          我已阅读并同意
                          <a href="/terms" target="_blank" className="text-[#1A73E8] hover:text-[#1557B0] mx-0.5">《用户协议》</a>
                          和
                          <a href="/privacy" target="_blank" className="text-[#1A73E8] hover:text-[#1557B0] mx-0.5">《隐私政策》</a>
                        </span>
                      </label>
                      {authErrors.agreement && <span className="text-[12px] text-red-500 mt-1 block">{authErrors.agreement}</span>}
                    </div>

                    {/* Submit error */}
                    {authErrors.submit && (
                      <div className="bg-red-50 text-red-600 text-[13px] px-3 py-2 rounded-xl border border-red-200">
                        {authErrors.submit}
                      </div>
                    )}

                    {/* Submit */}
                    <button 
                      type="submit" disabled={authSubmitting}
                      className="w-full py-3 bg-[#1A73E8] hover:bg-[#1557B0] text-white rounded-xl font-semibold text-[14px] transition-all shadow-md shadow-blue-100 active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {authSubmitting ? (
                        <><Loader2 className="w-4 h-4 animate-spin" /><span>注册中...</span></>
                      ) : (
                        <><UserPlus className="w-4 h-4" /><span>立即注册</span></>
                      )}
                    </button>

                    <p className="text-center text-[13px] text-gray-400">
                      已有账户？{' '}
                      <button type="button" onClick={() => { setAuthMode('login'); setAuthErrors({}); }} className="text-[#1A73E8] hover:text-[#1557B0] font-medium">
                        立即登录
                      </button>
                    </p>
                  </form>
                )}

                {/* ──── Login Form ──── */}
                {authMode === 'login' && (
                  <form onSubmit={handleLoginSubmit} className="space-y-5">
                    <h2 className="text-center text-2xl font-bold text-gray-900">欢迎您登录！</h2>
                    
                    {/* Registration success banner */}
                    {justRegistered && (
                      <div className="flex items-center gap-2.5 p-3 bg-emerald-50 border border-emerald-100 rounded-xl">
                        <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span className="text-[13px] text-emerald-700 font-medium">注册成功！请使用您的邮箱和密码登录</span>
                      </div>
                    )}

                    {/* Email */}
                    <div>
                      <input 
                        type="email" value={authEmail}
                        onChange={(e) => { setAuthEmail(e.target.value); if (authErrors.email) setAuthErrors(prev => ({...prev, email: ''})); }}
                        placeholder="请输入邮箱地址/手机号"
                        className="w-full px-4 py-3 rounded-lg bg-gray-50 border-0 focus:ring-2 focus:ring-[#1A73E8] outline-none transition-all text-sm placeholder:text-gray-400"
                      />
                      {authErrors.email && <span className="text-[12px] text-red-500 mt-1 block">{authErrors.email}</span>}
                    </div>

                    {/* Password */}
                    <div>
                      <div className="relative">
                        <input 
                          type={showAuthPassword ? 'text' : 'password'} value={authPassword}
                          onChange={(e) => { setAuthPassword(e.target.value); if (authErrors.password) setAuthErrors(prev => ({...prev, password: ''})); }}
                          placeholder="密码"
                          className="w-full px-4 py-3 rounded-lg bg-gray-50 border-0 focus:ring-2 focus:ring-[#1A73E8] outline-none transition-all text-sm placeholder:text-gray-400 pr-10"
                        />
                        <button type="button" onClick={() => setShowAuthPassword(!showAuthPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                          {showAuthPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                      {authErrors.password && <span className="text-[12px] text-red-500 mt-1 block">{authErrors.password}</span>}
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">没有账号？ <button type="button" onClick={() => { setAuthMode('register'); setAuthErrors({}); setJustRegistered(false); }} className="cursor-pointer hover:text-[#1557B0] text-[#1A73E8] font-medium">立即注册</button></span>
                      <a href="#" className="hover:text-[#1557B0] text-gray-500">忘记密码</a>
                    </div>

                    <div className="flex items-center">
                      <input id="isp_login_agreement" type="checkbox" className="w-4 h-4 text-[#1A73E8] border-gray-300 rounded focus:ring-[#1A73E8]" />
                      <label htmlFor="isp_login_agreement" className="ml-2 text-xs text-gray-500">
                        我已阅读并同意<a href="/terms" target="_blank" className="text-[#1A73E8] hover:text-[#1557B0] mx-1">《用户协议》</a>和<a href="/privacy" target="_blank" className="text-[#1A73E8] hover:text-[#1557B0] mx-1">《隐私政策》</a>
                      </label>
                    </div>

                    {/* Submit */}
                    <button 
                      type="submit" disabled={authSubmitting}
                      className="w-full py-3 bg-[#1A73E8] hover:bg-[#1557B0] text-white rounded-lg font-medium text-base transition-all shadow-sm active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {authSubmitting ? (
                        <><Loader2 className="w-5 h-5 animate-spin" /><span>登录中...</span></>
                      ) : (
                        <span>登 录</span>
                      )}
                    </button>

                    <div className="flex items-center my-4">
                      <div className="flex-1 border-t border-gray-200"></div>
                      <span className="px-4 text-sm text-gray-400">其他登录方式</span>
                      <div className="flex-1 border-t border-gray-200"></div>
                    </div>

                    <div className="flex justify-around items-center">
                      <div className="flex flex-col items-center cursor-pointer hover:opacity-80 transition-opacity">
                        <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mb-2 hover:bg-gray-200 transition-colors">
                          <WeChatIcon size="md" className="w-7 h-7" />
                        </div>
                        <span className="text-xs text-gray-500">微信</span>
                      </div>
                      <div className="flex flex-col items-center cursor-pointer hover:opacity-80 transition-opacity">
                        <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mb-2 hover:bg-gray-200 transition-colors">
                          <svg viewBox="0 0 24 24" className="w-7 h-7 text-[#0866FF]" fill="currentColor"><path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z" /></svg>
                        </div>
                        <span className="text-xs text-gray-500">Facebook</span>
                      </div>
                      <div className="flex flex-col items-center cursor-pointer hover:opacity-80 transition-opacity">
                        <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mb-2 hover:bg-gray-200 transition-colors">
                          <svg viewBox="0 0 24 24" className="w-7 h-7">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                          </svg>
                        </div>
                        <span className="text-xs text-gray-500">Google</span>
                      </div>
                      <div className="flex flex-col items-center cursor-pointer hover:opacity-80 transition-opacity">
                        <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mb-2 hover:bg-gray-200 transition-colors">
                          <svg viewBox="0 0 24 24" className="w-7 h-7 text-[#E6162D]" fill="currentColor"><path d="M10.098 20.323c-3.977.391-7.414-1.406-7.672-4.02-.259-2.609 2.759-5.047 6.74-5.441 3.979-.394 7.413 1.404 7.671 4.018.259 2.6-2.759 5.049-6.737 5.439l-.002.004zM9.05 17.219c-.384.616-1.208.884-1.829.602-.612-.279-.793-.991-.406-1.593.379-.595 1.176-.861 1.793-.601.622.263.82.972.442 1.592zm1.27-1.627c-.141.237-.449.353-.689.253-.236-.09-.313-.361-.177-.586.138-.227.436-.346.672-.24.239.09.315.36.18.601l.014-.028zm.176-2.719c-1.893-.493-4.033.45-4.857 2.118-.836 1.704-.026 3.591 1.886 4.21 1.983.64 4.318-.341 5.132-2.179.8-1.793-.201-3.642-2.161-4.149zm7.563-1.224c-.346-.105-.57-.18-.405-.615.375-.977.42-1.804 0-2.404-.781-1.112-2.915-1.053-5.364-.03 0 0-.766.331-.571-.271.376-1.217.315-2.224-.27-2.809-1.338-1.337-4.869.045-7.888 3.08C1.309 10.87 0 13.273 0 15.348c0 3.981 5.099 6.395 10.086 6.395 6.536 0 10.888-3.801 10.888-6.82 0-1.822-1.547-2.854-2.915-3.284v.01zm1.908-5.092c-.766-.856-1.908-1.187-2.96-.962-.436.09-.706.511-.616.932.09.42.511.691.932.602.511-.105 1.067.044 1.442.465.376.421.466.977.316 1.473-.136.406.089.856.51.992.405.119.857-.105.992-.512.33-1.021.12-2.178-.646-3.035l.03.045zm2.418-2.195c-1.576-1.757-3.905-2.419-6.054-1.968-.496.104-.812.587-.706 1.081.104.496.586.813 1.082.707 1.532-.331 3.185.15 4.296 1.383 1.112 1.246 1.429 2.943.947 4.416-.165.48.106 1.007.586 1.157.479.165.991-.104 1.157-.586.675-2.088.241-4.478-1.338-6.235l.03.045z" /></svg>
                        </div>
                        <span className="text-xs text-gray-500">微博</span>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            )}

          </div>
        </div>


        {/* ─────────── RIGHT: Order Summary + Payment ─────────── */}
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-6 space-y-4">
            
            {/* Order Summary Card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              
              {/* Header */}
              <div className="px-5 py-3.5 border-b border-gray-50">
                <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                  <Package className="w-4 h-4 text-[#1A73E8]" />
                  订单摘要
                </h3>
              </div>

              {/* Incomplete hint */}
              {!isFormComplete && (
                <div className="mx-4 mt-4 flex items-center gap-2 p-2.5 bg-amber-50/70 border border-amber-100 rounded-lg">
                  <Info className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span className="text-[12px] text-amber-700">请完善左侧配置后即可下单</span>
                </div>
              )}
              
              {/* Order Details */}
              <div className="px-5 py-4 space-y-1">
                <OrderRow label="代理类型" value="静态住宅 ISP" />
                <OrderRow label="国家/地区" value={selectedRegion ? `${selectedRegion.flag} ${selectedRegion.name}` : null} muted={!selectedRegion} />
                <OrderRow label="业务场景" value={selectedScenarios.length > 0 ? selectedScenarios.map(s => s.name).join(', ') : null} muted={selectedScenarios.length === 0} />
                <OrderRow label="交付协议" value={protocol} />
                
                <div className="border-t border-dashed border-gray-100 my-2"></div>
                
                <OrderRow label="规格套餐" value={selectedSku?.name} muted={!selectedSku} />
                <OrderRow label="计费模式" value={bandwidthMode === 'traffic' ? '按流量' : '按带宽'} />
                <OrderRow label="购买方式" value={getPurchaseTypeLabel()} />
                {purchaseType === 'subscription' ? (
                  <OrderRow label="续费周期" value={getCycleLabel()} />
                ) : (
                  <OrderRow label="购买时长" value={getDurationLabel()} />
                )}
                <OrderRow label="数量" value={`× ${quantity}`} />
              </div>

              {/* ── Credits & Promotional Code (Enterprise) ── */}
              <div className="mx-4 mb-2">
                {couponApplied ? (
                  /* ── Applied state: clean confirmation banner ── */
                  <div className="flex items-center justify-between py-2.5 px-3.5 rounded-lg border border-[#1A73E8]/20 bg-blue-50/50">
                    <div className="flex items-center gap-2.5">
                      <div className="w-5 h-5 rounded flex items-center justify-center bg-[#1A73E8]/10">
                        <CheckCircle className="w-3.5 h-3.5 text-[#1A73E8]" />
                      </div>
                      <div className="leading-tight">
                        <div className="flex items-center gap-2">
                          <code className="text-xs font-mono font-bold text-[#1A73E8] tracking-wide">{couponApplied.code}</code>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#1A73E8]/10 text-[#1A73E8] font-medium">
                            {couponApplied.fixedDiscount ? `-$${couponApplied.fixedDiscount}` : `-${couponApplied.discountPercent}%`}
                          </span>
                        </div>
                        <div className="text-[11px] text-gray-500 mt-0.5">{couponApplied.description || couponApplied.label}</div>
                      </div>
                    </div>
                    <button
                      onClick={handleRemoveCoupon}
                      className="text-gray-400 hover:text-red-500 transition-colors p-1.5 rounded-lg hover:bg-red-50"
                      title="移除"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  /* ── Input state: minimal inline input ── */
                  <div>
                    <div className="flex items-stretch gap-0">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => { setCouponCode(e.target.value.toUpperCase()); setCouponError(''); }}
                        onKeyDown={(e) => e.key === 'Enter' && handleApplyCoupon()}
                        placeholder="输入促销代码"
                        className="flex-1 px-3 py-2 text-[13px] font-mono border border-gray-200 rounded-l-lg bg-white focus:border-[#1A73E8] focus:ring-1 focus:ring-[#1A73E8]/20 outline-none transition-all placeholder:text-gray-400 placeholder:font-sans"
                      />
                      <button
                        onClick={handleApplyCoupon}
                        disabled={!couponCode.trim() || isValidatingCoupon}
                        className="px-4 py-2 text-[13px] font-medium rounded-r-lg transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed border border-l-0 border-gray-200 text-[#1A73E8] bg-gray-50 hover:bg-[#1A73E8] hover:text-white hover:border-[#1A73E8] active:scale-[0.98]"
                      >
                        {isValidatingCoupon ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : '应用'}
                      </button>
                    </div>
                    {couponError && (
                      <div className="flex items-center gap-1.5 mt-1.5 px-0.5">
                        <Info className="w-3 h-3 text-red-400 shrink-0" />
                        <span className="text-[11px] text-red-500">{couponError}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* ── Cost Breakdown (AWS/GCP billing style) ── */}
              <div className="mx-4 mb-4">
                <div className="rounded-lg border border-gray-200 overflow-hidden">
                  {/* Line items */}
                  <div className="divide-y divide-gray-100">
                    {/* Subtotal */}
                    <div className="flex justify-between items-center px-4 py-2.5 text-[13px]">
                      <span className="text-gray-600">小计 (Subtotal)</span>
                      <span className={`font-medium tabular-nums ${couponApplied ? 'text-gray-400 line-through' : 'text-gray-900'}`}>
                        ¥{totalCNY}
                      </span>
                    </div>
                    <div className="flex justify-between items-center px-4 py-1.5 text-[12px] text-gray-400 bg-gray-50/50">
                      <span></span>
                      <span className="tabular-nums">≈ ${totalUSD} USD</span>
                    </div>

                    {/* Coupon / Credit discount */}
                    {couponApplied && (
                      <div className="flex justify-between items-center px-4 py-2.5 text-[13px] bg-blue-50/30">
                        <span className="text-[#1A73E8] flex items-center gap-1.5">
                          <Tag className="w-3 h-3" />
                          额度折扣
                          <span className="text-[11px] font-mono text-[#1A73E8]/70">
                            ({couponApplied.fixedDiscount ? `$${couponApplied.fixedDiscount}` : `${couponApplied.discountPercent}%`})
                          </span>
                        </span>
                        <span className="font-medium text-[#1A73E8] tabular-nums">
                          − ¥{couponDiscountCNY}
                        </span>
                      </div>
                    )}

                    {/* Balance deduction */}
                    {useBalance && balanceDeduction > 0 && (
                      <div className="flex justify-between items-center px-4 py-2.5 text-[13px]">
                        <span className="text-gray-600 flex items-center gap-1.5">
                          余额抵扣
                        </span>
                        <span className="font-medium text-gray-600 tabular-nums">
                          − ¥{balanceDeductionCNY}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Total due */}
                  <div className="flex justify-between items-end px-4 py-3 bg-gray-50 border-t border-gray-200">
                    <div>
                      <div className="text-[12px] font-semibold text-gray-500 uppercase tracking-wider">
                        {(useBalance || couponApplied) ? '应付金额' : '合计'}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`font-bold tracking-tight tabular-nums ${(useBalance || couponApplied) ? 'text-xl text-[#1A73E8]' : 'text-xl text-gray-900'}`}>
                        <span className="text-sm mr-0.5 opacity-60">¥</span>
                        {(useBalance || couponApplied) ? finalPayAmountCNY : totalCNY}
                      </div>
                      {(useBalance || couponApplied) && (
                        <div className="text-[11px] text-gray-400 mt-0.5 tabular-nums">
                          ≈ ${(useBalance || couponApplied) ? (finalPayAmount).toFixed(2) : totalUSD} USD
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-5 py-3.5 border-b border-gray-50">
                <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-[#1A73E8]" />
                  支付方式
                </h3>
              </div>

              <div className="p-4 space-y-4">
                {/* Payment Methods — Card Grid */}
                <div className="grid grid-cols-4 gap-3 mb-6">
                  {PAYMENT_METHODS.map(method => {
                    const isActive = paymentMethod === method.id;
                    return (
                      <button key={method.id}
                        onClick={() => setPaymentMethod(method.id)}
                        className={`relative flex flex-col items-start justify-center gap-1.5 py-2.5 pl-3 rounded-xl border transition-all duration-200 ${
                          isActive 
                            ? 'border-[#1A73E8] bg-blue-50/50 text-blue-600 shadow-sm ring-1 ring-blue-500/20' 
                            : 'border-gray-200 hover:border-gray-300 bg-white text-gray-600 hover:bg-gray-50/50'
                        }`}
                      >
                        <div className={`transition-transform duration-200 ${isActive ? 'scale-105' : ''} scale-75 origin-left`}>
                          {method.icon}
                        </div>
                        <span className="text-[13px] font-medium tracking-wide">
                          {method.name}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Bank Card Details (Informational) */}
                {paymentMethod === 'stripe' && (
                  <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300 px-1">

                    <div className="flex items-center gap-3 pt-1 pb-1">
                      <div className="h-10 w-14 flex items-center justify-center rounded-lg overflow-hidden">
                        <img src={card1Img} alt="Mastercard" className="w-full h-full object-contain" />
                      </div>
                      <div className="h-10 w-14 flex items-center justify-center rounded-lg overflow-hidden">
                        <img src={card2Img} alt="UnionPay" className="w-full h-full object-contain" />
                      </div>
                      <div className="h-10 w-14 flex items-center justify-center rounded-lg overflow-hidden">
                        <img src={card3Img} alt="Visa" className="w-full h-full object-contain" />
                      </div>
                      <div className="h-10 w-14 flex items-center justify-center rounded-lg overflow-hidden">
                        <AmexIcon size="md" className="w-full h-full" />
                      </div>
                      <div className="h-10 w-14 flex items-center justify-center rounded-lg overflow-hidden">
                        <DiscoverIcon size="md" className="w-full h-full" />
                      </div>
                    </div>

                    {/* Saved Cards Selection */}
                    {SAVED_PAYMENT_METHODS.filter(m => m.type === 'card').length > 0 && (
                      <div className="space-y-3">
                        <label className="text-sm font-medium text-gray-900">选择银行卡</label>
                        <div className="space-y-2">
                          {SAVED_PAYMENT_METHODS.filter(m => m.type === 'card').map(card => (
                            <div key={card.id} 
                              onClick={() => { setUseSavedCard(true); setSelectedSavedCardId(card.id); }}
                              className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                                useSavedCard && selectedSavedCardId === card.id
                                  ? 'border-[#1A73E8] bg-blue-50/50 ring-1 ring-blue-500/20'
                                  : 'border-gray-200 hover:border-gray-300 bg-white'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                                  useSavedCard && selectedSavedCardId === card.id ? 'border-[#1A73E8]' : 'border-gray-300'
                                }`}>
                                  {useSavedCard && selectedSavedCardId === card.id && <div className="w-2 h-2 rounded-full bg-[#1A73E8]" />}
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="w-8 h-5 rounded border border-gray-200 bg-white flex items-center justify-center">
                                    <span className="text-[8px] font-bold text-[#1A73E8] italic font-serif uppercase">{card.brand}</span>
                                  </div>
                                  <span className="text-sm font-medium text-gray-700">•••• {card.last4}</span>
                                </div>
                              </div>
                              <span className="text-xs text-gray-400">过期: {card.expiry}</span>
                            </div>
                          ))}
                          
                          {/* Use New Card Option */}
                          <div 
                            onClick={() => setUseSavedCard(false)}
                            className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                              !useSavedCard
                                ? 'border-[#1A73E8] bg-blue-50/50 ring-1 ring-blue-500/20'
                                : 'border-gray-200 hover:border-gray-300 bg-white'
                            }`}
                          >
                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                              !useSavedCard ? 'border-[#1A73E8]' : 'border-gray-300'
                            }`}>
                              {!useSavedCard && <div className="w-2 h-2 rounded-full bg-[#1A73E8]" />}
                            </div>
                            <span className="text-sm font-medium text-gray-700">使用新卡支付</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* New Card Form */}
                    {(!useSavedCard || SAVED_PAYMENT_METHODS.filter(m => m.type === 'card').length === 0) && (
                      <div className="space-y-4 pt-2 border-t border-gray-100 mt-2">
                        
                        <div>
                          <label className="block text-[13px] font-medium text-gray-900 mb-2">
                            <span className="text-red-500 mr-0.5">*</span>卡上姓名
                          </label>
                          <input type="text" placeholder="请输入卡上姓名" value={cardName}
                            onChange={(e) => setCardName(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-blue-100 focus:border-[#1A73E8] outline-none transition-all text-sm placeholder:text-gray-300"
                          />
                        </div>

                        <div>
                          <label className="block text-[13px] font-medium text-gray-900 mb-2">
                            <span className="text-red-500 mr-0.5">*</span>借记卡/信用卡卡号
                          </label>
                          <input type="text" placeholder="0000 0000 0000 0000" value={cardNumber}
                            onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                            maxLength={19}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-blue-100 focus:border-[#1A73E8] outline-none transition-all text-sm placeholder:text-gray-300 tracking-wide"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[13px] font-medium text-gray-900 mb-2">
                              <span className="text-red-500 mr-0.5">*</span>有效期
                            </label>
                            <input type="text" placeholder="MM/YY" value={cardExpiry}
                              onChange={(e) => setCardExpiry(e.target.value)} maxLength={5}
                              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-blue-100 focus:border-[#1A73E8] outline-none transition-all text-sm placeholder:text-gray-300"
                            />
                          </div>
                          <div>
                            <label className="block text-[13px] font-medium text-gray-900 mb-2">
                              <span className="text-red-500 mr-0.5">*</span>安全码
                            </label>
                            <input type="text" placeholder="000" value={cardCvc}
                              onChange={(e) => setCardCvc(e.target.value)} maxLength={4}
                              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-blue-100 focus:border-[#1A73E8] outline-none transition-all text-sm placeholder:text-gray-300"
                            />
                          </div>
                        </div>

                        {/* Billing Address */}
                        <div className="pt-2">
                          <h4 className="text-sm font-bold text-gray-900 mb-3">账单地址</h4>
                          <div className="space-y-3">
                            <input type="text" placeholder="地址行 1" value={billingAddress.line1} onChange={(e) => setBillingAddress({...billingAddress, line1: e.target.value})} className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:border-[#1A73E8]" />
                            <input type="text" placeholder="地址行 2 (可选)" value={billingAddress.line2} onChange={(e) => setBillingAddress({...billingAddress, line2: e.target.value})} className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:border-[#1A73E8]" />
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <input type="text" placeholder="城市" value={billingAddress.city} onChange={(e) => setBillingAddress({...billingAddress, city: e.target.value})} className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:border-[#1A73E8]" />
                              <input type="text" placeholder="州/省" value={billingAddress.state} onChange={(e) => setBillingAddress({...billingAddress, state: e.target.value})} className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:border-[#1A73E8]" />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <input type="text" placeholder="邮编" value={billingAddress.postalCode} onChange={(e) => setBillingAddress({...billingAddress, postalCode: e.target.value})} className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:border-[#1A73E8]" />
                              <input type="text" placeholder="国家" value={billingAddress.country} onChange={(e) => setBillingAddress({...billingAddress, country: e.target.value})} className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:border-[#1A73E8]" />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {renderPaymentFooter('#1A73E8')}
                  </div>
                )}

                {/* ── WeChat Pay Details ── */}
                {paymentMethod === 'wechat' && (
                  <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300 px-1">
                    {/* WeChat Pay Branding */}
                    <div className="p-4 rounded-2xl border border-green-100 bg-gradient-to-br from-green-50/60 to-emerald-50/40">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-[#07C160] flex items-center justify-center shadow-sm shadow-green-200">
                          <svg viewBox="0 0 576 512" className="w-6 h-6" fill="white" xmlns="http://www.w3.org/2000/svg">
                            <path d="M385.2 167.6c6.4 0 12.6.3 18.8 1.1C387.4 90.3 303.3 32 207.7 32 100.5 32 13 104.8 13 197.4c0 53.4 29.3 97.5 77.9 131.6l-19.3 58.6 68-34.1c24.4 4.8 43.8 9.7 68.2 9.7 6.2 0 12.1-.3 18.3-.8-3.8-13-5.9-26.8-5.9-41.2 0-87.8 79.2-154.2 165-154.2zm-104.5-52.9c14.5 0 24.2 9.7 24.2 24.4 0 14.5-9.7 24.2-24.2 24.2-14.8 0-29.3-9.7-29.3-24.2 0-14.8 14.5-24.4 29.3-24.4zm-136.4 48.6c-14.5 0-29.3-9.7-29.3-24.2 0-14.8 14.8-24.4 29.3-24.4 14.8 0 24.4 9.7 24.4 24.4 0 14.5-9.7 24.2-24.4 24.2zM563 319.4c0-77.9-77.9-141.3-165.4-141.3-92.7 0-165.4 63.4-165.4 141.3S305 460.7 397.6 460.7c19.3 0 38.9-4.8 58.6-9.7l53.4 29.3-14.8-48.6C534 402.1 563 363.2 563 319.4zm-219.1-24.5c-9.7 0-19.3-9.7-19.3-19.6 0-9.7 9.7-19.3 19.3-19.3 14.8 0 24.4 9.7 24.4 19.3 0 10-9.7 19.6-24.4 19.6zm107.1 0c-9.7 0-19.3-9.7-19.3-19.6 0-9.7 9.7-19.3 19.3-19.3 14.5 0 24.4 9.7 24.4 19.3 0 10-9.9 19.6-24.4 19.6z"/>
                          </svg>
                        </div>
                        <div>
                          <div className="text-sm font-bold text-gray-900">微信支付</div>
                          <div className="text-xs text-gray-500">WeChat Pay · 安全快捷</div>
                        </div>
                        <div className="ml-auto flex items-center gap-1.5 text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                          <Shield className="w-3.5 h-3.5" />
                          <span className="text-[11px] font-semibold">已加密</span>
                        </div>
                      </div>

                      {/* Payment Flow Steps */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-3 p-2.5 bg-white/80 rounded-xl">
                          <div className="w-6 h-6 rounded-full bg-[#07C160] text-white flex items-center justify-center text-xs font-bold shrink-0">1</div>
                          <span className="text-[13px] text-gray-700">点击「立即支付」生成付款二维码</span>
                        </div>
                        <div className="flex items-center gap-3 p-2.5 bg-white/80 rounded-xl">
                          <div className="w-6 h-6 rounded-full bg-[#07C160] text-white flex items-center justify-center text-xs font-bold shrink-0">2</div>
                          <span className="text-[13px] text-gray-700">打开微信「扫一扫」扫描二维码</span>
                        </div>
                        <div className="flex items-center gap-3 p-2.5 bg-white/80 rounded-xl">
                          <div className="w-6 h-6 rounded-full bg-[#07C160] text-white flex items-center justify-center text-xs font-bold shrink-0">3</div>
                          <span className="text-[13px] text-gray-700">确认支付后系统自动完成交付</span>
                        </div>
                      </div>
                    </div>

                    {/* Payment Amount Preview */}
                    <div className="flex items-center justify-between p-3.5 bg-gray-50 rounded-xl border border-gray-200">
                      <span className="text-sm text-gray-600">支付金额</span>
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900">
                          <span className="text-sm text-gray-400 mr-0.5">¥</span>
                          {useBalance ? finalPayAmountCNY : totalCNY}
                        </div>
                        <div className="text-[11px] text-gray-400">≈ ${useBalance ? finalPayAmount.toFixed(2) : totalUSD} USD</div>
                      </div>
                    </div>

                    {renderPaymentFooter('#07C160')}
                  </div>
                )}

                {/* ── Alipay Details ── */}
                {paymentMethod === 'alipay' && (
                  <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300 px-1">
                    {/* Alipay Branding */}
                    <div className="p-4 rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50/60 to-blue-50/40">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-[#1677FF] flex items-center justify-center shadow-sm shadow-blue-200">
                          <svg viewBox="0 0 24 24" className="w-6 h-6" fill="white" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19.695 15.07c3.426 1.158 4.203 1.22 4.203 1.22V3.846c0-2.124-1.705-3.845-3.81-3.845H3.914C1.808.001.102 1.722.102 3.846v16.31c0 2.123 1.706 3.845 3.813 3.845h16.173c2.105 0 3.81-1.722 3.81-3.845v-.157s-6.19-2.602-9.315-4.119c-2.096 2.602-4.8 4.181-7.607 4.181-4.75 0-6.361-4.19-4.112-6.949.49-.602 1.324-1.175 2.617-1.497 2.025-.502 5.247.313 8.266 1.317a16.796 16.796 0 0 0 1.341-3.302H5.781v-.952h4.799V6.975H4.77v-.953h5.81V3.591s0-.409.411-.409h2.347v2.84h5.744v.951h-5.744v1.704h4.69a19.453 19.453 0 0 1-1.986 5.06c1.424.52 2.702 1.011 3.654 1.333m-13.81-2.032c-.596.06-1.71.325-2.321.869-1.83 1.608-.735 4.55 2.968 4.55 2.151 0 4.301-1.388 5.99-3.61-2.403-1.182-4.438-2.028-6.637-1.809"/>
                          </svg>
                        </div>
                        <div>
                          <div className="text-sm font-bold text-gray-900">支付宝</div>
                          <div className="text-xs text-gray-500">Alipay · 全球信赖</div>
                        </div>
                        <div className="ml-auto flex items-center gap-1.5 text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                          <Shield className="w-3.5 h-3.5" />
                          <span className="text-[11px] font-semibold">已加密</span>
                        </div>
                      </div>

                      {/* Payment Flow Steps */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-3 p-2.5 bg-white/80 rounded-xl">
                          <div className="w-6 h-6 rounded-full bg-[#1677FF] text-white flex items-center justify-center text-xs font-bold shrink-0">1</div>
                          <span className="text-[13px] text-gray-700">点击「立即支付」跳转至支付宝收银台</span>
                        </div>
                        <div className="flex items-center gap-3 p-2.5 bg-white/80 rounded-xl">
                          <div className="w-6 h-6 rounded-full bg-[#1677FF] text-white flex items-center justify-center text-xs font-bold shrink-0">2</div>
                          <span className="text-[13px] text-gray-700">使用支付宝 APP 扫码或登录账号确认</span>
                        </div>
                        <div className="flex items-center gap-3 p-2.5 bg-white/80 rounded-xl">
                          <div className="w-6 h-6 rounded-full bg-[#1677FF] text-white flex items-center justify-center text-xs font-bold shrink-0">3</div>
                          <span className="text-[13px] text-gray-700">完成支付后页面自动跳转，资源即时交付</span>
                        </div>
                      </div>
                    </div>

                    {/* Alipay Features */}
                    <div className="grid grid-cols-3 gap-2">
                      <div className="flex flex-col items-center p-2.5 bg-gray-50 rounded-xl border border-gray-100">
                        <Zap className="w-4 h-4 text-blue-500 mb-1" />
                        <span className="text-[11px] text-gray-600 font-medium">极速到账</span>
                      </div>
                      <div className="flex flex-col items-center p-2.5 bg-gray-50 rounded-xl border border-gray-100">
                        <Shield className="w-4 h-4 text-blue-500 mb-1" />
                        <span className="text-[11px] text-gray-600 font-medium">资金保障</span>
                      </div>
                      <div className="flex flex-col items-center p-2.5 bg-gray-50 rounded-xl border border-gray-100">
                        <Lock className="w-4 h-4 text-blue-500 mb-1" />
                        <span className="text-[11px] text-gray-600 font-medium">隐私保护</span>
                      </div>
                    </div>

                    {/* Payment Amount Preview */}
                    <div className="flex items-center justify-between p-3.5 bg-gray-50 rounded-xl border border-gray-200">
                      <span className="text-sm text-gray-600">支付金额</span>
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900">
                          <span className="text-sm text-gray-400 mr-0.5">¥</span>
                          {useBalance ? finalPayAmountCNY : totalCNY}
                        </div>
                        <div className="text-[11px] text-gray-400">≈ ${useBalance ? finalPayAmount.toFixed(2) : totalUSD} USD</div>
                      </div>
                    </div>

                    {renderPaymentFooter('#1677FF')}
                  </div>
                )}

                {/* ── USDT Details ── */}
                {paymentMethod === 'usdt' && (
                  <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300 px-1">
                    {/* USDT Branding */}
                    <div className="p-4 rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50/60 to-teal-50/40">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-[#26A17B] flex items-center justify-center shadow-sm shadow-emerald-200">
                          <svg viewBox="0 0 24 24" className="w-6 h-6" fill="white" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18.7538 10.5176c0 .6251-2.2379 1.1483-5.2381 1.2812l.0028.0007c-.0848.0064-.5233.0325-1.5012.0325-.7778 0-1.33-.0233-1.5237-.0325-3.0059-.1322-5.2495-.6555-5.2495-1.2819s2.2436-1.149 5.2495-1.2834v2.0442c.1965.0142.7594.0474 1.5372.0474.9334 0 1.4008-.0389 1.4849-.0466V9.2356c2.9994.1337 5.2381.657 5.2381 1.282zm5.19.5466L12.1248 22.389a.1803.1803 0 0 1-.2496 0L.0562 11.0635a.1781.1781 0 0 1-.0382-.2079l4.3762-9.1921a.1767.1767 0 0 1 .1626-.1026h14.8878a.1768.1768 0 0 1 .1612.1032l4.3762 9.1922a.1782.1782 0 0 1-.0382.2079zm-4.478-.4038c0-.8068-2.5515-1.4799-5.9473-1.6369V7.195h4.186V4.4055H6.3076V7.195h4.1852v1.8286c-3.4018.1562-5.9601.83-5.9601 1.6376 0 .8075 2.5583 1.4806 5.9601 1.6376v5.8618h3.025v-5.8639c3.394-.1563 5.948-.8295 5.948-1.6363z"/>
                          </svg>
                        </div>
                        <div>
                          <div className="text-sm font-bold text-gray-900">USDT (Tether)</div>
                          <div className="text-xs text-gray-500">稳定币 · 去中心化支付</div>
                        </div>
                      </div>

                      {/* Network Selection */}
                      <div className="space-y-2.5">
                        <div className="text-[13px] font-semibold text-gray-700">选择转账网络</div>
                        <div className="grid grid-cols-3 gap-2">
                          {USDT_NETWORKS.map(network => (
                            <button
                              key={network.id}
                              onClick={() => setUsdtNetwork(network.id)}
                              className={`relative p-3 rounded-xl border text-center transition-all duration-200 ${
                                usdtNetwork === network.id
                                  ? 'border-[#26A17B] bg-white ring-1 ring-emerald-500/20 shadow-sm'
                                  : 'border-gray-200 bg-white/60 hover:border-gray-300'
                              }`}
                            >
                              {usdtNetwork === network.id && (
                                <div className="absolute top-1.5 right-1.5">
                                  <Check className="w-3.5 h-3.5 text-[#26A17B]" />
                                </div>
                              )}
                              <div className={`text-sm font-bold ${usdtNetwork === network.id ? 'text-[#26A17B]' : 'text-gray-700'}`}>
                                {network.name}
                              </div>
                              <div className="text-[11px] text-gray-400 mt-0.5">{network.chain}</div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Network Info */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                        <div className="text-[11px] text-gray-400 mb-1">预估手续费</div>
                        <div className="text-sm font-semibold text-gray-900">{selectedNetwork.fee}</div>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                        <div className="text-[11px] text-gray-400 mb-1">确认时间</div>
                        <div className="text-sm font-semibold text-gray-900">{selectedNetwork.confirmTime}</div>
                      </div>
                    </div>

                    {renderPaymentFooter('#26A17B')}
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Modals */}
      <RestockNotifyModal isOpen={showRestockModal} onClose={() => setShowRestockModal(false)} region={selectedRegion} />
      <PaymentProcessingModal
        isOpen={isProcessingPayment}
        onClose={() => setIsProcessingPayment(false)}
        method={PAYMENT_METHODS.find(m => m.id === paymentMethod)}
        amount={totalCNY}
        onComplete={() => { setIsProcessingPayment(false); alert('Purchase Successful!'); }}
      />

      {/* ═══════════════ Purchase Guide Wizard Modal ═══════════════ */}
      {showGuide && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center" style={{ animation: 'fadeIn 0.2s ease' }}>
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setShowGuide(false)} />

          {/* Modal */}
          <div className="relative w-full max-w-lg mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden" style={{ animation: 'slideUp 0.35s cubic-bezier(0.16,1,0.3,1)' }}>
            
            {/* Header */}
            <div className="relative px-6 pt-6 pb-4 bg-gradient-to-br from-[#1A73E8]/5 via-blue-50/80 to-indigo-50/60">
              <button onClick={() => setShowGuide(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/80 hover:bg-white shadow-sm flex items-center justify-center text-gray-400 hover:text-gray-600 transition-all"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#1A73E8] flex items-center justify-center shadow-sm shadow-blue-200">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">购买引导</h3>
                  <p className="text-xs text-gray-500">分步向导帮您快速找到最优代理方案</p>
                </div>
              </div>
              
              {/* Step Indicators */}
              <div className="flex items-center gap-1 mt-2">
                {GUIDE_STEPS.map((s, i) => (
                  <React.Fragment key={i}>
                    <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
                      i === guideStep ? 'bg-[#1A73E8] text-white shadow-sm shadow-blue-200' :
                      i < guideStep ? 'bg-blue-100 text-[#1A73E8]' : 'bg-gray-100 text-gray-400'
                    }`}>
                      {i < guideStep ? <Check className="w-3 h-3" /> : <span>{i + 1}</span>}
                      <span className="hidden sm:inline">{s.title}</span>
                    </div>
                    {i < GUIDE_STEPS.length - 1 && (
                      <div className={`flex-1 h-0.5 rounded-full transition-colors duration-300 ${i < guideStep ? 'bg-[#1A73E8]/40' : 'bg-gray-200'}`} />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Body */}
            <div className="px-6 py-5 min-h-[280px]">
              <div className="mb-4">
                <h4 className="text-base font-semibold text-gray-900">{GUIDE_STEPS[guideStep].subtitle}</h4>
              </div>

              {/* Step 0: Scenario Selection */}
              {guideStep === 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5" style={{ animation: `${guideAnimDir === 'next' ? 'slideInRight' : 'slideInLeft'} 0.3s ease` }}>
                  {GUIDE_SCENARIOS.map(s => (
                    <button key={s.id}
                      onClick={() => setGuideScenario(s.id)}
                      className={`relative p-3.5 rounded-xl border-2 text-left transition-all duration-200 group ${
                        guideScenario === s.id
                          ? 'border-[#1A73E8] bg-blue-50/60 ring-2 ring-blue-100 shadow-sm'
                          : 'border-gray-150 bg-white hover:border-blue-200 hover:bg-blue-50/30 hover:shadow-sm'
                      }`}
                    >
                      {guideScenario === s.id && (
                        <div className="absolute top-2 right-2">
                          <Check className="w-4 h-4 text-[#1A73E8]" />
                        </div>
                      )}
                      <div className="text-2xl mb-1.5">{s.icon}</div>
                      <div className={`text-sm font-semibold mb-0.5 ${guideScenario === s.id ? 'text-[#1A73E8]' : 'text-gray-800'}`}>{s.label}</div>
                      <div className="text-[11px] text-gray-400 leading-tight">{s.desc}</div>
                    </button>
                  ))}
                </div>
              )}

              {/* Step 1: Country Selection */}
              {guideStep === 1 && (
                <div style={{ animation: `${guideAnimDir === 'next' ? 'slideInRight' : 'slideInLeft'} 0.3s ease` }}>
                  {/* Hot countries */}
                  <div className="mb-3">
                    <div className="text-xs text-gray-400 font-medium mb-2 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" /> 热门地区
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {GUIDE_COUNTRIES.filter(c => c.hot).map(c => (
                        <button key={c.id}
                          onClick={() => setGuideCountry(c.id)}
                          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl border-2 transition-all duration-200 ${
                            guideCountry === c.id
                              ? 'border-[#1A73E8] bg-blue-50/60 ring-2 ring-blue-100 shadow-sm'
                              : 'border-gray-150 bg-white hover:border-blue-200 hover:shadow-sm'
                          }`}
                        >
                          <span className="text-lg">{c.flag}</span>
                          <span className={`text-sm font-medium ${guideCountry === c.id ? 'text-[#1A73E8]' : 'text-gray-700'}`}>{c.label}</span>
                          {guideCountry === c.id && <Check className="w-3.5 h-3.5 text-[#1A73E8]" />}
                        </button>
                      ))}
                    </div>
                  </div>
                  {/* All countries */}
                  <div>
                    <div className="text-xs text-gray-400 font-medium mb-2 flex items-center gap-1">
                      <Globe className="w-3 h-3" /> 全部地区
                    </div>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-1.5 max-h-[160px] overflow-y-auto pr-1">
                      {GUIDE_COUNTRIES.filter(c => !c.hot).map(c => (
                        <button key={c.id}
                          onClick={() => setGuideCountry(c.id)}
                          className={`flex items-center gap-1.5 px-2.5 py-2 rounded-lg border transition-all duration-150 text-left ${
                            guideCountry === c.id
                              ? 'border-[#1A73E8] bg-blue-50/60 ring-1 ring-blue-100'
                              : 'border-gray-100 bg-gray-50/50 hover:border-blue-200 hover:bg-blue-50/30'
                          }`}
                        >
                          <span className="text-sm">{c.flag}</span>
                          <span className={`text-xs font-medium truncate ${guideCountry === c.id ? 'text-[#1A73E8]' : 'text-gray-600'}`}>{c.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Duration Selection */}
              {guideStep === 2 && (
                <div className="space-y-2" style={{ animation: `${guideAnimDir === 'next' ? 'slideInRight' : 'slideInLeft'} 0.3s ease` }}>
                  {GUIDE_DURATIONS.map(d => (
                    <button key={d.id}
                      onClick={() => setGuideDuration(d.id)}
                      className={`w-full flex items-center gap-3.5 p-3.5 rounded-xl border-2 text-left transition-all duration-200 ${
                        guideDuration === d.id
                          ? 'border-[#1A73E8] bg-blue-50/60 ring-2 ring-blue-100 shadow-sm'
                          : 'border-gray-150 bg-white hover:border-blue-200 hover:shadow-sm'
                      }`}
                    >
                      <span className="text-xl">{d.icon}</span>
                      <div className="flex-1">
                        <div className={`text-sm font-semibold ${guideDuration === d.id ? 'text-[#1A73E8]' : 'text-gray-800'}`}>{d.label}</div>
                        <div className="text-xs text-gray-400">{d.desc}</div>
                      </div>
                      {guideDuration === d.id && (
                        <div className="w-5 h-5 rounded-full bg-[#1A73E8] flex items-center justify-center">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              )}

              {/* Step 3: Recommendation Result */}
              {guideStep === 3 && (() => {
                const scenarioObj = GUIDE_SCENARIOS.find(s => s.id === guideScenario);
                const countryObj = GUIDE_COUNTRIES.find(c => c.id === guideCountry);
                const durationObj = GUIDE_DURATIONS.find(d => d.id === guideDuration);
                const rec = scenarioObj?.recommend || {};
                const colorMap = {
                  indigo: { bg: 'bg-indigo-50', border: 'border-indigo-200', text: 'text-indigo-700', tagBg: 'bg-indigo-100', tagText: 'text-indigo-600' },
                  blue: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', tagBg: 'bg-blue-100', tagText: 'text-blue-600' },
                  emerald: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', tagBg: 'bg-emerald-100', tagText: 'text-emerald-600' },
                  purple: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-700', tagBg: 'bg-purple-100', tagText: 'text-purple-600' },
                  slate: { bg: 'bg-slate-50', border: 'border-slate-200', text: 'text-slate-700', tagBg: 'bg-slate-100', tagText: 'text-slate-600' },
                };
                const clr = colorMap[rec.color] || colorMap.blue;

                return (
                  <div style={{ animation: 'slideInRight 0.3s ease' }}>
                    {/* Summary chips */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gray-100 text-xs font-medium text-gray-600">
                        {scenarioObj?.icon} {scenarioObj?.label}
                      </span>
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gray-100 text-xs font-medium text-gray-600">
                        {countryObj?.flag} {countryObj?.label}
                      </span>
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gray-100 text-xs font-medium text-gray-600">
                        {durationObj?.icon} {durationObj?.label}
                      </span>
                    </div>

                    {/* Recommendation Card */}
                    <div className={`rounded-xl border-2 ${clr.border} ${clr.bg} p-4 mb-4`}>
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`text-base font-bold ${clr.text}`}>{rec.title}</span>
                          </div>
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md ${clr.tagBg} ${clr.tagText} text-[11px] font-semibold`}>
                            <Star className="w-3 h-3" /> {rec.tag}
                          </span>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-white/80 flex items-center justify-center shadow-sm">
                          <Shield className="w-5 h-5 text-[#1A73E8]" />
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed mb-3">{rec.desc}</p>
                      <div className="space-y-1.5">
                        {['100% 真实 ISP 原生住宅IP', '独享不共用，稳定不掉线', '支持 HTTP / SOCKS5 / WireGuard'].map((f, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-gray-600">
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                            {f}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Config preview */}
                    <div className="grid grid-cols-3 gap-2.5">
                      <div className="p-2.5 bg-gray-50 rounded-lg border border-gray-100 text-center">
                        <div className="text-[10px] text-gray-400 mb-0.5">地区</div>
                        <div className="text-sm font-semibold text-gray-800">{countryObj?.flag} {countryObj?.label}</div>
                      </div>
                      <div className="p-2.5 bg-gray-50 rounded-lg border border-gray-100 text-center">
                        <div className="text-[10px] text-gray-400 mb-0.5">计费模式</div>
                        <div className="text-sm font-semibold text-gray-800">{rec.bandwidthMode === 'bandwidth' ? '独享带宽' : '流量包'}</div>
                      </div>
                      <div className="p-2.5 bg-gray-50 rounded-lg border border-gray-100 text-center">
                        <div className="text-[10px] text-gray-400 mb-0.5">时长</div>
                        <div className="text-sm font-semibold text-gray-800">{durationObj?.label}</div>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-gray-50/80 border-t border-gray-100 flex items-center justify-between">
              <button
                onClick={guideStep === 0 ? () => setShowGuide(false) : guidePrev}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {guideStep === 0 ? '取消' : '上一步'}
              </button>
              <div>
                {guideStep < 3 ? (
                  <button
                    onClick={guideNext}
                    disabled={!guideCanNext()}
                    className="px-5 py-2 text-sm font-semibold text-white bg-[#1A73E8] hover:bg-[#1557B0] rounded-lg shadow-sm shadow-blue-200 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-1.5"
                  >
                    下一步
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={applyGuideResult}
                    className="px-5 py-2 text-sm font-semibold text-white bg-[#1A73E8] hover:bg-[#1557B0] rounded-lg shadow-sm shadow-blue-200 transition-all flex items-center gap-1.5"
                  >
                    <Zap className="w-3.5 h-3.5" />
                    应用推荐配置
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Inline animations */}
          <style>{`
            @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
            @keyframes slideUp { from { opacity: 0; transform: translateY(24px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
            @keyframes slideInRight { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
            @keyframes slideInLeft { from { opacity: 0; transform: translateX(-20px); } to { opacity: 1; transform: translateX(0); } }
          `}</style>
        </div>
      )}
    </div>
  );
};

export default StaticResidentialPurchase;

