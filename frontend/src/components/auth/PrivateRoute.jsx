import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const checkAuth = async () => {
  try {
    const response = await axios.get('http://localhost:3000/auth/validate', {
      withCredentials: true,
    });
    console.log('Auth validation response:', response.data);
    return response.data.user;
  } catch (error) {
    console.error('Error during auth validation:', error);
    return null;
  }
};

const PrivateRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchAuthStatus = async () => {
      try {
        const user = await checkAuth();
        setIsAuthenticated(!!user);
      } catch (error) {
        console.error('Error fetching auth status:', error);
      } finally {
        setLoading(false); // Ensure loading state is cleared
      }
    };
  
    fetchAuthStatus();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
