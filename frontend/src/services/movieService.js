import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const BACKEND_URL = "http://localhost:5000/api";

const tmdb = axios.create({
  baseURL: TMDB_BASE_URL,
});

const backend = axios.create({
  baseURL: BACKEND_URL,
});

// =========================
// TMDB APIs
// =========================

// Trending Movies
export const getTrendingMovies = async () => {
  const res = await tmdb.get(
    `/trending/movie/week?api_key=${API_KEY}`
  );
  return res.data.results;
};

// Top Rated
export const getTopRatedMovies = async () => {
  const res = await tmdb.get(
    `/movie/top_rated?api_key=${API_KEY}`
  );
  return res.data.results;
};

// Now Playing
export const getNowPlayingMovies = async () => {
  const res = await tmdb.get(
    `/movie/now_playing?api_key=${API_KEY}`
  );
  return res.data.results;
};

// Popular
export const getPopularMovies = async () => {
  const res = await tmdb.get(
    `/movie/popular?api_key=${API_KEY}`
  );
  return res.data.results;
};

// Search
export const searchMovies = async (query) => {
  const res = await tmdb.get(
    `/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
  );
  return res.data.results;
};

// Details
export const getMovieDetails = async (id) => {
  const res = await tmdb.get(
    `/movie/${id}?api_key=${API_KEY}`
  );
  return res.data;
};

// Cast
export const getMovieCredits = async (id) => {
  const res = await tmdb.get(
    `/movie/${id}/credits?api_key=${API_KEY}`
  );
  return res.data.cast;
};

// Trailer
export const getMovieVideos = async (id) => {
  const res = await tmdb.get(
    `/movie/${id}/videos?api_key=${API_KEY}`
  );
  return res.data.results;
};

// Similar Movies
export const getSimilarMovies = async (id) => {
  const res = await tmdb.get(
    `/movie/${id}/similar?api_key=${API_KEY}`
  );
  return res.data.results;
};

// =========================
// AI Recommendation API
// =========================

export const getAIRecommendations = async (movieName) => {
  try {
    const res = await backend.post("/movies/recommend", {
      movie: movieName,
    });

    return res.data.recommendations || [];
  } catch (err) {
    console.error("AI Recommendation Error:", err);
    return [];
  }
};
// Search Single Movie By Title
export const searchMovieByTitle = async (title) => {
  try {
    const res = await tmdb.get(
      `/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(title)}`
    );

    if (res.data.results.length > 0) {
      return res.data.results[0];
    }

    return null;
  } catch (err) {
    return null;
  }
};


// Add to Watchlist
export const addToWatchlist = async (data) => {
  const res = await backend.post("/watchlist/add", data);
  return res.data;
}; 

// Get Watchlist
export const getWatchlist = async (userId) => {
  const res = await backend.get(`/watchlist/${userId}`);
  return res.data.movies;
};

// Remove from Watchlist
export const removeFromWatchlist = async (id) => {
  const res = await backend.delete(`/watchlist/${id}`);
  return res.data;
};
// Bollywood Movies
export const getBollywoodMovies = async () => {
  const res = await tmdb.get(
    `/discover/movie?api_key=${API_KEY}&with_original_language=hi&sort_by=popularity.desc`
  );

  return res.data.results;
}; 
export const getMoviesByGenre = async (genreId) => {
  const res = await tmdb.get(
    `/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`
  );

  return res.data.results;
}; 
