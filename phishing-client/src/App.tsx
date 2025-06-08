// App.tsx
import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthForm from './auth/AuthForm';
import Dashboard from './phishing-dashboard/PhishingDashbard';

const App: React.FC = () => {
    const [token, setToken] = useState('');
  
  return (
    <Routes>
      <Route path="/" element={<AuthForm setToken={setToken}/>} />
      <Route path="/dashboard" element={<Dashboard token={token} />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
