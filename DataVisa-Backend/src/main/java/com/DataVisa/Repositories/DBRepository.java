package com.DataVisa.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.DataVisa.Models.DBModel;

@Repository
public interface DBRepository extends JpaRepository<DBModel, Long>{

	List<DBModel> findAllByEmpresaId(Long empresaId);
	
	DBModel findByNomeDb(String nomeDb);
	
	DBModel findByNomeConexao(String nomeConexao);
}
