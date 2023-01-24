package com.collectorscorner.demo.controllers;

import com.collectorscorner.demo.Services.BookCollectionService;
import com.collectorscorner.demo.data.BookCollectionRepository;
import com.collectorscorner.demo.data.BookRepository;
import com.collectorscorner.demo.data.UserRepository;
import com.collectorscorner.demo.models.Book;
import com.collectorscorner.demo.models.BookCollection;
import com.collectorscorner.demo.models.MovieCollection;
import com.collectorscorner.demo.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("books")
public class BooksController {

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private UserRepository userRepository;

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
        Iterable<User> iterableUsers = userRepository.findAll();
        model.addAttribute("bookCollections", iterableBookCollection);
        model.addAttribute("cookie", userId);
        model.addAttribute("iterableUsers", iterableUsers);
        //Create HashMap to be interpreted by JS as an object. Key = collectionId, Value = Movies in that collection
        List<Integer> keys = new ArrayList<>();
        List<String> values = new ArrayList<>();
        HashMap<Integer, String> collectionIdsAndBooks = new HashMap<>();
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent()) {
            User thisUser = optionalUser.get();
            List<BookCollection> thisUsersCollections = thisUser.getUserBookCollection();
            for (BookCollection bookCollection : thisUsersCollections){
                keys.add(bookCollection.getId());
                String booksString = bookCollection.getBooks().toString();
                values.add(booksString);
            }
            for (int i=0; i<keys.size(); i++) {
                collectionIdsAndBooks.put(keys.get(i), values.get(i));
            }
            model.addAttribute("collectionIdsAndBooks", collectionIdsAndBooks);
        }
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


    @GetMapping("details/{bookTitle}")
    public String displayViewBookDetailsPage(Model model, @PathVariable String bookTitle/*,@CookieValue(name = "userId") String myCookie*/) {
//        Integer userId = Integer.parseInt(myCookie);

        Iterable<BookCollection> allBookCollections = bookCollectionRepository.findAll();
        int foundBookYear = 0;
        String collectorName = "";
        ArrayList<BookCollection> foundBooks = new ArrayList<>();
        for (BookCollection collection : allBookCollections){
            for (int i = 0; i < collection.getBooks().size(); i++){
                if (collection.getBooks().get(i).getTitle().equals(bookTitle)){
                    foundBooks.add(collection);
                    foundBookYear = collection.getBooks().get(i).getYear();
                    collectorName = collection.getUser().getUsername();
                }
            }

        }
        model.addAttribute("collectionsWithThisBook", foundBooks);
        model.addAttribute("bookTitle", bookTitle);
        model.addAttribute("books", bookRepository.findAll());
        model.addAttribute("foundBookYear", foundBookYear);
        model.addAttribute("collectorName", collectorName);

        return "books/details";
    }









}