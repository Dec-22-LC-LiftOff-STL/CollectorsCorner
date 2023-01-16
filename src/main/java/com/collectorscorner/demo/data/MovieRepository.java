package com.collectorscorner.demo.data;

import com.collectorscorner.demo.models.Movie;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MovieRepository extends CrudRepository<Movie, Integer> {

    Optional<Movie> findByTitleAndYearAndDirector(String title, int year, String director);

}
