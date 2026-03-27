import React from 'react';
import { useTranslation } from 'react-i18next';

const StaticResidentialPage = () => {
  const { t } = useTranslation();
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      backgroundColor: '#0f172a', 
      color: '#fff' 
    }}>
      <h1>{t('静态住宅代理 - 页面建设中')}</h1>
    </div>
  );
};

export default StaticResidentialPage;

