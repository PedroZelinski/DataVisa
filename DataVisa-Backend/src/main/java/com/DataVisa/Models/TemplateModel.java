package com.DataVisa.Models;

import java.io.Serializable;
import java.util.LinkedHashMap;

import com.DataVisa.Models.Inferfaces.ArtifactModel;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "templates")
@Data
public class TemplateModel extends ArtifactModel implements Serializable {

	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String nome;
	
	private String NomeTabela;

	private String AliasTabela;
	
	private String camposTabela;
	
	private String query;
	
	private String payload;
	
	private Long empresaId;
	
	private Long conexaoId;
	
}  