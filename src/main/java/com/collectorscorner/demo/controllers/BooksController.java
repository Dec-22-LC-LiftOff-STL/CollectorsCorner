package com.collectorscorner.demo.controllers;

import com.collectorscorner.demo.Services.BookCollectionService;
import com.collectorscorner.demo.data.BookCollectionRepository;
import com.collectorscorner.demo.data.BookRepository;
import com.collectorscorner.demo.models.Book;
import com.collectorscorner.demo.models.BookCollection;
import com.collectorscorner.demo.models.MovieCollection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@Controller
@RequestMapping("books")
public class BooksController {

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private BookCollectionRepository bookCollectionRepository;

    @Autowired
    private BookCollectionService bookCollectionService;

    @GetMapping("search")
    public String displaySearchPage(@CookieValue("userId") String myCookie, Model model) {
        model.addAttribute(new Book());
        if ("null".equals(myCookie)) {
            return "redirect:/login";
        }
        Integer userId = Integer.parseInt(myCookie);
        Iterable<BookCollection> iterableBookCollection = bookCollectionRepository.findAll();
        model.addAttribute("bookCollections", iterableBookCollection);
        model.addAttribute("cookie", userId);
        return "books/search";
    }

    @PostMapping("search")
    public String processAddBookFormOnSearchPage(@ModelAttribute Book book, @RequestParam("collectionId") Integer collectionId) {
        Optional<Book> existingBook = bookRepository.findByTitleAndYearAndAuthor(book.getTitle(), book.getYear(), book.getAuthor());
        if (existingBook.isPresent()) {
            Optional<BookCollection> optionalBookCollection = bookCollectionRepository.findById(collectionId);
            if (optionalBookCollection.isPresent()) {
                BookCollection bookCollection = (BookCollection) optionalBookCollection.get();
                bookCollectionService.addBook(bookCollection, existingBook.get());
            }
        } else {
            Optional<BookCollection> optionalBookCollection = bookCollectionRepository.findById(collectionId);
            if (optionalBookCollection.isPresent()) {
                BookCollection bookCollection = (BookCollection) optionalBookCollection.get();
                bookCollectionService.addBook(bookCollection, book);
            }
        }
        return "redirect:/books/search";
    }

}