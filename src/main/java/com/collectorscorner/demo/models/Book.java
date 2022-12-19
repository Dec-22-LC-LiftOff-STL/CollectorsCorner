package com.collectorscorner.demo.models;

import jakarta.persistence.Entity;
import org.springframework.stereotype.Component;

@Entity
@Component
public class Book extends AbstractEntity {

    private String title;

    private String genre;

    private String genre2;

    private String genre3;

    private String author;

    private int year;

    private String synopsis;

    public Book() {
    }

    public Book(String title, String genre, String genre2, String genre3, String author, int year, String synopsis) {
        this.title = title;
        this.genre = genre;
        this.genre2 = genre2;
        this.genre3 = genre3;
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

    public String getGenre2() {
        return genre2;
    }

    public void setGenre2(String genre2) {
        this.genre2 = genre2;
    }

    public String getGenre3() {
        return genre3;
    }

    public void setGenre3(String genre3) {
        this.genre3 = genre3;
    }

    @Override
    public String toString() {
        return "Book{" +
                "title='" + title + '\'' +
                ", genre='" + genre + '\'' +
                ", genre2='" + genre2 + '\'' +
                ", genre3='" + genre3 + '\'' +
                ", author='" + author + '\'' +
                ", year=" + year +
                ", synopsis='" + synopsis + '\'' +
                '}';
    }
}

