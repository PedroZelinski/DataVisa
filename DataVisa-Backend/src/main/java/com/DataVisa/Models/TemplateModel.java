package com.DataVisa.Models;

import java.io.Serializable;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "templates")
@Data
public class TemplateModel implements Serializable {

	private static final long serialVersionUID = 1L;

	//nome teste
	//relatorio 1
	@Id
	@GeneratedValue
	private Long id;
	
	private String nome;
	
	private String corpo;
	
	private Long empresaId;
	
} 