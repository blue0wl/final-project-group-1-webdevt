import "./css-components/UpdateBook.css";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ReportMessage from "../components/public/data/ReportMessage";

function UpdateBook({ bookList, setBookList, setLogList}) {
  const location = useLocation();
  const navigate = useNavigate();
  console.log("Location state:", location.state);

  // Extract book details from location.state
  const bookDetails = location.state || {};

  // Initialize form state with location.state data
  const [bookData, setBookData] = useState({
    ID: bookDetails.ID || "",
    ISBN: bookDetails.ISBN || "",
    Author: bookDetails.Author || "",
    Title: bookDetails.Title || "",
    Synopsis: bookDetails.Synopsis || "",
    Genre: bookDetails.Genre || "",
    Availability: bookDetails.Availability || "",
    PublicationDate: bookDetails.PublicationDate || "",
    Cover: bookDetails.Cover || "",
  });
  const [originalBookData] = useState(bookDetails);
  const [notification, setNotification] = useState("");

  const isUpdateDisabled = () => {
    return (
        bookData.ISBN === originalBookData.ISBN &&
        bookData.Author === originalBookData.Author &&
        bookData.Title === originalBookData.Title &&
        bookData.Synopsis === originalBookData.Synopsis &&
        bookData.Genre === originalBookData.Genre &&
        bookData.Availability === originalBookData.Availability &&
        bookData.PublicationDate === originalBookData.PublicationDate &&
        bookData.Cover === originalBookData.Cover
    );
};
  // Ensure valid data exists in location.state
  useEffect(() => {
    if (!bookDetails.ID) {
      setNotification("No book details provided. Please check the data.");
    }
  }, [bookDetails]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookData((prev) => ({ ...prev, [name]: value }));
  };

  const validateISBN = (ISBN) => {
    const isbnRegex =
      /^(?:\d{13}|\d{3}-\d{1,5}-\d{1,7}-\d{1,7}-\d{1}|\d{9}[\dXx]|\d{1,5}-\d{1,7}-\d{1,6}-[\dXx])$/;
    return isbnRegex.test(ISBN);
  };

  // Validate Publication Date
  const validatePublicationDate = (date) => {
    return date !== '';
  };

  const handleSubmit = () => {
    if (!bookData.ISBN.trim() || !validateISBN(bookData.ISBN)) {
      alert("Please enter a valid ISBN.");
      return;
    }

    if (!bookData.Author.trim() || !bookData.Title.trim() || !bookData.Synopsis.trim()) {
      alert("Please fill out all required fields (Author, Title, Synopsis).");
      return;
    }

    if (!bookData.Genre || !bookData.Availability) {
      alert("Please select valid Genre and Availability options.");
      return;
    }

    if (!validatePublicationDate(bookData.PublicationDate)) {
        alert('Please enter a valid publication date.');
        return;
    }
    // Update book in the list
    const updatedBookList = bookList.map((book) =>
      book.ID === bookData.ID ? { ...book, ...bookData } : book
    );
    setBookList(updatedBookList);

    // Log the update action
    const timestamp = new Date().toLocaleString();

    // Generate the activity message using ReportMessage
    const activityMessage = (
        <ReportMessage
            user={location.state.mainUser || 'Unknown User'} // Replace with the actual user data
            email={location.state.mainEmail || 'Unknown Email'}
            role={location.state.mainRole || 'Unknown Role'}
        report='update-book'
        timestamp={timestamp}
        book={bookData} // Include the updated book data
    />
);

// Log entry
const logEntry = {
    user: location.state.mainUser || 'Unknown User', // Current user's name
    email: location.state.mainEmail || 'Unknown Email', // Current user's email
    role: location.state.mainRole || 'Unknown Role', // Current user's role
    activity: activityMessage, // Activity performed
    target: bookData.ISBN, // The target book's ISBN or title
    timestamp, // Timestamp of the action
};

// Assuming you have a log list or state to store the logs
setLogList((prev) => [...prev, logEntry]);

    setNotification(`Book "${bookData.Title}" has been updated successfully!`);
  };

    useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => setNotification(''), 5000);
            return () => clearTimeout(timer);
        }
    }, [notification]);

  return (
    <div className="update-book-background">
      <div className="update-book-container mt-3 mb-3">
        <h2>Update Book</h2>
        <div className="update-book-form-group">
          <label>Book ID (Read-only)</label>
          <input
            type="number"
            name="ID"
            className="form-control"
            value={bookData.ID}
            readOnly
          />
        </div>

        <div className="update-book-form-group">
          <label>ISBN</label>
          <input
            type="text"
            name="ISBN"
            className="form-control"
            value={bookData.ISBN}
            onChange={handleInputChange}
          />
        </div>

        <div className="update-book-form-group">
          <label>Author</label>
          <input
            type="text"
            name="Author"
            className="form-control"
            value={bookData.Author}
            onChange={handleInputChange}
          />
        </div>

        <div className="update-book-form-group">
          <label>Title</label>
          <input
            type="text"
            name="Title"
            className="form-control"
            value={bookData.Title}
            onChange={handleInputChange}
          />
        </div>

        <div className="update-book-form-group">
          <label>Synopsis</label>
          <textarea
            name="Synopsis"
            className="form-control"
            value={bookData.Synopsis}
            onChange={handleInputChange}
          />
        </div>

        <div className="update-book-form-group">
          <label>Genre</label>
          <select
            name="Genre"
            className="form-control"
            value={bookData.Genre}
            onChange={handleInputChange}
          >
            <option value="Fantasy">Fantasy</option>
            <option value="Romance">Romance</option>
            <option value="Horror">Horror</option>
            <option value="Mystery">Mystery</option>
            <option value="Science Fiction">Science Fiction</option>
            <option value="Thriller">Thriller</option>
            <option value="Biography">Biography</option>
            <option value="Crime">Crime</option>
            <option value="Adventure">Adventure</option>
            <option value="Contemporary Literature">Contemporary Literature</option>
            <option value="Literary Fiction">Literary Fiction</option>
            <option value="Young Adult">Young Adult</option>
            <option value="Dystopian">Dystopian</option>
            <option value="Historical">Historical</option>
            <option value="Comedy">Comedy</option>
            <option value="Women's Fiction">Women's Fiction</option>
            <option value="Graphic Novel">Graphic Novel</option>
            <option value="Self-help Book">Self-help Book</option>
            <option value="Short Story">Short Story</option>
            <option value="Classic">Classic</option>
            <option value="Magical Realism">Magical Realism</option>
            <option value="Children's Fiction">Children's Fiction</option>
            <option value="Satire">Satire</option>
          </select>
        </div>

        <div className="update-book-form-group">
          <label>Availability</label>
          <select
            name="Availability"
            className="form-control"
            value={bookData.Availability}
            onChange={handleInputChange}
          >
            <option value="Available">Available</option>
            <option value="Checked Out">Checked Out</option>
          </select>
        </div>

        <div className="update-book-form-group">
          <label>Publication Date</label>
          <input
            type="date"
            name="PublicationDate"
            className="form-control"
            value={bookData.PublicationDate}
            onChange={handleInputChange}
          />
        </div>

        <div className="update-book-form-group">
          <label>Cover (optional)</label>
          <input
            type="text"
            name="Cover"
            className="form-control"
            value={bookData.Cover}
            onChange={handleInputChange}
          />
        </div>

        {notification && <p className="notification">{notification}</p>}

        <button className="btn btn-success" onClick={handleSubmit} disabled={isUpdateDisabled}>
          Submit
        </button>
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>
          Back
        </button>
      </div>
    </div>
  );
}

export default UpdateBook;
