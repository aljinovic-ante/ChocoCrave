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
        const errorData = await response.json();
        if (response.status === 400 && errorData.error) {
          throw new Error(errorData.error);
        }
        throw new Error('Failed to delete manufacturer');
      }

      await response.json();
      refetchManufacturers();
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return { deleteManufacturer, error };
};

export default useDeleteManufacturer;
