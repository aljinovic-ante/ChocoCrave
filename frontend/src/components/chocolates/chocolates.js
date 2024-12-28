import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useGetChocolates from '../../hooks/chocolates/useGetChocolates';
import useGetFavorites from '../../hooks/favorites/useGetFavorites';
import useGetCart from '../../hooks/cart/useGetCart';
import usePostCartItem from '../../hooks/cart/usePostCartItem';
import ChocolateCard from './chocolateCard';
import { useAuth } from '../../context/AuthContext';
import usePostFavorite from '../../hooks/favorites/usePostFavorite';
import '../../css/chocolates.css';
import useDeleteFavorite from '../../hooks/favorites/useDeleteFavorite';

const Chocolates = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { chocolates, loading, error } = useGetChocolates();
  const { favorites, loading: favoritesLoading } = useGetFavorites(user?.id);
  const { cart, refetchCart } = useGetCart(user?.id);
  const { addToCart, loading: addingToCart, error: addCartError } = usePostCartItem();
  const { addToFavorites, loading: addingToFavorites, error: addFavoriteError } = usePostFavorite();

  const [localFavorites, setLocalFavorites] = useState([]);
  const [localCart, setLocalCart] = useState([]);
  const { deleteFavorite } = useDeleteFavorite();

  const handleToggleFavorite = async (chocolateId) => {
    if (localFavorites.some((fav) => fav._id === chocolateId)) {
      const success = await deleteFavorite(user.id, chocolateId);
      if (success) {
        setLocalFavorites(localFavorites.filter((fav) => fav._id !== chocolateId));
      }
    } else {
      const success = await addToFavorites(user.id, chocolateId);
      if (success) {
        const newFavorite = chocolates.find((chocolate) => chocolate._id === chocolateId);
        setLocalFavorites([...localFavorites, newFavorite]);
      }
    }
  };

  useEffect(() => {
    setLocalFavorites(favorites);
  }, [favorites]);

  useEffect(() => {
    setLocalCart(cart);
  }, [cart]);

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

  const handleAddToCart = async (chocolate) => {
    try {
      await addToCart(user.id, chocolate._id, 1);
      const updatedCart = await refetchCart();
      setLocalCart(updatedCart);
    } catch (err) {
      console.error('Error adding to cart:', err.message);
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
            isInCart={localCart.some((item) => item.chocolate_id._id === chocolate._id)}
            handleToggleFavorite={() => handleToggleFavorite(chocolate._id)}
            handleAddToCart={() => handleAddToCart(chocolate)}
          />
        ))}
      </div>
      {addingToFavorites && <p>Adding to favorites...</p>}
      {addFavoriteError && <p>Error: {addFavoriteError}</p>}
      {addingToCart && <p>Adding to cart...</p>}
      {addCartError && <p>Error: {addCartError}</p>}
    </div>
  );
};

export default Chocolates;