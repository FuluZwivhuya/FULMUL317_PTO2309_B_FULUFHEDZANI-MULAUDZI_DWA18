import React, { useState, useEffect } from 'react'; 
import Preview from './Preview';
import Show from './Show';
import Genre from './Genre';
import Favourites from './Favourites'; 
import './App.css';

function App() {
  const [shows, setShows] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [selectedShow, setSelectedShow] = useState(null);
  const [searchQuery, setSearchQuery] = useState(''); 
  const [loading, setLoading] = useState(true); 
  const [sortOrder, setSortOrder] = useState('');
  const [favorites, setFavorites] = useState([]); 

  useEffect(() => {
    fetch('https://podcast-api.netlify.app/shows')
      .then(response => response.json())
      .then(data => {
        setShows(data || []);
        setLoading(false);

        const allGenres = [];
        data?.forEach(show => {
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
      })
      .catch(error => {
        console.error('Error fetching shows:', error);
        setLoading(false);
      });
  }, []);

  const handleShowClick = (id) => {
    fetch(`https://podcast-api.netlify.app/id/${id}`)
      .then(response => response.json())
      .then(data => {
        setSelectedShow(data || {});
      })
      .catch(error => {
        console.error('Error fetching show:', error);
      });
  };

  const handleBackClick = () => {
    setSelectedShow(null);
  };

  const handleToggleFavorite = (episode) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.some(fav => fav.id === episode.id)) {
        // Remove from favorites
        return prevFavorites.filter(fav => fav.id !== episode.id);
      } else {
        // Add to favorites
        return [...prevFavorites, episode];
      }
    });
  };

  let filteredShows = shows?.filter(show => {
    const matchesGenre = selectedGenre ? show.genres.includes(selectedGenre) : true;
    const matchesSearch = show.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGenre && matchesSearch;
  });

  if (sortOrder === 'title-asc') {
    filteredShows.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortOrder === 'title-desc') {
    filteredShows.sort((a, b) => b.title.localeCompare(a.title));
  } else if (sortOrder === 'date-asc') {
    filteredShows.sort((a, b) => new Date(a.updated) - new Date(b.updated));
  } else if (sortOrder === 'date-desc') {
    filteredShows.sort((a, b) => new Date(b.updated) - new Date(a.updated));
  }

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

      <div className="sort-bar">
        <label htmlFor="sortOrder">Sort by:</label>
        <select
          id="sortOrder"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="">Select</option>
          <option value="title-asc">Title A-Z</option>
          <option value="title-desc">Title Z-A</option>
          <option value="date-asc">Date Updated Ascending</option>
          <option value="date-desc">Date Updated Descending</option>
        </select>
      </div>

      <div className="previews-grid">
        {loading ? ( 
          <p>Loading podcasts...</p>
        ) : selectedShow ? (
          <div>
            <button className="back-button" onClick={handleBackClick}>Back to Shows</button>
            <Show show={selectedShow} onToggleFavorite={handleToggleFavorite} />
          </div>
        ) : (
          filteredShows?.map(show => (
            <Preview key={show.id} show={show} onClick={() => handleShowClick(show.id)} />
          ))
        )}
      </div>

      <Favourites favorites={favorites} onToggleFavorite={handleToggleFavorite} />
    </div>
  );
}

export default App;
