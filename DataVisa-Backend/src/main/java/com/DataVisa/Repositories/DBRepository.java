package com.DataVisa.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.DataVisa.Models.DBModel;

@Repository
public interface DBRepository extends JpaRepository<DBModel, Long>{

}
