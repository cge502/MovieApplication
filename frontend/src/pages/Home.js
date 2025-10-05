import React, { useEffect, useState } from "react";
import MovieList from "../components/MovieList";
import { Link } from "react-router-dom";

function HomePage() {
  const [movies, setMovies] = useState([]);
  const [featured, setFeatured] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/movies/trending/day")
      .then((res) => res.json())
      .then((data) => {
        const movieResults = data.results || [];
        setMovies(movieResults);
        if (movieResults.length > 0) {
          setFeatured(movieResults[0]); // first trending movie as hero
        }
      })
      .catch((err) => console.error("Error fetching movies:", err));
  }, []);

  return (
    <div>
      {featured && (
        <Link to={`/movie/${featured.id}`} className="hero">
          <img
            src={`https://image.tmdb.org/t/p/original${featured.backdrop_path}`}
            alt={featured.title}
          />
          <div className="hero-text">
            <h1>{featured.title}</h1>
            <p>{featured.overview}</p>
          </div>
        </Link>
      )}

      
      <h2>Trending Movies</h2>
      <MovieList movies={movies} />
    </div>
  );
}

export default HomePage;
