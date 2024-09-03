import React from 'react';

function Preview({ show, onClick }) {
  return (
    <div onClick={onClick}>
      <h2>{show.title}</h2>
      <p>{show.description}</p>
      <img src={show.image} alt={show.title} />
      <p>Seasons: {show.seasons}</p>
    </div>
  );
}

export default Preview;
