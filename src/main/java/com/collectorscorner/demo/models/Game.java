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
public class Game extends AbstractEntity {
    @ManyToMany(mappedBy = "games")
    private List<GameCollection> collectionsWithThisGame = new ArrayList<>();

    @Column(name = "dateAdded")
    private Date dateAdded;
    @Column(name = "creator")
    private String creator;

    @Column(name = "title")
    private String title;

    @Column(name = "genre")
    private String genre;

    @Column(name = "numPlayers")
    private String numberOfPlayers;

    public Game(String creator, String numberOfPlayers, String genre, String title, Date dateAdded) {
        super();
        this.creator = creator;
        this.numberOfPlayers = numberOfPlayers;
        this.genre = genre;
        this.title = title;
        this.dateAdded = dateAdded;
    }

    public Game() {
    }

    public String getCreator() {
        return creator;
    }

    public void setCreator(String creator) {
        this.creator = creator;
    }

    public String getNumberOfPlayers() {
        return numberOfPlayers;
    }

    public void setNumberOfPlayers(String numberOfPlayers) {
        this.numberOfPlayers = numberOfPlayers;
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

    @Override
    public String toString() {
        return "Game{" +
//                "collectionsWithThisGame=" + collectionsWithThisGame +
                ", dateAdded=" + dateAdded +
                ", creator='" + creator + '\'' +
                ", title='" + title + '\'' +
                ", genre='" + genre + '\'' +
                ", numPlayers=" + numberOfPlayers +
                '}';
    }
}
