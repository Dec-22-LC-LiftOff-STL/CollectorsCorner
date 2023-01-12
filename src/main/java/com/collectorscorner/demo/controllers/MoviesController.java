package com.collectorscorner.demo.controllers;

import com.collectorscorner.demo.Services.MovieCollectionService;
import com.collectorscorner.demo.data.MovieCollectionRepository;
import com.collectorscorner.demo.data.MovieRepository;
import com.collectorscorner.demo.models.Movie;
import com.collectorscorner.demo.models.MovieCollection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("feed")
    private String displayFeedPage(Model model) {
        model.addAttribute("movies", movieRepository.findAll());
        return "movies/feed";
    }

    @GetMapping("list")
    public String displayListPage (Model model) {
        model.addAttribute(new Movie());
        return "movies/list";
    }

    @PostMapping("list")
    public String processAddMovieFormOnListPage(@ModelAttribute Movie movie) {
        movieRepository.save(movie);
        return "redirect:/movies/list";
    }

    @GetMapping("search")
    public String displaySearchPage(@CookieValue("userId") Integer myCookie, Model model) {
        model.addAttribute(new Movie());
        Iterable<MovieCollection> iterableMovieCollection = movieCollectionRepository.findAll();
        model.addAttribute("movieCollections", iterableMovieCollection);
        model.addAttribute("cookie", myCookie);
        System.out.print(myCookie);
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
    public String displayViewMovieDetailsPage(Model model, @PathVariable String movieTitle) {
        model.addAttribute("movieTitle", movieTitle);
        model.addAttribute("movies", movieRepository.findAll());
        return "movies/details";
    }
}
