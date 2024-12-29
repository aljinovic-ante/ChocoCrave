import { useState, useEffect } from 'react';

const useGetManufacturer = (id) => {
  const [manufacturer, setManufacturer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchManufacturer = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:5000/api/manufacturers/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch manufacturer');
        }
        const data = await response.json();
        setManufacturer(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchManufacturer();
    }
  }, [id]);

  return { manufacturer, loading, error };
};

export default useGetManufacturer;