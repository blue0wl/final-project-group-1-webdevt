import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import './css-components/Sidebar.css'; 

const Sidebar = ({ role, user }) => {
  const navigate = useNavigate();
  
  const normalizedRole = role?.toLowerCase();
  
  const menuItems = {
    admin: ['Dashboard', 'Profile', 'Manage Users', 'Reports'],
    librarian: ['Dashboard', 'Profile', 'Manage Books', 'Reservations', 'Returns'],
    borrower: ['Dashboard', 'Profile', 'Search Books', 'Borrowing Logs'],
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

  const handleLogout = () => {
    navigate("/"); 
  };

  // Navigate to selected menu item and pass user info in location.state
  const handleNavigate = (path) => {
    navigate(path, { state: { ...user } });
  };

  return (
    <aside className="sidebar-container">
      <h2 className="sidebar-title">{role} Menu</h2>
      <ul className="sidebar-menu">
        {menuItems[normalizedRole].map((item, index) => {
          // Dynamically create the route path
          const routePath = `/${normalizedRole}/${item.toLowerCase().replace(' ', '-')}`;

          return (
            <li key={index} className="sidebar-item">
              <button 
                onClick={() => handleNavigate(routePath)} // Navigate with state
                className="sidebar-link"
              >
                {item}
              </button>
            </li>
          );
        })}
      </ul>

      {/* Logout Button */}
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>

    </aside>
  );
};

export default Sidebar;
