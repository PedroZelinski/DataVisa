import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import DBClient from '../../utils/DBClient';
import logo from '../../assets/logoOriginal.png'

const LoginHome = ({ alteraModo, exibeMensagem }) => {
    const navigate = useNavigate();
    const [value, setValue] = useState('');
    const [view, setView] = useState(false)

    const handleChange = (event) => {
        setValue(event.target.value);
    }
    const onFormSubmit = (event) => {
        fazerLogin();
        event.preventDefault();
    }

    const viewSenha = () => {

    }

    async function fazerLogin() {
        try {
            await DBClient.get('/dataVisa/user/login', {
                headers: {
                    email: document.getElementById('email').value,
                    senha: document.getElementById('senha').value,
                }
            }).then((res) => {
                if (res.status == 200) {
                    localStorage.setItem('session', JSON.stringify(res.data));
                    navigate('/menu/recentes')
                }
            });
        } catch (error) {
            exibeMensagem("Ocorreu um erro: "
                + error.response.status + " - "
                + error.response.data.mensagemRetorno)
            console.log(error)
        }
    }

    return (
        <div className='col-6'>
            <img src={logo} alt="Logo" id="logo-login" />
            <div className='header-div mt-2' >
                Digite seu e-mail e senha, para acessar sua conta.
            </div>

            <form onSubmit={onFormSubmit} onChange={handleChange}
                style={{ marginLeft: '20px', marginTop: '10px' }}>

                <div className='mt-1'>
                    <label>E-mail
                        <div className="input-div">
                            <input className='input-field' placeholder="Digite seu e-mail"
                                type="email" id="email" required />
                        </div>
                    </label>
                </div>

                <div className='mt-2'>
                    <label>Senha
                        <div className="input-div" style={{ width: "96.7%" }}>
                            <input className="input-field" placeholder="Digite sua senha"
                                type={view == true ? "text" : "password"} id="senha" required />
                            <i className={view == true ? 'fi fi-rr-eye-crossed' : 'fi fi-rr-eye'}
                                id='eye' onClick={() => setView(!view)} />
                        </div>
                    </label>
                </div>

                <div className='submit-div mt-2'>
                    <input className="submit-btn"
                        type="submit"
                        value="Acessar" />
                </div>

                <div className='mt-2'>
                    Esqueceu sua senha?
                    <a onClick={() => alteraModo(2)}
                        className="link"> Clique aqui</a>
                </div>
                <div className="mt-2">
                    Ainda não possui conta?
                    <a onClick={() => alteraModo(3)}
                        className="link"> Cadastre-se</a>
                </div>
            </form>
        </div>
    )

}
export default LoginHome