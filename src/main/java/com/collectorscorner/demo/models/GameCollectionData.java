package com.collectorscorner.demo.models;

import java.util.ArrayList;


public class GameCollectionData {
    /**
     * Returns the results of searching the GameCollection, data by field and search term.
     *
     * For example, searching for Game "rings" will include results
     * with "Five Gold Rings".
     *
     * @param column GameCollection, field that should be searched.
     * @param value Value of the field to search for.
     * @param allGameCollections The list of GameCollections to search.
     * @return List of all GameCollections matching the criteria.
     */

    public static ArrayList<GameCollection> findByColumnAndValue(String column, String value, Iterable<GameCollection> allGameCollections) {

        ArrayList<GameCollection> results = new ArrayList<>();

        if (value.toLowerCase().equals("all")){
            return (ArrayList<GameCollection>) allGameCollections;
        }

        if (column.equals("all")){
            results = findByValue(value, allGameCollections);
            return results;
        }
        for (GameCollection gameCollection : allGameCollections) {

            String aValue = getFieldValue(gameCollection, column);

            if (aValue != null && aValue.toLowerCase().contains(value.toLowerCase())) {
                results.add(gameCollection);
            }
        }

        return results;
    }

    public static String getFieldValue(GameCollection gameCollection, String fieldName){
        String theValue;
        if (fieldName.equals("name")){
            theValue = gameCollection.getName();
        } else {
            theValue = gameCollection.getGames().toString();
        }

        return theValue;
    }

    /**
     * Search all BookCollection fields for the given term.
     *
     * @param value The search term to look for.
     * @param allGameCollections The list of bookCollections to search.
     * @return     List of all bookCollections with at least one field containing the value.
     */
    public static ArrayList<GameCollection> findByValue(String value, Iterable<GameCollection> allGameCollections) {
        String lower_val = value.toLowerCase();

        ArrayList<GameCollection> results = new ArrayList<>();

        for (GameCollection gameCollection : allGameCollections) {

            if (gameCollection.getName().toLowerCase().contains(lower_val)) {
                results.add(gameCollection);
            } else if (gameCollection.getGames().toString().toLowerCase().contains(lower_val)) {
                results.add(gameCollection);
            } else if (gameCollection.toString().toLowerCase().contains(lower_val)) {
                results.add(gameCollection);
            }

        }

        return results;
    }



}
