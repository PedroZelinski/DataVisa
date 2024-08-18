import React, { Component } from 'react'
import DBClient from '../../utils/DBClient'

const LoginCadastro = ({ alteraModo }) => {

    async function cadastroUsuario() {

        const senha = document.getElementById('senha').value
        const confsenha = document.getElementById('confsenha').value

        if (senha == confsenha) {
            const dadosUsuario = {
                email: document.getElementById('email').value,
                senha: senha,
                nome: document.getElementById('nome').value,
                empresa: document.getElementById('empresa').value,
                departamento: "Desenvolvimento",
            }

            const cadastro = await DBClient.post('/dataVisa/user/addUser',
                dadosUsuario
            ).then(alteraModo(4));
        } else {
            //
            // Ajustar pra não dar refresh na pagina
            //
            alert("Senhas digitadas não conferem");
        }
    }

    return (
        <div style={{ marginLeft: 20, marginTop: 10 }}>
            <a style={{ fontWeight: 'bold', marginLeft: 20 }}>Cadastre-se</a>

            <form onSubmit={() => cadastroUsuario()}>
                <div className='field-div'>
                    <label>Empresa
                        <input className="input-field"
                            type="text"
                            id="empresa"
                            placeholder="Empresa"></input>
                    </label>
                </div>

                <div className='field-div'>
                    <label>Nome Completo
                        <input className="input-field"
                            type="text"
                            id="nome"
                            placeholder="Nome"></input>
                    </label>
                </div>

                <div className='field-div'>
                    <label>Email
                        <input className="input-field"
                            type="email"
                            id="email"
                            placeholder="email@email.com"></input>
                    </label>
                </div>

                <div className='field-div'>
                    <label>Senha
                        <input className="input-field"
                            type="password"
                            id="senha"
                            placeholder="Senha"></input>
                    </label>
                </div>

                <div className='field-div'>
                    <label>Confirmar a senha
                        <input className="input-field"
                            type="password"
                            id="confsenha"
                            placeholder="Senha"></input>
                    </label>
                </div>

                <div className='field-div'>
                    <input className="input-button"
                        type="submit"
                        value="Cadastrar"></input>
                </div>

                <div className='field-div'>
                    Já possui conta?
                    <a onClick={() => alteraModo(1)}
                        className="link"> Clique aqui</a>
                </div>
            </form>
        </div>
    )
}
export default LoginCadastro