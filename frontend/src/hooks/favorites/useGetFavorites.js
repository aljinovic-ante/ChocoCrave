import { useState, useEffect } from 'react';

const useGetFavorites = (userId) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        console.log(`EEEEEJJ GET FAVORITES TU SMO Fetching favorites for user ID: ${userId}`);
    
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('User is not authenticated');
        }
    
        console.log('Using token:', token);
    
        const response = await fetch(`http://localhost:5000/api/favorites/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
    
        console.log('Response received:', response);
        if (!response.ok) {
          throw new Error('Failed to fetch favorites');
        }
    
        const data = await response.json();
        console.log('Favorites data:', data);
        setFavorites(data);
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
