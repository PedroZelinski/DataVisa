import React from 'react'

const LoginConfirmacao = ({alteraModo}) => {

    return (
        <div style={{ marginLeft: 20, marginTop: 10 }}>

            <a style={{ fontWeight: 'bold' }}>Cadastro Realizado com Sucesso</a>
            <p>
                Seu cadastro foi concluido com êxito! <br />
                <br />
                Seus dados serão analisados pela equipe responsável.
                Em breve, você receberá um e-mail com o resultado da analise. <br />
                <br />
                Agradecemos pela sua paciência.
            </p>

            <button onClick={() => alteraModo(1)}>OK</button>
        </div>
    )
}
export default LoginConfirmacao