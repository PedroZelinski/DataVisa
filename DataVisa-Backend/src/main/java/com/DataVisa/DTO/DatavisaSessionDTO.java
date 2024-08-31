package com.DataVisa.DTO;

import com.DataVisa.Session.DatavisaSession;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DatavisaSessionDTO  {
	
	 public DatavisaSessionDTO(DatavisaSession session) {
	        // Inicializa as variáveis da classe mãe com os valores da instância fornecida
	        this.setStatus(session.isStatus());
	        this.setEmail(session.getEmail());
	        this.setNome(session.getNome());
	        this.setEmpresa(session.getEmpresaNome());
	        this.setDepartamento(session.getDepartamento());
	        this.setConexaoAtiva(session.isConexaoAtiva());
	        this.setTemplates(session.getTemplates());
	    }
	 
	private boolean status;
	
	private String email;
	
	private String nome;
	
	private String empresa;

	private boolean conexaoAtiva;
	
	private String conexao;

	private String departamento;
	
	private String templates;
	
	private String mensagemRetorno;
}
