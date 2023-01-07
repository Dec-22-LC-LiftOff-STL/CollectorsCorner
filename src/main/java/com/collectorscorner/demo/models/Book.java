package com.collectorscorner.demo.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToMany;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Component
public class Book extends AbstractEntity {
    @ManyToMany(mappedBy = "books")
    private List<BookCollection> collectionsWithThisBook = new ArrayList<>();
    @Column(name = "dateAdded")
    private Date dateAdded;
    @Column(name = "title")
    private String title;
    @Column(name = "genre")
    private String genre;

    @Column(name = "author")
    private String author;
    @Column(name = "year")
    private int year;


    @Column(name = "synopsis", length = 20000)
    private String synopsis;

    public Book() {
    }

    public Book(String title, String genre, String author, int year, String synopsis, Date dateAdded) {
        this.title = title;
        this.genre = genre;
        this.author = author;
        this.year = year;
        this.synopsis = synopsis;
        this.dateAdded = dateAdded;
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

    public Date getDateAdded() {
        return dateAdded;
    }

    public void setDateAdded(Date dateAdded) {
        this.dateAdded = dateAdded;
    }

    public List<BookCollection> getCollectionsWithThisBook() {
        return collectionsWithThisBook;
    }

    public void setCollectionsWithThisBook(List<BookCollection> collectionsWithThisBook) {
        this.collectionsWithThisBook = collectionsWithThisBook;
    }

    @Override
    public String toString() {
        return "Book{" +
                "collectionsWithThisBook=" + collectionsWithThisBook +
                ", dateAdded=" + dateAdded +
                ", title='" + title + '\'' +
                ", genre='" + genre + '\'' +
                ", author='" + author + '\'' +
                ", year=" + year +
                ", synopsis='" + synopsis + '\'' +
                '}';
    }
}

