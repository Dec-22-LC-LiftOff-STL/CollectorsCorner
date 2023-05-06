package com.collectorscorner.demo.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.stereotype.Component;
import org.springframework.util.Assert;

@Entity
@IdClass(MovieCollectedItemId.class)
//@Component
public class MovieSideNote{
    @Id
    private int movieCollectionId;

    @Id
    private int moviesId;
    @Column(name = "movieSideNote", length = 2000)
    @NotBlank
    @Size(min = 3, max = 2000, message = "Must be between 3 and 2,000 characters in length.")
    private String movieSideNote;

    public MovieSideNote(){

    }

    public MovieSideNote(int movieCollectionId, int moviesId, String movieSideNote){
        this.movieCollectionId = movieCollectionId;
        this.moviesId = moviesId;
        this.movieSideNote = movieSideNote;

    }


    public int getMovieCollectionId() {
        return movieCollectionId;
    }

    public void setMovieCollectionId(int movieCollectionId) {
        this.movieCollectionId = movieCollectionId;
    }

    public int getMoviesId() {
        return moviesId;
    }

    public void setMoviesId(int moviesId) {
        this.moviesId = moviesId;
    }

    public String getMovieSideNote() {
        return movieSideNote;
    }

    public void setMovieSideNote(String movieSideNote) {
        this.movieSideNote = movieSideNote;
    }

    @Override
    public String toString() {
        return "MovieSideNote{" +
                "movieCollectionId=" + movieCollectionId +
                ", moviesId=" + moviesId +
                ", movieSideNote='" + movieSideNote + '\'' +
                '}';
    }
}
