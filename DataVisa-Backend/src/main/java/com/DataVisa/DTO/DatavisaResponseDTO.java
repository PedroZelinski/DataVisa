package com.DataVisa.DTO;

import com.DataVisa.Session.DatavisaSession;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DatavisaResponseDTO extends DatavisaSession {
	
	 public DatavisaResponseDTO(DatavisaSession session) {
	        // Inicializa as variáveis da classe mãe com os valores da instância fornecida
	        this.setStatus(session.isStatus());
	        this.setEmail(session.getEmail());
	        this.setNome(session.getNome());
	        this.setEmpresaId(session.getEmpresaId());
	        this.setConexaoAtiva(session.isConexaoAtiva());
	        this.setConexao(session.getConexao());
	        this.setUrl(session.getUrl());
	        this.setUser(session.getUser());
	        this.setPermissaoTabela(session.getPermissaoTabela());
	        this.setEditaModelo(session.getEditaModelo());
	        this.setEditaConexao(session.getEditaConexao());
	        this.setNivelAcesso(session.getNivelAcesso());
	        this.setDocumentosRecentes(session.getDocumentosRecentes());
	    }
	
	private String mensagemRetorno;
}
