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
	
	private int editaModelo;
	
	private int editaConexao;
	
	private int nivelAcesso;
	
}
