package com.DataVisa.Services;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import org.apache.commons.lang3.tuple.Pair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.DataVisa.DTO.TemplateDTO;
import com.DataVisa.Models.TemplateModel;
import com.DataVisa.Repositories.DBRepository;
import com.DataVisa.Repositories.TemplateRepository;
import com.DataVisa.Session.DatavisaSession;
import com.DataVisa.Utils.DatavisaUtils;

@Service
public class TemplateService{
	
	@Autowired
	TemplateRepository templateRepository;
	
	@Autowired
	DatavisaSession datavisaSession;	
	
	@Autowired
	DBService dBService;
	
	@Autowired
	DBRepository dbRepository;
	
	@Autowired
	TableSawService tableSawService;

public Pair<String, HttpStatus> addTemplate(TemplateModel template) {
		
		Pair<String, HttpStatus> response;;
		if (!(response = datavisaSession.checkStatus()).getRight().equals(HttpStatus.ACCEPTED)) {
	        return Pair.of(response);
	    }
	    if (!(response = datavisaSession.checkDatavisaPermition(2)).getRight().equals(HttpStatus.ACCEPTED)) {
	        return Pair.of(response);
	    }
		
		try {
			
			template.setEmpresaId(dbRepository.findById(datavisaSession.getConexao()).get().getEmpresaId());
			
			//Verifica se o banco já existe
			if (templateRepository.findByName(template.getTemplateName(), template.getEmpresaId()) != null) {
				throw new IllegalArgumentException("Template já existente.");
			}
			
			templateRepository.save(template);
			response = Pair.of("Template cadastrado com sucesso!",HttpStatus.OK);
			return response;
			
		} catch (Exception ex){
			response = Pair.of("Ocorreu um erro, Template não cadastrado! " + ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
			return response; 
		}
	}

		public Pair<String, HttpStatus> delete(String nomeTemplate){
			Pair<String, HttpStatus> response;;
			if (!(response = datavisaSession.checkStatus()).getRight().equals(HttpStatus.ACCEPTED)) {
		        return Pair.of(response);
		    }
		    if (!(response = datavisaSession.checkDatavisaPermition(2)).getRight().equals(HttpStatus.ACCEPTED)) {
		        return Pair.of(response);
		    }
			
			try {
				
				TemplateModel template = templateRepository.findByName(nomeTemplate, datavisaSession.getEmpresaId());
				
				//Verifica se o template existe
				if (template == null) {
	                throw new RuntimeException("Template não encontrado.");
	            }
				
				templateRepository.delete(template);
				
				//Verifica se o template foi excluido
	            if (templateRepository.findById(template.getId(), template.getEmpresaId()) != null) {
	                throw new RuntimeException("Falha ao excluir o template.");
	            }
	            
			} catch (Exception ex){
				return Pair.of("Erro: Template não excluído! \nErro: " + ex.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);			
			}
			
			return Pair.of("Template excluído com sucesso!",HttpStatus.OK);
		}
//
//	public Optional<TemplateModel> findById(Long id){
//		return documentRepository.findById(id);
//	}
//
//	public List<TemplateModel> findAll(){
//		return documentRepository.findAll();
//	}
	
	public Pair<TemplateDTO, HttpStatus> validateQuery(String query){
		TemplateDTO dto = new TemplateDTO();
		Pair<String, HttpStatus> response ;
		
		if (!(response = datavisaSession.checkStatus()).getRight().equals(HttpStatus.ACCEPTED) || 
				!(response = datavisaSession.checkConnection()).getRight().equals(HttpStatus.ACCEPTED)) {
			dto.setMensagemRetorno(response.getLeft());
	        return Pair.of(dto, response.getRight());
		}
		
		try {
			query = DatavisaUtils.sanitizeQuery(query);
			String limitedQuery = DatavisaUtils.limitQueryToOne(query);
			
			dto.setQuery(query);
			String tableName = DatavisaUtils.tableNameMapper(query);
			dto.setTableName(tableName);
			List<String> items = DatavisaUtils.tableFieldsMapper(query);
			dto.setItems(items);
			List<String> valores = IntStream.range(0, items.size())
			        .mapToObj(index -> tableSawService.extractCustomizesdCollumnFields(limitedQuery, tableName, index))
			        .collect(Collectors.toList());
		    dto.setValues(valores);
		    dto.setEmpresaId(datavisaSession.getEmpresaId());
		    dto.setConexaoId(datavisaSession.getConexao());
		    dto.setMensagemRetorno("Query válida.");
		    
			return Pair.of(dto, HttpStatus.OK);
		
		}catch (IllegalArgumentException e) {
			dto = new TemplateDTO();
			dto.setMensagemRetorno(e.getMessage());
			return Pair.of(dto, HttpStatus.BAD_REQUEST);
		}
	}
	
}