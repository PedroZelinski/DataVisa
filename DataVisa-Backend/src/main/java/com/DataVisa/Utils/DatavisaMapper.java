package com.DataVisa.Utils;

import java.util.List;
import java.util.stream.Collectors;

import com.DataVisa.DTO.DatavisaUserDTO;
import com.DataVisa.Models.UserModel;

public class DatavisaMapper {

    public static List<DatavisaUserDTO> convertToDTOList(List<UserModel> userModels) {
        return userModels.stream()
                .map(DatavisaUserDTO::new) 
                .collect(Collectors.toList());
    }
}
