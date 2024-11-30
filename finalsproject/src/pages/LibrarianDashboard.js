import React from 'react';
import Sidebar from '../components/Sidebar'; // Assuming Sidebar is in the same directory
import './css-components/LibrarianDashboard.css'; // Custom CSS for Admin Dashboard

const LibrarianDashboard = () => {
  return (
    <div className="librarian-dashboard-container">
      <Sidebar role="Librarian" />
      <main className="librarian-dashboard-content">
        <h1 className="librarian-dashboard-title">Librarian Dashboard</h1>
        <p className="librarian-dashboard-description">
          Welcome to the Librarian Dashboard. Manage books, reservations, and returns from here.
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
