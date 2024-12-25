import { useState } from 'react';

const useDeleteChocolate = () => {
  const [error, setError] = useState(null);

  const deleteChocolate = async (id, refetchChocolates) => {
    try {
      const response = await fetch(`http://localhost:5000/api/chocolates/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete chocolate');
      }

      await response.json();
      refetchChocolates();
    } catch (err) {
      setError(err.message);
    }
  };

  return { deleteChocolate, error };
};

export default useDeleteChocolate;