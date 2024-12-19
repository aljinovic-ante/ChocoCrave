import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const usePostLogin = () => {
  const { login } = useAuth();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const postLogin = async (identifier, password) => {
    try {
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ identifier, password }),
      });

      if (response.ok) {
        const data = await response.json();
        login(data);
        localStorage.setItem('authToken', data.token);
        navigate('/');
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Invalid email/username or password');
      }
    } catch (err) {
      setError('An error occurred while logging in.');
    }
  };

  return { postLogin, error };
};

export default usePostLogin;