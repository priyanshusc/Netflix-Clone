import React, { useState } from 'react';
import { MovieCard } from './MovieCard';

export const MovieRow = ({ title, movies, onMovieClick }) => {
  // 1. New state to track the ID of the tapped card
  const [tappedCardId, setTappedCardId] = useState(null);

  const handleCardTap = (movieId) => {
    // If the same card is tapped again, close it. Otherwise, open the new one.
    if (tappedCardId === movieId) {
      setTappedCardId(null);
    } else {
      setTappedCardId(movieId);
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="flex overflow-x-scroll scrollbar-hide">
        {movies.map(movie => (
          <MovieCard 
            key={movie.id} 
            movie={movie} 
            onClick={onMovieClick}
            // 2. Pass down the tap handler and whether this card is the tapped one
            onCardTap={() => handleCardTap(movie.id)}
            isTapped={tappedCardId === movie.id}
          />
        ))}
      </div>
    </div>
  );
};