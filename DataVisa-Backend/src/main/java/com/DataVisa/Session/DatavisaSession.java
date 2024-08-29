package com.DataVisa.Session;

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

	private boolean conexaoAtiva;
	
	private Long conexao;
	
	private String url;
	
	private String user;
	
	private String password;
	
	private int permissaoTabela;
	
	private int editaModelo;
	
	private int editaConexao;

	private int nivelAcesso;

	private String documentosRecentes [];
}
