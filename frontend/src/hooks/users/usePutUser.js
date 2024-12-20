import { useState } from 'react';

const usePutUser = () => {
  const [putError, setPutError] = useState(null);

  const putUser = async (id, userData) => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Failed to update user');
      }

      return await response.json();
    } catch (err) {
      setPutError(err.message);
    }
  };

  return { putUser, putError };
};

export default usePutUser;
