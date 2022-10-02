package web.security.spring_security;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import web.security.spring_security.model.Role;
import web.security.spring_security.model.User;
import web.security.spring_security.service.RoleService;
import web.security.spring_security.service.UserService;

import java.util.HashSet;
import java.util.Set;

@SpringBootApplication
public class SpringSecurityApplication {

    public static void main(String[] args) {
//        ApplicationContext context =
                SpringApplication.run(SpringSecurityApplication.class, args);


//        UserService service = context.getBean(UserService.class);
//        RoleService roleService = context.getBean(RoleService.class);
//
//        Role role1 = new Role("USER");
//        Role role2 = new Role("ADMIN");
//        roleService.addRole(role1);
//        roleService.addRole(role2);
//
//
//        Set<Role> roles1 = new HashSet<>();
//
//        roles1.add(role1);
//        User user1 = new User("user", "user", "User", "Userov", 21);
//        user1.setRoles(roles1);
//        service.saveUser(user1);
//
//        Set<Role> roles2 = new HashSet<>();
//        roles2.add(role2);
//        User user2 = new User("admin", "admin", "Admin", "Adminov",23);
//        user2.setRoles(roles2);
//        service.saveUser(user2);
    }
}
