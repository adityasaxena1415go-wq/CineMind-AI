import { motion } from "framer-motion";
import { FiPlay, FiStar } from "react-icons/fi";
import { HiOutlineSparkles } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

export default function MovieCard({
  movie,
  onPlay = () => {},
  onRecommend = () => {},
}) {
  const navigate = useNavigate();

  const poster = movie?.poster_path
    ? `${IMAGE_BASE}${movie.poster_path}`
    : "https://placehold.co/500x750/111111/FFFFFF?text=No+Image";

  const year = movie?.release_date
    ? movie.release_date.split("-")[0]
    : "N/A";

  const rating = movie?.vote_average
    ? movie.vote_average.toFixed(1)
    : "N/A";

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.04 }}
      transition={{ duration: 0.3 }}
      onClick={() => navigate(`/movie/${movie.id}`)}
      className="group relative w-[170px] sm:w-[190px] md:w-[210px] overflow-hidden rounded-2xl bg-[#181818] border border-white/10 shadow-lg cursor-pointer"
    >
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={poster}
          alt={movie.title}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />

        <div className="absolute top-3 left-3 flex items-center gap-1 rounded-full bg-black/70 px-2 py-1 text-xs backdrop-blur">
          <FiStar className="text-yellow-400" />
          <span>{rating}</span>
        </div>

        {movie.progress && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
            <div
              className="h-full bg-red-600"
              style={{ width: `${movie.progress}%` }}
            />
          </div>
        )}

        <div className="absolute bottom-3 left-3 right-3 flex gap-2 opacity-0 translate-y-3 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">

          <button
            onClick={(e) => {
              e.stopPropagation();
              onPlay(movie);
            }}
            className="flex-1 rounded-full bg-white py-2 text-xs font-semibold text-black hover:bg-gray-200 transition"
          >
            <div className="flex items-center justify-center gap-1">
              <FiPlay />
              Watch
            </div>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onRecommend(movie);
            }}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-red-600 text-white hover:bg-red-500 transition"
          >
            <HiOutlineSparkles />
          </button>

        </div>
      </div>

      <div className="p-3">
        <h3 className="truncate text-sm font-semibold text-white">
          {movie.title}
        </h3>

        <p className="mt-1 text-xs text-gray-400">
          {year}
        </p>
      </div>
    </motion.div>
  );
}