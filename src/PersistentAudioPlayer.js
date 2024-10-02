import React, { useState, useEffect, useRef } from 'react';

function PersistentAudioPlayer({ episode, onEnded }) {
  const [currentTime, setCurrentTime] = useState(() => loadProgress(episode.id) || 0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  const handleTimeUpdate = (e) => {
    setCurrentTime(e.target.currentTime);
    setDuration(e.target.duration);
  };

  const saveProgress = (episodeId, currentTime) => {
    const progress = JSON.parse(localStorage.getItem('progress')) || {};
    progress[episodeId] = currentTime;
    localStorage.setItem('progress', JSON.stringify(progress));
  };

  const loadProgress = (episodeId) => {
    const progress = JSON.parse(localStorage.getItem('progress')) || {};
    return progress[episodeId] || 0;
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleBeforeUnload = (e) => {
    if (audioRef.current && !audioRef.current.paused) {
      e.preventDefault();
      e.returnValue = '';
    }
  };

  useEffect(() => {
    saveProgress(episode.id, currentTime);
  }, [currentTime, episode.id]);

  useEffect(() => {
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = currentTime;
    }
  }, [currentTime]);

  return (
    <div className="audio-player">
      <p>{episode.title}</p>
      <audio 
        ref={audioRef}
        controls 
        src={episode.file}
        onTimeUpdate={handleTimeUpdate}
        onEnded={onEnded}
      >
        Your browser does not support the audio element.
      </audio>
      <div className="progress">
        <span>{formatTime(currentTime)}</span> / <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
}

export default PersistentAudioPlayer;
