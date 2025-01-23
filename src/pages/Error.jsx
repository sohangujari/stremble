import React from "react";
import { Link } from "react-router-dom";

import ErrorSvg from "../assets/404.svg";

function Error() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 gap-16">
      {/* Error Image */}
      <img src={ErrorSvg} alt="Error 404" className="w-3/4 sm:w-1/2 md:w-1/3" />

      {/* Error Message and Button */}
      <div className="flex flex-col items-center gap-5 text-center">
        <span className="font-normal text-white text-lg sm:text-xl">
          Oops! The page you're looking for doesn't exist.
        </span>

        <Link to="/home">
          <button className="px-8 py-3 rounded bg-gradient-to-r from-[#8645E0] to-[#5A2E98] text-white text-lg hover:bg-gradient-to-l">
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Error;
