package com.DataVisa.Controllers;

import java.util.List;

import org.apache.commons.lang3.tuple.Pair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.DataVisa.DTO.TablePermitionsDTO;
import com.DataVisa.Models.TableModel;
import com.DataVisa.Services.DatavisaTableService;
import com.DataVisa.Services.TableSawService;


@RestController
public class TableController {
	
	@Autowired
	DatavisaTableService datavisaTableService;
	
	@Autowired
	TableSawService tableSawService;
	
	
	@PostMapping("/dataVisa/table/updateTablePermitions")
	public ResponseEntity<String> updateTablePermitions(@RequestBody List<TableModel> tables){
		String result = datavisaTableService.updateTablesPermitions(tables);
		return new ResponseEntity<>(result, HttpStatus.OK);
	}
    
    @GetMapping("/dataVisa/table/getTablesPermitions")
	public ResponseEntity<TablePermitionsDTO> getAll(){
    	TablePermitionsDTO result = datavisaTableService.findTablesPermitions();
		return new ResponseEntity<>(result, HttpStatus.OK);
	}
	
    @GetMapping("/dataVisa/tableSaw/getTable/{tabela}")
    public ResponseEntity<String> getTable(@PathVariable String tabela){
    	Pair<String, HttpStatus> result = tableSawService.getTable(tabela);
    	return new ResponseEntity<>(result.getLeft(), result.getRight());
    }

    @GetMapping("/dataVisa/tableSaw/getConnecionTables")
    public ResponseEntity<String> getConnecionTables(){
    	Pair<String, HttpStatus> result = tableSawService.getConnecionTables();
    	return new ResponseEntity<>(result.getLeft(), result.getRight());
    }
    
    @GetMapping("/dataVisa/tableSaw/getTableColumns/{tabela}")
	public ResponseEntity<String> getTableColumns(@PathVariable String tabela){
    	Pair<String, HttpStatus> result =  tableSawService.getTableCollumns(tabela);
    	return new ResponseEntity<>(result.getLeft(), result.getRight());
	}
    
    @GetMapping("/dataVisa/tableSaw/getColumnFields/{tabela}/{campo}")
	public ResponseEntity<String> getColumnFields(@PathVariable String tabela, @PathVariable String campo){
    	Pair<String, HttpStatus> result =  tableSawService.getCollumnFields(tabela, campo);
    	return new ResponseEntity<>(result.getLeft(), result.getRight());
	}
    
	
}
