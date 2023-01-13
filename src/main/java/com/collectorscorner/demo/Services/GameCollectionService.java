package com.collectorscorner.demo.Services;

import com.collectorscorner.demo.data.BookCollectionRepository;
import com.collectorscorner.demo.data.BookRepository;
import com.collectorscorner.demo.data.GameCollectionRepository;
import com.collectorscorner.demo.data.GameRepository;
import com.collectorscorner.demo.models.Book;
import com.collectorscorner.demo.models.BookCollection;
import com.collectorscorner.demo.models.Game;
import com.collectorscorner.demo.models.GameCollection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class GameCollectionService {

    @Autowired
    private GameCollectionRepository gameCollectionRepository;

    @Autowired
    private GameRepository gameRepository;

    public void addGame(GameCollection gameCollection, Game game) {

        Optional<Game> existingGame = gameRepository.findByTitleAndDescription(game.getTitle(), game.getDescription());
        if (existingGame.isPresent()) {
            gameCollection.addGame(existingGame.get());
        } else {
            game = gameRepository.save(game);
            gameCollection.addGame(game);
        }
        gameCollectionRepository.save(gameCollection);
    }

    public void removeGame(GameCollection gameCollection, Game game) {
        gameCollection.removeGame(game);
        gameCollectionRepository.save(gameCollection);
    }

}
