import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { token } = useAuth();

  if (!token) {
    return (
      <Navigate
        to="/login"
        state={{ message: 'You need to be logged in' }}
      />
    );
  }

  return children;
};

export default PrivateRoute;