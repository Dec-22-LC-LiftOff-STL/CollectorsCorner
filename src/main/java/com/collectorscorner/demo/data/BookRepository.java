package com.collectorscorner.demo.data;

import com.collectorscorner.demo.models.Book;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository

public interface BookRepository extends CrudRepository <Book, Integer> {

    Optional<Book> findByTitleAndYearAndAuthor(String title, int year, String author);

}
