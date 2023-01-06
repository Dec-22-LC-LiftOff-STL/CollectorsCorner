package com.collectorscorner.demo.data;

import com.collectorscorner.demo.models.BookCollection;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface BookCollectionRepository extends CrudRepository<BookCollection, Integer> {
}