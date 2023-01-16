package com.collectorscorner.demo.controllers;


import com.collectorscorner.demo.data.BookCollectionRepository;
import com.collectorscorner.demo.data.GameCollectionRepository;
import com.collectorscorner.demo.data.MovieCollectionRepository;
import com.collectorscorner.demo.data.UserRepository;
import com.collectorscorner.demo.models.BookCollection;
import com.collectorscorner.demo.models.GameCollection;
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

    @Autowired
    GameCollectionRepository gameCollectionRepository;

    @Autowired
    BookCollectionRepository bookCollectionRepository;

    @GetMapping("/create")
    public String displayCreateMovieCollection(@CookieValue("userId") String myCookie, Model model){
        Integer userId = Integer.parseInt(myCookie);
        model.addAttribute(new CreateMovieCollectionDTO());
        model.addAttribute("title", "CreateMovieCollection");
        model.addAttribute("cookie", userId);
        return "collections/create";
    }

    @PostMapping("/create")
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
            return "collections/create";
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

        return "collections/create";

    }
    //Created a collections package in templates and a create template inside of collections package. The Form just shows a basic name and a description section for the user to enter information on their collection. No validation currently set up, but as is, once the add button is clicked the collection is added to the SQL database



    @GetMapping("delete")
    public String displayDeleteMovieCollection(@CookieValue("userId") String myCookie, Model model) {

        if ("null".equals(myCookie)) {
            return "redirect:/login";
        }
        Integer userId = Integer.parseInt(myCookie);
        model.addAttribute("cookie", userId);
        Iterable<GameCollection> iterableGameCollection = gameCollectionRepository.findAll();
        model.addAttribute("gameCollections", iterableGameCollection);
        Iterable<MovieCollection> iterableMovieCollection = movieCollectionRepository.findAll();
        model.addAttribute("movieCollections", iterableMovieCollection);
        Iterable<BookCollection> iterableBookCollection = bookCollectionRepository.findAll();
        model.addAttribute("bookCollections", iterableBookCollection);
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent()) {
            model.addAttribute("user", optionalUser.get());
        }
        return "collections/delete";
    }

    @PostMapping("delete")
    public String processDeleteMovieCollectionForm(@CookieValue("userId") String myCookie, @RequestParam(required = false) Integer[] movieCollectionIds, Model model) {
        if ("null".equals(myCookie)) {
            return "redirect:/login";
        }
        Integer userId = Integer.parseInt(myCookie);
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent()) {
            model.addAttribute("user", optionalUser.get());
        }

        if (movieCollectionIds != null) {
            for (int id : movieCollectionIds) {
                movieCollectionRepository.deleteById(id);
            }
        }
        return "redirect:delete";
    }

}