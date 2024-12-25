import { useState } from 'react';

const useDeleteChocolate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteChocolate = async (id, refetchChocolates) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`http://localhost:5000/api/chocolates/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete chocolate');
      }

      if (refetchChocolates) {
        await refetchChocolates();
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { deleteChocolate, loading, error };
};

export default useDeleteChocolate;