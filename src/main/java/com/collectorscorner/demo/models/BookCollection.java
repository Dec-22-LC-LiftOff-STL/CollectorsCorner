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
public class BookCollection extends AbstractEntity {
    @ManyToMany
    private List<Book> books = new ArrayList<>();
    @Column(name = "name")
    private String name;
    @Column(name = "description")
    private String description;

    public BookCollection(String name, String description, List books) {
        this.name = name;
        this.description = description;
        this.books = books;
    }

    public BookCollection() {
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

    public void addBook(Book book){
        this.books.add(book);
    }

    public void removeBook(Book book){
        this.books.remove(book);
    }

    public List<Book> getBooks() {
        return books;
    }

    public void setBooks(List<Book> books) {
        this.books = books;
    }

    @Override
    public String toString() {
        return "BookCollection{" +
//                "books=" + books +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                '}';
    }
}