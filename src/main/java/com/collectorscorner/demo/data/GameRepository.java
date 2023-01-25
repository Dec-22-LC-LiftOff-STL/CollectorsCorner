package com.collectorscorner.demo.data;

import com.collectorscorner.demo.models.Game;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface GameRepository extends CrudRepository<Game, Integer> {

    Optional<Game> findByTitleAndDescription(String title, String description);

}
