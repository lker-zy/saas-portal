import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  MapPin, 
  Plus, 
  Edit2, 
  Trash2, 
  Check, 
  Star,
  X,
  Home,
  Building2,
  Globe,
  Phone,
  User
} from 'lucide-react';

const AddressModal = ({ isOpen, onClose, onSave, initialData, title }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState(initialData || {
    firstName: '',
    lastName: '',
    company: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    country: 'United States',
    phone: '',
    isDefault: false
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h3 className="font-bold text-lg text-gray-900">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-200">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto">
          <form id="addressForm" onSubmit={handleSubmit} className="space-y-4">
            {/* Name Section */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('address.first_name') || 'First Name'}</label>
                <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                    placeholder="John"
                    />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('address.last_name') || 'Last Name'}</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                  placeholder="Doe"
                />
              </div>
            </div>

            {/* Company */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t('address.company') || 'Company'} <span className="text-gray-400 font-normal text-xs">(Optional)</span></label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                  placeholder="Acme Inc."
                />
              </div>
            </div>

            {/* Address Lines */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t('address.address_line1') || 'Address Line 1'}</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  name="address1"
                  value={formData.address1}
                  onChange={handleChange}
                  required
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                  placeholder="123 Main St"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t('address.address_line2') || 'Address Line 2'} <span className="text-gray-400 font-normal text-xs">(Optional)</span></label>
              <input
                type="text"
                name="address2"
                value={formData.address2}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                placeholder="Apt 4B"
              />
            </div>

            {/* City, State, Zip */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('address.city') || 'City'}</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                  placeholder="New York"
                />
              </div>
              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('address.state') || 'State/Province'}</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                  placeholder="NY"
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('address.zip') || 'Zip/Postal Code'}</label>
                <input
                  type="text"
                  name="zip"
                  value={formData.zip}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                  placeholder="10001"
                />
              </div>
            </div>

            {/* Country */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t('address.country') || 'Country'}</label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all bg-white"
                >
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Canada">Canada</option>
                  <option value="Australia">Australia</option>
                  <option value="China">China</option>
                  <option value="Japan">Japan</option>
                  <option value="Germany">Germany</option>
                  <option value="France">France</option>
                  <option value="Singapore">Singapore</option>
                </select>
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t('address.phone') || 'Phone Number'}</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>

            {/* Default Checkbox */}
            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="isDefault"
                name="isDefault"
                checked={formData.isDefault}
                onChange={handleChange}
                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <label htmlFor="isDefault" className="text-sm text-gray-700 cursor-pointer select-none">
                {t('address.set_default') || 'Set as default billing address'}
              </label>
            </div>
          </form>
        </div>

        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            {t('common.cancel') || 'Cancel'}
          </button>
          <button 
            form="addressForm"
            type="submit"
            className="px-6 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 shadow-sm transition-colors"
          >
            {t('common.save') || 'Save Address'}
          </button>
        </div>
      </div>
    </div>
  );
};

const AddressManagement = () => {
  const { t } = useTranslation();
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      firstName: 'David',
      lastName: 'Chen',
      company: 'Proxy Inc.',
      address1: '123 Tech Blvd',
      address2: 'Suite 200',
      city: 'San Francisco',
      state: 'CA',
      zip: '94105',
      country: 'United States',
      phone: '+1 (415) 555-0123',
      isDefault: true
    },
    {
      id: 2,
      firstName: 'David',
      lastName: 'Chen',
      company: '',
      address1: '456 residential Lane',
      address2: '',
      city: 'San Jose',
      state: 'CA',
      zip: '95112',
      country: 'United States',
      phone: '+1 (408) 555-6789',
      isDefault: false
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  const handleAdd = () => {
    setEditingAddress(null);
    setIsModalOpen(true);
  };

  const handleEdit = (address) => {
    setEditingAddress(address);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm(t('address.confirm_delete') || 'Are you sure you want to delete this address?')) {
      setAddresses(prev => prev.filter(addr => addr.id !== id));
    }
  };

  const handleSetDefault = (id) => {
    setAddresses(prev => prev.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    })));
  };

  const handleSave = (data) => {
    if (editingAddress) {
      // Update existing
      setAddresses(prev => prev.map(addr => {
        if (addr.id === editingAddress.id) {
            return { ...data, id: editingAddress.id };
        }
        // If the updated address is set to default, unset others
        if (data.isDefault) {
            return { ...addr, isDefault: false };
        }
        return addr;
      }));
    } else {
      // Add new
      const newAddress = { ...data, id: Date.now() };
      if (data.isDefault) {
        setAddresses(prev => prev.map(addr => ({ ...addr, isDefault: false })).concat(newAddress));
      } else {
        setAddresses(prev => [...prev, newAddress]);
      }
    }
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t('address.title') || 'Billing Address Management'}</h1>
          <p className="text-gray-500 mt-1">{t('address.subtitle') || 'Manage your billing addresses for faster checkout.'}</p>
        </div>
        <button 
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm font-medium"
        >
          <Plus className="w-5 h-5" />
          {t('address.add_new') || 'Add New Address'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {addresses.map(addr => (
          <div 
            key={addr.id} 
            className={`relative p-6 rounded-xl border-2 transition-all duration-200 group ${
              addr.isDefault 
                ? 'border-indigo-600 bg-indigo-50/10 shadow-md' 
                : 'border-gray-100 bg-white hover:border-gray-200 hover:shadow-md'
            }`}
          >
            {/* Header / Actions */}
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-2">
                <span className="font-bold text-gray-900 text-lg">
                    {addr.firstName} {addr.lastName}
                </span>
                {addr.isDefault && (
                    <span className="bg-indigo-100 text-indigo-700 text-xs px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                        <Star className="w-3 h-3 fill-current" /> Default
                    </span>
                )}
              </div>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                    onClick={() => handleEdit(addr)}
                    className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-gray-100 rounded-lg transition-colors"
                    title={t('common.edit') || "Edit"}
                >
                    <Edit2 className="w-4 h-4" />
                </button>
                <button 
                    onClick={() => handleDelete(addr.id)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title={t('common.delete') || "Delete"}
                >
                    <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Address Details */}
            <div className="space-y-2 text-sm text-gray-600">
                {addr.company && (
                    <div className="flex items-center gap-2 text-gray-500 font-medium">
                        <Building2 className="w-4 h-4" /> {addr.company}
                    </div>
                )}
                <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-gray-400" />
                    <div>
                        <p>{addr.address1}</p>
                        {addr.address2 && <p>{addr.address2}</p>}
                        <p>{addr.city}, {addr.state} {addr.zip}</p>
                        <p className="font-medium text-gray-900 mt-0.5">{addr.country}</p>
                    </div>
                </div>
                {addr.phone && (
                    <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        {addr.phone}
                    </div>
                )}
            </div>

            {/* Set Default Button */}
            {!addr.isDefault && (
                <div className="mt-6 pt-4 border-t border-gray-100 opacity-60 group-hover:opacity-100 transition-opacity">
                    <button 
                        onClick={() => handleSetDefault(addr.id)}
                        className="text-sm font-medium text-indigo-600 hover:text-indigo-800 flex items-center gap-1.5"
                    >
                        {t('address.set_as_default') || "Set as Default Address"}
                    </button>
                </div>
            )}
          </div>
        ))}

        {/* Empty State (Add New Card) */}
        <button 
            onClick={handleAdd}
            className="flex flex-col items-center justify-center p-6 rounded-xl border-2 border-dashed border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/30 transition-all group min-h-[200px]"
        >
            <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mb-3 group-hover:bg-indigo-100 transition-colors">
                <Plus className="w-6 h-6 text-gray-400 group-hover:text-indigo-600" />
            </div>
            <span className="font-bold text-gray-900">{t('address.add_new') || "Add New Address"}</span>
            <span className="text-sm text-gray-500 mt-1">{t('address.add_new_desc') || "Add a billing address for faster checkout"}</span>
        </button>
      </div>

      <AddressModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        initialData={editingAddress}
        title={editingAddress ? (t('address.edit_title') || 'Edit Billing Address') : (t('address.add_title') || 'Add New Billing Address')}
      />
    </div>
  );
};

export default AddressManagement;






























