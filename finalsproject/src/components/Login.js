import React from 'react';
import { useNavigate, useLocation} from 'react-router-dom';
import './css-components/Login.css'; 

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  console.log("Location state:", location.state);

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
        </div>
      </div>
    </div>
  );
};

export default Login;
