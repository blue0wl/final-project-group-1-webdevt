import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import Sidebar from "../components/Sidebar";
import "./css-components/ReservationMenu.css";
import ReportMessage from "../components/public/data/ReportMessage";

const ReservationMenu = ({ reservationList, setReservationList, returnList, setReturnList, logList, setLogList, bookList, setBookList}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("user");
  const [entry, setEntry] = useState({ bookID: ``, bookTitle: "", user: "", email: "" });
  const [focusedReservation, setFocusedReservation] = useState(null);  // Track the focused reservation

  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state || {};

  // Filter reservationList based on search query and type
  const filteredReservations = reservationList.filter((reservation) => {
    const searchValue =
      searchType === "user"
        ? reservation.user.toLowerCase()
        : searchType === "email"
        ? reservation.email.toLowerCase()
        : searchType === "bookTitle"
        ? reservation.bookTitle.toLowerCase()
        : searchType === "bookID"
        ? reservation.bookID.toString()
        : searchType === "borrowDate"
        ? reservation.borrowDate.toLowerCase()
        : reservation.returnDue.toLowerCase();
    
    return searchValue.includes(searchQuery.toLowerCase());
  });

  // Update entry and set the focused reservation when a card is selected
  const handleSelectReservation = (reservation) => {
    // Use both bookID and email to uniquely identify the reservation
    setFocusedReservation(`${reservation.bookID}-${reservation.email}`);  // Combining bookID and email for uniqueness
    
    setEntry({
      bookID: reservation.bookID,
      bookTitle: reservation.bookTitle,
      user: reservation.user || "Unknown User",
      email: reservation.email || "Unknown Email",
    });
  };
  

  useEffect(() => {
    // Log the entry state whenever it changes
    console.log("Entry Updated: ", entry);
  }, [entry]);

  // Handle accept reservation
  const handleAccept = (reservation) => {
    const confirmed = window.confirm(`Are you sure you want to accept the reservation for "${reservation.bookTitle}"?`);
    if (confirmed) {
      const timestamp = new Date().toLocaleString();

      // Generate the activity message using ReportMessage
      const activityMessage = (
        <ReportMessage
            user={user.name || 'Unknown User'} // Current user's name
            email={user.email || 'Unknown Email'} // Current user's email
            role={user.role || 'Unknown Role'} // Current user's role
            report="accept-reservation"
            timestamp={timestamp}
            borrower={entry}
        />
      );

      // Log the acceptance action
      const logEntry = {
        user: user.name || "Unknown User",
        email: user.email || "Unknown Email",
        role: user.role || "Unknown Role",
        activity: activityMessage,
        timestamp,
      };
  
      setLogList((prev) => [...prev, logEntry]);
  
      // Add to returnList
      setReturnList((prev) => [...prev, reservation]);
  
      // Update the book availability in bookList
      setBookList(
        bookList.map((book) =>
          book.ID === reservation.bookID
            ? { ...book, Availability: "Checked Out" }
            : book
        )
      );
  
      // Remove from reservationList
      setReservationList((prev) => prev.filter((item) => item !== reservation));
    }
  };

  // Handle reject reservation
  const handleReject = (reservation) => {
    const confirmed = window.confirm(`Are you sure you want to reject the reservation for "${reservation.bookTitle}"?`);
    if (confirmed) {
      const timestamp = new Date().toLocaleString();

      const lateFee = calculateLateFee(entry.borrowDate, entry.returnDue); // Calculate late fee
      entry.lateFee = lateFee;
      
      // Generate the activity message using ReportMessage
      const activityMessage = (
        <ReportMessage
            user={user.name || 'Unknown User'} // Current user's name
            email={user.email || 'Unknown Email'} // Current user's email
            role={user.role || 'Unknown Role'} // Current user's role
            report="reject-reservation"
            timestamp={timestamp}
            borrower={entry}
        />
      );

      // Log the rejection action
      const logEntry = {
        user: user.name || "Unknown User",
        email: user.email || "Unknown Email",
        role: user.role || "Unknown Role",
        activity: activityMessage,
        timestamp,
      };
  
      setLogList((prev) => [...prev, logEntry]);

      // Remove from reservationList
      setReservationList((prev) => prev.filter((item) => item !== reservation));
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar role={location.state.role} user={location.state} logList={logList} setLogList={setLogList} />
      <main className="dashboard-content">
        <header>
          <h1 className="dashboard-title">Reservation Requests</h1>
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
              <option value="returnDue">Search Return Due</option>
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
        <section className="reservation-list">
          {filteredReservations.length === 0 ? (
            <p>No reservations to display.</p>
          ) : (
            filteredReservations.map((reservation, index) => (
              <div
                key={index}
                className={`reservation-card mb-3 ${focusedReservation === `${reservation.bookID}-${reservation.email}` ? 'focused' : ''}`}
                onClick={() => handleSelectReservation(reservation)}
              >
                <p><strong>User:</strong> {reservation.user}</p>
                <p><strong>Email:</strong> {reservation.email}</p>
                <p><strong>Book:</strong> {reservation.bookTitle}</p>
                <p><strong>Book ID:</strong> {reservation.bookID}</p>
                <p><strong>Borrow Date:</strong> {reservation.borrowDate}</p>
                <p><strong>Return Due:</strong> {reservation.returnDue}</p>
                <div className="button-group">
                  <button
                    className="accept-button"
                    onClick={() => handleAccept(reservation)}
                    disabled={focusedReservation !== `${reservation.bookID}-${reservation.email}` || returnList.some((item) => item.bookID === reservation.bookID)}
                  >
                    Accept
                  </button>
                  <button
                    className="reject-button"
                    onClick={() => handleReject(reservation)}
                    disabled={focusedReservation !== `${reservation.bookID}-${reservation.email}`}
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))
          )}
        </section>
      </main>
    </div>
  );
};

export default ReservationMenu;
