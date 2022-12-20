package com.collectorscorner.demo.controllers;

import com.collectorscorner.demo.data.BookCollectionRepository;
import com.collectorscorner.demo.data.GameCollectionRepository;
import com.collectorscorner.demo.data.MovieCollectionRepository;
import com.collectorscorner.demo.models.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import static com.collectorscorner.demo.controllers.ListController.columnChoices;


@Controller
@RequestMapping("search")
public class SearchController {

    @Autowired
    private MovieCollectionRepository movieCollectionRepository;
    @Autowired
    private BookCollectionRepository bookCollectionRepository;
    @Autowired
    private GameCollectionRepository gameCollectionRepository;

    @RequestMapping("")
    public String search(Model model) {
        model.addAttribute("columns", columnChoices);
        return "search";
    }

    @PostMapping("results")
    public String displaySearchResults(Model model, @RequestParam String searchType, @RequestParam String searchTerm) {
        Iterable<MovieCollection> movieCollections;
        Iterable<BookCollection> bookCollections;
        Iterable<GameCollection> gameCollections;
        if (searchTerm.toLowerCase().equals("all") || searchTerm.equals("")) {
            movieCollections = movieCollectionRepository.findAll();
            bookCollections = bookCollectionRepository.findAll();
            gameCollections = gameCollectionRepository.findAll();
        } else {
            movieCollections = MovieCollectionData.findByColumnAndValue(searchType, searchTerm, movieCollectionRepository.findAll());
            bookCollections = BookCollectionData.findByColumnAndValue(searchType, searchTerm, bookCollectionRepository.findAll());
            gameCollections = GameCollectionData.findByColumnAndValue(searchType, searchTerm, gameCollectionRepository.findAll());

        }
        model.addAttribute("columns", columnChoices);
        model.addAttribute("title", "Movie Collections with" + columnChoices.get(searchType) + ": " + searchTerm);
        model.addAttribute("title", "Book Collections with" + columnChoices.get(searchType) + ": " + searchTerm);
        model.addAttribute("title", "Game Collections with" + columnChoices.get(searchType) + ": " + searchTerm);
        model.addAttribute("movie collections", movieCollections);
        model.addAttribute("book collections", bookCollections);
        model.addAttribute("game collections", gameCollections);
        return "search";
        }

}

