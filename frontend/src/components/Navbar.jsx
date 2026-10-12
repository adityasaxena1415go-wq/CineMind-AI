import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FiMenu,
  FiX,
  FiUser,
  FiLogOut,
} from "react-icons/fi";
import { HiOutlineSparkles } from "react-icons/hi2";
import SearchBar from "./SearchBar";
import Button from "./ui/Button";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "My List", to: "/watchlist" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("cinemind_token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/70 backdrop-blur-xl py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2">
          <HiOutlineSparkles className="text-red-500 text-2xl" />

          <span className="text-2xl font-bold">
            CineMind
            <span className="text-red-500 ml-1">AI</span>
          </span>
        </NavLink>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex gap-6">
          {NAV_LINKS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                isActive
                  ? "text-red-500 font-semibold"
                  : "text-gray-300 hover:text-white transition"
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Right */}
        <div className="hidden md:flex items-center gap-4">

          <SearchBar />

          {user ? (
            <>
        <div
  onClick={() => navigate("/profile")}
  className="flex items-center gap-2 bg-zinc-900 px-4 py-2 rounded-full cursor-pointer hover:bg-zinc-800"
>
                <FiUser className="text-red-500" />

                <span className="text-white text-sm">
                  {user.name}
                </span>
              </div>

              <Button
                variant="primary"
                onClick={handleLogout}
              >
                <FiLogOut />
                Logout
              </Button>
            </>
          ) : (
            <Button
              variant="primary"
              onClick={() => navigate("/login")}
            >
              Sign In
            </Button>
          )}
        </div>

        {/* Mobile */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-[#111] md:hidden overflow-hidden"
          >
            <div className="flex flex-col p-5 gap-4">

              {NAV_LINKS.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  className="text-gray-300 hover:text-white"
                >
                  {item.label}
                </NavLink>
              ))}

              <SearchBar />

              {user ? (
                <>
                  <div className="flex items-center gap-2 text-white">
                    <FiUser />
                    {user.name}
                  </div>

                  <Button
                    variant="primary"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <Button
                  variant="primary"
                  onClick={() => navigate("/login")}
                >
                  Sign In
                </Button>
              )}

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.header>
  );
}