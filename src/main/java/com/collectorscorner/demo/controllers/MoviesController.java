package com.collectorscorner.demo.controllers;

import com.collectorscorner.demo.Services.MovieCollectionService;
import com.collectorscorner.demo.data.MovieCollectionRepository;
import com.collectorscorner.demo.data.MovieRepository;
import com.collectorscorner.demo.data.UserRepository;
import com.collectorscorner.demo.models.Movie;
import com.collectorscorner.demo.models.MovieCollection;
import com.collectorscorner.demo.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.print.DocFlavor;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("movies")
public class MoviesController {

    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private MovieCollectionRepository movieCollectionRepository;

    @Autowired
    private MovieCollectionService movieCollectionService;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("feed")
    private String displayFeedPage(Model model) {
        model.addAttribute("movies", movieRepository.findAll());
        return "movies/feed";
    }

    @GetMapping("list")
    public String displayListPage (Model model, @CookieValue(name = "userId") String myCookie) {
        model.addAttribute(new Movie());
//        Integer userId = Integer.parseInt(myCookie);
        Iterable<MovieCollection> iterableMovieCollection = movieCollectionRepository.findAll();
//        Iterable<User> iterableUsers = userRepository.findAll();
        model.addAttribute("movieCollections", iterableMovieCollection);
//        model.addAttribute("cookie", userId);
//        model.addAttribute("iterableUsers", iterableUsers);
        return "movies/list";
    }

    @PostMapping("list")
    public String processAddMovieFormOnListPage(@ModelAttribute Movie movie) {
        movieRepository.save(movie);
        return "redirect:/movies/list";
    }

    @GetMapping("search")
    public String displaySearchPage(@CookieValue(name = "userId") String myCookie, Model model) {
        model.addAttribute(new Movie());
        if ("null".equals(myCookie)) {
            return "redirect:/login";
        }
        Integer userId = Integer.parseInt(myCookie);
        Iterable<MovieCollection> iterableMovieCollection = movieCollectionRepository.findAll();
        Iterable<User> iterableUsers = userRepository.findAll();
        model.addAttribute("movieCollections", iterableMovieCollection);
        model.addAttribute("cookie", userId);
        model.addAttribute("iterableUsers", iterableUsers);
        //Create HashMap to be interpreted by JS as an object. Key = collectionId, Value = Movies in that collection
        List<Integer> keys = new ArrayList<>();
        List<String> values = new ArrayList<>();
        HashMap<Integer, String> collectionIdsAndMovies = new HashMap<>();
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent()) {
            User thisUser = optionalUser.get();
            List<MovieCollection> thisUsersCollections = thisUser.getUserMovieCollection();
            for (MovieCollection movieCollection : thisUsersCollections){
                keys.add(movieCollection.getId());
                String moviesString = movieCollection.getMovies().toString();
                values.add(moviesString);
            }
            for (int i=0; i<keys.size(); i++) {
                collectionIdsAndMovies.put(keys.get(i), values.get(i));
            }
            model.addAttribute("collectionIdsAndMovies", collectionIdsAndMovies);

        }

        return "movies/search";
    }

    @PostMapping("search")
    public String processAddMovieFormOnSearchPage(@ModelAttribute Movie movie, @RequestParam("collectionId") Integer collectionId) {
        Optional<Movie> existingMovie = movieRepository.findByTitleAndYearAndDirector(movie.getTitle(), movie.getYear(), movie.getDirector());
        if (existingMovie.isPresent()) {
            Optional<MovieCollection> optionalMovieCollection = movieCollectionRepository.findById(collectionId);
            if (optionalMovieCollection.isPresent()) {
                MovieCollection movieCollection = (MovieCollection) optionalMovieCollection.get();
                movieCollectionService.addMovie(movieCollection, existingMovie.get());
            }
        } else {
            Optional<MovieCollection> optionalMovieCollection = movieCollectionRepository.findById(collectionId);
            if (optionalMovieCollection.isPresent()) {
                MovieCollection movieCollection = (MovieCollection) optionalMovieCollection.get();
                movieCollectionService.addMovie(movieCollection, movie);
            }
        }
        return "redirect:/movies/search";
    }

    @GetMapping("details/{movieTitle}")
    public String displayViewMovieDetailsPage(Model model, @PathVariable String movieTitle/*,@CookieValue(name = "userId") String myCookie*/) {
//        Integer userId = Integer.parseInt(myCookie);

        Iterable<MovieCollection> allMovieCollections = movieCollectionRepository.findAll();
        int foundMovieYear = 0;
        String collectorName = "";
        ArrayList<MovieCollection> foundMovies = new ArrayList<>();
        for (MovieCollection collection : allMovieCollections){
            for (int i = 0; i < collection.getMovies().size(); i++){
                if (collection.getMovies().get(i).getTitle().equals(movieTitle)){
                    foundMovies.add(collection);
                    foundMovieYear = collection.getMovies().get(i).getYear();
                    collectorName = collection.getUser().getUsername();
                }
            }

        }
        model.addAttribute("collectionsWithThisMovie", foundMovies);
        model.addAttribute("movieTitle", movieTitle);
        model.addAttribute("movies", movieRepository.findAll());
        model.addAttribute("foundMovieYear", foundMovieYear);
        model.addAttribute("collectorName", collectorName);

        return "movies/details";
    }

    @GetMapping("/collections/view-movie-collection")
    public String displayViewMovieCollectionsPage(Model model, @PathVariable String movieTitle/*,@CookieValue(name = "userId") String myCookie*/) {
//        Integer userId = Integer.parseInt(myCookie);

        Iterable<MovieCollection> allMovieCollections = movieCollectionRepository.findAll();
        int foundMovieYear = 0;
        String collectorName = "";
        ArrayList<MovieCollection> foundMovies = new ArrayList<>();
        for (MovieCollection collection : allMovieCollections){
            for (int i = 0; i < collection.getMovies().size(); i++){
                if (collection.getMovies().get(i).getTitle().equals(movieTitle)){
                    foundMovies.add(collection);
                    foundMovieYear = collection.getMovies().get(i).getYear();
                    collectorName = collection.getUser().getUsername();
                }
            }

        }
        model.addAttribute("collectionsWithThisMovie", foundMovies);
        model.addAttribute("movieTitle", movieTitle);
        model.addAttribute("movies", movieRepository.findAll());
        model.addAttribute("foundMovieYear", foundMovieYear);
        model.addAttribute("collectorName", collectorName);

        return "collections/view-movie-collection";
    }
}
