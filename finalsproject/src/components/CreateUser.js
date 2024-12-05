import './css-components/CreateUser.css';
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ReportMessage from './public/data/ReportMessage'; 

function CreateUser({ userList, setUserList, logList, setLogList }) {
    const [newUser, setNewUser] = useState({ name: "", email: "", password: "", image: "", role: "Borrower" });
    const [notification, setNotification] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const user = location.state || {};

    console.log("Location State: ", location.state)

    useEffect(() => {
        if (user.role === "Librarian") {
            setNewUser((prev) => ({ ...prev, role: "Borrower" }));
        }
    }, [user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUser((prev) => ({ ...prev, [name]: value }));
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        return password.length >= 6; 
    };

    const handleSubmit = () => {
        if (!newUser.name.trim() || !newUser.email.trim() || !newUser.password.trim()) {
            alert("Please fill out all fields correctly.");
            return;
        }

        if (!validateEmail(newUser.email)) {
            alert("Please enter a valid email address.");
            return;
        }

        if (!validatePassword(newUser.password)) {
            alert("Password must be at least 6 characters long.");
            return;
        }

        const isDuplicateEmail = userList.some((user) => user.email === newUser.email);
        if (isDuplicateEmail) {
            alert("This email is already registered. Please use a unique email.");
            return;
        }

        // Adding the new user to the user list
        setUserList((prev) => [...prev, newUser]);
        setNotification(`User "${newUser.name}" has been successfully registered!`);

        // Log the user addition event
        const timestamp = new Date().toLocaleString();
        const activityMessage = (
            <ReportMessage
                user={user.name || 'Unknown User'}
                email={user.email || 'Unknown Email'}
                role={user.role || 'Unknown Role'}
                report="add-user"
                timestamp={timestamp}
                newUser={newUser}
            />
        );

        const logEntry = {
            user: user.name || 'Unknown User', // Current user's name
            email: user.email || 'Unknown Email', // Current user's email
            role: user.role || 'Unknown Role', // Current user's role
            activity: activityMessage, // Activity performed
            target: newUser.email, // The newly added user's email
            timestamp, // Timestamp of the action
        };
        setLogList((prev) => [...prev, logEntry]);

        // Reset the newUser form
        setNewUser({ name: "", email: "", password: "", image: "", role: "Borrower" });
    };

    useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => setNotification(""), 5000); 
            return () => clearTimeout(timer);
        }
    }, [notification]);

    const handleBack = () => {
        navigate(-1); 
    };

    return (
        <div className='create-user-background'>
            <div className="create-user-container">
                <h2>Register User</h2>
                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter Name"
                        className="form-control"
                        value={newUser.name}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter Email"
                        className="form-control"
                        value={newUser.email}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter Password"
                        className="form-control"
                        value={newUser.password}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>Profile Image</label>
                    <input
                        type="text"
                        name="image"
                        placeholder="Enter Image Link"
                        className="form-control"
                        value={newUser.image}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>Role</label>
                    <select
                        name="role"
                        className="form-control"
                        value={newUser.role}
                        onChange={handleInputChange}
                        disabled={user.role === "Librarian"} 
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

export default CreateUser;
