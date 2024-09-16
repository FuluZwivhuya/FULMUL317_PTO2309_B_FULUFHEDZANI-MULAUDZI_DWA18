import React, { useState, useEffect } from 'react'; 
import Preview from './Preview';
import Show from './Show';
import Genre from './Genre';
import './App.css';

function App() {
  const [shows, setShows] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [selectedShow, setSelectedShow] = useState(null);
  const [searchQuery, setSearchQuery] = useState(''); // For search functionality
  const [loading, setLoading] = useState(true); // Loading state for initial data
  const [loadingNewShow, setLoadingNewShow] = useState(false); // Loading state for new show

  useEffect(() => {
    fetch('https://podcast-api.netlify.app/shows')
      .then(response => response.json())
      .then(data => {
        setShows(data);
        setLoading(false); // Stop loading after data is fetched

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

  // Handle clicking a show
  const handleShowClick = (id) => {
    setLoadingNewShow(true); // Start loading new show
    fetch(`https://podcast-api.netlify.app/id/${id}`)
      .then(response => response.json())
      .then(data => {
        setSelectedShow(data);
        setLoadingNewShow(false); // Stop loading new show
      });
  };

  // Handle back button
  const handleBackClick = () => {
    setSelectedShow(null);
  };

  // Filter shows by genre and search query
  const filteredShows = shows.filter(show => {
    const matchesGenre = selectedGenre ? show.genres.includes(selectedGenre) : true;
    const matchesSearch = show.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGenre && matchesSearch;
  });

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

      <div className="genres">
        {genres.map(genre => (
          <Genre key={genre.id} genre={genre} onClick={() => setSelectedGenre(genre.id)} />
        ))}
      </div>

      <div className="previews-grid">
        {loading ? ( // Loading state for initial data
          <p>Loading podcasts...</p>
        ) : selectedShow ? (
          <div>
            <button className="back-button" onClick={handleBackClick}>Back</button>
            {loadingNewShow ? ( // Loading state for new show
              <p>Loading show details...</p>
            ) : (
              <Show show={selectedShow} />
            )}
          </div>
        ) : (
          filteredShows.map(show => (
            <Preview key={show.id} show={show} onClick={() => handleShowClick(show.id)} />
          ))
        )}
      </div>
    </div>
  );
}

export default App;
