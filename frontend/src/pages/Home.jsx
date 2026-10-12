import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import Hero from "../components/home/Hero";
import GenreStrip from "../components/home/GenreStrip";
import MovieRow from "../components/movie/MovieRow";

import {
  getTrendingMovies,
  getTopRatedMovies,
  getNowPlayingMovies,
  getPopularMovies,
  getMoviesByGenre,
} from "../services/movieService";

export default function Home() {
  const [featuredMovie, setFeaturedMovie] = useState(null);
const [aiReason, setAIReason] = useState("");
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);

  const [activeGenre, setActiveGenre] = useState(null); 
  const genreMap = {
  Action: 28,
  Comedy: 35,
  Drama: 18,
  Horror: 27,
  Romance: 10749,
  Thriller: 53,
  Mystery: 9648,
  Animation: 16,
  Documentary: 99,
  "Sci-Fi": 878,
};

  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = async () => {
    try {
      const trending = await getTrendingMovies();
      const topRated = await getTopRatedMovies();
      const nowPlaying = await getNowPlayingMovies();
      const popular = await getPopularMovies();

      setTrendingMovies(trending);
      setTopRatedMovies(topRated);
      setNowPlayingMovies(nowPlaying);
      setPopularMovies(popular);

     const allMovies = [
  ...trending,
  ...topRated,
  ...nowPlaying,
  ...popular,
];

// Duplicate remove
const uniqueMovies = [
  ...new Map(allMovies.map((m) => [m.id, m])).values(),
];

const randomMovie =
  uniqueMovies[
    Math.floor(Math.random() * uniqueMovies.length)
  ];

setFeaturedMovie(randomMovie);

const reasons = [
  "Because this movie is trending worldwide.",
  "AI predicts you'll enjoy this masterpiece.",
  "Highly rated by movie lovers.",
  "Recommended based on popularity.",
  "Critics and audiences both love it.",
  "Perfect choice for tonight.",
  "One of the best movies available now.",
];

setAIReason(
  reasons[Math.floor(Math.random() * reasons.length)]
);
    } catch (err) {
      console.error(err);
    }
  }; 
  const handleGenre = async (genre) => {
  try {
    setActiveGenre(genre);

    const movies = await getMoviesByGenre(genreMap[genre]);

    setTrendingMovies(movies);

  } catch (err) {
    console.log(err);
  }
};

  const handlePlay = (movie) => {
    console.log("Play:", movie);
  };

  const handleRecommend = (movie) => {
    console.log("AI Recommend:", movie);
  };

  const handleDetails = (movie) => {
    console.log("Movie Details:", movie);
  };

  return (
    <motion.main
      className="min-h-screen bg-[#080808] text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {featuredMovie && (
       <Hero
  movie={featuredMovie}
  aiReason={aiReason}
  onRefresh={loadMovies}
  onPlay={handlePlay}
  onDetails={handleDetails}
/>
      )}

      <div className="relative z-10 -mt-12">

     <GenreStrip
  active={activeGenre}
  onSelect={handleGenre}
/>

        <MovieRow
          title="🔥 Trending Movies"
          movies={trendingMovies}
          onPlay={handlePlay}
          onRecommend={handleRecommend}
        />

        <MovieRow
          title="⭐ Top Rated"
          movies={topRatedMovies}
          onPlay={handlePlay}
          onRecommend={handleRecommend}
        />

        <MovieRow
          title="🎬 Now Playing"
          movies={nowPlayingMovies}
          onPlay={handlePlay}
          onRecommend={handleRecommend}
        />

        <MovieRow
          title="🍿 Popular Movies"
          movies={popularMovies}
          onPlay={handlePlay}
          onRecommend={handleRecommend}
        />

      </div>
    </motion.main>
  );
}