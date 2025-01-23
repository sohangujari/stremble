import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Star } from "react-feather";
import { fetchMovieDetails, fetchMovieTrailerUrl } from "../api/tmdbService";
import LatestMovies from "../components/LatestMovies";

const MoviesDetails = () => {
  const { slug } = useParams();
  const tmdbId = slug.split("-").pop();
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [trailerUrl, setTrailerUrl] = useState(null);

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const data = await fetchMovieDetails(tmdbId);

        setMovieDetails(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const getMovieTrailer = async () => {
      try {
        const trailer = await fetchMovieTrailerUrl(tmdbId);
        setTrailerUrl(trailer);
      } catch (err) {
        console.error("Error fetching trailer: ", err);
      }
    };

    getMovieDetails();
    getMovieTrailer();
  }, [tmdbId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <Navbar />
      {trailerUrl && (
        <iframe
          src={trailerUrl}
          className="relative bg-cover bg-center rounded-lg overflow-hidden w-full h-[600px] max-w-full px-5 py-3 transition-opacity duration-1000 ease-in-out"
          referrerPolicy="origin"
          allowFullScreen
        ></iframe>
      )}
      <div>
        {movieDetails && (
          <div className="flex flex-col sm:flex-row mx-5 my-3 p-5 bg-[#1B1B1B] rounded-lg gap-8">
            {/* Movie Poster */}
            <img
              src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
              alt={movieDetails.title || movieDetails.name}
              className="w-60 sm:w-60 rounded mx-auto sm:mx-0"
            />

            {/* Movie Details */}
            <div className="flex flex-col sm:flex-grow">
              <h2 className="text-3xl sm:text-4xl text-white font-bold mb-4">
                {movieDetails.title || movieDetails.name}
              </h2>

              <div className="flex items-center gap-2.5 mb-4">
                <span className="text-white text-sm font-bold bg-[#868484] px-2 py-0.5 rounded">
                  HD
                </span>
                <span className="flex items-center text-white">
                  <Star
                    size={16}
                    color="#F5C518"
                    className="mr-1"
                    style={{ fill: "#F5C518" }}
                  />
                  {movieDetails.vote_average}
                </span>
              </div>

              <p className="font-light text-[#CCCCCC] mb-5 sm:w-full sm:text-base">
                {movieDetails.overview}
              </p>

              <div className="flex flex-row sm:flex-row">
                <div className="flex flex-col mb-4 sm:mr-8">
                  <span className="text-[#CCCCCC]">Released:</span>
                  <span className="text-[#CCCCCC]">Duration:</span>
                  <span className="text-[#CCCCCC]">Genre:</span>
                  <span className="text-[#CCCCCC]">Country:</span>
                </div>

                <div className="flex flex-col">
                  <span className="text-white">
                    {movieDetails.release_date}
                  </span>
                  <span className="text-white">{movieDetails.runtime} min</span>
                  <span className="text-white">
                    {movieDetails.genres.map((genre) => genre.name).join(", ")}
                  </span>
                  <span className="text-white">
                    {movieDetails.production_countries
                      .map((country) => country.name)
                      .join(", ")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <LatestMovies />
      <Footer />
    </div>
  );
};

export default MoviesDetails;
