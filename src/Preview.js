import React from 'react';
import './App.css';

function Preview({ show, onClick }) {
  const genreMapping = {
    1: "Personal Growth",
    2: "True Crime and Investigative Journalism",
    3: "History",
    4: "Comedy",
    5: "Entertainment",
    6: "Business",
    7: "Fiction",
    8: "News",
    9: "Kids and Family",
  };

  return (
    <div className="preview-tile" onClick={onClick}>
      <img className="preview-image" src={show.image} alt={show.title} />
      <div className="preview-content">
        <h2>{show.title}</h2>
        <p><strong>Seasons:</strong> {show.seasons.length}</p>
        <p><strong>Genres:</strong> {show.genres.map(id => genreMapping[id]).join(', ')}</p>
      </div>
    </div>
  );
}

export default Preview;
