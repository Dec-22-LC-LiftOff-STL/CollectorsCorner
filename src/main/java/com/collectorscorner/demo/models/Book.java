package com.collectorscorner.demo.models;

import jakarta.persistence.Entity;
import jakarta.persistence.ManyToMany;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Entity
@Component
public class Book extends AbstractEntity {
    @ManyToMany(mappedBy = "books")
    private List<BookCollection> collectionsWithThisBook = new ArrayList<>();

    private String title;

    private String genre;


    private String author;

    private int year;



    private String synopsis;

    public Book() {
    }

    public Book(String title, String genre, String author, int year, String synopsis) {
        this.title = title;
        this.genre = genre;
        this.author = author;
        this.year = year;
        this.synopsis = synopsis;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public String getSynopsis() {
        return synopsis;
    }

    public void setSynopsis(String synopsis) {
        this.synopsis = synopsis;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }


    @Override
    public String toString() {
        return "Book{" +
                "title='" + title + '\'' +
                ", genre='" + genre + '\'' +
                ", author='" + author + '\'' +
                ", year=" + year +
                ", synopsis='" + synopsis + '\'' +
                '}';
    }
}

