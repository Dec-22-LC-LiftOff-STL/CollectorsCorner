package com.collectorscorner.demo.controllers;

import com.collectorscorner.demo.data.BookCollectionRepository;
import com.collectorscorner.demo.data.GameCollectionRepository;
import com.collectorscorner.demo.data.MovieCollectionRepository;
import com.collectorscorner.demo.data.UserRepository;
import com.collectorscorner.demo.models.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Optional;

@Controller
@RequestMapping("search-collections")
public class SearchController {

    @Autowired
    private MovieCollectionRepository movieCollectionRepository;
    @Autowired
    private BookCollectionRepository bookCollectionRepository;
    @Autowired
    private GameCollectionRepository gameCollectionRepository;
    @Autowired
    private UserRepository userRepository;

    @RequestMapping("")
    public String search(Model model, @CookieValue(name = "userId") String myCookie) {
        Integer userId = Integer.parseInt(myCookie);
        Optional<User> optUser = userRepository.findById(userId);
        if (optUser.isPresent()) {
            User user = optUser.get();
            model.addAttribute("username", user.getUsername());
            model.addAttribute("screenMode", user.getScreenMode());
        }
        model.addAttribute("mainTitle", "Search Collections");

        Iterable<MovieCollection> movieCollections = movieCollectionRepository.findAll();
        Iterable<BookCollection> bookCollections = bookCollectionRepository.findAll();
        Iterable<GameCollection> gameCollections = gameCollectionRepository.findAll();
        model.addAttribute("movieCollections", movieCollections);
        model.addAttribute("bookCollections", bookCollections);
        model.addAttribute("gameCollections", gameCollections);

        return "search-collections";
    }

}

