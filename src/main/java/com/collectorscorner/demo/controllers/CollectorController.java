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
            model.addAttribute("userId", optionalUser.get().getId());
            model.addAttribute("thisUserMovieCollections", optionalUser.get().getUserMovieCollection());
            model.addAttribute("thisUserBookCollections", optionalUser.get().getUserBookCollection());
            model.addAttribute("thisUserGameCollections", optionalUser.get().getUserGameCollection());
//
        }

        return "collector";

    }



}
