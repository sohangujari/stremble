import React, { useEffect, useState, useRef } from "react";
import { fetchLatestTVShows } from "../api/tmdbService";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "react-feather";

function LatestTVShows() {
  const [latestTVShows, setLatestTVShows] = useState([]);
  const scrollRef = useRef(null);
  const handleLinkClick = (e) => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    async function getLatestTVShows() {
      try {
        const data = await fetchLatestTVShows();
        setLatestTVShows(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching latest movies content:", error);
        setLatestTVShows([]);
      }
    }

    getLatestTVShows();
  }, []);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <div className="relative px-4 sm:px-5 my-5">
      <h2 className="text-white text-lg sm:text-2xl font-medium mb-4">
        Latest TV Shows
      </h2>

      <div className="relative">
        {/* Left arrow */}
        <button
          onClick={scrollLeft}
          className="absolute inset-y-0 left-0 bg-black bg-opacity-50 text-white p-2 z-10 hidden sm:block"
        >
          <ChevronLeft size={24} color="#ffffff" className="mr-2" />
        </button>

        {/* Latest TV Shows items container */}
        <div
          ref={scrollRef}
          className="flex space-x-4 overflow-x-scroll hide-scrollbar"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {latestTVShows && latestTVShows.length > 0 ? (
            latestTVShows.map((item) => (
              <Link
                key={item.id}
                to={`/${item.media_type}/${(item.title || item.name)
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, "-")
                  .replace(/(^-|-$)/g, "")}-${item.id}`}
                className="flex-shrink-0 w-36 sm:w-44"
                onClick={handleLinkClick}
              >
                <div className="flex flex-col rounded-lg shadow-md overflow-hidden">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                    alt={item.title || item.name}
                    className="w-full h-auto object-cover rounded"
                  />
                  <div className="p-2">
                    <p
                      className="text-white text-center truncate"
                      style={{ maxWidth: "100%" }}
                    >
                      {item.title || item.name}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-white">No latest tv shows found.</p>
          )}
        </div>

        {/* Right arrow */}
        <button
          onClick={scrollRight}
          className="absolute inset-y-0 right-0 bg-black bg-opacity-50 text-white p-2 z-10 hidden sm:block"
        >
          <ChevronRight size={24} color="#ffffff" className="mr-2" />
        </button>
      </div>
    </div>
  );
}

export default LatestTVShows;
