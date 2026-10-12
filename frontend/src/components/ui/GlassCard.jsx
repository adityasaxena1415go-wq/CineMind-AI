import { motion } from "framer-motion";

/**
 * GlassCard — generic glassmorphic surface used for panels,
 * modals, and info blocks across the app.
 */
export default function GlassCard({ children, className = "", hover = true, ...props }) {
  return (
    <motion.div
      whileHover={hover ? { y: -4 } : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className={`glass rounded-3xl shadow-card p-6 ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
