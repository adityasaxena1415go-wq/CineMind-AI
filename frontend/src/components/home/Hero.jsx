import { motion } from "framer-motion";
import { FiPlay, FiInfo } from "react-icons/fi";
import { HiOutlineSparkles } from "react-icons/hi2";
import Button from "../ui/Button";

const IMAGE_BASE = "https://image.tmdb.org/t/p/original";

const textReveal = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};
export default function Hero({
  movie,
  aiReason,
  onRefresh,
  onPlay = () => {},
  onDetails = () => {},
}) {
  if (!movie) return null;

  const backdrop = movie.backdrop_path
    ? `${IMAGE_BASE}${movie.backdrop_path}`
    : "https://placehold.co/1600x900/080808/FFFFFF?text=CineMind+AI";

  return (
    <section className="relative h-[92vh] min-h-[560px] w-full overflow-hidden">

      {/* Background Image */}
      <motion.img
        src={backdrop}
        alt={movie.title}
        initial={{ scale: 1.15, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.4 }}
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-black/50 to-transparent" />

      <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/95 via-[#080808]/40 to-transparent" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-20 md:px-10 md:pb-28">

        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={textReveal}
          className="mb-4 flex items-center gap-2 text-sm font-semibold text-red-500"
        >
          <HiOutlineSparkles />
          AI PICK OF THE WEEK
        </motion.div>
<motion.p
  custom={1}
  initial="hidden"
  animate="visible"
  variants={textReveal}
  className="text-red-300 text-sm mb-5"
>
  🤖 {aiReason}
</motion.p>
        <motion.h1
          custom={1}
          initial="hidden"
          animate="visible"
          variants={textReveal}
          className="max-w-3xl text-5xl font-extrabold leading-tight text-white md:text-7xl"
        >
          {movie.title}
        </motion.h1>

        <motion.p
          custom={2}
          initial="hidden"
          animate="visible"
          variants={textReveal}
          className="mt-5 max-w-2xl text-lg italic text-gray-300"
        >
          {movie.tagline || "Discover your next favorite movie with CineMind AI."}
        </motion.p>

        <motion.p
          custom={3}
          initial="hidden"
          animate="visible"
          variants={textReveal}
          className="mt-4 max-w-2xl text-base leading-7 text-gray-400"
        >
          {movie.overview}
        </motion.p>

        <motion.div
          custom={4}
          initial="hidden"
          animate="visible"
          variants={textReveal}
          className="mt-8 flex flex-wrap gap-4"
        >
          <Button
            variant="primary"
            icon={FiPlay}
            onClick={() => onPlay(movie)}
          >
            Watch Now
          </Button>

          <Button
            variant="glass"
            icon={FiInfo}
            onClick={() => onDetails(movie)}
          >
            More Info
          </Button> 
          <Button
  variant="glass"
  onClick={onRefresh}
>
  🔄 New AI Pick
</Button>
        </motion.div>
      </div>
    </section>
  );
}