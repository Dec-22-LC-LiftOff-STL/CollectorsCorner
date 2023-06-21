package com.collectorscorner.demo.data;

import com.collectorscorner.demo.models.MovieCollectedItemId;
import com.collectorscorner.demo.models.MovieSideNote;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MovieSideNoteRepository extends CrudRepository<MovieSideNote, MovieCollectedItemId> {
                MovieSideNote findByMovieSideNote(String movieSideNote);
                MovieSideNote findByMovieCollectionIdAndMoviesId(int movieCollectionId, int moviesId);

}