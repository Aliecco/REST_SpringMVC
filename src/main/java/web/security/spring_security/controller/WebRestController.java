package web.security.spring_security.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;
import web.security.spring_security.model.User;
import web.security.spring_security.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/api")
public class WebRestController {

    private final UserService service;

    @Autowired
    public WebRestController(UserService service) {
        this.service = service;
    }

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return service.findAll();
    }

    @GetMapping("/users/{id}")
    public User getUserById(@PathVariable Long id) {
        return service.findById(id);
    }

    @PostMapping("/users")
    public void create(@RequestBody User user) {
        service.saveUser(user);
    }

    @PutMapping("/users")
    public void update(@RequestBody User user){
        service.updateUser(user);
    }

    @DeleteMapping("/users/{id}")
    public void delete(@PathVariable("id") Long id) {
        service.deleteById(id);
    }
}
