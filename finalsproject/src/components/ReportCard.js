import React, { useState } from "react";
import "./css-components/ReportCard.css";

const ReportCard = ({ logList, user, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Role-based filtering logic
  const filteredLogs = logList.filter((log) => {
    const searchValue = JSON.stringify(log).toLowerCase();
    const logContainsReservation = searchValue.includes("accepted");

    // Admin can view all logs
    if (user.role === "Admin") {
      return true;
    }
    // Librarian can view logs for Borrower and Librarian roles
    if (user.role === "Librarian") {
      return (log.role === "Borrower" && !logContainsReservation) || log.role === "Librarian";
    }
    // Borrower can view only their own logs
    if (user.role === "Borrower") {
      return log.email === user.email || log.activity === logContainsReservation;
    }
    return false; // Default fallback for unexpected roles
  });

  // Apply search query filtering
  const searchFilteredLogs = filteredLogs.filter((log) => {
    const searchValue = JSON.stringify(log).toLowerCase(); // Converts log to a string for full-text search
    return searchValue.includes('accepted') || searchValue.includes('rejected');
  });

  // Notify parent about search query changes
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    if (onSearch) onSearch(e.target.value);
  };

  return (
    <div className="report-card">
      <header className="report-card-header">
        <h2 className="report-card-title">Reservation Reports</h2>
        <div className="report-card-search">
          <input
            type="text"
            placeholder="Search logs..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="report-card-input"
          />
        </div>
      </header>
      <section className="report-card-content">
        {searchFilteredLogs.length === 0 ? (
          <p>No logs to display.</p>
        ) : (
          searchFilteredLogs.map((log, index) => (
            <div key={index} className="report-log-card">
              <p><strong>User:</strong> {log.user}</p>
              <p><strong>Email:</strong> {log.email}</p>
              <p><strong>Role:</strong> {log.role}</p>
              <p><strong>Activity:</strong> {log.activity}</p>
              <p><strong>Timestamp:</strong> {log.timestamp}</p>
            </div>
          ))
        )}
      </section>
    </div>
  );
};

export default ReportCard;
