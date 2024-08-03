package com.DataVisa.Repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.DataVisa.Models.UserModel;

@Repository
public interface UserRepository extends JpaRepository<UserModel, String>{

	@Query("SELECT user FROM UserModel user WHERE user.email = ?1 AND user.senha = ?2")
	Optional<UserModel> findByEmailAndSenha(String email, int senha);

	Optional<UserModel> findByEmail(String email);

	@Query("SELECT u FROM UserModel u WHERE u.email = :email AND u.senha = :senha AND u.nome = :nome AND u.departamento = :departamento AND u.adminConta = :adminConta AND u.editaModelo = :editaModelo AND u.editaConexão = :editaConexão AND u.editaSenha = :editaSenha")
	Optional<UserModel> findByAllFields(
	    @Param("email") String email, 
	    @Param("senha") int senha, 
	    @Param("nome") String nome,
	    @Param("departamento") String departamento,
	    @Param("adminConta") int adminConta,
	    @Param("editaModelo") int editaModelo,
	    @Param("editaConexão") int editaConexão,
	    @Param("editaSenha") int editaSenha
	);
	
}