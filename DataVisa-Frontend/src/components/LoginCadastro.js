import React, { Component } from 'react'

export default class LoginCadastro extends Component {
    render() {
        return (
            <div>
                <h1></h1>
                <form>
                    <div>
                        <label for="email">Nome Completo</label>
                        <input class="input-field"
                            type="email" 
                            id="email" 
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
                            for="password">Confirmar a Senha</label>
                        <input class="input-field" 
                            type="password" 
                            id="password" 
                            placeholder="your-password"></input>
                    </div>

                    <div>
                        <input class="input-button" 
                            type="submit" 
                            value="Acessar"></input>
                    </div>

                    <div>
                        Esqueceu sua senha?
                        <a onClick={() => this.props.alteraModo(2)} 
                            class="link"> Cadastre-se</a>
                    </div>
                    <div>
                        Ainda não possui conta?
                        <a onClick={() => this.props.alteraModo(3)} 
                            class="link"> Cadastre-se</a>
                    </div>
                </form>
            </div>
        )
    }
}