import { motion } from "framer-motion";

/**
 * Button — reusable across the app.
 * variants: "primary" (solid gradient), "glass" (glassmorphic), "ghost" (text only)
 */
const VARIANTS = {
  primary:
    "bg-gradient-to-r from-accent to-accent-secondary text-white shadow-glow",
  glass: "glass text-white hover:bg-white/[0.12]",
  ghost: "bg-transparent text-white/80 hover:text-white",
};

export default function Button({
  children,
  variant = "primary",
  icon: Icon,
  iconPosition = "left",
  className = "",
  ...props
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.035 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3
        font-heading font-semibold text-sm tracking-wide
        border border-border transition-colors duration-300
        focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent
        ${VARIANTS[variant]} ${className}`}
      {...props}
    >
      {Icon && iconPosition === "left" && <Icon className="text-lg" />}
      {children}
      {Icon && iconPosition === "right" && <Icon className="text-lg" />}
    </motion.button>
  );
}
