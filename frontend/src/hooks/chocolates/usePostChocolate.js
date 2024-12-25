import { useState } from 'react';

const usePostChocolate = () => {
  const [postError, setPostError] = useState(null);

  const postChocolate = async (chocolateData) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setPostError('No token provided');
        return false;
      }

      const response = await fetch('http://localhost:5000/api/chocolates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(chocolateData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setPostError(errorData.error || 'Failed to create chocolate');
        return false;
      }

      return true;
    } catch (error) {
      setPostError(error.message || 'An unknown error occurred');
      return false;
    }
  };

  return { postChocolate, postError };
};

export default usePostChocolate;