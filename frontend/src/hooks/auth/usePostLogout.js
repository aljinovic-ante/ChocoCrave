import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const usePostLogout = () => {
  const { authToken, logout } = useAuth();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const postLogout = async () => {
    try {
      const response = await fetch('http://localhost:5000/auth/logout', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (response.ok) {
        logout();
        navigate('/login');
      } else {
        setError('Logout failed.');
      }
    } catch (error) {
      setError(error);
    }
  };

  return { postLogout, error };
};

export default usePostLogout;
