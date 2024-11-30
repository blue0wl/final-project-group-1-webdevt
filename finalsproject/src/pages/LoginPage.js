import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ role, dashboardPath }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // In a real app, you'd check the credentials here
    if (username && password) {
      // Simulate successful login
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
          type="text"
          placeholder={`Enter ${role} Username`}
          className="login-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder={`Enter ${role} Password`}
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
