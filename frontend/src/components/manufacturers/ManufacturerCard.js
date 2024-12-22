import React from 'react';
import { Link } from 'react-router-dom';

const ManufacturerCard = ({ manufacturer, onDelete }) => {
  return (
    <div className="manufacturer-card">
      <h3>{manufacturer.name}</h3>
      <p>{manufacturer.location}</p>
      <p>{manufacturer.description}</p>
      {manufacturer.image && (
        <img src={manufacturer.image} alt={manufacturer.name} style={{ width: '100%' }} />
      )}
      <div className="actions">
        <Link to={`/manufacturers/${manufacturer._id}`} className="view-link">
          View Details
        </Link>
        <Link to={`/manufacturers/edit/${manufacturer._id}`} className="edit-link">
          Edit
        </Link>
        <button onClick={onDelete} className="delete-button">
          Delete
        </button>
      </div>
    </div>
  );
};

export default ManufacturerCard;
