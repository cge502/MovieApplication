import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import MovieList from "../MovieList";

describe("MovieList Component", () => {
  const mockMovies = [
    { id: 1, title: "Movie One" },
    { id: 2, title: "Movie Two" },
  ];

  test("renders movie titles correctly", () => {
    render(
      <MemoryRouter>
        <MovieList movies={mockMovies} />
      </MemoryRouter>
    );

    expect(screen.getByText("Movie One")).toBeInTheDocument();
    expect(screen.getByText("Movie Two")).toBeInTheDocument();
  });
});