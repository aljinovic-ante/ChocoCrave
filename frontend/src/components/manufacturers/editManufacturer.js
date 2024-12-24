import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useGetManufacturer from '../../hooks/manufacturers/useGetManufacturer';
import usePutManufacturer from '../../hooks/manufacturers/usePutManufacturer';
import { useAuth } from '../../context/AuthContext';
import '../../css/editManufacturer.css';

const EditManufacturer = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { manufacturer, loading, getError } = useGetManufacturer(id);
  const { putManufacturer, putError } = usePutManufacturer(id, manufacturer);

  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [website, setWebsite] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const manufacturerData = {
      _id: manufacturer._id,
      name,
      location,
      image,
      description,
      website,
    };
    putManufacturer(id, manufacturerData);
  };

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
    return <h1 style={{ textAlign: 'center', marginTop: '50px' }}>Only admin access allowed</h1>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (getError) {
    return <div>Error: {getError.message}</div>;
  }

  return (
    <div className="edit-manufacturer-container">
      <h2 className="title">Edit Manufacturer</h2>
      <form className="edit-manufacturer-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            id="location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter location"
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">Image</label>
          <input
            id="image"
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="Enter image URL"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="3"
            placeholder="Enter description"
          />
        </div>

        <div className="form-group">
          <label htmlFor="website">Website</label>
          <input
            id="website"
            type="text"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            placeholder="Enter website URL"
          />
        </div>

        {putError && <p className="error-text">{putError}</p>}

        <button type="submit" className="submit-button">Update</button>
      </form>
    </div>
  );
};

export default EditManufacturer;
