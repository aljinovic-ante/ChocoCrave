import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useGetChocolates from '../../hooks/chocolates/useGetChocolates';
import useGetFavorites from '../../hooks/favorites/useGetFavorites';
import ChocolateCard from './chocolateCard';
import { useAuth } from '../../context/AuthContext';
import usePostFavorite from '../../hooks/favorites/usePostFavorite';
import '../../css/chocolates.css';

const Chocolates = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { chocolates, loading, error } = useGetChocolates();
  const { favorites, loading: favoritesLoading } = useGetFavorites(user?.id);
  const { addToFavorites, loading: addingToFavorites, error: addFavoriteError } = usePostFavorite();
  const [localFavorites, setLocalFavorites] = useState([]);

  useEffect(() => {
    setLocalFavorites(favorites);
  }, [favorites]);

  if (!user) {
    navigate('/login');
    return null;
  }

  if (loading || favoritesLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const handleAddToFavorites = async (chocolateId) => {
    const success = await addToFavorites(user.id, chocolateId);
    if (success) {
      const newFavorite = chocolates.find((chocolate) => chocolate._id === chocolateId);
      setLocalFavorites([...localFavorites, newFavorite]);
    }
  };

  return (
    <div className="chocolates-container">
      <div className="header">
        <h2 className="header-title">All Chocolates</h2>
        {user.isAdmin && (
          <Link to="/chocolates/add" className="create-button">
            Add a Chocolate
          </Link>
        )}
      </div>
      <hr
        style={{
          border: 'none',
          height: '3px',
          backgroundColor: 'white',
          margin: '20px 0',
        }}
      />
      <div className="list-container2">
        {chocolates.map((chocolate) => (
          <ChocolateCard
            key={chocolate._id}
            chocolate={chocolate}
            user={user}
            isInFavorites={localFavorites.some((fav) => fav._id === chocolate._id)}
            handleAddToFavorites={() => handleAddToFavorites(chocolate._id)}
          />
        ))}
      </div>
      {addingToFavorites && <p>Adding to favorites...</p>}
      {addFavoriteError && <p>Error: {addFavoriteError}</p>}
    </div>
  );
};

export default Chocolates;