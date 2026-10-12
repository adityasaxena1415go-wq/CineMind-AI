import { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const POSTER = "https://image.tmdb.org/t/p/w500";

export default function Watchlist() {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadWatchlist();
  }, []);

  const loadWatchlist = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) return;

      const res = await axios.get(
        `http://localhost:5000/api/watchlist/${user._id}`
      );

      setMovies(res.data.movies);
    } catch (err) {
      console.log(err);
    }
  };

  const removeMovie = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/watchlist/${id}`
      );

      loadWatchlist();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-[#080808] text-white p-10">

        <h1 className="text-4xl font-bold mb-10">
          ❤️ My Watchlist
        </h1>

        {movies.length === 0 ? (
          <h2 className="text-gray-400">
            No Movies Added Yet
          </h2>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">

            {movies.map((movie) => (
              <div
                key={movie._id}
                className="bg-[#181818] rounded-2xl overflow-hidden shadow-lg"
              >
                <img
                  src={`${POSTER}${movie.poster}`}
                  className="w-full h-72 object-cover cursor-pointer"
                  onClick={() =>
                    navigate(`/movie/${movie.movieId}`)
                  }
                />

                <div className="p-4">

                  <h2 className="font-bold text-lg">
                    {movie.title}
                  </h2>

                  <p className="text-gray-400 mt-2">
                    ⭐ {movie.rating.toFixed(1)}
                  </p>

                  <p className="text-gray-400">
                    {movie.releaseDate}
                  </p>

                  <button
                    onClick={() => removeMovie(movie._id)}
                    className="mt-4 w-full bg-red-600 hover:bg-red-500 py-2 rounded-xl"
                  >
                    Remove
                  </button>

                </div>
              </div>
            ))}

          </div>
        )}

      </div>
    </MainLayout>
  );
}