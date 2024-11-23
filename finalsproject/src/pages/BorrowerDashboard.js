
import React from 'react';
import Sidebar from '../components/Sidebar';

const BorrowerDashboard = () => {
  return (
    <div className="flex">
      <Sidebar role="Borrower" />
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold">Borrower Dashboard</h1>
        <p>Welcome to the Borrower Dashboard.</p>
      </main>
    </div>
  );
};

export default BorrowerDashboard;
