import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/manufacturers.css';

const ChocolateCard = ({ chocolate, user, handleDeleteChocolate }) => {
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
      <div className="manufacturer-actions">
        <Link to={`/chocolates/${chocolate._id}`} className="view-button">Details</Link>
        {user && user.isAdmin && (
          <>
            <Link to={`/chocolates/edit/${chocolate._id}`} className="edit-button">Edit</Link>
            <button
              className="delete-button"
              onClick={() => handleDeleteChocolate(chocolate._id)}
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ChocolateCard;