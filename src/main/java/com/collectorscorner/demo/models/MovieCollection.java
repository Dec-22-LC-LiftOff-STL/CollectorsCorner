package com.collectorscorner.demo.models;

import java.lang.Class;

import com.collectorscorner.demo.data.MovieCollectionRepository;
import jakarta.persistence.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.collectorscorner.demo.models.Movie;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Entity
@Component
public class MovieCollection extends AbstractEntity {

    @ManyToMany
    private List<Movie> movies = new ArrayList<>();
    @Column(name = "name")
    @Size(max = 70)
    private String name;
    @Column(name = "description")
    private String description;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public MovieCollection() { }

    public MovieCollection(String name, String description, List<Movie> movies, User user) {
        this.name = name;
        this.description = description;
        this.movies = movies;
        this.user = user;
    }

    public void addMovie(Movie movie){
        this.movies.add(movie);
    }

    public void removeMovie(Movie movie){
        this.movies.remove(movie);
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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<Movie> getMovies() {
        return movies;
    }

    public void setMovies(List<Movie> movies) {
        this.movies = movies;
    }

    @Override
    public String toString() {
        return "MovieCollection{" +
                "movies=" + movies +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", user=" + user +
                '}';
    }
}


