import { useState } from 'react';

const usePutManufacturer = () => {
  const [putError, setPutError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const putManufacturer = async (id, manufacturerData) => {
    setIsLoading(true);
    setPutError(null);
  
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setPutError('No token provided');
        throw new Error('No token provided');
      }
  
      const response = await fetch(`http://localhost:5000/api/manufacturers/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(manufacturerData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        setPutError(errorData.error || 'Failed to update manufacturer');
        return false;
      }
  
      const data = await response.json();
      console.log('Success response from backend:', data);
      return true;
    } catch (err) {
      console.error('Error in putManufacturer:', err);
      setPutError(err.message || 'An unknown error occurred');
      return false;
    } finally {
      setIsLoading(false);
    }
  };  

  return { putManufacturer, putError, isLoading };
};

export default usePutManufacturer;