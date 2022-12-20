package com.collectorscorner.demo.models;

import java.util.ArrayList;


public class MovieCollectionData {
    /**
     * Returns the results of searching the MovieCollection, data by field and search term.
     *
     * For example, searching for movie "rings" will include results
     * with "Lord of the Rings".
     *
     * @param column MovieCollection, field that should be searched.
     * @param value Value of the field to search for.
     * @param allMovieCollections The list of MovieCollections, BookCollections, GameCollections to search.
     * @return List of all MovieCollections, BookCollections, or GameCollections matching the criteria.
     */

    public static ArrayList<MovieCollection> findByColumnAndValue(String column, String value, Iterable<MovieCollection> allMovieCollections) {

        ArrayList<MovieCollection> results = new ArrayList<>();

        if (value.toLowerCase().equals("all")){
            return (ArrayList<MovieCollection>) allMovieCollections;
        }

        if (column.equals("all")){
            results = findByValue(value, allMovieCollections);
            return results;
        }
        for (MovieCollection movieCollection : allMovieCollections) {

            String aValue = getFieldValue(movieCollection, column);

            if (aValue != null && aValue.toLowerCase().contains(value.toLowerCase())) {
                results.add(movieCollection);
            }
        }

        return results;
    }

    public static String getFieldValue(MovieCollection movieCollection, String fieldName){
        String theValue;
        if (fieldName.equals("name")){
            theValue = movieCollection.getName();
        } else {
            theValue = movieCollection.getMovies().toString();
        }

        return theValue;
    }

    /**
     * Search all MovieCollection fields for the given term.
     *
     * @param value The search term to look for.
     * @param allMovieCollections The list of movieCollections to search.
     * @return     List of all movieCollections with at least one field containing the value.
     */
    public static ArrayList<MovieCollection> findByValue(String value, Iterable<MovieCollection> allMovieCollections) {
        String lower_val = value.toLowerCase();

        ArrayList<MovieCollection> results = new ArrayList<>();

        for (MovieCollection movieCollection : allMovieCollections) {

            if (movieCollection.getName().toLowerCase().contains(lower_val)) {
                results.add(movieCollection);
            } else if (movieCollection.getMovies().toString().toLowerCase().contains(lower_val)) {
                results.add(movieCollection);
            } else if (movieCollection.toString().toLowerCase().contains(lower_val)) {
                results.add(movieCollection);
            }

        }

        return results;
    }



}
