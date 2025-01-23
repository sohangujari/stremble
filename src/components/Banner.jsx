import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchTrendingContent } from "../api/tmdbService";
import { Play } from "react-feather";

function Banner() {
  const [contentList, setContentList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const loadContent = async () => {
      const trendingContent = await fetchTrendingContent();
      setContentList(trendingContent.slice(0, 5));
    };

    loadContent();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % contentList.length);
    }, 10000); // Change every 10 seconds

    return () => clearInterval(interval);
  }, [contentList]);

  if (contentList.length === 0) return null;

  const currentItem = contentList[currentIndex];

  const slug = (currentItem.title || currentItem.name)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  return (
    <div
      className="relative bg-cover bg-center rounded-lg overflow-hidden h-[400px] md:h-[550px] mx-5 my-3 transition-opacity duration-1000 ease-in-out"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${currentItem.backdrop_path})`,
        opacity: 1,
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-start px-5 sm:px-10 md:px-24 rounded-lg text-white">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-5 sm:mb-7">
          {currentItem.title || currentItem.name}
        </h1>
        <span className="mb-2 text-lg sm:text-xl font-bold">Overview</span>
        <p className="mb-5 sm:mb-7 w-full sm:w-4/6 font-light text-sm sm:text-base">
          {currentItem.overview}
        </p>
        <Link to={`/${currentItem.media_type}/${slug}-${currentItem.id}`}>
          <button className="px-4 py-2 bg-gradient-to-r from-[#8645E0] to-[#5A2E98] rounded text-xs sm:text-sm md:text-base font-semibold flex items-center">
            <Play size={24} color="#ffffff" className="mr-2" />
            Watch Now
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Banner;
