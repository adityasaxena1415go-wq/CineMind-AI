import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { searchMovies } from "../services/movieService";

const POSTER = "https://image.tmdb.org/t/p/w200";

export default function SearchBar() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const inputRef = useRef(null);
  const navigate = useNavigate();

  const handleOpen = () => {
    setOpen(true);
    setTimeout(() => inputRef.current?.focus(), 150);
  };

  const handleBlur = () => {
    setTimeout(() => {
      if (!query) {
        setOpen(false);
      }
      setResults([]);
    }, 200);
  };

  useEffect(() => {
    const delay = setTimeout(async () => {
      if (!query.trim()) {
        setResults([]);
        return;
      }

      try {
        const movies = await searchMovies(query);
        setResults(movies.slice(0, 8));
      } catch (err) {
        console.log(err);
      }
    }, 400);

    return () => clearTimeout(delay);
  }, [query]);
const openMovie = (movie) => {
  console.log(movie);

  navigate(`/movie/${movie.id}`);
};
  return (
    <div className="relative">

      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex items-center"
      >
        <motion.div
          animate={{ width: open ? 300 : 44 }}
          transition={{
            type: "spring",
            stiffness: 320,
            damping: 28,
          }}
          className="glass flex items-center h-11 rounded-full overflow-hidden px-2"
        >
          <button
            type="button"
            onClick={!open ? handleOpen : undefined}
            className="flex items-center justify-center w-8 h-8 text-white"
          >
            <FiSearch />
          </button>

          <AnimatePresence>
            {open && (
              <motion.input
                ref={inputRef}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                value={query}
                onBlur={handleBlur}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search Movies..."
                className="flex-1 bg-transparent outline-none text-white px-2"
              />
            )}
          </AnimatePresence>

          {open && query && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setResults([]);
              }}
              className="text-white"
            >
              <FiX />
            </button>
          )}
        </motion.div>
      </form>

      {results.length > 0 && (
        <div className="absolute mt-3 w-[320px] bg-[#181818] rounded-xl shadow-2xl overflow-hidden z-50">

          {results.map((movie) => (

            <div
              key={movie.id}
              onClick={() => openMovie(movie)}
              className="flex gap-3 p-3 hover:bg-[#282828] cursor-pointer transition"
            >

              <img
                src={
                  movie.poster_path
                    ? `${POSTER}${movie.poster_path}`
                    : "https://placehold.co/60x90"
                }
                className="w-12 h-16 rounded object-cover"
              />

              <div className="flex-1">

                <h3 className="font-semibold text-white">
                  {movie.title}
                </h3>

                <p className="text-sm text-gray-400">
                  {movie.release_date?.slice(0, 4)}
                </p>

                <p className="text-yellow-400 text-sm">
                  ⭐ {movie.vote_average?.toFixed(1)}
                </p>

              </div>

            </div>

          ))}

        </div>
      )}

    </div>
  );
}