import './css-components/CreateUser.css';
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CreateUser({ userList, setUserList }) {
    const [newUser, setNewUser] = useState({ name: "", email: "", password: "", image: "", role: "Admin" });
    const [notification, setNotification] = useState("");
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUser((prev) => ({ ...prev, [name]: value }));
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex
        return emailRegex.test(email);
    };

    const handleSubmit = () => {
        if (!newUser.name.trim() || !newUser.email.trim() || !newUser.password.trim() || !newUser.image.trim()) {
            alert("Please fill out all fields correctly.");
            return;
        }

        if (!validateEmail(newUser.email)) {
            alert("Please enter a valid email address.");
            return;
        }

        const isDuplicateEmail = userList.some((user) => user.email === newUser.email);
        if (isDuplicateEmail) {
            alert("This email is already registered. Please use a unique email.");
            return;
        }

        setUserList((prev) => [...prev, newUser]);
        setNotification(`User "${newUser.name}" has been successfully registered!`);
        setNewUser({ name: "", email: "", password: "", image: "", role: "Admin" }); // Reset fields
    };

    // Clear the notification message after a few seconds
    useEffect(() => {
      if (notification) {
        const timer = setTimeout(() => setNotification(""), 5000); // Clear after 5 seconds
        return () => clearTimeout(timer);
      }
    }, [notification]);

    const handleBack = () => {
        navigate(-1); // Navigates to the previous page
    };

    return (
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
            <button className="btn btn-secondary back-button" onClick={handleBack}>
                Back
            </button>
        </div>
    );
}

export default CreateUser;
