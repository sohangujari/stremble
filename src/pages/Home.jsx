import React from "react";

import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import Trending from "../components/Trending";
import LatestMovies from "../components/LatestMovies";
import LatestTvShows from "../components/LatestTvShows";
import Footer from "../components/Footer";

function home() {
  return (
    <div>
      <Navbar />
      <Banner />
      <Trending />
      <LatestMovies />
      <LatestTvShows />
      <Footer />
    </div>
  );
}

export default home;
