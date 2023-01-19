package com.collectorscorner.demo.controllers;

import com.collectorscorner.demo.Services.BookCollectionService;
import com.collectorscorner.demo.Services.GameCollectionService;
import com.collectorscorner.demo.data.BookCollectionRepository;
import com.collectorscorner.demo.data.BookRepository;
import com.collectorscorner.demo.data.GameCollectionRepository;
import com.collectorscorner.demo.data.GameRepository;
import com.collectorscorner.demo.models.Book;
import com.collectorscorner.demo.models.BookCollection;
import com.collectorscorner.demo.models.Game;
import com.collectorscorner.demo.models.GameCollection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@Controller
@RequestMapping("games")
public class GamesController {

    @Autowired
    private GameRepository gameRepository;

    @Autowired
    private GameCollectionRepository gameCollectionRepository;

    @Autowired
    private GameCollectionService gameCollectionService;

    @GetMapping("search")
    public String displaySearchPage(@CookieValue(name = "userId") String myCookie, Model model) {
        model.addAttribute(new Game());
        if ("null".equals(myCookie)) {
            return "redirect:/login";
        }
        Integer userId = Integer.parseInt(myCookie);
        Iterable<GameCollection> iterableGameCollection = gameCollectionRepository.findAll();
        model.addAttribute("gameCollections", iterableGameCollection);
        model.addAttribute("cookie", userId);
        return "games/search";
    }

    @PostMapping("search")
    public String processAddGameFormOnSearchPage(@ModelAttribute Game game, @RequestParam("collectionId") Integer collectionId) {
        Optional<Game> existingGame = gameRepository.findByTitleAndDescription(game.getTitle(), game.getDescription());
        if (existingGame.isPresent()) {
            Optional<GameCollection> optionalGameCollection = gameCollectionRepository.findById(collectionId);
            if (optionalGameCollection.isPresent()) {
                GameCollection gameCollection = (GameCollection) optionalGameCollection.get();
                gameCollectionService.addGame(gameCollection, existingGame.get());
            }
        } else {
            Optional<GameCollection> optionalGameCollection = gameCollectionRepository.findById(collectionId);
            if (optionalGameCollection.isPresent()) {
                GameCollection gameCollection = (GameCollection) optionalGameCollection.get();
                gameCollectionService.addGame(gameCollection, game);
            }
        }
        return "redirect:/games/search";
    }
    @GetMapping("details/{gameTitle}")
    public String displayViewGameDetailsPage(Model model, @PathVariable String gameTitle) {
        model.addAttribute("gameTitle", gameTitle);
        model.addAttribute("games", gameRepository.findAll());
        return "games/details";
    }
}
