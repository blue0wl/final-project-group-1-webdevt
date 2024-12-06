import React from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import './css-components/Dashboard.css';
import ReportCard from '../components/ReportCard';

const BorrowerDashboard = ({ logList, setLogList }) => {
    const location = useLocation(); 
    const user = location.state || {};
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
                    <p>From here, you can search for books and view your borrowing logs.</p>
                    <ReportCard logList={logList} user={user} />
                </section>
            </main>
        </div>
    );
};

export default BorrowerDashboard;
