package com.collectorscorner.demo.models;

import java.lang.Class;

import jakarta.persistence.*;
import org.springframework.stereotype.Component;
import com.collectorscorner.demo.models.Movie;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Entity
@Component
public class MovieCollection extends AbstractEntity {
//@Column(name="Movie")

    @ManyToMany
    private List<Movie> movies = new ArrayList<>();
    @Column(name = "name")
    private String name;
    @Column(name = "desc")
    private String description;

    public MovieCollection(String name, String description, List movies) {
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
                "movies=" + movies +
                ", name='" + name + '\'' +
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

/*
12/19/2022
Originally getting the error could not determine JDBC type. the issue came from the Collection specific repositories, because there was no way to tie the list fields books movies and games back to each individual book, movie, or game.... Need to add a field that tracks all collections that have a specific book, movie, or game.
Added fields collectionsWithThisBook, collectionsWithThisMovie, and collectionsWithThisGame to the book, movie, and game class respectively. These will have a many to many relationship with the collections of each users, represented and mappedBy the fields books, movies, and games in the collection Classes. These individual lists will have a One to Many relationship with movies.


 */
