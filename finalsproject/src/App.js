import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Login Components
import Login from './components/Login';
import LoginPage from './pages/LoginPage';

// User Management Components
import UserList from './components/UserList';
import CreateUser from './components/CreateUser';
import UpdateUser from './components/UpdateUser';

// User Dashboard Components
import AdminDashboard from './pages/AdminDashboard';
import LibrarianDashboard from './pages/LibrarianDashboard';
import BorrowerDashboard from './pages/BorrowerDashboard';

// Dynamic Profile
import Profile from './pages/Profile';
import EditProfile from './components/LowerAdminUpdate';

// Admin Dashboard Actions
import Reports from './pages/Reports';

// Librarian Dashboard Actions
import ManageBooks from './pages/ManageBooks'; 
import CreateBooks from './pages/CreateBook';
import UpdateBooks from './pages/UpdateBook';
import BorrowerUserList from './components/BorrowerUserList';
import ReservationMenu from './pages/ReservationMenu';
import ReturnMenu from './pages/ReturnMenu';

// Borrower Dashboard Actions
import books from './components/public/data/books';
import Catalog from './components/Cards';
import BookDetails from "./components/BookDetails";
import BorrowBook from './pages/BorrowBook';



function App() {
  const [userList, setUserList] = useState([
    // Example of existing user with a role
    { name: "Admin User", email: "admin@example.com", password: "admin123", image: "https://picsum.photos/200", role: "Admin" },
    { name: "Librarian User", email: "librarian@example.com", password: "lib123", image: "https://picsum.photos/201", role: "Librarian" },
    { name: "Borrower User", email: "borrower@example.com", password: "borrow123", image: "https://picsum.photos/202", role: "Borrower" }
  ]);
  const [bookList, setBookList] = useState(books);
  const [reservationList, setReservationList] = useState([]);
  const [logList, setLogList] = useState([]); 
  const [returnList, setReturnList] = useState([]);

  return (
    <div className="App">
        {/* Main Login Routes */}

        <Routes>
          <Route path="/" element={<Login />} />
          <Route 
            path="/admin-login" 
            element={
              <LoginPage 
                  role="Admin" 
                  dashboardPath="/admin-dashboard" 
                  userList={userList} 
                  logList={logList}
                  setLogList={setLogList}
              />
            } 
          />
          <Route 
            path="/librarian-login" 
            element={
              <LoginPage 
                  role="Librarian" 
                  dashboardPath="/librarian-dashboard" 
                  userList={userList} 
                  logList={logList}
                  setLogList={setLogList}
              />
            } 
          />
          <Route 
            path="/borrower-login" 
            element={
              <LoginPage 
                  role="Borrower" 
                  dashboardPath="/borrower-dashboard" 
                  userList={userList} 
                  logList={logList}
                  setLogList={setLogList}
              />
            } 
          />

          {/* Main Dashboard Routes */}

          <Route
            path="/admin-dashboard"
            element={<AdminDashboard logList={logList} setLogList={setLogList} />}
          />
          <Route 
            path="/librarian-dashboard" 
            element={<LibrarianDashboard logList={logList} setLogList={setLogList} />} 
          />
          <Route 
            path="/borrower-dashboard" 
            element={<BorrowerDashboard logList={logList} setLogList={setLogList} />} 
          />

          {/* User CRUD Routes */}

          <Route path="/user-list" element={<UserList userList={userList} setUserList={setUserList} logList={logList} setLogList={setLogList} setReservationList={setReservationList} setReturnList={setReturnList} />} />
          <Route path="/create-user" element={<CreateUser userList={userList} setUserList={setUserList} logList={logList} setLogList={setLogList}/>} />
          <Route path="/update-user" element={<UpdateUser userList={userList} setUserList={setUserList} logList={logList} setLogList={setLogList} />} />

          {/* Admin Dashboard Routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard logList={logList} setLogList={setLogList} />} />
          <Route path="/admin/profile" element={<Profile userList={userList} setUserList={setUserList} logList={logList} setLogList={setLogList} setReservationList={setReservationList} setReturnList={setReturnList}/>} />
            <Route 
              path="/admin/profile/edit" 
              element={<EditProfile userList={userList} setUserList={setUserList} logList={logList} setLogList={setLogList}/>} 
            />
          <Route path="/admin/manage-users" element={<UserList userList={userList} setUserList={setUserList} logList={logList} setLogList={setLogList} setReservationList={setReservationList} setReturnList={setReturnList}/>} />
          <Route path="/admin/reports" element={<Reports logList={logList} setLogList={setLogList}/>} />

          {/* Librarian Dashboard Routes */}
          <Route path="/librarian/dashboard" element={<LibrarianDashboard logList={logList} setLogList={setLogList} />} />
          <Route path="/librarian/profile" element={<Profile userList={userList} setUserList={setUserList} logList={logList} setLogList={setLogList} setReservationList={setReservationList} setReturnList={setReturnList}/>} />
          <Route path="/librarian/manage-books" element={<ManageBooks bookList={bookList} setBookList={setBookList} logList={logList} setLogList={setLogList} setReservationList={setReservationList} setReturnList={setReturnList}/>} />
          <Route path="/librarian/manage-books/add" element={<CreateBooks bookList={bookList} setBookList={setBookList} logList={logList} setLogList={setLogList}/>} />
          <Route path="/librarian/manage-books/edit" element={<UpdateBooks bookList={bookList} setBookList={setBookList} setLogList={setLogList}/>} />
          <Route path="/librarian/borrower-list" element={
              <BorrowerUserList userList={userList} setUserList={setUserList} logList={logList} setLogList={setLogList} setReservationList={setReservationList} setReturnList={setReturnList}  />} 
          />
          <Route path="/librarian/librarian-logs" element={<Reports logList={logList} setLogList={setLogList}/>}/>
          <Route path="/librarian/reservations" 
            element={<ReservationMenu reservationList={reservationList} setReservationList={setReservationList} logList={logList} setLogList={setLogList} returnList={returnList} setReturnList={setReturnList} bookList={bookList} setBookList={setBookList}/>}
          />
          <Route path="/librarian/returns" element={<ReturnMenu logList={logList} setLogList={setLogList} returnList={returnList} setReturnList={setReturnList}/>}/>

          {/* Borrower Dashboard Routes */}
          <Route path="/borrower/dashboard" element={<BorrowerDashboard logList={logList} setLogList={setLogList} />} />
          <Route path="/borrower/profile" element={<Profile userList={userList} setUserList={setUserList} logList={logList} setLogList={setLogList} setReservationList={setReservationList} setReturnList={setReturnList}/>} />
          <Route path="/borrower/borrowing-logs" element={<Reports logList={logList} setLogList={setLogList}/>}/>

          {/* Book Catalog Routes */}
          <Route path="/borrower/search-books" element={<Catalog bookList={bookList} logList={logList} setLogList={setLogList}/>} />
          <Route path="/book/:id" element={<BookDetails bookList={bookList} />} />
          <Route path="/borrower/search-books/:id" 
            element={<BorrowBook 
              reservationList={reservationList} setReservationList={setReservationList}
              logList={logList} setLogList={setLogList}
              />
            }
        />

        </Routes>
    </div>
  );
}

export default App;
