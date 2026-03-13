import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  User, 
  Mail, 
  Phone, 
  Globe, 
  Lock, 
  Edit2, 
  X,
  Check,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import SliderCaptcha from './SliderCaptcha';

const EditModal = ({ isOpen, onClose, title, children, onSave, isVerified, requireCaptcha }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h3 className="font-bold text-gray-900">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 space-y-4">
          {children}
        </div>
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button 
            onClick={onSave}
            disabled={requireCaptcha && !isVerified}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

const UserProfile = () => {
  const { t } = useTranslation();
  
  // Mock Data State
  const [profile, setProfile] = useState({
    username: 'chenxuchu@yahoo.com',
    name: 'David Chen',
    company: 'Tech Solutions Inc.',
    email: 'chenxuchu@yahoo.com',
    phone: '16039157376',
    measurement: 'in/lb',
    timezone: 'America/New_York',
    language: 'English',
  });

  // Edit States
  const [editField, setEditField] = useState(null);
  const [tempValue, setTempValue] = useState('');
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);

  const handleEditClick = (field, value) => {
    setEditField(field);
    setTempValue(value);
    setIsCaptchaVerified(false);
  };

  const handleSave = () => {
    setProfile(prev => ({ ...prev, [editField]: tempValue }));
    setEditField(null);
    setIsCaptchaVerified(false);
  };

  const SectionTitle = ({ title }) => (
    <h2 className="text-xl font-medium text-gray-900 mb-6 mt-8 pb-2 border-b border-gray-100">
      {title}
    </h2>
  );

  const InfoRow = ({ label, value, field, editable = true, requireCaptcha = false }) => (
    <div className="flex flex-col sm:flex-row sm:items-center py-4 group">
      <div className="w-48 text-gray-500 font-medium text-sm text-right pr-8">{label}</div>
      <div className="flex-1 flex items-center justify-between sm:justify-start gap-4">
        <div className="text-gray-900 font-medium">{value}</div>
        {editable && (
          <button 
            onClick={() => handleEditClick(field, value)}
            className="text-indigo-600 text-sm font-medium hover:text-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1"
          >
            <Edit2 className="w-3 h-3" /> {t('common.edit')}
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">My Account</h1>
      
      {/* Personal Information */}
      <SectionTitle title="Personal Information" />
      <div className="space-y-1">
        <InfoRow label="User Name" value={profile.username} editable={false} />
        <InfoRow label="Name" value={profile.name} editable={false} />
        <InfoRow label="Company" value={profile.company} field="company" />
      </div>

      {/* Contact Information */}
      <SectionTitle title="Contact Information" />
      <div className="space-y-1">
        <InfoRow label="Email" value={profile.email} field="email" requireCaptcha={true} />
        <InfoRow label="Phone" value={profile.phone} field="phone" requireCaptcha={true} />
      </div>

      {/* General Settings */}
      <SectionTitle title="General Settings" />
      <div className="space-y-1">
        <InfoRow label="Measurement" value={profile.measurement} field="measurement" />
        <InfoRow label="Time Zone" value={profile.timezone} field="timezone" />
        <InfoRow label="Language" value={profile.language} field="language" />
      </div>

      {/* Account Security */}
      <SectionTitle title="Account Security" />
      <div className="flex flex-col sm:flex-row sm:items-center py-4">
        <div className="w-48 text-gray-500 font-medium text-sm text-right pr-8">Password</div>
        <div className="flex-1">
          <button className="text-indigo-600 font-medium hover:text-indigo-700 text-sm">Change Password</button>
        </div>
      </div>

      {/* Edit Modal */}
      <EditModal 
        isOpen={!!editField} 
        onClose={() => setEditField(null)}
        title={`Edit ${editField}`}
        onSave={handleSave}
        requireCaptcha={['email', 'phone'].includes(editField)}
        isVerified={isCaptchaVerified}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New {editField?.charAt(0).toUpperCase() + editField?.slice(1)}
            </label>
            <input 
              type="text" 
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
            />
          </div>

          {['email', 'phone'].includes(editField) && (
            <div className="pt-2 border-t border-gray-50">
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-indigo-600" /> Security Verification
              </label>
              <SliderCaptcha onVerify={() => setIsCaptchaVerified(true)} />
              <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> Please slide to verify before saving changes.
              </p>
            </div>
          )}
        </div>
      </EditModal>
    </div>
  );
};

export default UserProfile;

