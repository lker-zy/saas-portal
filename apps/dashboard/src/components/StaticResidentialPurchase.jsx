import React, { useState, useEffect, useRef } from 'react';
import {
  Globe, ShoppingCart, Share2, Database, Smartphone, Server, Wifi,
  CheckCircle, Zap, Shield, ArrowRight, CreditCard, Box, ChevronDown, Check, Info, Minus, Plus, Monitor, Terminal,
  Bell, X, Mail, Copy, Loader2, QrCode, Wallet, HelpCircle, Lock, Tag, Sparkles, ChevronRight, Star, TrendingUp, Package,
  AlertCircle, AlertTriangle, Gift
} from 'lucide-react';
import { productService } from '../services/productService';
import { paymentService } from '../services/paymentService';
import orderService from '../services/orderService';
import couponService from '../services/couponService';
import { useAuth } from '../contexts/AuthContext';
import { usePurchaseFlow } from '../hooks/usePurchaseFlow';

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
import amexSvg from '../assets/amex.svg';
import discoverSvg from '../assets/discover.svg';

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
const StaticResidentialPurchase = ({ onOpenPurchaseGuide }) => {
  // Auth & Purchase Flow hooks
  const { user } = useAuth();
  const { isProcessing, executePurchase, reset: resetPurchase } = usePurchaseFlow();

  // Data loading state
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [dataError, setDataError] = useState(null);
  const [regions, setRegions] = useState([]);
  const [businessCategories, setBusinessCategories] = useState([]);
  const [durations, setDurations] = useState([]);
  const [subscriptionCycles, setSubscriptionCycles] = useState([]);
  const [resourcePool, setResourcePool] = useState({});
  const [skus, setSkus] = useState({ traffic: [], bandwidth: [] });
  const [availableProtocols, setAvailableProtocols] = useState([]); // 可用协议列表（从SKU获取）
  const [productConfig, setProductConfig] = useState({ stockThreshold: 50 });
  const [savedPaymentMethods, setSavedPaymentMethods] = useState([]);
  const [currentBalance, setCurrentBalance] = useState(null);
  const [userBalance, setUserBalance] = useState(0);
  const [useBalance, setUseBalance] = useState(false);

  // Form State
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [viewCategory, setViewCategory] = useState(null);
  const [selectedScenarios, setSelectedScenarios] = useState([]);

  const scenarioIcons = {
    amazon: amazonImg,
    ebay: ebayImg,
    shopify: shopifyImg,
    tiktok_shop: tiktokImg,
  };
  const [selectedTerminal, setSelectedTerminal] = useState(null);
  const [protocol, setProtocol] = useState([]); // 支持多选协议，默认无选中
  const [quantity, setQuantity] = useState(1);
  const [selectedDuration, setSelectedDuration] = useState(null);
  const [customDurationDays, setCustomDurationDays] = useState(7);
  const [purchaseType, setPurchaseType] = useState('one_time');
  const [selectedCycle, setSelectedCycle] = useState(null);
  // 移除未使用的 autoRenew 状态，现在使用 isSubscribed 控制 auto_renew

  const [recommendation, setRecommendation] = useState(null);
  const [bandwidthMode, setBandwidthMode] = useState('traffic');
  const [userOverrideMode, setUserOverrideMode] = useState(false);

  const [selectedSku, setSelectedSku] = useState(null);
  const [showRestockModal, setShowRestockModal] = useState(false);

  // 用于跟踪场景是否真正变化，避免协议变化时误清空 SKU
  const prevScenariosRef = useRef(null);
  
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
  const [selectedSavedCardId, setSelectedSavedCardId] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [agreedTerms, setAgreedTerms] = useState(true);
  const [usdtNetwork, setUsdtNetwork] = useState('TRC20');
  const [usdtCopySuccess, setUsdtCopySuccess] = useState(false);

  // Coupon / 折扣码
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(null);   // { code, discountPercent, label }
  const [couponError, setCouponError] = useState('');
  const [isValidatingCoupon, setIsValidatingCoupon] = useState(false);

  // 邀请码折扣信息
  const [discountInfo, setDiscountInfo] = useState(null);     // { originalAmount, finalAmount, totalDiscount, discounts, appliedDiscounts }
  const [isLoadingDiscount, setIsLoadingDiscount] = useState(false);

  // 支付方式图标映射（从 iconType 到 React 组件）
  const getPaymentMethodIcon = (iconType) => {
    switch (iconType) {
      case 'wallet':
        return <Wallet className="w-5 h-5 text-[#10B981]" />;
      case 'card':
        return <WalletCardIcon size="icon" />;
      case 'wechat':
        return <WeChatIcon size="icon" />;
      case 'alipay':
        return <AlipayIcon size="icon" />;
      case 'usdt':
        return <UsdtIcon size="icon" />;
      default:
        return <Wallet className="w-5 h-5" />;
    }
  };

  // 获取带图标的支付方式列表
  const PAYMENT_METHODS = paymentService.getPaymentMethods().map(method => ({
    ...method,
    icon: getPaymentMethodIcon(method.iconType)
  }));

  // Stock check - 使用 productService 封装的方法
  const getStockStatus = (region) => {
    if (!region) return null;
    const pool = resourcePool[region.id];
    if (!pool) return { label: region.stock || '未知', color: 'text-gray-400', bg: 'bg-gray-50' };
    return productService.getStockStatus(pool.available, productConfig.stockThreshold || 50);
  };

  // Scenario stock status - 场景库存状态
  const getScenarioStockStatus = (stock) => {
    if (stock <= 0) {
      return {
        label: '缺货',
        isOutOfStock: true,
        isLowStock: false
      };
    }
    if (stock < 50) {
      return {
        label: `仅剩 ${stock}`,
        isOutOfStock: false,
        isLowStock: true
      };
    }
    return {
      label: '充足',
      isOutOfStock: false,
      isLowStock: false
    };
  };

  const stockStatus = getStockStatus(selectedRegion);
  const isOutOfStock = stockStatus?.isOutOfStock || false;

  // Load product data on mount
  useEffect(() => {
    const loadProductData = async () => {
      setIsLoadingData(true);
      setDataError(null);

      try {
        // 第一步：加载地区列表和时长选项
        const [regionsResult, durationsResult] = await Promise.all([
          productService.getRegions(),
          productService.getDurations()
        ]);

        if (!regionsResult.success) {
          throw new Error(regionsResult.message || 'Failed to load regions');
        }

        if (!durationsResult.success) {
          throw new Error(durationsResult.message || 'Failed to load durations');
        }

        // 设置地区数据
        setRegions(regionsResult.data);
        setResourcePool({}); // 资源池数据稍后加载

        // 设置时长选项
        setDurations(durationsResult.data);
        if (!selectedDuration && durationsResult.data.length > 0) {
          setSelectedDuration(durationsResult.data[0]);
        }

        // 如果有保存的国家选择，恢复并加载场景
        const savedState = sessionStorage.getItem('purchase_form_state');
        if (savedState) {
          try {
            const formState = JSON.parse(savedState);
            // 检查是否过期（30分钟）
            const EXPIRY_TIME = 30 * 60 * 1000;
            if (Date.now() - formState.timestamp <= EXPIRY_TIME && formState.selectedRegion) {
              const savedRegion = regionsResult.data.find(r => r.code === formState.selectedRegion);
              if (savedRegion) {
                setSelectedRegion(savedRegion);
                // 加载该国家的场景列表
                await loadScenariosByCountry(savedRegion.code);
              }
            }
          } catch (e) {
            console.error('Failed to restore saved state:', e);
          }
        }

      } catch (error) {
        console.error('Error loading product data:', error);
        setDataError(error.message);
      } finally {
        setIsLoadingData(false);
      }
    };

    loadProductData();
  }, []);

  // 当 SKU 更新时，自动切换到有 SKU 的计费模式
  useEffect(() => {
    const hasTrafficSkus = skus.traffic && skus.traffic.length > 0;
    const hasBandwidthSkus = skus.bandwidth && skus.bandwidth.length > 0;

    // 如果当前选中的模式没有 SKU，自动切换
    if (bandwidthMode === 'traffic' && !hasTrafficSkus && hasBandwidthSkus) {
      setBandwidthMode('bandwidth');
      setSelectedSku(null);
    } else if (bandwidthMode === 'bandwidth' && !hasBandwidthSkus && hasTrafficSkus) {
      setBandwidthMode('traffic');
      setSelectedSku(null);
    }
  }, [skus]);

  // 计算当前应该使用的计费模式（用于渲染）
  const getEffectiveBandwidthMode = () => {
    const hasTrafficSkus = skus.traffic && skus.traffic.length > 0;
    const hasBandwidthSkus = skus.bandwidth && skus.bandwidth.length > 0;

    // 如果当前模式有 SKU，使用当前模式
    if (bandwidthMode === 'traffic' && hasTrafficSkus) return 'traffic';
    if (bandwidthMode === 'bandwidth' && hasBandwidthSkus) return 'bandwidth';
    // 否则使用第一个有 SKU 的模式
    if (hasTrafficSkus) return 'traffic';
    if (hasBandwidthSkus) return 'bandwidth';
    return bandwidthMode; // fallback
  };

  // 加载指定国家的场景列表
  const loadScenariosByCountry = async (countryCode) => {
    if (!countryCode) {
      setBusinessCategories([]);
      setViewCategory(null);
      return;
    }

    try {
      const result = await productService.getScenariosByCountry(countryCode);
      if (result.success) {
        const scenarios = result.data;
        setBusinessCategories(scenarios);

        // 自动选择第一个有库存场景的业务类别
        if (scenarios.length > 0) {
          const firstCategoryWithStock = scenarios.find(cat =>
            cat.scenarios.some(sc => sc.enabled === true)
          );
          if (firstCategoryWithStock) {
            setViewCategory(firstCategoryWithStock);
          } else {
            setViewCategory(scenarios[0]);
          }
        } else {
          setViewCategory(null);
        }
      } else {
        console.error('Failed to load scenarios by country:', result.message);
        setBusinessCategories([]);
        setViewCategory(null);
      }
    } catch (error) {
      console.error('Error loading scenarios by country:', error);
      setBusinessCategories([]);
      setViewCategory(null);
    }
  };

  // 当业务类别加载完成或当前类别无库存时，自动切换到第一个有库存的类别
  useEffect(() => {
    if (businessCategories.length === 0) return;

    const hasEnabledScenarios = (category) =>
      category.scenarios && category.scenarios.some(sc => sc.enabled === true);

    // 如果当前选中的类别没有有库存的场景，切换到第一个有库存的类别
    if (viewCategory && !hasEnabledScenarios(viewCategory)) {
      const firstCategoryWithStock = businessCategories.find(cat =>
        hasEnabledScenarios(cat)
      );
      if (firstCategoryWithStock) {
        console.log('[Purchase] Switching to first category with stock:', firstCategoryWithStock.name);
        setViewCategory(firstCategoryWithStock);
      }
    }
  }, [businessCategories, viewCategory]);

  // 当国家改变时，重新加载该国家的场景列表
  useEffect(() => {
    if (selectedRegion) {
      loadScenariosByCountry(selectedRegion.code);
      // 清空已选择的场景
      setSelectedScenarios([]);
      setSelectedSku(null);
    }
  }, [selectedRegion]);

  // 保存表单状态到 sessionStorage
  const saveFormState = () => {
    const formState = {
      selectedRegion: selectedRegion?.code,
      selectedScenarios: selectedScenarios.map(s => s.id),
      selectedTerminal: selectedTerminal?.id,
      protocol: protocol,
      quantity: quantity,
      selectedDuration: selectedDuration?.id,
      customDurationDays: customDurationDays,
      purchaseType: purchaseType,
      selectedCycle: selectedCycle?.id,
      bandwidthMode: bandwidthMode,
      selectedSku: selectedSku?.id,
      paymentMethod: paymentMethod,
      timestamp: Date.now()
    };
    sessionStorage.setItem('purchase_form_state', JSON.stringify(formState));
    console.log('[Purchase] Form state saved:', formState);
  };

  // 从 sessionStorage 恢复表单状态
  const restoreFormState = (regions, scenarios, durations) => {
    const savedState = sessionStorage.getItem('purchase_form_state');
    if (!savedState) {
      console.log('[Purchase] No saved form state found');
      return;
    }

    try {
      const formState = JSON.parse(savedState);
      console.log('[Purchase] Restoring form state:', formState);

      // 检查是否过期（30分钟）
      const EXPIRY_TIME = 30 * 60 * 1000;
      if (Date.now() - formState.timestamp > EXPIRY_TIME) {
        console.log('[Purchase] Saved form state expired, clearing...');
        sessionStorage.removeItem('purchase_form_state');
        return;
      }

      // 恢复地区
      if (formState.selectedRegion) {
        const region = regions.find(r => r.code === formState.selectedRegion);
        if (region) setSelectedRegion(region);
      }

      // 恢复场景
      if (formState.selectedScenarios && formState.selectedScenarios.length > 0) {
        const scenarioList = scenarios.filter(s => formState.selectedScenarios.includes(s.id));
        if (scenarioList.length > 0) setSelectedScenarios(scenarioList);
      }

      // 恢复终端
      if (formState.selectedTerminal) {
        const terminals = [
          { id: 'fingerprint', name: '指纹浏览器' },
          { id: 'mobile', name: '移动设备' },
          { id: 'server', name: '服务器' },
          { id: 'router', name: '路由器' },
          { id: 'api', name: 'API接入' }
        ];
        const terminal = terminals.find(t => t.id === formState.selectedTerminal);
        if (terminal) setSelectedTerminal(terminal);
      }

      // 恢复协议
      if (formState.protocol && formState.protocol.length > 0) {
        setProtocol(formState.protocol);
      }

      // 恢复数量
      if (formState.quantity) {
        setQuantity(formState.quantity);
      }

      // 恢复时长
      if (formState.selectedDuration) {
        const duration = durations.find(d => d.id === formState.selectedDuration);
        if (duration) setSelectedDuration(duration);
      }

      // 恢复自定义天数
      if (formState.customDurationDays) {
        setCustomDurationDays(formState.customDurationDays);
      }

      // 恢复购买类型
      if (formState.purchaseType) {
        setPurchaseType(formState.purchaseType);
      }

      // 恢复带宽模式
      if (formState.bandwidthMode) {
        setBandwidthMode(formState.bandwidthMode);
      }

      // 恢复支付方式
      if (formState.paymentMethod) {
        setPaymentMethod(formState.paymentMethod);
      }

      // 注意：selectedCycle 和 selectedSku 需要在后续加载后恢复
      // 这些将在对应的 useEffect 中处理
      setTimeout(() => {
        if (formState.selectedCycle) {
          setSelectedCycle(formState.selectedCycle);
        }
        if (formState.selectedSku) {
          setSelectedSku(formState.selectedSku);
        }
      }, 100);

    } catch (error) {
      console.error('[Purchase] Error restoring form state:', error);
      sessionStorage.removeItem('purchase_form_state');
    }
  };

  // 清除表单状态
  const clearFormState = () => {
    sessionStorage.removeItem('purchase_form_state');
    console.log('[Purchase] Form state cleared');
  };

  // Load SKUs when region and scenario change
  useEffect(() => {
    const loadSKUs = async () => {
      if (!selectedRegion || selectedScenarios.length === 0) return;

      const scenario = selectedScenarios[0]?.id;
      if (!scenario) return;

      try {
        // 使用 productService 的 loadSKUData 方法
        const result = await productService.loadSKUData(selectedRegion.code, scenario);

        if (result.success) {
          const { skus, protocols } = result.data;

          // 设置SKU数据
          setSkus(skus);

          // 设置可用协议
          setAvailableProtocols(protocols);

          // 如果当前选中的协议不在新列表中，清空选择
          if (protocols.length > 0) {
            // 过滤掉无效的协议，只保留有效的
            const validProtocols = protocol.filter(p => protocols.includes(p));
            if (validProtocols.length !== protocol.length) {
              setProtocol(validProtocols);
            }
          }
        }
      } catch (error) {
        console.error('Error loading SKUs:', error);
      }
    };

    loadSKUs();
  }, [selectedRegion, selectedScenarios]);

  // Effects
  useEffect(() => {
    const lastScenario = selectedScenarios[selectedScenarios.length - 1];

    // 检查场景是否真正变化（通过比较场景ID）
    const scenariosChanged = prevScenariosRef.current !== JSON.stringify(selectedScenarios.map(s => s.id));

    // 只在场景真正变化时才更新 bandwidthMode 和清空 SKU
    if (scenariosChanged && lastScenario?.recommend?.bandwidthMode) {
      if (!userOverrideMode) {
        setBandwidthMode(lastScenario.recommend.bandwidthMode);
        setSelectedSku(null);
      }
      // 更新 ref
      prevScenariosRef.current = JSON.stringify(selectedScenarios.map(s => s.id));
    }

    if (lastScenario || selectedTerminal) {
      // 使用 productService 获取推荐协议
      const recProto = productService.getRecommendedProtocolForTerminal(selectedTerminal, availableProtocols);

      if (selectedTerminal && availableProtocols.length > 0) {
        // 如果没有选中任何协议，自动选择推荐的兼容协议
        if (protocol.length === 0) {
          if (recProto) {
            setProtocol([recProto]);
          }
        } else {
          // 检查当前选中的协议是否与终端兼容（至少有一个兼容即可）
          const isCompatible = protocol.some(p => productService.isProtocolCompatibleWithTerminal(p, selectedTerminal));

          if (!isCompatible) {
            // 自动切换到推荐的兼容协议（选择第一个兼容的协议）
            const compatibleProtocol = availableProtocols.find(p => productService.isProtocolCompatibleWithTerminal(p, selectedTerminal));
            if (compatibleProtocol) {
              setProtocol([compatibleProtocol]);
            }
          }
        }
      }

      setRecommendation({
        protocol: recProto || productService.getRecommendedProtocol(availableProtocols) || (protocol.length > 0 ? protocol[0] : null),
        desc: lastScenario?.recommend?.desc || '请完善业务信息以获取推荐配置',
        modeLabel: lastScenario?.recommend?.bandwidthMode === 'traffic' ? '流量计费' : (lastScenario?.recommend?.bandwidthMode === 'bandwidth' ? '独享带宽' : '待定')
      });
    }
  }, [selectedScenarios, selectedTerminal, userOverrideMode, protocol, availableProtocols]);

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
    // 使用新的价格计算方法：包含协议加价
    const unitPrice = productService.calculateUnitPrice(selectedSku, protocol);
    return unitPrice * quantity * durationFactor * durationDiscount;
  };

  const totalUSDValue = calculateTotal();
  const totalCNYValue = totalUSDValue * 7.2;

  // 获取折扣信息（当选择变化时自动查询）
  useEffect(() => {
    const fetchDiscount = async () => {
      if (!selectedRegion || selectedScenarios.length === 0 || totalUSDValue <= 0) {
        setDiscountInfo(null);
        return;
      }

      setIsLoadingDiscount(true);
      try {
        const durationDays = purchaseType === 'subscription'
          ? selectedCycle?.days
          : (selectedDuration?.days ?? customDurationDays);

        const result = await orderService.getDiscount({
          orderType: 'static',
          country: selectedRegion.id,
          scenario: selectedScenarios[0]?.id || 'ecommerce',
          amount: totalUSDValue,
          quantity: quantity,
          duration: durationDays || 30,
          couponCode: couponApplied?.code || '',
        });

        if (result.success) {
          setDiscountInfo(result.data);
        } else {
          setDiscountInfo(null);
        }
      } catch (error) {
        console.error('Failed to fetch discount:', error);
        setDiscountInfo(null);
      } finally {
        setIsLoadingDiscount(false);
      }
    };

    // 防抖处理，避免频繁请求
    const timeoutId = setTimeout(() => {
      fetchDiscount();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [selectedRegion, selectedScenarios, quantity, selectedDuration, selectedCycle, purchaseType, customDurationDays, totalUSDValue, couponApplied]);

  // 购买处理函数
  const handlePurchase = async () => {
    if (!selectedRegion || !selectedSku) {
      alert('请先选择地区和规格');
      return;
    }

    // 保存表单状态到 sessionStorage（用于支付取消后恢复）
    saveFormState();

    // 准备订单数据
    const durationDays = purchaseType === 'subscription'
      ? selectedCycle?.days
      : (selectedDuration?.days ?? customDurationDays);

    // 确定实际支付方式
    // 将前端支付方式ID转换为后端需要的格式
    // stripe → stripe:card, wechat → stripe:wechat, alipay → stripe:alipay
    const getStripePaymentMethod = (method) => {
      switch (method) {
        case 'stripe':
          return 'stripe:card';
        case 'wechat':
          return 'stripe:wechat';
        case 'alipay':
          return 'stripe:alipay';
        default:
          return method;
      }
    };

    const actualPaymentMethod = useBalance
      ? `balance:${paymentMethod}`
      : getStripePaymentMethod(paymentMethod);

    const orderData = {
      country: selectedRegion.id,
      scenario: selectedScenarios[0]?.id || 'ecommerce',
      template_id: selectedSku?.id,  // SKU的ID就是模板ID
      delivery_protocols: protocol,  // 交付协议列表（支持多选）
      ip_level: selectedSku.level || 'standard',
      use_terminal: selectedTerminal?.id || 'mobile',
      ip_feature: selectedSku.type || 'static',
      udp_enabled: selectedSku.udp || false,
      traffic_mode: bandwidthMode,
      // 根据计费模式选择正确的套餐值
      traffic_package: bandwidthMode === 'bandwidth'
        ? (selectedSku.bandwidth || 'unlimited')
        : (selectedSku.traffic || 'unlimited'),
      purchase_duration: durationDays,
      quantity: quantity,
      payment_method: actualPaymentMethod,
      auto_renew: isSubscribed,  // 修复: 使用UI复选框控制的值，而不是独立的autoRenew状态
      amount: totalUSDValue,
    };

    console.log('Order data:', orderData);
    console.log('Payment method:', paymentMethod, '→ Actual payment method:', actualPaymentMethod);

    // 执行购买流程
    const result = await executePurchase(
      orderData,
      actualPaymentMethod,
      // onSuccess callback
      (data) => {
        console.log('[Purchase] onSuccess callback triggered with data:', data);
        console.log('[Purchase] actualPaymentMethod:', actualPaymentMethod);

        // 支付成功后清除表单状态
        clearFormState();

        // 余额支付成功后，跳转到订单详情页面
        // 检查是否是余额支付（balance:* 格式）
        const isBalancePayment = actualPaymentMethod === 'balance' || actualPaymentMethod.startsWith('balance:');
        console.log('[Purchase] isBalancePayment:', isBalancePayment);

        if (isBalancePayment) {
          // 余额支付成功后跳转到订单详情
          console.log('[Purchase] Balance payment successful, redirecting to order detail:', data.orderId);
          // 清除 sessionStorage 中的 pending_order_id（避免混淆）
          sessionStorage.removeItem('pending_order_id');
          sessionStorage.removeItem('pending_order_no');

          // 跳转到订单详情页面
          const redirectUrl = `/dashboard?tab=orders&orderId=${data.orderId}`;
          console.log('[Purchase] Redirecting to:', redirectUrl);

          // 使用 setTimeout 确保在下一个事件循环中执行跳转
          setTimeout(() => {
            window.location.href = redirectUrl;
          }, 100);
        } else {
          // Stripe 支付会在 usePurchaseFlow 中处理跳转，这里只显示提示
          console.log('[Purchase] Non-balance payment, showing alert');
          alert(`购买成功！订单号: ${data.orderNo}\n支付金额: ¥${data.actualPay || data.amount}`);
          setIsProcessingPayment(false);
        }
      },
      // onError callback
      (error) => {
        console.error('Purchase failed:', error);
        alert(`购买失败: ${error}`);
        setIsProcessingPayment(false);
      }
    );

    if (result.success) {
      setIsProcessingPayment(false);
    }
  };

  // Balance & Coupon Deduction Logic
  let balanceDeduction = 0;
  let finalPayAmount = totalUSDValue;

  // 获取服务器计算的折扣（包含邀请码、时长折扣等）
  const serverTotalDiscount = discountInfo?.totalDiscount || 0;

  // Coupon / Credit Discount Logic (前端优惠券)
  const couponDiscountUSD = couponApplied
    ? (couponApplied.fixedDiscount
        ? Math.min(couponApplied.fixedDiscount, totalUSDValue)
        : totalUSDValue * (couponApplied.discountPercent / 100))
    : 0;

  // 总折扣 = 服务器折扣（邀请码+时长）+ 前端优惠券
  const totalDiscountUSD = serverTotalDiscount + couponDiscountUSD;
  const afterDiscountUSD = totalUSDValue - totalDiscountUSD;
  const afterDiscountCNY = afterDiscountUSD * 7.2;

  // Recalculate balance deduction based on after-discount amount
  if (useBalance) {
    if (userBalance >= afterDiscountUSD) {
      balanceDeduction = afterDiscountUSD;
      finalPayAmount = 0;
    } else {
      balanceDeduction = userBalance;
      finalPayAmount = afterDiscountUSD - userBalance;
    }
  } else {
    finalPayAmount = afterDiscountUSD;
  }

  const totalCNY = totalCNYValue.toFixed(2);
  const totalUSD = totalUSDValue.toFixed(2);
  const serverDiscountCNY = (serverTotalDiscount * 7.2).toFixed(2);
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

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;
    setCouponError('');
    setIsValidatingCoupon(true);

    try {
      const code = couponCode.trim().toUpperCase();
      const result = await couponService.validateCoupon(code, totalUSDValue);

      if (result.success && result.data) {
        const couponData = result.data;
        const appliedCoupon = couponService.formatCouponForDisplay(couponData);

        // 检查优惠券是否可用
        if (!couponData.valid || !couponData.canUse) {
          setCouponError(couponData.reason || '优惠券不可用');
          setCouponApplied(null);
        }
        // 检查最低消费门槛
        else if (appliedCoupon.minSpend > 0 && totalUSDValue < appliedCoupon.minSpend) {
          setCouponError(`此代码要求最低消费 $${appliedCoupon.minSpend}，当前订单金额不足。`);
          setCouponApplied(null);
        } else {
          setCouponApplied(appliedCoupon);
          setCouponError('');
        }
      } else {
        setCouponError(result.error || '无效的促销代码。请检查后重试。');
        setCouponApplied(null);
      }
    } catch (error) {
      console.error('验证优惠券失败:', error);
      setCouponError('验证优惠券失败，请稍后重试');
      setCouponApplied(null);
    } finally {
      setIsValidatingCoupon(false);
    }
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
              <div className="text-xs text-gray-500">可用余额: <span className="font-medium text-gray-900">${(currentBalance !== null ? currentBalance : (user?.balance || 0)).toFixed(2)}</span></div>
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
          onClick={handlePurchase}
          disabled={!agreedTerms || isProcessing}
          style={{ backgroundColor: agreedTerms ? brandColor : undefined }}
          className={`w-full py-3.5 text-white rounded-xl font-semibold text-[15px] transition-all shadow-md shadow-blue-100 active:scale-[0.98] flex items-center justify-center gap-2 ${!agreedTerms || isProcessing ? 'bg-gray-300 cursor-not-allowed' : 'hover:opacity-90'}`}
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>处理中...</span>
            </>
          ) : (
            <span>立即支付</span>
          )}
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

  // Show loading state
  if (isLoadingData) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">加载产品数据中...</p>
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

  return (
    <div className="animate-in fade-in duration-500 pb-12">

      {/* ═══════════════ Main Grid ═══════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* ─────────── LEFT: Configuration ─────────── */}
        <div className="lg:col-span-8 space-y-5">
          
          {/* Main Config Card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden p-6 space-y-8">
            
            {/* Region Selection */}
            <div>
              <SectionLabel title="需求配置" required />
              <CustomSelect 
                value={selectedRegion}
                options={regions}
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
                        <span className={`text-[11px] font-medium ${
                          status.isOutOfStock ? 'text-red-500' :
                          status.isLowStock ? 'text-amber-600' :
                          'text-emerald-600'
                        }`}>
                          {status.label}
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
              <div className="flex rounded-2xl border border-gray-100 overflow-hidden bg-white min-h-[180px] max-h-[330px]">
                {/* Left Sidebar */}
                <div className="w-28 shrink-0 bg-[#F8F9FB] flex flex-col">
                  {businessCategories && businessCategories.length > 0 && businessCategories
                    .map(cat => {
                      const isActive = viewCategory && viewCategory.id === cat.id;
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
                <div className="flex-1 p-5 overflow-y-auto">
                  {viewCategory && viewCategory.scenarios && viewCategory.scenarios.length > 0 ? (
                    <div className="grid grid-cols-3 gap-3">
                      {viewCategory.scenarios
                        .map(sc => {
                         const isActive = selectedScenarios.length > 0 && selectedScenarios[0].id === sc.id;
                         const stockStatus = getScenarioStockStatus(sc.stock || 0);
                         const isOutOfStock = stockStatus.isOutOfStock;

                         return (
                          <button
                            key={sc.id}
                            onClick={() => {
                              // 售罄的场景不可点击
                              if (isOutOfStock) return;

                              // 单选模式：直接替换为当前选中的场景
                              const newSelection = [{ ...sc, categoryId: viewCategory.id, categoryName: viewCategory.name }];
                              setSelectedScenarios(newSelection);
                              setUserOverrideMode(false);
                              setSelectedSku(null);
                            }}
                            className={`relative flex items-center justify-between px-3 py-2.5 rounded-xl border transition-all duration-200 ease-in-out group bg-white active:scale-[0.98] ${
                              isActive
                                ? 'border-[#1A73E8] shadow-sm ring-1 ring-[#1A73E8] ring-opacity-50'
                                : isOutOfStock
                                  ? 'border-gray-100 bg-gray-50 cursor-not-allowed opacity-60'
                                  : 'border-gray-200 hover:border-gray-300 hover:shadow-sm cursor-pointer'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-md bg-white flex items-center justify-center overflow-hidden shrink-0 transition-transform duration-200 group-hover:scale-110">
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
                              <span className="text-[12px] font-bold text-gray-900" title={sc.name}>{sc.name}</span>
                            </div>
                            <span className={`text-[11px] font-medium whitespace-nowrap ${
                              isOutOfStock ? 'text-red-500 bg-red-50 px-2 py-0.5 rounded' :
                              stockStatus.isLowStock ? 'text-amber-600 bg-amber-50 px-2 py-0.5 rounded' :
                              'text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded'
                            }`}>
                              {isOutOfStock ? '售罄' : stockStatus.label}
                            </span>
                            {isActive && (
                              <div className="absolute top-0 right-0 w-0 h-0 border-t-[12px] border-r-[12px] border-t-[#1A73E8] border-r-[#1A73E8] rounded-bl-lg rounded-tr-lg">
                                {/* Optional: Checkmark icon could go here if space permits, but simple triangle is cleaner */}
                              </div>
                            )}
                          </button>
                         )
                      })}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                      {viewCategory ? '该类别暂无可用场景' : '请先选择国家/地区'}
                    </div>
                  )}
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
                {productService.getTerminals().map(term => {
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
              {selectedTerminal && (
                <div className="mb-2 text-xs text-gray-500">
                  {selectedTerminal.name} 支持的协议
                </div>
              )}
              <div className="flex flex-wrap gap-3">
                {availableProtocols.length > 0 ? availableProtocols.map(p => {
                  const isSelected = protocol.includes(p);
                  // 使用 productService 检查兼容性
                  const isDisabled = productService.shouldDisableProtocol(p, selectedTerminal, availableProtocols);
                  const disableReason = productService.getProtocolDisableReason(p, selectedTerminal, availableProtocols);

                  // 使用 productService 格式化协议名称
                  const displayProtocol = productService.formatProtocolName(p);

                  return (
                    <button
                      key={`protocol-${p}`}
                      onClick={() => {
                        if (!isDisabled) {
                          // 切换协议选择状态
                          if (isSelected) {
                            // 至少保留一个协议
                            if (protocol.length > 1) {
                              setProtocol(protocol.filter(proto => proto !== p));
                            }
                          } else {
                            setProtocol([...protocol, p]);
                          }
                        }
                      }}
                      disabled={isDisabled}
                      className={`min-w-[80px] px-4 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200 ${
                        isDisabled
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
                          : isSelected
                            ? 'bg-[#1A73E8] text-white shadow-md shadow-blue-200 cursor-pointer border border-transparent'
                            : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 cursor-pointer'
                      }`}
                      title={isDisabled ? disableReason : undefined}
                    >
                      {displayProtocol}
                      {isSelected && (
                        <span className="ml-1 text-xs">✓</span>
                      )}
                    </button>
                  );
                }) : (
                  <span className="text-gray-400 text-sm">请先选择国家/地区和业务场景</span>
                )}
              </div>
            </div>

            {/* Duration */}
            <div>
              <SectionLabel title="IP购买时长" required />
              <div className="grid grid-cols-5 gap-3">
                {durations.map(d => {
                  const isSelected = selectedDuration?.days === d.days;
                  return (
                    <button key={d.days}
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
            {(() => {
              const hasTrafficSkus = skus.traffic && skus.traffic.length > 0;
              const hasBandwidthSkus = skus.bandwidth && skus.bandwidth.length > 0;

              // 如果两者都没有 SKU，不显示整个部分
              if (!hasTrafficSkus && !hasBandwidthSkus) {
                return null;
              }

              // 使用函数获取当前应该使用的计费模式
              const effectiveMode = getEffectiveBandwidthMode();
              const currentModeLabel = effectiveMode === 'traffic' ? '按流量' : '按带宽';

              return (
                <div>
                  <SectionLabel
                    title="规格套餐"
                    required
                    extra={
                      // 只有当两种 SKU 都存在时，才显示切换按钮
                      hasTrafficSkus && hasBandwidthSkus ? (
                        <div className="flex bg-gray-100 p-0.5 rounded-lg">
                          <button
                            onClick={() => { setUserOverrideMode(true); setBandwidthMode('traffic'); setSelectedSku(null); }}
                            className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-all duration-150 ${effectiveMode === 'traffic' ? 'bg-white text-[#1A73E8] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                          >
                            按流量
                          </button>
                          <button
                            onClick={() => { setUserOverrideMode(true); setBandwidthMode('bandwidth'); setSelectedSku(null); }}
                            className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-all duration-150 ${effectiveMode === 'bandwidth' ? 'bg-white text-[#1A73E8] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                          >
                            按带宽
                          </button>
                        </div>
                      ) : (
                        // 只有一种 SKU 时，显示标签但不显示切换按钮
                        <span className="text-xs text-gray-500 font-medium">{currentModeLabel}</span>
                      )
                    }
                  />
              {selectedScenarios.length > 0 && selectedScenarios[selectedScenarios.length - 1]?.recommend?.bandwidthMode && userOverrideMode && (
                <div className="text-[11px] text-gray-400 -mt-1 mb-2">
                  系统推荐 <span className="font-semibold text-gray-600">{selectedScenarios[selectedScenarios.length - 1].recommend.bandwidthMode === 'traffic' ? '按流量' : '按带宽'}</span>
                  <span className="text-[#1A73E8] ml-1">· 已手动选择</span>
                </div>
              )}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
                {(skus[effectiveMode] || []).map((sku, idx) => {
                  const isActive = selectedSku?.id === sku.id && selectedSku?.traffic === sku.traffic && selectedSku?.bandwidth === sku.bandwidth;
                  const isPopular = idx === 2; // 3rd item as popular
                  // 使用 productService 获取规格显示和价格
                  const specDisplay = productService.formatSKUSpec(sku);
                  const skuPrice = productService.getSkuPrice(sku);
                  const priceDisplay = skuPrice > 0 ? `$${skuPrice}/月` : '价格待定';
                  return (
                      <button key={`${sku.id}-${sku.traffic || sku.bandwidth}`}
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
                      <div className={`text-base font-bold ${isActive ? 'text-[#1A73E8]' : 'text-gray-800'}`}>{specDisplay}</div>
                      <div className={`text-[11px] ${isActive ? 'text-[#1A73E8]' : 'text-gray-400'}`}>
                        {effectiveMode === 'traffic' ? '按流量' : '按带宽'}
                      </div>
                      <div className={`text-[12px] font-semibold ${isActive ? 'text-[#1A73E8]' : 'text-gray-500'}`}>
                        {priceDisplay}
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
              );
            })()}

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

          </div>
        </div>


        {/* ─────────── RIGHT: Order Summary + Payment ─────────── */}
        <div className="lg:col-span-4">
          <div className="sticky top-6 space-y-4">
            
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
                <OrderRow label="交付协议" value={protocol && protocol.length > 0 ? protocol.map(p => productService.formatProtocolName(p)).join(', ') : '未选择'} muted={protocol.length === 0} />
                
                <div className="border-t border-dashed border-gray-100 my-2"></div>
                
                <OrderRow label="规格套餐" value={selectedSku ? productService.formatSKUSpec(selectedSku) : null} muted={!selectedSku} />
                <OrderRow label="计费模式" value={getEffectiveBandwidthMode() === 'traffic' ? '按流量' : '按带宽'} />
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

                    {/* Server-side discounts (Invite code, duration, etc.) */}
                    {discountInfo?.discounts && discountInfo.discounts.length > 0 && discountInfo.discounts.map((discount, index) => (
                      <div key={`discount-${index}`} className="flex justify-between items-start px-4 py-2.5 text-[13px] bg-green-50/30">
                        <div className="text-emerald-700 flex flex-col gap-0.5">
                          <div className="flex items-center gap-1.5">
                            {discount.name}
                          </div>
                          {discount.description && (
                            <div className="text-[11px] text-emerald-600/70 pl-0">
                              {discount.description}
                            </div>
                          )}
                        </div>
                        <span className="font-medium text-emerald-700 tabular-nums mt-0.5">
                          − ¥{(discount.discountAmount * 7.2).toFixed(2)}
                        </span>
                      </div>
                    ))}

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
                        {(useBalance || couponApplied || discountInfo?.totalDiscount > 0) ? '应付金额' : '合计'}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`font-bold tracking-tight tabular-nums ${(useBalance || couponApplied || discountInfo?.totalDiscount > 0) ? 'text-xl text-[#1A73E8]' : 'text-xl text-gray-900'}`}>
                        <span className="text-sm mr-0.5 opacity-60">¥</span>
                        {(useBalance || couponApplied || discountInfo?.totalDiscount > 0) ? finalPayAmountCNY : totalCNY}
                      </div>
                      {(useBalance || couponApplied || discountInfo?.totalDiscount > 0) && (
                        <div className="text-[11px] text-gray-400 mt-0.5 tabular-nums">
                          ≈ ${(useBalance || couponApplied || discountInfo?.totalDiscount > 0) ? (finalPayAmount).toFixed(2) : totalUSD} USD
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
                    const isDisabled = method.disabled;
                    return (
                      <button
                        key={method.id}
                        onClick={() => !isDisabled && setPaymentMethod(method.id)}
                        disabled={isDisabled}
                        className={`relative flex flex-col items-start justify-center gap-1.5 py-2.5 pl-3 rounded-xl border transition-all duration-200 ${
                          isDisabled
                            ? 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed opacity-60'
                            : isActive
                              ? 'border-[#1A73E8] bg-blue-50/50 text-blue-600 shadow-sm ring-1 ring-blue-500/20'
                              : 'border-gray-200 hover:border-gray-300 bg-white text-gray-600 hover:bg-gray-50/50'
                        }`}
                        title={method.disabledReason || ''}
                      >
                        <div className={`transition-transform duration-200 ${isActive && !isDisabled ? 'scale-105' : ''} scale-75 origin-left ${isDisabled ? 'grayscale opacity-50' : ''}`}>
                          {method.icon}
                        </div>
                        <span className="text-[13px] font-medium tracking-wide">
                          {method.name}
                        </span>
                        {isDisabled && (
                          <div className="absolute top-1.5 right-1.5">
                            <div className="w-3 h-3 bg-gray-400 rounded-full" title={method.disabledReason || '暂时不可用'} />
                          </div>
                        )}
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
                    {savedPaymentMethods.filter(m => m.type === 'card').length > 0 && (
                      <div className="space-y-3">
                        <label className="text-sm font-medium text-gray-900">选择银行卡</label>
                        <div className="space-y-2">
                          {savedPaymentMethods.filter(m => m.type === 'card').map(card => (
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
                    {(!useSavedCard || savedPaymentMethods.filter(m => m.type === 'card').length === 0) && (
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
                            <div className="grid grid-cols-2 gap-3">
                              <input type="text" placeholder="城市" value={billingAddress.city} onChange={(e) => setBillingAddress({...billingAddress, city: e.target.value})} className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:border-[#1A73E8]" />
                              <input type="text" placeholder="州/省" value={billingAddress.state} onChange={(e) => setBillingAddress({...billingAddress, state: e.target.value})} className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:border-[#1A73E8]" />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
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
    </div>
  );
};

export default StaticResidentialPurchase;

