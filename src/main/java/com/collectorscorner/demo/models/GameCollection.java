package com.collectorscorner.demo.models;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Entity
@Component

public class GameCollection extends AbstractEntity{
    @OneToMany()
    private List<Game> games = new ArrayList<>();

    private String name;

    private String description;

    public GameCollection(String name, String description) {
        this.name = name;
        this.description = description;
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