
import React from 'react';
import Sidebar from '../components/Sidebar';

const LibrarianDashboard = () => {
  return (
    <div className="flex">
      <Sidebar role="Librarian" />
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold">Librarian Dashboard</h1>
        <p>Welcome to the Librarian Dashboard.</p>
      </main>
    </div>
  );
};

export default LibrarianDashboard;
