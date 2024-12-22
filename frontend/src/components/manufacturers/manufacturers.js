import React from 'react';
import { Link } from 'react-router-dom';
import useGetManufacturers from '../../hooks/manufacturers/useGetManufacturers';
import useDeleteManufacturer from '../../hooks/manufacturers/useDeleteManufacturer';
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
        <h2>Manufacturers</h2>
        {user && user.isAdmin && (
          <Link to="/manufacturers/create" className="create-button">
            Create a Manufacturer
          </Link>
        )}
      </div>
      <div className="list-container">
        {manufacturers.map((manufacturer) => (
          <div className="manufacturer-item" key={manufacturer._id}>
          {manufacturer.image && (
            <img src={manufacturer.image} alt={`${manufacturer.name} logo`} className="manufacturer-logo" />
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
        
        ))}
      </div>
    </div>
  );
};

export default Manufacturers;
