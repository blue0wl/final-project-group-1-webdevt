import React from 'react';
import Sidebar from '../components/Sidebar'; // Assuming Sidebar is in the same directory
import './css-components/BorrowerDashboard.css'; // Custom CSS for Admin Dashboard

const BorrowerDashboard = () => {
  return (
    <div className="borrower-dashboard-container">
      <Sidebar role="Borrower" />
      <main className="borrower-dashboard-content">
        <h1 className="borrower-dashboard-title">Borrower Dashboard</h1>
        <p className="borrower-dashboard-description">
          Welcome to the Borrower Dashboard. Search books, view borrowing logs, and more.
        </p>
        <div className="borrower-dashboard-actions">
          <button className="borrower-dashboard-btn">Search Books</button>
          <button className="borrower-dashboard-btn">View Borrowing Logs</button>
        </div>
      </main>
    </div>
  );
};

export default BorrowerDashboard;
