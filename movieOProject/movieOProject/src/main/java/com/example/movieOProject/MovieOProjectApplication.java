package com.example.movieOProject;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@EnableCaching
@SpringBootApplication
public class MovieOProjectApplication {

	public static void main(String[] args) {
		SpringApplication.run(MovieOProjectApplication.class, args);
	}

}
