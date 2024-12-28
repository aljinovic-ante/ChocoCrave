import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import useGetCart from '../../hooks/cart/useGetCart';
import useDeleteCartItem from '../../hooks/cart/useDeleteCartItem';
import useUpdateCartItem from '../../hooks/cart/usePutCartItem';
import '../../css/cart.css';

const Cart = () => {
  const { user } = useAuth();
  const { cart, loading } = useGetCart(user?.id);
  const { deleteCartItem, loading: deleteLoading, error: deleteError } = useDeleteCartItem();
  const { updateCartItem, loading: updateLoading, error: updateError } = useUpdateCartItem();

  const handleRemove = async (chocolateId) => {
    const success = await deleteCartItem(user.id, chocolateId);
    if (success) {
      window.location.reload();
    }
  };

  const handleUpdateQuantity = async (chocolateId, newQuantity) => {
    if (newQuantity <= 0) {
      await handleRemove(chocolateId);
      return;
    }
    const success = await updateCartItem(user.id, chocolateId, newQuantity);
    if (success) {
      window.location.reload();
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!cart || cart.length === 0) {
    return (
      <div
        className="cart-container"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          height: '100vh',
          paddingTop: '10vh',
          backgroundColor: 'rgba(44, 13, 4, 0.923)',
        }}
      >
        <div
          style={{
            backgroundColor: 'white',
            padding: '30px 50px',
            borderRadius: '10px',
            textAlign: 'center',
            border: '4px solid gold',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          }}
        >
          <p style={{ fontSize: '3rem', color: 'black', margin: 0 }}>
            Your cart is empty :)
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="cart-container">
      <h2 style={{ color: 'white' }}>Your Cart</h2>
      <hr
        style={{
          border: 'none',
          height: '3px',
          backgroundColor: 'white',
          margin: '20px 0',
        }}
      />
      <div className="cart-list">
        {cart.map((item) => {
        if (!item.chocolate_id || typeof item.chocolate_id !== 'object') {
          console.warn("Invalid chocolate_id:", item);
          return null;
        }
        return (
          <div className="cart-item" key={item.chocolate_id._id}>
            <Link to={`/chocolates/${item.chocolate_id._id}`}>
              {item.chocolate_id.image ? (
                <img src={item.chocolate_id.image} alt={item.chocolate_id.name} />
              ) : (
                <div className="placeholder-image">No Image Available</div>
              )}
            </Link>
            <div className="cart-info">
              <Link to={`/chocolates/${item.chocolate_id._id}`}>
                <h3>{item.chocolate_id.name}</h3>
              </Link>
              <p>Price: {item.chocolate_id.price}€/kom</p>
              <p>Quantity: {item.quantity}</p>
              <button
                className="remove-button"
                onClick={() => handleRemove(item.chocolate._id)}
                disabled={deleteLoading}
              >
                {deleteLoading ? 'Removing...' : 'Remove'}
              </button>
              <button
                className="update-button"
                onClick={() =>
                  handleUpdateQuantity(item.chocolate._id, item.quantity + 1)
                }
                disabled={updateLoading}
              >
                +
              </button>
              <button
                className="update-button"
                onClick={() =>
                  handleUpdateQuantity(item.chocolate._id, item.quantity - 1)
                }
                disabled={updateLoading}
              >
                -
              </button>
              {deleteError && <p style={{ color: 'red' }}>{deleteError}</p>}
              {updateError && <p style={{ color: 'red' }}>{updateError}</p>}
            </div>
          </div>
        )})}
      </div>
    </div>
  );
};

export default Cart;
