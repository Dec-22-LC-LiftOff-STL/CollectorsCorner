package com.collectorscorner.demo.controllers;

import com.collectorscorner.demo.Services.BookCollectionService;
import com.collectorscorner.demo.Services.GameCollectionService;
import com.collectorscorner.demo.data.*;
import com.collectorscorner.demo.models.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("games")
public class GamesController {

    @Autowired
    private GameRepository gameRepository;
    @Autowired
    private UserRepository userRepository;
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
        Iterable<User> iterableUsers = userRepository.findAll();
        model.addAttribute("gameCollections", iterableGameCollection);
        model.addAttribute("cookie", userId);
        model.addAttribute("iterableUsers", iterableUsers);
        //Create HashMap to be interpreted by JS as an object. Key = collectionId, Value = Movies in that collection
        List<Integer> keys = new ArrayList<>();
        List<String> values = new ArrayList<>();
        HashMap<Integer, String> collectionIdsAndGames = new HashMap<>();
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent()) {
            User thisUser = optionalUser.get();
            model.addAttribute("username", thisUser.getUsername());
            model.addAttribute("screenMode", thisUser.getScreenMode());
            List<GameCollection> thisUsersCollections = thisUser.getUserGameCollection();
            for (GameCollection gameCollection : thisUsersCollections) {
                keys.add(gameCollection.getId());
                String gameString = gameCollection.getGames().toString();
                values.add(gameString);
            }
            for (int i=0; i<keys.size(); i++) {
                collectionIdsAndGames.put(keys.get(i), values.get(i));
            }
            model.addAttribute("collectionIdsAndGames", collectionIdsAndGames);
        }
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
    public String displayViewGameDetailsPage(Model model, @PathVariable String gameTitle,@CookieValue(name = "userId") String myCookie) {
        Integer userId = Integer.parseInt(myCookie);
        Optional<User> optUser = userRepository.findById(userId);
        if (optUser.isPresent()) {
            User user = optUser.get();
            model.addAttribute("username", user.getUsername());
            model.addAttribute("screenMode", user.getScreenMode());
        }
        Iterable<GameCollection> allGameCollections = gameCollectionRepository.findAll();
        String collectorName = "";
        ArrayList<GameCollection> foundGames = new ArrayList<>();
        for (GameCollection collection : allGameCollections) {
            for (int i = 0; i < collection.getGames().size(); i++){
                if (collection.getGames().get(i).getTitle().equals(gameTitle)) {
                    foundGames.add(collection);
                    collectorName = collection.getUser().getUsername();
                }
            }
        }
        model.addAttribute("collectionsWithThisGame", foundGames);
        model.addAttribute("gameTitle", gameTitle);
        model.addAttribute("games", gameRepository.findAll());
        model.addAttribute("collectorName", collectorName);

        return "games/details";
    }
}
