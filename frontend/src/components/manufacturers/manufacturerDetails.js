import React from 'react';
import { Link, useParams } from 'react-router-dom';
import useGetManufacturer from '../../hooks/manufacturers/useGetManufacturer';
import '../../css/manufacturerDetails.css';

const ManufacturerDetails = () => {
  const { id } = useParams();
  const { manufacturer, loading, error } = useGetManufacturer(id);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="manufacturer-details-container">
      <h2 style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>Manufacturer Details</h2>
      <div className="details-wrapper">
        <div className="details-image">
          <Link to={manufacturer.website}>
            <img
              src={manufacturer.image}
              alt={manufacturer.name}
              className="manufacturer-image"
            />
          </Link>
        </div>
        <div className="details-content">
          <h3>{manufacturer.name}</h3>
          <p><strong>Location:</strong> {manufacturer.location}</p>
          <p><strong>Description:</strong> {manufacturer.description}</p>
          <p>
            <strong>Website:</strong> <Link to={manufacturer.website}>{manufacturer.website}</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ManufacturerDetails;