import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./css-components/BookDetails.css";

const BookDetails = ({ bookList }) => {
  const { id } = useParams(); // Extract ID from the route
  const navigate = useNavigate();

  // Find the book dynamically from the passed bookList prop
  const book = bookList.find((b) => b.ID === parseInt(id));

  if (!book) {
    return <div className="error-message">Book not found!</div>;
  }

  return (
    <div className="book-details-container">
      <div className="book-details">
        <div className="book-header">
          <img
            src={book.Cover || "https://m.media-amazon.com/images/I/21TsZ14+iBL._AC_UF1000,1000_QL80_.jpg"}
            alt={`${book.Title} cover`}
            className="book-cover"
          />
          <div className="book-basic-info">
            <h1 className="book-title">{book.Title}</h1>
            <p className="book-author">By {book.Author}</p>
            <p className="book-genre">
              <strong>Genre:</strong> {book.Genre}
            </p>
            <p className="book-isbn">
              <strong>ISBN:</strong> {book.ISBN || "N/A"}
            </p>
            <p className="book-pubdate">
              <strong>Publication Date:</strong> {book.PublicationDate || "N/A"}
            </p>
            <p className="book-availability">
              <strong>Availability:</strong> {book.Availability}
            </p>
            <p className="book-synopsis">
              {book.Synopsis || "No synopsis available."}
            </p>
          </div>
        </div>
      </div>
      <button
        className="book-details-back-button mt-3"
        onClick={() => navigate(-1)}
      >
        Back
      </button>
    </div>
  );
};

export default BookDetails;
