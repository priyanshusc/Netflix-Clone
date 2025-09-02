// src/hooks/TrailerContext.jsx
import React, { createContext, useContext, useState } from 'react';
import { fetchVideos } from '../requests'; // Use the new fetchVideos function

const baseURL = "https://api.themoviedb.org/3";
const TrailerContext = createContext();

export function useTrailer() {
  return useContext(TrailerContext);
}

export function TrailerProvider({ children }) {
  const [trailerKey, setTrailerKey] = useState('');

  const openTrailer = async (item) => {
    // Determine if the item is a movie (has 'title') or a TV show (has 'name')
    const mediaType = item.title ? 'movie' : 'tv';

    try {
      // Use the new function with the correct mediaType and ID
      const url = `${baseURL}${fetchVideos(mediaType, item.id)}`;
      const response = await fetch(url);
      const data = await response.json();
      const officialTrailer = data.results.find(
        video => video.site === 'YouTube' && video.type === 'Trailer' && video.official === true
      );

      if (officialTrailer) {
        setTrailerKey(officialTrailer.key);
      } else {
        const anyTrailer = data.results.find(video => video.type === 'Trailer');
        if (anyTrailer) {
          setTrailerKey(anyTrailer.key);
        } else {
          alert("Sorry, no trailer is available for this title.");
        }
      }
    } catch (error) {
      console.error("Error fetching trailer:", error);
    }
  };

  const closeTrailer = () => {
    setTrailerKey('');
  };

  const value = { trailerKey, openTrailer, closeTrailer };

  return (
    <TrailerContext.Provider value={value}>
      {children}
    </TrailerContext.Provider>
  );
}