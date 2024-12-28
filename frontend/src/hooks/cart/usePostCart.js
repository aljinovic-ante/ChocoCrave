import { useState } from 'react';

const usePostCartItem = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addToCart = async (userId, chocolateId, quantity) => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No token provided');
        return false;
      }

      const response = await fetch('http://localhost:5000/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId, chocolateId, quantity }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to add item to cart');
        return false;
      }

      return true;
    } catch (error) {
      setError(error.message || 'An unknown error occurred');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { addToCart, loading, error };
};

export default usePostCartItem;
