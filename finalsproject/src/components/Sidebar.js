import React from 'react';
import { Link } from 'react-router-dom'; // Using Link for navigation
import './css-components/Sidebar.css'; // Custom CSS for Sidebar

const Sidebar = ({ role }) => {
  const menuItems = {
    admin: ['Dashboard', 'Manage Librarians', 'Reports'],
    librarian: ['Dashboard', 'Manage Books', 'Reservations', 'Returns'],
    borrower: ['Dashboard', 'Search Books', 'Borrowing Logs'],
  };

  return (
    <aside className="sidebar-container">
      <h2 className="sidebar-title">{role} Menu</h2>
      <ul className="sidebar-menu">
        {menuItems[role.toLowerCase()].map((item, index) => (
          <li key={index} className="sidebar-item">
            <Link 
              to={`/${role.toLowerCase()}/${item.toLowerCase().replace(' ', '-')}`} 
              className="sidebar-link"
            >
              {item}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
