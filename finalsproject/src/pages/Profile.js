import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './css-components/Profile.css';

const Profile = ({ userList, setUserList }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state || {}; 

  console.log("Location state:", location.state); 

  // Handle edit and delete actions
  const handleEdit = () => {
    navigate("/admin/profile/edit", { state: { ...user } });
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      const updatedUserList = userList.filter(u => u.email !== user.email); 
      setUserList(updatedUserList);
      alert("User deleted successfully!");
      navigate("/"); 
    }
  };

  return (
    <div className="profile-container">
      <h2 className="profile-title">User Profile</h2>
      <div className="profile-card">
        <div className="profile-image-container">
          <img src={user.image} alt="Profile" className="profile-img" />
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
      
      <button className="back-btn" onClick={() => navigate(-1)}>
        Back
      </button>
    </div>
  );
};

export default Profile;
