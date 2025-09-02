// src/components/SearchOverlay.jsx
import React, { useState, useEffect, useRef } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useDebounce } from '../hooks/useDebounce';
import { fetchSearch } from '../requests';
import { MovieCard } from './MovieCard';
import { useTrailer } from '../hooks/TrailerContext';

const baseURL = "https://api.themoviedb.org/3";

export const SearchOverlay = ({ isOpen, onClose }) => {
    const { openTrailer } = useTrailer();
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const debouncedQuery = useDebounce(query, 500);
    const inputRef = useRef(null);
    const [tappedCardId, setTappedCardId] = useState(null); // 1. Add state for mobile tap

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 100);
        } else {
            // 2. Reset state when overlay is closed
            setQuery('');
            setResults([]);
            setTappedCardId(null);
        }
    }, [isOpen]);

    useEffect(() => {
        if (debouncedQuery.trim().length > 1) {
            const fetchResults = async () => {
                try {
                    const url = `${baseURL}${fetchSearch(debouncedQuery)}`;
                    const response = await fetch(url);
                    const data = await response.json();
                    setResults(data.results);
                } catch (error) {
                    console.error("Failed to fetch search results:", error);
                }
            };
            fetchResults();
        } else {
            setResults([]);
        }
    }, [debouncedQuery]);

    // 3. Handler for card tap logic
    const handleCardTap = (movieId) => {
        setTappedCardId(prevId => (prevId === movieId ? null : movieId));
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex flex-col items-center p-4" onClick={onClose}>
            <div className="w-full max-w-lg sm:max-w-2xl mt-16 sm:mt-24" onClick={(e) => e.stopPropagation()}>
                <div className="relative flex items-center">
                    <FaSearch className="absolute left-4 text-gray-400" size={24} />
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search for a title..."
                        className="w-full bg-transparent text-lg sm:text-2xl text-white p-4 pl-14 border-b-2 border-red-600 focus:outline-none"
                    />
                </div>
            </div>

            <style>{`.scrollbar-hide::-webkit-scrollbar { display: none; } .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }`}</style>
            <div className="w-full max-w-6xl mt-8 overflow-y-auto pb-8 scrollbar-hide" onClick={(e) => e.stopPropagation()}>
                {results.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                        {results.map(movie => (
                            <MovieCard
                                key={movie.id}
                                movie={movie}
                                onClick={openTrailer}
                                onCloseOverlay={onClose}
                                isTapped={movie.id === tappedCardId} // 4. Pass tapped state
                                onCardTap={() => handleCardTap(movie.id)} // 5. Pass tap handler
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};