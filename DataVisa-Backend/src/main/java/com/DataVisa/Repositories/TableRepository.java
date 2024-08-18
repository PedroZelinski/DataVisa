package com.DataVisa.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.DataVisa.Models.TableModel;

@Repository
public interface TableRepository extends JpaRepository<TableModel, Long>{

}
