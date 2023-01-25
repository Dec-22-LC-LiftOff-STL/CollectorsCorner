package com.collectorscorner.demo.data;


import com.collectorscorner.demo.models.MovieCollection;
import jakarta.transaction.Transactional;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


@Transactional
@Repository
public interface MovieCollectionRepository extends CrudRepository<MovieCollection, Integer> {
}
