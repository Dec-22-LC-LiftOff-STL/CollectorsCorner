package com.collectorscorner.demo.data;

import com.collectorscorner.demo.models.Book;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface BookRepository extends CrudRepository <Book, Integer> {
    boolean existsByTitleAndSynopsis(String title, String synopsis);
}
