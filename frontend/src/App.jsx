import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import './styles/app.css';

import PrivateRoute from './components/auth/PrivateRoute';

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
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/create_collection"
          element={
            <PrivateRoute>
              <CreateCollection />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
