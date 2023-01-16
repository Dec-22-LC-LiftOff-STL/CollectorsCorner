package com.collectorscorner.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class CollectorsCornerApplication {

	public static void main(String[] args) {
		SpringApplication.run(CollectorsCornerApplication.class, args);
	}

	//Fixes Error:
	// 	Cross-Origin Request Blocked: The Same Origin Policy disallows reading the remote resource at
	// 	https://api.boardgameatlas.com/api/search?name=pandemic&client_id=P3yvzSB2mt. (Reason: CORS header ‘Access-Control-Allow-Origin’ missing).
	// 	Status code: 503.
	//While searching for games
	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**").allowedOrigins("*").allowedMethods("*");
			}
		};
	}

}
