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
import org.springframework.web.bind.annotation.RestController;

import com.DataVisa.Models.UserModel;
import com.DataVisa.Services.UserService;


@RestController
@CrossOrigin("origins = *")
public class DocumentController {
	
	@Autowired
	UserService userService;
	
	@GetMapping("/dataVisa/user/login/{email}/{senha}")
	public ResponseEntity<String> login(@PathVariable String email,@PathVariable int senha){
		return userService.findByEmailAndSenha(email, senha)
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
    public String deleteUser(@RequestBody UserModel user){
        return  userService.delete(user);
    }
    
    @GetMapping("/dataVisa/user/getAll")
	public List<UserModel> getAll(){
		return userService.findAll();
	}
	
}
