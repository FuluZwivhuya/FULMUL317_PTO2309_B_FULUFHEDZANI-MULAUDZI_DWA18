import React from 'react';

function Episode({ episode }) {
  return (
    <div>
      <p>{episode.title}</p>
      <audio controls>
        <source src={episode.audio} type="audio/mpeg" />
      </audio>
    </div>
  );
}

export default Episode;
