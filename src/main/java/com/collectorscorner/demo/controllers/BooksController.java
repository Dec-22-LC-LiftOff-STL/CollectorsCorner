package com.collectorscorner.demo.controllers;

import com.collectorscorner.demo.data.BookRepository;
import com.collectorscorner.demo.data.MovieRepository;
import com.collectorscorner.demo.models.Book;
import com.collectorscorner.demo.models.Movie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("books")
public class BooksController {

    @Autowired
    private BookRepository bookRepository;


    @GetMapping("search")
    public String displaySearchPage(Model model) {
        model.addAttribute(new Book());
        return "books/search";
    }

    @PostMapping("search")
    public String processAddMovieFormOnSearchPage(@ModelAttribute Book book) {

        if (bookRepository.existsByTitleAndSynopsis(book.getTitle(), book.getSynopsis())) {
        } else {
            bookRepository.save(book);
        }
        return "redirect:/books/search";
    }

    @GetMapping("details/{bookTitle}")
    public String displayViewBookDetailsPage(Model model, @PathVariable String bookTitle) {
        model.addAttribute("bookTitle", bookTitle);
        model.addAttribute("books", bookRepository.findAll());
        return "books/details";
    }

}
