import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import useGetFavorites from '../../hooks/favorites/useGetFavorites';
import useDeleteFavorite from '../../hooks/favorites/useDeleteFavorite';
import '../../css/cart.css';

const Favorites = () => {
  const { user } = useAuth();
  const { favorites, loading } = useGetFavorites(user.id);
  const { deleteFavorite, loading: deleteLoading, error: deleteError } = useDeleteFavorite();
  const [showModal, setShowModal] = useState(false);
  const [removedItemName, setRemovedItemName] = useState('');

  const handleRemove = async (chocolateId, chocolateName) => {
    try {
      const success = await deleteFavorite(user.id, chocolateId);
      if (success) {
        setRemovedItemName(chocolateName);
        setShowModal(true);
      }
    } catch (err) {
      console.error('Error removing favorite:', err.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!favorites || favorites.length === 0) {
    return (
      <div
        className="cart-container"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          backgroundColor: 'rgba(44, 13, 4, 0.923)',
        }}
      >
        <div
          style={{
            backgroundColor: 'white',
            padding: '30px 150px',
            transform: 'translateY(-200%)',
            borderRadius: '10px',
            textAlign: 'center',
            border: '4px solid gold',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          }}
        >
          <p style={{ fontSize: '3rem', color: 'black', margin: 0 }}>
            You have no favorites yet!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2 style={{ color: 'white' }}>Your Favorite Chocolates</h2>
      <hr
        style={{
          border: 'none',
          height: '3px',
          backgroundColor: 'white',
          margin: '20px 0',
        }}
      />
      <div className="cart-list">
        {favorites.map((chocolate) => (
          <div className="cart-item" key={chocolate._id}>
            <Link to={`/chocolates/${chocolate._id}`}>
              {chocolate.image ? (
                <img src={chocolate.image} alt={chocolate.name} />
              ) : (
                <div className="placeholder-image">No Image Available</div>
              )}
            </Link>
            <div className="cart-info">
              <Link
                to={`/chocolates/${chocolate._id}`}
                className="cart-item-name"
              >
                {chocolate.name}
              </Link>
              <div className="cart-actions">
                <p>Price: <strong>{chocolate.price.toFixed(2)}€</strong></p>
                <div className="vertical-line"></div>
                <button
                  className="remove-button"
                  onClick={() => handleRemove(chocolate._id, chocolate.name)}
                  disabled={deleteLoading}
                >
                  {deleteLoading ? 'Removing...' : 'Remove from Favorites'}
                </button>
              </div>
              {deleteError && <p style={{ color: 'red' }}>{deleteError}</p>}
            </div>
          </div>
        ))}
        {showModal && (
          <div className="modal-overlay">
            <div className="modal">
              <h3>Favorite Removed</h3>
              <p>
                The item <strong>{removedItemName}</strong> has been removed from your favorites.
              </p>
              <button
                className="close-modal-button"
                onClick={() => {
                  setShowModal(false);
                  window.location.reload();
                }}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;