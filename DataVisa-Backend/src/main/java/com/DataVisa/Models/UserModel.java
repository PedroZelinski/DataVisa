package com.DataVisa.Models;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "usuarios")
@Data
public class UserModel implements Serializable {
	public UserModel() {
		this.setEditaConexao(0);
		this.setEditaModelo(0);
		this.setNivelAcesso(2);
	}
	private static final long serialVersionUID = 1L;

	//email teste
	//pedro@fatec.com
	@Id
	private String email;
	
	//senha teste
	//1234
	private String senha;

	private String nome;
	
	private String departamento;
	
	@Column(name = "edita_modelo")
	private int editaModelo;
	
	@Column(name = "edita_conexao")
	private int editaConexao;

	@Column(name = "nivel_acesso")
	private int nivelAcesso;
	
}
