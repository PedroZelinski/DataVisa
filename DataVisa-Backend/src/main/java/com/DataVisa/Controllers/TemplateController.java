package com.DataVisa.Controllers;

import org.apache.commons.lang3.tuple.Pair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.DataVisa.DTO.TemplateDTO;
import com.DataVisa.Models.TemplateModel;
import com.DataVisa.Services.TemplateService;


@RestController
public class TemplateController {
	
	@Autowired
	TemplateService templateService;
	
	@PostMapping("/dataVisa/template/validateQuery")
	public ResponseEntity<TemplateDTO> validateQuery(@RequestBody String query){
		Pair<TemplateDTO, HttpStatus> result = templateService.validateQuery(query);
		return new ResponseEntity<TemplateDTO>(result.getLeft(), result.getRight());
	}
	
	
//	@GetMapping("/dataVisa/template/getTemplate/{id}")
//	public ResponseEntity<TemplateModel> getTemplate(@PathVariable Long id){
//		return templateService.findById(id)
//				.map(record -> ResponseEntity.ok().body(record))
//				.orElse(ResponseEntity.notFound().build());
//	}
	
	@PostMapping("/dataVisa/template/addTemplate")
    public ResponseEntity<String> addTemplate(@RequestBody TemplateModel template){        
        Pair<String, HttpStatus> result = templateService.addTemplate(template);
        return new ResponseEntity<String>(result.getLeft(), result.getRight());
    }
	
//	@PutMapping("/dataVisa/template/updateTemplate")
//    public ResponseEntity<String> updateTemplate(@RequestBody TemplateModel template){
//		return  templateService.save(template)
//	    		.map(message -> ResponseEntity.ok(message))
//	            .orElse(ResponseEntity.internalServerError().build());          
//    }
//	

	@DeleteMapping("/dataVisa/template/deleteTemplate/{templateName}")
    public  ResponseEntity<String> deleteDB(@PathVariable String templateName){
    	Pair<String, HttpStatus> result = templateService.delete(templateName);
    	return new ResponseEntity<>(result.getLeft(), result.getRight());
    }
	
//    
//    @GetMapping("/dataVisa/template/getAll")
//	public List<TemplateModel> getAll(){
//		return templateService.findAll();
//	}
	
}
