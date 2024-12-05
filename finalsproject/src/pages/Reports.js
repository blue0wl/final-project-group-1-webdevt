import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "./css-components/Reports.css";

const Reports = ({ logList, setLogList }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const user = location.state || {};

  // Role-based filtering logic
  const filteredLogs = logList.filter((log) => {
    // Admin can view all logs
    if (user.role === "Admin") {
      return true;
    }
    // Librarian can view logs for Borrower and Librarian roles
    if (user.role === "Librarian") {
      return log.role === "Borrower" || log.role === "Librarian";
    }
    // Borrower can view only their own logs
    if (user.role === "Borrower") {
      return log.email === user.email;
    }
    return false; // Default fallback for unexpected roles
  });

  // Apply search query filtering
  const searchFilteredLogs = filteredLogs.filter((log) => {
    const searchValue = JSON.stringify(log).toLowerCase(); // Converts log to a string for full-text search
    return searchValue.includes(searchQuery.toLowerCase());
  });

  return (
    <div className="dashboard-container">
      <Sidebar role={user.role} user={user} logList={logList} setLogList={setLogList} />
      <main className="dashboard-content">
        <header>
          <h1 className="dashboard-title">Activity Reports</h1>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search logs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-bar-item search-input"
            />
          </div>
        </header>
        <section className="log-list">
          {searchFilteredLogs.length === 0 ? (
            <p>No logs to display.</p>
          ) : (
            searchFilteredLogs.map((log, index) => (
              <div key={index} className="log-card mb-3">
                <p><strong>User:</strong> {log.user}</p>
                <p><strong>Email:</strong> {log.email}</p>
                <p><strong>Role:</strong> {log.role}</p>
                <p><strong>Activity:</strong> {log.activity}</p>
                <p><strong>Timestamp:</strong> {log.timestamp}</p>
              </div>
            ))
          )}
        </section>
      </main>
    </div>
  );
};

export default Reports;
