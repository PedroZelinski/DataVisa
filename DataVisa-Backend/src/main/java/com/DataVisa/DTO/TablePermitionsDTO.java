package com.DataVisa.DTO;

import java.util.List;

import com.DataVisa.Models.TableModel;

import lombok.Data;

@Data
public class TablePermitionsDTO {
	
	List<TableModel> tablesPermitions;
	
	String mensagemRetorno;

}
