// src/pages/chocolates/Chocolates.js
import React from 'react';
import { Link } from 'react-router-dom';
import useGetChocolates from '../../hooks/chocolates/useGetChocolates';
import ChocolateCard from './chocolateCard';
import { useAuth } from '../../context/AuthContext';
import usePostFavorite from '../../hooks/favorites/usePostFavorite';
import '../../css/chocolates.css';

const Chocolates = () => {
  const { user } = useAuth();
  const { chocolates, loading, error } = useGetChocolates();
  const { addToFavorites, loading: addingToFavorites, error: addFavoriteError } = usePostFavorite();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="chocolates-container">
      <div className="header">
        <h2 className="header-title">All Chocolates</h2>
        {user && user.isAdmin && (
          <Link to="/chocolates/add" className="create-button">
            Add a Chocolate
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
      <div className="list-container2">
        {chocolates.map((chocolate) => (
          <ChocolateCard
            key={chocolate._id}
            chocolate={chocolate}
            user={user}
            handleAddToFavorites={async () => {
              if (!user) {
                alert('You must be logged in to add to favorites.');
                return;
              }
              await addToFavorites(user.id, chocolate._id);
            }}
          />
        ))}
      </div>
      {addingToFavorites && <p>Adding to favorites...</p>}
      {addFavoriteError && <p>Error: {addFavoriteError}</p>}
    </div>
  );
};

export default Chocolates;