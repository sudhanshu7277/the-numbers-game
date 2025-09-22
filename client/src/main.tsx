import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import './i18n';
import App from './App';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/AdminDashboard';
// import AdminDashboard from './components/AdminDashboard';


ReactDOM.createRoot(document.getElementById('root')!).render(
<React.StrictMode>
<BrowserRouter>
<Routes>
<Route path="/" element={<App />} />
<Route path="/dashboard" element={<Dashboard />} />
<Route path="/admin" element={<AdminDashboard />} />
</Routes>
</BrowserRouter>
</React.StrictMode>
);