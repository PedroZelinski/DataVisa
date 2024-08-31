package com.DataVisa.Controllers;

import java.util.List;

import org.apache.commons.lang3.tuple.Pair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

import com.DataVisa.DTO.DatavisaSessionDTO;
import com.DataVisa.Models.DBModel;
import com.DataVisa.Services.DBService;


@RestController
public class DBController {
	
	@Autowired
	DBService databaseService;
	
	@GetMapping("/dataVisa/database/getDB/{id}")
	public ResponseEntity<DBModel> getDB(@PathVariable Long id){
		return databaseService.findById(id)
				.map(record -> ResponseEntity.ok().body(record))
				.orElse(ResponseEntity.notFound().build());
	}
	
	@PostMapping("/dataVisa/database/addDB")
    public ResponseEntity<String> addDB(@RequestBody DBModel database){
        return  databaseService.save(database)
    		.map(message -> ResponseEntity.ok(message))
            .orElse(ResponseEntity.internalServerError().build());
    }
	
	@PutMapping("/dataVisa/database/updateDB")
    public ResponseEntity<String> updateDB(@RequestBody DBModel database){
		return  databaseService.save(database)
	    		.map(message -> ResponseEntity.ok(message))
	            .orElse(ResponseEntity.internalServerError().build());          
    }
	
    @DeleteMapping("/dataVisa/database/deleteDB")
    public String deleteDB(@RequestBody DBModel database){
        return  databaseService.delete(database);
    }
    
    @GetMapping("/dataVisa/database/getAll")
	public List<DBModel> getAll(){
		return databaseService.findAll();
	}
    
    @GetMapping("/dataVisa/database/connect/{id}")
	public ResponseEntity<DatavisaSessionDTO> Connect(@PathVariable Long id){
    	Pair<DatavisaSessionDTO, HttpStatus> result =  databaseService.setConnection(id);
		return new ResponseEntity<>(result.getLeft(), result.getRight());
	}
    
}
