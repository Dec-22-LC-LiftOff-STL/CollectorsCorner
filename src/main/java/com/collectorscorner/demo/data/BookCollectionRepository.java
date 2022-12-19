package com.collectorscorner.demo.data;

import com.collectorscorner.demo.models.BookCollection;
import org.springframework.data.repository.CrudRepository;

public interface BookCollectionRepository extends CrudRepository<BookCollection, Integer> {
}
