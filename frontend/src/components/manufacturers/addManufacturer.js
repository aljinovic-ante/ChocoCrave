import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import usePostManufacturer from '../../hooks/manufacturers/usePostManufacturer';
import '../../css/editManufacturer.css'; // Reuse the CSS from EditManufacturer

const AddManufacturer = () => {
  const { user } = useAuth();
  const { postManufacturer, postError } = usePostManufacturer();

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

    const success = await postManufacturer(manufacturerData);

    if (success) {
      setModalMessage('Manufacturer created successfully!');
      setName('');
      setLocation('');
      setImage('');
      setDescription('');
      setWebsite('');
    } else {
      setModalMessage('Failed to create manufacturer. Please try again.');
    }

    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  if (!user || !user.isAdmin) {
    return (
      <div className="edit-manufacturer-container">
        <h2 style={{ textAlign: 'center', color: 'white' }}>Access Denied</h2>
        <p style={{ textAlign: 'center', color: '#ccc' }}>Admin access is required to add manufacturers.</p>
      </div>
    );
  }

  return (
    <div className="edit-manufacturer-container">
      <h2 className="title">Add New Manufacturer</h2>
      <hr
        style={{
          border: 'none',
          height: '3px',
          backgroundColor: 'white',
          margin: '20px 0',
        }}
      />
      <div className="details-wrapper">
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
            {postError && <p className="error-text">{postError}</p>}
            <button type="submit" className="submit-button">
              Add Manufacturer
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

export default AddManufacturer;
