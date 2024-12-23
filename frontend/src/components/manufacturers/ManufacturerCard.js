import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/manufacturers.css';

const ManufacturerCard = ({ manufacturer, user, handleDeleteManufacturer }) => {
  return (
    <div className="manufacturer-item" key={manufacturer._id}>
      {manufacturer.image && (
        <img
          src={manufacturer.image}
          alt={`${manufacturer.name} logo`}
          className="manufacturer-logo"
        />
      )}
      <p className="manufacturer-name">{manufacturer.name}</p>
      <div className="manufacturer-actions">
        <Link to={`/manufacturers/${manufacturer._id}`} className="view-button">View</Link>
        {user && user.isAdmin && (
          <>
            <Link to={`/manufacturers/edit/${manufacturer._id}`} className="edit-button">Edit</Link>
            <button
              onClick={() => handleDeleteManufacturer(manufacturer._id)}
              className="delete-button"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ManufacturerCard;
