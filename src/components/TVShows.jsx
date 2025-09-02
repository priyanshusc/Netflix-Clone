// src/components/TVShows.jsx
import React, { useState, useEffect } from 'react';
import { Navbar } from './Navbar';
import { MovieRow } from './MovieRow';
import requests from '../requests';
import { useTrailer } from '../hooks/TrailerContext';

const baseURL = "https://api.themoviedb.org/3";

export const TVShows = () => {
    const { openTrailer } = useTrailer();
  const [shows, setShows] = useState({});

  useEffect(() => {
    const fetchAllShows = async () => {
      try {
        const [originalsRes, topRatedRes, popularRes] = await Promise.all([
          fetch(`${baseURL}${requests.fetchNetflixOriginals}`),
          fetch(`${baseURL}${requests.fetchTopRatedTV}`),
          fetch(`${baseURL}${requests.fetchPopularTV}`),
        ]);

        const originalsData = await originalsRes.json();
        const topRatedData = await topRatedRes.json();
        const popularData = await popularRes.json();

        setShows({
          originals: originalsData.results,
          topRated: topRatedData.results,
          popular: popularData.results,
        });

      } catch (error) {
        console.error("Failed to fetch TV shows:", error);
      }
    };

    fetchAllShows();
  }, []);

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />
      <div className="pt-24">
        {/* 3. Pass the function to each row */}
        {shows.originals && <MovieRow title="Netflix Originals" movies={shows.originals} onMovieClick={openTrailer} />}
        {shows.topRated && <MovieRow title="Top Rated TV" movies={shows.topRated} onMovieClick={openTrailer} />}
        {shows.popular && <MovieRow title="Popular TV" movies={shows.popular} onMovieClick={openTrailer} />}
      </div>
    </div>
  );
};