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

import com.DataVisa.Models.TableModel;
import com.DataVisa.Services.TableService;


@RestController
@CrossOrigin(origins = "*")
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
        return  tableService.save(table)
    		.map(message -> ResponseEntity.ok(message))
            .orElse(ResponseEntity.internalServerError().build());
    }
	
	@PutMapping("/dataVisa/table/updateTable")
    public ResponseEntity<String> updateTable(@RequestBody TableModel table){
		return  tableService.save(table)
	    		.map(message -> ResponseEntity.ok(message))
	            .orElse(ResponseEntity.internalServerError().build());          
    }
	
    @DeleteMapping("/dataVisa/table/deleteTable")
    public String deleteTable(@RequestBody TableModel table){
        return  tableService.delete(table);
    }
    
    @GetMapping("/dataVisa/table/getAll")
	public List<TableModel> getAll(){
		return tableService.findAll();
	}
	
    @GetMapping("/dataVisa/table/tabela/{tabela}")
    public String getTable(@PathVariable String tabela){
    	return tableService.getTable(tabela);
    }
	
    @GetMapping("/dataVisa/table/columns/{tabela}")
	public String getTableColumns(@PathVariable String tabela){
		return tableService.getTableCollumns(tabela);
	}
    
    @GetMapping("/dataVisa/table/columnFields/{tabela}/{campo}")
	public String getColumnFields(@PathVariable String tabela, @PathVariable String campo){
		return tableService.getCollumnFields(tabela, campo);
	}
}
