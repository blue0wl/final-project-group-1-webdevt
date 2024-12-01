import './css-components/UpdateUser.css';
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function LowerAdminUpdate({ userList, setUserList }) {
    const location = useLocation();
    const navigate = useNavigate();
    const user = location.state || {};  
    console.log("Location state:", location.state); 
    
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: '',
        image: '',
        role: ''
    });
    const [notification, setNotification] = useState('');

    useEffect(() => {
        if (user && user.email) {
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
    }, [user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData((prev) => ({ ...prev, [name]: value }));
    };

    const validateInputs = () => {
        if (!userData.name || userData.name.trim() === "") {
            return "Name is required.";
        }
        if (!userData.password || userData.password.length < 6) {
            return "Password must be at least 6 characters.";
        }
        return null; 
    };

    const handleSubmit = () => {
        const validationError = validateInputs();
        if (validationError) {
            setNotification(validationError);
            return;
        }

        const updatedUserList = userList.map((existingUser) =>
            existingUser.email === userData.email ? { ...existingUser, ...userData } : existingUser
        );
        setUserList(updatedUserList);
        
        // Update the state to reflect the new user data
        setNotification(`User "${userData.name}" has been updated successfully!`);

        // Pass updated user data back to Profile page
        navigate("/admin/dashboard", { state: { ...userData } });
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
                    disabled  
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
        </div>
    );
}

export default LowerAdminUpdate;
