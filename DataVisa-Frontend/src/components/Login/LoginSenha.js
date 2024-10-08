import React from 'react'
import logo from '../../assets/logoOriginal.png'

const LoginSenha = ({ alteraModo, exibeMensagem }) => {
    const [value, setValue] = React.useState('');

    const handleChange = (event) => {
        setValue(event.target.value);
    }
    const onFormSubmit = (event) => {
        resetarSenha(document.getElementById('email').value);
        event.preventDefault();
    }
    async function resetarSenha(email) {
        exibeMensagem("Nova senha enviada para o email "+email)
        alteraModo(1)
    }

    return (
        <div className='col-6'>
            <img src={logo} alt="Logo" id="logo-login" />
            <div className='header-div mt-2'>Redefinir senha</div>

            <form onChange={handleChange} onSubmit={onFormSubmit}
            style={{ marginLeft: '20px', marginTop: '10px' }}>
                <div className='mt-1'>
                    <label>E-mail
                        <div className="input-div">
                            <input className="input-field" placeholder="Digite seu e-mail"
                                type="email" id="email" />
                        </div>
                    </label>
                </div>

                <div className='submit-div mt-2'>
                    <input className="submit-btn"
                        type="submit"
                        value="Confirmar" />
                </div>

                <div className='mt-2'>
                    Já possui conta?
                    <a onClick={() => alteraModo(1)}
                        className="link"> Clique Aqui</a>
                </div>
                <div className='mt-2'>
                    Ainda não possui conta?
                    <a onClick={() => alteraModo(3)}
                        className="link"> Cadastre-se</a>
                </div>
            </form>
        </div>
    )
}
export default LoginSenha