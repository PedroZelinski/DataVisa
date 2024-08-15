import React, { Component } from 'react'

export default class LoginCadastro extends Component {

    cadastroUsuario = (nome, email, senha, confsenha) => {

        //
        // Comunicação e cadastro no banco com Axios
        //

        this.props.alteraModo(4)
    }

    render() {
        return (
            <div>
                <h1>Cadastre-se</h1>
                <form onSubmit={() => this.cadastroUsuario()}>
                    <div>
                        <label for="nome">Nome Completo</label>
                        <input class="input-field"
                            type="text" 
                            id="nome" 
                            placeholder="felix@fatec.sp.gov.br"></input>
                    </div>
                    <div>
                        <label for="email">Email</label>
                        <input class="input-field"
                            type="email" 
                            id="email" 
                            placeholder="felix@fatec.sp.gov.br"></input>
                    </div>
                    <div>
                        <label class="text" 
                            for="password">Senha</label>
                        <input class="input-field" 
                            type="password" 
                            id="password" 
                            placeholder="your-password"></input>
                    </div>
                    <div>
                        <label class="text" 
                            for="confpassword">Confirmar a Senha</label>
                        <input class="input-field" 
                            type="password" 
                            id="confpassword" 
                            placeholder="your-password"></input>
                    </div>

                    <div>
                        <input class="input-button" 
                            type="submit" 
                            value="Cadastrar"></input>
                    </div>

                    <div>
                        Já possui conta?
                        <a onClick={() => this.props.alteraModo(1)} 
                            class="link"> Clique aqui</a>
                    </div>
                </form>
            </div>
        )
    }
}