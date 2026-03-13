import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import DashboardApp from './DashboardApp';
// CSS is loaded via index.html - no need to import here

console.log('[Dashboard Main] Dashboard entry point loaded!');

// Create root and render dashboard
const root = ReactDOM.createRoot(document.getElementById('dashboard-root'));

root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <BrowserRouter>
        <DashboardApp />
      </BrowserRouter>
    </I18nextProvider>
  </React.StrictMode>
);

console.log('[Dashboard Main] Dashboard rendered!');
