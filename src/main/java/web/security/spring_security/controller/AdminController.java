package web.security.spring_security.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import web.security.spring_security.model.User;
import web.security.spring_security.service.UserService;

import java.security.Principal;

@Controller
@RequestMapping("/admin")
public class AdminController {

    private final UserService service;

    @Autowired
    public AdminController(UserService service) {
        this.service = service;
    }

    @GetMapping
    public String index(Principal principal,
                        Model model) {
        User user = service.findByEmail(principal.getName());
        model.addAttribute("user", user);
        return "users/admin";
    }
}
