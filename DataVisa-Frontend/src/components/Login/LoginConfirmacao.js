import React from 'react'
import logo from '../../assets/logoOriginal.png'

const LoginConfirmacao = ({alteraModo}) => {

    return (
        <div className='col-6 text-center'>
            <img src={logo} alt="Logo" id="logo-login" /><br />

            <div className='header-div mt-4' style={{marginLeft: '0'}}>
                Cadastro Realizado com Sucesso</div>
            <div className='mt-4 m-1'>
                <p>
                    Seu cadastro foi concluido com êxito! <br />
                    <br />
                    Seus dados serão analisados pela equipe responsável.
                    Em breve, você receberá um e-mail com o resultado da analise. <br />
                    <br />
                    Agradecemos pela sua paciência.
                </p>
            </div>
            <div className="submit-div mt-2">
                <button className="submit-btn"
                onClick={() => alteraModo(1)}>OK</button>

            </div>
        </div>
    )
}
export default LoginConfirmacao