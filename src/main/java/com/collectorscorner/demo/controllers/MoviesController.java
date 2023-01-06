package com.collectorscorner.demo.controllers;

import com.collectorscorner.demo.data.MovieRepository;
import com.collectorscorner.demo.models.Movie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("movies")
public class MoviesController {

    @Autowired
    private MovieRepository movieRepository;

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
    public String displaySearchPage(Model model) {
        model.addAttribute(new Movie());
        return "movies/search";
    }

    @PostMapping("search")
    public String processAddMovieFormOnSearchPage(@ModelAttribute Movie movie) {
            if (movieRepository.existsByTitleAndYearAndDirector(movie.getTitle(), movie.getYear(), movie.getDirector())) {
            } else {
                movieRepository.save(movie);
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
