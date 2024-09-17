package com.DataVisa.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.DataVisa.DTO.TablePermitionsDTO;
import com.DataVisa.Models.TableModel;
import com.DataVisa.Repositories.TableRepository;
import com.DataVisa.Session.DatavisaSession;

@Service
public class DatavisaTableService {

	@Autowired
	TableRepository tableRepository;

	@Autowired
	DatavisaSession datavisaSession;	

	public TablePermitionsDTO findTablesPermitions(){
		TablePermitionsDTO tablesPermitionsDTO = new TablePermitionsDTO();
		tablesPermitionsDTO.setTablesPermitions(tableRepository.findAll("tabelas_" + datavisaSession.getDbName()));
		return tablesPermitionsDTO;
	}
	
	public String updateTablesPermitions(List<TableModel> tables){
		tableRepository.updateAll(tables, "tabelas_" + datavisaSession.getDbName());
		return "Atualizado com sucesso";
	}
	
}

