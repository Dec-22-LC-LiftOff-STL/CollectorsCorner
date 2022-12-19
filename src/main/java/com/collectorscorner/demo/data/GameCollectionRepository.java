package com.collectorscorner.demo.data;

import com.collectorscorner.demo.models.GameCollection;
import org.springframework.data.repository.CrudRepository;

public interface GameCollectionRepository extends CrudRepository<GameCollection, Integer> {
}
