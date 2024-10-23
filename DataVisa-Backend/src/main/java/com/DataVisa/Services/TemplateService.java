package com.DataVisa.Services;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import org.apache.commons.lang3.tuple.Pair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.DataVisa.DTO.DbDTO;
import com.DataVisa.DTO.TemplateDTO;
import com.DataVisa.Models.TemplateModel;
import com.DataVisa.Repositories.TemplateRepository;
import com.DataVisa.Session.DatavisaSession;
import com.DataVisa.Utils.DatavisaUtils;

@Service
public class TemplateService{
	
	@Autowired
	TemplateRepository documentRepository;
	
	@Autowired
	DatavisaSession datavisaSession;	
	
	@Autowired
	DBService dBService;
	
	@Autowired
	TableSawService tableSawService;

	public Optional<String> save(TemplateModel document) {
		try {
			//Verifica se o documento já existe
			if (documentRepository.findById(document.getId()).isPresent()) {
				throw new IllegalArgumentException("Documento já cadastrado.");
			}
			
			documentRepository.save(document);
			
		} catch (Exception ex){
			 return Optional.of("Ocorreu um erro, Documento não cadastrado! " + ex.getMessage()); 
		}
		return Optional.of("Documento cadastrado com sucesso!");
	}

	public String delete(TemplateModel document){
		try {
			
			//Verifica se o documento existe
			if (documentRepository.findById(document.getId()).isEmpty()) {
                throw new RuntimeException("Usuário não encontrado.");
            }
			
			documentRepository.delete(document);
			
			//Verifica se o documento foi excluido
            if (documentRepository.findById(document.getId()).isPresent()) {
                throw new RuntimeException("Falha ao excluir o documento.");
            }
            
		} catch (Exception ex){
			return "Ocorreu um erro! " + ex.getMessage();			
		}
		
		return "Documento excluído com sucesso!";
	}

	public Optional<TemplateModel> findById(Long id){
		return documentRepository.findById(id);
	}

	public List<TemplateModel> findAll(){
		return documentRepository.findAll();
	}
	
	public Pair<TemplateDTO, HttpStatus> validateQuery(String query){
		TemplateDTO dto = new TemplateDTO();
		Pair<String, HttpStatus> response ;
		
		if (!(response = datavisaSession.checkStatus()).getRight().equals(HttpStatus.ACCEPTED) || 
				!(response = datavisaSession.checkConnection()).getRight().equals(HttpStatus.ACCEPTED)) {
			dto.setMensagemRetorno(response.getLeft());
	        return Pair.of(dto, response.getRight());
		}
	
		String table = DatavisaUtils.tableNameMapper(query);
		List<String> items = DatavisaUtils.tableFieldsMapper(query);
		dto.setItens(items);
		List<String> valores = IntStream.range(0, items.size())
		        .mapToObj(index -> tableSawService.extractCustomizesdCollumnFields(query, table, items.get(index), index))
		        .collect(Collectors.toList());
	    dto.setValores(valores);
		return Pair.of(dto, HttpStatus.OK);
	}
	
}