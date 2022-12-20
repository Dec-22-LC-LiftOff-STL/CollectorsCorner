package com.collectorscorner.demo.models;

import jakarta.persistence.Entity;
import jakarta.persistence.ManyToMany;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Entity
@Component
public class Game extends AbstractEntity {
    @ManyToMany(mappedBy = "games")
    private List<GameCollection> collectionsWithThisGame = new ArrayList<>();
    private String creator;

    private String title;

    private String genre;

    private int numberOfPlayers;

    public Game(String creator, int numberOfPlayers, String genre, String title) {
        super();
        this.creator = creator;
        this.numberOfPlayers = numberOfPlayers;
        this.genre = genre;
        this.title = title;
    }

    public Game() {
    }

    public String getCreator() {
        return creator;
    }

    public void setCreator(String creator) {
        this.creator = creator;
    }

    public int getNumberOfPlayers() {
        return numberOfPlayers;
    }

    public void setNumberOfPlayers(int numberOfPlayers) {
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

    @Override
    public String toString() {
        return "Game{" +
                "creator='" + creator + '\'' +
                ", title='" + title + '\'' +
                ", genre='" + genre + '\'' +
                ", numberOfPlayers=" + numberOfPlayers +
                '}';
    }
}
