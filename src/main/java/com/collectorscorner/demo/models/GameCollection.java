package com.collectorscorner.demo.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Entity
@Component

public class GameCollection extends AbstractEntity{
    @ManyToMany
    private List<Game> games = new ArrayList<>();

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    public GameCollection(String name, String description, List games) {
        this.name = name;
        this.description = description;
        this.games = games;
    }

    public GameCollection() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }



    public void addGame(Game game){
        this.games.add(game);
    }

    public void removeGame(Game game){
        this.games.remove(game);
    }

    public List<Game> getGames() {
        return games;
    }

    public void setGames(List<Game> games) {
        this.games = games;
    }

    @Override
    public String toString() {
        return "GameCollection{" +
                "games=" + games +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                '}';
    }
}