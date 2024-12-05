import './css-components/UpdateUser.css';
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ReportMessage from './public/data/ReportMessage';

function UpdateUser({ userList, setUserList, setLogList }) {
    const location = useLocation();
    const navigate = useNavigate();

    console.log("Location State: ", location.state)

    const { email } = location.state || {}; // Get the email from state
    const [userData, setUserData] = useState({ name: '', email: '', password: '', image: '', role: '' });
    const [originalUserData, setOriginalUserData] = useState({});
    const [notification, setNotification] = useState('');

    useEffect(() => {
        // Find the user by email
        const user = userList.find(user => user.email === email);
        if (user) {
            // If user exists, pre-fill the form with the user's data
            const initialData = {
                name: user.name,
                email: user.email,
                password: user.password,
                image: user.image,
                role: user.role
            };
            setUserData(initialData);
            setOriginalUserData(initialData);
        } else {
            setNotification("User not found.");
        }
    }, [email, userList]);

    const isUpdateDisabled = () => {
        return (
            userData.name === originalUserData.name &&
            userData.email === originalUserData.email &&
            userData.password === originalUserData.password &&
            userData.image === originalUserData.image &&
            userData.role === originalUserData.role
        );
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData((prev) => ({ ...prev, [name]: value }));
    };

    const validatePassword = (password) => {
        return password.length >= 6; 
    };

    const handleSubmit = () => {
        if (!userData.name.trim() || !userData.password.trim()) {
            alert("Please fill out all fields correctly.");
            return;
        }

        if (!validatePassword(userData.password)) {
            alert("Password must be at least 6 characters long.");
            return;
        }

        const updatedUserList = userList.map((user) =>
            user.email === email ? { ...user, ...userData } : user
        );
        setUserList(updatedUserList);

        const timestamp = new Date().toLocaleString();
        const activityMessage = (
            <ReportMessage
                user={location.state.mainUser || 'Unknown User'}
                email={location.state.mainEmail || 'Unknown Email'}
                role={location.state.mainRole || 'Unknown Role'}
                report="update-user"
                timestamp={timestamp}
                newUser={userData} // Passing updated user data for the report
            />
        );

        // Add the log entry
        const logEntry = {
            user: location.state.mainUser || 'Unknown User',
            email: location.state.mainEmail || 'Unknown Email',
            role: location.state.mainRole || 'Unknown Role',
            activity: activityMessage,
            target: userData.email,
            timestamp,
        };
        setLogList((prev) => [...prev, logEntry]);

        setNotification(`User "${userData.name}" has been updated successfully!`);
    };

    const handleBack = () => {
        navigate(-1); 
    };

    useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => setNotification(""), 5000); 
            return () => clearTimeout(timer);
        }
    }, [notification]);

    return (
        <div className="update-user-background">
            <div className="update-user-container ms-3 mb-3">
                <h2>Update User</h2>
                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        className="form-control"
                        value={userData.name}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        className="form-control"
                        value={userData.email}
                        onChange={handleInputChange}
                        disabled
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        className="form-control"
                        value={userData.password}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>Profile Image</label>
                    <input
                        type="text"
                        name="image"
                        className="form-control"
                        value={userData.image}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>Role</label>
                    <select
                        name="role"
                        className="form-control"
                        value={userData.role}
                        onChange={handleInputChange}
                    >
                        <option value="Admin">Admin</option>
                        <option value="Librarian">Librarian</option>
                        <option value="Borrower">Borrower</option>
                    </select>
                </div>
                {notification && <p className="notification">{notification}</p>}
                <button className="btn btn-success" onClick={handleSubmit} disabled={isUpdateDisabled()}>
                    Submit
                </button>
                <button className="btn btn-secondary" onClick={handleBack}>
                    Back
                </button>
            </div>
        </div>
    );
}

export default UpdateUser;
