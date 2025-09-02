// src/requests.js
const apiKey = import.meta.env.VITE_TMDB_API_KEY;

const requests = {
    // Movies
    fetchTrending: `/trending/movie/week?api_key=${apiKey}&language=en-US`,
    fetchTopRated: `/movie/top_rated?api_key=${apiKey}&language=en-US`,
    fetchActionMovies: `/discover/movie?api_key=${apiKey}&with_genres=28`,
    fetchComedyMovies: `/discover/movie?api_key=${apiKey}&with_genres=35`,
    fetchHorrorMovies: `/discover/movie?api_key=${apiKey}&with_genres=27`,
    fetchPopularMovies: `/movie/popular?api_key=${apiKey}&language=en-US`, // New
    fetchUpcomingMovies: `/movie/upcoming?api_key=${apiKey}&language=en-US`, // New

    // TV Shows (New)
    fetchNetflixOriginals: `/discover/tv?api_key=${apiKey}&with_networks=213`,
    fetchTopRatedTV: `/tv/top_rated?api_key=${apiKey}&language=en-US`,
    fetchPopularTV: `/tv/popular?api_key=${apiKey}&language=en-US`,
};

export default requests;

export const fetchSearch = (query) => 
  `/search/movie?api_key=${apiKey}&language=en-US&query=${query}&page=1&include_adult=false`;

export const fetchVideos = (mediaType, id) => 
  `/${mediaType}/${id}/videos?api_key=${apiKey}&language=en-US`;