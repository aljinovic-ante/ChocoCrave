import React from 'react';
import { Link } from 'react-router-dom';
import useGetManufacturers from '../../hooks/manufacturers/useGetManufacturers';
import ManufacturerCard from './ManufacturerCard.js';
import { useAuth } from '../../context/AuthContext';
import '../../css/manufacturers.css';

const Manufacturers = () => {
  const { user } = useAuth();
  const { manufacturers, loading, error, refetchManufacturers } = useGetManufacturers();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="manufacturers-container">
      <div className="header">
        <h2 className="header-title">All Manufacturers</h2>
        {user && user.isAdmin && (
          <Link to="/manufacturers/add" className="create-button">
            Add a Manufacturer
          </Link>
        )}
      </div>
      <hr
        style={{
          border: 'none',
          height: '3px',
          backgroundColor: 'white',
          margin: '20px 0',
        }}
      />
      <div className="list-container">
        {manufacturers.map((manufacturer) => (
          <ManufacturerCard
            key={manufacturer._id}
            manufacturer={manufacturer}
            user={user}
          />
        ))}
      </div>
    </div>
  );
};

export default Manufacturers;
