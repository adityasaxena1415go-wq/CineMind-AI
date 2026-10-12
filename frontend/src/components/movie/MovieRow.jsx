import { useRef } from "react";
import { motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import MovieCard from "./MovieCard";

export default function MovieRow({
  title,
  movies = [],
  onPlay,
  onRecommend,
}) {
  const sliderRef = useRef(null);

  const scroll = (direction) => {
    if (!sliderRef.current) return;

    sliderRef.current.scrollBy({
      left: direction * 500,
      behavior: "smooth",
    });
  };

  if (!movies || movies.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative py-8 group"
    >
      {/* Heading */}
      <div className="flex items-center justify-between px-6 md:px-10 mb-5">
        <h2 className="text-2xl font-bold text-white">
          {title}
        </h2>

        <div className="hidden md:flex gap-2 opacity-0 group-hover:opacity-100 transition">
          <button
            onClick={() => scroll(-1)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-black/60 hover:bg-red-600 transition"
          >
            <FiChevronLeft />
          </button>

          <button
            onClick={() => scroll(1)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-black/60 hover:bg-red-600 transition"
          >
            <FiChevronRight />
          </button>
        </div>
      </div>

      {/* Movies */}
      <div
        ref={sliderRef}
        className="flex gap-5 overflow-x-auto px-6 md:px-10 scroll-smooth no-scrollbar"
      >
        {movies.map((movie, index) => (
          <motion.div
            key={movie.id}
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: index * 0.05,
            }}
          >
            <MovieCard
              movie={movie}
              onPlay={onPlay}
              onRecommend={onRecommend}
            />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}