import './css-components/UserList.css';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import ReportMessage from './public/data/ReportMessage';

function BorrowerUserList({ userList, setUserList, logList, setLogList, setReservationList, setReturnList }) {
    const location = useLocation();
    const navigate = useNavigate();
    const user = location.state || {};

    console.log("Location state:", location.state);

    const [searchTerm, setSearchTerm] = useState('');
    const [notification, setNotification] = useState('');
    const [reportData, setReportData] = useState(null); // State to handle ReportMessage data
    
    const handleDeleteRemnant = (item) => {
        if (item) {
          // Determine if item is a user or book and perform the deletion accordingly
          if (item.type === 'user') {
            // Delete from userList
            setUserList(prev => prev.filter(user => user.email !== item.email));
      
            // Delete corresponding entries from reservationList and returnList
            setReservationList(prev => prev.filter(reservation => reservation.email !== item.email));
            setReturnList(prev => prev.filter(returnItem => returnItem.email !== item.email));
      
          } else if (item.type === 'book') {
            // Delete from bookList
            setBookList(prev => prev.filter(book => book.bookID !== item.bookID));
      
            // Delete corresponding entries from reservationList and returnList
            setReservationList(prev => prev.filter(reservation => reservation.bookID !== item.bookID));
            setReturnList(prev => prev.filter(returnItem => returnItem.bookID !== item.bookID));
          }
      
          // Optionally, generate a report or log the deletion
          const timestamp = new Date().toLocaleString();
          const logMessage = `${item.type} deleted at ${timestamp}`;
          setLogList(prev => [...prev, { activity: logMessage, timestamp }]);
        }
      };

    const handleDelete = (email) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this account?');

        if (confirmDelete) {
            // Find the user to be deleted
            const deletedUser = userList.find((u) => u.email === email);
            deletedUser.type = 'user';

            // Log the deletion action
            const timestamp = new Date().toLocaleString();

            // Generate the activity message using ReportMessage
            const activityMessage = (
                <ReportMessage
                    user={user.name || 'Unknown User'}
                    email={user.email || 'Unknown Email'}
                    role={user.role || 'Unknown Role'}
                    report="delete-user"
                    timestamp={timestamp}
                    selectedUser= {deletedUser}
                />
            );

            const logEntry = {
                user: user.name || 'Unknown User', // Current user's name
                email: user.email || 'Unknown Email', // Current user's email
                role: user.role || 'Unknown Role', // Current user's role
                activity: activityMessage, // Activity performed
                target: deletedUser.email, // The target user’s email
                timestamp, // Timestamp of the action
            };
            setLogList((prev) => [...prev, logEntry]);

            // Remove the user from the list
            const updatedUserList = userList.filter((u) => u.email !== email);
            setUserList(updatedUserList);
            
            handleDeleteRemnant(deletedUser);

            setNotification('User deleted successfully!');
            setTimeout(() => setNotification(''), 5000);
        }
    };

    const handleAddUser = () => {
        navigate('/create-user', { state: { ...user } });
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredUsers = userList.filter(
        (u) =>
            u.email !== user.email &&
            u.role === 'Borrower' && // Filter only Borrower users
            u.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <body className='user-body'>
            <div className="user-list-dashboard-container">
                <Sidebar role={location.state.role} user={user} logList={logList} setLogList={setLogList} />
                <div className="main-content">
                    <div className="user-list-container">
                        <h2>Borrower User List</h2>
                        <div className="action-bar">
                            <button className="btn btn-success mb-3" onClick={handleAddUser}>
                                Add User +
                            </button>
                        </div>
                        <input
                            type="text"
                            className="search-bar"
                            placeholder="Search borrowers by name"
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                        <table className="user-table">
                            <thead>
                                <tr>
                                    <th>Profile</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map((u) => (
                                    <tr key={u.email}>
                                        <td>
                                            <img
                                                src={
                                                    u.image ||
                                                    'https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg'
                                                }
                                                alt={`${u.name}'s profile`}
                                                className="profile-image"
                                            />
                                        </td>
                                        <td>{u.name}</td>
                                        <td>{u.email}</td>
                                        <td>{u.role}</td>
                                        <td>
                                            <button
                                                className="btn btn-danger"
                                                onClick={() => handleDelete(u.email)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {notification && <p className="notification">{notification}</p>}
                    </div>
                </div>
            </div>
        </body>
    );
}

export default BorrowerUserList;
