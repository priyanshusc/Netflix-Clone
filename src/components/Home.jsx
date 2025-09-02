import React, { useState, useEffect } from 'react';
import { MovieRow } from './MovieRow';
import { Navbar } from './Navbar';
import requests from '../requests';
import { db } from '../firebase';
import { doc, setDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { useAuth } from '../hooks/AuthContext';
import { useTrailer } from '../hooks/TrailerContext'; // 1. Import the new trailer hook

const baseURL = "https://api.themoviedb.org/3";
const imageBaseURL = "https://image.tmdb.org/t/p/original";

function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + '...' : str;
}

export const Home = () => {
    const { user, myList } = useAuth();
    const { openTrailer } = useTrailer(); // 2. Get the global openTrailer function
    const [movies, setMovies] = useState({});
    const [heroMovie, setHeroMovie] = useState(null);

    const isHeroInList = heroMovie && myList.some(item => item.id === heroMovie.id);

    useEffect(() => {
        // Data fetching logic is unchanged
        const fetchAllMovies = async () => {
            try {
                const [trendingRes, topRatedRes, actionRes, comedyRes, horrorRes] = await Promise.all([
                    fetch(`${baseURL}${requests.fetchTrending}`),
                    fetch(`${baseURL}${requests.fetchTopRated}`),
                    fetch(`${baseURL}${requests.fetchActionMovies}`),
                    fetch(`${baseURL}${requests.fetchComedyMovies}`),
                    fetch(`${baseURL}${requests.fetchHorrorMovies}`),
                ]);
                const trendingData = await trendingRes.json();
                const topRatedData = await topRatedRes.json();
                const actionData = await actionRes.json();
                const comedyData = await comedyRes.json();
                const horrorData = await horrorRes.json();
                setMovies({
                    trending: trendingData.results,
                    topRated: topRatedData.results,
                    action: actionData.results,
                    comedy: comedyData.results,
                    horror: horrorData.results,
                });
                const trending = trendingData.results;
                setHeroMovie(trending[Math.floor(Math.random() * trending.length)]);
            } catch (error) {
                console.error("Failed to fetch movies:", error);
            }
        };
        fetchAllMovies();
    }, []);

    const handleHeroAddToList = async () => {
        if (user && heroMovie) {
            const userDocRef = doc(db, 'users', user.uid);
            const updateAction = isHeroInList ? arrayRemove(heroMovie) : arrayUnion(heroMovie);
            await setDoc(userDocRef, { myList: updateAction }, { merge: true });
        }
    };

    return (
        <div className="bg-black text-white min-h-screen">
            <Navbar />
            {heroMovie && (
                <div
                    className="h-[550px] relative" // Kept height consistent for simplicity
                    style={{ backgroundImage: `url(${imageBaseURL}${heroMovie.backdrop_path})`, backgroundSize: 'cover', backgroundPosition: 'center center' }}
                >
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black via-transparent to-transparent"></div>
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black via-black/30 to-transparent"></div>
                    <div className="relative z-10 flex flex-col justify-center h-full px-8 md:px-16">

                        {/* Responsive Title */}
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold py-4 max-w-xl">{heroMovie.title || heroMovie.name}</h1>

                        {/* Responsive Buttons */}
                        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 my-4">
                            <button
                                onClick={() => openTrailer(heroMovie)}
                                className="bg-white text-black font-bold py-2 px-6 rounded-md hover:bg-gray-300 transition w-full sm:w-auto"
                            >
                                Play
                            </button>
                            <button
                                onClick={handleHeroAddToList}
                                className="bg-gray-500/50 text-white font-bold py-2 px-6 rounded-md border border-gray-400 hover:bg-gray-700 transition w-full sm:w-auto"
                            >
                                {isHeroInList ? '✓ In My List' : '+ My List'}
                            </button>
                        </div>

                        <p className="text-gray-300 text-sm">Released: {heroMovie.release_date}</p>

                        {/* Responsive Description */}
                        <p className="w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200 mt-2 text-sm md:text-base">
                            {truncate(heroMovie.overview, 150)}
                        </p>
                    </div>
                </div>
            )}
            <div className="">
                {movies.trending && <MovieRow title="Trending Now" movies={movies.trending} onMovieClick={openTrailer} />}
                {movies.topRated && <MovieRow title="Top Rated" movies={movies.topRated} onMovieClick={openTrailer} />}
                {movies.action && <MovieRow title="Action Movies" movies={movies.action} onMovieClick={openTrailer} />}
                {movies.comedy && <MovieRow title="Comedy Movies" movies={movies.comedy} onMovieClick={openTrailer} />}
                {movies.horror && <MovieRow title="Horror Movies" movies={movies.horror} onMovieClick={openTrailer} />}
            </div>
        </div>
    );
};