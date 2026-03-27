import React from 'react';
import { useTranslation } from 'react-i18next';

const JoinPage = () => {
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
      <h1>{t('加入我们 - 页面建设中')}</h1>
    </div>
  );
};

export default JoinPage;

