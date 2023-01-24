package com.collectorscorner.demo.controllers;


import com.collectorscorner.demo.data.BookCollectionRepository;
import com.collectorscorner.demo.data.GameCollectionRepository;
import com.collectorscorner.demo.data.MovieCollectionRepository;
import com.collectorscorner.demo.data.UserRepository;
import com.collectorscorner.demo.models.BookCollection;
import com.collectorscorner.demo.models.GameCollection;
import com.collectorscorner.demo.models.MovieCollection;
import com.collectorscorner.demo.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Controller
@RequestMapping("collector")

public class CollectorController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    MovieCollectionRepository movieCollectionRepository;

    @Autowired
    BookCollectionRepository bookCollectionRepository;

    @Autowired
    GameCollectionRepository gameCollectionRepository;


    @GetMapping("{userId}")
//    @CookieValue("userId") String myCookie)
//    @PathVariable  Integer userId

    public String getDisplayCollector(Model model, @PathVariable Integer userId) {



        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isEmpty()) {

//
            return "redirect:/search-collections";
        }
        if (optionalUser.isPresent()) {
            model.addAttribute("user", optionalUser.get());
            model.addAttribute("cookie", userId);
        }
        ArrayList<MovieCollection> thisUserMovieCollections = new ArrayList<>();
        Iterable<MovieCollection> iterableMovieCollection = movieCollectionRepository.findAll();
        for (MovieCollection movieCollection : iterableMovieCollection) {
            if (movieCollection.getUser().getId() == userId) {
                thisUserMovieCollections.add(movieCollection);
            }
            model.addAttribute("thisUserMovieCollections", thisUserMovieCollections);
        }

        ArrayList<BookCollection> thisUserBookCollections = new ArrayList<>();
        Iterable<BookCollection> iterableBookCollection = bookCollectionRepository.findAll();
        for (BookCollection bookCollection : iterableBookCollection) {
            if (bookCollection.getUser().getId() == userId) {
                thisUserBookCollections.add(bookCollection);
            }
            model.addAttribute("thisUserBookCollections", thisUserBookCollections);
        }
        model.addAttribute("bookCollections", iterableBookCollection);

        ArrayList<GameCollection> thisUserGameCollections = new ArrayList<>();
        Iterable<GameCollection> iterableGameCollection = gameCollectionRepository.findAll();
        for (GameCollection gameCollection : iterableGameCollection) {
            if (gameCollection.getUser().getId() == userId) {
                thisUserGameCollections.add(gameCollection);
            }
            model.addAttribute("thisUserGameCollections", thisUserGameCollections);
        }
        model.addAttribute("gameCollections", iterableGameCollection);
        return "collector";

    }



}
