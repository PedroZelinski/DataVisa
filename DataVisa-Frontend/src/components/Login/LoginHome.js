import React, { Component } from 'react'
import { useNavigate } from 'react-router-dom';

const LoginHome = ({alteraModo}) => {
    const navigate = useNavigate();

    function fazerLogin(){
        
        //colocar validações de campos, senha, etc.
        navigate('/menu')
    }
    return (
        <div style={{ marginLeft: 20, marginTop: 10 }}>
            <a style={{ fontWeight: 'bold', marginLeft: 20 }}>
                Digite seu e-mail e senha, para acessar sua conta</a>

            <form onSubmit={() => fazerLogin()}>
                <div className='field-div'>
                    <label>Email
                        <input className="input-field"
                            type="email" id="email"
                            placeholder="email@email.com"></input>
                    </label>
                </div>

                <div className='field-div'>
                    <label>Senha
                        <input className="input-field"
                            type="password"
                            id="password"
                            placeholder="Senha"></input>
                    </label>
                </div>

                <div className='field-div'>
                    <input className="input-button"
                        type="submit"
                        value="Acessar"></input>
                </div>

                <div className='field-div'>
                    Esqueceu sua senha?
                    <a onClick={() => alteraModo(2)}
                        className="link"> Clique aqui</a>
                    <br />
                    Ainda não possui conta?
                    <a onClick={() => alteraModo(3)}
                        className="link"> Cadastre-se</a>
                </div>
            </form>
        </div>
    )

}
export default LoginHome