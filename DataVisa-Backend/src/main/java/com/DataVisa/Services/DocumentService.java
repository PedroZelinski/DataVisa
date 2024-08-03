package com.DataVisa.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.DataVisa.Models.DocumentModel;
import com.DataVisa.Repositories.DocumentRepository;

@Service
public class DocumentService {
	
	@Autowired
	DocumentRepository documentRepository;
	
	public Optional<String> save(DocumentModel document) {
		try {
			//Verifica se o banco já existe
			if (documentRepository.findById(document.getId()).isPresent()) {
				throw new IllegalArgumentException("Banco já cadastrado.");
			}
			
			documentRepository.save(document);
			
		} catch (Exception ex){
			 return Optional.of("Ocorreu um erro, Banco não cadastrado! " + ex.getMessage()); 
		}
		return Optional.of("Banco cadastrado com sucesso!");
	}
	
	public String delete(DocumentModel document){
		try {
			
			//Verifica se o banco existe
			if (documentRepository.findById(document.getId()).isEmpty()) {
                throw new RuntimeException("Usuário não encontrado.");
            }
			
			documentRepository.delete(document);
			
			//Verifica se o banco foi excluido
            if (documentRepository.findById(document.getId()).isPresent()) {
                throw new RuntimeException("Falha ao excluir o banco.");
            }
            
		} catch (Exception ex){
			return "Ocorreu um erro! " + ex.getMessage();			
		}
		
		return "Banco excluído com sucesso!";
	}

	
	public List<DocumentModel> findAll(){
		return documentRepository.findAll();
	}
	
}