import React from 'react';
import Sidebar from '../components/Sidebar'; // Assuming Sidebar is in the same directory
import './css-components/AdminDashboard.css'; // Custom CSS for Admin Dashboard

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard-container">
      <Sidebar role="Admin" />
      <main className="admin-dashboard-content">
        <h1 className="admin-dashboard-title">Admin Dashboard</h1>
        <p className="admin-dashboard-description">
          Welcome to the Admin Dashboard. From here, you can manage librarians, view reports, and more.
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
