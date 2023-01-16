package com.collectorscorner.demo.models.dto;

import com.collectorscorner.demo.models.Movie;
import com.collectorscorner.demo.models.User;

import java.util.List;

public class CreateMovieCollectionDTO {

    private String name;

    private String description;

    private List<Movie> movies;

    private User user;

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<Movie> getMovies() {
        return movies;
    }

    public void setMovies(List<Movie> movies) {
        this.movies = movies;
    }
}
