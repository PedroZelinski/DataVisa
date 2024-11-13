package com.DataVisa.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.DataVisa.Models.ReportModel;

@Repository
public interface ReportRepository extends JpaRepository<ReportModel, Long>{

	
}