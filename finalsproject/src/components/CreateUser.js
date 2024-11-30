import React, { useState } from 'react';

function CreateUser({ userList, setUserList }) {
    const [newUser, setNewUser] = useState({ name: '', email: '', password: '', image: '', role: 'Admin' });
    const [notification, setNotification] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUser((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        if (
            newUser.name.trim() &&
            newUser.email.trim() &&
            newUser.password.trim() &&
            newUser.image.trim()
        ) {
            const isDuplicateEmail = userList.some((user) => user.email === newUser.email);

            if (isDuplicateEmail) {
                alert('This email is already registered. Please use a unique email.');
                return;
            }

            setUserList((prev) => [...prev, newUser]);
            setNotification(`User "${newUser.name}" has been successfully registered!`);
            setNewUser({ name: '', email: '', password: '', image: '', role: 'Admin' }); // Reset fields
        } else {
            alert('Please fill out all fields correctly.');
        }
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
            <button className="btn btn-success" onClick={handleSubmit}>
                Submit
            </button>
            {notification && <p className="notification">{notification}</p>}
        </div>
    );
}

export default CreateUser;
