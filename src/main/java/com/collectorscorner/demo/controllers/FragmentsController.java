package com.collectorscorner.demo.controllers;

import com.collectorscorner.demo.data.UserRepository;
import com.collectorscorner.demo.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@Controller

public class FragmentsController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/fragments")
    public String fragments(@CookieValue(name = "userId") String myCookie, Model model) {
        Integer userId = Integer.parseInt(myCookie);
        Optional<User> optUser = userRepository.findById(userId);
        if (optUser.isPresent()) {
            User user = optUser.get();
            model.addAttribute("username", user.getUsername());
        }
        return "fragments";
    }




}
