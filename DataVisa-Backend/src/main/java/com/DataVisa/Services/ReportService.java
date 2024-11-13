package com.DataVisa.Services;

import java.util.Optional;

import org.apache.commons.lang3.tuple.Pair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.DataVisa.DTO.ReportDTO;
import com.DataVisa.DTO.TemplateDTO;
import com.DataVisa.Models.ReportModel;
import com.DataVisa.Repositories.DBRepository;
import com.DataVisa.Repositories.ReportRepository;
import com.DataVisa.Session.DatavisaSession;

@Service
public class ReportService {
	
	@Autowired
	ReportRepository reportRepository;
	
	@Autowired
	DBRepository dbRepository;

	@Autowired
	DatavisaSession datavisaSession;
	
	public Pair<String, HttpStatus> create(ReportModel report) {
		
		try {
			report.setConexaoId(datavisaSession.getConexao());
			report.setEmpresaId(dbRepository.findById(report.getConexaoId()).get().getEmpresaId());
			reportRepository.save(report);
			
		} catch (Exception ex){
			 return Pair.of("Relatório não cadastrado! \nErro: " + ex.getMessage(), HttpStatus.NOT_FOUND); 
		}
		return Pair.of("Relatório cadastrado com sucesso!", HttpStatus.OK);
	}
	
	public Pair<String, HttpStatus> update(ReportModel report) {
		
		Pair<String, HttpStatus> response;
		if (!(response = datavisaSession.checkStatus()).getRight().equals(HttpStatus.ACCEPTED)) {
			return Pair.of(response);
		}
		
		try {
			//Verifica se o relatório existe
			if (reportRepository.findById(report.getId()).isEmpty()) {
				return Pair.of("Erro: Relatório não encontrado. ", HttpStatus.NOT_FOUND);
			}
			
			reportRepository.save(report);
			
		} catch (Exception ex){
			 return Pair.of("Falhao ao atualizar relatório! \nErro: " + ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR); 
		}
		return Pair.of("Relatório atualizado com sucesso!", HttpStatus.OK);
	}
	
	public Pair<ReportDTO, HttpStatus> getReport(Long id) {
		Pair<String, HttpStatus> response;
		ReportDTO reportResponse;
		if (!(response = datavisaSession.checkStatus()).getRight().equals(HttpStatus.ACCEPTED)) {
			reportResponse =  new ReportDTO(response.getLeft());
	        return Pair.of(reportResponse, response.getRight());
		}
		
		try {
			Optional<ReportModel> reportModel = reportRepository.findById(id);
			if(reportModel.isEmpty()) {
				reportResponse =  new ReportDTO("Erro: Relatório não encontrado.");
				return Pair.of(reportResponse, HttpStatus.NOT_FOUND);
			}
			reportResponse = new ReportDTO(reportModel.get());
		} catch (Exception ex){
			reportResponse = new ReportDTO("Falhao ao atualizar relatório! \nErro: " + ex.getMessage());
			return Pair.of(reportResponse, HttpStatus.INTERNAL_SERVER_ERROR); 
		}
		
		return Pair.of(reportResponse, HttpStatus.OK);
	}


	public Pair<String, HttpStatus> delete(ReportModel report){
		
		Pair<String, HttpStatus> response;
		if (!(response = datavisaSession.checkStatus()).getRight().equals(HttpStatus.ACCEPTED))
			return Pair.of(response);
		
			//Verifica se o registro existe
			if (reportRepository.findById(report.getId()).isEmpty()) {
				return Pair.of("Erro: Relatório informado não encontrado. Verifique os valores fornecidos.", HttpStatus.NOT_FOUND);
			}
			
			try {
				reportRepository.delete(report);
				
				//Verifica se o relatório foi excluido
	            if (reportRepository.findById(report.getId()).isPresent()) {
	            	return Pair.of("Erro: Erro interno.", HttpStatus.INTERNAL_SERVER_ERROR);
	            }
            		
	            return Pair.of("Relatório excluído com sucesso!", HttpStatus.OK);
			} catch (Exception e) {
	            return Pair.of("Erro: Relatório inválido. Verifique os valores fornecidos e tente novamente.", HttpStatus.NOT_FOUND);
			}
	}

	
//	public Pair<Object, HttpStatus> findAll(){
//		
//		Pair<String, HttpStatus> response;
//		if (!(response = datavisaSession.checkStatus()).getRight().equals(HttpStatus.ACCEPTED)) {
//	        return Pair.of(response,  response.getRight());
//	    }
//
//	    List<ReportModel> userList = datavisaSession.getEmpresaId().equals(1L) ?
//	        reportRepository.findAll():
//	        reportRepository.findAllByEmpresaId(datavisaSession.getEmpresaId());
//	    
//	    try {
//	        List<DatavisaUserDTO> dtoList = userList.stream().map(userModel -> {
//	            DatavisaUserDTO dto = new DatavisaUserDTO(userModel);
//	            try {
//	                String nomeEmpresa = tableService.getNomeEmpresa(userModel.getEmpresaId());
//	                dto.setEmpresaNome(nomeEmpresa);
//	                dto.setDepartamento(tableService.getDepartamento(userModel.getPermissaoTabela(), nomeEmpresa));
//	            } catch (Exception e) {
//	                // Tratar exceção de forma apropriada, como logar o erro e definir valores padrão
//	                dto.setEmpresaNome("Erro ao obter nome da empresa");
//	                dto.setDepartamento("Erro ao obter departamento");
//	            }
//	            return dto;
//	        }).collect(Collectors.toList());
//
//	        return Pair.of(dtoList, HttpStatus.OK);
//	    } catch (Exception e) {
//	        return Pair.of("Erro ao processar a lista de usuários", HttpStatus.INTERNAL_SERVER_ERROR);
//	    }
//	    
//	}
	
}
