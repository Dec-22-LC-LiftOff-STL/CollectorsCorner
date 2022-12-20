package com.collectorscorner.demo.data;


import com.collectorscorner.demo.models.MovieCollection;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface MovieCollectionRepository extends CrudRepository<MovieCollection, Integer> {
}
