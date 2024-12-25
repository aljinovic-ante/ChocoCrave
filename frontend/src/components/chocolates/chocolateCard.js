import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/manufacturers.css';

const ChocolateCard = ({ chocolate, user, handleDeleteChocolate }) => {
  const pricePerKg =
    chocolate.weight && chocolate.price
      ? (chocolate.price / (parseInt(chocolate.weight) / 1000)).toFixed(2)
      : null;

  return (
    <div className="manufacturer-item" key={chocolate._id}>
      <Link to={`/chocolates/${chocolate._id}`} className="manufacturer-link">
        {chocolate.image && (
          <img
            src={chocolate.image}
            alt={`${chocolate.name} image`}
            className="manufacturer-logo"
          />
        )}
        <p className="manufacturer-name">{chocolate.name}</p>
      </Link>
      <p className="chocolate-price">Price: {chocolate.price.toFixed(2)}€/kom</p>
      {pricePerKg && (
        <p className="chocolate-price-per-kg">Price per kg: {pricePerKg}€/kg</p>
      )}
      <div className="manufacturer-actions">
        <Link to={`/chocolates/${chocolate._id}`} className="view-button">Details</Link>
      </div>
    </div>
  );
};

export default ChocolateCard;