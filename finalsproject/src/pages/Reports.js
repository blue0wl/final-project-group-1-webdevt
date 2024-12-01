import './css-components/Reports.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Reports = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);  
  };

  return (
    <div className="reports-container">
      <header>
        <h1 className="reports-title">Reports</h1>
      </header>

      <section className="reports-content">
        <p>Here you can view and manage the reports.</p>
        {/* You can add content related to reports here */}
      </section>

      <button className="back-button" onClick={handleBack}>
        Back
      </button>
    </div>
  );
};

export default Reports;
