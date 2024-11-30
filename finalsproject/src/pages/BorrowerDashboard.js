import React from 'react';
import Sidebar from '../components/Sidebar';
import './css-components/BorrowerDashboard.css';

const BorrowerDashboard = ({ role, email }) => {
  return (
    <div className="borrower-dashboard-container">
      <Sidebar role={role} />
      <main className="borrower-dashboard-content">
        <h1 className="borrower-dashboard-title">{role} Dashboard</h1>
        <p className="borrower-dashboard-description">
          Welcome, {email}! Search books, view borrowing logs, and more.
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
