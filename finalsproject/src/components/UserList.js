import './css-components/UserList.css';
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function UserList({ userList, setUserList }) {
    const [notification, setNotification] = useState("");
    const navigate = useNavigate();

    // Clear the notification message after a few seconds
    useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => setNotification(""), 5000); // Clear after 5 seconds
            return () => clearTimeout(timer);
        }
    }, [notification]);

    const handleAddUser = () => {
        navigate("/create-user");
    };

    const handleEditUser = (email) => {
        navigate("/update-user", { state: { email } });
    };

    const handleDeleteUser = (email) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        if (confirmDelete) {
            setUserList((prevList) => prevList.filter((user) => user.email !== email));
            setNotification("User has been successfully deleted!"); // Show notification on delete
        }
    };

    const handleBack = () => {
        navigate(-1); // Navigates to the previous page
    };

    return (
        <div className="user-list-container">
            <h2>User List</h2>
            <div className="action-bar">
                <button className="btn btn-success mb-3" onClick={handleAddUser}>
                    Add User
                </button>
            </div>
            <table className="user-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Profile Image</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {userList.map((user, index) => (
                        <tr key={index}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>
                                <img
                                    src={user.image}
                                    alt={`${user.name}'s profile`}
                                    className="profile-image"
                                />
                            </td>
                            <td>
                                <button
                                    className="btn btn-primary action-button me-3"
                                    onClick={() => handleEditUser(user.email)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="btn btn-danger action-button"
                                    onClick={() => handleDeleteUser(user.email)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {notification && <p className="notification">{notification}</p>} {/* Display notification */}
            <button className="btn btn-secondary back-button" onClick={handleBack}>
                Back
            </button>
        </div>
    );
}

export default UserList;
