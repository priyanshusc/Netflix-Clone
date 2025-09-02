// src/components/Movies.jsx
import React,
{ useState, useEffect } from 'react';
import { Navbar } from './Navbar';
import { MovieRow } from './MovieRow';
import requests from '../requests';
import { useTrailer } from '../hooks/TrailerContext';

const baseURL = "https://api.themoviedb.org/3";

export const Movies = () => {
    const { openTrailer } = useTrailer();
    const [movies, setMovies] = useState({});

    useEffect(() => {
        const fetchAllMovies = async () => {
            try {
                const [topRatedRes, popularRes, upcomingRes, ComedyRes] = await Promise.all([
                    fetch(`${baseURL}${requests.fetchTopRated}`),
                    fetch(`${baseURL}${requests.fetchPopularMovies}`),
                    fetch(`${baseURL}${requests.fetchUpcomingMovies}`),
                    fetch(`${baseURL}${requests.fetchComedyMovies}`),
                ]);

                const topRatedData = await topRatedRes.json();
                const popularData = await popularRes.json();
                const upcomingData = await upcomingRes.json();
                const ComedyData = await ComedyRes.json();

                setMovies({
                    topRated: topRatedData.results,
                    popular: popularData.results,
                    upcoming: upcomingData.results,
                    comedy: ComedyData.results,
                });

            } catch (error) {
                console.error("Failed to fetch movies:", error);
            }
        };

        fetchAllMovies();
    }, []);

    return (
        <div className="bg-black text-white min-h-screen">
            <Navbar />
            <div className="pt-24">
        {/* 3. Pass the function to each row */}
        {movies.topRated && <MovieRow title="Top Rated Movies" movies={movies.topRated} onMovieClick={openTrailer} />}
        {movies.popular && <MovieRow title="Popular Movies" movies={movies.popular} onMovieClick={openTrailer} />}
        {movies.upcoming && <MovieRow title="Upcoming Movies" movies={movies.upcoming} onMovieClick={openTrailer} />}
        {movies.comedy && <MovieRow title="Comedy Movies" movies={movies.comedy} onMovieClick={openTrailer} />}
      </div>
        </div>
    );
};