package com.DataVisa.Services;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.DataVisa.Models.DBModel;
import com.DataVisa.Repositories.DBRepository;
import com.DataVisa.Session.DatavisaSession;

@Service
public class DBService{
	
	@Autowired
	DBRepository databaseRepository;
	
	@Autowired
	DatavisaSession datavisaSession;	
	

	public Optional<String> save(DBModel database) {
		try {
			//Verifica se o banco já existe
			if (databaseRepository.findById(database.getId()).isPresent()) {
				throw new IllegalArgumentException("Banco já cadastrado.");
			}
			
			databaseRepository.save(database);
			
		} catch (Exception ex){
			 return Optional.of("Ocorreu um erro, Banco não cadastrado! " + ex.getMessage()); 
		}
		return Optional.of("Banco cadastrado com sucesso!");
	}

	public String delete(DBModel database){
		try {
			
			//Verifica se o banco existe
			if (databaseRepository.findById(database.getId()).isEmpty()) {
                throw new RuntimeException("Usuário não encontrado.");
            }
			
			databaseRepository.delete(database);
			
			//Verifica se o banco foi excluido
            if (databaseRepository.findById(database.getId()).isPresent()) {
                throw new RuntimeException("Falha ao excluir o banco.");
            }
            
		} catch (Exception ex){
			return "Ocorreu um erro! " + ex.getMessage();			
		}
		
		return "Banco excluído com sucesso!";
	}

	public List<DBModel> findAll(){
		return databaseRepository.findAll();
	}

	public Optional<DBModel> findById(Long id){
		return databaseRepository.findById(id);
	}

	public Optional<String> setConnection(Long id) {
		if (!datavisaSession.isStatus())
			return  Optional.of("Erro: Login não efetuado!");
		try {
			DBModel db = findById(id).get();
			if(db.getEmpresaId().equals(datavisaSession.getEmpresaId()) || datavisaSession.getEmpresaId().equals(1L)) {
				setSessionConection(db);
				return Optional.of("Conetado ao banco " + db.getNomeConexao() + "!");
			}
		} catch (NoSuchElementException e) {
			return  Optional.of("Conexão não efetuada! \nErro: A conexão informada não existe!");
		} catch (Exception e) {
			return Optional.of("Conexão não efetuada! \nErro: " + e.getMessage() + " " + e.getClass().toString());
		}
		return Optional.of("Conexão não efetuada! \nErro: Usuário não percence a empresa desta conexão");
	}

	public Connection DatavisaConnection() throws SQLException{
		String url = "jdbc:mysql://localhost:3306/datavisa";
		String user = "root";
		String password = "1234";
		return DriverManager.getConnection(url, user, password);
	}

	public void setSessionConection(DBModel db) {
		String port = String.valueOf(db.getPortDb());
		String typeDB = db.getTipoDb().toLowerCase();
		datavisaSession.setConexao(db.getId());				
		datavisaSession.setUrl("jdbc:"+ typeDB + "://"+ db.getHostName() +":" + port + db.getCaminhoDb());
		datavisaSession.setUser(db.getUsuarioDb());
		datavisaSession.setPassword(db.getSenhaDb());
		
		datavisaSession.setConexaoAtiva(true);
	}

	public Connection ClientConnection() throws SQLException{
		return DriverManager.getConnection(datavisaSession.getUrl(), datavisaSession.getUser(), datavisaSession.getPassword());
	}
	
}
