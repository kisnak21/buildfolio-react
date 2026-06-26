import { useState } from "react";
import { Link } from "react-router-dom";

const navLinks = [
  { label: "Projects", href: "#projects" },
  { label: "Categories", href: "#categories" },
  { label: "Technologies", href: "#technologies" },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="border-b border-gray-200 sticky top-0 z-50 bg-white/80 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* logo buildfolio */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-7 h-7 bg-[#2563eb] rounded-md flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="1" y="1" width="5" height="5" rx="1" fill="white" />
              <rect x="8" y="1" width="5" height="5" rx="1" fill="white" opacity="0.6" />
              <rect x="1" y="8" width="5" height="5" rx="1" fill="white" opacity="0.6" />
              <rect x="8" y="8" width="5" height="5" rx="1" fill="white" opacity="0.3" />
            </svg>
          </div>
          <span className="text-sm font-medium text-gray-900">Buildfolio</span>
        </Link>

        {/* navbar desktop */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* auth buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link to="/login" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
            Log in
          </Link>
          <Link
            to="/register"
            className="text-sm bg-[#2563eb] hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg transition-colors"
          >
            Sign up
          </Link>
          <img
            src="https://api.dicebear.com/9.x/pixel-art/svg?seed=buildfolio"
            alt="Profile"
            className="w-8 h-8 rounded-full border border-gray-200"
          />
        </div>

        {/* hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-1"
          aria-label="Toggle menu"
        >
          <span
            className="w-5 h-px bg-gray-600 block transition-all duration-300"
            style={
              menuOpen
                ? { transform: "translateY(6px) rotate(45deg)" }
                : undefined
            }
          />
          <span
            className="w-5 h-px bg-gray-600 block transition-all duration-300"
            style={menuOpen ? { opacity: 0 } : undefined}
          />
          <span
            className="w-5 h-px bg-gray-600 block transition-all duration-300"
            style={
              menuOpen
                ? { transform: "translateY(-6px) rotate(-45deg)" }
                : undefined
            }
          />
        </button>
      </div>

      {/* dropdown mobile nav */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <nav className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="flex flex-col gap-2 pt-2 border-t border-gray-200">
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
              >
                Log in
              </Link>
              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="text-sm bg-[#2563eb] hover:bg-blue-700 text-white px-3 py-2 rounded-lg transition-colors text-center"
              >
                Sign up
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;