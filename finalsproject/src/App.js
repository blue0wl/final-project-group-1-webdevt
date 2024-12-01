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


// Borrower Dashboard Actions



function App() {
  const [userList, setUserList] = useState([
    // Example of existing user with a role
    { name: "Admin User", email: "admin@example.com", password: "admin123", image: "https://picsum.photos/200", role: "Admin" },
    { name: "Librarian User", email: "librarian@example.com", password: "lib123", image: "https://picsum.photos/201", role: "Librarian" },
    { name: "Borrower User", email: "borrower@example.com", password: "borrow123", image: "https://picsum.photos/202", role: "Borrower" }
  ]);

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
              />
            } 
          />

          {/* Main Dashboard Routes */}

          <Route
            path="/admin-dashboard"
            element={<AdminDashboard role={location.state?.role} email={location.state?.email} />}
          />
          <Route 
            path="/librarian-dashboard" 
            element={<LibrarianDashboard />} 
          />
          <Route 
            path="/borrower-dashboard" 
            element={<BorrowerDashboard />} 
          />

          {/* User CRUD Routes */}

          <Route path="/user-list" element={<UserList userList={userList} setUserList={setUserList} />} />
          <Route path="/create-user" element={<CreateUser userList={userList} setUserList={setUserList} />} />
          <Route path="/update-user" element={<UpdateUser userList={userList} setUserList={setUserList} />} />

          {/* Admin Dashboard Routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/profile" element={<Profile userList={userList} setUserList={setUserList} />} />
            <Route 
              path="/admin/profile/edit" 
              element={<EditProfile userList={userList} setUserList={setUserList} />} 
            />
          <Route path="/admin/manage-users" element={<UserList userList={userList} setUserList={setUserList} />} />
          <Route path="/admin/reports" element={<Reports />} />

          {/* Librarian Dashboard Routes */}
          <Route path="/librarian/dashboard" element={<LibrarianDashboard />} />
          <Route path="/librarian/profile" element={<Profile userList={userList} setUserList={setUserList} />} />

          {/* Borrower Dashboard Routes */}
          <Route path="/borrower/dashboard" element={<BorrowerDashboard />} />
          <Route path="/borrower/profile" element={<Profile userList={userList} setUserList={setUserList} />} />


        </Routes>
    </div>
  );
}

export default App;
