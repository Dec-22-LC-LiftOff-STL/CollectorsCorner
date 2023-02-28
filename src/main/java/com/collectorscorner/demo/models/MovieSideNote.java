package com.collectorscorner.demo.models;

import jakarta.persistence.*;
import org.springframework.stereotype.Component;

@Entity
@IdClass(MovieCollectedItemId.class)
//@Component
public class MovieSideNote{
    @Id
    private String movieCollectionId;

    @Id
    private String moviesId;
    @Column
    private String movieSideNote;

    public MovieSideNote(){

    }

    public MovieSideNote(String movieCollectionId, String moviesId, String movieSideNote){
        this.movieCollectionId = movieCollectionId;
        this.moviesId = moviesId;
        this.movieSideNote = movieSideNote;

    }


    public String getMovieCollectionId() {
        return movieCollectionId;
    }

    public void setMovieCollectionId(String movieCollectionId) {
        this.movieCollectionId = movieCollectionId;
    }

    public String getMoviesId() {
        return moviesId;
    }

    public void setMoviesId(String moviesId) {
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
