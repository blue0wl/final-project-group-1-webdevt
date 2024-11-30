import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';

//--------------Login Pages--------------------------
import LoginPage from './pages/LoginPage';  // Using the dynamic LoginPage component

//--------------Dashboard Pages--------------------------
import AdminDashboard from './pages/AdminDashboard';
import LibrarianDashboard from './pages/LibrarianDashboard';
import BorrowerDashboard from './pages/BorrowerDashboard';

const App = () => {
  return (
    <Routes>
      {/* Login page */}
      <Route path="/" element={<Login />} />

      {/* Role-based Login Options */}
      <Route path="/admin-login" element={<LoginPage role="Admin" dashboardPath="/admin-dashboard" />} />
      <Route path="/librarian-login" element={<LoginPage role="Librarian" dashboardPath="/librarian-dashboard" />} />
      <Route path="/borrower-login" element={<LoginPage role="Borrower" dashboardPath="/borrower-dashboard" />} />

      {/* Dashboard Pages */}
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/librarian-dashboard" element={<LibrarianDashboard />} />
      <Route path="/borrower-dashboard" element={<BorrowerDashboard />} />
    </Routes>
  );
};

export default App;
