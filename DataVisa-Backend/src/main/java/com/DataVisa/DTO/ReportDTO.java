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
		this.reportName = reportModel.getReportName();
		this.creatorEmail = reportModel.getCreatorEmail();
		this.creatorName = reportModel.getCreatorName();
		this.templateName = reportModel.getTemplateName();
		this.graphType = reportModel.getGraphType();
		this.conexaoId = reportModel.getConexaoId();
		this.conexaoName = reportModel.getConexaoName();
		this.tablePermition = reportModel.getTablePermition();
		this.date = reportModel.getDate();
		this.isPublic = reportModel.getIsPublic();
	}
	
	private static final long serialVersionUID = 1L;

	private Long id;
	
	private String reportName;

	private String creatorEmail;
	
	private String creatorName;
	
	private String templateName;
	
	private String graphType;
	
	private List<String> reportLabels;
	
	private List<String> reportValues;
	
	private Long empresaId;
	
	private Long conexaoId;

	private String conexaoName;
	
	private int tablePermition;
	
	private Timestamp date;
	
	private String mensagemRetorno;

	private int isPublic;
	
}  