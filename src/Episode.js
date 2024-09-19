import React from 'react';

function Episode({ episode }) {
  const audioFile = episode.file || 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';

  return (
    <div>
      <p>{episode.title}</p>
      <audio controls>
        <source src={audioFile} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}

export default Episode;
