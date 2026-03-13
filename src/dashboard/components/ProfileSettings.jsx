import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  X,
  AlertCircle,
  ArrowLeft
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { userService } from '../services/userService';
import SliderCaptcha from './SliderCaptcha';
import ChangePasswordModal from './ChangePasswordModal';

const ProfileSettings = ({ onBack }) => {
  const { t } = useTranslation();
  const { user, refreshUserInfo } = useAuth();

  // Initial State - use real user data
  const [profile, setProfile] = useState({
    username: user?.email || '',
    name: user?.nickname || '',
    company: '',
    email: user?.email || '',
    phone: user?.phone || '',
    measurement: 'in/lb',
    timezone: 'America/New_York',
    language: 'Chinese'
  });

  // Change password modal state
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  // Update profile when user data changes
  useEffect(() => {
    if (user) {
      setProfile(prev => ({
        ...prev,
        username: user.email || prev.username,
        name: user.nickname || prev.name,
        email: user.email || prev.email,
        phone: user.phone || prev.phone
      }));
    }
  }, [user]);

  // Modal State
  const [editingField, setEditingField] = useState(null);
  const [tempValue, setTempValue] = useState('');
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  // Verification Flow State
  const [step, setStep] = useState(1); // 1: Verify Old, 2: Verify New
  const [verificationCode, setVerificationCode] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [generatedCode, setGeneratedCode] = useState(null);

  // Reset modal state when closed
  const resetModal = () => {
    setEditingField(null);
    setTempValue('');
    setIsCaptchaVerified(false);
    setErrorMsg('');
    setStep(1);
    setVerificationCode('');
    setCountdown(0);
    setGeneratedCode(null);
  };

  // Countdown timer effect
  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  // Edit Handlers
  const handleEdit = (field, value) => {
    setEditingField(field);
    // For sensitive fields, we start empty in step 2, but keep track of old value for step 1 display
    // tempValue will store the *new* value user types in step 2
    setTempValue(needsCaptcha(field) ? '' : value);
    setIsCaptchaVerified(false);
    setErrorMsg('');
    setStep(1);
  };

  const validateInput = (field, value) => {
    if (field === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return '无效的邮箱格式 (Invalid Email)';
      }
    }
    if (field === 'phone') {
      const phoneRegex = /^[\d\+\-\s]{5,20}$/;
      if (!phoneRegex.test(value)) {
        return '无效的电话号码格式 (Invalid Phone)';
      }
    }
    if (!value.trim()) {
      return '内容不能为空 (Cannot be empty)';
    }
    return null;
  };

  const needsCaptcha = (field) => ['email', 'phone'].includes(field);

  const sendVerificationCode = () => {
    if (step === 2 && needsCaptcha(editingField)) {
      const error = validateInput(editingField, tempValue);
      if (error) {
        setErrorMsg(error);
        return;
      }
    }
    
    // Simulate sending code
    const mockCode = Math.floor(100000 + Math.random() * 900000).toString();
    console.log('Verification Code:', mockCode); // For debugging
    setGeneratedCode(mockCode);
    setCountdown(60);
    alert(`${t('common.verify')}: ${mockCode}`); // In real app, this would be an email/SMS
  };

  const handleNextStep = () => {
    if (verificationCode !== generatedCode) {
      setErrorMsg(t('profile.invalid_code') || 'Invalid code');
      return;
    }
    // Success for step 1
    setStep(2);
    setVerificationCode('');
    setCountdown(0);
    setGeneratedCode(null);
    setErrorMsg('');
    // Note: IsCaptchaVerified remains true from step 1
  };

  const handleSave = async () => {
    const isSensitive = needsCaptcha(editingField);

    if (isSensitive) {
        // Final verification for step 2
        if (verificationCode !== generatedCode) {
            setErrorMsg(t('profile.invalid_code') || 'Invalid code');
            return;
        }
    } else {
        const error = validateInput(editingField, tempValue);
        if (error) {
            setErrorMsg(error);
            return;
        }
    }

    setIsSaving(true);
    try {
      // Call userService to update profile
      if (editingField === 'name' || editingField === 'phone') {
        const result = await userService.updateProfile({
          nickname: editingField === 'name' ? tempValue : profile.name,
          phone: editingField === 'phone' ? tempValue : profile.phone
        });

        if (!result.success) {
          setErrorMsg(result.message || '更新失败，请重试');
          setIsSaving(false);
          return;
        }
      } else if (editingField === 'email') {
        // Email updates need verification code flow
        const result = await userService.updateProfile({
          email: tempValue
        });

        if (!result.success) {
          setErrorMsg(result.message || '更新失败，请重试');
          setIsSaving(false);
          return;
        }
      }

      // Update local state
      setProfile(prev => ({ ...prev, [editingField]: tempValue }));

      // Refresh user info from backend
      await refreshUserInfo();

      setIsSaving(false);
      resetModal();
    } catch (error) {
      console.error('Failed to update profile:', error);
      setErrorMsg(error.message || '更新失败，请重试');
      setIsSaving(false);
    }
  };

  const EditModal = () => {
    if (!editingField) return null;

    const isSensitive = needsCaptcha(editingField);
    
    // Logic for non-sensitive fields is simple
    if (!isSensitive) {
        const canSave = !isSaving;
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
                <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all scale-100">
                  <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <h3 className="font-bold text-lg text-gray-900">
                      {t('common.edit')} {t(`profile.${editingField}`)}
                    </h3>
                    <button onClick={resetModal} className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="p-6 space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 block">{t('profile.new_value')}</label>
                      <input 
                        type="text"
                        value={tempValue}
                        onChange={(e) => { setTempValue(e.target.value); setErrorMsg(''); }}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-indigo-500 focus:ring-indigo-500/20"
                        autoFocus
                      />
                      {errorMsg && <p className="text-xs text-red-500 mt-1">{errorMsg}</p>}
                    </div>
                  </div>
                  <div className="px-6 py-4 bg-gray-50 flex justify-end gap-3 border-t border-gray-100">
                    <button onClick={resetModal} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                      {t('common.cancel')}
                    </button>
                    <button onClick={handleSave} disabled={!canSave} className="px-6 py-2 text-sm font-medium text-white rounded-lg bg-indigo-600 hover:bg-indigo-700 shadow-sm">
                      {isSaving ? t('common.loading') : t('common.save')}
                    </button>
                  </div>
                </div>
            </div>
        );
    }

    // Logic for Sensitive Fields (Step 1 & Step 2)
    const isStep1 = step === 1;
    const title = isStep1 ? t('profile.step_verify_identity') : t('profile.step_bind_new', { type: t(`profile.${editingField}`) });
    
    // Step 1: Check if we can send code (need slider first)
    // Step 2: Check if we can save (need code verification)
    
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all scale-100">
          <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <h3 className="font-bold text-lg text-gray-900">{title}</h3>
            <button 
              onClick={resetModal}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="p-6 space-y-6">
            {isStep1 ? (
                <>
                    <p className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg border border-blue-100 flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                        {t('profile.verify_old_desc', { type: t(`profile.${editingField}`) })}: <br/>
                        <span className="font-medium text-gray-900">{profile[editingField]}</span>
                    </p>
                    
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 block">{t('profile.security_check')}</label>
                        <SliderCaptcha onVerify={(verified) => setIsCaptchaVerified(verified)} />
                    </div>

                    {isCaptchaVerified && (
                        <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                            <label className="text-sm font-medium text-gray-700 block">{t('profile.verification_code')}</label>
                            <div className="flex gap-2">
                                <input 
                                    type="text" 
                                    value={verificationCode}
                                    onChange={(e) => setVerificationCode(e.target.value)}
                                    placeholder={t('profile.code_placeholder')}
                                    className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-indigo-500 focus:ring-indigo-500/20"
                                />
                                <button 
                                    onClick={sendVerificationCode}
                                    disabled={countdown > 0}
                                    className={`px-4 py-2.5 text-sm font-medium rounded-lg whitespace-nowrap min-w-[100px] transition-colors ${
                                        countdown > 0 
                                            ? 'bg-gray-100 text-gray-400 border border-gray-200' 
                                            : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100 border border-indigo-200'
                                    }`}
                                >
                                    {countdown > 0 ? t('profile.resend_code', { seconds: countdown }) : t('profile.send_code')}
                                </button>
                            </div>
                            {errorMsg && <p className="text-xs text-red-500 mt-1">{errorMsg}</p>}
                        </div>
                    )}
                </>
            ) : (
                <>
                    <p className="text-sm text-gray-600">
                        {t('profile.verify_new_desc', { type: t(`profile.${editingField}`) })}
                    </p>
                    
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 block">
                            {editingField === 'email' ? t('profile.new_email') : t('profile.new_phone')}
                        </label>
                        <input 
                            type={editingField === 'email' ? 'email' : 'text'} 
                            value={tempValue}
                            onChange={(e) => {
                                setTempValue(e.target.value);
                                setErrorMsg('');
                            }}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-indigo-500 focus:ring-indigo-500/20"
                            placeholder={editingField === 'email' ? 'example@email.com' : '+1 234 567 890'}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 block">{t('profile.verification_code')}</label>
                        <div className="flex gap-2">
                            <input 
                                type="text" 
                                value={verificationCode}
                                onChange={(e) => setVerificationCode(e.target.value)}
                                placeholder={t('profile.code_placeholder')}
                                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-indigo-500 focus:ring-indigo-500/20"
                            />
                            <button 
                                onClick={sendVerificationCode}
                                disabled={countdown > 0}
                                className={`px-4 py-2.5 text-sm font-medium rounded-lg whitespace-nowrap min-w-[100px] transition-colors ${
                                    countdown > 0 
                                        ? 'bg-gray-100 text-gray-400 border border-gray-200' 
                                        : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100 border border-indigo-200'
                                }`}
                            >
                                {countdown > 0 ? t('profile.resend_code', { seconds: countdown }) : t('profile.send_code')}
                            </button>
                        </div>
                        {errorMsg && <p className="text-xs text-red-500 mt-1">{errorMsg}</p>}
                    </div>
                </>
            )}
          </div>

          <div className="px-6 py-4 bg-gray-50 flex justify-end gap-3 border-t border-gray-100">
            <button 
              onClick={resetModal}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-all shadow-sm"
            >
              {t('common.cancel')}
            </button>
            
            {isStep1 ? (
                <button 
                  onClick={handleNextStep}
                  disabled={!verificationCode || verificationCode.length < 4}
                  className={`px-6 py-2 text-sm font-medium text-white rounded-lg flex items-center gap-2 transition-all shadow-sm ${
                    verificationCode && verificationCode.length >= 4
                      ? 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-md' 
                      : 'bg-gray-300 cursor-not-allowed'
                  }`}
                >
                  {t('profile.next_step')}
                </button>
            ) : (
                <button 
                  onClick={handleSave}
                  disabled={!verificationCode || isSaving}
                  className={`px-6 py-2 text-sm font-medium text-white rounded-lg flex items-center gap-2 transition-all shadow-sm ${
                    verificationCode && !isSaving
                      ? 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-md' 
                      : 'bg-gray-300 cursor-not-allowed'
                  }`}
                >
                  {isSaving ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {t('common.loading')}
                    </>
                  ) : t('common.save')}
                </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  const Section = ({ title, children, noBorder }) => (
    <div className={`mb-8 ${!noBorder ? 'border-b border-gray-100 pb-8' : ''}`}>
      <h2 className="text-xl font-semibold text-gray-800 mb-6">{title}</h2>
      <div className="space-y-1">
        {children}
      </div>
    </div>
  );

  const Field = ({ label, value, fieldKey, editable = true, customAction }) => (
    <div className="flex flex-col sm:flex-row sm:items-center py-3 sm:py-2">
      <div className="w-48 text-gray-500 text-sm">{label}</div>
      <div className="flex-1 flex items-center justify-between min-w-0 gap-4">
        <span className="text-gray-900 font-medium truncate block">{value || '-'}</span>
        
        {customAction ? (
          customAction
        ) : (
          editable && (
            <button 
              onClick={() => handleEdit(fieldKey, value)}
              className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline shrink-0 px-2 py-1 rounded transition-colors"
            >
              {t('common.edit')}
            </button>
          )
        )}
      </div>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 animate-in fade-in duration-500">
      {/* Back Navigation + Title */}
      <div className="flex items-center gap-3 mb-8">
        {onBack && (
          <button
            onClick={onBack}
            className="group flex items-center justify-center w-9 h-9 rounded-xl bg-white border border-gray-200 shadow-sm hover:bg-gray-50 hover:border-gray-300 hover:shadow-md active:scale-95 transition-all duration-200"
            title="返回"
          >
            <ArrowLeft className="w-4 h-4 text-gray-500 group-hover:text-gray-700 transition-colors" />
          </button>
        )}
        <h1 className="text-2xl font-bold text-gray-900">{t('profile.my_account')}</h1>
      </div>

      <div className="bg-white rounded-xl p-8 shadow-[0_1px_3px_rgba(0,0,0,0.1)] border border-gray-100">
        
        {/* Personal Information */}
        <Section title={t('profile.personal_info')}>
          <Field label={t('profile.username')} value={profile.username} fieldKey="username" editable={false} />
          <Field label={t('profile.name')} value={profile.name} fieldKey="name" editable={false} />
          <Field label={t('profile.company')} value={profile.company} fieldKey="company" />
        </Section>

        {/* Contact Information */}
        <Section title={t('profile.contact_info')}>
          <Field label={t('profile.email')} value={profile.email} fieldKey="email" />
          <Field label={t('profile.phone')} value={profile.phone} fieldKey="phone" />
        </Section>

        {/* General Settings */}
        <Section title={t('profile.general_settings')}>
          <Field label={t('profile.measurement')} value={profile.measurement} fieldKey="measurement" />
          <Field label={t('profile.timezone')} value={profile.timezone} fieldKey="timezone" />
          <Field label={t('profile.language')} value={profile.language} fieldKey="language" />
        </Section>

        {/* Account Security */}
        <Section title={t('profile.account_security')} noBorder>
          <Field
            label={t('profile.password')}
            value="••••••••"
            fieldKey="password"
            customAction={
              <button
                onClick={() => setShowPasswordModal(true)}
                className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline"
              >
                {t('profile.change_password')}
              </button>
            }
          />
        </Section>
      </div>

      <EditModal />
      <ChangePasswordModal
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
        onSuccess={refreshUserInfo}
      />
    </div>
  );
};

export default ProfileSettings;
