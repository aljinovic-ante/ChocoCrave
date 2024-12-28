import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/manufacturers.css';

const ChocolateCard = ({ chocolate, user, handleAddToFavorites, isInFavorites, handleAddToCart }) => {
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
            backgroundColor: isInFavorites ? "#ffcccc" : "#ffffff",
            color: isInFavorites ? "#ff0000" : "#000000",
            padding: "8px 12px",
            border: `2px solid ${isInFavorites ? "#ff0000" : "#000000"}`,
            borderRadius: "4px",
            cursor: isInFavorites ? "not-allowed" : "pointer",
            fontSize: "1rem",
            transition: "background-color 0.3s ease, border-color 0.3s ease",
            marginTop: "2px",
          }}
          onMouseOver={(e) => {
            if (!isInFavorites) e.target.style.backgroundColor = "#ffcccc";
          }}
          onMouseOut={(e) => {
            if (!isInFavorites) e.target.style.backgroundColor = "#ffffff";
          }}
          onClick={() => {
            if (!isInFavorites) handleAddToFavorites(chocolate._id);
          }}
          disabled={isInFavorites}
        >
          {isInFavorites ? "❤️" : "🤍"}
        </button>
        <button
          style={{
            backgroundColor: "#ffffff",
            color: "#000000",
            padding: "8px 12px",
            border: "2px solid #000000",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "1.2rem",
            marginLeft: "10px",
            transition: "background-color 0.3s ease",
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = "#f0f0f0";
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = "#ffffff";
          }}
          onClick={handleAddToCart}
        >
          🛒
        </button>
      </div>
    </div>
  );
};

export default ChocolateCard;
