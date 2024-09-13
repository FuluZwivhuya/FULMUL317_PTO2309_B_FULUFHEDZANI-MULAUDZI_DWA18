import React, { useState, useEffect } from 'react';
import Preview from './Preview';
import Show from './Show';
import Genre from './Genre';
import Fuse from 'fuse.js';
import './App.css';

function App() {
  const [shows, setShows] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [selectedShow, setSelectedShow] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    fetch('https://podcast-api.netlify.app/shows')
      .then(response => response.json())
      .then(data => {
        setShows(data);
        const allGenres = [];
        data.forEach(show => {
          show.genres.forEach(id => {
            if (!allGenres.includes(id)) allGenres.push(id);
          });
        });
        const genreMapping = {
          1: 'Personal Growth',
          2: 'True Crime and Investigative Journalism',
          3: 'History',
          4: 'Comedy',
          5: 'Entertainment',
          6: 'Business',
          7: 'Fiction',
          8: 'News',
          9: 'Kids and Family',
        };
        setGenres(allGenres.map(id => ({ id, title: genreMapping[id] })));
      });
  }, []);

  // Sorting Functions
  const sortByTitleAZ = () => {
    const sortedShows = [...shows].sort((a, b) => a.title.localeCompare(b.title));
    setShows(sortedShows);
  };

  const sortByTitleZA = () => {
    const sortedShows = [...shows].sort((a, b) => b.title.localeCompare(a.title));
    setShows(sortedShows);
  };

  const sortByDateAsc = () => {
    const sortedShows = [...shows].sort((a, b) => new Date(a.updated) - new Date(b.updated));
    setShows(sortedShows);
  };

  const sortByDateDesc = () => {
    const sortedShows = [...shows].sort((a, b) => new Date(b.updated) - new Date(a.updated));
    setShows(sortedShows);
  };

  const fuse = new Fuse(shows, {
    keys: ['title'],
    threshold: 0.3,
  });

  const fuzzyFilteredShows = searchQuery 
    ? fuse.search(searchQuery).map(result => result.item) 
    : shows;  // If no search query, show all shows

  return (
    <div className="app">
      <header>
        <h1>Podcast App</h1>
      </header>
      
      <div className="search-bar">
        <input 
          type="text" 
          placeholder="Search podcasts..." 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)} 
        />
        <button onClick={() => setSearchQuery('')}>Clear</button>
      </div>

      <div>
        <button onClick={sortByTitleAZ}>Sort A-Z</button>
        <button onClick={sortByTitleZA}>Sort Z-A</button>
        <button onClick={sortByDateAsc}>Sort by Date Asc</button>
        <button onClick={sortByDateDesc}>Sort by Date Desc</button>
      </div>

      <div className="genres">
        {genres.map(genre => (
          <Genre key={genre.id} genre={genre} onClick={() => setSelectedGenre(genre.id)} />
        ))}
      </div>

      <div className="previews-grid">
        {selectedShow ? (
          <div>
            <button className="back-button" onClick={() => setSelectedShow(null)}>Back</button>
            <Show show={selectedShow} />
          </div>
        ) : (
          fuzzyFilteredShows.map(show => (
            <Preview key={show.id} show={show} onClick={() => setSelectedShow(show.id)} />
          ))
        )}
      </div>
    </div>
  );
}

export default App;

