import React from 'react'
import logo from '../../assets/logoOriginal.png'

const LoginConfirmacao = ({alteraModo}) => {

    return (
        <div className='col-6 text-center'>
            <img src={logo} alt="Logo" id="logo-login" /><br />

            <div className='font-bold mt-5'>Cadastro Realizado com Sucesso</div>
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