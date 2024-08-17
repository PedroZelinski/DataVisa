package com.DataVisa.Services;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.DataVisa.Models.DocumentModel;
import com.DataVisa.Models.UserModel;
import com.DataVisa.Repositories.DocumentRepository;

import tech.tablesaw.api.Table;

@Service
public class DocumentService {
	
	@Autowired
	DocumentRepository documentRepository;
	
	
	public Optional<String> save(DocumentModel document) {
		try {
			//Verifica se o documento já existe
			if (documentRepository.findById(document.getId()).isPresent()) {
				throw new IllegalArgumentException("Documento já cadastrado.");
			}
			
			documentRepository.save(document);
			
		} catch (Exception ex){
			 return Optional.of("Ocorreu um erro, Documento não cadastrado! " + ex.getMessage()); 
		}
		return Optional.of("Documento cadastrado com sucesso!");
	}
	
	public String delete(DocumentModel document){
		try {
			
			//Verifica se o documento existe
			if (documentRepository.findById(document.getId()).isEmpty()) {
                throw new RuntimeException("Usuário não encontrado.");
            }
			
			documentRepository.delete(document);
			
			//Verifica se o documento foi excluido
            if (documentRepository.findById(document.getId()).isPresent()) {
                throw new RuntimeException("Falha ao excluir o documento.");
            }
            
		} catch (Exception ex){
			return "Ocorreu um erro! " + ex.getMessage();			
		}
		
		return "Documento excluído com sucesso!";
	}

	public Optional<DocumentModel> findById(Long id){
		return documentRepository.findById(id);
	}
	
	public List<DocumentModel> findAll(){
		return documentRepository.findAll();
	}
	
	public String getTable(String tabela){
		
		String query = "select * from " + tabela;
		
		try (Connection conn = conn()){
			PreparedStatement stmt = conn.prepareStatement(query);
			ResultSet rs = stmt.executeQuery();
			
			Table table = Table.read().db(rs, tabela);
			
			conn.close();
			return table.printAll();
			
		} catch (SQLException e) {
			return "Erro: " + e.getMessage();
		}
	}
	
	public String getTableCollumns(String tabela){
		
		String query = "select * from " + tabela;
		StringBuilder retornoArray = new StringBuilder();
		
		try (Connection conn = conn()){
			PreparedStatement stmt = conn.prepareStatement(query);
			ResultSet rs = stmt.executeQuery();
			
			Table table = Table.read().db(rs, tabela);
			
			for (int i = 0; i < table.columnCount(); i++) {
			//retorna os nomes das colunas existentes na tabbela
			retornoArray.append("Nome da coluna: " + table.columnNames().get(i) );
			//retorna os tipos das colunas existentes na tabela
			retornoArray.append(". Tipo da coluna: " + table.typeArray()[i] + "\n");
			}
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
				
				Table table = Table.read().db(rs, tabela);
				
				//retorna os dados de uma coluna específica da tabela
				retorno = table.stringColumn(campo).print();
				//retira o cabeçalho do retorno
				retorno = retorno.contains("\n") ? retorno.substring(retorno.indexOf('\n') + 1): retorno;
				
				conn.close();
				return retorno.trim();
				
			} catch (SQLException e) {
				return "Erro: " + e.getMessage();
			}
	}
	
	
	private Connection conn() throws SQLException{
		String url = "jdbc:mysql://localhost:3306/pizzaria_db";
		String user = "root";
		String password = "1234";
		return DriverManager.getConnection(url, user, password);
	}
}