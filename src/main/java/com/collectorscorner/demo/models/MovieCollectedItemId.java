package com.collectorscorner.demo.models;
//composite primary key class to identify each collected movie

import java.io.Serializable;
import java.util.Objects;

public class MovieCollectedItemId implements Serializable {

    private int movieCollectionId;
    private int moviesId;

    public MovieCollectedItemId() {
    }

    public MovieCollectedItemId(int movieCollectionId, int moviesId){
        this.movieCollectionId = movieCollectionId;
        this.moviesId=moviesId;
    }

    public int getMovieCollectionId() {
        return movieCollectionId;
    }

    @Override
    public String toString() {
        return super.toString();
    }

    @Override
    public boolean equals(Object obj) {
        return super.equals(obj);
    }
//        @Override
//    public boolean equals(Object obj) {
//        if (this == obj) return true;
//        if (obj == null || getClass() != obj.getClass()) return false;
//        MovieCollectedItemId movieCollectedItemId = (MovieCollectedItemId) obj;
//        return Objects.equals(movieCollectionId, movieCollectionId) && moviesId.equals(moviesId);
//    }


    @Override
    public int hashCode() {
        return Objects.hash(movieCollectionId, moviesId);
    }
}
