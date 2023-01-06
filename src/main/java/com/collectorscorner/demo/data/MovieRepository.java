package com.collectorscorner.demo.data;

import com.collectorscorner.demo.models.Movie;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MovieRepository extends CrudRepository<Movie, Integer> {


    boolean existsByTitleAndYearAndDirector(String title, int year, String director);
}
