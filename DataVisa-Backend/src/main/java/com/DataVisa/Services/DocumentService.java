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

import com.DataVisa.Models.DBModel;
import com.DataVisa.Models.DocumentModel;
import com.DataVisa.Models.UserModel;
import com.DataVisa.Repositories.DocumentRepository;
import com.DataVisa.Session.DatavisaSession;

import tech.tablesaw.api.Table;

@Service
public class DocumentService {
	
	@Autowired
	DocumentRepository documentRepository;
	
	@Autowired
	DatavisaSession datavisaSession;	
	
	@Autowired
	DBService dBService;
	
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
	
	public String getTable(Long conexao, String tabela){
		if (!datavisaSession.isStatus())
			return "Erro: Login não efetuado!";
		if (!hasPermit(conexao, tabela))
			return "Erro: Acesso negado!";
		
		String query = "select * from " + tabela;
		
		try{
			Table table = getClientTable(query, tabela);
			return table.printAll();
			
		} catch (Exception e) {
			return "Erro: " + e.getMessage();
		}
	}
	
	public String getTableCollumns(Long conexao, String tabela){
		if (!datavisaSession.isStatus())
			return "Erro: Login não efetuado!";
		if (!hasPermit(conexao, tabela))
			return "Erro: Acesso negado!";
		
		String query = "select * from " + tabela;
		StringBuilder retorno = new StringBuilder();
		
		try {
			Table table = getClientTable(query, tabela);
			
			for (int i = 0; i < table.columnCount(); i++) {
			//retorna os nomes das colunas existentes na tabbela
			retorno.append("Nome da coluna: " + table.columnNames().get(i) );
			//retorna os tipos das colunas existentes na tabela
			retorno.append(" | Tipo da coluna: " + table.typeArray()[i] + "\n");
			}
			return retorno.toString();
			
		} catch (Exception e) {
			return "Erro: " + e.getMessage();
		}
	}
	
	public String getCollumnFields(Long conexao, String tabela, String campo){
			if (!datavisaSession.isStatus())
				return "Erro: Login não efetuado!";
			if (!hasPermit(conexao, tabela))
				return "Erro: Acesso negado!";
			
			String query = "select * from " + tabela;
			
			try {
				//retorna os dados de uma coluna específica da tabela
				String retorno = getClientTable(query, tabela).stringColumn(campo).print();
				//retira o cabeçalho do retorno
				retorno = retorno.contains("\n") ? retorno.substring(retorno.indexOf('\n') + 1): retorno;
				
				return retorno.trim();
				
			} catch (Exception e) {
				return "Erro: " + e.getMessage();
			}
	}
	
	private boolean hasPermit(Long conexao, String tabela) {
		try {
			DBModel db = dBService.findById(conexao).get();
			if(dBService.findById(conexao).get().getEmpresaId().equals(datavisaSession.getEmpresaId())) {
				dBService.setSessionConection(db);	
				
				String query = "select permissaoAcesso from  tabelas_" + db.getNomeDb() + " where nome = '" + tabela + "'";
				
				int campo = getDatavisaTable(query, "tabelas_" + db.getNomeDb()).intColumn("permissaoAcesso").getInt(0);
				return campo >= datavisaSession.getPermissaoTabela() ? true: false;
			}
			return false;
		} catch (Exception e) {
			return false;
		}
	}
		
	private Connection ClientConnection() throws SQLException{
		return DriverManager.getConnection(datavisaSession.getUrl(), datavisaSession.getUser(), datavisaSession.getPassword());
	}
	
	private Connection DatavisaConnection() throws SQLException{
		String url = "jdbc:mysql://localhost:3306/datavisa";
		String user = "root";
		String password = "1234";
		return DriverManager.getConnection(url, user, password);
	}
	
	public Table getDatavisaTable(String query, String tableName) throws Exception {
		Connection datavisaConnection = DatavisaConnection();
		PreparedStatement stmt = datavisaConnection.prepareStatement(query);
		ResultSet rs = stmt.executeQuery();
		Table table = Table.read().db(rs, tableName);
		datavisaConnection.close();
		return table;
	}
	
	public Table getClientTable(String query, String tableName) throws Exception {
		Connection clientConnection = ClientConnection();
		PreparedStatement stmt = clientConnection.prepareStatement(query);
		ResultSet rs = stmt.executeQuery();
		Table table = Table.read().db(rs, tableName);
		clientConnection.close();
		return table;
	}
}