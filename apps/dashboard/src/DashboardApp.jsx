import React from 'react';
import DashboardApp from './App';
import { AuthProvider } from './contexts/AuthContext';
import './index.css';
import './i18n'; // Import i18n configuration

// Dashboard App wrapper component
// This wraps the dashboard app with necessary providers (Auth, i18n)
function DashboardAppComponent() {
  return (
    <AuthProvider>
      <DashboardApp />
    </AuthProvider>
  );
}

export default DashboardAppComponent;
