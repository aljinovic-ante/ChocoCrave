import { useState } from 'react';

const usePutCartItem = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateCartItem = async (userId, chocolateId, quantity) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/api/cart/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ userId, chocolateId, quantity }),
      });

      if (!response.ok) {
        throw new Error('Failed to update item quantity in cart');
      }

      return true;
    } catch (err) {
      setError(err.message || 'Error updating item in cart');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { updateCartItem, loading, error };
};

export default usePutCartItem;
