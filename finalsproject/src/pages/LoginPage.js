import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ role, dashboardPath }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // In a real app, you’d validate the email and password (e.g., via an API call).
    if (email && password) {
      localStorage.setItem('email', email); // Store email for use in dashboards
      navigate(dashboardPath); // Redirect to the respective dashboard
    } else {
      alert('Please enter valid credentials');
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <h1 className="title">{role} Login</h1>
        <input
          type="email"
          placeholder={`Enter ${role} Email`}
          className="login-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter Password"
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="login-btn" onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default LoginPage;
