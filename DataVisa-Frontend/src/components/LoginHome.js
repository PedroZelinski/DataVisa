import React, { Component } from 'react'

export default class LoginHome extends Component {
    render() {
        return (
            <div>
                <h1>Digite seu e-mail e senha, para acessar sua conta</h1>
                <form onSubmit={() => this.props.fazerLogin()}>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input className="input-field"
                            type="email" id="email" 
                            placeholder="felix@fatec.sp.gov.br"></input>
                    </div>
                    <div>
                        <label className="text" htmlFor="password">Senha</label>
                        <input className="input-field" 
                            type="password" 
                            id="password" 
                            placeholder="your-password"></input>
                    </div>

                    <div>
                        <input className="input-button" 
                            type="submit" 
                            value="Acessar"></input>
                    </div>

                    <div>
                        Esqueceu sua senha?
                        <a onClick={() => this.props.alteraModo(2)} 
                            className="link"> Clique aqui</a>
                    </div>
                    <div>
                        Ainda não possui conta?
                        <a onClick={() => this.props.alteraModo(3)} 
                            className="link"> Cadastre-se</a>
                    </div>
                </form>
            </div>
        )
    }
}