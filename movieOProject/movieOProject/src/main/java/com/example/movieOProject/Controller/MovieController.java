package com.example.movieOProject.Controller;

import com.example.movieOProject.Service.MovieService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.Objects;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/movies")
public class MovieController {
    private final MovieService movieService;

    public MovieController(MovieService movieService){
        this.movieService = movieService;
    }

    @GetMapping("/test")
    public ResponseEntity<String> healthCheck(){
        return ResponseEntity.ok("test");
    }

    @GetMapping("/trending/{timeWindow}")
    public ResponseEntity<String> getTrendingMovies(@PathVariable String timeWindow) {
        String response = movieService.getTrendingMovies(timeWindow);

        if (response == null) {
            return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("Failed to get trending movies");
        }
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<String> getMovieDetails(@PathVariable Long id) {
        String response = movieService.getMovieDetails(id);

        if (response == null) {
            return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("Failed to get movie details");
        }
        return ResponseEntity.ok(response);
        }
    @GetMapping("/favorites")
    public ResponseEntity<?> getMultipleMovieDetails(@RequestParam String ids){
        String[] idArray =  ids.split(",");
        try{
            List<String> movieJSONs = Arrays.stream(idArray).map(id->movieService.getMovieDetails(Long.parseLong(id)))
                    .filter(Objects::nonNull).toList();

            return ResponseEntity.ok(movieJSONs);
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error getting favorites");
        }
    }
    }

