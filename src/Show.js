import React, { useState } from 'react';
import Season from './Season';

function Show({ show }) {
  const [selectedSeason, setSelectedSeason] = useState(null);

  const handleSeasonClick = (season) => {
    setSelectedSeason(season);
  };

  const handleBackClick = () => {
    setSelectedSeason(null);
  };

  return (
    <div>
      {selectedSeason ? (
        <div>
          <button className="back-button" onClick={handleBackClick}>Back to Show</button> {/* Back button */}
          <Season season={selectedSeason} />
        </div>
      ) : (
        <div>
          <h2>{show.title}</h2>
          <p>{show.description}</p>
          <div className="seasons-toggle">
            {show.seasons.map(season => (
              <button 
                key={season.id} 
                onClick={() => handleSeasonClick(season)}
                style={{ 
                  backgroundColor: season === selectedSeason ? '#555' : 'whitesmoke', 
                  color: season === selectedSeason ? 'white' : 'black' 
                }}
              >
                Season {season.number}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Show;
