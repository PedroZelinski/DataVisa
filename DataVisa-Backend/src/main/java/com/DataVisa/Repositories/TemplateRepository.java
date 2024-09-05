package com.DataVisa.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.DataVisa.Models.TemplateModel;

@Repository
public interface TemplateRepository extends JpaRepository<TemplateModel, Long>{

}
