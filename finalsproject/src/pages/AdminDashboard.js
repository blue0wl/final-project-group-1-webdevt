
import React from 'react';
import Sidebar from '../components/Sidebar';

const AdminDashboard = () => {
  return (
    <div className="flex">
      <Sidebar role="Admin" />
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p>Welcome to the Admin Dashboard.</p>
      </main>
    </div>
  );
};

export default AdminDashboard;
