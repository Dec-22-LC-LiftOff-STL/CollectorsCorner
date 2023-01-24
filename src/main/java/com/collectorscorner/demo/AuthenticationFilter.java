package com.collectorscorner.demo;

import com.collectorscorner.demo.controllers.AuthenticationController;
import com.collectorscorner.demo.data.UserRepository;
import com.collectorscorner.demo.models.User;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.servlet.HandlerInterceptor;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

@Controller
public class AuthenticationFilter implements HandlerInterceptor {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthenticationController authenticationController;

    private static final List<String> whitelist = Arrays.asList("/login", "/register", "/logout", "/css", "/images", "/collector");


    // Override prehandle method to see if a user is logged in and in a session before allowing get/post requests
    @Override
    public boolean preHandle(HttpServletRequest request,
                             HttpServletResponse response,
                             Object handler
    ) throws IOException {
// is the uri part of the whitelist?
        if(isWhitelisted(request.getRequestURI())){
            return true;
        }
        HttpSession session = request.getSession();

        User user = authenticationController.getUserFromSession(session);

        if (user != null){
            return true;
        }

        response.sendRedirect("/login");
        return false;
    }


    //Check if the address Starts with /pathRoot
    private static boolean isWhitelisted(String path) {
        for (String pathRoot : whitelist) {
            if (path.startsWith(pathRoot)) {
                return true;
            }
        }
        return false;
    }




}