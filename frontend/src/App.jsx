import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { useState } from 'react';
import './styles/app.css';

import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import CreateCollection from './components/CreateCollection';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create_collection" element={<CreateCollection />} />
      </Routes>
    </Router>
  );
}

export default App;
