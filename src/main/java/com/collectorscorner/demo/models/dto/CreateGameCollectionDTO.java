package com.collectorscorner.demo.models.dto;

import com.collectorscorner.demo.models.Game;
import com.collectorscorner.demo.models.User;

import java.util.List;

public class CreateGameCollectionDTO {

    private List<Game> games;

    private String name;

    private String description;

    private User user;


    public List<Game> getGames() {
        return games;
    }

    public void setGames(List<Game> games) {
        this.games = games;
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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
