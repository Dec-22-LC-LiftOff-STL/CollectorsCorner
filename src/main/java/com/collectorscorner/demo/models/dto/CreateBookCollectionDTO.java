package com.collectorscorner.demo.models.dto;

import com.collectorscorner.demo.models.Book;
import com.collectorscorner.demo.models.Movie;
import com.collectorscorner.demo.models.User;

import java.util.List;

public class CreateBookCollectionDTO {

    private String name;

    private String description;

    private List<Book> books;

    private User user;

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
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

    public List<Book> getBooks() {
        return books;
    }

    public void setBooks(List<Book> books) {
        this.books = books;
    }
}
