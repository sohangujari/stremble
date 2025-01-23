import React, { useEffect, useState } from "react";
import { fetchLatestTVShows } from "../api/tmdbService";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const TvShows = () => {
  const [tvShows, setTvShows] = useState([]);
  const handleLinkClick = (e) => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    async function getTvShows() {
      try {
        const data = await fetchLatestTVShows();
        setTvShows(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching tv shows content:", error);
        setTvShows([]);
      }
    }

    getTvShows();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="px-4 sm:px-5 my-5">
        <h2 className="text-white text-2xl font-medium mb-4">Movies</h2>
        <div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4 sm:gap-4 md:gap-6">
            {tvShows && tvShows.length > 0 ? (
              tvShows.map((item) => (
                <Link
                  key={item.id}
                  to={`/${item.media_type}/${(item.title || item.name)
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/(^-|-$)/g, "")}-${item.id}`}
                  className="flex items-center space-x-3"
                  onClick={handleLinkClick}
                >
                  <div className="flex-shrink-0 w-44 h-fit rounded-lg shadow-md flex flex-col">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                      alt={item.title || item.name}
                      className="w-full h-full object-cover rounded"
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
              <p className="text-white">No tv shows found.</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TvShows;
