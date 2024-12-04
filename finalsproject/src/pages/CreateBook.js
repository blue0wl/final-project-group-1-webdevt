import './css-components/CreateBook.css';
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ReportMessage from '../components/public/data/ReportMessage';

function CreateBooks({ bookList, setBookList, logList, setLogList}) {
    const [newBook, setNewBook] = useState({
        ISBN: '',
        Author: '',
        Title: '',
        Synopsis: '',
        Genre: 'Set Genre',
        Availability: 'Set Availability',
        PublicationDate: '',
        Cover: ''
    });
    const [notification, setNotification] = useState('');
    const [book, setBook] = useState({id: "", title: "", genre: ""})

    const navigate = useNavigate();
    const location = useLocation();
    const user = location.state || {};
    console.log("Location State: ", location.state)

    // Get the highest existing Book ID and increment it for the new book
    const generateBookID = () => {
        const highestID = bookList.reduce((max, book) => (book.ID > max ? book.ID : max), 0);
        return highestID + 1;
    };

    // Automatically set the Book ID when the component loads
    useEffect(() => {
        setNewBook((prev) => ({
            ...prev,
            ID: generateBookID()
        }));
    }, [bookList]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewBook((prev) => ({ ...prev, [name]: value }));
    };

    // Validate ISBN with regex
    const validateISBN = (ISBN) => {
        const isbnRegex = /^(?:\d{13}|\d{3}-\d{1,5}-\d{1,7}-\d{1,7}-\d{1}|\d{9}[\dXx]|\d{1,5}-\d{1,7}-\d{1,6}-[\dXx])$/;
        return isbnRegex.test(ISBN);
    };

    // Validate Publication Date
    const validatePublicationDate = (date) => {
        return date !== '';
    };

    const handleSubmit = () => {
        if (!newBook.ISBN.trim() || !validateISBN(newBook.ISBN)) {
            alert('Please enter a valid ISBN.');
            return;
        }

        if (!newBook.Author.trim() || !newBook.Title.trim() || !newBook.Synopsis.trim()) {
            alert('Please fill out all required fields (Author, Title, Synopsis).');
            return;
        }

        if (newBook.Genre === 'Set Genre' || newBook.Availability === 'Set Availability') {
            alert('Please select valid Genre and Availability options.');
            return;
        }

        if (!validatePublicationDate(newBook.PublicationDate)) {
            alert('Please enter a valid publication date.');
            return;
        }

        setBookList((prev) => [...prev, newBook]);
        setBook({
            id: newBook.ID,
            title: newBook.Title,
            genre: newBook.Genre,
        })
        const timestamp = new Date().toLocaleString();
        // Generate the activity message using ReportMessage
            const activityMessage = (
                <ReportMessage
                    user={user.name || 'Unknown User'}
                    email={user.email || 'Unknown Email'}
                    role={user.role || 'Unknown Role'}
                    report="add-book"
                    timestamp={timestamp}
                    book= {book}
                />
            );

            const logEntry = {
                user: user.name || 'Unknown User', // Current user's name
                email: user.email || 'Unknown Email', // Current user's email
                role: user.role || 'Unknown Role', // Current user's role
                activity: activityMessage, // Activity performed
                timestamp, // Timestamp of the action
            };
            setLogList((prev) => [...prev, logEntry]);

        setNotification(`Book "${newBook.Title}" has been successfully added!`);
        setNewBook({
            ISBN: '',
            Author: '',
            Title: '',
            Synopsis: '',
            Genre: 'Set Genre',
            Availability: 'Set Availability',
            PublicationDate: '',
            Cover: ''
        });
    };

    useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => setNotification(''), 5000);
            return () => clearTimeout(timer);
        }
    }, [notification]);

    const handleBack = () => {
        navigate(-1); // Go back to the previous page
    };

    return (
        <div className="create-book-background">
            <div className="create-book-container mb-3 mt-3">
                <h2>Create Book</h2>

                <div className="create-book-form-group">
                    <label>Book ID (Auto-generated)</label>
                    <input
                        type="number"
                        name="ID"
                        className="form-control"
                        value={newBook.ID}
                        readOnly
                    />
                </div>

                <div className="create-book-form-group">
                    <label>ISBN</label>
                    <input
                        type="text"
                        name="ISBN"
                        placeholder="Enter ISBN"
                        className="form-control"
                        value={newBook.ISBN}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="create-book-form-group">
                    <label>Author</label>
                    <input
                        type="text"
                        name="Author"
                        placeholder="Enter Author"
                        className="form-control"
                        value={newBook.Author}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="create-book-form-group">
                    <label>Title</label>
                    <input
                        type="text"
                        name="Title"
                        placeholder="Enter Title"
                        className="form-control"
                        value={newBook.Title}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="create-book-form-group">
                    <label>Synopsis</label>
                    <textarea
                        name="Synopsis"
                        placeholder="Enter Synopsis"
                        className="form-control"
                        value={newBook.Synopsis}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="create-book-form-group">
                    <label>Genre</label>
                    <select
                        name="Genre"
                        className="form-control"
                        value={newBook.Genre}
                        onChange={handleInputChange}
                    >
                        <option value="Set Genre">Set Genre</option>
                        {/* Add the other options for Genre */}
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

                <div className="create-book-form-group">
                    <label>Availability</label>
                    <select
                        name="Availability"
                        className="form-control"
                        value={newBook.Availability}
                        onChange={handleInputChange}
                    >
                        <option value="Set Availability">Set Availability</option>
                        <option value="Available">Available</option>
                        <option value="Checked Out">Checked Out</option>
                    </select>
                </div>

                <div className="create-book-form-group">
                    <label>Publication Date</label>
                    <input
                        type="date"
                        name="PublicationDate"
                        className="form-control"
                        value={newBook.PublicationDate}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="create-book-form-group">
                    <label>Cover (optional)</label>
                    <input
                        type="text"
                        name="Cover"
                        placeholder="Enter Cover Image URL (optional)"
                        className="form-control"
                        value={newBook.Cover}
                        onChange={handleInputChange}
                    />
                </div>

                {notification && <p className="notification">{notification}</p>}

                <button className="btn btn-success" onClick={handleSubmit}>
                    Submit
                </button>
                <button className="btn btn-secondary" onClick={handleBack}>
                    Back
                </button>
            </div>
        </div>
    );
}

export default CreateBooks;
