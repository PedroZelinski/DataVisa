package com.DataVisa.Repositories;

import java.sql.Date;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.DataVisa.Models.TemplateModel;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;

@Repository
public class TemplateRepository {

    @PersistenceContext
    private EntityManager entityManager;

    // Método para adicionar um novo registro
    @Transactional
    public void save(TemplateModel template) throws SQLException{
    	String tableName = "templates_" + template.getEmpresaId();
        String query = "INSERT INTO " + tableName + " (templateName, sqlQuery, tableName, items, lastModification, empresaId, conexaoId) " +
                       "VALUES (:templateName, :sqlQuery, :tableName, :items,  :lastModification, :empresaId, :conexaoId)";
        try {
            Query insertQuery = entityManager.createNativeQuery(query);
            insertQuery.setParameter("templateName", template.getTemplateName());
            insertQuery.setParameter("sqlQuery", template.getSqlQuery());
            insertQuery.setParameter("tableName", template.getTableName());
            
            Gson gson = new Gson();
            String itemsJson = gson.toJson(template.getItems());
            insertQuery.setParameter("items", itemsJson);
            
            insertQuery.setParameter("lastModification", java.sql.Date.valueOf(LocalDate.now(ZoneId.systemDefault())));
            insertQuery.setParameter("empresaId", template.getEmpresaId());
            insertQuery.setParameter("conexaoId", template.getConexaoId());
	        insertQuery.executeUpdate();
        } catch (Exception e) {
            // Caso queira lançar uma exceção personalizada
            throw new SQLException("Falha ao salvar o template no banco de dados. \nErro: " + e);
        }
    }
    
    public TemplateModel findById(Long id, Long empresaId) {
    	String tableName = "templates_" + empresaId;
        String query = "SELECT id, templateName, sqlQuery, tableName, items, dataCriacao, empresaId, conexaoId FROM templates_" + tableName + " WHERE id = :id LIMIT 1";

        try {
            Object[] result = (Object[]) entityManager.createNativeQuery(query)
                    .setParameter("id", id)
                    .getSingleResult();

            // Cria e retorna um TemplateModel a partir do resultado
            TemplateModel template = new TemplateModel();
            template.setId(((Number) result[0]).longValue());
            template.setTemplateName((String) result[1]);
            template.setSqlQuery((String) result[2]);
            template.setTableName((String) result[3]);
            template.setLastModification((Timestamp) result[4]);
            template.setEmpresaId(((Number) result[5]).longValue());
            template.setConexaoId(((Number) result[6]).longValue());

            return template;
        } catch (NoResultException e) {
            return null; // Retorna null se nenhum registro for encontrado
        }
    }
    
    public TemplateModel findByName(String name, Long empresaId) {
        String tableName = "templates_" + empresaId;
        String query = "SELECT id, templateName, sqlQuery, tableName, items, lastModification, empresaId, conexaoId " + 
                "FROM " + tableName + " WHERE templateName = :templateName LIMIT 1";  

        try {
            Object[] result = (Object[]) entityManager.createNativeQuery(query)
                    .setParameter("templateName", name)
                    .getSingleResult();

            // Cria e retorna um TemplateModel a partir do resultado
            TemplateModel template = new TemplateModel();
            template.setId(((Number) result[0]).longValue());
            template.setTemplateName((String) result[1]);
            template.setSqlQuery((String) result[2]);
            template.setTableName((String) result[3]);
            Gson gson = new Gson();
            String itemsJson = (String) result[4]; 
            List<String> items = gson.fromJson(itemsJson, new TypeToken<List<String>>(){}.getType());
            template.setItems(items);
            template.setLastModification((Timestamp) result[5]);
            template.setEmpresaId(((Number) result[6]).longValue());
            template.setConexaoId(((Number) result[7]).longValue());

            return template;
        } catch (NoResultException e) {
            return null; // Retorna null se nenhum registro for encontrado
        }
    }

    // Método para atualizar um registro existente
    @Transactional
    public void updateTemplate(TemplateModel template) {
        String tableName = "template_" + template.getEmpresaId();
        String query = "UPDATE " + tableName + " SET templateName = :templateName, sqlQuery = :sqlQuery, tableName = :tableName, items = :items, " +
                       "lastModification = :lastModification, conexaoId = :conexaoId " +
                       "WHERE id = :id";

        Query updateQuery = entityManager.createNativeQuery(query);
        updateQuery.setParameter("templateName", template.getTemplateName());
        updateQuery.setParameter("sqlQuery", template.getSqlQuery());
        updateQuery.setParameter("tableName", template.getTableName());
        updateQuery.setParameter("items", template.getItems());
        updateQuery.setParameter("lastModification", java.sql.Date.valueOf(LocalDate.now(ZoneId.systemDefault())));
        updateQuery.setParameter("conexaoId", template.getConexaoId());
        updateQuery.setParameter("id", template.getId());

        updateQuery.executeUpdate();
    }

    // Método para remover um registro pelo ID
    @Transactional
    public void removeTemplate(TemplateModel template) {
        String tableName = "template_" + template.getEmpresaId();
        String query = "DELETE FROM " + tableName + " WHERE id = :id";
        
        Query deleteQuery = entityManager.createNativeQuery(query);
        deleteQuery.setParameter("id", template.getId());

        deleteQuery.executeUpdate();
    }

    // Método para buscar todos os registros
    @SuppressWarnings("unchecked")
    public List<Object[]> findAllTemplates(Long empresaId) {
        String tableName = "template_" + empresaId;
        String query = "SELECT * FROM " + tableName;
        
        return entityManager.createNativeQuery(query).getResultList();
    }
}