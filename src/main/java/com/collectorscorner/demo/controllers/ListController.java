package com.collectorscorner.demo.controllers;
import com.collectorscorner.demo.data.*;
import com.collectorscorner.demo.models.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.HashMap;

@Controller
@RequestMapping(value = "collections-List")
public class ListController {

    @Autowired
    private MovieCollectionRepository movieCollectionRepository;
    @Autowired
    private MovieRepository movieRepository;
    @Autowired
    private BookCollectionRepository bookCollectionRepository;
    @Autowired
    private BookRepository bookRepository;
    @Autowired
    private GameCollectionRepository gameCollectionRepository;
    @Autowired
    private GameRepository gameRepository;

    static HashMap<String, String> columnChoices = new HashMap<>();

    public ListController() {

        columnChoices.put("all", "All");
        columnChoices.put("movie collections", "Movie Collections");
        columnChoices.put("book collections", "Book Collections");
        columnChoices.put("game collections", "Game Collections");
    }

    @RequestMapping("")
    public String list(Model model) {
//        model.addAttribute("movies", movieRepository.findAll());
//        model.addAttribute("books", bookRepository.findAll());
//        model.addAttribute("games", gameRepository.findAll());
        model.addAttribute("movie collections", movieCollectionRepository.findAll());
        model.addAttribute("book collections", bookCollectionRepository.findAll());
        model.addAttribute("game collections", gameCollectionRepository.findAll());

        return "collections-list";
    }

    @RequestMapping(value = "collections")
    public String listCollectionsByColumnAndValue(Model model, @RequestParam String column, @RequestParam String value) {
        Iterable<MovieCollection> movieCollections;
        Iterable<BookCollection> bookCollections;
        Iterable<GameCollection> gameCollections;
        if (column.toLowerCase().equals("all")){
            movieCollections = movieCollectionRepository.findAll();
            bookCollections = bookCollectionRepository.findAll();
            gameCollections = gameCollectionRepository.findAll();
            model.addAttribute("title", "All Collections");
        } else {
            movieCollections = MovieCollectionData.findByColumnAndValue(column, value, movieCollectionRepository.findAll());
            bookCollections = BookCollectionData.findByColumnAndValue(column, value, bookCollectionRepository.findAll());
            gameCollections = GameCollectionData.findByColumnAndValue(column, value, gameCollectionRepository.findAll());
            model.addAttribute("title", "Collections with " + columnChoices.get(column) + ": " + value);
        }
        model.addAttribute("movie collections", movieCollections);
        model.addAttribute("book collections", bookCollections);
        model.addAttribute("game collections", gameCollections);

        return "list-collections";
    }
}


