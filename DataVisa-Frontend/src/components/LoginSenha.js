import React, { Component } from 'react'

export default class LoginSenha extends Component {
    render () {
        return (
            <div>
                <h1>Redefinir senha</h1>
                <form>
                    <div>
                        <label for="email">Email</label>
                        <input class="input-field"
                            type="email" 
                            id="email" 
                            placeholder="felix@fatec.sp.gov.br"></input>
                    </div>
                    <div>
                        <label class="text" 
                            for="password">Nova senha</label>
                        <input class="input-field" 
                            type="password" 
                            id="password" 
                            placeholder="your-password"></input>
                    </div>
                    <div>
                        <label class="text" 
                            for="newpassword">Confirmar senha</label>
                        <input class="input-field" 
                            type="password" 
                            id="newpassword" 
                            placeholder="your-password"></input>
                    </div>
    
                    <div>
                        <input class="input-button" 
                            type="submit" 
                            value="Confirmar"></input>
                    </div>
    
                    <div>
                        Já possui conta?
                        <a onClick={() => this.props.alteraModo(1)} 
                            class="link"> Clique Aqui</a>
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