import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem('user'))
  );
  const [token, settoken] = useState(() =>
    localStorage.getItem('token')
  );

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');
    if (user && token) {
      setUser(user);
      settoken(token);
    }
  }, []);

  const login = (userData) => {
    setUser(userData.user);
    settoken(userData.token);
    localStorage.setItem('user', JSON.stringify(userData.user));
    localStorage.setItem('token', userData.token);
  };  

  const logout = () => {
    setUser(null);
    settoken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
  };
  return (
    <AuthContext.Provider value={{ user, setUser, token, settoken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;