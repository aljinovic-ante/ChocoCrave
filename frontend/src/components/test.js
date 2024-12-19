import React, { useEffect, useState } from "react";
import { useAuth } from '../context/AuthContext';

export default function Test() {
  const [manufacturers, setManufacturers] = useState([]);
  const [error, setError] = useState(null);
  const { authToken } = useAuth();

  useEffect(() => {
    const fetchManufacturers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/manufacturers', {
          headers: {
            Authorization: `Bearer ${authToken}`, // Include JWT token
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch manufacturers');
        }
        const data = await response.json();
        setManufacturers(data);
      } catch (err) {
        setError(err.message);
      }
    };

    if (authToken) fetchManufacturers();
  }, [authToken]);

  if (error) return <h1>Error: {error}</h1>;

  return (
    <div>
      <h1>Manufacturers</h1>
      <ul>
        {manufacturers.map((manufacturer) => (
          <li key={manufacturer._id}>
            <h2>{manufacturer.name}</h2>
            <p>{manufacturer.location}</p>
            <p>{manufacturer.description}</p>
            {manufacturer.image && <img src={manufacturer.image} alt={manufacturer.name} style={{ width: "200px" }} />}
            <a href={manufacturer.website} target="_blank" rel="noopener noreferrer">
              Visit Website
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
