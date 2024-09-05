package com.DataVisa.Services;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.List;
import java.util.Optional;

import org.apache.commons.lang3.tuple.Pair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.DataVisa.DTO.DatavisaDbDTO;
import com.DataVisa.Models.TableModel;
import com.DataVisa.Repositories.TableRepository;
import com.DataVisa.Session.DatavisaSession;

import tech.tablesaw.api.Table;

@Service
public class DatavisaTableService {

	@Autowired
	TableRepository tableRepository;

	@Autowired
	DatavisaSession datavisaSession;	

	@Autowired
	@Lazy
	DBService dBService;

	@Autowired
	UserService userService;
	
	public Pair<String, HttpStatus> save(TableModel database) {
		Pair<String, HttpStatus> response;
		if (!(response = datavisaSession.checkStatus()).getRight().equals(HttpStatus.ACCEPTED))
			return Pair.of(response);
		if (!(response = datavisaSession.checkDatavisaPermition(2)).getRight().equals(HttpStatus.ACCEPTED))
			return Pair.of(response);
		
		try {
			//Verifica se a tabela já existe
			if (tableRepository.findById(database.getId()).isPresent()) {
				throw new IllegalArgumentException("Tabela já cadastrada.");
			}
			
			tableRepository.save(database);
			
		} catch (Exception ex){
			return Pair.of("Ocorreu um erro, Tabela não cadastrada! " + ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR); 
		}
		return Pair.of("Tabela cadastrada com sucesso!", HttpStatus.OK);
	}
	
	public Pair<String, HttpStatus> delete(TableModel database){
		
		Pair<String, HttpStatus> response;
		if (!(response = datavisaSession.checkStatus()).getRight().equals(HttpStatus.ACCEPTED))
			return Pair.of(response);
		if (!(response = datavisaSession.checkDatavisaPermition(2)).getRight().equals(HttpStatus.ACCEPTED))
			return Pair.of(response);
		
		try {
			
			//Verifica se a tabela existe
			if (tableRepository.findById(database.getId()).isEmpty()) {
                throw new RuntimeException("Tabela não encontrada.");
            }
			
			tableRepository.delete(database);
			
			//Verifica se a tabela foi excluida
            if (tableRepository.findById(database.getId()).isPresent()) {
                throw new RuntimeException("Falha ao excluir a tabela.");
            }
            
		} catch (Exception ex){
			return Pair.of("Ocorreu um erro! " + ex.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);			
		}
		
		return Pair.of("Tabela excluída com sucesso!",HttpStatus.OK);
	}

	public List<TableModel> findAll(){
		return tableRepository.findAll();
	}

	public Optional<TableModel> findById(Long id){
		return tableRepository.findById(id);
	}
	
}

