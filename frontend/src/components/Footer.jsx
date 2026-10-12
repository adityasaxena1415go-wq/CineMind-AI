import { HiOutlineSparkles } from "react-icons/hi2";
import { FiGithub, FiTwitter, FiInstagram } from "react-icons/fi";
import { NavLink } from "react-router-dom";

const COLUMNS = [
  {
    heading: "Explore",
    links: [
      { label: "Trending", to: "/trending" },
      { label: "Top Rated", to: "/top-rated" },
      { label: "Genres", to: "/genres" },
      { label: "AI Recommendations", to: "/recommendations" },
    ],
  },
  {
    heading: "Account",
    links: [
      { label: "My List", to: "/watchlist" },
      { label: "Continue Watching", to: "/continue-watching" },
      { label: "Profile", to: "/profile" },
      { label: "Settings", to: "/settings" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", to: "/about" },
      { label: "Privacy Policy", to: "/privacy" },
      { label: "Terms of Service", to: "/terms" },
      { label: "Contact", to: "/contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-border bg-bg-secondary mt-16">
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-14 grid grid-cols-2 md:grid-cols-5 gap-10">
        <div className="col-span-2 md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <HiOutlineSparkles className="text-2xl text-accent" />
            <span className="font-heading font-extrabold text-lg">
              CineMind <span className="text-gradient-accent">AI</span>
            </span>
          </div>
          <p className="text-sm text-text-muted max-w-xs leading-relaxed">
            Movie discovery, tuned to you. Powered by AI that actually
            understands taste — not just genres.
          </p>
          <div className="flex items-center gap-3 mt-6">
            {[FiGithub, FiTwitter, FiInstagram].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="social link"
                className="w-9 h-9 rounded-full glass flex items-center justify-center text-white/70 hover:text-white hover:bg-white/15 transition-colors"
              >
                <Icon className="text-sm" />
              </a>
            ))}
          </div>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.heading}>
            <h4 className="font-heading font-semibold text-sm mb-4 text-white">
              {col.heading}
            </h4>
            <ul className="flex flex-col gap-2.5">
              {col.links.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    className="text-sm text-text-muted hover:text-white transition-colors"
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-border py-6">
        <p className="text-center text-xs text-text-muted">
          &copy; {new Date().getFullYear()} CineMind AI. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
