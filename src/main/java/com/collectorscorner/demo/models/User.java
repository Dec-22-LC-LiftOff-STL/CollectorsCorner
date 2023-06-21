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


    private String screenName;

    private String firstName;

    private String lastName;

    private String username;

    private String pwHash;

    private String aboutMe;

    private String screenMode = "Light";

    private String profilePicturePath;

    private static final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
    private List<MovieCollection> userMovieCollection = new ArrayList<>();

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
    private List<BookCollection> userBookCollection = new ArrayList<>();

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
    private List<GameCollection> userGameCollection = new ArrayList<>();


    public User(){}

    public User(String username, String password, String screenName, String firstName, String lastName, String aboutMe){
        this.username = username;
        this.pwHash = encoder.encode(password);
        this.userBookCollection = getUserBookCollection();
        this.userGameCollection = getUserGameCollection();
        this.userMovieCollection = getUserMovieCollection();
        this.screenName = screenName;
        this.firstName = firstName;
        this.lastName = lastName;
        this.aboutMe = aboutMe;
    }

    public String getAboutMe() {
        return aboutMe;
    }

    public void setAboutMe(String aboutMe) {
        this.aboutMe = aboutMe;
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

    public String getScreenName() {
        return screenName;
    }

    public void setScreenName(String screenName) {
        this.screenName = screenName;
    }

    public String getScreenMode() {
        return screenMode;
    }

    public void setScreenMode(String screenMode) {
        this.screenMode = screenMode;
    }

    public String getProfilePicturePath() {
        return profilePicturePath;
    }

    public void setProfilePicturePath(String profilePicturePath) {
        this.profilePicturePath = profilePicturePath;
    }

    @Override
    public String toString() {
        return "User{" +
                "screenName='" + screenName + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", username='" + username + '\'' +
                ", aboutMe='" + aboutMe + '\'' +
                ", screenMode='" + screenMode + '\'' +
                ", profilePicturePath'" + profilePicturePath + '\'' +
                ", userMovieCollection=" + userMovieCollection +
                ", userBookCollection=" + userBookCollection +
                ", userGameCollection=" + userGameCollection +
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

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
