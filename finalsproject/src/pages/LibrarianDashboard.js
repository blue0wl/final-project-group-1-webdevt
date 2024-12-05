import React from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import './css-components/Dashboard.css';
import Reports from './Reports';

const LibrarianDashboard = ({ logList, setLogList }) => {
    const location = useLocation(); 
    const { role, email } = location.state || {}; 

    console.log("Location state:", location.state); 

    if (!role || !email ) {
        return <p>Error: Missing role or email.</p>; 
    }

    return (
        <div className={`dashboard-container`}>
            <Sidebar role={role} user={location.state} logList={logList} setLogList={setLogList}/>
            <main className="dashboard-content">
                <header>
                    <h1 className="dashboard-title">{role} Dashboard</h1>
                    <p className="dashboard-description">Welcome, {location.state.name}!</p>
                </header>
                <section className="dashboard-description">
                    <p>From here, you can manage books, reservations, and returns.</p>
                </section>
            </main>
            
        </div>
    );
};

export default LibrarianDashboard;
