package com.DataVisa.Services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.DataVisa.Models.UserModel;
import com.DataVisa.Repositories.UserRepository;

@Service
public class UserService {
	
	@Autowired
	UserRepository userRepository;
	
	public Optional<String> save(UserModel user) {
		Optional<String> returnMessage;
		try {
			userRepository.save(user);
			returnMessage = Optional.of("Usuário cadastrado com sucesso!");
		} catch (Exception ex){
			 returnMessage = null; 
		}
		return returnMessage;
	}
	
	public Optional<UserModel> findByEmailAndSenha(String email, int senha){
		return userRepository.findByEmailAndSenha(email, senha);
	}
}
