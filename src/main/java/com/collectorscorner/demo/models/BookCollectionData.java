package com.collectorscorner.demo.models;

import java.util.ArrayList;


public class BookCollectionData {
    /**
     * Returns the results of searching the BookCollection, data by field and search term.
     *
     * For example, searching for book "rings" will include results
     * with "Lord of the Rings".
     *
     * @param column BookCollection, field that should be searched.
     * @param value Value of the field to search for.
     * @param allBookCollections The list of BookCollections to search.
     * @return List of all BookCollections matching the criteria.
     */

    public static ArrayList<BookCollection> findByColumnAndValue(String column, String value, Iterable<BookCollection> allBookCollections) {

        ArrayList<BookCollection> results = new ArrayList<>();

        if (value.toLowerCase().equals("all")){
            return (ArrayList<BookCollection>) allBookCollections;
        }

        if (column.equals("all")){
            results = findByValue(value, allBookCollections);
            return results;
        }
        for (BookCollection bookCollection : allBookCollections) {

            String aValue = getFieldValue(bookCollection, column);

            if (aValue != null && aValue.toLowerCase().contains(value.toLowerCase())) {
                results.add(bookCollection);
            }
        }

        return results;
    }

    public static String getFieldValue(BookCollection bookCollection, String fieldName){
        String theValue;
        if (fieldName.equals("name")){
            theValue = bookCollection.getName();
        } else {
            theValue = bookCollection.getBooks().toString();
        }

        return theValue;
    }

    /**
     * Search all BookCollection fields for the given term.
     *
     * @param value The search term to look for.
     * @param allBookCollections The list of bookCollections to search.
     * @return     List of all bookCollections with at least one field containing the value.
     */
    public static ArrayList<BookCollection> findByValue(String value, Iterable<BookCollection> allBookCollections) {
        String lower_val = value.toLowerCase();

        ArrayList<BookCollection> results = new ArrayList<>();

        for (BookCollection bookCollection : allBookCollections) {

            if (bookCollection.getName().toLowerCase().contains(lower_val)) {
                results.add(bookCollection);
            } else if (bookCollection.getBooks().toString().toLowerCase().contains(lower_val)) {
                results.add(bookCollection);
            } else if (bookCollection.toString().toLowerCase().contains(lower_val)) {
                results.add(bookCollection);
            }

        }

        return results;
    }



}
