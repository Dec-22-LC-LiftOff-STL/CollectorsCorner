package com.collectorscorner.demo.models;
//composite primary key class to identify each collected movie

import java.io.Serializable;
import java.util.Objects;

public class MovieCollectedItemId implements Serializable {

    private String movieCollectionId;
    private String moviesId;

    public MovieCollectedItemId() {
    }

    public MovieCollectedItemId(String movieCollectionId, String moviesId){
        this.movieCollectionId = movieCollectionId;
        this.moviesId=moviesId;
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
