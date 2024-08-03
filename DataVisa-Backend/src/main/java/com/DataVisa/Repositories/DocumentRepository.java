package com.DataVisa.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.DataVisa.Models.DocumentModel;

@Repository
public interface DocumentRepository extends JpaRepository<DocumentModel, Long>{

}
