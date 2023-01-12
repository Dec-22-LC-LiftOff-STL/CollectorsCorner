package com.collectorscorner.demo.Services;

import com.collectorscorner.demo.data.BookCollectionRepository;
import com.collectorscorner.demo.data.BookRepository;
import com.collectorscorner.demo.models.Book;
import com.collectorscorner.demo.models.BookCollection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class BookCollectionService {

    @Autowired
    private BookCollectionRepository bookCollectionRepository;

    @Autowired
    private BookRepository bookRepository;

    public void addBook(BookCollection bookCollection, Book book) {

        Optional<Book> existingBook = bookRepository.findByTitleAndYearAndAuthor(book.getTitle(), book.getYear(), book.getAuthor());
        if (existingBook.isPresent()) {
            bookCollection.addBook(existingBook.get());
        } else {
            book = bookRepository.save(book);
            bookCollection.addBook(book);
        }
        bookCollectionRepository.save(bookCollection);
    }

    public void removeBook(BookCollection bookCollection, Book book) {
        bookCollection.removeBook(book);
        bookCollectionRepository.save(bookCollection);
    }

}
