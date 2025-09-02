// src/components/TrailerModal.jsx
import React from 'react';
import YouTube from 'react-youtube';
import { FaTimes } from 'react-icons/fa'; // Close icon

export const TrailerModal = ({ trailerKey, onClose }) => {
  // If no trailer key is provided, don't render anything
  if (!trailerKey) return null;

  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    // Main overlay with a semi-transparent black background
    <div 
      className="fixed inset-0 bg-black bg-opacity-80 z-50 flex justify-center items-center" 
      onClick={onClose}
    >
      {/* Close button in the top-right corner */}
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 text-white text-3xl z-50"
      >
        <FaTimes />
      </button>

      {/* Video container with a 16:9 aspect ratio */}
      <div 
        className="w-full max-w-4xl aspect-video relative" 
        onClick={(e) => e.stopPropagation()} // Prevents closing the modal when clicking the player
      >
        <YouTube 
          videoId={trailerKey}
          opts={opts}
          className="absolute top-0 left-0 w-full h-full"
        />
      </div>
    </div>
  );
};