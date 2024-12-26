import { useState } from 'react';

const useDeleteFavorite = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteFavorite = async (userId, chocolateId) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/api/favorites/remove', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, chocolateId }),
      });

      if (!response.ok) {
        throw new Error('Failed to remove chocolate from favorites');
      }

      return true;
    } catch (err) {
      setError(err.message || 'Error removing from favorites');
      console.error('Error removing from favorites:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { deleteFavorite, loading, error };
};

export default useDeleteFavorite;