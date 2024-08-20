package com.DataVisa.Services;

import java.util.List;
import java.util.Optional;

import org.apache.commons.lang3.tuple.Pair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.DataVisa.Models.UserModel;
import com.DataVisa.Repositories.UserRepository;
import com.DataVisa.Session.DatavisaSession;

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
	
	public Optional<String> updateUser(UserModel user) {
		
		String status;
		if (!(status = checkStatus()).isEmpty())
			return  Optional.of(status);
		if (!(status = checkUserPermition()).isEmpty())
			return  Optional.of(status);
		
		try {
			//Verifica se o usuário já existe
			if (userRepository.findByEmail(user.getEmail()).isEmpty()) {
				throw new IllegalArgumentException("Email não cadastrado.");
			}
			userRepository.save(user);
			
		} catch (Exception ex){
			 return Optional.of("Falhao ao atualizar usuário! \nErro: " + ex.getMessage()); 
		}
		return Optional.of("Usuário atualizado com sucesso!");
	}


	public Optional<String> delete(UserModel user){
		
		String status;
		if (!(status = checkStatus()).isEmpty())
			return  Optional.of(status);
		if (!(status = checkUserPermition()).isEmpty())
			return  Optional.of(status);
		
		try {
			//Verifica se o registro existe
			if (userRepository.findByEmail(user.getEmail()).isEmpty()) {
				throw new IllegalArgumentException("Usuário não cadastrado.");
			}
			
			//verifica se os dados são consistentes
			user = findByAllFields(user).get();
			
			userRepository.delete(user);
			
			//Verifica se o registro foi excluido
            if (userRepository.findById(user.getEmail()).isPresent()) {
                throw new RuntimeException("Usuário não removido.");
            }
            
		} catch (Exception ex){
			return Optional.of("Falha ao excluir o usuário! \nErro: " + ex.getMessage());			
		}
		
		return Optional.of("Usuário excluído com sucesso!");
	}

	public Optional<String> login(String email, String senha){
		if (checkStatus().isEmpty()) {
			return Optional.of("Erro: Usuario já logado!"
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

	public Pair<Optional<UserModel>, String> findById(String email){
		
		String status;
		if (!(status = checkStatus()).isEmpty()) {
	        return Pair.of(Optional.empty(), status);
	    }

	    if (!(status = checkUserPermition()).isEmpty()) {
	        return Pair.of(Optional.empty(), status);
	    }
	    Optional<UserModel> user = userRepository.findById(email);
	    return Pair.of(user, user.isPresent() ? "" : "Usuário não encontrado");
	}

	
	public List<UserModel> findAll(){
		return userRepository.findAll();
	}

	public Optional<UserModel> findByAllFields (UserModel user){
		return userRepository.findByAllFields(user.getEmail(),user.getSenha(), user.getNome(), user.getEmpresaId(), user.getPermissaoTabela(),
				user.getEditaModelo(), user.getEditaConexao(), user.getNivelAcesso());
	}

	public String checkStatus() {
		if (!datavisaSession.isStatus())
			return "Erro: Login não efetuado!";
		return "";
	}
	
	public String checkConnection(Long conexao, String tabela) {
		if(!datavisaSession.isConexaoAtiva())
			return "Erro: Nenhuma conexão ativa! \nConecte a um banco e tente novamente.";
		return "";
	}
	
	public String checkUserPermition() {
		if(datavisaSession.getNivelAcesso() > 1)
			return "Erro: O usuário não possui permissão para realizar a esta ação.";
		return "";
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

