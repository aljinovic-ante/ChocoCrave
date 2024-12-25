import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useGetChocolate from '../../hooks/chocolates/useGetChocolate';
import usePutChocolate from '../../hooks/chocolates/usePutChocolate';
import useGetManufacturers from '../../hooks/manufacturers/useGetManufacturers';
import { useAuth } from '../../context/AuthContext';
import '../../css/editChocolate.css';

const EditChocolate = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { chocolate, loading, getError } = useGetChocolate(id);
  const { putChocolate, putError } = usePutChocolate();
  const { manufacturers } = useGetManufacturers();

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [cocoaPercentage, setCocoaPercentage] = useState('');
  const [color, setColor] = useState('');
  const [type, setType] = useState('');
  const [weight, setWeight] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [manufacturerId, setManufacturerId] = useState('');

  const [calories, setCalories] = useState('');
  const [fat, setFat] = useState('');
  const [protein, setProtein] = useState('');
  const [carbohydrates, setCarbohydrates] = useState('');
  const [sugar, setSugar] = useState('');

  const [modalMessage, setModalMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const chocolateData = {
      name,
      price,
      cocoa_percentage: cocoaPercentage,
      color,
      type,
      weight,
      description,
      image,
      manufacturer_id: manufacturerId,
      nutritional_info: {
        calories,
        fat,
        protein,
        carbohydrates,
        sugar,
      },
    };

    const success = await putChocolate(chocolate._id, chocolateData);

    if (success) {
      setModalMessage('Update completed successfully!');
    } else {
      setModalMessage('Update failed. Please try again.');
    }

    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  useEffect(() => {
    if (chocolate) {
      setName(chocolate.name || '');
      setPrice(chocolate.price || '');
      setCocoaPercentage(chocolate.cocoa_percentage || '');
      setColor(chocolate.color || '');
      setType(chocolate.type || '');
      setWeight(chocolate.weight || '');
      setDescription(chocolate.description || '');
      setImage(chocolate.image || '');
      setManufacturerId(chocolate.manufacturer_id?._id || '');

      const nutritionalInfo = chocolate.nutritional_info || {};
      setCalories(nutritionalInfo.calories || '');
      setFat(nutritionalInfo.fat || '');
      setProtein(nutritionalInfo.protein || '');
      setCarbohydrates(nutritionalInfo.carbohydrates || '');
      setSugar(nutritionalInfo.sugar || '');
    }
  }, [chocolate]);

  if (!user || !user.isAdmin) {
    return (
      <div className="edit-chocolate-container">
        <h2 style={{ textAlign: 'center', color: 'white' }}>Access Denied</h2>
        <p style={{ textAlign: 'center', color: '#ccc' }}>Admin access is required to edit chocolates.</p>
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
    <div className="edit-chocolate-container">
      <h2 className="title">Edit details about: {chocolate.name}</h2>
      <form onSubmit={handleSubmit}>
        <div className="details-wrapper">
          <div className="details-section">
            <h4>Chocolate Details</h4>
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
              <label>Price (€)</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter price"
              />
            </div>
            <div className="form-group">
              <label>Cocoa Percentage (%)</label>
              <input
                type="number"
                value={cocoaPercentage}
                onChange={(e) => setCocoaPercentage(e.target.value)}
                placeholder="Enter cocoa percentage"
              />
            </div>
            <div className="form-group">
              <label>Color</label>
              <input
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                placeholder="Enter color"
              />
            </div>
            <div className="form-group">
              <label>Type</label>
              <input
                type="text"
                value={type}
                onChange={(e) => setType(e.target.value)}
                placeholder="Enter type (e.g., Dark, Milk)"
              />
            </div>
            <div className="form-group">
              <label>Weight</label>
              <input
                type="text"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="Enter weight"
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
              <label>Image URL</label>
              <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="Enter image URL"
              />
            </div>
            <div className="form-group">
              <label>Manufacturer</label>
              <select
                value={manufacturerId}
                onChange={(e) => setManufacturerId(e.target.value)}
                required
              >
                <option value="" disabled>
                  Select Manufacturer
                </option>
                {manufacturers.map((manufacturer) => (
                  <option key={manufacturer._id} value={manufacturer._id}>
                    {manufacturer.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="details-section">
            <h4>Nutritional Info</h4>
            <div className="form-group">
              <label>Calories</label>
              <input
                type="number"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                placeholder="Enter calories"
              />
            </div>
            <div className="form-group">
              <label>Fat</label>
              <input
                type="number"
                value={fat}
                onChange={(e) => setFat(e.target.value)}
                placeholder="Enter fat (g)"
              />
            </div>
            <div className="form-group">
              <label>Protein</label>
              <input
                type="number"
                value={protein}
                onChange={(e) => setProtein(e.target.value)}
                placeholder="Enter protein (g)"
              />
            </div>
            <div className="form-group">
              <label>Carbohydrates</label>
              <input
                type="number"
                value={carbohydrates}
                onChange={(e) => setCarbohydrates(e.target.value)}
                placeholder="Enter carbohydrates (g)"
              />
            </div>
            <div className="form-group">
              <label>Sugar</label>
              <input
                type="number"
                value={sugar}
                onChange={(e) => setSugar(e.target.value)}
                placeholder="Enter sugar (g)"
              />
            </div>
            {putError && <p className="error-text">{putError}</p>}
            <button type="submit" className="submit-button" disabled={name.trim() === ''}>
              Update Information
            </button>
          </div>
        </div>
      </form>

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

export default EditChocolate;