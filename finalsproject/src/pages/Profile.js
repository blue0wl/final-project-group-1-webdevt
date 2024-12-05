import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar'; // Import Sidebar
import './css-components/Profile.css';
import ReportMessage from '../components/public/data/ReportMessage';

const Profile = ({ userList, setUserList, logList, setLogList, setReservationList, setReturnList }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state || {};

  console.log("Location state:", location.state);

  // Handle edit and delete actions
  const handleEdit = () => {
    navigate("/admin/profile/edit", { state: { ...user } });
  };

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

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      // Find the user to be deleted
      const deletedUser = userList.find((u) => u.email === user.email);
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
          selectedUser={deletedUser}
        />
      );

      // Add the log entry
      const logEntry = {
        user: user.name || 'Unknown User',
        email: user.email || 'Unknown Email',
        role: user.role || 'Unknown Role',
        activity: activityMessage,
        target: deletedUser.email,
        timestamp,
      };
      setLogList((prev) => [...prev, logEntry]);

      // Remove the user from the list
      const updatedUserList = userList.filter((u) => u.email !== user.email);
      setUserList(updatedUserList);
      
      handleDeleteRemnant(deletedUser);

      alert("User deleted successfully!");
      navigate("/");
    }
  };
  const { role, email, name } = location.state || {};

  if (!role || !email) {
    return <p>Error: Missing role or email.</p>;
  }

  return (
    <div className="dashboard-container">
      <Sidebar role={role} user={location.state} setLogList={setLogList}/>
      <main className="profile-content">
        <h2 className="profile-title">User Profile</h2>
        <div className="profile-card">
          <div className="profile-image-container">
            <img src={user.image || 'https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg'} className="profile-img" />
          </div>
          <div className="profile-details">
            <h3 className="profile-name">{user.name}</h3>
            <p className="profile-role">{user.role}</p>
            <p className="profile-email">{user.email}</p>
          </div>
        </div>

        <div className="profile-actions">
          <button className="action-btn edit-btn" onClick={handleEdit}>
            Edit User
          </button>
          <button className="action-btn delete-btn" onClick={handleDelete}>
            Delete User
          </button>
        </div>
      {/*
        <button className="back-btn" onClick={() => navigate(-1)}>
          Back
        </button>
      */}
      </main>
    </div>
  );
};

export default Profile;
