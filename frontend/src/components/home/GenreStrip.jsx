import { motion } from "framer-motion";

const GENRES = [
  "Action", "Sci-Fi", "Drama", "Thriller", "Romance",
  "Comedy", "Horror", "Mystery", "Animation", "Documentary",
];

/**
 * GenreStrip — horizontal set of genre filter pills.
 * INTEGRATION POINT: wire onSelect to your existing genre/filter route.
 */
export default function GenreStrip({ active, onSelect = () => {} }) {
  return (
    <div className="px-5 md:px-8 py-4 flex gap-3 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {GENRES.map((genre) => {
        const isActive = active === genre;
        return (
          <motion.button
            key={genre}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelect(genre)}
            className={`shrink-0 rounded-full px-5 py-2 text-sm font-medium border transition-colors duration-300 ${
              isActive
                ? "bg-gradient-to-r from-accent to-accent-secondary text-white border-transparent"
                : "glass text-text-muted hover:text-white border-border"
            }`}
          >
            {genre}
          </motion.button>
        );
      })}
    </div>
  );
}
