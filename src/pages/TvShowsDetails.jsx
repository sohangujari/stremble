import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Star } from "react-feather";
import { List } from "react-feather";
import { fetchTvShowDetails, fetchSeasonDetails, fetchTVShowTrailerUrl } from "../api/tmdbService";

const TvShowsDetails = () => {
  const { slug } = useParams();
  const tmdbId = slug.split("-").pop();
  const [tvShowDetails, setTvShowDetails] = useState(null);
  const [seasonDetails, setSeasonDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [trailerUrl, setTrailerUrl] = useState(null);

  useEffect(() => {
    const getTvShowDetails = async () => {
      try {
        const data = await fetchTvShowDetails(tmdbId);
        setTvShowDetails(data);
        if (data?.seasons?.[0]) {
          const seasonData = await fetchSeasonDetails(
            tmdbId,
            data.seasons[0].season_number
          );
          setSeasonDetails(seasonData);
          setSelectedSeason(data.seasons[0].season_number);

          setSelectedEpisode(seasonData.episodes[0]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const getTVShowTrailer = async () => {
      try {
        const trailer = await fetchTVShowTrailerUrl(tmdbId);
        setTrailerUrl(trailer);
      } catch (err) {
        console.error("Error fetching trailer: ", err);
      }
    };

    getTvShowDetails();
    getTVShowTrailer();
  }, [tmdbId]);

  const handleSeasonChange = async (event) => {
    const seasonNumber = parseInt(event.target.value);
    setSelectedSeason(seasonNumber);
    setSelectedEpisode(null);
    const seasonData = await fetchSeasonDetails(tmdbId, seasonNumber);
    setSeasonDetails(seasonData);
    setSelectedEpisode(seasonData.episodes[0]);
  };

  const handleEpisodeClick = (episode) => {
    setSelectedEpisode(episode.episode_number);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!tvShowDetails || !seasonDetails) return <div>No Data Available</div>;

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
      <div className="mx-5 my-3 p-5 rounded-lg bg-[#5A2E98] bg-opacity-20">
        <div className="mb-4 flex items-center">
          <List
            size={22}
            color="#FFFFFF"
            className="mr-2"
            style={{ fill: "#FFFFF" }}
          />
          <select
            id="season-select"
            value={selectedSeason || ""}
            onChange={handleSeasonChange}
            className="bg-transparent border-none text-white rounded-md p-0.5 focus:outline-none"
          >
            {tvShowDetails.seasons.map((season) => (
              <option key={season.season_number} value={season.season_number}>
                Season {season.season_number}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {seasonDetails.episodes
            .filter(
              (episode) =>
                episode.season_number === selectedSeason &&
                !/^Episode \d+$/.test(episode.name)
            )
            .map((episode) => (
              <div
                key={episode.id}
                className={`p-2 border rounded cursor-pointer
                  ${
                    selectedEpisode && selectedEpisode.id === episode.id
                      ? "bg-[#5A2E98] border-[#5A2E98] text-white"
                      : "border-gray-300 hover:bg-[#5A2E98] hover:border-[#5A2E98]"
                  }
                `}
                style={{ maxWidth: "100%" }}
                onClick={() => handleEpisodeClick(episode)}
              >
                <h4 className="text-white font-semibold text-sm flex items-center truncate">
                  &bull; {`Eps ${episode.episode_number}: `}
                  <span className="truncate">{episode.name}</span>
                </h4>
              </div>
            ))}
        </div>
      </div>

      <div>
        {tvShowDetails && (
          <div className="flex flex-col sm:flex-row mx-5 my-3 p-5 bg-[#1B1B1B] rounded-lg gap-8">
            {/* TV Show Poster */}
            <img
              src={`https://image.tmdb.org/t/p/w500${tvShowDetails.poster_path}`}
              alt={tvShowDetails.title || tvShowDetails.name}
              className="w-60 sm:w-60 rounded mx-auto sm:mx-0"
            />

            {/* TV Show Details */}
            <div className="flex flex-col sm:flex-grow">
              <h2 className="text-3xl sm:text-4xl text-white font-bold mb-4">
                {tvShowDetails.title || tvShowDetails.name}
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
                  {tvShowDetails.vote_average}
                </span>
              </div>

              <p className="font-light text-[#CCCCCC] mb-5 sm:w-full sm:text-base">
                {tvShowDetails.overview}
              </p>

              <div className="flex flex-row sm:flex-row gap-5">
                <div className="flex flex-col mb-4 sm:mr-8">
                  <span className="text-[#CCCCCC]">Released:</span>
                  <span className="text-[#CCCCCC]">Genre:</span>
                  <span className="text-[#CCCCCC]">Country:</span>
                </div>

                <div className="flex flex-col">
                  <span className="text-white">
                    {tvShowDetails.first_air_date}
                  </span>
                  <span className="text-white">
                    {tvShowDetails.genres.map((genre) => genre.name).join(", ")}
                  </span>
                  <span className="text-white">
                    {tvShowDetails.production_countries
                      .map((country) => country.name)
                      .join(", ")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default TvShowsDetails;
