package com.DataVisa.DTO;

import com.DataVisa.Models.UserModel;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class DatavisaUserDTO {
	public DatavisaUserDTO(UserModel userModel) {
        this.email = userModel.getEmail();
        this.nome = userModel.getNome();
        this.empresaId = userModel.getEmpresaId();
        this.permissaoTabela = userModel.getPermissaoTabela();
        this.editaModelo = userModel.getEditaModelo();
        this.editaConexao = userModel.getEditaConexao();
        this.nivelAcesso = userModel.getNivelAcesso();
        this.templates = userModel.getTemplates();
    }
	public DatavisaUserDTO(String mensagemRetorno) {
		this.mensagemRetorno = mensagemRetorno;
	}
	
	
	private String email;

	private String nome;

	private Long empresaId;
	
	private int permissaoTabela;
	
	private int editaModelo;
	
	private int editaConexao;

	private int nivelAcesso;

	private String templates;
	
	private String mensagemRetorno;
	
	
}
