import React from 'react';
import { Link } from 'react-router-dom';
import useGetManufacturers from '../../hooks/manufacturers/useGetManufacturers';
import useDeleteManufacturer from '../../hooks/manufacturers/useDeleteManufacturer';
import ManufacturerCard from './manufacturerCard.js';
import { useAuth } from '../../context/AuthContext';
import '../../css/manufacturers.css';

const Manufacturers = () => {
  const { user } = useAuth();
  const { manufacturers, loading, error, refetchManufacturers } = useGetManufacturers();
  const { deleteManufacturer } = useDeleteManufacturer();

  const handleDeleteManufacturer = async (id) => {
    if (window.confirm('Are you sure you want to delete this manufacturer?')) {
      deleteManufacturer(id, refetchManufacturers);
    }
  };

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
          <Link to="/manufacturers/create" className="create-button">
            Add a Manufacturer
          </Link>
        )}
      </div>
      <div className="list-container">
        {manufacturers.map((manufacturer) => (
          <ManufacturerCard
            key={manufacturer._id}
            manufacturer={manufacturer}
            user={user}
            handleDeleteManufacturer={handleDeleteManufacturer}
          />
        ))}
      </div>
    </div>
  );
};

export default Manufacturers;
