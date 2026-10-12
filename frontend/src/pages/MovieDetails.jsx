import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiStar,
  FiCalendar,
  FiClock,
  FiPlay,
} from "react-icons/fi";

import MainLayout from "../layout/MainLayout";
import MovieRow from "../components/movie/MovieRow";
import {
  getMovieDetails,
  getMovieCredits,
  getMovieVideos,
  getSimilarMovies,
  getAIRecommendations,
  addToWatchlist,
  getBollywoodMovies,
} from "../services/movieService";

const IMAGE = "https://image.tmdb.org/t/p/original";
const POSTER = "https://image.tmdb.org/t/p/w500";

export default function MovieDetails() {
  const { id } = useParams();
const [bollywood, setBollywood] = useState([]);
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [videos, setVideos] = useState([]);
  const [similar, setSimilar] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  const [loading, setLoading] = useState(true);
useEffect(() => {
  loadMovie();
}, [id]);

const handleWatchlist = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("Please Login First");
      return;
    }

    const res = await addToWatchlist({
      user: user._id,
      movieId: movie.id,
      title: movie.title,
      poster: movie.poster_path,
      rating: movie.vote_average,
      releaseDate: movie.release_date,
    });

    alert(res.message || "Added to Watchlist ❤️");
  } catch (err) {
    console.log(err);
  }
};

const loadMovie = async () => {
  try {
    setLoading(true);

    const details = await getMovieDetails(id);
    const credits = await getMovieCredits(id);
    const vids = await getMovieVideos(id);
    const similarMovies = await getSimilarMovies(id);
    const aiMovies = await getAIRecommendations(details.title);
    const bollywoodMovies = await getBollywoodMovies();

    setMovie(details);
    setCast(credits.slice(0, 10));
    setVideos(vids);
    setSimilar(similarMovies);
    setRecommendations(aiMovies);
    setBollywood(bollywoodMovies.slice(0, 10));
  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
};
  if (loading) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center bg-[#080808] text-white">
          <h1 className="text-3xl font-bold">
            Loading Movie...
          </h1>
        </div>
      </MainLayout>
    );
  }

  if (!movie) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center bg-[#080808] text-red-500">
          Movie Not Found
        </div>
      </MainLayout>
    );
  }

  const trailer = videos.find(
    (v) =>
      v.site === "YouTube" &&
      v.type === "Trailer"
  );

  return (
    <MainLayout>
      <div className="bg-[#080808] text-white min-h-screen">

        {/* Banner */}

        <div className="relative h-[80vh]">

          <img
            src={`${IMAGE}${movie.backdrop_path}`}
            alt={movie.title}
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-black/40 to-transparent" />

          <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-black/30 to-transparent" />

          <div className="relative z-10 max-w-7xl mx-auto h-full flex items-end px-8 pb-16">

            <motion.div
              initial={{
                opacity: 0,
                y: 40,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
            >
              <h1 className="text-6xl font-black mb-6">
                {movie.title}
              </h1>

              <div className="flex flex-wrap gap-6 text-gray-300">

                <div className="flex items-center gap-2">

                  <FiStar className="text-yellow-400" />

                  {movie.vote_average.toFixed(1)}

                </div>

                <div className="flex items-center gap-2">

                  <FiCalendar />

                  {movie.release_date}

                </div>

                <div className="flex items-center gap-2">

                  <FiClock />

                  {movie.runtime} min

                </div>

              </div>

              <div className="flex gap-2 mt-5 flex-wrap">

                {movie.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="bg-red-600 px-3 py-1 rounded-full text-sm"
                  >
                    {genre.name}
                  </span>
                ))}

              </div>

              <p className="max-w-3xl mt-8 text-lg text-gray-300 leading-8">

                {movie.overview}

              </p>

              <div className="flex gap-4 mt-8">

  {trailer && (
    <a
      href={`https://www.youtube.com/watch?v=${trailer.key}`}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-3 bg-red-600 hover:bg-red-500 px-8 py-4 rounded-full font-bold transition"
    >
      <FiPlay />
      Watch Trailer
    </a>
  )}

  <button
    onClick={handleWatchlist}
    className="bg-white text-black hover:bg-gray-200 px-8 py-4 rounded-full font-bold transition"
  >
    ❤️ Add to Watchlist
 </button>

</div>

</motion.div>

</div>

</div>

        {/* Poster + Cast */}

        <div className="max-w-7xl mx-auto px-8 py-16 grid lg:grid-cols-3 gap-10">

          <div>

            <img
              src={`${POSTER}${movie.poster_path}`}
              alt={movie.title}
              className="rounded-3xl shadow-2xl"
            />

          </div>

          <div className="lg:col-span-2">

            <h2 className="text-3xl font-bold mb-8">

              Top Cast

            </h2>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">

              {cast.map((person) => (
                <div
                  key={person.id}
                  className="text-center"
                >
                  <img
                    src={
                      person.profile_path
                        ? `${POSTER}${person.profile_path}`
                        : "https://placehold.co/300x450"
                    }
                    className="rounded-2xl h-56 w-full object-cover"
                  />

                  <h3 className="mt-3 font-semibold">
                    {person.name}
                  </h3>

                  <p className="text-sm text-gray-400">

                    {person.character}

                  </p>

                </div>
              ))}

            </div>

          </div>

        </div>

        {/* AI Recommendations */}

        <div className="max-w-7xl mx-auto px-8 pb-16">

          <h2 className="text-3xl font-bold mb-8">
            🤖 AI Recommended Movies
          </h2>

          {recommendations.length > 0 ? (

            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">

{recommendations.map((movie) => (

<motion.div
  key={movie.movieId}
  whileHover={{ y: -8 }}
  onClick={() => {
    if (movie.tmdb?.id) {
      navigate(`/movie/${movie.tmdb.id}`);
    }
  }}
  className="bg-[#151515] rounded-2xl overflow-hidden border border-white/10 cursor-pointer"
>
    <img
      src={
        movie.tmdb?.poster_path
          ? `${POSTER}${movie.tmdb.poster_path}`
          : "https://placehold.co/300x450?text=No+Image"
      }
      className="w-full h-72 object-cover"
      alt={movie.title}
    />

    <div className="p-4">

      <h3 className="font-bold text-lg line-clamp-2">
        {movie.title}
      </h3>

      <p className="text-gray-400 text-sm mt-2">
        {movie.tmdb?.release_date?.split("-")[0]}
      </p>

      <div className="flex items-center gap-2 mt-3">

        <FiStar className="text-yellow-400" />

        <span>
          {movie.tmdb?.vote_average?.toFixed(1) || movie.score}
        </span>

      </div>

    </div>

  </motion.div>

))}
            </div>

          ) : (

            <p className="text-gray-400">

              No AI Recommendations Found.

            </p>

          )}

        </div>

        {/* Similar Movies */}

        <div className="pb-20">

          <MovieRow
            title="🍿 Similar Movies"
            movies={similar}
            onPlay={(movie) =>
              console.log(movie)
            }
            onRecommend={(movie) =>
              console.log(movie)
            }
          /> 
<MovieRow
  title="🎬 Popular Bollywood Movies"
  movies={bollywood}
  onPlay={(movie) => console.log(movie)}
  onRecommend={(movie) => console.log(movie)}
/>
        </div>

      </div>

    </MainLayout>

  );

}
