package com.collectorscorner.demo.models;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Entity
@Component
public class User extends AbstractEntity{


    private String displayName;

    private String firstName;

    private String lastName;

    private String username;

    private String pwHash;

    private static final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
    private List<MovieCollection> userMovieCollection = new ArrayList<>();

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
    private List<BookCollection> userBookCollection = new ArrayList<>();

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
    private List<GameCollection> userGameCollection = new ArrayList<>();


    public User(){}

    public User(String username, String password){
        this.username = username;
        this.pwHash = encoder.encode(password);
        this.userBookCollection = getUserBookCollection();
        this.userGameCollection = getUserGameCollection();
        this.userMovieCollection = getUserMovieCollection();
        this.displayName = getDisplayName();
    }

    public boolean isMatchingPassword(String password){
        return encoder.matches(password, pwHash);
    }


    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Override
    public String toString() {
        return "User{" +
                "firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", username='" + username + '\'' +
                '}';
    }

    public List<MovieCollection> getUserMovieCollection() {
        return userMovieCollection;
    }

    public void setUserMovieCollection(List<MovieCollection> userMovieCollection) {
        this.userMovieCollection = userMovieCollection;
    }

    public List<BookCollection> getUserBookCollection() {
        return userBookCollection;
    }

    public void setUserBookCollection(List<BookCollection> userBookCollection) {
        this.userBookCollection = userBookCollection;
    }

    public List<GameCollection> getUserGameCollection() {
        return userGameCollection;
    }

    public void setUserGameCollection(List<GameCollection> userGameCollection) {
        this.userGameCollection = userGameCollection;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }
}
