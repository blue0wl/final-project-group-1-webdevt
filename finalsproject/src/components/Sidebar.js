import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Using useNavigate for redirect
import './css-components/Sidebar.css'; // Custom CSS for Sidebar

const Sidebar = ({ role }) => {
  const navigate = useNavigate(); // Initialize navigate hook
  const normalizedRole = role?.toLowerCase();

  const menuItems = {
    admin: ['Dashboard', 'Manage Librarians', 'Reports'],
    librarian: ['Dashboard', 'Manage Books', 'Reservations', 'Returns'],
    borrower: ['Dashboard', 'Search Books', 'Borrowing Logs'],
  };

  // Handle case where the role does not match any key
  if (!menuItems[normalizedRole]) {
    return (
      <aside className="sidebar-container">
        <h2 className="sidebar-title">Invalid Role</h2>
        <p className="sidebar-error">No menu items available for the specified role.</p>
      </aside>
    );
  }

  // Logout function to clear session and redirect to home page
  const handleLogout = () => {
    navigate("/");
  };

  return (
    <aside className="sidebar-container">
      <h2 className="sidebar-title">{role} Menu</h2>
      <ul className="sidebar-menu">
        {menuItems[normalizedRole].map((item, index) => (
          <li key={index} className="sidebar-item">
            <Link 
              to={`/${normalizedRole}/${item.toLowerCase().replace(' ', '-')}`} 
              className="sidebar-link"
            >
              {item}
            </Link>
          </li>
        ))}
      </ul>
      {/* Logout Button */}
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;
