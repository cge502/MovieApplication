import React, { useState } from "react";
import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  const [isFavorite, setIsFavorite] = useState(
    localStorage.getItem(`fav-${movie.id}`) === "true"
  );

  const toggleFavorite = (f) => {
    f.stopPropagation();
    f.preventDefault();
    const newState = !isFavorite;
    setIsFavorite(newState);
    localStorage.setItem(`fav-${movie.id}`, newState);
  };

  return (
    <Link to={`/movie/${movie.id}`} className="movie-card">
      <img
        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
        alt={movie.title}
      />
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <button className="fav-btn" onClick={toggleFavorite}>
          {isFavorite ? "⭐" : "☆"}
        </button>
      </div>
    </Link>
  );
}

export default MovieCard;
