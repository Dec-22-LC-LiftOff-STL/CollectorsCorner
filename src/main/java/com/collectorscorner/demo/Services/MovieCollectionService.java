package com.collectorscorner.demo.Services;

import com.collectorscorner.demo.data.MovieCollectionRepository;
import com.collectorscorner.demo.data.MovieRepository;
import com.collectorscorner.demo.models.Movie;
import com.collectorscorner.demo.models.MovieCollection;
import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MovieCollectionService {

    @Autowired
    private MovieCollectionRepository movieCollectionRepository;

    @Autowired
    private MovieRepository movieRepository;

    public void addMovie(@NotNull MovieCollection movieCollection, Movie movie) {

        Optional<Movie> existingMovie = movieRepository.findByTitleAndYearAndDirector(movie.getTitle(), movie.getYear(), movie.getDirector());
        if (existingMovie.isPresent()) {
            movieCollection.addMovie(existingMovie.get());
        } else {
            movie = movieRepository.save(movie);
            movieCollection.addMovie(movie);
        }
        movieCollectionRepository.save(movieCollection);
    }

    public void removeMovie(MovieCollection movieCollection, Movie movie) {
        movieCollection.removeMovie(movie);
        movieCollectionRepository.save(movieCollection);
    }

}
