package com.DataVisa.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.DataVisa.Models.UserModel;
import com.DataVisa.Repositories.UserRepository;
import com.DataVisa.Session.DatavisaSession;

import jakarta.servlet.http.HttpSession;

@Service
public class UserService {
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	DatavisaSession datavisaSession;

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
		if (datavisaSession.isStatus()) {
			return Optional.of("Usuario já logado!"
					+ "\nUsuário: " + datavisaSession.getNome());
		} 			
		try{
			UserModel user= userRepository.findByEmailAndSenha(email, senha).get();
			startSession(user);
			return Optional.of("Login efetuado com sucesso!"
					+ "\nUsuário: " + datavisaSession.getNome());
			
		} catch (Exception e) {
			datavisaSession.setStatus(false);
			return Optional.of("Credenciais inválidas!");
		}
	}
	
	public Optional<String> logout(){
		if (datavisaSession.isStatus()) {
			datavisaSession.setStatus(false);
			datavisaSession.setConexaoAtiva(false);
			return Optional.of("Logout realizado com sucesso!");
		}
		return Optional.of("Usuário não logado.");
	}
	
	public Optional<UserModel> findById(String email){
		return userRepository.findById(email);
	}
	
	public List<UserModel> findAll(){
		return userRepository.findAll();
	}
	
	private Optional<UserModel> findByAllFields (UserModel user){
		return userRepository.findByAllFields(user.getEmail(),user.getSenha(), user.getNome(), user.getEmpresaId(), user.getPermissaoTabela(),
				user.getEditaModelo(), user.getEditaConexao(), user.getNivelAcesso());
	}
	
	private void startSession (UserModel user) {
		datavisaSession.setStatus(true);
		datavisaSession.setEmail(user.getEmail());
		datavisaSession.setNome(user.getNome());
		datavisaSession.setEmpresaId(user.getEmpresaId());
		datavisaSession.setPermissaoTabela(user.getPermissaoTabela());
		datavisaSession.setEditaModelo(user.getEditaModelo());
		datavisaSession.setEditaConexao(user.getEditaConexao());
		datavisaSession.setNivelAcesso(user.getNivelAcesso());		
	}

}
