import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import DashboardApp from './DashboardApp';
import { StripePaymentSuccess } from './components/StripePaymentSuccess';
import { StripePaymentCancel } from './components/StripePaymentCancel';
import './index.css';

console.log('[Dashboard Main] Dashboard entry point loaded!');

// Create root and render dashboard
const root = ReactDOM.createRoot(document.getElementById('dashboard-root'));

root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <BrowserRouter>
        <Routes>
          {/* Stripe payment callback routes */}
          <Route path="/payment/success" element={<StripePaymentSuccess />} />
          <Route path="/payment/cancel" element={<StripePaymentCancel />} />

          {/* Default route - render dashboard app */}
          <Route path="/*" element={<DashboardApp />} />
        </Routes>
      </BrowserRouter>
    </I18nextProvider>
  </React.StrictMode>
);

console.log('[Dashboard Main] Dashboard rendered!');
