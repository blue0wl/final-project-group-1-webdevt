import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "./css-components/Cards.css";

const Cards = ({ bookList, logList, setLogList}) => {
  const location = useLocation();
  const navigate = useNavigate();

  console.log("Location state:", location.state);
  
  const { role, email, name } = location.state || {};
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("title"); 
  const [genreFilter, setGenreFilter] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState("");

  if (!role || !email) {
    return <p>Error: Missing role or email.</p>;
  }

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

  const genres = [
    "Fantasy", "Romance", "Horror", "Mystery", "Science Fiction", "Thriller", "Biography",
    "Crime", "Adventure", "Contemporary Literature", "Literary Fiction", "Young Adult",
    "Dystopian", "Historical", "Comedy", "Women's Fiction", "Graphic Novel", "Self-help Book",
    "Short Story", "Classic", "Magical Realism", "Children's Fiction", "Satire"
  ];

  const availabilityOptions = ["Available", "Unavailable"];

  return (
    <div className="dashboard-container">
      <Sidebar role={role} user={location.state} logList={logList} setLogList={setLogList} />
      <main className="dashboard-content">
        <header>
          <h1 className="dashboard-title">{role} Books</h1>
          <p className="dashboard-description">Welcome, {name}!</p>
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
            <br/>
            <select
              value={genreFilter}
              onChange={(e) => setGenreFilter(e.target.value)}
              className="search-bar-item genre-select"
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
              className="search-bar-item availability-select ms-2"
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
              <div key={book.ID} className="borrower-card">
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
                <div className="button-container">
                <button
                  className="details-button mb-3 mt-3"
                  onClick={() => navigate(`/book/${book.ID}`, { state: book })}
                >
                  View Details
                </button>
                {book.Availability === "Available" && (
                  <button
                    className="details-button mb-3 ms-3"
                    onClick={() =>
                      navigate(`/borrower/search-books/${book.ID}`, {
                        state: {
                          Title: book.Title,
                          ID: book.ID,
                          name, 
                          email,
                          role
                        },
                      })
                    }
                  >
                    Borrow
                  </button>
                )}
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

export default Cards;
