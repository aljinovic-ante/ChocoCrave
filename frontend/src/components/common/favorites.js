import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import useGetFavorites from '../../hooks/favorites/useGetFavorites';
import useDeleteFavorite from '../../hooks/favorites/useDeleteFavorite';
import '../../css/favorites.css';

const Favorites = () => {
  const { user } = useAuth();
  const { favorites, loading } = useGetFavorites(user.id);
  const { deleteFavorite, loading: deleteLoading, error: deleteError } = useDeleteFavorite();

  const handleRemove = async (chocolateId) => {
    const success = await deleteFavorite(user.id, chocolateId);
    if (success) {
      window.location.reload();
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="favorites-container">
      {favorites.length !== 0 && <h2 style={{ color: 'white' }}>Your Favorite Chocolates</h2>}
      {favorites.length !== 0 && <hr
        style={{
          border: 'none',
          height: '3px',
          backgroundColor: 'white',
          margin: '20px 0',
        }}
      />}
      {favorites.length === 0 ? (
        <div style={{
          backgroundColor: 'white',
          padding: '10px 20px',
          borderRadius: '10px',
          display: 'inline-block',
          textAlign: 'center',
          margin: '50px auto',
          position: 'relative',
          left: '50%',
          transform: 'translateX(-50%)',
          border: '4px solid gold',
        }}>
          <p style={{ fontSize: '3rem', color: 'black', margin: 0 }}>You have no favorites yet!</p>
        </div>
        
      ) : (
        <div className="favorites-list">
          {favorites.map((chocolate) => (
            <div className="favorite-item" key={chocolate._id}>
              <Link to={`/chocolates/${chocolate._id}`}>
              {chocolate.image ? (
                <img src={chocolate.image} alt={chocolate.name} />
              ) : (
                <div className="placeholder-image">No Image Available</div>
              )}
              </Link>
              <div className="favorite-info">
                <Link to={`/chocolates/${chocolate._id}`}>
                  <h3>{chocolate.name}</h3>
                </Link>
                <p>{chocolate.price}€/kom</p>
                <button
                  className="remove-button"
                  onClick={() => handleRemove(chocolate._id)}
                  disabled={deleteLoading}
                >
                  {deleteLoading ? 'Removing...' : 'Remove from Favorites'}
                </button>
                {deleteError && <p style={{ color: 'red' }}>{deleteError}</p>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;