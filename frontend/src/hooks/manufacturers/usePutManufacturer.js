import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const usePutManufacturer = () => {
  const { authToken } = useAuth();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const putManufacturer = async (id, manufacturerData) => {
    try {
      const response = await fetch(`http://localhost:5000/manufacturers/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(manufacturerData),
      });

      if (response.ok) {
        navigate('/manufacturers');
      } else {
        setError('Failed to update manufacturer');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return { putManufacturer, error };
};

export default usePutManufacturer;
