import { useState } from 'react';

const usePostManufacturer = () => {
  const [postError, setPostError] = useState(null);

  const postManufacturer = async (manufacturerData) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setPostError('No token provided');
        return false;
      }

      const response = await fetch('http://localhost:5000/api/manufacturers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(manufacturerData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setPostError(errorData.error || 'Failed to create manufacturer');
        return false;
      }

      return true;
    } catch (error) {
      setPostError(error.message || 'An unknown error occurred');
      return false;
    }
  };

  return { postManufacturer, postError };
};

export default usePostManufacturer;
