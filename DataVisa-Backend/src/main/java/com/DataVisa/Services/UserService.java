package com.DataVisa.Services;

import java.util.List;
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
		try {
			//Verifica se o usuário já existe
			if (userRepository.findByEmail(user.getEmail()).isPresent()) {
				throw new IllegalArgumentException("Usuário já existente.");
			}
			userRepository.save(user);
			
		} catch (Exception ex){
			 return Optional.of("Ocorreu um erro, Usuário não cadastrado! " + ex.getMessage()); 
		}
		return Optional.of("Usuário cadastrado com sucesso!");
	}
	
	public String delete(UserModel user){
		try {
			
			//Verifica se o registro existe
			Optional<UserModel> optionalUser = findByAllFields(user);
			if (optionalUser.isEmpty()) {
                throw new RuntimeException("Usuário não encontrado.");
            }
			
			userRepository.delete(user);
			
			//Verifica se o registro foi excluido
            if (userRepository.findById(user.getEmail()).isPresent()) {
                throw new RuntimeException("Falha ao excluir o usuário.");
            }
            
		} catch (Exception ex){
			return "Ocorreu um erro! " + ex.getMessage();			
		}
		
		return "Usuário excluído com sucesso!";
	}

	
	public Optional<String> login(String email, String senha){
		if (userRepository.findByEmailAndSenha(email, senha).isPresent()) {
			return Optional.of("Login efetuado com sucesso!");
		}
		return Optional.of("Credenciais inválidas!");
	}
	
	public Optional<UserModel> findById(String email){
		return userRepository.findById(email);
	}
	
	public List<UserModel> findAll(){
		return userRepository.findAll();
	}
	
	private Optional<UserModel> findByAllFields (UserModel user){
		return userRepository.findByAllFields(user.getEmail(),user.getSenha(), user.getNome(), user.getDepartamento(),
				user.getEditaModelo(), user.getEditaConexao(), user.getNivelAcesso());
	}
}
