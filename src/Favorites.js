import React from 'react';
import Preview from './Preview'; // Import the Preview component for displaying favorites

function Favorites({ favorites }) {
  return (
    <div className="favorites">
      <h2>Your Favorites</h2>
      {favorites.length === 0 ? (
        <p>No favorites added yet.</p>
      ) : (
        <div className="previews-grid">
          {favorites.map(favorite => (
            <Preview 
              key={favorite.id} 
              show={favorite.show} 
              onClick={() => console.log('Show clicked', favorite)} // Handle click if needed
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
