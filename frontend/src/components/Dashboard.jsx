import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/dashboard.css';

import Header from './Header';

function Dashboard() {
  return (
    <div className="dashboard">
      <Header />
      <main className="content-container">
        <div className="collection-container">
          
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
