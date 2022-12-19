package com.collectorscorner.demo.data;

import com.collectorscorner.demo.models.Book;
import org.springframework.data.repository.CrudRepository;

public interface BookRepository extends CrudRepository <Book, Integer> {
}
