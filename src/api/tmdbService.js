const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchSearchResults = async (searchQuery) => {
  try {
    const response = await fetch(`${BASE_URL}/search/multi?api_key=${API_KEY}&query=${searchQuery}&language=en-US&page=1&include_adult=false`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch search results');
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const fetchTrendingContent = async () => {
  try {
    const response = await fetch(`${BASE_URL}/trending/all/week?api_key=${API_KEY}`);
    if (!response.ok) throw new Error('Failed to fetch trending content');
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const fetchLatestMovies = async () => {
  try {
    const response = await fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`);
    if (!response.ok) throw new Error('Failed to fetch latest movies');
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const fetchLatestTVShows = async () => {
  try {
    const response = await fetch(`${BASE_URL}/trending/tv/week?api_key=${API_KEY}`);
    if (!response.ok) throw new Error('Failed to fetch latest TV shows');
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const fetchMovieDetails = async (tmdbId) => {
  try {
    const response = await fetch(`${BASE_URL}/movie/${tmdbId}?api_key=${API_KEY}`);
    if (!response.ok) throw new Error('Failed to fetch movie details');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const fetchTvShowDetails = async (tmdbId) => {
  try {
    const response = await fetch(`${BASE_URL}/tv/${tmdbId}?api_key=${API_KEY}`);
    if (!response.ok) throw new Error('Failed to fetch tv show details');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const fetchSeasonDetails = async (tmdbId, seasonNumber) => {
  try {
    const response = await fetch(`${BASE_URL}/tv/${tmdbId}/season/${seasonNumber}?api_key=${API_KEY}`);
    if (!response.ok) throw new Error('Failed to fetch season details');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const fetchMovieTrailerUrl = async (tmdbId) => {
  try {
    const response = await fetch(`${BASE_URL}/movie/${tmdbId}/videos?api_key=${API_KEY}`);
    if (!response.ok) throw new Error('Failed to fetch movie trailers');
    const data = await response.json();
    
    // Get the first YouTube trailer if available
    const trailer = data.results.find(video => video.site === 'YouTube' && video.type === 'Trailer');
    if (trailer) {
      // Format the YouTube URL to use the embed URL format
      return `https://www.youtube.com/embed/${trailer.key}`;
    } else {
      return null; // No trailer found
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const fetchTVShowTrailerUrl = async (tmdbId) => {
  try {
    const response = await fetch(`${BASE_URL}/tv/${tmdbId}/videos?api_key=${API_KEY}`);
    if (!response.ok) throw new Error('Failed to fetch TV show trailers');
    const data = await response.json();

    // Get the first YouTube trailer if available
    const trailer = data.results.find(video => video.site === 'YouTube' && video.type === 'Trailer');
    if (trailer) {
      return `https://www.youtube.com/embed/${trailer.key}`;
    } else {
      return null; // No trailer found
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};
