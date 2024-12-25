import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import useGetChocolate from '../../hooks/chocolates/useGetChocolate';
import { useAuth } from '../../context/AuthContext';
import useDeleteChocolate from '../../hooks/chocolates/useDeleteChocolate';
import useGetChocolates from '../../hooks/chocolates/useGetChocolates';
import '../../css/chocolateDetails.css';

const ChocolateDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { chocolate, loading, error } = useGetChocolate(id);
  const { user } = useAuth();
  const { deleteChocolate } = useDeleteChocolate();
  const { refetchChocolates } = useGetChocolates();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteChocolate(chocolate._id, refetchChocolates);
      setShowDeleteModal(false);
      navigate('/chocolates');
    } catch (err) {
      console.error('Failed to delete chocolate:', err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="chocolate-details-container">
      <h2 className="chocolate-title">{chocolate.name}</h2>
      <hr
        style={{
          border: 'none',
          height: '3px',
          backgroundColor: 'white',
          margin: '20px 0',
        }}
      />
      <div className="details-wrapper">
        <div className="details-image">
          {chocolate.image ? (
            <img
              src={chocolate.image}
              alt={`${chocolate.name} image`}
              className="chocolate-image"
            />
          ) : (
            <h3 className="no-image-text">No Image Available</h3>
          )}
        </div>
        <div className="details-content">
          <div className="info-main">
            <p className="info-text"><strong>Name:</strong> {chocolate.name}</p>
            <p className="info-text"><strong>Price:</strong> ${chocolate.price?.toFixed(2) || 'N/A'}</p>
            <p className="info-text"><strong>Cocoa Percentage:</strong> {chocolate.cocoa_percentage || 'N/A'}%</p>
            <p className="info-text"><strong>Type:</strong> {chocolate.type || 'N/A'}</p>
            <p className="info-text"><strong>Weight:</strong> {chocolate.weight || 'N/A'}</p>
            <p className="info-text"><strong>Color:</strong> {chocolate.color || 'N/A'}</p>
            <p className="info-text"><strong>Description:</strong> {chocolate.description || 'No description provided.'}</p>
          </div>
          <div className="very-special-div">
            {chocolate.nutritional_info && (
              <div className="nutrition-info">
                <h4 className="nutrition-title">Nutritional Info:</h4>
                <p className="info-text"><strong>Calories:</strong> {chocolate.nutritional_info.calories || 'N/A'} kcal</p>
                <p className="info-text"><strong>Fat:</strong> {chocolate.nutritional_info.fat || 'N/A'} g</p>
                <p className="info-text"><strong>Protein:</strong> {chocolate.nutritional_info.protein || 'N/A'} g</p>
                <p className="info-text"><strong>Carbohydrates:</strong> {chocolate.nutritional_info.carbohydrates || 'N/A'} g</p>
                <p className="info-text"><strong>Sugar:</strong> {chocolate.nutritional_info.sugar || 'N/A'} g</p>
              </div>
            )}
            <div className="special-div">
              <p className="info-text">
                <strong>Manufacturer:</strong>{' '}
                <Link to={`/manufacturers/${chocolate.manufacturer_id}`} className="manufacturer-link">
                  View Manufacturer
                </Link>
              </p>
              {user?.isAdmin && (
                <div className="admin-actions">
                  <Link
                    to={`/chocolates/edit/${id}`}
                    className="edit-button2"
                    style={{ color: '#007bff', textDecoration: 'none' }}
                  >
                    Edit Product
                  </Link>
                  <button onClick={() => setShowDeleteModal(true)} className="delete-button">Delete Product</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete <strong>{chocolate.name}</strong>?</p>
            <div className="modal-actions">
              <button onClick={() => setShowDeleteModal(false)} className="cancel-button">Cancel</button>
              <button onClick={handleDelete} className="confirm-delete-button">Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChocolateDetails;
