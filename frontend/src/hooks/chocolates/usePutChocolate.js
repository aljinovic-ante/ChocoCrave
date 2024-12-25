import { useState } from 'react';

const usePutChocolate = () => {
  const [putError, setPutError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const putChocolate = async (id, chocolateData) => {
    setIsLoading(true);
    setPutError(null);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setPutError('No token provided');
        throw new Error('No token provided');
      }

      const response = await fetch(`http://localhost:5000/api/chocolates/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(chocolateData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setPutError(errorData.error || 'Failed to update chocolate');
        return false;
      }

      const data = await response.json();
      console.log('Success response from backend:', data);
      return true;
    } catch (err) {
      console.error('Error in putChocolate:', err);
      setPutError(err.message || 'An unknown error occurred');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { putChocolate, putError, isLoading };
};

export default usePutChocolate;