import './css-components/LoginPage.css';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage({ role, dashboardPath, userList }) {
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
            navigate(dashboardPath, {
                state: { ...user }, 
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
        <div className="login-page-container">
            <h2>{role} Login</h2>
            <div className="form-group">
                <label>Email</label>
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
                <label>Password</label>
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
                <button className="btn btn-primary login-button" onClick={handleLogin}>
                    Login
                </button>
                <button className="btn btn-secondary back-button" onClick={handleBack}>
                    Back
                </button>
            </div>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
}

export default LoginPage;
