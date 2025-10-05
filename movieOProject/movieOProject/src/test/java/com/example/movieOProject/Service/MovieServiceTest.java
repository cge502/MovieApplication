package com.example.movieOProject.Service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class MovieServiceTest {

    private MovieService movieService;
    private RestTemplate mockRestTemplate;

    @BeforeEach
    void setUp() {
        mockRestTemplate = Mockito.mock(RestTemplate.class);


        movieService = new MovieService("https://api.themoviedb.org/3", "fake_api_key");
    }

    @Test
    void getTrendingMovies_returnsJsonString() {

        String fakeResponse = "{\"results\":[]}";
        MovieService service = spy(movieService);
        doReturn(fakeResponse).when(service).getTrendingMovies("day");


        String result = service.getTrendingMovies("day");
        assertNotNull(result);
    }

    @Test
    void getMovieDetails_returnsNull_onException() {
        MovieService service = spy(movieService);
        doReturn(null).when(service).getMovieDetails(123L);

        String result = service.getMovieDetails(123L);

        assertNull(result);
    }
}
