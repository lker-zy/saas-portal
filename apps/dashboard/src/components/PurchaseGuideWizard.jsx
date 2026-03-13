import React, { useState, useMemo, useEffect } from 'react';
import { X, ChevronRight, Check, ArrowRight, ArrowLeft, ShoppingCart, Info, Monitor, Smartphone, Globe, Clock, Shield, Server, Zap } from 'lucide-react';

const PurchaseGuideWizard = ({ 
  isOpen, 
  onClose, 
  onNavigateToProduct, 
  isEntryHidden = false, 
  onSetEntryHidden = () => {} 
}) => {
  const [step, setStep] = useState(1);
  const [selections, setSelections] = useState({
    scenario: null,
    duration: null,
    networkType: null,
    isHomeNetwork: null,
    devices: []
  });

  const [customRules, setCustomRules] = useState([]);
  const [customDurations, setCustomDurations] = useState([]);

  // Load custom rules and configurations from "backend" (localStorage simulation)
  useEffect(() => {
    if (isOpen) {
      // Load Rules
      try {
        const rawRules = localStorage.getItem('official_guide_rules_v1');
        if (rawRules) {
          setCustomRules(JSON.parse(rawRules));
        }
      } catch (_) { /* ignore */ }

      // Load Config (for duration options)
      try {
        const rawConfig = localStorage.getItem('official_purchaseGuide_config_v1');
        if (rawConfig) {
          const config = JSON.parse(rawConfig);
          if (config.durationOptions) {
            setCustomDurations(config.durationOptions);
          }
        }
      } catch (_) { /* ignore */ }
    }
  }, [isOpen]);

  // --- Mock Data ---
  const SCENARIOS = [
    { id: 'social', icon: '🗣️', label: '社交媒体', desc: 'Facebook, Instagram, WhatsApp, TikTok 等' },
    { id: 'ecommerce', icon: '🛒', label: '跨境电商', desc: 'Amazon, eBay, Shopee, Etsy 等' },
    { id: 'data', icon: '📊', label: '数据采集', desc: '爬虫, 市场调研, SEO 监控' },
    { id: 'game', icon: '🎮', label: '网络游戏', desc: '国际服游戏加速, 搬砖' },
    { id: 'other', icon: '🤔', label: '其他/不清楚', desc: '浏览网页, 学习查资料等' }
  ];

  // Use custom durations if available, otherwise fallback to default
  const DURATIONS = customDurations.length > 0 ? customDurations : [
    { id: 'short_hour', label: '< 1小时', desc: '临时使用，按量付费' },
    { id: 'short_day', label: '< 1天', desc: '短期任务' },
    { id: 'month', label: '1个月', desc: '月度订阅' },
    { id: 'long', label: '长期使用', desc: '稳定运营，长期独享' },
    { id: 'unknown', label: '不清楚', desc: '先试试看' }
  ];

  const NETWORK_TYPES = [
    { id: 'residential', label: '真人家庭住宅', desc: 'ISP/宽带 IP，高度匿名，防关联' },
    { id: 'mobile', label: '4G/5G 手机运营商', desc: '真实手机网络，适用于 App 注册' },
    { id: 'datacenter', label: '数据中心 (机房)', desc: '速度快，价格便宜，适合大规模采集' },
    { id: 'unknown', label: '不清楚', desc: '系统推荐' }
  ];

  const YES_NO = [
    { id: 'yes', label: '是', desc: '必须是家庭宽带网络' },
    { id: 'no', label: '否', desc: '机房 IP 也可以' },
    { id: 'unknown', label: '不清楚', desc: '不确定是否需要' }
  ];

  const DEVICES = [
    { id: 'mobile', label: '手机', icon: <Smartphone className="w-6 h-6"/> },
    { id: 'pc', label: '电脑', icon: <Monitor className="w-6 h-6"/> }
  ];

  // --- Intelligent Recommendation Logic ---
  const recommendation = useMemo(() => {
    const { scenario, duration, networkType, isHomeNetwork } = selections;
    
    // 1. Try to match custom rules first (Priority)
    if (customRules.length > 0) {
      for (const rule of customRules) {
        // Simple condition matching logic
        const cond = rule.conditions;
        let match = true;

        // 1. Scenario Match
        // If rule has scenario condition, user selection must be in it
        if (cond.scenario && cond.scenario.length > 0) {
           // scenario.id (e.g. 'social') or child id (e.g. 'social_whatsapp' - TODO in future wizard updates)
           // Current wizard only selects top-level category 'social'
           // We check if rule scenario array contains 'social'
           if (scenario && !cond.scenario.some(s => s === scenario.id || s.startsWith(scenario.id + '_'))) {
             match = false;
           }
        }

        // 2. Duration Match (New)
        if (match && cond.duration && cond.duration.length > 0) {
          if (duration && !cond.duration.includes(duration.id)) {
            match = false;
          }
        }

        // 3. Country Match (Not yet in wizard selection, ignore for now or treat as match if empty)
        // Future todo: Add country selection step to wizard if needed.
        
        if (match) {
          // Construct result from rule config
          let IconComponent = Shield;
          if (rule.recommendation.productId === 'buy_datacenter') IconComponent = Server;
          if (rule.recommendation.productId === 'buy_dynamic_isp') IconComponent = Globe;
          if (rule.recommendation.productId === 'buy_vps') IconComponent = Zap;

          return {
            id: rule.recommendation.productId,
            title: rule.recommendation.title,
            desc: rule.recommendation.desc,
            icon: <IconComponent className="w-7 h-7" />,
            color: rule.recommendation.color || 'indigo',
            features: [
              '符合您的业务场景定制需求',
              '系统为您智能匹配的最佳方案',
              '点击下方按钮立即查看详情'
            ],
            tag: rule.recommendation.tag || '智能推荐'
          };
        }
      }
    }

    // 2. Fallback to hardcoded logic if no custom rules matched
    // Default fallback
    let rec = {
        id: 'buy_static_isp',
        title: '静态住宅 ISP 代理',
        desc: '兼具数据中心的速度与住宅 IP 的匿名性，长期稳定不掉线。',
        icon: <Shield className="w-7 h-7" />,
        color: 'indigo',
        features: [
            '单 IP 独享，支持 24h+ 长期持有',
            'ISP 级归属地，极致纯净',
            '适合电商/社媒账号长期运营'
        ],
        tag: '最佳匹配'
    };

    // ... (Keep existing hardcoded logic as fallback) ...
    // 1. Data Scraping / Low Budget / High Speed -> Datacenter
    if (
        (scenario?.id === 'data') || 
        (networkType?.id === 'datacenter') ||
        (isHomeNetwork?.id === 'no' && scenario?.id !== 'social')
    ) {
        rec = {
            id: 'buy_datacenter',
            title: '全球数据中心代理',
            desc: '高并发、低延迟的性价比之选，适合大规模数据采集与爬虫任务。',
            icon: <Server className="w-7 h-7" />,
            color: 'blue',
            features: [
                '99.9% 连通率，毫秒级响应',
                '支持高并发请求，价格低廉',
                '全球 200+ 机房节点覆盖'
            ],
            tag: '性价比之选'
        };
    }

    // 2. Short Term / Dynamic Needs / Crawler -> Dynamic Residential
    if (
        (duration?.id === 'short_hour' || duration?.id === 'short_day') ||
        (scenario?.id === 'data' && networkType?.id === 'residential') || // Residential Scraping
        (scenario?.id === 'game') // Gaming often uses dynamic or accelerator
    ) {
        rec = {
            id: 'buy_dynamic_isp',
            title: '动态住宅代理',
            desc: '海量 IP 池轮换，每次请求或会话使用新 IP，彻底隐匿踪迹。',
            icon: <Globe className="w-7 h-7" />,
            color: 'emerald',
            features: [
                '7200万+ 真实住宅 IP',
                '城市/州级精准定位',
                '按流量计费，永不过期'
            ],
            tag: '灵活轮换'
        };
    }

    // 3. Mobile Specific -> Dynamic Mobile (Usually dynamic)
    if (networkType?.id === 'mobile') {
         rec = {
            id: 'buy_dynamic_isp', // Assuming dynamic isp covers mobile in this simplified mock
            title: '4G/5G 移动代理',
            desc: '真实手机网络环境，适用于 App 注册与移动端业务验证。',
            icon: <Smartphone className="w-7 h-7" />,
            color: 'purple',
            features: [
                '真实运营商网络 (AT&T, Verizon...)',
                '高匿名度，抗封锁能力强',
                '支持 4G/5G 自动切换'
            ],
            tag: '移动端首选'
        };
    }

    // 4. Strong Overrides for E-commerce/Social (Must be Static ISP)
    if (scenario?.id === 'social' || scenario?.id === 'ecommerce') {
        rec = {
            id: 'buy_static_isp',
            title: '静态住宅 ISP 代理 (Premium)',
            desc: '专为跨境电商与社媒运营优化，提供最稳定的原生家庭宽带环境。',
            icon: <Shield className="w-7 h-7" />,
            color: 'indigo',
            features: [
                '100% 独享静态 IP，永不跳变',
                '通过主流风控检测 (Pixelscan, Ipquality)',
                '适合店铺防关联、账号养号'
            ],
            tag: '运营首选'
        };
    }

    return rec;
  }, [selections, customRules]);

  if (!isOpen) return null;

  // --- Logic ---
  const handleNext = () => {
    if (step < 6) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const updateSelection = (field, value) => {
    setSelections(prev => ({ ...prev, [field]: value }));
  };

  const toggleDevice = (deviceId) => {
    setSelections(prev => {
      const current = prev.devices;
      if (current.includes(deviceId)) {
        return { ...prev, devices: current.filter(d => d !== deviceId) };
      } else {
        return { ...prev, devices: [...current, deviceId] };
      }
    });
  };

  // --- Render Steps ---
  const renderStepContent = () => {
    switch(step) {
      case 1:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900">您的业务选择是?</h3>
              <p className="text-gray-500 mt-2">我们会根据您的业务场景推荐最合适的代理类型</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SCENARIOS.map(item => (
                <button
                  key={item.id}
                  onClick={() => { updateSelection('scenario', item); handleNext(); }}
                  className="flex items-start gap-4 p-5 rounded-xl border border-gray-200 hover:border-indigo-500 hover:bg-indigo-50 hover:shadow-md transition-all text-left group"
                >
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <div className="font-bold text-gray-900 group-hover:text-indigo-700">{item.label}</div>
                    <div className="text-sm text-gray-500 mt-1">{item.desc}</div>
                  </div>
                  <ChevronRight className="w-5 h-5 ml-auto text-gray-300 group-hover:text-indigo-400 mt-2" />
                </button>
              ))}
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900">请选择单 IP 持有时长 (单选)</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {DURATIONS.map(item => (
                <button
                  key={item.id}
                  onClick={() => { updateSelection('duration', item); handleNext(); }}
                  className={`flex items-center gap-4 p-5 rounded-xl border transition-all text-left group ${selections.duration?.id === item.id ? 'border-indigo-600 bg-indigo-50 ring-1 ring-indigo-600' : 'border-gray-200 hover:border-indigo-400 hover:bg-gray-50'}`}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${selections.duration?.id === item.id ? 'border-indigo-600' : 'border-gray-300'}`}>
                    {selections.duration?.id === item.id && <div className="w-2.5 h-2.5 rounded-full bg-indigo-600"></div>}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{item.label}</div>
                    <div className="text-sm text-gray-500 mt-0.5">{item.desc}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900">网络环境特征</h3>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {NETWORK_TYPES.map(item => (
                <button
                  key={item.id}
                  onClick={() => { updateSelection('networkType', item); handleNext(); }}
                  className={`flex items-center gap-4 p-5 rounded-xl border transition-all text-left group ${selections.networkType?.id === item.id ? 'border-indigo-600 bg-indigo-50 ring-1 ring-indigo-600' : 'border-gray-200 hover:border-indigo-400 hover:bg-gray-50'}`}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${selections.networkType?.id === item.id ? 'border-indigo-600' : 'border-gray-300'}`}>
                    {selections.networkType?.id === item.id && <div className="w-2.5 h-2.5 rounded-full bg-indigo-600"></div>}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{item.label}</div>
                    <div className="text-sm text-gray-500 mt-0.5">{item.desc}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 4:
         return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900">是否需要家庭网络特征? (单选)</h3>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {YES_NO.map(item => (
                <button
                  key={item.id}
                  onClick={() => { updateSelection('isHomeNetwork', item); handleNext(); }}
                  className={`flex items-center gap-4 p-5 rounded-xl border transition-all text-left group ${selections.isHomeNetwork?.id === item.id ? 'border-indigo-600 bg-indigo-50 ring-1 ring-indigo-600' : 'border-gray-200 hover:border-indigo-400 hover:bg-gray-50'}`}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${selections.isHomeNetwork?.id === item.id ? 'border-indigo-600' : 'border-gray-300'}`}>
                    {selections.isHomeNetwork?.id === item.id && <div className="w-2.5 h-2.5 rounded-full bg-indigo-600"></div>}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{item.label}</div>
                    <div className="text-sm text-gray-500 mt-0.5">{item.desc}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900">请选择客户端设备 (多选)</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {DEVICES.map(item => (
                <button
                  key={item.id}
                  onClick={() => toggleDevice(item.id)}
                  className={`flex flex-col items-center justify-center gap-3 p-6 rounded-xl border transition-all text-center group h-40 ${selections.devices.includes(item.id) ? 'border-indigo-600 bg-indigo-50 ring-1 ring-indigo-600' : 'border-gray-200 hover:border-indigo-400 hover:bg-gray-50'}`}
                >
                  <div className={`p-3 rounded-full ${selections.devices.includes(item.id) ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-500'}`}>
                    {item.icon}
                  </div>
                  <div className="font-bold text-gray-900">{item.label}</div>
                  {selections.devices.includes(item.id) && (
                    <div className="absolute top-3 right-3">
                      <Check className="w-5 h-5 text-indigo-600" />
                    </div>
                  )}
                </button>
              ))}
            </div>
            <div className="mt-8">
               <button 
                  onClick={handleNext}
                  disabled={selections.devices.length === 0}
                  className="w-full py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-200"
               >
                 查看推荐方案
               </button>
            </div>
          </div>
        );

      case 6:
        // Recommendation Result
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">线路推荐方案</h3>
              <p className="text-gray-500 mt-1">基于您的选项，为您推荐以下线路购买方案</p>
            </div>

            {/* Summary of Choices */}
            <div className="grid grid-cols-2 gap-3 mb-6">
               <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="text-xs text-gray-400">业务选择</div>
                  <div className="text-sm font-bold text-gray-800 flex items-center gap-1.5 mt-0.5">
                     {selections.scenario?.icon} {selections.scenario?.label}
                  </div>
               </div>
               <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="text-xs text-gray-400">时长</div>
                  <div className="text-sm font-bold text-gray-800 mt-0.5">{selections.duration?.label}</div>
               </div>
               <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="text-xs text-gray-400">网络特征</div>
                  <div className="text-sm font-bold text-gray-800 mt-0.5">{selections.networkType?.label}</div>
               </div>
               <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="text-xs text-gray-400">设备</div>
                  <div className="text-sm font-bold text-gray-800 mt-0.5">{selections.devices.map(d=>d==='mobile'?'手机':'电脑').join(', ')}</div>
               </div>
            </div>

            {/* Recommendation Card */}
            <div className={`border-2 rounded-2xl p-6 relative overflow-hidden bg-${recommendation.color}-50/30 border-${recommendation.color}-600`}>
               <div className={`absolute top-0 right-0 text-white text-xs font-bold px-3 py-1 rounded-bl-lg bg-${recommendation.color}-600`}>
                 {recommendation.tag}
               </div>
               
               <div className="flex items-start gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 bg-${recommendation.color}-100 text-${recommendation.color}-600`}>
                     {recommendation.icon}
                  </div>
                  <div>
                     <h4 className="text-lg font-bold text-gray-900">{recommendation.title}</h4>
                     <p className="text-sm text-gray-600 mt-1">{recommendation.desc}</p>
                  </div>
               </div>

               <div className="space-y-2 mb-6">
                  {recommendation.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                       <Check className="w-4 h-4 text-emerald-500" /> 
                       <span>{feat}</span>
                    </div>
                  ))}
               </div>

               <div className="flex gap-3">
                  <button 
                    onClick={() => setStep(1)}
                    className="flex-1 py-3 bg-white border border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-colors"
                  >
                     重新选择
                  </button>
                  <button 
                    onClick={() => { onClose(); onNavigateToProduct(recommendation.id); }}
                    className={`flex-1 py-3 text-white font-bold rounded-xl transition-colors shadow-lg bg-${recommendation.color}-600 hover:bg-${recommendation.color}-700 shadow-${recommendation.color}-200`}
                  >
                     去购买
                  </button>
               </div>
            </div>

            <div className="text-center">
               <button 
                 onClick={() => { onClose(); onNavigateToProduct(); }}
                 className="text-sm text-gray-500 hover:text-indigo-600 flex items-center gap-1 mx-auto"
               >
                  <ShoppingCart className="w-4 h-4" /> 查看所有产品列表
               </button>
            </div>
          </div>
        );
      
      default: return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden relative">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div className="flex items-center gap-2">
            <span className="font-bold text-gray-900">购买引导</span>
            <span className="text-xs text-gray-400 font-mono tracking-widest uppercase">PURCHASE GUIDANCE</span>
          </div>
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 text-xs text-gray-500 select-none cursor-pointer">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                checked={isEntryHidden}
                onChange={(e) => onSetEntryHidden(e.target.checked)}
              />
              不再显示入口
            </label>
            <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-1 bg-gray-100 w-full">
           <div className="h-full bg-indigo-600 transition-all duration-500 ease-out" style={{ width: `${(step / 6) * 100}%` }}></div>
        </div>

        {/* Body */}
        <div className="p-8 overflow-y-auto custom-scrollbar flex-1">
          {renderStepContent()}
        </div>

        {/* Footer (Navigation for Steps 1-4) */}
        {step < 5 && (
          <div className="px-8 py-5 border-t border-gray-100 bg-gray-50 flex justify-between items-center">
            {step > 1 ? (
              <button 
                onClick={handleBack}
                className="text-gray-500 hover:text-gray-900 font-medium px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
              >
                上一步
              </button>
            ) : (
              <div></div> // Spacer
            )}
            
            <div className="flex items-center gap-4">
              <button 
                onClick={() => onClose()}
                className="text-gray-400 hover:text-gray-600 text-sm px-4"
              >
                不需要指引
              </button>
              {/* Note: Specific steps like Scenario/Duration auto-advance, but we keep a manual Next for completeness if needed, or disable it if no selection */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PurchaseGuideWizard;
