package com.collectorscorner.demo.controllers;

import com.collectorscorner.demo.data.UserRepository;
import com.collectorscorner.demo.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@Controller

public class FragmentsController {

    @Autowired
    private UserRepository userRepository;



    @PostMapping("/update-theme")
    public String updateTheme(@CookieValue(name = "userId") String myCookie, @RequestParam String theme) {
        if ("null".equals(myCookie)) {
            return "redirect:/login";
        }
        Integer userId = Integer.parseInt(myCookie);
        Optional<User> optUser = userRepository.findById(userId);
        if (optUser.isPresent()) {
            User user = optUser.get();
            user.setScreenMode(theme);
            userRepository.save(user);
            return "redirect:/search-collections";
        }
        return "redirect:/search-collections";
    }

}
