package com.DataVisa.DTO;

import java.io.Serializable;
import java.util.List;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Data
public class TemplateDTO implements Serializable {

	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String nome;
	
	private String query;
	
	private String table;
	
	private List<String> itens;

	private List<String> valores;
	
	private Long empresaId;
	
	private Long conexaoId;
	
	private String mensagemRetorno;
	
}  