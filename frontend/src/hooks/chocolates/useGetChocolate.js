import { useState, useEffect } from 'react';

const useGetChocolate = (id) => {
  const [chocolate, setChocolate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChocolate = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:5000/api/chocolates/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch chocolate');
        }
        const data = await response.json();
        setChocolate(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchChocolate();
    }
  }, [id]);

  return { chocolate, loading, error };
};

export default useGetChocolate;