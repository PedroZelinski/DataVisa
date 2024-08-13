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

import com.DataVisa.Models.DBModel;
import com.DataVisa.Services.DBService;


@RestController
@CrossOrigin("origins = *")
public class DBController {
	
	@Autowired
	DBService databaseService;
	
	@GetMapping("/dataVisa/database/getDB/{nome}")
	public ResponseEntity<DBModel> getDB(@PathVariable String nome){
		return databaseService.findById(nome)
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
	
    @GetMapping("/dataVisa/database/tablesaw/{tabela}")
	public String tablesawTest(@PathVariable String tabela){
		return databaseService.getTableCollumns(tabela);
	}
    
    @GetMapping("/dataVisa/database/tablesaw/{tabela}/{campo}")
	public String tablesawFieldTest(@PathVariable String tabela, @PathVariable String campo){
		return databaseService.getCollumnFields(tabela, campo);
	}
    
}
