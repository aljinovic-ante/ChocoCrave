import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useGetChocolates from '../../hooks/chocolates/useGetChocolates';
import useGetFavorites from '../../hooks/favorites/useGetFavorites';
import useGetCart from '../../hooks/cart/useGetCart';
import usePostCartItem from '../../hooks/cart/usePostCartItem';
import useDeleteCartItem from '../../hooks/cart/useDeleteCartItem';
import ChocolateCard from './chocolateCard';
import { useAuth } from '../../context/AuthContext';
import usePostFavorite from '../../hooks/favorites/usePostFavorite';
import useDeleteFavorite from '../../hooks/favorites/useDeleteFavorite';
import '../../css/chocolates.css';

const Chocolates = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { chocolates, loading, error } = useGetChocolates();
  const { favorites, loading: favoritesLoading } = useGetFavorites(user?.id);
  const { cart, refetchCart } = useGetCart(user?.id);
  const { addToCart } = usePostCartItem();
  const { deleteCartItem } = useDeleteCartItem();
  const { addToFavorites } = usePostFavorite();
  const { deleteFavorite } = useDeleteFavorite();

  const [localFavorites, setLocalFavorites] = useState([]);
  const [localCart, setLocalCart] = useState([]);

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

  const handleToggleCart = async (chocolateId) => {
    if (localCart.some((item) => item.chocolate_id._id === chocolateId)) {
      const success = await deleteCartItem(user.id, chocolateId);
      if (success) {
        setLocalCart(localCart.filter((item) => item.chocolate_id._id !== chocolateId));
      }
    } else {
      const success = await addToCart(user.id, chocolateId, 1);
      if (success) {
        const newCartItem = chocolates.find((chocolate) => chocolate._id === chocolateId);
        setLocalCart([...localCart, { chocolate_id: newCartItem, quantity: 1 }]);
      }
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
            handleToggleCart={() => handleToggleCart(chocolate._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Chocolates;