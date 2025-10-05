import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/Home';
import FavoritesPage from './pages/Favorites';
import MovieDetailsPage from './pages/MovieDetails';
import './App.css';

function App() {
  return (
    <Router>
      <header className="app-header">
        <h1><Link to = "/" className="logolink">movieO App</Link>
        </h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/favorites">Favorites</Link>
        </nav>
      </header>

      <main className="app-main">
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/favorites" element={<FavoritesPage />}/>
          <Route path="/movie/:id" element={<MovieDetailsPage />}/>
        </Routes>
      </main>
    </Router>
  );
}

export default App;
