import React from 'react';
import { FaPlay, FaPlus, FaCheck } from 'react-icons/fa';
import { db } from '../firebase';
import { doc, setDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { useAuth } from '../hooks/AuthContext';

const imageBaseURL = "https://image.tmdb.org/t/p/w500";

export const MovieCard = ({ movie, onClick, isTapped, onCardTap }) => {
  const { user, myList } = useAuth();
  const isInList = myList.some(item => item.id === movie.id);
  const releaseYear = movie.release_date ? movie.release_date.split('-')[0] : 'N/A';
  
  // State to handle tap on mobile
//   const [isTapped, setIsTapped] = useState(false);

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
    onClick(movie);
  };

  // This function will now handle the tap on mobile
  const handleCardClick = () => {
    if (window.innerWidth < 940) {
      onCardTap(); // Use the function passed from MovieRow
    } 
    // else {
    //   onClick(movie);
    // }
  };

  return (
    <>
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
      
      <div 
        onClick={handleCardClick}
        className="relative flex-shrink-0 w-40 m-2 group cursor-pointer"
      >
        <div className="relative rounded-lg w-full h-full transform group-hover:scale-110 transition-transform duration-300">
          <img 
            src={`${imageBaseURL}${movie.poster_path}`} 
            alt={movie.title} 
            className="rounded-lg w-full h-full object-cover"
          />
          
          <div 
            className={`absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent 
                       transition-opacity duration-300 rounded-lg flex flex-col justify-end p-3 
                       ${isTapped ? 'opacity-100' : 'opacity-0'} sm:group-hover:opacity-100`}
          >
            <h3 className="text-white font-bold text-sm line-clamp-2">{movie.title || movie.name}</h3>
            
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-2">
                <button 
                  onClick={handlePlayClick}
                  className="bg-white text-black rounded-full h-7 w-7 flex items-center justify-center hover:bg-gray-300 transition"
                >
                  <FaPlay className="ml-0.5 text-xs" />
                </button>
                <button 
                  onClick={handleAddToList}
                  className="bg-black/60 border-2 border-gray-500 text-white rounded-full h-7 w-7 flex items-center justify-center hover:border-white transition"
                >
                  {isInList ? <FaCheck className="text-xs" /> : <FaPlus className="text-xs" />}
                </button>
              </div>
              <div className="text-xs text-gray-300">
                <span>{releaseYear}</span>
                <span>⭐{movie.vote_average.toFixed(1)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};