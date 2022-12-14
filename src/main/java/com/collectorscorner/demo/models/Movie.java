package com.collectorscorner.demo.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Component
public class Movie extends AbstractEntity {

    @ManyToMany(mappedBy = "movies")
    private List<MovieCollection> collectionsWithThisMovie = new ArrayList<>();
    @Column(name = "dateAdded")
    private Date dateAdded;
    @Column(name = "title")
    private String title;
    @Column(name = "year")
    private int year;
    @Column(name = "director")
    private String director;
    @Column(name = "genre")
    private String genre;

    private String genre2;

    private String genre3;

    @Column(name = "synopsis")
    private String synopsis;

    private int userID;

    public Movie() {}

    public Movie(String title, int year, String director, String genre, String genre2, String genre3, String synopsis, int userID, Date dateAdded) {
        this.title = title;
        this.year = year;
        this.director = director;
        this.genre = genre;
        this.genre2 = genre2;
        this.genre3 = genre3;
        this.synopsis = synopsis;
        this.userID = userID;
        this.dateAdded = dateAdded;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public String getDirector() {
        return director;
    }

    public void setDirector(String director) {
        this.director = director;
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

    public String getSynopsis() {
        return synopsis;
    }

    public void setSynopsis(String synopsis) {
        this.synopsis = synopsis;
    }

    public int getUserID() {
        return userID;
    }

    public void setUserID(int userID) {
        this.userID = userID;
    }

    @Override
    public String toString() {
        return "Movie{" +
                "collectionsWithThisMovie=" + collectionsWithThisMovie +
                ", dateAdded=" + dateAdded +
                ", title='" + title + '\'' +
                ", year=" + year +
                ", director='" + director + '\'' +
                ", genre='" + genre + '\'' +
                ", genre2='" + genre2 + '\'' +
                ", genre3='" + genre3 + '\'' +
                ", synopsis='" + synopsis + '\'' +
                '}';
    }

    public Date getDateAdded() {
        return dateAdded;
    }

    public void setDateAdded(Date dateAdded) {
        this.dateAdded = dateAdded;
    }
}

