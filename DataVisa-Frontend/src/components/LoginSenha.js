import React, { Component } from 'react'

export default class LoginSenha extends Component {
    render () {
        return (
            <div style={{marginLeft: 20}}>
                <a style={{fontWeight: 'bold'}}>Redefinir senha</a>
                <form>
                    <div>
                        <label>Email
                            <input className="input-field"
                                type="email" 
                                id="email" 
                                placeholder="felix@fatec.sp.gov.br"></input>
                        </label>
                    </div>
                    <div>
                        <label>Nova senha
                            <input className="input-field" 
                                type="password" 
                                id="password" 
                                placeholder="your-password"></input>
                        </label>
                    </div>
                    <div>
                        <label>Confirmar senha
                            <input className="input-field" 
                                type="password" 
                                id="newpassword" 
                                placeholder="your-password"></input>
                        </label>
                    </div>
    
                    <div>
                        <input className="input-button" 
                            type="submit" 
                            value="Confirmar"></input>
                    </div>
    
                    <div>
                        Já possui conta?
                        <a onClick={() => this.props.alteraModo(1)} 
                            className="link"> Clique Aqui</a>
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