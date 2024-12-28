import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import useGetManufacturer from '../../hooks/manufacturers/useGetManufacturer';
import { useAuth } from '../../context/AuthContext';
import useDeleteManufacturer from '../../hooks/manufacturers/useDeleteManufacturer';
import useGetManufacturers from '../../hooks/manufacturers/useGetManufacturers';
import '../../css/manufacturerDetails.css';

const ManufacturerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { manufacturer, loading, error } = useGetManufacturer(id);
  const { user } = useAuth();
  const { deleteManufacturer } = useDeleteManufacturer();
  const { refetchManufacturers } = useGetManufacturers();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteManufacturer(manufacturer._id, refetchManufacturers);
      setShowDeleteModal(false);
      navigate('/');
    } catch (err) {
      setShowDeleteModal(false);
      setShowErrorModal(true);
    }
  };
  

  const handleShowDeleteModal = () => {
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
  };

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
        </div>
        <div className="details-content">
          <h3>{manufacturer.name}</h3>
          <p><strong>Location:</strong> {manufacturer.location}</p>
          <p><strong>Description:</strong> {manufacturer.description}</p>
          <p>
            <strong>Website:</strong> <Link to={manufacturer.website} style={{ color: 'blue', textAlign: 'center' }}>{manufacturer.website}</Link>
          </p>
          {user && user.isAdmin && (
            <div className="admin-actions">
              <Link to={`/manufacturers/edit/${id}`} className="edit-button">Edit</Link>
              <button onClick={handleShowDeleteModal} className="delete-button">Delete</button>
            </div>
          )}
        </div>
      </div>
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Confirm Delete</h2>
              <span className="close" onClick={handleCloseDeleteModal}>&times;</span>
            </div>
            <div className="modal-body">
              Are you sure you want to delete {manufacturer.name}?
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={handleCloseDeleteModal}>
                Cancel
              </button>
              <button className="btn-danger2" onClick={handleDelete}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
      {showErrorModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Cannot Delete Manufacturer</h2>
              <span className="close" onClick={() => setShowErrorModal(false)}>&times;</span>
            </div>
            <div className="modal-body">
              This manufacturer cannot be deleted because there are products related to it.
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setShowErrorModal(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManufacturerDetails;