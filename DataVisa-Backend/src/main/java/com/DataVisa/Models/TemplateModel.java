package com.DataVisa.Models;

import java.io.Serializable;

import com.DataVisa.Models.Inferfaces.ArtifactModel;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "templates")
public class TemplateModel extends ArtifactModel implements Serializable {

	private static final long serialVersionUID = 1L;

	
	
}  