import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./css-components/BorrowBook.css"; // Add styling as needed.
import ReportMessage from "../components/public/data/ReportMessage";

const BorrowBook = ({ reservationList, setReservationList, logList, setLogList }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { name, email, role, Title, ID } = location.state || {};

  console.log("Location state:", location.state);

  const [borrowDate, setBorrowDate] = useState(new Date().toISOString().split("T")[0]); // Default to today
  const [returnDue, setReturnDue] = useState("");
  const [isExistingReservation, setIsExistingReservation] = useState(false);
  const [book, setBook] = useState({id: '', title: ""});

  useEffect(() => {
    const existingReservation = reservationList.find(
      (reservation) => reservation.email === email && reservation.bookID === ID
    );

    if (existingReservation) {
      setBorrowDate(existingReservation.borrowDate); 
      setReturnDue(existingReservation.returnDue); 
      setIsExistingReservation(true);
    } else {
      const returnDate = new Date(borrowDate);
      returnDate.setDate(returnDate.getDate() + 14);
      setReturnDue(returnDate.toISOString().split("T")[0]); 
    }
  }, [borrowDate, reservationList, email, ID]);

  const handleBorrowDateChange = (e) => {
    const selectedDate = e.target.value;
    if (new Date(selectedDate) < new Date()) {
      alert("Borrow Date cannot be in the past.");
      return;
    }
    setBorrowDate(selectedDate);
  };

  useEffect(() => {
    const existingReservation = reservationList.some(
      (reservation) => reservation.email === email && reservation.bookID === ID
    );
    setIsExistingReservation(existingReservation);
  }, [reservationList, email, ID]);
  
  useEffect(() => {
    if (ID && Title) {
      setBook({ id: ID, title: Title });
    }
  }, [ID, Title]);

  
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Book: ", book.id, book.title)

    if (isExistingReservation) {
      const confirmCancel = window.confirm(
        "Are you sure you want to cancel this reservation?"
      );
      if (confirmCancel) {
        const updatedList = reservationList.filter(
          (reservation) => !(reservation.email === email && reservation.bookID === ID)
        );
        setReservationList(updatedList);

        const timestamp = new Date().toLocaleString();

        // Generate the activity message using ReportMessage
        const activityMessage = (
          <ReportMessage
              user={name || 'Unknown User'}
              email={email || 'Unknown Email'}
              role={role || 'Unknown Role'}
              report="delete-reservation"
              timestamp={timestamp}
              book= {book}
          />
      );
  
      const logEntry = {
          user: name,
          email:email,
          role: role,
          activity: activityMessage, 
          timestamp,
      };
      setLogList((prev) => [...prev, logEntry]);

        alert("Reservation canceled successfully!");
      }
    } else {
      if (!borrowDate || !returnDue) {
        alert("Borrow Date and Return Due Date are required!");
        return;
      }

      const newReservation = {
        user: name,
        email,
        bookTitle: Title,
        bookID: ID,
        borrowDate,
        returnDue,
      };

      setReservationList([...reservationList, newReservation]);

      const timestamp = new Date().toLocaleString();
      
      // Generate the activity message using ReportMessage
      const activityMessage = (
        <ReportMessage
            user={name || 'Unknown User'}
            email={email || 'Unknown Email'}
            role={role || 'Unknown Role'}
            report="add-reservation"
            timestamp={timestamp}
            book={book}
        />
    );

    const logEntry = {
        user: name,
        email:email,
        role: role,
        activity: activityMessage, 
        timestamp,
    };
    setLogList((prev) => [...prev, logEntry]);

      alert("Reservation successful!");
    }
  };

  return (
    <div className="borrow-book-background">
      <div className="borrow-book-container">
        <h1>Reserve Book: {Title}</h1>
        <form className="borrow-book-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Your Name:</label>
            <p>{name}</p>
          </div>
          <div className="form-group">
            <label>Your Email:</label>
            <p>{email}</p>
          </div>
          <div className="form-group">
            <label>Book to Borrow:</label>
            <p>{Title}</p>
          </div>
          <div className="form-group">
            <label>Book ID:</label>
            <p>{ID}</p>
          </div>
          <div className="form-group">
            <label htmlFor="borrowDate">Borrow Date:</label>
            <input
              type="date"
              id="borrowDate"
              value={borrowDate}
              onChange={handleBorrowDateChange}
              min={new Date().toISOString().split("T")[0]}
              readOnly={isExistingReservation}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="returnDue">Return Due Date:</label>
            <input
              type="date"
              id="returnDue"
              value={returnDue}
              readOnly
            />
          </div>
          <button
            type="submit"
            className={`borrow-button ${
              isExistingReservation ? "cancel-reservation-button" : "reserve-button"
            }`}
          >
            {isExistingReservation ? "Cancel Reservation" : "Confirm Reservation"}
          </button>
          <button
            type="button"
            className="cancel-button borrow-button"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
        </form>
      </div>
    </div>
  );
};

export default BorrowBook;
