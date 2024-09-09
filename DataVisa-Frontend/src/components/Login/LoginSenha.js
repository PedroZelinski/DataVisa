import React from 'react'
import logo from '../../assets/logoOriginal.png'

const LoginSenha = ({ alteraModo }) => {
    return (
        <div className='col-6'>
            <img src={logo} alt="Logo" id="logo-login" /><br />

            <form style={{marginLeft: '20px', marginTop: '10px'}}>
                <div className='font-bold'>Redefinir senha</div>
                <div className='mt-1'>
                    <label>Email
                        <input className="input-field" placeholder="email@email.com" 
                            type="email" id="email" />
                    </label>
                </div>

                <div className='mt-1'>
                    <label>Nova senha
                        <input className="input-field" placeholder="Senha"
                            type="password" id="senha" />
                    </label>
                </div>

                <div className='mt-1'>
                    <label>Confirmar senha
                        <input className="input-field" placeholder="Senha"
                            type="password" id="confsenha" />
                    </label>
                </div>

                <div className='mt-1'>
                    <input className="input-button"
                        type="submit"
                        value="Confirmar" />
                </div>

                <div className='mt-1'>
                    Já possui conta?
                    <a onClick={() => alteraModo(1)}
                        className="link"> Clique Aqui</a>
                    <br />
                    Ainda não possui conta?
                    <a onClick={() => alteraModo(3)}
                        className="link"> Cadastre-se</a>
                </div>
            </form>
        </div>
    )
}
export default LoginSenha