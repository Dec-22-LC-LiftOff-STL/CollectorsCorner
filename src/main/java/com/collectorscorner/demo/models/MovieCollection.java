package com.collectorscorner.demo.models;

import jakarta.persistence.Entity;
import org.springframework.stereotype.Component;

import java.util.List;

@Entity
@Component
public class MovieCollection extends AbstractEntity{
    private List<Movie> movies;

    private String name;

    private String description;

    public MovieCollection(String name, String description) {
        this.name = name;
        this.description = description;
    }

    public MovieCollection() {
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

    @Override
    public String toString() {
        return "MovieCollection{" +
                "name='" + name + '\'' +
                ", description='" + description + '\'' +
                '}';
    }

    public void addMovie(Movie movie){
        this.movies.add(movie);
    }

    public void removeMovie(Movie movie){
        this.movies.remove(movie);
    }

    public List<Movie> getMovies() {
        return movies;
    }

    public void setMovies(List<Movie> movies) {
        this.movies = movies;
    }
}
