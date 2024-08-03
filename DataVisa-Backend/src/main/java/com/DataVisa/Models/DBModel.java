package com.DataVisa.Models;

import java.io.Serializable;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "conexoes")
@Data
public class DBModel implements Serializable {

	private static final long serialVersionUID = 1L;

	//nome teste
	//db1
	@Id
	@GeneratedValue
	private Long id;
	
	private String nomeConexao;
	
	private String tipoDb;
	
	//nome teste
	//datavisa
	private String nomeDb;

	private String usuarioDb;
	
	//senha teste
	//1234
	private String senhaDb;
	
	private int portDb;
	
	private String caminhoDb;
	
}
