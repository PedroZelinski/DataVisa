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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.DataVisa.Models.TemplateModel;
import com.DataVisa.Services.TemplateService;


@RestController
public class TemplateController {
	
	@Autowired
	TemplateService documentService;
	
	
	@GetMapping("/dataVisa/document/getDocument/{id}")
	public ResponseEntity<TemplateModel> getDocument(@PathVariable Long id){
		return documentService.findById(id)
				.map(record -> ResponseEntity.ok().body(record))
				.orElse(ResponseEntity.notFound().build());
	}
	
	@PostMapping("/dataVisa/document/addDocument")
    public ResponseEntity<String> addDocument(@RequestBody TemplateModel document){
        return  documentService.save(document)
    		.map(message -> ResponseEntity.ok(message))
            .orElse(ResponseEntity.internalServerError().build());
    }
	
	@PutMapping("/dataVisa/document/updateDocument")
    public ResponseEntity<String> updateDocument(@RequestBody TemplateModel document){
		return  documentService.save(document)
	    		.map(message -> ResponseEntity.ok(message))
	            .orElse(ResponseEntity.internalServerError().build());          
    }
	
    @DeleteMapping("/dataVisa/document/deleteDocument")
    public String deleteDocument(@RequestBody TemplateModel document){
        return  documentService.delete(document);
    }
    
    @GetMapping("/dataVisa/document/getAll")
	public List<TemplateModel> getAll(){
		return documentService.findAll();
	}
	
}
