import React, { useState, useEffect } from 'react';
import Preview from './Preview';
import Show from './Show';
import Genre from './Genre';

function App() {
  const [shows, setShows] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [selectedShow, setSelectedShow] = useState(null);

  useEffect(() => {
    fetch('https://podcast-api.netlify.app/shows')
      .then(response => response.json())
      .then(data => {
        setShows(data);

        const allGenres = [];
        data.forEach(show => {
          show.genres.forEach(id => {
            if (!allGenres.includes(id)) allGenres.push(id);
          })
        });

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

        setGenres(allGenres.map(id => ({ id, title: genreMapping[id] })));
      });
  }, []);

  const handleShowClick = (id) => {
    fetch(`https://podcast-api.netlify.app/id/${id}`)
      .then(response => response.json())
      .then(data => setSelectedShow(data));
  };

  const filteredShows = selectedGenre
    ? shows.filter(show => show.genres.includes(selectedGenre))
    : shows;

  return (
    <div>
      <header>
        <h1>Podcast App</h1>
      </header>
      <main>
        <div>
          {genres.map(genre => (
            <Genre key={genre.id} genre={genre} onClick={setSelectedGenre} />
          ))}
        </div>
        <div>
          {selectedShow ? (
            <Show show={selectedShow} />
          ) : (
            filteredShows.map(show => (
              <Preview key={show.id} show={show} onClick={() => handleShowClick(show.id)} />
            ))
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
