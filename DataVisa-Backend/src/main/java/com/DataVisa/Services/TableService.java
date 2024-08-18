package com.DataVisa.Services;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.DataVisa.Models.DBModel;
import com.DataVisa.Models.TableModel;
import com.DataVisa.Repositories.TableRepository;
import com.DataVisa.Services.TableService;
import com.DataVisa.Session.DatavisaSession;

import tech.tablesaw.api.Table;

@Service
public class TableService {

	@Autowired
	TableRepository tableRepository;

	@Autowired
	DatavisaSession datavisaSession;	

	@Autowired
	DBService dBService;

	@Autowired
	UserService userService;
	
	public Optional<String> save(TableModel database) {
		try {
			//Verifica se a tabela já existe
			if (tableRepository.findById(database.getId()).isPresent()) {
				throw new IllegalArgumentException("Tabela já cadastrada.");
			}
			
			tableRepository.save(database);
			
		} catch (Exception ex){
			 return Optional.of("Ocorreu um erro, Tabela não cadastrada! " + ex.getMessage()); 
		}
		return Optional.of("Tabela cadastrada com sucesso!");
	}

	public String delete(TableModel database){
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
			return "Ocorreu um erro! " + ex.getMessage();			
		}
		
		return "Tabela excluída com sucesso!";
	}

	public List<TableModel> findAll(){
		return tableRepository.findAll();
	}

	public Optional<TableModel> findById(Long id){
		return tableRepository.findById(id);
	}
	
	public String getTable(String tabela){

		String status = userService.checkStatus(datavisaSession.getConexao(), tabela);
		if (!status.isEmpty())
			return status;
		
		if (!(status = checkPermitions(tabela)).isEmpty())
			return status;
		
		String query = "select * from " + tabela;
		
		try{
			Table table = getClientTable(query, tabela);
			return table.printAll();
			
		} catch (Exception e) {
			return "Erro: Tabela não encontrada!";
		}
	}

	public String getTableCollumns(String tabela){

		String status = userService.checkStatus(datavisaSession.getConexao(), tabela);
		if (!status.isEmpty())
			return status;
		
		if (!(status = checkPermitions(tabela)).isEmpty())
			return status;
		
		String query = "select * from " + tabela;
		StringBuilder retorno = new StringBuilder();
		
		try {
			Table table = getClientTable(query, tabela);
			
			for (int i = 0; i < table.columnCount(); i++) {
			//retorna os nomes das colunas existentes na tabbela
			retorno.append("Nome da coluna: " + table.columnNames().get(i) );
			//retorna os tipos das colunas existentes na tabela
			retorno.append(" | Tipo: " + table.typeArray()[i] + "\n");
			}
			return retorno.toString();
			
		} catch (Exception e) {
			return "Erro: " + e.getMessage();
		}
	}

	public String getCollumnFields( String tabela, String campo){
		
			String status = userService.checkStatus(datavisaSession.getConexao(), tabela);
			if (!status.isEmpty())
				return status;
			
			if (!(status = checkPermitions(tabela)).isEmpty())
				return status;
			
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
	
	private String checkPermitions(String tabela) {		
		DBModel db = dBService.findById(datavisaSession.getConexao()).get();
		
		String query = "select permissaoAcesso from  tabelas_" + db.getNomeDb() + " where nome = '" + tabela + "'";
		
		try {
			int permissaoAcesso = getDatavisaTable(query, "tabelas_" + db.getNomeDb()).intColumn("permissaoAcesso").getInt(0);
			return permissaoAcesso >= datavisaSession.getPermissaoTabela() ? "": "Erro: Usuário não possui permissão de acesso suficiente.";
		} catch (IndexOutOfBoundsException e) {
			return "Erro: A tabela/informação desejada não existe!";
		} catch (Exception e) {
			return "Erro: " + e.getMessage() + "\n" + e.getClass().toString();
		}
	}
	
}

