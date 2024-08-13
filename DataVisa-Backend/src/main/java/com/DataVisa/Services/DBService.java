package com.DataVisa.Services;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.DataVisa.Models.DBModel;
import com.DataVisa.Models.UserModel;
import com.DataVisa.Repositories.DBRepository;

import tech.tablesaw.api.Table;

@Service
public class DBService {
	
	@Autowired
	DBRepository databaseRepository;
	
	private Connection conn() throws SQLException{
		String url = "jdbc:mysql://localhost:3306/dataVisa";
		String user = "root";
		String password = "1234";
		return DriverManager.getConnection(url, user, password);
	}
	
	
	public Optional<String> save(DBModel database) {
		try {
			//Verifica se o banco já existe
			if (databaseRepository.findById(database.getNomeConexao()).isPresent()) {
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
			if (databaseRepository.findById(database.getNomeConexao()).isEmpty()) {
                throw new RuntimeException("Usuário não encontrado.");
            }
			
			databaseRepository.delete(database);
			
			//Verifica se o banco foi excluido
            if (databaseRepository.findById(database.getNomeConexao()).isPresent()) {
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
	
	public Optional<DBModel> findById(String id){
		return databaseRepository.findById(id);
	}
	
	public String getTableCollumns(String tabela){
		
		String query = "select * from " + tabela;
		List<String> retornoArray = new ArrayList<>();
		
		try (Connection conn = conn()){
			PreparedStatement stmt = conn.prepareStatement(query);
			ResultSet rs = stmt.executeQuery();
			
			Table t = Table.read().db(rs, tabela);
			
			//retorna as colunas existentes na tabbela
			for (int i = 0; i < t.columnCount(); i++)
				retornoArray.add(t.columnNames().get(i));
			
			conn.close();
			return retornoArray.toString();
			
		} catch (SQLException e) {
			return "Erro: " + e.getMessage();
		}
	}
	
	public String getCollumnFields(String tabela, String campo){
			
			String query = "select * from " + tabela;
			String retorno = "";		
			
			try (Connection conn = conn()){
				PreparedStatement stmt = conn.prepareStatement(query);
				ResultSet rs = stmt.executeQuery();
				
				Table t = Table.read().db(rs, tabela);
				
				//retorna os dados de uma coluna específica da tabela
				retorno = t.stringColumn(campo).print();
				retorno = retorno.contains("\n") ? retorno.substring(retorno.indexOf('\n') + 1): retorno;
				
				conn.close();
				return retorno.trim();
				
			} catch (SQLException e) {
				return "Erro: " + e.getMessage();
			}
	}
	
}
