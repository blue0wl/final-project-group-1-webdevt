import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "./css-components/ReturnMenu.css";
import ReportMessage from "../components/public/data/ReportMessage";

const ReturnMenu = ({ returnList, setReturnList, logList, setLogList }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("user");
  const [currentTime, setCurrentTime] = useState(new Date());

  const location = useLocation();
  const user = location.state || {};

  // Helper function to calculate late fees
  const calculateLateFee = (borrowDate, returnDue) => {
    const returnDueObj = new Date(returnDue);
    const today = new Date();
    const lateDays = Math.max(0, Math.ceil((today - returnDueObj) / (1000 * 60 * 60 * 24)) - 1);
    return lateDays * 20; // $20 per late day
  };
  
  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date());
      setTimeout(updateTime, 5000); // Schedule the next update
    };
  
    updateTime(); 
  
    return () => clearTimeout(updateTime); // Cleanup on unmount
  }, []);
  

  // Filter returnList based on search query and type
  const filteredReturns = returnList.filter((entry) => {
    const searchValue =
      searchType === "user"
        ? entry.user.toLowerCase()
        : searchType === "email"
        ? entry.email.toLowerCase()
        : searchType === "bookTitle"
        ? entry.bookTitle.toLowerCase()
        : searchType === "bookID"
        ? entry.bookID.toString()
        : searchType === "borrowDate"
        ? entry.borrowDate.toLowerCase()
        : entry.returnDue.toLowerCase();

    return searchValue.includes(searchQuery.toLowerCase());
  });

  // Handle "Return" action
  const handleReturn = (entry) => {
    const confirmed = window.confirm(
      `Are you sure you want to process the return for "${entry.bookTitle}"?`
    );
    if (confirmed) {
      const timestamp = new Date().toLocaleString();
      const lateFee = calculateLateFee(entry.borrowDate, entry.returnDue);

      // Generate the activity message using ReportMessage
      const activityMessage = (
        <ReportMessage
            user={user.name || 'Unknown User'} // Current user's name
            email={user.email || 'Unknown Email'} // Current user's email
            role={user.role || 'Unknown Role'} // Current user's role
            report="return"
            timestamp={timestamp}
            entry={entry}
        />
    );

      // Log the return action
      const logEntry = {
        user: user.name || "Unknown User",
        email: user.email || "Unknown Email",
        role: user.role || "Unknown Role",
        activity: activityMessage,
        timestamp,
      };

      setLogList((prev) => [...prev, logEntry]);

      // Remove the returned book from returnList
      setReturnList((prev) => prev.filter((item) => item !== entry));
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar role={location.state.role} user={location.state} logList={logList} setLogList={setLogList} />
      <main className="dashboard-content">
        <header>
          <h1 className="dashboard-title">Return Requests</h1>
          <div className="search-bar">
            <select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              className="search-bar-item search-type-select"
            >
              <option value="user">Search User</option>
              <option value="email">Search Email</option>
              <option value="bookTitle">Search Book Title</option>
              <option value="bookID">Search Book ID</option>
              <option value="borrowDate">Search Borrow Date</option>
              <option value="returnDue">Search Return Before</option>
            </select>
            <input
              type="text"
              placeholder={`Search by ${searchType}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-bar-item search-input ms-2"
            />
          </div>
        </header>
        <section className="return-list">
          {filteredReturns.length === 0 ? (
            <p>No return requests to display.</p>
          ) : (
            filteredReturns.map((entry, index) => {
              const lateFee = calculateLateFee(entry.borrowDate, entry.returnDue);
              entry.lateFee = lateFee;
              return (
                <div key={index} className="return-card mb-3">
                  <p><strong>User:</strong> {entry.user}</p>
                  <p><strong>Email:</strong> {entry.email}</p>
                  <p><strong>Book:</strong> {entry.bookTitle}</p>
                  <p><strong>Book ID:</strong> {entry.bookID}</p>
                  <p><strong>Borrow Date:</strong> {entry.borrowDate}</p>
                  <p><strong>Return Due:</strong> {entry.returnDue}</p>
                  <p><strong>Late Fee:</strong> {entry.lateFee} PHP</p>
                  <button className="return-button mt-2" onClick={() => handleReturn(entry)}>
                    Return Book
                  </button>
                </div>
              );
            })
          )}
        </section>
      </main>
    </div>
  );
};

export default ReturnMenu;
