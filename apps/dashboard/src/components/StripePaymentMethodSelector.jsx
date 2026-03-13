import React from 'react';
import { CreditCard, Wallet, MessageCircle } from 'lucide-react';

/**
 * Stripe 支付方式选择器组件
 * 让用户在 Stripe Checkout 中选择具体的支付方式（卡/支付宝/微信）
 */
export const StripePaymentMethodSelector = ({ selected, onChange }) => {
  const methods = [
    {
      id: 'card',
      name: '银行卡',
      description: 'Visa, MasterCard, American Express',
      icon: CreditCard,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      id: 'alipay',
      name: '支付宝',
      description: 'Alipay 支付',
      icon: Wallet,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      id: 'wechat_pay',
      name: '微信支付',
      description: 'WeChat Pay 微信支付',
      icon: MessageCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    }
  ];

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-gray-900">
        选择支付方式
      </label>
      <div className="grid grid-cols-3 gap-3">
        {methods.map(method => {
          const Icon = method.icon;
          const isSelected = selected === method.id;

          return (
            <button
              key={method.id}
              type="button"
              onClick={() => onChange(method.id)}
              className={`
                relative flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all
                ${isSelected
                  ? `${method.bgColor} ${method.borderColor} shadow-sm`
                  : 'border-gray-200 hover:border-gray-300 bg-white'
                }
              `}
            >
              {isSelected && (
                <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-white border-2 flex items-center justify-center">
                  <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
              <Icon className={`w-6 h-6 ${method.color}`} />
              <span className="text-xs font-semibold text-gray-900">{method.name}</span>
              <span className="text-[10px] text-gray-500 text-center leading-tight">
                {method.description}
              </span>
            </button>
          );
        })}
      </div>
      <p className="text-xs text-gray-500">
        💡 Stripe Checkout 将显示您选择的支付方式（部分支付方式需要在Stripe Dashboard中激活）
      </p>
    </div>
  );
};

export default StripePaymentMethodSelector;
