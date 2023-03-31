package com.collectorscorner.demo.controllers;

import com.collectorscorner.demo.data.UserRepository;
import com.collectorscorner.demo.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Optional;

@Controller
public class ProfileController {

    @Autowired
    private UserRepository userRepository;

    private final String profilePictureDirectory = "src/main/resources/static/profile-pictures/";

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

    @GetMapping("/profile/{profileUsername}")
    public String getUserById(@CookieValue(name = "userId") String myCookie, @PathVariable String profileUsername, Model model) {
        model.addAttribute("profilePicture", userRepository.findByUsername(profileUsername).getProfilePicturePath());
        Integer userId = Integer.parseInt(myCookie);
        Optional<User> optUser = userRepository.findById(userId);
        if (optUser.isPresent()) {
            User user = optUser.get();
            model.addAttribute("username", user.getUsername());
            String userUsername = user.getUsername();
            boolean isSelf = userUsername.equals(profileUsername);
            model.addAttribute("userUsername", userUsername);
            model.addAttribute("screenMode", user.getScreenMode());
            model.addAttribute("isSelf", isSelf);
        }
        return "profile.html";
    }

    @PostMapping("/profile/{username}/upload-profile-picture")
    public String uploadSheetMusic(@RequestParam("file") MultipartFile file, RedirectAttributes attributes, @PathVariable String username, @CookieValue(name = "userId") String myCookie) {
        // check if file is empty
        if (file.isEmpty()) {
            attributes.addFlashAttribute("message", "Please select a file to upload.");
            return "redirect:/profile/{username}";
        }

        // normalize the file path
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        Integer userId = Integer.parseInt(myCookie);
        Optional<User> optUser = userRepository.findById(userId);
        if (optUser.isPresent()) {
            User user = optUser.get();
            user.setProfilePicturePath(fileName);
            userRepository.save(user);
        }
        // save the file on the local file system
        try {
            Path path = Paths.get(profilePictureDirectory + fileName);
            Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return "redirect:.";
    }

}
