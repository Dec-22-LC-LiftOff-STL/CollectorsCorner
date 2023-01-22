package com.collectorscorner.demo.controllers;

import com.collectorscorner.demo.data.BookCollectionRepository;
import com.collectorscorner.demo.data.GameCollectionRepository;
import com.collectorscorner.demo.data.MovieCollectionRepository;
import com.collectorscorner.demo.models.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import static com.collectorscorner.demo.controllers.ListController.columnChoices;


@Controller
@RequestMapping("search-collections")
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
        return "search-collections";
    }



    @PostMapping("results")
    public String displaySearchResults(Model model, @RequestParam String searchType, @RequestParam String searchTerm) {
        Iterable<MovieCollection> movieCollections;
        Iterable<BookCollection> bookCollections;
        Iterable<GameCollection> gameCollections;
        if (searchType.equalsIgnoreCase("all") && (searchTerm.equalsIgnoreCase("all") || searchTerm.equals(""))) {
            movieCollections = movieCollectionRepository.findAll();
            bookCollections = bookCollectionRepository.findAll();
            gameCollections = gameCollectionRepository.findAll();

            model.addAttribute("columns", columnChoices);
            model.addAttribute("mainTitle", "All Collections:");
            model.addAttribute("movieCollections", movieCollections);
            model.addAttribute("bookCollections", bookCollections);
            model.addAttribute("gameCollections", gameCollections);

            return "search-collections";
        }

        else if (searchType.equals("movie collections") && (searchTerm.equalsIgnoreCase("all") || searchTerm.equals(""))){
            movieCollections = MovieCollectionData.findByColumnAndValue(searchType, searchTerm, movieCollectionRepository.findAll());

            model.addAttribute("columns", columnChoices);
            model.addAttribute("mainTitle", "All Movie Collections:");
            model.addAttribute("movieCollections", movieCollections);

            return "search-collections";
        }

        else if (searchType.equalsIgnoreCase("movie collections")){
            movieCollections = MovieCollectionData.findByColumnAndValue(searchType, searchTerm, movieCollectionRepository.findAll());

            model.addAttribute("columns", columnChoices);
            model.addAttribute("mainTitle", "Movie Collections with: " + searchTerm);
            model.addAttribute("movieCollections", movieCollections);

            return "search-collections";
        }

        else if (searchType.equals("book collections") && (searchTerm.equalsIgnoreCase("all") || searchTerm.equals(""))){
            bookCollections = BookCollectionData.findByColumnAndValue(searchType, searchTerm, bookCollectionRepository.findAll());

            model.addAttribute("columns", columnChoices);
            model.addAttribute("mainTitle", "All Book Collections:");
            model.addAttribute("bookCollections", bookCollections);

            return "search-collections";
        }

        else if (searchType.equalsIgnoreCase("book collections")){
            bookCollections = BookCollectionData.findByColumnAndValue(searchType, searchTerm, bookCollectionRepository.findAll());

            model.addAttribute("columns", columnChoices);
            model.addAttribute("mainTitle", "Book Collections with: " + searchTerm);
            model.addAttribute("bookCollections", bookCollections);

            return "search-collections";
        }

        else if (searchType.equals("game collections") && (searchTerm.equalsIgnoreCase("all") || searchTerm.equals(""))){
            gameCollections = GameCollectionData.findByColumnAndValue(searchType, searchTerm, gameCollectionRepository.findAll());

            model.addAttribute("columns", columnChoices);
            model.addAttribute("mainTitle", "All Game Collections:");
            model.addAttribute("gameCollections", gameCollections);

            return "search-collections";
        }

        else if (searchType.equalsIgnoreCase("game collections")){
            gameCollections = GameCollectionData.findByColumnAndValue(searchType, searchTerm, gameCollectionRepository.findAll());

            model.addAttribute("columns", columnChoices);
            model.addAttribute("mainTitle", "Game Collections with: " + searchTerm);
            model.addAttribute("gameCollections", gameCollections);

            return "search-collections";
        }

        else {
            movieCollections = MovieCollectionData.findByColumnAndValue(searchType, searchTerm, movieCollectionRepository.findAll());
            bookCollections = BookCollectionData.findByColumnAndValue(searchType, searchTerm, bookCollectionRepository.findAll());
            gameCollections = GameCollectionData.findByColumnAndValue(searchType, searchTerm, gameCollectionRepository.findAll());
        }
            model.addAttribute("columns", columnChoices);
            model.addAttribute("mainTitle", "All Collections with " + ": " + searchTerm);
            model.addAttribute("movieCollections", movieCollections);
            model.addAttribute("bookCollections", bookCollections);
            model.addAttribute("gameCollections", gameCollections);

            return "search-collections";
        }
}

