import { useState } from 'react';

const useDeleteUser = () => {
  const [deleteError, setDeleteError] = useState(null);

  const deleteUser = async (id, refetchUsers) => {
    setDeleteError(null);
    try {
      const response = await fetch(`http://localhost:5000/api/users/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete user');
      }
  
      await response.json();
      refetchUsers();
    } catch (err) {
      setDeleteError(err.message);
    }
  };  
  return { deleteUser, deleteError };
};

export default useDeleteUser;
