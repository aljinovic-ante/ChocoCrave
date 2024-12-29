import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import useGetCart from '../../hooks/cart/useGetCart';
import useDeleteCartItem from '../../hooks/cart/useDeleteCartItem';
import useUpdateCartItem from '../../hooks/cart/usePutCartItem';
import '../../css/cart.css';
import { useState } from 'react';

const Cart = () => {
  const { user } = useAuth();
  const { cart, loading } = useGetCart(user?.id);
  const { deleteCartItem, loading: deleteLoading, error: deleteError } = useDeleteCartItem();
  const { updateCartItem, loading: updateLoading, error: updateError } = useUpdateCartItem();
  const [showModal, setShowModal] = useState(false);

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


  const handleBuy = async () => {
    try {
      for (const item of cart) {
        await deleteCartItem(user.id, item.chocolate_id._id);
      }
      setShowModal(true);
    } catch (error) {
      console.error('Error processing purchase:', error);
      alert('An error occurred while processing your purchase.');
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
        {cart.map((item) => (
          <div className="cart-item" key={item.chocolate_id._id}>
            <Link to={`/chocolates/${item.chocolate_id._id}`} className="chocolate-link">
              {item.chocolate_id.image ? (
                <img src={item.chocolate_id.image} alt={item.chocolate_id.name} />
              ) : (
                <div className="no-image-text">No Image Available</div>
              )}
            </Link>
            <div className="cart-info">
              <Link
                to={`/chocolates/${item.chocolate_id._id}`}
                className="cart-item-name"
              >
                {item.chocolate_id.name}
              </Link>
              <div className="cart-actions">
                <p>
                  Quantity: <strong>{item.quantity}</strong>
                </p>
                <p>Total Price: <strong>{(item.quantity * item.chocolate_id.price).toFixed(2)}€</strong></p>
                <div className="vertical-line"></div>
                <button
                  className="update-button"
                  onClick={() => handleUpdateQuantity(item.chocolate_id._id, item.quantity + 1)}
                  disabled={updateLoading}
                >
                  +
                </button>
                <button
                  className="update-button"
                  onClick={() => handleUpdateQuantity(item.chocolate_id._id, item.quantity - 1)}
                  disabled={updateLoading}
                >
                  -
                </button>
                <button
                  className="remove-button"
                  onClick={() => handleRemove(item.chocolate_id._id)}
                  disabled={deleteLoading}
                >
                  {deleteLoading ? 'Removing...' : 'Remove'}
                </button>
              </div>
            </div>
          </div>
        ))}
        {showModal && (
          <div className="modal-overlay">
            <div className="modal">
              <h3>Purchase Successful</h3>
              <p>All items have been bought successfully!</p>
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
        <div className="cart-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p className="cart-item-name" style={{ flex: '1' }}>
            Total Cart Price: <strong>{cart.reduce((acc, item) => acc + item.quantity * item.chocolate_id.price, 0).toFixed(2)}€</strong>
          </p>
          <div className="cart-actions" style={{ marginLeft: 'auto' }}>
            <button
              className="update-button"
              onClick={handleBuy}
              style={{
                padding: '20px 30px',
                backgroundColor: '#87ceeb',
                color: '#ffffff',
                border: '3px solid black',
                borderRadius: '5px',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease',
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#4682b4';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = '#87ceeb';
              }}
            >
              Buy All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
