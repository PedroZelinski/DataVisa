package com.DataVisa.Services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.apache.commons.lang3.tuple.Pair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.DataVisa.DTO.DatavisaSessionDTO;
import com.DataVisa.DTO.DatavisaUserDTO;
import com.DataVisa.Models.UserModel;
import com.DataVisa.Repositories.UserRepository;
import com.DataVisa.Session.DatavisaSession;

@Service
public class UserService {
	
	@Autowired
	UserRepository userRepository;

	@Autowired
	DatavisaSession datavisaSession;
	
	@Autowired
	@Lazy
	TableService tableService;
	
public Pair<DatavisaSessionDTO, HttpStatus> login(String email, String senha){
		
		DatavisaSessionDTO datavisaResponse = new DatavisaSessionDTO(datavisaSession);
		if (datavisaSession.checkStatus().getRight().equals(HttpStatus.ACCEPTED)) {
			datavisaResponse.setMensagemRetorno("Usuario já logado!"
					+ "\nUsuário: " + datavisaSession.getNome());
			return Pair.of(datavisaResponse, HttpStatus.CONFLICT);
		} 			
		try{
			UserModel user= userRepository.findByEmailAndSenha(email, senha).get();
			datavisaResponse = startSession(user);
			
			return Pair.of(datavisaResponse, HttpStatus.OK);
			
		} catch (Exception e) {
			datavisaSession.setStatus(false);
			datavisaResponse.setStatus(false);
			datavisaResponse.setMensagemRetorno("Credenciais inválidas!");
			return Pair.of(datavisaResponse, HttpStatus.NOT_ACCEPTABLE);
		}
	}

	public Pair<String, HttpStatus> logout(){
		if (datavisaSession.isStatus()) {
			datavisaSession.setStatus(false);
			datavisaSession.setConexaoAtiva(false);
			return Pair.of("Logout realizado com sucesso!", HttpStatus.OK);
		}
		return Pair.of("Erro: Usuário não logado.", HttpStatus.BAD_REQUEST);
	}
	
	public Pair<String, HttpStatus> create(UserModel user) {
		
		try {
			//Verifica se o usuário já existe
			if (userRepository.findByEmail(user.getEmail()).isPresent()) {
				throw new IllegalArgumentException("Usuário já existente.");
			}
			userRepository.save(user);
			
		} catch (Exception ex){
			 return Pair.of("Usuário não cadastrado! \nErro: " + ex.getMessage(), HttpStatus.NOT_FOUND); 
		}
		return Pair.of("Usuário cadastrado com sucesso!", HttpStatus.OK);
	}
	
	public Pair<String, HttpStatus> update(UserModel user) {
		
		Pair<String, HttpStatus> response;
		if (!(response = datavisaSession.checkStatus()).getRight().equals(HttpStatus.ACCEPTED))
			return Pair.of(response);
		if (!(response = datavisaSession.checkDatavisaPermition(3)).getRight().equals(HttpStatus.ACCEPTED))
			return Pair.of(response);
		
		try {
			
			//Verifica se o registro existe
			if (userRepository.findByEmail(user.getEmail()).isEmpty()) {
				return Pair.of("Erro: Usuário informado não encontrado. Verifique os valores fornecidos.", HttpStatus.NOT_FOUND);
			}
			
			userRepository.save(user);
			
		} catch (Exception ex){
			 return Pair.of("Falhao ao atualizar usuário! \nErro: " + ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR); 
		}
		return Pair.of("Usuário atualizado com sucesso!", HttpStatus.OK);
	}


	public Pair<String, HttpStatus> delete(UserModel user){
		
		Pair<String, HttpStatus> response;
		if (!(response = datavisaSession.checkStatus()).getRight().equals(HttpStatus.ACCEPTED))
			return Pair.of(response);
		if (!(response = datavisaSession.checkDatavisaPermition(1)).getRight().equals(HttpStatus.ACCEPTED))
			return Pair.of(response);
		
			//Verifica se o registro existe
			if (userRepository.findByEmail(user.getEmail()).isEmpty()) {
				return Pair.of("Erro: Usuário informado não encontrado. Verifique os valores fornecidos.", HttpStatus.NOT_FOUND);
			}
			
			//verifica se os dados são consistentes
			try {
				user = findByAllFields(user).get();
			
				userRepository.delete(user);
				
				//Verifica se o registro foi excluido
	            if (userRepository.findById(user.getEmail()).isPresent()) {
	            	return Pair.of("Erro: Erro interno.", HttpStatus.INTERNAL_SERVER_ERROR);
	            }
            
            		
	            return Pair.of("Usuário excluído com sucesso!", HttpStatus.OK);
			} catch (Exception e) {
	            return Pair.of("Erro: Usuário inválido. Verifique os valores fornecidos e tente novamente.", HttpStatus.NOT_FOUND);
			}
	}

	public Pair<DatavisaUserDTO, HttpStatus> findById(String email){
		
		DatavisaUserDTO userResponseDTO = new DatavisaUserDTO();
		Pair<String, HttpStatus> response;
		
		if (!(response = datavisaSession.checkStatus()).getRight().equals(HttpStatus.ACCEPTED)) {
			userResponseDTO.setMensagemRetorno(response.getLeft());
	        return Pair.of(userResponseDTO,  response.getRight());
	    }
	    if (!(response = datavisaSession.checkDatavisaPermition(1)).getRight().equals(HttpStatus.ACCEPTED)) {
			userResponseDTO.setMensagemRetorno(response.getLeft());
	        return Pair.of(userResponseDTO, response.getRight());
	    }
	    
	    try {
	    	UserModel user = userRepository.findById(email).get();
	    	userResponseDTO = new DatavisaUserDTO(user);
	    	
	    	if (user.getPermissaoTabela() == 100) {
	    		userResponseDTO.setDepartamentos("Pendente");
	    		return Pair.of(userResponseDTO,HttpStatus.OK);
	    	}
	    	
	    	if (!(response = datavisaSession.checkEmpresaPermition(user.getEmpresaId())).getRight().equals(HttpStatus.ACCEPTED)) {
	    		userResponseDTO = new DatavisaUserDTO(response.getLeft());
	    		return  Pair.of(userResponseDTO, response.getRight());
	    	}
	    	String nomeEmpresa = tableService.getNomeEmpresa(user.getEmpresaId());
	    	userResponseDTO.setEmpresaNome(nomeEmpresa);
	    	userResponseDTO.setDepartamentos(tableService.getDatavisaCollumnFields(nomeEmpresa + "_permissoes", "nome"));
	    	userResponseDTO.setDepartamento(getDepartamento(user, nomeEmpresa));

	    	
	    } catch (Exception e) {
	    	userResponseDTO = new DatavisaUserDTO("Usuário não encontrado");
		    return Pair.of(userResponseDTO,HttpStatus.NOT_FOUND);
	    }
	    return Pair.of(userResponseDTO,HttpStatus.OK);
	}

	
	public Pair<Object, HttpStatus> findAll(){
		
		Pair<String, HttpStatus> response;
		if (!(response = datavisaSession.checkStatus()).getRight().equals(HttpStatus.ACCEPTED)) {
	        return Pair.of(response,  response.getRight());
	    }
	    if (!(response = datavisaSession.checkDatavisaPermition(1)).getRight().equals(HttpStatus.ACCEPTED)) {
	        return Pair.of(response, response.getRight());
	    }

	    List<UserModel> userList = datavisaSession.getEmpresaId().equals(1L) ?
	        userRepository.findAll():
	        userRepository.findAllByEmpresaId(datavisaSession.getEmpresaId());
	    
	    try {
	        List<DatavisaUserDTO> dtoList = userList.stream().map(userModel -> {
	            DatavisaUserDTO dto = new DatavisaUserDTO(userModel);
	            try {
	                String nomeEmpresa = tableService.getNomeEmpresa(userModel.getEmpresaId());
	                dto.setEmpresaNome(nomeEmpresa);
	                dto.setDepartamento(getDepartamento(userModel, nomeEmpresa));
	            } catch (Exception e) {
	                // Tratar exceção de forma apropriada, como logar o erro e definir valores padrão
	                dto.setEmpresaNome("Erro ao obter nome da empresa");
	                dto.setDepartamento("Erro ao obter departamento");
	            }
	            return dto;
	        }).collect(Collectors.toList());

	        return Pair.of(dtoList, HttpStatus.OK);
	    } catch (Exception e) {
	        return Pair.of("Erro ao processar a lista de usuários", HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	    
	}

	public Optional<UserModel> findByAllFields (UserModel user){
		return userRepository.findByAllFields(user.getEmail(), user.getNome(), user.getEmpresaId(), user.getPermissaoTabela(), user.getNivelAcesso());
	}
	
	private DatavisaSessionDTO startSession (UserModel user) throws Exception {
		datavisaSession.setStatus(true);
		datavisaSession.setEmail(user.getEmail());
		datavisaSession.setNome(user.getNome());
		datavisaSession.setEmpresaId(user.getEmpresaId());
		datavisaSession.setPermissaoTabela(user.getPermissaoTabela());
		datavisaSession.setNivelAcesso(user.getNivelAcesso());
		datavisaSession.setTemplates(user.getTemplates());
		
		if (datavisaSession.getPermissaoTabela() != 100) {
				String nomeEmpresa =  tableService.getNomeEmpresa(user.getEmpresaId());
				datavisaSession.setEmpresaNome(nomeEmpresa);
				datavisaSession.setDepartamento(getDepartamento(user, nomeEmpresa));
		} else {
			datavisaSession.setEmpresaNome("Sem empresa");
			datavisaSession.setDepartamento("Pendente");
		}

		DatavisaSessionDTO datavisaResponse = new DatavisaSessionDTO(datavisaSession);
		
		datavisaResponse.setMensagemRetorno("Login efetuado com sucesso!"
				+ "\nUsuário: " + datavisaSession.getNome());
		
		return datavisaResponse;
	}
	
	public String getDepartamento (UserModel user, String nomeEmpresa) throws Exception {
		String query = "select nome from " + nomeEmpresa + "_permissoes where permissao_tabela = " + String.valueOf(user.getPermissaoTabela());
		String departamento = tableService.getDatavisaTable(query , nomeEmpresa +"_permissoes").stringColumn("nome").print();
		departamento = departamento.substring(departamento.indexOf('\n') + 1).trim();
		return departamento;
		
	}
	
	
}

