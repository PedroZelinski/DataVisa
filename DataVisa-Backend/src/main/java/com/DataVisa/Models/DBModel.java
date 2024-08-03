package com.DataVisa.Models;

import java.io.Serializable;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "bancos")
@Data
public class DBModel implements Serializable {

	private static final long serialVersionUID = 1L;

	//nome teste
	//db1
	@Id
	private String nome;
	
	//senha teste
	//1234
	private String senha;
	
	private List<String> tabelas;

	
}
