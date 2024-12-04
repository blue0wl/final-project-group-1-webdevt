import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; 
import './css-components/Sidebar.css'; 
import ReportMessage from './public/data/ReportMessage';

const Sidebar = ({ role, logList, setLogList }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const user = location.state || {};

  const normalizedRole = role?.toLowerCase();
  
  const menuItems = {
    admin: ['Dashboard', 'Profile', 'Manage Users', 'Reports'],
    librarian: ['Dashboard', 'Profile', 'Borrower List', 'Librarian Logs', 'Manage Books', 'Reservations', 'Returns'],
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

  // Helper function to create a "logout" report
  const createLogoutReport = () => {
    const timestamp = new Date().toLocaleString();
    
    // Generate the activity message using ReportMessage
    const activityMessage = (
      <ReportMessage
        user={user.name || 'Unknown User'}
        email={user.email || 'Unknown Email'}
        role={user.role || 'Unknown Role'}
        report="logout"
        timestamp={timestamp}
      />
    );

    console.log(
      "User: ", user.name,
      "Email: ", user.email,
      "Role: ", user.role,
      "Activity: ", activityMessage,
      "Timestamp: ", timestamp,
  );
    
    const logoutReport = {
      user: user.name || 'Unknown User',
      email: user.email || 'Unknown Email',
      role: user.role || 'Unknown Role',
      activity: activityMessage,
      timestamp: timestamp,
    };

    setLogList((logList) => [...logList, logoutReport]);
  };

  const handleLogout = () => {
    createLogoutReport();
    navigate("/", { replace: true });
  };

  // Detect when the user navigates back to the login page
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (location.pathname !== '/') {
        createLogoutReport();
      }
    };

    window.addEventListener('popstate', handleBeforeUnload);
    return () => {
      window.removeEventListener('popstate', handleBeforeUnload);
    };
  }, [location, setLogList, user, role]);

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
