import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Search, Menu, X } from "react-feather";
import { fetchSearchResults } from "../api/tmdbService";

import StrembleSvg from "../assets/stremble.png";
import StrembleAvatarSvg from "../assets/stremble-avatar.png";

function Navbar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleInputChange = async (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);

    if (!newQuery) {
      setResults([]);
      return;
    }

    setLoading(true);

    try {
      const searchResults = await fetchSearchResults(newQuery);
      const filteredResults = searchResults.filter(
        (item) => item.media_type === "movie" || item.media_type === "tv"
      );

      setResults(filteredResults);
    } catch (error) {
      console.error("Failed to fetch search results:", error);
      setResults([]);
    }

    setLoading(false);
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div className="sticky top-0 z-50 flex flex-col sm:flex-row items-center justify-between px-4 py-4 bg-black bg-opacity-20 backdrop-blur-[16px] sm:px-11 gap-2 sm:gap-0">
      {/* Logo and Navigation links */}
      <div className="flex items-center justify-start w-full sm:w-auto">
        <Link to="/home">
          <img src={StrembleSvg} alt="Stremble" width="100px" />
        </Link>

        {/* Mobile Hamburger Menu */}
        <div className="sm:hidden ml-auto">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? (
              <X size={24} color="#fff" />
            ) : (
              <Menu size={24} color="#fff" />
            )}
          </button>
        </div>
      </div>

      {/* Desktop Menu */}
      <div className="hidden sm:flex gap-10 text-white">
        <NavLink
          to="/home"
          className={({ isActive }) =>
            isActive ? "underline underline-offset-8 decoration-[#5A2E98]" : ""
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/movie"
          className={({ isActive }) =>
            isActive ? "underline underline-offset-8 decoration-[#5A2E98]" : ""
          }
        >
          Movies
        </NavLink>
        <NavLink
          to="/tv-show"
          className={({ isActive }) =>
            isActive ? "underline underline-offset-8 decoration-[#5A2E98]" : ""
          }
        >
          TV Shows
        </NavLink>
      </div>

      {/* Search Bar and Avatar */}
      <div className="flex items-center gap-4 sm:gap-12">
        {/* Search Bar */}
        <div className="relative flex items-center">
          <div
            className={`flex items-center rounded px-4 py-2 w-[350px] sm:w-[400px] bg-[#1C1C1C] ${
              isSearchOpen ? "w-full sm:w-[400px]" : "w-[350px]"
            }`}
          >
            <Search size={24} color="#5A2E98" className="mr-2" />
            <input
              type="text"
              value={query}
              onChange={handleInputChange}
              placeholder="Search for Movies, Shows and more"
              className="outline-none w-full bg-transparent text-[#bbbbbb] placeholder-[#757575] drop-shadow-md"
              onFocus={() => setIsSearchOpen(true)}
              onBlur={() => setIsSearchOpen(false)}
            />
          </div>

          {query && (
            <div className="absolute top-full right-0 mt-2 w-[350px] sm:w-[400px] max-h-[300px] overflow-y-auto bg-[#1C1C1C] rounded shadow-lg z-10">
              {results.length > 0 ? (
                <ul className="space-y-4 p-4">
                  {results.map((item) => (
                    <li key={item.id} className="text-white">
                      <Link
                        to={`/${item.media_type}/${(item.title || item.name)
                          .toLowerCase()
                          .replace(/[^a-z0-9]+/g, "-")
                          .replace(/(^-|-$)/g, "")}-${item.id}`}
                        className="flex items-center space-x-3"
                        onClick={closeMenu} // Close menu on selection
                      >
                        <img
                          src={`https://image.tmdb.org/t/p/w200${item.poster_path}`}
                          alt={item.title || item.name}
                          className="w-12 h-16 rounded"
                        />
                        <span>{item.title || item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-white p-4">No results found</p>
              )}
            </div>
          )}
        </div>

        {/* Avatar */}
        <Link to="/">
          <img
            src={StrembleAvatarSvg}
            alt="Avatar"
            width="34px"
            className="rounded hidden md:block"
          />
        </Link>
      </div>

      {/* Mobile Menu (Conditional rendering based on state) */}
      {isMenuOpen && (
        <div className="sm:hidden absolute top-full left-0 w-full bg-black bg-opacity-70">
          <div className="flex flex-col items-center py-4">
            <NavLink to="/home" className="text-white py-2" onClick={closeMenu}>
              Home
            </NavLink>
            <NavLink
              to="/movie"
              className="text-white py-2"
              onClick={closeMenu}
            >
              Movies
            </NavLink>
            <NavLink
              to="/tv-show"
              className="text-white py-2"
              onClick={closeMenu}
            >
              TV Shows
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
