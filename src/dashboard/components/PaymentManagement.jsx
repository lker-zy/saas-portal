import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  CreditCard, 
  Plus, 
  Trash2, 
  Star,
  X,
  ShieldCheck,
  Globe,
  Loader2,
  Lock,
  ArrowRight,
  Pencil
} from 'lucide-react';

// Payment Icons
const PayPalIcon = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.05078 20.4853L8.12745 13.6234H11.5165C14.7365 13.6234 16.9275 12.0463 17.6695 8.27129C17.9895 6.64329 17.5215 5.37829 16.3665 4.54229C15.3405 3.80029 13.7545 3.51429 11.5645 3.51429H5.58078C5.24978 3.51429 4.96678 3.74629 4.90978 4.07229L2.51878 19.3403C2.49378 19.5013 2.61778 19.6433 2.78078 19.6433H6.26278C6.67178 19.6433 7.02178 19.3363 7.08678 18.9303L7.05078 20.4853Z" fill="#253B80"/>
    <path d="M17.6047 8.2715C17.2287 10.1875 15.6557 11.5035 13.1417 11.5035H10.1507L9.57773 15.1555L9.19773 17.5755H9.19673C9.13173 17.9815 8.78173 18.2885 8.37273 18.2885H5.85773L7.05073 20.4855L7.33273 18.6875L8.40973 11.8255H11.7987C15.0187 11.8255 17.2097 10.2485 17.9517 6.4735C18.0677 5.8825 18.0937 5.3345 18.0417 4.8395C17.9897 6.6435 17.5217 5.3785 16.3667 4.5425C17.2027 5.4855 17.6597 6.7595 17.6047 8.2715Z" fill="#179BD7"/>
    <path d="M16.8906 4.83929C16.3666 4.54229 15.3406 3.80029 13.7546 3.51429H11.5646H5.58063C5.24963 3.51429 4.96663 3.74629 4.90963 4.07229L2.51863 19.3403C2.49363 19.5013 2.61763 19.6433 2.78063 19.6433H6.26263C6.67163 19.6433 7.02163 19.3363 7.08663 18.9303L7.33263 18.6873L8.40963 11.8253H11.7986C14.3126 11.8253 15.8856 10.5093 16.2616 8.59329C16.3166 7.08129 15.8596 5.80729 15.0236 4.86429C15.9326 5.25329 16.5926 5.09329 16.8906 4.83929Z" fill="#222D65"/>
    <path d="M8.37257 18.2885C8.78157 18.2885 9.13157 17.9815 9.19657 17.5755L9.57657 15.1555L10.1496 11.5035H13.1406C15.6546 11.5035 17.2276 10.1875 17.6036 8.2715C17.6586 6.7595 17.2016 5.4855 16.3656 4.5425C15.9356 5.2535 16.5956 5.0935 16.8936 4.8395C16.9456 5.3345 16.9196 5.8825 16.8036 6.4735C16.0616 10.2485 13.8706 11.8255 10.6506 11.8255H7.26157L6.18457 18.6875L5.85757 18.2885H8.37257Z" fill="#253B80"/>
  </svg>
);

// Mock PayPal Popup Window
const PayPalPopup = ({ onLogin, onCancel }) => {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: Login, 2: Loading, 3: Success

  const handleLogin = (e) => {
    e.preventDefault();
    setStep(2);
    // Simulate login delay
    setTimeout(() => {
        setStep(3);
        // Simulate authorization delay
        setTimeout(() => {
            onLogin();
        }, 1500);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in">
        <div className="bg-white w-[450px] h-[550px] shadow-2xl rounded-xl overflow-hidden flex flex-col relative animate-in zoom-in-95 duration-300">
            {/* PayPal Header */}
            <div className="bg-[#003087] p-4 flex justify-between items-center">
                <div className="w-24 brightness-0 invert">
                   <PayPalIcon />
                </div>
                <button onClick={onCancel} className="text-white/80 hover:text-white">
                    <X className="w-5 h-5" />
                </button>
            </div>

            <div className="flex-1 p-8 flex flex-col">
                {step === 1 && (
                    <>
                        <div className="text-center mb-8">
                            <h3 className="text-xl font-medium text-gray-700">Pay with PayPal</h3>
                            <p className="text-sm text-gray-500 mt-2">Enter your email and password to log in.</p>
                        </div>
                        <form onSubmit={handleLogin} className="space-y-4">
                            <input 
                                type="email" 
                                placeholder="Email or mobile number" 
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-[#0070ba] focus:ring-1 focus:ring-[#0070ba] outline-none transition-colors"
                                defaultValue="user@example.com"
                            />
                            <input 
                                type="password" 
                                placeholder="Password" 
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-[#0070ba] focus:ring-1 focus:ring-[#0070ba] outline-none transition-colors"
                            />
                            <div className="pt-4">
                                <button type="submit" className="w-full bg-[#003087] text-white font-bold py-3 rounded-full hover:bg-[#00256b] transition-colors shadow-lg shadow-blue-900/10">
                                    Log In
                                </button>
                            </div>
                        </form>
                        <div className="mt-6 text-center">
                            <a href="#" className="text-[#0070ba] text-sm font-medium hover:underline">Having trouble logging in?</a>
                            <div className="my-6 border-t border-gray-200 relative">
                                <span className="absolute left-1/2 -translate-x-1/2 -top-3 bg-white px-2 text-gray-400 text-sm">or</span>
                            </div>
                            <button className="w-full border border-[#003087] text-[#003087] font-bold py-3 rounded-full hover:bg-blue-50 transition-colors">
                                Sign Up
                            </button>
                        </div>
                    </>
                )}

                {step === 2 && (
                    <div className="flex-1 flex flex-col items-center justify-center text-center">
                        <Loader2 className="w-12 h-12 text-[#003087] animate-spin mb-4" />
                        <h4 className="text-lg font-medium text-gray-900">Logging you in securely...</h4>
                        <p className="text-sm text-gray-500 mt-2">Please do not close this window.</p>
                    </div>
                )}

                {step === 3 && (
                     <div className="flex-1 flex flex-col items-center justify-center text-center animate-in fade-in slide-in-from-bottom-4">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                            <ShieldCheck className="w-8 h-8 text-green-600" />
                        </div>
                        <h4 className="text-xl font-bold text-gray-900">Verified Successfully</h4>
                        <p className="text-sm text-gray-500 mt-2">Redirecting back to merchant...</p>
                    </div>
                )}
            </div>

            <div className="bg-gray-50 p-4 border-t border-gray-100 text-center text-xs text-gray-500 flex items-center justify-center gap-1">
                <Lock className="w-3 h-3" />
                SECURE CHECKOUT
            </div>
        </div>
    </div>
  );
};

const AddPaymentModal = ({ isOpen, onClose, onSave, initialData }) => {
  const { t } = useTranslation();
  const [method, setMethod] = useState('card'); // 'card' or 'paypal'
  const [showPayPalPopup, setShowPayPalPopup] = useState(false);
  const [paypalVerified, setPaypalVerified] = useState(false);
  
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiry: '',
    cvc: '',
    cardHolder: '',
    paypalEmail: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: ''
  });

  // Reset state on open or when initialData changes
  useEffect(() => {
    if (isOpen) {
        if (initialData) {
            setMethod(initialData.type);
            if (initialData.type === 'paypal') {
                setPaypalVerified(true);
                setFormData(prev => ({ ...prev, paypalEmail: initialData.email }));
            } else {
                setFormData(prev => ({
                    ...prev,
                    cardNumber: initialData.cardNumber || '', // Note: In a real app, you wouldn't have the full card number
                    expiry: initialData.expiry || '',
                    cvc: '', // CVC is usually not stored/pre-filled
                    cardHolder: initialData.cardHolder || '',
                    addressLine1: initialData.addressLine1 || '',
                    addressLine2: initialData.addressLine2 || '',
                    city: initialData.city || '',
                    state: initialData.state || '',
                    postalCode: initialData.postalCode || '',
                    country: initialData.country || ''
                }));
            }
        } else {
            setMethod('card');
        setPaypalVerified(false);
            setFormData({
                cardNumber: '',
                expiry: '',
                cvc: '',
                cardHolder: '',
                paypalEmail: '',
                addressLine1: '',
                addressLine2: '',
                city: '',
                state: '',
                postalCode: '',
                country: ''
            });
        }
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Format card number with spaces
    if (name === 'cardNumber') {
      const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
      const parts = [];
      for (let i = 0; i < v.length; i += 4) {
        parts.push(v.substring(i, i + 4));
      }
      if (parts.length) {
        setFormData(prev => ({ ...prev, [name]: parts.join(' ').substr(0, 19) }));
      } else {
        setFormData(prev => ({ ...prev, [name]: '' }));
      }
    } else if (name === 'expiry') {
      // Format MM/YY
      const v = value.replace(/\D/g, '');
      if (v.length >= 2) {
        setFormData(prev => ({ ...prev, [name]: v.substring(0, 2) + '/' + v.substring(2, 4) }));
      } else {
        setFormData(prev => ({ ...prev, [name]: v }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handlePayPalLogin = () => {
      setShowPayPalPopup(false);
      setPaypalVerified(true);
      // Auto-fill email from "login" simulation
      setFormData(prev => ({ ...prev, paypalEmail: 'user@example.com' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      type: method,
      ...formData
    });
  };

  return (
    <>
        {showPayPalPopup && (
            <PayPalPopup 
                onLogin={handlePayPalLogin} 
                onCancel={() => setShowPayPalPopup(false)} 
            />
        )}

        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
        <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <h3 className="font-bold text-lg text-gray-900">{initialData ? t('payment.edit_method') : t('payment.add_method')}</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X className="w-5 h-5" />
            </button>
            </div>

            <div className="p-6">
            {/* Payment Type Selection */}
            <div className="flex gap-4 mb-6">
                <button 
                onClick={() => { setMethod('card'); setPaypalVerified(false); }}
                className={`flex-1 flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                    method === 'card' 
                    ? 'border-indigo-600 bg-indigo-50/50 text-indigo-700' 
                    : 'border-gray-100 text-gray-500 hover:border-gray-200'
                }`}
                >
                <CreditCard className={`w-6 h-6 mb-2 ${method === 'card' ? 'text-indigo-600' : 'text-gray-400'}`} />
                <span className="text-sm font-bold">{t('payment.credit_card')}</span>
                </button>
                <button 
                onClick={() => setMethod('paypal')}
                className={`flex-1 flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                    method === 'paypal' 
                    ? 'border-blue-600 bg-blue-50/50 text-blue-700' 
                    : 'border-gray-100 text-gray-500 hover:border-gray-200'
                }`}
                >
                <div className="w-6 h-6 mb-2 grayscale opacity-60 flex items-center justify-center" style={{ filter: method === 'paypal' ? 'none' : 'grayscale(100%)', opacity: method === 'paypal' ? 1 : 0.6 }}>
                    <PayPalIcon />
                </div>
                <span className="text-sm font-bold">{t('payment.paypal')}</span>
                </button>
            </div>

            <form id="paymentForm" onSubmit={handleSubmit} className="space-y-4">
                {method === 'card' ? (
                <>
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t('payment.card_number')}</label>
                    <div className="relative">
                        <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        placeholder="0000 0000 0000 0000"
                        maxLength={19}
                        required
                        className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none font-mono"
                        />
                    </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{t('payment.expiry')}</label>
                        <input
                        type="text"
                        name="expiry"
                        value={formData.expiry}
                        onChange={handleChange}
                        placeholder="MM/YY"
                        maxLength={5}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none font-mono"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{t('payment.cvc')}</label>
                        <div className="relative">
                        <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="password"
                            name="cvc"
                            value={formData.cvc}
                            onChange={handleChange}
                            placeholder="123"
                            maxLength={4}
                            required
                            className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none font-mono"
                        />
                        </div>
                    </div>
                    </div>
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t('payment.card_holder')}</label>
                    <input
                        type="text"
                        name="cardHolder"
                        value={formData.cardHolder}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
                    />
                    </div>

                    {/* Billing Address Section */}
                    <div className="pt-4 border-t border-gray-100 mt-4">
                        <h4 className="text-sm font-bold text-gray-900 mb-3">Billing Address</h4>
                        <div className="space-y-3">
                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">Address Line 1</label>
                                <input
                                    type="text"
                                    name="addressLine1"
                                    value={formData.addressLine1}
                                    onChange={handleChange}
                                    placeholder="Street address, P.O. box, etc."
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">Address Line 2 (Optional)</label>
                                <input
                                    type="text"
                                    name="addressLine2"
                                    value={formData.addressLine2}
                                    onChange={handleChange}
                                    placeholder="Apartment, suite, unit, etc."
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none text-sm"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">City</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">State / Province</label>
                                    <input
                                        type="text"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none text-sm"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Postal Code</label>
                                    <input
                                        type="text"
                                        name="postalCode"
                                        value={formData.postalCode}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Country</label>
                                    <input
                                        type="text"
                                        name="country"
                                        value={formData.country}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none text-sm"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </>
                ) : (
                <div className="space-y-4">
                     {!paypalVerified ? (
                        <div className="text-center py-6 px-4 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                             <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <div className="w-8 h-8"><PayPalIcon /></div>
                             </div>
                             <h4 className="text-gray-900 font-bold mb-2">Connect PayPal</h4>
                             <p className="text-sm text-gray-500 mb-6">Click the button below to sign in to your PayPal account securely.</p>
                             <button 
                                type="button" 
                                onClick={() => setShowPayPalPopup(true)}
                                className="w-full bg-[#FFC439] hover:bg-[#F4BB37] text-gray-900 font-bold py-3 px-4 rounded-full shadow-sm transition-colors flex items-center justify-center gap-2"
                             >
                                <div className="w-4 h-4"><PayPalIcon /></div>
                                PayPal
                             </button>
                        </div>
                     ) : (
                         <div className="bg-green-50 rounded-xl p-4 border border-green-100 flex items-start gap-3">
                            <div className="mt-1 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center text-green-600 shrink-0">
                                <ShieldCheck className="w-3.5 h-3.5" />
                            </div>
                            <div className="flex-1">
                                <h4 className="text-sm font-bold text-gray-900">PayPal Account Verified</h4>
                                <p className="text-xs text-gray-600 mt-0.5">{formData.paypalEmail}</p>
                            </div>
                            <button 
                                type="button" 
                                onClick={() => { setPaypalVerified(false); setFormData(prev => ({...prev, paypalEmail: ''})); }}
                                className="text-xs text-red-500 font-medium hover:underline"
                            >
                                Disconnect
                            </button>
                         </div>
                     )}
                    
                    {/* Hidden input for validation if needed */}
                    <input type="hidden" name="paypalEmail" value={formData.paypalEmail} required={method === 'paypal'} />
                    
                    <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                        <Lock className="w-3 h-3" />
                        We don't share your financial details with the merchant.
                    </p>
                </div>
                )}
            </form>
            </div>

            <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
            <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                {t('common.cancel')}
            </button>
            <button 
                form="paymentForm" 
                type="submit" 
                disabled={method === 'paypal' && !paypalVerified}
                className="px-6 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
            >
                {t('common.save')}
            </button>
            </div>
        </div>
        </div>
    </>
  );
};

const PaymentManagement = () => {
  const { t } = useTranslation();
  const [methods, setMethods] = useState([
    {
      id: 1,
      type: 'card',
      last4: '4242',
      expiry: '12/25',
      brand: 'visa',
      isDefault: true
    },
    {
      id: 2,
      type: 'paypal',
      email: 'chen***@yahoo.com',
      isDefault: false
    }
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMethod, setEditingMethod] = useState(null);

  const handleDelete = (id) => {
    if (window.confirm(t('payment.delete_confirm'))) {
      setMethods(prev => prev.filter(m => m.id !== id));
    }
  };

  const handleEdit = (method) => {
    setEditingMethod(method);
    setIsModalOpen(true);
  };

  const handleSetDefault = (id) => {
    setMethods(prev => prev.map(m => ({
      ...m,
      isDefault: m.id === id
    })));
  };

  const handleSave = (data) => {
    if (editingMethod) {
      setMethods(prev => prev.map(m => {
        if (m.id === editingMethod.id) {
          return {
            ...m,
            ...data,
            last4: data.type === 'card' ? data.cardNumber.slice(-4) : undefined,
            email: data.type === 'paypal' ? data.paypalEmail : undefined
          };
        }
        return m;
      }));
    } else {
    const newMethod = {
      id: Date.now(),
      isDefault: methods.length === 0,
      ...data,
      last4: data.type === 'card' ? data.cardNumber.slice(-4) : undefined,
      email: data.type === 'paypal' ? data.paypalEmail : undefined
    };
    setMethods(prev => [...prev, newMethod]);
    }
    setIsModalOpen(false);
    setEditingMethod(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingMethod(null);
  };

  const CardBrandIcon = ({ brand }) => {
    // Simplified brand icon logic
    return <div className="font-bold text-indigo-800 italic font-serif">VISA</div>;
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t('payment.title')}</h1>
          <p className="text-gray-500 mt-1">{t('payment.subtitle')}</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm font-medium"
        >
          <Plus className="w-5 h-5" />
          {t('payment.add_method')}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {methods.map(method => (
          <div 
            key={method.id}
            className={`relative p-6 rounded-xl border-2 transition-all duration-200 group ${
              method.isDefault 
                ? 'border-indigo-600 bg-indigo-50/10 shadow-md' 
                : 'border-gray-100 bg-white hover:border-gray-200 hover:shadow-md'
            }`}
          >
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-8 rounded border flex items-center justify-center bg-white ${method.type === 'card' ? 'border-gray-200' : 'border-blue-100'}`}>
                  {method.type === 'card' ? <CardBrandIcon brand={method.brand} /> : <div className="w-6"><PayPalIcon /></div>}
                </div>
                <div>
                  <div className="font-bold text-gray-900 flex items-center gap-2">
                    {method.type === 'card' ? `•••• ${method.last4}` : 'PayPal'}
                    {method.isDefault && (
                      <span className="bg-indigo-100 text-indigo-700 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wide">
                        {t('payment.default')}
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    {method.type === 'card' ? `${t('payment.expires')} ${method.expiry}` : method.email}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => handleEdit(method)}
                  className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleDelete(method.id)}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {!method.isDefault && (
              <div className="pt-4 border-t border-gray-100">
                <button 
                  onClick={() => handleSetDefault(method.id)}
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-800 flex items-center gap-1.5"
                >
                  <Star className="w-4 h-4" /> {t('payment.set_default')}
                </button>
              </div>
            )}
          </div>
        ))}

        {/* Add New Placeholer */}
        <button 
            onClick={() => setIsModalOpen(true)}
            className="flex flex-col items-center justify-center p-6 rounded-xl border-2 border-dashed border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/30 transition-all group min-h-[160px]"
        >
            <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mb-3 group-hover:bg-indigo-100 transition-colors">
                <Plus className="w-6 h-6 text-gray-400 group-hover:text-indigo-600" />
            </div>
            <span className="font-bold text-gray-900">{t('payment.add_method')}</span>
            <span className="text-sm text-gray-500 mt-1">{t('payment.add_desc')}</span>
        </button>
      </div>

      <AddPaymentModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal} 
        onSave={handleSave}
        initialData={editingMethod}
      />
    </div>
  );
};

export default PaymentManagement;
