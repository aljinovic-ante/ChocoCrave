import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const usePostRegister = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const postRegister = async (username, email, password) => {
    try {
      const response = await fetch('http://localhost:5000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        navigate('/'); //zaljant ovo triba ic u login
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Registration failed.');
      }
    } catch (error) {
      setError('An error occurred during registration.');
    }
  };

  return { postRegister, error };
};

export default usePostRegister;