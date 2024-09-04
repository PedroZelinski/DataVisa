package com.DataVisa.Services;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.List;
import java.util.Optional;

import org.apache.commons.lang3.tuple.Pair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.DataVisa.DTO.DatavisaDbDTO;
import com.DataVisa.Models.TableModel;
import com.DataVisa.Repositories.TableRepository;
import com.DataVisa.Session.DatavisaSession;

import tech.tablesaw.api.Table;

@Service
public class TableService {

	@Autowired
	TableRepository tableRepository;

	@Autowired
	DatavisaSession datavisaSession;	

	@Autowired
	@Lazy
	DBService dBService;

	@Autowired
	UserService userService;
	
	public Pair<String, HttpStatus> save(TableModel database) {
		Pair<String, HttpStatus> response;
		if (!(response = datavisaSession.checkStatus()).getRight().equals(HttpStatus.ACCEPTED))
			return Pair.of(response);
		if (!(response = datavisaSession.checkDatavisaPermition(2)).getRight().equals(HttpStatus.ACCEPTED))
			return Pair.of(response);
		
		try {
			//Verifica se a tabela já existe
			if (tableRepository.findById(database.getId()).isPresent()) {
				throw new IllegalArgumentException("Tabela já cadastrada.");
			}
			
			tableRepository.save(database);
			
		} catch (Exception ex){
			return Pair.of("Ocorreu um erro, Tabela não cadastrada! " + ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR); 
		}
		return Pair.of("Tabela cadastrada com sucesso!", HttpStatus.OK);
	}

//	public Optional<String> addBusinessTables(TableModel database) {
//
//			String status = checkPermitions(tabela);
//			if (!status.isEmpty())
//				return status;
//			
//			String query = "select * from " + tabela;
//			StringBuilder retorno = new StringBuilder();
//			
//			try {
//				Table table = getClientTable(query, tabela);
//				
//				for (int i = 0; i < table.columnCount(); i++) {
//				//retorna os nomes das colunas existentes na tabbela
//				retorno.append("Nome da coluna: " + table.columnNames().get(i) );
//				//retorna os tipos das colunas existentes na tabela
//				retorno.append(" | Tipo: " + table.typeArray()[i] + "\n");
//				}
//				return retorno.toString();
//				
//			} catch (Exception e) {
//				return "Erro: " + e.getMessage();
//			}
//		}
	
	public Pair<String, HttpStatus> delete(TableModel database){
		
		Pair<String, HttpStatus> response;
		if (!(response = datavisaSession.checkStatus()).getRight().equals(HttpStatus.ACCEPTED))
			return Pair.of(response);
		if (!(response = datavisaSession.checkDatavisaPermition(2)).getRight().equals(HttpStatus.ACCEPTED))
			return Pair.of(response);
		
		try {
			
			//Verifica se a tabela existe
			if (tableRepository.findById(database.getId()).isEmpty()) {
                throw new RuntimeException("Tabela não encontrada.");
            }
			
			tableRepository.delete(database);
			
			//Verifica se a tabela foi excluida
            if (tableRepository.findById(database.getId()).isPresent()) {
                throw new RuntimeException("Falha ao excluir a tabela.");
            }
            
		} catch (Exception ex){
			return Pair.of("Ocorreu um erro! " + ex.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);			
		}
		
		return Pair.of("Tabela excluída com sucesso!",HttpStatus.OK);
	}

	public List<TableModel> findAll(){
		return tableRepository.findAll();
	}

	public Optional<TableModel> findById(Long id){
		return tableRepository.findById(id);
	}
	
	public Pair<String, HttpStatus> getTable(String tabela){

		Pair<String, HttpStatus> response = checkTablePermitions(tabela);
		if (!response.getRight().equals(HttpStatus.ACCEPTED))
			return response;
		
		String query = "select * from " + tabela;
		
		try{
			Table responsetable = getClientTable(query, tabela);
			response = Pair.of(responsetable.printAll(), HttpStatus.OK);
			return response;
			
		} catch (Exception e) {
			response = Pair.of("Erro: Tabela não encontrada!", HttpStatus.OK);
			return response;
		}
	}

	public Pair<String, HttpStatus> getTableCollumns(String tabela){

		Pair<String, HttpStatus> response = checkTablePermitions(tabela);
		if (!response.getRight().equals(HttpStatus.ACCEPTED))
			return response;
		
		String query = "select * from " + tabela +" limit 1";
		StringBuilder tablesCollumns = new StringBuilder();
		
		try {
			Table table = getClientTable(query, tabela);
			
			for (int i = 0; i < table.columnCount(); i++) {
			//retorna os nomes das colunas existentes na tabbela
			tablesCollumns.append("Nome da coluna: " + table.columnNames().get(i) );
			//retorna os tipos das colunas existentes na tabela
			tablesCollumns.append(" | Tipo: " + table.typeArray()[i] + "\n");
			}
			response = Pair.of(tablesCollumns.toString(), HttpStatus.OK);
			return response;
			
		} catch (Exception e) {
			return Pair.of("Erro: " + e.getMessage() + "\n" + e.getClass().toString(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	public Pair<String, HttpStatus> getCollumnFields(String tabela, String campo){
		
		Pair<String, HttpStatus> response = checkTablePermitions(tabela);
		if (!response.getRight().equals(HttpStatus.ACCEPTED))
			return response;
		
		String query = "select * from " + tabela;
		
		try {
			//retorna os dados de uma coluna específica da tabela
			String stringTable = getClientTable(query, tabela).stringColumn(campo).print();
			//retira o cabeçalho do retorno
			stringTable = stringTable.contains("\n") ? stringTable.substring(stringTable.indexOf('\n') + 1): stringTable;
			
			response = Pair.of(stringTable.trim(), HttpStatus.OK);
			return response;
			
		} catch (Exception e) {
			return Pair.of("Erro: " + e.getMessage() + "\n" + e.getClass().toString(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

public String getDatavisaCollumnFields(String tabela, String campo){
		
		String query = "select " + campo + " from " + tabela;
		
		try {
			//retorna os dados de uma coluna específica da tabela
			String retorno = getDatavisaTable(query, tabela).stringColumn(campo).print();
			//retira o cabeçalho do retorno
			retorno = retorno.contains("\n") ? retorno.substring(retorno.indexOf('\n') + 1): retorno;
			
			retorno = retorno.replaceAll("\\r\\n", ",").trim();
			retorno = retorno.substring(0, retorno.length()-1);
			
			return retorno;
			
		} catch (Exception e) {
			return "Erro: " + e.getMessage();
		}
	}
	
	public Table getDatavisaTable(String query, String tableName) throws Exception {
		Connection datavisaConnection = dBService.DatavisaConnection();
		PreparedStatement stmt = datavisaConnection.prepareStatement(query);
		ResultSet rs = stmt.executeQuery();
		Table table = Table.read().db(rs, tableName);
		datavisaConnection.close();
		return table;
	}

	public Table getClientTable(String query, String tableName) throws Exception {
		Connection clientConnection = dBService.ClientConnection();
		PreparedStatement stmt = clientConnection.prepareStatement(query);
		ResultSet rs = stmt.executeQuery();
		Table table = Table.read().db(rs, tableName);
		clientConnection.close();
		return table;
	}
	
	private Pair<String, HttpStatus> checkTablePermitions(String tabela) {	
		Pair<String, HttpStatus> response;
		if (!(response = datavisaSession.checkStatus()).getRight().equals(HttpStatus.ACCEPTED) || 
				!(response = datavisaSession.checkConnection(datavisaSession.getConexao(), tabela)).getRight().equals(HttpStatus.ACCEPTED)) {
	        return Pair.of(response);
	    }
		
		DatavisaDbDTO db = dBService.findById(datavisaSession.getConexao()).getLeft();
		
		String query = "select permissaoAcesso from  tabelas_" + db.getNomeDb() + " where nome = '" + tabela + "'";
		
		try {
			int permissaoAcesso = getDatavisaTable(query, "tabelas_" + db.getNomeDb()).intColumn("permissaoAcesso").getInt(0);
			response =  permissaoAcesso >= datavisaSession.getPermissaoTabela() ?
					Pair.of("", HttpStatus.ACCEPTED):
						Pair.of( "Erro: Usuário não possui permissão de acesso suficiente.", HttpStatus.FORBIDDEN);
			return response;
		} catch (IndexOutOfBoundsException e) {
			return Pair.of("Erro: A tabela/informação desejada não existe!", HttpStatus.NOT_FOUND);
		} catch (Exception e) {
			return Pair.of("Erro: " + e.getMessage() + "\n" + e.getClass().toString(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	public String getNomeEmpresa (Long id) throws Exception {
		String query = "select nome from empresas where id = " + String.valueOf(id);
		String nomeEmpresa = getDatavisaTable(query, "empresas").stringColumn("nome").print();
		nomeEmpresa = nomeEmpresa.substring(nomeEmpresa.indexOf('\n') + 1).trim();
		return nomeEmpresa;
	}
	
}

