import { useState } from 'react';

const useChangePassword = () => {
  const [changePasswordError, setChangePasswordError] = useState(null);

  const changePassword = async (id, passwords) => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/${id}/change-password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(passwords),
      });

      if (!response.ok) {
        throw new Error('Failed to change password');
      }

      return await response.json();
    } catch (err) {
      setChangePasswordError(err.message);
    }
  };

  return { changePassword, changePasswordError };
};

export default useChangePassword;