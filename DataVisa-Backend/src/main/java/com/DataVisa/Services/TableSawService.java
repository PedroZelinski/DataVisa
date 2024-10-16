package com.DataVisa.Services;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;

import org.apache.commons.lang3.tuple.Pair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.DataVisa.DTO.DatavisaDbDTO;
import com.DataVisa.DTO.DbDTO;
import com.DataVisa.Models.DBModel;
import com.DataVisa.Models.TableModel;
import com.DataVisa.Repositories.TableRepository;
import com.DataVisa.Session.DatavisaSession;

import jakarta.transaction.Transactional;
import tech.tablesaw.api.Table;

@Service
public class TableSawService {

	@Autowired
	TableRepository tableRepository;

	@Autowired
	DatavisaSession datavisaSession;	

	@Autowired
	@Lazy
	DBService dBService;

	@Autowired
	UserService userService;
	
	public Pair<String, HttpStatus> getTable(String tabela){

		Pair<String, HttpStatus> response = checkTablePermitions(tabela);
		if (!response.getRight().equals(HttpStatus.ACCEPTED))
			return response;
		
		String query = "select * from " + tabela;
		
		try{
			Table responsetable = datavisaSession.getCustomerConnection(query, tabela);
			response = Pair.of(responsetable.printAll(), HttpStatus.OK);
			return response;
			
		} catch (Exception e) {
			response = Pair.of("Erro: Tabela não encontrada!", HttpStatus.OK);
			return response;
		}
	}
	
	public Pair<String, HttpStatus> getConnecionTables(){
		Pair<String, HttpStatus> response ;
		if (!(response = datavisaSession.checkStatus()).getRight().equals(HttpStatus.ACCEPTED) ||
			!(response = datavisaSession.checkConnection()).getRight().equals(HttpStatus.ACCEPTED)) {
	        return Pair.of(response);
	    }		
		String tableNameColuumn = "table_name";
		String schemaName = "information_schema.tables";
		String query = "SELECT " + tableNameColuumn + " FROM " + schemaName + " WHERE table_schema = '" + datavisaSession.getDbName() + "'";
		
		try {
			//retorna os dados de uma coluna específica da tabela
			String stringTable = datavisaSession.getCustomerConnection(query, schemaName).stringColumn(tableNameColuumn).print();
			//retira o cabeçalho do retorno
			stringTable = stringTable.contains("\n") ? stringTable.substring(stringTable.indexOf('\n') + 1): stringTable;
			
			response = Pair.of(stringTable.trim(), HttpStatus.OK);
			return response;
			
		} catch (Exception e) {
			return Pair.of("Erro: " + e.getMessage() + "\n" + e.getClass().toString(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	public Pair<String, HttpStatus> getTableCollumns(String tabela){

		Pair<String, HttpStatus> response = checkTablePermitions(tabela);
		if (!response.getRight().equals(HttpStatus.ACCEPTED))
			return response;
		
		String query = "select * from " + tabela +" limit 1";
		StringBuilder tablesCollumns = new StringBuilder();
		
		try {
			Table table = datavisaSession.getCustomerConnection(query, tabela);
			
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
	
	public Pair<String, HttpStatus> getDatavisaTableCollumnCount(String tabela){

		String query = "SELECT * from " + tabela;
		
		try {
			Table table = getDatavisaTable(query, tabela);
			
			//retorna o número de colunas existentes na tabbela
			return Pair.of(String.valueOf(table.columnCount()), HttpStatus.OK);
			
		} catch (Exception e) {
			return Pair.of("Erro: " + e.getMessage() + "\n" + e.getClass().toString(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	public Pair<String, HttpStatus> getCollumnFields(String tabela, String campo){
		
		Pair<String, HttpStatus> response = checkTablePermitions(tabela);
		if (!response.getRight().equals(HttpStatus.ACCEPTED))
			return response;
		
		String query = "select " + campo + " from " + tabela;
		
		try {
			//retorna os dados de uma coluna específica da tabela
			String stringTable = datavisaSession.getCustomerConnection(query, tabela).stringColumn(campo).print();
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
		
	public void addPermitionsTable(DBModel db) throws Exception {
		String query;
		try {
			query = "CREATE TABLE tabelas_" + db.getNomeConexao() +" ("
					+ " id BIGINT PRIMARY KEY AUTO_INCREMENT, "
					+ " nome VARCHAR(60) unique, "
					+ " conexaoId BIGINT, "
					+ " permissaoAcesso INT, "
					+ " FOREIGN KEY (conexaoId) REFERENCES conexoes(id) "
					+ " ); ";
			String[] tabelas = getConnecionTables().getLeft().split("\n");
			executeQueryDatavisa(query); 
			for (String tabela : tabelas) {
				query  = "INSERT INTO tabelas_" + db.getNomeConexao().trim() 
				+ " (nome, conexaoId, permissaoAcesso) VALUES ('" + tabela.trim()  + "', " + db.getId() + ", " + getPermitionCount(getNomeEmpresa(db.getEmpresaId())).trim()  +");";
				executeQueryDatavisa(query);
			}
		} catch (Exception e) {
			query = "DROP TABLE tabelas_" + db.getNomeConexao();
			executeQueryDatavisa(query);
			throw new Exception(e);
		}
	}
	
	@Transactional
	public void updatePermitionsTable(String connectionName, DbDTO tablesPermitions) throws Exception {
		String query;
		try {
			for (TableModel model : tablesPermitions.getTablesPermitions()) {
	            // Monta a query SQL para atualizar a tabela tabelas_permissoes
	            query = "UPDATE tabelas_" + connectionName + " SET permissaoAcesso = " + model.getPermissaoAcesso()
	                                + " WHERE nome = '" + model.getNome() + "'";
	            executeQueryDatavisa(query);
	        }
		} catch (Exception e) {
			throw new Exception(e);
		}
	}
	
	public void deletePermitionsTable(DBModel db) throws Exception {
		String query;
			query = "DROP TABLE tabelas_" + db.getNomeConexao();
			executeQueryDatavisa(query); 
	}
	
	public Table getDatavisaTable(String query, String tableName) throws Exception {
		Connection datavisaConnection = dBService.DatavisaConnection();
		PreparedStatement stmt = datavisaConnection.prepareStatement(query);
		ResultSet rs = stmt.executeQuery();
		Table table = Table.read().db(rs, tableName);
		datavisaConnection.close();
		return table;
	}
	
	public void executeQueryDatavisa(String query) throws Exception {
		Connection datavisaConnection = dBService.DatavisaConnection();
		Statement stmt = datavisaConnection.createStatement();
		stmt.executeUpdate(query);
		datavisaConnection.close();
	}
	
	private Pair<String, HttpStatus> checkTablePermitions(String tabela) {	
		Pair<String, HttpStatus> response;
		if (!(response = datavisaSession.checkStatus()).getRight().equals(HttpStatus.ACCEPTED) || 
				!(response = datavisaSession.checkConnection()).getRight().equals(HttpStatus.ACCEPTED)) {
	        return Pair.of(response);
	    }
		
		DatavisaDbDTO db = dBService.findById(datavisaSession.getConexao()).getLeft();
		
		String query = "select permissaoAcesso from  tabelas_" + db.getNomeConexao() + " where nome = '" + tabela + "'";
		
		try {
			int permissaoAcesso = getDatavisaTable(query, "tabelas_" + db.getNomeConexao()).intColumn("permissaoAcesso").getInt(0);
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
	
	public String getDepartamento (int permissao, String nomeEmpresa) throws Exception {
		String query = "select nome from " + nomeEmpresa + "_permissoes where permissao_tabela = " + String.valueOf(permissao);
		String departamento = getDatavisaTable(query , nomeEmpresa +"_permissoes").stringColumn("nome").print();
		departamento = departamento.substring(departamento.indexOf('\n') + 1).trim();
		return departamento;
		
	}
	
	public String getPermitionCount (String nomeEmpresa) throws Exception {
		String query = "select permissao_tabela from " + nomeEmpresa + "_permissoes ";
		int permissoes = getDatavisaTable(query , nomeEmpresa +"_permissoes").rowCount();
		return String.valueOf(permissoes);
		
	}
	
}

