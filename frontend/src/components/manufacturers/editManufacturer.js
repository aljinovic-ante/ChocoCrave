import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useGetManufacturer from '../../hooks/manufacturers/useGetManufacturer';
import usePutManufacturer from '../../hooks/manufacturers/usePutManufacturer';
import { useAuth } from '../../context/AuthContext';
import '../../css/editManufacturer.css';

const EditManufacturer = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { manufacturer, loading, getError, fetchManufacturer } = useGetManufacturer(id);
  const { putManufacturer, putError } = usePutManufacturer();

  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [website, setWebsite] = useState('');

  const [modalMessage, setModalMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const manufacturerData = { name, location, image, description, website };
  
    const success = await putManufacturer(manufacturer._id, manufacturerData);
  
    if (success) {
      setModalMessage('Update completed successfully!');
    } else {
      setModalMessage('Update failed. Please try again.');
    }
  
    setShowModal(true);
  };
  
  const closeModal = () => setShowModal(false);

  useEffect(() => {
    if (manufacturer) {
      setName(manufacturer.name || '');
      setLocation(manufacturer.location || '');
      setImage(manufacturer.image || '');
      setDescription(manufacturer.description || '');
      setWebsite(manufacturer.website || '');
    }
  }, [manufacturer]);

  if (!user || !user.isAdmin) {
    return (
      <div className="edit-manufacturer-container">
        <h2 style={{ textAlign: 'center', color: 'white' }}>Access Denied</h2>
        <p style={{ textAlign: 'center', color: '#ccc' }}>Admin access is required to edit manufacturers.</p>
      </div>
    );
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (getError) {
    return <div>Error: {getError.message}</div>;
  }

  return (
    <div className="edit-manufacturer-container">
      <h2 className="title">Edit details about: <bold>{manufacturer.name}</bold></h2>
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
          <img
            src={image || manufacturer.image}
            alt={name || manufacturer.name}
            className="manufacturer-image"
          />
        </div>
        <div className="details-content">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter name"
              />
            </div>
            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter location"
              />
            </div>
            <div className="form-group">
              <label>Image URL</label>
              <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="Enter image URL"
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                rows="4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter description"
              />
            </div>
            <div className="form-group">
              <label>Website</label>
              <input
                type="text"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="Enter website URL"
              />
            </div>
            {putError && <p className="error-text">{putError}</p>}
            <button type="submit" className="submit-button">
              Update
            </button>
          </form>
        </div>
      </div>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <p>{modalMessage}</p>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditManufacturer;