import React from 'react';
import { useNavigate } from 'react-router-dom';
import './css-components/Login.css'; // Include the updated custom CSS for styling

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="login-container">
      <div className="login-content">
        <h1 className="title">Library Management System</h1>
        <p className="subtitle">Choose your role to continue</p>
        <div className="links-container">
          <button className="login-link" onClick={() => navigate('/admin-login')}>Admin</button>
          <button className="login-link" onClick={() => navigate('/librarian-login')}>Librarian</button>
          <button className="login-link" onClick={() => navigate('/borrower-login')}>Borrower</button>
          {/* For testing direct dashboard navigation */}
          <button className="login-link" onClick={() => navigate('/admin-dashboard')}>Admin Dashboard</button>
          <button className="login-link" onClick={() => navigate('/librarian-dashboard')}>Librarian Dashboard</button>
          <button className="login-link" onClick={() => navigate('/borrower-dashboard')}>Borrower Dashboard</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
