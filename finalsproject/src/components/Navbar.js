
import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <h1 className="text-xl font-bold">Library Management System</h1>
      <ul className="flex gap-4">
        <li><a href="/admin" className="hover:underline">Admin</a></li>
        <li><a href="/librarian" className="hover:underline">Librarian</a></li>
        <li><a href="/borrower" className="hover:underline">Borrower</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
