import React, { useState, useEffect, useRef } from 'react';

function PersistentAudioPlayer({ currentEpisode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // Stores the current playback position
  const audioRef = useRef(null);

  // Load saved progress from localStorage if available
  useEffect(() => {
    const savedProgress = localStorage.getItem(`progress-${currentEpisode?.id}`);
    if (savedProgress) {
      setProgress(parseFloat(savedProgress));
    }
  }, [currentEpisode]);

  // Update progress when playing
  useEffect(() => {
    const audioElement = audioRef.current; // Capture the current audio element
    if (audioElement) {
      audioElement.currentTime = progress;
    }

    const handleTimeUpdate = () => {
      setProgress(audioElement.currentTime);
    };

    if (audioElement) {
      audioElement.addEventListener('timeupdate', handleTimeUpdate);
    }

    return () => {
      // Use the captured value in the cleanup
      if (audioElement) {
        audioElement.removeEventListener('timeupdate', handleTimeUpdate);
      }
    };
  }, [progress]);

  // Save progress in localStorage on pause or stop
  const handlePause = () => {
    setIsPlaying(false);
    localStorage.setItem(`progress-${currentEpisode.id}`, audioRef.current.currentTime);
  };

  const handlePlay = () => {
    setIsPlaying(true);
    audioRef.current.play();
  };

  const handleEnded = () => {
    setIsPlaying(false);
    localStorage.setItem(`progress-${currentEpisode.id}`, 0); // Reset progress on completion
  };

  return (
    <div className="audio-player">
      {currentEpisode ? (
        <>
          <p>Now playing: {currentEpisode.title}</p>
          <audio
            ref={audioRef}
            src={currentEpisode.audioUrl}
            onPause={handlePause}
            onEnded={handleEnded}
            controls
          />
          <button onClick={isPlaying ? () => audioRef.current.pause() : handlePlay}>
            {isPlaying ? 'Pause' : 'Play'}
          </button>
        </>
      ) : (
        <p>No episode selected</p>
      )}
    </div>
  );
}

export default PersistentAudioPlayer;

