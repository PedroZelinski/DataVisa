package com.DataVisa.Session;

import org.apache.commons.lang3.tuple.Pair;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.context.annotation.SessionScope;

import lombok.Data;

@Component
@SessionScope
@Data
public class DatavisaSession {
	public DatavisaSession() {
		setStatus(false);
		setConexaoAtiva(false);
	}

	private boolean status;
	
	private String email;
	
	private String nome;
	
	private Long empresaId;
	
	private String empresaNome;

	private boolean conexaoAtiva;
	
	private Long conexao;
	
	private String url;
	
	private String user;
	
	private String password;
	
	private int permissaoTabela;
	
	private String departamento;

	private int nivelAcesso;

	private String templates;
	
	public void setTemplates(String templates) {
		if (templates == null || templates.isEmpty())
			this.templates = "{}";
		else
			this.templates = templates;
	}
	
	public Pair<String, HttpStatus> checkStatus() {
		if (!isStatus())
			return Pair.of("Erro: Login não efetuado!", HttpStatus.UNAUTHORIZED);
		return Pair.of("",HttpStatus.ACCEPTED);
	}
	
	//Access Levels
	//0 = Datavisa Admin
	//1 = Business Admin
	//2 = Data Analyst
	//3 = User
	public Pair<String, HttpStatus> checkDatavisaPermition(int accessLevel) {
		if(getNivelAcesso() > accessLevel)
			return Pair.of("Erro: O usuário não possui permissão para realizar a esta ação.", HttpStatus.FORBIDDEN);
		return Pair.of("", HttpStatus.ACCEPTED);
	}
	
	public Pair<String, HttpStatus> checkEmpresaPermition(Long empresaid) {
		if(empresaid != getEmpresaId() && !getEmpresaId().equals(1L))
			return  Pair.of("Erro: O usuário não possui permissão para realizar a esta ação.", HttpStatus.FORBIDDEN);
	return Pair.of("", HttpStatus.ACCEPTED);
	}
	
	public Pair<String, HttpStatus> checkConnection(Long conexao, String tabela) {
		if(!isConexaoAtiva())
			return Pair.of("Erro: Nenhuma conexão ativa! \nConecte a um banco e tente novamente.", HttpStatus.BAD_REQUEST);
		return Pair.of("", HttpStatus.ACCEPTED);
	}
}
