import { useState, useEffect } from 'react';

const useGetFavorites = (userId) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('User is not authenticated');
        }
    
        const response = await fetch(`http://localhost:5000/api/favorites/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if(response.status===404){
          setError('You have no favorites yet');
          return { favorites, loading, error };
        }
        if (!response.ok) {
          throw new Error('Failed to fetch favorites');
        }
    
        const data = await response.json();
        setFavorites(data.filter(choco => choco !== null));
      } catch (err) {
        console.error('Error fetching favorites:', err);
        setError(err.message || 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };    

    if (userId) {
      fetchFavorites();
    }
  }, [userId]);

  return { favorites, loading, error };
};

export default useGetFavorites;
