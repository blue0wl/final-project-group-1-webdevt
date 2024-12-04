import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import ReportMessage from '../components/public/data/ReportMessage'; // Import ReportMessage

function LowerAdminUpdate({ userList, setUserList, logList, setLogList }) {
    const location = useLocation();
    const navigate = useNavigate();
    const user = location.state || {};  
    
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: '',
        image: '',
        role: ''
    });
    const [originalUserData, setOriginalUserData] = useState({}); // Track original data
    const [notification, setNotification] = useState('');

    useEffect(() => {
        if (user && user.email) {
            const initialData = {
                name: user.name,
                email: user.email,
                password: user.password,
                image: user.image,
                role: user.role
            };
            setUserData(initialData);
            setOriginalUserData(initialData); // Set the initial values
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

    // Compare the current data with the original to determine if there are any changes
    const isUpdateDisabled = () => {
        return (
            userData.name === originalUserData.name &&
            userData.email === originalUserData.email &&
            userData.password === originalUserData.password &&
            userData.image === originalUserData.image &&
            userData.role === originalUserData.role
        );
    };

    const handleSubmit = () => {
        const validationError = validateInputs();
        if (validationError) {
            setNotification(validationError);
            return;
        }

        // Update the user list with the new user data
        const updatedUserList = userList.map((existingUser) =>
            existingUser.email === userData.email ? { ...existingUser, ...userData } : existingUser
        );
        setUserList(updatedUserList);
        
        // Log the successful update action
        const timestamp = new Date().toLocaleString();
        const activityMessage = (
            <ReportMessage
                user={userData.name || 'Unknown User'}
                email={userData.email || 'Unknown Email'}
                role={userData.role || 'Unknown Role'}
                report="update-user"
                timestamp={timestamp}
                newUser={userData} // Passing updated user data for the report
            />
        );

        // Add the log entry
        const logEntry = {
            user: userData.name || 'Unknown User',
            email: userData.email || 'Unknown Email',
            role: userData.role || 'Unknown Role',
            activity: activityMessage,
            target: userData.email,
            timestamp,
        };
        setLogList((prev) => [...prev, logEntry]);

        // Show notification of successful update
        setNotification(`User "${userData.name}" has been updated successfully!`);

        // Navigate back to the dashboard with updated user data
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
        <div className="dashboard-container">
            <Sidebar role={user.role} user={location.state} logList={logList} setLogList={setLogList} />
            <div className="main-content">
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
                    <button
                        className="btn btn-success"
                        onClick={handleSubmit}
                        disabled={isUpdateDisabled()}  // Disable button if no changes
                    >
                        Submit
                    </button>
                    <button className="btn btn-secondary" onClick={handleBack}>
                        Back
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LowerAdminUpdate;
