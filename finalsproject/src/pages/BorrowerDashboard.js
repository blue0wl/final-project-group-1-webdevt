import React from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import './css-components/Dashboard.css';

const BorrowerDashboard = () => {
    const location = useLocation(); 
    const { role, email, name } = location.state || {}; 

    console.log("Location state:", location.state); 

    if (!role || !email || !name) {
        return <p>Error: Missing role or email.</p>; 
    }

    return (
        <div className={`dashboard-container ${role.toLowerCase()}`}>
            <Sidebar role={role} />
            <main className="dashboard-content">
                <header>
                    <h1 className="dashboard-title">{role} Dashboard</h1>
                    <p className="dashboard-description">Welcome, {name}!</p>
                </header>
                <section className="dashboard-description">
                    <p>From here, you can search for books and view your borrowing logs.</p>
                </section>
                <section className="dashboard-actions">
                    <button className="dashboard-btn">Search Books</button>
                    <button className="dashboard-btn">Borrowing Logs</button>
                </section>
            </main>
        </div>
    );
};

export default BorrowerDashboard;
