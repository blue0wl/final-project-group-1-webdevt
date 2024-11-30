import React from 'react';
import Sidebar from '../components/Sidebar';
import './css-components/LibrarianDashboard.css';

const LibrarianDashboard = ({ role, email }) => {
  return (
    <div className="librarian-dashboard-container">
      <Sidebar role={role} />
      <main className="librarian-dashboard-content">
        <h1 className="librarian-dashboard-title">{role} Dashboard</h1>
        <p className="librarian-dashboard-description">
          Welcome, {email}! Manage books, reservations, and returns from here.
        </p>
        <div className="librarian-dashboard-actions">
          <button className="librarian-dashboard-btn">Manage Books</button>
          <button className="librarian-dashboard-btn">Manage Reservations</button>
          <button className="librarian-dashboard-btn">Manage Returns</button>
        </div>
      </main>
    </div>
  );
};

export default LibrarianDashboard;
