package com.example.movieOProject.Service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

@Service
public class MovieService {
    private final RestTemplate restTemplate;
    private final String baseUrl;
    private final String apiKey;

    public MovieService(@Value("${tmdb.base.url}") String baseUrl,
                        @Value("${tmdb.api.key}") String apiKey)
    {
        this.restTemplate = new RestTemplate();
        this.baseUrl = baseUrl;
        this.apiKey = apiKey;

        if("pasteapikeyhere".equals(apiKey)) {
            System.err.println("TMDB API key is missing, check your application.properties");
        }
    }

    @Cacheable("trendingMovies")
    public String getTrendingMovies(String timeWindow){
        try{
            String url = String.format("%s/trending/movie/%s?api_key=%s",baseUrl, timeWindow, apiKey);
            return restTemplate.getForObject(url, String.class);
        }catch (RestClientException e){
            return null;
        }
    }

    @Cacheable("movieDetails")
    public String getMovieDetails(Long movieId){
        try{
            String url = String.format("%s/movie/%d?api_key=%s", baseUrl,movieId,apiKey);
            return restTemplate.getForObject(url, String.class);
        }catch (RestClientException e){
            return null;
        }
    }

}
