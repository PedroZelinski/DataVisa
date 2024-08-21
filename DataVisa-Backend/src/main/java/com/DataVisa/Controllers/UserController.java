package com.DataVisa.Controllers;

import java.util.List;
import java.util.Optional;

import org.apache.commons.lang3.tuple.Pair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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


@RestController
@CrossOrigin(origins = "*")
public class UserController {
	
	@Autowired
	UserService userService;
	
	@GetMapping("/dataVisa/user/login")
	public ResponseEntity<String> login(@RequestHeader("email") String email, @RequestHeader("senha") String senha){
		Pair<String, HttpStatus> result = userService.login(email, senha);
	    return new ResponseEntity<>(result.getLeft(), result.getRight());
	}
	
	@GetMapping("/dataVisa/user/logout")
	public ResponseEntity<String> logout(){
		return userService.logout()
				.map(message -> ResponseEntity.ok(message))
				.orElse(ResponseEntity.notFound().build());
	}
	
	@GetMapping("/dataVisa/user/getUser/{email}")
	public ResponseEntity<?> getUser(@PathVariable String email){
		Pair<Optional<UserModel>, String> result = userService.findById(email);

		 if (result.getLeft().isPresent()) {
		        return ResponseEntity.ok(result.getLeft().get());
		    } else {
		        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(result.getRight());
		    }
	}
	
	@PostMapping("/dataVisa/user/addUser")
    public ResponseEntity<String> addUser(@RequestBody UserModel user){
        return  userService.save(user)
    		.map(message -> ResponseEntity.ok(message))
            .orElse(ResponseEntity.internalServerError().build());
    }
	
	@PutMapping("/dataVisa/user/updateUser")
    public ResponseEntity<String> updateUser(@RequestBody UserModel user){
		return  userService.updateUser(user)
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
