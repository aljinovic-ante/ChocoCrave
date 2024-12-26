import React from 'react';
import { useAuth } from '../../context/AuthContext';
import useGetFavorites from '../../hooks/favorites/useGetFavorites';
import '../../css/favorites.css';

const Favorites = () => {
  const { user } = useAuth();
  const { favorites, loading, error } = useGetFavorites(user.id);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="favorites-container">
      <h2>Your Favorite Chocolates</h2>
      {favorites.length === 0 ? (
        <p>You have no favorites yet!</p>
      ) : (
        <div className="favorites-list">
          {favorites.map((chocolate) => (
            <div className="favorite-item" key={chocolate._id}>
              <img src={chocolate.image} alt={chocolate.name} />
              <div className="favorite-info">
                <h3>{chocolate.name}</h3>
                <p>{chocolate.description}</p>
                <p>{chocolate.price}€/kom</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
