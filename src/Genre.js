import React from 'react';

function Genre({ genre, onClick }) {
  return (
    <button onClick={() => onClick(genre.id)}>
      {genre.title}
    </button>
  );
}

export default Genre;