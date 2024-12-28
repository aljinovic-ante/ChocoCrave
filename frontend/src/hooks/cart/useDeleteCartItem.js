import { useState } from 'react';

const useDeleteCartItem = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteCartItem = async (userId, chocolateId) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/api/cart/remove', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ userId, chocolateId }),
      });

      if (!response.ok) {
        throw new Error('Failed to remove item from cart');
      }

      return true;
    } catch (err) {
      setError(err.message || 'Error removing item from cart');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { deleteCartItem, loading, error };
};

export default useDeleteCartItem;