import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../../css/navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="custom-navbar">
      <div className="nav-left">
        <a href="/" className="nav-link">Home</a>
      </div>

      <p className="navbar-brand">ChocoCrave</p>

      <div className="nav-right">
        {user && (
          <>
            <span className="username">Hello, {user.username}</span>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
