import React, { Component } from 'react'
import DBClient from '../utils/DBClient'

export default class LoginCadastro extends Component {

    cadastroUsuario = async () => {
        

        const senha = document.getElementById('senha').value
        const confsenha = document.getElementById('confsenha').value

        if (senha == confsenha) {
            const dadosUsuario = {
                email: document.getElementById('email').value,
                senha: senha,
                nome: document.getElementById('nome').value,
                departamento: "Desenvolvimento",
            }

            const cadastro = await DBClient.post('/dataVisa/user/addUser',
                dadosUsuario
            ).then(this.props.alteraModo(4));
        } else {
            //
            // Ajustar pra não dar refresh na pagina
            //
            alert("Senhas digitadas não conferem");
        }
    }

    render() {
        return (
            <div style={{marginLeft: 20}}>
                <a style={{fontWeight: 'bold'}}>Cadastre-se</a>
                <form onSubmit={() => this.cadastroUsuario()}>
                    <div>
                        <label>Nome Completo
                            <input className="input-field"
                                type="text" 
                                id="nome" 
                                placeholder="felix@fatec.sp.gov.br"></input>
                        </label>
                    </div>
                    <div>
                        <label>Email
                            <input className="input-field"
                                type="email" 
                                id="email" 
                                placeholder="felix@fatec.sp.gov.br"></input>
                        </label>
                    </div>
                    <div>
                        <label>Senha
                            <input className="input-field" 
                                type="password" 
                                id="senha" 
                                placeholder="your-password"></input>
                        </label>
                    </div>
                    <div>
                        <label>Confirmar a Senha
                            <input className="input-field" 
                                type="password" 
                                id="confsenha" 
                                placeholder="your-password"></input>
                        </label>
                    </div>

                    <div>
                        <input className="input-button" 
                            type="submit" 
                            value="Cadastrar"></input>
                    </div>

                    <div>
                        Já possui conta?
                        <a onClick={() => this.props.alteraModo(1)} 
                            className="link"> Clique aqui</a>
                    </div>
                </form>
            </div>
        )
    }
}