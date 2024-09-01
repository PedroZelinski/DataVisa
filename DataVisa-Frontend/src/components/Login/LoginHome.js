import React from 'react'
import { useNavigate } from 'react-router-dom';
import DBClient from '../../utils/DBClient';

const LoginHome = ({ alteraModo }) => {
    const navigate = useNavigate();
    const [value, setValue] = React.useState('');

    const handleChange = (event) => {
        setValue(event.target.value);
    }
    const onFormSubmit = (event) => {
        fazerLogin();
        event.preventDefault();
    }

    async function fazerLogin() {
        try {
            await DBClient.get('/dataVisa/user/login', {
                headers: {
                    email:document.getElementById('email').value,
                    senha: document.getElementById('senha').value,
                }
            }).then((res) => {
                console.log(res)
                if (res.status == 200) {
                    localStorage.setItem('session', JSON.stringify(res.data));
                    navigate('/menu')
                }
            });
        } catch (error) {
            alert("Ocorreu um erro: "+error.response.status+"\n"+
                error.response.data.mensagemRetorno)
            console.log(error)
        }
    }

    return (
        <div style={{ marginLeft: 20, marginTop: 10 }}>
            <a style={{ fontWeight: 'bold', marginLeft: 20 }}>
                Digite seu e-mail e senha, para acessar sua conta</a>

            <form onSubmit={onFormSubmit} onChange={handleChange}>
                <div className='field-div'>
                    <label>Email
                        <input className="input-field" placeholder="email@email.com" 
                            type="email" id="email" />
                    </label>
                </div>

                <div className='field-div'>
                    <label>Senha
                        <input className="input-field" placeholder="Senha"
                            type="password" id="senha" />
                    </label>
                </div>

                <div className='field-div'>
                    <input className="input-button"
                        type="submit"
                        value="Acessar" />
                </div>

                <div className='field-div'>
                    Esqueceu sua senha?
                    <a onClick={() => alteraModo(2)}
                        className="link"> Clique aqui</a>
                    <br />
                    Ainda não possui conta?
                    <a onClick={() => alteraModo(3)}
                        className="link"> Cadastre-se</a>
                </div>
            </form>
        </div>
    )

}
export default LoginHome