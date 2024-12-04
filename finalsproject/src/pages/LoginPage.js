import './css-components/LoginPage.css';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReportMessage from '../components/public/data/ReportMessage';

function LoginPage({ role, dashboardPath, userList, logList, setLogList}) {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCredentials((prev) => ({ ...prev, [name]: value }));
    };
    
    const handleLogin = () => {
        const user = userList.find(
            (u) =>
                u.email === credentials.email &&
                u.password === credentials.password &&
                u.role.toLowerCase() === role.toLowerCase() 
        );
    
        if (user) {
            // Log the login action
            const timestamp = new Date().toLocaleString();
            const activityMessage = (
                <ReportMessage
                    user={user.name || 'Unknown User'}
                    email={user.email || 'Unknown Email'}
                    role={user.role || 'Unknown Role'}
                    report="login"
                    timestamp={timestamp}
                />
            );
    
            const logEntry = {
                user: user.name || 'Unknown User',
                email: user.email || 'Unknown Email',
                role: user.role || 'Unknown Role',
                activity: activityMessage,
                timestamp,
            };
            setLogList((prev) => [...prev, logEntry]);
    
            // Navigate to the dashboard and replace the current history entry
            navigate(dashboardPath, {
                state: { ...user },
                replace: true,  // Replace the history entry to prevent going back
            });
        } else {
            setError("Invalid email, password, or role. Please try again.");
        }
    };    
    
    const handleBack = () => {
        navigate("/"); 
    };

    console.log("Location state:", location.state); 
    
    return (
        <div className="login-page-background">
        <div className="login-page-container">
            <h2>{role} Login</h2>
            <div className="form-group">
                <label className='login-color'>Email</label>
                <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    className="form-control"
                    value={credentials.email}
                    onChange={handleInputChange}
                />
            </div>
            <div className="form-group">
                <label className='login-color'>Password</label>
                <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    className="form-control"
                    value={credentials.password}
                    onChange={handleInputChange}
                />
            </div>
            <div className="button-group">
                <button className="btn login-button" onClick={handleLogin}>
                    Login
                </button>
                <button className="btn back-button" onClick={handleBack}>
                    Back
                </button>
            </div>
            {error && <p className="error-message">{error}</p>}
        </div>
        </div>
    );
}

export default LoginPage;
