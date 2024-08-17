package com.DataVisa.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.DataVisa.Models.DocumentModel;
import com.DataVisa.Services.DocumentService;


@RestController
@CrossOrigin(origins = "*")
public class DocumentController {
	
	@Autowired
	DocumentService documentService;
	
	
	@GetMapping("/dataVisa/document/getDocument/{id}")
	public ResponseEntity<DocumentModel> getDocument(@PathVariable Long id){
		return documentService.findById(id)
				.map(record -> ResponseEntity.ok().body(record))
				.orElse(ResponseEntity.notFound().build());
	}
	
	@PostMapping("/dataVisa/document/addDocument")
    public ResponseEntity<String> addDocument(@RequestBody DocumentModel document){
        return  documentService.save(document)
    		.map(message -> ResponseEntity.ok(message))
            .orElse(ResponseEntity.internalServerError().build());
    }
	
	@PutMapping("/dataVisa/document/updateDocument")
    public ResponseEntity<String> updateDocument(@RequestBody DocumentModel document){
		return  documentService.save(document)
	    		.map(message -> ResponseEntity.ok(message))
	            .orElse(ResponseEntity.internalServerError().build());          
    }
	
    @DeleteMapping("/dataVisa/document/deleteDocument")
    public String deleteDocument(@RequestBody DocumentModel document){
        return  documentService.delete(document);
    }
    
    @GetMapping("/dataVisa/document/getAll")
	public List<DocumentModel> getAll(){
		return documentService.findAll();
	}
	
    @GetMapping("/dataVisa/document/tablesaw/{conexao}/{tabela}")
    public String getTable(@PathVariable Long conexao, @PathVariable String tabela){
    	return documentService.getTable(conexao, tabela);
    }
	
    @GetMapping("/dataVisa/document/tablesaw/columns/{conexao}/{tabela}")
	public String getTableColumns(@PathVariable Long conexao, @PathVariable String tabela){
		return documentService.getTableCollumns(conexao, tabela);
	}
    
    @GetMapping("/dataVisa/document/tablesaw/{conexao}/{tabela}/{campo}")
	public String getColumnFields(@PathVariable Long conexao, @PathVariable String tabela, @PathVariable String campo){
		return documentService.getCollumnFields(conexao, tabela, campo);
	}
}
