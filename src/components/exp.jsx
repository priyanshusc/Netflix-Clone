// src/components/MovieCard.jsx
import React from 'react';
import { FaPlay, FaPlus, FaCheck } from 'react-icons/fa';
import { db } from '../firebase';
import { doc, setDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { useAuth } from '../hooks/AuthContext';

const imageBaseURL = "https://image.tmdb.org/t/p/w500";

export const MovieCard = ({ movie, onClick }) => {
  const { user, myList } = useAuth();
  const isInList = myList.some(item => item.id === movie.id);

  const handleAddToList = async (e) => {
    e.stopPropagation();
    if (user) {
      const userDocRef = doc(db, 'users', user.uid);
      const updateAction = isInList ? arrayRemove(movie) : arrayUnion(movie);
      try {
        await setDoc(userDocRef, { myList: updateAction }, { merge: true });
      } catch (error) {
        console.error("Error updating list:", error);
      }
    } else {
      alert("Please log in to save movies.");
    }
  };

  const handlePlayClick = (e) => {
    e.stopPropagation();
    // This is the critical fix: call onClick and pass the movie object
    onClick(movie); 
  };

  return (
    <div className="relative w-48 m-2 group">
      <div className="absolute inset-0 transform group-hover:scale-110 group-hover:-translate-y-4 transition-transform duration-300 ease-in-out z-10 rounded-lg overflow-hidden shadow-2xl">
        <img 
          src={`${imageBaseURL}${movie.poster_path}`} 
          alt={movie.title || movie.name} 
          className="w-full h-auto object-cover"
        />
        <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
          <h3 className="text-white font-bold text-md mb-2">{movie.title || movie.name}</h3>
          <div className="flex items-center gap-2 mb-2">
            <button 
              onClick={handlePlayClick}
              className="bg-white text-black rounded-full h-8 w-8 flex items-center justify-center hover:bg-gray-300 transition"
            >
              <FaPlay className="ml-0.5" />
            </button>
            <button 
              onClick={handleAddToList}
              className="bg-black/60 border-2 border-gray-500 text-white rounded-full h-8 w-8 flex items-center justify-center hover:border-white transition"
            >
              {isInList ? <FaCheck /> : <FaPlus />}
            </button>
          </div>
          <div className="flex items-center text-xs text-gray-400">
            <span>{movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}</span>
            <span className="border-l border-gray-500 mx-2 h-3"></span>
            <span>⭐ {movie.vote_average.toFixed(1)}</span>
          </div>
        </div>
      </div>
      <img 
        src={`${imageBaseURL}${movie.poster_path}`} 
        alt="" 
        className="w-full h-auto object-cover rounded-lg"
      />
    </div>
  );
};