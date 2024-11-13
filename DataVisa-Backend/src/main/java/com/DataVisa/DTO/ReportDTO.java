package com.DataVisa.DTO;

import java.io.Serializable;
import java.sql.Timestamp;
import java.util.List;

import com.DataVisa.Models.ReportModel;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ReportDTO implements Serializable {
	public ReportDTO(String mensagemRetorno){
		this.mensagemRetorno = mensagemRetorno;
	}
	
	public ReportDTO(ReportModel reportModel) {
		this.id = reportModel.getId();
		this.name = reportModel.getName();
		this.graphType = reportModel.getGraphType();
		this.reportLabels = reportModel.getReportLabels();
		this.reportValues = reportModel.getReportValues();
		this.empresaId = reportModel.getEmpresaId();
		this.conexaoId = reportModel.getConexaoId();
		this.accessLevel = reportModel.getAccessLevel();
		this.date = reportModel.getDate();
	}
	
	private static final long serialVersionUID = 1L;

	private Long id;
	
	private String name;
	
	private String graphType;
	
	private List<String> reportLabels;
	
	private List<String> reportValues;
	
	private Long empresaId;
	
	private Long conexaoId;
	
	private int accessLevel;
	
	private Timestamp date;
	
	private String mensagemRetorno;
	
}  