import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/manufacturers.css';

const ChocolateCard = ({ chocolate, user, handleAddToFavorites }) => {
  const pricePerKg =
    chocolate.weight && chocolate.price
      ? (chocolate.price / (parseInt(chocolate.weight) / 1000)).toFixed(2)
      : null;

  return (
    <div className="manufacturer-item2" key={chocolate._id}>
      <Link to={`/chocolates/${chocolate._id}`} className="manufacturer-link">
        {chocolate.image ? (
          <img
            src={chocolate.image}
            alt={`${chocolate.name} image`}
            className="chocolate-image"
          />
        ) : (
          <h3 className="no-image-text">No Image Available</h3>
        )}
        <p className="manufacturer-name"><strong>{chocolate.name}</strong></p>
      </Link>
      <p className="chocolate-price">Price: <strong>{chocolate.price.toFixed(2)}€/kom</strong></p>
      {pricePerKg && (
        <p className="chocolate-price-per-kg">Price per kg: <strong>{pricePerKg}€/kg</strong></p>
      )}
      <div className="manufacturer-actions">
        <Link to={`/chocolates/${chocolate._id}`} className="view-button">Details</Link>
        <button
          className="add-to-favorites-button"
          onClick={() => handleAddToFavorites(chocolate._id)}
        >
          Add to Favorites
        </button>
      </div>
    </div>
  );
};

export default ChocolateCard;