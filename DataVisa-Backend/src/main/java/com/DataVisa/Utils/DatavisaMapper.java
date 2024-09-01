package com.DataVisa.Utils;

import java.util.List;
import java.util.stream.Collectors;

import com.DataVisa.DTO.DatavisaUserDTO;
import com.DataVisa.Models.UserModel;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

public class DatavisaMapper {

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
    
}
