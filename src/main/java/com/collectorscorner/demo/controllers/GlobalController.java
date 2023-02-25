package com.collectorscorner.demo.controllers;

import com.collectorscorner.demo.data.UserRepository;
import com.collectorscorner.demo.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.ModelAttribute;

import java.util.Optional;

@ControllerAdvice
public class GlobalController {

    @Autowired
    private UserRepository userRepository;

    @ModelAttribute("screenMode")
    public String fragments(@CookieValue(name = "userId") String myCookie, Model model) {
        if ("null".equals(myCookie)) {
            return "redirect:/login";
        }
        Integer userId = Integer.parseInt(myCookie);
        Optional<User> optUser = userRepository.findById(userId);
        if (optUser.isPresent()) {
            User user = optUser.get();
            return user.getScreenMode();
        }
        return "";
    }

    @ModelAttribute("username")
    public String username(@CookieValue(name = "userId") String myCookie) {
        if ("null".equals(myCookie)) {
            return "redirect:/login";
        }
        Integer userId = Integer.parseInt(myCookie);
        Optional<User> optUser = userRepository.findById(userId);
        if (optUser.isPresent()) {
            User user = optUser.get();
            return user.getUsername();
        }
        return "";
    }

}
