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
          {/* Main Role Buttons */}
          <button className="login-link" onClick={() => navigate('/admin-login')}>Admin</button>
          <button className="login-link" onClick={() => navigate('/librarian-login')}>Librarian</button>
          <button className="login-link" onClick={() => navigate('/borrower-login')}>Borrower</button>
          {/* TEMPORARY webpage testing */}
          <button className="login-link" onClick={() => navigate('/user-list')}>User List</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
