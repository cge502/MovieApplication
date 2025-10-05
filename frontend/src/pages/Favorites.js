import React, { useEffect, useState } from "react";
import MovieList from "../components/MovieList";

function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      const favIds = Object.entries(localStorage)
        .filter(([key, value]) => key.startsWith("fav-") && value === "true")
        .map(([key]) => key.replace("fav-", ""));

      if (favIds.length === 0) {
        setFavorites([]);
        setLoading(false);
        return;
      }

      try {
        const idsParam = favIds.join(",");
        const res = await fetch(`http://localhost:8080/api/movies/favorites?ids=${idsParam}`);
        const movies = await res.json();
        setFavorites(movies.map(JSON.parse)); // each item is a string of JSON from backend
      } catch (err) {
        console.error("Error fetching favorites:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  if (loading) return <p>Loading favorites...</p>;

  return (
    <div>
      <h2>⭐ Your Favorites</h2>
      {favorites.length === 0 ? (
        <p>No favorites yet. Go add some!</p>
      ) : (
        <MovieList movies={favorites} />
      )}
    </div>
  );
}

export default FavoritesPage;
