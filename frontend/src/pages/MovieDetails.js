import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function MovieDetailsPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(
    localStorage.getItem(`fav-${id}`) === "true"
  );

  useEffect(() => {
    fetch(`http://localhost:8080/api/movies/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setMovie(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching movie details:", err);
        setLoading(false);
      });
  }, [id]);

  const toggleFavorite = () => {
    const newState = !isFavorite;
    setIsFavorite(newState);
    localStorage.setItem(`fav-${id}`, newState);
  };

  if (loading) return <p>Loading movie details...</p>;
  if (!movie) return <p>Movie not found.</p>;

  return (
    <div className="movie-detail">
      <h2>{movie.title}</h2>
      <div className="movie-detail-top">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <button className="fav-btn" onClick={toggleFavorite}>
          {isFavorite ? "⭐" : "☆"}
        </button>
      </div>
      <p><strong>Release Date:</strong> {movie.release_date}</p>
      <p><strong>Rating:</strong> {movie.vote_average}</p>
      <p><strong>Overview:</strong> {movie.overview}</p>
      <p><strong>Runtime:</strong> {movie.runtime} minutes</p>
      <p><strong>Genres:</strong> {movie.genres?.map(g => g.name).join(", ")}</p>
    </div>
  );
}

export default MovieDetailsPage;
