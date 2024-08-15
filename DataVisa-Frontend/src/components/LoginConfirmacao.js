import React, { Component } from 'react'

export default class LoginConfirmacao extends Component {
    render() {
        return (
            <div>
                <h1>Cadastro Realizado com Sucesso</h1>
                <p>
                    Seu cadastro foi concluido com êxito! <br/>
                    <br/>
                    Seus dados serão analisados pela equipe responsável.
                    Em breve, você receberá um e-mail com o resultado da analise. <br/>
                    <br/>
                    Agradecemos pela sua paciência.
                </p>

                <button onClick={() => this.props.alteraModo(1)}>OK</button>
            </div>
        )
    }
}
