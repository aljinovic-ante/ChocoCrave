import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/manufacturers.css';

const ChocolateCard = ({ chocolate, user, handleAddToFavorites, isInFavorites }) => {
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
          style={{
            backgroundColor: isInFavorites ? "#a9a9a9" : "#e76f51",
            color: "white",
            padding: "8px 16px",
            border: "none",
            borderRadius: "4px",
            cursor: isInFavorites ? "not-allowed" : "pointer",
            fontSize: "1rem",
            transition: "background-color 0.3s ease",
            marginTop: "2px",
          }}
          onMouseOver={(e) => {
            if (!isInFavorites) e.target.style.backgroundColor = "#d05a42";
          }}
          onMouseOut={(e) => {
            if (!isInFavorites) e.target.style.backgroundColor = "#e76f51";
          }}
          onClick={() => {
            if (!isInFavorites) handleAddToFavorites(chocolate._id);
          }}
          disabled={isInFavorites}
        >
          {isInFavorites ? "Already in Favorites" : "Add to Favorites"}
        </button>
      </div>
    </div>
  );
};

export default ChocolateCard;