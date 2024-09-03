import React from 'react';
import Season from './Season';

function Show({ show }) {
  return (
    <div>
      <h2>{show.title}</h2>
      <p>{show.description}</p>
      {show.seasons.map(season => (
        <Season key={season.id} season={season} />
      ))}
    </div>
  );
}

export default Show;
