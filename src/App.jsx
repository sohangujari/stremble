import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import Login from "./pages/Login";
import Error from "./pages/Error";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import TvShows from "./pages/TvShows";
import MoviesDetails from "./pages/MoviesDetails";
import TvShowsDetails from "./pages/TvShowsDetails";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    const isAuthenticatedFromStorage = localStorage.getItem("isAuthenticated");
    if (isAuthenticatedFromStorage === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (username, password) => {
    const correctUsername = "username";
    const correctPassword = "password";

    if (username === correctUsername && password === correctPassword) {
      setIsAuthenticated(true);
      localStorage.setItem("isAuthenticated", "true");
      toast.success("Successfully logged in!");
      return true;
    } else {
      toast.error("Incorrect username or password. Please try again.");
      return false;
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
    toast.success("Successfully logged out!");
  };

  const ProtectedRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/" />;
  };

  return (
    <Router>
      <Routes>
        {/* If already authenticated, redirect to home */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/home" />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />

        <Route path="/page-not-found" element={<Error />} />

        {/* Protected Routes */}
        <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
        <Route
          path="/movie"
          element={<ProtectedRoute element={<Movies />} />}
        />
        <Route
          path="/tv-show"
          element={<ProtectedRoute element={<TvShows />} />}
        />
        <Route
          path="/movie/:slug"
          element={<ProtectedRoute element={<MoviesDetails />} />}
        />
        <Route
          path="/tv/:slug"
          element={<ProtectedRoute element={<TvShowsDetails />} />}
        />

        {/* Catch-all route for 404 */}
        <Route path="*" element={<Error />} />
      </Routes>

      <Toaster />
    </Router>
  );
}

export default App;
