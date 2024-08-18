package com.DataVisa.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.DataVisa.Models.DocumentModel;
import com.DataVisa.Repositories.DocumentRepository;
import com.DataVisa.Session.DatavisaSession;

@Service
public class DocumentService{
	
	@Autowired
	DocumentRepository documentRepository;
	
	@Autowired
	DatavisaSession datavisaSession;	
	
	@Autowired
	DBService dBService;

	public Optional<String> save(DocumentModel document) {
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

	public String delete(DocumentModel document){
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

	public Optional<DocumentModel> findById(Long id){
		return documentRepository.findById(id);
	}

	public List<DocumentModel> findAll(){
		return documentRepository.findAll();
	}
	
}