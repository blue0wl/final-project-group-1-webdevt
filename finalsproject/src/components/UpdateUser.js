import './css-components/UpdateUser.css';
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function UpdateUser({ userList, setUserList }) {
    const location = useLocation();
    const navigate = useNavigate();
    
    const { email } = location.state || {}; // Get the email from state
    const [userData, setUserData] = useState({ name: '', email: '', password: '', image: '', role: '' });
    const [notification, setNotification] = useState('');

    useEffect(() => {
        // Find the user by email
        const user = userList.find(user => user.email === email);
        if (user) {
            // If user exists, pre-fill the form with the user's data
            setUserData({ 
                name: user.name, 
                email: user.email, 
                password: user.password, 
                image: user.image, 
                role: user.role 
            });
        } else {
            setNotification("User not found.");
        }
    }, [email, userList]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        const updatedUserList = userList.map((user) =>
            user.email === email ? { ...user, ...userData } : user
        );
        setUserList(updatedUserList);
        setNotification(`User "${userData.name}" has been updated successfully!`);
    };

    const handleBack = () => {
        navigate(-1); // Goes back to the previous page
    };

    // Clear the notification after a few seconds
    useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => setNotification(""), 5000); // Clear after 5 seconds
            return () => clearTimeout(timer);
        }
    }, [notification]);

    return (
        <div className="update-user-container">
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
            <button className="btn btn-success" onClick={handleSubmit}>
                Submit
            </button>
            <button className="btn btn-secondary" onClick={handleBack}>
                Back
            </button>
            
        </div>
    );
}

export default UpdateUser;
