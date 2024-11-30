import React from 'react';
import Sidebar from '../components/Sidebar';
import './css-components/AdminDashboard.css';

const AdminDashboard = ({ role, email }) => {
  return (
    <div className="admin-dashboard-container">
      <Sidebar role={role} />
      <main className="admin-dashboard-content">
        <h1 className="admin-dashboard-title">{role} Dashboard</h1>
        <p className="admin-dashboard-description">
          Welcome, {email}! From here, you can manage librarians, view reports, and more.
        </p>
        <div className="admin-dashboard-actions">
          <button className="admin-dashboard-btn">Manage Librarians</button>
          <button className="admin-dashboard-btn">View Reports</button>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
