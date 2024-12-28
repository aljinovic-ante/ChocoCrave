import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import useGetChocolate from '../../hooks/chocolates/useGetChocolate';
import { useAuth } from '../../context/AuthContext';
import useDeleteChocolate from '../../hooks/chocolates/useDeleteChocolate';
import useGetChocolates from '../../hooks/chocolates/useGetChocolates';
import usePostFavorite from '../../hooks/favorites/usePostFavorite';
import usePostCartItem from '../../hooks/cart/usePostCartItem';
import useGetCart from '../../hooks/cart/useGetCart';
import useGetFavorites from '../../hooks/favorites/useGetFavorites';
import '../../css/chocolateDetails.css';
import useDeleteFavorite from '../../hooks/favorites/useDeleteFavorite';

const ChocolateDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { chocolate, loading, error } = useGetChocolate(id);
  const { user } = useAuth();
  const { deleteChocolate } = useDeleteChocolate();
  const { refetchChocolates } = useGetChocolates();
  const { favorites, loading: favoritesLoading } = useGetFavorites(user?.id);
  const { cart, loading: cartLoading, refetchCart } = useGetCart(user?.id);
  const { addToFavorites } = usePostFavorite();
  const { addToCart } = usePostCartItem();
  const { deleteFavorite } = useDeleteFavorite();
  const [isInFavorites, setIsInFavorites] = useState(false);
  const [cartItem, setCartItem] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  useEffect(() => {
    if (favorites && chocolate) {
      setIsInFavorites(favorites.some((fav) => fav._id === chocolate._id));
    }
  }, [favorites, chocolate]);

  useEffect(() => {
    if (cart && chocolate) {
      const item = cart.find((item) => item.chocolate_id && item.chocolate_id._id === chocolate._id);
      setCartItem(item);
    }
  }, [cart, chocolate]);

  const handleDelete = async () => {
    try {
      await deleteChocolate(chocolate._id, refetchChocolates);
      setShowDeleteModal(false);
      setShowSuccessModal(true);
    } catch (err) {
      console.error('Failed to delete chocolate:', err.message);
      setShowDeleteModal(false);
      setShowErrorModal(true);
    }
  };

  const handleAddToFavorites = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    try {
      await addToFavorites(user.id, chocolate._id);
      setIsInFavorites(true);
    } catch (err) {
      console.error('Error adding to favorites:', err.message);
    }
  };

  const handleToggleFavorite = async () => {
    if (isInFavorites) {
      // Remove from favorites
      try {
        const success = await deleteFavorite(user.id, chocolate._id);
        if (success) {
          setIsInFavorites(false);
        }
      } catch (err) {
        console.error('Error removing from favorites:', err.message);
      }
    } else {
      // Add to favorites
      try {
        await addToFavorites(user.id, chocolate._id);
        setIsInFavorites(true);
      } catch (err) {
        console.error('Error adding to favorites:', err.message);
      }
    }
  };

  const handleAddToCart = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
  
    try {
      if (cartItem) {
        setCartItem({ ...cartItem, quantity: cartItem.quantity + 1 });
      } else {
        setCartItem({ chocolate_id: chocolate, quantity: 1 });
      }
  
      await addToCart(user.id, chocolate._id, 1);
  
      const updatedCart = await refetchCart();
      const updatedItem = updatedCart.find((item) => item.chocolate_id && item.chocolate_id._id === chocolate._id);
  
      setCartItem(updatedItem);
    } catch (err) {
      console.error('Error adding to cart:', err.message);
    }
  };
  

  if (loading || favoritesLoading || cartLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="chocolate-details-container">
      <h2 className="chocolate-title">{chocolate.name}</h2>
      <hr
        style={{
          border: 'none',
          height: '3px',
          backgroundColor: 'white',
          margin: '20px 0',
        }}
      />
      <div className="details-wrapper">
        <div className="details-image">
          {chocolate.image ? (
            <img
              src={chocolate.image}
              alt={`${chocolate.name} image`}
              className="chocolate-image"
            />
          ) : (
            <h3 className="no-image-text">No Image Available</h3>
          )}
        </div>
        <div className="details-content">
          <div className="info-main">
            <p className="info-text"><strong>Name:</strong> {chocolate.name}</p>
            <p className="info-text"><strong>Price:</strong> {chocolate.price?.toFixed(2) || 'N/A'}€</p>
            <p className="info-text"><strong>Cocoa Percentage:</strong> {chocolate.cocoa_percentage || 'N/A'}%</p>
            <p className="info-text"><strong>Type:</strong> {chocolate.type || 'N/A'}</p>
            <p className="info-text"><strong>Weight:</strong> {chocolate.weight || 'N/A'}</p>
            <p className="info-text"><strong>Color:</strong> {chocolate.color || 'N/A'}</p>
            <p className="info-text"><strong>Description:</strong> {chocolate.description || 'No description provided.'}</p>
          </div>
          <div className="very-special-div">
            {chocolate.nutritional_info && (
              <div className="nutrition-info">
                <h4 className="nutrition-title">Nutritional Info:</h4>
                <p className="info-text"><strong>Calories:</strong> {chocolate.nutritional_info.calories || 'N/A'} kcal</p>
                <p className="info-text"><strong>Fat:</strong> {chocolate.nutritional_info.fat || 'N/A'} g</p>
                <p className="info-text"><strong>Protein:</strong> {chocolate.nutritional_info.protein || 'N/A'} g</p>
                <p className="info-text"><strong>Carbohydrates:</strong> {chocolate.nutritional_info.carbohydrates || 'N/A'} g</p>
                <p className="info-text"><strong>Sugar:</strong> {chocolate.nutritional_info.sugar || 'N/A'} g</p>
              </div>
            )}
            <div className="special-div">
              <p className="info-text">
                <strong>Manufacturer: {chocolate.manufacturer_id.name}</strong>
              </p>
              <Link
                to={`/manufacturers/${chocolate.manufacturer_id._id}`}
                className="manufacturer-link22"
                style={{
                  display: 'inline-block',
                  padding: '10px 20px',
                  border: '2px solid #ffffff',
                  backgroundColor: 'rgb(200,165,158)',
                  color: '#ffffff',
                  textAlign: 'center',
                  textDecoration: 'none',
                  borderRadius: '5px',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  marginRight: '10px',
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = 'rgb(138,109,102)';
                  e.target.style.color = 'white';
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = 'rgb(200,165,158)';
                  e.target.style.color = 'white';
                }}
              >
                {chocolate.manufacturer_id.name} Info
              </Link>
              <button
                  onClick={handleToggleFavorite}
                  style={{
                    padding: '10px 20px',
                    border: `2px solid ${isInFavorites ? '#ff0000' : '#000000'}`,
                    backgroundColor: isInFavorites ? '#ffcccc' : '#ffffff',
                    color: isInFavorites ? '#ff0000' : '#000000',
                    borderRadius: '5px',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    marginRight: '10px',
                  }}
                >
                  {isInFavorites ? 'Remove from Favorites 🤍' : 'Add to Favorites ❤️'}
                </button>
              <button
                onClick={handleAddToCart}
                style={{
                  padding: '10px 20px',
                  border: '2px solid #ffffff',
                  backgroundColor: cartItem ? '#87CEEB' : '#00ff00',
                  color: '#ffffff',
                  borderRadius: '5px',
                  fontSize: '1rem',
                  cursor: 'pointer',
                }}
              >
                {cartItem ? `In Cart (${cartItem.quantity})` : '🛒 Add to Cart'}
              </button>
              {user?.isAdmin && (
                <div className="admin-actions">
                  <Link
                    to={`/chocolates/edit/${id}`}
                    className="edit-button2"
                    style={{ color: '#007bff', textDecoration: 'none' }}
                  >
                    Edit Product
                  </Link>
                  <button onClick={() => setShowDeleteModal(true)} className="delete-button">
                    Delete Product
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {showSuccessModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Deletion Successful</h3>
            <p>The chocolate <strong>{chocolate.name}</strong> was deleted successfully.</p>
            <div className="modal-actions">
              <button onClick={() => navigate('/')} className="cancel-button">Go Back</button>
            </div>
          </div>
        </div>
      )}

      {showErrorModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Deletion Failed</h3>
            <p>There was an error while deleting the chocolate <strong>{chocolate.name}</strong>.</p>
            <div className="modal-actions">
              <button onClick={() => setShowErrorModal(false)} className="cancel-button">Close</button>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete <strong>{chocolate.name}</strong>?</p>
            <div className="modal-actions">
              <button onClick={() => setShowDeleteModal(false)} className="cancel-button">Cancel</button>
              <button onClick={handleDelete} className="confirm-delete-button">Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChocolateDetails;
