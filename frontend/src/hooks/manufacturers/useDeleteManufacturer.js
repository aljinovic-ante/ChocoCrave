import { useState } from 'react';

const useDeleteManufacturer = () => {
  const [error, setError] = useState(null);

  const deleteManufacturer = async (id, refetchManufacturers) => {
    try {
      const response = await fetch(`http://localhost:5000/api/manufacturers/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to delete manufacturer');
      }
      await response.json();
      refetchManufacturers();
    } catch (err) {
      setError(err.message);
    }
  };

  return { deleteManufacturer, error };
};

export default useDeleteManufacturer;
