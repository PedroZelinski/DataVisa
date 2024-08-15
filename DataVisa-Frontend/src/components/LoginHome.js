import React, { Component } from 'react'

export default class LoginHome extends Component {
    render() {
        return (
            <div style={{marginLeft: 20}}>
                <a style={{fontWeight: 'bold'}}>
                    Digite seu e-mail e senha, para acessar sua conta</a>
                <form onSubmit={() => this.props.fazerLogin()}>
                    <div>
                        <label>Email
                            <input className="input-field"
                                type="email" id="email" 
                                placeholder="felix@fatec.sp.gov.br"></input>
                        </label>
                    </div>
                    <div>
                        <label>Senha
                            <input className="input-field" 
                                type="password" 
                                id="password" 
                                placeholder="your-password"></input>
                        </label>
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