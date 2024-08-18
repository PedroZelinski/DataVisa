package com.DataVisa.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.DataVisa.Models.UserModel;
import com.DataVisa.Services.UserService;

import jakarta.servlet.http.HttpSession;


@RestController
@CrossOrigin(origins = "*")
public class UserController {
	
	@Autowired
	UserService userService;
	
	@GetMapping("/dataVisa/user/login")
	public ResponseEntity<String> login(@RequestHeader("email") String email, @RequestHeader("senha") String senha){
		return userService.login(email, senha)
				.map(message -> ResponseEntity.ok(message))
				.orElse(ResponseEntity.notFound().build());
	}
	
	@GetMapping("/dataVisa/user/logout")
	public ResponseEntity<String> logout(){
		return userService.logout()
				.map(message -> ResponseEntity.ok(message))
				.orElse(ResponseEntity.notFound().build());
	}
	
	@GetMapping("/dataVisa/user/getUser/{id}")
	public ResponseEntity<UserModel> getUser(@PathVariable String id){
		return userService.findById(id)
				.map(record -> ResponseEntity.ok().body(record))
				.orElse(ResponseEntity.notFound().build());
	}
	
	@PostMapping("/dataVisa/user/addUser")
    public ResponseEntity<String> addUser(@RequestBody UserModel user){
        return  userService.save(user)
    		.map(message -> ResponseEntity.ok(message))
            .orElse(ResponseEntity.internalServerError().build());
    }
	
	@PutMapping("/dataVisa/user/updateUser")
    public ResponseEntity<String> updateUser(@RequestBody UserModel user){
		return  userService.save(user)
	    		.map(message -> ResponseEntity.ok(message))
	            .orElse(ResponseEntity.internalServerError().build());          
    }
	
    @DeleteMapping("/dataVisa/user/deleteUser")
    public ResponseEntity<String> deleteUser(@RequestBody UserModel user){
        return  userService.delete(user)
	    		.map(message -> ResponseEntity.ok(message))
	            .orElse(ResponseEntity.internalServerError().build()); 
    }
    
    @GetMapping("/dataVisa/user/getAll")
	public List<UserModel> getAll(){
		return userService.findAll();
	}
	
}
