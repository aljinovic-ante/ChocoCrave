import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/manufacturers.css';

const ManufacturerCard = ({ manufacturer, user, handleDeleteManufacturer }) => {
  return (
    <div className="manufacturer-item" key={manufacturer._id}>
      <Link to={`/manufacturers/${manufacturer._id}`} className="manufacturer-link">
        {manufacturer.image ? (
            manufacturer.website ? (
              <Link to={manufacturer.website}>
                <img
                  src={manufacturer.image}
                  alt={`${manufacturer.name} logo`}
                  className="manufacturer-logo"
                />
              </Link>
            ) : (
              <img
                src={manufacturer.image}
                alt={`${manufacturer.name} logo`}
                className="manufacturer-logo"
              />
            )
          ) : (
            <p>No Logo Available</p>
        )}
        <p className="manufacturer-name">{manufacturer.name}</p>
      </Link>
      <div className="manufacturer-actions">
        <Link to={`/manufacturers/${manufacturer._id}`} className="view-button">Details</Link>
      </div>
    </div>
  );
};

export default ManufacturerCard;
