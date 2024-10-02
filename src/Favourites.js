import React from 'react';
import Episode from './Episode';

function Favorites({ favorites, toggleFavorite, sortOrder }) {
  const sortedFavorites = [...favorites];

  if (sortOrder === 'title-asc') {
    sortedFavorites.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortOrder === 'title-desc') {
    sortedFavorites.sort((a, b) => b.title.localeCompare(a.title));
  } else if (sortOrder === 'date-asc') {
    sortedFavorites.sort((a, b) => new Date(a.addedAt) - new Date(b.addedAt));
  } else if (sortOrder === 'date-desc') {
    sortedFavorites.sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt));
  }

  return (
    <div className="favorites-list">
      <h2>Your Favorites</h2>
      {sortedFavorites.length === 0 ? (
        
        <p>No favorites added.</p>
      ) : (
        sortedFavorites.map(episode => (
          <Episode key={episode.id} episode={episode} toggleFavorite={toggleFavorite} />
        ))
      )}
    </div>
  );
}

export default Favorites;
