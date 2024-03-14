package com.DataVisa.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.DataVisa.Models.UserModel;
import com.DataVisa.Services.UserService;


@RestController
@CrossOrigin("origins = *")
public class UserController {
	
	@Autowired
	UserService userService;
	
	@PostMapping("/dataVisa/userSave")
    public ResponseEntity<String> addUser(@RequestBody UserModel user){
        return  userService.save(user)
    		.map(message -> ResponseEntity.ok(message))
            .orElse(ResponseEntity.internalServerError().build());
    }
	
	@GetMapping("/dataVisa/login/{email}/{senha}")
    public ResponseEntity<UserModel> 
        login(@PathVariable String email,@PathVariable int senha){
        return userService.findByEmailAndSenha(email, senha)
    		.map(record -> ResponseEntity.ok().body(record))
    		.orElse(ResponseEntity.notFound().build());
    }
	
	

}
