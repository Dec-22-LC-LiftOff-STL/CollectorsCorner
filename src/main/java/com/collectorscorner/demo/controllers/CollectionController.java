package com.collectorscorner.demo.controllers;


import com.collectorscorner.demo.data.MovieCollectionRepository;
import com.collectorscorner.demo.data.UserRepository;
import com.collectorscorner.demo.models.MovieCollection;
import com.collectorscorner.demo.models.User;
import com.collectorscorner.demo.models.dto.CreateMovieCollectionDTO;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@Controller
@RequestMapping("collections")
public class CollectionController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    MovieCollectionRepository movieCollectionRepository;

    @GetMapping("/create-movie-collection")
    public String displayCreateMovieCollection(@CookieValue("userId") String myCookie, Model model){
        Integer userId = Integer.parseInt(myCookie);
        model.addAttribute(new CreateMovieCollectionDTO());
        model.addAttribute("title", "CreateMovieCollection");
        model.addAttribute("cookie", userId);
        return "collections/create-movie-collection";
    }

    @PostMapping("/create-movie-collection")
    public String processCreateMovieCollection(@ModelAttribute @Valid CreateMovieCollectionDTO createMovieCollectionDTO,
                                               @CookieValue("userId") String myCookie,
                                               Errors errors,
                                               HttpServletRequest request,
                                               Model model
                                               ) {

        Integer userId = Integer.parseInt(myCookie);
        Optional<User> existingUser = userRepository.findById(userId);
        if (errors.hasErrors()) {
            model.addAttribute("title", "CreateMovieCollection");
            return "collections/create-movie-collection";
        }

//        Optional<User> existingUser = userRepository.findById(userId);
        if(existingUser.isPresent()) {

        User existingUserFound = existingUser.get();
            MovieCollection createMovieCollection = new MovieCollection(createMovieCollectionDTO.getName(), createMovieCollectionDTO.getDescription(), createMovieCollectionDTO.getMovies(), existingUserFound);
            movieCollectionRepository.save(createMovieCollection);
        }

//        if (optionalUser.isPresent()) {
//            User existingUser = (User)  optionalUser.get();
//                    MovieCollection createMovieCollection = new MovieCollection(createMovieCollectionDTO.getName(), createMovieCollectionDTO.getDescription(), createMovieCollectionDTO.getMovies(), createMovieCollectionDTO.getUser());
//            movieCollectionRepository.save(createMovieCollection);
//        }

        return "collections/create-movie-collection";

    }
}

//Created a collections package in templates and a create template inside of collections package. The Form just shows a basic name and a description section for the user to enter information on their collection. No validation currently set up, but as is, once the add button is clicked the collection is added to the SQL database
