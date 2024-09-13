import React from 'react';
import Episode from './Episode';

function Season({ season }) {
  return (
    <div>
      <h3>{season.title}</h3>
      <p><strong>Total Episodes:</strong> {season.episodes.length}</p> {/* Showing number of episodes */}
      <img src={season.image} alt={season.title} style={{ width: '100%', height: 'auto' }} />
      {season.episodes.map(episode => (
        <Episode key={episode.id} episode={episode} />
      ))}
    </div>
  );
}

export default Season;
