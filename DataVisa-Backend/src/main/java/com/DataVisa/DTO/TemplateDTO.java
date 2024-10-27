package com.DataVisa.DTO;

import java.io.Serializable;
import java.sql.Timestamp;
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
	
	private String tableName;
	
	private List<String> items;

	private List<String> values;
	
	private Timestamp lastModification;
	
	private Long empresaId;
	
	private Long conexaoId;
	
	private String mensagemRetorno;
	
}  