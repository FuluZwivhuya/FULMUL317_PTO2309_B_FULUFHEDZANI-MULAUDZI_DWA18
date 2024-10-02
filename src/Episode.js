import React, { useEffect } from 'react';

function Episode({ episode, toggleFavorite }) {
  const audioFile = episode.file || 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'; 

  // Track when episode data is received
  useEffect(() => {
    console.log('Rendering Episode component');
    console.log('Episode data:', episode);
  }, [episode]);

  // Track when the audio-file is being used or missing
  useEffect(() => {
    if (audioFile) {
      console.log(`Using audio file: ${audioFile}`);
    } else {
      console.log('No audio file available for this episode');
    }
  }, [audioFile]);

  return (
    <div className="episode">
      <p>{episode.title}</p>
      
      {audioFile ? (
        <audio controls>
          <source src={audioFile} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      ) : (
        <p>No audio available for this episode</p>
      )}

      <button onClick={() => {
        console.log(`Toggling favorite for episode: ${episode.title}`);
        toggleFavorite(episode);
      }}>
        {episode.isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>
    </div>
  );
}

export default Episode;
