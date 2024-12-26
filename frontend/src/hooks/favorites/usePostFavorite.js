import { useState } from 'react';

const usePostFavorite = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addToFavorites = async (userId, chocolateId) => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No token provided');
        return false;
      }

      console.log("USER ID: ", userId);
      console.log("Chocolate ID: ", chocolateId);

      const response = await fetch('http://localhost:5000/api/favorites/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId, chocolateId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to add chocolate to favorites');
        return false;
      }

      const result = await response.json();
      console.log(result.message);

      return true;
    } catch (error) {
      setError(error.message || 'An unknown error occurred');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { addToFavorites, loading, error };
};

export default usePostFavorite;