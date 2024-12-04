import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "./css-components/ManageBooks.css";
import ReportMessage from "../components/public/data/ReportMessage";

const ManageBooks = ({ bookList, setBookList, logList, setLogList, setReservationList, setReturnList }) => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log("Location state:", location.state);

  const { role, email, name } = location.state || {};
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("title");
  const [genreFilter, setGenreFilter] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState("");

  if (!role || !email) {
    return <p>Error: Missing role or email.</p>;
  }

  const genres = [
    "Fantasy", "Romance", "Horror", "Mystery", "Science Fiction", "Thriller", "Biography",
    "Crime", "Adventure", "Contemporary Literature", "Literary Fiction", "Young Adult",
    "Dystopian", "Historical", "Comedy", "Women's Fiction", "Graphic Novel", "Self-help Book",
    "Short Story", "Classic", "Magical Realism", "Children's Fiction", "Satire"
  ];

  const availabilityOptions = ["Available", "Unavailable"];

  // Filter books based on search query, genre, and availability
  const filteredBooks = bookList.filter((book) => {
    const matchesSearchQuery =
      searchType === "title"
        ? book.Title.toLowerCase().includes(searchQuery.toLowerCase())
        : book.Author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = genreFilter === "" || book.Genre === genreFilter;
    const matchesAvailability =
      availabilityFilter === "" ||
      (availabilityFilter === "Available" && book.Availability === "Available") ||
      (availabilityFilter === "Unavailable" && book.Availability !== "Available");
    return matchesSearchQuery && matchesGenre && matchesAvailability;
  });

  const handleDeleteRemnant = (item) => {
    if (item) {
      // Determine if item is a user or book and perform the deletion accordingly
      if (item.type === 'user') {
        // Delete from userList
        setUserList(prev => prev.filter(user => user.email !== item.email));
  
        // Delete corresponding entries from reservationList and returnList
        setReservationList(prev => prev.filter(reservation => reservation.email !== item.email));
        setReturnList(prev => prev.filter(returnItem => returnItem.email !== item.email));
  
      } else if (item.type === 'book') {

        // Delete corresponding entries from reservationList and returnList
        setReservationList(prev => prev.filter(reservation => reservation.bookID !== item.ID));
        setReturnList(prev => prev.filter(returnItem => returnItem.bookID !== item.ID));
      }
  
      // Optionally, generate a report or log the deletion
      const timestamp = new Date().toLocaleString();
      const logMessage = `${item.type} deleted at ${timestamp}`;
      setLogList(prev => [...prev, { activity: logMessage, timestamp }]);
    }
  };

  const handleDeleteBook = (bookId) => {
    const confirmed = window.confirm("Are you sure you want to delete this book?");
    if (confirmed) {
       // Log the deletion action
       const timestamp = new Date().toLocaleString();

       // Find the book to be deleted
       const bookToDelete = bookList.find((book) => book.ID === bookId);
       bookToDelete.type = 'book';

       // Generate the activity message using ReportMessage
       const activityMessage = (
           <ReportMessage
               user={name || 'Unknown User'} // Current user's name
               email={email || 'Unknown Email'} // Current user's email
               role={role || 'Unknown Role'} // Current user's role
               report="delete-book"
               timestamp={timestamp}
               book={bookToDelete}
           />
       );

       const logEntry = {
           user: name || 'Unknown User', // Current user's name
           email: email || 'Unknown Email', // Current user's email
           role: role || 'Unknown Role', // Current user's role
           activity: activityMessage, // Activity performed
           timestamp, // Timestamp of the action
       };
       setLogList((prev) => [...prev, logEntry]);

      setBookList(bookList.filter((book) => book.ID !== bookId));

      handleDeleteRemnant(bookToDelete);
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar role={role} user={location.state} logList={logList} setLogList={setLogList} />
      <main className="dashboard-content">
        <header>
          <h1 className="dashboard-title">Manage Books</h1>
          <p className="dashboard-description">Welcome, {name}!</p>
          <div className="add-book-button">
            <button
              className="add-book-btn mb-4"
              onClick={() => navigate("/librarian/manage-books/add", { state: location.state })}
            >
              Add Book +
            </button>
          </div>
          <div className="search-bar">
            <select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              className="search-bar-item search-type-select"
            >
              <option value="title">Search Title</option>
              <option value="author">Search Author</option>
            </select>
            <input
              type="text"
              placeholder={`Search by ${searchType}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-bar-item search-input ms-2"
            />
            <br />
            <select
              value={genreFilter}
              onChange={(e) => setGenreFilter(e.target.value)}
              className="search-bar-item genre-select ms-2"
            >
              <option value="">Select Genre</option>
              {genres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
            <select
              value={availabilityFilter}
              onChange={(e) => setAvailabilityFilter(e.target.value)}
              className="search-bar-item availability-select"
            >
              <option value="">Select Availability</option>
              {availabilityOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </header>
        <section className="cards-container">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => (
              <div key={book.ID} className="card">
                <img
                  src={
                    book.Cover ||
                    "https://m.media-amazon.com/images/I/21TsZ14+iBL._AC_UF1000,1000_QL80_.jpg"
                  }
                  alt={`${book.Title} cover`}
                  className="card-cover"
                />
                <h2 className="card-title">{book.Title}</h2>
                <p className="card-author">By {book.Author}</p>
                <p className="card-genre">Genre: {book.Genre}</p>
                <p className="card-isbn">ISBN: {book.ISBN}</p>
                <p className="card-pubdate">
                  Published:{" "}
                  {book.PublicationDate
                    ? new Date(book.PublicationDate).toLocaleDateString()
                    : "Unknown"}
                </p>
                <p
                  className={`card-availability ${
                    book.Availability === "Available"
                      ? "available"
                      : "unavailable"
                  }`}
                >
                  {book.Availability || "Unknown"}
                </p>
                <div className="book-spacer"></div>
                <div className="card-buttons">
                  <button
                    className="details-button mb-3"
                    onClick={() => navigate(`/book/${book.ID}`, { state: location.state })}
                  >
                    View Details
                  </button>
                  <br />
                  <button
                    className="edit-button mb-3 me-3"
                    onClick={() => navigate(`/librarian/manage-books/edit`, { state: { mainUser: location.state.name, mainEmail: location.state.email, mainRole: location.state.role, ...book } })}
                  >
                    Edit Book
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteBook(book.ID)}
                  >
                    Delete Book
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="no-books-message">No books found in the catalog.</p>
          )}
        </section>
      </main>
    </div>
  );
};

export default ManageBooks;
