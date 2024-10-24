package com.DataVisa.Utils;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.DataVisa.DTO.DatavisaUserDTO;
import com.DataVisa.Models.UserModel;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

import tech.tablesaw.api.Table;

public class DatavisaUtils {

    public static List<DatavisaUserDTO> convertToDTOList(List<UserModel> userModels) {
        return userModels.stream()
                .map(DatavisaUserDTO::new) 
                .collect(Collectors.toList());
    }
    
    public static String createJsonNumberList(String input, String split) throws JsonProcessingException {
    	
    	ObjectMapper mapper = new ObjectMapper();
    	
        ObjectNode jsonObject = mapper.createObjectNode();

        // Divide a string nos elementos usando '\r\n' como delimitador
        String[] elements = input.split(split);

        // Itera sobre os elementos e adiciona ao objeto JSON
        for (int i = 0; i < elements.length; i++) {
            jsonObject.put(String.valueOf(i), elements[i]);
        }
        // Converte o objeto JSON para uma string JSON formatada
        return mapper.writeValueAsString(jsonObject);
    }
    
    
    public static String tableNameMapper(String query) {
        // Expressão regular para capturar o nome da tabela após "FROM"
        String regex = "(?i)FROM\\s+([\\w\\d_]+)";
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(query);
        
        // Verifica se há correspondência e retorna a tabela após FROM
        if (matcher.find()) {
            return matcher.group(1); // Retorna o nome da tabela após FROM
        }
        
        return null; // Retorna null se nenhuma tabela for encontrada
    }
    
    public static List<String> tableFieldsMapper(String query) {
        List<String> aliases = new ArrayList<>();

        // Remove quebras de linha da string de consulta e substitui múltiplos espaços por um único
        query = query.replaceAll("\\r?\\n", " ").replaceAll("\\s+", " ").trim();

        // Extrai a parte da consulta antes do FROM (parte do SELECT)
        String selectPart = query.split("(?i)FROM")[0].trim();

        // Regex para capturar apenas aliases explicitamente declarados com AS
        String aliasRegex = "(?i)(?:[\\w.]+|\\([^\\)]+\\))\\s+AS\\s+(\\w+)";

        // Regex matcher para capturar os aliases
        Matcher aliasMatcher = Pattern.compile(aliasRegex).matcher(selectPart);

        while (aliasMatcher.find()) {
            String alias = aliasMatcher.group(1); // Captura o alias (após o AS)
            if (alias != null) {
            	alias = alias.replace("_", " "); //Formata o alias 
                alias = capitalizeFirstLetter(alias); //Formata o alias 
                aliases.add(alias); // Adiciona o alias à lista
            }
        }

        return aliases;
    }

        public static String columnExtractorByType(Table table, String columnType, String columnName) {
            String response;
            switch (columnType.toLowerCase()) {
                case "int":
                case "integer":
                	response = table.intColumn(columnName).print();
                    break;
                case "varchar":
                case "json":
                case "text":
                	response = table.stringColumn(columnName).print();
                    break;
                case "date":
                	response = table.dateColumn(columnName).print();
                    break;
                case "datetime":
                	response = table.dateTimeColumn(columnName).print();
                    break;
                case "float":
                	response = table.floatColumn(columnName).print();
                    break;
                case "double":
                	response = table.doubleColumn(columnName).print();
                    break;
                case "boolean":
                case "bool":
                	response = table.booleanColumn(columnName).print();
                    break;
                case "decimal":
                	response = table.doubleColumn(columnName).print();
                    break;
                default:
                	response = table.stringColumn(columnName).print();
            }

            response = response.contains("\n") ? response.substring(response.indexOf('\n') + 1): response;
            return response.replaceAll("\\r\\n", ",").trim();
        }
    
        private static String capitalizeFirstLetter(String input) { 
            if (input == null || input.isEmpty()) {
                return input;
            }
            
            // Capitaliza apenas a primeira letra e mantém o restante da string como está
            return Character.toUpperCase(input.charAt(0)) + input.substring(1);
        }
}
