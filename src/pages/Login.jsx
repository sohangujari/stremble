import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import strembleLogo from "../assets/stremble-logo.png";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const isLoginSuccessful = onLogin(username, password);
    if (isLoginSuccessful) {
      navigate("/home");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-10 sm:gap-20 px-4 sm:px-8">
      <img
        src={strembleLogo}
        alt="Stremble Logo"
        width="120px"
        draggable={false}
        className="mb-8"
      />

      <form
        className="flex flex-col gap-5 w-full sm:w-[400px] lg:w-[600px]"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Username"
          className="px-4 py-6 rounded bg-[#1C1C1C] text-[#bbbbbb] placeholder-[#525252] focus:outline-none focus:ring-1 focus:ring-[#5A2E98] w-full"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="px-4 py-6 rounded bg-[#1C1C1C] text-[#bbbbbb] placeholder-[#525252] focus:outline-none focus:ring-1 focus:ring-[#5A2E98] w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="px-4 py-6 rounded bg-gradient-to-r from-[#8645E0] to-[#5A2E98] text-white w-full"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
