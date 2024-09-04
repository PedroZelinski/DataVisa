package com.DataVisa.Controllers;

import java.util.List;

import org.apache.commons.lang3.tuple.Pair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.DataVisa.Models.TableModel;
import com.DataVisa.Services.TableService;


@RestController
public class TableController {
	
	@Autowired
	TableService tableService;
	
	
	@GetMapping("/dataVisa/table/getTable/{id}")
	public ResponseEntity<TableModel> getTable(@PathVariable Long id){
		return tableService.findById(id)
				.map(record -> ResponseEntity.ok().body(record))
				.orElse(ResponseEntity.notFound().build());
	}
	
	@PostMapping("/dataVisa/table/addTable")
    public ResponseEntity<String> addTable(@RequestBody TableModel table){
		Pair<String, HttpStatus> result =   tableService.save(table);
    	return new ResponseEntity<>(result.getLeft(), result.getRight()); 
    }
	
//	@PostMapping("/dataVisa/table/addBusinessTables")
//    public ResponseEntity<String> addBusinessTables(@RequestBody TableModel table){
//        return  tableService.addBusinessTables(table)
//    		.map(message -> ResponseEntity.ok(message))
//            .orElse(ResponseEntity.internalServerError().build());
//    }
	
	@PutMapping("/dataVisa/table/updateTable")
    public ResponseEntity<String> updateTable(@RequestBody TableModel table){
		Pair<String, HttpStatus> result = tableService.save(table);
    	return new ResponseEntity<>(result.getLeft(), result.getRight());        
    }
	
    @DeleteMapping("/dataVisa/table/deleteTable")
    public ResponseEntity<String> deleteTable(@RequestBody TableModel table){
    	Pair<String, HttpStatus> result = tableService.delete(table);
    	return new ResponseEntity<>(result.getLeft(), result.getRight());
    }
    
    @GetMapping("/dataVisa/table/getAll")
	public List<TableModel> getAll(){
		return tableService.findAll();
	}
	
    @GetMapping("/dataVisa/table/tabela/{tabela}")
    public ResponseEntity<String> getTable(@PathVariable String tabela){
    	Pair<String, HttpStatus> result = tableService.getTable(tabela);
    	return new ResponseEntity<>(result.getLeft(), result.getRight());
    }
	
    @GetMapping("/dataVisa/table/columns/{tabela}")
	public ResponseEntity<String> getTableColumns(@PathVariable String tabela){
    	Pair<String, HttpStatus> result =  tableService.getTableCollumns(tabela);
    	return new ResponseEntity<>(result.getLeft(), result.getRight());
	}
    
    @GetMapping("/dataVisa/table/columnFields/{tabela}/{campo}")
	public ResponseEntity<String> getColumnFields(@PathVariable String tabela, @PathVariable String campo){
    	Pair<String, HttpStatus> result =  tableService.getCollumnFields(tabela, campo);
    	return new ResponseEntity<>(result.getLeft(), result.getRight());
	}
    
}
