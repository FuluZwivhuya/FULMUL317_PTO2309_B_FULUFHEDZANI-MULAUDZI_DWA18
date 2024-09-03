import React from 'react';
import Episode from './Episode';

function Season({ season }) {
  return (
    <div>
      <h3>{season.title}</h3>
      {season.episodes.map(episode => (
        <Episode key={episode.id} episode={episode} />
      ))}
    </div>
  );
}

export default Season;
