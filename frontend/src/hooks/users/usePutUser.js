import { useState } from 'react';

const usePutUser = () => {
  const [putError, setPutError] = useState(null);

  const putUser = async (id, userData) => {
    setPutError(null);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setPutError('No token provided');
        throw new Error('No token provided');
      }

      const response = await fetch(`http://localhost:5000/api/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update user');
      }

      return await response.json();
    } catch (err) {
      console.error('Error updating user:', err);
      setPutError(err.message || 'An unknown error occurred');
      throw err;
    }
  };

  return { putUser, putError };
};

export default usePutUser;