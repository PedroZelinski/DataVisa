package com.DataVisa.Repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.DataVisa.Models.UserModel;

@Repository
public interface UserRepository extends JpaRepository<UserModel, Long>{

	@Query("SELECT user FROM UserModel user WHERE user.email = ?1 AND user.senha = ?2")
	Optional<UserModel> findByEmailAndSenha(String email, int senha);

	
}
