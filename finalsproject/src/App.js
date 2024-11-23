//npm install react-scripts --save (if it doesn't work)

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AdminDashboard from './pages/AdminDashboard';
import LibrarianDashboard from './pages/LibrarianDashboard';
import BorrowerDashboard from './pages/BorrowerDashboard';

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/librarian" element={<LibrarianDashboard />} />
        <Route path="/borrower" element={<BorrowerDashboard />} />
      </Routes>
    </>
  );
};

export default App;
