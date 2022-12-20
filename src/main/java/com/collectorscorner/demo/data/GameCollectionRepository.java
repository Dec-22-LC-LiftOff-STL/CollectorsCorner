package com.collectorscorner.demo.data;

import com.collectorscorner.demo.models.GameCollection;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GameCollectionRepository extends CrudRepository<GameCollection, Integer> {
}
