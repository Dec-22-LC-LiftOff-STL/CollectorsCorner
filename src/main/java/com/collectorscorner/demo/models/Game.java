package com.collectorscorner.demo.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToMany;
import jakarta.validation.constraints.NotEmpty;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Component
public class Game extends AbstractEntity {

    @ManyToMany
    @NotEmpty(message = "Please Choose a Collection to add this to.")
    private List<GameCollection> collectionsWithThisGame = new ArrayList<>();
    @Column(name = "dateAdded")
    private Date dateAdded;
    @Column(name = "creator")
    private String creator;
    @Column(name = "title")
    private String title;
    @Column(name = "genre")
    private String genre;
    @Column(name = "minPlayers")
    private Integer minPlayers;
    @Column(name = "maxPlayers")
    private Integer maxPlayers;
    @Column(name = "description", length = 20000)
    private String description;


    public Game() { }

    public Game(List<GameCollection> collectionsWithThisGame, Date dateAdded, String creator, String title, String genre, Integer minPlayers, Integer maxPlayers, String description) {
        this.collectionsWithThisGame = collectionsWithThisGame;
        this.dateAdded = dateAdded;
        this.creator = creator;
        this.title = title;
        this.genre = genre;
        this.minPlayers = minPlayers;
        this.maxPlayers = maxPlayers;
        this.description = description;
    }

    public List<GameCollection> getCollectionsWithThisGame() {
        return collectionsWithThisGame;
    }

    public void setCollectionsWithThisGame(List<GameCollection> collectionsWithThisGame) {
        this.collectionsWithThisGame = collectionsWithThisGame;
    }

    public Date getDateAdded() {
        return dateAdded;
    }

    public void setDateAdded(Date dateAdded) {
        this.dateAdded = dateAdded;
    }

    public String getCreator() {
        return creator;
    }

    public void setCreator(String creator) {
        this.creator = creator;
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

    public Integer getMinPlayers() {
        return minPlayers;
    }

    public void setMinPlayers(Integer minPlayers) {
        this.minPlayers = minPlayers;
    }

    public Integer getMaxPlayers() {
        return maxPlayers;
    }

    public void setMaxPlayers(Integer maxPlayers) {
        this.maxPlayers = maxPlayers;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public String toString() {
        return "Game{" +
                "collectionsWithThisGame=" + collectionsWithThisGame +
                ", dateAdded=" + dateAdded +
                ", creator='" + creator + '\'' +
                ", title='" + title + '\'' +
                ", genre='" + genre + '\'' +
                ", minPlayers=" + minPlayers +
                ", maxPlayers=" + maxPlayers +
                ", description='" + description + '\'' +
                '}';
    }
}
