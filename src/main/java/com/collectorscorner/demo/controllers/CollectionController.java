package com.collectorscorner.demo.controllers;



import com.collectorscorner.demo.data.BookCollectionRepository;
import com.collectorscorner.demo.data.GameCollectionRepository;
import com.collectorscorner.demo.data.MovieCollectionRepository;
import com.collectorscorner.demo.data.UserRepository;
import com.collectorscorner.demo.models.BookCollection;
import com.collectorscorner.demo.models.GameCollection;
import com.collectorscorner.demo.models.MovieCollection;
import com.collectorscorner.demo.models.User;
import com.collectorscorner.demo.models.dto.CreateBookCollectionDTO;
import com.collectorscorner.demo.models.dto.CreateGameCollectionDTO;


import com.collectorscorner.demo.Services.MovieCollectionService;
import com.collectorscorner.demo.data.*;
import com.collectorscorner.demo.models.*;


import com.collectorscorner.demo.models.dto.CreateMovieCollectionDTO;
import com.mysql.cj.x.protobuf.MysqlxCrud;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.Optional;

@Controller
@RequestMapping("collections")
public class CollectionController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    MovieRepository movieRepository;

    @Autowired
    MovieCollectionRepository movieCollectionRepository;





    @Autowired
    MovieCollectionService movieCollectionService;

    @Autowired
    GameCollectionRepository gameCollectionRepository;

    @Autowired
    BookCollectionRepository bookCollectionRepository;




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


    @GetMapping("/create-book-collection")
    public String displayCreateBookCollection(@CookieValue("userId") String myCookie, Model model){
        Integer userId = Integer.parseInt(myCookie);
        model.addAttribute(new CreateBookCollectionDTO());
        model.addAttribute("title", "CreateBookCollection");
        model.addAttribute("cookie", userId);
        return "collections/create-book-collection";
    }

    @PostMapping("/create-book-collection")
    public String processCreateBookCollection(@ModelAttribute @Valid CreateBookCollectionDTO createBookCollectionDTO,
                                               @CookieValue("userId") String myCookie,
                                               Errors errors,
                                               HttpServletRequest request,
                                               Model model
    ) {

        Integer userId = Integer.parseInt(myCookie);
        Optional<User> existingUser = userRepository.findById(userId);
        if (errors.hasErrors()) {
            model.addAttribute("title", "CreateBookCollection");
            return "collections/create-book-collection";
        }

//        Optional<User> existingUser = userRepository.findById(userId);
        if(existingUser.isPresent()) {

            User existingUserFound = existingUser.get();
            BookCollection createBookCollection = new BookCollection(createBookCollectionDTO.getBooks(), createBookCollectionDTO.getName(), createBookCollectionDTO.getDescription(), existingUserFound);
            bookCollectionRepository.save(createBookCollection);
        }

//        if (optionalUser.isPresent()) {
//            User existingUser = (User)  optionalUser.get();
//                    MovieCollection createMovieCollection = new MovieCollection(createMovieCollectionDTO.getName(), createMovieCollectionDTO.getDescription(), createMovieCollectionDTO.getMovies(), createMovieCollectionDTO.getUser());
//            movieCollectionRepository.save(createMovieCollection);
//        }

        return "collections/create-book-collection";

    }


    @GetMapping("/create-game-collection")
    public String displayCreateGameCollection(@CookieValue("userId") String myCookie, Model model){
        Integer userId = Integer.parseInt(myCookie);
        model.addAttribute(new CreateGameCollectionDTO());
        model.addAttribute("title", "CreateGameCollection");
        model.addAttribute("cookie", userId);
        return "collections/create-game-collection";
    }

    @PostMapping("/create-game-collection")
    public String processCreateGameCollection(@ModelAttribute @Valid CreateGameCollectionDTO createGameCollectionDTO,
                                               @CookieValue("userId") String myCookie,
                                               Errors errors,
                                               HttpServletRequest request,
                                               Model model
    ) {

        Integer userId = Integer.parseInt(myCookie);
        Optional<User> existingUser = userRepository.findById(userId);
        if (errors.hasErrors()) {
            model.addAttribute("title", "CreateGameCollection");
            return "collections/create-game-collection";
        }

//        Optional<User> existingUser = userRepository.findById(userId);
        if(existingUser.isPresent()) {

            User existingUserFound = existingUser.get();
            GameCollection createGameCollection = new GameCollection(createGameCollectionDTO.getGames(), createGameCollectionDTO.getName(), createGameCollectionDTO.getDescription(), existingUserFound);
            gameCollectionRepository.save(createGameCollection);
        }

//        if (optionalUser.isPresent()) {
//            User existingUser = (User)  optionalUser.get();
//                    MovieCollection createMovieCollection = new MovieCollection(createMovieCollectionDTO.getName(), createMovieCollectionDTO.getDescription(), createMovieCollectionDTO.getMovies(), createMovieCollectionDTO.getUser());
//            movieCollectionRepository.save(createMovieCollection);
//        }

        return "collections/create-game-collection";

    }

    //Created a collections package in templates and a create template inside of collections package. The Form just shows a basic name and a description section for the user to enter information on their collection. No validation currently set up, but as is, once the add button is clicked the collection is added to the SQL database



    @GetMapping("delete")
    public String displayDeleteMovieCollection(@CookieValue("userId") String myCookie, Model model) {

        if ("null".equals(myCookie)) {
            return "redirect:/login";
        }
        Integer userId = Integer.parseInt(myCookie);
        model.addAttribute("cookie", userId);

        ArrayList<MovieCollection> thisUserMovieCollections = new ArrayList<>();
        Iterable<MovieCollection> iterableMovieCollection = movieCollectionRepository.findAll();
        for (MovieCollection movieCollection : iterableMovieCollection) {
            if (movieCollection.getUser().getId() == userId) {
                thisUserMovieCollections.add(movieCollection);
            }
            model.addAttribute("thisUserMovieCollections", thisUserMovieCollections);
        }
        model.addAttribute("movieCollections", iterableMovieCollection);

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

    @GetMapping("delete/{collectionId}")
    public String displayDeleteItemsFromCollectionPage(Model model, @PathVariable int collectionId, @CookieValue(name = "userId") String myCookie){
        Integer userId = Integer.parseInt(myCookie);
        Optional optCollection = movieCollectionRepository.findById(collectionId);
        if (optCollection.isPresent()) {
            MovieCollection movieCollection = (MovieCollection) optCollection.get();
            if (movieCollection.getUser().getId() != userId) {
                return "redirect:";
            }
            model.addAttribute("movies", movieCollection.getMovies());
            model.addAttribute("collection", movieCollection);
        }
        return "collections/delete-collectionId";
    }

    @PostMapping("delete/{collectionId}")
    public String processDeleteMovieCollectionItem(@PathVariable int collectionId, @CookieValue("userId") String myCookie, @RequestParam(required = false) Integer[] movieIds, Model model) {
        MovieCollection movieCollection = new MovieCollection();
        if ("null".equals(myCookie)) {
            return "redirect:/login";
        }
        Integer userId = Integer.parseInt(myCookie);
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent()) {
            model.addAttribute("user", optionalUser.get());
        }
        Optional optMovieCollection = movieCollectionRepository.findById(collectionId);
        if (optMovieCollection.isPresent()){
            movieCollection = (MovieCollection) optMovieCollection.get();
            model.addAttribute("movieCollection", movieCollection);
        }

        if (movieIds != null) {
            for (int id : movieIds) {
                Movie movie = new Movie();
                Optional<Movie> optionalMovie = movieRepository.findById(id);
                if (optionalMovie.isPresent()) {
                    movie = (Movie) optionalMovie.get();
                }
                movieCollectionService.removeMovie(movieCollection, movie);
            }
        }
        return "redirect:/collections/delete/{collectionId}";
    }


}